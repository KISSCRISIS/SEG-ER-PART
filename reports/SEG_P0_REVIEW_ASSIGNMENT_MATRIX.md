# SEG P0 Review Assignment Matrix

**Document ID:** `SEG_P0_REVIEW_ASSIGNMENT_MATRIX`  
**Mode:** `CONTROLLED GOVERNANCE EXECUTION`  
**Scope:** Drug HTML, OSCE Atlas package, and PreTest content artifacts.  
**Purpose:** Prepare independent role-based review gates for internally owned P0 assets. This matrix assigns required reviewer **roles only**; it does not create named reviewers, credentials, signatures, review decisions, approvals, or learner access.

## 1. Review-control boundary

The ownership declaration permits the three listed artifacts to be managed internally as `SEG_INTERNAL_ASSET`. It does not complete medical, assessment, visual, accessibility, technical, provenance, or rights review. The P0 evidence reports continue to classify all three sources as `BLOCKED_PENDING_EVIDENCE`, with medical and applicable technical/visual/accessibility reviews pending.[1] [2]

All review streams must remain independent. A passing medical review cannot substitute for rights, provenance, technical, visual, accessibility, assessment-quality, version, or audit evidence. Reviewers must examine the exact retained artifact or an explicitly versioned equivalent and record the artifact identifier, hash, date, role, findings, cited locations, conflicts, unresolved issues, and disposition.

## 1.1 Owner-governed review authority

For the declared `SEG_INTERNAL_ASSET` scopes, the controlling review model is `OWNER_GOVERNED_MEDICAL_REVIEW_PATHWAY`. Dr. Alaa Al-Asfar is recorded as SEG Medical Content Owner, Emergency Medicine Physician, and Project Lead. The owner may define the required clinical domains, metadata fields, acceptance criteria, educational scope, and role-based review sequence for the declared internal assets.

No mandatory external reviewer or external approval dependency is assumed solely to establish or execute the internal medical-review pathway. The owner may appoint an appropriately qualified reviewer, conduct an owner-executed review where qualification and conflict controls are recorded, or document a bounded review decision through the owner-governed process. In every case, reviewer identity/role, qualification, date/time, exact artifact/hash, findings, conflicts, limitations, disposition, and audit linkage remain mandatory.

This authority does not bypass rights or provenance assessment for external or incorporated material, version tracking, change history, safety documentation, technical/visual/accessibility/assessment-quality requirements, professional-track controls, or explicit source-level approval. It does not create a reviewer assignment or approval in this matrix.[5]

## 2. Assignment matrix

