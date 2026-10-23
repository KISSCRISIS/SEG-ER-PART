from pathlib import Path

OUT = Path('/home/ubuntu/seg-internship-output')
OUT.mkdir(parents=True, exist_ok=True)

provenance = r'''# SEG Legacy Provenance Matrix

**Phase:** SEG Phase 7.8.6 — Legacy Knowledge Provenance & Taxonomy Crosswalk  
**Mode:** Read-only analysis  
**Final crosswalk status:** `CROSSWALK_COMPLETE`

## Scope and authority

This matrix is derived from the completed Legacy Knowledge Audit and the eight supplied JSON assets. It records observed provenance signals and required governance actions only. It does not assign clinical approval, rights clearance, ownership, activation, or import authorization.

> A provenance signal is not a governance decision. External labels, internal identifier prefixes, or file names do not prove authorship, license, clinical correctness, or SEG ownership.

## Evidence basis

| Evidence | Location | SHA-256 / status |
|---|---|---|
| Completed Legacy Audit | `/home/ubuntu/seg-internship-output/SEG_LEGACY_KNOWLEDGE_AUDIT_REPORT.md` | Audit status `AUDIT_COMPLETE` |
| Supplied legacy package | `/home/ubuntu/upload/SEG_Legacy_Knowledge_Integration_Audit_PACKAGE.zip` | `cd42010f9c349f1e3783857d19e7ec4db64a98c8fde25eb22b7b2e672df3c6ed` |
| Isolated source workspace | `/home/ubuntu/seg-legacy-knowledge-audit-input/` | Eight JSON files, read-only |
| v1.1 target profile | `/home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json` | `720e748a259536df6ae1b2319717e2d55f6540cf9931d5df05d8a5395a133cf9` |

## Matrix

| Legacy object type | Source origin signal | External reference signal | Possible SEG educational layer | Derived content status | Required reviewer | Rights requirement |
|---|---|---|---|---|---|---|
| `officialUnifiedTopics.json` (40) | Unified topic objects with local fields and `sourceReferences`; origin is mixed at object/section level | Framework/source references are present in every object; external signal is section-specific, not object-wide | Possible local lesson organization and Arabic explanation layer; authorship is not proven by file structure | Derived topic bundle linking facts, traps, numerical facts, algorithms, and antidotes | Medical Owner for each educational section; taxonomy/track reviewer for placement | Required for any external-derived text, images, translations, or displayed references; no verbatim display by default |
| `referenceLibrary.json` (194) | Explicit `source`, chapter, and topic fields with co-located local enrichment | Strongest external-reference signal: source/chapter/locator-like fields and framework-linked IDs | Local key-point, board-logic, question-family, trap, and Arabic fields may be enrichment, but provenance must be split | Derived/reference-backed library; not a single SEG-owned layer | Medical Owner plus independent rights reviewer; reference metadata owner for edition/locator | Required for text, images, tables, source-derived questions, translations/adaptations, and display scope |
| `flashcards.json` (760) | Card IDs, question/answer, source, and optional topic/reference joins; no authorship field | `source` and `referenceId` are present only for subsets; external origin is unresolved per card | Possible SEG assessment presentation layer only after authorship/origin review | Derived exam/active-recall content; three answers are empty | Medical Owner/question-bank reviewer; provenance reviewer for each source join | Required when wording, answer/explanation, or reference display is source-derived |
| `examTraps.json` (415) | `UNI_*` and `DERIVED_*` families plus mixed topic/reference joins | `referenceId`/source in 194 records; framework-linked signals are record-specific | Possible lesson or assessment enrichment; no explicit SEG Original marker | Derived exam intelligence | Medical Owner and assessment reviewer | Required for external-derived trap wording, references, or displayed source material |
| `algorithms.json` (28) | Identifier/name/topic index with sparse topic/reference links | Reference/source linkage in 10 records; no complete source section body | Possible lesson or future clinical-case support only; not a protocol | Derived index metadata; insufficient as a complete v1.1 record | Medical Owner; separate safety reviewer if expanded into educational steps | Required if external algorithm text, figures, or exact steps are displayed |
| `arabicMentorExplanations.json` (367) | Explanation text with topic links; 171 records have reference/source linkage and 196 have topic IDs | Reference-linked subset is explicit; remaining authorship is unresolved | Possible SEG Original Educational Layer only where authorized authorship and non-verbatim evidence exist | Derived/local-language educational layer until authorship is proven | Medical Owner and language/content-origin reviewer | Required for translation/adaptation or source-derived explanations; display scope must be explicit |
| `topicFamilyIndex.json` (99 families) | Local family/index organization with `UNI_*`, `DERIVED_*`, and framework prefixes | Framework-family names and entry prefixes provide reference signals but do not establish ownership | Navigation/taxonomy layer; not learner-facing medical content by itself | Derived index/navigation metadata | Taxonomy owner and Medical Owner for pathway relevance | Assess if external taxonomy labels/structure are reproduced; not a substitute for rights evidence |
| `antidotes.json` (16) | Compact topic-linked index with name and topic ID; no authorship marker | No explicit source field in the objects; origin remains unresolved | Toxicology lesson/question-bank enrichment only | Derived clinical enrichment index | Medical Owner/toxicology reviewer | Required if source-derived wording, tables, or display content is introduced |

## Controlled origin vocabulary

Each future record or section must carry an origin state at the smallest useful granularity: `source_verbatim`, `source_derived`, or `seg_original`, matching the v1.1 source-section vocabulary. A whole-file label is insufficient for mixed files. A `seg_original` label requires explicit authorship evidence and a non-verbatim determination; it cannot be inferred from a local filename, language, or internal ID.

External frameworks remain reference frameworks only. A future `book` record plus `relationships.reference_framework` may identify a framework, but it must preserve the exact locator policy, display scope, version, rights state, and source identity. No ownership claim is made in this matrix.

## Required next evidence

Before any adapter dry run, SEG needs an explicit source crosswalk, record-level or derivation-level version/checksum policy, exact locators, taxonomy version, pathway decision, Medical Owner review evidence, and an independent rights review. Missing evidence must remain pending rather than be filled by inference.

## Non-actions

No source was modified, rewritten, deleted, merged, or imported. No production JSON, database change, schema change, activation, publication, or clinical approval was created by this matrix.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_LEGACY_KNOWLEDGE_AUDIT_REPORT.md "Completed Legacy Knowledge Audit"
[2]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/officialUnifiedTopics.json "Supplied officialUnifiedTopics source"
[3]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/referenceLibrary.json "Supplied referenceLibrary source"
[4]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/flashcards.json "Supplied flashcards source"
[5]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/examTraps.json "Supplied examTraps source"
[6]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/algorithms.json "Supplied algorithms source"
[7]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/arabicMentorExplanations.json "Supplied Arabic explanations source"
[8]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/topicFamilyIndex.json "Supplied topic family index"
[9]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/antidotes.json "Supplied antidote index"
[10]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 schema"
'''

