# SEG COMPLETE PROJECT INVENTORY REPORT

> Generated: 2026-09-25 · Project root: `D:\final alaa seg\المرفوع نهائي\smart-emergency-guide`
> Read-only audit — no files were modified during this inventory.

---

## A. Executive Summary

**JEM Nexus (SEG — Smart Emergency Guide / Jordan Emergency Medicine Nexus)** is a responsive medical-education platform built with **React 19 + TypeScript + Vite 7** (frontend), **Express + tRPC 11 + Drizzle ORM + MySQL 8.4** (backend), packaged optionally as an **Electron desktop app**.

| Metric | Value |
|---|---|
| Git repository | 1 (origin: `KISSCRISIS/seg-end-august`), branch `main`, 2 commits |
| Second remote | `seg-er-part` → `KISSCRISIS/SEG-ER-PART.git` (no submodule) |
| Working tree | 41 modified, 278 untracked, 0 staged |
| Frontend source files | ~205 (`client/`), 32 pages, 53 ui components |
| Backend source files | ~54 (`server/`), 17 DB tables |
| Shared modules | 24 (engines, registries, types) |
| Unit tests | 48 (`*.test.ts`) + 2 Playwright specs |
| Qbanks (registered) | 9 · **14,460 questions** total |
| Question records on disk | 9,825 (source JSONL) + 14,455 (normalized JSONL) |
| Arabic explanation coverage | **EDIC 100% (995/995)** — recently completed; ROSH 0% |
| Content library size | ~158 MB (`SEG_CONTENT_LIBRARY/`) + ~5 MB (`medical-content/`) |
| Documentation | 117 root `.md` + 123 in `docs/` + 421 files in `reports/` |
| Package manager | pnpm 11.10 (workspace), Node 22 |

**Most significant pending work**: the normalized EDIC Qbank file is stale (753/995 records, `ExplanationAR` empty) while the source file is fully Arabic-annotated (995/995). See Section K.

---

## B. Folder Tree

```
smart-emergency-guide/
├── client/                  205 files   React frontend (src: pages, components, ui, lib…)
│   ├── public/
│   └── src/
│       ├── components/       23 (+ dashboard 14, laboratory 4, learn 6, training 2, ui 53)
│       ├── contexts/          2
│       ├── data/              4
│       ├── hooks/             4
│       ├── lib/              16
│       ├── pages/            32 (13 test files)
│       └── _core/hooks/
├── server/                   54 files   Express + tRPC backend
│   ├── _core/                (trpc, auth, cookies, email, oauth, llm, storage, vite…)
│   └── *.test.ts             (20 unit test files)
├── shared/                   24 files   Shared engines & types (+ tests)
├── schemas/                   5 files   SEG_CONTENT_RECORD_V1_1/
├── drizzle/                  24 files   schema.ts, migrations, meta
├── scripts/                  82 files   49 .mjs + 9 .ts (+ lib/, migrations/, mrcem-sample/)
├── tests/                     2 files   study/plan.spec.ts, ui/responsive-accessibility.spec.ts
├── docs/                    125 files   architecture(36), SEG-CONTENT(68), reports(10), governance(6), operations(3)
├── reports/                 421 files   QA evidence, lighthouse, playwright, release evidence
├── SEG_CONTENT_LIBRARY/       88 files   158 MB — processed medical content (see §E)
├── medical-content/          52 files   5 MB — knowledge graph, qbank mapping, registries
├── ED_REVIEW_BOOK/           96 files   generated review book (book/, build/, work/)
├── RECOVERY_HANDOFF/        120 files   legacy recovery artifacts
├── SEG_PROJECT_CONTINUITY_PACKAGE/ 50 files
├── SEG_UI_PATCH1_EVIDENCE/   41 files
├── SEG_VISUAL_PRODUCTION_EVIDENCE/  4 files
├── phase_7_8_10_updated_source_intake/ 14 files
├── phase_7_8_6_evidence_package/        6 files
├── dist/                    212 files   built frontend/server bundle
├── release/                  71 files   Electron win-unpacked
├── desktop/                   2 files   Electron main
├── backups/, local-data/, patches/
├── .local-py/             28,843 files  local Python env (gitignored)
├── node_modules/         55,872 files  (gitignored)
├── ~117 root .md files, ~33 root .py analysis scripts, ~21 root edic-*.jsonl working files
└── config: package.json, vite/vitest/playwright/tsconfig/eslint/drizzle configs,
    Dockerfile, .gitlab-ci.yml, electron-builder.json, pnpm-workspace.yaml
```

