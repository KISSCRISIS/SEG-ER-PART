# SEG Source Evidence Recovery Validation Report

**Mode:** `READ-ONLY EVIDENCE VALIDATION`

**Package:** `SEG_SOURCE_EVIDENCE_RECOVERY_PACKAGE_v1.0.zip`

**Final state:** `EVIDENCE_RECOVERED_PENDING_GOVERNANCE_CLOSURE`

## 1. Scope and decision boundary

This report validates the recovered evidence package at the file, archive, checksum, and inventory levels. It does not normalize medical content, create source or content records, create mappings, create schemas, import files, execute SQL, modify Prisma or Supabase, activate assets, or expose content to learners.

The governing rule remains **Reuse → Organize → Create**. Recovered artifacts are evidence objects only. A verified checksum or complete archive inventory does not constitute source ownership, rights permission, clinical approval, or authorization for downstream transformation.

The comparison baseline is the previous SEG Source Registry status report [1]. Previous registry identifiers remain intake evidence identifiers and are not production identifiers.

## 2. Package identity and integrity

The recovery archive was inspected from `/home/ubuntu/upload/SEG_SOURCE_EVIDENCE_RECOVERY_PACKAGE_v1.0.zip` and examined in a temporary workspace only.

| Field | Result |
|---|---|
| Package SHA-256 | `8182d243fc762e29efba5adeda4233042f5e337846b3fbe819fcd374ef948758` |
| Package size | 4,617,068 bytes |
| Outer archive members | 10 |
| Archive integrity | PASS; central-directory members read successfully |
| Manifest verification | PASS for all seven artifacts marked available |
| Manifest-declared absent artifact | `pretestnew_SEPARATE_UTF8_Package.zip` was not present, consistent with its declared `NOT_AVAILABLE_IN_WORKSPACE` status |
| Duplicate archive members | None observed |
| Empty recovered artifacts | None observed among the seven available artifacts |

The ten actual outer members comprise three control documents (`00_README.md`, `01_SOURCE_ARTIFACT_MANIFEST.json`, and `02_RECOVERY_STATUS.md`) and seven available recovered artifacts. The manifest also names one additional artifact as unavailable; that name is not treated as a failed checksum because no file was supplied for hashing.

## 3. Manifest and artifact SHA validation

The manifest-declared byte sizes and SHA-256 values were recalculated from the recovered files. Every artifact marked `AVAILABLE` matched both its declared size and its declared SHA-256.

| Recovered artifact | Declared status | Size | Recalculated SHA-256 | Result |
|---|---:|---:|---|---|
| `OSCE_Emergency_Medicine_Imaging_Section_Package.zip` | AVAILABLE | 4,254,983 bytes | `ca5a7f5713bf5101daa839a546633366d7b5b876604bd3dbf7cea2972d59f66e` | MATCH |
| `OSCE_Emergency_Medicine_Imaging_Section_UTF8.txt` | AVAILABLE | 22,656 bytes | `c5e53a1b3df0b5aaaf9a21326981ccd8f1ffdadbfcdac01c4078940734283f2d` | MATCH |
| `1400q_Study_Guide_SEPARATE_Package.zip` | AVAILABLE | 1,701 bytes | `fbc241b1c6c1313a8c0a4e7d394cc623067dc25be6de31c69f4721ab9905beb5` | MATCH |
| `pretestnew_Study_Guide_SEPARATE_Package.zip` | AVAILABLE | 40,794 bytes | `83911dd03c31470f3982dc6541d2e317f222f36433e10804bd8ff545ffe3f755` | MATCH |
| `1400q_Questions_and_Arabic_Explanations_UTF8.txt` | AVAILABLE | 350,041 bytes | `6bdb8877780e7841f286348704ed5918c6965b7825f45182dce890f5c06e3800` | MATCH |
| `PreTest_All_Chapters_Questions_and_Arabic_Explanations_UTF8.txt` | AVAILABLE | 451,668 bytes | `29624c9c37f0e5f8e103125be783743a879a42b03d0c1cd0031d60654064e5f0` | MATCH |
| `1400q_SEPARATE_UTF8_Package.zip` | AVAILABLE | 91,759 bytes | `b780b085926e03d5d052683ac2b82b34a2ba9e696e80750f6720d7a8921cf4f8` | MATCH |
| `pretestnew_SEPARATE_UTF8_Package.zip` | NOT_AVAILABLE_IN_WORKSPACE | Not supplied | Not calculable | UNAVAILABLE AS DECLARED |

