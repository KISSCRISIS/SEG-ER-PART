import fs from "node:fs";
import path from "node:path";

const dir = "SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE";
const srcFile = path.join(dir, "edic-sba-2026-question-bank.jsonl");
const outFile = path.join(dir, "normalized", "edic-sba-2026-question-bank.jsonl");
const file = "edic-sba-2026-question-bank.jsonl";

const rows = fs.readFileSync(srcFile, "utf8").split(/\r?\n/).filter(Boolean).map(JSON.parse);

const result = rows.map((q) => {
  const answerKey =
    q.correctAnswerKey ??
    q.options?.find((o) => o.text?.trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase())?.key ??
    null;
  return {
    Question_ID: q.id,
    Question: q.question,
    Options: q.options ?? [],
    Answer: answerKey,
    CorrectAnswer: q.correctAnswer ?? null,
    ExplanationEN: q.englishExplanation ?? "",
    ExplanationAR: q.arabicExplanation ?? "",
    Source: q.family ?? file.replace("-question-bank.jsonl", ""),
    Chapter: q.chapterTitle ?? "",
    Category: q.family ?? "",
    Difficulty: q.difficulty ?? "unclassified",
    ClinicalScenario: q.clinicalScenario ?? q.question,
    Page: q.sourceLocator?.page ?? q.sourceLocator?.pdfPage ?? null,
    References: q.references ?? [],
    ReviewStatus: q.governanceStatus ?? "under-review",
    Provenance: { sourceFile: file, sourceQuestionNumber: q.sourceQuestionNumber ?? null },
  };
});

fs.writeFileSync(outFile, result.map((x) => JSON.stringify(x)).join("\n") + "\n");
console.log("written:", result.length, "records ->", outFile);
