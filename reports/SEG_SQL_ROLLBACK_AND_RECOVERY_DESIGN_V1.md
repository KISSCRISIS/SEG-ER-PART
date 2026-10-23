# SEG SQL ROLLBACK AND RECOVERY DESIGN v1

**Mode:** `DESIGN_ONLY / NO ROLLBACK EXECUTION`  
**Status:** `REVIEW REQUIRED BEFORE IMPLEMENTATION`

## Rollback principle

Rollback must be additive, dependency-aware, evidence-preserving, and reversible. It must affect only objects created by an explicitly authorized SEG governed-layer migration. It must not alter existing auth, profiles, learner tables, operational/security logs, `_prisma_migrations`, `audit_logs`, storage boundaries, application code, routes, or medical source/content.

Rollback is not a method for bypassing clinical or rights governance. A database rollback cannot turn an unapproved record into an approved record, and a release rollback cannot erase review history.

## Preconditions before any authorized run

Before a future implementation, the owner must record the target provider/schema/environment, approved object allowlist, pre-migration catalog snapshot, backup/restore evidence, migration checksum, actor identity, maintenance window, expected dependencies, and QA/rollback owner. No rollback procedure may depend on an unverified target or an API response that conflicts with direct table evidence.

## Reverse dependency order

| Reverse order | Object group | Rollback intent | Required safety check |
|---|---|---|---|
| `009` | New indexes and constraints | Remove only indexes/constraints created by the authorized run | Confirm names/checksums and no dependent object outside allowlist |
| `008` | New RLS policies or grants | Remove only newly created policies/grants after learner visibility is blocked | Confirm no existing policy or grant is touched; fail closed |
| `007` | Content/source/reference/taxonomy/pathway/rights/publication links | Disable or withdraw relations; destructive removal only if empty and explicitly approved | Confirm no governed record, learner history, audit, or Atlas link depends on relation |
| `006` | Review state projections and review-event layer | Prefer logical disablement; retain immutable events and decision evidence | Confirm event history is retained and current state is non-publishable |
| `005` | `atlas_asset_members` | End links through state/audit; remove only empty unreferenced test links in isolated environment | Confirm asset/content/audit references are not orphaned |
| `004` | `atlas_assets` | Retire/restrict assets; do not delete referenced assets | Confirm rights and display evidence remain accessible to reviewers |
| `003` | `source_lineage` | Retain lineage evidence; mark relation invalid/withdrawn if required | Never cascade-delete provenance history |
| `002` | `source_artifacts` | Retain artifact identity and checksum; restrict display or retire representation | Confirm source, rights, and content relations remain reconstructable |
| `001` | `source_registry` | Retire source root only when no governed dependency remains | Confirm no artifact, lineage, content, rights, or audit dependency |

## Failure handling

A failure during preflight stops before object creation. A failure during an atomic new-object operation should use the target engine’s approved transaction behavior only when the transaction boundary is verified. A failure after committed objects exist requires catalog comparison against the pre-migration snapshot, followed by a controlled reverse plan. No `CASCADE` behavior is approved by this design for governed source, content, Atlas, review, or audit objects.

If rollback cannot prove that an object is isolated and newly created, the operator must stop and preserve the object in a non-publishable state while opening a governance incident. No guessed drop, rename, merge, or cleanup is allowed.

## Data-preservation rules

The following must not be deleted or overwritten as part of rollback: source checksums, artifact locators, lineage assertions, review events, rights evidence, medical decisions, visual/accessibility decisions, publication history, Atlas display decisions, or audit events. Corrections use new events or withdrawal states.

Existing tables must not be used as rollback scratch space. Existing `profiles`, auth linkage, learner progress/bookmark/attempt history, credential review events, `audit_logs`, and migration metadata remain outside the new-layer rollback boundary.

## Learner safety rule

At every rollback checkpoint, learner reads must fail closed for affected records and assets unless the complete publication, medical, rights, visual, accessibility, and pathway predicates are proven against the restored state. A partial rollback must never expose a record or Atlas asset merely because its row remains present.

## Recovery evidence

A completed future rollback would require a report containing pre/post object inventory, migration checksums, dependency verification, RLS/policy comparison, learner-read negative-test results, review/audit preservation evidence, backup/restore references, and owner/security sign-off. This report is a design requirement only; no recovery has been performed.

## Status

`ROLLBACK_DESIGN_READY_FOR_REVIEW`  
`ROLLBACK_NOT_EXECUTED`  
`NO_EXISTING_TABLES_AUTHORIZED_FOR_REMOVAL`

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_SQL_MIGRATION_PLAN_V1.md "SEG SQL Migration Plan v1"

[2]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_ROLLBACK_PLAN_V1_0.md "Prior conceptual rollback plan"

[3]: file:///home/ubuntu/skills/database-foundation/SKILL.md "Database Foundation governed workflow"
