# SEG Internship Schema Field Readiness Matrix

**Phase:** 5.10 — Internship Schema Readiness Preparation  
**Mode:** `READ_ONLY GOVERNED PREPARATION`  
**Generated at (UTC):** `2026-08-17T19:42:52Z`  
**Overall readiness:** `BLOCKED_PENDING_SCHEMA_REQUIREMENTS`

## 1. Interpretation

This matrix compares the Phase 5.1 blueprint and the canonical governed manifest contract with evidence observed in the Phase 5.9 review and source registry. `Available evidence` is inventory or structural evidence; it is not proof of completeness, approval, rights clearance, or activation eligibility. Missing fields remain missing and are not filled from filenames, folders, UI labels, or code.

|Content type / target|Required fields|Available evidence|Missing fields or evidence|Validation requirement|Approval requirement|
|---|---|---|---|---|---|
|All candidate types|`record_id`, `title`, `content_type`, `language`; `source.source_id`, `source.publisher_or_owner`, `source.location`, `source.accessed_at`; `version.value`, `version.checksum`; at least one `references[]` item with `reference_id`, `locator`, `supports[]`; `rights.text_usage`, `rights.image_usage`, `rights.display_scope`; `taxonomy.taxonomy_id`, `taxonomy.taxonomy_version`; `medical_review.reviewer`, `medical_review.decision`; and `audit.created_by`, `audit.created_at`, `audit.events[]` with `event`, `actor`, `at`.|Paths, inventory hashes, provisional source IDs, structural cues, and observed review labels are available. Hash is not version/rights/approval evidence.|Owner/publisher, accessed_at, governed version value, complete references, rights, taxonomy ID/version, reviewer identity/decision/date, audit events, stable record ID, and complete source locator.|Closed-world schema validation; required fields/types/enums; SHA-256 and lineage check; no unknown fields; track separation; no duplicate/cycle issues.|Independent provenance, rights, taxonomy, clinical/relevant review, audit, and implementation gates. Keep pending/blocked.|
|Learning Content → lesson|Pathway, level, module, specialty, topic, content type, title, source, version, review status, clinical approval status plus common envelope.|Candidate Markdown/framework/guide paths, headings/structural cues, proposed pathway locations, hash references, provisional 02_Internship context.|Exact source wording/locator, explicit level/track/taxonomy, owner/version/rights, complete references, reviewer evidence, audit, and record ID.|Validate `content_type=lesson`; validate non-empty type payload separately; verify pathway/module and source locator; do not summarize or create a lesson.|Qualified clinical/relevant review and rights decision; approval remains NOT_APPROVED until evidenced.|
|Assessment Content → question_bank|Pathway, specialty, topic, difficulty, question, options, answer, explanation, reference, review status plus common envelope.|Assessment path signals, reviewed/question-source Markdown paths, source-layer tags, structural question cues where observed.|Complete item payload, ordered options, answer key, explanation, claim-level reference/locator, difficulty if not supplied, and reviewer evidence.|Validate `content_type=question_bank`; reject partial/UI-derived candidates; verify item-level lineage and no reconstruction.|Question-level clinical review, rights, taxonomy, and audit. Assessment framework alone is not a complete question bank.|
|Clinical Cases → case candidate|Pathway, specialty, topic, case type, presentation, assessment, reasoning, management, references, review status plus common envelope.|Emergency Cases family paths and case-related structural tags/roles; duplicate family identity preserved.|Canonical case contract/enum, complete case sections, claim-level references, exact locators, owner/version/rights, reviewer evidence, and duplicate decision.|Define and authorize a case payload contract before conversion; validate completeness and duplicate lineage; do not create reasoning or management.|Qualified clinical review, rights review, taxonomy, audit, and canonical duplicate decision.|
|Skills / Procedures → skills candidate|Skill name, category, required level, teaching material, assessment method, reviewer status plus common envelope.|Clinical Skills framework/README candidates and practical-content path signals.|Explicit skill inventory, competency level, teaching material locators, assessment/OSCE contract, reviewer identity/decision, rights, taxonomy, and audit.|Define and authorize a skills contract; distinguish framework from individual skill/sign-off; do not create competency records.|Relevant/qualified review, assessment authorization, rights, taxonomy, and audit.|
|Reference / Atlas → reference candidate|Source, version, author, locator, rights status plus common envelope; possible book-like target only after explicit contract.|Four PDF/reference candidates, file hashes, path/topic signals, first-page structural observation where available.|Owner/author/publisher, governed version, page/section locator, license/display scope, explicit taxonomy/track, review evidence, and record contract.|Rights and provenance validation; decide whether a book-like target is allowed; preserve exact source and pages; no extraction into lessons.|Rights/provenance review plus relevant/clinical review where used educationally; no display approval by filename.|
|Technical Asset → excluded|No medical content fields; implementation traceability only.|61 TS/TSX/JS assets, route/page/component/parser/source-layer signals, hashes.|No medical record payload; no content-type conversion; separate implementation ownership if later authorized.|Verify exclusion and repository boundary; do not parse code into medical records.|No clinical approval; separate implementation authorization only if code work is later requested.|

## 2. Canonical envelope gate

All future content records must satisfy the canonical manifest envelope. The current source registry explicitly reports unresolved owner/publisher, governed version, rights, explicit track, taxonomy, precise locator, and completed review evidence. Therefore, every candidate fails closed at the handoff level even where a structural content-type candidate exists.

## 3. Observed states

The observed states are `Needs review / verify`, `PENDING_METADATA_AND_REVIEW`, `PENDING_SOURCE_ROLE_AND_METADATA_REVIEW`, `PENDING_DUPLICATE_AND_METADATA_REVIEW`, `NOT_PERFORMED`, and `NOT_APPROVED`. This phase does not assign `approved`, `rejected`, or `withdrawn`, and does not create record IDs.

## 4. Required separate gates

1. Provenance and version: source ID, owner/publisher, exact location, governed version, and checksum linkage.
2. Rights: text usage, image usage, display scope, and independent decision.
3. Track/taxonomy: explicit `02_Internship` and taxonomy ID/version with no conflict.
4. Content completeness: type-specific required payload and references without reconstruction.
5. Medical/relevant review: qualified reviewer, decision, date, cited locators, and unresolved issue disposition.
6. Audit and implementation: append-only events and separate implementation authorization.

## 5. Non-actions

No JSON, schema conversion, database record, application change, import, activation, source modification, commit, push, deployment, or publication was performed.

## References

[1]: /home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json  
[2]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_SCHEMA_BLUEPRINT.md  
[3]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_5_9_REVIEW_REPORT.md  
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_REGISTRY_FINAL.md
