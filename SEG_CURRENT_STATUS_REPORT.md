# SEG Current Status Report

**Generated:** 2026-09-14 — read-only analysis of repository state. No files modified except this report.  
**Repo:** `smart-emergency-guide` — branch `main`, 1 initial commit (`154182e`), 380 untracked files, 30 modified files. `package.json: seg-phase1@1.0.0`

---

## 1. Current Project Architecture

**Stack:** React 19 + TypeScript 5.9 + Vite 7 + Tailwind 4 + wouter 3 + Radix UI + TanStack Query 5 + tRPC 11 + Framer Motion 12  
**Server:** Express 4 + `server/_core/trpc` + Drizzle ORM 0.45 + MySQL 8.4 (`mysql2`, `drizzle-kit 0.31`) — config `drizzle.config.ts`, migrations `drizzle/0002_*.sql` → `drizzle/meta/_journal.json`  
**Auth:** Manus OAuth (`OAUTH_SERVER_URL=https://oauth.manus.im`, `jose 6.1`), `JWT_SECRET`, email verification (`PILOT_MODE`), `express-rate-limit`, `helmet`  
**Build:** `vite build` (client → `dist/public`) + `esbuild server/_core/index.ts` (server → `dist/index.js`); `pnpm check` (`tsc --noEmit`), `pnpm lint` (eslint), `Vitest 3` (jsdom), `Playwright 1.62` (320/390/768/1440 + axe), `Lighthouse 13`  
**Desktop:** Electron 44 + `electron-builder 26` (`desktop/`, `electron-builder.json`)  
**Content roots:** `client/src/` (108 files), `server/` (27 files), `shared/` (3 files), `drizzle/` (6 files), `SEG_CONTENT_LIBRARY/` (canonical), `medical-content/` (graph + emergency-medicine layer), `docs/architecture/` (source of truth)

**Routes (`client/src/App.tsx`, `client/src/lib/seg-navigation.ts`):** `/`, `/register`, `/login`, `/verify-email`, `/dashboard` (protected), `/pathway`, `/learn` (+ `/books`, `/books/:bookId`, `/summaries`, `/summaries/rosh|tintinalli|rosen`, `/chapter/:chapterId`, `/unified-guide`, `/revision`, `/system/:systemId`), `/practice` (+ `/create`, `/exams`, `/performance`, `/settings`, `/exam-traps`), `/atlas`, `/journal`, `/account`, `/404`, `/laboratory`. Protected set + regex for `/practice/*` and `/learn/*` in `seg-navigation.ts`.

---

## 2. Completed Phases / Features

