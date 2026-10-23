# SEG Laboratory Module Foundation — Architecture Integration Plan

**Project:** Smart Emergency Guide (SEG)  
**Status:** FOUNDATION_PLAN_ONLY  
**Scope:** Laboratory Reference Module foundation; no approved laboratory dataset, no medical import, no seed, no migration, no activation, and no publication.  
**Author:** Manus AI  
**Date:** 2026-08-22

## 1. Decision Summary

The Laboratory foundation will be implemented only within the existing SEG application architecture. The current repository is a React 19/Vite/TypeScript/Tailwind frontend, a Node/Express backend, a tRPC endpoint mounted under `/api/trpc`, Drizzle ORM using the existing MySQL-style schema, and the existing Manus OAuth boundary. The supplied Next.js/Prisma/Supabase handoff is therefore treated as a non-authoritative design reference and is not copied into the repository.

The current project contains no approved Laboratory Dataset. The foundation must consequently remain a non-medical demonstration surface. Any mock records used by the UI are explicitly labeled `DEMO_DATA_ONLY`, contain generic placeholders rather than laboratory test facts, and must never be represented as a clinical dataset, source-derived content, or approved educational material.

> **Governance boundary:** `APPROVED_SOURCES = NONE` and `NORMALIZATION = BLOCKED_PENDING_APPROVED_SOURCE` remain unchanged. This foundation does not create Content Records, does not alter Source Registry states, and does not imply clinical approval.

## 2. Current Architecture Audit

| Concern | Confirmed current SEG location | Integration decision |
|---|---|---|
| Frontend entry and routing | `client/src/App.tsx` with Wouter `Switch` and `Route` | Add only the narrowly scoped `/laboratory` route; preserve all existing routes. |
| Laboratory page | No existing Laboratory file was found under `client/src` | Create `client/src/pages/LaboratoryPage.tsx`. |
| Laboratory components | No existing `client/src/components/laboratory/` directory was found | Create the four authorized components under that directory. |
| Design system | `client/src/index.css` with SEG tokens and `seg-*` classes | Reuse existing tokens/classes and Tailwind utilities; do not introduce a parallel visual system. |
| Backend API boundary | `server/_core/index.ts` mounts the existing tRPC middleware at `/api/trpc` | No Next API route and no additional Express endpoint. |
| tRPC application router | `server/routers.ts` | The requested procedures are documented only in this phase; no backend router registration is applied. |
| Database access | `server/db.ts` uses Drizzle with `drizzle-orm/mysql2` | No database calls are needed for the demo-only foundation. |
| Database schema | `drizzle/schema.ts` currently contains the existing project schema | No schema file, migration, or table is modified. |
| Authentication | Existing Manus OAuth and `useAuth` flow | No authentication code or session boundary is changed. |
| Approved data | No approved laboratory JSON/CSV/TSV package was discovered | No seed, import, medical content record, or production dataset is created. |

## 3. Approved Implementation Surface

The implementation surface is intentionally additive and reversible.

| File | State | Purpose | Boundary |
|---|---|---|---|
| `client/src/pages/LaboratoryPage.tsx` | New | Page composition for the foundation | Demo-only presentation; no clinical claims. |
| `client/src/components/laboratory/LaboratoryDashboard.tsx` | New | Dashboard layout, selection state, and empty/restricted states | Receives demo records; no database access. |
| `client/src/components/laboratory/LaboratorySearch.tsx` | New | Accessible local search and category selection | Searches demo labels only. |
| `client/src/components/laboratory/LaboratoryCard.tsx` | New | Compact demo record card | Displays explicit status and non-clinical placeholder metadata. |
| `client/src/components/laboratory/TestDetails.tsx` | New | Selected-record detail panel | Displays the demo restriction instead of ranges, interpretations, or recommendations. |
| `client/src/App.tsx` | Narrow modification | Wouter route registration for `/laboratory` | No other route is changed. |
| `client/src/pages/Home.tsx` | Narrow modification | Laboratory Guide link | One scoped link only; no other navigation change. |

