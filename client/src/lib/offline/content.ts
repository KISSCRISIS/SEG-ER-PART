/**
 * Offline content loaders — browser-safe port of server/residentContent.ts
 * and server/recoveryLibrary.ts.
 *
 * server/* must never be imported by client code (it pulls node:fs into the
 * web bundle). This module re-implements the identical read/query logic over
 * fetch("/content/...") instead of readFile(...). The JSON/JSONL payloads are
 * placed there by scripts/sync-android-content.mjs.
 *
 * Parity with the server originals is covered by parity.test.ts. If a server
 * function changes, mirror the change here.
 */
import { gradeSelectedAnswer, resolveCorrectAnswerKey } from "@shared/qbank-answer";
import {
  classifyResidentChapter,
  getResidentSection,
  RESIDENT_PATHWAY_SECTIONS,
} from "@shared/resident-taxonomy";
import { calculateTopicProgress } from "@shared/study-plan-intelligence";
import { normalizeExamTraps } from "./trap-data";

// --- fetch injection (tests map /content/* URLs to fixture/repo files) ---
let fetchImpl: typeof fetch = (...args) => globalThis.fetch(...args);
export function setOfflineFetchImpl(fn: typeof fetch): void {
  fetchImpl = fn;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetchImpl(url);
  if (!response.ok) {
    throw new Error(`Offline content bundle is incomplete (missing ${url}). Reinstall the app.`);
  }
  return (await response.json()) as T;
}

async function fetchText(url: string): Promise<string> {
  const response = await fetchImpl(url);
  if (!response.ok) {
    throw new Error(`Offline content bundle is incomplete (missing ${url}). Reinstall the app.`);
  }
  return response.text();
}

// ===========================================================================
// Question banks (server/residentContent.ts)
// ===========================================================================

export type QuestionFamily =
  | "EDIC"
  | "FRCEM"
  | "HIPPO"
  | "OXFORD_SCE"
  | "PEER_2026"
  | "PEER_PHYSICIANS"
  | "ROSEN_10E"
  | "ROSH_2026"
  | "TINTINALLI_9E";

export type StudyFamily = "FRCEM" | "HIPPO";
export type Family = QuestionFamily;

export type OfflineQuestion = {
  id: string;
  family: Family;
  sourceId?: string;
  chapterNumber: number;
  chapterTitle: string;
  sourceQuestionNumber: number;
  question: string;
  options: { key: string; text: string }[];
  correctAnswerKey: string | null;
  correctAnswer: string;
  englishExplanation: string;
  arabicExplanation: string;
  references: string[];
  governanceStatus: "under-review";
  practiceEligible?: boolean;
};

type RawQuestion = Omit<OfflineQuestion, "family"> & {
  family?: Family | "EDIC SBA 2026" | "PEER" | "thoracorespiratory" | "trauma" | "key-advances";
  chapterNumber?: number;
};

export type OfflineStudyChapter = {
  id: string;
  family: StudyFamily;
  chapterNumber: number;
  chapterTitle: string;
  bilingualStudyContent: string;
  governanceStatus: "under-review";
};

const QBANK_BASE = "/content/qbank";
const BANK_FILES = [
  "edic-sba-2026-question-bank.jsonl",
  "frcem-question-bank.jsonl",
  "hippo-question-bank.jsonl",
  "oxford-sce-question-bank.jsonl",
  "peer-physicians-case-series-2026-question-bank.jsonl",
  "peer-physicians-2026-unified-question-bank.jsonl",
  "rosen-10e-question-bank.jsonl",
  "rosh-initial-certification-2026-merged-four-files-question-bank.jsonl",
  "tintinalli-9e-question-bank.jsonl",
];

let bankCache: Promise<{ questions: OfflineQuestion[]; chapters: OfflineStudyChapter[] }> | undefined;

