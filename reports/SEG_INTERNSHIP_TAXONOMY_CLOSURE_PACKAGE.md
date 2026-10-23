# SEG Internship Taxonomy Closure Package

**Phase:** 7.4 — Controlled Governance Gate Closure  
**Mode:** `READ_ONLY GOVERNED TAXONOMY CLOSURE PREPARATION`  
**Date recorded:** `2026-08-18`  
**Processing state:** `PATHWAY_MAPPING_PREPARED — TAXONOMY_ID_VERSION_OPEN`

## 1. Purpose and boundary

This package consolidates the previously approved Internship pathway vocabulary and module mapping for future governed review. It does not create taxonomy identifiers, assign a taxonomy version, approve a source, activate a track, convert a schema, or create a production record. A pathway label or folder name is not treated as per-source taxonomy evidence.[1] [2]

## 2. Pathway identity

| Field | Recorded value | Evidence status |
|---|---|---|
| Pathway name | `SEG Internship Doctor Pathway` | `RECORDED_PATHWAY_VOCABULARY` |
| Professional track | `02_Internship` | `PATHWAY_CONTEXT_RECORDED; PER_SOURCE_CONFIRMATION_OPEN` |
| Audience | `Medical Intern Doctors` | `RECORDED_PATHWAY_CONTEXT` |
| Level | Internship-level professional education | `RECORDED_PATHWAY_CONTEXT; PER_SOURCE_PROOF_OPEN` |
| Root concept | `Intern Core` | `RECORDED_PATHWAY_VOCABULARY` |
| Pathway version | `NOT_SUPPLIED` | `OPEN` |
| Taxonomy ID | `NOT_SUPPLIED` | `OPEN` |
| Taxonomy version | `NOT_SUPPLIED` | `OPEN` |
| Learner availability | Design/governance preparation only | `NOT_ACTIVATED` |

The seven professional tracks remain separate: `01_Emergency_Medicine_Physician`, `02_Internship`, `03_Medical_Students`, `04_Paramedic_EMS`, `05_Emergency_Nursing`, `06_General_Practitioner`, and `07_Shared_Medical_Core`. No cross-track relationship is inferred by this package.[1]

## 3. Approved pathway/module mapping

### 3.1 Core Rotations

| Module | Governed pathway location | Required source-level evidence | Current state |
|---|---|---|---|
| Internal Medicine | `Intern Core > Core Rotations > Internal Medicine` | Explicit `02_Internship`, authoritative taxonomy ID/version, exact source/module locator | `MAPPING_VOCABULARY_RECORDED; SOURCE_CLOSURE_OPEN` |
| Surgery | `Intern Core > Core Rotations > Surgery` | Explicit `02_Internship`, authoritative taxonomy ID/version, exact source/module locator | `MAPPING_VOCABULARY_RECORDED; SOURCE_CLOSURE_OPEN` |
| Pediatrics | `Intern Core > Core Rotations > Pediatrics` | Explicit `02_Internship`, authoritative taxonomy ID/version, exact source/module locator | `MAPPING_VOCABULARY_RECORDED; SOURCE_CLOSURE_OPEN` |
| OBGYN | `Intern Core > Core Rotations > OBGYN` | Explicit `02_Internship`, authoritative taxonomy ID/version, exact source/module locator | `MAPPING_VOCABULARY_RECORDED; SOURCE_CLOSURE_OPEN` |

### 3.2 Clinical Foundation

| Module | Governed pathway location | Required source-level evidence | Current state |
|---|---|---|---|
| Emergency Basics | `Intern Core > Clinical Foundation > Emergency Basics` | Explicit `02_Internship`, taxonomy ID/version, exact domain/module evidence | `MAPPING_VOCABULARY_RECORDED; SOURCE_CLOSURE_OPEN` |
| Clinical Skills | `Intern Core > Clinical Foundation > Clinical Skills` | Explicit `02_Internship`, skills taxonomy, applicable Skills/Procedures contract | `MAPPING_VOCABULARY_RECORDED; SOURCE_CLOSURE_OPEN` |
| Drug Essentials | `Intern Core > Clinical Foundation > Drug Essentials` | Explicit `02_Internship`, taxonomy ID/version, duplicate-family evidence | `MAPPING_VOCABULARY_RECORDED; SOURCE_CLOSURE_OPEN` |
| ECG | `Intern Core > Clinical Foundation > ECG` | Explicit `02_Internship`, taxonomy ID/version, exact domain/module evidence | `MAPPING_VOCABULARY_RECORDED; SOURCE_CLOSURE_OPEN` |
| Critical Care | `Intern Core > Clinical Foundation > Critical Care` | Explicit `02_Internship`, taxonomy ID/version, exact domain/module evidence | `MAPPING_VOCABULARY_RECORDED; SOURCE_CLOSURE_OPEN` |
| Toxicology | `Intern Core > Clinical Foundation > Toxicology` | Explicit `02_Internship`, taxonomy ID/version, exact domain/module evidence | `MAPPING_VOCABULARY_RECORDED; SOURCE_CLOSURE_OPEN` |

