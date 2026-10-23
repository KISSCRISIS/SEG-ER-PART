# SEG v1.1 Clinical Skill Schema Specification

**Phase:** SEG Phase 7.3 — Controlled v1.1 Profile Implementation Readiness  
**Mode:** `READ_ONLY IMPLEMENTATION DESIGN REVIEW`  
**Contract status:** `EXECUTABLE CONTRACT DRAFT — NOT IMPLEMENTED`  
**Profile:** `SEG_CONTENT_RECORD_V1_1`

## 1. Contract purpose

This document specifies the proposed v1.1 type-specific contract for `content_type = clinical_skill`. It is an implementation blueprint, not an executable JSON Schema file and not a production competency record. The contract extends the preserved v1.0 shared envelope and adds a closed `content` object for Clinical Skill fields.[1] [2]

A `clinical_skill` is a governed, source-traceable educational skill, patient-assessment skill, or procedure framework. It describes teachable material and intended educational level; it does not prove that a learner has achieved competence or received authorization to practice.[2]

## 2. Placement and envelope

The future v1.1 record must preserve the v1.0 root envelope: `record_id`, `title`, `content_type`, `language`, `source`, `version`, root `references`, `rights`, `taxonomy`, `medical_review`, and `audit`. The v1.1 `content_type` value must equal `clinical_skill` and the type-specific payload must be located at `content`.

The root `references` array remains the canonical manifest traceability envelope. Any type-specific reference links must resolve to or be traceable through that root envelope; they must not replace the required root metadata.

## 3. Type-specific contract

The future `content` object is closed-world and contains the following required property names. Each field is source-supported educational material or an explicit unresolved state; the schema does not author clinical instructions or competency conclusions.

| Path | Contract type | Required constraint |
|---|---|---|
| `content.skill_name` | Explicit scalar string | Required and non-empty when present. Must be supplied by the source or a separately attributable governed decision. |
| `content.category` | Controlled or source-supported category value | Required property. Unknown or conflicting categories remain unresolved; no category is inferred from a directory. |
| `content.indication` | Source-linked section or structured list | Required property slot. Preserve only supplied indications or intended uses; do not author a new indication. |
| `content.contraindication` | Source-linked section or structured list | Required property slot. Preserve only supplied contraindications, limitations, or cautions; absence is not a claim that none exist. |
| `content.steps` | Source-linked ordered section or list | Required property slot. Preserve source-supported steps or locator; do not create a protocol, dose, threshold, or safety claim. |
| `content.equipment` | Source-linked ordered list or section | Required property slot. Preserve only supplied equipment evidence; missing equipment remains unresolved. |
| `content.assessment_method` | Source-linked teaching/observation method | Required property slot. It must describe assessment of the educational material, not an individual learner result or sign-off. |
| `content.competency_level` | Explicit intended educational level | Required property. Must be supported by content evidence and keep Internship basic exposure separate from Resident advanced competency material. |

## 4. Field semantics and provenance

Section-valued fields should use the same future closed `source_section` semantic definition as Clinical Case where the source requires provenance. The implementation must preserve whether a value is source-verbatim, source-derived, or SEG-original educational content, and must retain an exact locator when available.[1] [2]

`competency_level` describes the intended educational level of the material. It does not record an individual learner’s achieved competency. The value must not be inferred from a title, directory, professional label, or procedure name alone. Conflicts between Internship and Resident context remain explicit review blockers.

`assessment_method` describes how the skill may be taught, observed, or assessed as educational content. It must not be serialized as a learner result, pass/fail outcome, supervisor signature, checklist completion, credential, or authorization.

## 5. Validation rules

The v1.1 validator must apply the preserved root-envelope rules before evaluating Skill-specific fields. It must then enforce the following:

1. `content_type` must be exactly `clinical_skill` under explicit v1.1 profile selection.
2. All eight type-specific property names must be present in the `content` object.
3. No unknown properties may be accepted inside `content` or any shared source-section object.
4. `skill_name` and `category` must be source-supported or separately attributable; neither may be derived from a path or filename.
5. Indication, contraindication, steps, and equipment must preserve supplied evidence or an unresolved state; the validator may not add or repair clinical claims.
6. `assessment_method` must remain an educational method and must reject or block representations that claim individual sign-off or achieved competence.
7. `competency_level` must retain explicit level evidence and must not merge Internship basic exposure with Resident advanced skills or Board Preparation material.
8. The validator must not treat any Skill record as a learner competency record, procedure authorization, sign-off, or clinical practice permission.
9. Literal source display remains subject to the separate Rights Gate.
10. A structural `approved` value is observed metadata only. The validator does not grant clinical approval, competency approval, activation, publication, or learner exposure.[3]

## 6. Explicit exclusions

The contract must enforce the following semantic exclusions:

| Exclusion | Required interpretation |
|---|---|
| Learner competency record | `clinical_skill` is educational content and does not prove that a learner demonstrated competence. |
| Procedure authorization | The type does not authorize a learner or clinician to perform a procedure in practice. |
| Sign-off | The type is not an OSCE result, checklist completion, supervisor sign-off, credential, or competency approval. |
| Patient-specific instruction | The type does not create a patient-specific order, protocol, dose, threshold, or treatment instruction. |
| Automatic Resident assignment | Advanced wording, a procedure name, or a folder does not establish Resident pathway placement. |
| Automatic activation | Profile validation and content-model adoption do not activate or publish a Skill. |

> **`clinical_skill` ≠ learner competency record; `clinical_skill` ≠ procedure authorization; `clinical_skill` ≠ sign-off.**

## 7. Governance, rights, and track requirements

Every Skill must preserve source ID, source location, source version, checksum, root references, rights object, taxonomy ID/version, observed medical-review state, and append-only audit events. The required lifecycle remains **Source → Version → Governance Record → Clinical Review → Approval → Activation**.[3]

Clinical/relevant review must separately examine safety, scope, contraindications, procedural wording, intended educational level, and competency-boundary risks. The schema does not perform this review and must not invent a reviewer, decision, date, credential, or sign-off.

Rights review remains independent. Literal text, PDF, image, scanned figure, or book-text display is blocked until the relevant Rights Gate is separately evidenced. A Reference Framework relationship cannot authorize display.

## 8. Implementation handoff conditions

The contract is ready to be translated into the separately authorized v1.1 executable schema only after the implementation owner confirms the exact category representation, source-section serialization, profile artifact identity, validator behavior, and test fixtures. No production record may be generated as part of that translation. Any pilot must be read-only, reversible, source-preserving, and explicitly scoped.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_SCHEMA_V1_1_PROFILE_SPEC.md "SEG Schema v1.1 Profile Specification"
[2]: file:///home/ubuntu/seg-internship-output/SEG_CLINICAL_SKILL_CONTRACT_FINAL.md "SEG Clinical Skill Contract — Final Architecture Decision"
[3]: file:///home/ubuntu/skills/seg-content-architecture-schema-validator/SKILL.md "SEG Content Architecture / Schema Validator"

---

**Final status:** `EXECUTABLE CONTRACT DRAFT — NOT IMPLEMENTED`  
**No JSON, schema modification, code change, database action, import, activation, or publication was performed.**
