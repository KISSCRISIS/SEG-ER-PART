# SEG OSCE Atlas Recovery Status

**Mode:** Controlled Recovery Only / Read-Only Evidence Validation  
**Target:** `ATLAS_ASSET_OSCE_VISUAL_001`  
**Final status:** `OSCE_ATLAS_RECOVERY_STATUS_COMPLETE`  
**Governance gate:** `BLOCKED_PENDING_EVIDENCE`  
**Allowed operational state:** `INTERNAL_REFERENCE_ONLY` / `WAITING_FOR_EVIDENCE`

## 1. Executive result

The recovered OSCE artifact was verified without changing the recovery package or any source file. The embedded OSCE ZIP is structurally readable, its compressed data passes integrity testing, and it contains the expected 14 PNG image assets plus one UTF-8 station text file and one visual-validation notes file. The recovered package therefore provides a **verified artifact inventory and file-level SHA-256 evidence**, but it does not, by itself, close the original-source identity, rights, clinical-review, complete provenance, or Atlas-governance requirements.

The text artifact explicitly describes the material as an emergency-medicine OSCE imaging section derived from `CopyofEmergency-Medicine-FULL.pdf`. That statement is retained as an artifact claim only. The cited original PDF, its publisher or owner evidence, its edition/version, and an authorized usage record are not present in the recovered OSCE package.

## 2. Artifact inventory and integrity evidence

| Layer | Artifact | Evidence | Result |
|---|---|---|---|
| Recovery container | `SEG_SOURCE_EVIDENCE_RECOVERY_PACKAGE_v1.0.zip` | SHA-256 `8182d243fc762e29efba5adeda4233042f5e337846b3fbe819fcd374ef948758` | Present; used as the outer recovery evidence container |
| Recovered OSCE package | `OSCE_Emergency_Medicine_Imaging_Section_Package.zip` | SHA-256 `ca5a7f5713bf5101daa839a546633366d7b5b876604bd3dbf7cea2972d59f66e` | Present; ZIP integrity test: `No errors detected in compressed data` |
| Inner package | All members | 16 file members excluding the directory entry: 14 PNG files and 2 text files | Inventory complete for this recovered package |
| Station text | `OSCE_Emergency_Medicine_Imaging_Section_UTF8.txt` | 323 lines; SHA-256 `c5e53a1b3df0b5aaaf9a21326981ccd8f1ffdadbfcdac01c4078940734283f2d` | Present; self-describes the OSCE station material and source-page references |
| Validation notes | `visual_validation_notes.txt` | 4 lines; SHA-256 `ac343825616ae93d78c2b14aa01741b04a4405434b67ec9a2e71a57ac2b3e4bf` | Present; reports readability checks for two selected images only |

All 14 PNG files were identified as PNG image data with dimensions **1041 × 1347 pixels**, 8-bit RGB color, and non-interlaced encoding. The following per-file manifest is evidence of the recovered bytes only; it is not an authorship, license, or clinical-approval statement.

