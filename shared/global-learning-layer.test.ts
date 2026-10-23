import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { globalLearningLayerSchema } from "./global-learning-layer";

const layer = JSON.parse(
  readFileSync("medical-content/emergency-medicine/layer.json", "utf8")
);

describe("global study-enhancement layer", () => {
  it("conforms to the SEG content schema with review status", () => {
    const parsed = globalLearningLayerSchema.parse(layer);
    expect(parsed.schemaVersion).toBe(1);
    expect(parsed.enhancements.length).toBeGreaterThan(0);
    for (const entry of parsed.enhancements) {
      expect(entry.status).toBe("under-review");
      expect(entry.references[0]).toContain(
        "SEG Emergency Medicine Master Library"
      );
    }
  });

  it("uses unique ids and complete algorithm/pearl/table content", () => {
    const parsed = globalLearningLayerSchema.parse(layer);
    const ids = parsed.enhancements.map(entry => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const entry of parsed.enhancements) {
      expect(entry.algorithm.steps.length).toBeGreaterThan(0);
      expect(entry.examPearls.length).toBeGreaterThan(0);
      expect(entry.tables.length).toBeGreaterThan(0);
      for (const table of entry.tables) {
        expect(table.headers.length).toBeGreaterThan(0);
      }
      expect(entry.sourceMapping.books.length).toBeGreaterThan(0);
      expect(entry.sourceMapping.matchAliases.length).toBeGreaterThan(0);
    }
  });
});
