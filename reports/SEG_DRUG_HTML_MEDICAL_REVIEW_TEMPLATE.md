# SEG Drug HTML Medical Review Template

**Template ID:** `SEG_DRUG_HTML_MEDICAL_REVIEW_TEMPLATE`  
**Mode:** `CONTROLLED REVIEW EXECUTION`  
**Source:** Drug HTML  
**Template state:** `UNCOMPLETED_TEMPLATE`

## 1. Completion instructions

Complete this template only through the owner-governed SEG review pathway by an authorized, attributable reviewer or an owner-executed review authority with recorded qualification and conflict controls. No mandatory external reviewer or external approval dependency is assumed solely because the asset is internal. Do not infer, correct, add, or rewrite source-derived medical content. Enter only findings supported by the exact artifact, the authoritative source/version evidence, and the cited review references. If evidence is unavailable, record `NOT_SUPPLIED`, `NOT_AVAILABLE`, or `UNRESOLVED`; do not convert a missing value into a conclusion.

This record documents one review stream. It is not a source approval, rights clearance, normalization authorization, or production-release decision. A completed review record must be evaluated separately under the SEG P0 approval-gate criteria and must remain source-linked, version-linked, attributable, and auditable.

## 2. Reviewer identity and review record

| Field | Entry |
|---|---|
| Review record ID | `[TO BE COMPLETED BY AUTHORIZED REVIEWER]` |
| Reviewer identity | `[TO BE COMPLETED — NOT SUPPLIED]` |
| Qualification/credentials | `[TO BE COMPLETED — record only when supplied and attributable]` |
| Review role | `[SELECT ONE: Emergency Medicine Reviewer / Pharmacology/Drug Safety Reviewer]` |
| Affiliation or governance appointment reference | `[TO BE COMPLETED OR NOT_SUPPLIED]` |
| Review date/time | `[TO BE COMPLETED — do not infer from file/report dates]` |
| Conflict-of-interest declaration | `[TO BE COMPLETED: disclosed / none declared / unresolved]` |
| Review stream independence | `[TO BE COMPLETED: independent / conflict requiring escalation]` |
| Review authority mode | `[SELECT ONE: owner-appointed reviewer / owner-executed review authority]` |
| Owner-governed authority reference | `[TO BE COMPLETED OR NOT_SUPPLIED]` |

## 3. Reviewed artifact and source evidence

| Field | Entry |
|---|---|
| Asset name | Drug HTML |
| Artifact reference | Retained readable UTF-8 HTML representation |
| Artifact size/structure | 25,918 bytes; 394 lines |
| Artifact SHA-256 | `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac` |
| Local/source locator | `[TO BE COMPLETED OR NOT_SUPPLIED]` |
| Canonical source title | `[TO BE COMPLETED OR NOT_AVAILABLE]` |
| Canonical source owner/publisher | `[TO BE COMPLETED OR NOT_AVAILABLE]` |
| Source version/edition/date | `[TO BE COMPLETED OR NOT_AVAILABLE]` |
| Authoritative comparison reference | `[TO BE COMPLETED OR NOT_AVAILABLE]` |
| Review evidence packet IDs | `[TO BE COMPLETED]` |

The known artifact contains an internal title signal and observed `drugList` entities. These observations must not be treated as canonical source identity, a validated drug reference, or a clinical approval.[1]

## 4. Evidence prerequisites

| Prerequisite | Status before review | Reviewer confirmation/exception |
|---|---|---|
| Exact artifact hash verified | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| Canonical source/version available | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| Source-versioned locators available | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| Provenance and extraction history available | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| Rights/provenance review reference available | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| Current-protocol or authoritative comparison available | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |

## 5. Review checks

Mark each item only after examining the evidence. Use `PASS`, `FAIL`, `UNRESOLVED`, or `NOT_APPLICABLE` with a cited locator and explanation. These are review findings, not source-approval states.

