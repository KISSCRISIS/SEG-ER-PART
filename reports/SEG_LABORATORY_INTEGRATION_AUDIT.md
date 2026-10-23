# SEG Laboratory Integration Audit

**Document ID:** `SEG_LABORATORY_INTEGRATION_AUDIT`  
**Mode:** `READ-ONLY ARCHITECTURE REVIEW`  
**Project:** Smart Emergency Guide (SEG)  
**Audited source checkout:** `/home/ubuntu/seg-manus-status`  
**Observed branch/HEAD:** `main` / `47f1fff5a1c82820cc772a10b162a5920f3a3333`  
**Audit scope:** Compare the supplied Laboratory Developer Handoff and module archive with the current SEG architecture, API, database, authentication, navigation, design system, and medical-content governance.

## Executive decision

The supplied Laboratory package is **not implementation-ready for the current SEG codebase**. The package assumes Next.js App Router, Prisma, Supabase PostgreSQL, standalone REST endpoints, and a new route tree, while the inspected SEG implementation is React/Vite/TypeScript/Tailwind with Express/tRPC, Drizzle ORM using a MySQL-style schema, and Manus OAuth. The package also does not include the claimed 238 laboratory records, governed source/version evidence, rights evidence, clinical review records, or an executable data-backed API.[1] [2] [3]

The safe decision is:

> **`BLOCKED — REQUIRES ARCHITECTURE ALIGNMENT, GOVERNED SOURCE INTAKE, AND SEPARATE IMPLEMENTATION AUTHORIZATION`**

This audit did not copy, extract into the application, execute, modify, normalize, import, seed, migrate, activate, publish, or commit any Laboratory code or content. The report is documentation-only.[1] [4]

## 1. Evidence inspected

| Evidence item | Observed fact | Interpretation |
|---|---|---|
| Audit prompt | Requests read-only architecture review and expressly prohibits application files, Prisma changes, migrations, import, API-route creation, and database changes | This audit remains read-only even though the user granted general permission to proceed |
| Developer handoff archive | `/home/ubuntu/upload/Laboratory_Developer_Handoff.zip`; SHA-256 `407a1d280a468d5f190067201e37796b048cabfbef325fcf5475e7d4a6b23f13`; contains `Developer_Handoff.md` and `Architecture_Diagram.md` | Documentation claims are evidence to compare, not implementation authority |
| Laboratory module archive | `/home/ubuntu/upload/laboratory-module(1).zip`; SHA-256 `df43886b4e2afe9d3e7f835b0a0b60d1be688deeb405e9da27042ef02ebb56e1`; contains 9 TypeScript files | Package is a scaffold/stub, not a complete data-backed module |
| Current SEG checkout | `/home/ubuntu/seg-manus-status`; `main` at `47f1fff5a1c82820cc772a10b162a5920f3a3333`; existing worktree changes were observed but not modified | The current checkout and continuity records remain the source of truth for architecture review |
| Current project continuity | Continuity records identify a historical published merge at `8984c38871ad7772e3fdc6c2fdc1040e76a5bf9d`, while the locally inspected checkout reports another current HEAD | This is a publication/checkpoint reconciliation issue; no Git operation was performed |

The supplied module contains the following paths only: `app/laboratory/page.tsx`, `app/laboratory/[id]/page.tsx`, `app/api/laboratory/route.ts`, `app/api/laboratory/search/route.ts`, four components under `components/laboratory/`, and `prisma/laboratory.seed.ts`. No JSON batches, 238 test records, reference catalog, license record, source package, or clinical-review evidence was included.[2] [5]

## 2. Current SEG architecture findings

The current SEG architecture is **not Next.js**. The inspected project uses React, Vite, TypeScript, Tailwind, Express, tRPC, Drizzle ORM, and Manus OAuth. The architecture rules explicitly state that the project must not be treated as a Next.js application before a separately authorized migration decision.[3]

