import fs from "node:fs";
import path from "node:path";
const dir = "SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/SEG_UNIFIED_REVIEW_GUIDE";
const norm = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g, "");
const outline = JSON.parse(fs.readFileSync(path.join(dir, "outline.json"), "utf8"));
const files = fs.readdirSync(dir).filter(name => /^summary(-batch-\d+)?\.json$/.test(name));
const summaries = files.flatMap(file => (JSON.parse(fs.readFileSync(path.join(dir, file), "utf8")).items ?? []).map(item => ({ ...item, file })));
const matched = []; const unmatched = [];
for (const item of summaries) {
  const key = norm(item.title);
  const hit = outline.chapters.find(unit => { const u = norm(unit.title); return u === key || (u.length > 12 && (u.includes(key) || key.includes(u))); });
  (hit ? matched : unmatched).push({ summaryId: item.unitId, title: item.title, outlineId: hit?.id ?? null, file: item.file });
}
const report = { generatedAt: new Date().toISOString(), summaryRecords: summaries.length, matched: matched.length, unmatched: unmatched.length, matchedRecords: matched, unmatchedRecords: unmatched };
fs.writeFileSync(path.join(dir, "summary-id-reconciliation.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ summaryRecords: summaries.length, matched: matched.length, unmatched: unmatched.length }));