**File counts per main directory** (excluding `node_modules`, `.local-py`):

| Directory | Files | Directory | Files |
|---|---:|---|---:|
| client | 205 | docs | 125 |
| server | 54 | reports | 421 |
| shared | 24 | SEG_CONTENT_LIBRARY | 88 |
| scripts | 82 | medical-content | 52 |
| drizzle | 24 | ED_REVIEW_BOOK | 96 |
| schemas | 5 | RECOVERY_HANDOFF | 120 |
| tests | 2 | dist / release | 212 / 71 |

---

## C. Frontend Architecture

**Framework**: React 19.2 + TypeScript 5.9, bundled by Vite 7.3, styled with **Tailwind CSS 4** + Radix UI (shadcn-style `components.json`), animations via framer-motion, charts via recharts.

**Routing**: `wouter` (declarative `<Route>` in `client/src/App.tsx`), route constants in `client/src/lib/seg-navigation.ts`, protected routes wrapped by `client/src/components/ProtectedRoute.tsx`.

**Main pages (32)** — grouped:

| Area | Pages |
|---|---|
| Auth/landing | `Home`, `LoginPage`, `RegisterPage`, `VerifyEmailPage`, `NotFound`, `ComponentShowcase` |
| Core | `DashboardPage`, `AccountPage` |
| Learn | `ResidentLearnPage`, `ChapterReaderPage`, `StudyBookReaderPage`, `OriginalBooksLibraryPage`, `UnifiedGuidePage`, `HighYieldLibraryPage`, `RosenHighYieldSummaryPage`, `RoshHighYieldSummaryPage`, `TintinalliHighYieldSummaryPage`, `RevisionToolsPage`, `ResidentPathwayPage` |
| Practice | `ResidentPracticePage`, `QbankPortalPage`, `ExamTrapsPage`, `AtlasPage` |
| Reference | `MedicalJournalPage`, `MedicalSystemPage`, `LaboratoryPage` |

**Components**: 23 top-level + `dashboard/` (14), `laboratory/`, `learn/`, `training/`, `ui/` (53 Radix-based primitives), `contexts/` (2), `hooks/` (4), `lib/` (16: navigation, registration, assets, grading helpers), `data/` (4).

**Assets**: `client/public/`; asset registry in `client/src/lib/seg-assets.ts`. *(Vitest alias `@assets → attached_assets` points to a directory that does not exist — see §K.)*

---

## D. Backend Architecture

**Server**: Express 4 + tRPC 11 (`server/_core/trpc.ts`), entry `server/_core/index.ts`, dev orchestration `scripts/start-development.mjs`, production `scripts/start-production.mjs` (esbuild-bundled to `dist/`).

**Routers** (`server/routers.ts`): `learningProgress`, `revisionProgress`, `studyPlan`, `account`, `qbank`, `journalNotes`, `library`, `residentContent`, plus `systemRouter` (`server/_core/systemRouter.ts`).

**Service modules**: `residentContent.ts` (question selection/grading/performance), `recoveryLibrary.ts` (references, flashcards, exam traps, OSCE), `medicalContentGovernance.ts`, `trapProgress(+Storage)`, `normalizeExamTraps`, `examTrapArabic`, `localStore`, `storage`.

**Database**: Drizzle ORM → MySQL (`drizzle.config.ts`, dialect `mysql`, `DATABASE_URL`). 17 tables in `drizzle/schema.ts`:
`users`, `emailCredentials`, `emailVerificationCodes`, `learningProfiles`, `learningItemProgress`, `residentStudyProgress`, `residentQuestionAttempts`, `qbankExams`, `qbankQuestionStates`, `trapStudyProgress`, `medicalContentItems`, `medicalContentRevisions`, `medicalSources`, `medicalRevisionSources`, `medicalClinicalReviews`, `medicalJournalNotes`, `contentIssueReports`.

**Authentication**: password hashing (`_core/password.ts`), session cookie (`_core/cookies.ts`), email verification (`_core/emailVerification.ts` — Resend/Brevo), OAuth via Manus portal (`_core/oauth.ts`, `localLogin.ts`), origin guard (`originGuard.ts`), rate limiting (`express-rate-limit`), security headers (`helmet`), JWT (`jose`).

