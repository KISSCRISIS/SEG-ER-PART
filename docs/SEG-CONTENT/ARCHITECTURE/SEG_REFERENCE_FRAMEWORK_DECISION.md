# SEG Reference Framework Decision — Final Architecture Record

**Phase:** SEG Phase 7.2 — Schema Extension Adoption & Final Architecture Decision
**Mode:** `READ_ONLY ARCHITECTURE GOVERNANCE`
**Decision status:** `FINAL DESIGN DECISION — IMPLEMENTATION NOT AUTHORIZED`

## 1. Final decision

SEG retains `content_type = book` as the canonical type for bibliographic and Reference Framework items. SEG does **not** create a generic `reference` content type in this architecture decision.[1] [2]

`reference_framework` is adopted as a design-level relationship or metadata concept associated with a canonical `book` item. It explains how a book supports educational design, claim traceability, or reviewer context without turning the book into a learner-facing content record and without changing the current manifest.[2] [3]

This decision is final for the Phase 7.2 design boundary. It does not add fields to `manifest.schema.json`, create a relationship record, generate JSON, authorize literal display, or authorize import, activation, publication, or learner exposure.

## 2. Canonical Reference/Book boundary

A canonical `book` item represents the governed bibliographic/source object. It must preserve the shared manifest envelope, including source identity, publisher/owner evidence, governed version and checksum, exact location or locator, references, rights, taxonomy, medical review state, and audit lineage. A book may serve as a Reference Framework for SEG-authored educational content, but the framework role does not substitute for any required metadata or review gate.[1] [2]

The following distinctions are mandatory:

| Concept | Final architecture meaning |
|---|---|
| `book` | Canonical content type for the bibliographic/source item. |
| `reference_framework` | Design relationship or metadata role that describes how a `book` supports educational design, claim traceability, or reviewer context. |
| Educational reference | A book or framework used internally to support original SEG explanations, lessons, cases, or review. It may remain non-displayed to learners. |
| Learner-displayed derived content | SEG-authored content that is not a literal reproduction of the referenced source. It still requires source traceability and clinical/relevant review. |
| Learner-displayed verbatim content | Literal PDF, image, scanned figure, question text, book text, or excerpt. It requires an independent Rights Gate and explicit display permission. |
| Generic `reference` content type | Not adopted. No generic reference enum is introduced by this decision. |

## 3. `reference_framework` design relationship

The future versioned contract may define a `reference_framework` relationship or metadata block attached to `book`. The exact JSON shape is not decided or generated in Phase 7.2. Its semantic fields are fixed as follows:

| Design field | Required meaning | Boundary |
|---|---|---|
| `framework_name` | Name of the Reference Framework, such as Tintinalli, Rosen, Oxford Handbook, or Kaplan | Must be supported by source evidence; the name does not prove ownership, edition, license, or display rights. |
| `framework_role` | Role of the book in the educational model, such as educational reference, background framework, claim-support reference, or reviewer reference | The role does not create learner exposure or permit verbatim reproduction. |
| `citation_locator_policy` | Requirement to retain page, chapter, section, figure, or another exact source locator when available | Missing locators remain open; they are not invented. |
| `display_scope` | Design distinction between reference-only use, learner-displayed derived content, and learner-displayed verbatim material | Verbatim display remains blocked until separate text/image/display rights evidence and approval exist. |

Where a `book` supports a SEG-authored explanation, the relationship should identify the supported claim or educational section and retain the exact locator when available. The relationship must not be used to copy source text or images, conceal source lineage, or imply that the book itself has been approved for display.

## 4. Educational reference versus learner-displayed content

An educational reference is a provenance and design input. It can support an original SEG explanation without being exposed to learners. The declared Medical Authority Model permits SEG-authored explanations to be treated as Original Educational Content only when they do not reproduce source text, images, or other protected material.[2] [3]

Learner-displayed derived content remains governed educational content and requires its own review state, lineage, taxonomy, audit, and approval evidence. Learner-displayed verbatim content is a separate rights-sensitive class. A valid `book` record, a `reference_framework` relationship, or a Project Owner authority statement cannot override copyright, licensing, attribution, image, PDF, question-bank, or display-permission requirements.

> Reference Framework status supports traceability; it does not equal learner-display permission.

## 5. Relationship and governance rules

The relationship is directional: a canonical `book` may support a governed SEG educational item or provide reviewer context. It does not silently replace the source of a Lesson, Clinical Case, Clinical Skill, or Question Bank item. Every linked claim or section must remain source-traceable, and missing evidence stays unresolved.[1] [2]

The governance lifecycle remains: **Source → Version → Governance Record → Clinical/Relevant Review where educational claims are supported → Rights Review for literal display → Approval → Activation**. Clinical/relevant review and rights review are independent streams. A Reference Framework link cannot approve a medical claim or authorize display.

## 6. Future implementation constraints

A future implementation must preserve `book` records under the existing canonical type and introduce `reference_framework` only through the separately adopted versioned schema profile. The current closed-world manifest remains unchanged until that implementation is separately authorized. Existing `book`, `lesson`, and `question_bank` records must remain valid under their current profile, and older strict validators must not be silently widened by this design decision.[2]

No generic `reference` record, learner-facing excerpt, rights decision, approval state, database relationship, adapter, JSON payload, import, activation, or publication is created by this document.

## 7. Final decision

**Adopted:**

- `content_type = book` remains canonical.
- `reference_framework` is a design relationship or metadata concept associated with `book`.
- Educational reference use is distinct from learner-displayed content.
- Verbatim display remains subject to an independent Rights Gate.
- Generic `reference` content type is not adopted.

**Implementation status:** `NOT AUTHORIZED`.

## References

[1]: file:///home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "Canonical SEG governed content manifest"
[2]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_7_1_SCHEMA_EXTENSION_PROPOSAL.md "SEG Phase 7.1 Controlled Schema Extension Proposal"
[3]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DECISION_OWNER_APPROVAL.md "SEG Phase 6.13 Decision Owner Approval"

---

**Final decision status:** `FINAL DESIGN DECISION — IMPLEMENTATION NOT AUTHORIZED`
