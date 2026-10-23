# SEG Phase 7.8.6 — Provenance Matrix

**Mode:** Read-only governance review
**Validated at:** `2026-08-21T11:56:14Z`
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


## References

[1]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/CONTENT_SOURCES.md "CONTENT_SOURCES.md"
[2]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/EM_MASTER_TEXTBOOK_BUILD.md "EM_MASTER_TEXTBOOK_BUILD.md"
[3]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/EM_MASTER_TEXTBOOK_ARABIC_COMPLETION.md "EM_MASTER_TEXTBOOK_ARABIC_COMPLETION.md"
[4]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/FINAL_MEDICAL_CONTENT_AUDIT.md "FINAL_MEDICAL_CONTENT_AUDIT.md"
[5]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/FINAL_SCOPE.md "FINAL_SCOPE.md"
[6]: file:///home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package/PDF_VISUAL_MAPPING_SYSTEM.md "PDF_VISUAL_MAPPING_SYSTEM.md"
[7]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_GATE_REPORT.md "SEG_PHASE_7_8_GATE_REPORT.md"
[8]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_5_METADATA_STATE_CLOSURE.md "SEG_PHASE_7_8_5_METADATA_STATE_CLOSURE.md"
