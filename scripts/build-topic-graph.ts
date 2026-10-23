/**
 * Builds the Phase 4-D Content Intelligence Foundation.
 *
 * Joins the hand-curated canonical topic table
 * (`medical-content/knowledge-graph/topics.json`) with the resolved
 * global-layer mappings and emits:
 *   - medical-content/knowledge-graph/topic-registry.json
 *   - medical-content/knowledge-graph/topicId-map.json
 *   - medical-content/knowledge-graph/book-topic-mapping.json
 *
 * No book content is copied or edited; only identifiers are linked.
 * Board-body blueprint coverage is NOT claimed (see topics.json).
 *
 *   pnpm index:topic-graph
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { MEDICAL_SYSTEMS } from "../client/src/data/medical-systems";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const kgDir = resolve(root, "medical-content/knowledge-graph");
const layerDir = resolve(root, "medical-content/emergency-medicine");

const TOPIC_ID_PATTERN = /^EM_[A-Z]+_[A-Z0-9_]+$/;
const PRIORITIES = ["Very High", "High", "Medium", "Low"];

interface CuratedTopic {
  enhancementId: string;
  topicId: string;
  topicName: string;
  system: string;
  priority: string;
}

interface TopicLink {
  book: string;
  unitId: string;
  title: string;
  kind: string;
}

const SOURCE_TITLES: Record<string, string> = {
  rosh: "Rosh",
  tintinalli: "Tintinalli",
  rosen: "Rosen",
};

function main(): void {
  const validSystems = new Map(
    MEDICAL_SYSTEMS.map(system => [system.id, system.title])
  );
  const curated = JSON.parse(
    readFileSync(resolve(kgDir, "topics.json"), "utf8")
  ) as { topics?: CuratedTopic[] };
  const topics = curated.topics ?? [];

  const layer = JSON.parse(
    readFileSync(resolve(layerDir, "layer.json"), "utf8")
  ) as { enhancements?: Array<{ id: string }> };
  const enhancementIds = new Set(
    (layer.enhancements ?? []).map(entry => entry.id)
  );
  const mappings = JSON.parse(
    readFileSync(resolve(layerDir, "mappings/topic-mappings.json"), "utf8")
  ) as {
    mappings?: Array<{ enhancementId: string; links?: TopicLink[] }>;
  };
  const linksByEnhancement = new Map<string, TopicLink[]>(
    (mappings.mappings ?? []).map(entry => [
      entry.enhancementId,
      entry.links ?? [],
    ])
  );

  const seenTopicIds = new Set<string>();
  for (const topic of topics) {
    if (!enhancementIds.has(topic.enhancementId)) {
      console.warn(
        `Warning: enhancementId "${topic.enhancementId}" not in global layer — treating as proposal with no linked source`
      );
    }
    if (!validSystems.has(topic.system)) {
      throw new Error(
        `Unknown system "${topic.system}" for topic "${topic.topicId}"`
      );
    }
    if (!TOPIC_ID_PATTERN.test(topic.topicId)) {
      throw new Error(`Invalid topicId "${topic.topicId}"`);
    }
    if (seenTopicIds.has(topic.topicId)) {
      throw new Error(`Duplicate topicId "${topic.topicId}"`);
    }
    seenTopicIds.add(topic.topicId);
    if (!PRIORITIES.includes(topic.priority)) {
      throw new Error(`Invalid priority "${topic.priority}"`);
    }
  }

  const map: Record<string, string> = {};
  const registry = topics.map(topic => {
    const links = linksByEnhancement.get(topic.enhancementId) ?? [];
    const basis = Array.from(
      new Set(
        links.map(link => SOURCE_TITLES[link.book] ?? link.book)
      )
    ).sort();
    for (const link of links) {
      map[`${link.book}:${link.unitId}`] = topic.topicId;
    }
    return {
      topicId: topic.topicId,
      topicName: topic.topicName,
      system: validSystems.get(topic.system),
      systemId: topic.system,
      priority: topic.priority,
      blueprintWeight: { value: topic.priority, basis },
      status: "under-review",
    };
  });

  const bookMapping = topics.map(topic => {
    const links = linksByEnhancement.get(topic.enhancementId) ?? [];
    return {
      topicId: topic.topicId,
      topicName: topic.topicName,
      references: links.map(link => ({
        source: SOURCE_TITLES[link.book] ?? link.book,
        chapter: link.title,
        unitId: link.unitId,
        kind: link.kind,
      })),
    };
  });

  // Coverage accounting against the live summary sources.
  const sourceFiles: Record<string, string> = {
    rosh: "client/public/content/summary-books/rosh-high-yield.json",
    tintinalli:
      "client/public/content/summary-books/tintinalli-high-yield.json",
    rosen: "client/public/content/summary-books/rosen-high-yield.json",
  };
  const coverage: Record<string, { total: number; mapped: number }> = {};
  const unmapped: string[] = [];
  for (const [source, file] of Object.entries(sourceFiles)) {
    const data = JSON.parse(readFileSync(resolve(root, file), "utf8")) as {
      chapters?: Array<{ unitId?: unknown }>;
    };
    const chapters = data.chapters ?? [];
    let mapped = 0;
    for (const record of chapters) {
      const unitId =
        typeof record.unitId === "string" ? record.unitId.trim() : "";
      if (!unitId) continue;
      if (map[`${source}:${unitId}`]) mapped += 1;
      else unmapped.push(`${source}:${unitId}`);
    }
    coverage[source] = { total: chapters.length, mapped };
  }

  writeFileSync(
    resolve(kgDir, "topic-registry.json"),
    `${JSON.stringify({ schemaVersion: 1, generatedAt: new Date().toISOString(), origin: "SEG Phase 4-D Content Intelligence Foundation", topics: registry }, null, 2)}\n`
  );
  writeFileSync(
    resolve(kgDir, "topicId-map.json"),
    `${JSON.stringify({ schemaVersion: 1, generatedAt: new Date().toISOString(), origin: "Resolved global-layer mappings; unmapped source topics await Phase 4-E curation", map, coverage, unmapped }, null, 2)}\n`
  );
  writeFileSync(
    resolve(kgDir, "book-topic-mapping.json"),
    `${JSON.stringify({ schemaVersion: 1, generatedAt: new Date().toISOString(), origin: "Reference links only; no book content copied", mappings: bookMapping }, null, 2)}\n`
  );

  const totalMapped = Object.keys(map).length;
  const totalTopics = Object.values(coverage).reduce(
    (sum, entry) => sum + entry.total,
    0
  );
  console.log(
    `Registry: ${registry.length} canonical topics; map covers ${totalMapped}/${totalTopics} source topics.`
  );
  for (const [source, entry] of Object.entries(coverage)) {
    console.log(`  ${source}: ${entry.mapped}/${entry.total}`);
  }
  console.log(`Wrote ${kgDir}`);
}

main();
