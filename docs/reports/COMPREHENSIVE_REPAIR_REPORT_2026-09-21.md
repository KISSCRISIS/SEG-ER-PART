# SEG Comprehensive Repair Report

**Date:** 2026-09-21  
**Scope:** Qbank correctness and resilience, Practice session stability, production assets, dependency security, automated validation, and browser-test reliability.

## Executive status

The repaired workspace passes lint, TypeScript checking, unit/integration tests, repository hygiene checks, the production build, dependency security audit, peer-dependency validation, and the full browser suite. No original medical content or Qbank source record was deleted or rewritten, and no database migration was applied.

## Critical corrections

### 1. Qbank answer grading

The previous answer check treated `correctAnswer` as though it always began with an option letter. Several imported banks store the full answer text instead, which could mark correct selections as wrong or accept an incorrect selection.

The new shared resolver:

- prefers a valid explicit `correctAnswerKey`;
- otherwise resolves one exact option-text match only;
- rejects ambiguous, missing, duplicated, or empty options;
- validates the selected option before grading;
- is used by new submissions and read-time result correction.

Historical stored attempts are not overwritten. Their displayed analytics are recalculated safely when read, preserving the original audit trail. A permanent database backfill should only be considered later after a verified backup and a separately approved migration plan.

### 2. Qbank data-quality gate

The registry contains **14,456 stored source records**. The runtime now exposes **13,249 answerable questions** after deterministic validation.

- **1,031 Rosh records** remain withheld under the existing eligibility/duplicate/media controls.
- **176 additional legacy records** across FRCEM, Oxford, Rosen, and Tintinalli are withheld because their option structures are malformed, duplicated, empty, or their correct answer cannot be resolved safely.
- Total withheld at runtime: **1,207**.

Nothing was deleted. The 176 legacy records require editorial correction against their original sources before they can be returned to learner sessions.

Answerable catalog by source:

| Source | Answerable questions |
|---|---:|
| EDIC SBA 2026 | 995 |
| FRCEM | 1,379 |
| HIPPO | 1,927 |
| Oxford | 351 |
| PEER unified | 2,139 |
| PEER Case Series | 685 |
| Rosen | 1,036 |
| Rosh | 3,994 |
| Tintinalli | 743 |
| **Total** | **13,249** |

### 3. Practice session stability

- The selected question IDs are frozen when a session begins.
- Background refetches and answer-history updates can no longer reorder or replace an active session.
- Resuming a saved exam loads its recorded question IDs.
- Switching between saved sessions with the same question count no longer risks retaining the former list.

### 4. Production assets

Approved local SEG assets were copied into `client/public/seg-assets` and the asset registry now uses local paths. This removes the previous `/manus-storage` production failures for branding and medical imagery.

### 5. Dependency and security remediation

- Updated `express`, `streamdown`, `vitest`, and `drizzle-kit` within the current architecture.
- Removed the unused/incompatible JSX-location Vite plugin.
- Added workspace overrides for patched Babel, esbuild, and mdast packages.
- Security audit improved from **39 known findings (9 low, 30 moderate)** to **0 known vulnerabilities**.
- Peer-dependency validation reports no issues.

### 6. Test infrastructure

- Updated Vitest 4 configuration so browser component tests run in JSDOM.
- Added focused answer-resolution, grading, malformed-record, historical-attempt, and saved-exam tests.
- Added an authenticated Practice browser test that verifies the bank catalog, Rosh visibility, chapter expansion, and session-start readiness.
- Added a production-mode UI test server with test-only local authentication/data.
- Added a deterministic Windows UI-test runner that always closes its server process.
- Added a unified `pnpm run ci` command.

## Principal files created

- `shared/qbank-answer.ts`
- `shared/qbank-answer.test.ts`
- `server/qbankGrading.test.ts`
- `scripts/start-ui-test.mjs`
- `scripts/run-ui-tests.mjs`
- `client/public/seg-assets/*`
- this report

## Principal files modified

- `server/residentContent.ts`
- `server/routers.ts`
- `server/_core/index.ts`
- `server/residentContent.test.ts`
- `client/src/pages/ResidentPracticePage.tsx`
- `client/src/lib/seg-assets.ts`
- `tests/ui/responsive-accessibility.spec.ts`
- `medical-content/emergency-board/knowledge-graph/qbank-registry.json`
- `medical-content/knowledge-graph/qbank-registry.json`
- `shared/qbank-registry.test.ts`
- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `vite.config.ts`
- `vitest.config.ts`
- `playwright.config.ts`

The workspace already contained many unrelated modified and untracked files when this repair pass began. They were preserved and were not reset or deleted.

## Validation results

| Validation | Result |
|---|---|
| `pnpm lint` | Passed, zero warnings |
| `pnpm check` | Passed |
| `pnpm test` | 149 passed, 2 skipped; 50 files passed, 1 skipped |
| `pnpm repo:hygiene` | Passed |
| `pnpm build` | Passed |
| `pnpm test:ui --workers=1` | 14/14 passed and process exited cleanly |
| `pnpm security:audit` | No known vulnerabilities |
| `pnpm peers check` | No peer dependency issues |

Two messages visible during unit tests are expected test-environment noise rather than failures: JSDOM does not implement `window.scrollTo`, and the OAuth redirect test deliberately exercises and logs a provider failure path.

## Remaining work and release risks

1. **Raw data remediation:** 176 malformed legacy questions need source-backed editorial repair; 1,031 Rosh records remain withheld under the existing controls. Do not repair medical answers without provenance.
2. **Bundle size:** the main minified JavaScript chunk is approximately 502.61 kB, slightly above Vite's 500 kB warning threshold. Further route-level splitting is recommended but is not a build blocker.
3. **Recharts:** version 2.15.4 is deprecated upstream. A version-3 migration is a separate compatibility project, not a safe patch update.
4. **Working tree:** the repository contains a large pre-existing set of modified/untracked work. Release staging should explicitly review and select intended files before committing.
5. **Database:** schema/migration preparation present in the workspace was not applied to any database during this repair.

## Medical-content integrity

No diagnosis, management recommendation, algorithm, explanation, answer text, or other medical/scientific statement was edited in this repair pass. Runtime filtering only prevents structurally unsafe records from being served until source-verified correction is available.