taxonomy = r'''# SEG Legacy Taxonomy Crosswalk

**Phase:** SEG Phase 7.8.6 — Legacy Knowledge Provenance & Taxonomy Crosswalk  
**Mode:** Read-only analysis  
**Final crosswalk status:** `CROSSWALK_COMPLETE`

## Scope and pathway boundary

This document maps the observed `topicFamilyIndex.json` families to controlled SEG taxonomy and pathway relevance. It does not assign a production taxonomy value, activate a pathway, or approve a medical topic. Relevance labels are planning classifications and must be reviewed by the Medical Owner and pathway authority.

The existing SEG boundary used for this crosswalk is: **Internship Doctor Pathway** for foundational emergency and rotation-linked education, and **Emergency Medicine Resident Pathway** for advanced emergency medicine and board-preparation content. Board preparation is treated as a resident-pathway branch, not a third independent pathway. No family is moved between tracks solely because of its filename or framework prefix.

## Observed taxonomy evidence

`topicFamilyIndex.json` contains 99 family objects with `family`, `entries`, and `count`. The observed families include airway/intubation, resuscitation, cardiovascular/chest pain, shock/sepsis, trauma, toxicology, neurology/stroke/seizures, respiratory/ventilation, ultrasound, gastrointestinal/renal, infectious disease, obstetrics/pediatrics, environmental/ENT/dermatology, psychosocial/ethics, and procedural sedation. Framework prefixes in the entries include `tint`, `rosen`, `hippo`, and `frcem`, alongside `UNI` and `DERIVED` families.[1] [2]

## Domain crosswalk

| Observed legacy domain families | SEG taxonomy domain proposal | Internship relevance | Resident relevance | Board-review relevance | Controlled status |
|---|---|---|---|---|---|
| Airway Failure / Intubation; Resuscitation; Cardiac Arrest / ROSC / TTM; ETCO2 / Capnography; RSI / Paralytics / Sedation physiology | `emergency.airway_resuscitation` | High for emergency basics and supervised foundational skills | High for advanced resuscitation, airway strategy, and critical-care reasoning | High because resuscitation and airway are recurring assessment domains | Candidate mapping; competency and protocol boundaries remain open |
| ACS / Chest Pain / Cardiovascular Risk Stratification; Cardiovascular Disorders; Dysrhythmias; Aortic Dissection; Pulmonary Embolism; Cardiogenic Shock | `emergency.cardiovascular` | High for chest-pain and acute-care foundations | High for advanced differential diagnosis and critical-care decisions | High for board-style diagnosis and management questions | Candidate mapping; source/reference separation required |
| Infectious Disease / Sepsis; Septic Shock; Systemic Infectious Disorders; Tropical Medicine | `emergency.infectious_sepsis` | High for common emergency presentations and initial management | High for shock, sepsis complexity, and critical care | High for high-yield assessment and framework-linked review | Candidate mapping; clinical review required |
| Trauma; Hemorrhagic Shock / MTP; Orthopedics / Fractures; Pneumothorax / Hemothorax; FAST / eFAST | `emergency.trauma` | High for emergency basics and trauma recognition | High for advanced trauma, resuscitation, and ultrasound | High for board review where source support is explicit | Candidate mapping; no protocol/authorization inference |
| Toxicologic Disorders; Toxicology; Toxicology / Antidotes; Toxidromes / Antidotes | `emergency.toxicology` | High for common toxidromes and foundational emergency education | High for complex toxicology and antidote reasoning | High for board-style toxicology questions | Candidate mapping; medical review of every clinical association |
| Nervous System Disorders; Stroke / Brainstem / Dissection; Seizures / Status; Neurology / Resuscitation | `emergency.neurology` | Moderate-to-high for acute neurologic recognition | High for advanced neurologic emergency reasoning | High for time-critical board topics | Candidate mapping; pathway level must be assigned by content complexity |
| Asthma / COPD; Thoracic-Respiratory Disorders; Mechanical Ventilation; Pneumothorax / Hemothorax | `emergency.respiratory_critical_care` | High for basic respiratory emergencies | High for ventilation and critical-care content | High for board review when references and locators are complete | Candidate mapping; algorithms are not protocols by default |
| Point-of-Care Ultrasound; Ultrasound Signs / Views; FAST / eFAST | `emergency.point_of_care_ultrasound` | Foundational exposure may be relevant, but not a competency record | High for advanced skills and diagnostic integration | Moderate-to-high for board preparation | Candidate mapping; no competency sign-off or authorization |
| GI / Abdominal; GI Bleed; Abdominal and Gastrointestinal Disorders; Renal Colic / Urinary; Renal and Genitourinary Disorders; Mesenteric Ischemia | `emergency.gastrointestinal_genitourinary` | High for core rotations and common emergency presentations | High for complex abdominal/renal differentials | High for board-style workups and management | Candidate mapping; taxonomy normalization needed |
| Paediatrics / Neonatal; Pediatrics; Pediatric Airway; Pediatric ID; Pediatric Orthopedics; Pregnancy / OB; Obstetrics / Resuscitation | `emergency.pediatrics_obstetrics` | High for internship rotation-linked emergency foundations | High for advanced pediatric/obstetric emergency branches | High for board review when level and references are explicit | Candidate mapping; pathway and clinical review required |
| Environmental Emergencies; HEENT / Eye Emergencies; Dermatology Emergencies; Foreign Body / Button Battery / Caustic; Abuse and Assault | `emergency.special_populations_environmental` | Moderate-to-high for common emergency basics | Moderate-to-high for advanced consultative reasoning | Moderate-to-high depending on source support | Candidate mapping; avoid overbroad family merges |
| Procedural Sedation / Analgesia; Analgesia, Anesthesia, and Procedural Sedation; Trauma / Anesthesia | `emergency_procedures_sedation` | Foundational educational exposure only | High for advanced procedural reasoning | Moderate-to-high for board review | Candidate mapping; not a sign-off or authorization record |
| Social / Ethics / Systems; Psychosocial Disorders; Special Situations | `emergency_ethics_psychosocial_systems` | Relevant to internship practice foundations | Relevant to resident systems/ethics scope | Variable board relevance; review case-by-case | Candidate mapping; clinical and pathway review required |
| Cardiovascular / Devices; Eye / Trauma; mixed cross-domain families | `emergency_cross_domain` | Case-by-case | Case-by-case | Case-by-case | Do not force into one domain without topic-level review |

## Pathway crosswalk rules

| Evidence pattern | Internship pathway relevance | Resident pathway relevance | Board-review relevance | Decision state |
|---|---|---|---|---|
| Core emergency recognition, initial assessment, common chest pain, sepsis, airway basics, common toxicology, foundational pediatric/OB emergencies | Candidate | Candidate only if complexity exceeds intern scope | Candidate | `PENDING_MEDICAL_OWNER_LEVEL_REVIEW` |
| Advanced resuscitation, ventilation, complex shock, trauma systems, POCUS integration, procedural sedation reasoning, difficult differential diagnosis | Limited/foundational subset only | Strong candidate | Strong candidate | `PENDING_RESIDENT_SCOPE_REVIEW` |
| Framework-linked `tint`/`rosen`/`hippo`/`frcem` entries or question-family signals | Can support intern review only after level assignment | Can support resident/board review if content complexity and references are explicit | Candidate, not automatic | `PENDING_REFERENCE_AND_LEVEL_REVIEW` |
| `UNI_*` or `DERIVED_*` entries without source/version/track metadata | No automatic pathway assignment | No automatic pathway assignment | No automatic board assignment | `BLOCKED_PENDING_PROVENANCE` |

## Taxonomy controls

The 99-family index must not become the v1.1 taxonomy object directly. A future taxonomy adapter must define a stable `taxonomy_id`, `taxonomy_version`, family normalization/alias rules, cross-domain handling, and explicit professional-track assignment. Duplicate names such as non-traumatic musculoskeletal variants must be resolved in the taxonomy contract, not silently merged in source files.

The same topic may support multiple tracks through separate educational layers, but resident-level content must not be silently placed in the Internship pathway. Framework prefix alone cannot determine educational level. Content complexity, intended learning objective, and Medical Owner review are required.

## Non-actions

No taxonomy value was activated, no pathway assignment was approved, no source content was edited, and no JSON, schema, database, adapter, import, or publication artifact was created.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_LEGACY_KNOWLEDGE_AUDIT_REPORT.md "Completed Legacy Knowledge Audit"
[2]: file:///home/ubuntu/seg-manus-status/SEG_PHASE_7_8_6_TAXONOMY_EVIDENCE.txt "Deterministic taxonomy evidence"
[3]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/topicFamilyIndex.json "Supplied topic family index"
[4]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 schema"
'''

