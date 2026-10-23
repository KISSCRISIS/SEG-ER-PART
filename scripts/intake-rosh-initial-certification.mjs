import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const sourcePaths = process.argv.slice(2);
if (![1, 2, 4].includes(sourcePaths.length)) {
  throw new Error("Usage: node scripts/intake-rosh-initial-certification.mjs <original.md> [supplement.md [third.txt fourth.txt]]");
}

const outputSuffix = sourcePaths.length === 4 ? "merged-four-files-" : sourcePaths.length === 2 ? "merged-" : "";
const outputPath = path.resolve(
  `SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE/rosh-initial-certification-2026-${outputSuffix}question-bank.jsonl`
);
const sourceName = "ROSH Review EM Initial Certification 2026";
const sourceId = "qbank-rosh-initial-certification-2026";
const chapterNumbers = new Map();
const seenStems = new Map();
const seenIds = new Set();
const records = [];
const sourceAudit = [];
const visualOrAudioCue =
  /\b(?:shown|seen|depicted|pictured)\s+(?:in\s+)?(?:the\s+)?(?:above|below|following)\b|\b(?:above|below|following)\s+(?:image|picture|photograph|film|radiograph|ecg|ekg|tracing|ultrasound|ct|x-ray|audio|recording)\b|\b(?:image|picture|photograph|film|radiograph|ecg|ekg|tracing|audio|recording)\b.{0,40}\b(?:above|below|shown)\b|\b(?:findings|examination|lesion|rash)\s+(?:shown\s+)?above\b|\b00:00\b/i;

for (const [sourceIndex, sourcePath] of sourcePaths.entries()) {
const raw = (await readFile(sourcePath, "utf8")).replace(/\r\n/g, "\n");
if (!raw.startsWith(sourceName)) throw new Error(`Unexpected source title: ${sourcePath}`);
const headings = [
  ...raw.matchAll(/^Q(\d+)\s*·\s*ROSH Review EM Initial Certification 2026\s*—\s*(.+)$/gm),
];
const expected = [1970, 1476, 1000, 1297][sourceIndex];
if (headings.length !== expected) throw new Error(`Unexpected question count in ${sourcePath}: ${headings.length}`);
let skippedOverlap = 0;
let answerConflicts = 0;
let optionVariants = 0;
for (let index = 0; index < headings.length; index++) {
  const heading = headings[index];
  const sourceQuestionNumber = Number(heading[1]);
  const chapterTitle = heading[2].trim();
  const block = raw.slice(
    heading.index + heading[0].length,
    headings[index + 1]?.index ?? raw.length
  );
  const answerLabel = "\nCorrect answer\n";
  const explanationLabel = "\nExplanation\n";
  const answerAt = block.indexOf(answerLabel);
  const explanationAt = block.indexOf(explanationLabel, answerAt + answerLabel.length);
  if (answerAt < 0 || explanationAt < 0) {
    throw new Error(`Missing answer or explanation label at ${chapterTitle} Q${sourceQuestionNumber}`);
  }
  const beforeAnswer = block.slice(0, answerAt).trim();
  const correctAnswer = block
    .slice(answerAt + answerLabel.length, explanationAt)
    .trim();
  const englishExplanation = block.slice(explanationAt + explanationLabel.length).trim();
  const paragraphs = beforeAnswer
    .split(/\n\s*\n/)
    .map(value => value.trim())
    .filter(Boolean);
  const optionTexts = paragraphs.at(-1)?.split("\n").map(value => value.trim()) ?? [];
  const question = paragraphs.slice(0, -1).join("\n\n").trim();
  const matchingOptions = optionTexts
    .map((text, optionIndex) => (text === correctAnswer ? optionIndex : -1))
    .filter(optionIndex => optionIndex >= 0);
  if (
    !question ||
    !englishExplanation ||
    ![4, 5].includes(optionTexts.length) ||
    matchingOptions.length !== 1
  ) {
    throw new Error(`Invalid question structure at ${chapterTitle} Q${sourceQuestionNumber}`);
  }

  const stemKey = question.toLowerCase().replace(/[^a-z0-9]+/g, "");
  if (sourceIndex > 0 && seenStems.has(stemKey)) {
    const prior = records.find(record => record.id === seenStems.get(stemKey));
    if (prior.correctAnswer.toLowerCase().replace(/[^a-z0-9]+/g, "") !== correctAnswer.toLowerCase().replace(/[^a-z0-9]+/g, "")) answerConflicts++;
    if (JSON.stringify(prior.options.map(option => option.text)) !== JSON.stringify(optionTexts)) optionVariants++;
    skippedOverlap++;
    continue;
  }
  if (!chapterNumbers.has(chapterTitle)) {
    chapterNumbers.set(chapterTitle, chapterNumbers.size + 1);
  }
  const chapterSlug = chapterTitle
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const id = `rosh-em-initial-2026-${chapterSlug}-q-${String(sourceQuestionNumber).padStart(3, "0")}`;
  if (seenIds.has(id)) {
    throw new Error(`Duplicate question id: ${id}`);
  }
  seenIds.add(id);
  const duplicateOf = seenStems.get(stemKey);
  if (!duplicateOf) {
    seenStems.set(stemKey, id);
  }
  const requiresSourceMedia = visualOrAudioCue.test(question);
  const reviewIssues = [
    ...(duplicateOf ? ["duplicate-question-stem"] : []),
    ...(requiresSourceMedia ? ["source-media-missing"] : []),
  ];
  records.push({
    id,
    family: "ROSH_2026",
    source: sourceName,
    sourceId,
    sourceFile: path.basename(sourcePath),
    chapterNumber: chapterNumbers.get(chapterTitle),
    chapterTitle,
    sourceQuestionNumber,
    question,
    options: optionTexts.map((text, optionIndex) => ({
      key: String.fromCharCode(65 + optionIndex),
      text,
    })),
    correctAnswerKey: String.fromCharCode(65 + matchingOptions[0]),
    correctAnswer,
    englishExplanation,
    arabicExplanation: "",
    governanceStatus: "under-review",
    practiceEligible: reviewIssues.length === 0,
    reviewIssues,
    ...(duplicateOf ? { duplicateOf } : {}),
  });
}
sourceAudit.push({ sourceFile: path.basename(sourcePath), sha256: createHash("sha256").update(raw).digest("hex"), questions: headings.length, skippedOverlap, answerConflicts, optionVariants });
}

if (records.length < 1970 || chapterNumbers.size < 7) {
  throw new Error(`Unexpected source totals: ${records.length} questions, ${chapterNumbers.size} chapters`);
}
await writeFile(outputPath, `${records.map(record => JSON.stringify(record)).join("\n")}\n`, "utf8");
console.log(JSON.stringify({
  outputPath,
  sourceAudit,
  total: records.length,
  chapters: chapterNumbers.size,
  active: records.filter(record => record.practiceEligible).length,
  duplicates: records.filter(record => record.reviewIssues.includes("duplicate-question-stem")).length,
  missingMedia: records.filter(record => record.reviewIssues.includes("source-media-missing")).length,
}, null, 2));
