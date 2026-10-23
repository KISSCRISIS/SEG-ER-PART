# SEG SQL MIGRATION DESIGN DRAFT v1

**Project:** Smart Emergency Guide (SEG)  
**Mode:** `DESIGN_ONLY / DRY_RUN / NO SQL EXECUTION`  
**Status:** `DESIGN_DRAFT_READY_FOR_SCHEMA_AND_SECURITY_REVIEW`  
**Implementation:** `NOT_STARTED`  
**Database change authorization:** `NOT_AUTHORIZED`

## Executive decision

This document is a **logical migration design**, not executable SQL and not approval to change Supabase, MySQL/Drizzle, the application, authentication, RLS, or medical content. It describes the future dependency order, relational boundaries, key strategy, integrity requirements, RLS intent, and rollback controls requested by SEG governance.

The draft follows the current compatibility decisions. Existing identity, profile, learner-interaction, administrative, operational-log, credential-review, and protected-storage structures may be reused only within their existing domains or as bounded patterns. `_prisma_migrations` is not a content-storage target. `audit_logs` remains under a separate security review. Existing `content` and `content_versions` tables remain `VERIFY_BEFORE_DECISION`; no draft step is allowed to mutate or assume them until their exact definitions and runtime parity are verified.

The governed content boundary remains anchored to the v1.1 envelope: `source`, `version`, `references`, `rights`, `taxonomy`, `medical_review`, and `audit`. The logical relational design therefore separates source governance, Atlas governance, review governance, content linkage, and access-control concerns rather than introducing a flat content table.

## Current state and stop boundary

| Area | Current state |
|---|---|
| Compatibility Matrix v1 | `COMPLETE` |
| Reuse decisions | `COMPLETE` for bounded reuse; unresolved claims remain open |
| Security Review Queue | `CREATED` |
| Atlas direction | `PROVISIONAL MANY-TO-MANY` |
| Source governance need | `CONFIRMED` |
| SQL migration design | `THIS DOCUMENT / DESIGN ONLY` |
| SQL file | `NOT CREATED` |
| SQL execution | `BLOCKED` |
| Database change | `NOT AUTHORIZED` |
| Import, adapter, activation | `NOT STARTED / NOT AUTHORIZED` |

> **No phase in this draft creates tables, writes policies, runs migrations, modifies existing objects, or moves medical content.**

## Design principles

The design preserves the chain `Source → Version → Governance Record → Clinical Review → Rights Review → Approval → Implementation Authorization → Migration/Import → Activation`. A record cannot be learner-visible merely because it exists, has a source, or has passed one review dimension. Medical approval, rights/display permission, pathway scope, and publication are independent gates.

The design is additive and reversible. Existing tables are not altered by this draft. Historical evidence, source artifacts, review decisions, and audit events are retained rather than overwritten or hard-deleted. Missing or disputed evidence is represented as an explicit unresolved or blocked state; it is never replaced with an empty string, inferred approval, or fabricated default.

The design keeps security remediation separate from Atlas migration. `_prisma_migrations`, `audit_logs`, SECURITY DEFINER functions, leaked-password protection, and service-role exposure are security-review subjects and are not migration targets in this draft.

## Logical target boundary

The proposed governed layer is composed of the following domains:

| Domain | Logical objects | Purpose |
|---|---|---|
| Source Governance | `source_registry`, `source_artifacts`, `source_lineage` | Preserve source identity, artifact identity, checksum/version evidence, and lineage relationships |
| Content Contract Boundary | Verified existing content root or future `content_records`, plus `content_payloads` if needed | Hold the v1.1 envelope and typed payload boundary without assuming current content compatibility |
| Review Governance | `content_review_events`, review-state projections, medical/rights/visual/accessibility dimensions | Preserve reviewer decisions and independent gate states |
| Atlas Governance | `atlas_assets`, `atlas_asset_members` | Register visual assets and connect them to content through a many-to-many relation |
| Content Linkage | source/content, reference/locator, taxonomy/pathway, Atlas junctions | Make provenance, scope, display, and downstream relations explicit |
| Audit | `content_audit_events` | Append-only reconstruction of governed changes and decisions |
| Access control | Future RLS predicates and role boundaries | Enforce least privilege and published-only learner access |