layers = r'''# SEG Legacy Content Layer Separation

**Phase:** SEG Phase 7.8.6 — Legacy Knowledge Provenance & Taxonomy Crosswalk  
**Mode:** Read-only analysis  
**Final crosswalk status:** `CROSSWALK_COMPLETE`

## Separation principle

The supplied legacy package is mixed-origin. A single file or object may contain external reference signals, local educational organization, and derived exam intelligence at the same time. Therefore, SEG must separate provenance **by object or section**, not label an entire file as SEG Original or external-owned.

## Layer model

| Layer | Definition | Observed legacy evidence | Allowed SEG relationship | Governance boundary |
|---|---|---|---|---|
| **Layer A — External Reference Knowledge** | Knowledge signals tied to books, frameworks, chapters, source labels, or reference-linked objects | `referenceLibrary.source`, chapter fields, `sourceReferences`, `referenceId`, and `tint`/`rosen`/`hippo`/`frcem` entry families | `book` plus `relationships.reference_framework`; references attached to lessons/question banks when exact locators exist | Reference-only by default; no ownership claim, no verbatim display, rights and version review required |
| **Layer B — SEG Original Educational Layer** | Locally authored, non-verbatim explanation or organization with explicit authorship evidence | Possible Arabic explanations, unified topic organization, board-logic fields, and local bundling | Lesson sections or derived educational layer only when authorship and review are explicitly evidenced | Filename, language, `UNI_*`, or local structure alone is insufficient to mark `seg_original` |
| **Layer C — Derived Exam Intelligence** | Content assembled, indexed, or derived for recall and assessment use | `flashcards`, `examTraps`, `highYieldFacts`, numerical facts, question families, and `DERIVED_*` identifiers | `question_bank` candidates and lesson enrichment | Must retain source joins, missing fields, review state, and rights state; derived does not mean approved |
| **Layer D — Navigation/Index Metadata** | Organization used to find, group, or relate content rather than teach it directly | `topicFamilyIndex`, topic IDs, algorithm index, antidote index, and optional source-file/batch fields | Taxonomy support and relationships only | Not a standalone learner-facing v1.1 content record; taxonomy/version and pathway review required |

## File-to-layer assignment

| Source | Layer A | Layer B | Layer C | Layer D | Separation action |
|---|---|---|---|---|---|
| `officialUnifiedTopics.json` | `sourceReferences`, framework signals | Possible Arabic/local organization | Facts, traps, numerical facts, algorithms, antidotes as derived sections | `topicId` and specialty grouping | Decompose object into section-level origin/state fields |
| `referenceLibrary.json` | Source/chapter/related reference fields | Possible local key points, board logic, Arabic explanations | Related traps, keywords, question families, algorithms | IDs and batch grouping | Split book/reference metadata from local enrichment before any display |
| `flashcards.json` | Card source/reference fields | No proven authorship layer | Question/answer/yield cards | `cardId`, `topicId`, `sourceFile` | Preserve card IDs; validate question-bank fields and explicit joins |
| `examTraps.json` | Reference-linked subset | No proven authorship marker | Trap text and `DERIVED_*`/`UNI_*` families | Topic/reference IDs | Keep trap as enrichment; do not create a new content type |
| `algorithms.json` | Reference/source links where present | No proven authored body | Algorithm name/index association | IDs and topic links | Retain as index; do not interpret as a clinical protocol |
| `arabicMentorExplanations.json` | Reference-linked subset | Possible local-language educational layer | Topic-derived explanation layer | Topic/reference IDs | Require authorship and source-support decision per object |
| `topicFamilyIndex.json` | Framework-prefixed entries | Local taxonomy organization | Derived family groupings | Primary navigation index | Keep outside content records; map only through taxonomy contract |
| `antidotes.json` | No explicit source field observed | No proven authorship | Toxicology enrichment index | IDs and topic links | Use only as reviewed enrichment; no standalone record |

## Layer separation rules for future v1.1 mapping

A future adapter should carry origin at section level using the v1.1 source-section vocabulary: `source_verbatim`, `source_derived`, or `seg_original`. When a section is absent or unresolved, it must remain `absent` or `unresolved`; no value should be invented to satisfy a schema.

External reference knowledge must be represented through source/reference fields and, where appropriate, `book` plus `reference_framework`. A framework relationship is not permission to copy a book, table, image, or question. Learner display should remain `reference_only` unless an independent rights decision authorizes a different scope.

Derived exam intelligence must never be treated as a substitute for clinical review. A flashcard answer, trap, algorithm label, or antidote association remains a candidate until a Medical Owner reviews it and the source/rights lineage is documented.

Navigation metadata must not be promoted into medical content merely because it contains topic names. `topicFamilyIndex`, algorithm indexes, and antidote indexes support relationships and taxonomy; they do not satisfy a lesson, clinical case, or clinical skill contract.

## Non-actions

No layer was imported, normalized in place, assigned ownership, clinically approved, rights-cleared, or exposed to learners. No source or schema was modified.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_LEGACY_KNOWLEDGE_AUDIT_REPORT.md "Completed Legacy Knowledge Audit"
[2]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/officialUnifiedTopics.json "Supplied officialUnifiedTopics source"
[3]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/referenceLibrary.json "Supplied referenceLibrary source"
[4]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/flashcards.json "Supplied flashcards source"
[5]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/examTraps.json "Supplied examTraps source"
[6]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/algorithms.json "Supplied algorithms source"
[7]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/arabicMentorExplanations.json "Supplied Arabic explanations source"
[8]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/topicFamilyIndex.json "Supplied topic family index"
[9]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/antidotes.json "Supplied antidote index"
[10]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 schema"
'''