function normalizeQuestion(question: RawQuestion, isPeer: boolean): OfflineQuestion {
  if (question.sourceId === "qbank-edic-sba-2026" || question.family === "EDIC SBA 2026") {
    return { ...(question as OfflineQuestion), family: "EDIC", chapterNumber: question.chapterNumber ?? 0 };
  }
  if (question.sourceId === "qbank-peer-physicians-2026-unified") {
    return { ...(question as OfflineQuestion), family: "PEER_2026" };
  }
  if (isPeer) {
    return {
      ...(question as OfflineQuestion),
      family: "PEER_PHYSICIANS",
      sourceId: "qbank-peer-physicians-case-series-2026",
      correctAnswer:
        question.correctAnswer ||
        question.options.find(option => option.key === question.correctAnswerKey)?.text ||
        "",
    };
  }
  return question as OfflineQuestion;
}

async function loadBanks() {
  bankCache ??= Promise.all([
    ...BANK_FILES.map(file => fetchText(`${QBANK_BASE}/${file}`)),
    fetchJson<OfflineStudyChapter[]>(`${QBANK_BASE}/frcem-study-book.json`),
    fetchJson<OfflineStudyChapter[]>(`${QBANK_BASE}/hippo-study-book.json`),
  ]).then(parts => {
    const texts = parts.slice(0, BANK_FILES.length) as string[];
    const books = parts.slice(BANK_FILES.length) as [OfflineStudyChapter[], OfflineStudyChapter[]];
    return {
      questions: texts.flatMap((content, index) =>
        content
          .trim()
          .split("\n")
          .map(line => JSON.parse(line) as RawQuestion)
          .filter(question => question.practiceEligible !== false)
          .map(question => normalizeQuestion(question, index === 4))
          .flatMap(question => {
            const correctAnswerKey = resolveCorrectAnswerKey(question);
            return correctAnswerKey ? [{ ...question, correctAnswerKey }] : [];
          })
      ),
      chapters: [...books[0], ...books[1]],
    };
  });
  return bankCache;
}

export async function listResidentChapters(family?: Family) {
  const data = await loadBanks();
  return data.chapters
    .filter(item => !family || item.family === family)
    .map(chapter => ({
      ...chapter,
      bilingualStudyContent: undefined,
      sectionId: classifyResidentChapter(chapter.chapterTitle),
      sectionTitle:
        getResidentSection(classifyResidentChapter(chapter.chapterTitle))?.[1] ?? "Emergency Medicine Foundations",
      questionCount: data.questions.filter(
        question => question.family === chapter.family && question.chapterNumber === chapter.chapterNumber
      ).length,
    }));
}

export async function getResidentStudyChapter(family: StudyFamily, chapterNumber: number) {
  const data = await loadBanks();
  const chapter = data.chapters.find(item => item.family === family && item.chapterNumber === chapterNumber);
  if (!chapter) return null;
  const sectionId = classifyResidentChapter(chapter.chapterTitle);
  return {
    ...chapter,
    sectionId,
    sectionTitle: getResidentSection(sectionId)?.[1] ?? "Emergency Medicine Foundations",
  };
}

export async function getResidentQuestion(questionId: string) {
  const data = await loadBanks();
  return data.questions.find(item => item.id === questionId) ?? null;
}

export async function regradeResidentAttempts<T extends { questionId: string; selectedAnswer: string; correct: number }>(
  attempts: T[]
) {
  const data = await loadBanks();
  const byId = new Map(data.questions.map(question => [question.id, question]));
  const corrected: T[] = [];
  let excluded = 0;
  for (const attempt of attempts) {
    const question = byId.get(attempt.questionId);
    const result = question ? gradeSelectedAnswer(question, attempt.selectedAnswer) : null;
    if (result === null) {
      excluded++;
      continue;
    }
    corrected.push({ ...attempt, correct: Number(result) });
  }
  return { attempts: corrected, excluded };
}

function withSection(item: OfflineQuestion) {
  const sectionId = classifyResidentChapter(item.chapterTitle);
  return {
    ...item,
    sectionId,
    sectionTitle: getResidentSection(sectionId)?.[1] ?? "Emergency Medicine Foundations",
  };
}

