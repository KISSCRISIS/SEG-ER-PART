# SEG Internship Medical and Rights Review Package

**Phase:** 6.10 — Evidence Closure Execution Package  
**Mode:** `READ_ONLY GOVERNANCE PREPARATION`  
**Package state:** `REVIEW_TEMPLATE_READY — NO CLINICAL OR RIGHTS DECISION RECORDED`  
**Author:** Manus AI  
**Prepared at (UTC):** 2026-08-21T00:00:00Z

## 1. Purpose and separation of review streams

This package prepares two separate evidence streams for the SEG Internship Doctor Pathway: **clinical/relevant review** and **rights review**. It does not perform either review, invent a reviewer, grant a license, approve content, or authorize learner display, import, activation, publication, or schema work.

The review streams must remain independent. Clinical correctness does not establish rights, and an internal-use rights declaration does not establish clinical accuracy. Every completed checklist must be attributable to a named authority, tied to exact source IDs/versions/paths/SHA-256 values, dated, and linked to an append-only audit event.

## 2. Review scope register

| Domain | Candidate scope | Current state | Required review output |
|---|---|---|---|
| Lesson | Lesson candidates under `02_Internship`, including rotation, guide, drug, and roadmap candidates | Pending metadata/review or blocked | Clinical/relevant review record, track/taxonomy decision, source/version evidence, rights linkage |
| Question Bank | Assessment and JMC candidates, including the `SRC-0078` lineage candidate | Blocked pending review | Question-level or source-level review record, lineage/namespace decision where applicable, rights and audit linkage |
| Clinical Case | Base and `v2_Pack` emergency-case families under `DUP-EMERGENCY-001` | Duplicate comparison and review open | Independent comparison record, clinical review record, contract confirmation, rights linkage |
| Skills / Procedures | Clinical Skills, Logbook, and OSCE candidates | Contract/competency and review open | Competency-boundary confirmation, clinical/relevant review, track/taxonomy mapping, rights linkage |
| Reference / Book | Internship book PDF candidates | Rights and review open | Source-specific rights record, display scope decision, clinical/relevant review, contract confirmation |

## 3. Clinical/relevant review checklist

The reviewer must complete the following for each exact artifact or declared review unit. A reviewer must not fill a missing medical fact from assumption; unresolved issues must be recorded and returned to governance.

### 3.1 Artifact identity and reviewer attribution

| Field | Entry |
|---|---|
| Source ID(s) | `____________________________________________` |
| Preserved path(s) | `____________________________________________` |
| Governed version(s) | `____________________________________________` |
| SHA-256 value(s) | `____________________________________________` |
| Candidate domain | `Lesson / Question Bank / Clinical Case / Skills / Reference / NOT_SUPPLIED` |
| Intended professional track | `____________________________________________` |
| Intended audience and level | `____________________________________________` |
| Reviewer name and attributable role | `____________________________________________` |
| Reviewer qualification/evidence | `____________________________________________` |
| Review date/time/timezone | `____________________________________________` |
| Conflict-of-interest statement | `____________________________________________` |

### 3.2 Content accuracy

- [ ] The reviewer verified that the reviewed material is the exact preserved source identified above.
- [ ] Claims, terminology, calculations, explanations, and answer keys were reviewed within the reviewer’s authority.
- [ ] Any clinically uncertain, outdated, contradictory, or unsupported statement is listed with an exact location.
- [ ] Missing information was not invented during review.
- [ ] The reviewer recorded whether the content is suitable for the stated professional level, subject to governance approval.

Evidence notes and exact locations:  
`____________________________________________________________________________`  
`____________________________________________________________________________`

### 3.3 Scope

- [ ] Domain boundary is appropriate for the candidate entity.
- [ ] Professional-track boundary is explicit and does not rely only on filename or folder.
- [ ] Audience, level, pathway, module, and branch are supported by content evidence or marked unresolved.
- [ ] Content does not silently mix Internship Doctor material with Resident, Student, EMS, Nursing, GP, Shared Core, or other tracks.
- [ ] Cross-references and dependencies are listed.

Scope findings:  
`____________________________________________________________________________`

### 3.4 Safety concerns

- [ ] Potentially unsafe, ambiguous, or misleading statements were specifically assessed.
- [ ] Emergency actions, warnings, contraindications, doses, calculations, and escalation language, where present, were reviewed by an appropriately qualified reviewer.
- [ ] Any safety concern is recorded with source location and disposition.
- [ ] No unresolved safety issue is treated as approved or publishable.

Safety findings and required escalation:  
`____________________________________________________________________________`  
`____________________________________________________________________________`

### 3.5 Review decision

Select one and provide evidence. This is a review recommendation, not activation.

- [ ] `ACCEPTABLE_FOR_GOVERNED_REVIEW` — no unresolved blocking issue identified within scope.
- [ ] `CONDITIONAL_REVIEW` — specified corrections/evidence are required before approval.
- [ ] `BLOCKED` — material clinical, scope, safety, or provenance issue prevents progression.
- [ ] `NOT_REVIEWED` — reviewer authority or required evidence was unavailable.

Decision rationale:  
`____________________________________________________________________________`  
`____________________________________________________________________________`

