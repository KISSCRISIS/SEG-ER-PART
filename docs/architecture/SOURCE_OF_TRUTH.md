# JEM Nexus source of truth

The canonical deployable application is this repository root and only these runtime paths:

- `client/src/`: React user interface.
- `server/`: Express/tRPC application and domain logic.
- `shared/`: browser/server contracts.
- `drizzle/schema.ts` and ordered `drizzle/*.sql`: database model and migration history.
- `client/public/`: approved runtime assets.
- `tests/` and colocated `*.test.*`: automated acceptance evidence.
- `Dockerfile`, `.gitlab-ci.yml`, `package.json`, and `pnpm-lock.yaml`: reproducible delivery definition.

The resident-facing product structure is defined in `docs/architecture/SEG_RESIDENT_WORKFLOW_MAP.md`. When adding or moving content, keep the boundary between My Home, My Pathway, Learn, Practice, Atlas & Visual Assets, Medical Journal, and My Account intact.

Root-level `SEG_*.md`, evidence packages, phase folders, recovery bundles, screenshots, inventories, and generated reports are historical evidence, not application source. Runtime code must not import them. New operational documentation belongs under `docs/`; generated QA output belongs under `reports/` and is ignored by Git.

## Mandatory rules

1. Change database structure in `drizzle/schema.ts`, then generate and commit one ordered migration.
2. Never edit or delete an applied migration.
3. Never edit an approved medical revision in place; create a version and retain provenance and clinical review records.
4. Never commit `.env`, credentials, dumps, logs, `dist/`, or dependency directories.
5. `pnpm run ci` and `pnpm repo:hygiene` are merge gates.
