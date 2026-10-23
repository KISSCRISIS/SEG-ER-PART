# SEG Calibration Layer (future purpose — documentation only)

This document defines what calibration means for the Board Readiness Index
and the adaptive intelligence layer. **No prediction model is implemented
here.** The Dashboard never claims exam success prediction and never displays
a probability of passing.

## Purpose (future work)

1. **Compare the Readiness Index with mock exam outcomes.** Collect paired
   observations (index snapshot → later mock score) to measure agreement.
   Agreement is descriptive calibration input, not a pass predictor.
2. **Analyze user progress.** Track coverage, accuracy, priority completion,
   revision compliance, and trend against later performance to see which
   signals carry weight.
3. **Adjust thresholds.** Current fixed points — readiness bands at 60/80,
   repeated-error threshold 3, weak-section minimum 3 attempts, mastery bar
   85% on 20 attempts, review-due rule (accuracy < 70% or any repetition),
   recovery priority 92 — are documented starting values, not validated
   cutoffs. Change any of them only with paired outcome data and a review
   note.
4. **Improve recommendations.** Refine the system→error-type heuristic
   (`MANAGEMENT_SYSTEMS` / `DIAGNOSTIC_SYSTEMS` in
   `shared/study-plan-intelligence.ts`), the neutral 3/3/3 topic weights,
   and the readiness proxies (mastery-bar proxy for priority completion,
   note-based revision compliance, recent-half trend) once per-topic
   completion records, a real review schedule, and item-level error labels
   exist.

## Explicitly out of scope

- Pass/fail prediction, probability of passing, or any language implying
  exam outcome forecasting.
- Automated threshold changes without human review.
- Using uncalibrated weights for clinical or credentialing decisions.

## Entry criteria for calibration work

- Paired index/mock observations from pilot users (never invented).
- Qualified review of any board/frequency weight before it leaves
  `under-review` status.
- All existing intelligence tests green before and after threshold changes.
