import fs from "node:fs/promises";
import path from "node:path";

const dir = path.resolve("SEG_CONTENT_LIBRARY", "02_PROCESSED_CONTENT", "SEG_UNIFIED_REVIEW_GUIDE");
const queue = JSON.parse(await fs.readFile(path.join(dir, "summary-work-queue.json"), "utf8")).units ?? [];
const excerpts = JSON.parse(await fs.readFile(path.join(dir, "source-excerpts.json"), "utf8")).units ?? [];
const byId = new Map(excerpts.map(item => [item.unitId, item]));
const clean = value => String(value ?? "").replace(/\s+/g, " ").trim();
const sectionExcerpt = (text, patterns, limit = 900) => {
  const source = String(text ?? "");
  for (const pattern of patterns) {
    const match = pattern.exec(source);
    if (match) return clean(source.slice(match.index, match.index + limit));
  }
  return "";
};
const bulletize = text => clean(text).split(/(?<=[.!?])\s+/).filter(Boolean).slice(0, 4);
const units = queue.map(item => {
  const source = byId.get(item.unitId);
  const text = source?.text ?? "";
  const highYield = bulletize(text.slice(0, 1400));
  const diagnosis = sectionExcerpt(text, [/\bDIAG+NOSTIC STUDIES\b/i, /\bDIAGNOSIS\b/i, /\bPRESENTATION\b/i]);
  const management = sectionExcerpt(text, [/\bMANAG+EMENT\b/i, /\bTREATMENT\b/i, /\bMANAGEMENT\b/i]);
  const algorithms = sectionExcerpt(text, [/\bALGORITHM\b/i, /\bAPPROACH\b/i, /\bINITIAL MANAGEMENT\b/i]);
  const tables = sectionExcerpt(text, [/\bTABLE\s+\d+/i, /\bTABLES\b/i]);
  const fallback = label => `${label} source excerpt requires editorial categorization before clinical use.`;
  return {
    unitId: item.unitId,
    title: item.title,
    source: item.source,
    sourcePages: item.sourcePages,
    highYieldSummary: highYield.length ? highYield : [fallback("High-yield summary")],
    diagnosis: diagnosis ? [diagnosis] : [fallback("Diagnosis")],
    management: management ? [management] : [fallback("Management")],
    algorithms: algorithms ? [algorithms] : [fallback("Algorithm")],
    tables: tables ? [tables] : [fallback("Table")],
    examPearls: [fallback("Exam pearl")],
    examTraps: [fallback("Exam trap")],
    arabicExplanation: "شرح عربي مبسط قيد التحرير والمراجعة السريرية؛ لم تتم إضافة استنتاجات غير موجودة في المصدر.",
    references: [item.source],
    pages: item.sourcePages,
    provenance: { sourceId: source?.sourceId ?? null, sourcePages: item.sourcePages, extractedCharacters: source?.extractedCharacters ?? 0 },
    reviewStatus: "UNDER_REVIEW",
    clinicalReview: "pending",
    status: "source-excerpt-populated-under-review",
  };
});
const out = path.join(dir, "unified-medical-units.jsonl");
await fs.writeFile(out, units.map(unit => JSON.stringify(unit)).join("\n") + "\n", "utf8");
await fs.writeFile(path.join(dir, "unified-medical-units-manifest.json"), JSON.stringify({ generatedAt: new Date().toISOString(), total: units.length, status: "UNDER_REVIEW", source: "source-excerpts.json" }, null, 2));
console.log(`Built ${units.length} source-grounded medical units`);
