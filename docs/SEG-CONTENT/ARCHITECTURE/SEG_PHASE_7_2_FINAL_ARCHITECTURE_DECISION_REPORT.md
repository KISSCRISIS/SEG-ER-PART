# SEG Phase 7.2 — Final Architecture Decision Report

**Mode:** `READ_ONLY ARCHITECTURE GOVERNANCE`
**Scope:** SEG Internship Content Model and controlled future schema extensions
**Final status:** `ARCHITECTURE_DECISION_COMPLETE`
**Implementation status:** `NOT AUTHORIZED`

## 1. Executive conclusion

Phase 7.2 closes the remaining architecture-level schema design decisions identified by the Phase 7.0 reassessment and Phase 7.1 proposal. The final design adopts `clinical_case` and `clinical_skill` as dedicated future content-type vocabulary, retains `book` as the canonical Reference/Book type, adopts `reference_framework` as a design relationship or metadata concept rather than a generic content type, and recommends a v1.1 additive extension implemented as a separate versioned schema profile.[1] [2] [3] [4]

The decision is complete for architecture design. It is not an authorization to modify the current manifest, generate JSON, implement an adapter, migrate a database, import records, activate content, publish material, or expose content to learners.

> **Architecture decision complete does not mean implementation authorized.** The current closed-world manifest remains unchanged, and all clinical, rights, taxonomy, audit, QA, and release gates remain separate.

## 2. Evidence reviewed

The decision uses the approved SEG Internship Content Model Blueprint, the Phase 6.13 Decision Owner Approval, the Phase 7.0 Schema Reassessment, and the Phase 7.1 Controlled Schema Extension Proposal. The current canonical `manifest.schema.json` was inspected to confirm its existing enum and closed-world behavior.[1] [2] [3] [4] [5]

| Evidence | Decision relevance |
|---|---|
| SEG Internship Content Model Blueprint | Defines the Internship Doctor Pathway, five future content domains, source-lineage rules, and the governed lifecycle. |
| Phase 6.13 Decision Owner Approval | Limits authority to read-only schema revalidation and explicitly excludes JSON, migration, import, activation, publication, and application changes. |
| Phase 7.0 Schema Reassessment | Confirms conditional compatibility for `lesson`, `question_bank`, and `book`, and genuine closed-world gaps for Clinical Case and Skills. |
| Phase 7.1 Controlled Schema Extension Proposal | Provides the candidate fields, Reference Framework distinction, impact analysis, migration considerations, and approval requirements. |
| Current canonical manifest | Confirms `additionalProperties: false`, the existing content-type enum, and the required shared metadata envelope. |

## 3. Final content-type architecture decision

### 3.1 Existing canonical types

The existing canonical vocabulary remains unchanged:

| Canonical type | Final decision |
|---|---|
| `lesson` | Retain as the existing canonical Lesson type. Future preparation must preserve source/version/locator, references, rights, taxonomy, review, and audit evidence. |
| `question_bank` | Retain as the existing canonical Question Bank type. It applies to separately sourced and governed question-bank material. Case-embedded assessment questions do not become Question Bank records automatically. |
| `book` | Retain as the existing canonical bibliographic and Reference Framework type. It is not replaced by a generic `reference` type. |

### 3.2 Future controlled type: `clinical_case`

**Adopted content-type name:** `clinical_case`.

The purpose of `clinical_case` is to represent one governed, source-traceable educational case for structured learning and clinical reasoning review. It preserves source-derived sections and exact locators where available, while retaining unresolved fields and the independent review state.

The required future type-specific fields are:

`case_type`, `presentation`, `history`, `examination`, `investigations`, `assessment`, `differential`, `management`, `clinical_reasoning`, and `references`.

These fields are contract slots only. Missing source sections remain missing or unresolved; no clinical findings, diagnoses, investigations, treatment steps, doses, or reasoning are invented by the architecture decision.[1] [4]

The following meanings are excluded:

> **`clinical_case` ≠ clinical protocol.** It does not create a fixed treatment algorithm, order set, resuscitation protocol, dose, threshold, or operational authorization.
>
> **`clinical_case` ≠ patient record.** It does not represent an identifiable patient chart, clinical encounter, real-time documentation record, or patient-specific care decision.
>
> **`clinical_case` ≠ competency approval.** It does not prove learner competence, OSCE success, supervisor sign-off, or authorization to perform a procedure.

