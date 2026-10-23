# SEG Internship Schema Conversion Gap Report

**Phase:** 6.0 — Controlled Schema Dry Run (Non-Production)  
**Mode:** `READ_ONLY CONVERSION SIMULATION`  
**Generated at (UTC):** `2026-08-17T20:07:13Z`  
**Overall decision:** `DRY_RUN_BLOCKED`

## 1. Interpretation

This is a conversion-gap report, not a conversion artifact. It records which field families were observable in the four samples and which contracts or governance evidence prevent a future schema operation. It does not emit JSON, normalize source text, create records, or authorize integration.

## 2. Successful field-level mappings

| Source ID | Domain | Target | What mapped at field level | Remaining block |
|---|---|---|---|---|
| `SRC-0007` | Learning Content | `lesson` | Type-level fields and pathway cues are observable. | Canonical envelope, provenance, rights, taxonomy, review, and audit incomplete. |
| `SRC-0078` | Assessment Content | `question_bank` | Sample item exposes question/options/answer/explanation structure. | Pathway unresolved; source-local ID conflict; references, rights, taxonomy, review, and audit incomplete. |

The word **successful** here means only that a bounded comparison could be made from observed structure. It does not mean schema validation passed, clinical review passed, rights review passed, or import is authorized.

## 3. Failed or unavailable mappings

| Source ID | Domain | Intended target | Result | Gap |
|---|---|---|---|---|
| `SRC-0033` | Clinical Case | Case schema simulation | **Blocked / not run as canonical record** | No `case` enum or authorized case contract; duplicate family and governance unresolved. |
| `SRC-0043` | Reference / Atlas | Reference schema simulation | **Blocked** | No generic `reference` enum or separate book contract; rights/provenance/display scope incomplete. |

## 4. Missing contracts and required schema extensions

| Contract area | Current evidence | Required future action | Current status |
|---|---|---|---|
| Clinical Case | Source has case-thinking sections, but canonical manifest has no `case` enum. | Define and separately authorize a case contract covering case type, presentation, assessment, reasoning, management, references, specialty, topic, pathway, and common governance envelope. | `BLOCKED` |
| Skills / Procedures | Phase 5.10 identifies a skills candidate but no canonical `skill` enum. | Define and separately authorize a skills contract distinguishing frameworks from individual competency/sign-off records. | `BLOCKED` |
| Reference / Atlas | PDF is book-like; canonical manifest has no generic `reference` enum. | Define whether a book-like source may use `book` and specify rights/display/locator requirements, or authorize a separate reference contract. | `BLOCKED` |
| Assessment item references | Question-like fields are visible, but claim-level references and locators are absent. | Define item-level reference/locator requirements and reconcile source-local IDs with inventory Source IDs. | `BLOCKED` |

## 5. Cross-cutting governance blockers

The Phase 5.11 gate remains `BLOCKED_PENDING_GOVERNANCE`. The dry run cannot close or bypass the following gates: per-source owner/publisher and governed version; accessed date and exact locators; rights text/image/display scope; explicit `02_Internship` track and taxonomy ID/version; attributable clinical/relevant review and unresolved-issue disposition; append-only audit events; duplicate governance for `DUP-DRUG-001` and `DUP-EMERGENCY-001`; resolution of the carried-forward unknown/unresolved queues; and separate implementation authorization.

The assessment sample also exposes a source-local `source_id` (`phone-pediatrics-main`) that differs from the provisional inventory ID `SRC-0078`. This is a lineage reconciliation item, not a value to be silently replaced.

## 6. Required next steps before any future conversion dry run

First, close provenance, version, rights, track/taxonomy, references/locators, review, audit, and duplicate evidence independently. Second, authorize the missing case, skills, and reference contracts where needed. Third, prepare an exact governed artifact and run the canonical structural validator against that artifact. Only after a separate implementation authorization may an importer or integration adapter be considered.

## References

[1]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_TYPE_CONTRACT.md "Phase 5.10 content type contract"
[2]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SCHEMA_FIELD_READINESS_MATRIX.md "Phase 5.10 schema field readiness matrix"
[3]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_SCHEMA_MAPPING_PLAN.md "Phase 5.10 source-to-schema mapping plan"
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_5_11_FINAL_GATE_REPORT.md "Phase 5.11 final governance gate"
[5]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_REVIEW_DECISION_LOG.md "Phase 5.9 content review decision log"
