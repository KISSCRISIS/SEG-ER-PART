# Phase 7.8.9 Relationship Inventory

Read-only inventory of existing legacy relationships. No candidate links or bridge rows were created.

## Priority file fingerprints

| File | Bytes | SHA-256 |
|---|---:|---|
| `/home/ubuntu/seg-staging-prep-input/SEG_LEGACY_CONTENT_HANDOFF/03_DATA/flashcards/src/data/APP_DATABASE.json` | 2375945 | `bc3429093cc5a32d7727080e03c39e720665dbf925879d8d1bf8c09ffed96996` |
| `/home/ubuntu/seg-staging-prep-input/SEG_LEGACY_CONTENT_HANDOFF/03_DATA/modules/src/data/supplementalSummary.json` | 19829 | `dc8105414667bf3b4aee58efdaa797ef50c5831e4b953a20c7b72d70d3bb8d1d` |

## APP_DATABASE root collections

| Collection | Count | Identity fields observed | Relationship fields observed |
|---|---:|---|---|
| `topics` | 218 | none | topicId=218, sourceObjectIds=178 |
| `officialUnifiedTopics` | 40 | none | topicId=40 |
| `expandedDerivedTopics` | 178 | none | topicId=178, sourceObjectIds=178 |
| `referenceLibrary` | 194 | id=194 | topic=194 |
| `flashcards` | 760 | cardId=760, referenceId=123 | topicId=632 |
| `numericals` | 137 | id=137 | none |
| `algorithms` | 28 | id=28, referenceId=10 | topic=28, topicId=18 |
| `antidotes` | 16 | id=16 | topicId=16, topic=16 |
| `visualSigns` | 29 | id=29, referenceId=29 | topic=29 |
| `examTraps` | 415 | id=415, referenceId=194 | topic=415, topicId=221 |
| `keywords` | 781 | referenceId=781 | topic=781 |
| `arabicMentorExplanations` | 367 | referenceId=171 | topic=367, topicId=196 |
| `topicFamilyIndex` | 99 | none | family=99 |
| `chapterStudyMap` | 137 | none | none |
| `searchIndex` | 978 | id=978 | none |

## Explicit legacy-to-legacy relationships in `expandedDerivedTopics`

| Measure | Value |
|---|---:|
| Derived topic objects | 178 |
| Objects with `sourceObjectIds` | 178 |
| Explicit derived→source pairs | 178 |
| Unique derived IDs | 178 |
| Unique source object IDs | 178 |

Sample preserved pairs:

| Derived object ID | Source object ID | Topic | Source references |
|---|---|---|---|
| `DERIVED_041` | `tint_c1_t1` | EMTALA and Interfacility Transfer | Tintinalli Ch 1 |
| `DERIVED_042` | `tint_c1_t3` | Blast Injury Pathophysiology | Tintinalli Ch 1 |
| `DERIVED_043` | `tint_c5_t1` | TIMI Risk Score | Tintinalli Ch 5 |
| `DERIVED_044` | `tint_c6_t1` | Klebsiella Pneumonia | Tintinalli Ch 6 |
| `DERIVED_045` | `tint_c10_t1` | Pediatric Airway Sizing | Tintinalli Ch 10 |
| `DERIVED_046` | `tint_c10_t2` | Pediatric Head Trauma Rules (PECARN) | Tintinalli Ch 10 |
| `DERIVED_047` | `tint_c11_t1` | Disseminated Gonococcal Infection (DGI) | Tintinalli Ch 11 |
| `DERIVED_048` | `tint_c11_t2` | Toxic Shock Syndrome (TSS) | Tintinalli Ch 11 |
| `DERIVED_049` | `tint_c11_t3` | Tetanus Management | Tintinalli Ch 11 |
| `DERIVED_050` | `tint_c12_t1` | Idiopathic Intracranial Hypertension (Pseudotumor Cerebri) | Tintinalli Ch 12 |
| `DERIVED_051` | `tint_c12_t2` | Status Epilepticus | Tintinalli Ch 12 |
| `DERIVED_052` | `tint_c13_t1` | Caustic Ingestions (Acid vs Alkali) | Tintinalli Ch 13 |
| `DERIVED_053` | `tint_c14_t1` | Frostbite Management | Tintinalli Ch 14 |
| `DERIVED_054` | `tint_c14_t2` | Carbon Monoxide (CO) Poisoning | Tintinalli Ch 14 |
| `DERIVED_055` | `tint_c15_t1` | Diabetic Ketoacidosis (DKA) Management | Tintinalli Ch 15 |
| `DERIVED_056` | `tint_c15_t2` | Adrenal Crisis | Tintinalli Ch 15 |
| `DERIVED_057` | `tint_c16_t1` | Immune Thrombocytopenic Purpura (ITP) | Tintinalli Ch 16 |
| `DERIVED_058` | `tint_c17_t1` | Retinal Detachment | Tintinalli Ch 17 |
| `DERIVED_059` | `tint_c17_t2` | Tracheoinnominate Artery Fistula | Tintinalli Ch 17 |
| `DERIVED_060` | `tint_c18_t1` | Erythema Multiforme (EM) and SJS/TEN | Tintinalli Ch 18 |
| `DERIVED_061` | `tint_c19_t1` | Pregnancy in Trauma | Tintinalli Ch 19 |
| `DERIVED_062` | `tint_c19_t2` | NEXUS Rules for Chest Imaging | Tintinalli Ch 19 |
| `DERIVED_063` | `tint_c20_t1` | Ottawa Knee Rules | Tintinalli Ch 20 |
| `DERIVED_064` | `tint_c20_t2` | Compartment Syndrome | Tintinalli Ch 20 |
| `DERIVED_065` | `tint_c21_t1` | Sciatica and Herniated Nucleus Pulposus (HNP) | Tintinalli Ch 21 |
| `DERIVED_066` | `tint_c21_t2` | Psoas Abscess | Tintinalli Ch 21 |
| `DERIVED_067` | `tint_c21_t3` | Septic Arthritis in Immunocompromised Patients | Tintinalli Ch 21 |
| `DERIVED_068` | `tint_c22_t1` | Suicide Risk Assessment | Tintinalli Ch 22 |
| `DERIVED_069` | `tint_c22_t2` | Acute Dystonic Reactions | Tintinalli Ch 22 |
| `DERIVED_070` | `tint_c22_t3` | Eating Disorders (Bulimia Nervosa) | Tintinalli Ch 22 |

