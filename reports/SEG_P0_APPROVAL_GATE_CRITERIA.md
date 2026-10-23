# SEG P0 Approval Gate Criteria

**Document ID:** `SEG_P0_APPROVAL_GATE_CRITERIA`  
**Mode:** `GOVERNANCE EXECUTION PREPARATION`  
**Scope:** Drug HTML, OSCE Atlas package, and PreTest content artifacts.  
**Current package state:** `BLOCKED_PENDING_EVIDENCE_AND_REVIEWER_ASSIGNMENT`

## 1. Purpose and non-approval boundary

This document defines the minimum evidence and governance conditions required before a P0 source can be considered for source-level approval. It is a criteria document only. It does not approve a source, assign a reviewer, create a signature, set `READY_FOR_NORMALIZATION`, normalize content, import content, create database records, or authorize production release.

The governing sequence remains:

> Source → Version → Governance Record → Clinical Review → Approval → Activation

A `SEG_INTERNAL_ASSET` declaration permits controlled internal project management of the declared artifact scope. It does not by itself establish canonical source identity, version currency, clinical correctness, completeness, third-party rights, professional-track suitability, or production approval.[1]

## 1.1 Owner-governed medical review model

For a declared `SEG_INTERNAL_ASSET`, the project owner may define the required clinical review domains, metadata fields, acceptance criteria, educational scope, and review sequence. The internal review pathway is `OWNER_GOVERNED_MEDICAL_REVIEW_PATHWAY`; no mandatory external reviewer or external approval dependency is assumed solely for the internal medical-review pathway.

The owner may appoint an appropriately qualified reviewer, conduct an owner-executed review where qualification and conflict controls are recorded, or document a bounded owner-governed review decision. Each review must remain attributable, source-linked, version-linked, and separately recorded. This model does not waive external or third-party rights/provenance evidence where applicable, and it does not turn a review record into source-level approval.

## 2. Mandatory progression rule

A P0 source may progress to a source-level approval decision **only when every applicable gate below is satisfied and independently evidenced**. A missing, ambiguous, conflicting, or non-attributable requirement is a blocking condition. No gate may be inferred from file possession, a checksum, a recovery package, a title signal, internal ownership, educational purpose, or completion of a different review stream.

The minimum progression conditions are:

1. **Identity confirmed.** The canonical source identity, owner or authorized custodian, original locator, and artifact relationship are established for the exact retained representation.
2. **Version tracked.** The source version, edition or release, date where applicable, immutable artifact hash, and change/supersession relationship are recorded. A registry reference or file hash alone is not a canonical edition or release number.
3. **Ownership documented.** Internal ownership is documented for the declared SEG artifact scope. Any external or incorporated material has a separate rights/provenance assessment; internal ownership does not automatically clear third-party text, images, tables, questions, or source pages.
4. **Provenance closed.** The chain from authoritative source to extraction or creation event to recovery artifact to SEG record is documented, including responsible actor/context, dates supplied by evidence, transformations, locators, and custody.
5. **Rights assessed and decided.** Text, image, table, question, display, adaptation, educational-use, attribution, redistribution, and publication permissions are documented for the applicable scope. Unresolved rights remain blocking.
6. **Required owner-governed reviews completed.** Every applicable medical, drug-safety, assessment-quality, technical, visual, accessibility, track/taxonomy, rights, and provenance review is completed through the owner-governed pathway or the applicable separate governance stream and recorded against the exact artifact/version. The record must remain attributable and role-appropriate; no external reviewer is mandatory solely because an asset is internal.
7. **Findings resolved.** All critical findings, conflicts, ambiguities, OCR issues, completeness concerns, and unsafe or untraceable claims have an explicit documented disposition. “No finding recorded” is not equivalent to “findings resolved.”
8. **Audit trail complete.** Declaration, version, artifact verification, review, conflict, disposition, and approval events are append-only, attributable, date/time recorded, and linked to the exact artifact/version.
9. **Explicit approval recorded.** An authorized governance participant records a source-level approval decision with scope, evidence references, decision date, limitations, and any conditions. Review completion alone is not approval.
10. **Implementation authorization remains separate.** Source approval does not authorize normalization, Content Record creation, database import, application exposure, activation, publication, or learner access. Those actions require a separate implementation/release authorization and passing QA.

