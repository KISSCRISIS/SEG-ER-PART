import { readFile, mkdir, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { gradeSelectedAnswer, resolveCorrectAnswerKey } from "@shared/qbank-answer";
import { calculateTopicProgress } from "@shared/study-plan-intelligence";
import {
  classifyResidentChapter,
  getResidentSection,
  RESIDENT_PATHWAY_SECTIONS,
} from "@shared/resident-taxonomy";

export type QuestionFamily =
  | "EDIC"
  | "FRCEM"
  | "HIPPO"
  | "OXFORD_SCE"
  | "PEER_2026"
  | "PEER_PHYSICIANS"
  | "ROSEN_10E"
  | "ROSH_2026"
  | "TINTINALLI_9E"
  | "AQRAB"
  | "IMPORTED";
type StudyFamily = "FRCEM" | "HIPPO";
type Family = QuestionFamily;
type Question = {
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
type RawQuestion = Omit<Question, "family"> & {
  family?: Family | "EDIC SBA 2026" | "PEER" | "thoracorespiratory" | "trauma" | "key-advances" | "Aqrab";
  chapterNumber?: number;
};
type StudyChapter = {
  id: string;
  family: StudyFamily;
  chapterNumber: number;
  chapterTitle: string;
  bilingualStudyContent: string;
  governanceStatus: "under-review";
};

const root = path.resolve(
  process.env.SEG_CONTENT_ROOT ?? ".",
  "SEG_CONTENT_LIBRARY",
  "02_PROCESSED_CONTENT",
  "RESIDENT_EMERGENCY_MEDICINE"
);
export const residentContentCache = {
  get: (): Promise<Question[] | undefined> => cache?.then(c => c.questions),
};

export function resetResidentContentCache(): void {
  cache = undefined;
}

let cache:
  | Promise<{ questions: Question[]; chapters: StudyChapter[] }>
  | undefined;

async function load() {
  cache ??= Promise.all([
    readFile(path.join(root, "edic-sba-2026-question-bank.jsonl"), "utf8"),
    readFile(path.join(root, "frcem-question-bank.jsonl"), "utf8"),
    readFile(path.join(root, "hippo-question-bank.jsonl"), "utf8"),
    readFile(path.join(root, "oxford-sce-question-bank.jsonl"), "utf8"),
    readFile(
      path.join(root, "peer-physicians-case-series-2026-question-bank.jsonl"),
      "utf8"
    ),
    readFile(
      path.join(root, "peer-physicians-2026-unified-question-bank.jsonl"),
      "utf8"
    ),
    readFile(path.join(root, "rosen-10e-question-bank.jsonl"), "utf8"),
    readFile(path.join(root, "rosh-initial-certification-2026-merged-four-files-question-bank.jsonl"), "utf8"),
    readFile(path.join(root, "tintinalli-9e-question-bank.jsonl"), "utf8"),
    readFile(path.join(root, "aqrab-question-bank.jsonl"), "utf8"),
    readFile(path.join(root, "frcem-study-book.json"), "utf8"),
    readFile(path.join(root, "hippo-study-book.json"), "utf8"),
  ]).then(async ([eq, fq, hq, oq, pq, upq, rq, roq, tq, aqrab, fs, hs]) => {
    const normalizeQuestion = (question: RawQuestion, isPeer: boolean): Question => {
      if (
        question.sourceId === "qbank-edic-sba-2026" ||
        question.family === "EDIC SBA 2026"
      ) {
        return { ...question, family: "EDIC", chapterNumber: question.chapterNumber ?? 0 };
      }
      if (question.sourceId === "qbank-peer-physicians-2026-unified") {
        return { ...question, family: "PEER_2026" };
      }
      if (question.family === "Aqrab" || question.family === "AQRAB") {
        return { ...question, family: "AQRAB" };
      }
      if (isPeer) {
        return {
          ...question,
          family: "PEER_PHYSICIANS",
          sourceId: "qbank-peer-physicians-case-series-2026",
          correctAnswer:
            question.correctAnswer ||
            question.options.find(option => option.key === question.correctAnswerKey)?.text ||
            "",
        };
      }
      return question as Question;
    };
    const staticQuestions = [eq, fq, hq, oq, pq, upq, rq, roq, tq, aqrab]
      .flatMap((content, index) =>
        content.trim().split("\n")
          .map(line => JSON.parse(line) as RawQuestion)
          .filter(question => question.practiceEligible !== false)
          .map(question => normalizeQuestion(question, index === 4))
          .flatMap(question => {
            const correctAnswerKey = resolveCorrectAnswerKey(question);
            return correctAnswerKey ? [{ ...question, correctAnswerKey }] : [];
          })
      );
    // Load imported questions from separate user store (separate from original banks)
    let importedQuestions: Question[] = [];
    try {
      const importDir = process.env.SEG_LOCAL_DATA_DIR ? path.join(process.env.SEG_LOCAL_DATA_DIR, "imported-questions") : path.join(root, "user-imported");
      const files = await readdir(importDir, { withFileTypes: true }).catch(() => []);
      const importedFiles = (files as import("node:fs").Dirent[]).filter(e => e.isFile() && (e.name.endsWith(".jsonl") || e.name.endsWith(".json")));
      for (const f of importedFiles) {
        const text = await readFile(path.join(importDir, f.name), "utf8");
        const lines = text.trim().split(/\r?\n/).filter(l => l.trim());
        for (const line of lines) {
          try {
            const raw = JSON.parse(line) as RawQuestion;
            const q = { ...raw, family: "IMPORTED" as Family, correctAnswerKey: raw.correctAnswerKey ?? resolveCorrectAnswerKey(raw) ?? "", correctAnswer: raw.correctAnswer ?? (raw.options?.find(o => o.key === raw.correctAnswerKey)?.text ?? ""), chapterNumber: raw.chapterNumber ?? 1, chapterTitle: raw.chapterTitle ?? "Imported", sourceQuestionNumber: raw.sourceQuestionNumber ?? 0 };
            if (q.correctAnswerKey) importedQuestions.push(q as Question);
          } catch { /* skip bad line */ }
        }
      }
    } catch { /* import store unavailable */ }
    return {
      questions: [...staticQuestions, ...importedQuestions],
      chapters: [
        ...(JSON.parse(fs) as StudyChapter[]),
        ...(JSON.parse(hs) as StudyChapter[]),
      ],
    };
  });
  return cache;
}

export async function listAllQuestionIds(): Promise<string[]> {
  try {
    return await load().then(c => c.questions.map(q => q.id));
  } catch {
    return [];
  }
}

export async function listImportedQuestionIds(): Promise<Set<string>> {
  const existing = new Set<string>(await listAllQuestionIds());
  // Append imported store ids so duplicate detection covers re-imports across sessions
  try {
    const importedFiles = await readdir(
      process.env.SEG_LOCAL_DATA_DIR ? path.join(process.env.SEG_LOCAL_DATA_DIR, "imported-questions") : "",
      { withFileTypes: true }
    ).catch(async () => []);
    for (const file of importedFiles) {
      if (!file.isFile()) continue;
      const text = await readFile(
        path.join(process.env.SEG_LOCAL_DATA_DIR ? path.join(process.env.SEG_LOCAL_DATA_DIR, "imported-questions") : ".", file.name),
        "utf8"
      );
      for (const line of text.split(/\r?\n/)) {
        if (!line.trim()) continue;
        try {
          const obj = JSON.parse(line);
          if (obj && typeof obj.id === "string") existing.add(obj.id);
        } catch {
          // skip malformed
        }
      }
    }
  } catch {
    // non-local mode or unavailable
  }
  return existing;
}

export async function listResidentChapters(family?: Family) {
  const data = await load();
  return data.chapters
    .filter(item => !family || item.family === family)
    .map(chapter => ({
      ...chapter,
      bilingualStudyContent: undefined,
      sectionId: classifyResidentChapter(chapter.chapterTitle),
      sectionTitle:
        getResidentSection(
          classifyResidentChapter(chapter.chapterTitle)
        )?.[1] ?? "Emergency Medicine Foundations",
      questionCount: data.questions.filter(
        question =>
          question.family === chapter.family &&
          question.chapterNumber === chapter.chapterNumber
      ).length,
    }));
}

export async function getResidentStudyChapter(
  family: StudyFamily,
  chapterNumber: number
) {
  const data = await load();
  const chapter = data.chapters.find(
    item => item.family === family && item.chapterNumber === chapterNumber
  );
  if (!chapter) return null;
  const sectionId = classifyResidentChapter(chapter.chapterTitle);
  return {
    ...chapter,
    sectionId,
    sectionTitle:
      getResidentSection(sectionId)?.[1] ?? "Emergency Medicine Foundations",
  };
}

export async function getResidentQuestion(questionId: string) {
  const data = await load();
  return data.questions.find(item => item.id === questionId) ?? null;
}

/** Correct legacy attempt flags in memory without changing stored audit records. */
export async function regradeResidentAttempts<T extends { questionId: string; selectedAnswer: string; correct: number }>(attempts: T[]) {
  const data = await load();
  const byId = new Map(data.questions.map(question => [question.id, question]));
  const corrected: T[] = [];
  let excluded = 0;
  for (const attempt of attempts) {
    const question = byId.get(attempt.questionId);
    const result = question ? gradeSelectedAnswer(question, attempt.selectedAnswer) : null;
    if (result === null) { excluded++; continue; }
    corrected.push({ ...attempt, correct: Number(result) });
  }
  return { attempts: corrected, excluded };
}

function withSection(item: Question) {
  const sectionId = classifyResidentChapter(item.chapterTitle);
  return {
    ...item,
    sectionId,
    sectionTitle:
      getResidentSection(sectionId)?.[1] ?? "Emergency Medicine Foundations",
  };
}

export async function getResidentQuestionsByIds(questionIds: string[]) {
  const data = await load();
  const byId = new Map(data.questions.map(item => [item.id, item]));
  return questionIds
    .map(id => byId.get(id))
    .filter((item): item is Question => Boolean(item))
    .map(withSection);
}

export async function getResidentQuestionsBatch(
  questionIds: string[],
  offset: number,
  limit: number,
) {
  const slice = questionIds.slice(offset, offset + limit);
  const items = await getResidentQuestionsByIds(slice);
  // Preserve original slice order and filter missing ids
  const byId = new Map(items.map(item => [item.id, item]));
  const ordered = slice.map(id => byId.get(id)).filter((item): item is NonNullable<typeof item> => Boolean(item));
  return { total: questionIds.length, offset, limit, items: ordered };
}

export async function listResidentQuestionCatalog() {
  const data = await load();
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
  const data = await load();
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
    if (search && !`${question.question} ${question.chapterTitle} ${question.arabicExplanation ?? ""} ${question.englishExplanation ?? ""}`.toLowerCase().includes(search)) return false;
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
  const data = await load();
  const search = input.search?.trim().toLowerCase();
  const filtered = data.questions.filter(
    item =>
      (!input.family || item.family === input.family) &&
      (!input.families?.length || input.families.includes(item.family)) &&
      (!input.chapterNumber || item.chapterNumber === input.chapterNumber) &&
      (!input.sectionId ||
        classifyResidentChapter(item.chapterTitle) === input.sectionId) &&
      (!input.includeSectionIds?.length ||
        input.includeSectionIds.includes(
          classifyResidentChapter(item.chapterTitle)
        )) &&
      (!input.excludeSectionIds?.length ||
        !input.excludeSectionIds.includes(
          classifyResidentChapter(item.chapterTitle)
        )) &&
      (!search ||
        `${item.question} ${item.chapterTitle} ${item.arabicExplanation ?? ""} ${item.englishExplanation ?? ""}`
          .toLowerCase()
          .includes(search))
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
  const data = await load();
  const byId = new Map(data.questions.map(item => [item.id, item]));
  const sectionMap = new Map<
    number,
    {
      sectionId: number;
      sectionTitle: string;
      attempted: number;
      correct: number;
      accuracy: number;
      questionCount: number;
    }
  >();
  const familyMap = new Map<
    Family,
    { family: Family; attempted: number; correct: number; accuracy: number }
  >();

  for (const [id, title] of RESIDENT_PATHWAY_SECTIONS) {
    sectionMap.set(id, {
      sectionId: id,
      sectionTitle: title,
      attempted: 0,
      correct: 0,
      accuracy: 0,
      questionCount: data.questions.filter(
        question => classifyResidentChapter(question.chapterTitle) === id
      ).length,
    });
  }

  for (const attempt of attempts) {
    const question = byId.get(attempt.questionId);
    const sectionId = question
      ? classifyResidentChapter(question.chapterTitle)
      : 2;
    const section = sectionMap.get(sectionId);
    if (section) {
      section.attempted += 1;
      section.correct += Number(attempt.correct ? 1 : 0);
    }
    const family = question?.family ?? attempt.family;
    const familyRow =
      familyMap.get(family) ??
      ({ family, attempted: 0, correct: 0, accuracy: 0 } as const);
    familyMap.set(family, {
      ...familyRow,
      attempted: familyRow.attempted + 1,
      correct: familyRow.correct + Number(attempt.correct ? 1 : 0),
    });
  }

  const sections = Array.from(sectionMap.values()).map(item => ({
    ...item,
    accuracy: item.attempted
      ? Math.round((item.correct / item.attempted) * 100)
      : 0,
  }));
  const byFamily = Array.from(familyMap.values()).map(item => ({
    ...item,
    accuracy: item.attempted
      ? Math.round((item.correct / item.attempted) * 100)
      : 0,
  }));
  const activeSections = sections.filter(item => item.attempted > 0);
  const strongest = [...activeSections]
    .sort((a, b) => b.accuracy - a.accuracy || b.attempted - a.attempted)
    .slice(0, 4);
  const weakest = [...activeSections]
    .sort((a, b) => a.accuracy - b.accuracy || b.attempted - a.attempted)
    .slice(0, 4);
  const totalAttempted = attempts.length;
  const totalCorrect = attempts.filter(item => item.correct).length;

  return {
    attempted: totalAttempted,
    correct: totalCorrect,
    accuracy: totalAttempted
      ? Math.round((totalCorrect / totalAttempted) * 100)
      : 0,
    sections,
    byFamily,
    strongest,
    weakest,
    nextRecommendedSection:
      weakest[0] ??
      sections
        .filter(item => item.questionCount > 0)
        .sort((a, b) => b.questionCount - a.questionCount)[0],
  };
}

export interface TopicProgressRow {
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
}

/**
 * Per-topic (family + chapter) progress from existing signals only:
 * study-completion rows plus question history. Latest attempt per question
 * decides correctness; bank JSONL stays the primary content source.
 */
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
  progress: {
    family: string;
    chapterNumber: number;
    completed: unknown;
  }[];
}): Promise<TopicProgressRow[]> {
  const data = await load();
  const byId = new Map(data.questions.map(question => [question.id, question]));
  const latest = new Map<string, number>();
  for (const attempt of input.attempts) {
    latest.set(attempt.questionId, Number(attempt.correct ? 1 : 0));
  }
  const done = new Set(
    input.progress
      .filter(row => row.completed)
      .map(row => `${row.family}:${row.chapterNumber}`)
  );
  return input.chapters.map(chapter => {
    const topicAttempts = Array.from(latest.entries()).filter(([questionId]) => {
      const question = byId.get(questionId);
      return (
        question?.family === chapter.family &&
        question?.chapterNumber === chapter.chapterNumber
      );
    });
    const attempted = topicAttempts.length;
    const correct = topicAttempts.reduce((sum, [, value]) => sum + value, 0);
    const accuracy = attempted ? correct / attempted : 0;
    const coverage = chapter.questionCount
      ? attempted / chapter.questionCount
      : 0;
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
