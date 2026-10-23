/**
 * Phase 4-E.2: Structured Content Mapping → TopicId.
 *
 * Deterministically joins the generated enhancement views
 * (`medical-content/emergency-medicine/{algorithms,exam-pearls,tables}/`)
 * with the curated canonical table (`knowledge-graph/topics.json`) through
 * the shared enhancement id. No guessing: every mapping traces
 * content ← enhancement ← curated topic, hence High confidence with method
 * "curated-enhancement-link". Emits:
 *   - medical-content/knowledge-graph/content-topic-mapping.json
 *   - updates medical-content/knowledge-graph/knowledge-graph-index.json
 *     (contents + BELONGS_TO relations only; questions stay empty).
 *
 * Forbidden here: new topics, registry edits, book/PDF/Qbank/Dashboard or
 * engine changes.
 *
 *   pnpm index:content-mapping
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const layerDir = resolve(root, "medical-content/emergency-medicine");
const kgDir = resolve(root, "medical-content/knowledge-graph");

interface LayerEntry {
  id: string;
  examPearls?: unknown[];
  tables?: unknown[];
}

interface CuratedTopic {
  enhancementId: string;
  topicId: string;
}

const slug = (value: string) =>
  value
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

function main(): void {
  const layer = JSON.parse(
    readFileSync(resolve(layerDir, "layer.json"), "utf8")
  ) as { enhancements?: LayerEntry[] };
  const curated = JSON.parse(
    readFileSync(resolve(kgDir, "topics.json"), "utf8")
  ) as { topics?: CuratedTopic[] };
  const topicByEnhancement = new Map(
    (curated.topics ?? []).map(topic => [topic.enhancementId, topic.topicId])
  );

  const mappings: Array<{
    contentId: string;
    contentType: string;
    topicId: string;
    mappingConfidence: string;
    mappingMethod: string;
    reviewStatus: string;
  }> = [];

  for (const entry of layer.enhancements ?? []) {
    const topicId = topicByEnhancement.get(entry.id);
    if (!topicId) {
      throw new Error(
        `Enhancement "${entry.id}" has no curated topicId; refusing to guess`
      );
    }
    const tag = slug(entry.id);
    mappings.push({
      contentId: `ALG_${tag}`,
      contentType: "algorithm",
      topicId,
      mappingConfidence: "High",
      mappingMethod: "curated-enhancement-link",
      reviewStatus: "mapped",
    });
    (entry.examPearls ?? []).forEach((_, index) => {
      mappings.push({
        contentId: `PEARL_${tag}_${String(index + 1).padStart(3, "0")}`,
        contentType: "examPearl",
        topicId,
        mappingConfidence: "High",
        mappingMethod: "curated-enhancement-link",
        reviewStatus: "mapped",
      });
    });
    (entry.tables ?? []).forEach((_, index) => {
      mappings.push({
        contentId: `TABLE_${tag}_${String(index + 1).padStart(3, "0")}`,
        contentType: "table",
        topicId,
        mappingConfidence: "High",
        mappingMethod: "curated-enhancement-link",
        reviewStatus: "mapped",
      });
    });
  }

  writeFileSync(
    resolve(kgDir, "content-topic-mapping.json"),
    `${JSON.stringify({ schemaVersion: 1, generatedAt: new Date().toISOString(), origin: "Deterministic Phase 4-E.2 join; no guessed mappings", mappings }, null, 2)}\n`
  );

  const contents = mappings.map(entry => ({
    contentId: entry.contentId,
    topicId: entry.topicId,
  }));
  const relations = mappings.map(entry => ({
    type: "BELONGS_TO",
    from: entry.contentId,
    to: entry.topicId,
  }));
  const indexPath = resolve(kgDir, "knowledge-graph-index.json");
  const index = JSON.parse(readFileSync(indexPath, "utf8")) as {
    topics: unknown[];
    sources: unknown[];
    questions: unknown[];
  };
  writeFileSync(
    indexPath,
    `${JSON.stringify({ schemaVersion: 1, generatedAt: new Date().toISOString(), origin: "Phase 4-E.2 populates contents + BELONGS_TO relations only; questions stay empty", topics: index.topics, sources: index.sources, contents, questions: index.questions, relations }, null, 2)}\n`
  );

  const byType = (type: string) =>
    mappings.filter(entry => entry.contentType === type).length;
  console.log(
    `Mappings: ${mappings.length} (algorithms ${byType("algorithm")}, pearls ${byType("examPearl")}, tables ${byType("table")}); High ${mappings.length}, Medium 0, Low 0, unmapped 0.`
  );
  console.log(`Wrote ${kgDir}`);
}

main();