| Area | Current SEG evidence | Laboratory handoff assumption | Audit finding |
|---|---|---|---|
| Frontend framework | Vite + React entrypoint; `client/src/App.tsx` uses Wouter `Route`/`Switch` | Next.js App Router under `app/` | Direct route files are incompatible with the current frontend without an architecture change |
| Client routing | Existing routes are `/`, `/register`, `/login`, `/dashboard`, `/404`, and fallback NotFound | `app/laboratory/...` filesystem routes | No Laboratory route exists; adding one requires a separately authorized Wouter/App change |
| Server boundary | Express entrypoint with security middleware, `/healthz`, OAuth, storage proxy, and `/api/trpc` | Next.js API route handlers under `app/api/` | `NextResponse` handlers cannot be dropped into the current server without replacing the API pattern |
| API contract | `server/routers.ts` exports the current tRPC `appRouter`; `client/src/lib/trpc.ts` types the client from `AppRouter` | REST-style `/api/laboratory/...` endpoints | A future feature must align to tRPC/Express or receive a separate API-boundary decision |
| Database ORM | `drizzle/schema.ts` uses `mysqlTable`; `server/db.ts` uses `drizzle-orm/mysql2` | Prisma ORM and Supabase PostgreSQL | ORM, SQL dialect, connection, migration, and operational model conflict |
| Authentication | `useAuth` queries `trpc.auth.me`; dashboard access uses the existing Manus OAuth/session boundary | No auth boundary is included in the supplied module | A direct module route could bypass controlled access unless integrated through existing auth patterns |
| Navigation | Dashboard uses `/dashboard` and protected in-page anchors `#pathway`, `#learn`, `#practice`, `#reference`, `#journal`, `#account` | New `Laboratory Guide` navigation item and new route | A new top-level route/nav item is not currently established and must not alter the frozen dashboard architecture without explicit surface-level authorization |
| Design system | `client/src/index.css` defines SEG CSS variables, Tailwind theme tokens, `seg-*` components, theme behavior, responsive rules, focus styling, and reduced-motion handling | Raw classes, arbitrary colors, and a separate dark surface | The supplied visual layer is not aligned to the inspected SEG token/classes contract and has not passed visual/accessibility review |

The current production boundary also requires Express/Node behavior for CSP, security headers, rate limiting, logging, health checks, compression, and environment validation. A standalone static or Next-only insertion would not preserve those controls.[3]

## 3. Recommended module location

The recommended destination is **not** the supplied `app/` tree. If the Laboratory module is later authorized, it should be introduced as an incremental feature within the current Vite/React architecture, with its UI placed under a controlled Reference surface rather than creating an ungoverned public medical route.

| Proposed concern | Recommended conceptual location | Conditions before implementation |
|---|---|---|
| Page/view | A new `client/src/pages/LaboratoryPage.tsx` or an approved view under the existing `#reference` surface | Requires explicit route/surface authorization and preservation of protected Dashboard anchors |
| Components | `client/src/components/laboratory/` using existing SEG tokens, primitives, theme, focus, responsive, and accessibility conventions | Supplied components require rework; direct copy is not approved |
| Client data access | `client/src/lib/trpc.ts` through a typed `AppRouter` feature namespace | Requires an approved server contract and protected access decision |
| Server feature router | A new namespace in `server/routers.ts` using existing tRPC procedures | Requires security, auth, error, input-validation, audit, and rate-limit review |
| Persistence helpers | Additional functions in `server/db.ts` using the actual Drizzle/MySQL setup, if schema change is separately authorized | Requires a distinct schema-change authorization and rollback plan |
| Navigation | A controlled entry from the existing Reference experience or an approved in-page reference affordance | Do not modify the frozen navigation or add a top-level route in this audit |
| Medical data | A reversible adapter consuming only approved governed records | No raw JSON, recovered artifact, or unreviewed handoff content may be exposed to learners |