export async function getResidentQuestionsByIds(questionIds: string[]) {
  const data = await loadBanks();
  const byId = new Map(data.questions.map(item => [item.id, item]));
  return questionIds
    .map(id => byId.get(id))
    .filter((item): item is OfflineQuestion => Boolean(item))
    .map(withSection);
}

export async function getResidentQuestionsBatch(questionIds: string[], offset: number, limit: number) {
  const slice = questionIds.slice(offset, offset + limit);
  const items = await getResidentQuestionsByIds(slice);
  const byId = new Map(items.map(item => [item.id, item]));
  const ordered = slice.map(id => byId.get(id)).filter((item): item is NonNullable<typeof item> => Boolean(item));
  return { total: questionIds.length, offset, limit, items: ordered };
}

export async function listResidentQuestionCatalog() {
  const data = await loadBanks();
  const banks = new Map<Family, Map<number, { chapterNumber: number; chapterTitle: string; count: number }>>();
  for (const question of data.questions) {
    let chapters = banks.get(question.family);
    if (!chapters) {
      chapters = new Map();
      banks.set(question.family, chapters);
    }
    const chapter = chapters.get(question.chapterNumber);
    if (chapter) chapter.count++;
    else chapters.set(question.chapterNumber, {
      chapterNumber: question.chapterNumber,
      chapterTitle: question.chapterTitle,
      count: 1,
    });
  }
  return Array.from(banks, ([family, chapters]) => ({
    family,
    count: Array.from(chapters.values()).reduce((sum, chapter) => sum + chapter.count, 0),
    chapters: Array.from(chapters.values()).sort((a, b) => a.chapterNumber - b.chapterNumber),
  }));
}

export async function selectResidentSessionQuestions(input: {
  families: Family[];
  excludedChapterKeys?: string[];
  sectionId?: number;
  includeSectionIds?: number[];
  excludeSectionIds?: number[];
  questionType: "all" | "unused" | "incorrect" | "flagged" | "skipped" | "searched";
  search?: string;
  order: "listed" | "random";
  seed: number;
  count: number;
  attempts: { questionId: string; correct: number }[];
  states: { questionId: string; flagged: number; skipped: number }[];
}) {
  const data = await loadBanks();
  const excluded = new Set(input.excludedChapterKeys ?? []);
  const latest = new Map<string, number>();
  for (const attempt of input.attempts) if (!latest.has(attempt.questionId)) latest.set(attempt.questionId, attempt.correct);
  const states = new Map(input.states.map(state => [state.questionId, state]));
  const search = input.search?.trim().toLowerCase();
  const matches = data.questions.filter(question => {
    if (!input.families.includes(question.family)) return false;
    if (excluded.has(`${question.family}:${question.chapterNumber}`)) return false;
    const section = classifyResidentChapter(question.chapterTitle);
    if (input.sectionId && section !== input.sectionId) return false;
    if (input.includeSectionIds?.length && !input.includeSectionIds.includes(section)) return false;
    if (input.excludeSectionIds?.includes(section)) return false;
    if (search && !`${question.question} ${question.chapterTitle}`.toLowerCase().includes(search)) return false;
    if (input.questionType === "unused") return !latest.has(question.id);
    if (input.questionType === "incorrect") return latest.has(question.id) && !latest.get(question.id);
    if (input.questionType === "flagged") return Boolean(states.get(question.id)?.flagged);
    if (input.questionType === "skipped") return Boolean(states.get(question.id)?.skipped);
    return true;
  });
  if (input.order === "random") {
    let seed = input.seed || 1;
    for (let index = matches.length - 1; index > 0; index--) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const swap = seed % (index + 1);
      [matches[index], matches[swap]] = [matches[swap], matches[index]];
    }
  }
  return { total: matches.length, items: matches.slice(0, input.count).map(withSection) };
}

