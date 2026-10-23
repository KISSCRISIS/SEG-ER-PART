/**
 * Smart Exam Cache - shared constants and pure helpers.
 * Keeps existing exam creation/selection logic intact.
 * Large exams (>500) store IDs first and load bodies in chunks.
 */

export const SMART_EXAM_THRESHOLD = 500;
export const SMART_EXAM_BATCH_SIZE = 50;
export const SMART_EXAM_PREFETCH_BATCHES = 1;

/** Fast-path check - small exams keep current eager loading. */
export function isLargeExam(totalQuestions: number): boolean {
  return totalQuestions > SMART_EXAM_THRESHOLD;
}

export function chunkQuestionIds(ids: string[], batchSize = SMART_EXAM_BATCH_SIZE): string[][] {
  const chunks: string[][] = [];
  for (let i = 0; i < ids.length; i += batchSize) {
    chunks.push(ids.slice(i, i + batchSize));
  }
  return chunks;
}

export function getBatchIndex(questionIndex: number, batchSize = SMART_EXAM_BATCH_SIZE): number {
  if (questionIndex < 0) return 0;
  return Math.floor(questionIndex / batchSize);
}

export function getBatchForIndex(ids: string[], questionIndex: number, batchSize = SMART_EXAM_BATCH_SIZE): string[] {
  const batch = getBatchIndex(questionIndex, batchSize);
  const start = batch * batchSize;
  return ids.slice(start, start + batchSize);
}

export function getNextBatchForIndex(ids: string[], questionIndex: number, batchSize = SMART_EXAM_BATCH_SIZE): string[] {
  const batch = getBatchIndex(questionIndex, batchSize);
  const start = (batch + 1) * batchSize;
  if (start >= ids.length) return [];
  return ids.slice(start, start + batchSize);
}

/**
 * Current window + next batch (prefetch). This is what the client should
 * keep in memory. Everything else can stay as IDs only.
 */
export function getVisibleQuestionIdsWithPrefetch(
  ids: string[],
  currentIndex: number,
  batchSize = SMART_EXAM_BATCH_SIZE,
): string[] {
  const current = getBatchForIndex(ids, currentIndex, batchSize);
  const next = getNextBatchForIndex(ids, currentIndex, batchSize);
  // Deduplicate just in case (last batch edge)
  const seen = new Set<string>();
  const merged: string[] = [];
  for (const id of [...current, ...next]) {
    if (!seen.has(id)) {
      seen.add(id);
      merged.push(id);
    }
  }
  return merged;
}

export function getVisibleBatchIndices(
  ids: string[],
  currentIndex: number,
  batchSize = SMART_EXAM_BATCH_SIZE,
): number[] {
  const current = getBatchIndex(currentIndex, batchSize);
  const totalBatches = Math.ceil(ids.length / batchSize);
  const indices = [current];
  if (current + 1 < totalBatches) indices.push(current + 1);
  return indices;
}

export type ExamCacheBatchMeta = {
  examId: string;
  batchIndex: number;
  batchSize: number;
  questionIds: string[];
  cachedAt: string;
};

export function buildCacheKey(examId: string, batchIndex: number): string {
  return `${examId}::batch::${batchIndex}`;
}

export function getTotalBatches(totalQuestions: number, batchSize = SMART_EXAM_BATCH_SIZE): number {
  return Math.ceil(totalQuestions / batchSize);
}
