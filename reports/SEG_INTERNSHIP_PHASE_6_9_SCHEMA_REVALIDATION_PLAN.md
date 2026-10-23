# SEG Internship Phase 6.9 Schema Revalidation Preparation Plan

**Phase:** 6.9 — Governance Evidence Closure & Schema Revalidation Preparation  
**Mode:** `READ_ONLY GOVERNANCE EXECUTION`  
**Generated at (UTC):** `2026-08-21T07:12:46Z`  
**Author:** Manus AI  
**Plan state:** `DOCUMENTATION_ONLY — NOT_AUTHORIZED_FOR_SCHEMA_REVALIDATION`

## 1. Purpose and scope

This document defines the minimum evidence and review sequence required before a separately authorized, non-production schema-revalidation review may begin for the SEG Internship package. It is a preparation plan, not an implementation plan. It does not generate JSON, convert schemas, create production records, modify the manifest, modify the SEG repository, import content, activate content, or authorize any database/application change. [1] [2]

The controlled candidate population remains the exact 48 A–E source records in the existing revalidation manifest. The 61 technical implementation assets remain explicitly excluded from medical-content ingestion. The 20 unknown items and 67 carried-forward unresolved rows remain outside any implied approval or automatic promotion. [3]

The professional pathway context is preserved as **SEG Internship Doctor Pathway**, with the design-level track context `02_Internship`, root concept `Intern Core`, and exactly three branches: **Core Rotations**, **Clinical Foundation**, and **Learning Engine**. This context does not close source-level track, taxonomy ID/version, reviewer, rights, or audit requirements. [4]

## 2. Required entry gates before schema revalidation review

Schema revalidation review may be scheduled only after all applicable gates below have attributable evidence and a separate written authorization identifies the exact non-production scope.

| Entry gate | Required closure evidence | Current status | Blocking condition |
|---|---|---:|---|
| Exact scope | Immutable list of source IDs, preserved paths, versions, SHA-256 values, domain targets, and technical exclusions. | `PARTIAL` | Manifest is draft; final immutable scope freeze and independent SHA reconciliation are pending. |
| Provenance | Owner, publisher/source organization, original location, source identity, and exact locator for each source. | `OPEN` | Owner/publisher and provenance evidence are not closed per source. |
| Version | Governed version/release identity and effective date for each source. | `PARTIAL` | Some package/path signals exist, but governed per-source version evidence is incomplete. |
| Rights | Text, PDF, image, excerpt, derivative, display, and restriction decisions where applicable. | `OPEN` | Rights and learner-display scope are not closed. |
| Reviewer assignment | Qualified reviewer identity/role, scope, date, and decision record. | `OPEN` | No complete attributable review package is supplied. |
| Clinical/relevant review | Source-level review outcome, limitations, cited locations, and unresolved issues. | `OPEN` | Clinical/relevant review is not complete; no approval is implied. |
| Track/taxonomy | Explicit `02_Internship`, branch/domain mapping, taxonomy ID/version, and conflict disposition. | `PARTIAL` | Pathway vocabulary exists, but per-source track/taxonomy IDs and versions are not supplied. |
| Duplicate/lineage closure | Independent comparison and attributable lineage decision for both duplicate families and `SRC-0078`. | `OPEN` | Design recommendations do not select a canonical production source or close namespaces. |
| Contract authority | Confirmed contract identity/version, required fields, unknown-field policy, review states, and relationship semantics. | `PARTIAL` | Three contracts are accepted as design-only; implementation/schema authority confirmation remains separate. |
| Audit readiness | Append-only, attributable events linking every decision to source/version/checksum and evidence. | `OPEN` | Complete event chain is not supplied. |
| QA readiness | Schema/contract validation criteria, evidence package, negative tests, and unresolved-item report. | `OPEN` | No schema revalidation execution or QA result exists in this phase. |
| Separate authorization | Written scope-specific authorization for non-production schema revalidation, including output path and reviewer scope. | `OPEN` | Phase 6.8 explicitly did not grant implementation or revalidation authorization. |

