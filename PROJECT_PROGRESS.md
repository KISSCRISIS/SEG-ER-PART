# SEG Project Progress

Last updated: 2026-09-13

## Rosen High-Yield Arabic completion (2026-09-13)

- Completed Arabic translation and explanatory text for all **626/626** source-indexed Rosen & Barkin high-yield topics. The app-facing output is regenerated at `client/public/content/summary-books/rosen-high-yield.json`.
- Breakdown: 6 existing bilingual editorial drafts retained; 620 source-linked local machine translations are explicitly marked `machine-translated-under-review`. No topic is represented as clinically approved.
- Hardened the resumable offline translation script: it preserves completed records after an interruption, uses a safe serial default on Windows, and preserves an untranslated isolated term with an explicit Arabic source-label rather than inventing a clinical equivalent.
- Verification: Rosen data/source/UI tests passed (**10 tests**) and `pnpm check` passed.

## Saved checkpoint for next session

## Latest Qbank correction (2026-09-09)

- Re-audited all five resident question-bank sources: **5,612 records**.
- Filled missing FRCEM/HIPPO English explanation fields with source-derived, clearly marked placeholders (`source-derived-placeholder-under-review`); no clinical content was invented.
- Generated local Arabic explanations for Oxford, Rosen, and Tintinalli from their existing English explanations. Non-Arabic output was replaced with a safe Arabic fallback marked `arabic-fallback-under-review`.
- Current structural audit: **0 missing stems, 0 records with fewer than 3 options, 0 missing answers, 0 missing English explanations, 0 missing Arabic explanations, 0 duplicate IDs**.
- Canonical normalized output regenerated: **5,590 retained / 22 exact duplicate-stem candidates removed**. The source JSONL files are retained and now carry the repaired explanation fields plus their original provenance metadata.
- Arabic explanations and English placeholders remain `under-review`; they are not clinical approval or board accreditation.

## Full medical-content audit (2026-09-09)

- Resident study chapters present: **50** (32 FRCEM, 18 HIPPO), all with non-empty bilingual study text.
- Structured unified summaries present: **45**, all `UNDER_REVIEW`.
- Extraction/editorial queue: **204 units**; none currently match the 45 summary IDs (the queue is therefore not yet populated into editorial units).
- In the 45 summaries, Arabic explanations, references, and page objects are present; **30 lack a high-yield summary**, and all 45 still lack structured Diagnosis, Management, Algorithms, and Tables fields. Only **7/45** have valid positive page ranges.
- Detailed machine-readable and Markdown audit saved at `reports/medical-content/full-audit.json` and `reports/medical-content/full-audit.md`.
- No medical text was invented or silently promoted; missing fields are recorded as editorial work, with status remaining `UNDER_REVIEW`.
- Built `SEG_UNIFIED_REVIEW_GUIDE/unified-medical-units.jsonl` containing all **204** queued units. Each unit now has source-grounded excerpts mapped to the required fields, provenance, page range, Arabic editorial placeholder, and `UNDER_REVIEW` status. These are extraction-based drafts and still require clinical/editorial review.

## Medical books audit (2026-09-09)

- Tintinalli Manual 8e: 1,089/1,089 pages extracted; 189/189 chapters detected; 1 empty page and 23 short-text pages flagged.
- Rosh Review Rotation 2019: 555/555 pages extracted; 12 chapters indexed; 313 short-text pages flagged for OCR/layout review.
- Rosen & Barkin 5-Minute 5e: 1,335/1,335 pages extracted; repaired OCR heading index now contains 859 topic headings. It remains under-review and must be checked against the printed topical table of contents.
- All manifests have valid SHA-256 values, remain `under-review`, and have `jordanBoardApproval: not-verified`.
- Owner approval recorded on all three book manifests as `approved-for-private-pilot-use` with `usageScope: private-pilot`; clinical review status remains unchanged.
- Book audit saved at `reports/medical-books/full-audit.md` and `reports/medical-books/full-audit.json`.
- First-book pass completed for Rosh: `ROSH_ROTATION_2019/chapter-summaries.json` now contains 12 page-linked chapter drafts with source excerpts, structured sections, provenance, Arabic end-of-chapter notes, and `UNDER_REVIEW` status.
- Architecture decision: original Rosh/Tintinalli/Rosen PDFs remain standalone reference books. Their summaries are separate Learn study materials (parallel to FRCEM/HIPPO High-Yield), never replacements or overwrites of the originals.
- Rosh summary is now linked in Learn at `/learn/summaries/rosh-high-yield`; the 12-chapter JSON is served from `client/public/content/summary-books/rosh-high-yield.json`. Original PDF card remains separate.
- Tintinalli summary pass completed: 189 page-linked chapter drafts generated at `TINTINALLI_MANUAL_8E/chapter-summaries.json`, copied to `client/public/content/summary-books/tintinalli-high-yield.json`, and linked in Learn at `/learn/summaries/tintinalli-high-yield` as a separate study material.
- Rosen & Barkin summary pass completed: 859 page-linked topic drafts generated at `ROSEN_BARKIN_5MIN/topic-summaries.json`, copied to `client/public/content/summary-books/rosen-high-yield.json`, and linked in Learn at `/learn/summaries/rosen-high-yield` as a separate study material.

