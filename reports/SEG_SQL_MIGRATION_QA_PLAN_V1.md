# SEG SQL MIGRATION QA PLAN v1

**Mode:** `DESIGN_ONLY / QA PLAN NOT EXECUTED`  
**Status:** `BLOCKED_PENDING_SCHEMA_SECURITY_AND_IMPLEMENTATION_AUTHORIZATION`

## QA boundary

This plan defines acceptance checks for a future isolated dry-run and authorized implementation. It does not connect to Supabase, execute SQL, create test records, import medical content, or activate any record. Medical correctness and rights approval remain governed reviews, not database QA conclusions.

## Validation layers

| Layer | Test objective | Evidence required | Pass condition |
|---|---|---|---|
| Target parity | Confirm provider, schema, environment, identity, and runtime boundary | Direct catalog/config evidence and owner sign-off | Target is unambiguous and matches the approved design |
| Contract alignment | Map v1.1 required envelope and content types to logical storage | Schema mapping matrix and conditional payload review | Required `source`, `version`, `references`, `rights`, `taxonomy`, `medical_review`, and `audit` semantics are preserved |
| Object allowlist | Prevent accidental changes to protected objects | Pre/post catalog diff | Only explicitly authorized new objects differ |
| PK/FK integrity | Verify stable identities and relation targets | Constraint inspection and orphan checks | No orphaned governed relation; no legacy-ID guesswork |
| Uniqueness | Verify source/artifact/content/Atlas/review uniqueness rules | Duplicate and current-state checks | Duplicates are blocked or remain explicitly reviewable; checksum does not auto-merge |
| Nullability | Verify unresolved evidence representation | Null/reason/state checks | Missing evidence is blocked/unresolved with reason, never fabricated |
| Version/lineage | Verify immutable checksum/version/lineage history | Artifact and relation reconstruction | Parent/child and representation claims are traceable |
| Review state | Verify independent medical, rights, provenance, visual, accessibility, and publication dimensions | State-machine transition tests and event reconstruction | No state changes without corresponding event; invalid transitions fail |
| RLS | Verify actor, assignment, pathway, conflict, and publication predicates | Positive/negative role matrix | Unauthorized reads/writes/deletes fail closed |
| Audit | Verify append-only behavior and attribution | Insert/update/delete and actor tests | Events cannot be mutated/deleted by ordinary actors; corrections append new events |
| Atlas | Verify many-to-many relation, asset status, display order, and dual gates | Junction cardinality and display tests | Asset and content gates both pass before learner display |
| Pathways | Verify Internship, EM Resident, and Shared Core separation | Cross-track query tests | Out-of-scope records/assets are not visible |
| Existing-table protection | Verify no changes to current profiles/auth/learner/operational/security objects | Catalog, grants, policy, and checksum comparison | Existing objects are byte/definition-equivalent to baseline |
| Rollback | Rehearse reverse dependency order in isolated environment | Pre/post snapshots and restore evidence | New layer can be disabled/restored without touching existing tables or erasing audit |
| Performance | Validate only approved lookup paths | Query-plan evidence on non-medical test fixtures | Required access paths are indexed without exposing data through indexes |

## Required negative tests

The future isolated QA run must prove that a learner cannot read pending medical content, rights-pending assets, restricted source artifacts, withdrawn records, out-of-pathway content, or Atlas links whose asset or content gate is incomplete. It must prove that a medical reviewer cannot edit rights state, a rights reviewer cannot edit medical state, an Atlas operator cannot approve clinical content, a provenance reviewer cannot activate publication, and an administrator cannot mutate append-only review events without an explicitly approved exception.

The run must also prove that duplicate checksum signals do not merge records, a reviewer cannot self-approve created/transformed content, service-role access is not exposed to ordinary clients, and `_prisma_migrations`/`audit_logs` remain outside the new-layer change set.

## Clinical and rights separation

A database QA pass cannot approve medical content, doses, scenarios, clinical cases, or educational correctness. A rights QA pass cannot approve display merely because a source row exists. The test harness must use synthetic or non-medical fixtures unless a separately approved governed test package exists.

## Release gate

A future implementation is blocked if any of the following occurs: target parity is unresolved; protected existing objects change; a required v1.1 envelope field has no traceable storage; an invalid review transition succeeds; a learner sees a non-published or non-permitted object; a review event can be mutated/deleted; a cross-track read succeeds; Atlas dual-gate enforcement fails; rollback cannot be rehearsed; or evidence is missing for rights, provenance, or security ownership.

## Status

`QA_PLAN_READY_FOR_REVIEW`  
`QA_NOT_EXECUTED`  
`NO_DATABASE_CHANGE_PERFORMED`

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_SQL_RLS_DESIGN_DRAFT_V1.md "SEG SQL RLS Design Draft v1"

[2]: file:///home/ubuntu/seg-internship-output/SEG_SQL_ROLLBACK_AND_RECOVERY_DESIGN_V1.md "SEG SQL Rollback and Recovery Design v1"

[3]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 contract"

[4]: file:///home/ubuntu/skills/database-foundation/SKILL.md "Database Foundation governed workflow"
