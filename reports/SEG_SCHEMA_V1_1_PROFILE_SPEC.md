# SEG Schema v1.1 Profile Specification

**Phase:** SEG Phase 7.3 — Controlled v1.1 Profile Implementation Readiness  
**Mode:** `READ_ONLY IMPLEMENTATION DESIGN REVIEW`  
**Specification status:** `DESIGN BLUEPRINT ONLY`  
**Implementation status:** `NOT AUTHORIZED`

## 1. Purpose and authority boundary

This document defines the recommended implementation blueprint for a future SEG Schema v1.1 additive profile. It translates the Phase 7.2 architecture decision into an explicit profile boundary while preserving the current v1.0 canonical manifest as an unchanged legacy contract.[1] [2]

The document is not the v1.1 JSON Schema file. It does not modify `manifest.schema.json`, generate production records, create an adapter, run a migration, or authorize import, activation, publication, or learner exposure.

## 2. Recommended profile identity

The recommended stable profile identifier is:

| Identifier component | Recommendation |
|---|---|
| Human-readable profile ID | `SEG_CONTENT_RECORD_V1_1` |
| Recommended schema `$id` | `https://seg-guide.example/schemas/seg-content-record.v1.1.schema.json` |
| Draft | JSON Schema Draft 2020-12, matching the current v1.0 contract. |
| Profile role | Additive extension profile for governed SEG content records. |
| Legacy profile | `SEG_CONTENT_RECORD_V1_0`, represented by the unchanged current canonical manifest. |

The identifier is a recommendation for the separately authorized implementation phase. No file at the recommended `$id` was created by Phase 7.3, and the current `$id` remains unchanged.[2]

## 3. Relationship to v1.0

The v1.1 profile is a **new, separately selected profile** rather than an in-place modification of the v1.0 schema. The current v1.0 manifest remains the authoritative closed-world contract for existing records, with its current required envelope, enum, and `additionalProperties: false` behavior preserved.[2]

The recommended v1.1 profile is additive in the following sense:

1. Existing v1.0-compatible records retain their meaning and remain valid under v1.0.
2. Existing v1.0 records should remain structurally acceptable under v1.1 when they use only the v1.0 envelope and supported legacy types.
3. New `clinical_case` and `clinical_skill` records require the v1.1 type-specific payload contract.
4. `book` remains canonical; the optional `reference_framework` relationship is introduced only in the v1.1 profile.
5. The v1.0 schema file is not widened, replaced, or rewritten.

The phrase “backward compatible” means preservation of existing record validity and interpretation. It does not require the old v1.0 validator to accept new v1.1 records. An old strict validator may reject a v1.1 record because it does not know the new type or relationship; that rejection is expected and prevents silent contract drift.

## 4. Supported content types in the v1.1 Internship profile

The controlled Internship profile supports the following five content types:

| Content type | v1.1 profile role | Payload rule |
|---|---|---|
| `lesson` | Existing canonical Lesson type | Legacy envelope remains valid. A type-specific payload is optional until a separate Lesson payload contract is approved. |
| `question_bank` | Existing canonical Question Bank type | Legacy envelope remains valid. Embedded Case questions are not converted automatically. A type-specific payload is optional until a separate Question Bank payload contract is approved. |
| `book` | Existing canonical bibliographic/reference type | Legacy envelope remains valid. Optional `reference_framework` relationship is allowed only under the v1.1 contract. |
| `clinical_case` | New controlled Clinical Case type | A v1.1 `content` payload is required and must conform to the Clinical Case contract. |
| `clinical_skill` | New controlled Clinical Skill type | A v1.1 `content` payload is required and must conform to the Clinical Skill contract. |

The current global manifest contains other types, including `html`, `image`, `video`, `knowledge_unit`, `module`, `flashcard`, and `assessment`. Their existence in v1.0 is not revoked by this Internship-focused profile. They are outside the controlled five-type scope of this document and must not be silently included in v1.1 Internship bundles without a separately approved profile/context decision.[2]

## 5. Recommended profile structure

The future v1.1 record should retain the current shared envelope at the root:

| Root group | Recommended v1.1 treatment |
|---|---|
| Identity | Preserve `record_id`, `title`, `content_type`, and `language` rules from v1.0. |
| Provenance | Preserve `source.source_id`, `source.publisher_or_owner`, `source.location`, and `source.accessed_at`. |
| Version | Preserve `version.value` and SHA-256 `version.checksum`; keep source version distinct from profile version. |
| References | Preserve the v1.0 `references` array and locator/support semantics. |
| Rights | Preserve `rights.text_usage`, `rights.image_usage`, and `rights.display_scope`; keep rights decisions independent. |
| Taxonomy | Preserve `taxonomy.taxonomy_id` and `taxonomy.taxonomy_version`; do not infer track or taxonomy from paths. |
| Medical review | Preserve `medical_review.reviewer` and the existing decision enum; observed values are not approvals generated by the validator. |
| Audit | Preserve `audit.created_by`, `audit.created_at`, and append-only events. |
| Type-specific payload | Add an explicit, closed `content` object in v1.1 for `clinical_case` and `clinical_skill`; do not scatter new fields into the root envelope. |
| Relationships | Add an explicit, closed `relationships` object in v1.1 for the optional `reference_framework` relationship; do not infer graph edges from filenames or ordinary references. |

