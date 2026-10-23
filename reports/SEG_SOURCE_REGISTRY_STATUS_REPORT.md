# SEG Source Registry Status Report

**Mode:** `CONTROLLED READ-ONLY SOURCE REGISTRY VALIDATION`  
**Final status:** `BLOCKED_PENDING_EXTERNAL_EVIDENCE`  
**Decision boundary:** No import, mapping, adapter, seed, SQL, Prisma operation, migration, database write, activation, publication, or learner exposure was performed.

## 1. Executive status

The source registry is structurally usable as an intake inventory, but it is **not ready for content conversion or production integration**. The existing SEG registry preserves source-family separation and representation lineage, while owner/publisher identity, edition/version, rights/display permission, precise locators, and clinical review remain incomplete for the book and question-bank families. The newly reviewed Drug HTML is a separate derived artifact with a file-level checksum but no authoritative source envelope. The requested OSCE Atlas package cannot be fingerprinted because the named container, 14 PNG package, and validation notes were not found in the available evidence set.

The governing rule remains:

> **Reuse → Organize → Create**

No original source is deleted, replaced, merged, or silently discarded. Intake-local IDs in the prior registry are evidence identifiers only; they are not production `SRC-*`, `CAND-*`, content, or Atlas identifiers.

## 2. Source status matrix

| Source | SHA-256 | Lineage | Rights | Medical Review | Current Gate |
|---|---|---|---|---|---|
| Drug HTML: `deepseek_html_20260615_a3266b.html` | `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac` | Standalone derived HTML; title has Rosen/Tintinalli signals, but no authoritative source identity, edition, locator, or relation to an approved source record | Not supplied; display permission not established | Not supplied; remains pending | `BLOCKED_PENDING_EXTERNAL_EVIDENCE_AND_MEDICAL_REVIEW` |
| OSCE Atlas: `ATLAS_ASSET_OSCE_VISUAL_001` package | Not available; requested asset/container/14-PNG package/validation notes not found | Prior text claims OSCE text + ZIP + 14 PNG + notes and duplicate lineage; not independently verifiable. Adjacent Intern framework SHA `e0b5d40f2fd4ca2cca65ba6dec73c826b3ff6076a06865e26afa7fd0198a91c9` is separate and must not substitute | `PENDING_EXTERNAL_EVIDENCE` | `REQUIRED / PENDING` | `BLOCKED_PENDING_EXTERNAL_EVIDENCE` |
| HIPPO: study-book text `UPD811-005` | `fe9b1df0eae11416195c919095aa946c80212ed48e3ef59f9c0a50e2db5eef5c` | Separate study-book text lineage; reference signals do not establish edition, publisher, or ownership | `PENDING_EXTERNAL_EVIDENCE` | `PENDING_CLINICAL_REVIEW` | `BLOCKED_PENDING_METADATA_AND_EXTERNAL_EVIDENCE` |
| HIPPO: question/answer/explanation artifact `UPD811-002` | `b9c1636f84f802d9f68794a3fa6f3d6ca34617fc08eda0a9ffb863262001771b` | Separate question/explanation lineage; 1,927 question markers and 1,927 answer markers were structurally observed, not validated as complete governed units | `PENDING_EXTERNAL_EVIDENCE` | `PENDING_CLINICAL_REVIEW` | `BLOCKED_PENDING_METADATA_AND_REVIEW` |
| Pretest: `UPD811-007` | `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166` | Study-guide text; visible OCR/extraction corruption requires restoration before any transformation | `PENDING_EXTERNAL_EVIDENCE` | `PENDING_CLINICAL_REVIEW` | `BLOCKED_PENDING_SOURCE_RESTORATION` |
| FRCEM: study-book text `UPD811-001` / duplicate representation `UPD811-004` | `f5fb6b3f88b94a1b5a1a360acfe4616a5b3a5940a4b0854a35ba646f5f95a4a1` for both byte-identical text files | Separate occurrences retained; `UPD811-004` is recorded as a byte-identical duplicate of `UPD811-001`; no deletion or merge performed | `PENDING_EXTERNAL_EVIDENCE` | `PENDING_CLINICAL_REVIEW` | `BLOCKED_PENDING_METADATA_AND_EXTERNAL_EVIDENCE` |
| FRCEM: question/answer/explanation artifact `UPD811-003` | `08d73b475a7ff1eda0cbbe905c5109628598b5210e8710ac0e8fae19dddad995` | Separate question/explanation lineage; 1,529 question markers and 1,529 answer markers were structurally observed, not a completed question-unit validation | `PENDING_EXTERNAL_EVIDENCE` | `PENDING_CLINICAL_REVIEW` | `BLOCKED_PENDING_METADATA_AND_REVIEW` |
| Oxford: `Emergency_Oxford_Essentials.pdf` / `UPD811-008` | `353219418d900a27e48bb28c086965135451600e21ea5f8a98d5bfc508895be7` | PDF title signal is `Emergency Clinical Medicine Essentials`; author metadata says Manus AI. This does not establish an official Oxford edition or source ownership | `PENDING_EXTERNAL_EVIDENCE` | `PENDING_CLINICAL_REVIEW` | `BLOCKED_PENDING_SOURCE_IDENTITY_AND_RIGHTS` |