## 3. Gate decision vocabulary

| Decision/state | Meaning |
|---|---|
| `PASS` | The specific gate has complete, attributable, internally consistent evidence for the exact scope. `PASS` is not source approval unless the separate approval record also exists. |
| `BLOCKED` | Required evidence is missing, ambiguous, conflicting, stale, or not independently attributable. Downstream source approval cannot proceed. |
| `NOT_STARTED` | No attributable review or decision event is recorded for the gate. |
| `PENDING_REVIEW` | A required review role or stream is identified but the review evidence or decision is not complete. |
| `NOT_APPROVED` | No valid source-level approval record exists, or a prior decision explicitly denies approval. |
| `READY_FOR_NORMALIZATION` | A separately approved source-level state established by authorized governance evidence. This document does not set this state. |

## 4. Common evidence requirements

| Gate | Required evidence | Blocking condition |
|---|---|---|
| Source identity | Canonical title, owner/custodian, original locator, exact artifact relationship, and identity reconciliation | Any canonical identity or artifact relationship remains unresolved |
| Version control | Edition/release/version, date where applicable, immutable hash, source-versioned locators, change history, and supersession handling | Version is absent, inferred, or not linked to the exact reviewed artifact |
| Internal ownership | `SEG_INTERNAL_ASSET` declaration covering the exact artifact scope and retained hash/reference | Scope, declaring authority, or artifact link is absent |
| External/third-party rights | Ownership/permission/license and allowed text/image/table/question usage scope | Any incorporated material has unclear ownership or permitted use |
| Provenance | Source → extraction/creation → recovery artifact → SEG custody chain with dates, actors/context, transformations, and locators | Chain is incomplete, inferred, or not attributable |
| Medical review | Owner-governed qualified role or owner-executed review authority, exact scope, identity, date, citations, findings, conflicts, disposition, and decision | Review is only a preparation record, lacks attributable reviewer/owner evidence, or leaves critical issues open |
| Drug safety review | Independent Pharmacology/Drug Safety scope for Drug HTML, with exact artifact/source citations | Drug identity, dosing, interactions, contraindications, safety, omissions, or ambiguity remain unreviewed |
| Assessment quality | Independent question/answer/explanation, numbering, completeness, ambiguity, and assessment-alignment evidence for PreTest | Authoritative comparison or item-level evidence is absent |
| Technical/OCR review | Encoding, rendering, extraction, OCR, reproducibility, lineage, and comparison evidence as applicable | Technical or OCR limitations can affect interpretation and remain unresolved |
| Visual review | Per-image visual findings, member hash, source linkage, legibility, labels, annotations, contrast, and reproducibility for OSCE | Any applicable image lacks review or has an unresolved critical defect |
| Accessibility review | Per-image/text alt-text or equivalent access, clinical labeling, captions, legibility, contrast, semantics, language, and assistive-technology evidence | Accessibility scope is incomplete or depends on unverified remediation |
| Track/taxonomy | Explicit professional-track and taxonomy decision with version and rationale | Track is inferred from filename, topic, or audience without governed evidence |
| Audit | Append-only events linked to artifact/version and attributable actor/reviewer/approver | Missing date, actor, scope, event, or decision linkage |
| Source-level approval | Explicit authorized approval record with scope, evidence, conditions, limitations, and date | No separate approval decision exists |

## 5. Source-specific approval criteria

### 5.1 Drug HTML

Drug HTML may be considered for a source-level approval decision only when all of the following are evidenced:

