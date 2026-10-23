# SEG Schema Extension Adoption Decision

**Phase:** SEG Phase 7.2 — Schema Extension Adoption & Final Architecture Decision
**Mode:** `READ_ONLY ARCHITECTURE GOVERNANCE`
**Decision status:** `ARCHITECTURE_DECISION_COMPLETE`
**Implementation status:** `NOT AUTHORIZED`

## 1. Executive decision

The SEG Internship content architecture adopts the following final design vocabulary:

| Area | Final design decision |
|---|---|
| Existing canonical types | Retain `lesson`, `question_bank`, and `book` unchanged. |
| Clinical Case | Adopt future `content_type = clinical_case`. |
| Clinical Skills | Adopt future `content_type = clinical_skill`. |
| Reference architecture | Retain `content_type = book`; model `reference_framework` as a design relationship or metadata concept, not as a generic content type. |
| Schema version strategy | Recommend **Option A: v1.1 additive extension**, implemented as a separate versioned schema profile while the current v1.0 closed-world manifest remains frozen. |
| Implementation gate | Architecture design is complete for Phase 7.2; schema modification, JSON, adapter, migration, import, activation, publication, and learner exposure remain unauthorized. |

This decision closes the architecture vocabulary and design boundaries required for the next controlled preparation step. It does not itself authorize implementation or override clinical, rights, taxonomy, audit, QA, or release gates.[1] [2] [3]

## 2. Adopted content-type architecture

### 2.1 Existing canonical types

`lesson`, `question_bank`, and `book` remain the existing canonical types. Their current records and validation behavior must not be broken or silently reinterpreted. `question_bank` remains reserved for separately sourced and governed question-bank material; assessment questions embedded in a Clinical Case do not become Question Bank records automatically. `book` remains the canonical bibliographic/reference object.[1] [2]

### 2.2 Future controlled extensions

`clinical_case` and `clinical_skill` are adopted as dedicated future content types rather than being forced into `lesson`, `question_bank`, or `book`. The dedicated types preserve their distinct domain boundaries, type-specific fields, review questions, and professional-level separation. They remain unavailable to the current canonical manifest until a separately authorized versioned schema profile is implemented.[2]

| Future type | Purpose | Explicit exclusions |
|---|---|---|
| `clinical_case` | Governed source-traceable educational case with presentation, history, examination, investigations, assessment, differential, management, clinical reasoning, and references when supported. | Not a clinical protocol, patient record, or competency approval. |
| `clinical_skill` | Governed source-traceable educational skill or procedure framework with skill identity, category, indication, contraindication, steps, equipment, assessment method, and competency level when supported. | Not a learner competency record, procedure authorization, or sign-off. |

### 2.3 Reference architecture

`book` remains the canonical type. `reference_framework` is a design relationship or metadata concept associated with a `book`, with semantic fields for framework name, role, citation-locator policy, and display scope. No generic `reference` content type is adopted.[2] [3]

## 3. Manifest version strategy

### 3.1 Adopted recommendation: Option A — v1.1 additive extension

SEG recommends a v1.1 additive extension as the least disruptive architecture for the current evidence. The extension must be delivered as a new, explicitly versioned schema/profile artifact. The existing v1.0 canonical manifest remains immutable and continues to validate existing records. The extension is additive because it introduces new approved type definitions and a controlled Reference Framework relationship without changing the meaning or required validity of existing `lesson`, `question_bank`, or `book` records.[2]

The exact v1.1 schema identifier, file path, validator selection mechanism, and implementation owner are intentionally left for the separately authorized implementation phase. This document records the strategy, not the implementation artifact.

### 3.2 Why not Option B — v2.0 schema evolution

A v2.0 evolution is not selected for the current scope because the evidence identifies a bounded additive need: two new content types and a Reference Framework relationship. There is no approved requirement to invalidate, rename, or semantically redesign existing canonical types. A v2.0 would impose greater migration and compatibility burden on existing records without evidence that a breaking redesign is required.