## 3. Representation and duplicate controls

The prior registry records PDF and DOCX representations of FRCEM and HIPPO separately from their text artifacts. Their hashes and statuses remain evidence of representation lineage, not permission to replace or merge the text. The FRCEM text pair is byte-identical, but the existing governance decision correctly preserves both occurrences for lineage and does not silently delete or overwrite either one.

The prior registry also records a checksum sidecar `UPD811-AUDIT-001` with SHA-256 `2723a82743a4c844f5517c762e47888cca43925f9190f5ecc1e3c7643f36337b`. This is an audit artifact, not medical content and not a substitute for rights or clinical review.

## 4. Gate interpretation by source family

### Drug HTML

The file has a reproducible intake checksum and static structure, but it is a derived HTML summary with embedded clinical claims, drug names, doses, contraindications, and exam-trap strings. It has no source/version/rights/medical-review/audit envelope. It remains a read-only evidence artifact and cannot be imported as a medication reference or interaction database.

### OSCE Atlas

The actual Atlas asset package is unavailable for direct fingerprinting. The adjacent OSCE Internship Framework is explicitly marked `Pending Source Verification` and `Pending Review`, and `02_Internship.zip` contains the OSCE markdown members but zero PNG members in the inspected central-directory listing. The 21 currently available managed published assets are a separate runtime set; their `21/21` availability does not prove the presence, rights, or medical review of `ATLAS_ASSET_OSCE_VISUAL_001`.

### HIPPO, FRCEM, Pretest, and Oxford

These sources remain governed intake candidates. The source registry has checksums and structural observations for many artifacts, but the following gates remain open: authoritative source identity, publisher/owner, edition/version, rights/display permission, exact locator policy, professional-track decision, duplicate/representation decision where applicable, and independent clinical review. Pretest has the additional hard blocker of source restoration due to OCR corruption.

## 5. Required registry fields and current closure state

| Required field | Status |
|---|---|
| File/container SHA-256 | Available for the listed book/text artifacts and Drug HTML; unavailable for the requested OSCE Atlas package |
| Source identity | Incomplete for Drug HTML, Oxford, and the book/question families |
| Edition/version | Unresolved for HIPPO/FRCEM/Pretest/Oxford; not supplied for Drug HTML/OSCE package |
| Locator | Not yet a governed, source-versioned locator contract for the candidate artifacts |
| Owner/publisher | Not established for the candidate packages; preparer/file metadata is not ownership evidence |
| Rights/display permission | Pending external evidence across all listed candidate sources |
| Medical review | Pending for all candidate medical content; the OSCE package is explicitly marked required/pending |
| Professional track | Must be reviewed; filenames and educational signals do not assign Internship or Resident pathways automatically |
| Duplicate/representation lineage | Partially evidenced for FRCEM and related representations; no silent merge permitted |
| Audit trail | Intake reports and checksum sidecars exist; no production content or Atlas audit event was created |
| Production identifier/mapping | Not created; no content, Atlas, source-to-content, or N:M relation was created |

## 6. Final gate

**`SOURCE_REGISTRY_VALIDATION_COMPLETE` cannot be declared as an unqualified pass.** The controlled validation is complete as an evidence review, but the source registry remains blocked from downstream adapter or import work because required external evidence is incomplete.

**Final status:** `BLOCKED_PENDING_EXTERNAL_EVIDENCE`

The next allowed phase is a separately authorized evidence-closure review for source identity, edition/version, rights/display permission, precise locators, track separation, and clinical reviewer assignment. For the OSCE Atlas, that phase also requires restoration of the original container, 14 PNG members, validation notes, and their hashes. No database or application action is authorized by this report.

## 7. Non-actions

- No SQL, Prisma, seed, migration, or Supabase/database write was executed.
- No source, representation, or asset was deleted, renamed, replaced, merged, or imported.
- No `SEG_CONTENT_RECORD_V1_1` object, source mapping, content mapping, Atlas record, or N:M link was created.
- No medical content was approved, activated, published, or exposed to learners.
- No repository or Git operation was performed.

## References

[1]: `/home/ubuntu/seg-internship-output/SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md` "SEG Phase 7.8.11 updated source registry"
[2]: `/home/ubuntu/seg-internship-output/SEG_DRUG_HTML_SOURCE_REVIEW.md` "Drug HTML source review"
[3]: `/home/ubuntu/seg-internship-output/SEG_OSCE_ATLAS_SOURCE_REVIEW.md` "OSCE Atlas source review"
[4]: `/home/ubuntu/seg-internship-output/SEG_CONTENT_STORAGE_DESIGN.md` "SEG source-family and representation boundary"
[5]: `/home/ubuntu/projects/seeeeeeeg-aadd8500/SEG — Published Environment & Asset Verification Final Report.md` "Published managed asset availability evidence"
[6]: `/home/ubuntu/seg-internship-phase-5.6/staging/extracted/02_Internship/OSCE/OSCE_Internship_Framework.md` "Adjacent Intern OSCE framework"