The term `atlas_asset_content_links` is retained as a descriptive relationship label. The canonical proposed physical name for the many-to-many junction is **`atlas_asset_members`** so that migration step `005_atlas_asset_members` and the logical ERD refer to one object, not two duplicate junction tables.

## Migration plan summary

| Step | Design unit | Logical outcome | Preconditions | Status |
|---|---|---|---|---|
| `000` | Target and parity preflight | Confirm provider, schema, environment, identity boundary, and exact reusable-table definitions | Owner, target, direct evidence | `BLOCKED_PENDING_VERIFICATION` |
| `001` | `source_registry` | Create source identity and governance root in a future authorized target | 000; rights/owner metadata model | `DESIGN_ONLY` |
| `002` | `source_artifacts` | Create artifact/representation identity with checksum and version evidence | 001 | `DESIGN_ONLY` |
| `003` | `source_lineage` | Create immutable parent/child and derived-lineage assertions | 001, 002 | `DESIGN_ONLY` |
| `004` | `atlas_assets` | Create Atlas asset registry separate from existing visual review/storage patterns | 000; asset rights model | `DESIGN_ONLY` |
| `005` | `atlas_asset_members` | Create many-to-many Atlas-to-content links with role/order/scope | 004; content-root decision | `PROVISIONAL N:M` |
| `006` | `review_events` | Create domain-specific review events and current-state projections | Role model, conflict rules, state machine | `DESIGN_ONLY` |
| `007` | `content_links` | Create source, reference, taxonomy, pathway, rights, and content-to-Atlas relations | Content-root decision; 001–006 | `BLOCKED_PENDING_CONTENT_SCHEMA` |
| `008` | `rls_design` | Define policies and negative tests without writing policies | Security review and identity parity | `DESIGN_ONLY / NOT_EXECUTABLE` |
| `009` | `indexes_constraints` | Apply only approved new-object indexes/constraints in a future authorized run | All prior gates and QA | `DESIGN_ONLY` |

The order is intentionally additive. If existing `content`/`content_versions` tables are later proven contract-compatible, the content-root portion of this plan becomes an adapter/linkage step. If they are not compatible, a separate governed content layer must be authorized; this draft does not choose between those outcomes by assumption.

## Content record decision gate

Before step `007`, the project must choose one of the following after direct schema evidence:

| Option | Use condition | Design consequence |
|---|---|---|
| Reuse existing `content` as the v1.1 root | Exact keys, versioning, provenance, rights, review, taxonomy, audit, and RLS are demonstrably compatible | Add only governed relations that are missing; do not silently reinterpret legacy columns |
| Reuse existing `content` as downstream content only | Table stores learner-facing material but lacks the v1.1 envelope | Create a governed `content_records` root and link downstream content explicitly |
| Create `content_records` + `content_payloads` | No compatible root exists or payload types need strict separation | Use one envelope anchor and one typed payload boundary; keep content types explicit |
| Polymorphic content table | Not recommended by this draft | Rejected unless a separate architecture review proves integrity and governance equivalent |

`clinical_case` remains in the v1.1 contract. The earlier `NOT_SUPPORTED` statement is preserved as `UNRESOLVED`: it must be clarified as either a current-database limitation or a contract limitation. This draft does not delete the type or create clinical-case records.

## Atlas decision gate

The provisional Atlas model is **many-to-many**:

```text
atlas_assets
    |
    | 1-to-many
    v
atlas_asset_members
    ^
    | many-to-1
    |
content root
```

A single asset may support multiple governed records, and a single record may use multiple assets. The junction must preserve relationship role, display order, evidence/version, pathway scope where applicable, and link state. A direct 1:1 foreign key is not selected because it would force asset duplication or prevent reuse across lessons, cases, skills, and other record types.

The cardinality remains **provisional until content-schema review and security review**. The final decision must confirm whether the same asset can be shown across tracks, whether rights are asset-level or relation-level, and whether a relation requires its own medical/visual review state.

## Review and approval boundary

Review events are separate from review-state projections. An event records who acted, in what role, on which governed object, at what time, with what decision, evidence locator, and reason. A current-state projection supports efficient gating but does not replace the append-only event history.

The following dimensions remain independent:

