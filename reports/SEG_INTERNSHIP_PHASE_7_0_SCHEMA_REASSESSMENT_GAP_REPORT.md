# SEG Internship Phase 7.0 — Schema Reassessment Gap Report

**Mode:** `READ_ONLY SCHEMA REASSESSMENT`

**Purpose:** Reclassify the original Phase 7.0 gaps under the declared Medical Authority Model without changing the canonical manifest, creating production records, or granting clinical/rights approval.

## 1. Reclassification principle

The Medical Authority Model provides a declared Project Owner / Medical Decision Owner for the educational scope, treats books as Reference Frameworks, and treats SEG-authored explanations as Original Educational Content when they are not literal reproductions. These decisions change the interpretation of ownership and rights classification. They do not change the closed-world schema, populate missing field values, create source-level audit events, or authorize display of verbatim source material.

The following table distinguishes true schema-contract blockers from record-preparation gaps.

## 2. True blocking schema gaps

| Gap | Affected domains | Why it remains a schema gap | Required future action |
|---|---|---|---|
| No canonical `case` content type | Clinical Case | The canonical manifest enum includes `book`, `question_bank`, and `lesson`, but not `case`; root and nested `additionalProperties=false` prevent an undeclared case extension. | Obtain a separately authorized Clinical Case contract/manifest-extension decision or an explicitly approved mapping to an existing canonical type. Do not change the manifest in this reassessment. |
| No canonical `skill` content type | Skills / Procedures | The canonical manifest enum includes no `skill`; competency fields cannot be added as undeclared root properties under the closed-world contract. | Obtain a separately authorized Skills/Procedures contract/manifest-extension decision or an explicitly approved mapping to an existing canonical type. Do not treat a framework or logbook as a competency record. |
| Generic `reference` is not a canonical type | Reference / Book when modeled as generic Reference | The current enum contains `book` but not generic `reference`. The Reference Framework can be represented only if the target is explicitly `book` or another approved canonical type. | Use `book` only where the contract supports it, or obtain a separate contract decision for generic Reference. No generic enum was added here. |

## 3. Non-blocking schema-preparation gaps

These items do not demonstrate that the canonical envelope is structurally unable to support Lesson, Question Bank, or Book. They show that candidate records are not yet populated or validated for a later controlled preparation step.

| Gap | Affected domains | Revised interpretation | Required future action |
|---|---|---|---|
| Record-level owner/publisher and access metadata | All domains | The Project Owner authority resolves the governance-owner ambiguity for the educational scope, but it does not replace the schema-required `source.publisher_or_owner` and `source.accessed_at` values. | Populate each record from attributable source evidence; do not infer from filenames or repository location. |
| Governed version value | All domains | SHA-256 preserves file identity but is not itself a governed version value. | Supply a source-supported version/release value and reconcile it to the preserved SHA. |
| Reference locators and supported claims | All domains with references | Books may be used as Reference Frameworks, and SEG-authored explanations may cite them, but the schema still requires a reference locator and supported claim list. | Add exact page/section/question/case locators during a future authorized preparation step. |
| Rights object and display scope | All domains | Original SEG-authored explanations may use the internal Original Educational Content classification for planning. Literal PDF, image, or book-text display remains separately rights-gated. | Record the applicable rights fields for every record. For verbatim material, complete the external rights/display review before learner exposure. |
| Medical review object | All domains | The Medical Decision Owner is an available authority, but the reassessment does not create per-source clinical decisions, dates, or review events. | Conduct and record source-linked clinical/relevant review with reviewer, decision, and date. This is separate from schema compatibility. |
| Track and taxonomy values | All domains | The pathway boundary `SEG Internship Doctor Pathway` / `02_Internship` is approved at scope level, but source-level taxonomy IDs and versions remain unpopulated. | Confirm per-source track, branch, taxonomy ID, and taxonomy version through the approved taxonomy process. |
| Append-only audit events | All domains | Owner authority does not create historical audit events automatically. | Record attributable intake, classification, mapping, review, and decision events with actor, role, timestamp, source IDs, and evidence links. |
| Question-level structure | Question Bank | `question_bank` is a supported canonical type, but this dry run did not create item-level records. | In a separately authorized preparation phase, extract only existing question text, ordered options, answer, explanation, difficulty, references, and locators. Do not reconstruct from UI or parser code. |
| Book version and exact locator | Reference / Book | `book` is a supported canonical type, but Reference Framework status does not populate version, page/chapter locator, or display scope. | Prepare source-linked book metadata and preserve the separate verbatim Rights Gate. |

## 4. Domain disposition

| Domain | Revised disposition | Schema-only reason |
|---|---|---|
| Lesson | `CONDITIONALLY_COMPATIBLE` | Existing `lesson` enum and common envelope support the target; record values remain to be populated. |
| Question Bank | `CONDITIONALLY_COMPATIBLE` | Existing `question_bank` enum and envelope support the target; item-level structure remains uninstantiated. |
| Clinical Case | `BLOCKED_SCHEMA_TYPE` | No canonical `case` enum under the closed-world manifest. |
| Skills / Procedures | `BLOCKED_SCHEMA_TYPE` | No canonical `skill` enum under the closed-world manifest. |
| Reference / Book | `CONDITIONALLY_COMPATIBLE_AS_BOOK` | Existing `book` enum can carry the reference-framework target; generic `reference` remains unsupported. |

## 5. Required future actions

The next permitted action is a separately authorized contract and manifest-extension review for Clinical Case and Skills/Procedures. That review must preserve backward compatibility, source identity, SHA linkage, lineage, and professional-track separation. It must not be treated as an import or activation authorization.

For the conditionally compatible domains, a future preparation step may populate schema-required values from existing evidence only. It must preserve the distinction between SEG-authored explanations and verbatim source material, and it must keep external rights/display review separate from the structural check.

A future clinical/relevant review may be performed by the declared Medical Decision Owner or another attributable qualified reviewer through the governed workflow. The present reassessment does not record per-source clinical approvals. A future rights review remains required for any literal display of source text, PDF pages, images, questions, or book excerpts.

## 6. Gate implication

The revised assessment remains **`BLOCKED_PENDING_SCHEMA_GAPS`** because `case` and `skill` are absent from the canonical closed-world enum and generic `reference` is not a declared type. This status is narrower than the original result: ownership ambiguity and the broad rights interpretation no longer block Lesson, Question Bank, or Book at the type/envelope level, but missing record values and independent review remain preparation gates.

## References

[1]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DECISION_OWNER_APPROVAL.md "SEG Internship Decision Owner Approval"
[2]: /home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "Canonical SEG Manifest Schema"
[3]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_7_0_SCHEMA_REVALIDATION_RESULTS.md "Original Phase 7.0 Schema Revalidation Results"
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_TYPE_CONTRACT.md "SEG Internship Content Type Contract"
[5]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_EXTENDED_CONTENT_CONTRACTS.md "SEG Internship Extended Content Contracts"

**Non-action confirmation:** No JSON, schema conversion, schema mutation, production record, import, activation, publication, learner exposure, database change, application change, source rewrite, deletion, rename, merge, archive, commit, or push was performed.

