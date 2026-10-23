# SEG Study Plan Intelligence — Adaptive Planning Model (Phase 4-A, design only)

Status: **architecture and algorithm design**. No UI, route, page, engine,
database, or API change is included in this phase. The existing
`shared/study-plan-engine.ts` behavior is frozen; this document specifies what
a future adaptive implementation must satisfy.

> Readiness remains an internal study signal, never a guarantee of examination
> success. No board coverage is claimed: SEG has no official board blueprint,
> so every "board weight" below is an editorial proposal awaiting qualified
> review, not a measured fact.

## 1. Existing engine analysis (`shared/study-plan-engine.ts`, 31 lines)

### 1.1 Current inputs (`StudyPlanInput`)

| Input | Source today | Notes |
|---|---|---|
| `planId` | `studyPlan.save` (6 ids: residency-year-1..4, jordan-board-part-1/2) | Fixed enum; router task-id regex mirrors it |
| `examDate?` | `studyPlan.save` (optional, calendar-validated) | Day-granularity cutoff |
| `dailyHours` | `studyPlan.save` | Validated 0.5–16, NaN rejected |
| `restDays` | `studyPlan.save` | Weekday numbers 0–6 |
| `completedContent` / `totalContent` | `planProgress()` (server-derived, client input stripped) | Aggregate counts only, no per-topic identity |
| `qbankCorrect` / `qbankAttempted` | `planProgress()` | Aggregate accuracy only |
| `weakAreas` | `planProgress()` | String list; only length + first item are used |

### 1.2 Current outputs (`StudyPlan`)

- `progressPercentage = round(0.6·content% + 0.4·accuracy%)`, content capped at 100.
- `readinessPercentage = round(min(100, progress·0.7 + (weakAreas.length ? 10 : 30)))`.
- `dailyTasks`: 4 fixed tasks (learn/practice/atlas/journal) + optional 5th
  `weak-area` recovery task (15% of minutes, first weak area only, priority
  high). Practice task is high priority whenever any weak area exists.
- Rest days and exam-day-or-later produce an empty task list.
- Fixed disclaimer string about readiness and board coverage.
- The `studyPlan.today` router rewrites learn/practice/review hrefs to the
  next real reading/practice target; persistence uses Amman-date snapshots.

### 1.3 Existing tests (must keep passing)

- `shared/study-plan-engine.test.ts`: linked tasks with bounded progress;
  weak-area priority; fresh-user 4-task plan.
- `server/studyPlanEngine.test.ts`: rest-day emptying, invalid-hours throw,
  exam-date cutoff boundaries.

### 1.4 Gaps the new model must close (no behavior change yet)

1. Readiness is coarse: a binary +10/+30 bonus; two users with identical
   aggregates but different topic distributions score identically.
2. No per-topic model: priority, attempts, errors, and revision state are
   invisible to the planner.
3. No trend or spaced repetition: recent collapse vs. steady growth are
   indistinguishable; review has no schedule.
4. `overdue` uses one hard threshold (content < 50% and < 90 days).
5. Task-id regex (`completeTask`) admits only
   `learn|practice|atlas|journal|weak-area` kinds — any new task kind needs a
   matching router update in a later phase.

### 1.5 Safe extension points (for Phase 4-B)

- Additive **optional** fields on a new input type; `StudyPlanInput` stays
  untouched so current callers and tests are unaffected.
- New pure helper functions alongside `buildStudyPlan`; no signature changes.
- Reuse of `study-calendar.ts` date utilities and Amman-day conventions.

## 2. Study Plan Inputs (proposed contracts)

All names are proposals. Each maps to an existing SEG source or a declared gap.

### 2.1 User Profile

| Field | Type | Source / gap |
|---|---|---|
| `trainingLevel` | PGY-1..5+, attending, pilot_reviewer | `account.profile.learningProfile` (exists) |
| `targetExam` | `StudyPlanId` (existing 6) | `studyPlan.save` (exists) |
| `examDate` | ISO date \| undefined | `studyPlan.save` (exists) |
| `availableMinutes` | number (from `dailyHours`) | `studyPlan.save` (exists) |
| `restDays` | number[] | `studyPlan.save` (exists) |
| `overallProgress` | current aggregate progress% | `planProgress()` (exists) |