| Source | Exact review scope | Required reviewer role | Named reviewer | Assignment state | Review execution state | Required evidence/output |
|---|---|---|---|---|---|---|
| Drug HTML | Retained readable UTF-8 HTML representation; SHA-256 `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac`; 25,918 bytes; 394 lines | Emergency Medicine Reviewer | `NOT_SUPPLIED` | `ROLE_REQUIRED — NAME_NOT_ASSIGNED` | `PENDING_REVIEW` and blocked until required evidence is available | Exact-artifact clinical review of structure and medical scope; record cited sections/entities, omissions, ambiguity, conflicts, and disposition without altering the HTML |
| Drug HTML | Same exact retained representation | Pharmacology/Drug Safety Reviewer | `NOT_SUPPLIED` | `ROLE_REQUIRED — NAME_NOT_ASSIGNED` | `PENDING_REVIEW` and blocked until required evidence is available | Independent review of drug identity, dose statements, interactions, contraindications, safety signals, omissions, ambiguity, conflicts, and source locations; no clinical conclusion is pre-created |
| OSCE Atlas package | Recovered package; inner SHA-256 `ca5a7f5713bf5101daa839a546633366d7b5b876604bd3dbf7cea2972d59f66e`; outer recovery-container SHA-256 `8182d243fc762e29efba5adeda4233042f5e337846b3fbe819fcd374ef948758`; 14 PNG members, station text, and validation notes | Emergency Medicine Reviewer | `NOT_SUPPLIED` | `ROLE_REQUIRED — NAME_NOT_ASSIGNED` | `PENDING_REVIEW` and blocked until authoritative/source and lineage evidence is available | OSCE clinical review against exact station/image scope; record station/image locators, clinical findings, ambiguity, conflicts, completeness concerns, and disposition |
| OSCE Atlas package | Same exact package and each applicable PNG member | Visual Reviewer | `NOT_SUPPLIED` | `ROLE_REQUIRED — NAME_NOT_ASSIGNED` | `PENDING_REVIEW` and blocked until per-image lineage and review evidence are available | Independent visual-quality review for each applicable image; record member identifier, visual findings, reproducibility, source linkage, conflicts, and disposition; no image is changed |
| OSCE Atlas package | Same exact package and learner-facing visual/text access scope | Accessibility Reviewer | `NOT_SUPPLIED` | `ROLE_REQUIRED — NAME_NOT_ASSIGNED` | `PENDING_REVIEW` and blocked until source/member scope and accessibility evidence are available | Accessibility review for image/text presentation, alternative descriptions or equivalent access requirements, legibility, and learner-facing barriers; record exact member/section locators and unresolved issues |
| PreTest content artifacts | Recovered `pretestnew_Study_Guide_UTF8.txt`; registry reference `UPD811-007`; SHA-256 `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166`; OCR/extraction corruption retained unchanged | Emergency Medicine Reviewer | `NOT_SUPPLIED` | `ROLE_REQUIRED — NAME_NOT_ASSIGNED` | `PENDING_REVIEW` and blocked until authoritative comparison/OCR reconciliation is available | Question-level medical review of the exact retained representation after evidence comparison; record question/section locators, clinical findings, discrepancies, conflicts, and disposition without correcting source text |
| PreTest content artifacts | Same exact retained representation and its authoritative comparison scope when supplied | Assessment Quality Reviewer | `NOT_SUPPLIED` | `ROLE_REQUIRED — NAME_NOT_ASSIGNED` | `PENDING_REVIEW` and blocked until authoritative representation and completeness evidence are available | Independent assessment-quality review of question/answer/explanation structure, numbering, completeness, ambiguity, assessment alignment, and conflicts; record exact locators and disposition without creating question records |

## 3. Role separation and review questions

### 3.1 Drug HTML

The Emergency Medicine Reviewer should assess the clinical scope and internal consistency of the exact retained artifact without correcting or rewriting it. The Pharmacology/Drug Safety Reviewer should separately assess drug-specific safety dimensions, including identity, dosing statements, interactions, contraindications, omissions, and ambiguity. Both streams must preserve unresolved clinical questions and cite exact artifact locations.

### 3.2 OSCE Atlas

The Emergency Medicine Reviewer should assess the clinical and OSCE content of the exact station/text/image scope. The Visual Reviewer must independently assess the visual quality and reproducibility of each applicable PNG. The Accessibility Reviewer must independently assess access barriers and required equivalent access for the text and visual members. Image-level rights and source-to-member lineage remain a separate governance stream and are not closed by visual review.

### 3.3 PreTest

The Emergency Medicine Reviewer should assess the clinical content only after the authoritative source or an independently verifiable equivalent permits reconciliation of the retained OCR representation. The Assessment Quality Reviewer should separately assess question/answer/explanation structure, numbering, completeness, ambiguity, and assessment quality. Neither role may correct the recovered text or convert it into Content Records through this matrix.

## 4. Common reviewer-record requirements

Each future review record must include the following, supplied by the authorized reviewer or governance participant:

