# SEG DATABASE FOUNDATION DRY-RUN LOGICAL SCHEMA v1.0

**Mode:** `CONCEPTUAL / DRY-RUN / NOT IMPLEMENTED`  
**Status:** `DESIGN_EVIDENCE_READY_FOR_REVIEW`

This document records proposed logical keys, relationship rules, index requirements, and deletion behavior. It does not define SQL types, executable constraints, or a migration.

## Logical key and relationship catalog

| Entity | Proposed primary key | Required foreign-key intent | Uniqueness / integrity intent | Deletion behavior |
|---|---|---|---|---|
| `sources` | `source_id` | None at logical root; owner/publisher are evidence fields unless an authorized identity relation is defined | Source identity must be unique within the governed source registry | Restrict deletion when artifacts or records depend on the source; preserve historical state |
| `source_artifacts` | `artifact_id` | `source_id → sources.source_id` | Checksum is stored as evidence; duplicate checksum is not automatic identity or merge proof | Restrict deletion when lineage, rights, or content relations exist |
| `source_lineage_relations` | `lineage_id` | Parent/child source or artifact identities | One relation type per evidence assertion; prevent self-relation unless explicitly justified | Never cascade-delete evidence or audit history |
| `content_records` | `record_id` | Optional governed source relation through `content_source_relations`; no direct legacy FK | `record_id` and canonical content identity unique; content type must be explicit | Soft withdraw/restrict; no destructive deletion of approved history |
| `content_source_relations` | `content_source_relation_id` | `record_id`, `source_id` and/or `artifact_id` | Primary-evidence designation must be unique per record only after review | Restrict deletion; preserve relation history through audit |
| `content_version_states` | `content_version_state_id` | `record_id`, optionally artifact evidence | At most one current version state per record; checksum must match evidence format | Retain historical versions; no overwrite of prior checksum evidence |
| `content_reference_relations` | `content_reference_relation_id` | `record_id`, reference/source identity | Locator plus reference identity should be unique per record where identical | Restrict destructive deletion; mark unresolved/withdrawn if evidence changes |
| `content_taxonomy_scopes` | `content_taxonomy_scope_id` | `record_id`, `track_id` | No duplicate record/track/taxonomy-version scope | Retain prior scope decisions in audit; do not cascade into content removal |
| `professional_tracks` | `track_id` | None at logical root | Controlled identifiers and names unique under governance | Retire, never silently rename or reuse an identifier |
| `content_type_payloads` | `payload_id` | `record_id` | Exactly one active payload boundary per record/type | Restrict deletion; replace only through reviewed version transition |
| `lesson_records` | `record_id` | `record_id → content_records.record_id` | One-to-one with `content_type = lesson` | Restrict deletion; withdraw through content state |
| `question_bank_records` | `record_id` | `record_id → content_records.record_id` | One-to-one with `content_type = question_bank` | Restrict deletion; preserve answer/explanation history |
| `book_records` | `record_id` | `record_id → content_records.record_id` | One-to-one with `content_type = book` | Restrict deletion; preserve edition/locator history |
| `clinical_case_records` | `record_id` | `record_id → content_records.record_id` | One-to-one with `content_type = clinical_case` | Not implementable until the `NOT_SUPPORTED` interpretation is resolved; no record creation now |
| `clinical_skill_records` | `record_id` | `record_id → content_records.record_id` | One-to-one with `content_type = clinical_skill` | Restrict deletion; never imply competency authorization |
| `content_review_queue` | `review_id` | `record_id` and/or source group identity | One open review item per record/review dimension unless a governed re-review exists | Close/reopen through state transition; preserve prior events |
| `content_review_states` | `review_state_id` | `record_id`, `review_id` | One current state per review dimension | Retain prior states in event history |
| `content_review_events` | `review_event_id` | `review_id`, `record_id` | Event IDs immutable; event time/actor required | Append-only; no deletion |
| `content_rights_states` | `rights_state_id` | `record_id` and/or artifact identity | One current state per governed subject and rights dimension | Restrict deletion; retain evidence and decisions |
| `rights_records` | `rights_record_id` | `artifact_id` | One current rights snapshot per artifact/dimension; history retained | Restrict deletion; no rights state inferred from medical approval |
| `content_audit_events` | `event_id` | `record_id` and governance object where applicable | Immutable event identity; append-only ordering metadata required | No deletion or mutation |
| `atlas_assets` | `asset_id` | Source/rights evidence where available | Asset identity unique; checksum/version must be preserved if available | Retire or restrict; do not delete while referenced by audit/release evidence |
| `atlas_asset_relations` | `asset_relation_id` | `asset_id`, `record_id` | One active relation per asset/record/role combination | End relation through audit; preserve historical link |
| `content_publication_states` | `publication_state_id` | `record_id` | One current publication state per record | Revoke/withdraw, never erase activation history |

## Index strategy requirements

The later implementation-specific design should evaluate, at minimum, the following logical access paths:

| Access path | Reason | Safety note |
|---|---|---|
| Source and artifact identity | Registry lookup and lineage traversal | Must not expose restricted artifact content through an index or API |
| SHA-256 checksum | Exact evidence verification and duplicate-signal review | Checksum equality is a signal, not automatic merge authority |
| Lineage parent/child and relation type | Review of representation and derivative families | Queries must return evidence and review state together |
| Content type and review/publication state | Learner/reviewer separation | Public read path must require all applicable gates |
| Content source relation | Traceability from record to artifact and locator | Unresolved relations must remain visible to reviewers only |
| Track/pathway scope | Prevent cross-track leakage | Scope queries must be tested for Internship/Resident/Shared Core separation |
| Review queue assignment/state | Reviewer worklist and conflict management | Assignment boundary must be enforced independently of index presence |
| Rights/display state | Prevent unauthorized display | Rights state is independent from medical approval |
| Audit record/time | Append-only event reconstruction | Audit reads must not imply write access |
| Atlas asset relation | Asset review and content display | Asset state and content state must both pass |

No full-text, embedding, search-ranking, or medical-content optimization index is approved by this package. Such indexes require separate privacy, rights, performance, and clinical-governance review.

## Nullability and unresolved-state rule

Missing source metadata, rights evidence, version/edition, locator, taxonomy, identity, or review evidence must be represented explicitly as unresolved/blocked state or by a governed nullable field with a documented reason. Empty strings, fabricated defaults, or inferred approvals are not acceptable substitutes.

## References

[1]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 canonical additive profile"

[2]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_DESIGN_PACKAGE_V1_0.md "SEG Database Foundation DRY-RUN Design Package v1.0"

[3]: file:///home/ubuntu/skills/database-foundation/SKILL.md "Database Foundation governed workflow"
