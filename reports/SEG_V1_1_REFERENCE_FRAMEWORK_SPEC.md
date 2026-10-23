# SEG v1.1 Reference Framework Specification

**Phase:** SEG Phase 7.3 — Controlled v1.1 Profile Implementation Readiness  
**Mode:** `READ_ONLY IMPLEMENTATION DESIGN REVIEW`  
**Contract status:** `EXECUTABLE RELATIONSHIP DRAFT — NOT IMPLEMENTED`  
**Profile:** `SEG_CONTENT_RECORD_V1_1`

## 1. Architecture decision

SEG retains `content_type = book` as the canonical bibliographic/reference type. The v1.1 profile must not introduce a generic `reference` content type. `reference_framework` is an explicit relationship/metadata concept that identifies how a governed record uses a `book` as a reference framework.[1] [2]

A `book` record may serve as a framework for SEG-authored educational content, a Clinical Case, a Clinical Skill, a Lesson, or another governed record when the relationship is explicitly recorded. The relationship supports provenance and citation policy; it does not itself approve content, grant rights, or expose book text to learners.

## 2. Recommended placement

The future v1.1 record may contain an optional closed `relationships` object. Within it, `reference_framework` is recommended as an array because one educational record may be informed by more than one framework:

| Path | Cardinality | Meaning |
|---|---:|---|
| `relationships` | 0..1 | Closed relationship container. |
| `relationships.reference_framework` | 0..N | Explicit links from the current governed record to one or more `book` records used as reference frameworks. |

The exact JSON Schema artifact does not yet exist and must not be created in this phase. The placement above is the design target for separate implementation authorization.

## 3. Relationship object contract

Each `reference_framework` item should be a closed object with the following properties:

| Property | Type and constraint | Purpose |
|---|---|---|
| `book_record_id` | Non-empty string | Identifies the target governed record. The target must be a canonical `book` under a future explicit referential-integrity contract. |
| `framework_name` | Non-empty string | The named framework, edition family, or reference framework identity as evidenced by the governed source package. |
| `framework_role` | Non-empty string, or a separately approved controlled enum | Describes the role of the book in the current educational record, such as core framework, supplementary framework, or comparison framework. No role may be inferred from popularity or filename. |
| `citation_locator_policy` | Required policy value | Defines the locator expectation for the relationship and any derived or literal citation. |
| `display_scope` | Required controlled value | Separates internal/reference use from derived learner display and literal learner display. It is not a rights approval. |

The relationship object must reject unknown properties. `book_record_id` is a design-level target identifier and does not imply that the current canonical manifest already validates graph edges. Referential integrity requires a future explicit bundle or architecture contract; it must not be inferred from a string alone.[3]

## 4. Citation locator policy

The recommended initial policy vocabulary is:

| Policy value | Meaning |
|---|---|
| `exact_locator_required` | An exact page, chapter, section, figure, table, or equivalent locator is required before the relationship is considered traceable. |
| `exact_locator_required_for_verbatim_display` | Exact locator is mandatory when literal source text, PDF material, image, scan, or book wording is intended for display; derived educational content still requires source traceability through the root `references` envelope. |
| `locator_required_when_available` | The source package must preserve a locator when one exists; the absence of a locator remains a documented traceability gap and may block later governance. |

The default recommendation for any future learner-facing literal display is `exact_locator_required_for_verbatim_display`. The root v1.0-compatible `references[].locator` remains mandatory and is not replaced by `citation_locator_policy`.

A policy value does not adjudicate whether a citation is clinically sufficient or whether a copyright license permits display. Those decisions remain separate review streams.

## 5. Display scope model

The recommended `display_scope` vocabulary is:

