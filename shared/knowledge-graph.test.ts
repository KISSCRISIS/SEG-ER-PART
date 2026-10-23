import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const kgDir = "medical-content/knowledge-graph";
const readJson = (name: string) =>
  JSON.parse(readFileSync(`${kgDir}/${name}`, "utf8"));

describe("knowledge graph foundation (Phase 4-E.1, schema only)", () => {
  it("defines the four required node types", () => {
    const schema = readJson("knowledge-graph.schema.json") as {
      $defs: Record<string, unknown>;
    };
    for (const node of [
      "TOPIC_NODE",
      "SOURCE_NODE",
      "CONTENT_NODE",
      "QUESTION_NODE",
    ]) {
      expect(schema.$defs[node]).toBeTruthy();
    }
  });

  it("allows exactly the four specified relation types", () => {
    const relations = readJson("knowledge-graph-relations.json") as {
      relations: Array<{ type: string; from: string; to: string[] }>;
    };
    expect(relations.relations.map(entry => entry.type).sort()).toEqual(
      ["CONTAINS", "HAS_CONTENT", "HAS_QUESTIONS", "HAS_SOURCE"].sort()
    );
    const byType = new Map(
      relations.relations.map(entry => [entry.type, entry])
    );
    expect(byType.get("HAS_CONTENT")?.from).toBe("TOPIC_NODE");
    expect(byType.get("HAS_SOURCE")?.to).toEqual(["Books"]);
    expect(byType.get("HAS_QUESTIONS")?.to).toEqual(["MCQ"]);
    expect(byType.get("CONTAINS")?.from).toBe("SOURCE_NODE");
  });

  it("keeps topics/sources empty while mappings populate contents and questions", () => {
    const index = readJson("knowledge-graph-index.json") as Record<
      string,
      Array<{ contentId?: string; questionId?: string; type?: string; from?: string; to?: string }>
    >;
    for (const key of ["topics", "sources"]) {
      expect(index[key]).toEqual([]);
    }
    expect(index.contents.length).toBeGreaterThan(0);
    expect(index.questions.length).toBeGreaterThan(0);
    const contentIds = new Set(
      index.contents.map(item => item.contentId)
    );
    const questionIds = new Set(
      index.questions.map(item => (item as Record<string, string>).questionId)
    );
    for (const relation of index.relations) {
      expect(["BELONGS_TO", "CONTAINS", "HAS_QUESTIONS"]).toContain(relation.type);
      if (relation.type === "HAS_QUESTIONS") {
        expect(questionIds.has(relation.to as string)).toBe(true);
      } else {
        expect(
          contentIds.has(relation.from) || contentIds.has(relation.to)
        ).toBe(true);
      }
    }
  });

  it("registers unique, well-formed, verified sources", () => {
    const registry = readJson("source-registry.json") as {
      sources: Array<{
        sourceId: string;
        name: string;
        category: string;
        availability: string;
        mappingDepth: string;
        sourceMaturity: string;
        notes: string;
        ref: string;
        records: number | null;
      }>;
    };
    const byId = new Map(
      registry.sources.map(entry => [entry.sourceId, entry])
    );
    expect(byId.size).toBe(registry.sources.length);
    for (const entry of registry.sources) {
      expect(entry.name.length).toBeGreaterThan(0);
      expect(entry.ref.length).toBeGreaterThan(0);
      expect([
        "summary",
        "study-book",
        "synthesis",
        "enhancement-layer",
        "qbank",
        "reference-pdf",
      ]).toContain(entry.category);
    }
    const qbankTotal = registry.sources
      .filter(entry => entry.category === "qbank")
      .reduce((sum, entry) => sum + (entry.records ?? 0), 0);
    expect(qbankTotal).toBe(14456);
  });

  it("applies the final approved maturity classification", () => {
    const registry = readJson("source-registry.json") as {
      sources: Array<{
        sourceId: string;
        sourceMaturity: string;
        notes: string;
      }>;
    };
    const byId = new Map(
      registry.sources.map(entry => [entry.sourceId, entry])
    );
    for (const entry of registry.sources) {
      expect(["FULL", "PARTIAL"]).toContain(entry.sourceMaturity);
      expect(entry.notes.length).toBeGreaterThan(0);
    }
    for (const id of [
      "tintinalli-summaries",
      "rosen-summaries",
      "rosh-summaries",
      "qbank-rosen-10e",
      "qbank-tintinalli-9e",
      "pdf-rosh-rotation-2019",
      "pdf-rosen-5min",
    ]) {
      expect(byId.get(id)?.sourceMaturity).toBe("FULL");
    }
    for (const id of [
      "frcem-study-book",
      "hippo-study-book",
      "seg-unified-guide",
      "global-learning-layer",
      "qbank-edic-sba-2026",
      "qbank-frcem",
      "qbank-hippo",
      "qbank-oxford-sce",
      "qbank-peer-physicians-case-series-2026",
      "qbank-peer-physicians-2026-unified",
      "qbank-rosh-initial-certification-2026",
      "pdf-oxford-essentials",
      "pdf-frcem-high-yield",
      "pdf-hippo-high-yield",
    ]) {
      expect(byId.get(id)?.sourceMaturity).toBe("PARTIAL");
    }
    expect(byId.get("rosh-summaries")?.notes).toMatch(/in-project/);
  });

  it("enforces mapping depth: partial sources contribute no unit mappings", () => {
    const registry = readJson("source-registry.json") as {
      sources: Array<{
        sourceId: string;
        category: string;
        mappingDepth: string;
        records: number | null;
      }>;
    };
    for (const entry of registry.sources) {
      expect(["full", "partial"]).toContain(entry.mappingDepth);
      if (entry.mappingDepth === "partial") {
        // Partial sources map available layers only: no addressable units.
        expect(entry.records).toBeNull();
      }
    }
    const map = readJson("topicId-map.json") as {
      map: Record<string, string>;
    };
    const partialIds = new Set(
      registry.sources
        .filter(entry => entry.mappingDepth === "partial")
        .map(entry => entry.sourceId)
    );
    for (const key of Object.keys(map.map)) {
      // Unit mappings may only come from full-depth unit namespaces;
      // partial (reference-only) sources contribute none.
      expect(key.startsWith("pdf-")).toBe(false);
      expect(partialIds.has(key.split(":")[0])).toBe(false);
    }
  });
});
