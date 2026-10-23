# SEG Laboratory Module — Schema Proposal

**Project:** Smart Emergency Guide (SEG)  
**Status:** PROPOSAL_ONLY / NOT_EXECUTED  
**Database target:** Existing Drizzle ORM with MySQL-style schema  
**Scope:** Conceptual future Laboratory tables only; no schema change, migration, seed, import, activation, or publication.  
**Author:** Manus AI  
**Date:** 2026-08-22

## 1. Purpose and Non-Execution Notice

This document proposes a logical data model for a future governed Laboratory module inside the existing SEG architecture. It is not an executable migration, does not contain SQL, and does not modify `drizzle/schema.ts`. The current repository has no approved Laboratory Dataset, so no medical Laboratory records are created or imported.

The proposal is intentionally designed around traceability. A future row must retain source identity, version, rights evidence, review state, professional-track scope, and audit lineage before it can be considered eligible for display. These fields describe future governance requirements; they do not approve any source or content.

> **Current gate:** `APPROVED_SOURCES = NONE`; `NORMALIZATION = BLOCKED_PENDING_APPROVED_SOURCE`. The proposed tables remain absent until a separate schema authorization and approved dataset are provided.

## 2. Logical Entity Overview

| Logical table | Purpose | Primary relationship | Current status |
|---|---|---|---|
| `laboratory_tests` | Future governed Laboratory item metadata and clinical payload boundary | Belongs to one category; may have many keywords and references | Not present; proposal only |
| `laboratory_categories` | Controlled category taxonomy for future Laboratory items | May have an optional parent category; referenced by tests | Not present; proposal only |
| `laboratory_keywords` | Search terms associated with future Laboratory items | Belongs to one test; one test may have many keywords | Not present; proposal only |
| `laboratory_references` | Source and locator evidence attached to a future Laboratory item | Belongs to one test; records source/version/rights/review lineage | Not present; proposal only |

The model deliberately keeps reference evidence as a first-class relation. This avoids treating a display label or a file path as sufficient proof of source identity, provenance, rights, review, or approval.

## 3. `laboratory_tests`

### 3.1 Conceptual fields

| Field | Conceptual role | Required governance note |
|---|---|---|
| `id` | Stable internal identifier | Must be immutable and must not be derived from a display label. |
| `slug` | Human-readable lookup key | Must be unique within the approved Laboratory namespace and must not replace `id`. |
| `display_name` | Approved display label | Must be populated only after source mapping and clinical review. |
| `summary` | Short approved description | Must remain source-traceable; no generated clinical claims. |
| `category_id` | Foreign key to `laboratory_categories` | Must resolve to an approved category visible to the applicable track. |
| `professional_track` | SEG track boundary | Must use an explicitly governed track value; never infer the track from a filename or folder. |
| `status` | Lifecycle/review visibility state | Must distinguish pending review from approved/active states; no pending record may be exposed as active content. |
| `source_id` | Canonical source identifier | Must reference the source registry or approved source identity established by governance. |
| `source_version` | Source version or edition | Required for reproducible review and rollback. |
| `source_locator` | Precise source location | Should identify page, section, record, or equivalent locator in the preserved artifact. |
| `rights_status` | Rights/licence evidence state | Must not be treated as cleared solely because a row exists. |
| `clinical_review_status` | Clinical review state | Must reflect the governed review decision and remain separate from technical QA. |
| `technical_review_status` | Technical/visual/accessibility QA state | Required where the surface or content type needs it. |
| `audit_lineage_id` | Link to append-only audit lineage | Must allow reconstruction of source, transformation, review, and release events. |
| `created_at` | Creation timestamp | Must be recorded by the application/database boundary. |
| `updated_at` | Last metadata update timestamp | Must change on controlled edits and be covered by audit history. |
| `approved_at` | Approval timestamp | Nullable until an explicit approval decision exists. |
| `activated_at` | Activation timestamp | Nullable and must remain unset before governed activation. |
| `retired_at` | Retirement timestamp | Nullable; retirement must be reversible where policy allows and audited. |

The future clinical payload is intentionally not specified in this foundation proposal. Any analyte names, units, reference intervals, specimen details, interpretations, or recommendations require a separately approved source mapping, clinical review, and content-contract decision. They must not be added from the current demo UI or from the supplied handoff.

## 4. `laboratory_categories`

### 4.1 Conceptual fields

