import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const load = (name: string) => JSON.parse(readFileSync(`client/public/content/summary-books/${name}.json`, "utf8"));

describe("source summary intake", () => {
  it("does not expose Rosh author/front-matter pages as chapters", () => {
    const data = load("rosh-high-yield");
    expect(data.total).toBe(12);
    expect(data.chapters[0].pages.start).toBe(11);
    expect(data.chapters.every((chapter: { title: string }) => !/Yehuda|Kristian|©|author/i.test(chapter.title))).toBe(true);
    expect(data.chapters[0].provenance.excludedChapterFrontMatter).toBe(2);
  });
  it("does not expose Tintinalli contributors, notice or preface", () => {
    const data = load("tintinalli-high-yield");
    expect(data.total).toBe(189);
    expect(data.chapters[0].pages.start).toBe(20);
    expect(data.chapters[0].title).toBe("Advanced Airway Support");
    expect(data.chapters.every((chapter: { title: string }) => !/Contributor|Notice|Preface|Rita K\. Cydulka/i.test(chapter.title))).toBe(true);
    expect(data.editorialNote).toMatch(/1–19/);
  });
  it("keeps Arabic translation status explicit and complete", () => {
    const rosh = load("rosh-high-yield");
    expect(rosh.chapters.every((chapter: { arabicExplanationStatus: string; arabicExplanation: string }) => chapter.arabicExplanationStatus === "bilingual-draft" && chapter.arabicExplanation.includes("الترجمة العربية"))).toBe(true);
    const tintinalli = load("tintinalli-high-yield");
    expect(tintinalli.chapters.every((chapter: { arabicExplanationStatus: string; arabicExplanation: string }) => chapter.arabicExplanationStatus === "machine-translated-under-review" && /[\u0600-\u06ff]/.test(chapter.arabicExplanation))).toBe(true);
    const rosen = load("rosen-high-yield");
    expect(rosen.total).toBe(626);
    expect(rosen.audit.pendingEditorial).toBe(0);
    expect(rosen.chapters.every((chapter: { arabicTranslation: { summary: string[]; diagnosis: string[]; management: string[] } | null; arabicExplanation: string[] }) =>
      chapter.arabicTranslation !== null &&
      chapter.arabicTranslation.summary.every(text => /[\u0600-\u06ff]/.test(text)) &&
      chapter.arabicTranslation.diagnosis.every(text => /[\u0600-\u06ff]/.test(text)) &&
      chapter.arabicTranslation.management.every(text => /[\u0600-\u06ff]/.test(text)) &&
      chapter.arabicExplanation.every(text => /[\u0600-\u06ff]/.test(text))
    )).toBe(true);
  });
});
