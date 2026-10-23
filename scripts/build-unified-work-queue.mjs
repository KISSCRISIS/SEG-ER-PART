import fs from "node:fs";
import path from "node:path";
const dir = "SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/SEG_UNIFIED_REVIEW_GUIDE";
const outline = JSON.parse(fs.readFileSync(path.join(dir, "outline.json"), "utf8"));
const excerpts = JSON.parse(fs.readFileSync(path.join(dir, "source-excerpts.json"), "utf8"));
const files = fs.readdirSync(dir).filter(name => /^summary(-batch-\d+)?\.json$/.test(name));
const summarized = new Set(files.flatMap(file => (JSON.parse(fs.readFileSync(path.join(dir, file), "utf8")).items ?? []).map(item => item.unitId)));
const excerptById = new Map(excerpts.units.map(unit => [unit.unitId, unit]));
const units = outline.chapters.filter(unit => !summarized.has(unit.id)).map((unit, index) => {
  const excerpt = excerptById.get(unit.id);
  return { order: index + 1, unitId: unit.id, title: unit.title, source: unit.source, sourcePages: unit.sourcePages, extractedCharacters: excerpt?.extractedCharacters ?? 0, priority: index < 40 ? "high" : index < 100 ? "medium" : "standard", status: "queued" };
});
const output = { generatedAt: new Date().toISOString(), totalRemaining: units.length, units };
fs.writeFileSync(path.join(dir, "summary-work-queue.json"), JSON.stringify(output, null, 2));
console.log(`Queued ${units.length} units for source-grounded editorial work.`);
