# SEG Source Registry Governance Closure Report

**Review mode:** `CONTROLLED READ-ONLY`  
**Review date:** 2026-08-22  
**Scope:** OSCE Package, Pretest, 1400 Questions, Drug HTML, HIPPO HY, HIPPO QBank, FRCEM representations, Oxford references, and Clinical Images.  
**Authority:** The SEG governance rules and YaAllah target architecture remain controlling. Recovered or extracted artifacts are evidence only; they are not approved content records.

## 1. Executive decision

The final evidence pass confirms that several file-recovery and checksum sub-gates have been satisfied for recovered OSCE, 1400q, and Pretest representations. It does **not** establish complete source governance closure. Source identity, authoritative edition/version, rights/display permission, precise locators, independent clinical review, professional-track decisions, and append-only governance audit evidence remain incomplete for the source families in scope.

> **Final classification: `BLOCKED_PENDING_EVIDENCE`**

The requested `READY_FOR_NORMALIZATION` state is not supported. No source is authorized for normalization, adapter design, mapping, database storage, import, activation, learner exposure, or publication by this review.

## 2. Evidence boundary and method

This report records only evidence observed in the existing SEG registry, the recovery validation report, and the Drug HTML source review. A checksum proves the identity of a supplied file representation; it does not prove the authority, accuracy, copyright status, edition, or clinical correctness of the underlying source. Likewise, a readable image or text artifact is not a clinical or visual approval.

The recovery package was previously verified as a 4,617,068-byte archive with SHA-256 `8182d243fc762e29efba5adeda4233042f5e337846b3fbe819fcd374ef948758`. Seven available artifacts matched the manifest sizes and SHA-256 values. The package contained the recovered OSCE container, 1400q representations, and Pretest representations, while `pretestnew_SEPARATE_UTF8_Package.zip` remained unavailable as declared.[1]

The previous Source Registry is treated as an intake inventory, not as an approval register. Its status remained `PENDING_EXTERNAL_EVIDENCE` for rights and `PENDING_CLINICAL_REVIEW` for medical review, with Pretest additionally marked `REQUIRES_SOURCE_RESTORATION`.[2]

## 3. Final source-by-source governance matrix

