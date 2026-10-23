import { COOKIE_NAME } from "@shared/const";
import { buildStudyPlan } from "@shared/study-plan-engine";
import { isCalendarDate } from "@shared/study-calendar";
import { gradeSelectedAnswer } from "@shared/qbank-answer";
import { randomUUID } from "node:crypto";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "./db";
import { getTrapProgress, setTrapProgress, importTrapProgress } from "./trapProgress";
import { getSessionCookieOptions } from "./_core/cookies";
import { hashPassword, verifyPassword } from "./_core/password";
import { sdk } from "./_core/sdk";
import { log } from "./_core/logger";
import {
  createVerificationCode,
  EmailDeliveryError,
  hashVerificationCode,
  isPilotVerificationEnabled,
  MAX_VERIFICATION_ATTEMPTS,
  sendVerificationEmail,
  VERIFICATION_CODE_TTL_MS,
  VERIFICATION_RESEND_DELAY_MS,
  verificationCodeMatches,
} from "./_core/emailVerification";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  getResidentQuestion,
  getResidentQuestionsBatch,
  getResidentQuestionsByIds,
  getResidentStudyChapter,
  listResidentChapters,
  listResidentQuestionCatalog,
  listResidentQuestions,
  listAllQuestionIds,
  listImportedQuestionIds,
  regradeResidentAttempts,
  resetResidentContentCache,
  selectResidentSessionQuestions,
  summarizeResidentPerformance,
  summarizeTopicProgress,
} from "./residentContent";
import {
  getVisibleBatchIndices,
  SMART_EXAM_BATCH_SIZE,
  SMART_EXAM_THRESHOLD,
} from "@shared/smart-exam-cache";
import { CLASSIFICATIONS, getWeaknessCenterData, setWeaknessClassification, getWeaknessSummary, updateWeaknessReviewStatus } from "./weaknessCenter";
import { pdfLibraryRouter } from "./pdfLibraryRouter";
import { loadExamBatch, loadCurrentWindowWithPrefetch } from "./smartExamCache";
import { parseImportPayload, validateRows } from "./questionImport";
import path from "node:path";
import { mkdir, writeFile, readdir, readFile } from "node:fs/promises";
import {
  getRecoveryReviewQueue,
  listRecoveredChapterStudyMap,
  listRecoveredExamTraps,
  listRecoveredFlashcards,
  listRecoveredOsceStations,
  listRecoveredReferences,
  listRecoveredTopicFamilies,
} from "./recoveryLibrary";

const localEmailOnlyLoginAllowed = () =>
  !process.env.NODE_ENV?.startsWith("production") && db.localStorageEnabled();

function arabicTranslationProvider() {
  const key = process.env.BUILT_IN_FORGE_API_KEY || process.env.OPENAI_API_KEY;
  if (!key) return null;
  const base = (process.env.BUILT_IN_FORGE_API_URL || "https://forge.manus.im").replace(/\/$/, "");
  return { key, base };
}

async function generateArabicExplanation(question: {
  id: string;
  correctAnswer: string;
  englishExplanation: string;
}): Promise<string> {
  const provider = arabicTranslationProvider();
  if (!provider) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "Arabic translation is not available in this workspace.",
    });
  }
  const response = await fetch(`${provider.base}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${provider.key}`,
    },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content:
            "You are a precise bilingual emergency-medicine editor. Return JSON only: {arabicExplanation}. Write one or two concise Arabic sentences that faithfully summarize why the stated answer is correct. Preserve drug names, doses, thresholds, and negation. Do not add advice, new facts, or claim clinical approval.",
        },
        {
          role: "user",
          content: JSON.stringify({
            id: question.id,
            answer: question.correctAnswer,
            explanation: question.englishExplanation.slice(0, 1800),
          }),
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 600,
    }),
  });
  if (!response.ok) {
    log.error("arabic_translation_provider_failed", {
      status: response.status,
    });
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Translation service is temporarily unavailable. Please try again.",
    });
  }
  const payload = (await response.json()) as {
    choices?: { message?: { content?: unknown } }[];
  };
  const content = payload.choices?.[0]?.message?.content;
  let parsed: { arabicExplanation?: unknown } = {};
  try {
    parsed = JSON.parse(typeof content === "string" ? content : "{}");
  } catch {
    parsed = {};
  }
  const explanation =
    typeof parsed.arabicExplanation === "string"
      ? parsed.arabicExplanation.trim()
      : "";
  if (!explanation) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Translation service returned an empty result. Please try again.",
    });
  }
  return explanation;
}

type ArabicSource = "bank" | "on-demand" | null;

async function withSavedArabicTranslations<
  T extends { id: string; arabicExplanation: string },
>(items: T[]) {
  const attach = (item: T, text: string, source: ArabicSource, status: string | null) => ({
    ...item,
    arabicExplanation: text,
    arabicExplanationSource: source,
    arabicTranslationStatus: status,
  });
  const missing = items.filter(item => !item.arabicExplanation?.trim());
  if (!missing.length) {
    return items.map(item => attach(item, item.arabicExplanation, "bank", null));
  }
  const saved = await db.getArabicTranslations(missing.map(item => item.id));
  return items.map(item => {
    const bankText = item.arabicExplanation?.trim();
    if (bankText) return attach(item, item.arabicExplanation, "bank", null);
    const row = saved.get(item.id);
    if (!row?.text) return attach(item, "", null, null);
    return attach(item, row.text, "on-demand", row.status);
  });
}