A Clinical Case is not automatically a Lesson, Question Bank record, or learner-facing item. Its pathway and professional track require content-level evidence and cannot be inferred from a filename or folder.

### 3.3 Future controlled type: `clinical_skill`

**Adopted content-type name:** `clinical_skill`.

The purpose of `clinical_skill` is to represent a governed, source-traceable educational skill, patient-assessment skill, or procedure framework. It separates teaching material from evidence that a learner has demonstrated competence.

The required future type-specific fields are:

`skill_name`, `category`, `indication`, `contraindication`, `steps`, `equipment`, `assessment_method`, and `competency_level`.

These fields are contract slots only. Missing indications, contraindications, steps, equipment, assessment methods, or levels remain unresolved; no clinical instruction, protocol, dose, threshold, or safety claim is invented by the architecture decision.[1] [4]

The following meanings are excluded:

> **`clinical_skill` ≠ learner competency record.** It does not prove that a learner demonstrated competence.
>
> **`clinical_skill` ≠ procedure authorization.** It does not authorize a learner or clinician to perform a procedure in clinical practice.
>
> **`clinical_skill` ≠ sign-off.** It is not an OSCE result, checklist completion, credential, supervisor sign-off, or competency approval.

Internship basic exposure must remain separate from Emergency Medicine Resident Procedure Competency and advanced skills. Track and pathway assignment require content-level evidence and cannot be inferred from a folder, filename, or topic.

## 4. Final Reference Architecture decision

`content_type = book` remains canonical. No generic `reference` content type is adopted.

`reference_framework` is adopted as a design relationship or metadata concept associated with a canonical `book`. Its final semantic fields are:

| Design field | Final meaning |
|---|---|
| `framework_name` | Name of the educational Reference Framework, supported by source evidence. |
| `framework_role` | Educational reference, background framework, claim-support reference, or reviewer reference. |
| `citation_locator_policy` | Requirement to preserve page, chapter, section, figure, or other exact locator when available. |
| `display_scope` | Distinction between reference-only use, learner-displayed derived content, and learner-displayed verbatim material. |

An educational reference may support an original SEG explanation without being displayed. SEG-authored content qualifies as Original Educational Content only when it does not reproduce source text, images, or other protected material. Literal PDF, image, scanned figure, question text, or book-text display requires a separate Rights Gate; Reference Framework status is not display permission.[2] [4]

## 5. Manifest schema version strategy

### 5.1 Decision: Option A — v1.1 additive extension

The adopted recommendation is **Option A: v1.1 additive extension**, implemented as a separate versioned schema profile. The existing v1.0 canonical manifest remains frozen and continues to validate current records. The new profile would add the two approved future content types and the controlled `reference_framework` relationship without changing the meaning or validity of existing `lesson`, `question_bank`, or `book` records.[4] [5]

The exact schema identifier, artifact path, validator selection mechanism, and implementation owner are not created or selected in this phase. They require a separate implementation decision.

### 5.2 Evaluation of Option B — v2.0 schema evolution

Option B is not selected because the current evidence identifies a bounded additive requirement rather than a breaking redesign. Existing canonical types, required metadata envelope, and governance states do not need to be renamed or invalidated. A v2.0 would create a larger compatibility and migration burden without an evidence-supported need for a breaking change.

A future v2.0 may be reconsidered only if an independently approved change alters existing type semantics, identity rules, required envelope structure, review semantics, or relationship behavior in a breaking manner.

### 5.3 Compatibility and migration consequences

The compatibility model is explicit profile selection, not in-place widening of the legacy closed-world schema:

| Concern | Final architecture decision |
|---|---|
| Existing records | Remain valid under the unchanged v1.0 profile. |
| Existing strict validator | Remains unchanged and may reject records from a future v1.1 profile by design. |
| New Clinical Case/Skill records | Validate only under the separately selected v1.1 profile after implementation. |
| Existing Book records | Remain `book`; no generic-reference migration is required. |
| Reference Framework relationship | Becomes available only in the future v1.1 profile after exact contract implementation. |
| Source version versus schema version | Remain separate. A source edition/checksum is not a manifest profile version. |
| Rollback | Preserved by retaining the v1.0 profile and avoiding destructive rewrites. |