export async function listResidentQuestions(input: {
  family?: Family;
  families?: Family[];
  chapterNumber?: number;
  sectionId?: number;
  includeSectionIds?: number[];
  excludeSectionIds?: number[];
  search?: string;
  page: number;
  pageSize: number;
}) {
  const data = await loadBanks();
  const search = input.search?.trim().toLowerCase();
  const filtered = data.questions.filter(
    item =>
      (!input.family || item.family === input.family) &&
      (!input.families?.length || input.families.includes(item.family)) &&
      (!input.chapterNumber || item.chapterNumber === input.chapterNumber) &&
      (!input.sectionId || classifyResidentChapter(item.chapterTitle) === input.sectionId) &&
      (!input.includeSectionIds?.length || input.includeSectionIds.includes(classifyResidentChapter(item.chapterTitle))) &&
      (!input.excludeSectionIds?.length || !input.excludeSectionIds.includes(classifyResidentChapter(item.chapterTitle))) &&
      (!search || `${item.question} ${item.chapterTitle} ${item.arabicExplanation}`.toLowerCase().includes(search))
  );
  const start = (input.page - 1) * input.pageSize;
  return {
    total: filtered.length,
    page: input.page,
    pageSize: input.pageSize,
    items: filtered.slice(start, start + input.pageSize).map(withSection),
  };
}

export async function summarizeResidentPerformance(
  attempts: {
    questionId: string;
    family: Family;
    correct: number;
    selectedAnswer?: string;
    chapterNumber?: number;
  }[]
) {
  const data = await loadBanks();
  const byId = new Map(data.questions.map(item => [item.id, item]));
  const sectionMap = new Map<
    number,
    { sectionId: number; sectionTitle: string; attempted: number; correct: number; accuracy: number; questionCount: number }
  >();
  const familyMap = new Map<Family, { family: Family; attempted: number; correct: number; accuracy: number }>();

  for (const [id, title] of RESIDENT_PATHWAY_SECTIONS) {
    sectionMap.set(id, {
      sectionId: id,
      sectionTitle: title,
      attempted: 0,
      correct: 0,
      accuracy: 0,
      questionCount: data.questions.filter(question => classifyResidentChapter(question.chapterTitle) === id).length,
    });
  }

  for (const attempt of attempts) {
    const question = byId.get(attempt.questionId);
    const sectionId = question ? classifyResidentChapter(question.chapterTitle) : 2;
    const section = sectionMap.get(sectionId);
    if (section) {
      section.attempted += 1;
      section.correct += Number(attempt.correct ? 1 : 0);
    }
    const family = question?.family ?? attempt.family;
    const familyRow = familyMap.get(family) ?? ({ family, attempted: 0, correct: 0, accuracy: 0 } as const);
    familyMap.set(family, {
      ...familyRow,
      attempted: familyRow.attempted + 1,
      correct: familyRow.correct + Number(attempt.correct ? 1 : 0),
    });
  }

  const sections = Array.from(sectionMap.values()).map(item => ({
    ...item,
    accuracy: item.attempted ? Math.round((item.correct / item.attempted) * 100) : 0,
  }));
  const byFamily = Array.from(familyMap.values()).map(item => ({
    ...item,
    accuracy: item.attempted ? Math.round((item.correct / item.attempted) * 100) : 0,
  }));
  const activeSections = sections.filter(item => item.attempted > 0);
  const strongest = [...activeSections].sort((a, b) => b.accuracy - a.accuracy || b.attempted - a.attempted).slice(0, 4);
  const weakest = [...activeSections].sort((a, b) => b.accuracy - b.accuracy || b.attempted - a.attempted).slice(0, 4);
  const totalAttempted = attempts.length;
  const totalCorrect = attempts.filter(item => item.correct).length;

  return {
    attempted: totalAttempted,
    correct: totalCorrect,
    accuracy: totalAttempted ? Math.round((totalCorrect / totalAttempted) * 100) : 0,
    sections,
    byFamily,
    strongest,
    weakest,
    nextRecommendedSection:
      weakest[0] ?? sections.filter(item => item.questionCount > 0).sort((a, b) => b.questionCount - a.questionCount)[0],
  };
}

export type TopicProgressRow = {
  family: string;
  chapterNumber: number;
  chapterTitle: string;
  sectionId: number;
  sectionTitle: string;
  questionCount: number;
  completed: boolean;
  attempted: number;
  correct: number;
  accuracy: number;
  progress: number;
};

