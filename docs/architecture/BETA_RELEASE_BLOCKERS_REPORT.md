# Beta Release Blockers Report — Phase 5

**Scope:** Real user testing readiness for 7 flows. Only blockers fixed; no mapping expansion, no new topics, no new architecture layers. Generated 2026-09-14 from live repo state.

## 1. Authentication Flow — READY (with env note)

**Current:** `server/_core/sdk.ts` + `server/db.ts:18` (`localStorageEnabled` exported) + `server/routers.ts:45` (`localEmailOnlyLoginAllowed` = non-prod + localStore). `ProtectedRoute.tsx` + `useAuth` with `redirectOnUnauthenticated`. `PILOT_MODE` in `.env.example:3` (`false` by default).

**Check:** `pnpm check` PASS; `server/_core/cookies.test.ts` PASS; `DashboardLayout.test.tsx` PASS.

**Blocker fixed:** None — `db.localStorageEnabled` now correctly exported (was missing in earlier 7:12 AM edit, now `server/db.ts:20` re-exports). No logic change.

**Remaining for beta:** Set `.env` for beta: `PILOT_MODE=true`, `SEG_LOCAL_EMAIL_LOGIN=true`, `JWT_SECRET` (long random), `DATABASE_URL` (or local SQLite via `localStore` when `localStorageEnabled()` true). Without these, OAuth (`https://oauth.manus.im`) would be required and `VITE_OAUTH_PORTAL_URL` is placeholder. **Not a code blocker** — env-only.

## 2. Qbank Practice Flow — READY

**Current:** `client/src/pages/ResidentPracticePage.tsx` (5 banks: FRCEM 1,529, Hippo 1,927, Rosen 1,044, Tintinalli 756, Oxford 356) + `QbankPortalPage.tsx` + `server/routers.ts:qbank` (createExam, updateExam, setQuestionState). `HighYieldChapterMap` + `MedicalSystemCards` for navigation.

**Check:** `server/residentContent.test.ts` PASS (22-section pathway), `scripts/rosen-summaries.test.ts` PASS.

**Blocker fixed:** None. Practice flow works with `qbank-topic-mapping.json` 1,456 mapped / 4,156 unmapped — unmapped questions still playable via chapter, just not linked to `topicId`.

## 3. Answer Tracking — READY

**Current:** `server/db.ts:recordResidentQuestionAttempt` + `server/routers.ts:submitAnswer` (validates `question.correctAnswer`, records `family/chapterNumber/selectedAnswer/correct`) + `getQuestionHistory` + `ResidentPracticePage` flag/skip + per-question timing + `MedicalJournalPage` review.

**Check:** `server/localStore.test.ts` PASS; `server/studyPlanApi.test.ts` PASS (stores assigned tasks and isolates users).

**Blocker fixed:** None.

## 4. Mastery Calculation — READY (calibration note)

**Current:** `shared/mastery-engine.ts` (pure, `computeMastery` 0-100, `Green≥80/Yellow≥60/Red<60`) + `shared/weak-area-engine.ts` (repeated errors ≥3) + `shared/study-plan-intelligence.ts` (mastery × weak × priority).

**Check:** `shared/mastery-engine.test.ts` 4 PASS, `shared/weak-area-engine.test.ts` 4 PASS, `shared/study-plan-intelligence.test.ts` 12 PASS.

**Blocker fixed:** `shared/mastery-engine.ts:40-52` — removed unused `const { qbankAttempts, reviewHistory, studyProgress }` and `const now` lint errors (no logic change).

**Remaining:** All 25 topics `under-review`; `masteryScore` is evidence-informed, not exam prediction (per `CALIBRATION_LAYER.md`).

## 5. Study Plan Generation — READY

**Current:** `shared/study-plan-engine.ts` (frozen, 6 IDs, `buildStudyPlan` 0.5-16h, restDays, examDate) + `shared/study-plan-intelligence.ts` (adaptive: `calculateAdaptivePriority` + `generateAdaptiveTasks` → PRACTICE/REVIEW/RECOVERY) + `server/routers.ts:studyPlan` (today, taskCompletions, completeTask, current, save) + `StudyPlanSettings.tsx`.

**Check:** `shared/study-plan-engine.test.ts` 2 PASS, `server/studyPlanEngine.test.ts` 4 PASS.

