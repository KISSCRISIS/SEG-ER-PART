# SEG Schema v1.1 Migration Safety Plan

**Phase:** SEG Phase 7.3 — Controlled v1.1 Profile Implementation Readiness  
**Mode:** `READ_ONLY IMPLEMENTATION DESIGN REVIEW`  
**Plan status:** `DESIGN BLUEPRINT ONLY`  
**Implementation status:** `NOT AUTHORIZED`

## 1. Safety objective

This plan defines how a future SEG Schema v1.1 profile could be introduced without mutating the current v1.0 manifest, destroying source lineage, bypassing clinical or rights governance, or exposing unapproved content. It is a safety design, not a migration script, database plan, adapter implementation, or authorization to execute.[1] [2]

The central principle is:

> **Preserve v1.0, add v1.1 beside it, validate in dry-run isolation, and require explicit authorization before any integration.**

## 2. v1.0 preservation

The current canonical manifest and its validator remain frozen as the legacy path. No in-place widening of its closed-world enum or `additionalProperties: false` behavior is allowed.[1]

The future v1.1 profile must be a separate immutable artifact with its own profile identifier, `$id`, version, checksum, owner, and audit record. Existing v1.0 records are not rewritten, reserialized, renamed, recategorized, or copied solely because v1.1 exists.

The preservation requirements are:

| Preservation target | Required treatment |
|---|---|
| v1.0 schema file | Keep byte-for-byte unchanged unless a separately authorized future governance decision replaces it. |
| v1.0 validator | Keep available and strict; do not widen it to accept v1.1-only types. |
| Existing records | Preserve record IDs, titles, content types, source IDs, locations, versions, checksums, references, rights, taxonomy, review values, and audit events. |
| Existing `book` records | Keep `content_type = book`; do not convert them to `reference`. |
| Original sources | Preserve in place. Never delete, rename, merge, archive, or overwrite them as part of v1.1 preparation. |
| Application and database | No changes in the profile-preparation phase. The schema is a record contract, not evidence of database tables or routes. |

## 3. Controlled preparation sequence

A future implementation run should proceed in the following order, with a stop gate after each stage:

| Stage | Required activity | Stop condition |
|---|---|---|
| 0. Authorization preflight | Record the exact implementation authorization, profile ID, owner, scope, repository, target environment, and excluded actions. | Missing per-run authorization produces `BLOCKED_IMPLEMENTATION_AUTHORIZATION`. |
| 1. Artifact freeze | Freeze the v1.0 schema, approved v1.1 profile draft, source package, contract hashes, and governance references. | Hash mismatch or untracked changes produces `BLOCKED_ARTIFACT_DRIFT`. |
| 2. Contract review | Confirm the executable v1.1 schema serializes the approved profile, Case contract, Skill contract, and Reference Framework relationship without semantic expansion. | Any unapproved field, enum, relationship, or requiredness change produces `BLOCKED_CONTRACT_DRIFT`. |
| 3. Read-only structural dry-run | Validate a documented pilot against v1.1 without writing to a database, application, storage bucket, or learner-facing surface. | Any failure, unknown field, missing provenance, ambiguous track, or unresolved mapping remains blocked. |
| 4. Dual validation | Validate legacy candidates through unchanged v1.0 and new extension candidates through explicitly selected v1.1. | A v1.0 record changes meaning or a profile is inferred automatically. |
| 5. Governance gates | Complete separate provenance, clinical/relevant review, rights, taxonomy/track, audit, and Content QA evidence. | Any missing or conflicting evidence blocks integration. |
| 6. Adapter dry-run | Map every approved field to an explicitly supplied target contract, check idempotency, and generate only a separate report. | Missing target contract, mapping, stable key, conflict rule, or rollback mechanism. |
| 7. Per-run integration decision | Obtain a new explicit authorization for the exact artifact and target. | No authorization means no SQL, import, activation, or publication. |
| 8. Controlled integration, if separately authorized | Execute only the approved additive and reversible operation, with before/after evidence and an immediate rollback path. | Any unexpected change stops the run and triggers rollback review. |

## 4. Dry-run validation requirements

The dry-run must remain read-only and must not create production records. It must record:

1. The exact v1.1 profile identifier, schema path, `$id`, and SHA-256.
2. The exact input artifact paths, source IDs, source locations, source versions, and SHA-256 values.
3. The selected validator and validator version.
4. The explicit profile selection; profile auto-detection is prohibited.
5. Per-field mapping and status for the shared envelope, type-specific payload, and relationships.
6. Unknown, missing, lossy, derived, unresolved, or unsupported fields.
7. Observed medical-review state without converting it into approval.
8. Rights, taxonomy, track, and audit blockers as separate findings.
9. Duplicate, conflict, stable-key, retry, and idempotency outcomes.
10. Explicit non-actions: no content mutation, no schema mutation, no database change, no import, no activation, no publication, and no learner exposure.

