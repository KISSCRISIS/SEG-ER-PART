# SEG P0 Reviewer Action Checklist

**Document ID:** `SEG_P0_REVIEWER_ACTION_CHECKLIST`  
**Mode:** `GOVERNANCE EXECUTION PREPARATION`  
**Scope:** Drug HTML, OSCE Atlas package, and PreTest content artifacts.  
**Current package state:** `BLOCKED_PENDING_EVIDENCE_AND_REVIEWER_ASSIGNMENT`

## 1. Use and control boundary

This checklist prepares owner-governed, independent role-based review execution for the seven required review streams. For the declared `SEG_INTERNAL_ASSET` scopes, the project owner may define the clinical review domains, metadata requirements, acceptance criteria, educational scope, and review sequence. No mandatory external reviewer or external approval dependency is assumed solely to establish or execute the internal medical-review pathway.

The checklist does not appoint a person, create credentials or signatures, perform a clinical judgment, resolve a rights question, approve a source, set `READY_FOR_NORMALIZATION`, or authorize learner exposure. Every role remains `ROLE_REQUIRED — NAME_NOT_ASSIGNED` until the owner-governed process records an attributable appointment or owner-executed review authority with qualification and conflict controls.

Each reviewer or owner-executed review must work from the exact retained artifact or an explicitly versioned equivalent and must record its immutable identifier and SHA-256. Review streams must remain separate. A completed review record is not a source approval unless the independent approval gate is separately satisfied and explicitly recorded.[1] [2] [3]

## 2. Reviewer action checklist

### 2.1 Drug HTML — Emergency Medicine Reviewer

| Checklist field | Required action |
|---|---|
| Review target | Retained UTF-8 Drug HTML; 25,918 bytes; 394 lines; SHA-256 `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac` |
| Required evidence | Exact artifact hash; canonical source identity, version, and locators where available; source/provenance record; current-protocol or authoritative comparison evidence; audit-trail reference |
| Required checks | Assess clinical scope and internal consistency; indications; dose statements; contraindications; clinical context; currency; omissions; ambiguity; conflicts; and exact source/entity locators. Do not correct or rewrite the HTML. |
| Expected output | Completed medical-review record containing reviewer identity, qualification/role, date/time, exact artifact reference/hash, cited locators, findings, conflicts, unresolved issues, disposition, limitations, and linked audit event |
| Completion criteria | All scoped sections/entities are accounted for; findings and conflicts are documented; evidence citations are recorded; reviewer identity and role are attributable; no unresolved critical issue is silently closed; the medical stream is marked complete only by the reviewer/governance record, not by this checklist |
| Current assignment state | `ROLE_REQUIRED — NAME_NOT_ASSIGNED`; execution remains `PENDING_REVIEW` under the owner-governed pathway |

### 2.2 Drug HTML — Pharmacology/Drug Safety Reviewer

| Checklist field | Required action |
|---|---|
| Review target | The same immutable Drug HTML representation and SHA-256 listed above |
| Required evidence | Exact artifact hash; authoritative source/version and locators; drug-safety references supplied through governance; provenance and audit evidence; any separately applicable rights record |
| Required checks | Assess drug identity; dosing statements; interactions; contraindications; safety signals; omissions; ambiguity; conflict points; and the limits of any interaction information represented by the artifact. Treat an observed lack of an interaction table as an artifact observation, not proof that interactions are absent. |
| Expected output | Independent drug-safety review record with reviewer identity, qualification/role, date/time, artifact hash/reference, exact findings and locators, unresolved issues, decision/disposition, limitations, and audit event |
| Completion criteria | Each in-scope drug-safety issue is addressed or explicitly unresolved; source citations are retained; conflicts are documented; no drug fact is added or silently corrected; the reviewer’s record is attributable and independently stored |
| Current assignment state | `ROLE_REQUIRED — NAME_NOT_ASSIGNED`; execution remains `PENDING_REVIEW` under the owner-governed pathway |

### 2.3 OSCE Atlas — Emergency Medicine Reviewer