A future v2.0 may be reconsidered if the architecture later introduces breaking changes to identity, required envelopes, review semantics, relationship semantics, or existing type meanings. Such a reconsideration would require a separate decision record.

### 3.3 Compatibility model

The adopted compatibility model is explicit profile selection, not in-place widening of the old closed-world validator:

| Compatibility concern | v1.1 additive-extension decision |
|---|---|
| Existing v1.0 records | Remain valid under the unchanged v1.0 profile. |
| Existing v1.0 validator | Remains strict and unchanged; it may reject v1.1 records by design. |
| New `clinical_case` / `clinical_skill` records | Validate only under the separately selected v1.1 profile after implementation. |
| Existing `book` records | Remain `book`; no generic-reference conversion is required. |
| `reference_framework` relationship | Available only under the future v1.1 profile after its exact contract is implemented. |
| Source version | Remains separate from schema/contract version. A source edition or checksum is not a manifest profile version. |
| Rollback | Possible by retaining v1.0 validation and not activating the v1.1 profile; no destructive rewrite is required by this decision. |

This model avoids widening `additionalProperties: false` in the current v1.0 file merely to accommodate future fields. The current closed-world schema remains the authoritative legacy contract until a new profile is separately approved and implemented.[1] [2]

## 4. Migration and implementation implications

No data migration is authorized in Phase 7.2. Existing records do not require transformation solely because the architecture adopts new future types. Future candidate material must be processed through a reversible adapter or dry-run mapping that preserves Source IDs, source paths, SHA-256 values, version evidence, lineages, track boundaries, rights state, taxonomy, review state, and unresolved fields.[1] [2]

A later implementation phase must first finalize the exact v1.1 contract, validator behavior, and relationship representation. It must then run a documentation-only pilot, validate both legacy and extended profiles, preserve a rollback path, and obtain separate clinical/relevant, rights, taxonomy, QA, and implementation authorizations. No automatic defaults, reviewer identities, approvals, rights permissions, or pathway assignments may be generated.

## 5. Approval matrix

| Decision area | Phase 7.2 outcome | Further approval before implementation |
|---|---|---|
| Type vocabulary | Adopted: `clinical_case`, `clinical_skill` | Schema/architecture authority must approve the exact executable contract. |
| Clinical Case boundary | Adopted | Clinical/relevant review remains required per case; no protocol, patient record, or competency meaning. |
| Clinical Skill boundary | Adopted | Clinical/relevant and competency-boundary review remain required; no sign-off or authorization meaning. |
| Reference architecture | Adopted: `book` plus `reference_framework` concept | Schema/architecture authority must approve exact relationship fields. |
| Version strategy | Adopted recommendation: v1.1 additive profile | Implementation authority must approve profile identity, validator selection, and rollback behavior. |
| Existing records | Preserve under v1.0 | QA must verify compatibility and unchanged lineage before any future integration. |
| Rights | Remains separate | Rights reviewer must approve any literal PDF, image, question, or book-text display. |
| Medical review | Remains separate | Attributable clinical/relevant review is required before approval or activation. |
| Activation/publication | Not authorized | Requires separate implementation, QA, release, and activation approvals. |

## 6. Final adoption statement

**Phase 7.2 architecture decision:** `ARCHITECTURE_DECISION_COMPLETE`.

This status means that the design vocabulary, entity boundaries, Reference Framework strategy, and recommended manifest-version strategy are closed for this architecture review. It does **not** mean that the manifest has been changed, that the schema is implementation-ready, or that any medical content has been approved or activated.

## References

[1]: file:///home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "Canonical SEG governed content manifest"
[2]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_7_1_SCHEMA_EXTENSION_PROPOSAL.md "SEG Phase 7.1 Controlled Schema Extension Proposal"
[3]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DECISION_OWNER_APPROVAL.md "SEG Phase 6.13 Decision Owner Approval"

---

**Final decision status:** `ARCHITECTURE_DECISION_COMPLETE`
**Implementation authorization:** `NOT AUTHORIZED`