This location recommendation is conceptual. No directory, route, component, API, adapter, or schema was created in the SEG application by this audit.[3] [4]

## 4. Required schema additions — concept only

The handoff names `LaboratoryCategory`, `LaboratoryTest`, `LaboratoryKeyword`, `RelatedLaboratoryTest`, and `LaboratoryReference`. These are **conceptual requirements only**, not approved Drizzle tables or migration definitions. The current database contains only the `users` table in the inspected schema, and the project rules prohibit treating the handoff as authority for a schema change.[6]

If a separate schema-change decision is later authorized, the design review should consider the following logical areas without populating medical values at this stage:

| Logical area | Minimum conceptual purpose | Governance fields that cannot be omitted |
|---|---|---|
| Laboratory test | Stable test identity, controlled display names, category relation, and review state | `content_id`, `source_id`, `source_version`, immutable artifact/reference hash where applicable, professional track, taxonomy, rights state, governance state, review state, audit linkage |
| Category | Controlled category vocabulary and ordering | Source/version, taxonomy authority, review state, rights/governance state, audit linkage |
| Keyword | English/Arabic/abbreviation search terms with language and normalization metadata | Source/version, exact locator, transformation history, review state, rights state, audit linkage |
| Related-test relation | Explicit, reviewed relationship between two tests | Relationship evidence, rationale/locator, source/version, reviewer/disposition, audit linkage |
| Reference | Attributable source citation or locator for a test field | Canonical source identity, version/date, locator, rights, provenance, review and audit state |

The design must distinguish **retained artifact identity** from canonical source identity and must preserve missing values as unresolved. No laboratory test names, ranges, interpretation rules, specimen requirements, critical values, or clinical recommendations may be filled from general knowledge or from the scaffold. Medical content must follow the governed sequence: Source → Version → Governance Record → Clinical Review → Rights Review → Approval → Implementation Authorization → Migration/Import → Activation.[6] [7]

## 5. Required API integration points — concept only

The supplied module defines `app/api/laboratory/route.ts` and `app/api/laboratory/search/route.ts` with placeholder Next.js handlers. One returns `{ message: 'Laboratory API ready' }`, while the search handler returns an empty array; neither reads a database, validates input, enforces the current auth boundary, records audit evidence, or exposes the claimed 238 records.[2]

The compatible conceptual API path for the current SEG would be a feature namespace in the existing tRPC router, with read access determined by the controlled-usage policy and the actual source approval state. The client would consume the typed router through the existing `AppRouter` bridge. Any future search procedure must define input validation, pagination, bounded query behavior, language/abbreviation matching, error handling, access control, audit semantics, and safe handling of unresolved or restricted records. No REST path or tRPC procedure was created by this audit.[3] [6]

## 6. UI integration points — concept only

The supplied UI is not production-ready. `LaboratoryDashboard.tsx` renders three hard-coded examples, `SearchEngine.tsx` is an uncontrolled visual input without a data query, `LaboratoryCard.tsx` has no link or governed status presentation, and `TestDetails.tsx` is a placeholder. The listed `RelatedTests`, `SmartPanelCard`, and `AIExplanation` components in the handoff are not present in the supplied module.[2]

If implementation is later authorized, the UI must be built as an incremental Reference experience using the current SEG design system and existing theme/auth/accessibility conventions. It should not introduce a separate visual language, arbitrary hard-coded medical examples, or AI explanation behavior without separate clinical governance and model/data safety review. Required UI review should include light/dark themes, keyboard focus, labels, reduced motion, 320/360/390/430px responsive behavior, overflow, touch targets, loading/error/empty states, and explicit restricted/unresolved status presentation.[3] [8]

The Dashboard’s existing `#reference` anchor is the safest conceptual integration point. It must remain an anchor within the protected Dashboard experience unless a new route and access model are separately authorized. The current `#journal` empty state and other protected anchors must remain unchanged.[3]

