# SEG Clinical Skill Contract — Final Architecture Decision

**Phase:** SEG Phase 7.2 — Schema Extension Adoption & Final Architecture Decision
**Mode:** `READ_ONLY ARCHITECTURE GOVERNANCE`
**Contract status:** `FINAL DESIGN CONTRACT — IMPLEMENTATION NOT AUTHORIZED`
**Adopted content type vocabulary:** `clinical_skill`

## 1. Decision and purpose

SEG adopts `clinical_skill` as the final design vocabulary for a future controlled Clinical Skill content type. The type represents a source-traceable teachable clinical skill, patient-assessment skill, or procedure framework intended for educational planning and review. It does not represent a learner’s achieved competence, a clinical practice authorization, or a completed assessment result.[1] [2]

This is an architecture-level adoption for a future versioned schema profile. It does not add `clinical_skill` to the current canonical manifest, create a JSON record, create a competency record, or authorize conversion, import, activation, publication, or learner exposure.[2]

## 2. Scope and competency boundary

A `clinical_skill` may describe the identity, category, indications, contraindications or limitations, steps, equipment, assessment method, and intended competency level when those elements are supported by the source or a separately attributable clinical/relevant review decision. The entity must preserve source identity, source version, exact locator, checksum where available, owner/publisher evidence, rights/display scope, track/pathway evidence, taxonomy, review state, and append-only audit lineage.[1] [2]

The type distinguishes educational framework material from an individual learner competency record. `framework_candidate` and `individual_skill_candidate` may be future design roles for controlled classification, but a `clinical_skill` item remains educational content unless a separate competency-layer contract is expressly adopted. Internship basic exposure must remain separate from Resident Procedure Competency and advanced procedural content.[1] [2]

Assignment to the Internship Doctor Pathway or `02_Internship` cannot be inferred from a directory, title, or skill name alone. The intended educational level and professional track must be supported by source and content evidence.[1] [3]

## 3. Required type-specific fields

The future `clinical_skill` contract shall define the following type-specific fields. These are design-level required contract slots; this document does not create values where the source does not supply them. Missing evidence must remain unresolved or blocked rather than being completed by inference.[2]

| Field | Required design meaning | Boundary and evidence rule |
|---|---|---|
| `skill_name` | Explicit name of the teachable skill or procedure | Must be supplied by the source or a governed decision; do not derive it from a generic framework title. |
| `category` | Explicit skill category | Preserve the supplied category; unknown categories remain unresolved and are not assigned from a directory. |
| `indication` | Source-supported indication or intended use | Preserve only supported evidence; the contract does not author a new clinical indication. |
| `contraindication` | Source-supported contraindication, limitation, or caution | Preserve only supported evidence and require clinical/relevant review; absence is not a claim that no contraindication exists. |
| `steps` | Source-supported steps or exact teaching locator | Do not create a protocol, dose, threshold, or safety claim from schema design. |
| `equipment` | Source-supported equipment list or locator | Preserve only supplied evidence; missing equipment remains missing. |
| `assessment_method` | Method for teaching, observing, or assessing the skill | Must distinguish educational framework material from an individual competency result, checklist completion, or sign-off. |
| `competency_level` | Explicit intended educational or competency level | Must be supported by content evidence and kept separate between Internship and Resident pathways. |

The shared canonical envelope remains mandatory for any future record: stable identity, title, language, source identity and location, governed version and checksum, references, rights, taxonomy, medical review, and audit. The current manifest remains closed-world and unchanged until a separately authorized extension is implemented.[2]

## 4. Explicit exclusions

The following meanings are expressly excluded from `clinical_skill`:

| Excluded meaning | Decision |
|---|---|
| Learner competency record | `clinical_skill` describes educational material or a skill framework; it does not prove that a learner demonstrated competence. |
| Procedure authorization | The type does not authorize a clinician or learner to perform a procedure in practice. |
| Sign-off | The type is not an OSCE result, checklist completion, supervisor sign-off, credential, or competency approval. |
| Patient-specific order or protocol | The type does not create a patient-specific instruction, order set, fixed protocol, dose, threshold, or resuscitation algorithm. |
| Automatic Resident assignment | Advanced wording or a folder name does not establish Resident pathway placement. |
| Automatic learner exposure | Structural validity or architecture adoption does not authorize display to learners. |

> `clinical_skill` ≠ learner competency record; `clinical_skill` ≠ procedure authorization; `clinical_skill` ≠ sign-off.

## 5. Governance and review boundary

Each future skill must follow the controlled lifecycle: **Source → Version → Governance Record → Clinical/Relevant Review → Approval → Activation**. Clinical/relevant review, competency-boundary review, rights review, taxonomy/pathway review, QA, and implementation authorization remain separate evidence streams.[1] [3]

The Medical Decision Owner model establishes the educational authority boundary but does not create a per-skill clinical/relevant decision or authorize a competency claim. A skill remains pending and unavailable for activation until its exact source/version/locator, intended level, track/pathway, review decision, rights state, taxonomy, and audit evidence are attributable.

Literal PDF, image, scanned figure, or book-text display remains subject to an independent Rights Gate. Reference Framework status does not grant permission to display or reproduce source material.[2] [3]

## 6. Future implementation constraints

A future implementation must introduce `clinical_skill` only through the separately adopted versioned manifest profile and must preserve the existing v1.0 closed-world validator for current records. It must preserve Source IDs, paths, SHA-256 values, lineages, track boundaries, unresolved states, and audit evidence. A reversible dry run is required before any authorized integration.[2]

No competency result, reviewer identity, approval decision, procedure authorization, clinical instruction, dose, contraindication, taxonomy value, pathway assignment, rights decision, or audit event may be invented during future schema work or conversion.

## 7. Final contract decision

**Decision:** `clinical_skill` is adopted as the final future content-type vocabulary and educational-skill boundary.

**Implementation status:** `NOT AUTHORIZED`. The current `manifest.schema.json` remains unchanged. No JSON, database migration, adapter, application change, import, activation, publication, learner exposure, competency sign-off, or procedure authorization is authorized by this contract.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_MODEL_BLUEPRINT.md "SEG Internship Content Model Blueprint"
[2]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_7_1_SCHEMA_EXTENSION_PROPOSAL.md "SEG Phase 7.1 Controlled Schema Extension Proposal"
[3]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DECISION_OWNER_APPROVAL.md "SEG Phase 6.13 Decision Owner Approval"

---

**Final contract status:** `FINAL DESIGN CONTRACT — IMPLEMENTATION NOT AUTHORIZED`