## Identity-token search in APP_DATABASE

| Token class | Count of distinct values | Total occurrences |
|---|---:|---:|
| Legacy namespace tokens | 801 | 3304 |
| SEG `SRC`/`CAND` tokens | 0 | 0 |

## `supplementalSummary.json` relationship assessment

| Collection | Count | Identity/relationship result |
|---|---:|---|
| `summaryData` | 19 | Plain summary/drug/trap content; no `SRC-*`, `CAND-*`, or crosswalk field observed |
| `drugList` | 47 | Plain summary/drug/trap content; no `SRC-*`, `CAND-*`, or crosswalk field observed |
| `trapsList` | 0 | Plain summary/drug/trap content; no `SRC-*`, `CAND-*`, or crosswalk field observed |

## Legacy registry/index evidence

| File | Count | ID pattern/fields | SEG link result | Bytes | SHA-256 |
|---|---:|---|---|---:|---|
| `emergency_cases_index.json` | 84 | IDs `acute, aortic, chief, copd, disposition, ecg, emergency, esophageal, first, handover, pericarditis, pitfalls, pneumonia, pulmonary, resuscitation, seg, severe, stemi, tension, what`; fields `category, file, id, path, summary, title, type` | No SEG token | 30709 | `e57fac665ebce7c4b4fe2649fe1d9039d8338816ef1ef7afee62848c78cf5782` |
| `airway_index.json` | 61 | IDs `none`; fields `category, dose_status, has_arabic_simplification, has_assessment_question, module_order, needs_final_medical_audit, path, setting_status, slug, source_basis, title` | No SEG token | 34513 | `a8cc16f1ee76911c147591819a42197453afc9bc3e732bd202f9ad14498108ee` |
| `critical_care_index.json` | 62 | IDs `none`; fields `order, path, section, slug, title` | No SEG token | 11979 | `c183583b93d98102811eab1ffa631b7cf6f73f1d280a4d6cd8aa97b407e660cc` |
| `drug_index.json` | 82 | IDs `adenosine, airway, amiodarone, antimicrobial, atropine, calcium, cardiovascular, dobutamine, dopamine, dose, drug, epinephrine, lidocaine, magnesium, metabolic, norepinephrine, phenylephrine, respiratory, resuscitation, vasopressin`; fields `category, dose_status, id, path, route, source_basis, title` | No SEG token | 28720 | `2b1caeeacfdb8e6e996c4a735433cb1adf950c5f2f8c2407c8dbbc9f61e0f692` |
| `ecg-content-index.json` | 0 | IDs `none`; fields `` | No SEG token | 26025 | `1c23c0cb86b14fc66e337c730d8b28b1250006ec6b7c352463aeb26c58d709f4` |
| `pocus_index.json` | 67 | IDs `none`; fields `file, image_brief, route, section, slug, source_anchor, title` | No SEG token | 38553 | `0ddabea31622db1e3c69b7ce9a6d9e49e3d7bd51bcaa5a65b4f489ff84a945cc` |
| `toxicology_index.json` | 71 | IDs `none`; fields `category, path, route, slug, title` | No SEG token | 17867 | `2b82daa1e4daa155b6b9a74ca4d35ed8d4f2aeae14c2dbe82e533b4b209d3d82` |

## Cross-package negative identity result

The forensic search across the legacy handoff, the eight legacy JSON workspace, and the staged legacy-content folders found no literal `SRC-xxxx` or `CAND-7.6-SRC-xxxx` token in legacy files. Existing identity evidence is therefore internal to legacy namespaces or pack-local slugs; it does not establish legacy→SEG candidate linkage.