| Source family | Canonical title / identity status | Publisher, owner, author | Edition, version, date, original locator | Rights assessment | Medical review matrix | Professional track | Provenance status | Current gate / next allowed action |
|---|---|---|---|---|---|---|---|---|
| **OSCE Package** | Recovered artifact title: `OSCE Emergency Medicine Imaging Section`; canonical source identity **not established**. Container SHA-256 `ca5a7f5713bf5101daa839a546633366d7b5b876604bd3dbf7cea2972d59f66e`; UTF-8 text SHA-256 `c5e53a1b3df0b5aaaf9a21326981ccd8f1ffdadbfcdac01c4078940734283f2d`. Fourteen PNG members are present and individually hashed in [1]. | Not supplied. No authoritative publisher, owner, or author evidence was recovered. | Not supplied. No edition/version/date or source-versioned original locator. `visual_validation_notes.txt` records readability observations only. | **Pending evidence.** No written license, display permission, restriction statement, asset-level rights record, or rights-evidence locator. | **Reviewer not assigned.** Independent specialty review is required for the OSCE station text and each image-linked clinical assertion. No clinical conflicts were closed. Visual readability is not medical approval. | Provisional candidate: **Internship / Shared Core**, but unresolved. No governed track decision may be inferred from the filename or framework. | File recovery and member checksum chain are present: original source **not evidenced** → extraction event **referenced but not independently closed** → recovered container/text/PNG artifacts **verified** → SEG registry entry **not governance-closed**. | `PARTIALLY_RECOVERED / BLOCKED_PENDING_GOVERNANCE_CLOSURE`. Next allowed action is external source-owner/version/rights evidence and reviewer assignment. No Atlas record, mapping, or N:M link. |
| **Pretest** | Registered representation `UPD811-007` is `pretestnew_Study_Guide_UTF8.txt`, SHA-256 `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166`; recovery matched this SHA exactly. A separate all-chapters artifact has SHA-256 `29624c9c37f0e5f8e103125be783743a879a42b03d0c1cd0031d60654064e5f0`. Canonical original identity remains **not established**. | Not supplied. Owner, publisher, and author are not established. | Original `pretestnew.pdf` was not recovered. Edition/version/date and precise original locators are missing. The prior registry records visible OCR/extraction corruption and requires source restoration. | **Pending evidence.** No written license, display permission, restriction statement, or rights locator. | **Reviewer not assigned.** Independent clinical review is blocked until the authoritative source is restored; OCR/extraction corruption remains an unresolved clinical risk. | Provisional candidate: **Internship / Shared Core**, unresolved. No track assignment is authorized. | Representation identity is confirmed for `UPD811-007`: original authoritative source **missing** → prior extraction event **registered** → recovered text **byte-matched** → registry entry **still open**. The all-chapters artifact remains separate until an authorized comparison. | `RECOVERED_REPRESENTATION_CONFIRMED / BLOCKED_PENDING_SOURCE_RESTORATION_AND_GOVERNANCE_CLOSURE`. Next allowed action is restoration and documentation of the authoritative source, followed by metadata, rights, and clinical-review gates. No merge or replacement. |
| **1400 Questions** | Recovered separate Q&A representation: `1400q_Questions_and_Arabic_Explanations_UTF8.txt`, SHA-256 `6bdb8877780e7841f286348704ed5918c6965b7825f45182dce890f5c06e3800`. Separate study-guide representation maps to prior `UPD811-006`, inner text SHA-256 `66ffbf5e7936488e12e71950d617f2f40114587d017b45c017607e8a8603ed74`. The Q&A artifact has no confirmed canonical source ID in the previous registry. | Not supplied. No authoritative publisher, owner, or author evidence. | Original `1400q.pdf`, edition/version/date, and precise question/source locators are not present. The README evidence says the Q&A package derives from `1400q.pdf` and excludes Pretest, but this is representation evidence, not authoritative source evidence. | **Pending evidence.** No license, display permission, restriction statement, or evidence locator. | **Reviewer not assigned.** Independent clinical review is required for questions, answers, explanations, and any dose or management assertions. No question-unit correctness decision was made. | Provisional candidate: **Internship / Resident / Shared Core** depending on source scope; currently **unresolved**. The recovered artifact cannot determine professional level. | Separate study guide and Q&A representations are retained. Original source **not evidenced** → extraction event **described in README** → recovered representations **hashed** → Q&A registry identity **not closed**. No merge with Pretest. | `RECOVERED_ARTIFACTS_PRESENT / BLOCKED_PENDING_SOURCE_METADATA_AND_GOVERNANCE_REVIEW`. Next allowed action is authoritative source identity/edition/rights/locators and clinical-review assignment. No normalization or question mapping. |
| **Drug HTML** | Intake artifact `/home/ubuntu/upload/deepseek_html_20260615_a3266b.html`; title signal: `الملخص الشامل لروزن وتينتينالي – الأدوية، الجرعات، الموانع`; SHA-256 `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac`. No canonical source ID was supplied in the artifact. | Rosen/Tintinalli are reference signals only. Official publisher, owner, author, and authorization are not established. | No edition/version/date or authoritative original locator. The file is a derived HTML document with embedded JavaScript arrays. | **Pending evidence / blocking.** No license, display permission, restriction statement, or rights locator. | **Reviewer not assigned.** Independent emergency-medicine/pharmacology review is required for all medication indications, doses, contraindications, and precaution signals. The artifact is not a validated interaction database. | Emergency-medicine signal observed, but no governed track. Provisional candidate: **Shared Core / Advanced**, unresolved. | Source/versioned original **not evidenced** → HTML extraction/creation event **not closed** → file fingerprint **verified** → SEG registry entry **not present as governed source**. | `REVIEW_REQUIRED / BLOCKED_PENDING_EXTERNAL_EVIDENCE_AND_MEDICAL_REVIEW`. Next allowed action is authoritative source-envelope recovery and reviewer assignment. Direct import, dose use, interaction normalization, or learner exposure is rejected. |
| **HIPPO HY** | Prior registry row `UPD811-005`: `HIPPO_High_Yield_Study_Book.txt`, SHA-256 `fe9b1df0eae11416195c919095aa946c80212ed48e3ef59f9c0a50e2db5eef5c`. A colored PDF and editable representation were previously recorded as `UPD811-010` and `UPD811-012`, with separate hashes. | Not supplied. Text contains HIPPO/Tintinalli/Rosen signals, but they do not establish publisher, owner, author, or authorization. Editable-file creator metadata is not ownership evidence. | Edition/version/date and precise original locators are unresolved. PDF/DOCX are representations, not proof of a canonical edition. | **Pending external evidence.** No written license, display permission, restrictions, or rights locator. | **Reviewer not assigned.** Independent clinical review is required. Any unresolved differences between text, PDF, and DOCX representations require an explicit review record. | Provisional candidate: **Resident / Advanced**, unresolved. No track decision may be inferred from the HIPPO label alone. | Original source **not evidenced** → intake/extraction event **registered** → text/PDF/DOCX representations **fingerprinted** → source-family registry **not governance-closed**. | `REGISTERED_INTAKE / BLOCKED_PENDING_METADATA_RIGHTS_AND_CLINICAL_REVIEW`. Next allowed action is source-owner/version/rights evidence and review assignment; representations must remain separate. |
| **HIPPO QBank** | Prior registry row `UPD811-002`: `HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt`, SHA-256 `b9c1636f84f802d9f68794a3fa6f3d6ca34617fc08eda0a9ffb863262001771b`. Structural observations recorded 1,927 question markers, 1,927 answer markers, and 18 chapter markers. | Not supplied. No official question-bank publisher, owner, author, or licensed distributor is evidenced. | Edition/version/date and precise question locators are missing. Chapter/marker counts do not establish source completeness or canonical numbering. | **Pending external evidence.** No written license, display permission, restriction statement, or evidence locator. | **Reviewer not assigned.** Independent clinical review is required for questions, answers, explanations, and any conflicts with authoritative references. | Provisional candidate: **Resident / Advanced**, unresolved. The source label does not establish a governed pathway. | Original QBank **not evidenced** → extraction event **registered** → UTF-8 representation **fingerprinted** → registry entry **not closed**. | `REGISTERED_INTAKE / BLOCKED_PENDING_METADATA_RIGHTS_COMPLETENESS_LOCATORS_AND_CLINICAL_REVIEW`. Next allowed action is authoritative QBank identity, completeness evidence, rights, locators, and clinical review. No question records or mappings. |
| **FRCEM representations** | Primary study-book text `UPD811-001` and byte-identical duplicate `UPD811-004`, SHA-256 `f5fb6b3f88b94a1b5a1a360acfe4616a5b3a5940a4b0854a35ba646f5f95a4a1`; FRCEM Q&A text `UPD811-003`, SHA-256 `08d73b475a7ff1eda0cbbe905c5109628598b5210e8710ac0e8fae19dddad995`; PDF representation `UPD811-009`, SHA-256 `9011b079fea60f8b981616eba1602a84b75041806093f895c12f5ea9b602de67`; DOCX representation `UPD811-011`, SHA-256 `6075e82c335b1375a14664914c63fefa75fe9c64d12968d972becfd2b92025ea`. The registry records the duplicate/representation relationships but not canonical authority. | Not supplied. Preparer/creator signals are not publisher or ownership evidence. | Source edition/version/date and precise citation locators are unresolved. The registry observes 32 chapters and 1,529 source-question signals, but these are structural observations, not official version evidence. | **Pending external evidence.** No written license, display permission, restriction statement, or source locator for text/PDF/DOCX. | **Reviewer not assigned.** Independent emergency-medicine/examination review is required for study-book and Q&A representations. No clinical conflicts were closed. | Provisional candidate: **Resident / Advanced**, with possible Shared Core subsets; final track unresolved. FRCEM branding alone is not a track decision. | Original FRCEM source **not evidenced** → extraction event **registered** → multiple representations **fingerprinted and duplicate-linked** → source-family registry **not governance-closed**. | `MULTIPLE_REPRESENTATIONS_REGISTERED / BLOCKED_PENDING_SOURCE_METADATA_RIGHTS_AND_CLINICAL_REVIEW`. Next allowed action is canonical source evidence, rights, versioned locators, track review, and clinical review. Preserve duplicate lineage; do not merge. |
| **Oxford references** | Prior registry row `UPD811-008`: `Emergency_Oxford_Essentials.pdf`, SHA-256 `353219418d900a27e48bb28c086965135451600e21ea5f8a98d5bfc508895be7`. Observed PDF title is `Emergency Clinical Medicine Essentials`; file author metadata says `Manus AI`, which is not authoritative publisher/author evidence. | Official Oxford publisher/owner/author is **not established**. The local file metadata does not prove Oxford provenance. | Official title, edition/version/date, ISBN or other authoritative locator, and relationship to an official Oxford publication are missing. | **Pending evidence / blocking.** No license, display permission, restriction statement, or official rights locator. | **Reviewer not assigned.** Independent clinical review is required; no source-comparison decision was made. | Provisional candidate: **Internship / Shared Core**, unresolved. “Oxford” reference signal is not a professional-track assignment. | Claimed local PDF representation **fingerprinted** → authoritative Oxford source **not evidenced** → source-family registry **not governance-closed**. | `REGISTERED_REPRESENTATION / BLOCKED_PENDING_OFFICIAL_IDENTITY_RIGHTS_AND_REVIEW`. Next allowed action is official source verification, rights evidence, precise locators, and clinical review. No replacement or merge with other study guides. |
| **Clinical Images** | No source-specific clinical-image artifact, inventory, or closed registry entry was supplied in the current evidence set. This is distinct from the recovered 14 OSCE PNG members. | Not supplied. No owner, publisher, author, or photographer/creator evidence. | No canonical title/family, edition/version/date, original locator, image inventory, or per-file registry is available. | **Unknown / pending evidence.** No display permission, license, restriction, or asset-level rights evidence. | **Reviewer not assigned.** Specialty review, image interpretation review, alt-text/accessibility review, and unresolved-issue handling are absent. | Unresolved; do not infer Internship, Resident, Shared Core, or Advanced from image context. | Original clinical-image source **not evidenced** → extraction/recovery event **not evidenced** → per-file artifact inventory **absent** → SEG registry entry **absent/closed gate not available**. | `BLOCKED_PENDING_ARTIFACT_INVENTORY_PROVENANCE_RIGHTS_AND_REVIEW`. Next allowed action is source-specific artifact recovery and per-file evidence collection. Do not substitute OSCE PNGs for this family or activate any image. |

