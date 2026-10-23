import { describe, expect, it } from "vitest";
import {
  baseAllocationForPlanId,
  buildTopicEvidence,
  calculateAdaptivePriority,
  calculateDailyAllocation,
  calculateReadinessScore,
  calculateTopicPriority,
  calculateTopicProgress,
  calculateUrgency,
  classifyTopicError,
  generateAdaptiveTasks,
  generateRecoveryActions,
  readinessBand,
  selectPriorityEvidence,
  taskReasonFor,
} from "./study-plan-intelligence";

describe("study plan intelligence", () => {
  it("scores topic progress 40/30/30 with clamping", () => {
    expect(
      calculateTopicProgress({ completed: false, coverage: 0, accuracy: 0 })
    ).toBe(0);
    expect(
      calculateTopicProgress({ completed: true, coverage: 0, accuracy: 0 })
    ).toBe(40);
    expect(
      calculateTopicProgress({ completed: true, coverage: 1, accuracy: 1 })
    ).toBe(100);
    expect(
      calculateTopicProgress({ completed: false, coverage: 0.5, accuracy: 0.5 })
    ).toBe(30);
    expect(
      calculateTopicProgress({ completed: true, coverage: 2, accuracy: -1 })
    ).toBe(70);
    expect(
      calculateTopicProgress({
        completed: false,
        coverage: Number.NaN,
        accuracy: Number.NaN,
      })
    ).toBe(0);
  });

  it("scores exam urgency on fixed boundaries", () => {
    expect(calculateUrgency(undefined)).toBe(1);
    expect(calculateUrgency(10)).toBe(5);
    expect(calculateUrgency(20)).toBe(4);
    expect(calculateUrgency(45)).toBe(3);
    expect(calculateUrgency(80)).toBe(2);
    expect(calculateUrgency(120)).toBe(1);
  });

  it("computes the documented priority example and edge rules", () => {
    const shock = calculateTopicPriority({
      boardWeight: 5,
      clinicalWeight: 5,
      examFrequency: 4,
      topicAccuracy: 40,
      topicAttempts: 12,
      daysToExam: 45,
    });
    expect(shock).toBe(64);
    const unseen = calculateTopicPriority({
      boardWeight: 5,
      clinicalWeight: 5,
      examFrequency: 5,
      topicAccuracy: 0,
      topicAttempts: 0,
      daysToExam: 45,
    });
    const seenFailing = calculateTopicPriority({
      boardWeight: 5,
      clinicalWeight: 5,
      examFrequency: 5,
      topicAccuracy: 0,
      topicAttempts: 20,
      daysToExam: 45,
    });
    expect(unseen).toBeLessThan(seenFailing);
    const mastered = calculateTopicPriority({
      boardWeight: 5,
      clinicalWeight: 5,
      examFrequency: 5,
      topicAccuracy: 95,
      topicAttempts: 30,
      daysToExam: 45,
      mastered: true,
    });
    const unmastered = calculateTopicPriority({
      boardWeight: 5,
      clinicalWeight: 5,
      examFrequency: 5,
      topicAccuracy: 95,
      topicAttempts: 30,
      daysToExam: 45,
    });
    expect(mastered).toBe(unmastered - 15);
    expect(
      calculateTopicPriority({
        boardWeight: 99,
        clinicalWeight: -4,
        examFrequency: 5,
        topicAccuracy: 50,
        topicAttempts: 10,
        daysToExam: 45,
      })
    ).toBeLessThanOrEqual(100);
  });

  it("scores readiness with documented weights and bands", () => {
    expect(
      calculateReadinessScore({
        coverage: 80,
        qbankPerformance: 80,
        priorityCompletion: 80,
        revisionCompliance: 80,
        recentTrend: 80,
      })
    ).toBe(80);
    expect(readinessBand(80)).toBe("green");
    expect(readinessBand(79)).toBe("yellow");
    expect(readinessBand(60)).toBe("yellow");
    expect(readinessBand(59)).toBe("red");
  });

  it("generates recovery actions from repeated errors and weak areas", () => {
    const actions = generateRecoveryActions({
      weakSections: [
        { sectionId: 6, sectionTitle: "Stroke", accuracy: 50, attempted: 10 },
      ],
      recentAttempts: [
        { questionId: "q1", correct: 0 },
        { questionId: "q1", correct: false },
        { questionId: "q1", correct: 0 },
        { questionId: "q2", correct: 0 },
      ],
      budgetMinutes: 30,
      maxActions: 2,
    });
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe("RECOVERY");
    expect(actions[0].priority).toBe(92);
    expect(actions[0].href).toBe("/practice/performance");
    expect(actions[1].type).toBe("REVIEW");
    expect(actions[1].href).toBe("/practice/create?section=6");
    expect(actions[0].minutes + actions[1].minutes).toBe(30);
  });

  it("ignores thin signals and caps actions deterministically", () => {
    expect(
      generateRecoveryActions({ weakSections: [], recentAttempts: [] })
    ).toEqual([]);
    const thin = generateRecoveryActions({
      weakSections: [
        { sectionId: 1, sectionTitle: "Thin", accuracy: 10, attempted: 2 },
      ],
      recentAttempts: [{ questionId: "q1", correct: 0 }],
    });
    expect(thin).toEqual([]);
  });

  it("allocates daily minutes with band, proximity, and weakness rules", () => {
    const plan = calculateDailyAllocation({
      base: { learn: 45, practice: 35, revision: 20 },
      band: "yellow",
      daysToExam: 45,
      hasWeakArea: true,
      totalMinutes: 120,
    });
    expect(plan.learn + plan.practice + plan.recovery + plan.revision).toBe(
      120
    );
    expect(plan.recovery).toBe(18);
    expect(plan.learn).toBe(48);
    expect(plan.practice).toBe(30);
    expect(plan.revision).toBe(24);
    const calm = calculateDailyAllocation({
      base: { learn: 45, practice: 35, revision: 20 },
      band: "green",
      daysToExam: 200,
      hasWeakArea: false,
      totalMinutes: 120,
    });
    expect(calm).toEqual({ learn: 54, practice: 42, recovery: 0, revision: 24 });
    expect(
      calculateDailyAllocation({
        base: { learn: 45, practice: 35, revision: 20 },
        band: "green",
        hasWeakArea: false,
        totalMinutes: 0,
      })
    ).toEqual({ learn: 0, practice: 0, recovery: 0, revision: 0 });
  });

  it("maps plan ids to documented level bases", () => {
    expect(baseAllocationForPlanId("residency-year-1")).toEqual({
      learn: 55,
      practice: 30,
      revision: 15,
    });
    expect(baseAllocationForPlanId("jordan-board-part-2")).toEqual({
      learn: 35,
      practice: 45,
      revision: 20,
    });
  });

  it("classifies errors with transparent system-aware rules", () => {
    const shock = classifyTopicError({
      topic: "Shock",
      system: "critical-care",
      accuracy: 35,
      attempts: 12,
      repeatedErrors: 0,
    });
    expect(shock.errorType).toBe("Management Decision Error");
    expect(shock.severity).toBe("High");
    expect(shock.action).toBe("Review Shock algorithm + targeted MCQs");
    expect(shock.reasons.length).toBeGreaterThan(0);

    const stroke = classifyTopicError({
      topic: "Stroke",
      system: "neurology",
      accuracy: 45,
      attempts: 10,
      repeatedErrors: 0,
    });
    expect(stroke.errorType).toBe("Diagnostic Reasoning Error");

    const gap = classifyTopicError({
      topic: "Rash",
      system: null,
      accuracy: 30,
      attempts: 8,
      repeatedErrors: 0,
    });
    expect(gap.errorType).toBe("Knowledge Gap");
    expect(gap.severity).toBe("High");

    const concept = classifyTopicError({
      topic: "Fever",
      system: null,
      accuracy: 65,
      attempts: 10,
      repeatedErrors: 0,
    });
    expect(concept.errorType).toBe("Concept Error");

    const clean = classifyTopicError({
      topic: "Asthma",
      system: "respiratory",
      accuracy: 92,
      attempts: 25,
      repeatedErrors: 0,
    });
    expect(clean.errorType).toBe("Question Interpretation Error");
    expect(clean.severity).toBe("Low");
  });

  it("builds evidence bundles and ranks them by priority", () => {
    const fresh = buildTopicEvidence({
      topic: "Sepsis",
      system: "infectious-disease",
      accuracy: 0,
      attempts: 0,
      repeatedErrors: 0,
    });
    expect(fresh.learning).toBe("Not Started");
    expect(fresh.accuracy).toBeNull();
    expect(fresh.review).toBe("—");
    expect(fresh.reasons).toEqual(["No Qbank attempts recorded yet"]);

    const ranked = selectPriorityEvidence({
      topics: [
        {
          topic: "Strong",
          system: null,
          accuracy: 90,
          attempts: 30,
          repeatedErrors: 0,
        },
        {
          topic: "Sepsis",
          system: "infectious-disease",
          accuracy: 45,
          attempts: 12,
          repeatedErrors: 3,
        },
      ],
      maxTopics: 2,
    });
    expect(ranked.map(item => item.topic)).toEqual(["Sepsis", "Strong"]);
    expect(ranked[0].review).toBe("Due");
  });

  it("provides TodayPlan reasons and categories from the layer", () => {
    expect(taskReasonFor({ kind: "learn" }).category).toBe("LEARN");
    expect(taskReasonFor({ kind: "practice", paused: true }).reason).toBe(
      "Resume the paused exam where you left off"
    );
    expect(taskReasonFor({ kind: "review", hasWeakArea: true }).reason).toBe(
      "Weak-area review from your saved attempts"
    );
  });

  it("calculates adaptive priority with mastery and weak-area boosts", () => {
    const red = calculateAdaptivePriority({
      topicId: "EM_CARDIO_ACS",
      topicName: "ACS",
      basePriority: 70,
      masteryScore: 45,
      weaknessLevel: "Red",
      errorCount: 3,
      hasWeakArea: true,
    });
    const green = calculateAdaptivePriority({
      topicId: "EM_CARDIO_ACS",
      topicName: "ACS",
      basePriority: 70,
      masteryScore: 85,
      weaknessLevel: "Green",
      errorCount: 0,
      hasWeakArea: false,
    });
    expect(red).toBeGreaterThan(green);
    expect(red).toBeLessThanOrEqual(100);
    expect(green).toBe(70);
  });

  it("generates adaptive TodayPlan tasks across four categories", () => {
    const tasks = generateAdaptiveTasks({
      topics: [
        {
          topicId: "EM_CARDIO_ACS",
          topicName: "Acute Coronary Syndrome",
          basePriority: 85,
          masteryScore: 45,
          weaknessLevel: "Red",
          errorCount: 4,
          hasWeakArea: true,
        },
        {
          topicId: "EM_NEURO_STROKE",
          topicName: "Acute Stroke",
          basePriority: 60,
          masteryScore: 90,
          weaknessLevel: "Green",
          errorCount: 0,
          hasWeakArea: false,
        },
      ],
      maxTasksPerCategory: 1,
    });
    expect(tasks.some(t => t.type === "PRACTICE")).toBe(true);
    expect(tasks.some(t => t.type === "RECOVERY")).toBe(true);
    expect(tasks.some(t => t.adaptivePriority > 0)).toBe(true);
    expect(tasks.every(t => ["PRACTICE", "REVIEW", "RECOVERY"].includes(t.type))).toBe(true);
  });
});
