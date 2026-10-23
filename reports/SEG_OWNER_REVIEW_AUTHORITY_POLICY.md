# SEG Owner Review Authority Policy

**Document ID:** `SEG_OWNER_REVIEW_AUTHORITY_POLICY`  
**Version:** `v1`  
**Project:** Smart Emergency Guide (SEG)  
**Governance context:** SEG Content Governance Framework  
**Mode:** `CONTROLLED GOVERNANCE UPDATE`

## 1. Purpose

This policy defines the owner-governed medical review pathway for SEG artifacts explicitly classified as `SEG_INTERNAL_ASSET`. It recognizes the project owner’s authority to define the review boundary for internally managed educational assets without creating a source approval, clinical validation result, rights clearance, normalization authorization, or production-release decision.

The policy applies only to the artifact scopes declared in `SEG_INTERNAL_OWNERSHIP_DECLARATION_v1.md`. It does not extend automatically to unrelated files, future versions, external sources, or third-party material incorporated into a retained artifact.[1]

## 2. Declared authority

| Field | Recorded value |
|---|---|
| Content/medical authority | Dr. Alaa Al-Asfar |
| Role | SEG Medical Content Owner; Emergency Medicine Physician; Project Lead |
| Authority basis | Explicit project-owner declaration recorded for this controlled governance update and the completed SEG internal ownership declaration |
| Authority scope | Definition and governance of the medical-review boundary for declared SEG-internal educational assets |
| Current source approval | `APPROVED_SOURCES = NONE` |
| Current normalization state | `BLOCKED_PENDING_APPROVED_SOURCE` |

The authority recorded here is an internal governance authority for the declared SEG educational scope. It is not an external copyright opinion, a substitute for evidence about third-party rights, or a blanket statement that all retained content is clinically correct or production-ready.

## 3. Owner-governed medical review pathway

For a declared `SEG_INTERNAL_ASSET`, the project owner may establish and govern the internal medical-review pathway. There is **no mandatory external reviewer dependency assumed solely to establish the internal review pathway**. The owner may define the required review domains, evidence packet, metadata contract, content acceptance criteria, and educational-use scope for the declared asset.

Where a source-specific review is performed by the owner or by a reviewer appointed through the owner-governed process, the review must remain attributable and source-linked. The review record must identify the reviewer, qualification/role, date/time, exact artifact and hash, evidence references, findings, conflicts, unresolved issues, disposition, limitations, and append-only audit event. A policy statement or owner authority declaration does not count as completion of a source-specific review.

The owner-governed pathway replaces an assumed external **approval dependency** for internal medical-review governance; it does not eliminate the need for role-appropriate review, independent evidence, rights/provenance assessment, technical controls, or explicit source-level approval. Where an external source, publisher, copyright owner, original custodian, current guideline, or third-party material is relevant, the required external evidence or rights assessment remains a separate gate.

## 4. Authority the owner may exercise

### 4.1 Clinical review domains

The owner may define which clinical review domains apply to each declared internal asset, identify the required role or qualification for each domain, and define the evidence and locator requirements. The owner may also set a bounded review sequence and record unresolved clinical questions for later resolution.

### 4.2 Metadata requirements

The owner may define the metadata required for controlled educational management, including content/artifact ID, source and version, immutable hash, track, taxonomy, intended audience, usage scope, provenance locator, review state, rights state, and audit linkage. Missing metadata must remain `NOT_SUPPLIED`, `NOT_AVAILABLE`, or `UNRESOLVED`; the owner authority does not permit values to be inferred.

### 4.3 Content acceptance criteria

The owner may define acceptance criteria for educational development and controlled medical review, including clinical scope, completeness, currency, safety documentation, source fidelity, ambiguity handling, educational suitability, and resolution of critical findings. Acceptance criteria are requirements for a future decision record; defining them does not constitute acceptance or source approval.

### 4.4 Educational usage scope

The owner may define the intended audience, permitted educational purpose, and controlled access scope for the declared asset. The current scope is:

| Usage field | Current policy value |
|---|---|
| Intended audience | Healthcare professionals and medical learners |
| Purpose | Educational and professional training |
| Access | Controlled project access |
| Public distribution | Not authorized by this policy |
| Learner-facing production release | Not authorized by this policy |
| External redistribution | Not authorized by this policy |

An educational-use definition does not clear copyright, image, table, question, PDF, or other third-party rights.

## 5. Required review model by P0 source

The following domains remain required for the current P0 internal assets. They are owner-governed review requirements, not completed reviews.

| Source | Required owner-governed review domains | Current state |
|---|---|---|
| Drug HTML | Emergency Medicine clinical validation; Pharmacology/Drug Safety validation; metadata validation | `PENDING_REVIEW` |
| OSCE Atlas | Clinical educational validation; Visual validation; Accessibility validation | `PENDING_REVIEW` |
| PreTest | Question quality validation; Answer/explanation validation; metadata validation | `PENDING_REVIEW` |

Additional applicable gates remain mandatory: rights and provenance, version tracking, audit lineage, technical/HTML review for Drug HTML, package and image-lineage review for OSCE Atlas, and OCR/source-comparison and technical review for PreTest.

The owner-governed medical pathway does not merge the review streams. Visual, accessibility, technical, rights, provenance, assessment-quality, and metadata findings must remain separately recorded where applicable.

## 6. Required evidence and review-record controls

Every source-specific review event must use the exact retained artifact or an explicitly versioned equivalent. At minimum, the record must contain:

