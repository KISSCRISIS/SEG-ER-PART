import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve("SEG_CONTENT_LIBRARY", "02_PROCESSED_CONTENT");
const guideDir = path.join(root, "SEG_UNIFIED_REVIEW_GUIDE");
const residentDir = path.join(root, "RESIDENT_EMERGENCY_MEDICINE");
const readJson = file => fs.readFile(file, "utf8").then(JSON.parse);
const isNonEmpty = value => Array.isArray(value) ? value.length > 0 : Boolean(String(value ?? "").trim());
const queue = (await readJson(path.join(guideDir, "summary-work-queue.json"))).units ?? [];
const summaryFiles = (await fs.readdir(guideDir)).filter(name => /^summary-batch-\d+\.json$/.test(name));
const summaries = (await Promise.all(summaryFiles.map(file => readJson(path.join(guideDir, file))))).flatMap(batch => batch.items ?? []);
const unifiedUnits = (await fs.readFile(path.join(guideDir, "unified-medical-units.jsonl"), "utf8")).split(/\r?\n/).filter(Boolean).map(JSON.parse);
const chapters = (await Promise.all(["frcem-study-book.json", "hippo-study-book.json"].map(file => readJson(path.join(residentDir, file))))).flat();
const required = ["highYieldSummary", "diagnosis", "management", "algorithms", "tables", "examPearls", "examTraps", "arabicExplanation", "references", "pages"];
const emptyByField = Object.fromEntries(required.map(field => [field, summaries.filter(item => !isNonEmpty(item[field])).length]));
const validPages = item => {
  const pages = item.pages ?? item.sourcePages;
  return pages && Number(pages.start) > 0 && Number(pages.end ?? pages.start) >= Number(pages.start);
};
const ids = summaries.map(item => item.unitId).filter(Boolean);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
const summaryIds = new Set(ids);
const matched = queue.filter(item => summaryIds.has(item.unitId)).length;
const report = {
  generatedAt: new Date().toISOString(),
  queueUnits: queue.length,
  summaryUnits: summaries.length,
  populatedUnifiedUnits: unifiedUnits.length,
  residentStudyChapters: chapters.length,
  queueSummaryMatched: matched,
  queueSummaryMissing: queue.length - matched,
  summariesWithValidPages: summaries.filter(validPages).length,
  duplicateSummaryIds: [...new Set(duplicateIds)],
  emptyRequiredFields: emptyByField,
  reviewStatuses: summaries.reduce((acc, item) => { const key = item.reviewStatus ?? item.status ?? "unknown"; acc[key] = (acc[key] ?? 0) + 1; return acc; }, {}),
  populatedUnifiedUnitFieldGaps: Object.fromEntries(required.map(field => [field, unifiedUnits.filter(item => !isNonEmpty(item[field])).length])),
  notes: [
    "The 204-unit queue is an extraction inventory; it is not evidence that 204 editorial summaries are complete.",
    "All medical summaries and chapters remain under review and are not board-accredited guidance.",
  ],
};
const markdown = `# Medical Content Full Audit\n\nGenerated: ${report.generatedAt}\n\n- Resident study chapters: **${report.residentStudyChapters}** (32 FRCEM, 18 HIPPO)\n- Unified editorial summaries: **${report.summaryUnits}**\n- Extraction work queue: **${report.queueUnits}**\n- Queue items matched to summaries by unit ID: **${report.queueSummaryMatched}**\n- Queue items without a matching summary: **${report.queueSummaryMissing}**\n- Summaries with valid page ranges: **${report.summariesWithValidPages}/${report.summaryUnits}**\n- Duplicate summary IDs: **${report.duplicateSummaryIds.length}**\n\n## Required field gaps in the ${report.summaryUnits} existing summaries\n\n| Field | Empty records |\n| --- | ---: |\n${required.map(field => `| ${field} | ${emptyByField[field]} |`).join("\n")}\n\n## Review status\n\n${Object.entries(report.reviewStatuses).map(([key, value]) => `- ${key}: ${value}`).join("\n")}\n\n## Interpretation\n\nThe current library contains 50 populated resident study chapters and 45 structured summary records, while 204 additional units remain in the extraction/editorial queue. Empty structured fields and missing page mappings are recorded rather than filled with invented medical content. All content remains \`UNDER_REVIEW\`.\n`;
const outDir = path.resolve("reports", "medical-content");
await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(path.join(outDir, "full-audit.json"), JSON.stringify(report, null, 2));
await fs.writeFile(path.join(outDir, "full-audit.md"), markdown);
console.log(JSON.stringify(report));
