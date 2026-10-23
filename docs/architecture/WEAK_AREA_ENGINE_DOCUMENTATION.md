# Weak Area Intelligence Layer — Phase 4-F.1

Pure engine that turns wrong answers into weak topics via `topicId`, then into recommended actions. No Dashboard mutation in this phase; the engine is consumed by later phases through props.

## Pipeline

```
Wrong Question
    ↓ (qbank-topic-mapping.json)
topicId
    ↓ (group by topicId, count errors)
Repeated Errors
    ↓ (threshold 3 OR accuracy < 70% on ≥3 attempts)
Weak Topic
    ↓ (four content layers)
Recommended Action
```

## Inputs (never modified)

- `qbank-topic-mapping.json` (5,612 questions; 1,456 mapped; canonical) — `questionId → topicId`
- `topic-registry.json` (22 canonical topics) — `topicId → {topicName, system, priority}`
- Question performance at runtime: `{ questionId, correct }` — Qbank history or session attempts; unmapped questions are ignored, never guessed.

## Config (calibration-ready)

- `repeatedErrorThreshold: 3` — ≥3 wrong on same `topicId` → weak.
- `minAttemptsForWeak: 3` + `accuracyThreshold: 70` — <70% on ≥3 attempts → weak.
- Thresholds are documented starting values (see `CALIBRATION_LAYER.md`); change only with paired outcome data.

Thresholds live in `DEFAULT_WEAK_CONFIG` (`shared/weak-area-engine.ts:18`) and mirrored in `weak-area-engine.json:config`.

## Outputs

`WeakArea[]` sorted deterministically by `errorCount` ↓, `accuracy` ↑, `topicId`:

```json
{
  "topicId": "EM_CARDIO_ACS",
  "topicName": "Acute Coronary Syndrome",
  "system": "Cardiovascular",
  "systemId": "cardiovascular",
  "errorCount": 3,
  "totalAttempts": 5,
  "accuracy": 40,
  "isWeak": true,
  "recommendedActions": [
    "Review Algorithm",
    "Review Exam Pearl",
    "Read Summary",
    "Solve Related Questions"
  ],
  "reason": "3 repeated errors (threshold 3)"
}
```

Actions map to graph content types: Algorithm (`ALG_*`), Exam Pearl (`PEARL_*`), Summary (book `chapter`/`topic` via `book-topic-mapping.json`), MCQ (`HAS_QUESTIONS`).

## Invariants

- Zero new topics; zero book/Qbank/Dashboard/`study-plan-engine.ts` edits.
- Unmapped questions stay out of graph.
- Engine is pure and testable; Dashboard integration is Phase 4-F.3/4.4 work.

## Files

- Engine: `shared/weak-area-engine.ts`
- Config/index: `medical-content/knowledge-graph/weak-area-engine.json` (mirrored to `emergency-board/knowledge-graph/`)
- Tests: `shared/weak-area-engine.test.ts`
