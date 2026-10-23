# SEG Internship Decision Owner Signoff Template

**Phase:** 6.10 — Evidence Closure Execution Package  
**Mode:** `READ_ONLY GOVERNANCE PREPARATION`  
**Template state:** `BLANK — NO APPROVAL RECORDED`  
**Author:** Manus AI  
**Template date (UTC):** 2026-08-21T00:00:00Z

## 1. Use and authority boundary

This is a controlled documentation template for a future attributable Decision Owner signoff. Completing or attaching this template does not itself approve clinical content, close rights, select a canonical source, authorize schema revalidation, authorize import, activate content, publish content, or alter the application/database.

No value is pre-filled as an approval. The supplied Phase 7.3 Decision Owner declaration is recorded separately as governance evidence and is not copied here as a completed signoff.[1]

## 2. Decision Owner identity

| Field | Entry |
|---|---|
| Decision Owner full name | `____________________________________________` |
| Organizational role/title | `____________________________________________` |
| Organization | `____________________________________________` |
| Contact or attributable account identifier | `____________________________________________` |
| Delegation evidence, if applicable | `____________________________________________` |
| Conflict-of-interest declaration | `None declared / Declared and recorded in: __________________________` |
| Date of signoff | `____________________` |
| Time and timezone | `____________________` |

## 3. Authority scope

The Decision Owner must state the exact authority being exercised. Unsupported or broader authority must not be inferred.

| Scope item | Authorized scope statement |
|---|---|
| Package | `SEG Internship Doctor Pathway package / other exact scope: __________________________` |
| Source IDs covered | `List exact Source IDs or state NOT_SUPPLIED: _________________________________` |
| Versions covered | `List exact governed versions or state NOT_SUPPLIED: ____________________________` |
| Paths/locators covered | `List exact paths/locators or state NOT_SUPPLIED: ______________________________` |
| SHA-256 linkage | `List manifest/evidence record and verification status: __________________________` |
| Track/taxonomy scope | `SEG Internship Doctor Pathway / 02_Internship / exact branches: _______________` |
| Rights scope | `Internal-only / source-specific / other expressly supported scope: _____________` |
| Clinical/relevant review scope | `Review authority, if any: _________________________________________________` |
| Schema or implementation scope | `Not granted unless separately and expressly authorized: _______________________` |

## 4. Approval statements

For each statement, select one status and attach evidence. A blank or unchecked statement is not approved.

### A. Package acceptance

- [ ] **APPROVE** package acceptance for the exact scope listed above.
- [ ] **REJECT** package acceptance.
- [ ] **DEFER** pending specified evidence.

Conditions, exclusions, and rationale:  
`____________________________________________________________________________`  
`____________________________________________________________________________`

### B. Source ownership and creator authority

- [ ] **CONFIRM** the exact ownership/creator declaration for the listed scope.
- [ ] **DECLINE** confirmation.
- [ ] **DEFER** pending authority evidence.

Conditions and source linkage:  
`____________________________________________________________________________`

### C. Internal-use rights

- [ ] **CONFIRM** SEG-internal handling only for the listed scope.
- [ ] **DECLINE** confirmation.
- [ ] **DEFER** pending rights evidence.

This statement does not grant external redistribution, public display, learner release, commercial use, or third-party rights unless separately and expressly documented.

Rights limitations:  
`____________________________________________________________________________`

### D. `SRC-0078` / `phone-pediatrics-main` lineage namespace

- [ ] **ALIAS/CROSSWALK**: both identifiers refer to the same governed lineage under the stated conditions.
- [ ] **DISTINCT NAMESPACES**: identifiers remain separate under the stated conditions.
- [ ] **DEFER** pending lineage evidence.

Rationale, affected scope, version relationship, and preserved identifiers:  
`____________________________________________________________________________`  
`____________________________________________________________________________`

### E. `DUP-DRUG-001`

- [ ] **CONFIRM** the documented comparison outcome for the exact family scope.
- [ ] **DEFER** pending independent comparison.
- [ ] **DECLINE** the recommendation.

Canonical production selection is not implied by this template. State any non-canonical disposition explicitly:  
`____________________________________________________________________________`

### F. `DUP-EMERGENCY-001`

- [ ] **CONFIRM** the documented comparison outcome for the exact family scope.
- [ ] **DEFER** pending independent comparison.
- [ ] **DECLINE** the recommendation.

Canonical production selection is not implied by this template. State any non-canonical disposition explicitly:  
`____________________________________________________________________________`

### G. Contract confirmation

For each contract, record a separate status and exact version.

| Contract | Confirm / defer / decline | Version or identity | Conditions and evidence link |
|---|---|---|---|
| Clinical Case | `________________` | `________________` | `________________` |
| Skills / Procedures | `________________` | `________________` | `________________` |
| Reference / Book | `________________` | `________________` | `________________` |
| Lesson | `________________` | `________________` | `________________` |
| Question Bank | `________________` | `________________` | `________________` |

Contract confirmation does not activate schema enums or authorize production conversion.

## 5. Evidence and audit attachments

| Required attachment | Supplied location or `NOT_SUPPLIED` |
|---|---|
| Evidence closure register | `____________________________________________` |
| Artifact freeze manifest | `____________________________________________` |
| Source/version evidence | `____________________________________________` |
| Rights evidence | `____________________________________________` |
| Clinical/relevant review record | `____________________________________________` |
| Track/taxonomy review record | `____________________________________________` |
| Duplicate comparison record | `____________________________________________` |
| Lineage namespace record | `____________________________________________` |
| Contract confirmation record | `____________________________________________` |
| Append-only audit event | `____________________________________________` |

## 6. Limitations acknowledged by signatory

The signatory must initial each applicable limitation:

- [ ] `_____` This signoff is limited to the exact scope and evidence listed in this document.
- [ ] `_____` Missing evidence is not treated as closed.
- [ ] `_____` No clinical accuracy approval is implied unless expressly stated and supported by a clinical review record.
- [ ] `_____` No external legal rights, license, copyright clearance, public display permission, or learner-release permission is implied by an internal-use declaration.
- [ ] `_____` No schema conversion, JSON generation, import, activation, publication, or production authorization is implied unless separately and expressly granted.
- [ ] `_____` Original identifiers, paths, versions, and SHA-256 values must be preserved.

## 7. Signature section

| Signatory field | Entry |
|---|---|
| Decision Owner printed name | `____________________________________________` |
| Signature | `____________________________________________` |
| Date | `____________________` |
| Time and timezone | `____________________` |
| Attributable account/audit identity | `____________________________________________` |
| Witness or governance recorder, if required | `____________________________________________` |
| Witness/recorder signature | `____________________________________________` |
| Recorded audit event ID | `____________________________________________` |
| Evidence package hash/manifest reference | `____________________________________________` |

**Status after completion:** `PENDING GOVERNANCE RECORDING — DO NOT TREAT AS APPROVED UNTIL VALIDATED AND LINKED TO AN APPEND-ONLY AUDIT EVENT`.

## References

[1]: `SEG_INTERNSHIP_DECISION_OWNER_AUTHORITY_RECORD.md` "Decision Owner Authority Record"
[2]: `SEG_INTERNSHIP_GOVERNED_RIGHTS_RECORD.md` "Governed Rights Record"
[3]: `SEG_INTERNSHIP_FINAL_EVIDENCE_CLOSURE_REGISTER.md` "Final Evidence Closure Register"

<!-- END OF TEMPLATE -->