**Entry rule:** If any applicable gate is `OPEN` or unresolved, the review remains `BLOCKED_PENDING_EVIDENCE`. No gate may be closed by inference from a filename, folder, topic, UI, route, or prior design recommendation. [4]

## 3. Decision Owner approval checklist

This checklist is prepared for attributable Decision Owner completion. Empty authority, actor, date, signature, and decision fields are intentionally marked `NOT_SUPPLIED`; no approval is invented by this document.

| Decision item | Required decision options | Current documented recommendation | Required evidence before acceptance | Decision Owner status | Authority / actor / date |
|---|---|---|---|---|---|
| **Package acceptance** | `ACCEPT_DESIGN_ONLY`; `RETURN_FOR_EVIDENCE`; `BLOCK_PENDING_GOVERNANCE` | Design-level package acceptance only; production acceptance not granted. | Evidence matrix, exact scope, unresolved-item register, and attributable acceptance record. | `PENDING_DECISION_OWNER` | `NOT_SUPPLIED` |
| **SRC-0078 / phone-pediatrics-main** | `PRESERVE_CROSSWALK`; `SEPARATE_NAMESPACES`; `RETURN_FOR_LINEAGE_REVIEW`; `BLOCK` | Preserve both identifiers and document a crosswalk candidate; do not rename, merge, or replace. | Source-local identifier evidence, path/checksum reconciliation, namespace semantics, duplicate/lineage rationale, and attributable decision. | `PENDING_DECISION_OWNER` | `NOT_SUPPLIED` |
| **DUP-DRUG-001** | `ACCEPT_DESIGN_ORDERING`; `RETURN_FOR_COMPARISON`; `SELECT_CANONICAL_ONLY_WITH_AUTHORITY`; `BLOCK` | `v2_Pack` remains a primary design candidate for comparison; Base lineage is preserved; no canonical source selected. | File-level comparison of Base and `v2_Pack`, coverage/structure/evidence differences, version/rights/reviewer evidence, and explicit canonical-selection authority if applicable. | `PENDING_DECISION_OWNER` | `NOT_SUPPLIED` |
| **DUP-EMERGENCY-001** | `ACCEPT_DESIGN_ORDERING`; `RETURN_FOR_COMPARISON`; `SELECT_CANONICAL_ONLY_WITH_AUTHORITY`; `BLOCK` | `v2_Pack` remains a primary design candidate for comparison; Base lineage is preserved; no canonical source selected. | File-level comparison of Base and `v2_Pack`, coverage/structure/evidence differences, version/rights/reviewer evidence, and explicit canonical-selection authority if applicable. | `PENDING_DECISION_OWNER` | `NOT_SUPPLIED` |
| **Clinical Case contract** | `ACCEPT_DESIGN_CONTRACT`; `RETURN_FOR_CONTRACT_CLARIFICATION`; `BLOCK_PENDING_SCHEMA_AUTHORITY`; `REJECT` | `DESIGN_CONTRACT_ACCEPTED`; source-fidelity boundary preserved. | Contract identity/version, fields, requiredness, unknown-field policy, review states, lineage, track/taxonomy handling, clinical/relevant review, rights, and audit requirements. | `PENDING_AUTHORITY_CONFIRMATION` | `NOT_SUPPLIED` |
| **Skills / Procedures contract** | `ACCEPT_WITH_COMPETENCY_BOUNDARY`; `RETURN_FOR_COMPETENCY_CLARIFICATION`; `BLOCK_PENDING_CONTRACT_AUTHORITY`; `REJECT` | `DESIGN_CONTRACT_ACCEPTED_WITH_COMPETENCY_BOUNDARY`; framework, skill, competency, assessment, and sign-off remain distinct. | Contract identity/version, record roles, level semantics, assessment method, sign-off semantics, relevant clinical/educational review, rights, taxonomy, and audit requirements. | `PENDING_AUTHORITY_CONFIRMATION` | `NOT_SUPPLIED` |
| **Reference / Book contract** | `ACCEPT_WITH_RIGHTS_GATE`; `RETURN_FOR_RIGHTS_OR_LOCATOR_CLARIFICATION`; `BLOCK_PENDING_RIGHTS_AND_CONTRACT_AUTHORITY`; `REJECT` | `DESIGN_CONTRACT_ACCEPTED_WITH_RIGHTS_GATE`; no display authorization. | Source identity, owner/publisher, governed version, exact locator, text/image rights, restrictions, display scope, relevant review, taxonomy, and audit. | `PENDING_AUTHORITY_CONFIRMATION` | `NOT_SUPPLIED` |
| **Taxonomy closure** | `CONFIRM_PATHWAY_CONTEXT`; `RETURN_FOR_TAXONOMY_MAPPING`; `BLOCK` | Confirm design vocabulary only: `SEG Internship Doctor Pathway` → `02_Internship` → three branches. | Per-source track, branch/domain mapping, taxonomy ID/version, reviewer, rationale, and conflict disposition. | `PENDING_EVIDENCE` | `NOT_SUPPLIED` |
| **Schema-revalidation authorization** | `AUTHORIZE_NON_PRODUCTION_REVIEW`; `RETURN_FOR_EVIDENCE`; `BLOCK` | No authorization exists in Phase 6.8. | Exact source IDs, versions, hashes, contracts, scope, reviewer roles, output location, validation rules, rollback/non-publication controls, actor, role, and timestamp. | `NOT_GRANTED` | `NOT_SUPPLIED` |

