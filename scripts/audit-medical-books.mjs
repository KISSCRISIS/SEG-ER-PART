import fs from "node:fs/promises";
import path from "node:path";

const base = path.resolve("SEG_CONTENT_LIBRARY", "02_PROCESSED_CONTENT");
const books = [
  ["TINTINALLI_MANUAL_8E", "manifest.json"],
  ["ROSH_ROTATION_2019", "manifest.json"],
  ["ROSEN_BARKIN_5MIN", "manifest.json"],
];
const result = [];
for (const [folder, manifestFile] of books) {
  const dir = path.join(base, folder);
  const manifest = JSON.parse(await fs.readFile(path.join(dir, manifestFile), "utf8"));
  const pages = (await fs.readFile(path.join(dir, "pages.jsonl"), "utf8"))
    .split(/\r?\n/).filter(Boolean).map(JSON.parse);
  const lengths = pages.map(page => String(page.text ?? "").trim().length);
  result.push({
    id: manifest.id, title: manifest.title, edition: manifest.edition, year: manifest.year,
    declaredPages: manifest.pages, extractedPages: pages.length,
    pageCountDelta: pages.length - Number(manifest.pages ?? pages.length),
    emptyPages: lengths.filter(length => length === 0).length,
    shortPagesUnder500Chars: lengths.filter(length => length < 500).length,
    chaptersOrTopics: (manifest.chapters ?? manifest.topics ?? []).length,
    expectedChapters: manifest.expectedChapters ?? null,
    detectedChapters: manifest.detectedChapters ?? null,
    validSha256: /^[a-f0-9]{64}$/i.test(manifest.sha256 ?? ""),
    status: manifest.status,
    jordanBoardApproval: manifest.jordanBoardApproval,
    summaryStatus: manifest.summaryStatus ?? "not-declared",
    source: manifest.source,
    excludedFrontMatterPages: manifest.id === "rosh-rotation-2019" ? "1-10" : manifest.id === "tintinalli-manual-8e" ? "1-19" : null,
  });
}
const report = { generatedAt: new Date().toISOString(), books: result, notes: [
  "Extracted page text is preserved source material, not a clinical summary.",
  "All books remain under-review and Jordanian Board approval is not verified.",
  "Rosh summary chapters use the intake chapter boundaries (PDF pages 11–555); front matter pages 1–10 is excluded from chapter content.",
  "Tintinalli summary chapters use the intake chapter boundaries (PDF pages 20 onward); notice, contributors and preface pages 1–19 is excluded from chapter content.",
  "Rosen & Barkin source summaries use embedded chapter XML identifiers; the legacy OCR heading index (859 headings) is retained only for traceability and is not presented as 859 medical summaries.",
]};
const out = path.resolve("reports", "medical-books");
await fs.mkdir(out, { recursive: true });
await fs.writeFile(path.join(out, "full-audit.json"), JSON.stringify(report, null, 2));
const md = [`# Medical Books Audit`, ``, `Generated: ${report.generatedAt}`, ``, `| Book | Declared pages | Extracted pages | Empty pages | <500 chars | Chapters/topics | Status |`, `| --- | ---: | ---: | ---: | ---: | ---: | --- |`, ...result.map(book => `| ${book.title} | ${book.declaredPages} | ${book.extractedPages} | ${book.emptyPages} | ${book.shortPagesUnder500Chars} | ${book.chaptersOrTopics} | ${book.status} |`), ``, `## Findings`, ``, ...report.notes.map(note => `- ${note}`), ``].join("\n");
await fs.writeFile(path.join(out, "full-audit.md"), md);
console.log(JSON.stringify(report));