| Value | Meaning | Additional gate |
|---|---|---|
| `reference_only` | The book is retained as an internal or provenance framework. The learner is not shown literal book content through this relationship. | Clinical/relevant, taxonomy, audit, and source governance still apply. |
| `learner_displayed_derived` | Learner-facing material is SEG-authored or otherwise separately governed educational content derived from the framework without literal reproduction. | Clinical/relevant review, provenance, rights assessment, and QA remain required. |
| `learner_displayed_verbatim` | Literal text, page image, PDF excerpt, scanned figure, or substantially reproduced book material may be displayed. | Explicit Rights Gate approval is mandatory; no schema value grants permission. |

`display_scope` is a declared intended-use state, not an activation switch. A record marked `learner_displayed_derived` or `learner_displayed_verbatim` remains unavailable for exposure until separate clinical, rights, QA, implementation, release, and activation gates are satisfied.[4]

## 6. Educational reference versus learner-displayed content

The architecture distinguishes between the reference object and the content a learner may see:

| Concept | Definition | What it does not mean |
|---|---|---|
| Educational reference | A governed `book` used to establish a framework, support a claim, or guide SEG-authored educational design. | It does not mean the book text is licensed for display or that the record is clinically approved. |
| SEG-authored derived content | Original educational explanation or organization that does not reproduce the source literally. | It does not remove the need for clinical review, traceability, taxonomy, audit, or a rights assessment. |
| Learner-displayed verbatim content | Literal source text, PDF page, scan, image, or substantially reproduced material. | It is not permitted solely because a `reference_framework` relationship exists. |

The Medical Authority Model permits SEG-authored explanations to be treated as Original Educational Content when they are not literal reproductions. The Rights Gate remains separate for literal PDF, image, text, question, or book-content display.[2]

## 7. Validation rules

The future v1.1 validator should apply the following checks:

1. `reference_framework` may appear only under explicit v1.1 profile selection.
2. Every relationship object must contain all four requested semantic fields and the explicit target identifier `book_record_id`.
3. `book_record_id` must be syntactically valid; target-type validation is performed only when an explicit book inventory or relationship contract is supplied. The validator must not infer a target from filenames or external URLs.
4. `framework_name` and `framework_role` must be source-supported or separately attributable; no reference framework is inferred from a title or folder.
5. `citation_locator_policy` must use the approved profile vocabulary; unknown policies fail closed.
6. `display_scope` must use the approved profile vocabulary; it must not be interpreted as rights approval or activation.
7. Root `references` and `rights` remain required and are not bypassed by this relationship.
8. `learner_displayed_verbatim` must produce an explicit Rights Gate blocker until rights evidence is separately supplied.
9. The validator must not convert `book` to `reference`, duplicate book records, or rewrite source/version/checksum lineage.
10. Graph orphan and cycle checks are `NOT_APPLICABLE` unless a separate explicit relationship target contract is supplied.[3]

## 8. Migration and rollback implications

Existing `book` records require no conversion. A future adapter may add a v1.1 relationship only in a separate reversible projection or versioned record package after explicit mapping, rights review, clinical/relevant review, QA, and implementation authorization. It must not mutate the v1.0 record in place or copy literal source content into a learner-facing store.

Rollback means disabling the v1.1 relationship/profile path and returning validation to v1.0 without deleting the original `book`, source package, references, rights evidence, or audit trail. The relationship itself does not authorize any destructive migration.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_SCHEMA_EXTENSION_ADOPTION_DECISION.md "SEG Schema Extension Adoption Decision"
[2]: file:///home/ubuntu/seg-internship-output/SEG_REFERENCE_FRAMEWORK_DECISION.md "SEG Reference Framework Decision"
[3]: file:///home/ubuntu/skills/seg-content-architecture-schema-validator/SKILL.md "SEG Content Architecture / Schema Validator"
[4]: file:///home/ubuntu/skills/seg-medical-governance/SKILL.md "SEG Medical Governance"

---

**Final status:** `EXECUTABLE RELATIONSHIP DRAFT — NOT IMPLEMENTED`  
**No generic `reference` type, schema modification, code change, database action, JSON generation, import, activation, or publication was performed.**