### 2.2 Content Intelligence (per topic)

| Field | Type | Source / gap |
|---|---|---|
| `topicId` | string (stable unit/chapter id) | `SEG_CONTENT_LIBRARY` + summary JSONs (exists) |
| `medicalSystem` | system id | `data/medical-systems.ts` mapping (exists) |
| `boardWeight` 0–5 | editorial proposal | **Gap**: no official blueprint; requires qualified review |
| `clinicalWeight` 0–5 | editorial proposal | **Gap**: same review requirement |
| `examFrequency` 0–5 | past-exam frequency estimate | **Gap**: needs curated item analysis |
| `estimatedMinutes` | number | **Gap**: needs per-topic calibration |
| `mcqTarget` | number | Derived from `mcqTarget`-per-level policy (new constant) |

### 2.3 Performance Intelligence (per topic + global)

| Field | Type | Source |
|---|---|---|
| `accuracy` | 0–100 per topic | `residentContent.performanceSummary` sections (exists) |
| `attempts` | number per topic | same (exists) |
| `errorCount14d` | number per topic | Qbank attempt history (exists via `qbank.history`) |
| `weakAreas` | string[] | `planProgress()` (exists) |
| `revisionState` | per-topic last-reviewed / due | `journalNotes` + `revisionProgress` (exists); schedule is new |

### 2.4 Learning State (per topic)

| Field | Type | Source |
|---|---|---|
| `status` | completed \| in-progress \| not-started | `residentContent.studyProgress` + `learningProgress` (exists) |
| `spacedQueue` | due revision items with due dates | New schedule over existing completion records |
| `streakDays` / `lastActiveDay` | numbers/dates | Task completions (exists) |

## 3. Scoring System

### 3.1 Topic Priority Score (0–100)

Inputs are scored 0–5 except where noted. Weights sum to 1.0.

```
base      = 0.30·boardWeight + 0.25·clinicalWeight + 0.15·examFrequency   (0–5 scale)
weakness  = 0–5 from accuracy gap: 5·(1 − topicAccuracy/100), 0 if attempts < 5
urgency   = 0–5 from daysToExam D: D≤14→5, ≤30→4, ≤60→3, ≤90→2, else 1 (no date→1)

Priority Score = round(100 · (0.55·base/5 + 0.25·weakness/5 + 0.20·urgency/5))
```

Worked example — Shock (board 5, clinical 5, frequency 4, accuracy 40% on 12
attempts, D = 45): base = 0.30·5+0.25·5+0.15·4 = 3.35; weakness = 5·0.6 = 3.0;
urgency = 3. Score = round(100·(0.55·0.67 + 0.25·0.60 + 0.20·0.60)) = **64**.

Rules: topics with < 5 attempts get weakness = 2 (neutral, avoids punishing
unseen topics); mastered topics (Section 5) get a −15 score penalty instead of
exclusion so they can still surface for spaced review.

### 3.2 Allocation weights

Daily minutes split into Learn / Practice / Revision pools by the Section 6
table; within each pool, topics are taken in Priority Score order until minutes
are exhausted (0.5-topic granularity is rounded to whole topics; leftovers roll
to Revision).

## 4. Readiness Calculation (0–100)

```
readiness = round(
    0.30·knowledgeCoverage
  + 0.25·qbankPerformance
  + 0.20·priorityCompletion
  + 0.15·revisionCompliance
  + 0.10·recentTrend)
```

| Component (0–100) | Definition |
|---|---|
| `knowledgeCoverage` | % of in-scope topics with status completed |
| `qbankPerformance` | attempt-weighted mean topic accuracy (min 5 attempts per topic to count) |
| `priorityCompletion` | % of top-quartile Priority Score topics completed |
| `revisionCompliance` | % of due spaced items reviewed within ±1 day over last 14 days |
| `recentTrend` | 50 + 50·tanh(slope of last 14-day accuracy trend); flat = 50 |

