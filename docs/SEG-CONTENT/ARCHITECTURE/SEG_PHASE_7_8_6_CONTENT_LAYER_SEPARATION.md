# SEG Phase 7.8.6 — Content Layer Separation

**Mode:** Read-only governance review
**Validated at:** `2026-08-21T11:56:14Z`
**Final readiness assessment:** `BLOCKED_PENDING_EVIDENCE`

## Separation decision

The evidence package supports a conservative separation of five categories. The categories are analytical labels only. They do not grant ownership, create records, approve medical content, or authorize import. Any item that combines local synthesis with external inputs remains **Mixed Educational Content** until object-level lineage can separate its components.

## A. SEG Original Educational Layer

The strongest evidence for this layer is the Arabic understanding pass. It states that every one of the 293 textbook lessons has a short Arabic explanation focused on emergency reasoning and that the notes are generated understanding explanations rather than literal translations.[3] The master textbook build also describes a project-built lesson structure with English core concepts, recognition/diagnosis, emergency-department management, pearls, traps, optional algorithms, Arabic notes, source badges, and visual support.[2]

The correct current classification is **provisional SEG Original Educational Layer**, not approved SEG-owned content. The evidence does not include a per-note authorship ledger, source-to-note lineage, signed owner decision, clinical reviewer decision, or rights record. These notes may be candidates for a future `lesson` educational layer after candidate-level review; they must not be promoted or published from this document alone.

## B. Mixed Educational Content

The master textbook build explicitly states that it integrates project database topics, flashcards, numericals, algorithms, exam traps, antidotes, visual assets, a named Emergency Medicine manuscript, Rosh Rapid Review support, and external verification/source links.[2] This is direct evidence of a mixed assembly context. It should remain separated from the provisional SEG Original layer until each lesson component can be traced to its local or external origin.

Mixed content is not eligible for an ownership shortcut. The required future review must identify which text or explanation was authored locally, which element is derived from an external source, which visual is externally sourced, and which reference relationship supports the item. Without that crosswalk, the target remains a future `lesson` candidate with `MIXED_EDUCATIONAL_CONTENT` and pending provenance, clinical, rights, taxonomy, version, and locator states.

## C. External Reference-Based Content

The package names the Emergency Medicine manuscript, Rosh Rapid Review PDF support, LITFL links, MDCalc links, an UpToDate verification placeholder, AHA ACLS, ACEP, WHO, Jordanian Ministry of Health protocols, local hospital protocols, and poison-center references.[1][2] These signals must remain in the external/reference layer unless explicit evidence establishes a separately authored local educational explanation and a lawful display/use scope.

The documents do **not** explicitly evidence Tintinalli, Rosen, HIPPO, FRCEM, or Oxford. Those frameworks must not be added to a relationship record from memory, topic similarity, or prior project assumptions. Rosh is explicitly mentioned as support, but the package still lacks complete version, locator, rights, and display evidence. External material therefore remains `RIGHTS_PENDING`, `VERSION_PENDING`, and `LOCATOR_PENDING`, with clinical review also pending where the material informs high-risk instruction.

## D. Visual Assets

`PDF_VISUAL_MAPPING_SYSTEM.md` documents a separate visual pipeline using structured metadata, an extracted asset directory, topic-matched rendering, and an admin review route.[6] It reports 542 clinically useful visual assets and states that every asset is initially marked `needsReview: true`. The filtering rules remove front matter, copyright/front matter pages, tables of contents, logos, ornaments, blank pages, and unrelated pages, but filtering is not a rights clearance decision.

Visual assets must remain separate from textual lesson provenance until each asset has a source page, visual type, proposed section, rights/display determination, clinical visual review, and final display decision. The current v1.1 content contract does not by itself establish a visual-asset record or license contract. No visual asset is treated as publishable or learner-exposed by this report.

## E. Medical Governance Documents

`FINAL_MEDICAL_CONTENT_AUDIT.md`, `CONTENT_SOURCES.md`, and `FINAL_SCOPE.md` are governance and scope evidence, not learner-facing medical content.[1][4][5] The audit explicitly lists high-risk review domains and requires qualified clinical reviewers, local protocol alignment, and additional release checks. It also states that the platform must not be marked final until critical pages receive medical sign-off and other technical, visual, and rights-related gates pass.[4]

These documents may be attached to audit lineage and review preparation, but they must not be mapped as `lesson`, `question_bank`, `clinical_case`, or `clinical_skill` records. They do not themselves close clinical approval, rights clearance, or activation authorization.

## Controlled separation matrix

| Layer | Evidence-supported status | v1.1 handling | Required state before any future transformation |
|---|---|---|---|
| SEG Original Educational Layer | Provisional; strongest evidence is generated Arabic understanding notes and project-described lesson structure. | Future `lesson` candidate layer only; no separate Arabic content type is inferred. | Owner/authorship evidence, source/version/locator, clinical review, taxonomy, rights/display review, audit event. |
| Mixed Educational Content | Explicitly evidenced by the textbook build's integration of local data, manuscript, Rosh support, external links, and visuals. | Future `lesson` candidate with mixed-origin metadata; external elements remain separate relationships. | Object-level lineage and component separation, clinical review, rights review, taxonomy, version, locators. |
| External Reference-Based Content | Explicit source signals exist, but rights/version/locator evidence is incomplete. | `book` and `reference_framework` only when explicit relationship records are later prepared. | Source identity, edition/version, exact locator, rights/display scope, reviewer, audit, and authorization. |
| Visual Assets | 542 assets documented with `needsReview: true`; first-pass mapping only. | Separate visual layer or future explicit asset contract; not a direct v1.1 content record. | Asset-level source/page, rights, clinical visual review, display decision, reversible mapping. |
| Medical Governance Documents | Process and scope evidence, not learner content. | Audit/provenance attachments only; no content type assignment. | Signed decisions where required; never treated as clinical approval by itself. |

## Readiness assessment

The correct final assessment is `BLOCKED_PENDING_EVIDENCE`. The package improves evidence quality and makes the content-layer separation more explicit, but it does not close the Phase 7.8.5 blockers for candidate-level source/version/locator, ownership, rights/display, taxonomy/pathway authorization, independent clinical review, ID/schema compatibility, or Phase 7.9 authorization.

## Non-actions

No production JSON was generated. No source text or medical content was rewritten. No schema, application, database, authentication, route, or security boundary was modified. No import, migration, activation, publication, learner exposure, clinical approval, rights clearance, or Phase 7.9 action was performed.


## References

[1]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/CONTENT_SOURCES.md "CONTENT_SOURCES.md"
[2]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/EM_MASTER_TEXTBOOK_BUILD.md "EM_MASTER_TEXTBOOK_BUILD.md"
[3]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/EM_MASTER_TEXTBOOK_ARABIC_COMPLETION.md "EM_MASTER_TEXTBOOK_ARABIC_COMPLETION.md"
[4]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/FINAL_MEDICAL_CONTENT_AUDIT.md "FINAL_MEDICAL_CONTENT_AUDIT.md"
[5]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/FINAL_SCOPE.md "FINAL_SCOPE.md"
[6]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/PDF_VISUAL_MAPPING_SYSTEM.md "PDF_VISUAL_MAPPING_SYSTEM.md"
[7]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_GATE_REPORT.md "SEG_PHASE_7_8_GATE_REPORT.md"
[8]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_5_METADATA_STATE_CLOSURE.md "SEG_PHASE_7_8_5_METADATA_STATE_CLOSURE.md"