## Full application audit (2026-09-09)

- `pnpm lint`: passed.
- `pnpm check` (TypeScript): passed.
- `pnpm test`: passed — 59 tests, 2 skipped.
- Production build: passed.
- Repository hygiene audit: passed.
- Resident Qbank audit: passed — 5,612 records, no structural missing fields or duplicate IDs.
- Medical content/books audits regenerated successfully.
- Dependency audit: no high-severity vulnerabilities reported; 39 low/moderate findings remain for maintenance review.
- `audit-final-package.mjs` is currently blocked because it expects the missing external path `webdev-static-assets/SEG_FINAL_PACKAGE/assets_manifest.json`; this is an audit-tool/path mismatch, not a compile failure.
- Hardened `audit-final-package.mjs` to fail gracefully with a local diagnostic report when the external package root is absent, instead of throwing an unhandled ENOENT.
- Playwright UI/accessibility suite passed: **13/13** at 320/390/768/1440 plus axe authentication-surface checks.
- Lighthouse completed for landing/login/register: performance scores **0.93 / 0.92 / 0.86**, accessibility **1.00** on all three; LCP about **2.8–2.9s**, so the <2.5s target is not yet met on the local run.
- MySQL backup rehearsal succeeded: `backups/seg-20260909-173002.sql` with SHA-256 recorded in the command output.
- Added `pnpm verify` as the unambiguous CI-equivalent command (lint + TypeScript + tests + build); it completed successfully in the latest run.
- Added minimal critical inline CSS in `client/index.html` to paint the dark shell immediately while the main stylesheet loads; TypeScript and production build remain successful. Lighthouse should be rerun against a clean server for the measured impact.
- Added a direct "Choose a book or summary" picker at the top of Learn; it opens FRCEM, HIPPO, Rosh, Tintinalli, Rosen summaries, or scrolls to the original reference library. TypeScript and ESLint pass after this change.
- Local pilot email verification is now disabled when `PILOT_MODE=true`: new accounts are auto-verified, existing unverified pilot accounts can sign in and are marked verified, and registration routes directly to sign-in. The verification flow remains available for re-enabling by setting `PILOT_MODE=false`.

Work remains in the working tree; no Git commit or remote push was made. See `NEXT_SESSION_HANDOFF.md` for the ordered backlog and corrections to earlier progress claims.

- Latest engine fixes enforce the daily time budget, respect rest days, and reject invalid daily hours.
- Hosted study-plan save now throws instead of returning success without persistence.
- Verified: `node node_modules/vitest/vitest.mjs run server/studyPlanEngine.test.ts` — 3 tests passed.
- Earlier 48-test runs did NOT include `shared/study-plan-engine.test.ts`; the Vitest include pattern excludes shared tests. Full TypeScript/build checks have not been rerun after the latest fixes.
- Declaring a canonical root does not yet enforce runtime reads from it. Normalized Qbank output is not yet wired into the runtime loader.
- Medical summary counts do not establish completion of outline units. Empty fields, unknown page locators, and source matching remain unresolved.
- Latest resident Qbank QA report (`reports/resident-qbank/qa-report.md`) confirms 5,612 questions with no missing stems/options/answers, explanation fields, or duplicate IDs. Explanation quality and clinical review remain outstanding.

## Completed in this run

