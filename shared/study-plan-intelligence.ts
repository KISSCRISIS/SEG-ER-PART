import type { StudyPlanId } from "./study-plan-engine";

/**
 * Phase 4-B: adaptive study-plan intelligence as an extension layer.
 *
 * Pure, deterministic helpers implementing
 * `docs/architecture/STUDY_PLAN_INTELLIGENCE.md`. `buildStudyPlan` is
 * untouched; these functions consume the same real data shapes (mastery
 * sections, Qbank attempts) and produce priority/readiness/allocation
 * outputs plus recovery actions. No I/O, no invented content.
 */

export type ReadinessBand = "green" | "yellow" | "red";

export type IntelligenceTaskType = "LEARN" | "PRACTICE" | "REVIEW" | "RECOVERY";

export interface IntelligenceTask {
  type: IntelligenceTaskType;
  topic: string;
  reason: string;
  priority: number;
  href: string;
  minutes: number;
}

export interface TopicPriorityInput {
  boardWeight: number;
  clinicalWeight: number;
  examFrequency: number;
  topicAccuracy: number;
  topicAttempts: number;
  daysToExam?: number;
  mastered?: boolean;
}

export interface ReadinessInput {
  coverage: number;
  qbankPerformance: number;
  priorityCompletion: number;
  revisionCompliance: number;
  recentTrend: number;
}

export interface WeakSectionInput {
  sectionId: number;
  sectionTitle: string;
  accuracy: number;
  attempted: number;
}