export async function summarizeTopicProgress(input: {
  chapters: {
    family: string;
    chapterNumber: number;
    chapterTitle: string;
    sectionId: number;
    sectionTitle: string;
    questionCount: number;
  }[];
  attempts: { questionId: string; correct: number }[];
  progress: { family: string; chapterNumber: number; completed: unknown }[];
}): Promise<TopicProgressRow[]> {
  const data = await loadBanks();
  const byId = new Map(data.questions.map(question => [question.id, question]));
  const latest = new Map<string, number>();
  for (const attempt of input.attempts) {
    latest.set(attempt.questionId, Number(attempt.correct ? 1 : 0));
  }
  const done = new Set(
    input.progress.filter(row => row.completed).map(row => `${row.family}:${row.chapterNumber}`)
  );
  return input.chapters.map(chapter => {
    const topicAttempts = Array.from(latest.entries()).filter(([questionId]) => {
      const question = byId.get(questionId);
      return question?.family === chapter.family && question?.chapterNumber === chapter.chapterNumber;
    });
    const attempted = topicAttempts.length;
    const correct = topicAttempts.reduce((sum, [, value]) => sum + value, 0);
    const accuracy = attempted ? correct / attempted : 0;
    const coverage = chapter.questionCount ? attempted / chapter.questionCount : 0;
    const completed = done.has(`${chapter.family}:${chapter.chapterNumber}`);
    return {
      family: chapter.family,
      chapterNumber: chapter.chapterNumber,
      chapterTitle: chapter.chapterTitle,
      sectionId: chapter.sectionId,
      sectionTitle: chapter.sectionTitle,
      questionCount: chapter.questionCount,
      completed,
      attempted,
      correct,
      accuracy: Math.round(accuracy * 100),
      progress: calculateTopicProgress({ completed, coverage, accuracy }),
    };
  });
}

// ===========================================================================
// Reference library (server/recoveryLibrary.ts)
// ===========================================================================

type ReferenceItem = {
  id: string;
  source: string;
  chapterNumber: string;
  chapterTitle: string;
  topic: string;
  keyPoints: string[];
  relatedTraps: string[];
  boardSafeLogic?: string;
  arabicMentorExplanation?: string;
  needsVerification?: boolean;
};

type Flashcard = {
  topicId?: string;
  cardId: string;
  type: string;
  question: string;
  answer: string;
  source: string;
  yield: string;
  sourceFile?: string;
};

type ExamTrap = {
  topicId?: string;
  id: string;
  text: string;
  referenceId: string;
  source: string;
  topic: string;
};

type MentorExplanation = {
  topicId?: string;
  referenceId: string;
  topic: string;
  source: string;
  explanation: string;
};

type TopicFamily = { family: string; entries: string[]; count: number };

type ChapterStudyMap = {
  source: string;
  chapterNumber: string;
  entries: { id: string; chapterTitle: string; topic: string; families?: string[]; keywords?: string[] }[];
  count: number;
};

type SectionFilterInput = { sectionId?: number };

const REF_BASE = "/content/reference";

let referenceCache: Promise<ReferenceItem[]> | undefined;
let flashcardCache: Promise<Flashcard[]> | undefined;
let trapCache: Promise<ExamTrap[]> | undefined;
let topicFamilyCache: Promise<TopicFamily[]> | undefined;
let chapterStudyCache: Promise<ChapterStudyMap[]> | undefined;
let mentorCache: Promise<MentorExplanation[]> | undefined;

async function loadMentorExplanations() {
  mentorCache ??= fetchJson<MentorExplanation[]>(`${REF_BASE}/arabicMentorExplanations.json`);
  return mentorCache;
}