- Audited repository structure, runtime, database layers, and content library.
- Confirmed canonical content root is `SEG_CONTENT_LIBRARY`.
- Confirmed 204 outline units and source page locators.
- Added `docs/reports/CURRENT_STATE_AUDIT.md`.
- Existing source excerpt and editorial queue artifacts retained.
- Normalized all 9 summary batches to the unified medical-unit schema (summary, diagnosis, management, algorithms, tables, pearls, traps, Arabic explanation, references, pages, and review status).
- Populated the first three medical units with structured diagnosis, management, algorithms, and tables fields.
- Audited 5 question-bank JSONL sources: 5,612 records total; 38 duplicate records detected; HIPPO has 1,921 records missing required normalized fields and requires repair.
- Normalized all 5 question banks into `RESIDENT_EMERGENCY_MEDICINE/normalized` with canonical IDs, answer-key inference, provenance, and 22 duplicate records removed (5,590 retained).
- Added `shared/study-plan-engine.ts`: six plan IDs, progress/readiness calculation, and daily Learn/Qbank/Atlas/Journal tasks with board-coverage disclaimer.
- Added protected `studyPlan.current`/`studyPlan.save` procedures backed by local SQLite and surfaced saved-plan status in My Pathway.
- Added automated coverage test for the study-plan engine; full Vitest suite remains green (48 passed, 2 skipped).

## In progress

- Reduced initial client chunk by lazy-loading Home and NotFound; production build main chunk decreased from ~526KB to ~496KB and is now below Vite's 500KB advisory threshold.

- Full TypeScript check and production client/server build passed after latest reader, plan, and API changes. Existing advisory remains: main client chunk is ~526KB and should be code-split before public release.

- Playwright browser test passed against the production bundle using an isolated temporary SQLite directory and port 3027: local login, save 1.5-hour plan, mark task done, reload, verify settings and completion persist. No user database touched.
- Added playwright.study.config.ts and tests/study/plan.spec.ts. Temporary test data retained in OS temp; this is not a backup of user data.

- Added real router-caller integration tests backed by isolated in-memory SQLite. Verified unauthenticated rejection, impossible exam dates, user isolation, assigned-task completion, rejection of unassigned dates, and fixed same-day snapshots after settings changes (3 tests passed).
- TypeScript and server bundle build passed after integration tests. Tests do not touch user databases. Browser/UI verification remains pending.

- Task completion now checks that the user's saved daily snapshot actually contains the task. Completion mutation rejects impossible dates.
- Exam-day cutoff tested before/on/after the exam; 8 targeted engine/calendar tests passed, TypeScript passed, Vite client build passed (existing >500KB bundle warning remains).
- Server bundle and browser end-to-end checks remain pending; assignment enforcement needs dedicated API/storage integration coverage.

- Added a seven-day available-time preview with rest days and exam cutoff. This is a capacity preview, not a completed weekly content scheduler.
- Exam-date input rejects impossible calendar dates; calendar tests cover leap dates and month boundaries (2 passed), and TypeScript passed.
- New daily task generation now stops at the exam date. Existing saved snapshots remain preserved.

- Daily plan snapshots now persist in SQLite by user, Amman date and plan ID; the UI uses saved targets rather than recomputing them from changing progress. Future dates use updated settings. Changing the plan type selects a separate daily snapshot.
- Added snapshot restoration/user-isolation assertions to LocalStore tests. Full browser/API concurrency validation remains outstanding.

- Plan progress now returns the next incomplete chapter and a practice section based on weak chapters when mapped. Daily task links use these targets, and Learn supports family/chapter filters with a return-to-all link.
- TypeScript passed for this change; browser behavior and dated task snapshot stability still need validation. Targets can change as source progress updates.

### Verified checkpoint — study plan tests

- Vitest now includes shared tests; corrected the stale daily-task expectation and fixed its date for reproducibility.
- Six targeted tests passed across the shared engine, schedule constraints, and SQLite store.
- Extended SQLite reopening test verifies plan persistence, separate daily checklist records, and user isolation; rerun passed.
- TypeScript passed after these changes. Browser/API end-to-end validation and the broader release checklist remain incomplete.

- Study plan settings UI now supports six plans, hours, exam date and rest days with save/load feedback.
- Plan API now derives reading completion, attempt totals and weak chapters from authenticated database records on read/save; client-supplied progress is stripped by the input schema.
- Latest verification: TypeScript passed. Browser verification, task completion persistence, Atlas/Journal activity and dated scheduling remain pending.

- Semantic reconciliation of editorial summaries to book chapters.
- Completion of source-grounded unit summaries.
- Study-plan runtime integration and persistence.

## Remaining

- Complete the 204-unit medical editorial set and clinical review.
- Finish Qbank normalization, deduplication, and permanent attempt state.
- Integrate six study plans with real progress and daily task generation.
- Complete Atlas/Journal linking and final backup-restore rehearsal.
- Run final UI, accessibility, performance, and security audits.