| Criterion | Required completion evidence |
|---|---|
| Identity and version | Canonical source/title, owner or authorized custodian, edition/version/date, original locator, and exact relationship to the HTML hash `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac` |
| Provenance | Documented source-to-HTML extraction/creation history, transformation boundaries, custody, and exact locators |
| Rights | Internal ownership scope plus separate clearance/decision for any external text, tables, images, or embedded material |
| Emergency Medicine review | Completed attributable owner-governed review of clinical scope, indications, doses, contraindications, context, currency, omissions, ambiguity, and conflicts |
| Pharmacology/Drug Safety review | Completed attributable owner-governed Pharmacology/Drug Safety review of drug identity, dosing, interactions, contraindications, safety signals, omissions, ambiguity, and evidence limits |
| Technical review | Completed HTML/embedded-data/lineage review with reproducibility and rendering findings resolved |
| Track/taxonomy | Explicit governed track and taxonomy decision |
| Audit and approval | Complete append-only records and a separate explicit source-level approval decision |

The current Drug HTML artifact does not satisfy these criteria. Its current state remains `REVIEW_BLOCKED_PENDING_EVIDENCE` and `NOT_APPROVED`.[2]

### 5.2 OSCE Atlas package

OSCE Atlas may be considered for a source-level approval decision only when all of the following are evidenced:

| Criterion | Required completion evidence |
|---|---|
| Package and member identity | Exact package/member scope, inner hash `ca5a7f5713bf5101daa839a546633366d7b5b876604bd3dbf7cea2972d59f66e`, outer hash `8182d243fc762e29efba5adeda4233042f5e337846b3fbe819fcd374ef948758`, and complete 14-PNG manifest |
| Canonical source/version | Authoritative atlas/PDF title, owner/custodian, edition/version/date, original locator, and source-to-package relationship |
| Per-member provenance and rights | Image-to-source and image-to-station lineage, text/image ownership, permission/license, display/adaptation/redistribution/publication scope for every applicable member |
| Emergency Medicine review | Completed attributable owner-governed clinical/OSCE review of station-image correspondence, clinical labeling, educational synthesis, current-protocol alignment, domains, ambiguity, and conflicts |
| Visual review | Completed attributable per-image review of all 14 PNGs for legibility, labels, annotations, contrast, reproducibility, source context, and critical visual defects |
| Accessibility review | Completed attributable per-image/text assessment of meaningful alt-text/equivalent access, captions, clinical context, responsive legibility, contrast, non-color dependence, semantics, language, and assistive technology |
| Technical and audit review | Completed package integrity/lineage review and append-only evidence records |
| Track/taxonomy and approval | Explicit track/taxonomy decision and separate authorized source-level approval record |

The current OSCE package does not satisfy these criteria. Limited readability notes for two selected images do not complete the visual or accessibility gates. Its current state remains `REVIEW_BLOCKED_PENDING_EVIDENCE` and `NOT_APPROVED`.[3]

### 5.3 PreTest content artifacts

PreTest may be considered for a source-level approval decision only when all of the following are evidenced:

| Criterion | Required completion evidence |
|---|---|
| Authoritative representation | `pretestnew.pdf` or independently verifiable equivalent linked to the retained `UPD811-007` representation and hash `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166` |
| Identity and version | Canonical title, owner/custodian, edition/version/date, source-versioned question/page locators, and exact retained representation relationship |
| Provenance and OCR | Complete source-to-text/recovery chain, immutable comparison, OCR discrepancy classification, and disposition of any separate artifact lineage |
| Rights | Internal ownership scope plus separate rights/permission decision for source text, questions, answers, explanations, and any incorporated external material |
| Emergency Medicine review | Completed attributable owner-governed clinical review of question/answer integrity, clinical currency, rationale fidelity, ambiguity, conflicts, and source fidelity |
| Assessment Quality review | Completed attributable owner-governed item-level assessment of completeness, numbering, question/answer pairing, answer-key availability, explanation/rationale linkage, ambiguity, alignment, and duplication/truncation/missing-item evidence |
| Technical/OCR review | Completed technical comparison and representation review without silently correcting the retained evidence artifact |
| Track/taxonomy and audit | Explicit governed track/taxonomy decision and complete append-only review/audit records |
| Approval | Separate explicit authorized source-level approval with scope and limitations |

The current PreTest representation does not satisfy these criteria. Its current state remains `REVIEW_BLOCKED_PENDING_EVIDENCE` and `NOT_APPROVED`.[4]

## 6. Required approval-record fields

