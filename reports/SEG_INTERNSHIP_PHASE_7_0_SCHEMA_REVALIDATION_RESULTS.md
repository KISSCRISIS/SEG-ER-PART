# SEG Internship Phase 7.0 — Schema Revalidation Results

**Mode:** `READ_ONLY SCHEMA VALIDATION`

**Authorization basis:** Phase 6.13 authorization. The permitted scope is structural validation, field mapping, and schema compatibility testing only. No production record, JSON payload, import, activation, publication, learner exposure, database change, or application change was authorized or performed.

**Input scope:** The 48 provisional medical-content candidate rows in the governed Internship source-to-schema mapping and revalidation manifest. The 61 technical implementation members remain excluded from medical-content validation.[1] [2]

## 1. Validation interpretation

This dry run evaluates compatibility between the existing candidate evidence and the approved design contracts. A `FAIL` result means that the candidate package is not presently complete enough for schema preparation or production conversion. It does not constitute a clinical judgment, rights decision, approval, or rejection of the underlying medical source.

The common canonical envelope was checked against `manifest.schema.json`: `record_id`, `title`, `content_type`, `language`, source identity and location, version and checksum, references, rights, taxonomy, medical review, and append-only audit fields. The canonical schema is closed-world and does not contain `case`, `skill`, or generic `reference` content types.[3]

## 2. Results by domain

| Domain | Source count | Fields checked | Pass/Fail | Missing fields and evidence gaps | Recommendation |
|---|---:|---|---|---|---|
| Lesson | 16 | Canonical envelope; title/language; `content_type=lesson`; source ID/location/owner; version/checksum; references and locators; rights; track/taxonomy; medical review; audit; pathway/level/module/specialty/topic | **FAIL** | Source ID, path, and SHA are carried by the manifest. Owner/publisher, accessed date, governed version value, references with claim-level locators, rights/display scope, reviewer/decision, audit events, and source-level taxonomy are not closed. Record-level title, language, exact locator, level, module, specialty, and topic are not uniformly evidenced. | Keep as provisional Lesson candidates. Collect source metadata, exact locators, references, rights evidence, explicit `02_Internship` and taxonomy ID/version, then conduct independent clinical/relevant review before any schema preparation. |
| Question Bank | 17 | Canonical envelope; `content_type=question_bank`; question text; options and ordering; answer key; explanation; difficulty; reference linkage; specialty/topic; track/taxonomy; review; audit | **FAIL** | The candidate set includes assessment sources and source-local materials, but no dry-run record was created from them. Item-level question, complete options, answer, explanation, difficulty, claim-level reference/locator, reviewer decision, rights, taxonomy, and audit evidence are not closed. Technical pages, parsers, and question-data utilities remain excluded implementation assets. | Preserve the source files and excluded implementation assets separately. Perform item-level source extraction only under a later authorized preparation phase; do not reconstruct missing question fields from UI code or filenames. |
| Clinical Case | 6 | Candidate case contract; presentation; assessment; reasoning; management; references; case type; specialty/topic; pathway; common canonical envelope; duplicate-family linkage | **FAIL** | The existing canonical manifest has no `case` enum. Presentation, assessment, reasoning, management, references with locators, case type, specialty/topic, explicit pathway, rights, reviewer decision, taxonomy, and audit evidence are not closed. `DUP-EMERGENCY-001` remains a preserved duplicate family without a canonical production selection. | Keep as contract candidates only. Any future schema preparation requires separately authorized case-contract/enum handling, source-preserving locators, duplicate review, rights review, and independent clinical review. |
| Skills / Procedures | 5 | Skills contract; skill identity; category; required level; teaching material/locator; assessment method; framework-versus-competency role; reviewer status; pathway/specialty/topic; rights; taxonomy; audit | **FAIL** | The canonical manifest has no `skill` enum. The package contains framework/OSCE/logbook candidates, but explicit skill identity, category, required level, teaching material locator, assessment method, record role, reviewer evidence, rights, taxonomy, and audit are not closed. A framework is not a competency or sign-off record. | Preserve framework candidates separately from competency/sign-off material. Require an explicitly authorized Skills contract, relevant/clinical review, assessment-boundary review, rights evidence, track/taxonomy evidence, and audit before schema preparation. |
| Reference / Book | 4 | Reference contract; source identity; title; author/publisher; governed version; checksum; exact locator; rights status; display scope; track/taxonomy; review; audit | **FAIL** | The candidate PDFs are preserved with Source IDs, paths, and SHA values, but author/publisher, governed version, exact page/chapter/section locators, text/image rights, license/decision, display scope, explicit track/taxonomy, review, and audit are not closed. The canonical manifest has no generic `reference` enum; `book` remains a separately evaluated contract candidate. | Keep as non-learner-facing reference candidates. Obtain provenance and rights evidence, define allowed book/reference handling, preserve exact locators, and complete relevant/clinical and taxonomy review before any later schema preparation. |

## 3. Cross-domain compatibility findings

The immutable evidence linkage is partially compatible: the candidate manifest preserves Source IDs, archive paths, and 64-character SHA-256 values for the 48 medical-content rows. The professional pathway remains a provisional `SEG Internship Doctor Pathway` signal and must be verified at record level as `02_Internship`; folder placement alone is not sufficient evidence.[1] [2]

The common governance envelope is not complete for any domain. The primary blocking elements are `source.publisher_or_owner`, `source.accessed_at`, governed `version.value`, at least one traceable reference with locator and supported claim, rights fields, taxonomy ID/version, attributable medical/relevant reviewer and decision, and append-only audit events. No missing value was inferred from filenames, folders, PDF presence, UI code, or topic familiarity.

The approved design contracts are compatible as documentation targets but not all are compatible with the current closed-world canonical enum. `lesson` and `question_bank` exist in the canonical enum; Clinical Case, Skills / Procedures, and generic Reference require separately authorized contract/enum treatment before any future production conversion.[3] [4]

## 4. Track, lineage, and exclusion preservation

The dry run preserved the existing provisional Internship boundary and did not reclassify any candidate as Resident, Medical Student, or another professional track. `SRC-0078` remains preserved under its original Source ID and path; its crosswalk recommendation does not close source-level taxonomy or rights evidence. `DUP-DRUG-001` and `DUP-EMERGENCY-001` remain duplicate families with preserved lineages; no canonical source was selected.

The 61 technical implementation members, including routes, pages, parsers, UI components, and question-data utilities, were not treated as medical content and were excluded from the five-domain source counts.[1]

## 5. Dry-run conclusion

All five domains are structurally **not ready** for schema preparation because required evidence and, for three domains, canonical type handling remain unresolved. This result is limited to structural compatibility and evidence completeness. It does not approve, reject, activate, publish, or alter any medical content.

## References

[1]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_REVALIDATION_ARTIFACT_MANIFEST.md "SEG Internship Revalidation Artifact Manifest"
[2]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_SCHEMA_MAPPING_PLAN.md "SEG Internship Source-to-Schema Mapping Plan"
[3]: /home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "Canonical SEG Manifest Schema"
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_EXTENDED_CONTENT_CONTRACTS.md "SEG Internship Extended Content Contracts"
[5]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_TYPE_CONTRACT.md "SEG Internship Content Type Contract"

**Non-action confirmation:** No JSON, schema conversion, production record, import, activation, publication, database change, application change, source rewrite, deletion, rename, merge, archive, commit, or push was performed.
