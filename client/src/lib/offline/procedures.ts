/**
 * Offline procedures — device implementation of every tRPC procedure the
 * client calls (server/routers.ts contract), backed by content.ts (static
 * /content bundle) and store.ts (device persistence).
 *
 * Validation mirrors the server's essential guards (unknown ids, task
 * ownership, valid options). Full zod schemas live server-side; the client
 * forms already constrain input shapes.
 */
import { UNAUTHED_ERR_MSG } from "@shared/const";
import { gradeSelectedAnswer } from "@shared/qbank-answer";
import {
  getVisibleBatchIndices,
  SMART_EXAM_BATCH_SIZE,
  SMART_EXAM_THRESHOLD,
} from "@shared/smart-exam-cache";
import { isCalendarDate } from "@shared/study-calendar";
import { buildStudyPlan } from "@shared/study-plan-engine";
import {
  getResidentQuestion,
  getResidentQuestionsBatch,
  getResidentQuestionsByIds,
  getResidentStudyChapter,
  getRecoveryReviewQueue,
  listRecoveredChapterStudyMap,
  listRecoveredExamTraps,
  listRecoveredFlashcards,
  listRecoveredOsceStations,
  listRecoveredReferences,
  listRecoveredTopicFamilies,
  listResidentChapters,
  listResidentQuestionCatalog,
  listResidentQuestions,
  regradeResidentAttempts,
  selectResidentSessionQuestions,
  summarizeResidentPerformance,
  summarizeTopicProgress,
  type Family,
} from "./content";
import {
  clearSession,
  getCurrentUser,
  getLearningProfile,
  getOrCreateLocalUser,
  normalizeEmail,
  updateAccountProfile,
  type OfflineUser,
} from "./session";
import { deleteDoc, listDocs, putDoc, updateDoc } from "./store";

const USER_ID = 1;

async function requireUser(): Promise<OfflineUser> {
  const user = await getCurrentUser();
  if (!user) throw new Error(UNAUTHED_ERR_MSG);
  return user;
}

function deviceUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}

// ===========================================================================
// Question history / attempts / states
// ===========================================================================

export type AttemptDoc = {
  id: number;
  userId: number;
  questionId: string;
  family: string;
  chapterNumber: number;
  selectedAnswer: string;
  correct: number;
  attemptedAt: Date;
};

export type QuestionStateDoc = {
  userId: number;
  questionId: string;
  flagged: number;
  skipped: number;
  updatedAt: Date;
};

async function getQuestionHistory() {
  const attempts = (await listDocs<AttemptDoc>("attempts", USER_ID)).sort(
    (a, b) => b.attemptedAt.getTime() - a.attemptedAt.getTime()
  );
  const states = await listDocs<QuestionStateDoc>("states", USER_ID);
  return { attempts, states };
}

async function recordResidentQuestionAttempt(input: {
  questionId: string;
  family: string;
  chapterNumber: number;
  selectedAnswer: string;
  correct: boolean;
}): Promise<void> {
  const rows = await listDocs<AttemptDoc>("attempts", USER_ID);
  const id = rows.reduce((max, row) => Math.max(max, row.id), 0) + 1;
  await putDoc<AttemptDoc>("attempts", USER_ID, String(id), {
    ...input,
    userId: USER_ID,
    id,
    correct: Number(input.correct),
    attemptedAt: new Date(),
  });
}

async function setQuestionState(questionId: string, values: { flagged?: boolean; skipped?: boolean }): Promise<void> {
  const previous = (await listDocs<QuestionStateDoc>("states", USER_ID)).find(row => row.questionId === questionId);
  await putDoc<QuestionStateDoc>("states", USER_ID, questionId, {
    userId: USER_ID,
    questionId,
    flagged: values.flagged === undefined ? (previous?.flagged ?? 0) : Number(values.flagged),
    skipped: values.skipped === undefined ? (previous?.skipped ?? 0) : Number(values.skipped),
    updatedAt: new Date(),
  });
}

// ===========================================================================
// auth / account
// ===========================================================================

