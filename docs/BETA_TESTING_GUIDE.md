# Beta Testing Guide

**Scope:** Real user testing of 7 flows with `PILOT_MODE=true` (local). No mapping expansion, no new topics, no architecture changes in this phase.

## 1. Test User Flow (15 min)

**Setup:** Follow `docs/BETA_ENV_SETUP.md` (PILOT_MODE, `pnpm dev` → `http://localhost:3000`).

**Flow 1 — Authentication:**
1. Open `/register` → select track, country, graduation year → submit → redirected to `/login`
2. Login with same email (local, no password in PILOT_MODE) → should land on `/dashboard` (My Home)
3. Refresh `/dashboard` → still authenticated (localStore)
4. Sign out → `/login` → verify `ProtectedRoute` redirects

**Flow 2 — Content Navigation:**
1. `/learn` → `Browse by Medical System` (17 systems, now `Hematology` + `Environmental` with 0 counts) → open `Cardiovascular` → verify `50 Rosen + 25 Tintinalli` topics, `HAS_QUESTIONS` links work
2. Open `Rosh` (12), `Tintinalli` (189), `Rosen` (626) readers → verify `HighYieldChapterMap` + `Book → Chapter Map → Topics → Content` + bilingual toggle

**Flow 3 — Qbank Practice:**
1. `/practice/create` → select FRCEM/Hippo/Rosen/Tintinalli/Oxford → create exam (5 Qs) → answer → submit
2. Verify `Practice` dashboard shows attempted/correct, `My Exams` lists exam, `Performance` shows accuracy
3. Create second exam with `section` filter → verify `sectionTitle` routing (`/learn?section=...`, `/practice/create?section=...`)

**Flow 4 — Answer Tracking:**
1. In practice exam, answer Q → `submitAnswer` → `recordResidentQuestionAttempt` (`family/chapterNumber/selectedAnswer/correct`) → verify `Recent Activity` shows `Correct: QUESTION_ID` or `Incorrect`
2. Refresh → history persists (localStore `qbankAttempts`)
3. Flag/skip per-question → verify `flagged` state in review

**Flow 5 — Mastery Calculation:**
1. Answer 5-10 Qs in one topic (e.g., `EM_CARDIO_ACS`) with 50% accuracy → check `MasteryOverview` (Weak Areas, Due Review) and `ReadinessIndexCard` (Board Readiness Index 0-100, `Green≥80/Yellow≥60/Red<60`)
2. Verify `TopicEvidenceCard` shows `Qbank 50% across 5 attempts` + `Review: Due` and `ErrorRecoveryCard` shows `Management Decision Error` (if critical-care) or `Knowledge Gap`
3. Check `mastery-engine` not claiming prediction — text is “not a prediction”

**Flow 6 — Study Plan Generation:**
1. `/pathway` → set `trainingLevel` (PGY-1..5, attending) → `StudyPlanSettings` (dailyHours 0.5-16, restDays, examDate) → Save → verify `TodayPlan` shows `LEARN (55/45/35)` / `PRACTICE` / `REVIEW` / `RECOVERY` (if weak area, 15% recovery)
2. Set `examDate` within 30 days → verify `calculateDailyAllocation` shifts +10 Practice from Learn
3. Set `restDays` to today → verify `TodayPlan` empty (rest day)

**Flow 7 — Dashboard Intelligence:**
1. `/dashboard` → verify order: `RoutingHeader` (Today’s routing, PGY label) → `ReadinessIndexCard` (Board Readiness Index, 5 bars, “not a prediction”) → `TopicEvidenceCard` + `ErrorRecoveryCard` (2-col grid) → `TodayPlan` (4 categories with `taskReasonFor` + `generateRecoveryActions` via props) → `MasteryOverview` (knowledge/weak/due) → `ProgressOverview`/`RecentActivity`/`QuickActions`
2. Verify no scoring in React (all via `study-plan-intelligence.ts` props)

## 2. Known Limitations (do not file as bugs for beta)