## Decisions

- Original Books Library and Revision Tools now follow the summary-library entry flow: Learn shows one card for each; protected `/learn/books` lists existing PDFs and `/learn/revision` offers Flashcards, Exam Traps and Topic Family Index. The top Original books shortcut also opens the book library.
- Removed inline book/revision lists and their data requests from Learn home. Existing PDF, summary and trap routes remain unchanged. Flashcards use the existing API with search/pagination; topics open on selection. TypeScript and ESLint passed.

- High-Yield Summaries in Study Library is now a single entry card linking to protected `/learn/summaries`; its Rosh, Tintinalli and Rosen cards moved to HighYieldLibraryPage. Existing summary reader routes are preserved. TypeScript passed.

- Learn completion now uses authenticated residentStudyProgress rows directly (no saved study plan required): explicit completed chapters / 50 mapped FRCEM+HIPPO chapters. Source completion uses those same rows; page position never counts as completion. Sources without chapter-completion records no longer display fabricated percentages.
- Added ChapterCompletion confirmation/undo in the chapter reader and context-linked PDF reader; API rejects nonexistent chapters. Chapter reader displays existing bilingual source content. Last activity records exact chapter ID when available; direct PDF reads display book identity without guessing chapter 1. Page/last activity storage is now scoped to the signed-in user; legacy global browser records remain untouched and unassigned.
- Last page is a browser-local resume position, while confirmed chapter completion persists in SQLite/MySQL using the existing schema. No migration required. Exam Traps remains a separate revision requirement.

- Reconciled 221 Exam Traps lacking source fields through exact topicId + text matches to recovered flashcards. Audit evidence: reports/exam-traps-source-audit.json. Source labels preserve chapter/batch information and uncertainty markers; no book editions/pages inferred.
- Fixed incorrect Arabic joins on undefined referenceId. 200 topic-linked Arabic explanations resolved directly; the final 21 derived records match existing reference traps exactly and reuse their translations. All 415 now pass nonempty Arabic and source checks; original IDs/order and completion records remain unchanged.
- Added normalization regressions covering undefined IDs, conflicting sources and coverage. 63 tests passed; 2 existing skips. This is source metadata reconciliation, not clinical validation.

- Fixed Exam Traps progress failure in MySQL mode. Runtime logs confirmed the old SQLite-only guard rejected `revisionProgress.current`. Added dual storage adapter (`trapProgressStorage.ts`) and additive `trapStudyProgress` MySQL table; applied `scripts/migrations/trap-study-progress.sql` successfully. Existing SQLite data is unchanged.
- MySQL validation: transaction-scoped write/read, user isolation and undo passed; probe rolled back. TypeScript, ESLint and 61 tests passed (2 existing skips). Browser imports preserve existing server-side undo.

- Exam Traps understanding now persists per authenticated user in the existing SQLite workspace collection `trapProgress`, with idempotent set/undo and validated trap IDs. No schema migration is needed for the local workspace document store.
- Exam Traps and My Pathway share a live revision requirement card: completed/total, remaining, percentage, and resume link. Completion of all catalog traps completes this revision requirement; Qbank scores and unrelated daily tasks are unchanged.
- Existing user-scoped browser marks import on first view without overriding an explicit database undo. Hosted/MySQL revision persistence is not implemented; the API reports the unsupported storage mode instead of silently losing progress.
- Validation: TypeScript, ESLint, production build; 61 tests passed, 2 skipped, including authenticated trap validation, account isolation, repeat completion and undo/import tests.

- Learn home reorganized with a single source-card grid, Continue Learning panel, and explicit progress placeholder; source picker duplication removed while preserving direct routes.
- Learn source cards now show content type and chapter/topic counts; mapped chapter cards include Atlas and Notes actions while preserving existing mappings.
- Learn Dashboard now uses a single source-card grid, data-derived Continue Learning (saved page), progress indicator, and mapped Chapter Reader route (`/learn/chapter/:chapterId`) with Read Chapter actions.
- Learn progress now consumes `studyPlan.current` for completed/total chapters and Qbank attempts; library groups are labeled Unified Guide, High-Yield Summaries, and Original Books, and the administrative review queue is removed from Learn.
- Final Learn pass adds persisted last-activity tracking from StudyBookReader, source progress indicators, dynamic Continue Learning, and data-backed Chapter Reader metadata; administrative review content remains excluded from the user view.
- Mapped Study Chapters is now collapsed by default with Browse chapters, Practice, and View pathway shortcuts to reduce Learn home density; full cards expand on demand.
- Added dedicated `/practice/exam-traps` page so Learn's Open Exam Traps action no longer opens the mixed Qbank dashboard.
- Learn presentation now exposes direct source cards for all summaries and original books; the `Original books` shortcut targets the Study Library section.