## 7. Conflicts and risks

| Risk ID | Conflict or risk | Severity | Required treatment |
|---|---|---|---|
| LAB-01 | Next.js App Router and `NextResponse` assumptions conflict with Vite/Wouter/Express/tRPC | High | Choose the current stack for an in-place feature or obtain a separate, documented Next.js migration decision; do not mix frameworks |
| LAB-02 | Prisma/Supabase PostgreSQL assumptions conflict with Drizzle/MySQL-style schema and `drizzle-orm/mysql2` access | High | No migration or seed; complete a separate database foundation review and schema authorization |
| LAB-03 | The claimed 238 records and JSON batches are absent from the supplied archives | High | Perform governed source intake; do not fabricate, infer, or import the dataset |
| LAB-04 | No source/version/provenance/rights/clinical-review package accompanies the claimed medical data | High | Keep the module out of learner-facing use; complete source, rights, medical, metadata, and audit gates |
| LAB-05 | Proposed patient/doctor/student modes have no current role, track, or content-governance mapping | High | Define professional-track separation and access policy before implementation; do not infer from audience labels |
| LAB-06 | Supplied API handlers are placeholders and do not use the current security/auth/observability boundary | High | Align any future feature to the existing Express/tRPC/security path and add focused tests |
| LAB-07 | Supplied UI uses an unreviewed visual system and hard-coded medical examples | Medium | Rebuild against SEG tokens/components and use only approved records through a reversible adapter |
| LAB-08 | Handoff says “Ready for implementation” without the data, rights, schema, or architecture evidence needed for SEG | High | Treat readiness as an unsupported handoff claim, not a SEG gate decision |
| LAB-09 | `laboratory.seed.ts` is only a comment and would invite import of unverified content | High | Do not execute or complete the seed until source governance and implementation authorization are separately closed |
| LAB-10 | Existing SEG checkout and continuity records report different historical/current commit anchors | Medium | Reconcile checkpoint/publication evidence before any future Git operation; no Git action was taken here |

## 8. Implementation sequence after gates are closed

The following is a future, reversible sequence rather than an authorization to execute:

1. **Governed source intake.** Supply the actual 238-record package or authoritative equivalent, preserve the original, compute hashes, record title/version/locator/rights/provenance, separate professional tracks, and assign the medical/technical/metadata reviewers.
2. **Architecture decision.** Record whether Laboratory will be an in-place Vite/React/Express/tRPC/Drizzle feature. Keep any Next.js or Prisma/Supabase migration as a separate decision and do not mix it with medical-content activation.
3. **Data contract and security review.** Define the approved record contract, unresolved-field behavior, access modes, search input limits, pagination, audit events, error handling, and RLS/authorization equivalent for the actual Manus OAuth boundary. Keep the contract non-executable until authorized.
4. **Schema decision, if needed.** Only after the source and review gates permit it, authorize exact Drizzle/MySQL table changes with migration ordering, owner, security review, rollback, backups, and QA. Do not use Prisma or Supabase migrations against this repository.
5. **Reversible adapter.** Implement a narrow adapter that serves approved records only and preserves Source ID, Version, Track, Review Status, Rights Status, Governance Status, and Audit Trail. The adapter must fail closed for unapproved or unresolved records.
6. **Server integration.** Add a typed tRPC namespace through `server/routers.ts` and query helpers through the existing database boundary. Preserve Express security middleware, request logging, rate limits, health behavior, and Manus OAuth.
7. **UI integration.** Build the Laboratory view under the approved Reference surface, reuse SEG components/tokens and theme behavior, preserve Dashboard anchors and protected route behavior, and include loading, empty, error, restricted, and unresolved states.
8. **Verification and rollback.** Run TypeScript checking, focused unit/integration tests, production build, auth/access tests, search/pagination tests, responsive/accessibility checks, and deployment-parity evidence. Record a rollback checkpoint before any release.
9. **Activation decision.** Only after source approval, rights closure, clinical review, implementation authorization, and QA may a separate activation decision be considered. No learner-facing publication is implied by any earlier step.