| Required field | Control |
|---|---|
| Reviewer identity | Attributable identity supplied by the owner-governed process; never inferred |
| Qualification/role | Role appropriate to the review domain; credentials recorded only when supplied |
| Review date/time | Supplied event date/time; not inferred from file dates |
| Artifact reference/hash | Exact file/package/member and SHA-256 where available |
| Source/version | Canonical source/version if established; otherwise unresolved status is preserved |
| Review scope | Explicit domains, sections, stations, images, questions, or metadata fields examined |
| Findings and locators | Positive, negative, and unresolved findings tied to exact locations |
| Safety documentation | Medication, clinical-risk, ambiguity, OCR, image, accessibility, and other applicable safety concerns recorded |
| Conflicts | Conflicts of interest, source conflicts, protocol conflicts, and unresolved claims preserved |
| Decision/disposition | Explicitly supplied by the authorized reviewer/governance record; not implied by the policy |
| Limitations | Unreviewed scope and unavailable evidence stated |
| Audit event | Append-only event linked to artifact, version, review, and disposition |

## 7. Boundaries that owner authority does not bypass

Owner authority does not bypass or waive the following controls:

1. **Audit trail.** Ownership, version, verification, review, finding, disposition, and approval events must remain append-only and attributable.
2. **Version tracking.** Each reviewed artifact/version must have an immutable reference and hash; future versions require separate identity, change history, and review treatment.
3. **Change history.** The retained source is preserved. Corrections, transformations, OCR repair, replacement, merge, or derived artifacts require a separately authorized and traceable change record.
4. **Safety documentation.** Drug safety, clinical risk, ambiguity, OCR/extraction, image interpretation, accessibility, and educational-suitability risks must be documented and resolved or explicitly dispositioned.
5. **Rights and provenance.** Internal classification does not clear third-party text, images, tables, questions, PDFs, source pages, or other material. Rights and source lineage remain separate gates.
6. **Professional-track separation.** The owner may define track and taxonomy requirements, but no track may be inferred from filenames, topics, or audience alone.
7. **Explicit source-level approval.** A review, acceptance criterion, owner declaration, or policy cannot substitute for a separate approval decision with scope, evidence, limitations, date, and attributable authority.
8. **Implementation and release gates.** Owner-governed review does not authorize normalization, Content Record creation, database or schema changes, import, application integration, activation, publication, or learner-facing release.

## 8. P0 pathway state after this policy

| Source | Ownership | Owner-governed review pathway | Source-level approval | Normalization |
|---|---|---|---|---|
| Drug HTML | `SEG_INTERNAL_ASSET` | Defined; execution pending required evidence and attributable review records | Not granted | `BLOCKED_PENDING_APPROVED_SOURCE` |
| OSCE Atlas | `SEG_INTERNAL_ASSET` | Defined; execution pending required evidence and attributable review records | Not granted | `BLOCKED_PENDING_APPROVED_SOURCE` |
| PreTest | `SEG_INTERNAL_ASSET` | Defined; execution pending required evidence and attributable review records | Not granted | `BLOCKED_PENDING_APPROVED_SOURCE` |

This policy changes the governance **model** for internal review; it does not change the evidence state, approval state, Queue state, Source Registry, or readiness decision of any P0 source.

## 9. Required next action

The next allowed action is to assemble the owner-governed evidence packets, record any authorized reviewer appointment or owner-executed review event, and complete the applicable review domains against exact immutable artifacts. Each finding and disposition must be added to the audit trail. The policy itself creates no review event and no approval.

## 10. Governance controls and non-actions

| Control | Current state |
|---|---|
| Internal review model | `OWNER_GOVERNED_MEDICAL_REVIEW_PATHWAY` |
| External approval dependency for internal pathway | Not assumed |
| External rights/provenance evidence | Still required where third-party material or source authority is relevant |
| Source approvals | `APPROVED_SOURCES = NONE` |
| Normalization | `BLOCKED_PENDING_APPROVED_SOURCE` |
| Audit trail | Required and not bypassed |
| Version tracking | Required and not bypassed |
| Change history | Required and not bypassed |
| Safety documentation | Required and not bypassed |
| Source Registry | Unchanged |
| Import/activation/publication | Not authorized |
| Database/application/schema changes | Not authorized |

## 11. Final policy status

`SEG_OWNER_REVIEW_AUTHORITY_POLICY_COMPLETE`

This status confirms documentation of the owner-governed medical review pathway. It does not certify clinical correctness, complete a review, grant rights, approve a source, authorize normalization, or authorize production release.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_INTERNAL_OWNERSHIP_DECLARATION_v1.md "SEG Internal Ownership Declaration v1"

[2]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DECISION_OWNER_APPROVAL.md "SEG Internship Decision Owner Approval"

[3]: file:///home/ubuntu/seg-internship-output/SEG_P0_REVIEW_ASSIGNMENT_MATRIX.md "SEG P0 Review Assignment Matrix"

[4]: file:///home/ubuntu/seg-internship-output/SEG_P0_APPROVAL_GATE_CRITERIA.md "SEG P0 Approval Gate Criteria"

[5]: file:///home/ubuntu/seg-internship-output/SEG_P0_AUDIT_TRAIL_REGISTER.md "SEG P0 Audit Trail Register"

**Document status:** `OWNER_GOVERNED_REVIEW_PATHWAY_DOCUMENTED_PENDING_EXECUTION`
