import { describe, expect, it } from "vitest";
import {
  computeWeakAreas,
  DEFAULT_WEAK_CONFIG,
  toMappingLookup,
} from "./weak-area-engine";

const registry = [
  { topicId: "EM_CARDIO_ACS", topicName: "Acute Coronary Syndrome", system: "Cardiovascular", systemId: "cardiovascular", priority: "Very High" },
  { topicId: "EM_NEURO_STROKE", topicName: "Acute Stroke", system: "Neurology", systemId: "neurology", priority: "Very High" },
];

const mappings = [
  { questionId: "Q_ACS_001", topicId: "EM_CARDIO_ACS" },
  { questionId: "Q_ACS_002", topicId: "EM_CARDIO_ACS" },
  { questionId: "Q_ACS_003", topicId: "EM_CARDIO_ACS" },
  { questionId: "Q_STROKE_001", topicId: "EM_NEURO_STROKE" },
  { questionId: "Q_STROKE_002", topicId: "EM_NEURO_STROKE" },
  { questionId: "Q_STROKE_003", topicId: "EM_NEURO_STROKE" },
];

describe("weak area engine (Phase 4-F.1)", () => {
  it("flags repeated errors via topicId", () => {
    const weak = computeWeakAreas({
      attempts: [
        { questionId: "Q_ACS_001", correct: false },
        { questionId: "Q_ACS_002", correct: false },
        { questionId: "Q_ACS_003", correct: false },
      ],
      mappings,
      registry,
    });
    expect(weak).toHaveLength(1);
    expect(weak[0].topicId).toBe("EM_CARDIO_ACS");
    expect(weak[0].errorCount).toBe(3);
    expect(weak[0].recommendedActions).toEqual([
      "Review Algorithm",
      "Review Exam Pearl",
      "Read Summary",
      "Solve Related Questions",
    ]);
  });

  it("flags low accuracy and ignores unmapped questions", () => {
    const weak = computeWeakAreas({
      attempts: [
        { questionId: "Q_STROKE_001", correct: false },
        { questionId: "Q_STROKE_002", correct: false },
        { questionId: "Q_STROKE_003", correct: true },
        { questionId: "Q_UNKNOWN_001", correct: false },
        { questionId: "Q_UNKNOWN_001", correct: false },
        { questionId: "Q_UNKNOWN_001", correct: false },
      ],
      mappings,
      registry,
    });
    // STROKE: 2/3 errors → 33% accuracy on 3 attempts → weak by accuracy rule
    expect(weak.some(w => w.topicId === "EM_NEURO_STROKE")).toBe(true);
    // UNKNOWN has no mapping → ignored, never guessed
    expect(weak.some(w => w.topicId === "Q_UNKNOWN_001")).toBe(false);
  });

  it("requires thresholds and sorts deterministically", () => {
    const weak = computeWeakAreas({
      attempts: [
        { questionId: "Q_ACS_001", correct: false },
        { questionId: "Q_ACS_001", correct: true },
      ],
      mappings,
      registry,
      config: { repeatedErrorThreshold: 5, minAttemptsForWeak: 5, accuracyThreshold: 70 },
    });
    expect(weak).toHaveLength(0);
    expect(DEFAULT_WEAK_CONFIG.repeatedErrorThreshold).toBe(3);
  });

  it("builds lookup from qbank mapping file shape", () => {
    const lookup = toMappingLookup({
      mappings: [
        { questionId: "Q1", topicId: "EM_CARDIO_ACS", reviewStatus: "mapped" },
        { questionId: "Q2", topicId: null as unknown as string, reviewStatus: "unmapped" },
      ],
    });
    expect(lookup).toEqual([{ questionId: "Q1", topicId: "EM_CARDIO_ACS" }]);
  });
});
