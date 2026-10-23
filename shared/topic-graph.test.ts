import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  algorithmMetadataSchema,
  bookTopicMappingSchema,
  contentTopicMappingSchema,
  examPearlMetadataSchema,
  graphIndexSchema,
  mcqMetadataSchema,
  tableMetadataSchema,
  topicIdMapSchema,
  topicRegistrySchema,
} from "./topic-graph";

const kgDir = "medical-content/knowledge-graph";
const readJson = (name: string) =>
  JSON.parse(readFileSync(`${kgDir}/${name}`, "utf8"));

describe("topic graph foundation (Phase 4-D)", () => {
  it("registers unique canonical topics with valid systems", () => {
    const registry = topicRegistrySchema.parse(
      readJson("topic-registry.json")
    );
    const ids = registry.topics.map(topic => topic.topicId);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain("EM_CARDIO_ACS");
    for (const topic of registry.topics) {
      expect(topic.status).toBe("under-review");
    }
  });

  it("resolves every map and book reference to a registered topicId", () => {
    const registry = topicRegistrySchema.parse(
      readJson("topic-registry.json")
    );
    const valid = new Set(registry.topics.map(topic => topic.topicId));
    const map = topicIdMapSchema.parse(readJson("topicId-map.json"));
    for (const topicId of Object.values(map.map)) {
      expect(valid.has(topicId)).toBe(true);
    }
    const counted = Object.values(map.coverage).reduce(
      (sum, entry) => sum + entry.mapped,
      0
    );
    expect(counted).toBe(Object.keys(map.map).length);
    const bookMapping = bookTopicMappingSchema.parse(
      readJson("book-topic-mapping.json")
    );
    for (const entry of bookMapping.mappings) {
      expect(valid.has(entry.topicId)).toBe(true);
    }
    // No book content is duplicated into the graph: identifiers only.
    for (const entry of bookMapping.mappings) {
      expect(entry.contentId.length).toBeGreaterThan(0);
      expect(entry.location.length).toBeGreaterThan(0);
    }
  });

  it("accepts the documented metadata examples", () => {
    expect(
      mcqMetadataSchema.parse({
        questionId: "Q_ACS_001",
        topicId: "EM_CARDIO_ACS",
        source: "PEER",
        difficulty: "Medium",
        boardRelevance: "High",
        errorClassification: null,
      }).topicId
    ).toBe("EM_CARDIO_ACS");
    expect(
      algorithmMetadataSchema.parse({
        algorithmId: "ALG_STEMI",
        topicId: "EM_CARDIO_ACS",
        type: "Management Algorithm",
        priority: "High",
      }).algorithmId
    ).toBe("ALG_STEMI");
    expect(
      examPearlMetadataSchema.parse({
        pearlId: "PEARL_ACS_001",
        topicId: "EM_CARDIO_ACS",
        category: "Management",
        importance: "High",
      }).pearlId
    ).toBe("PEARL_ACS_001");
    expect(
      tableMetadataSchema.parse({
        tableId: "TABLE_ACS_001",
        topicId: "EM_CARDIO_ACS",
        type: "Comparison Table",
      }).tableId
    ).toBe("TABLE_ACS_001");
  });

  it("rejects malformed topicIds (registry membership is enforced on generated files above)", () => {
    expect(() =>
      mcqMetadataSchema.parse({
        questionId: "Q_X_1",
        topicId: "acs-001",
        source: "PEER",
      })
    ).toThrow();
  });

  it("maps every structured content node to a registered topic (Phase 4-E.2)", () => {
    const registry = topicRegistrySchema.parse(
      readJson("topic-registry.json")
    );
    const valid = new Set(registry.topics.map(topic => topic.topicId));
    const mapping = contentTopicMappingSchema.parse(
      readJson("content-topic-mapping.json")
    );
    expect(mapping.mappings).toHaveLength(95);
    const ids = mapping.mappings.map(entry => entry.contentId);
    expect(new Set(ids).size).toBe(ids.length);
    for (const entry of mapping.mappings) {
      expect(valid.has(entry.topicId)).toBe(true);
      expect(entry.mappingConfidence).toBe("High");
    }
  });

  it("maps books and summaries to registered topics (Phase 4-E.3)", () => {
    const registry = topicRegistrySchema.parse(
      readJson("topic-registry.json")
    );
    const valid = new Set(registry.topics.map(topic => topic.topicId));
    const sources = new Set(
      (
        readJson("source-registry.json") as {
          sources: Array<{ sourceId: string }>;
        }
      ).sources.map(entry => entry.sourceId)
    );
    const bookMapping = bookTopicMappingSchema.parse(
      readJson("book-topic-mapping.json")
    );
    const ids = bookMapping.mappings.map(entry => entry.contentId);
    expect(new Set(ids).size).toBe(ids.length);
    for (const entry of bookMapping.mappings) {
      expect(valid.has(entry.topicId)).toBe(true);
      expect(sources.has(entry.sourceId)).toBe(true);
      expect(entry.location.length).toBeGreaterThan(0);
    }
    const counted = new Map<string, number>();
    for (const entry of bookMapping.mappings) {
      counted.set(
        entry.sourceId,
        (counted.get(entry.sourceId) ?? 0) + 1
      );
    }
    expect(counted.get("rosen-summaries")).toBe(50);
    expect(counted.get("rosh-summaries") ?? 0).toBe(0);
    expect(counted.get("tintinalli-summaries")).toBe(25);
  });

  it("indexes book contents with BELONGS_TO and CONTAINS relations", () => {
    const registry = topicRegistrySchema.parse(
      readJson("topic-registry.json")
    );
    const valid = new Set(registry.topics.map(topic => topic.topicId));
    const sources = new Set(
      (
        readJson("source-registry.json") as {
          sources: Array<{ sourceId: string }>;
        }
      ).sources.map(entry => entry.sourceId)
    );
    const index = graphIndexSchema.parse(
      readJson("knowledge-graph-index.json")
    );
    expect(index.topics).toEqual([]);
    expect(index.sources).toEqual([]);
    // After 4-E.4-B, questions are populated for mapped Qbank items
    expect(index.questions.length).toBeGreaterThan(0);
    const contentIds = new Set(
      index.contents.map(item => item.contentId)
    );
    const questionIds = new Set(
      (index.questions as Array<{ questionId: string }>).map(
        item => item.questionId
      )
    );
    let belongsTo = 0;
    let contains = 0;
    let hasQuestions = 0;
    for (const relation of index.relations) {
      if (relation.type === "BELONGS_TO") {
        belongsTo += 1;
        expect(contentIds.has(relation.from)).toBe(true);
        expect(valid.has(relation.to)).toBe(true);
      } else if (relation.type === "CONTAINS") {
        contains += 1;
        expect(sources.has(relation.from)).toBe(true);
        expect(contentIds.has(relation.to)).toBe(true);
      } else if (relation.type === "HAS_QUESTIONS") {
        hasQuestions += 1;
        expect(valid.has(relation.from)).toBe(true);
        expect(questionIds.has(relation.to)).toBe(true);
      } else {
        throw new Error(`Unexpected relation type ${relation.type}`);
      }
    }
    expect(belongsTo).toBeGreaterThan(0);
    expect(contains).toBeGreaterThan(0);
    expect(hasQuestions).toBeGreaterThan(0);
  });
});
