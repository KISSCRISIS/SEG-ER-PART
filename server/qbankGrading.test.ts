import { afterAll, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

process.env.OAUTH_SERVER_URL = "http://localhost:3000";

const collections = new Map<string, unknown[]>();

const mockStore = {
  close: vi.fn(),
  list: vi.fn((collection: string, userId: number) => {
    const key = `${collection}:${userId}`;
    return (collections.get(key) ?? []) as unknown[];
  }),
  put: vi.fn((collection: string, userId: number, id: string, document: unknown, _insertOnly = false) => {
    const key = `${collection}:${userId}`;
    if (!collections.has(key)) collections.set(key, []);
    const arr = collections.get(key)!;
    const existing = arr.findIndex((item: unknown) => (item as Record<string, unknown>).id === id);
    const doc = { ...(document as Record<string, unknown>), updatedAt: new Date(), id };
    if (existing >= 0) arr[existing] = doc;
    else arr.push(doc);
  }),
  update: vi.fn((collection: string, userId: number, id: string, values: unknown) => {
    const key = `${collection}:${userId}`;
    const arr = collections.get(key);
    if (arr) {
      const item = (arr as unknown[]).find((i: unknown) => (i as Record<string, unknown>).id === id);
      if (item) Object.assign(item, values, { updatedAt: new Date() });
    }
  }),
  delete: vi.fn((collection: string, userId: number, id: string) => {
    const key = `${collection}:${userId}`;
    const arr = collections.get(key);
    if (arr) {
      const idx = (arr as unknown[]).findIndex((i: unknown) => (i as Record<string, unknown>).id === id);
      if (idx >= 0) arr.splice(idx, 1);
    }
  }),
};

vi.mock("./localStore", () => ({
  localStore: () => mockStore,
  localStorageEnabled: () => true,
}));

import { appRouter } from "./routers";
import { localStore } from "./localStore";
import { recordResidentQuestionAttempt } from "./db";
import { getResidentQuestion } from "./residentContent";

const userId = 4931;

const context: TrpcContext = {
  user: {
    id: userId,
    openId: "qbank-grade-test",
    email: null,
    name: "Test",
    loginMethod: "local",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  },
  req: {
    headers: {},
    protocol: "http",
  } as TrpcContext["req"],
  res: {} as TrpcContext["res"],
};

const caller = appRouter.createCaller(context);

afterAll(() => {
  localStore().close();
});

describe("Qbank grading and historical results", () => {
  it("accepts a correct Rosh option and rejects a wrong option or an arbitrary text prefix", async () => {
    const id = "rosh-em-initial-2026-cardiovascular-disorders-q-001";

    expect(
      (
        await caller.residentContent.submitAnswer({
          questionId: id,
          selectedAnswer: "D",
        })
      ).correct,
    ).toBe(true);

    expect(
      (
        await caller.residentContent.submitAnswer({
          questionId: id,
          selectedAnswer: "A",
        })
      ).correct,
    ).toBe(false);

    await expect(
      caller.residentContent.submitAnswer({
        questionId: id,
        selectedAnswer: "Pericard",
      }),
    ).rejects.toMatchObject({
      code: "BAD_REQUEST",
    });
  });

  it("derives a HIPPO key from its exact option text and hides ungradable source records", async () => {
    const hippo = await getResidentQuestion("hippo-ch-01-q-0001");

    expect(hippo?.correctAnswerKey).toBe("B");

    expect(
      (
        await caller.residentContent.submitAnswer({
          questionId: hippo!.id,
          selectedAnswer: "B",
        })
      ).correct,
    ).toBe(true);

    await expect(
      caller.residentContent.submitAnswer({
        questionId: "non-existent-question-for-test",
        selectedAnswer: "A",
      }),
    ).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });

  it("corrects historical flags in API responses without mutating the stored attempt", async () => {
    await recordResidentQuestionAttempt({
      userId,
      questionId:
        "rosh-em-initial-2026-cardiovascular-disorders-q-001",
      family: "ROSH_2026",
      chapterNumber: 1,
      selectedAnswer: "D",
      correct: false,
    });

    const history = await caller.qbank.history();

    expect(history.attempts[0].correct).toBe(1);

    const summary = await caller.residentContent.practiceSummary();

    expect(summary.correct).toBeGreaterThan(0);
  });

  it("recalculates completed saved-exam results when they are read", async () => {
    const questionId =
      "rosh-em-initial-2026-cardiovascular-disorders-q-001";

    const exam = await caller.qbank.createExam({
      name: "Historical score",
      mode: "test",
      timeMode: "untimed",
      configuration: {},
      questionIds: [questionId],
      remainingSeconds: null,
    });

    await caller.qbank.updateExam({
      id: exam.id,
      status: "completed",
      answers: {
        [questionId]: "D",
      },
      results: {
        [questionId]: {
          correct: false,
          correctAnswer: "Pericarditis",
        },
      },
      flaggedQuestionIds: [],
      currentIndex: 0,
      remainingSeconds: null,
      correctCount: 0,
    });

    const saved = (await caller.qbank.exams()).find(
      (item) => item.id === exam.id,
    );

    expect(saved?.correctCount).toBe(1);

    expect(
      (saved?.results as Record<string, { correct: boolean }>)[questionId]
        .correct,
    ).toBe(true);
  });
});