The recommended `content` and `relationships` groups are architectural placement decisions, not production JSON. Their exact executable JSON Schema definitions require separate implementation approval. Within the v1.1 profile, unknown root, `content`, and relationship properties must remain rejected through closed-world validation.

## 6. Backward compatibility rules

The future v1.1 implementation must observe these rules:

| Rule | Required behavior |
|---|---|
| v1.0 preservation | Never alter, rewrite, or reserialize existing v1.0 source records solely to introduce v1.1. |
| Legacy validation | Keep the current v1.0 validator and schema artifact available and unchanged. |
| No silent widening | Do not add v1.1 fields to the v1.0 schema or remove its `additionalProperties: false` restrictions. |
| New types | Accept `clinical_case` and `clinical_skill` only under explicit v1.1 selection. |
| Book semantics | Keep existing `book` records as `book`; do not migrate them to a generic `reference`. |
| Missing payload | A legacy type may remain envelope-only until its own payload contract is separately approved; new controlled types may not omit their required type-specific payload. |
| Source/version separation | Do not use `version.value` or source edition values as a substitute for the v1.1 profile identifier. |
| Review separation | Structural validity does not equal clinical approval, rights approval, activation, or publication. |
| Track separation | Do not infer `02_Internship` or Resident status from a filename, directory, title, or topic. |
| Rollback | Disable or stop v1.1 profile selection without destructive changes; v1.0 remains the safe validation path. |

## 7. Validator selection strategy

Profile selection must be explicit and external to the medical payload. The recommended selection model is:

1. The caller chooses `SEG_CONTENT_RECORD_V1_0` or `SEG_CONTENT_RECORD_V1_1` before validation.
2. The validator loads the exact immutable schema artifact associated with that profile and records its `$id`, path, and SHA-256 in the validation report.
3. The validator does not auto-select a profile from `content_type`, a filename, a folder, or a topic.
4. A bundle should have one explicit profile context. If a future workflow needs mixed v1.0 and v1.1 records, it must run separate profile-scoped validation passes or use a separately approved bundle manifest that assigns each record to a profile.
5. The v1.1 validator validates the shared envelope first, then applies conditional payload and relationship checks based on the explicitly supplied `content_type`.
6. Structural validation reports observed review values only. It does not perform clinical review, rights review, approval, import, activation, or publication.[3] [4]

Recommended selection outcomes:

| Input condition | Required validator behavior |
|---|---|
| v1.0 profile explicitly selected | Validate only against unchanged v1.0 rules. Reject v1.1-only types and properties. |
| v1.1 profile explicitly selected | Validate supported five-type profile, shared envelope, required payload for new types, and allowed relationships. |
| Profile omitted | Return `BLOCKED_PROFILE_SELECTION_REQUIRED`; do not infer. |
| Profile identifier unknown | Return `BLOCKED_PROFILE_UNKNOWN`; do not substitute v1.0 or v1.1. |
| Mixed-profile bundle without explicit mapping | Return `BLOCKED_PROFILE_CONTEXT_AMBIGUOUS`. |
| Unknown property in any closed object | Return a schema unknown-field failure; do not repair or drop it. |

## 8. Governance and implementation gates

A v1.1 profile passing structural validation is an intake/design artifact only. It must still preserve provenance, source version, SHA-256, rights, taxonomy, review state, and audit lineage, and it must remain pending when required evidence is absent.[3]

Before any adapter or integration, the exact profile contract, source mapping, clinical/relevant review, rights review, QA result, idempotency policy, rollback plan, and per-run implementation authorization must be supplied. A structurally valid record is not importable by default.[4]

## 9. Final profile recommendation

**Recommended profile:** `SEG_CONTENT_RECORD_V1_1`  
**Recommended relationship to v1.0:** Separate additive profile with preserved legacy validator  
**Supported Internship types:** `lesson`, `question_bank`, `book`, `clinical_case`, `clinical_skill`  
**Selection strategy:** Explicit profile-scoped validation; no auto-detection  
**Implementation status:** `NOT AUTHORIZED`

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_SCHEMA_EXTENSION_ADOPTION_DECISION.md "SEG Schema Extension Adoption Decision"
[2]: file:///home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "Canonical SEG governed content manifest"
[3]: file:///home/ubuntu/skills/seg-content-architecture-schema-validator/SKILL.md "SEG Content Architecture / Schema Validator"
[4]: file:///home/ubuntu/skills/seg-content-importer-integration/SKILL.md "SEG Content Importer / Integration"

---

**Final status:** `DESIGN BLUEPRINT ONLY`  
**No schema modification, code change, JSON generation, database action, import, activation, or publication was performed.**