async function planProgress(userId: number) {
  const [chapters, frcem, hippo, rawHistory, learningItems, traps] = await Promise.all([
    listResidentChapters(), db.getResidentStudyProgress(userId, "FRCEM"),
    db.getResidentStudyProgress(userId, "HIPPO"), db.getQuestionHistory(userId),
    db.listLearningItemProgress(userId, "resident-emergency-medicine"),
    getTrapProgress(userId),
  ]);
  const history = await regradeResidentAttempts(rawHistory.attempts);
  const practice = { attempted: history.attempts.length, correct: history.attempts.reduce((sum, attempt) => sum + attempt.correct, 0) };
  const done = new Set([...frcem, ...hippo].filter(row => row.completed).map(row => `${row.family}:${row.chapterNumber}`));
  const latest = new Map<string, (typeof history.attempts)[number]>();
  for (const attempt of history.attempts) {
    const previous = latest.get(attempt.questionId);
    if (!previous || new Date(attempt.attemptedAt) > new Date(previous.attemptedAt)) latest.set(attempt.questionId, attempt);
  }
  const weakAreas = Array.from(new Set(Array.from(latest.values()).filter(row => !row.correct).map(row => {
    const chapter = chapters.find(item => item.family === row.family && item.chapterNumber === row.chapterNumber);
    return chapter?.chapterTitle ?? `${row.family} / ${row.chapterNumber}`;
  }))).slice(0, 30);
  const nextChapter = chapters.find(chapter => !done.has(`${chapter.family}:${chapter.chapterNumber}`));
  const weakChapter = chapters.find(chapter => weakAreas.includes(chapter.chapterTitle));
  return {
    nextReading: nextChapter ? { title: nextChapter.chapterTitle, href: `/learn?section=${nextChapter.sectionId}&family=${nextChapter.family}&chapter=${nextChapter.chapterNumber}` } : undefined,
    nextPractice: weakChapter || nextChapter ? { title: (weakChapter ?? nextChapter)!.sectionTitle, href: `/practice/create?section=${(weakChapter ?? nextChapter)!.sectionId}` } : undefined,
    completedContent: chapters.filter(chapter => done.has(`${chapter.family}:${chapter.chapterNumber}`)).length + learningItems.filter(row => row.completed && ["tintinalli-summary-chapter", "rosh-summary-chapter", "rosen-summary-chapter", "unified-guide-unit"].includes(row.contentType)).length + traps.completed,
    totalContent: chapters.length + 189 + 12 + 6 + 252 + traps.total,
    qbankCorrect: practice.correct, qbankAttempted: practice.attempted,
    weakAreas,
  };
}

