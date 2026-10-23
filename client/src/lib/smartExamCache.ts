import {
  SMART_EXAM_BATCH_SIZE,
  SMART_EXAM_THRESHOLD,
  getVisibleBatchIndices,
  isLargeExam,
  buildCacheKey,
} from "@shared/smart-exam-cache";

type CachedBatch<T> = {
  examId: string;
  batchIndex: number;
  questionIds: string[];
  questions: T[];
  cachedAt: number;
};

const LS_PREFIX = "seg:exam-cache:";

function lsKey(examId: string, batchIndex: number): string {
  return `${LS_PREFIX}${buildCacheKey(examId, batchIndex)}`;
}

export function shouldUseSmartCache(total: number): boolean {
  return isLargeExam(total);
}

export { SMART_EXAM_BATCH_SIZE, SMART_EXAM_THRESHOLD };

export function getBatchIndicesForCurrentIndex(
  questionIds: string[],
  currentIndex: number,
  batchSize = SMART_EXAM_BATCH_SIZE,
): number[] {
  return getVisibleBatchIndices(questionIds, currentIndex, batchSize);
}

export function readCachedBatch<T>(examId: string, batchIndex: number): CachedBatch<T> | null {
  try {
    const raw = localStorage.getItem(lsKey(examId, batchIndex));
    if (!raw) return null;
    return JSON.parse(raw) as CachedBatch<T>;
  } catch {
    return null;
  }
}

export function writeCachedBatch<T>(examId: string, batchIndex: number, questionIds: string[], questions: T[]): void {
  try {
    const doc: CachedBatch<T> = {
      examId,
      batchIndex,
      questionIds,
      questions,
      cachedAt: Date.now(),
    };
    localStorage.setItem(lsKey(examId, batchIndex), JSON.stringify(doc));
  } catch {
    // quota exceeded or private mode - ignore, rely on server fetch
  }
}

export function clearExamCache(examId: string): void {
  try {
    const prefix = `${LS_PREFIX}${examId}::`;
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) keys.push(k);
    }
    for (const k of keys) localStorage.removeItem(k);
  } catch {
    // ignore
  }
}

/**
 * Merge cached batches for current window (current + next).
 * Returns null if any required batch is missing.
 */
export function readWindowFromCache<T>(examId: string, questionIds: string[], currentIndex: number, batchSize = SMART_EXAM_BATCH_SIZE): T[] | null {
  const indices = getVisibleBatchIndices(questionIds, currentIndex, batchSize);
  const batches: T[][] = [];
  for (const idx of indices) {
    const expected = questionIds.slice(idx * batchSize, (idx + 1) * batchSize);
    const cached = readCachedBatch<T>(examId, idx);
    if (!cached || cached.questionIds.length !== expected.length || !cached.questionIds.every((id, i) => id === expected[i])) {
      return null;
    }
    batches.push(cached.questions);
  }
  return batches.flat();
}