| Checklist field | Required action |
|---|---|
| Review target | `ATLAS_ASSET_OSCE_VISUAL_001`; recovered package inner SHA-256 `ca5a7f5713bf5101daa839a546633366d7b5b876604bd3dbf7cea2972d59f66e`; outer container SHA-256 `8182d243fc762e29efba5adeda4233042f5e337846b3fbe819fcd374ef948758`; 14 PNG members, station text, and validation notes |
| Required evidence | Exact package/member hashes; authoritative atlas/source identity and version; source-page and image locators; image-to-station lineage; current-protocol evidence; rights/provenance and audit records |
| Required checks | Assess image-to-caption/station correspondence; clinical labeling; educational synthesis; current-protocol alignment; domain-specific accuracy questions; unsafe ambiguity; source-page fidelity; completeness and conflicts across the exact station/image scope |
| Expected output | Medical OSCE review record with reviewer identity, qualification/role, date/time, package/member references and hashes, station/image locators, findings, conflicts, unresolved issues, disposition, limitations, and audit event |
| Completion criteria | All assigned stations/images are accounted for; clinical findings and conflicts are documented; source-page and member lineage are recorded where available; unresolved issues have explicit disposition; no image or station text is modified |
| Current assignment state | `ROLE_REQUIRED — NAME_NOT_ASSIGNED`; execution remains `PENDING_REVIEW` under the owner-governed pathway |

### 2.4 OSCE Atlas — Visual Reviewer

| Checklist field | Required action |
|---|---|
| Review target | All 14 PNG members in the exact recovered OSCE package, with per-file identifiers and hashes |
| Required evidence | Complete 14-member inventory; per-file SHA-256; package hashes; intended display dimensions and surfaces; source/member lineage; prior limited readability notes; audit record |
| Required checks | Assess each image for legibility, labels, annotations, cropping, distortion, reproducibility, contrast, visual defects, source context, and image-to-station correspondence. Verify the two existing readability notes separately and do not generalize them to the other 12 images. Do not modify any image. |
| Expected output | Per-image visual-review record or controlled equivalent listing reviewer identity, qualification/role, date/time, member identifier/hash, findings, unresolved issues, disposition, limitations, and audit event |
| Completion criteria | Every PNG has an explicit review disposition; visual findings are tied to member hashes; conflicts and unreviewable details are retained; no image is altered; visual completion is recorded only by the authorized reviewer/governance record |
| Current assignment state | `ROLE_REQUIRED — NAME_NOT_ASSIGNED`; execution remains `PENDING_REVIEW` under the owner-governed pathway |

### 2.5 OSCE Atlas — Accessibility Reviewer

| Checklist field | Required action |
|---|---|
| Review target | All 14 PNG members, station text, captions/context, and any future learner-facing presentation scope associated with the recovered package |
| Required evidence | Complete image inventory and hashes; station/image locators; display-context evidence; language/localization context; source and rights restrictions; accessibility audit trail |
| Required checks | Assess meaningful alt-text or equivalent description for every image; clinical labeling and station context; captions; responsive legibility; contrast; non-color dependence; semantics; reading order; keyboard and screen-reader behavior in any future surface; language/localization clarity; and retention of source/rights metadata |
| Expected output | Accessibility-review record with reviewer identity, qualification/role, date/time, image/member and text locators, findings, barriers, required equivalent access, unresolved issues, disposition, limitations, and audit event |
| Completion criteria | All 14 images and associated text are accounted for; every accessibility blocker is documented; alt-text requirements are evidenced rather than assumed; no remediation is silently treated as completed; no production alt-text or UI change is generated by this checklist |
| Current assignment state | `ROLE_REQUIRED — NAME_NOT_ASSIGNED`; execution remains `PENDING_REVIEW` under the owner-governed pathway |

### 2.6 PreTest — Emergency Medicine Reviewer

| Checklist field | Required action |
|---|---|
| Review target | `pretestnew_Study_Guide_UTF8.txt`; registry reference `UPD811-007`; 131,490 bytes; 1,349 logical lines; SHA-256 `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166` |
| Required evidence | Authoritative `pretestnew.pdf` or independently verifiable equivalent; immutable source-to-text comparison; source/versioned question locators; OCR reconciliation; clinical references; rights/provenance and audit records |
| Required checks | Assess clinical currency; answer integrity; rationale fidelity; unsafe ambiguity; conflicts; question-level findings; and discrepancies between the retained representation and authoritative source. Review only after OCR/source comparison is available. Do not correct the recovered text. |
| Expected output | Medical PreTest review record with reviewer identity, qualification/role, date/time, exact artifact hash/reference, question/section locators, findings, conflicts, unresolved issues, disposition, limitations, and audit event |
| Completion criteria | All assigned questions/sections are accounted for against the authoritative comparison; clinical findings and OCR-dependent uncertainty are explicit; no answer or rationale is invented; reviewer evidence is attributable and independently recorded |
| Current assignment state | `ROLE_REQUIRED — NAME_NOT_ASSIGNED`; execution remains `PENDING_REVIEW` under the owner-governed pathway |

