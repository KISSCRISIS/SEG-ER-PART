# SEG Laboratory Module — tRPC Router Design

**Project:** Smart Emergency Guide (SEG)  
**Status:** DESIGN_ONLY / NOT_REGISTERED  
**Scope:** Future tRPC contract for a governed Laboratory module; current phase uses local `DEMO_DATA_ONLY` UI records only.  
**Author:** Manus AI  
**Date:** 2026-08-22

## 1. Design Boundary

This document defines the requested tRPC procedure names and their intended responsibilities within the existing Express/tRPC boundary. It does not register a router, alter `server/routers.ts`, add a database query, add a migration, create a seed, import a source, or create a medical content record.

The current UI foundation is intentionally disconnected from a database-backed router because no approved Laboratory Dataset is available. Any record exposed by the current foundation must remain a generic placeholder with the literal status `DEMO_DATA_ONLY`. It must not be interpreted as a laboratory test, a reference interval, a specimen instruction, a diagnosis, or a clinical recommendation.

> **Fail-closed rule:** A future data-backed procedure must return only records that have passed the SEG source, version, rights, clinical-review, approval, and audit gates. A pending, unreviewed, or unapproved source must not be exposed as active medical content.

## 2. Router Placement

The future namespace belongs under the existing application router in `server/routers.ts`, using the repository's established tRPC router and procedure conventions. If the implementation later becomes large enough to justify a dedicated module file, it may be split under `server/routers/` only after an explicit file-scope decision. The existing Express mounting path remains `/api/trpc`.

No Next.js route handler, Prisma client, Supabase query layer, or second API transport is part of this design.

## 3. Requested Procedures

| Procedure | Intended responsibility | Future data dependency | Current foundation status |
|---|---|---|---|
| `laboratory.getTests` | Return a governed, paginated collection of visible Laboratory records, optionally filtered by approved category | Approved Laboratory tables and governance filters | Design only; not registered |
| `laboratory.searchTests` | Search approved records by approved searchable terms and category | Approved test/category/keyword relations and indexes | Design only; current UI searches local Demo labels |
| `laboratory.getTestById` | Return one governed record by stable identifier, or a typed not-found/restricted response | Approved test row and related governed metadata | Design only; current detail panel uses local Demo state |
| `laboratory.getCategories` | Return categories that are approved and visible in the current professional scope | Approved category rows and visibility rules | Design only; current UI uses local Demo category labels |

## 4. Procedure Contract Notes

### 4.1 `laboratory.getTests`

The future input should support a bounded page size, an optional page cursor or offset strategy consistent with existing SEG conventions, an optional category identifier, and an explicit professional-track scope. The response should provide stable identifiers, display metadata, category references, governance state, and pagination metadata. The procedure must not return unpublished or unapproved content.

The procedure must not silently fall back to Demo records in a production data path. Demo behavior, if retained for development, should be isolated behind an explicit environment or feature boundary and should carry `DEMO_DATA_ONLY` in every returned record.

### 4.2 `laboratory.searchTests`

Search must be bounded and deterministic. The future implementation should search only approved, indexed fields and should apply the same professional-track and visibility filters as `getTests`. The search response should preserve the governance state and source identity needed to prevent a UI consumer from treating a partial result as an approved clinical record.

The current Foundation does not call this procedure. Its local search filters placeholder labels and categories in memory, which is deliberately non-clinical and does not establish the final search contract.

### 4.3 `laboratory.getTestById`

The future identifier must be a stable database or content identifier that is not derived from a display label. A missing record should produce the repository's established not-found behavior. A record that fails governance visibility must not be returned as active content; it should produce a restricted or not-found outcome according to the approved security contract.

The result must include source, version, review state, rights state, and audit lineage before any clinical fields are allowed to render. This is a design requirement only and is not implemented in the current demo.

### 4.4 `laboratory.getCategories`

Categories should be returned only when they are linked to visible, approved content for the requesting scope. The procedure must not infer a professional track from a filename or folder name. Category labels in the current UI are placeholders and are not taxonomy records.

## 5. Procedure and Security Model

The future procedure namespace must use the existing SEG procedure types rather than introducing a new authentication boundary. The exact use of `publicProcedure` or `protectedProcedure` requires a separate surface decision. The default recommendation for approved medical Laboratory content is a protected procedure, because the existing dashboard is protected by Manus OAuth and professional-track visibility may depend on the authenticated user. A public demo route may remain non-clinical only while it is explicitly labeled `DEMO_DATA_ONLY` and contains no medical facts.

The router must not bypass Manus OAuth, read session secrets directly in the client, expose database credentials, or allow clients to select an unapproved source or review state. Authorization, filtering, and governance visibility must be applied server-side when a database-backed version is authorized.

## 6. Error and Empty States

The future contract should distinguish between an empty approved result, a restricted record, an invalid bounded request, and a server/database failure. The UI must preserve a safe empty state when no approved dataset exists. It must not fill an empty result with invented medical content.

The current Foundation uses a local explanatory state: “No approved Laboratory Dataset is connected.” It also displays the explicit `DEMO_DATA_ONLY` badge and explains that placeholders are not clinical guidance.

## 7. Test Requirements Before Registration

Before the namespace is registered, the owner must approve a separate implementation scope and provide an approved dataset plus schema/migration authorization. Focused tests should then cover pagination bounds, category filtering, search normalization, exact identifier lookup, restricted/unapproved source exclusion, professional-track separation, empty results, malformed inputs, and database failure handling.

The test set must verify that no unapproved or pending medical record can be returned and that no Demo record is mistaken for governed content. These tests are future requirements, not evidence of current clinical correctness.

## 8. Migration and Activation Dependency

This design intentionally has no migration impact by itself. The future procedures depend on the conceptual tables described in `LABORATORY_SCHEMA_PROPOSAL.md`, but those tables do not exist in the current schema and must not be created by this phase. Before any migration, SEG requires a separate written migration plan and authorization covering repository/branch, schema target, table order, indexes, foreign keys, owner, reviewer, security controls, rollback, and QA evidence.

No seed or import may occur until an approved source package exists and has a traceable source ID, version, location, rights evidence, clinical review, approval decision, and append-only audit trail.

## 9. Current Validation State

| Check | Result |
|---|---|
| Requested procedure names documented | PASS |
| Existing Express/tRPC boundary preserved | PASS |
| Next API route introduced | NO |
| Prisma or Supabase introduced | NO |
| `server/routers.ts` modified | NO |
| Database query introduced | NO |
| Migration or schema change | NO |
| Seed or import | NO |
| Medical Dataset represented as available | NO |
| Demo records clearly restricted | REQUIRED in UI implementation |

## References

1. `server/_core/index.ts` — current Express and tRPC mounting boundary.
2. `server/routers.ts` — current application router boundary.
3. `server/_core/trpc.ts` — current tRPC procedure definitions.
4. `server/db.ts` — current Drizzle/MySQL database access boundary.
5. `drizzle/schema.ts` — current schema and absence of Laboratory tables.
6. `SEG_LABORATORY_INTEGRATION_PLAN.md` — architecture integration decisions for this foundation.
7. `SEG_LABORATORY_INTEGRATION_AUDIT.md` — prior read-only audit of the supplied handoff and missing dataset evidence.