All recovered text artifacts examined were UTF-8 readable. Structural counts are recorded only as file observations; they are not governed-unit counts and do not validate completeness, correctness, or clinical suitability.

## 4. OSCE package verification

The recovered OSCE container passed ZIP integrity testing. It contains 17 central-directory entries: one directory entry, one UTF-8 station-text artifact, one `visual_validation_notes.txt`, and 14 PNG assets. This directly resolves the previous package-level absence of the named OSCE container and its 14-image inventory, but it does not close rights, clinical review, or production-governance gates.

The OSCE text artifact is 22,656 bytes, 323 lines, UTF-8, and has SHA-256 `c5e53a1b3df0b5aaaf9a21326981ccd8f1ffdadbfcdac01c4078940734283f2d`. The validation notes state that `016_first_degree_heart_block.png` and `142_acute_cholecystitis.png` are readable at 1041 × 1347 and that the selected assets preserve original source-page context. Those are visual-readability observations only; they are not medical approval, rights evidence, or provenance proof.

All 14 PNGs were present. Each was confirmed as a PNG with dimensions 1041 × 1347, RGB color mode, and no interlacing. The per-file SHA-256 inventory is:

| PNG member | SHA-256 |
|---|---|
| `013_endocarditis.png` | `4753109413d1dbb1f58a903a1198088911ad53d6b862f04525add2c9d84f31e0` |
| `016_first_degree_heart_block.png` | `44a62488089329ea2b58f60388678e6aa3bd46dc13f25d6b2ccbf949291c7d9d` |
| `017_mobitz_one_wenckebach.png` | `21594b37fe0542f5249675c302d9932adc80f3cc8a2ca598cf5f975675494db8` |
| `051_acute_decompensated_heart_failure.png` | `71e025d003e429013b4fe330865e190ec7dff61cdc30b20e432d0e6a492ec09e` |
| `056_cardiogenic_shock.png` | `4a9a06c1c628da1eefcde749853b28dc5a0f4a42ff3f298f174266e3547ae4ac` |
| `066_aortic_stenosis.png` | `a80253ff0a264462c20de2bdc5c3d7690099c0406949516d5334c0951b26d60a` |
| `094_radial_head_fracture.png` | `4f061d72fd121c6f82cc084e352d48390f904cf55f15d3afeb89ecb282dc5e20` |
| `096_nursemaid_elbow.png` | `b12211de56ab3f258435e6784a3d9284ee1f1093540dae6db51a519d02747562` |
| `142_acute_cholecystitis.png` | `f8049bcbce5ef52525c42fae5833a78bb0793892fda93ce7f2dfc859e1973612` |
| `149_acute_pancreatitis.png` | `8d9588224aee7d642161bc08214e0a9f15e6c01dbf3572d47e5f94125c6fed9c` |
| `159_acute_cholangitis.png` | `35bad441ee7cda733a02d9ada029b5c500c3e196c20808d35263d29dcd209629` |
| `190_intussusception.png` | `6d3533432c4bbc92dc04fc045a587a8e3d311d86b5f68096778445648b251beb` |
| `192_small_bowel_obstruction.png` | `3b8dd6ac93da6f03979d55d2a57211cc5f25d24c288448b0909fc3a01ebb4b7c` |
| `193_large_bowel_obstruction.png` | `1c3b4a7e67887147272d7957bdb82acb7f970cdee300b1dc3200accb8547e9b3` |

### OSCE evidence update

The prior registry marked the OSCE container, 14 PNG package, and validation notes as unavailable for direct fingerprinting. That availability finding is now superseded by verified recovery evidence. The remaining state is **partially recovered, pending governance closure**. The recovered package still does not establish source owner or publisher, edition/version, image-specific rights or display permission, exact source-versioned locators, clinical review, visual/medical approval, professional-track decision, or production audit lineage. No Atlas record, content mapping, or N:M link is authorized by this report.

