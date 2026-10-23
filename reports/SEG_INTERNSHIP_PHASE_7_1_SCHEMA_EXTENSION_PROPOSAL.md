# SEG Internship Phase 7.1 — Controlled Schema Extension Proposal

**Mode:** READ_ONLY ARCHITECTURE REVIEW  
**Final status:** `DESIGN PROPOSAL ONLY`  
**Implementation status:** Not authorized  
**Scope:** SEG Internship content model only; no canonical schema, database, application, JSON, production content, import, activation, publication, commit, or deployment changes.

## 1. Purpose and authority boundary

This document records a controlled design proposal for the schema extensions identified during the Phase 7.0 reassessment. It reviews the current canonical manifest support for `lesson`, `question_bank`, and `book`, and proposes documentation-only extensions for `clinical_case` and `clinical_skill` together with a clarification of the Reference/Book model.

The proposal uses the declared Medical Authority Model. The SEG Project Owner is treated as the Medical Decision Owner for the educational scope. Tintinalli, Rosen, Oxford Handbook, and Kaplan are treated as Reference Frameworks. SEG-authored explanations are treated as Original Educational Content only when they do not reproduce source text, images, or other protected material. This authority model does not amend the canonical manifest, create clinical approval automatically, or override external copyright, licensing, attribution, or display-permission requirements.

> The proposal defines candidate contracts and compatibility decisions only. It is not an implementation authorization and does not create production records.

## 2. Canonical schema review

The canonical manifest is a closed-world contract with explicit content-type and metadata boundaries. The current schema supports `lesson`, `question_bank`, and `book` as existing canonical types. The schema's closed-world behavior and `additionalProperties` restrictions mean that `clinical_case`, `clinical_skill`, and any new reference-layer fields cannot be used in production records until a separately approved contract/version extension is designed and implemented.

| Current type | Current support | Phase 7.0 reassessment | Design conclusion |
|---|---|---|---|
| `lesson` | Existing canonical type | Conditionally compatible with the Internship Lesson contract | Retain. Validate shared metadata, pathway/track evidence, taxonomy, review state, and source lineage before any future preparation. |
| `question_bank` | Existing canonical type | Conditionally compatible with separately sourced question-bank material | Retain. Do not convert Clinical Case assessment questions automatically. Validate options, answer key, explanation, difficulty, reference linkage, taxonomy, and review evidence. |
| `book` | Existing canonical type | Conditionally compatible as a bibliographic/reference framework item | Retain as the canonical Reference/Book type. Do not create a generic `reference` type in this proposal. |
| `clinical_case` | Not currently canonical | Blocked by closed-world type support | Propose as a future controlled content type, subject to contract, enum/version, compatibility, and governance approval. |
| `clinical_skill` | Not currently canonical | Blocked by closed-world type support | Propose as a future controlled content type, subject to a distinct competency boundary and governance approval. |

All proposed types remain subject to the shared governance envelope: stable identity, `source_id`, governed version, exact locator, SHA-256 where available, owner/publisher evidence, language, track, pathway, taxonomy ID/version, rights status, review status, approval state, and append-only audit lineage. Missing values remain `NOT_SUPPLIED`, `UNRESOLVED`, or `BLOCKED`; they are not inferred from filenames, folders, topics, or framework names.

## 3. Proposed extension A — `clinical_case`

### 3.1 Proposed type boundary

`clinical_case` would represent one governed source-derived clinical case as a distinct educational artifact. The case would preserve the original source sections and locators. It would not automatically become a learner-facing record, a clinical protocol, a Question Bank record, or an approved medical lesson.

The proposed type should remain separate from `question_bank`. Assessment questions that are embedded inside a case remain case sections unless they are separately sourced, separately identified, and separately governed as Question Bank material.

### 3.2 Documentation-only field proposal

The following fields are proposed as a type-specific `clinical_case` object in a future contract. The proposal does not add them to the canonical manifest.

| Field | Proposed role | Evidence and governance constraint |
|---|---|---|
| `case_type` | Explicit case classification | Must be supplied by the source or a governed reviewer; do not infer from filename or topic. |
| `presentation` | Case presentation/vignette | Preserve source text or exact locator; SEG-authored explanation must remain distinguishable from verbatim source material. |
| `history` | Relevant history section | May be absent; missing content remains missing and is not completed by inference. |
| `examination` | Examination/vital-signs section | May be absent; no clinical findings or values are invented. |
| `investigations` | Investigations and bedside tools | Preserve source section/locator; no tests or results are added. |
| `assessment` | Source assessment section | Preserve source meaning and locator; clinical approval remains separate. |
| `differential` | Differential diagnosis section | Must be source-supported or reviewer-approved in a separate clinical decision; no differential is generated by schema design. |
| `management` | Management section | Preserve source content/locator; no treatment, dose, or protocol is created by this proposal. |
| `clinical_reasoning` | Reasoning explanation or source locator | Distinguish SEG-authored original explanation from reproduced source material; clinical review remains independent. |
| `references` | Traceable supporting references | Each reference requires source identity and exact locator when available; Reference Framework status is not equivalent to display permission. |