priority = r'''# SEG Legacy Migration Priority Matrix

**Phase:** SEG Phase 7.8.6 — Legacy Knowledge Provenance & Taxonomy Crosswalk  
**Mode:** Read-only prioritization  
**Final crosswalk status:** `CROSSWALK_COMPLETE`

## Priority rule

Priority expresses the order for future controlled transformation **after review**. It is not import authorization, clinical approval, rights clearance, or learner-exposure permission. Every tier preserves original files, IDs, lineage, and unresolved evidence.

## Priority 1 — Ready for controlled transformation after review

| Source | Learning Engine value | Target direction | Preconditions before transformation | Current decision |
|---|---|---|---|---|
| `officialUnifiedTopics.json` (40) | Broad topic-centered organization combining high-yield facts, traps, numerical facts, algorithms, antidotes, Arabic explanations, and source references | `lesson` candidate with section-level enrichment | Source crosswalk, section-level origin, taxonomy/version, pathway level, Medical Owner review, rights review for external-derived sections | `PRIORITY_1_REVIEW_READY_NOT_IMPORT_READY` |
| `flashcards.json` (760) | Direct active-recall/question-bank value | `question_bank` candidate enrichment | Resolve three empty answers, topic/reference joins, source/version, question-bank review, rights/display scope | `PRIORITY_1_REVIEW_READY_NOT_IMPORT_READY` |
| `topicFamilyIndex.json` (99 families) | Foundation for navigation, taxonomy, and learning-engine grouping | Taxonomy support only | Define taxonomy ID/version, aliases, duplicate names, cross-domain policy, and track boundaries | `PRIORITY_1_REVIEW_READY_NOT_IMPORT_READY` |

## Priority 2 — Needs metadata completion

| Source | Learning Engine value | Target direction | Missing evidence or transformation need | Current decision |
|---|---|---|---|---|
| `examTraps.json` (415) | Assessment reinforcement and misconception targeting | `question_bank` or `lesson` enrichment | Per-entry origin, framework/source join, topic taxonomy, Medical Owner review, rights for external-derived wording | `PRIORITY_2_METADATA_PENDING` |
| `arabicMentorExplanations.json` (367) | Local-language accessibility and explanation support | `lesson` enrichment | Authorship status, source support, translation/adaptation rights, reviewer, display scope | `PRIORITY_2_METADATA_PENDING` |

## Priority 3 — Reference-only or future specialized work

| Source | Learning Engine value | Target direction | Why deferred | Current decision |
|---|---|---|---|---|
| `referenceLibrary.json` (194) | High reference context and chapter relationships | `book` plus `reference_framework`; limited enrichment | External source identity, edition/version, exact locators, rights/display scope, separation of local fields | `PRIORITY_3_REFERENCE_ONLY_PENDING_EVIDENCE` |
| `algorithms.json` (28) | Specialized algorithm index | Lesson support or future clinical-case support | No complete algorithm body; no protocol/authorization meaning; medical and rights review needed | `PRIORITY_3_FUTURE_SPECIALIZED_REVIEW` |
| `antidotes.json` (16) | Focused toxicology enrichment | Lesson/question-bank enrichment | No explicit source/authorship fields; clinical verification and pathway placement required | `PRIORITY_3_FUTURE_SPECIALIZED_REVIEW` |

## What enters first

The first controlled transformation work should be a read-only provenance and taxonomy crosswalk for `officialUnifiedTopics`, `flashcards`, and `topicFamilyIndex`. This sequence yields the Learning Engine's topic and recall scaffolding while preserving the distinction between content and navigation metadata. It must not generate production records until the missing source, version, rights, taxonomy, Medical Owner, and audit fields are supplied.

`referenceLibrary` should remain reference-only by default. A future `book` and `reference_framework` representation may identify a framework, but it does not grant a display or reproduction right. External text, tables, images, translated/adapted explanations, and source-derived questions require an independent rights review.

## Required separate phases

The following work must remain separately governed: provenance/source-ID crosswalk; taxonomy and professional-track decision; question-bank clinical review; authorship and translation review for Arabic explanations; reference edition/locator/rights review; specialized clinical review for algorithms and antidotes; and a reversible adapter dry run. None of these decisions is made by this priority matrix.

## Final priority gate

The package is sufficiently evidenced for this crosswalk, so the crosswalk status is `CROSSWALK_COMPLETE`. Integration remains blocked until the evidence gates above are completed. No item is `PRODUCTION_READY` and no item is authorized for import or activation.

## Non-actions

No legacy source was deleted, merged, overwritten, rewritten, clinically corrected, or imported. No production JSON, database write, schema change, application change, activation, publication, or learner exposure occurred.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_LEGACY_KNOWLEDGE_AUDIT_REPORT.md "Completed Legacy Knowledge Audit"
[2]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/officialUnifiedTopics.json "Supplied officialUnifiedTopics source"
[3]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/referenceLibrary.json "Supplied referenceLibrary source"
[4]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/flashcards.json "Supplied flashcards source"
[5]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/examTraps.json "Supplied examTraps source"
[6]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/algorithms.json "Supplied algorithms source"
[7]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/arabicMentorExplanations.json "Supplied Arabic explanations source"
[8]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/topicFamilyIndex.json "Supplied topic family index"
[9]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/antidotes.json "Supplied antidote index"
[10]: file:///home/ubuntu/seg-manus-status/SEG_PHASE_7_8_6_TAXONOMY_EVIDENCE.txt "Deterministic taxonomy evidence"
[11]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 schema"
'''

