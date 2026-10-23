# SEG SCHEMA REVIEW & EXISTING SUPABASE MAPPING PACKAGE v1.0

**Project:** Smart Emergency Guide (SEG)  
**Package status:** `ACCEPTED_FOR_SCHEMA_REVIEW`  
**Phase:** `SEG DATABASE FOUNDATION — DESIGN COMPLETE`  
**Next phase:** `SCHEMA REVIEW`  
**Implementation status:** `BLOCKED_PENDING_SCHEMA_AND_SECURITY_CLOSURE`  
**Mode:** `READ_ONLY / DESIGN REVIEW / NOT IMPLEMENTED`

## Executive decision

The prior database-foundation dry-run package is accepted for **schema review only**. It is not approval for database implementation. This package closes the requested review frame by mapping the inspected Supabase declarative schema, selecting a recommended v1.1 storage model for review, selecting a recommended Atlas cardinality for review, and recording the security blockers that must be closed before any SQL migration draft is prepared.

> **No SQL, migration, adapter, import, activation, or database write is authorized by this package.**

## Review gates

| Gate | Decision | Status | What remains open |
|---|---|---|---|
| Gate 1 — Existing Supabase Schema Mapping | Current declarative objects, PK/FK, auth/profile, review/audit, and RLS baseline mapped | `MAPPED_FOR_SCHEMA_REVIEW` | Live parity and runtime integration remain unverified |
| Gate 2 — v1.1 Storage Model | Recommend `content_records` + 1:1 `content_payloads` + typed child boundaries | `RECOMMENDED_MODEL_PENDING_SECURITY_REVIEW` | Physical types, actor identity, payload implementation, clinical-case interpretation |
| Gate 3 — Atlas Cardinality | Recommend many-to-many through an explicit junction | `RECOMMENDED_MANY_TO_MANY_PENDING_SECURITY_REVIEW` | Relation vocabulary, asset version target, RLS/display semantics |
| Security Review | Current patterns are useful but insufficient for content-level authorization | `SECURITY_REVIEW_REQUIRED` | Runtime target, role separation, assignment, pathway scope, service role, live parity |

## Gate 1 — Existing Supabase Schema Mapping

The declarative Supabase package contains `public.profiles`, learner progress/bookmark/exam tables, operational/security logs, `visual_asset_reviews`, certificates, credential review tables, and admin-management audit events. The profile identity key references `auth.users(id)`, while the current application-side Drizzle schema and `server/db.ts` use MySQL/Drizzle with a user-only `users` table keyed by numeric ID and Manus OAuth `openId`. [1] [2] [3]

This means the Supabase evidence is an inspected design/runtime candidate, not a proven live persistence layer for the current application. It cannot be treated as the target of a migration until the project owner explicitly resolves the runtime/provider boundary.

The existing profile fields support professional role and learning-track vocabulary, but they are not a substitute for record-level pathway scope. Existing RLS protects owner/admin and operational tables but does not provide governed content visibility predicates based on medical review, rights/display scope, taxonomy, pathway, content state, or Atlas relation state. `visual_asset_reviews` stores admin review metadata for a unique `asset_id`; it is not an Atlas registry or content junction.

## Gate 2 — v1.1 storage-model decision

The recommended model is:

```text
content_records
       |
       | 1:1
       v
content_payloads
       |
       +--> typed payload boundary for clinical_case / clinical_skill
       +--> reviewed type-specific boundary for lesson / question_bank / book

content_records
       +--> source/version/reference relations
       +--> content_review_state and review events
       +--> content_rights_state and rights evidence
       +--> taxonomy/pathway scope
       +--> append-only content audit events
```

The root is a governed record identity and envelope anchor. The nested v1.1 envelope is reconstructed from relational components rather than flattened into unrelated columns. A generic `entity_id/entity_type` polymorphic table is rejected as the primary model because it weakens referential integrity, type-specific constraints, RLS predicates, and auditability. [4]

`clinical_case` remains a supported v1.1 content type in the design. The evidence phrase `NOT_SUPPORTED` is recorded as `UNRESOLVED` because it is not yet clear whether it refers to the current database or to the contract. The package does not remove the type, change v1.1, or create a case record.

## Gate 3 — Atlas cardinality decision

The recommended Atlas design is many-to-many:

```text
atlas_assets 1 ----< content_atlas_asset_relations >---- 1 content_records
```