| Dimension | Minimum authority boundary | Learner effect |
|---|---|---|
| Medical review | SEG Medical Decision Owner or explicitly delegated clinical reviewer | Required before medical content can pass publication gate |
| Rights review | Rights Reviewer with evidence locator and display scope | Required before source/artifact/asset display |
| Visual review | Visual/Atlas reviewer | Required where asset presentation is governed |
| Accessibility review | Accessibility reviewer | Required where published display requires accessibility acceptance |
| Provenance review | Provenance Reviewer | Required for source/locator/lineage completeness |
| Publication | Controlled release authority after all applicable gates | Enables learner visibility only when all predicates pass |

Admin authority manages controlled records and assignments but does not automatically substitute for clinical or rights approval. Conflicts of interest must block self-approval where the same actor created or materially transformed the subject.

## RLS design summary

RLS is a future policy design, not executable policy text. All new governed objects should default to deny until role source, actor identity, record scope, pathway scope, and service-role behavior are approved.

| Role | Intended access | Explicit exclusion |
|---|---|---|
| Atlas Operator | Asset metadata and relationship management within assigned scope | Cannot grant medical approval or rights permission |
| Medical Reviewer | Medical review events and assigned governed records | Cannot alter rights evidence or bypass provenance |
| Rights Reviewer | Rights states, evidence locators, and display predicates | Cannot grant medical approval |
| Provenance Reviewer | Source, artifact, lineage, locator, and checksum evidence | Cannot activate content |
| Admin | Controlled management, assignment, and operational oversight | Cannot self-approve clinical/rights decisions unless separately authorized and conflict-free |
| Learner | Published, permitted, pathway-scoped content and eligible Atlas assets | Cannot read pending, blocked, restricted, or audit-only evidence |
| Service role | Controlled migrations/system maintenance with audited attribution | Must not be exposed to ordinary client requests; not a substitute for reviewer identity |

Learner visibility requires the conjunction of applicable gates: content publication is active, medical review is approved, rights/display permission is approved, required visual/accessibility states are approved, pathway scope matches the learner, and no withdrawal or restriction is active. Indexes must never be treated as access control.

## Rollback design summary

Rollback is dependency-aware and additive. It must remove only new objects created by an authorized run, in reverse dependency order, and must never alter existing profiles, auth, learner tables, operational logs, `_prisma_migrations`, `audit_logs`, or protected application tables.

The expected reverse order is `009` indexes/constraints, `008` new policies if separately authorized, `007` content links, `006` review structures, `005` Atlas junction, `004` Atlas assets, `003` lineage, `002` artifacts, and `001` source registry. Review and audit history must be retained where any governed records or decisions have been created; logical withdrawal or feature-flagged disablement is preferred to destructive deletion.

A failed preflight blocks the run. A failure after object creation requires a checkpointed transaction or isolated rollback procedure appropriate to the target engine, followed by catalog verification, RLS verification, and audit reconciliation. No rollback action is executed by this design document.

## Required approvals before any SQL artifact

Before a future SQL file is written or applied, the project must independently approve target provider/runtime, exact schema and table definitions, content-root decision, Atlas cardinality and FK strategy, role and identity mapping, security review queue, migration ownership, backup/restore evidence, rollback rehearsal, QA acceptance criteria, and the list of tables authorized for change. Clinical, rights, and source governance gates remain independent of database implementation approval.

## Final status

> **`SEG DATABASE FOUNDATION — SQL MIGRATION DESIGN DRAFT v1 READY FOR SCHEMA / SECURITY REVIEW`**
>
> **`SQL EXECUTION: BLOCKED`**
>
> **`DATABASE CHANGE: NOT AUTHORIZED`**
>
> **`CONTENT IMPORT / ACTIVATION: NOT AUTHORIZED`**

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_COMPATIBILITY_MATRIX_V1.md "SEG Database Compatibility Matrix v1"

[2]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_LOGICAL_SCHEMA_V1_0.md "SEG Database Foundation DRY-RUN Logical Schema v1.0"

[3]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_RLS_MATRIX_V1_0.md "SEG Database Foundation DRY-RUN RLS Matrix v1.0"

[4]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_STATE_MACHINE_V1_0.md "SEG Database Foundation DRY-RUN State Machine v1.0"

[5]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_ROLLBACK_PLAN_V1_0.md "SEG Database Foundation DRY-RUN Rollback Plan v1.0"

[6]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 contract"

[7]: file:///tmp/seg-supabase-review/supabase/schema.sql "Declarative Supabase schema evidence"

[8]: file:///home/ubuntu/skills/database-foundation/SKILL.md "Database Foundation governed workflow"
