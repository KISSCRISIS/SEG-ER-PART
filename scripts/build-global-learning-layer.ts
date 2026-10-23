/**
 * Builds the global study-enhancement layer.
 *
 * Reads the authored `medical-content/emergency-medicine/layer.json`,
 * validates it against the shared Zod contract, resolves match aliases
 * against the existing book/summary sources (read-only), and emits:
 *   - medical-content/emergency-medicine/{algorithms,exam-pearls,tables,mappings}/
 *   - client/public/content/global-enhancements-index.json (runtime map)
 *
 * Original book content is never edited or duplicated.
 *
 *   pnpm index:global-layer
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { MEDICAL_SYSTEMS } from "../client/src/data/medical-systems";
import { globalLearningLayerSchema } from "../shared/global-learning-layer";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const layerDir = resolve(root, "medical-content/emergency-medicine");

type SummarySource = "rosh" | "tintinalli" | "rosen";

interface SourceRecord {
  source: SummarySource;
  unitId: string;
  title: string;
  kind: "chapter" | "topic";
}

const KIND_BY_SOURCE: Record<SummarySource, "chapter" | "topic"> = {
  rosh: "chapter",
  tintinalli: "chapter",
  rosen: "topic",
};

function loadSource(
  source: SummarySource,
  file: string
): SourceRecord[] {
  const data = JSON.parse(
    readFileSync(resolve(root, file), "utf8")
  ) as { chapters?: Array<{ unitId?: unknown; title?: unknown }> };
  return (data.chapters ?? [])
    .filter(
      record =>
        typeof record.unitId === "string" &&
        record.unitId.trim() &&
        typeof record.title === "string" &&
        record.title.trim()
    )
    .map(record => ({
      source,
      unitId: (record.unitId as string).trim(),
      title: (record.title as string).trim(),
      kind: KIND_BY_SOURCE[source],
    }));
}

function matchesAliases(title: string, aliases: string[]): boolean {
  const upper = title.toUpperCase();
  const positives = aliases.filter(alias => !alias.startsWith("!"));
  const negatives = aliases
    .filter(alias => alias.startsWith("!"))
    .map(alias => alias.slice(1).toUpperCase());
  if (negatives.some(term => term && upper.includes(term))) return false;
  return positives.some(term => term && upper.includes(term.toUpperCase()));
}

function writeJson(relative: string, value: unknown): void {
  const path = resolve(layerDir, relative);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
  console.log(`Wrote ${path}`);
}

function main(): void {
  const validSystems = new Set(MEDICAL_SYSTEMS.map(system => system.id));
  const raw = JSON.parse(
    readFileSync(resolve(layerDir, "layer.json"), "utf8")
  );
  const layer = globalLearningLayerSchema.parse(raw);

  const ids = layer.enhancements.map(entry => entry.id);
  if (new Set(ids).size !== ids.length) {
    throw new Error("Duplicate enhancement ids in layer.json");
  }
  for (const entry of layer.enhancements) {
    if (!validSystems.has(entry.medicalSystem)) {
      throw new Error(
        `Enhancement "${entry.id}" uses unknown medicalSystem "${entry.medicalSystem}"`
      );
    }
  }

  const records: SourceRecord[] = [
    ...loadSource("rosh", "client/public/content/summary-books/rosh-high-yield.json"),
    ...loadSource(
      "tintinalli",
      "client/public/content/summary-books/tintinalli-high-yield.json"
    ),
    ...loadSource(
      "rosen",
      "client/public/content/summary-books/rosen-high-yield.json"
    ),
  ];

  const mappings = layer.enhancements.map(entry => {
    const links = records
      .filter(
        record =>
          entry.sourceMapping.books.includes(record.source) &&
          matchesAliases(record.title, entry.sourceMapping.matchAliases)
      )
      .map(record => ({
        book: record.source,
        unitId: record.unitId,
        title: record.title,
        kind: record.kind,
      }));
    return {
      enhancementId: entry.id,
      topic: entry.topic,
      medicalSystem: entry.medicalSystem,
      linkCount: links.length,
      links,
    };
  });

  const unmapped = mappings.filter(entry => entry.linkCount === 0);
  for (const entry of mappings) {
    console.log(
      `${entry.enhancementId}: ${entry.linkCount} linked topics`
    );
  }
  if (unmapped.length > 0) {
    console.log(
      `Note: ${unmapped.length} enhancement(s) without a current book match (${unmapped.map(entry => entry.enhancementId).join(", ")}). They remain available for future books.`
    );
  }

  const byUnitId: Record<string, string[]> = {};
  for (const entry of mappings) {
    for (const link of entry.links) {
      const key = `${link.book}:${link.unitId}`;
      byUnitId[key] = [...(byUnitId[key] ?? []), entry.enhancementId];
    }
  }

  // Required directory views (projections of the single authored layer).
  writeJson(
    "algorithms/algorithms.json",
    layer.enhancements.map(entry => ({
      id: entry.id,
      topic: entry.topic,
      medicalSystem: entry.medicalSystem,
      algorithm: entry.algorithm,
      references: entry.references,
      status: entry.status,
    }))
  );
  writeJson(
    "exam-pearls/exam-pearls.json",
    layer.enhancements.map(entry => ({
      id: entry.id,
      topic: entry.topic,
      medicalSystem: entry.medicalSystem,
      examPearls: entry.examPearls,
      references: entry.references,
      status: entry.status,
    }))
  );
  writeJson(
    "tables/tables.json",
    layer.enhancements.map(entry => ({
      id: entry.id,
      topic: entry.topic,
      medicalSystem: entry.medicalSystem,
      tables: entry.tables,
      references: entry.references,
      status: entry.status,
    }))
  );
  writeJson("mappings/topic-mappings.json", {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    origin: layer.origin,
    mappings,
  });

  // Runtime index consumed by Learn readers (served as a static asset).
  const runtime = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    origin: layer.origin,
    provenance: layer.provenance,
    status: "under-review",
    enhancements: layer.enhancements.map(
      ({ sourceMapping: _omitted, ...entry }) => entry
    ),
    byUnitId,
  };
  const runtimePath = resolve(
    root,
    "client/public/content/global-enhancements-index.json"
  );
  const hadRuntime = existsSync(runtimePath);
  writeFileSync(runtimePath, `${JSON.stringify(runtime)}\n`);
  console.log(`${hadRuntime ? "Updated" : "Wrote"} ${runtimePath}`);
}

main();
