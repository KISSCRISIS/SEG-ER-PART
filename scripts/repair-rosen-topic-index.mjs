import fs from "node:fs/promises";
import path from "node:path";
const dir = path.resolve("SEG_CONTENT_LIBRARY", "02_PROCESSED_CONTENT", "ROSEN_BARKIN_5MIN");
const pages = (await fs.readFile(path.join(dir, "pages.jsonl"), "utf8")).split(/\r?\n/).filter(Boolean).map(JSON.parse);
const ignored = new Set(["BASICS", "DESCRIPTION", "ETIOLOGY", "PATHOPHYSIOLOGY", "PRESENTATION", "DIAGNOSIS", "DIAGNOSTIC STUDIES", "TREATMENT", "MANAGEMENT", "COMPLICATIONS", "FOLLOW-UP", "PEARLS", "REFERENCES", "CONTENTS", "PREFACE"]);
const found = new Map();
for (const page of pages) {
  const lines = String(page.text ?? "").split(/\r?\n/).map(line => line.replace(/[r•–—]/g, "").trim()).filter(Boolean);
  for (const line of lines) {
    const title = line.replace(/\s+/g, " ").trim();
    if (title.length < 5 || title.length > 90 || ignored.has(title)) continue;
    if (!/^[A-Z0-9][A-Z0-9 ,/&'().:+-]+$/.test(title)) continue;
    if (!/[A-Z]{3}/.test(title) || /^(P\d|LWBK|ISBN|CHAPTER|PAGE|ROSEN)/.test(title)) continue;
    if (!found.has(title)) found.set(title, page.pdfPage);
  }
}
const starts = [...found.entries()].sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]));
const topics = starts.map(([title, pdfStart], index) => ({ id: `rosen-5min-topic-${String(index + 1).padStart(4, "0")}`, title, pdfStart, pdfEnd: starts[index + 1]?.[1] ? starts[index + 1][1] - 1 : pages.length }));
const manifestPath = path.join(dir, "manifest.json");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
manifest.topics = topics;
manifest.topicIndexStatus = "ocr-heading-index-under-review";
manifest.topicIndexNote = "Generated from uppercase topic headings in extracted page text; verify against the printed topical table of contents.";
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
await fs.writeFile(path.join(dir, "topic-index.json"), JSON.stringify({ generatedAt: new Date().toISOString(), total: topics.length, topics }, null, 2));
console.log(`Indexed ${topics.length} Rosen topics from page headings`);