No data migration is authorized. A later adapter or pilot must preserve Source IDs, paths, SHA-256 values, version evidence, lineages, professional tracks, taxonomy states, rights states, review states, and unresolved fields. It must be reversible, idempotent, and dry-run validated before any separately authorized integration.[2] [4]

## 6. Decision closure matrix

| Decision item | Phase 7.2 status | Implementation implication |
|---|---|---|
| `lesson` vocabulary | Closed; retain | No redesign authorized. |
| `question_bank` vocabulary | Closed; retain | No automatic conversion of case questions. |
| `book` vocabulary | Closed; retain | No generic `reference` type. |
| `clinical_case` vocabulary | Closed; adopt | Requires future v1.1 executable extension. |
| `clinical_skill` vocabulary | Closed; adopt | Requires future v1.1 executable extension and competency boundary checks. |
| `reference_framework` concept | Closed; adopt as relationship/metadata concept | Exact executable fields remain a future implementation task. |
| Schema version | Closed recommendation; v1.1 additive profile | Exact profile artifact and validator behavior require separate authorization. |
| Backward compatibility | Closed principle; preserve v1.0 | No in-place mutation of current manifest. |
| Clinical review | Open separate gate | Architecture decision does not approve cases, skills, lessons, questions, or references. |
| Rights review | Open separate gate for literal display | Reference Framework status does not grant display permission. |
| Taxonomy/pathway evidence | Open per-source gate | No filename-based assignment. |
| QA and implementation authorization | Open separate gate | No migration, import, activation, or publication. |

## 7. Final gate status and remaining blockers

**Final gate status:** `ARCHITECTURE_DECISION_COMPLETE`.

The architecture decision is complete because the requested design questions have explicit answers: the future type vocabulary is fixed, the Clinical Case and Clinical Skill boundaries are fixed, the Reference/Book model is fixed, and the recommended schema-version strategy is fixed.[1] [2] [3] [4]

The following remain blockers to implementation and production use:

1. The current `manifest.schema.json` has not been modified and remains closed-world.
2. An executable v1.1 profile, exact schema definitions, and validator selection behavior have not been authorized or implemented.
3. Exact per-source provenance, version, locator, rights, taxonomy, clinical/relevant review, and audit evidence remain incomplete for candidate content.
4. Clinical Case and Clinical Skill content remains pending independent clinical/relevant review and is not approved or activated.
5. Any literal PDF, image, question-bank, or book-text display remains subject to separate Rights Gate approval.
6. No adapter, database migration, JSON generation, import, activation, publication, or learner exposure is authorized by Phase 7.2.

## 8. Non-action confirmation

| Restricted action | Result in Phase 7.2 |
|---|---|
| Modify `manifest.schema.json` | `FALSE` |
| Generate JSON | `FALSE` |
| Modify database, Prisma, or migrations | `FALSE` |
| Modify application, routes, components, authentication, or security boundaries | `FALSE` |
| Import or create production records | `FALSE` |
| Activate or publish content | `FALSE` |
| Modify, rename, delete, merge, or archive original sources | `FALSE` |
| Grant clinical approval or rights approval | `FALSE` |

## 9. Next allowed phase

The next allowed phase is a separately authorized **controlled v1.1 contract/profile implementation-readiness review**. That review may define the exact schema artifact, profile identifier, validator behavior, adapter dry-run contract, and rollback evidence. It must not proceed to import, activation, publication, or learner exposure without separate authorization and completion of clinical, rights, taxonomy, audit, QA, and release gates.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_MODEL_BLUEPRINT.md "SEG Internship Content Model Blueprint"
[2]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DECISION_OWNER_APPROVAL.md "SEG Phase 6.13 Decision Owner Approval"
[3]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_7_0_SCHEMA_REASSESSMENT_RESULTS.md "SEG Phase 7.0 Schema Reassessment Results"
[4]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_7_1_SCHEMA_EXTENSION_PROPOSAL.md "SEG Phase 7.1 Controlled Schema Extension Proposal"
[5]: file:///home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "Canonical SEG governed content manifest"

---

**Final status:** `ARCHITECTURE_DECISION_COMPLETE`
**Implementation authorization:** `NOT AUTHORIZED`
