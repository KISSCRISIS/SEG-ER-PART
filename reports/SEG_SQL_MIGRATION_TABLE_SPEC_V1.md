# SEG SQL MIGRATION TABLE SPEC v1

**Mode:** `LOGICAL DESIGN ONLY / NO SQL`  
**Status:** `PROVISIONAL — PENDING SCHEMA, SECURITY, AND OWNER REVIEW`

## Interpretation rules

The entries below are logical requirements, not executable column definitions. Exact PostgreSQL/MySQL types, generated expressions, extensions, and policy syntax are intentionally left for a separately authorized implementation stage. `Required` means required by the governed model when the row is applicable; `Nullable with reason` means the absence must carry a governed unresolved/blocked reason and must not be replaced by an empty value.

## 001 — `source_registry`

| Field | Key / nullability intent | Integrity and index intent |
|---|---|---|
| `source_id` | PK; required; immutable | Unique governed identifier; primary lookup index |
| `canonical_title` | Required unless unresolved with reason | Search/display lookup only; not identity by itself |
| `source_kind` | Required | Controlled vocabulary: book, guideline, question bank, other governed category |
| `owner_status` | Required or explicitly unresolved | Must not imply rights approval |
| `publisher_status` | Required or explicitly unresolved | Evidence field only |
| `version_status` | Required | Must distinguish unknown, candidate, verified, superseded |
| `rights_status` | Required state | Independent from medical approval |
| `medical_review_status` | Required state | Default pending; no activation implication |
| `created_at`, `updated_at` | Required | Operational auditability; update does not replace event history |
| `retired_at` | Nullable with reason | Retirement is preferred to deletion |

**Foreign keys:** None at the logical root unless an authorized identity relation is defined.  
**Uniqueness:** Governed source identity; title is not a unique source key.  
**Delete behavior:** Restrict when artifacts, lineage, records, rights, or audit events depend on the source.

## 002 — `source_artifacts`

| Field | Key / nullability intent | Integrity and index intent |
|---|---|---|
| `artifact_id` | PK; required; immutable | Unique artifact identity |
| `source_id` | FK to `source_registry`; required | Index for source-to-artifact traversal |
| `filename` | Required or unresolved with reason | Preserve observed name; no normalization that loses provenance |
| `artifact_type` | Required | Controlled artifact/representation vocabulary |
| `format` | Required | Format is descriptive, not rights clearance |
| `language` | Required or unresolved | Keep source evidence as observed |
| `edition` | Nullable with reason | Unknown edition remains unresolved |
| `sha256` | Required when hash evidence exists; otherwise blocked/unresolved | Exact 64-hex checksum validation in implementation; index for equality review |
| `locator` | Required or unresolved | Preserve storage/source location without inventing URLs |
| `rights_status` | Required state | Display permission remains independent |
| `artifact_status` | Required state | Candidate, verified, restricted, withdrawn, or equivalent governed vocabulary |
| `created_at`, `updated_at` | Required | Operational timestamps |

**Foreign keys:** `source_id → source_registry.source_id`.  
**Uniqueness:** Artifact identity is not automatically checksum identity; duplicate checksum is a review signal, not merge authority.  
**Delete behavior:** Restrict deletion when lineage, content relations, rights evidence, or audits exist.

## 003 — `source_lineage`

| Field | Key / nullability intent | Integrity and index intent |
|---|---|---|
| `lineage_id` | PK; required; immutable | Event/relation identity |
| `parent_source_id` or `parent_artifact_id` | One required according to relation type | Parent traversal index |
| `child_source_id` or `child_artifact_id` | One required according to relation type | Child traversal index |
| `relation_type` | Required | Controlled: representation, derived, normalized, supersedes, related, unresolved |
| `evidence_locator` | Required or unresolved with reason | Must identify supporting evidence |
| `review_status` | Required | Pending until provenance review |
| `created_by`, `created_at` | Required | Actor/time traceability |

**Foreign keys:** Parent/child identities must point only to registered source/artifact objects.  
**Uniqueness:** One asserted relation identity per pair/type/evidence context; prevent self-relation unless explicitly justified.  
**Delete behavior:** Never cascade-delete lineage evidence or its audit history.

## Content root branch — `content_records` or verified existing root

| Field | Key / nullability intent | Integrity and index intent |
|---|---|---|
| `record_id` | PK; required; immutable | Stable content identity for downstream references |
| `title` | Required or unresolved with reason | Display title; not source identity |
| `content_type` | Required | v1.1 contract enumeration; retain `clinical_case` as unresolved only where support interpretation is open |
| `record_status` | Required | Draft, pending review, blocked, approved, withdrawn, or governed equivalent |
| `version_id` or current-version relation | Required for versioned material | At most one current version state per record |
| `created_at`, `updated_at` | Required | Operational timestamps |
| `withdrawn_at` | Nullable with reason | No destructive deletion of approved history |

**Foreign keys:** Downstream relations must reference the stable record identity, not a mutable title or legacy item ID.  
**Uniqueness:** Canonical record identity and current-version invariant.  
**Delete behavior:** Soft withdraw/restrict; no destructive deletion where review, rights, audit, Atlas, or learner history depends on it.

## `content_payloads` / typed payload boundary