## 4. Rights assessment summary

No source in this pass reaches `confirmed` rights status. The appropriate statuses are `pending evidence` for sources with identifiable representations and `unknown/pending evidence` for Clinical Images and any OSCE element without an authoritative rights record. File hashes, README statements, preparer metadata, visual readability notes, and reference-name signals do not constitute permission to display or redistribute medical content.

The minimum rights package for progression is source-specific and must include the rights holder or licensor, permitted use, display/distribution scope, restrictions, effective date or applicable version, and a reproducible evidence locator. For OSCE and Clinical Images, rights evidence must be asset-level or explicitly cover the complete image family and its intended SEG use.

## 5. Medical review matrix and unresolved clinical conflicts

| Source | Required specialty reviewer | Review requirement | Current unresolved clinical issues |
|---|---|---|---|
| OSCE Package | Emergency medicine reviewer with imaging/OSCE expertise; additional specialty review where a station requires it | Review station text, image linkage, clinical correctness, image interpretation, and escalation of uncertain findings | No independent reviewer or decision record. Readability notes are not clinical validation. |
| Pretest | Emergency medicine reviewer with question-bank and source-restoration expertise | Restore authoritative source first; then review OCR/extraction fidelity, questions, explanations, and clinical correctness | Known OCR/extraction corruption; original source absent; all-chapters relationship unresolved. |
| 1400 Questions | Emergency medicine/question-bank reviewer; specialty reviewers as needed | Verify question-answer-explanation fidelity against authoritative source and record conflicts | Source edition and exact locators absent; structural counts are not question validation. |
| Drug HTML | Emergency medicine/pharmacology reviewer | Independently verify indication, dose, contraindication, precaution, currency, and any interaction claims | No authoritative edition or formal interaction model; all medication signals remain unvalidated. |
| HIPPO HY | Emergency medicine reviewer familiar with the source family | Compare representations and review clinically material differences | Edition/owner/rights unresolved; text/PDF/DOCX differences not clinically adjudicated. |
| HIPPO QBank | Emergency medicine/question-bank reviewer | Verify completeness, answer fidelity, explanation accuracy, and current clinical correctness | Completeness and precise locators absent; no conflict log or reviewer decision. |
| FRCEM representations | Emergency medicine/examination reviewer | Review canonical source identity, representation differences, questions, answers, and exam alignment | Multiple representations and duplicate lineage are recorded, but no clinical decision or canonical edition is closed. |
| Oxford references | Emergency medicine reviewer and source-verification reviewer | Verify official Oxford identity first, then review content against the authoritative edition | Local file metadata conflicts with an Oxford inference; official identity and source comparison absent. |
| Clinical Images | Emergency medicine/imaging reviewer plus accessibility reviewer | Verify source context, diagnostic interpretation, alt text, and display suitability | No artifact inventory, provenance, reviewer assignment, or image-level review evidence. |