| # | Recovered PNG | SHA-256 |
|---:|---|---|
| 1 | `images/013_endocarditis.png` | `4753109413d1dbb1f58a903a1198088911ad53d6b862f04525add2c9d84f31e0` |
| 2 | `images/016_first_degree_heart_block.png` | `44a62488089329ea2b58f60388678e6aa3bd46dc13f25d6b2ccbf949291c7d9d` |
| 3 | `images/017_mobitz_one_wenckebach.png` | `21594b37fe0542f5249675c302d9932adc80f3cc8a2ca598cf5f975675494db8` |
| 4 | `images/051_acute_decompensated_heart_failure.png` | `71e025d003e429013b4fe330865e190ec7dff61cdc30b20e432d0e6a492ec09e` |
| 5 | `images/056_cardiogenic_shock.png` | `4a9a06c1c628da1eefcde749853b28dc5a0f4a42ff3f298f174266e3547ae4ac` |
| 6 | `images/066_aortic_stenosis.png` | `a80253ff0a264462c20de2bdc5c3d7690099c0406949516d5334c0951b26d60a` |
| 7 | `images/094_radial_head_fracture.png` | `4f061d72fd121c6f82cc084e352d48390f904cf55f15d3afeb89ecb282dc5e20` |
| 8 | `images/096_nursemaid_elbow.png` | `b12211de56ab3f258435e6784a3d9284ee1f1093540dae6db51a519d02747562` |
| 9 | `images/142_acute_cholecystitis.png` | `f8049bcbce5ef52525c42fae5833a78bb0793892fda93ce7f2dfc859e1973612` |
| 10 | `images/149_acute_pancreatitis.png` | `8d9588224aee7d642161bc08214e0a9f15e6c01dbf3572d47e5f94125c6fed9c` |
| 11 | `images/159_acute_cholangitis.png` | `35bad441ee7cda733a02d9ada029b5c500c3e196c20808d35263d29dcd209629` |
| 12 | `images/190_intussusception.png` | `6d3533432c4bbc92dc04fc045a587a8e3d311d86b5f68096778445648b251beb` |
| 13 | `images/192_small_bowel_obstruction.png` | `3b8dd6ac93da6f03979d55d2a57211cc5f25d24c288448b0909fc3a01ebb4b7c` |
| 14 | `images/193_large_bowel_obstruction.png` | `1c3b4a7e67887147272d7957bdb82acb7f970cdee300b1dc3200accb8547e9b3` |

## 3. Recovered text and validation-note evidence

The station text contains 14 image references and source-page references for the selected stations. It also states that the material was extracted from a supplied `CopyofEmergency-Medicine-FULL.pdf` and that the station explanations are an educational synthesis requiring checking against current local protocols and a supervising emergency-medicine educator before clinical use. This is evidence of the artifact's internal description, not independent proof of the original PDF's identity, ownership, rights, or clinical approval.

The validation notes report that `016_first_degree_heart_block.png` and `142_acute_cholecystitis.png` were readable at 1041 × 1347 pixels and that the selected assets preserve source-page context. No equivalent readability result is recorded in the notes for the other 12 PNG files. The notes also do not constitute an accessibility audit, a medical review, or a rights clearance.

## 4. Missing governance evidence

| Governance area | Current evidence | Missing evidence | Status |
|---|---|---|---|
| Original source identity | Artifact text names `CopyofEmergency-Medicine-FULL.pdf` and includes station/source-page references | Original PDF or authoritative source record; canonical title; publisher/owner; author or organization; edition/version; publication date; original locator | Open |
| Artifact identity | Embedded ZIP, member inventory, dimensions, and per-file hashes are verified | A governed source envelope linking the recovered package to the original source and target asset identity | Open |
| Provenance | Recovery container and recovered OSCE package hashes are verified; station text describes an extraction origin | Independently evidenced extraction event, extractor/context, recovery date record, source-page-to-file evidence, and registry relationship | Open |
| Rights | No license, owner authorization, or usage statement is present in the verified package | Ownership evidence; license or permission; educational-use terms; redistribution restrictions; publication/display limitations; image-specific rights where applicable | Open; `PENDING_EXTERNAL_EVIDENCE` |
| Medical review | Artifact includes an educational caution and emergency-medicine station material | Named reviewer assignment, specialty/domain scope, conflict declaration, review record, approval evidence, and current-protocol check | Open; `Pending Clinical Review` |
| Professional track | Content is emergency-medicine OSCE-oriented | Governed SEG track decision and rationale; no track is activated by this report | Open |
| Audit | File-level hashes and package integrity are recorded | Append-only governance events for source intake, recovery, rights review, medical review, and later decision | Open |

## 5. Rights status

**Current rights status:** `PENDING_EXTERNAL_EVIDENCE`.

The package proves possession and byte integrity of the recovered files only. It does not prove ownership, permission to extract, permission to display or distribute the images, permission to reproduce the source-page context, or permission to publish the station synthesis. No rights closure is inferred from the presence of a source name, a file hash, the recovery package, or the educational purpose of the material.

