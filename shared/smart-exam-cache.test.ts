import { describe, expect, it } from "vitest";
import {
  SMART_EXAM_THRESHOLD,
  SMART_EXAM_BATCH_SIZE,
  isLargeExam,
  chunkQuestionIds,
  getBatchIndex,
  getBatchForIndex,
  getNextBatchForIndex,
  getVisibleQuestionIdsWithPrefetch,
  getVisibleBatchIndices,
  getTotalBatches,
} from "./smart-exam-cache";

function ids(count: number): string[] {
  return Array.from({ length: count }, (_, i) => `q-${String(i + 1).padStart(4, "0")}`);
}

describe("Smart Exam Cache - shared helpers", () => {
  it("threshold keeps small exams on fast path", () => {
    expect(isLargeExam(100)).toBe(false);
    expect(isLargeExam(499)).toBe(false);
    expect(isLargeExam(500)).toBe(false);
    expect(isLargeExam(501)).toBe(true);
    expect(isLargeExam(1000)).toBe(true);
    expect(SMART_EXAM_THRESHOLD).toBe(500);
  });

  it("chunks IDs correctly", () => {
    const chunked = chunkQuestionIds(ids(120), 50);
    expect(chunked).toHaveLength(3);
    expect(chunked[0]).toHaveLength(50);
    expect(chunked[1]).toHaveLength(50);
    expect(chunked[2]).toHaveLength(20);
  });

  it("returns correct batch for index", () => {
    const all = ids(200);
    expect(getBatchIndex(0)).toBe(0);
    expect(getBatchIndex(49)).toBe(0);
    expect(getBatchIndex(50)).toBe(1);
    expect(getBatchIndex(149)).toBe(2);
    expect(getBatchForIndex(all, 0)).toHaveLength(50);
    expect(getBatchForIndex(all, 55)[0]).toBe("q-0051");
  });

  it("prefetches next batch automatically", () => {
    const all = ids(200);
    const pref = getNextBatchForIndex(all, 10);
    expect(pref).toHaveLength(50);
    expect(pref[0]).toBe("q-0051");
    // last batch has no next
    expect(getNextBatchForIndex(all, 190)).toHaveLength(0);
  });

  it("visible + prefetch merges current and next", () => {
    const all = ids(200);
    const win = getVisibleQuestionIdsWithPrefetch(all, 10, 50);
    expect(win).toHaveLength(100);
    expect(win[0]).toBe("q-0001");
    expect(win[50]).toBe("q-0051");
    // last window only current
    const last = getVisibleQuestionIdsWithPrefetch(all, 190, 50);
    expect(last).toHaveLength(50);
  });

  it("visible batch indices for large exam", () => {
    const all = ids(1000);
    expect(getVisibleBatchIndices(all, 0)).toEqual([0, 1]);
    expect(getVisibleBatchIndices(all, 60)).toEqual([1, 2]);
    expect(getVisibleBatchIndices(all, 999)).toEqual([19]);
  });
});

describe("Smart Exam Cache - 500/1000/2000 sessions", () => {
  it.each([500, 1000, 2000] as const)("handles %i question session without loading all bodies", async (total) => {
    const all = ids(total);
    // Large determination
    if (total === 500) expect(isLargeExam(total)).toBe(false);
    else expect(isLargeExam(total)).toBe(true);

    // Simulate smart loading: store IDs first, then load window
    // Memory check: we should only keep ~2 batches in memory at a time (100 items)
    const batchSize = SMART_EXAM_BATCH_SIZE;
    const totalBatches = getTotalBatches(total, batchSize);
    expect(totalBatches).toBe(Math.ceil(total / batchSize));

    for (let current = 0; current < Math.min(total, 200); current += 47) {
      const windowIds = getVisibleQuestionIdsWithPrefetch(all, current, batchSize);
      // window should be at most 2 batches
      expect(windowIds.length).toBeLessThanOrEqual(batchSize * 2);
      expect(windowIds.length).toBeGreaterThan(0);
      // current index's ID must be inside window
      expect(windowIds).toContain(all[current]);
      // For first position, window starts at 0
      if (current < batchSize) expect(windowIds[0]).toBe(all[0]);
    }
  });

  it("500 question session keeps fast path (all-at-once allowed)", () => {
    const all = ids(500);
    expect(isLargeExam(all.length)).toBe(false);
    // Fast path could still use batch helper but not required to chunk
    const chunks = chunkQuestionIds(all, 100);
    expect(chunks).toHaveLength(5);
    expect(chunks.flat()).toEqual(all);
  });

  it("1000 question session chunked progress and navigator remain correct", () => {
    const all = ids(1000);
    // Navigator page size 100 should still show 10 pages
    const NAV_PAGE = 100;
    const pages = Math.ceil(all.length / NAV_PAGE);
    expect(pages).toBe(10);
    // Moving through pages still uses IDs for counts
    for (let page = 0; page < pages; page += 1) {
      const slice = all.slice(page * NAV_PAGE, (page + 1) * NAV_PAGE);
      expect(slice.length).toBe(100);
    }
    // Smart cache preserves order after batch load
    const batch0 = getBatchForIndex(all, 0, 50);
    const batch1 = getNextBatchForIndex(all, 0, 50);
    expect([...batch0, ...batch1].slice(0, 100)).toEqual(all.slice(0, 100));
  });

  it("2000 question session memory efficient window", () => {
    const all = ids(2000);
    expect(getTotalBatches(all.length, 50)).toBe(40);
    // Only current + next batch loaded => ~100 bodies vs 2000
    const memBodies = getVisibleQuestionIdsWithPrefetch(all, 1000, 50).length;
    expect(memBodies).toBe(100);
    // Ratio
    expect(memBodies / all.length).toBeLessThan(0.1);
  });
});