| Field | Key / nullability intent | Integrity and index intent |
|---|---|---|
| `payload_id` | PK; required; immutable | Payload identity |
| `record_id` | FK to content root; required | One governed payload boundary per active record/type |
| `payload_type` | Required and must match record `content_type` | Prevent cross-type payload confusion |
| `payload_version` | Required | Preserve historical payload revisions |
| `payload_body` | Required only after source/review gate permits storage; otherwise blocked | Implementation must validate against v1.1 typed constraints; no medical defaults |
| `payload_status` | Required | Draft/pending/approved/withdrawn states |
| `created_at`, `updated_at` | Required | Version traceability |

**Foreign keys:** `record_id → content_records.record_id` or verified equivalent.  
**Uniqueness:** One active payload boundary per record/type/version; no duplicate current payload.  
**Delete behavior:** Restrict; replace only through a reviewed version transition.

## 006 — review governance

### `content_review_events`

| Field | Key / nullability intent | Integrity and index intent |
|---|---|---|
| `review_event_id` | PK; immutable | Append-only event identity |
| `record_id` | FK to content root; required where record-scoped | Index by record and time |
| `source_id` or `artifact_id` | FK where source-scoped | Preserve provenance review context |
| `review_dimension` | Required | Medical, rights, provenance, visual, accessibility, publication |
| `previous_state`, `new_state` | Required | Explicit transition evidence |
| `decision` | Required | Approved, rejected, blocked, unresolved, withdrawn, or governed equivalent |
| `actor_id` | Required | Must map to an approved reviewer identity boundary |
| `actor_role` | Required snapshot | Prevent later role changes from rewriting history |
| `evidence_locator` | Required or unresolved with reason | Decision evidence traceability |
| `reason` | Required for rejection/block/conflict | No silent failure |
| `created_at` | Required | Ordering and audit reconstruction |

**Uniqueness:** Event identity immutable; no update/delete.  
**Delete behavior:** No deletion or mutation; retention policy requires separate governance approval.

### Current review state projections

A future implementation may maintain one current state per record and review dimension for efficient gating. The projection must be derivable from events, must not replace events, and must not permit a state to be changed without a corresponding event.

## 004 — `atlas_assets`

| Field | Key / nullability intent | Integrity and index intent |
|---|---|---|
| `asset_id` | PK; immutable | Stable Atlas identity |
| `asset_type` | Required | ECG, anatomy, imaging, POCUS, critical care, toxicology, or governed category |
| `storage_locator` | Required or restricted | Keep storage path separate from public display URL |
| `sha256` | Required where available; otherwise unresolved | Duplicate signal only; no automatic merge |
| `source_artifact_id` | FK where sourced | Provenance relation to registered artifact |
| `rights_state` | Required | Asset display gate independent from medical review |
| `visual_review_state` | Required | Visual review status |
| `accessibility_review_state` | Required where applicable | Accessibility gate |
| `asset_status` | Required | Candidate, approved, restricted, withdrawn, or governed equivalent |
| `created_at`, `updated_at` | Required | Asset lifecycle traceability |

**Foreign keys:** Source/rights evidence where available; do not reuse existing `visual_asset_reviews` as the Atlas registry.  
**Uniqueness:** Asset identity; checksum does not grant merge authority.  
**Delete behavior:** Retire or restrict; do not delete while referenced by content or audit evidence.

## 005 — `atlas_asset_members`

| Field | Key / nullability intent | Integrity and index intent |
|---|---|---|
| `asset_member_id` | PK; immutable | Link identity |
| `asset_id` | FK to `atlas_assets`; required | Index by asset |
| `record_id` | FK to content root; required | Index by record |
| `relation_role` | Required | Illustration, algorithm, anatomy, ECG, imaging, or governed role |
| `display_order` | Nullable | Stable ordering only where approved |
| `relation_version` | Required | Preserve link/version semantics |
| `pathway_scope` | Nullable with reason | Required if display differs by track/pathway |
| `display_state` | Required | Pending, approved, restricted, withdrawn |
| `created_at`, `updated_at` | Required | Link lifecycle traceability |

**Uniqueness:** One active asset/record/role/version combination; duplicates require review.  
**Delete behavior:** End relation through state/audit; do not cascade-delete the asset or content record.

## 007 — governed content links

| Logical relation | Required keys | Integrity intent | Delete behavior |
|---|---|---|---|
| `content_source_relations` | record, source/artifact, relation role, primary flag | Preserve source-to-record traceability; one primary relation only after review | Restrict; history retained |
| `content_reference_relations` | record, source/artifact/reference, locator | Preserve chapter/question/section locator evidence | Restrict; mark unresolved if evidence changes |
| `content_taxonomy_scopes` | record, taxonomy ID/version, pathway/track scope | Prevent duplicate scope and cross-track leakage | Retire scope; do not silently rename IDs |
| `content_rights_states` | record/artifact/asset, rights dimension, state, evidence | Rights not inferred from medical approval | Restrict; retain decision history |
| `content_publication_states` | record, publication state, gate snapshot | One current publication state; activation history retained | Revoke/withdraw, not delete |

## Index strategy

The future implementation review must consider indexes for source/artifact identity, checksum equality review, lineage parent/child traversal, content type and review/publication state, source relation, track/pathway scope, review queue assignment, rights/display state, audit time/order, and Atlas asset relation. No full-text, embedding, ranking, or medical-content optimization index is approved by this draft.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_LOGICAL_SCHEMA_V1_0.md "Prior logical schema"

[2]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_COMPATIBILITY_MATRIX_V1.md "Compatibility Matrix v1"

[3]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 contract"
