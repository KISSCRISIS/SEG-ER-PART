/**
 * Phase 4-E.3: Book & Summary Mapping → TopicId.
 *
 * Regenerates `book-topic-mapping.json` in the mapping schema
 * ({sourceId, contentId, contentType, topicId, location, mappingConfidence,
 * mappingMethod, reviewStatus}) from the deterministic `topicId-map.json`
 * join, and extends the graph index with book CONTENT nodes plus
 * BELONGS_TO (content→topic) and CONTAINS (source→content) relations.
 *
 * Only topic-granular summary units are mapped. System-level chapters
 * (FRCEM/HIPPO), system-level/opaque Unified Guide units, Oxford (no units;
 * Qbank excluded this phase), and unmatched summaries stay unmapped —
 * never guessed. No new topics; registry, books, PDFs, Qbank, Dashboard,
 * and engine untouched.
 *
 *   pnpm index:book-mapping
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const kgDir = resolve(root, "medical-content/knowledge-graph");

const BOOK_SOURCE: Record<string, string> = {
  rosh: "rosh-summaries",
  tintinalli: "tintinalli-summaries",
  rosen: "rosen-summaries",
};

const CONTENT_TYPE: Record<string, string> = {
  rosh: "chapter",
  tintinalli: "chapter",
  rosen: "topic",
};

const SOURCE_FILES: Record<string, string> = {
  rosh: "client/public/content/summary-books/rosh-high-yield.json",
  tintinalli: "client/public/content/summary-books/tintinalli-high-yield.json",
  rosen: "client/public/content/summary-books/rosen-high-yield.json",
};

function main(): void {
  const mapFile = JSON.parse(
    readFileSync(resolve(kgDir, "topicId-map.json"), "utf8")
  ) as { map: Record<string, string> };

  const units = new Map<string, { title: string; pages?: { start: number; end: number } }>();
  for (const [book, file] of Object.entries(SOURCE_FILES)) {
    const data = JSON.parse(readFileSync(resolve(root, file), "utf8")) as {
      chapters?: Array<{
        unitId?: unknown;
        title?: unknown;
        pages?: { start?: unknown; end?: unknown };
      }>;
    };
    for (const record of data.chapters ?? []) {
      if (typeof record.unitId !== "string" || !record.unitId.trim()) continue;
      const pages =
        typeof record.pages?.start === "number" &&
        typeof record.pages?.end === "number"
          ? { start: record.pages.start, end: record.pages.end }
          : undefined;
      units.set(`${book}:${record.unitId.trim()}`, {
        title: typeof record.title === "string" ? record.title.trim() : "",
        pages,
      });
    }
  }

  const mappings = Object.entries(mapFile.map).map(([key, topicId]) => {
    const [book, ...rest] = key.split(":");
    const unitId = rest.join(":");
    const unit = units.get(key);
    if (!BOOK_SOURCE[book] || !unit) {
      throw new Error(`Unresolvable map key "${key}"; refusing to guess`);
    }
    return {
      sourceId: BOOK_SOURCE[book],
      contentId: unitId,
      contentType: CONTENT_TYPE[book],
      topicId,
      location: unit.pages
        ? `PDF pages ${unit.pages.start}–${unit.pages.end}`
        : "Chapter reference",
      mappingConfidence: "High",
      mappingMethod: "curated-enhancement-link",
      reviewStatus: "mapped",
    };
  });

  mappings.sort((a, b) =>
    `${a.sourceId}:${a.contentId}`.localeCompare(`${b.sourceId}:${b.contentId}`)
  );

  writeFileSync(
    resolve(kgDir, "book-topic-mapping.json"),
    `${JSON.stringify({ schemaVersion: 1, generatedAt: new Date().toISOString(), origin: "Phase 4-E.3 deterministic join over topicId-map.json; system-level and unmatched units excluded, never guessed", mappings }, null, 2)}\n`
  );

  const indexPath = resolve(kgDir, "knowledge-graph-index.json");
  // Deterministic rebuild (never additive): layer nodes come from the
  // 4-E.2 content mapping, book nodes from this run. Removed mappings
  // disappear from the index instead of lingering.
  const layerMapping = JSON.parse(
    readFileSync(resolve(kgDir, "content-topic-mapping.json"), "utf8")
  ) as {
    mappings: Array<{ contentId: string; topicId: string }>;
  };
  const contents: Array<{
    contentId: string;
    topicId: string;
    sourceId?: string;
  }> = layerMapping.mappings.map(entry => ({
    contentId: entry.contentId,
    topicId: entry.topicId,
  }));
  const relations: Array<{ type: string; from: string; to: string }> =
    layerMapping.mappings.map(entry => ({
      type: "BELONGS_TO",
      from: entry.contentId,
      to: entry.topicId,
    }));
  for (const entry of mappings) {
    contents.push({
      contentId: entry.contentId,
      topicId: entry.topicId,
      sourceId: entry.sourceId,
    });
    relations.push(
      { type: "BELONGS_TO", from: entry.contentId, to: entry.topicId },
      { type: "CONTAINS", from: entry.sourceId, to: entry.contentId }
    );
  }
  const index = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    origin:
      "Deterministic rebuild: layer CONTENT nodes plus book CONTENT nodes with BELONGS_TO + CONTAINS relations; questions stay empty",
    topics: [],
    sources: [],
    contents,
    questions: [],
    relations,
  };
  writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);

  const bySource = new Map<string, number>();
  for (const entry of mappings) {
    bySource.set(entry.sourceId, (bySource.get(entry.sourceId) ?? 0) + 1);
  }
  console.log(`Book mappings: ${mappings.length}`);
  for (const [source, count] of bySource) {
    console.log(`  ${source}: ${count}`);
  }
  console.log(
    `Index: ${index.contents.length} contents, ${index.relations.length} relations, ${(index.questions as unknown[]).length} questions.`
  );
  console.log(`Wrote ${kgDir}`);
}

main();