async function loadReferences() {
  referenceCache ??= Promise.all([
    fetchJson<ReferenceItem[]>(`${REF_BASE}/fullReferenceLibrary.json`),
    loadMentorExplanations(),
  ]).then(([references, mentors]) => {
    const existing = new Set(references.map(item => item.id));
    const mentorOnly = mentors
      .filter(item => !existing.has(item.referenceId))
      .map(
        (item): ReferenceItem => ({
          id: item.referenceId,
          source: `${item.source} Arabic Mentor`,
          chapterNumber: "N/A",
          chapterTitle: "Arabic Mentor Explanations",
          topic: item.topic,
          keyPoints: [item.explanation],
          relatedTraps: [],
          arabicMentorExplanation: item.explanation,
          needsVerification: true,
        })
      );
    return [...references, ...mentorOnly];
  });
  return referenceCache;
}

async function loadFlashcards() {
  flashcardCache ??= fetchJson<Flashcard[]>(`${REF_BASE}/flashcards.json`);
  return flashcardCache;
}

async function loadExamTraps() {
  trapCache ??= fetchJson<ExamTrap[]>(`${REF_BASE}/examTraps.json`);
  return trapCache;
}

async function loadTopicFamilies() {
  topicFamilyCache ??= fetchJson<TopicFamily[]>(`${REF_BASE}/masterTopicFamilyIndex.json`);
  return topicFamilyCache;
}

async function loadChapterStudyMap() {
  chapterStudyCache ??= fetchJson<ChapterStudyMap[]>(`${REF_BASE}/chapterStudyMap.json`);
  return chapterStudyCache;
}

function classifyRecoveredItem(...values: Array<string | undefined>) {
  const sectionId = classifyResidentChapter(values.filter(Boolean).join(" "));
  return {
    sectionId,
    sectionTitle: getResidentSection(sectionId)?.[1] ?? "Emergency Medicine Foundations",
  };
}

export async function listRecoveredReferences(
  input: { search?: string; source?: string; page: number; pageSize: number } & SectionFilterInput
) {
  const references = await loadReferences();
  const search = input.search?.trim().toLowerCase();
  const enriched = references.map(item => ({
    ...item,
    ...classifyRecoveredItem(item.topic, item.chapterTitle, item.source, item.keyPoints.join(" "), item.arabicMentorExplanation),
  }));
  const filtered = enriched.filter(
    item =>
      (!input.sectionId || item.sectionId === input.sectionId) &&
      (!input.source || item.source === input.source) &&
      (!search ||
        `${item.topic} ${item.chapterTitle} ${item.keyPoints.join(" ")} ${item.arabicMentorExplanation ?? ""}`
          .toLowerCase()
          .includes(search))
  );
  const start = (input.page - 1) * input.pageSize;
  return {
    total: filtered.length,
    sources: Array.from(new Set(references.map(item => item.source))).sort(),
    sections: Array.from(
      new Map(enriched.map(item => [item.sectionId, { sectionId: item.sectionId, sectionTitle: item.sectionTitle }])).values()
    ).sort((a, b) => a.sectionId - b.sectionId),
    items: filtered.slice(start, start + input.pageSize),
  };
}

export async function listRecoveredFlashcards(
  input: { search?: string; source?: string; type?: string; yield?: string; page: number; pageSize: number } & SectionFilterInput
) {
  const flashcards = await loadFlashcards();
  const search = input.search?.trim().toLowerCase();
  const enriched = flashcards.map(item => ({
    ...item,
    ...classifyRecoveredItem(item.question, item.answer, item.source, item.type, item.yield),
  }));
  const filtered = enriched.filter(
    item =>
      (!input.sectionId || item.sectionId === input.sectionId) &&
      (!input.source || item.source === input.source) &&
      (!input.type || item.type === input.type) &&
      (!input.yield || item.yield === input.yield) &&
      (!search || `${item.question} ${item.answer} ${item.source} ${item.type}`.toLowerCase().includes(search))
  );
  const start = (input.page - 1) * input.pageSize;
  return {
    total: filtered.length,
    sources: Array.from(new Set(flashcards.map(item => item.source))).sort(),
    types: Array.from(new Set(flashcards.map(item => item.type))).sort(),
    yields: Array.from(new Set(flashcards.map(item => item.yield))).sort(),
    sections: Array.from(
      new Map(enriched.map(item => [item.sectionId, { sectionId: item.sectionId, sectionTitle: item.sectionTitle }])).values()
    ).sort((a, b) => a.sectionId - b.sectionId),
    items: filtered.slice(start, start + input.pageSize),
  };
}

