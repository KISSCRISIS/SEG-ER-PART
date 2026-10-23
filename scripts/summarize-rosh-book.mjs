import fs from "node:fs/promises";
import path from "node:path";
import { arabicEditorialStatus, cleanSourceText, extractSourceSection } from "./lib/source-summary.mjs";
const dir = path.resolve("SEG_CONTENT_LIBRARY", "02_PROCESSED_CONTENT", "ROSH_ROTATION_2019");
const manifest = JSON.parse(await fs.readFile(path.join(dir, "manifest.json"), "utf8"));
const pages = (await fs.readFile(path.join(dir, "pages.jsonl"), "utf8")).split(/\r?\n/).filter(Boolean).map(JSON.parse);
const editorial = JSON.parse(await fs.readFile(path.join(dir, "editorial-translations.json"), "utf8"));
const summaries = manifest.chapters.map(chapter => {
  const selected = pages.filter(page => page.pdfPage >= chapter.pdfStart && page.pdfPage <= chapter.pdfEnd);
  // Rosh reserves the first two pages of each chapter for its title and contents.
  const contentPages = selected.slice(2);
  const text = contentPages.map(page => page.text).join("\n");
  const overview = cleanSourceText(text, 1800);
  const diagnosis = extractSourceSection(text, [/DIAGNOSTIC STUDIES/i, /DIAGNOSIS/i, /EVALUATION/i]);
  const management = extractSourceSection(text, [/MANAGEMENT/i, /TREATMENT/i, /THERAPY/i]);
  const arabic = arabicEditorialStatus(manifest.title);
  const title = chapter.title;
  const edited = editorial.chapters[chapter.id.split("-").at(-1)];
  const arabicText = edited
    ? ["الترجمة العربية للملخص:", ...edited.translation.summary, "التشخيص والتقييم:", ...edited.translation.diagnosis, "التدبير:", ...edited.translation.management, "شرح مبسط لفهم الموضوع:", ...edited.explanation].join("\n\n")
    : arabic.message;
  return {
    unitId: chapter.id,
    title,
    source: manifest.title,
    edition: manifest.edition,
    highYieldSummary: overview ? [overview] : [],
    diagnosis: diagnosis ? [diagnosis] : [],
    management: management ? [management] : [],
    algorithms: [], tables: [], examPearls: [], examTraps: [],
    arabicExplanation: arabicText,
    arabicExplanationStatus: edited ? "bilingual-draft" : arabic.status,
    arabicTranslation: edited?.translation ?? null,
    references: [{ source: manifest.title, edition: manifest.edition, pages: { start: chapter.pdfStart, end: chapter.pdfEnd } }],
    pages: { start: chapter.pdfStart, end: chapter.pdfEnd },
    provenance: { sourceId: manifest.id, sourceSha256: manifest.sha256, extractedPages: selected.length, contentPages: contentPages.length, excludedChapterFrontMatter: 2 },
    reviewStatus: "UNDER_REVIEW",
    clinicalReview: "pending",
  };
});
const output = { schemaVersion: 2, generatedAt: new Date().toISOString(), book: manifest.id, total: summaries.length, bilingualDrafts: summaries.filter(item => item.arabicExplanationStatus === "bilingual-draft").length, status: "UNDER_REVIEW", chapters: summaries, editorialNote: "Chapter boundaries are supplied by the source intake manifest. Front matter pages 1–10 are excluded from summaries; copyright and repeated running headers are removed from excerpts." };
await fs.writeFile(path.join(dir, "chapter-summaries.json"), JSON.stringify(output, null, 2));
await fs.writeFile(path.resolve("client/public/content/summary-books/rosh-high-yield.json"), JSON.stringify(output, null, 2));
console.log(`Created ${summaries.length} Rosh chapter summaries`);
