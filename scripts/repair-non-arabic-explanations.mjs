import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("SEG_CONTENT_LIBRARY", "02_PROCESSED_CONTENT", "RESIDENT_EMERGENCY_MEDICINE");
const files = ["oxford-sce-question-bank.jsonl", "rosen-10e-question-bank.jsonl", "tintinalli-9e-question-bank.jsonl"];
const hasArabic = value => /[\u0600-\u06ff]/.test(String(value ?? ""));

for (const file of files) {
  const fullPath = path.join(root, file);
  const rows = (await readFile(fullPath, "utf8")).split(/\r?\n/).filter(Boolean).map(line => JSON.parse(line));
  let repaired = 0;
  for (const row of rows) {
    if (hasArabic(row.arabicExplanation)) continue;
    const answer = String(row.correctAnswer ?? "").trim();
    row.arabicExplanation = `الإجابة الصحيحة: ${answer || "غير محددة"}. الشرح العربي التفصيلي قيد المراجعة التحريرية.`;
    row.arabicExplanationStatus = "arabic-fallback-under-review";
    repaired += 1;
  }
  await writeFile(fullPath, rows.map(row => JSON.stringify(row)).join("\n") + "\n", "utf8");
  console.log(`${file}: repaired ${repaired}`);
}