Before any promotion beyond internal evidence handling, SEG requires a source-owner or authorized-custodian statement that identifies the original source and the permitted scope of use. Where the original source is copyrighted or access-restricted, the evidence must specify whether internal review, educational display, adaptation, redistribution, and public publication are each permitted or restricted.

## 6. Medical review status and required scope

**Current medical review status:** `PENDING CLINICAL REVIEW`; no approval or activation has been issued.

The recovered section spans several clinical domains. A future review assignment should cover, at minimum, emergency medicine educational suitability and current-protocol alignment, with subject-matter review for cardiology and ECG/conduction disorders, infectious disease/endocarditis, heart failure and shock, valvular disease, emergency radiology or image interpretation, orthopedics and pediatric orthopedics, and acute abdominal or hepatobiliary/pancreatic presentations. The review must assess the image-to-caption and image-to-station correspondence, the accuracy and currency of the educational synthesis, source-page fidelity, unsafe ambiguity, and any conflict with current local protocols.

Required evidence is a named reviewer or review panel, defined specialty scope, conflict-of-interest declaration, documented review outcome, resolution record for identified conflicts, and an explicit approval decision. This report only defines those requirements; it does not create a review assignment or approval.

## 7. Accessibility requirements

Accessibility work is **not complete**. The existing validation notes provide limited readability evidence for two images but do not establish accessibility for the complete set. Before any learner-facing use, the following evidence should be collected for all 14 PNG files:

| Requirement | Evidence needed before promotion |
|---|---|
| Text alternatives | A medically accurate, concise alt-text or equivalent text description for every image; ECG and anatomy diagrams require a meaningful text equivalent rather than a generic label |
| Captions and source context | Captions or nearby text that identify the station purpose without relying on visual interpretation alone, while preserving the source-page locator |
| Legibility | Verification at intended responsive sizes, including mobile dimensions, with labels, annotations, and fine detail readable without relying on extreme zoom |
| Contrast and non-color dependence | Contrast review for text, lines, and annotations; clinically meaningful distinctions must not depend on color alone |
| Semantic and assistive-technology behavior | Correct image semantics, predictable reading order, keyboard and screen-reader-compatible presentation in any future UI surface |
| Localization and language | Review of bilingual labels or text equivalents for language clarity and consistent terminology where applicable |
| Rights and provenance metadata | Accessible presentation must retain the source locator, artifact identity, and rights restrictions; accessibility text must not be treated as a substitute for rights evidence |

No image was modified in this task, and no alt-text or content rewrite was generated or stored as a production artifact.

## 8. Next allowed action

The next allowed action is **evidence acquisition and governance preparation only**: obtain the authoritative original source or an authorized custodian statement, close the rights and usage scope, document the extraction and recovery events, and assign the required clinical reviewers and accessibility review scope. After those items are independently evidenced, SEG may conduct a governed source-level closure review.

The following actions remain blocked: creating an Atlas record, creating content mappings or N:M links, normalization, import, database writes, production publication, and activation. This report does not change the source registry, Atlas schema, content schema, or application architecture.

## 9. Final disposition

| Decision dimension | Current decision |
|---|---|
| Artifact package | Verified and retained as recovered evidence |
| Source governance | `BLOCKED_PENDING_EVIDENCE` |
| Rights | `PENDING_EXTERNAL_EVIDENCE` |
| Medical review | `Pending Clinical Review` |
| Accessibility | Verification required for all 14 assets; two-image readability note only is present |
| Operational use | `INTERNAL_REFERENCE_ONLY` / `WAITING_FOR_EVIDENCE` |
| Normalization or Atlas integration | Not permitted |

## References

[1]: `SEG_CONTENT_RECOVERY_EXECUTION_TRACKER.md` — SEG recovery tracker used as the governing recovery-management reference.
[2]: `SEG_OSCE_ATLAS_SOURCE_REVIEW.md` — prior read-only OSCE source review.
[3]: `SEG_SOURCE_EVIDENCE_RECOVERY_VALIDATION_REPORT.md` — recovery validation report for the recovered OSCE package.
[4]: `SEG_MASTER_SOURCE_REGISTRY_STATUS.md` — consolidated source-registry status.
