/**
 * Phase 4-F.2: Mastery Calculation Layer.
 *
 * Computes topic-level mastery from question performance and review history.
 * Output is a calibrated mastery score (0-100) with confidence and weakness level.
 *
 * Inputs (read-only):
 * - qbank-topic-mapping.json (questionId -> topicId)
 * - qbank topic performance (attempts with correctness)
 * - Journal notes / review history (contentId -> { lastReviewedAt, bookmarked })
 * - Study progress (chapter completion, reading progress)
 *
 * Outputs:
 * - topicId -> { masteryScore, confidence, weaknessLevel }
 *
 * No Dashboard mutation. Consumed by adaptive plan and dashboard phases.
 */

export interface MasteryInput {
  topicId: string;
  qbankAttempts: { total: number; correct: number };
  reviewHistory: { lastReviewedAt?: number; bookmarked?: boolean }[];
  studyProgress?: { chaptersCompleted: number; totalChapters: number };
}

export interface MasteryOutput {
  topicId: string;
  masteryScore: number;        // 0-100
  confidence: number;          // 0-100 (data sufficiency)
  weaknessLevel: 'Green' | 'Yellow' | 'Red';
  components: {
    qbankAccuracy: number;      // 0-100
    qbankVolume: number;        // 0-100 (log scale)
    reviewCompliance: number;   // 0-100
    studyProgress: number;      // 0-100
  };
  calibratedAt: string;
}

export function computeMastery(input: MasteryInput): MasteryOutput {
  // Qbank accuracy component (0-100)
  const qbankAccuracy = input.qbankAttempts.total > 0
    ? Math.round((input.qbankAttempts.correct / input.qbankAttempts.total) * 100)
    : 0;

  // Qbank volume component (log scale, caps at 100 attempts = 100)
  const qbankVolume = Math.min(100, Math.round(Math.log10(input.qbankAttempts.total + 1) * 50));

  // Review compliance: % of bookmarked items reviewed in last 14 days
  const WINDOW_MS = 14 * 24 * 60 * 60 * 1000;
  const bookmarked = input.reviewHistory.filter(r => r.bookmarked);
  const reviewedInWindow = bookmarked.filter(
    r => r.lastReviewedAt && Date.now() - r.lastReviewedAt <= WINDOW_MS
  );
  const reviewCompliance = bookmarked.length > 0
    ? Math.round((reviewedInWindow.length / bookmarked.length) * 100)
    : 100; // no bookmarks = neutral

  // Study progress component
  const studyProgressScore = (input.studyProgress?.totalChapters ?? 0) > 0
    ? Math.round((input.studyProgress!.chaptersCompleted / input.studyProgress!.totalChapters) * 100)
    : 0;

  // Weighted mastery score
  const masteryScore = Math.round(
    qbankAccuracy * 0.35 +
    qbankVolume * 0.15 +
    reviewCompliance * 0.25 +
    studyProgressScore * 0.25
  );

  // Confidence based on data sufficiency
  const dataPoints = [
    input.qbankAttempts.total > 20,
    input.reviewHistory.length > 0,
    (input.studyProgress?.totalChapters ?? 0) > 0
  ].filter(Boolean).length;
  const confidence = Math.min(100, Math.round(30 + dataPoints * 23.3));

  // Weakness levels
  let weaknessLevel: 'Green' | 'Yellow' | 'Red';
  if (masteryScore >= 80) weaknessLevel = 'Green';
  else if (masteryScore >= 60) weaknessLevel = 'Yellow';
  else weaknessLevel = 'Red';

  return {
    topicId: input.topicId,
    masteryScore,
    confidence,
    weaknessLevel,
    components: {
      qbankAccuracy,
      qbankVolume,
      reviewCompliance,
      studyProgress: studyProgressScore
    },
    calibratedAt: new Date().toISOString()
  };
}