The recovered OSCE container must remain separate from the previously observed Internship framework and from the managed published asset set. Availability of these recovered files does not prove that the assets are approved for publication or that they correspond to any existing runtime asset identifiers.

## 5. 1400q recovery verification

The recovery package contains two explicitly separate 1400q representations and their READMEs. `1400q_Study_Guide_SEPARATE_Package.zip` is a 1,701-byte valid ZIP whose inner study-guide text has SHA-256 `66ffbf5e7936488e12e71950d617f2f40114587d017b45c017607e8a8603ed74`, size 37,414 bytes, and 583 lines. Its README states that the two non-MCQ study guides are independent and contain no merged source content.

`1400q_SEPARATE_UTF8_Package.zip` is a 91,759-byte valid ZIP containing `1400q_Questions_and_Arabic_Explanations_UTF8.txt` and `README_1400q.txt`. The text has SHA-256 `6bdb8877780e7841f286348704ed5918c6965b7825f45182dce890f5c06e3800`, size 350,041 bytes, and 8,870 lines. Its README states that the package is derived only from `1400q.pdf` and does not include `pretestnew.pdf` content.

This is useful separation and representation evidence. The original `1400q.pdf`, authoritative source identity, edition/version, publisher/owner, rights/display permission, precise locators, professional-track assignment, clinical review, and audit lineage are not present in the recovery package. The structural marker observations in the recovered text are not a question-unit validation. The 1400q family therefore remains **RECOVERED_ARTIFACTS_PRESENT / BLOCKED_PENDING_SOURCE_METADATA_AND_GOVERNANCE_REVIEW** and must not be merged with Pretest.

## 6. Pretest recovery verification

`pretestnew_Study_Guide_SEPARATE_Package.zip` is a valid 40,794-byte ZIP. Its inner `pretestnew_Study_Guide_UTF8.txt` is 131,490 bytes, 1,349 lines, and has SHA-256 `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166`. This exactly matches the previously registered Pretest text artifact `UPD811-007` in the prior Source Registry [1]. The byte-level match confirms representation identity; it does not restore or validate the authoritative original source.

The separate `PreTest_All_Chapters_Questions_and_Arabic_Explanations_UTF8.txt` is 451,668 bytes, 6,501 lines, and has SHA-256 `29624c9c37f0e5f8e103125be783743a879a42b03d0c1cd0031d60654064e5f0`. It is a distinct recovered artifact and must remain a separate lineage until an authorized source comparison establishes its relationship to the registered Pretest representation. No merge or replacement decision is made here.

The recovery package does not provide the original `pretestnew.pdf`, an authoritative edition/version, publisher/owner, rights/display permission, precise locators, professional-track decision, independent medical review, or restoration audit trail. The previous source-restoration blocker therefore remains open. Pretest status is updated to **RECOVERED_REPRESENTATION_CONFIRMED / BLOCKED_PENDING_SOURCE_RESTORATION_AND_GOVERNANCE_CLOSURE**.

## 7. Comparison with previous Source Registry records

