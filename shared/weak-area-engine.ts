/**
 * Phase 4-F.1: Weak Area Intelligence Layer.
 *
 * Pure, deterministic engine that turns wrong answers into weak topics
 * via topicId, then into recommended actions. No Dashboard mutation here;
 * the engine is consumed by later phases (TodayPlan/Mastery) through props.
 *
 * Data consumed (never modified):
 * - qbank-topic-mapping.json (questionId → topicId, topicId → topicName/system)
 * - topic-registry.json (22 canonical topics)
 * - question performance data (attempts with correctness, at runtime)
 */

export interface WeakAreaInputAttempt {
  questionId: string;
  correct: boolean | number;
}

export interface WeakAreaTopicMapping {
  questionId: string;
  topicId: string;
}

export interface WeakAreaTopicInfo {
  topicId: string;
  topicName: string;
  system: string;
  systemId: string;
  priority: string;
}

export type WeakActionType =
  | "Review Algorithm"
  | "Review Exam Pearl"
  | "Read Summary"
  | "Solve Related Questions";

export interface WeakArea {
  topicId: string;
  topicName: string;
  system: string;
  systemId: string;
  errorCount: number;
  totalAttempts: number;
  accuracy: number;
  isWeak: boolean;
  recommendedActions: WeakActionType[];
  reason: string;
}

export interface WeakAreaEngineConfig {
  repeatedErrorThreshold: number;
  minAttemptsForWeak: number;
  accuracyThreshold: number;
}

export const DEFAULT_WEAK_CONFIG: WeakAreaEngineConfig = {
  repeatedErrorThreshold: 3,
  minAttemptsForWeak: 3,
  accuracyThreshold: 70,
};

const ACTION_TEMPLATES: Record<string, WeakActionType[]> = {
  default: [
    "Review Algorithm",
    "Review Exam Pearl",
    "Read Summary",
    "Solve Related Questions",
  ],
};

/**
 * Pipeline: Wrong Question → topicId → Repeated Errors → Weak Topic → Recommended Action
 *
 * - Groups wrong attempts by topicId via the qbank mapping.
 * - A topic is weak if it has ≥ repeatedErrorThreshold errors (high confidence)
 *   or accuracy < threshold with ≥ minAttempts.
 * - Recommended actions are the four canonical content layers, ordered by
 *   priority (Very High → High carry Algorithm first).
 */
export function computeWeakAreas(input: {
  attempts: WeakAreaInputAttempt[];
  mappings: WeakAreaTopicMapping[];
  registry: WeakAreaTopicInfo[];
  config?: Partial<WeakAreaEngineConfig>;
}): WeakArea[] {
  const config = { ...DEFAULT_WEAK_CONFIG, ...input.config };
  const topicByQuestion = new Map(
    input.mappings.map(m => [m.questionId, m.topicId])
  );
  const topicInfoById = new Map(
    input.registry.map(t => [t.topicId, t])
  );

  // Aggregate per topic: total attempts and errors, only for mapped questions
  const perTopic = new Map<
    string,
    { total: number; errors: number }
  >();

  for (const attempt of input.attempts) {
    const topicId = topicByQuestion.get(attempt.questionId);
    if (!topicId) continue; // unmapped question → ignored, never guessed
    const agg = perTopic.get(topicId) ?? { total: 0, errors: 0 };
    agg.total += 1;
    if (!attempt.correct || Number(attempt.correct) === 0) agg.errors += 1;
    perTopic.set(topicId, agg);
  }

  const weakAreas: WeakArea[] = [];
  perTopic.forEach((agg, topicId) => {
    const info = topicInfoById.get(topicId);
    if (!info) return;
    const accuracy =
      agg.total > 0 ? Math.round(((agg.total - agg.errors) / agg.total) * 100) : 0;
    const hasRepeatedErrors = agg.errors >= config.repeatedErrorThreshold;
    const isLowAccuracy =
      agg.total >= config.minAttemptsForWeak &&
      accuracy < config.accuracyThreshold;
    const isWeak = hasRepeatedErrors || isLowAccuracy;
    if (!isWeak) return;

    const recommendedActions: WeakActionType[] =
      ACTION_TEMPLATES.default;

    const reason = hasRepeatedErrors
      ? `${agg.errors} repeated errors (threshold ${config.repeatedErrorThreshold})`
      : `${accuracy}% accuracy across ${agg.total} attempts (threshold ${config.accuracyThreshold}%)`;

    weakAreas.push({
      topicId,
      topicName: info.topicName,
      system: info.system,
      systemId: info.systemId,
      errorCount: agg.errors,
      totalAttempts: agg.total,
      accuracy,
      isWeak: true,
      recommendedActions,
      reason,
    });
  });

  // Deterministic: most errors first, then lowest accuracy, then topicId
  return weakAreas.sort(
    (a, b) =>
      b.errorCount - a.errorCount ||
      a.accuracy - b.accuracy ||
      a.topicId.localeCompare(b.topicId)
  );
}

/**
 * Helper: build qbank mapping lookup from the generated file shape.
 */
export function toMappingLookup(
  qbankMapping: { mappings: Array<{ questionId: string; topicId: string | null; reviewStatus: string }> }
): WeakAreaTopicMapping[] {
  return qbankMapping.mappings
    .filter(m => m.reviewStatus === "mapped" && m.topicId)
    .map(m => ({ questionId: m.questionId, topicId: m.topicId as string }));
}