Clinical reviewer signature: `____________________________________________`  
Clinical/relevant review record ID: `_______________________________________`

## 4. Rights checklist

The rights reviewer must assess each exact artifact and each relevant asset category. The supplied Decision Owner declaration supports SEG-internal handling only and must not be expanded into external rights.[1]

### 4.1 Rights authority and scope

| Field | Entry |
|---|---|
| Source ID(s) / asset ID(s) | `____________________________________________` |
| Preserved path(s) | `____________________________________________` |
| Version(s) and SHA-256 | `____________________________________________` |
| Rights reviewer name and role | `____________________________________________` |
| Rights authority/evidence basis | `____________________________________________` |
| Review date/time/timezone | `____________________________________________` |
| Scope requested | `Internal handling / learner display / public display / other: ______________` |

### 4.2 Text

- [ ] Owner/publisher is identified or explicitly `NOT_SUPPLIED`.
- [ ] License, permission, source agreement, or other rights evidence is attached or marked missing.
- [ ] Permitted internal use is recorded with exact scope.
- [ ] Copying, excerpting, translation, transformation, and derivative-use limits are recorded.
- [ ] Attribution/copyright notice requirements are recorded.
- [ ] Any restricted text is excluded from display or held pending authority.

Status: `CLOSED / PARTIAL / OPEN / NOT_SUPPLIED`  
Evidence and restrictions:  
`____________________________________________________________________________`

### 4.3 Images

- [ ] Every image/visual asset has an attributable rights record or is marked `NOT_SUPPLIED`.
- [ ] Asset provenance, creator/owner, license, and permitted use are recorded.
- [ ] Derivative, crop, translation, annotation, and display restrictions are recorded.
- [ ] Unresolved images are excluded from learner/public display.

Status: `CLOSED / PARTIAL / OPEN / NOT_SUPPLIED`  
Evidence and restrictions:  
`____________________________________________________________________________`

### 4.4 Questions

- [ ] Question text and answer/explanation rights are assessed separately where needed.
- [ ] Source owner, publisher, license/permission, attribution, and derivative-use terms are recorded.
- [ ] Any source-local or third-party restriction is preserved.
- [ ] No question is imported or displayed solely because it is present in a source package.

Status: `CLOSED / PARTIAL / OPEN / NOT_SUPPLIED`  
Evidence and restrictions:  
`____________________________________________________________________________`

### 4.5 References

- [ ] Reference/book title, author/creator, publisher, edition/version, and exact source locator are recorded.
- [ ] Copyright/license/permission evidence is attached or marked missing.
- [ ] Excerpt, reproduction, transformation, and display scope are explicitly decided.
- [ ] Any PDF or book with unresolved rights remains excluded from learner/public display.

Status: `CLOSED / PARTIAL / OPEN / NOT_SUPPLIED`  
Evidence and restrictions:  
`____________________________________________________________________________`

### 4.6 Display permission

- [ ] Internal governance handling scope is distinguished from learner-facing display.
- [ ] Audience, territory, duration, channel, and access restrictions are documented.
- [ ] Public display, external redistribution, and commercial use are not inferred.
- [ ] Display permission is attributable to the competent authority and linked to the exact artifact scope.

Status: `CLOSED / PARTIAL / OPEN / NOT_SUPPLIED`  
Permitted audience/channel and restrictions:  
`____________________________________________________________________________`

### 4.7 Rights review decision

Select one and provide evidence. This is a rights-review outcome, not publication authorization.

- [ ] `INTERNAL_HANDLING_ONLY — FORMAL_RIGHTS_OPEN`
- [ ] `CONDITIONAL — SPECIFIED RIGHTS EVIDENCE REQUIRED`
- [ ] `RIGHTS_CLOSED_FOR_EXACT_SCOPE`
- [ ] `BLOCKED — RIGHTS NOT SUPPLIED`

Decision rationale:  
`____________________________________________________________________________`  
`____________________________________________________________________________`

Rights reviewer signature: `____________________________________________`  
Rights review record ID: `_______________________________________________`

## 5. Required separation and escalation rules

A clinical/relevant reviewer must not close rights. A rights reviewer must not approve clinical accuracy. A governance coordinator must not infer either decision from a blank, filename, folder, README, internal declaration, or prior design recommendation. Any disagreement, missing authority, conflict, or unresolved safety/rights issue must remain `OPEN` or `BLOCKED` and be escalated through the Decision Owner process.

## 6. Protected non-actions

This package does not generate JSON, convert schemas, import content, modify the database/application, activate or publish content, select canonical sources, or change original files. It does not replace clinical governance or legal review.

## References

[1]: `SEG_INTERNSHIP_GOVERNED_RIGHTS_RECORD.md` "Governed Rights Record"
[2]: `SEG_INTERNSHIP_REVIEW_ASSIGNMENT_MATRIX.md` "Review Assignment Matrix"
[3]: `SEG_INTERNSHIP_FINAL_EVIDENCE_CLOSURE_REGISTER.md` "Final Evidence Closure Register"
[4]: `SEG_INTERNSHIP_REVALIDATION_ARTIFACT_MANIFEST.md` "Controlled Revalidation Artifact Manifest"

<!-- END OF PACKAGE -->