**Other services**: S3 storage (`storageProxy`, AWS SDK), LLM (`_core/llm.ts`), image generation, voice transcription, notification, logger, heartbeat, static serving, vite dev integration.

---

## E. Medical Content Inventory

### `SEG_CONTENT_LIBRARY/` (~158 MB, 88 files)

| Folder | Files | Format | Size | Purpose |
|---|---:|---|---:|---|
| `01_RECOVERY_SOURCE_ARTIFACTS/QUESTION_BANKS` | 2 | TXT | ~0.8 MB | Recovered raw Qbanks w/ Arabic explanations (1400Q, PreTest) |
| `01_RECOVERY_SOURCE_ARTIFACTS/REFERENCE_LIBRARY` | 8 | JSON | ~0.9 MB | Flashcards, exam traps, Arabic mentor explanations, chapter study map |
| `02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE` | 17 | JSONL/JSON | ~75 MB | **9 Qbank sources** + study books + manifests |
| `…/RESIDENT_EMERGENCY_MEDICINE/normalized` | 12 | JSONL | ~45 MB | Schema-normalized Qbanks (`ExplanationEN/AR`) |
| `02_PROCESSED_CONTENT/ROSEN_BARKIN_5MIN` | 7 | JSON/JSONL | ~22 MB | Book pages, topic summaries, Arabic editorial translations |
| `02_PROCESSED_CONTENT/ROSH_ROTATION_2019` | 7 | JSON/JSONL | ~0.4 MB | Chapter summaries, pages, translations |
| `02_PROCESSED_CONTENT/SEG_UNIFIED_REVIEW_GUIDE` | 18 | JSON/JSONL/MD | ~9.4 MB | Unified review outline, source excerpts, summary batches |
| `02_PROCESSED_CONTENT/TINTINALLI_MANUAL_8E` | 7 | JSON/JSONL | ~5.6 MB | Pages, chapter summaries, Arabic translation queue |
| `03_MEDICAL_GOVERNANCE` | 2 | MD | ~3 KB | Governance templates, clinical review audit trail |
| root manifests/schemas | 5 | JSON/MD | ~12 KB | `manifest.json`, `content-manifest.json`, schema, README |

### `medical-content/` (~5 MB, 52 files)

| Folder | Purpose |
|---|---|
| `knowledge-graph/` | `knowledge-graph-index.json` (437 KB), `qbank-topic-mapping.json` (1.2 MB), `topic-registry`, `topicId-map`, `source-registry`, `qbank-registry`, `weak-area-engine` + metadata schemas |
| `emergency-board/` | Jordan EM board blueprint, duplicate KG set, Tintinalli qbank-mapping (v2/v3 candidates) |
| `emergency-medicine/` | `layer.json`, algorithms, exam-pearls, tables, topic-mappings |

### Books & study material
- `ED_REVIEW_BOOK/` (96 files): generated markdown review book — 19 chapters × parts + `STYLE_SPEC.md`.
- Study books: `frcem-study-book.json` (511 KB), `hippo-study-book.json` (299 KB).

### Arabic vs English content
- **Arabic**: EDIC explanations (995), FRCEM (1529), Hippo (1927), Oxford SCE (356), Rosen 10e (1044), Tintinalli 9e (756), PEER partial (989 + 204), Arabic mentor/reference JSONs, Rosen-Barkin & Tintinalli editorial translation queues.
- **English**: every Qbank source has 100% `ExplanationEN`.
- **Book translations**: `editorial-translations.json` in ROSEN_BARKIN_5MIN (5.2 MB) and TINTINALLI (1 MB), ROSH_ROTATION (19 KB).

---

## F. Qbank Inventory

**Registry**: `medical-content/knowledge-graph/qbank-registry.json` — 9 entries (identical copy under `emergency-board/`).