export async function listRecoveredExamTraps(
  input: { search?: string; source?: string; page: number; pageSize: number } & SectionFilterInput
) {
  const [rawTraps, mentors, cards] = await Promise.all([loadExamTraps(), loadMentorExplanations(), loadFlashcards()]);
  const traps = normalizeExamTraps(rawTraps, cards, mentors);
  const search = input.search?.trim().toLowerCase();
  const enriched = traps.map(item => ({
    ...item,
    ...classifyRecoveredItem(item.text, item.topic, item.source),
  }));
  const filtered = enriched.filter(
    item =>
      (!input.sectionId || item.sectionId === input.sectionId) &&
      (!input.source || item.source === input.source) &&
      (!search || `${item.text} ${item.topic} ${item.source}`.toLowerCase().includes(search))
  );
  const start = (input.page - 1) * input.pageSize;
  return {
    total: filtered.length,
    sources: Array.from(new Set(traps.map(item => item.source))).sort(),
    sections: Array.from(
      new Map(enriched.map(item => [item.sectionId, { sectionId: item.sectionId, sectionTitle: item.sectionTitle }])).values()
    ).sort((a, b) => a.sectionId - b.sectionId),
    items: filtered.slice(start, start + input.pageSize),
  };
}

export async function listRecoveredTopicFamilies() {
  return loadTopicFamilies();
}

export async function listRecoveredChapterStudyMap(input: { source?: string; search?: string }) {
  const chapters = await loadChapterStudyMap();
  const search = input.search?.trim().toLowerCase();
  return chapters.filter(
    chapter =>
      (!input.source || chapter.source === input.source) &&
      (!search ||
        `${chapter.source} ${chapter.chapterNumber} ${chapter.entries
          .map(item => `${item.chapterTitle} ${item.topic}`)
          .join(" ")}`
          .toLowerCase()
          .includes(search))
  );
}

export function getRecoveryReviewQueue() {
  return [
    {
      id: "legacy-1400q",
      title: "1400q legacy question bank",
      target: "Qbank SEG after answer-key repair",
      status: "quarantined-missing-correct-answers" as const,
      reason:
        "The recovered text has question stems and options, but correct-answer fields are blank in the supplied artifact.",
    },
    {
      id: "legacy-pretest",
      title: "PreTest legacy question bank",
      target: "Qbank SEG after OCR repair",
      status: "quarantined-ocr-corruption" as const,
      reason:
        "The recovered text contains systematic OCR corruption, including missing letters inside clinical stems and options.",
    },
    {
      id: "legacy-osce-images",
      title: "OSCE visual image files",
      target: "Atlas & Visual Assets",
      status: "text-only-images-missing" as const,
      reason: "The station index exists, but the referenced image files were not present in the supplied package.",
    },
  ];
}

export async function listRecoveredOsceStations(input?: SectionFilterInput) {
  const text = await fetchText("/content/osce/OSCE_Emergency_Medicine_Imaging_Section_UTF8.txt");
  const matches = Array.from(
    text.matchAll(/^STATION\s+(\d+)\s+—\s+(.+)$(?:\r?\n)IMAGE:\s+images\/(.+)$(?:\r?\n)SOURCE PAGE:\s+(\d+)/gm)
  );
  return matches
    .map(match => ({
      stationNumber: Number(match[1]),
      title: match[2].trim(),
      expectedImage: match[3].trim(),
      sourcePage: Number(match[4]),
      assetStatus: "missing-from-final-package" as const,
      reviewStatus: "private-pilot-under-review" as const,
      ...classifyRecoveredItem(match[2].trim(), match[3].trim(), "OSCE"),
    }))
    .filter(item => !input?.sectionId || item.sectionId === input.sectionId);
}
