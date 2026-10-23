# SEG Internship Phase 7.0 — Schema Reassessment Results

**Mode:** `READ_ONLY SCHEMA REASSESSMENT`

**Reassessment timestamp:** `2026-08-21T08:26:33Z`

**Authority model:** The Project Owner is treated as the declared SEG Medical Decision Owner and Emergency Medicine Specialist for the educational scope. The named books are treated as reference frameworks. SEG-authored explanations are treated as Original Educational Content. Rights review remains separate for any verbatim display of PDF, image, or book text.

## 1. Scope and interpretation

This reassessment changes the interpretation of governance authority; it does not create production records, alter the canonical manifest, add content types, or convert source material. The Medical Authority Model closes the prior uncertainty about who may define the educational review boundary and who may own SEG-authored explanations. It does not, by itself, populate record-level schema fields, create attributable audit events, add missing canonical enums, or authorize production conversion.

The reassessment checks structural compatibility, required-field availability, and field mapping for the existing 48 Internship candidate rows. Source IDs, paths, SHA-256 values, preserved lineages, and the `02_Internship` boundary remain unchanged. No candidate is reclassified by filename or folder alone.

A rights result is interpreted by content class. For SEG-authored explanations that do not reproduce source text or source images verbatim, the declared Original Educational Content model supports an internal rights classification for schema planning. For any literal PDF, image, or book-text display, the external/verbatim Rights Gate remains open and is not replaced by the Medical Authority Model.

## 2. Results by domain

| Domain | Source count | Schema fields checked | Reassessment result | Remaining schema/data issue | Conclusion |
|---|---:|---|---|---|---|
| Lesson | 16 | `record_id`, title, `content_type=lesson`, language, source identity/location, version/checksum, references/locators, rights object, taxonomy, medical review, audit, pathway/branch/module/level/specialty/topic mapping | **CONDITIONAL PASS** for the existing `lesson` enum and envelope. Owner authority and Original Educational Content interpretation remove the former authority/rights-classification ambiguity for SEG-authored explanations. | Record-level values are not instantiated for every candidate: governed version, accessed timestamp, reference locator/supports, source-level taxonomy ID/version, reviewer decision/date, and audit events remain to be supplied or recorded. Verbatim source display remains rights-gated. | Structurally compatible for a future controlled preparation step; not a production record and not clinically activated. |
| Question Bank | 17 | Canonical envelope, `content_type=question_bank`, question text, ordered options, answer key, explanation, difficulty, reference linkage/locator, taxonomy, medical review, rights object, audit | **CONDITIONAL PASS** for the existing `question_bank` enum and envelope. Original SEG-authored explanations may use the declared original-content rights classification; the Medical Authority Model supplies the review authority boundary without inventing item decisions. | No item-level record was created in this dry run. Complete question text/options/answers/explanations/difficulty, source-supported locators, per-item taxonomy, reviewer decision, and audit events remain unpopulated. Verbatim question-bank source display remains rights-gated. | Structurally compatible for a later authorized item-level preparation phase; no item approval or import is implied. |
| Clinical Case | 6 | Proposed case contract fields: presentation, assessment, clinical reasoning, management, references, specialty/topic, pathway, rights, medical review, audit, and canonical `content_type` compatibility | **FAIL — TRUE SCHEMA GAP**. The canonical closed-world enum contains no `case` value, and `additionalProperties=false` prevents treating a case as an undeclared extension. | A separately authorized manifest/contract extension or an explicitly approved mapping strategy is required before exact case schema preparation. The Medical Authority Model does not add an enum or alter the closed-world schema. Duplicate and lineage records remain preserved and non-canonical. | Not ready for schema preparation under the current canonical manifest. |
| Skills / Procedures | 5 | Proposed skill identity, category, required level, teaching material locator, assessment method, competency boundary, pathway/specialty/topic, rights, medical review, audit, and canonical `content_type` compatibility | **FAIL — TRUE SCHEMA GAP**. The canonical closed-world enum contains no `skill` value, and `additionalProperties=false` prevents an undeclared skill object from being accepted. | A separately authorized Skills contract/manifest extension or explicitly approved mapping strategy is required. Medical Authority ownership does not create competency authorization and does not alter the closed-world schema. | Not ready for schema preparation under the current canonical manifest. |
| Reference / Book | 4 | `content_type=book`, source identity, title, author/publisher field where applicable, version/checksum, exact locator, rights object, display scope, taxonomy, medical review, audit | **CONDITIONAL PASS** when the target is the existing `book` enum and the record is a reference framework rather than a generic undeclared `reference` type. | Framework status does not supply governed version, exact page/chapter locator, source-level taxonomy, reviewer decision, or audit events. A book or its text/images may not be displayed verbatim without the separate Rights Gate. Generic `reference` remains non-canonical. | Structurally compatible only as `book` under a controlled future preparation step; not learner-facing and not rights-cleared for verbatim display. |