export interface AttemptInput {
  questionId: string;
  correct: boolean | number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const clampWeight = (value: number) =>
  Number.isFinite(value) ? clamp(value, 0, 5) : 0;

/**
 * Exam urgency on a 0–5 scale. No date means no urgency pressure (1).
 */
export function calculateUrgency(daysToExam?: number): number {
  if (!Number.isFinite(daysToExam)) return 1;
  const days = daysToExam as number;
  if (days <= 14) return 5;
  if (days <= 30) return 4;
  if (days <= 60) return 3;
  if (days <= 90) return 2;
  return 1;
}

/**
 * Topic Priority Score (0–100) per the Phase 4-A formula:
 * 100·(0.55·base/5 + 0.25·weakness/5 + 0.20·urgency/5), minus 15 when
 * mastered. Topics with fewer than 5 attempts stay neutral (weakness 2).
 */
export function calculateTopicPriority(input: TopicPriorityInput): number {
  const base =
    0.3 * clampWeight(input.boardWeight) +
    0.25 * clampWeight(input.clinicalWeight) +
    0.15 * clampWeight(input.examFrequency);
  const attempts = Number.isFinite(input.topicAttempts)
    ? input.topicAttempts
    : 0;
  const accuracy = clamp(
    Number.isFinite(input.topicAccuracy) ? input.topicAccuracy : 0,
    0,
    100
  );
  const weakness = attempts < 5 ? 2 : clamp(5 * (1 - accuracy / 100), 0, 5);
  const urgency = calculateUrgency(input.daysToExam);
  const score =
    100 * ((0.55 * base) / 5 + (0.25 * weakness) / 5 + (0.2 * urgency) / 5);
  return Math.round(clamp(score - (input.mastered ? 15 : 0), 0, 100));
}

/**
 * Readiness Score (0–100): 30% coverage, 25% Qbank, 20% priority
 * completion, 15% revision compliance, 10% recent trend.
 */
export function calculateReadinessScore(input: ReadinessInput): number {
  const pick = (value: number) =>
    clamp(Number.isFinite(value) ? value : 0, 0, 100);
  return Math.round(
    clamp(
      0.3 * pick(input.coverage) +
        0.25 * pick(input.qbankPerformance) +
        0.2 * pick(input.priorityCompletion) +
        0.15 * pick(input.revisionCompliance) +
        0.1 * pick(input.recentTrend),
      0,
      100
    )
  );
}

export function readinessBand(score: number): ReadinessBand {
  if (score >= 80) return "green";
  if (score >= 60) return "yellow";
  return "red";
}

export interface TopicProgressInput {
  /** Chapter confirmed-completed via study progress. Worth 40 points. */
  completed: boolean;
  /** Unique attempted questions / chapter total, 0–1. Worth 30 points. */
  coverage: number;
  /** Correct / attempted within the topic, 0–1 (0 when unattempted). Worth 30 points. */
  accuracy: number;
}

/**
 * Topic Progress (0–100): 40% study completion, 30% question coverage,
 * 30% accuracy. Pure function over already-aggregated topic signals.
 */
export function calculateTopicProgress(input: TopicProgressInput): number {
  const pick = (value: number) =>
    Number.isFinite(value) ? clamp(value, 0, 1) : 0;
  return Math.round(
    40 * (input.completed ? 1 : 0) +
      30 * pick(input.coverage) +
      30 * pick(input.accuracy)
  );
}

const REPEATED_ERROR_THRESHOLD = 3;
const WEAK_SECTION_MIN_ATTEMPTS = 3;
const REPEATED_ERROR_PRIORITY = 92;

/**
 * Recovery actions from real signals only:
 * - ≥3 incorrect attempts on one question → RECOVERY (priority 92).
 * - weak sections (≥3 attempts) → REVIEW weighted by accuracy gap.
 * Sorted by priority, capped, budget split evenly (remainder first).
 */
export function generateRecoveryActions(input: {
  weakSections: WeakSectionInput[];
  recentAttempts: AttemptInput[];
  budgetMinutes?: number;
  maxActions?: number;
}): IntelligenceTask[] {
  const budget =
    Number.isFinite(input.budgetMinutes) && (input.budgetMinutes as number) > 0
      ? Math.floor(input.budgetMinutes as number)
      : 0;
  const maxActions =
    Number.isFinite(input.maxActions) && (input.maxActions as number) > 0
      ? Math.floor(input.maxActions as number)
      : 2;

  const errorCounts = new Map<string, number>();
  for (const attempt of input.recentAttempts) {
    if (!attempt.correct) {
      errorCounts.set(
        attempt.questionId,
        (errorCounts.get(attempt.questionId) ?? 0) + 1
      );
    }
  }
  const candidates: IntelligenceTask[] = [];
  errorCounts.forEach((count, questionId) => {
    if (count >= REPEATED_ERROR_THRESHOLD) {
      candidates.push({
        type: "RECOVERY",
        topic: questionId,
        reason: `${count} repeated errors in recent attempts`,
        priority: REPEATED_ERROR_PRIORITY,
        href: "/practice/performance",
        minutes: 0,
      });
    }
  });
  for (const section of input.weakSections) {
    if (!Number.isFinite(section.attempted) || section.attempted < WEAK_SECTION_MIN_ATTEMPTS) {
      continue;
    }
    const accuracy = clamp(
      Number.isFinite(section.accuracy) ? section.accuracy : 0,
      0,
      100
    );
    candidates.push({
      type: "REVIEW",
      topic: section.sectionTitle,
      reason: `Weak area · ${accuracy}% accuracy`,
      priority: Math.round(Math.min(95, 60 + (100 - accuracy) * 0.35)),
      href: `/practice/create?section=${section.sectionId}`,
      minutes: 0,
    });
  }
  const chosen = candidates
    .sort((a, b) => b.priority - a.priority)
    .slice(0, maxActions);
  if (!chosen.length || budget <= 0) {
    return chosen.map(task => ({ ...task, minutes: 0 }));
  }
  const base = Math.floor(budget / chosen.length);
  let remainder = budget - base * chosen.length;
  return chosen.map(task => {
    const extra = remainder > 0 ? 1 : 0;
    remainder -= extra;
    return { ...task, minutes: Math.max(1, base + extra) };
  });
}

export interface AllocationBase {
  learn: number;
  practice: number;
  revision: number;
}

export const ALLOCATION_BASES: Record<string, AllocationBase> = {
  foundations: { learn: 55, practice: 30, revision: 15 },
  core: { learn: 45, practice: 35, revision: 20 },
  advanced: { learn: 35, practice: 45, revision: 20 },
};

export function baseAllocationForPlanId(planId: StudyPlanId): AllocationBase {
  switch (planId) {
    case "residency-year-1":
      return ALLOCATION_BASES.foundations;
    case "residency-year-2":
    case "residency-year-3":
    case "jordan-board-part-1":
      return ALLOCATION_BASES.core;
    default:
      return ALLOCATION_BASES.advanced;
  }
}

export interface DailyAllocation {
  learn: number;
  practice: number;
  recovery: number;
  revision: number;
}

/**
 * Daily minute allocation. Applies band/proximity/weakness modifiers to the
 * level base, carves 15% recovery out of practice when weak areas exist,
 * and guarantees the parts sum exactly to totalMinutes.
 */
export function calculateDailyAllocation(input: {
  base: AllocationBase;
  band: ReadinessBand;
  daysToExam?: number;
  hasWeakArea: boolean;
  totalMinutes: number;
}): DailyAllocation {
  const total =
    Number.isFinite(input.totalMinutes) && (input.totalMinutes as number) > 0
      ? Math.floor(input.totalMinutes as number)
      : 0;
  if (total <= 0) return { learn: 0, practice: 0, recovery: 0, revision: 0 };

  let learn = input.base.learn;
  let practice = input.base.practice;
  const revision = input.base.revision;
  const shift = (points: number) => {
    const moved = Math.min(points, learn);
    learn -= moved;
    practice += moved;
  };
  if (input.band === "red") shift(10);
  else if (input.band === "yellow") shift(5);
  if (
    Number.isFinite(input.daysToExam) &&
    (input.daysToExam as number) <= 30
  ) {
    shift(10);
  }
  const recoveryShare = input.hasWeakArea ? 15 : 0;
  const recovery = (total * recoveryShare) / 100;
  const practiceShare = (total * practice) / 100;
  const learnShare = (total * learn) / 100;
  const revisionShare = (total * revision) / 100;

  const parts = [
    { key: "practice", share: practiceShare - recovery },
    { key: "learn", share: learnShare },
    { key: "revision", share: revisionShare },
    { key: "recovery", share: recovery },
  ] as const;
  const floored = parts.map(part => ({
    key: part.key,
    minutes: Math.max(0, Math.floor(part.share)),
  }));
  let remainder =
    total - floored.reduce((sum, part) => sum + part.minutes, 0);
  // Deterministic largest-remainder in fixed priority order.
  const order = ["practice", "learn", "revision", "recovery"] as const;
  const result: DailyAllocation = { learn: 0, practice: 0, recovery: 0, revision: 0 };
  for (const part of floored) {
    result[part.key] = part.minutes;
  }
  for (const key of order) {
    if (remainder <= 0) break;
    result[key] += 1;
    remainder -= 1;
  }
  return result;
}

// ---------------------------------------------------------------------------
// Phase 4-C: evidence-calibrated UI layer (still pure, still no predictions).
// Everything below derives displayable evidence, classifications, and
// recommendation reasons from real inputs. Thresholds and the system→error
// heuristic are documented proxies awaiting calibration data (see
// docs/architecture/CALIBRATION_LAYER.md).
// ---------------------------------------------------------------------------

export type ErrorType =
  | "Knowledge Gap"
  | "Concept Error"
  | "Management Decision Error"
  | "Diagnostic Reasoning Error"
  | "Question Interpretation Error";

export type ErrorSeverity = "High" | "Moderate" | "Low";

export type LearningStatus = "Completed" | "In Progress" | "Not Started";

/** Systems where step-by-step management pathways dominate assessment. */
const MANAGEMENT_SYSTEMS = ["critical-care", "trauma"];

/** Systems where recognition and reasoning dominate assessment. */
const DIAGNOSTIC_SYSTEMS = ["cardiovascular", "neurology", "respiratory"];

export interface ClassifiedError {
  topic: string;
  system: string | null;
  errorType: ErrorType;
  severity: ErrorSeverity;
  action: string;
  reasons: string[];
}

/**
 * Transparent error classification from observable signals only:
 * repetition, accuracy, attempts, and the topic's medical system.
 * No hidden model; every output carries its evidence in `reasons`.
 */
export function classifyTopicError(input: {
  topic: string;
  system: string | null;
  accuracy: number;
  attempts: number;
  repeatedErrors: number;
}): ClassifiedError {
  const accuracy = clamp(
    Number.isFinite(input.accuracy) ? input.accuracy : 0,
    0,
    100
  );
  const attempts =
    Number.isFinite(input.attempts) && (input.attempts as number) > 0
      ? Math.floor(input.attempts as number)
      : 0;
  const repeated =
    Number.isFinite(input.repeatedErrors) && (input.repeatedErrors as number) > 0
      ? Math.floor(input.repeatedErrors as number)
      : 0;

  const persistent = repeated >= REPEATED_ERROR_THRESHOLD;
  const weak = attempts >= 5 && accuracy < 50;
  const shaky = attempts >= 5 && accuracy < 70;

  let errorType: ErrorType;
  if (persistent || weak) {
    if (input.system && MANAGEMENT_SYSTEMS.includes(input.system)) {
      errorType = "Management Decision Error";
    } else if (input.system && DIAGNOSTIC_SYSTEMS.includes(input.system)) {
      errorType = "Diagnostic Reasoning Error";
    } else {
      errorType = "Knowledge Gap";
    }
  } else if (shaky) {
    errorType = "Concept Error";
  } else {
    errorType = "Question Interpretation Error";
  }

  const severity: ErrorSeverity =
    persistent || accuracy < 40
      ? "High"
      : accuracy < 70
        ? "Moderate"
        : "Low";

  const action =
    severity === "High"
      ? `Review ${input.topic} algorithm + targeted MCQs`
      : severity === "Moderate"
        ? `Complete a focused practice set on ${input.topic}`
        : `Re-review ${input.topic} after interval`;

  const reasons: string[] = [];
  if (!attempts) {
    reasons.push("No Qbank attempts recorded yet");
  } else {
    reasons.push(
      `Qbank accuracy ${accuracy}% across ${attempts} attempt${attempts === 1 ? "" : "s"}`
    );
  }
  if (repeated > 0) {
    reasons.push(
      `${repeated} repeated error${repeated === 1 ? "" : "s"} on recent items`
    );
  }
  reasons.push(`Classified as ${errorType} (${severity} severity)`);

  return {
    topic: input.topic,
    system: input.system,
    errorType,
    severity,
    action,
    reasons,
  };
}

export interface TopicEvidence {
  topic: string;
  system: string | null;
  learning: LearningStatus;
  accuracy: number | null;
  attempts: number;
  repeatedErrors: number;
  review: "Due" | "Current" | "—";
  priority: number;
  reasons: string[];
}

/**
 * Per-topic evidence bundle: learning state, Qbank numbers, repetition,
 * review flag, and a priority score. Board/clinical/frequency weights use
 * the neutral value 3 until curated per-topic weights exist (calibration
 * item); accuracy, attempts, and repetition are always real.
 */
export function buildTopicEvidence(input: {
  topic: string;
  system: string | null;
  accuracy: number;
  attempts: number;
  repeatedErrors: number;
}): TopicEvidence {
  const attempts =
    Number.isFinite(input.attempts) && (input.attempts as number) > 0
      ? Math.floor(input.attempts as number)
      : 0;
  const accuracy =
    attempts > 0 && Number.isFinite(input.accuracy)
      ? clamp(input.accuracy, 0, 100)
      : null;
  const repeated =
    Number.isFinite(input.repeatedErrors) && (input.repeatedErrors as number) > 0
      ? Math.floor(input.repeatedErrors as number)
      : 0;

  const learning: LearningStatus =
    attempts === 0
      ? "Not Started"
      : accuracy !== null && accuracy >= 85 && attempts >= 20
        ? "Completed"
        : "In Progress";
  const review: TopicEvidence["review"] =
    attempts === 0 ? "—" : accuracy !== null && (accuracy < 70 || repeated > 0) ? "Due" : "Current";

  const priority = calculateTopicPriority({
    boardWeight: 3,
    clinicalWeight: 3,
    examFrequency: 3,
    topicAccuracy: accuracy ?? 0,
    topicAttempts: attempts,
  });

  const reasons: string[] =
    accuracy === null
      ? ["No Qbank attempts recorded yet"]
      : [
          `Qbank accuracy ${accuracy}% across ${attempts} attempt${attempts === 1 ? "" : "s"}`,
          ...(repeated > 0
            ? [`${repeated} repeated error${repeated === 1 ? "" : "s"} on recent items`]
            : []),
          review === "Due"
            ? "Review due: accuracy below 70% or repeated errors present"
            : "Review current",
          `Learning state: ${learning}`,
        ];

  return {
    topic: input.topic,
    system: input.system,
    learning,
    accuracy,
    attempts,
    repeatedErrors: repeated,
    review,
    priority,
    reasons,
  };
}

/**
 * Top-priority evidence topics for dashboard display, highest first.
 */
export function selectPriorityEvidence(input: {
  topics: Array<{
    topic: string;
    system: string | null;
    accuracy: number;
    attempts: number;
    repeatedErrors: number;
  }>;
  maxTopics?: number;
}): TopicEvidence[] {
  const max =
    Number.isFinite(input.maxTopics) && (input.maxTopics as number) > 0
      ? Math.floor(input.maxTopics as number)
      : 3;
  return input.topics
    .map(topic => buildTopicEvidence(topic))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, max);
}