Bands: **Green 80–100** (maintain + spaced review), **Yellow 60–79**
(close priority gaps first), **Red <60** (foundations + recovery before new
breadth). Band determines the allocation modifier in Section 6, never exam
advice.

Migration note: the current `progress·0.7 + bonus` formula is a special case
(coverage + accuracy only, fixed weights, binary weak bonus). Phase 4-B must
demonstrate band agreement on historical snapshots before replacing it.

## 5. Adaptive Rules

| # | IF | THEN |
|---|---|---|
| R1 | Weak area AND boardWeight ≥ 4 | +20% topic time share; priority floor 70 |
| R2 | Same-topic errors ≥ 3 in 14 days | Create recovery task (kind `weak-area`, high), link `/practice/performance` |
| R3 | Mastery: accuracy ≥ 85% AND attempts ≥ 20 AND status completed | Reduce revision to spaced intervals 1/3/7/14/30 days; −15 priority |
| R4 | D ≤ 30 (exam proximity) | Practice pool +10pts, Learn pool −10pts; no new systems |
| R5 | Rest day or exam-day-or-later | Empty task list (preserve current behavior) |
| R6 | `overdue` (coverage < 50% AND D < 90) | Learn 35 / Practice 45 split (preserve current behavior) |
| R7 | No activity for 7 days | Re-entry diagnostic: 10 mixed Qs before resuming plan |
| R8 | All in-scope topics completed | Maintenance mode: 70% spaced review, 30% mixed practice |

Rule conflicts resolve by specificity (R5 > R8 > R4 > R6 > R1 > R2 > R3 > R7);
every decision must be explainable from logged inputs (no hidden state).

## 6. Daily Allocation Logic (Learn % / Practice % / Revision %)

Base splits by level (Learn/Practice/Revision):

| Level | Base |
|---|---|
| PGY-1 / residency-year-1 | 55 / 30 / 15 |
| PGY-2..3 / board-part-1 | 45 / 35 / 20 |
| PGY-4+ / board-part-2, attending | 35 / 45 / 20 |

Modifiers (applied in order, renormalized to 100%):
1. Red band: +10 Practice from Learn. Yellow: +5 Practice from Learn.
2. R4 proximity (D ≤ 30): +10 Practice from Learn.
3. Any weak area: carve 15% Recovery out of Practice (preserves current
   `weak-area` task semantics).
4. Rest/exam day: all pools → empty (preserves current behavior).

Worked example — PGY-2, 120 min/day, D = 45, weak "shock", Yellow band:
base 45/35/20 → Yellow shifts 5 → 40/40/20 → weak carve-out → Learn 48,
Practice 30, Recovery 18, Revision 24 minutes. Recovery targets the highest
Priority Score weak topic first.

## 7. Backend / API impact in this phase

None. Future phases will need (additive only): optional per-topic inputs on a
new planner type, a revision-schedule query over existing completion records,
and a `review` task-kind addition to the `completeTask` regex. No migration,
no signature change, no UI/route change is part of this design.

## 9. Phase 4-B implementation notes

Implemented in `shared/study-plan-intelligence.ts` (pure extension layer;
`study-plan-engine.ts` untouched): `calculateUrgency`,
`calculateTopicPriority`, `calculateReadinessScore` + `readinessBand`,
`generateRecoveryActions`, `calculateDailyAllocation` +
`baseAllocationForPlanId`. `TodayPlan` appends up to 2 recovery rows (same
row design, rose accent) from real weak-section and repeated-error signals;
existing Read/Qbank/Review rows are unchanged.

Calibrated assumptions: weak sections qualify at ≥3 attempts; repeated-error
threshold 3; repeated-error priority 92; weak-review priority
`round(min(95, 60 + gap·0.35))`; recovery budget defaults to the plan's review
minutes. Covered by `shared/study-plan-intelligence.test.ts` (7 tests).

## 8. Test plan (implemented in Phase 4-B)

Property tests: scores bounded 0–100; band thresholds exact at 60/80;
rest/exam days empty; weak-area task present iff weak areas non-empty;
deterministic output for fixed `now`; historical-snapshot agreement between
old and new readiness within ±10 on seed data. All existing engine tests must
pass unmodified.