export const appRouter = router({
  pdfLibrary: pdfLibraryRouter,
  learningProgress: router({
    current: protectedProcedure.input(z.object({
      track: z.string().trim().min(2).max(96),
      contentType: z.string().trim().min(2).max(64).optional(),
    })).query(async ({ ctx, input }) => {
      const rows = await db.listLearningItemProgress(ctx.user.id, input.track, input.contentType);
      return {
        items: rows,
        completedIds: rows.filter(row => Boolean(row.completed)).map(row => row.contentId),
      };
    }),
    set: protectedProcedure.input(z.object({
      track: z.string().trim().min(2).max(96),
      contentType: z.string().trim().min(2).max(64),
      contentId: z.string().trim().min(1).max(160),
      completed: z.boolean(),
    })).mutation(({ ctx, input }) => db.setLearningItemProgress({ userId: ctx.user.id, ...input })),
  }),
  revisionProgress: router({
    current: protectedProcedure.query(({ ctx }) => getTrapProgress(ctx.user.id)),
    set: protectedProcedure.input(z.object({ trapId: z.string().max(80), completed: z.boolean() })).mutation(({ ctx, input }) => setTrapProgress(ctx.user.id, input.trapId, input.completed)),
    importLocal: protectedProcedure.input(z.object({ ids: z.array(z.string().max(80)).max(1000) })).mutation(({ ctx, input }) => importTrapProgress(ctx.user.id, input.ids)),
  }),
  studyPlan: router({
    today: protectedProcedure.query(async ({ ctx }) => {
      const saved = await db.getStudyPlan(ctx.user.id);
      if (!saved) return null;
      const now = new Date();
      const date = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Amman", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
      const progress = await planProgress(ctx.user.id);
      const plan = buildStudyPlan({ ...saved, ...progress }, new Date(`${date}T12:00:00`));
      for (const task of plan.dailyTasks) {
        const target = task.kind === "learn" ? progress.nextReading : task.kind === "practice" || task.kind === "review" ? progress.nextPractice : undefined;
        if (target) { task.href = target.href; task.title = `${task.kind === "learn" ? "Read" : "Practice"}: ${target.title}`; }
      }
      return { date, tasks: await db.getOrCreateDailyPlan(ctx.user.id, date, saved.planId, plan.dailyTasks) };
    }),
    taskCompletions: protectedProcedure.input(z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) })).query(({ ctx, input }) => db.getStudyTaskCompletions(ctx.user.id, input.date)),
    completeTask: protectedProcedure.input(z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), taskId: z.string().regex(/^(residency-year-[1-4]|jordan-board-part-[12])-(learn|practice|atlas|journal|weak-area)$/), completed: z.boolean() })).mutation(async ({ ctx, input }) => {
      if (!isCalendarDate(input.date)) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid task date" });
      const plan = await db.getStudyPlan(ctx.user.id);
      if (!plan || !input.taskId.startsWith(`${plan.planId}-`)) throw new TRPCError({ code: "BAD_REQUEST", message: "Task must belong to your saved plan" });
      return db.saveStudyTaskCompletion(ctx.user.id, input);
    }),
    current: protectedProcedure.query(async ({ ctx }) => {
      const saved = await db.getStudyPlan(ctx.user.id);
      return saved ? { ...saved, ...await planProgress(ctx.user.id) } : null;
    }),
    save: protectedProcedure.input(z.object({ planId: z.enum(["residency-year-1", "residency-year-2", "residency-year-3", "residency-year-4", "jordan-board-part-1", "jordan-board-part-2"]), examDate: z.string().refine(value => !value || isCalendarDate(value), "Enter a valid exam date").optional(), dailyHours: z.number().finite().min(0.5).max(16), restDays: z.array(z.number().int().min(0).max(6)).max(7) })).mutation(async ({ ctx, input }) => db.saveStudyPlan(ctx.user.id, { ...input, ...await planProgress(ctx.user.id) })),
  }),
  account: router({
    profile: protectedProcedure.query(async ({ ctx }) => ({
      user: ctx.user,
      learningProfile: await db.getLearningProfile(ctx.user.id),
    })),
    updateProfile: protectedProcedure
      .input(
        z.object({
          fullName: z.string().trim().min(2).max(120),
          professionalTrack: z.string().trim().min(2).max(96),
          trainingLevel: z.enum([
            "pgy1",
            "pgy2",
            "pgy3",
            "pgy4",
            "pgy5_plus",
            "attending",
            "pilot_reviewer",
          ]),
          country: z.string().trim().max(96).nullable().optional(),
          graduationYear: z.number().int().min(1950).max(2100).nullable(),
          preferredLanguage: z.enum(["en", "ar"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.updateAccountProfile({
          userId: ctx.user.id,
          ...input,
        });
        return { success: true as const };
      }),
  }),
  qbank: router({
    exams: protectedProcedure.query(async ({ ctx }) => {
      const exams = await db.listQbankExams(ctx.user.id);
      const ids = Array.from(new Set(exams.flatMap(exam => exam.questionIds as string[])));
      const questions = await getResidentQuestionsByIds(ids);
      const byId = new Map(questions.map(question => [question.id, question]));
      return exams.map(exam => {
        const answers = (exam.answers ?? {}) as Record<string, string>;
        const previousResults = (exam.results ?? {}) as Record<string, { correct: boolean; correctAnswer: string }>;
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
          correctCount: exam.status === "completed" ? Object.values(correctedResults).filter(result => result.correct).length : exam.correctCount,
        };
      });
    }),
    history: protectedProcedure.query(async ({ ctx }) => {
      const history = await db.getQuestionHistory(ctx.user.id);
      const corrected = await regradeResidentAttempts(history.attempts);
      return { ...history, attempts: corrected.attempts, excludedAttemptCount: corrected.excluded };
    }),
    createExam: protectedProcedure
      .input(
        z.object({
          name: z.string().trim().min(1).max(120),
          mode: z.enum(["tutor", "test"]),
          timeMode: z.enum(["timed", "untimed"]),
          configuration: z.record(z.string(), z.unknown()),
          questionIds: z.array(z.string().max(160)).min(1),
          remainingSeconds: z
            .number()
            .int()
            .min(0)
            .max(18000)
            .nullable()
            .optional(),
        })
      )
      .mutation(async ({ ctx, input }) =>
        db.createQbankExam({
          id: randomUUID(),
          userId: ctx.user.id,
          name: input.name,
          mode: input.mode,
          timeMode: input.timeMode,
          configuration: input.configuration,
          questionIds: input.questionIds,
          answers: {},
          results: {},
          flaggedQuestionIds: [],
          remainingSeconds: input.remainingSeconds ?? null,
        })
      ),
    updateExam: protectedProcedure
      .input(
        z.object({
          id: z.string().max(64),
          status: z.enum(["active", "paused", "completed"]),
          answers: z.record(z.string(), z.string().max(8)),
          results: z
            .record(
              z.string(),
              z.object({
                correct: z.boolean(),
                correctAnswer: z.string().max(500),
              })
            )
            .optional(),
          flaggedQuestionIds: z.array(z.string().max(160)),
          currentIndex: z.number().int().min(0),
          remainingSeconds: z.number().int().min(0).max(18000).nullable(),
          correctCount: z.number().int().min(0).nullable().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { id, ...values } = input;
        await db.updateQbankExam(ctx.user.id, id, {
          ...values,
          completedAt: input.status === "completed" ? new Date() : null,
        });
        return { success: true as const };
      }),
    setQuestionState: protectedProcedure
      .input(
        z.object({
          questionId: z.string().max(160),
          flagged: z.boolean().optional(),
          skipped: z.boolean().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.setQuestionState(ctx.user.id, input.questionId, input);
        return { success: true as const };
      }),
    reportIssue: protectedProcedure
      .input(
        z.object({
          questionId: z.string().min(1).max(160),
          issueType: z.enum([
            "incorrect_answer",
            "outdated_guideline",
            "unclear_explanation",
            "duplicate",
            "source_locator",
            "other",
          ]),
          details: z.string().trim().min(3).max(4000),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.createContentIssueReport({
          id: randomUUID(),
          userId: ctx.user.id,
          itemType: "question",
          itemId: input.questionId,
          issueType: input.issueType,
          details: input.details,
        });
        return { success: true as const };
      }),
    examBatch: protectedProcedure
      .input(
        z.object({
          examId: z.string().max(64),
          currentIndex: z.number().int().min(0),
          batchSize: z.number().int().min(10).max(100).optional(),
        })
      )
      .query(async ({ ctx, input }) => {
        const exams = await db.listQbankExams(ctx.user.id);
        const exam = exams.find(e => e.id === input.examId);
        if (!exam) throw new TRPCError({ code: "NOT_FOUND", message: "Exam not found" });
        const questionIds = exam.questionIds as string[];
        const batchSize = input.batchSize ?? SMART_EXAM_BATCH_SIZE;
        // Small exams: fast path - return window directly without persistent cache overhead
        if (questionIds.length <= SMART_EXAM_THRESHOLD) {
          const ids = questionIds.slice(input.currentIndex, input.currentIndex + batchSize * 2);
          const items = await getResidentQuestionsByIds(ids);
          const withArabic = await (async () => {
            // inline import to avoid circular dep
            const saved = await db.getArabicTranslations(items.map(i => i.id));
            return items.map(item => {
              const row = saved.get(item.id);
              return row?.text ? { ...item, arabicExplanation: row.text } : item;
            });
          })();
          return {
            total: questionIds.length,
            isLargeExam: false,
            batchSize,
            currentBatchIndex: Math.floor(input.currentIndex / batchSize),
            items: withArabic,
            prefetchNext: false,
          };
        }
        // Large exam: load current window + next batch, cache locally via SQLite
        const indices = getVisibleBatchIndices(questionIds, input.currentIndex, batchSize);
        const batches = await Promise.all(
          indices.map(idx => loadExamBatch(ctx.user.id, input.examId, questionIds, idx, batchSize)),
        );
        const merged = batches.flat();
        // Attach arabic translations similar to withSavedArabicTranslations
        const saved = await db.getArabicTranslations(merged.map(m => m.id));
        const withArabic = merged.map(item => {
          const bankText = (item as { arabicExplanation?: string }).arabicExplanation?.trim();
          if (bankText) return item;
          const row = saved.get(item.id);
          return row?.text ? { ...item, arabicExplanation: row.text } : item;
        });
        return {
          total: questionIds.length,
          isLargeExam: true,
          batchSize,
          currentBatchIndex: Math.floor(input.currentIndex / batchSize),
          items: withArabic,
          prefetchNext: indices.length > 1,
        };
      }),
    examWindow: protectedProcedure
      .input(
        z.object({
          examId: z.string().max(64),
          currentIndex: z.number().int().min(0),
          batchSize: z.number().int().min(10).max(100).optional(),
        })
      )
      .query(async ({ ctx, input }) => {
        const exams = await db.listQbankExams(ctx.user.id);
        const exam = exams.find(e => e.id === input.examId);
        if (!exam) throw new TRPCError({ code: "NOT_FOUND", message: "Exam not found" });
        const questionIds = exam.questionIds as string[];
        const batchSize = input.batchSize ?? SMART_EXAM_BATCH_SIZE;
        const items = await loadCurrentWindowWithPrefetch(ctx.user.id, input.examId, questionIds, input.currentIndex, batchSize);
        return { total: questionIds.length, items, batchSize, isLargeExam: questionIds.length > SMART_EXAM_THRESHOLD };
      }),
  }),
  journalNotes: router({
    list: protectedProcedure.query(({ ctx }) =>
      db.listJournalNotes(ctx.user.id)
    ),
    create: protectedProcedure
      .input(
        z.object({
          title: z.string().trim().min(1).max(180),
          body: z.string().max(20000),
          tags: z.array(z.string().max(40)).max(20),
          folder: z.string().max(100),
          linkedType: z.enum(["none", "question", "chapter", "asset"]),
          linkedId: z.string().max(180).nullable().optional(),
          bookmarked: z.boolean(),
        })
      )
      .mutation(({ ctx, input }) =>
        db.createJournalNote({
          id: randomUUID(),
          userId: ctx.user.id,
          ...input,
          bookmarked: input.bookmarked ? 1 : 0,
        })
      ),
    update: protectedProcedure
      .input(
        z.object({
          id: z.string().max(64),
          title: z.string().trim().min(1).max(180),
          body: z.string().max(20000),
          tags: z.array(z.string().max(40)).max(20),
          folder: z.string().max(100),
          linkedType: z.enum(["none", "question", "chapter", "asset"]),
          linkedId: z.string().max(180).nullable().optional(),
          bookmarked: z.boolean(),
          markReviewed: z.boolean().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { id, markReviewed, ...rest } = input;
        await db.updateJournalNote(ctx.user.id, id, {
          ...rest,
          bookmarked: rest.bookmarked ? 1 : 0,
          lastReviewedAt: markReviewed ? new Date() : undefined,
        });
        return { success: true as const };
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.string().max(64) }))
      .mutation(async ({ ctx, input }) => {
        await db.deleteJournalNote(ctx.user.id, input.id);
        return { success: true as const };
      }),
  }),
  library: router({
    references: protectedProcedure
      .input(
        z.object({
          search: z.string().max(120).optional(),
          source: z.string().max(80).optional(),
          sectionId: z.number().int().min(1).max(22).optional(),
          page: z.number().int().min(1).default(1),
          pageSize: z.number().int().min(1).max(25).default(12),
        })
      )
      .query(({ input }) => listRecoveredReferences(input)),
    osceStations: protectedProcedure
      .input(
        z
          .object({
            sectionId: z.number().int().min(1).max(22).optional(),
          })
          .optional()
      )
      .query(({ input }) => listRecoveredOsceStations(input)),
    flashcards: protectedProcedure
      .input(
        z.object({
          search: z.string().max(120).optional(),
          source: z.string().max(80).optional(),
          type: z.string().max(80).optional(),
          yield: z.string().max(80).optional(),
          sectionId: z.number().int().min(1).max(22).optional(),
          page: z.number().int().min(1).default(1),
          pageSize: z.number().int().min(1).max(50).default(12),
        })
      )
      .query(({ input }) => listRecoveredFlashcards(input)),
    examTraps: protectedProcedure
      .input(
        z.object({
          search: z.string().max(120).optional(),
          source: z.string().max(80).optional(),
          sectionId: z.number().int().min(1).max(22).optional(),
          page: z.number().int().min(1).default(1),
          pageSize: z.number().int().min(1).max(50).default(12),
        })
      )
      .query(({ input }) => listRecoveredExamTraps(input)),
    topicFamilies: protectedProcedure.query(() => listRecoveredTopicFamilies()),
    chapterStudyMap: protectedProcedure
      .input(
        z.object({
          source: z.string().max(80).optional(),
          search: z.string().max(120).optional(),
        })
      )
      .query(({ input }) => listRecoveredChapterStudyMap(input)),
    recoveryReviewQueue: protectedProcedure.query(() =>
      getRecoveryReviewQueue()
    ),
  }),
  weakness: router({
    classifications: protectedProcedure.query(() => CLASSIFICATIONS),
    list: protectedProcedure
      .input(
        z.object({
          family: z.string().max(60).optional(),
          chapterNumber: z.number().int().min(0).max(9999).optional(),
          reviewStatus: z.enum(["all", "unreviewed", "reviewed", "mastery"]).optional(),
          onlyRepeated: z.boolean().optional(),
          search: z.string().max(120).optional(),
        })
      )
      .query(async ({ ctx, input }) => {
        const rows = await getWeaknessCenterData(ctx.user.id);
        const search = input.search?.trim().toLowerCase();
        const questionIds = rows.map(row => row.id);
        const questionMap = new Map<string, { question: string; chapterTitle: string; options: { key: string; text: string }[]; correctAnswerKey: string | null }>();
        for (const id of questionIds) {
          const question = await getResidentQuestion(id);
          if (question) {
            questionMap.set(id, {
              question: question.question,
              chapterTitle: question.chapterTitle,
              options: question.options,
              correctAnswerKey: question.correctAnswerKey,
            });
          }
        }
        const filtered = rows.filter(row => {
          if (input.family && input.family !== "all" && row.family !== input.family) return false;
          if (input.chapterNumber !== undefined && row.chapterNumber !== input.chapterNumber) return false;
          if (input.reviewStatus && input.reviewStatus !== "all" && row.reviewStatus !== input.reviewStatus) return false;
          if (input.onlyRepeated && !row.isRepeated) return false;
          if (search) {
            const meta = questionMap.get(row.id);
            const haystack = `${meta?.question ?? ""} ${meta?.chapterTitle ?? ""} ${row.id}`.toLowerCase();
            if (!haystack.includes(search)) return false;
          }
          return true;
        });
        return {
          total: filtered.length,
          items: filtered.map(row => ({
            ...row,
            question: questionMap.get(row.id)?.question ?? "",
            chapterTitle: questionMap.get(row.id)?.chapterTitle ?? "",
            options: questionMap.get(row.id)?.options ?? [],
            correctAnswerKey: questionMap.get(row.id)?.correctAnswerKey ?? null,
          })),
        };
      }),
    summary: protectedProcedure.query(async ({ ctx }) => getWeaknessSummary(ctx.user.id)),
    classify: protectedProcedure
      .input(
        z.object({
          questionId: z.string().min(1).max(160),
          classification: z.enum(CLASSIFICATIONS).nullable(),
          notes: z.string().max(2000).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await setWeaknessClassification(ctx.user.id, input.questionId, input.classification, input.notes ?? "");
        return { success: true as const };
      }),
    setReviewStatus: protectedProcedure
      .input(
        z.object({
          questionId: z.string().min(1).max(160),
          reviewStatus: z.enum(["unreviewed", "reviewed", "mastery"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await updateWeaknessReviewStatus(ctx.user.id, input.questionId, input.reviewStatus);
        return { success: true as const };
      }),
    retest: protectedProcedure
      .input(z.object({ questionIds: z.array(z.string().min(1).max(160)).min(1).max(200) }))
      .mutation(async ({ ctx, input }) => {
        const now = new Date();
        const examId = randomUUID();
        await db.createQbankExam({
          id: examId,
          userId: ctx.user.id,
          name: `Weakness retest · ${input.questionIds.length} questions`,
          mode: "tutor",
          timeMode: "untimed",
          status: "active",
          configuration: { families: ["IMPORTED"] },
          questionIds: input.questionIds,
          answers: {},
          results: {},
          flaggedQuestionIds: [],
          currentIndex: 0,
          remainingSeconds: null,
          correctCount: null,
          startedAt: now,
          updatedAt: now,
          completedAt: null,
        });
        return { examId, questionCount: input.questionIds.length };
      }),
  }),
  residentContent: router({
    chapters: protectedProcedure
      .input(
        z.object({ family: z.enum(["FRCEM", "HIPPO"]).optional() }).optional()
      )
      .query(({ input }) => listResidentChapters(input?.family)),
    studyChapter: protectedProcedure
      .input(
        z.object({
          family: z.enum(["FRCEM", "HIPPO"]),
          chapterNumber: z.number().int().min(1).max(99),
        })
      )
      .query(({ input }) =>
        getResidentStudyChapter(input.family, input.chapterNumber)
      ),
    questionCatalog: protectedProcedure.query(() => listResidentQuestionCatalog()),
    sessionQuestions: protectedProcedure
      .input(z.object({
        families: z.array(z.enum(["EDIC", "FRCEM", "HIPPO", "OXFORD_SCE", "PEER_2026", "PEER_PHYSICIANS", "ROSEN_10E", "ROSH_2026", "TINTINALLI_9E", "AQRAB", "IMPORTED"])).min(1).max(10),
        excludedChapterKeys: z.array(z.string().regex(/^[A-Z0-9_]+:[0-9]+$/)).max(500).optional(),
        sectionId: z.number().int().min(1).max(22).optional(),
        includeSectionIds: z.array(z.number().int().min(1).max(22)).max(22).optional(),
        excludeSectionIds: z.array(z.number().int().min(1).max(22)).max(22).optional(),
        questionType: z.enum(["all", "unused", "incorrect", "flagged", "skipped", "searched"]),
        search: z.string().max(120).optional(),
        order: z.enum(["listed", "random"]),
        seed: z.number().int().min(0),
        count: z.number().int().min(1),
      }))
      .query(async ({ ctx, input }) => {
        const history = await db.getQuestionHistory(ctx.user.id);
        const corrected = await regradeResidentAttempts(history.attempts);
        const session = await selectResidentSessionQuestions({ ...input, attempts: corrected.attempts, states: history.states });
        return { ...session, items: await withSavedArabicTranslations(session.items) };
      }),
    questions: protectedProcedure
      .input(
        z.object({
          family: z
            .enum([
              "FRCEM",
              "EDIC",
              "HIPPO",
              "OXFORD_SCE",
              "PEER_2026",
              "PEER_PHYSICIANS",
              "ROSEN_10E",
              "ROSH_2026",
              "TINTINALLI_9E",
              "AQRAB",
              "IMPORTED",
            ])
            .optional(),
          families: z
            .array(
              z.enum([
                "FRCEM",
                "EDIC",
                "HIPPO",
                "OXFORD_SCE",
                "PEER_2026",
                "PEER_PHYSICIANS",
                "ROSEN_10E",
                "ROSH_2026",
                "TINTINALLI_9E",
                "AQRAB",
                "IMPORTED",
              ])
            )
            .min(1)
            .max(10)
            .optional(),
          chapterNumber: z.number().int().min(1).max(999).optional(),
          sectionId: z.number().int().min(1).max(22).optional(),
          includeSectionIds: z
            .array(z.number().int().min(1).max(22))
            .max(22)
            .optional(),
          excludeSectionIds: z
            .array(z.number().int().min(1).max(22))
            .max(22)
            .optional(),
          search: z.string().max(120).optional(),
          page: z.number().int().min(1).default(1),
          pageSize: z.number().int().min(1).max(100).default(10),
        })
      )
      .query(({ input }) => listResidentQuestions(input)),
    questionsByIds: protectedProcedure
      .input(
        z.object({
          questionIds: z.array(z.string().min(1).max(160)).min(1),
        })
      )
      .query(async ({ input }) =>
        withSavedArabicTranslations(await getResidentQuestionsByIds(input.questionIds))
      ),
    questionsBatch: protectedProcedure
      .input(
        z.object({
          questionIds: z.array(z.string().min(1).max(160)).min(1).max(10000),
          offset: z.number().int().min(0).default(0),
          limit: z.number().int().min(1).max(100).default(50),
        })
      )
      .query(async ({ input }) => {
        // Keep existing logic intact; add chunked loading for large requests.
        // Small exams (<500) use fast path via getResidentQuestionsByIds internally anyway,
        // but batch API avoids loading full 2000 bodies at once.
        const batch = await getResidentQuestionsBatch(input.questionIds, input.offset, input.limit);
        return {
          total: batch.total,
          offset: batch.offset,
          limit: batch.limit,
          items: await withSavedArabicTranslations(batch.items),
          isLargeExam: input.questionIds.length > SMART_EXAM_THRESHOLD,
        };
      }),
    arabicTranslationAvailability: protectedProcedure.query(() => ({
      available: arabicTranslationProvider() !== null,
    })),
    translateArabicExplanation: protectedProcedure
      .input(z.object({ questionId: z.string().min(1).max(180) }))
      .mutation(async ({ ctx, input }) => {
        // Per-user rate limit: 10 requests per 60s per user (LLM cost protection)
        const now = Date.now();
        const windowMs = 60_000;
        const maxInWindow = 10;
        const key = `translate:${ctx.user.id}`;
        // Use global map persisted in module scope
        const g = globalThis as unknown as { __segTranslateLimiter?: Map<string, number[]> };
        const map = (g.__segTranslateLimiter ??= new Map<string, number[]>());
        const arr = map.get(key) ?? [];
        const pruned = arr.filter(t => now - t < windowMs);
        if (pruned.length >= maxInWindow) {
          throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Too many translation requests. Please retry shortly." });
        }
        pruned.push(now);
        map.set(key, pruned);
        const question = await getResidentQuestion(input.questionId);
        if (!question) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Question not found." });
        }
        const bankText = question.arabicExplanation?.trim();
        if (bankText) {
          return {
            text: question.arabicExplanation,
            cached: true as const,
            source: "bank" as const,
            status: null as string | null,
          };
        }
        const saved = (await db.getArabicTranslations([question.id])).get(question.id);
        if (saved?.text) {
          return {
            text: saved.text,
            cached: true as const,
            source: "on-demand" as const,
            status: saved.status,
          };
        }
        const text = await generateArabicExplanation(question);
        const row = await db.saveArabicTranslation({
          questionId: question.id,
          sourceBank: question.family,
          text,
          status: "pending-review",
          createdByUserId: ctx.user.id,
        });
        return {
          text: row.text,
          cached: false as const,
          source: "on-demand" as const,
          status: row.status,
        };
      }),
    studyProgress: protectedProcedure
      .input(z.object({ family: z.enum(["FRCEM", "HIPPO"]) }))
      .query(({ ctx, input }) =>
        db.getResidentStudyProgress(ctx.user.id, input.family)
      ),
    saveStudyProgress: protectedProcedure
      .input(
        z.object({
          family: z.enum(["FRCEM", "HIPPO"]),
          chapterNumber: z.number().int().min(1).max(99),
          completed: z.boolean(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (!await getResidentStudyChapter(input.family, input.chapterNumber)) throw new TRPCError({ code: "NOT_FOUND", message: "Chapter not found" });
        await db.upsertResidentStudyProgress({ userId: ctx.user.id, ...input });
        return { success: true as const };
      }),
    importPreview: protectedProcedure
      .input(
        z.object({
          filename: z.string().min(1).max(120),
          content: z.string().max(20_000_000),
        })
      )
      .mutation(async ({ input }) => {
        const { rows } = await parseImportPayload(input.filename, input.content);
        const existing = await listImportedQuestionIds();
        const results = validateRows(rows, existing);
        const valid = results.filter(row => row.errors.length === 0);
        const invalid = results.filter(row => row.errors.length > 0);
        return {
          total: rows.length,
          valid: valid.length,
          invalid: invalid.length,
          duplicates: results.filter(row =>
            row.errors.some(error => error.includes("Duplicate"))
          ).length,
          preview: valid.slice(0, 5).map(row => ({
            id: row.raw.id,
            question: (row.raw.question ?? "").slice(0, 160),
            chapterTitle: row.raw.chapterTitle ?? "",
            options: row.raw.options?.length ?? 0,
            correctAnswerKey: row.raw.correctAnswerKey ?? null,
            arabicExplanation: row.raw.arabicExplanation ?? "",
            englishExplanation: row.raw.englishExplanation ?? "",
            notes: row.raw.notes ?? "",
          })),
          errors: invalid.slice(0, 20).map(row => ({
            index: row.index + 1,
            id: row.raw.id ?? "",
            errors: row.errors,
          })),
        };
      }),
    importCommit: protectedProcedure
      .input(
        z.object({
          filename: z.string().min(1).max(120),
          content: z.string().max(20_000_000),
          notes: z.string().max(4000).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { rows } = await parseImportPayload(input.filename, input.content);
        const existingIds = await listImportedQuestionIds();
        const results = validateRows(rows, existingIds);
        const validRows = results
          .filter(row => row.errors.length === 0)
          .map(row => row.raw);
        const invalidCount = results.filter(row => row.errors.length > 0).length;
        if (invalidCount > 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Import contains ${invalidCount} invalid question(s). Fix errors shown in preview first.`,
          });
        }
        if (!validRows.length) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "No valid questions found in the file.",
          });
        }
        const importDir = path.join(
          process.env.SEG_LOCAL_DATA_DIR ?? path.resolve("."),
          "imported-questions"
        );
        await mkdir(importDir, { recursive: true });
        const fileName = `import-${ctx.user.id}-${Date.now()}.jsonl`;
        const target = path.join(importDir, fileName);
        const lines = validRows.map(row =>
          JSON.stringify({
            ...row,
            family: "IMPORTED",
            chapterNumber: row.chapterNumber ?? 1,
            chapterTitle: row.chapterTitle ?? "Imported Questions",
            sourceQuestionNumber: row.sourceQuestionNumber ?? 0,
            question: row.question ?? "",
            options: row.options ?? [],
            correctAnswerKey: row.correctAnswerKey ?? null,
            correctAnswer:
              row.correctAnswer ??
              row.options?.find(option => option.key === row.correctAnswerKey)
                ?.text ??
              "",
            englishExplanation: row.englishExplanation ?? "",
            arabicExplanation: row.arabicExplanation ?? "",
            references: row.references ?? [],
            governanceStatus: row.governanceStatus ?? "under-review",
            notes: input.notes ?? row.notes ?? "",
          })
        );
        await writeFile(target, `${lines.join("\n")}\n`, "utf8");
        resetResidentContentCache();
        return { written: validRows.length, skipped: results.length - validRows.length };
      }),
    importList: protectedProcedure.query(async () => {
      const importDir = path.join(
        process.env.SEG_LOCAL_DATA_DIR ?? path.resolve("."),
        "imported-questions"
      );
      const entries = await readdir(importDir, { withFileTypes: true }).catch(
        () => []
      );
      const files = entries.filter(
        entry =>
          entry.isFile() &&
          (entry.name.endsWith(".jsonl") || entry.name.endsWith(".json"))
      );
      const items = [] as {
        id: string;
        question: string;
        chapterTitle: string;
        notes: string;
        arabicExplanation: string;
        englishExplanation: string;
      }[];
      for (const file of files) {
        const text = await readFile(path.join(importDir, file.name), "utf8");
        for (const line of text.split(/\r?\n/)) {
          if (!line.trim()) continue;
          try {
            const parsed = JSON.parse(line) as {
              id: string;
              question: string;
              chapterTitle: string;
              notes?: string;
              arabicExplanation?: string;
              englishExplanation?: string;
            };
            items.push({
              id: parsed.id,
              question: parsed.question,
              chapterTitle: parsed.chapterTitle,
              notes: parsed.notes ?? "",
              arabicExplanation: parsed.arabicExplanation ?? "",
              englishExplanation: parsed.englishExplanation ?? "",
            });
          } catch {
            // skip malformed line
          }
        }
      }
      return { total: items.length, items };
    }),
    importDelete: protectedProcedure
      .input(z.object({ id: z.string().min(1).max(200) }))
      .mutation(async ({ input }) => {
        const importDir = path.join(
          process.env.SEG_LOCAL_DATA_DIR ?? path.resolve("."),
          "imported-questions"
        );
        const entries = await readdir(importDir, { withFileTypes: true }).catch(
          () => []
        );
        let removed = 0;
        for (const entry of entries) {
          if (!entry.isFile() || !entry.name.endsWith(".jsonl")) continue;
          const target = path.join(importDir, entry.name);
          const text = await readFile(target, "utf8");
          const lines = text.split(/\r?\n/).filter(line => line.trim());
          const kept = lines.filter(line => {
            try {
              return (JSON.parse(line) as { id: string }).id !== input.id;
            } catch {
              return true;
            }
          });
          if (kept.length !== lines.length) {
            removed += lines.length - kept.length;
            await writeFile(
              target,
              kept.length ? `${kept.join("\n")}\n` : "",
              "utf8"
            );
          }
        }
        resetResidentContentCache();
        return { removed };
      }),
    practiceSummary: protectedProcedure.query(async ({ ctx }) => {
      const history = await db.getQuestionHistory(ctx.user.id);
      const { attempts, excluded } = await regradeResidentAttempts(history.attempts);
      return { attempted: attempts.length, correct: attempts.reduce((sum, attempt) => sum + attempt.correct, 0), recent: attempts.slice(0, 10), excludedAttemptCount: excluded };
    }),
    performanceSummary: protectedProcedure.query(async ({ ctx }) => {
      const history = await db.getQuestionHistory(ctx.user.id);
      const corrected = await regradeResidentAttempts(history.attempts);
      const [frcemChapters, hippoChapters, frcemProgress, hippoProgress] =
        await Promise.all([
          listResidentChapters("FRCEM"),
          listResidentChapters("HIPPO"),
          db.getResidentStudyProgress(ctx.user.id, "FRCEM"),
          db.getResidentStudyProgress(ctx.user.id, "HIPPO"),
        ]);
      const perf = await summarizeResidentPerformance(corrected.attempts);
      return {
        ...perf,
        topics: await summarizeTopicProgress({
          chapters: [...frcemChapters, ...hippoChapters],
          attempts: corrected.attempts,
          progress: [...frcemProgress, ...hippoProgress],
        }),
      };
    }),
    submitAnswer: protectedProcedure
      .input(
        z.object({
          questionId: z.string().min(1).max(160),
          selectedAnswer: z.string().min(1).max(8),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const question = await getResidentQuestion(input.questionId);
        if (!question)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Question not found.",
          });
        const correct = gradeSelectedAnswer(question, input.selectedAnswer);
        if (correct === null) throw new TRPCError({ code: "BAD_REQUEST", message: "Selected option is not valid for this question." });
        await db.recordResidentQuestionAttempt({
          userId: ctx.user.id,
          questionId: question.id,
          family: question.family,
          chapterNumber: question.chapterNumber,
          selectedAnswer: input.selectedAnswer,
          correct,
        });
        return { correct, correctAnswer: question.correctAnswer };
      }),
  }),
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => {
      const user = opts.ctx.user;
      return user?.loginMethod === "email" && !user.emailVerifiedAt && !isPilotVerificationEnabled()
        ? null
        : user;
    }),
    register: publicProcedure
      .input(
        z.object({
          fullName: z.string().trim().min(2).max(120),
          email: z.string().trim().email().max(320),
          password: z
            .string()
            .min(12)
            .max(128)
            .regex(/[a-z]/, "Password must include a lowercase letter")
            .regex(/[A-Z]/, "Password must include an uppercase letter")
            .regex(/\d/, "Password must include a number")
            .regex(/[^A-Za-z0-9]/, "Password must include a symbol"),
          professionalTrack: z.string().trim().min(2).max(96),
          country: z.string().trim().min(2).max(96).optional(),
          graduationYear: z.number().int().min(1950).max(2100).optional(),
          preferredLanguage: z.enum(["en", "ar"]),
          acceptedTerms: z.literal(true),
        })
      )
      .mutation(async ({ input, ctx }) => {
        try {
          if (await db.getEmailCredential(input.email)) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "An account with this email already exists.",
            });
          }
          const verificationCode = createVerificationCode();
          const normalizedEmail = db.normalizeEmail(input.email);
          const user = await db.createEmailUser({
            openId: `email:${randomUUID()}`,
            name: input.fullName,
            email: input.email,
            passwordHash: await hashPassword(input.password),
            professionalTrack: input.professionalTrack,
            country: input.country,
            graduationYear: input.graduationYear,
            preferredLanguage: input.preferredLanguage,
            verificationCodeHash: hashVerificationCode(
              normalizedEmail,
              verificationCode
            ),
            verificationExpiresAt: new Date(
              Date.now() + VERIFICATION_CODE_TTL_MS
            ),
          });
          const pilotMode = isPilotVerificationEnabled();
          if (pilotMode) await db.markEmailVerified(user.id);
          if (!pilotMode) {
            await sendVerificationEmail({
              email: normalizedEmail,
              name: user.name ?? input.fullName,
              code: verificationCode,
            });
          }
          return {
            email: normalizedEmail,
            verificationRequired: !pilotMode,
            pilotVerificationCode: pilotMode ? verificationCode : null,
          };
        } catch (error) {
          if (error instanceof TRPCError) throw error;
          if (error instanceof EmailDeliveryError && error.status === 403) {
            log.warn("email_registration_delivery_rejected", {
              requestId: ctx.req.requestId,
              status: error.status,
            });
            throw new TRPCError({
              code: "FORBIDDEN",
              message:
                "Email delivery was rejected by the configured provider. Check the verified sender and provider account status.",
            });
          }
          const code =
            typeof error === "object" && error !== null && "code" in error
              ? String(error.code)
              : "";
          if (code === "ER_DUP_ENTRY") {
            throw new TRPCError({
              code: "CONFLICT",
              message: "An account with this email already exists.",
            });
          }
          log.error("email_registration_failed", {
            requestId: ctx.req.requestId,
            error,
          });
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              "Registration service is temporarily unavailable. Please try again.",
          });
        }
      }),
    verifyEmail: publicProcedure
      .input(
        z.object({
          email: z.string().trim().email().max(320),
          code: z.string().regex(/^\d{6}$/),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const record = await db.getEmailVerification(input.email);
        if (!record)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid or expired verification code.",
          });
        if (record.verification.expiresAt.getTime() < Date.now()) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Verification code expired. Request a new code.",
          });
        }
        if (record.verification.attempts >= MAX_VERIFICATION_ATTEMPTS) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "Too many attempts. Request a new code.",
          });
        }
        if (
          !verificationCodeMatches(
            input.email,
            input.code,
            record.verification.codeHash
          )
        ) {
          await db.incrementVerificationAttempts(
            record.user.id,
            record.verification.attempts + 1
          );
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid or expired verification code.",
          });
        }
        await db.markEmailVerified(record.user.id);
        const token = await sdk.createSessionToken(record.user.openId, {
          name: record.user.name ?? "SEG User",
          expiresInMs: 30 * 24 * 60 * 60 * 1000,
        });
        ctx.res.cookie(COOKIE_NAME, token, {
          ...getSessionCookieOptions(ctx.req),
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return { success: true as const };
      }),
    resendVerification: publicProcedure
      .input(z.object({ email: z.string().trim().email().max(320) }))
      .mutation(async ({ input }) => {
        const credential = await db.getEmailCredential(input.email);
        if (!credential || credential.user.emailVerifiedAt)
          return { success: true as const };
        const existing = await db.getEmailVerification(input.email);
        if (
          existing &&
          Date.now() - existing.verification.lastSentAt.getTime() <
            VERIFICATION_RESEND_DELAY_MS
        ) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "Wait 60 seconds before requesting another code.",
          });
        }
        const code = createVerificationCode();
        await db.replaceVerificationCode(
          credential.user.id,
          hashVerificationCode(input.email, code),
          new Date(Date.now() + VERIFICATION_CODE_TTL_MS)
        );
        const pilotMode = isPilotVerificationEnabled();
        if (!pilotMode) {
          await sendVerificationEmail({
            email: db.normalizeEmail(input.email),
            name: credential.user.name ?? "SEG User",
            code,
          });
        }
        return {
          success: true as const,
          pilotVerificationCode: pilotMode ? code : null,
        };
      }),
    login: publicProcedure
      .input(
        z.object({
          email: z.string().trim().email().max(320),
          password: z.string().max(128).optional(),
          remember: z.boolean(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (!input.password) {
          if (localEmailOnlyLoginAllowed()) {
            const user = await db.getOrCreateLocalEmailUser(input.email);
            const maxAge = input.remember ? 30 * 24 * 60 * 60 * 1000 : undefined;
            const token = await sdk.createSessionToken(user.openId, {
              name: user.name ?? "Local user",
              expiresInMs: maxAge ?? 24 * 60 * 60 * 1000,
            });
            ctx.res.cookie(COOKIE_NAME, token, {
              ...getSessionCookieOptions(ctx.req),
              ...(maxAge ? { maxAge } : {}),
            });
            return { user };
          }
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Password is required for this environment.",
          });
        }
        let record: Awaited<ReturnType<typeof db.getEmailCredential>>;
        try {
          record = await db.getEmailCredential(input.email);
        } catch (error) {
          log.error("email_login_database_failed", {
            requestId: ctx.req.requestId,
            error,
          });
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              "Sign-in service is temporarily unavailable. Please try again.",
          });
        }
        const passwordMatches = record
          ? await verifyPassword(input.password, record.credential.passwordHash)
          : await verifyPassword(
              input.password,
              await hashPassword("timing-only-not-a-user-password")
            );

        if (!record || !passwordMatches) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid email or password.",
          });
        }
        if (!record.user.emailVerifiedAt && !isPilotVerificationEnabled()) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Verify your email address before signing in.",
          });
        }
        if (!record.user.emailVerifiedAt && isPilotVerificationEnabled()) {
          await db.markEmailVerified(record.user.id);
        }

        await db.upsertUser({
          openId: record.user.openId,
          lastSignedIn: new Date(),
        });
        const maxAge = input.remember ? 30 * 24 * 60 * 60 * 1000 : undefined;
        const token = await sdk.createSessionToken(record.user.openId, {
          name: record.user.name ?? "SEG User",
          expiresInMs: maxAge ?? 24 * 60 * 60 * 1000,
        });
        ctx.res.cookie(COOKIE_NAME, token, {
          ...getSessionCookieOptions(ctx.req),
          ...(maxAge ? { maxAge } : {}),
        });
        return { user: record.user };
      }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const rawCookie = ctx.req.headers.cookie ?? "";
      const match = rawCookie.split(";").map(s => s.trim()).find(s => s.startsWith(`${COOKIE_NAME}=`));
      const token = match ? decodeURIComponent(match.slice(COOKIE_NAME.length + 1)) : undefined;
      // Also check Authorization Bearer fallback (Safari ITP / WebView)
      const bearer = typeof ctx.req.headers.authorization === "string" && ctx.req.headers.authorization.startsWith("Bearer ")
        ? ctx.req.headers.authorization.slice(7)
        : undefined;
      sdk.revokeSession(token);
      if (bearer && bearer !== token) sdk.revokeSession(bearer);
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
