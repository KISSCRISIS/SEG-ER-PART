import { localStorageEnabled, localStore } from "./localStore";
import * as db from "./db";

export const CLASSIFICATIONS = [
  "Knowledge Gap",
  "Sequence Error",
  "Guideline Conflict",
  "Contraindication",
  "Data Misinterpretation",
] as const;

export type Classification = typeof CLASSIFICATIONS[number];

export type WeaknessDoc = {
  id: string; // questionId
  userId: number;
  classification: Classification | null;
  notes: string;
  reviewStatus: "unreviewed" | "reviewed" | "mastery";
  createdAt: string;
  updatedAt: string;
};

export async function getWeaknessCenterData(userId: number) {
  const history = await db.getQuestionHistory(userId);
  const attempts = history.attempts ?? [];
  const wrongIds = new Set(attempts.filter(a => a.correct === 0).map(a => a.questionId));
  const repeatedIds = new Set<string>();
  const counts = new Map<string, number>();
  for (const attempt of attempts) {
    counts.set(attempt.questionId, (counts.get(attempt.questionId) ?? 0) + 1);
    if ((counts.get(attempt.questionId) ?? 0) > 1 && (attempt.correct === 0)) repeatedIds.add(attempt.questionId);
  }
  const weaknessList = await localStore().list<WeaknessDoc>("weakness-center", userId);
  // Merge with attempts info
  const merged = Array.from(new Set([...wrongIds, ...repeatedIds])).map(id => {
    const historyForQuestion = attempts.filter(a => a.questionId === id);
    const lastAttempt = historyForQuestion.slice(-1)[0];
    const attemptCount = counts.get(id) ?? 1;
    const doc = weaknessList.find(w => w.id === id);
    // Mastery requires a streak of at least 2 correct answers — one correct answer is not proof of mastery.
    let correctStreak = 0;
    for (let i = historyForQuestion.length - 1; i >= 0; i--) {
      if (historyForQuestion[i].correct === 1) correctStreak++;
      else break;
    }
    const masteryEligible = correctStreak >= 2;
    return {
      id,
      family: lastAttempt?.family ?? "IMPORTED",
      chapterNumber: lastAttempt?.chapterNumber ?? 0,
      selectedAnswer: lastAttempt?.selectedAnswer ?? "",
      correct: lastAttempt?.correct ?? 0,
      attemptedAt: lastAttempt?.attemptedAt ?? new Date().toISOString(),
      attemptCount,
      wrongCount: historyForQuestion.filter(a => a.correct === 0).length,
      correctCount: historyForQuestion.filter(a => a.correct === 1).length,
      correctStreak,
      masteryEligible,
      isRepeated: repeatedIds.has(id),
      classification: doc?.classification ?? null,
      notes: doc?.notes ?? "",
      reviewStatus: doc?.reviewStatus ?? "unreviewed",
      attempts: historyForQuestion.map(a => ({
        correct: a.correct,
        selectedAnswer: a.selectedAnswer,
        attemptedAt: a.attemptedAt instanceof Date ? a.attemptedAt.toISOString() : String(a.attemptedAt),
      })),
    };
  });
  return merged;
}

export async function setWeaknessClassification(userId: number, questionId: string, classification: Classification | null, notes = "") {
  if (!localStorageEnabled()) throw new Error("Local workspace only");
  const existing = localStore().list<WeaknessDoc>("weakness-center", userId).find(w => w.id === questionId);
  const now = new Date().toISOString();
  const doc: WeaknessDoc = {
    id: questionId,
    userId,
    classification,
    notes,
    reviewStatus: classification ? "reviewed" : "unreviewed",
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
  localStore().put("weakness-center", userId, questionId, doc);
  return doc;
}

export async function updateWeaknessReviewStatus(userId: number, questionId: string, status: WeaknessDoc["reviewStatus"]) {
  if (!localStorageEnabled()) return null;
  const existing = localStore().list<WeaknessDoc>("weakness-center", userId).find(w => w.id === questionId);
  if (!existing) return null;
  if (status === "mastery") {
    // Guard: a single correct answer is not sufficient evidence of mastery.
    const data = await getWeaknessCenterData(userId);
    const row = data.find(item => item.id === questionId);
    if (!row || !row.masteryEligible) {
      throw new Error("Mastery requires at least two consecutive correct answers.");
    }
  }
  existing.reviewStatus = status;
  existing.updatedAt = new Date().toISOString();
  localStore().put("weakness-center", userId, questionId, existing);
  return existing;
}

export async function getWeaknessSummary(userId: number) {
  const data = await getWeaknessCenterData(userId);
  const byFamily = new Map<string, { count: number; wrongCount: number; classifications: string[] }>();
  const byChapter = new Map<string, { count: number; wrongCount: number; classifications: string[] }>();
  for (const row of data) {
    const family = row.family || "IMPORTED";
    const chKey = `${family}:${row.chapterNumber}`;
    const f = byFamily.get(family) ?? { count: 0, wrongCount: 0, classifications: [] };
    f.count++;
    if (row.correct === 0) f.wrongCount++;
    if (row.classification && !f.classifications.includes(row.classification)) f.classifications.push(row.classification);
    byFamily.set(family, f);
    const c = byChapter.get(chKey) ?? { count: 0, wrongCount: 0, classifications: [] };
    c.count++;
    if (row.correct === 0) c.wrongCount++;
    if (row.classification && !c.classifications.includes(row.classification)) c.classifications.push(row.classification);
    byChapter.set(chKey, c);
  }
  return {
    total: data.length,
    wrongOnly: data.filter(d => d.correct === 0 && d.isRepeated).length,
    byFamily: Array.from(byFamily.entries()).map(([family, stats]) => ({ family, ...stats })),
    byChapter: Array.from(byChapter.entries()).map(([key, stats]) => ({ key, ...stats })),
  };
}
