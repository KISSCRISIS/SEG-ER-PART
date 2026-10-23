/**
 * Builds the "Browse by Medical System" navigation index.
 *
 * Derived navigation data only: it groups existing summary topic titles by
 * medical system and records which topics already carry source-structured
 * algorithms, exam pearls, or tables. It never edits medical content.
 *
 * Regenerate after summary sources change:
 *   pnpm index:medical-systems
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  MEDICAL_SYSTEMS,
  systemForTopic,
  type IndexedSystemTopic,
  type MedicalSystemsIndex,
  type SummarySource,
} from "../client/src/data/medical-systems";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (relative: string) =>
  JSON.parse(readFileSync(resolve(root, relative), "utf8")) as {
    chapters?: Array<Record<string, unknown>>;
  };

const SOURCE_FILES: Array<{ source: SummarySource; file: string; href: string }> = [
  {
    source: "rosh",
    file: "client/public/content/summary-books/rosh-high-yield.json",
    href: "/learn/summaries/rosh-high-yield",
  },
  {
    source: "tintinalli",
    file: "client/public/content/summary-books/tintinalli-high-yield.json",
    href: "/learn/summaries/tintinalli-high-yield",
  },
  {
    source: "rosen",
    file: "client/public/content/summary-books/rosen-high-yield.json",
    href: "/learn/summaries/rosen-high-yield",
  },
];

const nonEmptyList = (value: unknown): boolean =>
  Array.isArray(value) && value.some(item => typeof item === "string" && item.trim());

const KIND_BY_SOURCE: Record<SummarySource, "chapter" | "topic"> = {
  rosh: "chapter",
  tintinalli: "chapter",
  rosen: "topic",
};

const textOf = (value: unknown): string =>
  typeof value === "string" ? value : "";

function main(): void {
  // Global enhancement layer: topics carrying a mapped enhancement expose
  // an algorithm, exam pearls, and tables through the layer.
  const mappingsPath = resolve(
    root,
    "medical-content/emergency-medicine/mappings/topic-mappings.json"
  );
  const enhanced = new Set<string>();
  if (existsSync(mappingsPath)) {
    const mappings = JSON.parse(readFileSync(mappingsPath, "utf8")) as {
      mappings?: Array<{
        links?: Array<{ book?: unknown; unitId?: unknown }>;
      }>;
    };
    for (const entry of mappings.mappings ?? []) {
      for (const link of entry.links ?? []) {
        if (typeof link.book === "string" && typeof link.unitId === "string") {
          enhanced.add(`${link.book}:${link.unitId}`);
        }
      }
    }
  } else {
    console.log(
      "Note: global-layer mappings not found; run pnpm index:global-layer first for enhancement flags."
    );
  }
  const buckets = new Map<string, IndexedSystemTopic[]>(
    MEDICAL_SYSTEMS.map(system => [system.id, []])
  );
  const sources = { rosh: 0, tintinalli: 0, rosen: 0 };

  for (const { source, file, href } of SOURCE_FILES) {
    const chapters = readJson(file).chapters ?? [];
    sources[source] = chapters.length;
    for (const record of chapters) {
      const unitId = textOf(record.unitId).trim();
      const title = textOf(record.title).trim();
      if (!unitId || !title) continue;
      const systemId = systemForTopic(source, textOf(record.title));
      const bucket = buckets.get(systemId);
      if (!bucket) {
        throw new Error(`Unknown medical system "${systemId}" for "${title}"`);
      }
      const hasAlgorithm =
        nonEmptyList(record.algorithms) || enhanced.has(`${source}:${unitId}`);
      const hasPearls =
        nonEmptyList(record.examPearls) ||
        nonEmptyList(record.examTraps) ||
        enhanced.has(`${source}:${unitId}`);
      const hasTables =
        nonEmptyList(record.tables) || enhanced.has(`${source}:${unitId}`);
      bucket.push({
        id: unitId,
        title,
        arabicTitle:
          typeof record.arabicTitle === "string" && record.arabicTitle.trim()
            ? record.arabicTitle.trim()
            : null,
        source,
        kind: KIND_BY_SOURCE[source],
        href: `${href}?chapter=${encodeURIComponent(unitId)}`,
        hasAlgorithm,
        hasPearls,
        hasTables,
      });
    }
  }

  const index: MedicalSystemsIndex = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    sources,
    systems: MEDICAL_SYSTEMS.map(system => {
      const topics = (buckets.get(system.id) ?? []).sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      const sourceCounts = (["rosh", "tintinalli", "rosen"] as const).map(
        source => {
          const items = topics.filter(topic => topic.source === source);
          return {
            source,
            topics: items.length,
            chapters: items.filter(topic => topic.kind === "chapter").length,
          };
        }
      );
      return {
        id: system.id,
        topicCount: topics.length,
        chapterCount: topics.filter(topic => topic.kind === "chapter").length,
        algorithmCount: topics.filter(topic => topic.hasAlgorithm).length,
        examPearlsCount: topics.filter(topic => topic.hasPearls).length,
        tablesCount: topics.filter(topic => topic.hasTables).length,
        sources: sourceCounts
          .filter(item => item.topics > 0)
          .map(item => item.source),
        sourceCounts: sourceCounts.filter(item => item.topics > 0),
        topics,
      };
    }),
  };

  const total = index.systems.reduce((sum, system) => sum + system.topicCount, 0);
  const expected = sources.rosh + sources.tintinalli + sources.rosen;
  if (total !== expected) {
    throw new Error(
      `Index covers ${total} topics but sources hold ${expected}; refusing to write a partial index.`
    );
  }

  const output = resolve(root, "client/public/content/medical-systems-index.json");
  writeFileSync(output, `${JSON.stringify(index)}\n`);
  for (const system of index.systems) {
    console.log(
      `${system.id}: ${system.topicCount} topics, ${system.algorithmCount} algorithms, ${system.examPearlsCount} pearls, ${system.tablesCount} tables`
    );
  }
  console.log(`Wrote ${output}`);
}

main();
