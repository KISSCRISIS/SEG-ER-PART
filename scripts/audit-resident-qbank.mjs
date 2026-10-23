import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(
  "SEG_CONTENT_LIBRARY",
  "02_PROCESSED_CONTENT",
  "RESIDENT_EMERGENCY_MEDICINE"
);
const files = [
  ["FRCEM", "frcem-question-bank.jsonl"],
  ["HIPPO", "hippo-question-bank.jsonl"],
  ["OXFORD_SCE", "oxford-sce-question-bank.jsonl"],
  ["ROSEN_10E", "rosen-10e-question-bank.jsonl"],
  ["TINTINALLI_9E", "tintinalli-9e-question-bank.jsonl"],
];

function parseJsonl(content) {
  return content
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .map(line => JSON.parse(line));
}

function hasArabic(value) {
  return /[\u0600-\u06ff]/.test(value ?? "");
}

const rows = [];
const seenQuestionText = new Map();
const duplicateText = [];
let total = 0;
for (const [family, file] of files) {
  const items = parseJsonl(await readFile(path.join(root, file), "utf8"));
  total += items.length;
  const missingQuestion = items.filter(item => !item.question?.trim()).length;
  const missingAnswer = items.filter(item => !item.correctAnswer?.trim()).length;
  const missingEnglishExplanation = items.filter(
    item => !item.englishExplanation?.trim()
  ).length;
  const missingArabicExplanation = items.filter(
    item => !hasArabic(item.arabicExplanation)
  ).length;
  const fewerThanThreeOptions = items.filter(
    item => (item.options ?? []).length < 3
  ).length;
  const ids = new Set();
  const duplicateIds = [];
  for (const item of items) {
    if (ids.has(item.id)) duplicateIds.push(item.id);
    ids.add(item.id);
    const key = item.question?.replace(/\s+/g, " ").trim().toLowerCase();
    if (key) {
      const previous = seenQuestionText.get(key);
      if (previous && previous.id !== item.id) {
        duplicateText.push({ first: previous.id, second: item.id, family });
      } else seenQuestionText.set(key, item);
    }
  }
  rows.push({
    family,
    questions: items.length,
    missingQuestion,
    fewerThanThreeOptions,
    missingAnswer,
    missingEnglishExplanation,
    missingArabicExplanation,
    duplicateIds: duplicateIds.length,
  });
}

const generatedAt = new Date().toISOString();
const markdown = [
  "# Resident Qbank QA Report",
  "",
  `Generated: ${generatedAt}`,
  "",
  `Total questions: ${total}`,
  "",
  "| Source | Questions | Missing question | <3 options | Missing answer | Missing English explanation | Missing Arabic explanation | Duplicate IDs |",
  "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |",
  ...rows.map(
    row =>
      `| ${row.family} | ${row.questions} | ${row.missingQuestion} | ${row.fewerThanThreeOptions} | ${row.missingAnswer} | ${row.missingEnglishExplanation} | ${row.missingArabicExplanation} | ${row.duplicateIds} |`
  ),
  "",
  `Exact duplicate question-text candidates: ${duplicateText.length}`,
  "",
  "Governance status: under-review / private-pilot. This QA report checks structure only and does not replace clinical review.",
  "",
];

await mkdir(path.resolve("reports", "resident-qbank"), { recursive: true });
await writeFile(
  path.resolve("reports", "resident-qbank", "qa-report.md"),
  markdown.join("\n")
);
await writeFile(
  path.resolve("reports", "resident-qbank", "qa-report.json"),
  JSON.stringify({ generatedAt, total, rows, duplicateText }, null, 2)
);

console.log(`Resident Qbank QA complete: ${total} questions`);
for (const row of rows) console.log(JSON.stringify(row));