| Field | Conceptual role | Required governance note |
|---|---|---|
| `id` | Stable category identifier | Immutable internal identifier. |
| `slug` | Stable category key | Must be unique and governed; not derived solely from a folder name. |
| `display_name` | Approved category label | Must have a defined taxonomy owner and review state. |
| `description` | Optional approved category description | Must be source-traceable if it contains domain claims. |
| `parent_id` | Optional self-reference | Supports a controlled hierarchy; cycles must be prohibited by validation. |
| `professional_track` | Track boundary | Keeps categories separated across professional levels where required. |
| `status` | Category lifecycle/review state | Must prevent pending taxonomy from becoming visible as approved. |
| `source_id` | Source of category definition | Required when the category is source-derived. |
| `source_version` | Source version or taxonomy edition | Supports reproducible review. |
| `rights_status` | Rights evidence state | Required for source-derived labels or descriptions. |
| `clinical_review_status` | Clinical review state | Required when the category carries medical meaning. |
| `audit_lineage_id` | Append-only audit link | Required for taxonomy changes and decisions. |
| `created_at` / `updated_at` | Lifecycle timestamps | Required for controlled change history. |

## 5. `laboratory_keywords`

### 5.1 Conceptual fields

| Field | Conceptual role | Required governance note |
|---|---|---|
| `id` | Stable keyword identifier | Immutable internal identifier. |
| `test_id` | Foreign key to `laboratory_tests` | A keyword cannot be visible without a governed parent test. |
| `keyword` | Normalized search term | Must be derived from approved source mapping or an approved taxonomy; no uncontrolled medical synonyms. |
| `keyword_type` | Search-term classification | Should distinguish source term, approved synonym, and internal navigation term. |
| `professional_track` | Track scope | Prevents cross-track leakage. |
| `status` | Keyword lifecycle/review state | Pending terms must not be used by active search. |
| `source_id` / `source_version` | Provenance fields | Required for source-derived terms. |
| `rights_status` | Rights evidence state | Required where the term is source-derived. |
| `clinical_review_status` | Clinical review state | Required for clinically meaningful terms or synonyms. |
| `audit_lineage_id` | Append-only audit link | Required for additions, removals, and normalization decisions. |
| `created_at` / `updated_at` | Lifecycle timestamps | Required for controlled edits. |

## 6. `laboratory_references`

### 6.1 Conceptual fields

| Field | Conceptual role | Required governance note |
|---|---|---|
| `id` | Stable reference identifier | Immutable internal identifier. |
| `test_id` | Foreign key to `laboratory_tests` | Keeps evidence attached to the exact governed record. |
| `source_id` | Canonical source identity | Must match the approved source registry identity. |
| `source_version` | Source version or edition | Required for reproducibility and change review. |
| `source_title` | Preserved source title | Stored for traceable display and review context. |
| `publisher_or_owner` | Source publisher/owner evidence | Must reflect documented evidence, not an assumption. |
| `source_locator` | Precise page/section/record locator | Required for reviewer reconciliation. |
| `artifact_hash` | Hash/reference to preserved artifact | Required where available to establish identity and custody. |
| `provenance_status` | Origin and transformation state | Must distinguish confirmed, partial, and unavailable evidence. |
| `rights_status` | Rights/licence state | Must remain separate from clinical approval. |
| `clinical_review_status` | Clinical review state | Must reflect the documented reviewer decision. |
| `technical_review_status` | Technical/visual/accessibility review state | Used where applicable to the referenced artifact or display. |
| `review_decision_id` | Link to formal governance decision | Must not be inferred from a row status. |
| `audit_lineage_id` | Append-only audit link | Required for changes and release evidence. |
| `created_at` / `updated_at` | Lifecycle timestamps | Required for controlled evidence changes. |

## 7. Relations and Integrity Rules

| Relationship | Cardinality | Integrity requirement |
|---|---:|---|
| Category to test | One category to many tests | A visible test must reference an approved category; deletion should be restricted or handled through retirement. |
| Category to parent category | Optional one-to-many hierarchy | Parent references must be acyclic and track-compatible. |
| Test to keyword | One test to many keywords | Orphan keywords must be prohibited; keyword visibility follows the parent test. |
| Test to reference | One test to many references | At least one complete reference record is required before approved display. |
| Test to professional track | One explicit track scope per governed row | Cross-track reuse requires an explicit governance decision, not implicit duplication. |
| Test to audit lineage | One or more append-only events | Every transformation, review, approval, activation, and retirement event must be traceable. |

The proposal does not introduce a `related_laboratory_test` table because the requested conceptual scope is limited to four tables. If future requirements need many-to-many related items, that must be a separately reviewed extension with its own governance and track-separation rules.

## 8. Conceptual Index and Constraint Plan

The following are logical index requirements, not executable statements.

