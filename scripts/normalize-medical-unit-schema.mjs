import fs from "node:fs";
import path from "node:path";
const dir = "SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/SEG_UNIFIED_REVIEW_GUIDE";
const files = fs.readdirSync(dir).filter(name => /^summary(-batch-\d+)?\.json$/.test(name));
for (const file of files) {
  const full = path.join(dir, file); const data = JSON.parse(fs.readFileSync(full, "utf8"));
  data.items = (data.items ?? []).map(item => ({
    unitId: item.unitId, title: item.title, source: item.source, sourcePages: item.sourcePages ?? { start: 0, end: 0 },
    highYieldSummary: item.highYieldSummary ?? item.summary ?? [], diagnosis: item.diagnosis ?? [], management: item.management ?? [], algorithms: item.algorithms ?? [], tables: item.tables ?? [],
    examPearls: item.examPearls ?? [], examTraps: item.examTraps ?? [], arabicExplanation: item.arabicExplanation ?? "بانتظار التحرير العربي المبسط.", references: item.references ?? [item.source], pages: item.pages ?? item.sourcePages ?? { start: 0, end: 0 },
    clinicalReview: item.clinicalReview ?? "pending", reviewStatus: item.reviewStatus ?? "UNDER_REVIEW", status: item.status ?? "draft"
  }));
  fs.writeFileSync(full, JSON.stringify(data, null, 2));
}
console.log(`Normalized ${files.length} summary files.`);