| Check ID | Review check | Result | Exact artifact/source locator | Finding or unresolved issue |
|---|---|---|---|---|
| `DRUG-MED-01` | Clinical scope and context are identifiable | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `DRUG-MED-02` | Indications and intended use are clinically coherent against the authoritative source | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `DRUG-MED-03` | Dose statements are traceable and clinically reviewed | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `DRUG-MED-04` | Contraindications and relevant cautions are traceable | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `DRUG-MED-05` | Currency and version applicability are established | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `DRUG-MED-06` | Drug identity is unambiguous and source-linked | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `DRUG-SAFE-01` | Interaction information is represented and bounded by evidence | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `DRUG-SAFE-02` | Safety signals and high-risk ambiguity are addressed | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `DRUG-SAFE-03` | Omissions or incomplete representations are identified | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `DRUG-SAFE-04` | Conflicts with the authoritative source or current protocol are recorded | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `DRUG-TRACE-01` | Every finding has an exact artifact and source locator | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |

## 6. Detailed findings

| Finding ID | Location | Finding type | Evidence/observation | Clinical or safety significance | Conflict/unresolved issue | Reviewer disposition |
|---|---|---|---|---|---|---|
| `[ID]` | `[artifact/source locator]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `[ID]` | `[artifact/source locator]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |

Add rows as needed without changing the source artifact. Preserve negative findings, uncertainty, and conflicts rather than silently resolving them.

## 7. Review decision/disposition

| Field | Entry |
|---|---|
| Review outcome | `[SELECT ONE: REVIEW_IN_PROGRESS / REVIEW_BLOCKED_PENDING_EVIDENCE / REVIEW_COMPLETE]` |
| Reviewer decision/disposition | `[TO BE COMPLETED BY AUTHORIZED REVIEWER]` |
| Critical unresolved issues | `[TO BE COMPLETED OR NONE IDENTIFIED]` |
| Required follow-up evidence | `[TO BE COMPLETED]` |
| Review pathway | `OWNER_GOVERNED_MEDICAL_REVIEW_PATHWAY` |
| External approval dependency for internal medical review | `NOT_ASSUMED` |
| Source approval granted by this record | `NO — this template cannot grant source approval` |
| `READY_FOR_NORMALIZATION` set by this record | `NO` |

`REVIEW_COMPLETE` may be selected only when the reviewer has documented complete scope, evidence, findings, conflicts, limitations, and disposition. It does not itself set the source to approved.

## 8. Limitations

| Limitation category | Entry |
|---|---|
| Unreviewed artifact sections/entities | `[TO BE COMPLETED OR NONE]` |
| Missing source/version evidence | `[TO BE COMPLETED]` |
| Missing rights/provenance evidence | `[TO BE COMPLETED]` |
| Missing current-protocol or comparison evidence | `[TO BE COMPLETED]` |
| Technical or rendering limitations | `[TO BE COMPLETED OR NONE]` |
| Other limitations | `[TO BE COMPLETED OR NONE]` |

## 9. Audit and authorization record

| Field | Entry |
|---|---|
| Append-only audit event ID | `[TO BE COMPLETED]` |
| Linked artifact hash | `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac` |
| Review event date/time | `[TO BE COMPLETED]` |
| Decision record reference | `[TO BE COMPLETED]` |
| Signature/equivalent authorization | `[TO BE COMPLETED BY AUTHORIZED GOVERNANCE PARTICIPANT — NOT CREATED HERE]` |

## 10. Governance controls

| Control | Required value |
|---|---|
| Source approval | `APPROVED_SOURCES = NONE` unless a separate approval record later changes it |
| Normalization | `BLOCKED_PENDING_APPROVED_SOURCE` |
| Content modification | `false` |
| Clinical correctness certified by this template | `false` |
| Rights clearance granted by this template | `false` |
| Import/activation/publication | `false` |

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_DRUG_HTML_AUTHORITY_EVIDENCE_RECORD.md "SEG Drug HTML Authority Evidence Record"

[2]: file:///home/ubuntu/seg-internship-output/SEG_P0_REVIEWER_ACTION_CHECKLIST.md "SEG P0 Reviewer Action Checklist"

[3]: file:///home/ubuntu/seg-internship-output/SEG_P0_INDEPENDENT_REVIEW_EXECUTION_REPORT.md "SEG P0 Independent Review Execution Report"

[4]: file:///home/ubuntu/seg-internship-output/SEG_OWNER_REVIEW_AUTHORITY_POLICY.md "SEG Owner Review Authority Policy"

**Template status:** `TEMPLATE_READY_OWNER_GOVERNED_PATHWAY_PENDING_AUTHORIZED_REVIEW`
