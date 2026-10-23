import { describe, expect, it } from "vitest";
import { computeMastery } from "./mastery-engine";

describe("mastery engine (Phase 4-F.2)", () => {
  const baseInput = {
    qbankAttempts: { total: 50, correct: 40 },
    reviewHistory: [
      { lastReviewedAt: Date.now() - 2 * 24 * 60 * 60 * 1000, bookmarked: true },
      { lastReviewedAt: Date.now() - 5 * 24 * 60 * 60 * 1000, bookmarked: true },
      { lastReviewedAt: Date.now() - 20 * 24 * 60 * 60 * 1000, bookmarked: true },
    ],
    studyProgress: { chaptersCompleted: 8, totalChapters: 10 },
  };

  it("computes mastery with all components", () => {
    const result = computeMastery({
      topicId: "EM_CARDIO_ACS",
      ...baseInput,
    });
    expect(result.topicId).toBe("EM_CARDIO_ACS");
    expect(result.masteryScore).toBeGreaterThanOrEqual(0);
    expect(result.masteryScore).toBeLessThanOrEqual(100);
    expect(result.confidence).toBeGreaterThanOrEqual(0);
    expect(result.confidence).toBeLessThanOrEqual(100);
    expect(['Green', 'Yellow', 'Red']).toContain(result.weaknessLevel);
    expect(result.components).toEqual({
      qbankAccuracy: 80,
      qbankVolume: expect.any(Number),
      reviewCompliance: expect.any(Number),
      studyProgress: 80,
    });
    expect(result.calibratedAt).toBeTruthy();
  });

  it("handles zero attempts gracefully", () => {
    const result = computeMastery({
      topicId: "EM_CRIT_SHOCK",
      qbankAttempts: { total: 0, correct: 0 },
      reviewHistory: [],
      studyProgress: { chaptersCompleted: 0, totalChapters: 10 },
    });
    expect(result.masteryScore).toBeLessThan(50); // no data -> low mastery
    expect(result.weaknessLevel).toBe('Red');
  });

  it("confidence increases with data points", () => {
    const lowData = computeMastery({
      topicId: "EM_CRIT_SHOCK",
      qbankAttempts: { total: 5, correct: 4 },
      reviewHistory: [],
      studyProgress: { chaptersCompleted: 0, totalChapters: 10 },
    });
    const highData = computeMastery({
      topicId: "EM_CRIT_SHOCK",
      qbankAttempts: { total: 50, correct: 40 },
      reviewHistory: [
        { lastReviewedAt: Date.now() - 100000, bookmarked: true },
        { lastReviewedAt: Date.now() - 200000, bookmarked: true },
      ],
      studyProgress: { chaptersCompleted: 8, totalChapters: 10 },
    });
    expect(highData.confidence).toBeGreaterThan(lowData.confidence);
  });

  it("weakness levels at correct thresholds", () => {
    const green = computeMastery({
      topicId: "EM_CARDIO_ACS",
      qbankAttempts: { total: 50, correct: 45 },
      reviewHistory: Array(10).fill({ lastReviewedAt: Date.now() - 100000, bookmarked: true }),
      studyProgress: { chaptersCompleted: 10, totalChapters: 10 },
    });
    expect(green.weaknessLevel).toBe('Green');

    const red = computeMastery({
      topicId: "EM_CRIT_SHOCK",
      qbankAttempts: { total: 20, correct: 10 },
      reviewHistory: [],
      studyProgress: { chaptersCompleted: 0, totalChapters: 10 },
    });
    expect(red.weaknessLevel).toBe('Red');

    const yellow = computeMastery({
      topicId: "EM_NEURO_STROKE",
      qbankAttempts: { total: 20, correct: 12 },
      reviewHistory: [{ lastReviewedAt: Date.now() - 100000, bookmarked: true }],
      studyProgress: { chaptersCompleted: 5, totalChapters: 10 },
    });
    expect(yellow.weaknessLevel).toBe('Yellow');
  });
});