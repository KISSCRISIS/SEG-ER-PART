# SEG Legacy Taxonomy Crosswalk

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