export type PlanTaskKind = "learn" | "practice" | "review";

/**
 * Recommendation reason + category for a TodayPlan row. The UI passes its
 * context; this function owns every displayed reason string so components
 * never generate reasons themselves. Recovery rows keep the reasons already
 * produced by `generateRecoveryActions()`.
 */
export function taskReasonFor(input: {
  kind: PlanTaskKind;
  paused?: boolean;
  hasWeakArea?: boolean;
  targetLabel?: string;
}): { category: IntelligenceTaskType; reason: string } {
  switch (input.kind) {
    case "learn":
      return {
        category: "LEARN",
        reason: "Daily reading target — continue the current section",
      };
    case "practice":
      return {
        category: "PRACTICE",
        reason: input.paused
          ? "Resume the paused exam where you left off"
          : "Targeted set for the current focus section",
      };
    case "review":
      return {
        category: "REVIEW",
        reason: input.hasWeakArea
          ? "Weak-area review from your saved attempts"
          : "Incorrect, flagged, or exam-trap review",
      };
  }
}

// ---------------------------------------------------------------------------
// Phase 4-F.3: Adaptive Study Plan Integration (Mastery + Weak Areas + Priority)
// ---------------------------------------------------------------------------

export interface AdaptiveTopicInput {
  topicId: string;
  topicName: string;
  basePriority: number; // 0-100 from calculateTopicPriority
  masteryScore: number; // 0-100
  weaknessLevel: 'Green' | 'Yellow' | 'Red';
  errorCount: number;
  hasWeakArea: boolean;
}