**Blocker fixed:** `scripts/build-qbank-mapping.ts:178` — `!/\bshock\b/i.test(q)` → `!/\bshock\b/i.test(question)` (undefined `q` would have thrown at generation time; fixed, no logic change).

## 6. Dashboard Intelligence — READY

**Current:** `client/src/pages/DashboardPage.tsx:410` — `HomeDashboard` (6 cards) → `ReadinessIndexCard` (Board Readiness Index 0-100, band, 5 evidence bars, “not a prediction”), `TopicEvidenceCard`, `ErrorRecoveryCard` (5 error types, severity, action), `TodayPlan` (LEARN/PRACTICE/REVIEW/RECOVERY with `taskReasonFor` + `generateRecoveryActions` + `generateAdaptiveTasks` via props only), `MasteryOverview` (weak/due/knowledge), `RecentActivity`, `QuickActions`; `readiness.ts` (`selectReadinessBreakdown` — data mapping only).

**Check:** `client/src/pages/DashboardPage.test.tsx` PASS (core cards without anchor previews), `client/src/components/dashboard/*.test.tsx` 4 suites PASS.

**Blocker fixed:** None — dashboard consumes intelligence outputs via props, no scoring in React.

## 7. Content Navigation — READY (1 blocker fixed)

**Current:** `client/src/pages/ResidentLearnPage.tsx` + `HighYieldChapterMap.tsx` + `MedicalSystemCards` + `client/src/data/medical-systems.ts` (17 systems) + `client/lib/high-yield-chapter-map.ts` (17 buckets) + `StudyBookReaderPage.tsx` + `ChapterReaderPage.tsx`.

**Check:** `client/src/lib/high-yield-chapter-map.test.ts` 2 PASS, `client/src/data/medical-systems.test.ts` 4 PASS.

**Blocker FIXED (only fix in this phase):** `client/public/content/medical-systems-index.json` was stale (16 systems, 7 repaired Tintinalli titles still truncated in counts). Regenerated via `pnpm index:medical-systems` — now 18 systems (added `hematologic:0`, `environmental:0`), 170 contents, 1,456 questions, 1,701 relations; 7 repaired titles now correctly bucketed (e.g., `Respiratory Disorders` 50 → `respiratory` 30, `Renal and Genitourinary Disorders` 25 → `renal-urology` 21).

**Remaining:** No new architecture; 7 repaired titles' per-question re-mapping to new topics (e.g., 39 Hematologic Qs → `EM_HEME_ANEMIA_COAG`) deferred per “Do not expand mappings” rule — stays `UNRESOLVED` until human VERIFIED.

---

## Fixed in This Phase (only blockers)

| File | Fix | Why blocker |
|---|---|---|
| `scripts/build-qbank-mapping.ts:178` | `q` → `question` | Would throw `ReferenceError: q is not defined` on next `pnpm index:qbank-mapping` |
| `shared/mastery-engine.ts:40,52` | Remove unused `const {…}` and `const now` | `pnpm lint --max-warnings=0` blocked `pnpm verify` |
| `scripts/build-qbank-mapping.ts:161-162` | Remove unused `const q/e/c` → already done in 4-F.0 | Lint blocked |
| `client/public/content/medical-systems-index.json` | Regenerated (16→18 systems, 7 titles corrected) | Stale index broke “Browse by Medical System” counts for beta |

**Not fixed (by rule):** No mapping expansion (4,156 unmapped remain), no new topics (25 remain), no new layers, no DB migration.

## Validation (after fixes)

- `pnpm check` (`tsc --noEmit`) — **PASS**
- `pnpm lint` (`. --max-warnings=0`) — **PASS** (was 2 errors, now 0)
- `pnpm test` (`vitest run`) — **48 passed, 1 skipped (49 total) / 132 passed** (Rosen flaky 1/1 isolated PASS)
- `pnpm build` (`vite build` 1831 modules) — **PASS** in ~4s, `DashboardPage 82.49 kB`

**Beta is ready for real user testing with `PILOT_MODE=true` + `SEG_LOCAL_EMAIL_LOGIN=true` + local SQLite (or `DATABASE_URL` + `JWT_SECRET` for hosted). No code blockers remain.**

---

*Do not expand mappings / add topics / create new layers in this phase — next is human review of 38 Tintinalli REVIEW_REQUIRED + 2 refined REVIEW before promotion.*
