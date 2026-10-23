# SEG OSCE Atlas Medical Review Template

**Template ID:** `SEG_OSCE_ATLAS_MEDICAL_REVIEW_TEMPLATE`  
**Mode:** `CONTROLLED REVIEW EXECUTION`  
**Source:** OSCE Atlas package  
**Target asset ID:** `ATLAS_ASSET_OSCE_VISUAL_001`  
**Template state:** `UNCOMPLETED_TEMPLATE`

## 1. Completion instructions

Complete this template through the owner-governed SEG review pathway by an authorized, attributable Emergency Medicine/OSCE reviewer or an owner-executed review authority with recorded qualification and conflict controls. No mandatory external reviewer or external approval dependency is assumed solely because the asset is internal. Do not infer, correct, rewrite, relabel, or replace source-derived medical content or images. Record only evidence supported by the exact package, its members, the authoritative source/version evidence, and cited review references. If evidence is unavailable, record `NOT_SUPPLIED`, `NOT_AVAILABLE`, or `UNRESOLVED`.

This template covers the medical review stream only. Visual, accessibility, rights, provenance, technical, and source-version reviews remain separate governance streams. A completed medical review is not a source approval and does not authorize normalization, integration, or learner-facing publication.

## 2. Reviewer identity and review record

| Field | Entry |
|---|---|
| Review record ID | `[TO BE COMPLETED BY AUTHORIZED REVIEWER]` |
| Reviewer identity | `[TO BE COMPLETED — NOT SUPPLIED]` |
| Qualification/credentials | `[TO BE COMPLETED — record only when supplied and attributable]` |
| Qualification/role | `[TO BE COMPLETED — Emergency Medicine/OSCE medical reviewer]` |
| Affiliation or governance appointment reference | `[TO BE COMPLETED OR NOT_SUPPLIED]` |
| Review date/time | `[TO BE COMPLETED — do not infer from package/report dates]` |
| Conflict-of-interest declaration | `[TO BE COMPLETED: disclosed / none declared / unresolved]` |
| Review stream independence | `[TO BE COMPLETED: independent / conflict requiring escalation]` |
| Review authority mode | `[SELECT ONE: owner-appointed reviewer / owner-executed review authority]` |
| Owner-governed authority reference | `[TO BE COMPLETED OR NOT_SUPPLIED]` |

## 3. Reviewed package and source evidence

| Field | Entry |
|---|---|
| Asset name | OSCE Atlas package |
| Target asset ID | `ATLAS_ASSET_OSCE_VISUAL_001` |
| Inner package reference | `OSCE_Emergency_Medicine_Imaging_Section_Package.zip` |
| Inner package SHA-256 | `ca5a7f5713bf5101daa839a546633366d7b5b876604bd3dbf7cea2972d59f66e` |
| Outer recovery-container SHA-256 | `8182d243fc762e29efba5adeda4233042f5e337846b3fbe819fcd374ef948758` |
| Package composition | 14 PNG members, one UTF-8 station-text file, one visual-validation notes file |
| Canonical source title | `[TO BE COMPLETED OR NOT_AVAILABLE]` |
| Canonical source owner/publisher | `[TO BE COMPLETED OR NOT_AVAILABLE]` |
| Source version/edition/date | `[TO BE COMPLETED OR NOT_AVAILABLE]` |
| Original source locator | `[TO BE COMPLETED OR NOT_AVAILABLE]` |
| Review evidence packet IDs | `[TO BE COMPLETED]` |

The station text refers to `CopyofEmergency-Medicine-FULL.pdf`. This is an artifact-level statement and must not be treated as independent proof of source identity, ownership, rights, completeness, or clinical approval.[1]

## 4. Evidence prerequisites

| Prerequisite | Status before review | Reviewer confirmation/exception |
|---|---|---|
| Exact package and member hashes verified | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| Authoritative source/version available | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| Source-page and image/member locators available | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| Image-to-source and image-to-station lineage available | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| Rights/provenance evidence available | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| Current-protocol comparison evidence available | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| Visual/accessibility review references available | `[TO BE COMPLETED OR NOT_APPLICABLE_TO_THIS_STREAM]` | `[TO BE COMPLETED]` |

## 5. Medical review checks