## 9. Governance and protected-boundary confirmation

The following boundaries were preserved during this audit:

| Boundary | Result |
|---|---|
| Application code | Unchanged |
| Routes and Dashboard architecture | Unchanged |
| Manus OAuth/authentication | Unchanged |
| Drizzle schema/database | Unchanged |
| Prisma/Supabase migration | Not performed |
| Medical content | Not imported, normalized, corrected, or activated |
| Source Registry and medical governance | Unchanged |
| Approved assets and Visual Freeze | Unchanged |
| Git commit/push/publication | Not performed |
| Supplied archives | Preserved; only read-only inspection was performed |

The audit therefore does not grant implementation readiness or authorization to run `migrate`, `db:push`, `seed`, or any equivalent operation.

## 10. Final status

```text
AUDIT_MODE = READ_ONLY_ARCHITECTURE_REVIEW
LABORATORY_INTEGRATION_DECISION = BLOCKED_REQUIRES_REVISION
CURRENT_SEG_STACK = REACT_VITE_TYPESCRIPT_TAILWIND_EXPRESS_TRPC_DRIZZLE_MYSQL_STYLE_MANUS_OAUTH
HANDOFF_STACK_MATCH = FALSE
LABORATORY_DATA_PACKAGE_PRESENT = FALSE
MEDICAL_SOURCE_GOVERNANCE_CLOSED = FALSE
IMPLEMENTATION_AUTHORIZED_BY_THIS_AUDIT = FALSE
APPROVED_SOURCES = NONE
NORMALIZATION = BLOCKED_PENDING_APPROVED_SOURCE
APPLICATION_MODIFIED = FALSE
DATABASE_MODIFIED = FALSE
CONTENT_IMPORTED = FALSE
```

**Final status:** `SEG_LABORATORY_INTEGRATION_AUDIT_COMPLETE`

## References

[1]: file:///home/ubuntu/upload/SEG_LABORATORY_MODULE_INTEGRATION_AUDIT_PROMPT.md "SEG Laboratory Module Integration Audit Prompt"

[2]: file:///home/ubuntu/upload/Laboratory_Developer_Handoff.zip "Laboratory Developer Handoff archive"

[3]: file:///home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/04_PROJECT_GOVERNANCE/SEG_ARCHITECTURE_RULES.md "SEG Architecture Rules"

[4]: file:///home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/04_PROJECT_GOVERNANCE/SEG_CHANGE_CONTROL_RULES.md "SEG Change Control Rules"

[5]: file:///home/ubuntu/upload/laboratory-module(1).zip "Laboratory module archive"

[6]: file:///home/ubuntu/seg-manus-status/drizzle/schema.ts "Current SEG Drizzle schema"

[7]: file:///home/ubuntu/seg-manus-status/server/db.ts "Current SEG database access layer"

[8]: file:///home/ubuntu/seg-manus-status/client/src/index.css "Current SEG design tokens and styles"

[9]: file:///home/ubuntu/seg-manus-status/client/src/App.tsx "Current SEG client routes"

[10]: file:///home/ubuntu/seg-manus-status/client/src/components/DashboardLayout.tsx "Current SEG Dashboard navigation and auth boundary"

[11]: file:///home/ubuntu/seg-manus-status/server/_core/index.ts "Current SEG Express server boundary"

[12]: file:///home/ubuntu/seg-manus-status/server/routers.ts "Current SEG tRPC router"

[13]: file:///home/ubuntu/seg-manus-status/client/src/_core/hooks/useAuth.ts "Current SEG client authentication hook"

**Document status:** `SEG_LABORATORY_INTEGRATION_AUDIT_COMPLETE`