| Area | Limitation | Impact |
|---|---|---|
| **Qbank mapping** | 4,156/5,612 unmapped (74.1%); 752/827 summaries unmapped | 74% Qs appear via chapter, not `topicId`; `Weak Area` may miss those |
| **Truncated titles** | 7 Tintinalli `chapterTitle` repaired (211 Qs) but `qbank-topic-mapping` not yet re-run after repair for 5 titles (now fixed to `Respiratory Disorders`, etc.) — 211 now correctly bucketed, but per-question re-mapping to new topics (`EM_HEME` etc.) deferred per “no mapping expansion” rule | Browse counts now correct (18 systems), but 471 `UNRESOLVED` remain |
| **Topic Registry** | 22 → 25 topics (added `EM_HEME_ANEMIA_COAG`, `EM_DERM_RASH`, `EM_ENV_HEAT_COLD`), all `under-review` | New topics have 0 `HAS_QUESTIONS` until human review; `blueprintWeight.basis` is evidence-only (“not a blueprint claim”) |
| **Content** | All summaries `UNDER_REVIEW` (620/626 Rosen machine-translated) | Not a dosing protocol; verify against source PDF pages |
| **Performance** | `index 502 kB` chunk, `LCP 2.8-2.9s` | Code-split deferred |
| **Build** | `audit-final-package.mjs` external path diagnostic | Not a compile failure |

### 2.1 Beta Product Limitations — Full Review (Phase 5.3, 2026-09-15)

> Added per Phase 5.4. These are **expected pilot gaps** — not blockers. UI now marks placeholders visually (badge/tooltip “Pilot preview — coming soon”).

| # | Layer | Limitation | Where Marked | Impact on Tester |
|---|---|---|---|---|
| L1 | **Auth — social login** | `Google / Microsoft / Apple` buttons call `startLogin()` OAuth → will 404 in `PILOT_MODE=true` (no Manus key). Only **email flow** is supported in pilot | `LoginPage.tsx:99` — each button now `title="Pilot preview — OAuth disabled in local pilot, use Email"` + `aria-label="Pilot preview"` | Tester must use **Email Address** field; social buttons are visually marked as preview |
| L2 | **Auth — forgot password** | `Forgot password?` (`LoginPage.tsx:90`) is stub — shows toast “will be available in the next authentication phase” | Button now `title="Pilot preview — coming soon"` | No reset flow; do not file as bug |
| L3 | **Dashboard — EMERGENCY ACTION** | Red center button (`DashboardPage.tsx:419`) is decorative CTA, no `onClick` | Now `title="Pilot preview — coming soon"` + `aria-label="Pilot preview"` + badge | Tapping does nothing — expected |
| L4 | **Dashboard — QuickActions Atlas/Journal** | `Atlas (/atlas)` and `Medical Journal (/journal)` are stubs (no data yet). Other 4 actions (`Continue Learning`, `Create Exam`, `My Exams`, `Performance`) are fully wired | `DashboardPage.tsx:297-316` — Atlas/Journal links now carry badge `Pilot preview` + `title="Pilot preview — coming soon"` | Atlas/Journal open placeholder pages — do not file as bug |
| L5 | **Dashboard — View Profile / Your Role card** | `View Profile` button (`DashboardPage.tsx:436`) is visual only | Now marked `title="Pilot preview"` | No navigation — expected |
| L6 | **Dashboard — Progress ring** | `ProgressCard 68%` (`DashboardPage.tsx:136`) is static presentation value, not computed from `progress` | Card subtitle now shows pilot note (via tooltip) | Use `Practice Performance (attempted/correct/avg)` as real metric |
| L7 | **Dashboard — 3× MasteryOverview repetition** | `knowledge / weak / due` are 3 separate `MasteryOverview` blocks with same card style | Section headings already differentiate (“Knowledge · Weak Areas · Due Review”); guide clarifies distinction | Not a duplicate bug — 3 views of same mastery data |
| L8 | **Dashboard — RecentActivity sparsity** | Shows only Qbank attempts (`Correct: QUESTION_ID`); summary reading (chapters) does not appear | Not marked in UI — documented here | Tester who only reads summaries will see empty activity — expected |
| L9 | **Content — summary↔Qbank not cross-linked** | `HIGH_YIELD Chapter Map` does not link a summary unit to its matching Qbank questions (Qbank is `question→topic`, not `summary→question`) | Not in UI — documented | Must filter Qbank manually by `sectionId` |
| L10 | **Content — Medical Systems 0-count** | `Hematology` + `Environmental` (`MedicalSystemCard`) show `0 topics / 0 algorithms` until curated links exist | Cards show `0 — curated links pending` (index count 0) | Not an error — awaiting `layer.json` curation |
| L11 | **Qbank — filters empty-state** | `questionType: unused / incorrect / flagged / skipped` returns 0 before first attempt — no helper text | Not in UI — documented | Tester sees empty list — use `All` first |
| L12 | **Qbank — Hippo artifact** | Hippo 1,927 carries `correctAnswerKey=A` 100% (normalized artifact) — `incorrect` filter skewed until audit | Disclosed in `QBANK_SOURCE_COMPLETION_REPORT.md` | Pilot functional; audit before hosted scoring |
| L13 | **Weak Area — not topic-level yet** | `weak-area-engine.ts` (3 wrong → weak) not wired to dashboard repetition; `DashboardPage.tsx:388` `repeatedErrors:0` placeholder; weak areas derive from `mastery.weakest` **section-level**, not question-level | `ErrorRecoveryCard` already shows 5 error types from `classifyTopicError` as interim | 3 errors on one question may not surface until section accuracy drops |
| L14 | **Study Plan — 2-page flow** | `examDate ≤30d` +10 Practice shift requires setting date in `/pathway → StudyPlanSettings`, then viewing `/dashboard → TodayPlan` | Not in UI — documented | Not visible from dashboard alone |

