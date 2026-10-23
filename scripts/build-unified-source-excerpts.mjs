import fs from "node:fs";
import path from "node:path";

const root = "SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT";
const outline = JSON.parse(fs.readFileSync(path.join(root, "SEG_UNIFIED_REVIEW_GUIDE/outline.json"), "utf8"));
const sources = {
  "tintinalli-manual-8e": "TINTINALLI_MANUAL_8E",
  "rosen-barkin-5min": "ROSEN_BARKIN_5MIN",
  "rosh-rotation-2019": "ROSH_ROTATION_2019",
};
const pagesBySource = new Map();
for (const [sourceId, folder] of Object.entries(sources)) {
  const file = path.join(root, folder, "pages.jsonl");
  if (!fs.existsSync(file)) continue;
  const pages = fs.readFileSync(file, "utf8").split(/\r?\n/).filter(Boolean).map(line => JSON.parse(line));
  pagesBySource.set(sourceId, pages);
}
const excerpts = outline.chapters.map(unit => {
  const pages = pagesBySource.get(unit.sourceId) ?? [];
  const start = unit.sourcePages?.start ?? 0;
  const end = unit.sourcePages?.end ?? start;
  const text = pages.filter(page => page.pdfPage >= start && page.pdfPage <= end).map(page => page.text).join("\n").trim();
  return { unitId: unit.id, sourceId: unit.sourceId, title: unit.title, sourcePages: unit.sourcePages, extractedCharacters: text.length, text };
});
const out = path.join(root, "SEG_UNIFIED_REVIEW_GUIDE/source-excerpts.json");
fs.writeFileSync(out, JSON.stringify({ generatedAt: new Date().toISOString(), units: excerpts }, null, 2));
console.log(`Wrote ${excerpts.length} source excerpts to ${out}`);
