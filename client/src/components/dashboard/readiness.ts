import type {
  DashboardNote,
  DashboardPracticeSummary,
  MasterySummary,
} from "./types";

/**
 * Derives readiness breakdown inputs from real dashboard payloads.
 * Data mapping only — scoring lives in `@shared/study-plan-intelligence`.
 *
 * Proxies (documented approximations until per-topic board weights exist):
 * - coverage: completed FRCEM/HIPPO chapters over mapped chapters.
 * - qbankPerformance: overall Qbank accuracy.
 * - priorityCompletion: attempted sections meeting the mastery bar
 *   (≥85% on ≥20 attempts) — strong-area completion as the measurable
 *   stand-in for high-priority completion.
 * - revisionCompliance: notes needing review that were reviewed in 14 days
 *   (100 when nothing is due).
 * - recentTrend: newer-half vs older-half accuracy from recent attempts
 *   (50 neutral when fewer than 4 attempts).
 */

export interface ReadinessBreakdown {
  coverage: number;
  qbankPerformance: number;
  priorityCompletion: number;
  revisionCompliance: number;
  recentTrend: number;
}

export interface ReadinessSourceData {
  mastery?: MasterySummary;
  practice?: DashboardPracticeSummary;
  chapters: Array<{ family: string; chapterNumber: number }>;
  progressRows: Array<{
    family: string;
    chapterNumber: number;
    completed: boolean | number;
  }>;
  notes: DashboardNote[];
}

const DAY_MS = 86400000;

export function selectReadinessBreakdown(
  data: ReadinessSourceData,
  now: number = Date.now()
): ReadinessBreakdown {
  const completed = new Set(
    data.progressRows
      .filter(row => row.completed)
      .map(row => `${row.family}:${row.chapterNumber}`)
  );
  const doneChapters = data.chapters.filter(chapter =>
    completed.has(`${chapter.family}:${chapter.chapterNumber}`)
  ).length;
  const coverage = data.chapters.length
    ? Math.round((doneChapters / data.chapters.length) * 100)
    : 0;

  const attempted = data.practice?.attempted ?? 0;
  const qbankPerformance = attempted
    ? Math.round(((data.practice?.correct ?? 0) / attempted) * 100)
    : 0;

  const sections = data.mastery?.sections ?? [];
  const attemptedSections = sections.filter(
    section => section.attempted > 0
  );
  const masteredSections = attemptedSections.filter(
    section => section.accuracy >= 85 && section.attempted >= 20
  );
  const priorityCompletion = attemptedSections.length
    ? Math.round((masteredSections.length / attemptedSections.length) * 100)
    : 0;

  const needing = data.notes.filter(
    note => !note.lastReviewedAt || note.bookmarked
  );
  const reviewed = needing.filter(note => {
    if (!note.lastReviewedAt) return false;
    const time = new Date(note.lastReviewedAt).getTime();
    return Number.isFinite(time) && now - time <= 14 * DAY_MS;
  });
  const revisionCompliance = needing.length
    ? Math.round((reviewed.length / needing.length) * 100)
    : 100;

  const recent = (data.practice?.recent ?? [])
    .map(attempt => ({
      correct: Number(attempt.correct ? 1 : 0),
      at: new Date(attempt.attemptedAt).getTime(),
    }))
    .filter(item => Number.isFinite(item.at));
  let recentTrend = 50;
  if (recent.length >= 4) {
    const ordered = [...recent].sort((a, b) => b.at - a.at);
    const half = Math.floor(ordered.length / 2);
    const newer = ordered.slice(0, half);
    const older = ordered.slice(half);
    const accuracyOf = (items: typeof ordered) =>
      items.length
        ? (items.reduce((sum, item) => sum + item.correct, 0) / items.length) *
          100
        : 50;
    const diff = accuracyOf(newer) - accuracyOf(older);
    recentTrend = Math.min(100, Math.max(0, Math.round(50 + diff)));
  }

  return {
    coverage,
    qbankPerformance,
    priorityCompletion,
    revisionCompliance,
    recentTrend,
  };
}