export const authProcedures = {
  me: async (): Promise<OfflineUser | null> => getCurrentUser(),
  login: async (input: { email: string; remember: boolean }): Promise<{ user: OfflineUser }> => {
    const user = await getOrCreateLocalUser(input.email);
    return { user };
  },
  register: async (input: {
    fullName: string;
    email: string;
    professionalTrack: string;
    country?: string;
    graduationYear?: number;
    preferredLanguage: "en" | "ar";
  }): Promise<{ email: string; verificationRequired: false; pilotVerificationCode: null }> => {
    const email = normalizeEmail(input.email);
    await getOrCreateLocalUser(email, input.fullName.trim());
    await updateAccountProfile({
      fullName: input.fullName.trim(),
      professionalTrack: input.professionalTrack.trim(),
      trainingLevel: "pgy1",
      country: input.country,
      graduationYear: input.graduationYear,
      preferredLanguage: input.preferredLanguage,
    });
    // Device-local account: no email round-trip, verification is vacuous.
    return { email, verificationRequired: false as const, pilotVerificationCode: null };
  },
  verifyEmail: async (): Promise<{ success: true }> => ({ success: true as const }),
  resendVerification: async (): Promise<{ success: true; pilotVerificationCode: null }> => ({
    success: true as const,
    pilotVerificationCode: null,
  }),
  logout: async (): Promise<{ success: true }> => {
    await clearSession();
    return { success: true as const };
  },
};

export const accountProcedures = {
  profile: async () => {
    const user = await requireUser();
    return { user, learningProfile: await getLearningProfile() };
  },
  updateProfile: async (input: {
    fullName: string;
    professionalTrack: string;
    trainingLevel: string;
    country?: string | null;
    graduationYear?: number | null;
    preferredLanguage: "en" | "ar";
  }): Promise<{ success: true }> => {
    await requireUser();
    await updateAccountProfile(input);
    return { success: true as const };
  },
};

// ===========================================================================
// learningProgress
// ===========================================================================

export type LearningItemDoc = {
  userId: number;
  track: string;
  contentType: string;
  contentId: string;
  completed: number;
  completedAt: Date | null;
  updatedAt: Date;
};

async function listLearningItemProgress(track: string, contentType?: string) {
  return (await listDocs<LearningItemDoc>("learning-item-progress", USER_ID)).filter(
    row => row.track === track && (!contentType || row.contentType === contentType)
  );
}

export const learningProgressProcedures = {
  current: async (input: { track: string; contentType?: string }) => {
    const rows = await listLearningItemProgress(input.track, input.contentType);
    return {
      items: rows,
      completedIds: rows.filter(row => Boolean(row.completed)).map(row => row.contentId),
    };
  },
  set: async (input: { track: string; contentType: string; contentId: string; completed: boolean }) => {
    await requireUser();
    const now = new Date();
    const row: LearningItemDoc = {
      ...input,
      userId: USER_ID,
      completed: Number(input.completed),
      completedAt: input.completed ? now : null,
      updatedAt: now,
    };
    await putDoc("learning-item-progress", USER_ID, `${input.track}:${input.contentType}:${input.contentId}`, row);
    return row;
  },
};

// ===========================================================================
// revisionProgress (exam traps)
// ===========================================================================

export type TrapRecordDoc = {
  trapId: string;
  completed: boolean;
  completedAt: Date | null;
  updatedAt: Date;
};

async function trapCatalog() {
  const first = await listRecoveredExamTraps({ page: 1, pageSize: 50 });
  const rest = await Promise.all(
    Array.from({ length: Math.ceil(first.total / 50) - 1 }, (_, index) =>
      listRecoveredExamTraps({ page: index + 2, pageSize: 50 })
    )
  );
  return [...first.items, ...rest.flatMap(page => page.items)];
}

async function getTrapProgress() {
  const items = await trapCatalog();
  const rows = await listDocs<TrapRecordDoc>("trapProgress", USER_ID);
  const completed = new Set(rows.filter(row => row.completed).map(row => row.trapId));
  const completedIds = items.filter(item => completed.has(item.id)).map(item => item.id);
  const nextIndex = items.findIndex(item => !completed.has(item.id));
  return {
    completedIds,
    recordedIds: rows.map(row => row.trapId),
    completed: completedIds.length,
    total: items.length,
    remaining: items.length - completedIds.length,
    percentage: items.length ? Math.round((completedIds.length / items.length) * 100) : 0,
    requirementCompleted: items.length > 0 && completedIds.length === items.length,
    nextHref: nextIndex < 0 ? null : `/practice/exam-traps?page=${Math.floor(nextIndex / 50) + 1}#${items[nextIndex].id}`,
  };
}

