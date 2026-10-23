# SEG Internship Content Type Contract

**Phase:** 5.10 — Internship Schema Readiness Preparation  
**Mode:** `READ_ONLY GOVERNED PREPARATION`  
**Generated at (UTC):** `2026-08-17T19:42:52Z`  
**Decision state:** Contract candidates only; no schema conversion, JSON generation, import, production record, approval, or activation.

## 1. Purpose and boundary

This document defines the final **content-type-to-schema candidate contract** for the SEG Internship Doctor Pathway. It converts neither source files nor medical meaning. A schema target is a future mapping destination only. It does not prove that a source is complete, clinically correct, rights-cleared, approved, or ready for learners.

The canonical governed record contract is `/home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json`. It is a closed-world manifest contract, not a database schema. Its required envelope is: `record_id`, `title`, `content_type`, `language`; `source.source_id`, `source.publisher_or_owner`, `source.location`, `source.accessed_at`; `version.value`, `version.checksum`; at least one `references[]` item with `reference_id`, `locator`, `supports[]`; `rights.text_usage`, `rights.image_usage`, `rights.display_scope`; `taxonomy.taxonomy_id`, `taxonomy.taxonomy_version`; `medical_review.reviewer`, `medical_review.decision`; and `audit.created_by`, `audit.created_at`, `audit.events[]` with `event`, `actor`, `at`.

The source package remains immutable. Source IDs in the registry are inventory references until provenance and governance evidence are completed. The professional track remains provisional and must be explicitly verified as `02_Internship`; no filename or folder is used as approval evidence.

## 2. Final mapping contract

|Current domain|SEG target|Canonical manifest status|Contract boundary|Required governance state|
|---|---|---|---|---|
|Learning Content|Lesson schema candidate|`content_type=lesson`|Candidate lesson/learning unit; pathway, level, module, specialty, topic, title, source, version, review state, and clinical approval state must be evidenced.|Pending Clinical Review / NOT_APPROVED until independent review evidence exists.|
|Assessment Content|Question Bank schema candidate|`content_type=question_bank`|Candidate question-bank item or assessment source. Question, options, answer, explanation, reference, specialty, topic, and difficulty must be complete; no missing item fields may be reconstructed.|Question-level clinical/relevant review, provenance, rights, taxonomy, and audit required.|
|Clinical Cases|Case schema candidate|No `case` enum in canonical manifest; explicit case contract/extension required|Presentation, assessment, reasoning, management, case type, references, specialty, topic, and pathway must be separately evidenced. Duplicate families remain preserved.|Qualified clinical review and rights review required; no case record can be emitted under the current enum without an authorized contract.|
|Skills / Procedures|Skills schema candidate|No `skill` enum in canonical manifest; explicit skills contract/extension required|Skill name, category, required level, teaching material, assessment method, and reviewer status must be evidenced. A framework is not a skill sign-off.|Qualified/relevant review, assessment contract, rights, taxonomy, and audit required.|
|Reference / Atlas|Reference schema candidate|No generic `reference` enum; `book` may be evaluated only for a book-like source under a separate contract|Source, version, author, exact locator, rights status, and display scope must be evidenced. PDF/Markdown presence alone does not establish a learner reference.|Rights/provenance review and explicit taxonomy/track/review evidence required.|
|Technical Asset|Excluded|`EXCLUDED_FROM_MEDICAL_CONTENT_INGESTION`|TS/TSX/JS routes, pages, components, parsers, and source-layer implementation artifacts are not content records.|Implementation ownership may be reviewed separately; no medical approval or schema target is assigned.|

## 3. Non-mapped classes

`Unknown / Requires Review` items do not receive a final domain or schema target in this phase. Directory rows, README/manifest/governance artifacts, and reports are retained as evidence and are not silently promoted to learner-facing records. No item is currently `APPROVED`; all source-derived candidates remain pending or blocked.

## 4. Cross-cutting readiness requirements

Every future record must preserve source path, immutable checksum, version evidence, precise locator, explicit track and taxonomy, rights evidence, references, independent medical/relevant review, and append-only audit events. `Clinical Approval Status` remains `NOT_APPROVED` until independently supplied. A structural mapping or future schema validation result cannot grant approval.

## 5. Explicit non-actions

- No JSON was generated.
- No source content was rewritten, summarized, or normalized into records.
- No database, application, route, component, authentication, asset, or medical governance boundary was changed.
- No source was deleted, renamed, archived, selected as canonical, imported, activated, committed, pushed, or published.

## References

[1]: /home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json  
[2]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_SCHEMA_BLUEPRINT.md  
[3]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_REGISTRY_FINAL.md  
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DOMAIN_MAPPING_DECISION.md  
[5]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_REVIEW_DECISION_LOG.md