## 3. Cross-domain reassessment

The Medical Authority Model changes the governance interpretation in three limited ways. First, the Project Owner is an available and declared authority for the educational review boundary. Second, SEG explanations may be classified as Original Educational Content for schema planning when they are not literal reproductions of source text or images. Third, books may be used as Reference Frameworks for SEG-authored explanations without treating the framework itself as automatically display-cleared.

These changes do not alter the canonical schema. The manifest remains closed-world, requires the common envelope, and accepts `book`, `question_bank`, and `lesson` but not `case`, `skill`, or generic `reference`. The required `source`, `version`, `references`, `rights`, `taxonomy`, `medical_review`, and `audit` objects remain part of structural compatibility even where their values are not yet populated.

The revised interpretation therefore narrows the blocking conclusion. Owner authority and the original-content rights classification are no longer treated as reasons that Lesson, Question Bank, or Book cannot fit the schema. The true structural blockers remain the missing canonical `case` and `skill` content types or an explicitly authorized alternative mapping. Missing record values remain preparation/data-completeness work, not permission to infer or generate values.

## 4. Track, lineage, and rights boundaries

The approved pathway remains `SEG Internship Doctor Pathway` under `02_Internship`, with the branches `Core Rotations`, `Clinical Foundation`, and `Learning Engine`. This is a pathway-level decision for the revalidation scope; it is not a substitute for source-level taxonomy IDs or versions.

`SRC-0078` and `phone-pediatrics-main` remain preserved under their original identifiers and paths. `DUP-DRUG-001` and `DUP-EMERGENCY-001` remain preserved duplicate families with no canonical source replacement. No lineage identifier was renamed, merged, or selected as a production canonical.

The Original Educational Content model applies only to content authored by SEG and not reproduced literally from a source. Any verbatim source passage, PDF page, scanned figure, image, question text, or book excerpt remains subject to a separate rights and display-permission decision. Schema compatibility cannot grant that permission.

## 5. Reassessment conclusion

**Reassessment status:** `BLOCKED_PENDING_SCHEMA_GAPS`.

Under the Medical Authority Model, the governance and rights interpretation is narrower and more accurate than the original dry run. Lesson, Question Bank, and Reference/Book are conditionally compatible with the current canonical schema when represented as `lesson`, `question_bank`, and `book`, respectively. Clinical Case and Skills/Procedures remain blocked by genuine closed-world schema gaps because `case` and `skill` are absent from the canonical enum. No schema extension, manifest change, JSON generation, import, database/application change, activation, or publication was performed.

## References

[1]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DECISION_OWNER_APPROVAL.md "SEG Internship Decision Owner Approval"
[2]: /home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "Canonical SEG Manifest Schema"
[3]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_7_0_SCHEMA_REVALIDATION_RESULTS.md "Original Phase 7.0 Schema Revalidation Results"
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_TYPE_CONTRACT.md "SEG Internship Content Type Contract"
[5]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_EXTENDED_CONTENT_CONTRACTS.md "SEG Internship Extended Content Contracts"

**Non-action confirmation:** No JSON, schema conversion, schema mutation, production record, import, activation, publication, learner exposure, database change, application change, source rewrite, deletion, rename, merge, archive, commit, or push was performed.

