from pathlib import Path
from datetime import datetime, timezone

OUT = Path('/home/ubuntu/seg-internship-output')
OUT.mkdir(parents=True, exist_ok=True)

validated_at = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')

refs = """
## References

[1]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/CONTENT_SOURCES.md "CONTENT_SOURCES.md"
[2]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/EM_MASTER_TEXTBOOK_BUILD.md "EM_MASTER_TEXTBOOK_BUILD.md"
[3]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/EM_MASTER_TEXTBOOK_ARABIC_COMPLETION.md "EM_MASTER_TEXTBOOK_ARABIC_COMPLETION.md"
[4]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/FINAL_MEDICAL_CONTENT_AUDIT.md "FINAL_MEDICAL_CONTENT_AUDIT.md"
[5]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/FINAL_SCOPE.md "FINAL_SCOPE.md"
[6]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/PDF_VISUAL_MAPPING_SYSTEM.md "PDF_VISUAL_MAPPING_SYSTEM.md"
[7]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_GATE_REPORT.md "SEG_PHASE_7_8_GATE_REPORT.md"
[8]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_5_METADATA_STATE_CLOSURE.md "SEG_PHASE_7_8_5_METADATA_STATE_CLOSURE.md"
"""

intake = f'''# SEG Phase 7.8.6 — Legacy Evidence Intake Report

**Mode:** Read-only governance review  
**Validated at:** `{validated_at}`  
**Final readiness assessment:** `BLOCKED_PENDING_EVIDENCE`

## Executive decision

The six-document evidence package adds useful provenance, scope, educational-layer, medical-review, and visual-governance evidence. It does **not** close the candidate-level gates carried forward from Phase 7.8.5. The package is therefore accepted as a governance-review input only; it does not constitute production content, a clinical approval record, rights clearance, a schema migration, or an import authorization.

The conservative decision is `BLOCKED_PENDING_EVIDENCE`. In particular, the documents do not provide a complete source/version/locator crosswalk for the 48 candidates, a signed clinical review decision for high-risk pages, independent rights/display evidence, explicit taxonomy authorization, or an authorized Phase 7.9 run decision.

## 1. Intake inventory

| Evidence file | Observed purpose | Evidence status | Impact on open gates |
|---|---|---|---|
| `CONTENT_SOURCES.md` | Names structured, manuscript, visual, backup, and official verification sources. | `OBSERVED_SOURCE_DECLARATION` | Supports source inventory and verification workflow; does not prove ownership, rights, version, locator, or candidate joins. |
| `EM_MASTER_TEXTBOOK_BUILD.md` | Describes a 293-lesson textbook layer built from a named DOCX and integrated with project and external-support material. | `OBSERVED_BUILD_DESCRIPTION` | Supports structural lesson readiness and identifies a mixed origin; does not close per-lesson provenance, rights, clinical review, or v1.1 metadata. |
| `EM_MASTER_TEXTBOOK_ARABIC_COMPLETION.md` | States that 293 Arabic understanding notes were generated and are not literal translations. | `OBSERVED_LAYER_DESCRIPTION` | Supports separation of an Arabic educational layer; still requires owner/source review and does not prove clinical approval or rights clearance. |
| `FINAL_MEDICAL_CONTENT_AUDIT.md` | Defines high-risk audit domains, release labels, reviewer requirements, and unresolved release gates. | `PROCESS_EVIDENCE_ONLY` | Confirms that medical review remains required; it is not a signed clinical approval record. |
| `FINAL_SCOPE.md` | States owner/admin attribution, core structured sources, manuscript/PDF sources, and product scope. | `OBSERVED_SCOPE_ATTRIBUTION` | Supports declared project scope; owner attribution is not proof of copyright ownership or rights clearance. |
| `PDF_VISUAL_MAPPING_SYSTEM.md` | Describes visual extraction, metadata, admin review, 542 assets, and default `needsReview: true`. | `OBSERVED_VISUAL_WORKFLOW` | Supports a separate visual-governance track; rights, clinical visual review, and final publishing remain open. |

The package archive SHA-256 is `c453ef470bcd0e60e33ab892381f82b2ee060800fbcd40cdd70380c9d00c07c3`. The six extracted files and their individual checksums are preserved in the working evidence record; no source file was changed.

## 2. Evidence review against the requested questions

| Review question | Evidence found | Evidence missing | Phase 7.8.5 impact |
|---|---|---|---|
| Source provenance | Named APP_DATABASE, supplemental summary, EM manuscript, visual PDF, backup manuscript, and official verification sources are documented.[1] | Candidate-level source IDs, versions, exact locators, access dates, and immutable source-to-record joins are not supplied. | `SOURCE/VERSION/LOCATOR` remains blocked. |
| Content ownership classification | The documents distinguish project build material, named manuscript/PDF inputs, and external verification links; the Arabic pass is described as generated, non-literal educational explanation.[2][3] | No rights instrument, authorship ledger, assignment, license, or per-object ownership evidence is supplied. | `OWNER_PENDING` and `RIGHTS_PENDING` remain open. |
| SEG Original Educational Content | The Arabic understanding notes are expressly described as generated notes rather than literal translation; the textbook lesson layer is described as a project build.[2][3] | No signed owner classification at candidate/object level and no independent clinical approval. | Supports a provisional layer label only; does not close governance. |
| Mixed Educational Content separation | The master textbook explicitly combines project database topics, flashcards, algorithms, traps, antidotes, visual assets, a named manuscript, Rosh support, and external source links.[2] | No object-level component lineage separating local synthesis from each external input. | Mixed layer remains review-required. |
| External Reference-Based Content separation | Rosh Rapid Review PDF, LITFL, MDCalc, UpToDate placeholder, AHA, ACEP, WHO, Jordanian Ministry of Health, local hospital, and poison-center references are named.[1][2] | No complete rights/display scope or exact citation locator for each use. Tintinalli, Rosen, HIPPO, FRCEM, and Oxford are not explicitly evidenced in this package. | External/reference rights gate remains blocked. |
| Arabic Mentor Explanation layer | 293 Arabic understanding notes, zero empty notes, and non-literal educational intent are documented.[3] | Per-note source lineage, reviewer decision, translation/authoring ledger, and rights/clinical review are not supplied. | Layer separation is supported; approval remains pending. |
| Master Textbook to SEG lesson mapping readiness | The build describes 293 compact lessons, chapter grouping, learning fields, source badges, Arabic notes, and visual support.[2] | Candidate-level lesson IDs, v1.1 records, source/version/locator fields, taxonomy, review/audit metadata, and explicit pathway assignment are missing. | Structural readiness is supported; import readiness is not. |
| Medical review workflow evidence | The audit defines high-risk review domains and states that qualified clinical reviewers and local protocols are required before release.[4] | No signed per-page or per-candidate clinical decision, reviewer identity, date, or approval record is supplied. | `CLINICAL_REVIEW` remains blocked. |
| Reference framework relationships | Rosh Rapid Review is explicitly named; LITFL, MDCalc, UpToDate, AHA, ACEP, WHO, Jordan MoH, local hospital, and poison-center verification signals are documented.[1][2] | No explicit evidence for Tintinalli, Rosen, HIPPO, FRCEM, or Oxford in these six files; no complete framework relationship records or locators. | Framework mapping remains observed-only and cannot close metadata. |
| Visual asset governance | The visual pipeline, metadata file, asset directory, admin review route, filtering rules, 542 assets, and `needsReview: true` state are documented.[6] | Rights evidence, source-page proof per asset, clinical visual review, final display decisions, and publication authorization are missing. | Visual rights/review gate remains blocked. |

## 3. Impact on Phase 7.8.5 blockers

| Existing blocker | New evidence effect | Closure decision |
|---|---|---|
| Candidate schema compatibility and ID normalization | No candidate record IDs or v1.1-valid record bundle is supplied by the package. | Remains `BLOCKED`. |
| Metadata completeness | The documents name sources and describe layers, but do not provide complete owner, publisher, version, taxonomy, locator, language, rights, reviewer, or audit fields for 48 candidates. | Remains `BLOCKED`. |
| Rights/display review | The package documents external sources and a visual extraction workflow, but no license, permission, or display decision. | Remains `BLOCKED_PENDING_EXTERNAL_EVIDENCE`. |
| Taxonomy/pathway confirmation | Product scope and learning sections are described, but no candidate-level authorized taxonomy/pathway crosswalk is supplied. | Remains `BLOCKED_PENDING_EXTERNAL_EVIDENCE`. |
| Version/locator evidence | Source names and links/signals are present, but exact version and locator evidence is incomplete. | Remains `BLOCKED`. |
| Legacy candidate linkage | The package does not supply explicit `SRC-xxxx` joins to the 48 candidates. | Remains `BLOCKED`. |
| Clinical review | The audit is a workflow/checklist and explicitly requires future qualified review. | Remains `BLOCKED_PENDING_CLINICAL_REVIEW`. |
| Implementation authorization | No document authorizes Phase 7.9. | Remains `BLOCKED`. |

## 4. Governance conclusion

The evidence package strengthens the documentation layer but does not change the lifecycle state of any content record. `FINAL_MEDICAL_CONTENT_AUDIT.md` is evidence that a review process is required, not evidence that the process has been completed. Likewise, the named owner in `FINAL_SCOPE.md` is an observed attribution and must not be converted into a rights or authorship conclusion without explicit supporting evidence.

The Arabic explanation layer may be carried forward as a **provisional SEG educational layer** because the package explicitly describes it as generated, non-literal explanatory text. It remains subject to owner, clinical, provenance, and rights review. The master textbook may be mapped structurally to future `lesson` candidates, but no production record or schema-valid candidate should be created in this phase.

## 5. Non-actions and next allowed phase

No production JSON was generated. No database import, migration, activation, publication, learner exposure, application/schema modification, source modification, content rewriting, clinical approval, or rights clearance was performed. The next allowed phase is a separately authorized evidence-completion and candidate-level provenance/taxonomy review; Phase 7.9 remains neither executed nor authorized.

{refs}
'''