The following files are deliberately outside this implementation surface: `server/routers.ts`, `server/db.ts`, `drizzle/schema.ts`, authentication files, `DashboardLayout.tsx`, existing medical-content files, source registries, migrations, seed files, and data-import directories.

## 4. Frontend Integration Contract

`LaboratoryPage` is a presentation-only foundation page. It composes `LaboratoryDashboard`, which owns the local selection state and passes records to the search, card, and detail components. The components use the existing SEG dark visual language, keyboard-visible focus treatment, readable labels, responsive grids, and explicit empty/restricted messaging.

The page must not display actual laboratory analytes, reference intervals, specimen requirements, units, interpretations, dosage or treatment guidance, or clinical recommendations. The demo record shape is intentionally generic and should remain clearly distinguishable from future governed content. When an approved dataset eventually exists, a separate adapter and governance-approved integration must replace the demo source; the current UI is not an authorization to perform that replacement.

## 5. Backend and Data Integration Decision

The requested tRPC procedure names are recorded in the separate router design document. They are not registered in `server/routers.ts` during this foundation phase because no approved dataset or database schema exists, and the user requested router design without migration or import. The future router must use the existing tRPC router conventions and must not introduce Next API handlers, Prisma, Supabase, or a second authentication system.

For the current foundation, the frontend uses local `DEMO_DATA_ONLY` records. No call to `getDb()`, no Drizzle query, no insert, no update, and no import path is created. This prevents demo placeholders from crossing into the medical-content or database boundaries.

## 6. Future Integration Sequence

A future data-backed Laboratory module must proceed in this order:

1. Receive a candidate laboratory source package and preserve the original artifacts.
2. Complete source identity, version, location, rights, provenance, taxonomy, and governance intake.
3. Obtain the required clinical review and explicit approval record; until then, the source remains pending and cannot be normalized or imported.
4. Present and approve a separate Drizzle/MySQL migration plan, including table order, indexes, foreign keys, RLS-equivalent application controls where applicable, rollback, owner, reviewer, and QA evidence.
5. Apply a reviewed migration only after separate authorization; this is **not executed** in the current phase.
6. Build an idempotent, reversible adapter from the approved source package into the approved schema; do not seed directly from an unreviewed file.
7. Add database-backed tRPC procedures and focused tests, keeping the existing `/api/trpc` boundary and Manus OAuth unchanged.
8. Perform clinical governance, QA, visual verification, and release review before activation or publication.

## 7. Rollback Boundary

The current foundation can be rolled back by removing the new Laboratory component files, removing the single `/laboratory` route registration, and removing the single Laboratory Guide link. No database rollback is required because no database object or data was changed. The existing routes, authentication, navigation anchors, medical content, and source governance records must remain intact.

## 8. Validation Expectations

The implementation is expected to pass the repository TypeScript check and production build without adding packages. `git diff --check` must report no whitespace errors. Any unrelated pre-existing failure must be recorded as a baseline issue rather than repaired outside this scope. No migration, seed, import, commit, or push command is permitted for this phase.

## References

1. `client/src/App.tsx` — current Wouter route boundary.
2. `client/src/index.css` — current SEG design tokens and reusable visual classes.
3. `server/_core/index.ts` — current Express and tRPC mounting boundary.
4. `server/routers.ts` — current application router boundary.
5. `server/db.ts` — current Drizzle/MySQL access boundary.
6. `drizzle/schema.ts` — current database schema file.
7. `SEG_PROJECT_CONTINUITY_PACKAGE/04_PROJECT_GOVERNANCE/SEG_ARCHITECTURE_RULES.md` — project architecture authority.
8. `SEG_LABORATORY_INTEGRATION_AUDIT.md` — read-only audit of the supplied Laboratory handoff and missing dataset evidence.