A completed checklist must be append-only and must not be backfilled with guessed identities, dates, rights, taxonomy IDs, or clinical decisions. Completion of this checklist would record authority evidence; it would not itself activate medical content.

## 4. Controlled five-domain revalidation preparation

The following domain plans are target-specific preparation only. They preserve the existing provisional mapping and require the same evidence envelope for every candidate source.

### 4.1 Lesson

**Candidate basis:** Learning Content candidates mapped provisionally to `lesson`, including rotation objectives, Emergency Basics, Drug Essentials, and internship guides. The current mapping includes both candidate-review and unresolved-review rows. [5]

**Required review sequence:** reconcile source ID/path/SHA; close owner, publisher, version, rights, reviewer, track/taxonomy, and audit; resolve duplicate-family membership for Drug Essentials; confirm branch/domain mapping; validate the Lesson contract without creating records; record unresolved sections; obtain separate non-production revalidation authorization.

**Required result:** source-level evidence bundle and a documentation-only validation report. No Lesson JSON or database record may be generated in this phase.

### 4.2 Question Bank

**Candidate basis:** Assessment candidates mapped provisionally to `question_bank`, including reviewed JMC materials, source-local phone materials, and `SRC-0078`. [5]

**Required review sequence:** preserve source-local identifiers; reconcile `SRC-0078` with `phone-pediatrics-main` without replacement; verify item-level lineage and exact locators; close owner, publisher, version, rights, reviewer, track/taxonomy, audit, and question-contract fields; classify technical parser/UI assets as exclusions; obtain separate authorization.

**Required result:** a source-level evidence and contract-readiness report. No question-bank JSON, conversion, import, or activation may occur.

### 4.3 Clinical Case

**Candidate basis:** Emergency Cases Base and `v2_Pack` family members mapped provisionally to `Learning Engine > Clinical Cases` under the Phase 6.8 design-only Clinical Case contract. [1] [5]

**Required review sequence:** preserve Base and `v2_Pack` lineages; perform independent structure/coverage/evidence comparison for `DUP-EMERGENCY-001`; confirm contract identity/version, source-fidelity rules, required fields, review states, rights, track/taxonomy, and audit; perform qualified clinical review against exact source locations; do not infer missing clinical sections; obtain separate authorization.

**Required result:** a documentation-only contract/evidence validation package. No Clinical Case production record, enum, schema activation, or content approval may occur.

### 4.4 Skills / Procedures