A record may use multiple assets, and an asset may be reused across multiple governed records without duplicating the original artifact. An explicit junction permits role, ordering, locator, asset version, display scope, relation state, and audit evidence. A narrow one-to-one exception may be represented as a role-specific uniqueness rule for a dedicated cover or similar special role, but it must not replace the many-to-many base model.

The relation must require both content and asset gates. Medical approval does not clear image rights, and image rights clearance does not approve clinical content. `visual_asset_reviews` remains a review precedent only.

## Security review

The primary security blocker is the identity/runtime mismatch. No physical FK may be proposed until the project confirms whether governed content belongs in the MySQL/Drizzle runtime, a Supabase/PostgreSQL target, or an explicitly integrated boundary. Manus OAuth `openId`, MySQL numeric IDs, Supabase `auth.users.id`, and v1.1 actor/reviewer strings cannot be treated as interchangeable.

Additional blockers are record-level pathway scope, assigned reviewer authorization, separation of medical and rights decisions, service-role constraints, append-only content audit, Atlas display predicates, and live schema parity. The future learner read must be conjunctive across active publication, metadata, structural QA, medical review, rights/display, pathway, and asset/relation gates.

## Schema-review acceptance matrix

| Area | Accepted for review | Approved for implementation |
|---|---:|---:|
| Existing Supabase declarative object map | Yes | No |
| `content_records` as governed root | Yes | No |
| `content_payloads` 1:1 anchor | Yes | No |
| Typed payload boundaries | Yes | No |
| `clinical_case` retained in v1.1 | Yes, unresolved implementation interpretation | No |
| Atlas many-to-many junction | Yes | No |
| Future RLS matrix | Yes, as design input | No |
| Migration order | Conceptual only | No |
| SQL draft | Not included | Not authorized |
| Database changes | None | Not authorized |

## Required closure before SQL migration draft

| Closure ID | Required decision/evidence | Owner needed |
|---|---|---|
| SR-001 | Confirm target runtime/provider and whether inspected Supabase is live, target, or archival evidence | Project/technical owner |
| SR-002 | Confirm canonical actor identity mapping and FK strategy | Technical/security owner |
| SR-003 | Confirm physical shape of `content_records`, `content_payloads`, and typed payloads | Technical/schema reviewer |
| SR-004 | Resolve `clinical_case = NOT_SUPPORTED` interpretation without changing v1.1 implicitly | Medical/content governance owner |
| SR-005 | Define record-level pathway scope for Internship Doctor, EM Resident, and Shared Medical Core | Medical/content governance owner |
| SR-006 | Define medical, rights, structural, and technical reviewer assignment/conflict rules | Governance/security owners |
| SR-007 | Confirm Atlas junction vocabulary, asset-version targeting, and display predicates | Atlas/rights/security owners |
| SR-008 | Approve service-role boundary, audit immutability, and negative RLS test results | Security owner |
| SR-009 | Provide authorized live-parity evidence for the target schema | Technical owner |
| SR-010 | Approve the complete schema-review package before any SQL draft | Project owner |

## Protected boundaries and non-actions

No SQL was executed. No MCP or SQL editor was used for execution. No migration, table, policy, trigger, function, record, mapping, adapter, import, seed, activation, or publication was created. The v1.0 canonical schema and v1.1 contract were not modified. The application, authentication, routes, RLS, visual freeze, source packages, and medical content were not modified.

## Final status

> **`ACCEPTED_FOR_SCHEMA_REVIEW`**
>
> **`NOT_APPROVED_FOR_DATABASE_IMPLEMENTATION`**
>
> **`BLOCKED_PENDING_SCHEMA_AND_SECURITY_CLOSURE`**

## References

[1]: file:///tmp/seg-supabase-review/supabase/schema.sql "Declarative Supabase base schema evidence"

[2]: file:///home/ubuntu/seg-manus-status/drizzle/schema.ts "Current application-side Drizzle schema"

[3]: file:///home/ubuntu/seg-manus-status/server/db.ts "Current application-side database integration"

[4]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 canonical additive profile"

[5]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_DESIGN_PACKAGE_V1_0.md "Prior DRY-RUN foundation design package"

[6]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_EVIDENCE_REVIEW_22.md "Additional Evidence Review 22"

[7]: file:///home/ubuntu/skills/database-foundation/SKILL.md "Database Foundation governed workflow"