| # | Source ID | Bank | Questions | Source file (KB) | Normalized file | AR coverage (source) |
|---|---|---|---:|---:|---|---:|
| 1 | qbank-edic-sba-2026 | EDIC SBA 2026 | **995** | 5,338 | 753 records ⚠️ | **995/995 (100%)** ✅ |
| 2 | qbank-frcem | FRCEM | 1,529 | 10,592 | 1,510 | 1529/1529 (100%) |
| 3 | qbank-hippo | Hippo EM | 1,927 | 4,941 | 1,927 | 1927/1927 (100%) |
| 4 | qbank-oxford-sce | Oxford SCE | 356 | 1,298 | 356 | 356/356 (100%) |
| 5 | qbank-peer-physicians-2026-unified | PEER 2026 | 2,139 | 4,704 | 2,139 | 989/2139 (46%) |
| 6 | qbank-peer-physicians-case-series-2026 | PEER Case Series | 685 | 1,191 | 685 | 204/685 (30%) |
| 7 | qbank-rosen-10e | Rosen 10e | 1,044 | 1,801 | 1,041 | 1044/1044 (100%) |
| 8 | qbank-rosh-initial-certification-2026 | ROSH 2026 | 5,025 | 19,691 | 4,783 | **0/5025 (0%)** ❌ |
| 9 | qbank-tintinalli-9e | Tintinalli 9e | 756 | 1,586 | 756 | 756/756 (100%) |
| | | **TOTAL** | **14,460** | | | **~79%** |

**Duplicate/legacy source files** (not in registry): `rosh-…-merged-question-bank.jsonl` (2,728), `rosh-…-question-bank.jsonl` (1,970) — both have empty normalized twins.

**Normalized files** (`…/normalized/`, schema `Question_ID, Question, Options, Answer, CorrectAnswer, ExplanationEN, ExplanationAR, Source, Chapter, Category, Difficulty, ClinicalScenario, Page, References, ReviewStatus, Provenance`):

| Normalized file | Records | AR filled |
|---|---:|---:|
| edic-sba-2026 | 753 ⚠️ | **0** ⚠️ |
| frcem | 1,510 | 1,510 |
| hippo | 1,927 | 1,927 |
| oxford-sce | 356 | 356 |
| peer-2026-unified | 2,139 | 989 |
| peer-case-series | 685 | 204 |
| rosen-10e | 1,041 | 1,041 |
| rosh-merged-four-files | 4,783 | 0 |
| rosh-merged / rosh-2026 | 0 (EMPTY) | 0 |
| tintinalli-9e | 756 | 756 |

**Qbank audit** (`qbank-audit.json`, 2026-09-09): 5 banks / 5,612 questions audited, 38 duplicate records, 1,921 Hippo records missing required fields, 7 FRCEM.

---

## G. Arabic Layer Status — EDIC SBA 2026 (recent work)

**Completed this session:**

| Stage | Records | Status |
|---|---:|---|
| Pilot Q1–Q20 | 20 | ✅ passed |
| Batch 1 (Q1–100) | 100 | ✅ `edic-arabic-batch-001.jsonl` |
| Batch 2 (Q101–200) | 100 | ✅ `edic-arabic-batch-002.jsonl` |
| Batch 3 (Q201–300) | 100 | ✅ `edic-arabic-batch-003.jsonl` |
| Batch 4 (Q301–400) | 100 | ✅ `edic-arabic-batch-004.jsonl` |
| Batch 5 (Q401–500) | 100 | ✅ `edic-arabic-batch-005.jsonl` |
| Unique queue audit | 241 unique / 254 dup of 495 remainder | ✅ `edic-arabic-remaining-unique.jsonl` |
| U1 / U2 / U3 (+1 extra) | 100 + 100 + 41 + 1 | ✅ `edic-arabic-remaining-u1/u2/u3(+extra).jsonl` |
| **Final merge into source** | **995/995 (100%)** | ✅ audit passed: 0 integrity issues, lengths 303–518, 9 approved prefixes |

- **Backup**: `edic-sba-2026-question-bank.jsonl.before-arabic-merge.bak` (md5 `9110f7cb…`, 4,853,304 B — matches original).
- **Prefix distribution (995)**: علم الأمراض 817 · الفيزيولوجيا 111 · السمات الإشعاعية 55 · المقدمة 5 · آلية العمل 2 · آلية المقاومة 2 · الأهمية السريرية 1 · التعريف والطبقات 1 · حماية الكظرية 1.
- **Generation engine**: `scripts/generate-edic-batch-00{1..5}.mjs`, `generate-edic-u{1,2,3,3-extra}.mjs`, merge script `scripts/merge-arabic-final.mjs`.
- **⚠️ Pending**: normalized EDIC file still has 753 records and `ExplanationAR = 0` — the normalized Qbank update was interrupted (see §K).