**Candidate basis:** Clinical Skills, Logbook, and OSCE framework candidates mapped provisionally to `Clinical Foundation > Clinical Skills` under the Phase 6.8 Skills / Procedures design contract. [1] [5]

**Required review sequence:** distinguish framework candidates from individual skills, competencies, assessments, and sign-offs; confirm level and assessment semantics; close provenance, version, rights, reviewer, track/taxonomy, audit, and relevant educational/clinical review; validate the competency boundary; obtain separate authorization.

**Required result:** a documentation-only role/boundary/readiness report. No competency completion, OSCE result, procedure sign-off, JSON, import, or activation may occur.

### 4.5 Reference / Book

**Candidate basis:** Internship book/PDF candidates mapped provisionally to `Reference / Atlas`, to be assessed against the Phase 6.8 Reference / Book design contract. [1] [5]

**Required review sequence:** establish owner/publisher, governed version, exact page/chapter/section locator, text/image/PDF rights, display scope, restrictions, relevant review, track/taxonomy, and audit; preserve PDFs and paths; do not infer rights from file presence or filename; obtain separate authorization before any display or conversion consideration.

**Required result:** a documentation-only reference evidence/rights package. No learner-facing display, excerpt, image, quotation, JSON, import, or activation may occur.

## 5. Proposed non-production validation sequence

The sequence below is a future controlled review sequence, not an authorization to execute it:

1. **Scope freeze preparation:** reconcile the exact 48 candidate rows and 61 technical exclusions against preserved originals; independently verify every SHA-256; record unknown and unresolved populations.
2. **Evidence closure:** complete owner, publisher, version, rights, reviewer, track, taxonomy, and audit fields with attributable records; preserve `NOT_SUPPLIED` where evidence remains absent.
3. **Lineage and duplicate review:** complete the `SRC-0078` crosswalk decision and independent comparisons for both duplicate families without deleting or selecting sources automatically.
4. **Contract confirmation:** confirm the five domain contracts and their field/review-state/unknown-field semantics through the appropriate architecture, clinical/relevant, rights, and governance authorities.
5. **Read-only schema revalidation review:** only after separate authorization, validate candidate mappings against the then-current approved contract/schema identity in a non-production output location; record failures and unresolved items without importing or activating.
6. **QA and release gate:** perform schema/content-contract QA, provenance/rights/audit checks, track separation checks, and evidence-package review. Any failure returns the scope to `BLOCKED_PENDING_EVIDENCE`.

## 6. Current gate

The plan is ready as a **preparation document**, but the package is not ready for schema-revalidation review because required evidence fields remain `OPEN` or `PARTIAL`, the manifest is not immutably frozen, independent SHA reconciliation is pending, and separate authorization has not been granted. [3]

> **Current final status:** `BLOCKED_PENDING_EVIDENCE`

## 7. Protected non-actions

This plan created no production artifact. No JSON was generated. No schema was converted or revalidated. No database, application, route, authentication, security boundary, content structure, or source file was modified. No source was imported, activated, published, deleted, renamed, merged, archived, overwritten, or replaced. No clinical approval, rights approval, canonical duplicate selection, taxonomy ID/version, reviewer identity, or implementation authorization was invented.

## References

[1]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_FINAL_GOVERNANCE_DECISION_RECORD.md` "SEG Internship Final Governance Decision Record — Phase 6.8"
[2]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_8_GATE_REPORT.md` "SEG Internship Phase 6.8 Gate Report"
[3]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_REVALIDATION_ARTIFACT_MANIFEST.md` "SEG Internship Revalidation Artifact Manifest"
[4]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_TRACK_TAXONOMY_CONTRACT.md` "SEG Internship Track & Taxonomy Contract"
[5]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_SCHEMA_MAPPING_PLAN.md` "SEG Internship Source-to-Schema Mapping Plan"
[6]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_9_EVIDENCE_CLOSURE_MATRIX.md` "SEG Internship Phase 6.9 Evidence Closure Matrix"