export interface AdaptiveTask extends IntelligenceTask {
  adaptivePriority: number;
  sourceTopicId: string;
}

/**
 * Adaptive priority = basePriority adjusted by mastery and weak-area signals.
 * Red (mastery <60) ×1.4, Yellow (<80) ×1.2, Green ×1.0; plus +8 if weak area,
 * plus +5 per repeated error (capped). Keeps within 0-100.
 */
export function calculateAdaptivePriority(input: AdaptiveTopicInput): number {
  const base = clamp(input.basePriority, 0, 100);
  let factor = 1.0;
  if (input.weaknessLevel === 'Red') factor = 1.4;
  else if (input.weaknessLevel === 'Yellow') factor = 1.2;
  const weakBonus = input.hasWeakArea ? 8 : 0;
  const errorBonus = Math.min(15, input.errorCount * 5);
  return clamp(Math.round(base * factor + weakBonus + errorBonus), 0, 100);
}

/**
 * Generates TodayPlan tasks from adaptive priorities.
 * - MCQ tasks: top adaptivePriority topics → PRACTICE
 * - Review tasks: topics with accuracy <70 or repeated errors → REVIEW
 * - Algorithm review: Very High priority topics → REVIEW with algorithm reason
 * - Weak area recovery: topics flagged by weak-area-engine → RECOVERY
 *
 * Pure, deterministic, no I/O. Consumes outputs of mastery-engine and
 * weak-area-engine plus topic priorities.
 */