A dry-run `PASS` would mean only that the supplied artifact and mapping satisfy the stated structural and integration-readiness checks. It would not grant clinical approval, rights approval, activation, or publication.[2] [3]

## 5. Adapter isolation

Any future adapter must be additive, separately versioned, and isolated from the existing application and database boundaries until a per-run authorization explicitly names the target. The adapter must not infer database tables, columns, foreign keys, RLS, storage buckets, routes, or API contracts from the v1.1 field names.[3]

The isolation design must preserve the current application architecture, authentication, security boundaries, empty-state behavior, medical governance, content structure, and original source package. The adapter must be capable of being disabled without deleting v1.0 records or source evidence.

The adapter dry-run must define:

| Safety property | Required rule |
|---|---|
| Stable identity | Use an explicitly approved stable key; do not derive identity from a title or path. |
| Duplicate behavior | Reject or report duplicate IDs; never silently merge records. |
| Conflict behavior | Preserve both evidence paths and escalate conflicts; do not choose a winner automatically. |
| Retry behavior | Retrying the same dry-run or authorized operation must be idempotent under the approved contract. |
| Version policy | Treat source version/checksum and profile version as separate values. |
| Exposure boundary | Keep records unavailable to learners until separate activation authorization. |
| Track boundary | Reject mixed Internship/Resident content unless explicit track evidence and an approved relationship are supplied. |

## 6. Rollback design

Rollback must be possible without deleting original sources, v1.0 records, governance evidence, or audit history. The preferred rollback is a control-plane reversal: disable v1.1 profile selection and adapter routing, stop further processing, and return validation to the unchanged v1.0 path where applicable.

A future rollback package must include:

| Rollback item | Required evidence |
|---|---|
| Trigger | The failure, drift, conflict, or governance decision that caused rollback. |
| Scope | Exact profile, artifact hashes, record IDs, and target environment affected. |
| Disable action | The explicit reversible control that prevents further v1.1 validation or exposure. |
| Exposure reversal | Evidence that any separately authorized learner-facing route is disabled or withdrawn without deleting source data. |
| Data preservation | Confirmation that v1.0 records, sources, checksums, rights evidence, and audit events remain intact. |
| Revalidation | A fresh v1.0/v1.1 dry-run decision before any retry; no blind replay. |
| Approval | Separate owner, clinical/relevant, rights, QA, and implementation decisions as applicable. |

No rollback may delete, rewrite, merge, or conceal an original source or governance event. A rejected or withdrawn item remains unavailable until a new documented decision is recorded.[2]

## 7. No destructive migration

The v1.1 design prohibits destructive migration. In particular, a future implementation must not:

- alter the current v1.0 schema in place;
- remove or rename existing content types;
- convert `book` to generic `reference`;
- overwrite or delete original source files;
- replace source checksums or version evidence;
- silently infer track, taxonomy, reviewer, rights, or approval values;
- merge duplicate candidates without a governed decision;
- discard unmapped or unresolved fields;
- write directly to production tables or learner-facing storage;
- activate or publish records merely because structural validation passes.

If an additive projection is later authorized, the original record and source package remain the system of evidence, and the projection must be independently traceable and reversible.

## 8. Readiness gates before any controlled implementation

The following gates must be satisfied in a later, separately authorized phase:

| Gate | Required status |
|---|---|
| Profile contract | Exact v1.1 executable artifact approved and hashed. |
| Legacy preservation | v1.0 schema, validator, and existing records verified unchanged. |
| Field mapping | Every v1.1 field has an explicit mapping or a documented unresolved state. |
| Governance | Clinical/relevant review, rights review, taxonomy/track review, and audit evidence are separate and attributable. |
| QA | The exact dry-run artifact passes Content QA. |
| Idempotency | Stable key, duplicate, conflict, retry, and checksum policy approved. |
| Rollback | Reversible disablement and exposure-reversal plan tested or evidenced. |
| Authorization | A per-run implementation authorization names the exact artifact and target. |

Missing any one of these gates means `BLOCKED`; no implementation inference is permitted.

## 9. Plan conclusion

The safety plan supports a controlled, additive, reversible v1.1 path while protecting the frozen v1.0 contract and all governance boundaries. It is not a migration authorization and contains no executable migration operation.

## References

[1]: file:///home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "Canonical SEG governed content manifest"
[2]: file:///home/ubuntu/seg-internship-output/SEG_SCHEMA_V1_1_PROFILE_SPEC.md "SEG Schema v1.1 Profile Specification"
[3]: file:///home/ubuntu/skills/seg-content-importer-integration/SKILL.md "SEG Content Importer / Integration"
[4]: file:///home/ubuntu/skills/seg-medical-governance/SKILL.md "SEG Medical Governance"

---

**Final status:** `DESIGN BLUEPRINT ONLY`  
**No migration, adapter execution, database action, JSON generation, import, activation, or publication was performed.**
