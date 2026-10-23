import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildRosenSummaries } from "./lib/rosen-summaries.mjs";

const dir = "SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/ROSEN_BARKIN_5MIN/";
const manifest = JSON.parse(readFileSync(`${dir}manifest.json`, "utf8"));
const pages = readFileSync(`${dir}pages.jsonl`, "utf8").split(/\r?\n/).filter(Boolean).map(line => JSON.parse(line));
const editorial = JSON.parse(readFileSync(`${dir}editorial-translations.json`, "utf8"));
const result = buildRosenSummaries(manifest, pages, editorial);

describe("Rosen source-grounded bilingual summaries", () => {
  it("groups source chapter IDs, including letter suffixes, rather than uppercase headings", () => {
    expect(result.total).toBe(626);
    expect(result.chapters[0].title).toBe("ABDOMINAL AORTIC ANEURYSM");
    expect(result.chapters[0].pages).toEqual({ start: 54, end: 55 });
    expect(result.chapters[0].printedPages).toEqual({ start: 2, end: 3 });
    expect(result.chapters.some(t => t.sourceChapterId === "ch230a")).toBe(true);
    expect(result.chapters.some(t => /5TH EDITION|CONTRIBUTORS|DIAGNOSIS TESTS/.test(t.title))).toBe(false);
    expect(result.audit.sourcePagesIndexed).toBe(1255);
  });
  it("keeps stable legacy IDs and valid non-overlapping page ranges", () => {
    expect(result.chapters[0].unitId).toBe("rosen-5min-topic-0028");
    expect(result.chapters[0].legacyAliases).toContain("rosen-5min-topic-0035");
    expect(new Set(result.chapters.map(t => t.unitId)).size).toBe(result.total);
    result.chapters.forEach((topic, index) => {
      expect(topic.pages.end).toBeGreaterThanOrEqual(topic.pages.start);
      if (index) expect(topic.pages.start).toBeGreaterThan(result.chapters[index - 1].pages.end);
      expect(topic.provenance.sourceSha256).toBe(manifest.sha256);
      expect(topic.reviewStatus).toBe("UNDER_REVIEW");
    });
  });
  it("keeps every indexed topic source-grounded and explicitly translation-reviewed", () => {
    expect(result.audit.bilingualDrafts).toBe(6);
    expect(result.audit.machineTranslatedUnderReview).toBe(620);
    expect(result.audit.translatedSummaries).toBe(626);
    expect(result.audit.pendingEditorial).toBe(0);
    for (const topic of result.chapters) {
      expect(["bilingual-draft", "machine-translated-under-review"]).toContain(topic.editorialStatus);
      expect(topic.arabicTranslation).not.toBeNull();
      expect(topic.arabicTranslation.summary).toHaveLength(topic.highYieldSummary.length);
      expect(topic.arabicTranslation.diagnosis).toHaveLength(topic.diagnosis.length);
      expect(topic.arabicTranslation.management).toHaveLength(topic.management.length);
      expect(topic.arabicExplanation).toHaveLength(3);
      expect(topic.arabicExplanation.join(" ")).toMatch(/[\u0600-\u06ff]/);
      expect(JSON.stringify(topic)).not.toMatch(/OSO\/OVY|requires editorial extraction|يحتاج الشرح العربي التفصيلي/);
    }
  });
  it("rejects edited content tied to the wrong book or page range", () => {
    expect(() => buildRosenSummaries(manifest, pages, { ...editorial, sourceSha256: "wrong" })).toThrow(/fingerprint/);
    const bad = structuredClone(editorial);
    bad.chapters["001"].pdfPages.start = 1;
    expect(() => buildRosenSummaries(manifest, pages, bad)).toThrow(/mismatch/);
  });
  it("reproduces the shipped file and keeps the previous OCR drafts", () => {
    expect(result).toEqual(JSON.parse(readFileSync("client/public/content/summary-books/rosen-high-yield.json", "utf8")));
    expect(JSON.parse(readFileSync(`${dir}topic-summaries.legacy-ocr.json`, "utf8")).chapters).toHaveLength(859);
  });
});