gate = r'''# SEG Phase 7.8.6 Gate Report

**Phase:** Legacy Knowledge Provenance & Taxonomy Crosswalk  
**Mode:** Read-only analysis  
**Final status:** `CROSSWALK_COMPLETE`

## Gate decision

The Legacy Knowledge Provenance & Taxonomy Crosswalk is complete as an evidence-bounded analytical package. The five reports identify provenance signals, separate external/reference/local/derived/index layers, map observed taxonomy families to SEG pathway relevance, and rank future transformation order.

`CROSSWALK_COMPLETE` does **not** mean `READY_FOR_IMPORT`, `PRODUCTION_READY`, clinically approved, rights-cleared, taxonomy-approved, or activated. It means only that the requested crosswalk reports were generated from the supplied evidence without performing production actions.

## Validation register

| Check | Result | Evidence |
|---|---|---|
| Eight legacy assets accounted for | PASS | Provenance matrix and layer separation cover all eight filenames |
| Topic family evidence | PASS | 99 family objects recorded in `topicFamilyIndex.json`; domain grouping remains analytical |
| v1.1 vocabulary preserved | PASS | Mapping uses only `lesson`, `question_bank`, `book`, `clinical_case`, and `clinical_skill` |
| Pathway separation | PASS | Internship and Resident/Board branch are kept distinct; no automatic assignment from filename/prefix |
| External framework separation | PASS | Tintinalli/Tintin, Rosen, HIPPO, and FRCEM signals remain reference-only pending evidence |
| Origin separation | PASS | Layer A/B/C/D model prevents whole-file ownership claims |
| Missing evidence preserved | PASS | Source IDs, version/checksum policy, locators, rights, taxonomy version, review, and audit remain pending where absent |
| Original source preservation | PASS | No source was modified, deleted, merged, or overwritten |
| Production safety | PASS | No JSON generation, schema modification, database change, import, activation, publication, or learner exposure |

## Remaining blockers

The next integration step remains blocked by absent explicit source crosswalks, per-record or derivation-level version/checksum policy, exact reference locators, independent rights evidence, Medical Owner review decisions, taxonomy version/track authorization, and a separately authorized reversible adapter dry run. These blockers are not closed by the crosswalk.

## Allowed next phase

The next allowed phase is a **controlled provenance and taxonomy mapping dry run** that produces mapping evidence only. It must preserve original IDs and hashes, retain unresolved states, and remain separate from clinical review, rights clearance, adapter implementation, database import, activation, and publication.

## Non-actions

`production_json_created=false`; `schema_modified=false`; `database_import_executed=false`; `migration_executed=false`; `content_rewritten=false`; `clinical_correction_performed=false`; `approval_assigned=false`; `activation_performed=false`; `publication_performed=false`.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_LEGACY_PROVENANCE_MATRIX.md "Legacy provenance matrix"
[2]: file:///home/ubuntu/seg-internship-output/SEG_LEGACY_TAXONOMY_CROSSWALK.md "Legacy taxonomy crosswalk"
[3]: file:///home/ubuntu/seg-internship-output/SEG_LEGACY_CONTENT_LAYER_SEPARATION.md "Legacy content layer separation"
[4]: file:///home/ubuntu/seg-internship-output/SEG_LEGACY_MIGRATION_PRIORITY_MATRIX.md "Legacy migration priority matrix"
[5]: file:///home/ubuntu/seg-internship-output/SEG_LEGACY_KNOWLEDGE_AUDIT_REPORT.md "Completed Legacy Knowledge Audit"
[6]: file:///home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json "SEG_CONTENT_RECORD_V1_1 schema"
'''

files = {
    'SEG_LEGACY_PROVENANCE_MATRIX.md': provenance,
    'SEG_LEGACY_TAXONOMY_CROSSWALK.md': taxonomy,
    'SEG_LEGACY_CONTENT_LAYER_SEPARATION.md': layers,
    'SEG_LEGACY_MIGRATION_PRIORITY_MATRIX.md': priority,
    'SEG_PHASE_7_8_6_GATE_REPORT.md': gate,
}
for name, text in files.items():
    p = OUT / name
    p.write_text(text.strip() + '\n', encoding='utf-8')
    print(p)