A valid source-level approval record must contain, at minimum:

| Field | Requirement |
|---|---|
| Approval record ID | Unique immutable identifier |
| Source and artifact scope | Exact source, artifact/member/reference, and SHA-256 |
| Version | Canonical version/edition/release and effective date, or explicit governed treatment of unresolved values |
| Ownership and rights | Internal ownership declaration plus separate third-party rights/permission decision where applicable |
| Review evidence | Links to each required completed owner-governed review record and reviewer role/identity/date |
| Findings disposition | All critical findings, conflicts, ambiguities, and limitations resolved or explicitly accepted by authorized governance evidence |
| Track/taxonomy | Explicit track and taxonomy identifier/version |
| Approval authority | Attributable authorized governance participant; no placeholder identity |
| Approval decision/date | Explicit decision, date/time, scope, conditions, and limitations |
| Audit linkage | Append-only event linked to the source, artifact, version, reviews, and decision |
| Implementation boundary | Explicit statement that source approval does not authorize import, integration, activation, publication, or learner exposure |

## 7. Current P0 gate result

| Source | Current gate result | Approval state |
|---|---|---|
| Drug HTML | `BLOCKED` — identity/version, provenance, rights, medical/drug-safety/technical review, and audit evidence incomplete | `NOT_APPROVED` |
| OSCE Atlas | `BLOCKED` — authoritative identity/version, per-image rights/lineage, medical/visual/accessibility/technical review, and audit evidence incomplete | `NOT_APPROVED` |
| PreTest | `BLOCKED` — authoritative representation/version, OCR comparison, completeness, medical/assessment-quality/technical review, rights, and audit evidence incomplete | `NOT_APPROVED` |

## 8. Governance controls and prohibited actions

| Control | Current state |
|---|---|
| Internal review model | `OWNER_GOVERNED_MEDICAL_REVIEW_PATHWAY` |
| External approval dependency for internal medical review | Not assumed; external rights/provenance/source-authority evidence remains required where applicable |
| Source approvals | `APPROVED_SOURCES = NONE` |
| Normalization | `BLOCKED_PENDING_APPROVED_SOURCE` |
| `READY_FOR_NORMALIZATION` | Not set by this document |
| Reviewer assignment | Criteria only; no fake or named reviewer created |
| Signature/approval | No signature or approval created |
| Content Records | Not created |
| Zod/Prisma/SQL/schema | Not created |
| Database/application changes | Not performed |
| Import/activation/publication | Not performed |
| Source Registry | Not modified |

## 9. Final criteria state

`SEG_P0_APPROVAL_GATE_CRITERIA_COMPLETE`

This status confirms that the P0 source-level approval criteria and owner-governed review model have been documented. It does not approve any source or change the current governance state.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_INTERNAL_OWNERSHIP_DECLARATION_v1.md "SEG Internal Ownership Declaration v1"

[2]: file:///home/ubuntu/seg-internship-output/SEG_DRUG_HTML_REVIEW_STATUS_v1.md "SEG Drug HTML Review Status v1"

[3]: file:///home/ubuntu/seg-internship-output/SEG_OSCE_ATLAS_REVIEW_STATUS_v1.md "SEG OSCE Atlas Review Status v1"

[4]: file:///home/ubuntu/seg-internship-output/SEG_PRETEST_REVIEW_STATUS_v1.md "SEG PreTest Review Status v1"

[5]: file:///home/ubuntu/seg-internship-output/SEG_P0_INDEPENDENT_REVIEW_EXECUTION_REPORT.md "SEG P0 Independent Review Execution Report"

[6]: file:///home/ubuntu/seg-internship-output/SEG_P0_REVIEW_ASSIGNMENT_MATRIX.md "SEG P0 Review Assignment Matrix"

[7]: file:///home/ubuntu/seg-internship-output/SEG_OWNER_REVIEW_AUTHORITY_POLICY.md "SEG Owner Review Authority Policy"

**Document status:** `APPROVAL_CRITERIA_AND_OWNER_GOVERNED_REVIEW_MODEL_DOCUMENTED_PENDING_ALL_P0_GATES`