Mark each item only after examining the evidence. Use `PASS`, `FAIL`, `UNRESOLVED`, or `NOT_APPLICABLE` with a cited package/member/station/source locator and explanation. These are medical-review findings, not source-approval states.

| Check ID | Review check | Result | Exact package/member/station/source locator | Finding or unresolved issue |
|---|---|---|---|---|
| `OSCE-MED-01` | Image-to-station and image-to-caption correspondence is supported | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `OSCE-MED-02` | Clinical labels and visible features are accurately represented | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `OSCE-MED-03` | Station explanation or educational synthesis is clinically coherent | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `OSCE-MED-04` | Clinical currency and current-protocol alignment are assessed | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `OSCE-MED-05` | Unsafe ambiguity or clinically misleading presentation is identified | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `OSCE-MED-06` | Source-page fidelity and image-to-source lineage are documented | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `OSCE-MED-07` | Completeness of the assigned station/image scope is addressed | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `OSCE-MED-08` | Clinical conflicts and unresolved claims are recorded | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `OSCE-MED-09` | Intended learner level and educational suitability are assessed | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |

## 6. Domain coverage

Record the domains actually examined. Do not mark a domain complete merely because it appears in a filename or station label.

| Domain | Examined? | Locators | Findings or limitation |
|---|---|---|---|
| Cardiology and ECG/conduction disorders | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| Infectious disease/endocarditis | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| Heart failure, shock, and valvular disease | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| Emergency radiology/image interpretation | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| Orthopedics and pediatric orthopedics | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| Acute abdominal, hepatobiliary, and pancreatic presentations | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| Other explicitly evidenced domain | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |

## 7. Per-member review log

Use one row for each of the 14 PNG members. Preserve the supplied filename and hash. The medical reviewer must not alter the image or generate a replacement label in this record.

| # | PNG member | Member SHA-256 | Station/source locator | Clinical labeling result | Medical finding or unresolved issue | Disposition |
|---:|---|---|---|---|---|---|
| 1 | `images/013_endocarditis.png` | `4753109413d1dbb1f58a903a1198088911ad53d6b862f04525add2c9d84f31e0` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| 2 | `images/016_first_degree_heart_block.png` | `44a62488089329ea2b58f60388678e6aa3bd46dc13f25d6b2ccbf949291c7d9d` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| 3 | `images/017_mobitz_one_wenckebach.png` | `21594b37fe0542f5249675c302d9932adc80f3cc8a2ca598cf5f975675494db8` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| 4 | `images/051_acute_decompensated_heart_failure.png` | `71e025d003e429013b4fe330865e190ec7dff61cdc30b20e432d0e6a492ec09e` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| 5 | `images/056_cardiogenic_shock.png` | `4a9a06c1c628da1eefcde749853b28dc5a0f4a42ff3f298f174266e3547ae4ac` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| 6 | `images/066_aortic_stenosis.png` | `a80253ff0a264462c20de2bdc5c3d7690099c0406949516d5334c0951b26d60a` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| 7 | `images/094_radial_head_fracture.png` | `4f061d72fd121c6f82cc084e352d48390f904cf55f15d3afeb89ecb282dc5e20` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| 8 | `images/096_nursemaid_elbow.png` | `b12211de56ab3f258435e6784a3d9284ee1f1093540dae6db51a519d02747562` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| 9 | `images/142_acute_cholecystitis.png` | `f8049bcbce5ef52525c42fae5833a78bb0793892fda93ce7f2dfc859e1973612` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| 10 | `images/149_acute_pancreatitis.png` | `8d9588224aee7d642161bc08214e0a9f15e6c01dbf3572d47e5f94125c6fed9c` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| 11 | `images/159_acute_cholangitis.png` | `35bad441ee7cda733a02d9ada029b5c500c3e196c20808d35263d29dcd209629` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| 12 | `images/190_intussusception.png` | `6d3533432c4bbc92dc04fc045a587a8e3d311d86b5f68096778445648b251beb` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| 13 | `images/192_small_bowel_obstruction.png` | `3b8dd6ac93da6f03979d55d2a57211cc5f25d24c288448b0909fc3a01ebb4b7c` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| 14 | `images/193_large_bowel_obstruction.png` | `1c3b4a7e67887147272d7957bdb82acb7f970cdee300b1dc3200accb8547e9b3` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |

## 8. Findings and conflicts