The proposed object must also preserve the shared metadata envelope and the professional boundary: `02_Internship` is not assigned solely because a case is located in an Internship folder. The intended audience, complexity, pathway branch, track, specialty/topic, and taxonomy must be supported by content-level evidence.

### 3.3 Proposed validation posture

A future `clinical_case` record would require structural validation of the object fields, source/locator linkage, identity and checksum preservation, pathway/track separation, reference linkage, and review-state compatibility. It would remain `PENDING_CLINICAL_REVIEW` / `NOT_APPROVED` until a separately attributable clinical/relevant review decision exists.

## 4. Proposed extension B — `clinical_skill`

### 4.1 Proposed type boundary

`clinical_skill` would represent a teachable clinical skill or procedure framework. It would remain distinct from an individual competency record, OSCE result, procedure authorization, or learner sign-off. The distinction is required to avoid treating educational framework material as evidence that a learner has demonstrated competence.

The proposed type should also distinguish Internship basic exposure from Resident Procedure Competency and advanced skills. A folder name or pathway label alone is insufficient to establish required level.

### 4.2 Documentation-only field proposal

The following fields are proposed as a type-specific `clinical_skill` object in a future contract. The proposal does not add them to the canonical manifest.

| Field | Proposed role | Evidence and governance constraint |
|---|---|---|
| `skill_name` | Stable name of the skill/procedure | Must be explicit in the source or governed decision; do not derive from a generic framework title. |
| `category` | Procedure, patient assessment, ECG basics, POCUS exposure, or other supplied category | Unknown categories remain unresolved; no category is inferred from a directory. |
| `indication` | Indication or intended use | Preserve only when source-supported; no new clinical indication is authored by this proposal. |
| `contraindication` | Contraindication or limitation | Preserve only when source-supported and subject to clinical review; absence is not a claim that no contraindication exists. |
| `steps` | Source-supported procedural steps or locator | Do not create a protocol, dose, threshold, or safety claim from schema design. |
| `equipment` | Required equipment list | Preserve source evidence or exact locator; missing equipment remains missing. |
| `assessment_method` | Teaching/observation/checklist assessment method | Must distinguish framework material from an individual competency or sign-off record. |
| `competency_level` | Explicit required educational level | Must be supported by source/content evidence and kept separate between Internship and Resident tracks. |

The shared metadata envelope must include source identity, version, locator, SHA-256, owner/publisher, rights/display scope, track, pathway, taxonomy, review state, and audit trail. A `clinical_skill` record would not represent competence achieved by a learner and would not authorize clinical practice.

### 4.3 Proposed validation posture

A future `clinical_skill` record would require structural field validation, competency-boundary validation, educational-level evidence, source/locator linkage, track separation, assessment-method classification, and separate clinical/relevant review. No learner sign-off, OSCE result, procedure authorization, or activation is implied.

## 5. Reference / Book clarification

### 5.1 Canonical type decision

`book` remains the canonical type for bibliographic and Reference Framework items. This proposal does not introduce a generic `reference` content type and does not replace or rename `book`.

### 5.2 Reference Framework concept

`reference_framework` is proposed as a design-level concept or relationship associated with a canonical `book` item, not as an independent production content type. It identifies how a book supports educational design, claim traceability, or reviewer context without converting the book into learner-facing content.

A future contract could define a `reference_framework` block or relationship with fields such as:

| Proposed concept | Purpose | Limitation |
|---|---|---|
| `framework_name` | Name of the educational reference framework, such as Tintinalli, Rosen, Oxford Handbook, or Kaplan | The name must be supported by source evidence; it does not itself prove ownership or rights. |
| `framework_role` | Educational reference, background framework, claim-support reference, or reviewer reference | Role does not authorize verbatim display. |
| `supports_claims` | Traceability relationship to SEG-authored explanations or governed lessons/cases | Claims must retain exact source locators where applicable; no source text is copied by this proposal. |
| `citation_locator_policy` | Requirement for page/chapter/section or other exact locator | Missing locators remain open. |
| `display_scope` | `reference_only`, `learner_displayed_derived`, or `learner_displayed_verbatim` as a future design distinction | Any verbatim display requires a separate Rights Gate and is excluded from this proposal's authorization. |