matrix = f'''# SEG Phase 7.8.6 — Provenance Matrix

**Mode:** Read-only governance review  
**Validated at:** `{validated_at}`  
**Readiness assessment:** `BLOCKED_PENDING_EVIDENCE`

## Matrix purpose

This matrix maps the observed legacy documentation evidence to the nearest SEG content layer and the relevant `SEG_CONTENT_RECORD_V1_1` target. It is a **crosswalk for review preparation**, not a transformation instruction. A row marked `lesson`, `book`, or `reference_framework` does not create a record, close a rights gate, or establish clinical approval.

| Legacy evidence | Evidence location | SEG content layer | SEG_CONTENT_RECORD_V1_1 target | Required review state | Provenance and rights limitation |
|---|---|---|---|---|---|
| Source inventory naming APP_DATABASE, supplemental summary, EM manuscript, visual PDF, backup manuscript, and official verification sources | `CONTENT_SOURCES.md` lines 3–26 [1] | Medical Governance / Source Evidence | No direct record; supporting `source`, `version`, `location`, and `references` metadata for later records | `OWNER_PENDING; VERSION_PENDING; LOCATOR_PENDING; RIGHTS_PENDING` | Source names are observed declarations. Candidate-level immutable joins, versions, locators, and rights are absent. |
| Master textbook build based on named DOCX with 293 compact lessons and learning fields | `EM_MASTER_TEXTBOOK_BUILD.md` lines 5–37 [2] | Mixed Educational Content with a possible SEG educational layer | `lesson` candidate family; external relationships may later use `book` plus `reference_framework` | `OWNER_PENDING; VERSION_PENDING; TAXONOMY_PENDING; LOCATOR_PENDING; RIGHTS_PENDING; CLINICAL_REVIEW_PENDING` | The build integrates project data, a named manuscript, Rosh support, external links, and visual assets. Object-level lineage is not supplied. |
| Generated Arabic understanding notes for 293 lessons, explicitly not literal translation | `EM_MASTER_TEXTBOOK_ARABIC_COMPLETION.md` lines 3–26 [3] | SEG Original Educational Layer — provisional | `lesson` language/educational layer; not a separate v1.1 content type | `OWNER_PENDING; CLINICAL_REVIEW_PENDING; RIGHTS_PENDING; LOCATOR_PENDING` | The document supports a generated explanatory layer but does not provide per-note authoring, source, review, or rights records. |
| Medical high-risk audit domains and release-label requirements | `FINAL_MEDICAL_CONTENT_AUDIT.md` lines 1–83 [4] | Medical Governance Documents | No direct content record; review/audit support only | `CLINICAL_REVIEW_PENDING; RIGHTS_PENDING` | This is a checklist and release gate. It does not contain a signed decision or approval event. |
| Project owner/admin attribution, product scope, core sources, and named manuscript/PDF | `FINAL_SCOPE.md` lines 3–21 [5] | Medical Governance / Scope Evidence | No direct record; may support `publisher_or_owner` only after independent verification | `OWNER_PENDING; RIGHTS_PENDING; TAXONOMY_PENDING` | Attribution is not ownership, license, or display permission. Supabase/deployment statements are outside content provenance closure. |
| Rosh Rapid Review PDF text/visual support and named LITFL, MDCalc, UpToDate verification signals | `EM_MASTER_TEXTBOOK_BUILD.md` lines 7–18 [2] | External Reference-Based Content | `book` plus `relationships.reference_framework` where an explicit v1.1 relationship record is later authorized | `RIGHTS_PENDING; VERSION_PENDING; LOCATOR_PENDING; CLINICAL_REVIEW_PENDING` | Only Rosh is explicitly named as a PDF support source in this package. The other signals are not complete citation records. No Tintinalli/Rosen/HIPPO/FRCEM/Oxford relationship is inferred. |
| Visual asset metadata, extracted assets, topic mapping, admin review route, and 542 `needsReview` assets | `PDF_VISUAL_MAPPING_SYSTEM.md` lines 7–67 [6] | Visual Assets | No direct v1.1 content type; future lesson enrichment or separate visual-asset contract only | `RIGHTS_PENDING; CLINICAL_REVIEW_PENDING; LOCATOR_PENDING` | The current v1.1 content types do not by themselves constitute a visual-asset rights/display contract. `needsReview: true` remains open. |
| Official verification references: AHA ACLS, ACEP, WHO, Jordan MoH, local hospital, poison center | `CONTENT_SOURCES.md` lines 18–26 [1] | External Reference Knowledge | `book`/`reference_framework` only when explicit source records and locators are provided | `VERSION_PENDING; LOCATOR_PENDING; RIGHTS_PENDING; CLINICAL_REVIEW_PENDING` | These are verification signals, not new citations and not evidence that any particular lesson used them. |

## Target-boundary findings

The package provides no evidence sufficient to map any item directly to `question_bank`, `clinical_case`, or `clinical_skill`. The master textbook description supports a future `lesson` candidate family, while the named Rosh/PDF and other references support a future `book`/`reference_framework` relationship only after explicit source, version, locator, rights, and review evidence are supplied.

The v1.1 schema remains a closed record contract. These documents are descriptive governance evidence and do not supply the required record fields, do not authorize an adapter, and do not override the pending states in Phase 7.8.5. No missing medical field is inferred from a chapter title, product section, framework name, or owner attribution.

## Required review sequence

The next candidate-level review must preserve the sequence **source → version → governance record → clinical review → approval → activation**. This package supports the first evidence-intake step for some sources, but does not close the remaining version, rights, taxonomy, locator, clinical, or approval gates.

{refs}
'''

separation = f'''# SEG Phase 7.8.6 — Content Layer Separation

**Mode:** Read-only governance review  
**Validated at:** `{validated_at}`  
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

{refs}
'''

(OUT / 'SEG_PHASE_7_8_6_LEGACY_EVIDENCE_INTAKE_REPORT.md').write_text(intake, encoding='utf-8')
(OUT / 'SEG_PHASE_7_8_6_PROVENANCE_MATRIX.md').write_text(matrix, encoding='utf-8')
(OUT / 'SEG_PHASE_7_8_6_CONTENT_LAYER_SEPARATION.md').write_text(separation, encoding='utf-8')
print('created:')
for name in ['SEG_PHASE_7_8_6_LEGACY_EVIDENCE_INTAKE_REPORT.md', 'SEG_PHASE_7_8_6_PROVENANCE_MATRIX.md', 'SEG_PHASE_7_8_6_CONTENT_LAYER_SEPARATION.md']:
    p = OUT / name
    print(f'{p} bytes={p.stat().st_size}')