| Finding ID | Package/member/station locator | Finding type | Evidence/observation | Clinical significance | Conflict/unresolved issue | Reviewer disposition |
|---|---|---|---|---|---|---|
| `[ID]` | `[exact locator]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |
| `[ID]` | `[exact locator]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` | `[TO BE COMPLETED]` |

Preserve negative findings and uncertainty. Do not silently resolve a source-page, image-label, or protocol conflict.

## 9. Medical review decision/disposition

| Field | Entry |
|---|---|
| Review outcome | `[SELECT ONE: REVIEW_IN_PROGRESS / REVIEW_BLOCKED_PENDING_EVIDENCE / REVIEW_COMPLETE]` |
| Reviewer decision/disposition | `[TO BE COMPLETED BY AUTHORIZED REVIEWER]` |
| Critical unresolved issues | `[TO BE COMPLETED OR NONE IDENTIFIED]` |
| Required follow-up evidence | `[TO BE COMPLETED]` |
| Coordination with Visual Reviewer | `[TO BE COMPLETED OR NOT_YET_RECORDED]` |
| Coordination with Accessibility Reviewer | `[TO BE COMPLETED OR NOT_YET_RECORDED]` |
| Review pathway | `OWNER_GOVERNED_MEDICAL_REVIEW_PATHWAY` |
| External approval dependency for internal medical review | `NOT_ASSUMED` |
| Source approval granted by this record | `NO — this template cannot grant source approval` |
| `READY_FOR_NORMALIZATION` set by this record | `NO` |

`REVIEW_COMPLETE` may be selected only when the assigned clinical scope, evidence, findings, conflicts, limitations, and disposition are fully documented. It does not itself approve the source.

## 10. Limitations

| Limitation category | Entry |
|---|---|
| Unreviewed PNGs/stations/domains | `[TO BE COMPLETED OR NONE]` |
| Missing source/version/locator evidence | `[TO BE COMPLETED]` |
| Missing image-to-source lineage | `[TO BE COMPLETED]` |
| Missing rights/provenance evidence | `[TO BE COMPLETED]` |
| Missing current-protocol evidence | `[TO BE COMPLETED]` |
| Visual or accessibility scope not covered by this medical review | `[TO BE COMPLETED]` |
| Other limitations | `[TO BE COMPLETED OR NONE]` |

## 11. Audit and authorization record

| Field | Entry |
|---|---|
| Append-only audit event ID | `[TO BE COMPLETED]` |
| Linked package hash | `ca5a7f5713bf5101daa839a546633366d7b5b876604bd3dbf7cea2972d59f66e` |
| Linked outer container hash | `8182d243fc762e29efba5adeda4233042f5e337846b3fbe819fcd374ef948758` |
| Review event date/time | `[TO BE COMPLETED]` |
| Decision record reference | `[TO BE COMPLETED]` |
| Signature/equivalent authorization | `[TO BE COMPLETED BY AUTHORIZED GOVERNANCE PARTICIPANT — NOT CREATED HERE]` |

## 12. Governance controls

| Control | Required value |
|---|---|
| Source approval | `APPROVED_SOURCES = NONE` unless a separate approval record later changes it |
| Normalization | `BLOCKED_PENDING_APPROVED_SOURCE` |
| Content/image modification | `false` |
| Clinical correctness certified by this template | `false` |
| Visual/accessibility approval granted by this template | `false` |
| Rights clearance granted by this template | `false` |
| Import/activation/publication | `false` |

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_OSCE_ATLAS_RECOVERY_STATUS.md "SEG OSCE Atlas Recovery Status"

[2]: file:///home/ubuntu/seg-internship-output/SEG_P0_REVIEWER_ACTION_CHECKLIST.md "SEG P0 Reviewer Action Checklist"

[3]: file:///home/ubuntu/seg-internship-output/SEG_P0_INDEPENDENT_REVIEW_EXECUTION_REPORT.md "SEG P0 Independent Review Execution Report"

[4]: file:///home/ubuntu/seg-internship-output/SEG_OWNER_REVIEW_AUTHORITY_POLICY.md "SEG Owner Review Authority Policy"

**Template status:** `TEMPLATE_READY_OWNER_GOVERNED_PATHWAY_PENDING_AUTHORIZED_MEDICAL_REVIEW`