### 2.7 PreTest — Assessment Quality Reviewer

| Checklist field | Required action |
|---|---|
| Review target | The exact `UPD811-007` retained representation and the authoritative comparison scope when supplied |
| Required evidence | Authoritative source/equivalent; completeness and numbering baseline; exact question locators; answer-key inventory; explanation/rationale inventory; OCR comparison; rights/provenance and audit records |
| Required checks | Assess question completeness; numbering; question/answer pairing; answer-key availability; explanation/rationale availability and linkage; ambiguity; assessment alignment; source-version fidelity; duplication, truncation, or missing-item evidence; and unresolved conflicts. Do not infer missing answer keys or explanations from an incomplete evidence package. |
| Expected output | Assessment-quality review record with reviewer identity, qualification/role, date/time, exact artifact/reference/hash, question locators, findings, completeness and answer/explanation status, conflicts, disposition, limitations, and audit event |
| Completion criteria | The authoritative comparison and completeness baseline are documented; each assigned question/section has an explicit disposition; answer and explanation findings are evidence-based; no question record is created or rewritten; unresolved issues remain visible |
| Current assignment state | `ROLE_REQUIRED — NAME_NOT_ASSIGNED`; execution remains `PENDING_REVIEW` under the owner-governed pathway |

## 3. Common completion checklist

Before a reviewer role is marked complete, the governance record must confirm all of the following:

| Control | Required condition |
|---|---|
| Reviewer identity | Supplied and attributable; no placeholder is accepted as completion |
| Qualification/role | Matches the assigned review stream; credentials are recorded only when supplied by an authorized participant |
| Date/time | Supplied by the reviewer or governance record; never inferred from file or report dates |
| Exact artifact | File/package/member reference and SHA-256 are recorded |
| Version | Canonical source/version is recorded or explicitly remains unresolved |
| Findings | Positive, negative, and unresolved findings are recorded with exact locators |
| Conflicts | Clinical, provenance, rights, track, or interpretation conflicts are preserved and escalated |
| Decision/disposition | Supplied by the reviewer/governance participant; not generated by this checklist |
| Limitations | Scope limitations, unavailable evidence, and unreviewed portions are stated |
| Audit trail | Append-only review event links the review to the artifact and record |

## 4. Current governance controls

| Control | Current state |
|---|---|
| Current review package state | `BLOCKED_PENDING_EVIDENCE_AND_REVIEWER_ASSIGNMENT` |
| Internal review model | `OWNER_GOVERNED_MEDICAL_REVIEW_PATHWAY` |
| External approval dependency for internal medical review | Not assumed; external rights/provenance/source-authority evidence remains required where applicable |
| Source approvals | `APPROVED_SOURCES = NONE` |
| Normalization | `BLOCKED_PENDING_APPROVED_SOURCE` |
| Reviewer names/signatures | Not assigned and not created |
| Source-level decisions | Not created by this checklist |
| Content Records and mappings | Not created |
| Import/activation/publication | Not performed |
| Source Registry | Approval state unchanged |

## 5. Final checklist state

`SEG_P0_REVIEWER_ACTION_CHECKLIST_COMPLETE`

This status confirms that role-specific review actions and completion criteria have been prepared. It does not mean that any role has performed a review or that any source is approved.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_P0_REVIEW_ASSIGNMENT_MATRIX.md "SEG P0 Review Assignment Matrix"

[2]: file:///home/ubuntu/seg-internship-output/SEG_P0_INDEPENDENT_REVIEW_EXECUTION_REPORT.md "SEG P0 Independent Review Execution Report"

[3]: file:///home/ubuntu/seg-internship-output/SEG_INTERNAL_OWNERSHIP_DECLARATION_v1.md "SEG Internal Ownership Declaration v1"

[4]: file:///home/ubuntu/seg-internship-output/SEG_OWNER_REVIEW_AUTHORITY_POLICY.md "SEG Owner Review Authority Policy"

**Document status:** `REVIEWER_ACTIONS_PREPARED_OWNER_GOVERNED_PATHWAY_PENDING_APPOINTMENT_AND_EVIDENCE`