| Required field | Requirement |
|---|---|
| Review record ID | Unique, immutable identifier linked to the source and exact artifact scope |
| Artifact identity | File/package/member identifier and SHA-256 where available |
| Source/version | Canonical source and version if later established; unresolved values remain `NOT_SUPPLIED` or `UNRESOLVED` |
| Reviewer role | One of the role assignments in this matrix; no unnamed or inferred credentials |
| Reviewer identity | Supplied by an authorized governance participant; currently `NOT_SUPPLIED` |
| Review date/time | Supplied when the review occurs; not inferred from document or file dates |
| Findings and locators | Exact sections, stations, images, questions, or artifact members examined |
| Conflicts and unresolved issues | Preserved explicitly; no silent resolution or source selection |
| Decision/disposition | Recorded only when supplied by the authorized reviewer; this matrix creates no decision |
| Audit event | Append-only event linked to the review record and artifact hash |

## 5. Current readiness and blockers

| Source | Role-preparation state | Evidence/review blockers | Current gate |
|---|---|---|---|
| Drug HTML | Required roles recorded; no named reviewers assigned | Canonical identity/version/locator, provenance, rights, exact-artifact clinical review, technical review, and audit evidence remain incomplete | `BLOCKED_PENDING_EVIDENCE` |
| OSCE Atlas | Required roles recorded; no named reviewers assigned | Authoritative atlas identity, image/text rights, per-image lineage, completeness, clinical, technical, visual, accessibility, and audit evidence remain incomplete | `BLOCKED_PENDING_EVIDENCE` |
| PreTest | Required roles recorded; no named reviewers assigned | Authoritative PDF/equivalent, owner/version/date, OCR comparison, completeness/numbering, rights, provenance, clinical, assessment-quality, technical, and audit evidence remain incomplete | `BLOCKED_PENDING_EVIDENCE` |

The preparation state is not a statement that any source is `READY_FOR_REVIEW` under the queue interpretation. It records that the required role gates and review scopes have been prepared; execution remains dependent on the applicable evidence packet and owner-governed reviewer appointment or availability. The owner-governed pathway does not itself constitute review completion or source approval.

## 6. Governance controls and non-actions

| Control | Current state |
|---|---|
| Ownership type | `SEG_INTERNAL_ASSET` for the declared artifact scopes |
| Internal review model | `OWNER_GOVERNED_MEDICAL_REVIEW_PATHWAY` |
| External approval dependency for internal medical review | Not assumed; external rights/provenance/source-authority evidence remains required where applicable |
| Source approvals | `APPROVED_SOURCES = NONE` |
| Normalization | `BLOCKED_PENDING_APPROVED_SOURCE` |
| Review decisions | None created by this matrix |
| Named reviewers | None created; all names remain `NOT_SUPPLIED` |
| Source Registry | Approval states unchanged |
| Content Records | Not created |
| Import/activation/publication | Not performed |
| Application/database/schema changes | Not performed |
| Source modification or OCR correction | Not performed |

The next allowed action is to obtain the missing evidence and, after role assignment by an authorized governance participant, conduct independent review using immutable artifact references. No source may progress to normalization from this matrix alone.

## 7. Final matrix state

`SEG_P0_REVIEW_ASSIGNMENT_MATRIX_COMPLETE`

This status confirms preparation of the role-based review matrix only. It does not represent clinical review completion, assessment approval, rights clearance, source approval, normalization readiness, or production authorization.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_INTERNAL_OWNERSHIP_DECLARATION_v1.md "SEG Internal Ownership Declaration v1"

[2]: file:///home/ubuntu/seg-internship-output/SEG_P0_AUTHORITY_EVIDENCE_STATUS_REPORT.md "SEG P0 Authority Evidence Status Report"

[3]: file:///home/ubuntu/seg-internship-output/SEG_P0_CLOSURE_SPRINT_REPORT.md "SEG P0 Closure Sprint Report"

[4]: file:///home/ubuntu/seg-internship-output/SEG_SOURCE_CLOSURE_DECISION_QUEUE.md "SEG Source Closure Decision Queue"

[5]: file:///home/ubuntu/seg-internship-output/SEG_OWNER_REVIEW_AUTHORITY_POLICY.md "SEG Owner Review Authority Policy"

**Document status:** `REVIEW_ASSIGNMENTS_PREPARED_OWNER_GOVERNED_PATHWAY_PENDING_EVIDENCE_AND_REVIEWER_APPOINTMENT`