- Rosh and Tintinalli summaries now use schema v2 source-grounded outputs with front matter excluded (Rosh PDF pages 1–10; Tintinalli PDF pages 1–19). Chapter names are taken from the supplied intake boundaries/source headings, repeated copyright/running-header text is removed, and cited PDF page ranges remain available.
- Rosh/Tintinalli summary pages now paginate ten chapters at a time, support loading/error/retry states, and clearly label the Arabic field as pending editorial translation instead of presenting a generic sentence as a completed medical translation.
- Rosen summary generation now separates embedded source chapter IDs from its legacy 859 OCR headings. Six bilingual editorial drafts contain separate English summary, Arabic translation, and expanded Arabic explanation; 620 source chapters remain explicitly pending editorial work. Legacy OCR output is preserved as `topic-summaries.legacy-ocr.json`.
- Validation for this pass: source-summary and Rosen provenance tests passed (8 tests); TypeScript passed; focused ESLint passed; Vite production build passed. The build still reports the pre-existing main-chunk size warning (~501 kB).
- Tintinalli’s original PDF is not bundled in `client/public/study-books` in this workspace; its summary therefore links to the existing Original Books Library rather than a dead PDF URL. The preserved PDF page numbers remain in every chapter record.
- Rosh now includes Arabic translation-style summaries and expanded plain-language explanations for all 12 chapters, stored with `arabicExplanationStatus: bilingual-draft` and still marked `UNDER_REVIEW`; the text is educational, not a dosing protocol.
- Rosh Arabic pass verified: 12/12 chapters contain separate Arabic translation-style summary sections and expanded explanations (~9,920 Arabic characters total); source pages and `UNDER_REVIEW` provenance remain intact.
- Tintinalli Arabic pass completed for all 189/189 summary chapters. The first 10 user-supplied editorial summaries were preserved; the remaining 179 were translated locally from the extracted English SEG summary/diagnosis/management fields only. Every record retains source pages, a source-text hash/provenance entry, and `machine-translated-under-review` status; no new clinical claims were intentionally introduced.
- Added a resumable offline translation pipeline (`scripts/translate-tintinalli-offline.py`) with five-chapter checkpoints, then regenerated the canonical and public Tintinalli summary outputs. Verification found 189 unique IDs, 189 Arabic records, and zero pending chapters. TypeScript, focused ESLint, source-summary tests (3/3), and production build passed; the existing ~501 kB chunk warning remains.
- Rebuilt the Tintinalli summary screen as a single-chapter bilingual reader: live-search sidebar, keyword-based medical section grouping, previous/next navigation, English/Arabic/side-by-side modes, browser-persisted read checkmarks and progress, deep-linked chapter selection, and distinct High-Yield/Diagnosis/Management cards. It uses the existing 189-chapter source file and route; no medical content or route was invented. TypeScript, focused ESLint, source-summary tests, and production build passed.
- Added authenticated, pathway-agnostic `learningItemProgress` storage keyed by user, professional track, content type, and stable content ID. Local mode persists to SQLite; hosted MySQL uses additive migration `0010_learning_item_progress.sql`. Completion is account-isolated, reversible, and invalidates Study Plan progress.
- Unified the Arabic `فهمت هذه النقطة ✓` interaction across Tintinalli, Rosh, clinically edited Rosen summaries, the SEG Unified Guide, FRCEM/HIPPO chapters, and existing Exam Traps. Resident plan completion now combines mapped chapters, four registered learning collections, and Exam Traps (924 current requirements) without treating Qbank correctness as a reading completion. The generic model accepts future tracks such as Emergency Nursing without mixing accounts or content IDs; nursing content still needs its own registered catalog before it can contribute a denominator.
- Validation: TypeScript and focused ESLint passed; 9 focused progress/content tests passed, including authentication, account isolation, idempotent completion, and undo; production build passed. Existing main-chunk warning remains (~501.62 kB).

- No source PDF is deleted or overwritten.
- Medical content remains `UNDER_REVIEW` until a qualified review is recorded.
- Missing official board blueprint is documented, not inferred.