**Phase 1 — Visual Foundation (todo.md, all checked):** SEG dark-glass medical-tech design (Inter, #00D4FF/#0EA5E9, <300ms motion), Landing (`Home.tsx`), Registration (`RegisterPage.tsx` — Jordan default, 2015 graduation option), Login (`LoginPage.tsx` — SEG lockup + OAuth + redirect feedback), Dashboard/My Home (`DashboardPage.tsx` — Brain/Heart Core clean asset), glass-card components, Vitest + Playwright validation. Reports: `SEG_PHASE1_VISUAL_IMPLEMENTATION_REPORT.md`, `SEG_FINAL_VISUAL_GAP_CLOSURE_REPORT.md`.

**Phases 2–3 — Content & Clinical:** 50 resident chapters (32 FRCEM + 18 HIPPO), 45 unified summaries (`UNDER_REVIEW`), 204 unified-guide units, 5,612 Qbank records (5,590 retained / 22 exact-duplicate stems removed), 5 Qbank sources normalized, `RESIDENT_EMERGENCY_MEDICINE/normalized`, Rosh 12/12 + Tintinalli 189/189 + Rosen 626/626 summaries with bilingual drafts, `SEG Unified Guide` synthesis.

**Phases 7.x–8.x — Governance:** Medical-content governance (stable item + immutable revisions, provenance, append-only review), `MIGRATION 0007_resident_workspace.sql` → `0010_learning_item_progress.sql`, `learningItemProgress` (SQLite + MySQL `0010`), `revisionProgress` (Exam Traps), `studyPlan` (SQLite daily snapshots, Amman date).

**Recent Refactor (Dashboard):** `DashboardPage.tsx` 2005 → 410 lines via `components/dashboard/` (`ProgressOverview`, `MasteryOverview`, `TodayPlan`, `RecentActivity`), `components/training/` (`GrowthCore`, `CertificatesCard`), placeholder isolation (`lib/dashboard-placeholders.ts`), anchor preview sections removed (content lives in `/pathway`, `/learn`, `/practice`, `/atlas`, `/journal`).

---

## 3. Existing Intelligence Layers

### Knowledge Graph (`medical-content/knowledge-graph/`, mirrored to `medical-content/emergency-board/knowledge-graph/`)
- **Schemas:** `knowledge-graph.schema.json` (TOPIC/SOURCE/CONTENT/QUESTION nodes), `knowledge-graph-relations.json` (4 types), `knowledge-graph-index.json` (170 contents, 1,456 questions, 1,701 relations: `BELONGS_TO:170`, `CONTAINS:75`, `HAS_QUESTIONS:1,456`)
- **Registry:** `topic-registry.json` (22 topics, e.g. `EM_CARDIO_ACS` 8 cats: critical-care 3, cardiovascular 2, respiratory 4, trauma 2, neurology 2, GI 2, ID 1, endo 3, tox 1, OBGYN 1, peds 1) — mirrored to `emergency-board/topic-registry/topic-registry.json`
- **Source Registry:** `source-registry.json` (17 sources: 3 summaries FULL, 2 study-books PARTIAL, 1 synthesis PARTIAL, 1 enhancement PARTIAL, 5 Qbanks mixed, 5 PDFs reference-only) — `sourceMaturity: FULL|PARTIAL` + `mappingDepth: full|partial` + per-source `notes`
- **Mappings:** `content-topic-mapping.json` (95 layer nodes, High), `book-topic-mapping.json` (75, Rosen 50/Tintinalli 25/Rosh 0 after refinement), `qbank-topic-mapping.json` (5,612 entries, 1,456 mapped / 4,156 unmapped, High 901/Medium 555), `topicId-map.json` (75/827 summaries mapped)
- **Weak Area Engine:** `weak-area-engine.json` (pipeline + config `repeatedErrorThreshold:3`) — `shared/weak-area-engine.ts`
- **Tests:** `shared/knowledge-graph.test.ts` (6), `shared/topic-graph.test.ts` (7), `shared/qbank-registry.test.ts` (2)

### Study Plan Intelligence (`shared/study-plan-intelligence.ts`, 562 lines; `docs/architecture/STUDY_PLAN_INTELLIGENCE.md`)
- Extension layer over frozen `shared/study-plan-engine.ts` (31 lines, 6 IDs: `residency-year-1..4`, `jordan-board-part-1/2`, `buildStudyPlan()`).
- **Functions:** `calculateUrgency`, `calculateTopicPriority` (board×clinical×frequency + weakness + urgency), `calculateReadinessScore` (30/25/20/15/10) + `readinessBand` (Green ≥80/Yellow 60-79/Red <60), `generateRecoveryActions` (≥3 errors → RECOVERY 92, weak sections → REVIEW), `calculateDailyAllocation` + `baseAllocationForPlanId`, `classifyTopicError` (5 types, system-aware), `buildTopicEvidence`, `selectPriorityEvidence`, `taskReasonFor`, `calculateAdaptivePriority` + `generateAdaptiveTasks` (Mastery × Weak Area × Priority → PRACTICE/REVIEW/RECOVERY).
- **Tests:** `shared/study-plan-intelligence.test.ts` (12), `shared/study-plan-engine.test.ts` (2), `server/studyPlanEngine.test.ts` (4)

### Topic Intelligence
- **Unified Medical Learning Schema:** `shared/medical-learning-content.ts` (Zod) + `SEG_CONTENT_LIBRARY/unified-medical-learning.schema.json` + `medical-learning-content.test.ts` (6, covers 12/189/626 topics) — `Library → Books → Chapters → Topics → {fullOriginalSummary, arabicExplanations, highYieldPoints, diagnosis, management, algorithms, examPearls}`
- **High-Yield Chapter Map:** `client/src/lib/high-yield-chapter-map.ts` (17 clinical buckets, `highYieldSectionFor`, `buildHighYieldChapterMap`, `HIGH_YIELD_SECTION_TITLES`) — used by `HighYieldChapterMap.tsx` and `data/medical-systems.ts` (15 systems, `SECTION_TO_SYSTEM`, `MEDICAL_SYSTEMS_INDEX`)
- **Chapter Readers:** `RoshHighYieldSummaryPage.tsx` (12) / `TintinalliHighYieldSummaryPage.tsx` (189 bilingual) / `RosenHighYieldSummaryPage.tsx` (626) — unified `HighYieldChapterMap` + progress `learningProgress.current`

### MCQ Intelligence
- **Banks:** 5,612 Qs — Tintinalli 9e 756, Rosen 10e 1,044, FRCEM 1,529, Hippo 1,927, Oxford SCE 356 — `qbank-registry.json` (100% ID/stem/answer/explanation/chapter metadata, `governanceStatus: under-review`)
- **Topic Mapping:** `qbank-topic-mapping.json` — deterministic engine `scripts/build-qbank-mapping.ts` (priority: chapter → keywords → explanation; specificity order; never guesses; 25.9% mapped). Reports: `QBANK_REGISTRY_REPORT.md`, `QBANK_TOPIC_COVERAGE_REPORT.md`
- **Content Layer:** `medical-content/emergency-medicine/layer.json` (22 enhancements: algorithm + pearls + tables) → `algorithms/`, `exam-pearls/`, `tables/`, `mappings/` + runtime `client/public/content/global-enhancements-index.json`; `TopicEnhancements.tsx` injected after Management in readers

### Dashboard Intelligence (`client/src/components/dashboard/` + `client/src/pages/DashboardPage.tsx:410 lines`)
- **Types/Utils:** `types.ts` (MasterySection/Summary, DashboardPractice/Exam/Note/TrainingPlan) + `utils.ts` (`toArray`, `scorePercent`, `sectionTitle`, `formatActivityTime`)
- **Cards:** `ProgressOverview.tsx` (placeholder 72/65/58), `MasteryOverview.tsx` (knowledge/weak/due from single mastery object), `TodayPlan.tsx` (Upcoming Learning + Daily Plan + Recovery rows via `generateRecoveryActions`), `RecentActivity.tsx` (real Qbank/exam/journal, no static rows), `ReadinessIndexCard.tsx` (Board Readiness Index 0-100, High Priority Improvement/Yellow/Green, 5 evidence bars, “not a prediction”), `TopicEvidenceCard.tsx` (learning/Qbank/errors/review + priority), `ErrorRecoveryCard.tsx` (5 error types, severity, action), `readiness.ts` (`selectReadinessBreakdown` — coverage, Qbank, priority completion, revision, trend)
- **DashboardPage:** `HomeDashboard` (6.5.2.5s build) — `ReadinessIndexCard` (full width) + 2-col evidence grid + `TodayPlan`/`MasteryOverview`/`RecentActivity`/`QuickActions`/`PracticePerformanceCard`; anchor sections deleted, `GrowthCore` + `CertificatesCard` moved to `ResidentPathwayPage.tsx` (Training destination, no new route), `route protection` untouched.

---

## 4. Files Created in Last Changes (380 untracked)

**Knowledge/Content:** `SEG_CONTENT_LIBRARY/01_RECOVERY_SOURCE_ARTIFACTS/` + `02_PROCESSED_CONTENT/` (including 5 Qbank JSONL, 2 study-books, `SEG_UNIFIED_REVIEW_GUIDE/` 204 units), `client/public/content/` (summary-books 3×, `medical-systems-index.json`, `global-enhancements-index.json`), `client/public/study-books/` (5 reference PDFs), `medical-content/knowledge-graph/` (17 files) + mirror `medical-content/emergency-board/knowledge-graph/` (11 files) + `medical-content/emergency-medicine/` (layer + split views + mappings)

**Client:** `components/dashboard/` (6: ProgressOverview, MasteryOverview, TodayPlan, RecentActivity, ReadinessIndexCard, TopicEvidenceCard, ErrorRecoveryCard, readiness.ts, types.ts, utils.ts), `components/learn/` (MedicalSystemIcon, MedicalSystemCards, MedicalSystemCard, MedicalSystemsBrowser, SystemBookSelector, TopicEnhancements), `components/training/` (GrowthCore, CertificatesCard), `data/medical-systems.ts`, `lib/dashboard-placeholders.ts`, `lib/high-yield-chapter-map.*`, `pages/*` (9 new: Account, Atlas, ChapterReader, ExamTraps, HighYieldLibrary, MedicalJournal, MedicalSystemPage, QbankPortal, Resident* 3, StudyBookReader, etc.), `App.tsx` (+ lazy routes `/learn/system/:systemId`, `/practice/exam-traps`)

**Shared/Server:** `shared/medical-learning-content.*`, `shared/study-plan-intelligence.*`, `shared/mastery-engine.*`, `shared/weak-area-engine.*`, `shared/knowledge-graph.test.ts`, `shared/topic-graph.*`, `shared/qbank-registry.test.ts`, `shared/weak-area-engine.test.ts`, `drizzle/0002_*.sql` → `0010_*.sql` (learning_item_progress, trap-study-progress)

**Docs/Scripts:** `docs/architecture/` (19 files: `STUDY_PLAN_INTELLIGENCE.md`, `CALIBRATION_LAYER.md`, `KNOWLEDGE_GRAPH_ARCHITECTURE.md`, `QBANK_*`, `WEAK_AREA_*`, `SOURCE_MATURITY_UPDATE_REPORT.md`, `BOOK_MAPPING_REFINEMENT_REPORT.md`, `SEG_KNOWLEDGE_INTELLIGENCE_FINAL_REPORT.md`, etc.), `scripts/build-*.ts` (6: medical-systems, global-learning-layer, topic-graph, content-mapping, book-mapping, qbank-mapping), `shared/topic-graph.test.ts`, `desktop/`, `PROJECT_PROGRESS.md`, `NEXT_SESSION_HANDOFF.md`

---

## 5. Files Modified in Last Changes (30 tracked, diff >8k lines)

`.env.example`, `.gitignore`, `.gitlab-ci.yml`, `DEPLOYMENT.md`, `Dockerfile`, `README.md`, `client/index.html`, `client/src/App.tsx`, `client/src/components/DashboardLayout.*` (+ test), `client/src/components/ProtectedRoute.tsx`, `client/src/lib/seg-assets.ts`, `client/src/lib/seg-navigation.*` (+ test), `client/src/lib/seg-registration.*`, `client/src/pages/DashboardPage.*` (+ test, 2005→410 lines), `client/src/pages/Home.tsx`, `client/src/pages/LoginPage.*`, `client/src/pages/RegisterPage.*`, `drizzle.config.ts`, `drizzle/meta/_journal.json`, `drizzle/schema.ts` (+ 5 migrations), `package.json` (+ 6 `index:*` scripts), `pnpm-lock.yaml` (+6631 lines), `server/_core/*` (context, cookies, index, sdk, trpc), `server/db.ts` (localStore + 13 table handlers), `server/routers.ts` (studyPlan, qbank, journal, learningProgress), `todo.md`, `vite.config.ts`, `vitest.config.ts`

**Largest churn:** `pnpm-lock.yaml`, `DashboardPage.tsx` (-1,595 lines net), `server/routers.ts` (+742), `drizzle/schema.ts` (+417)

---

## 6. Current Test / Build Status (actual runs, 2026-09-14)

- **TypeScript:** `pnpm check` (`tsc --noEmit`) — **PASS** (no errors, 1826+ modules)
- **Lint:** `pnpm lint` (`eslint . --max-warnings=0`) — **2 errors** (both in `scripts/build-qbank-mapping.ts:161/162` — `e`/`c` unused vars matching `/^_/u`), otherwise clean
- **Tests:** `pnpm test` (`vitest run`) — **48 passed, 1 skipped (49 total)** — **132 passed, 2 skipped (134 total)** — duration ~7.6s. Suites: dashboard 6, knowledge-graph 6, topic-graph 7, study-plan-intelligence 12, mastery 4, weak-area 4, qbank-registry 2, medical-learning 6, etc. (`oauth.redirect.test.ts` logs expected `OAUTH_SERVER_URL` error but passes)
- **Build:** `pnpm build` (`vite build` 1831 modules + `esbuild server/_core/index.ts`) — **PASS**, built in 4.26s — `DashboardPage-Dvk0yUL9.js 82.49 kB`, `index 502.62 kB` (500 kB warning, unchanged), `dist/index.js 145.7 kB`
- **Verify:** `pnpm verify` = `lint && check && test && build` — currently blocked by 2 lint errors only

---

## 7. Remaining Unfinished Tasks

**Content & Clinical Review (highest priority):**
- 4,156 unmapped Qbank questions (74.1%) — require per-question clinical review or topic expansion beyond 22; 752 unmatched summaries (Rosh system chapters + FRCEM/Hippo/Oxford system-level units) remain unmapped by rule
- `EM_PEDS_FEVER` (6 Qs) / `EM_OBGYN_ECTOPIC` (14 Qs) — low coverage due to single-topic systems
- All medical content `UNDER_REVIEW` — 30/45 unified summaries lack high-yield, Diagnosis/Management/Algorithms/Tables fields incomplete, 7/45 positive page ranges; Arabic `machine-translated-under-review` (620/626 Rosen, 179/189 Tintinalli) needs clinical/editorial review before any clinical-use claim
- Missing official board blueprint — `boardWeight`/`blueprintWeight.basis` are editorial proxies, not measured board coverage; no guaranteed success claim supported

**Product & UX:**
- `Lighthouse LCP 2.8–2.9s` — target <2.5s not met; `index 502 kB` chunk → code-split `StudyBookReader`/Qbank portals
- `audit-final-package.mjs` — external path `webdev-static-assets/...` diagnostic (not compile failure)
- 2 skipped tests (`scripts/audit-final-package.test.ts`), 39 low/moderate `pnpm audit` findings for maintenance

**Technical Debt:**
- `pnpm lint` 2 errors to fix (`scripts/build-qbank-mapping.ts` unused `e`/`c`)
- No migration executed during delivery (per `SEG Final Delivery Manifest.md`); `drizzle/` migrations present but not applied in this build

---

## 8. Recommended Next Development Phase

**Phase 4-F.5 — Clinical Review & Coverage Closure (2–3 sprints, no new architecture)**

1. **Fix lint** (`e`/`c` → `_e`/`_c` or remove) → `pnpm verify` green; address 39 audit findings triaged as low/moderate.
2. **Per-question clinical review queue:** start with highest-yield unmapped topics (GI, Critical Care, Respiratory) — expand `topics.json` only with qualified reviewer sign-off, then re-run `pnpm index:qbank-mapping` + `pnpm index:topic-graph`; target mapped 1,456 → 2,800 (50%).
3. **Topic-level decomposition for FRCEM/Hippo system chapters** (32+18) — create `chapter → topic` curation file, then incremental `book-topic-mapping` (never invent missing chapters).
4. **Board blueprint proxy calibration:** run `CALIBRATION_LAYER.md` — compare `Board Readiness Index` vs. mock exam outcomes, adjust thresholds (`repeatedErrorThreshold:3`, `accuracyThreshold:70`, bands 60/80) only with paired data + review note.
5. **Performance:** code-split `index` chunk (dynamic `import()` for `StudyBookReaderPage`, `QbankPortalPage`, `MedicalJournalPage`) + re-run Lighthouse on clean server (with `client/index.html` inline critical CSS) to hit LCP <2.5s.

**Do not start:** new routes, Training page creation, GrowthCore data invention, or DB migrations — keep additive, review-gated changes only.

---

*Evidence: `git diff --stat` (30 modified, 380 untracked), `pnpm test` (48/132), `pnpm build` (1831 modules), `shared/*` + `medical-content/*` file inventory above, `docs/architecture/*` 19 files.*
