# SEG Current State Audit

Date: 2026-09-09

## Runtime and structure

- React/Vite client with TypeScript and Tailwind styling.
- Node/Express-compatible server with tRPC routers.
- Drizzle schema/migrations retained for hosted MySQL.
- Local workspace uses SQLite-backed `server/localStore.ts` and port 3012 launcher.
- Desktop/Electron packaging files are present.

## Content

- Canonical content root: `SEG_CONTENT_LIBRARY`.
- Unified guide outline: 204 units, all with source page locators.
- Source excerpts generated for all 204 units.
- Editorial summaries are retained as `under-review`/`draft` and are not official board content.

## Verification snapshot

- TypeScript check: passed.
- Vitest: 48 passed, 2 skipped.
- Production build: passed.
- Known non-blocking warning: main client chunk exceeds 500KB.

## Risks and gaps

- 204-unit source-to-summary reconciliation still requires semantic mapping.
- Clinical approval and official Jordanian Board blueprint are not available in the repository.
- Dependency security audit depends on registry/network availability.
- Backup restore must be exercised against a disposable local dataset before release.