| Target | Proposed index/constraint | Reason |
|---|---|---|
| `laboratory_tests` | Unique key on `id` | Stable primary lookup. |
| `laboratory_tests` | Unique composite key on `professional_track` + `slug` | Prevents ambiguous cross-track labels. |
| `laboratory_tests` | Composite lookup on `status` + `professional_track` + `category_id` | Supports safe visible-list filtering. |
| `laboratory_tests` | Lookup on `source_id` + `source_version` | Supports source-level review and rollback. |
| `laboratory_categories` | Unique composite key on `professional_track` + `slug` | Prevents taxonomy collisions across tracks. |
| `laboratory_categories` | Lookup on `parent_id` + `status` | Supports approved hierarchy traversal. |
| `laboratory_keywords` | Composite lookup on `test_id` + `status` | Restricts search terms to visible parent records. |
| `laboratory_keywords` | Lookup on normalized `keyword` + `professional_track` + `status` | Supports bounded track-safe search. |
| `laboratory_references` | Lookup on `test_id` + `clinical_review_status` + `rights_status` | Supports approval/readiness checks. |
| `laboratory_references` | Lookup on `source_id` + `source_version` + `artifact_hash` | Supports evidence deduplication and audit reconciliation. |
| All four tables | Foreign keys with restricted deletion or governed retirement | Prevents orphaned content and evidence. |

Actual index names, column lengths, collation, foreign-key behavior, pagination strategy, and migration syntax must be resolved during a separate implementation review against the real Drizzle/MySQL configuration.

## 9. Migration Impact — NOT EXECUTED

No migration is created, generated, applied, or tested against a database in this phase. No change is made to `drizzle/schema.ts`.

A future migration would add four new logical tables and their foreign keys, indexes, lifecycle fields, and governance metadata. It could affect deployment order, database capacity, backup/restore procedures, query authorization, tRPC response contracts, and QA fixtures. It must not modify existing users/authentication tables or unrelated medical-content structures without a separate authorization.

### 9.1 Future migration plan for separate authorization

| Step | Future action | Current state |
|---:|---|---|
| 1 | Confirm approved source package, source IDs, versions, rights, and review decisions | BLOCKED — no approved Laboratory Dataset |
| 2 | Review the conceptual model against the actual Drizzle/MySQL conventions and existing security boundary | NOT EXECUTED |
| 3 | Produce an explicit migration plan covering repository/branch, schema target, table order, indexes, foreign keys, owner, reviewer, security, QA, and rollback | NOT EXECUTED |
| 4 | Obtain separate schema authorization before touching `drizzle/schema.ts` or generating a migration | NOT GRANTED |
| 5 | Implement and review the migration in a reversible branch/worktree | NOT EXECUTED |
| 6 | Run migration-specific tests and inspect deployment parity | NOT EXECUTED |
| 7 | Apply the migration only after authorization and evidence review | NOT EXECUTED |
| 8 | Import approved records through a reversible, idempotent adapter; never use an unreviewed seed | NOT EXECUTED |

### 9.2 Rollback conditions

The migration must be blocked or rolled back if foreign keys cannot preserve existing data, the approved source/version cannot be reproduced, rights or clinical review evidence is incomplete, professional-track filters cannot be enforced, audit lineage is unavailable, or tRPC responses would expose pending/unapproved rows. A rollback must preserve the existing SEG application and authentication boundaries and must not delete original source artifacts.

## 10. Dataset and Governance Prerequisites

Before this proposal can become an implementation, the project needs a preserved Laboratory source package with a stable source ID, version or edition, original location, artifact hash where available, provenance and recovery history, rights evidence, intended usage scope, taxonomy mapping, track assignment, clinical reviewer decision, technical/accessibility review where applicable, and an append-only audit trail.

The future dataset must be reconciled against the proposed fields without inventing missing values. Unavailable evidence must remain explicitly unavailable. The import contract must preserve source location, version, review state, rights state, and audit lineage for every record. Until those gates are closed, the UI must remain a demo foundation and must not be relabeled as medical content.

## 11. Validation Summary

| Validation item | Result |
|---|---|
| Required conceptual tables documented | PASS |
| Fields documented | PASS |
| Relations documented | PASS |
| Index and constraint requirements documented | PASS |
| Migration impact documented | PASS |
| Migration plan shown before any database change | PASS — plan is NOT_EXECUTED |
| `drizzle/schema.ts` modified | NO |
| Migration generated/applied | NO |
| Seed or import performed | NO |
| Approved Laboratory Dataset assumed | NO |
| Medical content activated or published | NO |

## References

1. `drizzle/schema.ts` — current Drizzle/MySQL-style schema boundary.
2. `server/db.ts` — current Drizzle database access boundary.
3. `server/routers.ts` — current tRPC application router boundary.
4. `SEG_LABORATORY_INTEGRATION_PLAN.md` — approved architecture integration plan for the foundation.
5. `SEG_LABORATORY_TRPC_ROUTER_DESIGN.md` — requested procedure design and governance constraints.
6. `SEG_LABORATORY_INTEGRATION_AUDIT.md` — prior read-only audit documenting the absent approved dataset and architecture mismatch in the supplied handoff.
