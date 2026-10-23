import fs from "node:fs";
import path from "node:path";
const dir = path.resolve("SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE");
for (const file of ["hippo-question-bank.jsonl", "frcem-question-bank.jsonl"]) {
  const full = path.join(dir, file);
  const rows = fs.readFileSync(full, "utf8").split(/\r?\n/).filter(Boolean).map(JSON.parse);
  for (const row of rows) if (!row.englishExplanation) {
    row.englishExplanation = `The source identifies ${row.correctAnswer || "the listed answer"} as the correct answer for this clinical scenario. The detailed rationale is pending editorial review.`;
    row.englishExplanationStatus = "source-derived-placeholder-under-review";
  }
  fs.writeFileSync(full, rows.map(JSON.stringify).join("\n") + "\n");
}
console.log("Filled missing English explanation fields with review-safe source placeholders.");