No medical reviewer approval, clinical conflict closure, or activation decision was created by this report.

## 6. Professional-track decisions

The evidence supports only provisional routing candidates. It does not support final classification. The following separation must remain in force:

| Provisional routing | Sources | Decision state |
|---|---|---|
| Internship / Shared Core candidate | OSCE Package, Pretest, 1400 Questions, Oxford references | Unresolved; requires explicit pathway decision and clinical-owner review. |
| Resident / Advanced candidate | FRCEM representations, HIPPO HY, HIPPO QBank | Unresolved; do not merge with Internship content. |
| Shared Core candidate | Drug HTML and selected cross-track emergency concepts | Unresolved; source scope and clinical review are missing. |
| No classification available | Clinical Images | Blocked until source-specific context and governance evidence exist. |

A source name, filename, chapter marker, or apparent exam level is not sufficient to assign a SEG professional track. Any future decision must preserve track separation and record the decision with reviewer, rationale, source/version, and audit event.

## 7. Provenance and audit-trail requirements

For every source family and every recovered representation, the required chain is:

```text
Original Source
    ↓
Extraction Event
    ↓
Recovery Artifact
    ↓
SEG Registry Entry
```

The chain is only partially complete for recovered artifacts. A file-level SHA establishes the recovery artifact node; it does not establish the original-source node or prove that the extraction event was faithful.

