import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const sourceRoot = path.resolve("phase_7_8_10_updated_source_intake");
const outputRoot = path.resolve("SEG_CONTENT_LIBRARY", "02_PROCESSED_CONTENT", "RESIDENT_EMERGENCY_MEDICINE");
const sources = {
  frcemQuestions: path.join(sourceRoot, "اسئله +الشرح بالعربي", "frcem All_Chapters_Questions_and_Explanations_Full.txt"),
  hippoQuestions: path.join(sourceRoot, "اسئله +الشرح بالعربي", "HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt"),
  frcemStudy: path.join(sourceRoot, "كتب علاء نص دراسي", "FRCEM_High_Yield_Study_Book.txt"),
  hippoStudy: path.join(sourceRoot, "كتب علاء نص دراسي", "HIPPO_High_Yield_Study_Book.txt"),
};

const normalize = value => value.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
const sha256 = value => createHash("sha256").update(value).digest("hex");
const clean = value => value.replace(/\n{3,}/g, "\n\n").trim();

function parseQuestionBank(text, family) {
  const lines = normalize(text).split("\n");
  const records = [];
  let chapter = null;
  let current = null;

  const finish = () => {
    if (!current) return;
    const body = current.lines.join("\n").trim();
    const optionMatches = [...body.matchAll(/^([A-E])\)\s*(.+)$/gm)];
    const firstOption = optionMatches[0]?.index ?? body.length;
    const answerMatch = body.match(/^CORRECT ANSWER:\s*(.+)$/m);
    const englishMarker = body.match(/^ENGLISH EXPLANATION:\s*$/m);
    const arabicMarker = body.match(/^الشرح(?: والتحليل باللغة العربية| العربي المختصر):\s*$/m);
    const contentEnd = answerMatch?.index ?? body.length;
    const questionText = clean(body.slice(0, Math.min(firstOption, contentEnd)));
    const options = optionMatches.map(match => ({ key: match[1], text: clean(match[2]) }));
    const answerRaw = clean(answerMatch?.[1] ?? "");
    const answerKey = answerRaw.match(/^([A-E])(?:\s|\()/)?.[1] ?? null;
    const englishStart = englishMarker ? englishMarker.index + englishMarker[0].length : -1;
    const arabicStart = arabicMarker ? arabicMarker.index + arabicMarker[0].length : -1;
    const englishExplanation = englishStart >= 0 ? clean(body.slice(englishStart, arabicMarker?.index ?? body.length)) : "";
    const arabicExplanation = arabicStart >= 0 ? clean(body.slice(arabicStart)) : "";
    const urls = [...new Set((body.match(/https?:\/\/[^\s)]+/g) ?? []).map(url => url.replace(/[.,;]+$/, "")))];

    records.push({
      id: `${family.toLowerCase()}-ch-${String(chapter?.number ?? 0).padStart(2, "0")}-q-${String(current.number).padStart(4, "0")}`,
      track: "resident-emergency-medicine",
      family,
      chapterNumber: chapter?.number ?? null,
      chapterTitle: chapter?.title ?? "Unassigned",
      sourceQuestionNumber: current.number,
      question: questionText,
      options,
      correctAnswerKey: answerKey,
      correctAnswer: answerRaw,
      englishExplanation,
      arabicExplanation,
      references: urls,
      governanceStatus: "under-review",
      rawSourceBlock: clean(`Q${current.number}: ${body}`),
    });
    current = null;
  };

  for (const line of lines) {
    const chapterMatch = line.match(/^CHAPTER\s+(\d+):\s*(.+)$/i);
    if (chapterMatch) {
      finish();
      chapter = { number: Number(chapterMatch[1]), title: chapterMatch[2].trim() };
      continue;
    }
    const questionMatch = line.match(/^Q(\d+):\s*(.*)$/);
    if (questionMatch) {
      finish();
      current = { number: Number(questionMatch[1]), lines: [questionMatch[2]] };
      continue;
    }
    if (current && !/^-{20,}$|^={20,}$/.test(line)) current.lines.push(line);
  }
  finish();
  return records;
}

function parseStudyBook(text, family) {
  const normalized = normalize(text);
  const matches = [...normalized.matchAll(/^CHAPTER\s+(\d+):\s*(.+)$/gim)].filter(match => {
    const title = match[2].trim();
    return title === title.toUpperCase();
  });
  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? normalized.length;
    return {
      id: `${family.toLowerCase()}-study-chapter-${String(Number(match[1])).padStart(2, "0")}`,
      track: "resident-emergency-medicine",
      family,
      chapterNumber: Number(match[1]),
      chapterTitle: match[2].trim(),
      bilingualStudyContent: clean(normalized.slice(start, end).replace(/^={20,}$/gm, "")),
      governanceStatus: "under-review",
    };
  });
}

await mkdir(outputRoot, { recursive: true });
const sourceEntries = {};
for (const [key, file] of Object.entries(sources)) {
  const bytes = await readFile(file);
  sourceEntries[key] = { file, text: bytes.toString("utf8"), sha256: sha256(bytes), bytes: bytes.length };
}

const frcemQuestions = parseQuestionBank(sourceEntries.frcemQuestions.text, "FRCEM");
const hippoQuestions = parseQuestionBank(sourceEntries.hippoQuestions.text, "HIPPO");
const frcemStudy = parseStudyBook(sourceEntries.frcemStudy.text, "FRCEM");
const hippoStudy = parseStudyBook(sourceEntries.hippoStudy.text, "HIPPO");

const writeJson = (name, value) => writeFile(path.join(outputRoot, name), `${JSON.stringify(value, null, 2)}\n`, "utf8");
const writeJsonl = (name, values) => writeFile(path.join(outputRoot, name), `${values.map(value => JSON.stringify(value)).join("\n")}\n`, "utf8");

await Promise.all([
  writeJsonl("frcem-question-bank.jsonl", frcemQuestions),
  writeJsonl("hippo-question-bank.jsonl", hippoQuestions),
  writeJson("frcem-study-book.json", frcemStudy),
  writeJson("hippo-study-book.json", hippoStudy),
]);

const manifest = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  track: "resident-emergency-medicine",
  activationStatus: "not-published",
  governanceStatus: "under-review",
  notice: "Faithful local extraction only. No clinical correction, approval, or rights clearance is implied.",
  counts: {
    questions: { FRCEM: frcemQuestions.length, HIPPO: hippoQuestions.length, total: frcemQuestions.length + hippoQuestions.length },
    studyChapters: { FRCEM: frcemStudy.length, HIPPO: hippoStudy.length, total: frcemStudy.length + hippoStudy.length },
  },
  sources: Object.fromEntries(Object.entries(sourceEntries).map(([key, value]) => [key, { path: path.relative(process.cwd(), value.file), sha256: value.sha256, bytes: value.bytes }])),
  quality: {
    missingQuestionText: [...frcemQuestions, ...hippoQuestions].filter(item => !item.question).length,
    missingOptions: [...frcemQuestions, ...hippoQuestions].filter(item => item.options.length < 2).length,
    missingCorrectAnswer: [...frcemQuestions, ...hippoQuestions].filter(item => !item.correctAnswer).length,
    missingArabicExplanation: [...frcemQuestions, ...hippoQuestions].filter(item => !item.arabicExplanation).length,
    duplicateRecordIds: (() => {
      const ids = [...frcemQuestions, ...hippoQuestions].map(item => item.id);
      return ids.length - new Set(ids).size;
    })(),
  },
};
await writeJson("manifest.json", manifest);
process.stdout.write(`${JSON.stringify(manifest, null, 2)}\n`);