export function generateAdaptiveTasks(input: {
  topics: AdaptiveTopicInput[];
  maxTasksPerCategory?: number;
}): AdaptiveTask[] {
  const maxPerCat = Math.max(1, Math.floor(input.maxTasksPerCategory ?? 2));
  const sorted = [...input.topics].sort(
    (a, b) => calculateAdaptivePriority(b) - calculateAdaptivePriority(a)
  );

  const tasks: AdaptiveTask[] = [];

  // MCQ tasks — top priorities
  for (const t of sorted.slice(0, maxPerCat)) {
    tasks.push({
      type: "PRACTICE",
      topic: t.topicName,
      reason: `Adaptive priority ${calculateAdaptivePriority(t)} — mastery ${t.masteryScore} (${t.weaknessLevel})`,
      priority: calculateAdaptivePriority(t),
      adaptivePriority: calculateAdaptivePriority(t),
      sourceTopicId: t.topicId,
      href: `/practice/create?topic=${encodeURIComponent(t.topicId)}`,
      minutes: 20,
    });
  }

  // Review tasks — weak accuracy or weak area
  const reviewCandidates = sorted.filter(t => t.masteryScore < 70 || t.hasWeakArea).slice(0, maxPerCat);
  for (const t of reviewCandidates) {
    tasks.push({
      type: "REVIEW",
      topic: t.topicName,
      reason: `Review — mastery ${t.masteryScore} (${t.weaknessLevel})${t.hasWeakArea ? " + weak area" : ""}`,
      priority: calculateAdaptivePriority(t) - 5,
      adaptivePriority: calculateAdaptivePriority(t) - 5,
      sourceTopicId: t.topicId,
      href: `/learn?topic=${encodeURIComponent(t.topicId)}`,
      minutes: 15,
    });
  }

  // Algorithm review — Very High base priority (proxy for blueprint Very High)
  const algoCandidates = sorted.filter(t => t.basePriority >= 80).slice(0, maxPerCat);
  for (const t of algoCandidates) {
    tasks.push({
      type: "REVIEW",
      topic: `${t.topicName} Algorithm`,
      reason: `Algorithm review — high priority (${t.basePriority}) + ${t.weaknessLevel}`,
      priority: calculateAdaptivePriority(t) - 2,
      adaptivePriority: calculateAdaptivePriority(t) - 2,
      sourceTopicId: t.topicId,
      href: `/learn/system/${encodeURIComponent(t.topicId)}`,
      minutes: 10,
    });
  }

  // Weak area recovery — explicit weak flag
  const recoveryCandidates = sorted.filter(t => t.hasWeakArea).slice(0, maxPerCat);
  for (const t of recoveryCandidates) {
    tasks.push({
      type: "RECOVERY",
      topic: t.topicName,
      reason: `Weak area recovery — ${t.errorCount} errors, mastery ${t.masteryScore}`,
      priority: 95,
      adaptivePriority: 95,
      sourceTopicId: t.topicId,
      href: `/practice/performance?topic=${encodeURIComponent(t.topicId)}`,
      minutes: 15,
    });
  }

  // Deduplicate by type+topic, keep highest priority
  const seen = new Map<string, AdaptiveTask>();
  for (const t of tasks) {
    const key = `${t.type}:${t.sourceTopicId}`;
    const existing = seen.get(key);
    if (!existing || t.priority > existing.priority) seen.set(key, t);
  }
  return Array.from(seen.values()).sort((a, b) => b.priority - a.priority);
}