---

## H. Documentation Inventory

| Location | Count | Contents |
|---|---:|---|
| Root `*.md` | 117 | `README.md`, `DEPLOYMENT.md`, `PROJECT_PROGRESS.md`, `NEXT_SESSION_HANDOFF.md`, `QBANK_SOURCE_COMPLETION_REPORT.md`, ~90 `SEG_*` reports (visual freeze, staging, accessibility, waves, governance) |
| `docs/architecture` | 36 | Knowledge graph, qbank mapping/registry, topic registry, weak-area engine, source of truth |
| `docs/SEG-CONTENT` | 68 | Architecture, evidence, governance, phases 7.5–7.8, review, source registry |
| `docs/SEG-GOVERNANCE` | 6 | Governance docs |
| `docs/reports` + `docs/operations` | 13 | Reports & operations |
| `reports/` | 421 | QA evidence: lighthouse (6), playwright, release closure (17), resident-qbank, medical-books, pdf-extraction-qa, headless evidence |
| `README.md` files | 12 | Root + per-module |
| Root `*.py` | 33 | Phase 7.x analysis/validation/report scripts |
| Evidence dirs | ~96 | `SEG_UI_PATCH1_EVIDENCE`, `SEG_VISUAL_PRODUCTION_EVIDENCE`, `phase_7_8_*` |

---

## I. Development Tools