| Source family or artifact | Previously recorded state | Recovery evidence update | Current evidence state and progression blocker |
|---|---|---|---|
| OSCE Atlas | Container, 14 PNGs, and validation notes unavailable for direct fingerprinting | Named ZIP, UTF-8 text, notes, and all 14 PNGs recovered; container and member hashes verified | `PARTIALLY_RECOVERED`; blocked by source identity/version, rights, locators, medical/visual review, track, and audit evidence |
| 1400q Study Guide | Not represented as a closed source row in the previous canonical table | Separate study-guide ZIP and inner text recovered and hashed; README documents no merge | New/additional evidence; blocked by original source, identity/version, ownership, rights, locators, track, review, and audit evidence |
| 1400q Q&A | Not represented as a closed source row in the previous canonical table | Separate Q&A ZIP and text recovered and hashed; README excludes Pretest content | New/additional evidence; structural observations do not validate governed questions; same metadata and review blockers remain |
| Pretest `UPD811-007` | SHA `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166`; source restoration required | Recovered inner study-guide text matches prior SHA exactly; separate all-chapters artifact also recovered under a new SHA | Representation identity confirmed, but source-restoration, metadata, rights, locators, medical review, and lineage gates remain open |
| Drug HTML | SHA `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac`; blocked | Not included in this recovery package | No status change; remains blocked pending authoritative source envelope and medical review |
| HIPPO HY | SHA `fe9b1df0eae11416195c919095aa946c80212ed48e3ef59f9c0a50e2db5eef5c`; blocked | Not included in this recovery package | No status change; remains blocked pending metadata, rights, and clinical review |
| HIPPO QBank | SHA `b9c1636f84f802d9f68794a3fa6f3d6ca34617fc08eda0a9ffb863262001771b`; blocked | Not included in this recovery package | No status change; remains blocked pending metadata, rights, completeness, locators, and clinical review |
| FRCEM study book and QBank | Prior hashes and duplicate/representation lineage recorded; blocked | Not included in this recovery package | No status change; no rights or clinical-review gate is closed |
| Oxford | SHA `353219418d900a27e48bb28c086965135451600e21ea5f8a98d5bfc508895be7`; blocked | Not included in this recovery package | No status change; source identity, official edition, rights, and review remain unresolved |
| Clinical Images | No source-specific artifact or image inventory was previously closed | Not included in this recovery package | No status change; remains blocked due absent artifact inventory, per-file hashes, provenance, rights, alt text, and review evidence |

## 8. Evidence still required before progression

The recovery package closes the **file-recovery and checksum-verification sub-gate** for the supplied OSCE, 1400q, and Pretest representations. It does not close the Source Registry governance gate. The following evidence remains required before any adapter, mapping, database storage, or content review handoff can progress:

| Evidence class | Remaining requirement |
|---|---|
| Authoritative identity | Source title, author/publisher/owner, and authoritative original artifact for each family |
| Versioning | Edition, release/version, publication date where applicable, and representation-to-original relationship |
| Rights | Written rights/license evidence, display permission, restrictions, and evidence locator for text and each visual asset family |
| Provenance and lineage | Reproducible source-versioned locators, artifact-to-original lineage, and separation of distinct representations |
| Track and taxonomy | Explicit professional-track and taxonomy decisions reviewed against SEG pathway boundaries |
| Medical review | Independent clinical review status, reviewer assignment, decision record, and unresolved issue handling |
| Audit trail | Append-only evidence of recovery, verification, review, and any future governed decision; no production audit event was created here |
| OSCE-specific evidence | Asset-level source provenance, rights, visual/medical review, station linkage, and confirmation that recovered assets are not being substituted for managed runtime assets |
| Pretest-specific evidence | Restoration of the authoritative source and a restoration record addressing the previously observed OCR/extraction corruption |

## 9. Final status and non-actions

**Final state:** `EVIDENCE_RECOVERED_PENDING_GOVERNANCE_CLOSURE`

The evidence-recovery task is complete for the supplied archive: available manifest artifacts were verified, OSCE archive members were inspected, all 14 PNGs were confirmed and fingerprinted, and recovered representations were compared with the previous Source Registry. Governance closure is not complete.

No content was normalized. No source, content, Atlas, or production database record was created. No mapping, schema, SQL, seed, Prisma operation, Supabase change, migration, import, activation, publication, learner exposure, or Git operation was performed. No original artifact was deleted, replaced, renamed, or merged.

## References

[1]: `/home/ubuntu/seg-internship-output/SEG_SOURCE_REGISTRY_STATUS_REPORT.md` "Previous SEG Source Registry status report"
[2]: `/tmp/seg-source-evidence-recovery-inspection/SEG_SOURCE_EVIDENCE_RECOVERY_PACKAGE_v1.0/01_SOURCE_ARTIFACT_MANIFEST.json` "Recovery artifact manifest"
[3]: `/tmp/seg-source-evidence-recovery-inspection/SEG_SOURCE_EVIDENCE_RECOVERY_PACKAGE_v1.0/02_RECOVERY_STATUS.md` "Recovery status"
[4]: `/tmp/seg-source-evidence-recovery-inspection/osce-members/visual_validation_notes.txt` "OSCE visual validation notes"
