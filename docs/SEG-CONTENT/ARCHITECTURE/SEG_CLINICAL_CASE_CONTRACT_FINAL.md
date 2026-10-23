# SEG Clinical Case Contract — Final Architecture Decision

**Phase:** SEG Phase 7.2 — Schema Extension Adoption & Final Architecture Decision
**Mode:** `READ_ONLY ARCHITECTURE GOVERNANCE`
**Contract status:** `FINAL DESIGN CONTRACT — IMPLEMENTATION NOT AUTHORIZED`
**Adopted content type vocabulary:** `clinical_case`

## 1. Decision and purpose

SEG adopts `clinical_case` as the final design vocabulary for a future controlled Clinical Case content type. The type represents one governed, source-traceable educational case used for structured learning and clinical reasoning review. It preserves the source-derived case structure and its locators while keeping unresolved fields, review state, rights state, pathway evidence, and audit lineage explicit.[1] [2] [3]

The decision is an architecture-level adoption for a future versioned schema profile. It does not add `clinical_case` to the current canonical manifest, create a JSON record, or authorize conversion, import, activation, publication, or learner exposure.[2]

## 2. Scope

A `clinical_case` may contain a presentation, relevant history, examination findings, investigations, assessment, differential, management, and clinical reasoning when those sections are supported by the source or by a separately attributable clinical/relevant review decision. The record must preserve the original source identity, source version, exact source location, checksum where available, references, rights state, taxonomy, professional track/pathway evidence, review state, and append-only audit trail.[1] [2]

The final design applies to the current SEG Internship Doctor Pathway review scope only when the source-level evidence supports `02_Internship` and the intended educational level. Internship placement, filename, directory, topic, or case title is not sufficient to assign track or pathway.[1] [3]

Clinical Case assessment questions remain inside the case unless a separately sourced, separately identified, and separately governed question-bank item exists. A case is not automatically a Lesson, Question Bank item, or Reference/Book record.[2]

## 3. Required type-specific fields

The future `clinical_case` contract shall define the following type-specific fields. These are design-level required contract slots; this document does not invent values for absent source sections. If evidence for a section is absent, the future implementation must preserve that unresolved state under the separately approved representation rather than fabricate clinical content.[2]

| Field | Required design meaning | Boundary and evidence rule |
|---|---|---|
| `case_type` | Explicit classification of the case | Must be supplied by the source or a governed reviewer; it must not be inferred from a filename, folder, or topic. |
| `presentation` | Clinical presentation or vignette | Preserve source wording or exact locator; distinguish SEG-authored original educational text from literal source material. |
| `history` | Relevant history section | Preserve only supplied evidence. Absence of a history section is not permission to create one. |
| `examination` | Examination and, where supplied, vital-signs findings | Preserve the source section or locator. Do not add findings, values, or interpretations. |
| `investigations` | Investigations and bedside tools/results as supplied | Preserve source-supported content and locators; do not add tests or results. |
| `assessment` | Source assessment or governed assessment section | Preserve the source meaning and review state; structural inclusion is not clinical approval. |
| `differential` | Source-supported differential diagnosis section | Must remain source-traceable or separately reviewed; schema design does not generate a differential. |
| `management` | Source-supported management section | Preserve source content or locator; this field does not create a protocol, dose, threshold, or treatment authorization. |
| `clinical_reasoning` | Source reasoning or an explicitly attributable SEG-authored explanation | Distinguish original SEG educational content from reproduced source text; clinical/relevant review remains separate. |
| `references` | Traceable supporting references and locators | Each relationship must retain source identity and exact locator when available. A Reference Framework relationship does not grant display rights. |

The shared canonical envelope remains mandatory for any future record: stable record identity, title, language, source identity and location, governed version and checksum, reference linkage, rights, taxonomy, medical review, and audit. The current manifest's required envelope and closed-world behavior remain unchanged until a separately authorized extension is implemented.[2]

## 4. Explicit exclusions

The following meanings are expressly excluded from `clinical_case`:

| Excluded meaning | Decision |
|---|---|
| Clinical protocol | `clinical_case` is not a protocol, order set, fixed resuscitation algorithm, or operational treatment authorization. Conceptual ED actions remain educational source material and require separate clinical review. |
| Patient record | `clinical_case` is not an identifiable or real-time patient chart, encounter record, clinical documentation record, or source of patient-specific care decisions. |
| Competency approval | `clinical_case` is not evidence that a learner has achieved competence, passed an OSCE, received a sign-off, or obtained authorization to perform a procedure. |
| Question Bank record | Embedded assessment questions remain case sections unless separately sourced and governed as Question Bank content. |
| Automatic Lesson | A case does not become a Lesson merely because it is educational or displayed in a learning flow. |
| Automatic learner exposure | Structural validity or architecture adoption does not authorize display to learners. |

> `clinical_case` ≠ clinical protocol; `clinical_case` ≠ patient record; `clinical_case` ≠ competency approval.

## 5. Governance and review boundary

Every future case must follow the controlled lifecycle: **Source → Version → Governance Record → Clinical/Relevant Review → Approval → Activation**. Clinical/relevant review, rights review, taxonomy/pathway review, QA, and implementation authorization remain separate evidence streams.[1] [3]

The Medical Decision Owner model establishes the educational authority boundary but does not create per-case approval. A case remains pending and unavailable for activation until its exact source/version/locator, professional context, clinical/relevant decision, rights state, taxonomy, and audit evidence are separately attributable.[1] [3]

Literal PDF, image, scanned figure, question-bank, or book-text display remains subject to an independent Rights Gate. The Reference Framework designation cannot substitute for rights or display permission.[3]

## 6. Future implementation constraints

A future implementation must introduce the `clinical_case` type only through the separately adopted versioned manifest profile. It must preserve existing records and the current v1.0 closed-world validator, reject guessed values, preserve source IDs and SHA-256 values, retain unresolved states, and provide a reversible dry-run path before any authorized integration.[2]

No field default, clinical claim, dose, treatment step, diagnosis, reviewer identity, approval decision, rights decision, taxonomy value, pathway assignment, or audit event may be invented during future schema work or conversion.

## 7. Final contract decision

**Decision:** `clinical_case` is adopted as the final future content-type vocabulary and design boundary.

**Implementation status:** `NOT AUTHORIZED`. The current `manifest.schema.json` remains unchanged. No JSON, database migration, adapter, application change, import, activation, publication, or learner exposure is authorized by this contract.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_MODEL_BLUEPRINT.md "SEG Internship Content Model Blueprint"
[2]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_7_1_SCHEMA_EXTENSION_PROPOSAL.md "SEG Phase 7.1 Controlled Schema Extension Proposal"
[3]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DECISION_OWNER_APPROVAL.md "SEG Phase 6.13 Decision Owner Approval"

---

**Final contract status:** `FINAL DESIGN CONTRACT — IMPLEMENTATION NOT AUTHORIZED`
