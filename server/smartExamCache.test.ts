import { describe, expect, it, vi, beforeEach, afterAll } from "vitest";

process.env.SEG_LOCAL_WORKSPACE = "true";
process.env.SEG_LOCAL_DATA_DIR = ".seg-local-data";
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
import type { TrpcContext } from "./_core/context";
import { listResidentQuestions, getResidentQuestionsByIds } from "./residentContent";

const userId = 7777;
const context: TrpcContext = {
  user: { id: userId, openId: "smart-cache-test", email: null, name: "Smart", loginMethod: "local", role: "user", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
  req: { headers: {}, protocol: "http" } as TrpcContext["req"],
  res: {} as TrpcContext["res"],
};
const caller = appRouter.createCaller(context);

beforeEach(() => {
  collections.clear();
  vi.clearAllMocks();
});

afterAll(() => {
  localStore().close();
});

describe("Smart Exam Cache - server batch APIs", () => {
  it("questionsBatch returns only requested window for 500/1000/2000", async () => {
    const catalog = await listResidentQuestions({ page: 1, pageSize: 100 });
    // Build deterministic id list by repeating catalog ids
    const base = catalog.items.map(i => i.id);
    for (const total of [500, 1000, 2000] as const) {
      const questionIds: string[] = [];
      while (questionIds.length < total) questionIds.push(...base);
      const ids = questionIds.slice(0, total);

      // fast path for 500 should still work via batch
      const batch = await caller.residentContent.questionsBatch({ questionIds: ids, offset: 0, limit: 50 });
      expect(batch.total).toBe(total);
      expect(batch.items).toHaveLength(50);
      expect(batch.offset).toBe(0);
      if (total === 500) expect(batch.isLargeExam).toBe(false);
      else expect(batch.isLargeExam).toBe(true);

      // middle window - pick offset inside range
      const midOffset = total === 500 ? 250 : 500;
      const mid = await caller.residentContent.questionsBatch({ questionIds: ids, offset: midOffset, limit: 50 });
      expect(mid.items).toHaveLength(50);
      expect(mid.offset).toBe(midOffset);

      // last partial window
      const lastOffset = total - 10;
      const last = await caller.residentContent.questionsBatch({ questionIds: ids, offset: lastOffset, limit: 50 });
      expect(last.items.length).toBeLessThanOrEqual(50);
      expect(last.items.length).toBeGreaterThan(0);
    }
  });

  it("examBatch loads current + next batch and caches locally for large exams", async () => {
    const base = (await listResidentQuestions({ page: 1, pageSize: 20 })).items.map(i => i.id);
    const total = 1000;
    const questionIds: string[] = [];
    while (questionIds.length < total) questionIds.push(...base);
    const ids = questionIds.slice(0, total);

    const exam = await caller.qbank.createExam({
      name: "large-1000",
      mode: "test",
      timeMode: "untimed",
      configuration: {},
      questionIds: ids,
      remainingSeconds: null,
    });

    // first window (0) => 100 items (2 batches of 50)
    const w0 = await caller.qbank.examBatch({ examId: exam.id, currentIndex: 0, batchSize: 50 });
    expect(w0.total).toBe(1000);
    expect(w0.isLargeExam).toBe(true);
    expect(w0.items).toHaveLength(100);
    expect(w0.currentBatchIndex).toBe(0);
    expect(w0.prefetchNext).toBe(true);

    // middle window still 100
    const wmid = await caller.qbank.examBatch({ examId: exam.id, currentIndex: 600, batchSize: 50 });
    expect(wmid.items).toHaveLength(100);

    // last window only 50
    const wlast = await caller.qbank.examBatch({ examId: exam.id, currentIndex: 999, batchSize: 50 });
    expect(wlast.items).toHaveLength(50);
    expect(wlast.prefetchNext).toBe(false);

    // persisted cache was used (localStore put called)
    expect(mockStore.put).toHaveBeenCalled();
  });

  it("small exam (<500) keeps fast path and does not require windowing", async () => {
    const base = (await listResidentQuestions({ page: 1, pageSize: 10 })).items.map(i => i.id);
    const ids = Array.from({ length: 100 }, (_, i) => base[i % base.length]);
    const exam = await caller.qbank.createExam({
      name: "small-100",
      mode: "tutor",
      timeMode: "untimed",
      configuration: {},
      questionIds: ids,
      remainingSeconds: null,
    });
    const w = await caller.qbank.examBatch({ examId: exam.id, currentIndex: 0, batchSize: 50 });
    expect(w.isLargeExam).toBe(false);
    expect(w.total).toBe(100);
    // For small, examBatch still returns a window but without smart caching requirement
    expect(w.items.length).toBeGreaterThan(0);
  });

  it("persist answers/results immediately without full list", async () => {
    const id = (await getResidentQuestionsByIds([(await listResidentQuestions({ page: 1, pageSize: 1 })).items[0].id]))[0].id;
    const questionIds = Array.from({ length: 600 }, () => id);
    const exam = await caller.qbank.createExam({
      name: "persist-large-600",
      mode: "test",
      timeMode: "untimed",
      configuration: {},
      questionIds,
      remainingSeconds: 3600,
    });

    // Simulate answering current question - updateExam should succeed with only one answer persisted
    await caller.qbank.updateExam({
      id: exam.id,
      status: "paused",
      answers: { [id]: "A" },
      results: {},
      flaggedQuestionIds: [id],
      currentIndex: 5,
      remainingSeconds: 3500,
      correctCount: null,
    });

    const saved = (await caller.qbank.exams()).find(e => e.id === exam.id)!;
    expect(saved.flaggedQuestionIds).toContain(id);
    expect(saved.currentIndex).toBe(5);
    expect(saved.questionIds).toHaveLength(600);
    // answers persisted without needing to load 600 bodies
    expect((saved.answers as Record<string, string>)[id]).toBe("A");
  });

  it("2000 question session chunked loading preserves order and resume", async () => {
    const base = (await listResidentQuestions({ page: 1, pageSize: 20 })).items.map(i => i.id);
    const ids = Array.from({ length: 2000 }, (_, i) => base[i % base.length]);
    const exam = await caller.qbank.createExam({
      name: "large-2000",
      mode: "test",
      timeMode: "timed",
      configuration: {},
      questionIds: ids,
      remainingSeconds: 3000,
    });

    // Simulate navigation: 0 -> 55 -> 1999
    const w0 = await caller.qbank.examWindow({ examId: exam.id, currentIndex: 0 });
    expect(w0.items[0].id).toBe(ids[0]);

    const w55 = await caller.qbank.examWindow({ examId: exam.id, currentIndex: 55 });
    expect(w55.items.map(i => i.id)).toContain(ids[55]);
    // next batch prefetched
    expect(w55.items.map(i => i.id)).toContain(ids[100]);

    await caller.qbank.updateExam({
      id: exam.id,
      status: "paused",
      answers: {},
      results: {},
      flaggedQuestionIds: [],
      currentIndex: 1999,
      remainingSeconds: 100,
      correctCount: null,
    });

    const wLast = await caller.qbank.examWindow({ examId: exam.id, currentIndex: 1999 });
    expect(wLast.items.map(i => i.id)).toContain(ids[1999]);
    expect(wLast.total).toBe(2000);
  });
});