`display_scope` is a design concept only. A Reference Framework may support an original SEG explanation without being displayed to learners. If PDF pages, images, or source text are displayed literally, the item requires separate text/image/display rights evidence and approval. Rights status must remain separate from the schema relationship.

## 6. Impact analysis

### 6.1 Canonical manifest impact

The proposal would require a future manifest contract change because the canonical closed-world enum currently does not support `clinical_case` or `clinical_skill`, and it does not establish a generic `reference` type or the proposed Reference Framework relationship. The likely impact areas are the content-type enum, type-specific object definitions, relationship/locator fields, validation rules, and backward-compatibility handling. No such change is made here.

### 6.2 Governance and medical-review impact

The extensions introduce additional review surfaces: case structure and clinical reasoning; skill identity, level, and competency boundary; reference identity, locator, and display scope. The Medical Decision Owner model may close the ownership decision for the educational scope, but it does not automatically close per-item clinical/relevant review, rights review, taxonomy evidence, or audit evidence.

### 6.3 Professional-pathway impact

The extensions must preserve separation between the Internship Doctor Pathway and the Emergency Medicine Resident Pathway. Internship basic skills and common emergency presentations must not be merged with Resident Procedure Competency, advanced resuscitation, or Board Preparation material. A source file, folder, or book title cannot independently determine pathway or track.

### 6.4 Application and data impact

If later authorized, implementation would affect schema validation, source-to-schema adapters, type guards, content display/read models, migration tests, audit logging, and possibly relationship queries. This proposal does not assess or change application architecture, routes, components, APIs, database tables, authentication, or security boundaries.

## 7. Migration considerations for a future authorized phase

No migration is authorized by Phase 7.1. If a later phase receives separate implementation authority, it should proceed in the following order:

1. Approve the exact type names and field contracts, including whether the proposed types are `clinical_case` and `clinical_skill` or another explicitly approved vocabulary.
2. Define the manifest extension/version and backward-compatibility behavior while preserving the current closed-world contract for existing records.
3. Define a reversible source-to-extension adapter with idempotency, provenance preservation, rollback, and no automatic activation.
4. Run a documentation-only pilot against a small, explicitly authorized sample while preserving Source IDs, paths, SHA-256 values, lineages, tracks, and unresolved fields.
5. Revalidate the five-domain relationships and shared metadata envelope.
6. Complete independent clinical/relevant review, rights review for any literal display, taxonomy review, and attributable audit review.
7. Obtain separate authorization before any import, activation, publication, or learner exposure.

No field default, canonical identity, version, rights status, taxonomy ID, reviewer, approval state, or learner-display permission may be invented during a future adapter or migration.

## 8. Required approvals before implementation

| Approval or evidence gate | Required decision | Current status |
|---|---|---|
| Medical Decision Owner | Confirm educational scope, ownership model, and intended pathway boundaries | Recorded for design scope; not an implementation authorization by this document. |
| Architecture / Schema Owner | Approve exact type names, fields, enum/version strategy, and backward compatibility | Required; not supplied by this proposal. |
| Clinical/relevant reviewer | Review clinical case and skill semantics, safety, scope, and educational level | Required per candidate; not replaced by schema review. |
| Rights reviewer | Confirm rights for any verbatim text, PDF, image, or learner-displayed source material | Required only for literal display/use; not overridden by Reference Framework status. |
| Taxonomy / pathway reviewer | Confirm track, `02_Internship`, branch, module, taxonomy ID, and version | Required; folder/name evidence is insufficient. |
| QA / audit authority | Validate hashes, locators, lineage, append-only audit, and rollback evidence | Required before any import or activation. |
| Implementation owner | Authorize code/schema/database changes under a separate task | Not authorized in Phase 7.1. |

## 9. Decision and non-actions

**Decision:** `DESIGN PROPOSAL ONLY`.

This document does not modify `manifest.schema.json`, create or alter database structures, generate JSON, create production content, import or activate records, publish learner-facing material, change application code, change routes/components/API contracts, modify authentication or security boundaries, alter medical source files, or authorize implementation. Original sources and existing canonical schema remain unchanged.

## References

- `/home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json`
- `/home/ubuntu/SEG_CONTENT_STAGING/SEG_CONTENT_ENTITY_CONTRACTS.md`
- `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_EXTENDED_CONTENT_CONTRACTS.md`
- `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DECISION_OWNER_APPROVAL.md`
- `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_7_0_SCHEMA_REASSESSMENT_RESULTS.md`
- `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_7_0_SCHEMA_REASSESSMENT_GAP_REPORT.md`

---

**Final status:** `DESIGN PROPOSAL ONLY`
