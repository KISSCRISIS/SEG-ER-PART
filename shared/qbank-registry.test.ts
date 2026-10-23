import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const reg = JSON.parse(
  readFileSync(
    "medical-content/emergency-board/knowledge-graph/qbank-registry.json",
    "utf8"
  )
) as {
  qbankSources: Array<{
    questionSourceId: string;
    totalQuestions: number;
    availableMetadata: Record<string, unknown>;
    chapterInformation: { distinctChapters: number };
    mappingReadiness: string;
  }>;
  totals: { sources: number; questions: number };
};

describe("qbank registry (Phase 4-E.4-A, normalization only)", () => {
  it("inventories all nine banks with exact totals and required metadata", () => {
    expect(reg.qbankSources).toHaveLength(9);
    expect(reg.totals).toEqual({ sources: 9, questions: 14456 });
    const byId = new Map(
      reg.qbankSources.map(entry => [entry.questionSourceId, entry])
    );
    expect(byId.get("qbank-edic-sba-2026")?.totalQuestions).toBe(995);
    expect(byId.get("qbank-frcem")?.totalQuestions).toBe(1529);
    expect(byId.get("qbank-hippo")?.totalQuestions).toBe(1927);
    expect(byId.get("qbank-tintinalli-9e")?.totalQuestions).toBe(756);
    expect(byId.get("qbank-rosen-10e")?.totalQuestions).toBe(1044);
    expect(byId.get("qbank-rosh-initial-certification-2026")?.totalQuestions).toBe(5025);
    expect(byId.get("qbank-oxford-sce")?.totalQuestions).toBe(356);
    expect(
      byId.get("qbank-peer-physicians-case-series-2026")?.totalQuestions
    ).toBe(685);
    expect(
      byId.get("qbank-peer-physicians-2026-unified")?.totalQuestions
    ).toBe(2139);
    for (const entry of reg.qbankSources) {
      expect(entry.availableMetadata).toBeTruthy();
      expect(entry.chapterInformation.distinctChapters).toBeGreaterThan(0);
      expect(entry.mappingReadiness.length).toBeGreaterThan(0);
      expect(entry.mappingReadiness).not.toMatch(/topicId.*assigned/i);
    }
  });

  it("reports no assigned topicIds and documents the answer-key quality gate", () => {
    const raw = readFileSync(
      "medical-content/emergency-board/knowledge-graph/qbank-registry.json",
      "utf8"
    );
    expect(raw.toLowerCase()).not.toContain('"topicid"');
    const invariants = (reg as unknown as { invariants: string }).invariants;
    expect(invariants).toContain("176 previously malformed records");
    expect(invariants).toContain("13,425 questions");
  });
});