**Package manager**: pnpm 11.10.0 (`packageManager`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`), Node 22, CI image `node:22-bookworm-slim`.

**Key scripts** (`package.json`):
`dev`, `build` (vite + esbuild server), `start`, `check` (tsc), `lint` (eslint, max-warnings 0), `test` (vitest run), `test:ui` (Playwright via bundle), `test:lighthouse`, `verify`, `ci` (+ `repo:hygiene`), `security:audit`, `db:push`, `desktop*`, `index:*` (medical-systems, global-layer, topic-graph, content-mapping, book-mapping, qbank-mapping).

**Dependencies** (~70 runtime): react 19, @tanstack/react-query, @trpc/*, wouter, drizzle-orm, mysql2, express, helmet, express-rate-limit, jose, zod 4, superjson, radix-ui suite, tailwind 4, recharts, framer-motion, axios, AWS S3 SDK, electron (dev).

**Configs**:

| File | Size | Notes |
|---|---:|---|
| `vite.config.ts` | 7,372 B | React + Tailwind + compression plugins, Manus runtime/debug plugins (dev only), aliases `@`, `@shared`, `@assets` |
| `vitest.config.ts` | 806 B | jsdom env; includes `shared/**`, `server/**`, `client/**`, `scripts/**` tests |
| `playwright.config.ts` | 739 B | `tests/ui`, baseURL 127.0.0.1:3000, webServer `scripts/start-ui-test.mjs`, reports → `reports/playwright-*` |
| `playwright.study.config.ts` | — | study-plan UI tests |
| `tsconfig.json` | 657 B | strict, bundler resolution, `@/*`, `@shared/*` |
| `eslint.config.js` | 1,405 B | flat config, TS + react-hooks; ignores `SEG_CONTENT_LIBRARY`, `phase_*`, `*.py`, reports |
| `drizzle.config.ts` | 377 B | MySQL, requires `DATABASE_URL` |
| `.prettierrc` / `.prettierignore` | — | formatting |
| `Dockerfile`, `.gitlab-ci.yml`, `electron-builder.json` | — | deploy: test → build → deploy stages |

**Test setup**: 48 unit tests (vitest/jsdom + testing-library), 2 Playwright specs, axe-core accessibility, Lighthouse. Output in `reports/`.

---

## J. Git / Repository Status

- **Repository**: single repo, branch **`main`** (tracking `origin/main`), **no submodules**, no nested `.git`.
- **Remotes**:
  - `origin` → `https://github.com/KISSCRISIS/seg-end-august.git`
  - `seg-er-part` → `https://github.com/KISSCRISIS/SEG-ER-PART.git`
- **Commits** (2):
  - `34db863` — *Repair Qbank validation, grading, and test infrastructure* (KISSCRISIS, 2026-09-25)
  - `154182e` — *initial clean commit without large zip files*
- **Working tree**: **41 modified**, **278 untracked**, 0 staged.
  - Modified: `.env.example`, `.gitignore`, `.gitlab-ci.yml`, `README.md`, `Dockerfile`, `DEPLOYMENT.md`, `package.json`, `vite/vitest/drizzle configs`, `client/src/App.tsx` + auth/dashboard pages & tests, `server/routers.ts`, `server/db.ts`, `server/_core/*`, `drizzle/schema.ts`, `todo.md`.
  - Untracked highlights: **`SEG_CONTENT_LIBRARY/`** (incl. merged EDIC file), **`medical-content/`**, `ED_REVIEW_BOOK/`, `reports/`, `docs/`, `scripts/`, `server/`, `shared/`, `tests/`, root `edic-*.jsonl` working files (21), `PROJECT_PROGRESS.md`, `QBANK_SOURCE_COMPLETION_REPORT.md`, `Launch-SEG.cmd`, electron/playwright configs.
  - Note: `edic-arabic-batch-004/005`, `remaining-unique/extra` appear in status snapshot; batch-004/005 + u2/u3 lists confirm all present.
- **Ignored**: `node_modules`, `dist/`, `release/`, `.local-py/`, `.env.local`, `*.dist`.

---

## K. Potential Issues and Recommendations

1. **🔴 Normalized EDIC file is stale (blocking pending task)**
   `…/normalized/edic-sba-2026-question-bank.jsonl` = **753 records (242 missing vs source 995)** with **`ExplanationAR` empty for all**, while the source file now carries 995/995 Arabic explanations. The normalized-update audit (previous step) was interrupted before identifying/regenerating normalized outputs. Recommendation: regenerate via `scripts/normalize-qbanks.mjs` (or the pipeline that produced sibling banks) from the merged source, then run the audit (A–H) and verify `ExplanationAR` = 995.

2. **🔴 Empty normalized ROSH files**: `rosh-…-merged-question-bank.jsonl` and `rosh-…-question-bank.jsonl` in `normalized/` are 0 bytes — likely truncated runs.

3. **🟠 ROSH has 0% Arabic coverage** (5,025 questions, 0 `ExplanationAR`) — the largest remaining Arabic-layer gap.

4. **🟠 PEER banks partial Arabic** (46% / 30%); `peer-physicians` total 1,192 questions without Arabic explanations.

5. **🟠 Qbank audit issues**: 1,921 Hippo + 7 FRCEM records "missing required fields"; 38 duplicate question records recorded in `qbank-audit.json` (2026-09-09, pre-EDIC-merge).

6. **🟡 Registry vs. normalized drift**: registry `totalQuestions` (e.g. EDIC 995, FRCEM 1529, Rosen 1044) exceeds normalized record counts (753, 1510, 1041). Registry counts should be revalidated after normalization refresh.

7. **🟡 `@assets → attached_assets` alias** in `vite.config.ts`/`vitest.config.ts` points to a non-existent directory (harmless until imported).

8. **🟡 Untracked critical content**: `SEG_CONTENT_LIBRARY/`, `medical-content/`, EDIC Arabic outputs, `scripts/`, `server/`, `shared/`, `tests/` are **untracked** — a machine loss would drop core code and all Arabic work. Recommend committing (registry/normalized caveats aside) after the normalized update passes.

9. **🟡 Root clutter**: ~21 `edic-*.jsonl` working files + 117 root markdown reports + 33 Python scripts at repo root; consider archiving sources/working files (e.g., `edic-source-*`, `remaining-unique`) into `SEG_CONTENT_LIBRARY/` or `backups/`.

10. **🟢 Duplicate knowledge-graph copies** (`medical-content/knowledge-graph` vs `medical-content/emergency-board/knowledge-graph`) risk divergence — designate one source of truth (documented in `docs/architecture/SOURCE_OF_TRUTH.md`).

11. **🟢 Legacy/size**: `.local-py` (28,843 files) and `node_modules` are gitignored ✔; `dist/`, `release/` ignored ✔. `reports/` (421 files) is untracked — decide whether QA evidence belongs in git.

12. **🟢 Test coverage is thin at UI level** (2 Playwright specs); unit suite (48) covers engines and server logic well.