export const revisionProgressProcedures = {
  current: async () => {
    await requireUser();
    return getTrapProgress();
  },
  set: async (input: { trapId: string; completed: boolean }): Promise<{ success: true }> => {
    await requireUser();
    if (!(await trapCatalog()).some(item => item.id === input.trapId)) {
      throw new Error("Unknown exam trap");
    }
    const existing = (await listDocs<TrapRecordDoc>("trapProgress", USER_ID)).find(row => row.trapId === input.trapId);
    if (existing?.completed === input.completed) return { success: true as const };
    await putDoc<TrapRecordDoc>("trapProgress", USER_ID, input.trapId, {
      trapId: input.trapId,
      completed: input.completed,
      completedAt: input.completed ? new Date() : null,
      updatedAt: new Date(),
    });
    return { success: true as const };
  },
  importLocal: async (input: { ids: string[] }): Promise<{ success: true }> => {
    await requireUser();
    const valid = new Set((await trapCatalog()).map(item => item.id));
    const existing = new Set((await listDocs<TrapRecordDoc>("trapProgress", USER_ID)).map(row => row.trapId));
    for (const id of Array.from(new Set(input.ids))) {
      if (valid.has(id) && !existing.has(id)) {
        await putDoc<TrapRecordDoc>("trapProgress", USER_ID, id, {
          trapId: id,
          completed: true,
          completedAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    return { success: true as const };
  },
};

// ===========================================================================
// studyPlan
// ===========================================================================

export type StudyPlanDoc = {
  userId: number;
  planId: string;
  examDate?: string;
  dailyHours: number;
  restDays: number[];
  updatedAt: Date;
  [key: string]: unknown;
};

export type DailyPlanDoc = {
  id: string;
  date: string;
  planId: string;
  tasks: Array<{ id: string; kind: string; minutes: number; title: string; href: string; priority: string }>;
  createdAt: Date;
};

export type TaskCompletionDoc = {
  date: string;
  taskId: string;
  completed: boolean;
  updatedAt: Date;
};

async function getStudyPlan(): Promise<StudyPlanDoc | null> {
  return (await listDocs<StudyPlanDoc>("studyPlans", USER_ID))[0] ?? null;
}

async function planProgress() {
  const [chapters, frcem, hippo, rawHistory, learningItems, traps] = await Promise.all([
    listResidentChapters(),
    getResidentStudyProgressDocs("FRCEM"),
    getResidentStudyProgressDocs("HIPPO"),
    getQuestionHistory(),
    listLearningItemProgress("resident-emergency-medicine"),
    getTrapProgress(),
  ]);
  const history = await regradeResidentAttempts(rawHistory.attempts);
  const practice = {
    attempted: history.attempts.length,
    correct: history.attempts.reduce((sum, attempt) => sum + attempt.correct, 0),
  };
  const done = new Set(
    [...frcem, ...hippo].filter(row => row.completed).map(row => `${row.family}:${row.chapterNumber}`)
  );
  const latest = new Map<string, (typeof history.attempts)[number]>();
  for (const attempt of history.attempts) {
    const previous = latest.get(attempt.questionId);
    if (!previous || new Date(attempt.attemptedAt) > new Date(previous.attemptedAt)) latest.set(attempt.questionId, attempt);
  }
  const weakAreas = Array.from(
    new Set(
      Array.from(latest.values())
        .filter(row => !row.correct)
        .map(row => {
          const chapter = chapters.find(item => item.family === row.family && item.chapterNumber === row.chapterNumber);
          return chapter?.chapterTitle ?? `${row.family} / ${row.chapterNumber}`;
        })
    )
  ).slice(0, 30);
  const nextChapter = chapters.find(chapter => !done.has(`${chapter.family}:${chapter.chapterNumber}`));
  const weakChapter = chapters.find(chapter => weakAreas.includes(chapter.chapterTitle));
  return {
    nextReading: nextChapter
      ? {
          title: nextChapter.chapterTitle,
          href: `/learn?section=${nextChapter.sectionId}&family=${nextChapter.family}&chapter=${nextChapter.chapterNumber}`,
        }
      : undefined,
    nextPractice:
      weakChapter || nextChapter
        ? {
            title: (weakChapter ?? nextChapter)?.sectionTitle,
            href: `/practice/create?section=${(weakChapter ?? nextChapter)?.sectionId}`,
          }
        : undefined,
    completedContent:
      chapters.filter(chapter => done.has(`${chapter.family}:${chapter.chapterNumber}`)).length +
      learningItems.filter(
        row => row.completed && ["tintinalli-summary-chapter", "rosh-summary-chapter", "rosen-summary-chapter", "unified-guide-unit"].includes(row.contentType)
      ).length +
      traps.completed,
    totalContent: chapters.length + 189 + 12 + 6 + 252 + traps.total,
    qbankCorrect: practice.correct,
    qbankAttempted: practice.attempted,
    weakAreas,
  };
}

async function getOrCreateDailyPlan(date: string, planId: string, tasks: DailyPlanDoc["tasks"]) {
  const id = `${date}:${planId}`;
  const saved = (await listDocs<DailyPlanDoc>("dailyPlans", USER_ID)).find(row => row.id === id);
  if (saved) return saved.tasks;
  await putDoc<DailyPlanDoc>("dailyPlans", USER_ID, id, { id, date, planId, tasks, createdAt: new Date() });
  return tasks;
}

export const studyPlanProcedures = {
  today: async () => {
    await requireUser();
    const saved = await getStudyPlan();
    if (!saved) return null;
    const now = new Date();
    const date = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Amman",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);
    const progress = await planProgress();
    const plan = buildStudyPlan({ ...(saved as object), ...progress } as never, new Date(`${date}T12:00:00`));
    for (const task of plan.dailyTasks) {
      const target =
        task.kind === "learn" ? progress.nextReading : task.kind === "practice" || task.kind === "review" ? progress.nextPractice : undefined;
      if (target) {
        task.href = target.href;
        task.title = `${task.kind === "learn" ? "Read" : "Practice"}: ${target.title}`;
      }
    }
    return { date, tasks: await getOrCreateDailyPlan(date, saved.planId, plan.dailyTasks) };
  },
  taskCompletions: async (input: { date: string }) => {
    await requireUser();
    return (await listDocs<TaskCompletionDoc>("studyTaskCompletions", USER_ID)).filter(row => row.date === input.date);
  },
  completeTask: async (input: { date: string; taskId: string; completed: boolean }): Promise<{ success: true }> => {
    await requireUser();
    if (!isCalendarDate(input.date)) throw new Error("Invalid task date");
    if (!/^(residency-year-[1-4]|jordan-board-part-[12])-(learn|practice|atlas|journal|weak-area)$/.test(input.taskId)) {
      throw new Error("Task must belong to your saved plan");
    }
    const plan = await getStudyPlan();
    if (!plan || !input.taskId.startsWith(`${plan.planId}-`)) throw new Error("Task must belong to your saved plan");
    const assigned = (await listDocs<DailyPlanDoc>("dailyPlans", USER_ID)).some(
      day => day.date === input.date && day.tasks.some(task => task.id === input.taskId)
    );
    if (!assigned) throw new Error("Task is not assigned in the saved daily plan");
    await putDoc<TaskCompletionDoc>("studyTaskCompletions", USER_ID, `${input.date}:${input.taskId}`, {
      ...input,
      updatedAt: new Date(),
    });
    return { success: true as const };
  },
  current: async () => {
    await requireUser();
    const saved = await getStudyPlan();
    return saved ? { ...saved, ...(await planProgress()) } : null;
  },
  save: async (input: { planId: string; examDate?: string; dailyHours: number; restDays: number[] }) => {
    await requireUser();
    const plan = { ...input, ...(await planProgress()) };
    await putDoc<StudyPlanDoc>("studyPlans", USER_ID, "current", { ...plan, userId: USER_ID, updatedAt: new Date() });
    return plan;
  },
};

// ===========================================================================
// resident study progress (chapter completion)
// ===========================================================================

export type StudyProgressDoc = {
  id: number;
  userId: number;
  family: string;
  chapterNumber: number;
  completed: number;
  lastReadAt: Date;
};

async function getResidentStudyProgressDocs(family: string) {
  return (await listDocs<StudyProgressDoc>("progress", USER_ID)).filter(row => row.family === family);
}

// ===========================================================================
// qbank exams
// ===========================================================================

export type ExamDoc = {
  id: string;
  userId: number;
  name: string;
  mode: string;
  timeMode: string;
  status: string;
  configuration: Record<string, unknown>;
  questionIds: string[];
  answers: Record<string, string>;
  results: Record<string, { correct: boolean; correctAnswer: string }>;
  flaggedQuestionIds: string[];
  currentIndex: number;
  remainingSeconds: number | null;
  correctCount: number | null;
  startedAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
};

async function listQbankExams(): Promise<ExamDoc[]> {
  return (await listDocs<ExamDoc>("exams", USER_ID)).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}

async function withBankArabic<T extends { id: string; arabicExplanation?: string }>(items: T[]): Promise<T[]> {
  // Offline: bank text only. On-demand translation needs connectivity and is
  // reported unavailable (arabicTranslationAvailability → false).
  return items;
}

// In-memory batch cache (server used SQLite for this; device memory suffices).
const examBatchCache = new Map<string, { questionIds: string[]; questions: Awaited<ReturnType<typeof getResidentQuestionsByIds>> }>();

function batchCacheKey(examId: string, batchIndex: number): string {
  return `${examId}::batch::${batchIndex}`;
}

async function loadExamBatch(examId: string, questionIds: string[], batchIndex: number, batchSize: number) {
  const key = batchCacheKey(examId, batchIndex);
  const expectedIds = questionIds.slice(batchIndex * batchSize, (batchIndex + 1) * batchSize);
  const cached = examBatchCache.get(key);
  if (cached && cached.questionIds.length === expectedIds.length && cached.questionIds.every((id, i) => id === expectedIds[i])) {
    return cached.questions;
  }
  if (!expectedIds.length) return [];
  const questions = await getResidentQuestionsByIds(expectedIds);
  examBatchCache.set(key, { questionIds: expectedIds, questions });
  return questions;
}

async function loadCurrentWindowWithPrefetch(examId: string, questionIds: string[], currentIndex: number, batchSize: number) {
  const indices = getVisibleBatchIndices(questionIds, currentIndex, batchSize);
  const batches = await Promise.all(indices.map(idx => loadExamBatch(examId, questionIds, idx, batchSize)));
  return batches.flat();
}

export const qbankProcedures = {
  exams: async () => {
    await requireUser();
    const exams = await listQbankExams();
    const ids = Array.from(new Set(exams.flatMap(exam => exam.questionIds)));
    const questions = await getResidentQuestionsByIds(ids);
    const byId = new Map(questions.map(question => [question.id, question]));
    return exams.map(exam => {
      const answers = exam.answers ?? {};
      const previousResults = exam.results ?? {};
      const correctedResults: Record<string, { correct: boolean; correctAnswer: string }> =
        exam.status === "completed" ? {} : { ...previousResults };
      for (const [id, answer] of Object.entries(answers)) {
        if (exam.status !== "completed" && !(id in previousResults)) continue;
        const question = byId.get(id);
        const correct = question ? gradeSelectedAnswer(question, answer) : null;
        if (correct !== null && question) correctedResults[id] = { correct, correctAnswer: question.correctAnswer };
        else delete correctedResults[id];
      }
      return {
        ...exam,
        results: correctedResults,
        correctCount:
          exam.status === "completed"
            ? Object.values(correctedResults).filter(result => result.correct).length
            : exam.correctCount,
      };
    });
  },
  history: async () => {
    await requireUser();
    const history = await getQuestionHistory();
    const corrected = await regradeResidentAttempts(history.attempts);
    return { ...history, attempts: corrected.attempts, excludedAttemptCount: corrected.excluded };
  },
  createExam: async (input: {
    name: string;
    mode: string;
    timeMode: string;
    configuration: Record<string, unknown>;
    questionIds: string[];
    remainingSeconds?: number | null;
  }) => {
    await requireUser();
    const now = new Date();
    const { remainingSeconds, ...rest } = input;
    const exam: ExamDoc = {
      status: "active",
      currentIndex: 0,
      remainingSeconds: remainingSeconds ?? null,
      correctCount: null,
      completedAt: null,
      startedAt: now,
      updatedAt: now,
      ...rest,
      id: deviceUUID(),
      userId: USER_ID,
      answers: {},
      results: {},
      flaggedQuestionIds: [],
    };
    await putDoc("exams", USER_ID, exam.id, exam);
    return exam;
  },
  updateExam: async (input: {
    id: string;
    status: string;
    answers: Record<string, string>;
    results?: Record<string, { correct: boolean; correctAnswer: string }>;
    flaggedQuestionIds: string[];
    currentIndex: number;
    remainingSeconds: number | null;
    correctCount?: number | null;
  }): Promise<{ success: true }> => {
    await requireUser();
    const { id, ...values } = input;
    await updateDoc<ExamDoc>("exams", USER_ID, id, {
      ...values,
      completedAt: input.status === "completed" ? new Date() : null,
      updatedAt: new Date(),
    });
    return { success: true as const };
  },
  setQuestionState: async (input: { questionId: string; flagged?: boolean; skipped?: boolean }): Promise<{ success: true }> => {
    await requireUser();
    await setQuestionState(input.questionId, input);
    return { success: true as const };
  },
  reportIssue: async (input: { questionId: string; issueType: string; details: string }): Promise<{ success: true }> => {
    await requireUser();
    // No connectivity: reports wait in a device outbox instead of being lost.
    await putDoc("issues", USER_ID, deviceUUID(), {
      id: deviceUUID(),
      userId: USER_ID,
      itemType: "question",
      itemId: input.questionId,
      issueType: input.issueType,
      details: input.details,
      status: "open",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { success: true as const };
  },
  examBatch: async (input: { examId: string; currentIndex: number; batchSize?: number }) => {
    await requireUser();
    const exams = await listQbankExams();
    const exam = exams.find(e => e.id === input.examId);
    if (!exam) throw new Error("Exam not found");
    const questionIds = exam.questionIds;
    const batchSize = input.batchSize ?? SMART_EXAM_BATCH_SIZE;
    if (questionIds.length <= SMART_EXAM_THRESHOLD) {
      const ids = questionIds.slice(input.currentIndex, input.currentIndex + batchSize * 2);
      const items = await withBankArabic(await getResidentQuestionsByIds(ids));
      return {
        total: questionIds.length,
        isLargeExam: false,
        batchSize,
        currentBatchIndex: Math.floor(input.currentIndex / batchSize),
        items,
        prefetchNext: false,
      };
    }
    const merged = await loadCurrentWindowWithPrefetch(input.examId, questionIds, input.currentIndex, batchSize);
    const items = await withBankArabic(merged);
    return {
      total: questionIds.length,
      isLargeExam: true,
      batchSize,
      currentBatchIndex: Math.floor(input.currentIndex / batchSize),
      items,
      prefetchNext: true,
    };
  },
  examWindow: async (input: { examId: string; currentIndex: number; batchSize?: number }) => {
    await requireUser();
    const exams = await listQbankExams();
    const exam = exams.find(e => e.id === input.examId);
    if (!exam) throw new Error("Exam not found");
    const questionIds = exam.questionIds;
    const batchSize = input.batchSize ?? SMART_EXAM_BATCH_SIZE;
    const items = await loadCurrentWindowWithPrefetch(input.examId, questionIds, input.currentIndex, batchSize);
    return { total: questionIds.length, items, batchSize, isLargeExam: questionIds.length > SMART_EXAM_THRESHOLD };
  },
};

// ===========================================================================
// journalNotes
// ===========================================================================

export type NoteDoc = {
  id: string;
  userId: number;
  title: string;
  body: string;
  tags: string[];
  folder: string;
  linkedType: string;
  linkedId: string | null;
  bookmarked: number;
  createdAt: Date;
  updatedAt: Date;
  lastReviewedAt: Date | null;
};

export const journalNotesProcedures = {
  list: async () => {
    await requireUser();
    return (await listDocs<NoteDoc>("notes", USER_ID)).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  },
  create: async (input: {
    title: string;
    body: string;
    tags: string[];
    folder: string;
    linkedType: string;
    linkedId?: string | null;
    bookmarked: boolean;
  }) => {
    await requireUser();
    const now = new Date();
    const { linkedId, bookmarked, ...rest } = input;
    const note: NoteDoc = {
      ...rest,
      id: deviceUUID(),
      userId: USER_ID,
      linkedId: linkedId ?? null,
      bookmarked: bookmarked ? 1 : 0,
      lastReviewedAt: null,
      createdAt: now,
      updatedAt: now,
    };
    await putDoc("notes", USER_ID, note.id, note);
    return note;
  },
  update: async (input: {
    id: string;
    title: string;
    body: string;
    tags: string[];
    folder: string;
    linkedType: string;
    linkedId?: string | null;
    bookmarked: boolean;
    markReviewed?: boolean;
  }): Promise<{ success: true }> => {
    await requireUser();
    const { id, markReviewed, ...rest } = input;
    await updateDoc<NoteDoc>("notes", USER_ID, id, {
      ...rest,
      linkedId: rest.linkedId ?? null,
      bookmarked: rest.bookmarked ? 1 : 0,
      lastReviewedAt: markReviewed ? new Date() : undefined,
      updatedAt: new Date(),
    });
    return { success: true as const };
  },
  delete: async (input: { id: string }): Promise<{ success: true }> => {
    await requireUser();
    await deleteDoc("notes", USER_ID, input.id);
    return { success: true as const };
  },
};

// ===========================================================================
// library / residentContent (static content delegation)
// ===========================================================================

export const libraryProcedures = {
  references: async (input: { search?: string; source?: string; sectionId?: number; page?: number; pageSize?: number }) => {
    await requireUser();
    return listRecoveredReferences({ page: input.page ?? 1, pageSize: input.pageSize ?? 12, ...input });
  },
  osceStations: async (input?: { sectionId?: number }) => {
    await requireUser();
    return listRecoveredOsceStations(input);
  },
  flashcards: async (input: {
    search?: string;
    source?: string;
    type?: string;
    yield?: string;
    sectionId?: number;
    page?: number;
    pageSize?: number;
  }) => {
    await requireUser();
    return listRecoveredFlashcards({ page: input.page ?? 1, pageSize: input.pageSize ?? 12, ...input });
  },
  examTraps: async (input: { search?: string; source?: string; sectionId?: number; page?: number; pageSize?: number }) => {
    await requireUser();
    return listRecoveredExamTraps({ page: input.page ?? 1, pageSize: input.pageSize ?? 12, ...input });
  },
  topicFamilies: async () => {
    await requireUser();
    return listRecoveredTopicFamilies();
  },
  chapterStudyMap: async (input: { source?: string; search?: string }) => {
    await requireUser();
    return listRecoveredChapterStudyMap(input);
  },
  recoveryReviewQueue: async () => {
    await requireUser();
    return getRecoveryReviewQueue();
  },
};

export const residentContentProcedures = {
  chapters: async (input?: { family?: "FRCEM" | "HIPPO" }) => {
    await requireUser();
    return listResidentChapters(input?.family as Family | undefined);
  },
  studyChapter: async (input: { family: "FRCEM" | "HIPPO"; chapterNumber: number }) => {
    await requireUser();
    return getResidentStudyChapter(input.family, input.chapterNumber);
  },
  questionCatalog: async () => {
    await requireUser();
    return listResidentQuestionCatalog();
  },
  sessionQuestions: async (input: {
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
  }) => {
    await requireUser();
    const history = await getQuestionHistory();
    const corrected = await regradeResidentAttempts(history.attempts);
    const session = await selectResidentSessionQuestions({ ...input, attempts: corrected.attempts, states: history.states });
    return { ...session, items: await withBankArabic(session.items) };
  },
  questions: async (input: {
    family?: Family;
    families?: Family[];
    chapterNumber?: number;
    sectionId?: number;
    includeSectionIds?: number[];
    excludeSectionIds?: number[];
    search?: string;
    page?: number;
    pageSize?: number;
  }) => {
    await requireUser();
    return listResidentQuestions({ page: input.page ?? 1, pageSize: input.pageSize ?? 10, ...input });
  },
  questionsByIds: async (input: { questionIds: string[] }) => {
    await requireUser();
    return withBankArabic(await getResidentQuestionsByIds(input.questionIds));
  },
  questionsBatch: async (input: { questionIds: string[]; offset?: number; limit?: number }) => {
    await requireUser();
    const batch = await getResidentQuestionsBatch(input.questionIds, input.offset ?? 0, input.limit ?? 50);
    return {
      total: batch.total,
      offset: batch.offset,
      limit: batch.limit,
      items: await withBankArabic(batch.items),
      isLargeExam: input.questionIds.length > SMART_EXAM_THRESHOLD,
    };
  },
  arabicTranslationAvailability: async (): Promise<{ available: boolean }> => ({ available: false }),
  translateArabicExplanation: async (input: { questionId: string }) => {
    await requireUser();
    const question = await getResidentQuestion(input.questionId);
    if (!question) throw new Error("Question not found.");
    const bankText = question.arabicExplanation?.trim();
    if (bankText) {
      return { text: question.arabicExplanation, cached: true as const, source: "bank" as const, status: null as string | null };
    }
    throw new Error("On-demand Arabic translation needs an internet connection and is unavailable in the offline app.");
  },
  studyProgress: async (input: { family: string }) => {
    await requireUser();
    return getResidentStudyProgressDocs(input.family);
  },
  saveStudyProgress: async (input: { family: string; chapterNumber: number; completed: boolean }): Promise<{ success: true }> => {
    await requireUser();
    if (!(await getResidentStudyChapter(input.family as "FRCEM" | "HIPPO", input.chapterNumber))) {
      throw new Error("Chapter not found");
    }
    const now = new Date();
    await putDoc<StudyProgressDoc>("progress", USER_ID, `${input.family}:${input.chapterNumber}`, {
      ...input,
      userId: USER_ID,
      id: input.chapterNumber,
      completed: Number(input.completed),
      lastReadAt: now,
    });
    return { success: true as const };
  },
  practiceSummary: async () => {
    await requireUser();
    const history = await getQuestionHistory();
    const { attempts, excluded } = await regradeResidentAttempts(history.attempts);
    return {
      attempted: attempts.length,
      correct: attempts.reduce((sum, attempt) => sum + attempt.correct, 0),
      recent: attempts.slice(0, 10),
      excludedAttemptCount: excluded,
    };
  },
  performanceSummary: async () => {
    await requireUser();
    const history = await getQuestionHistory();
    const corrected = await regradeResidentAttempts(history.attempts);
    const [frcemChapters, hippoChapters, frcemProgress, hippoProgress] = await Promise.all([
      listResidentChapters("FRCEM"),
      listResidentChapters("HIPPO"),
      getResidentStudyProgressDocs("FRCEM"),
      getResidentStudyProgressDocs("HIPPO"),
    ]);
    const perf = await summarizeResidentPerformance(
      corrected.attempts.map(a => ({
        questionId: a.questionId,
        family: a.family as Family,
        correct: a.correct,
        selectedAnswer: a.selectedAnswer,
        chapterNumber: a.chapterNumber,
      }))
    );
    return {
      ...perf,
      topics: await summarizeTopicProgress({
        chapters: [...frcemChapters, ...hippoChapters],
        attempts: corrected.attempts,
        progress: [...frcemProgress, ...hippoProgress],
      }),
    };
  },
  submitAnswer: async (input: { questionId: string; selectedAnswer: string }) => {
    await requireUser();
    const question = await getResidentQuestion(input.questionId);
    if (!question) throw new Error("Question not found.");
    const correct = gradeSelectedAnswer(question, input.selectedAnswer);
    if (correct === null) throw new Error("Selected option is not valid for this question.");
    await recordResidentQuestionAttempt({
      questionId: question.id,
      family: question.family,
      chapterNumber: question.chapterNumber,
      selectedAnswer: input.selectedAnswer,
      correct,
    });
    return { correct, correctAnswer: question.correctAnswer };
  },
};