**Placeholder contract for testers:** Any element with **badge `Pilot preview`** or tooltip **“Pilot preview — coming soon / OAuth disabled”** is intentionally non-functional. Do not file as bug; check this table first.

## 3. Feedback Checklist (per tester, per flow)

**Authentication (4):**
- [ ] Register with Jordan default + 2015 graduation year succeeds
- [ ] Login persists after refresh
- [ ] Protected `/dashboard` redirects when unauthenticated
- [ ] Sign out clears session

**Content Navigation (4):**
- [ ] Browse by Medical System shows 18 systems, `Hematology`/`Environmental` 0 counts, `Cardiovascular` 50+25
- [ ] Rosh/Tintinalli/Rosen readers paginate, `HighYieldChapterMap` collapses/expands, `Chapter Map` deep link works
- [ ] `TopicEnhancements` (Algorithm/Pearls/Tables) appear after Management in readers where mapped
- [ ] No dead PDF link (Tintinalli PDF not bundled → goes to Original Books Library)

**Qbank Practice (4):**
- [ ] Create exam by bank + section filter works
- [ ] Timer, flag, skip, per-question timing work
- [ ] Exam review shows correct answer + explanation
- [ ] `My Exams` resume/flag state persists

**Answer Tracking (3):**
- [ ] Recent Activity shows `Correct/Incorrect: QUESTION_ID` with time
- [ ] History survives reload
- [ ] Flagged questions appear in `Due Review`

**Mastery (4):**
- [ ] `MasteryOverview` weakest/due reflect actual weak chapter (e.g., 50% accuracy)
- [ ] `ReadinessIndexCard` shows 0-100 and band (Green/Yellow/Red) with 5 bars
- [ ] `TopicEvidenceCard` shows `Qbank 50% across 5` + `Review: Due`
- [ ] No “probability of passing” text

**Study Plan (4):**
- [ ] PGY-1 55/30/15 vs PGY-4 35/45/20 allocation visible
- [ ] Weak area (≥3 errors) adds `RECOVERY 92` row with `review` minutes split
- [ ] Exam ≤30 days shifts +10 Practice from Learn
- [ ] Rest day shows empty TodayPlan

**Dashboard Intelligence (4):**
- [ ] Board Readiness Index shows 5 evidence bars and “not a prediction”
- [ ] TopicEvidence + ErrorRecovery show 5 error types (Knowledge Gap, Concept, Management, Diagnostic, Interpretation) with severity/action
- [ ] TodayPlan shows `LEARN`/`PRACTICE`/`REVIEW`/`RECOVERY` with `taskReasonFor` reasons
- [ ] No scoring logic in React (all via `study-plan-intelligence` props)

**General (3):**
- [ ] Responsive at 320/390/768/1440 (Playwright axe)
- [ ] No patient data in logs/issues
- [ ] `GET /healthz` 200 when `pnpm start`

## 4. Reporting

File issues with: `questionId` (e.g., `tintinalli-9e-ch-06-q-0001`), `topicId` if shown, `chapterTitle` as stored, steps to reproduce, and `localStorageEnabled()` mode (`PILOT_MODE` true/false).

**Do not report:** 74% unmapped as bug (expected), truncated titles now fixed, `under-review` content, `502 kB` chunk.

---

*No application logic, mappings, or features modified in this phase. For env setup see `docs/BETA_ENV_SETUP.md`.*
