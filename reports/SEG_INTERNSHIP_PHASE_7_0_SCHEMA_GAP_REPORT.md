# SEG Internship Phase 7.0 — Schema Gap Report

**Mode:** `READ_ONLY SCHEMA VALIDATION`

**Purpose:** Record structural and evidence gaps identified during the authorized dry run. This report is not a schema migration plan, production conversion, clinical review, rights decision, or activation record.

## 1. Blocking gaps

The following gaps block schema preparation for the current 48-candidate package:

| Gap | Affected domains | Evidence basis | Required closure |
|---|---|---|---|
| Missing governed owner/publisher and source access metadata | All five domains | The manifest preserves source IDs, paths, and SHA-256 values but does not close `publisher_or_owner` and `accessed_at` for each candidate. | Supply attributable owner/publisher evidence and source-access metadata; do not infer from filenames or repository location. |
| Missing governed version values | All five domains | SHA-256 linkage is present, but version values are absent, partial, or only suggested by source naming. | Provide a source-supported version/release record and reconcile it to the immutable SHA. |
| Missing reference linkage and exact locators | Lesson, Question Bank, Clinical Case, Skills / Procedures, Reference / Book | The contracts require references with locators and supported claims; candidate rows do not close these record-level fields. | Identify exact file/page/heading/question/case/section locators and supporting references before any future conversion. |
| Rights and display-permission evidence is not closed | All five domains | Existing package does not supply complete text, image, question, PDF/reference, license, or display-scope decisions. | Complete the separate rights-review handoff and record attributable decisions; schema validation cannot substitute for rights review. |
| Independent clinical/relevant review is not closed | All five domains | Current state remains pending/not approved; no dry-run result can grant clinical approval. | Obtain qualified reviewer assignment, decision, date, and cited locators through the governed review process. |
| Per-source track and taxonomy ID/version are not closed | All five domains | The pathway context is provisional; `02_Internship`, taxonomy ID, and taxonomy version require record-level evidence. | Confirm the Internship pathway and source-level taxonomy without deriving values from folders or filenames. |
| Append-only audit events are incomplete | All five domains | Audit bootstrap preparation exists, but completed attributable intake/classification/mapping/review events are not fully supplied for every candidate. | Record attributable events with actor, role, timestamp, source IDs, evidence links, and decision references. |
| Canonical type handling is unresolved for three domains | Clinical Case; Skills / Procedures; Reference / Book | The closed-world canonical manifest contains no `case`, `skill`, or generic `reference` enum. | Obtain a separately authorized contract/manifest-extension decision before any schema preparation involving these domains. |
| Duplicate and lineage closure is incomplete for designated families | Clinical Case and relevant Drug/ Emergency candidates | `DUP-DRUG-001`, `DUP-EMERGENCY-001`, and `SRC-0078` relationships are preserved but do not constitute canonical production selection or complete namespace closure. | Complete the attributable duplicate/lineage decisions and preserve all historical identifiers. |

## 2. Domain-specific blocking gaps

### 2.1 Lesson

The Lesson candidate set cannot pass because record-level title, language, source owner, version, exact locator, references, rights, reviewer decision, source-level taxonomy, and audit evidence are not consistently closed. The future lesson contract also requires pathway, level, module, specialty, and topic evidence. A topic or folder location is not sufficient to establish any of these fields.

### 2.2 Question Bank

The Question Bank candidates cannot pass because the dry run did not create item records and therefore cannot confirm complete question text, ordered options, answer key, explanation, difficulty, reference locator, specialty/topic mapping, rights, review, or audit. UI code, parser code, or a partial object cannot be used to reconstruct absent question data. The source and implementation artifacts must remain separate.

### 2.3 Clinical Case

Clinical Case candidates cannot pass because the canonical manifest has no `case` enum and the candidate contract requires separately evidenced presentation, assessment, reasoning, management, references, case type, specialty/topic, pathway, review, rights, and audit. Duplicate-family preservation is not canonical selection. Any future case handling requires an authorized contract/extension path.

### 2.4 Skills / Procedures

Skills / Procedures candidates cannot pass because the canonical manifest has no `skill` enum and the candidate material does not establish a complete skill identity, category, required level, teaching material locator, assessment method, competency boundary, reviewer status, rights, taxonomy, or audit trail. A framework, logbook, or OSCE concept must not be treated as a completed competency record.

### 2.5 Reference / Book

Reference / Book candidates cannot pass because the package does not close author/publisher, governed version, exact locator, rights status, display scope, explicit track/taxonomy, review, or audit. The presence of a PDF or Markdown source does not establish learner-display permission. Generic Reference handling remains outside the canonical manifest enum; `book` requires separate evaluation.

## 3. Non-blocking or preparatory gaps

The following items do not by themselves invalidate the documentation-only dry run, but they must be resolved before a future schema-preparation attempt:

1. Record-level titles and language values need source-by-source confirmation.
2. Source locator granularity must be standardized without changing source text.
3. The mapping vocabulary for pathway branch, module, specialty, and topic should be confirmed against the approved taxonomy contract.
4. The distinction between source artifacts and implementation artifacts should be retained in a reconciled manifest view.
5. Output hashes and audit references should be recorded after each governed review package is finalized.
6. Any future extension for Clinical Case, Skills / Procedures, or Reference / Book must preserve closed-world compatibility and backward-compatibility analysis.

## 4. Required future actions

The next permitted actions are evidence and governance actions only:

1. Rights reviewer completes text, image, question, PDF/reference, and display-scope review.
2. Clinical/relevant reviewer completes independent content-accuracy and safety review with explicit decisions and locators.
3. Decision Owner confirms the internal pathway, contract, duplicate, and lineage decisions with attributable audit metadata.
4. Source custodians supply owner/publisher, version, access, and reference-locator evidence.
5. Taxonomy authority confirms source-level `02_Internship`, pathway branch, taxonomy ID, and taxonomy version.
6. Audit authority reconciles all source IDs, paths, SHA-256 values, events, actors, roles, timestamps, and evidence links.
7. A separately authorized contract review addresses the missing canonical enums/extensions before any production schema work.
8. Only after these gates close may a future task request another dry run or schema-preparation review. No import, activation, publication, or learner exposure is implied.

## 5. Gap conclusion

The dry run is complete as a read-only assessment, but the candidate package remains **blocked pending schema gaps**. The gaps are evidence, governance, and canonical contract gaps rather than a license to infer or repair medical content. No source was altered and no production artifact was created.

## References

[1]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_7_0_SCHEMA_REVALIDATION_RESULTS.md "Phase 7.0 Schema Revalidation Results"
[2]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_REVALIDATION_ARTIFACT_MANIFEST.md "SEG Internship Revalidation Artifact Manifest"
[3]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_TYPE_CONTRACT.md "SEG Internship Content Type Contract"
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_SCHEMA_BLUEPRINT.md "SEG Internship Content Schema Blueprint"
[5]: /home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "Canonical SEG Manifest Schema"

**Non-action confirmation:** No JSON, import, schema conversion, database change, application change, activation, publication, source rewrite, deletion, rename, merge, archive, commit, or push was performed.
