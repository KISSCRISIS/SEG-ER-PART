import { localStore, localStorageEnabled } from "./localStore";
import { getResidentQuestionsByIds } from "./residentContent";
import {
  SMART_EXAM_BATCH_SIZE,
  buildCacheKey,
  getBatchIndex,
  getVisibleBatchIndices,
  isLargeExam,
} from "@shared/smart-exam-cache";

/**
 * Smart Exam Cache (server)
 * - Large exams (>500) keep questionIds as source of truth, load bodies in chunks.
 * - Uses existing local SQLite storage pattern (LocalStore.workspace).
 * - Caches loaded batches locally so resume/navigator stay instant.
 * - Answers/results are persisted immediately via updateQbankExam (no full list required).
 */

const COLLECTION = "exam-question-cache";

type CachedBatchDoc = {
  id: string;
  examId: string;
  batchIndex: number;
  batchSize: number;
  questionIds: string[];
  questions: Awaited<ReturnType<typeof getResidentQuestionsByIds>>;
  cachedAt: string;
  updatedAt?: Date;
};

export function shouldUseSmartCache(totalQuestions: number): boolean {
  return isLargeExam(totalQuestions);
}

export function getBatchIdsForCurrentIndex(
  questionIds: string[],
  currentIndex: number,
  batchSize = SMART_EXAM_BATCH_SIZE,
): string[] {
  const batch = getBatchIndex(currentIndex, batchSize);
  const start = batch * batchSize;
  return questionIds.slice(start, start + batchSize);
}

export function getPrefetchIdsForCurrentIndex(
  questionIds: string[],
  currentIndex: number,
  batchSize = SMART_EXAM_BATCH_SIZE,
): string[] {
  const batch = getBatchIndex(currentIndex, batchSize);
  const start = (batch + 1) * batchSize;
  if (start >= questionIds.length) return [];
  return questionIds.slice(start, start + batchSize);
}

function cacheKey(examId: string, batchIndex: number): string {
  return buildCacheKey(examId, batchIndex);
}

/** Read batch from local SQLite cache if available */
export function getCachedBatch(userId: number, examId: string, batchIndex: number): CachedBatchDoc | null {
  if (!localStorageEnabled()) return null;
  try {
    const docs = localStore().list<CachedBatchDoc>(COLLECTION, userId);
    return docs.find(d => d.examId === examId && d.batchIndex === batchIndex) ?? null;
  } catch {
    return null;
  }
}

export function putCachedBatch(
  userId: number,
  examId: string,
  batchIndex: number,
  batchSize: number,
  questionIds: string[],
  questions: CachedBatchDoc["questions"],
): void {
  if (!localStorageEnabled()) return;
  const doc: CachedBatchDoc = {
    id: cacheKey(examId, batchIndex),
    examId,
    batchIndex,
    batchSize,
    questionIds,
    questions,
    cachedAt: new Date().toISOString(),
    updatedAt: new Date(),
  };
  localStore().put(COLLECTION, userId, doc.id, doc);
}

/**
 * Load a single batch, using cache when possible.
 * Falls back to getResidentQuestionsByIds (which reads from JSONL files).
 */
export async function loadExamBatch(
  userId: number,
  examId: string,
  questionIds: string[],
  batchIndex: number,
  batchSize = SMART_EXAM_BATCH_SIZE,
): Promise<CachedBatchDoc["questions"]> {
  const cached = getCachedBatch(userId, examId, batchIndex);
  const expectedIds = questionIds.slice(batchIndex * batchSize, (batchIndex + 1) * batchSize);
  if (cached && cached.questionIds.length === expectedIds.length && cached.questionIds.every((id, i) => id === expectedIds[i])) {
    return cached.questions;
  }
  const idsSlice = expectedIds;
  if (!idsSlice.length) return [];
  const questions = await getResidentQuestionsByIds(idsSlice);
  // Preserve requested order (getResidentQuestionsByIds filters but keeps input order where found)
  putCachedBatch(userId, examId, batchIndex, batchSize, idsSlice, questions);
  return questions;
}

/**
 * Load current window + next batch, cache both, return merged.
 * This is the "Load current question range plus next batch automatically" requirement.
 */
export async function loadCurrentWindowWithPrefetch(
  userId: number,
  examId: string,
  questionIds: string[],
  currentIndex: number,
  batchSize = SMART_EXAM_BATCH_SIZE,
): Promise<CachedBatchDoc["questions"]> {
  const indices = getVisibleBatchIndices(questionIds, currentIndex, batchSize);
  const batches = await Promise.all(indices.map(idx => loadExamBatch(userId, examId, questionIds, idx, batchSize)));
  return batches.flat();
}

/** Invalidate cache for an exam (e.g., on delete). */
export function clearExamCache(userId: number, examId: string): void {
  if (!localStorageEnabled()) return;
  const docs = localStore().list<CachedBatchDoc>(COLLECTION, userId);
  for (const doc of docs.filter(d => d.examId === examId)) {
    localStore().delete(COLLECTION, userId, doc.id);
  }
}