`Medical Journal` and `Reference / Atlas` remain supporting SEG capabilities rather than additional top-level Internship branches.[1]

### 3.3 Learning Engine relationships

| Learning Engine area | Candidate relationship | Required evidence | Current state |
|---|---|---|---|
| Learn | Lesson/learning records bound to an approved pathway location | Source/version, rights, explicit track/taxonomy, review, audit | `RELATIONSHIP_RECORDED; OPEN` |
| Practice | Activity or practice records | Explicit activity/assessment contract and track/taxonomy | `RELATIONSHIP_RECORDED; OPEN` |
| MCQ | Question-bank/assessment records | Item lineage, question contract, track/taxonomy, review, rights, audit | `RELATIONSHIP_RECORDED; OPEN` |
| Cases | Case-based records | Case contract, complete source evidence, track/taxonomy, review, rights, audit | `RELATIONSHIP_RECORDED; OPEN` |
| Progress Analytics | Governed progress semantics/events | Separate progress contract; not clinical competence or approval | `RELATIONSHIP_RECORDED; OPEN` |

## 4. Taxonomy evidence status

| Required evidence | Current finding | Status |
|---|---|---|
| Exact pathway vocabulary | `SEG Internship Doctor Pathway` and `Intern Core` supplied by the approved pathway contract | `RECORDED` |
| Explicit professional-track label | `02_Internship` exists in pathway context | `PARTIAL — PER-SOURCE CLOSURE OPEN` |
| Audience | `Medical Intern Doctors` | `RECORDED AS PATHWAY CONTEXT` |
| Level | Internship-level professional education | `RECORDED AS PATHWAY CONTEXT` |
| Branch/module mapping | Core Rotations, Clinical Foundation, Learning Engine mapping defined | `PROVISIONAL / GOVERNANCE REVIEW OPEN` |
| Stable taxonomy ID | Not found in the current registry/evidence | `NOT_SUPPLIED` |
| Taxonomy version | Not found in the current registry/evidence | `NOT_SUPPLIED` |
| Track separation evidence | Not demonstrated for every candidate source | `OPEN` |
| Source-level review linkage | Package-level reviewer evidence exists; per-source linkage remains incomplete | `OPEN` |
| Audit linkage | Preparation report exists; attributable append-only event completion remains open | `OPEN` |

The evidence authority report confirms that SEG has pathway vocabulary but no canonical versioned taxonomy registry or complete source-level taxonomy closure. No missing ID or version is invented in this package.[3]

## 5. Closure criteria before taxonomy gate can pass

The taxonomy gate requires an attributable authority to supply a stable taxonomy ID and version, bind each in-scope source to explicit `02_Internship`, identify the exact pathway branch/module, demonstrate separation from the other professional tracks, and link the decision to source/version/checksum and append-only audit evidence. A generic folder, filename, topic, reviewer label, or pathway name cannot substitute for those fields.

## 6. Taxonomy decision state

`TAXONOMY_CLOSURE_PREPARED — BLOCKED_PENDING_TAXONOMY_AUTHORITY_ID_VERSION_AND_PER_SOURCE_ASSIGNMENTS`.

This package records the authorized pathway design and mapping vocabulary only. It does not approve the Internship track for any source and does not authorize Phase 8.0 schema revalidation.

## 7. Validation and non-actions

This package was prepared read-only. No taxonomy ID or version was fabricated. No JSON was generated, no schema was converted or revalidated, no database or application was changed, and no source was imported, activated, published, deleted, renamed, merged, archived, overwritten, or modified.

## References

[1]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_TRACK_TAXONOMY_CONTRACT.md "Phase 5.11 Track and Taxonomy Contract"
[2]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_GOVERNANCE_ACCEPTANCE_DECISION_RECORD.md "Phase 6.8 Governance Acceptance Decision Record"
[3]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_INTERNAL_TAXONOMY_AUTHORITY_REPORT.md "Phase 7.2 Internal Taxonomy Authority Report"
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_TRACK_TAXONOMY_EVIDENCE_REVIEW.md "Phase 7.1 Track and Taxonomy Evidence Review"
[5]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_AUDIT_EVIDENCE_PREPARATION.md "Phase 7.4 Audit Evidence Preparation"

<!-- END OF REPORT -->