The minimum append-only audit trail required before governance closure is:

| Event | Required evidence |
|---|---|
| Original-source intake | Source ID, canonical title, publisher/owner/author, authoritative locator, edition/version/date, rights evidence locator, and intake timestamp. |
| Extraction event | Source-version reference, extraction method/tool/version, operator or process identity, timestamp, input SHA, output SHA, and transformation boundaries. |
| Recovery event | Recovery package ID, archive/member path, byte size, SHA-256, recovery timestamp, package checksum, and any missing-member declaration. |
| Duplicate/representation decision | Candidate IDs, hashes, comparison method, relationship decision, reviewer, rationale, and preservation of separate lineage where not identical. |
| Rights review | Rights holder/licensor, permission scope, restrictions, evidence locator, reviewer, decision, timestamp, and expiry/review date where applicable. |
| Medical review | Specialty reviewer, scope, source/version/locator coverage, conflicts, decision, unresolved issues, timestamp, and required follow-up. |
| Track decision | Selected track, excluded tracks, rationale, reviewer/owner, source/version basis, and audit event. |
| Future registry transition | Explicit state transition, actor, timestamp, prior state, new state, evidence references, and rollback/reversal note. |

No production audit event, database record, Prisma model, schema, mapping, import, seed, or activation event was created by this review.

## 8. Missing evidence and blockers before normalization

The following blockers remain open across the scope:

1. **Authoritative source identity:** canonical title, publisher/owner, author, and original artifact are missing or unverified for every family except that several local representations are fingerprinted.
2. **Versioning:** edition, release/version, publication date, and representation-to-original relationship are unresolved.
3. **Rights:** no source-specific license/display permission package was verified; Clinical Images has no asset-level rights evidence.
4. **Precise locators:** source-versioned page, chapter, question, station, or image locators are not closed.
5. **Medical review:** no independent reviewer assignments or decision records close the clinical gates.
6. **Pretest restoration:** the authoritative original remains unavailable and the prior OCR/extraction corruption blocker remains open.
7. **OSCE/Clinical Images governance:** OSCE file recovery is complete at the artifact level, but source-owner, image rights, station linkage, track, and medical/visual review remain open. Clinical Images has no source-specific inventory.
8. **Professional tracks:** provisional routing cannot replace a reviewed track decision, and Intern/Resident/Advanced/Shared Core content must remain separated.
9. **Audit lineage:** the recovery evidence is not yet a complete append-only governance history from original source through registry transition.

## 9. Allowed next phase

The next allowed phase is **targeted external-evidence closure**, not normalization. It must remain read-only and should collect only the missing source identity, version, rights, locator, reviewer, track, and audit evidence listed above. After that evidence is independently verified, a separate governance decision may determine whether any source is eligible for controlled normalization review.

The following actions remain prohibited under this report: content normalization, content correction, database records, Prisma models, Zod schemas, SQL, migrations, seed scripts, mappings, imports, activation, learner exposure, source replacement, source deletion, and source-family merging without evidence.

## References

[1]: `/home/ubuntu/seg-internship-output/SEG_SOURCE_EVIDENCE_RECOVERY_VALIDATION_REPORT.md` "SEG Source Evidence Recovery Validation Report"
[2]: `/home/ubuntu/seg-internship-output/SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md` "SEG Phase 7.8.11 Updated Source Registry"
[3]: `/home/ubuntu/seg-internship-output/SEG_DRUG_HTML_SOURCE_REVIEW.md` "SEG Drug HTML Source Review"
[4]: `/home/ubuntu/seg-internship-output/SEG_SOURCE_REGISTRY_CLOSURE_VALIDATION_REPORT.md` "SEG Source Registry Closure Validation Report"
[5]: `/home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json` "Canonical SEG_CONTENT_RECORD_V1_1 schema"

**Report status:** `BLOCKED_PENDING_EVIDENCE`
