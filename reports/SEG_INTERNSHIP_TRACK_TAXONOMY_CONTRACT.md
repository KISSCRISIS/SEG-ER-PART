# SEG Internship Track & Taxonomy Contract

**Phase:** 5.11 — Governance Closure & Schema Authorization Preparation  
**Mode:** `READ_ONLY GOVERNANCE CLOSURE`  
**Generated at (UTC):** `2026-08-17T19:57:52Z`  
**Decision state:** Contract preparation only; no source approval, schema conversion, JSON generation, import, activation, or publication.

## 1. Purpose and authority

This document defines the track and taxonomy contract that a future governed source record must satisfy before it can be considered for schema conversion. It preserves the approved Internship pathway design without inferring a source’s track from a folder, filename, topic, UI label, or route. The pathway definition is authoritative for the pathway identity and branch vocabulary; it is not a substitute for per-source track or taxonomy evidence.[1]

> The pathway name does not authorize access changes, database changes, new routes, or medical-content activation. Each source must retain its own source ID, version, rights, taxonomy, review decision, and audit trail.[1]

## 2. Professional pathway identity

| Contract field | Required value or evidence | Current state |
|---|---|---|
| Pathway name | `SEG Internship Doctor Pathway` | Supplied by approved pathway contract. |
| Audience | `Medical Intern Doctors` | Supplied by approved pathway contract. |
| Level | Internship-level professional education | Supplied as pathway context; not source-level proof. |
| Intended professional track | `02_Internship` | Required explicit source-level evidence; current registry treats pathway labels as provisional. |
| Root concept | `Intern Core` | Approved pathway vocabulary. |
| Pathway version | Governed pathway registry value | `NOT_SUPPLIED` in this closure package. |
| Owner / reviewer | Attributable governance participant and role | `NOT_SUPPLIED`; no reviewer is invented. |
| Availability | Design/governance preparation only | Not learner-facing and not activated. |

The professional track is a **required explicit field for every future record**, but the current canonical manifest schema does not contain a `track` property. Therefore, track must be validated through the separately governed track context/contract and must not be silently inserted into the canonical manifest object as an unknown property.[8]

## 3. Approved pathway mapping contract

The approved pathway has exactly three top-level branches under `Intern Core`.[1]

### 3.1 Core Rotations

| Rotation | Required pathway location | Track/taxonomy requirement |
|---|---|---|
| Internal Medicine | `Core Rotations > Internal Medicine` | Explicit `02_Internship` plus governed taxonomy ID/version; no cross-track substitution. |
| Surgery | `Core Rotations > Surgery` | Explicit `02_Internship` plus governed taxonomy ID/version; no cross-track substitution. |
| Pediatrics | `Core Rotations > Pediatrics` | Explicit `02_Internship` plus governed taxonomy ID/version; no cross-track substitution. |
| OBGYN | `Core Rotations > OBGYN` | Explicit `02_Internship` plus governed taxonomy ID/version; no cross-track substitution. |

The four rotations remain separate domains. A rotation label is not sufficient evidence that a source belongs to the Internship track or that it is approved for the named rotation.[1]

### 3.2 Clinical Foundation

| Foundation domain | Required pathway location | Track/taxonomy requirement |
|---|---|---|
| Emergency Basics | `Clinical Foundation > Emergency Basics` | Explicit `02_Internship` plus taxonomy ID/version; emergency topic alone is insufficient. |
| Clinical Skills | `Clinical Foundation > Clinical Skills` | Explicit `02_Internship` plus skills taxonomy and separate skills/activity contract when applicable. |
| Drug Essentials | `Clinical Foundation > Drug Essentials` | Explicit `02_Internship` plus taxonomy ID/version; duplicate-family decision remains separate and unresolved. |
| ECG | `Clinical Foundation > ECG` | Explicit `02_Internship` plus taxonomy ID/version; generic ECG category is not pathway approval. |
| Critical Care | `Clinical Foundation > Critical Care` | Explicit `02_Internship` plus taxonomy ID/version; generic critical-care label is not pathway approval. |
| Toxicology | `Clinical Foundation > Toxicology` | Explicit `02_Internship` plus taxonomy ID/version; generic toxicology label is not pathway approval. |

`Medical Journal` and `Reference / Atlas` are supporting SEG capabilities, not additional top-level Internship branches.[1]

### 3.3 Learning Engine

| Learning Engine section | Required pathway relationship | Track/taxonomy requirement |
|---|---|---|
| Learn | Lesson/learning records bound to approved pathway locations | Explicit `02_Internship`, taxonomy, source/version, rights, review, and audit. |
| Practice | Activity or practice records | Explicit assessment/activity contract; generic practice UI is not a competency decision. |
| MCQ | Question-bank/assessment records | Explicit item lineage, question contract, track/taxonomy, review, rights, and audit. |
| Cases | Case-based records | Explicit case contract/enum, complete case evidence, track/taxonomy, review, rights, and audit. |
| Progress Analytics | Governed progress events/semantics | Separate progress contract; learner completion is not clinical competence or medical approval. |

Assessments are cross-cutting and may relate to Practice, MCQ, Cases, Clinical Foundation, or Progress Analytics; they are not a fourth top-level branch.[1]

## 4. Taxonomy requirements

A future source record is taxonomy-ready only when all rows below are evidenced by an attributable governance source. Missing values remain `NOT_SUPPLIED` or `UNRESOLVED`; they are not inferred.

| Requirement | Required evidence | Current state | Blocking code |
|---|---|---|---|
| Explicit professional track | Exact `02_Internship` label supplied in governed source context | Pathway context exists, but per-source evidence is not closed | `TRACK_UNSUPPLIED` |
| Track separation | No mixing with the six other professional tracks unless an explicit taxonomy authorizes the relationship | Not demonstrated for all source records | `TRACK_MIXED` / `TRACK_UNSUPPLIED` |
| Taxonomy ID | Stable taxonomy identifier | Not supplied in current registry | `TAXONOMY_UNSUPPLIED` |
| Taxonomy version | Version of taxonomy vocabulary | Not supplied in current registry | `TAXONOMY_UNSUPPLIED` |
| Branch mapping | One approved branch and exact domain/pathway location | Provisional for 48 candidates; 67 unresolved rows and 20 unknown items remain | `GOVERNANCE_GATE_BLOCKED` |
| Content-type relationship | Explicit relationship between domain and type-specific contract | Candidate targets exist; Case/Skills/generic Reference contract handling remains open | `SCHEMA_CONTRACT_MISSING` |
| Review state | Observed review decision, reviewer role, date, locators, and audit | Not complete; no approval is created here | `BLOCKED_CLINICAL_REVIEW` / `BLOCKED_AUDIT` |

## 5. Required lifecycle

```text
Source → Metadata → Track/Taxonomy Review → Rights Review → Clinical/Relevant Review → QA → Approval → Implementation Authorization → Activation
```

No stage is skipped because a source has a familiar filename, folder, topic, or provisional pathway label. The current closure state remains `BLOCKED_PENDING_GOVERNANCE`.

## 6. Explicit non-actions

No track or taxonomy value was fabricated for a source. No source was approved, merged, selected as canonical, deleted, renamed, archived, converted, imported, activated, committed, pushed, deployed, or published. No application, database, route, component, authentication, asset, or medical content was modified.

## Evidence inputs

| Input | SHA-256 |
|---|---|
| `SEG_INTERNSHIP_PHASE_5_10_SCHEMA_GATE_REPORT.md` | `d1638ea09c734e4f49e52db782da7aedcdfa9d2a56e81a4cd1f5d151732f9b84` |
| `SEG_INTERNSHIP_CONTENT_TYPE_CONTRACT.md` | `d5f783057d4b4aba3bc5b89d50669abc5320d87c6581936918a4c484bc901236` |
| `SEG_INTERNSHIP_SCHEMA_FIELD_READINESS_MATRIX.md` | `d66742ac039b3578e814f65307422a861440fc019de0e2c62728f3be32380341` |
| `SEG_INTERNSHIP_SOURCE_SCHEMA_MAPPING_PLAN.md` | `5e6fcbbf93e974e307d08451273f1b7881de83699a7cb7e03f6b5fc6c3f13e05` |
| `SEG_INTERNSHIP_SOURCE_REGISTRY_FINAL.md` | `10af917088cf240944a7cb38eb0eca219de5bf16688950a75540f39161347829` |
| `SEG_INTERNSHIP_DOCTOR_PATHWAY_CONTRACT.md` | `caebe048d971516db09f3b034aa476bfc286e87e79da4f1c51f9594e7a43a42a` |
| `SEG_INTERNSHIP_CANONICAL_REVIEW_FINAL.md` | `404dc8920dca70602bb9eb9a1aa281aead3d9acab5475c3684e4a4a79587e6ad` |

Observed registry records: **115**.  
Observed provisional source-to-schema mapping rows: **48**.

## References

[1]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DOCTOR_PATHWAY_CONTRACT.md "SEG Internship Doctor Pathway Contract"
[2]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_5_10_SCHEMA_GATE_REPORT.md "Phase 5.10 Schema Gate Report"
[3]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_TYPE_CONTRACT.md "Content Type Contract"
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SCHEMA_FIELD_READINESS_MATRIX.md "Schema Field Readiness Matrix"
[5]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_SCHEMA_MAPPING_PLAN.md "Source-to-Schema Mapping Plan"
[6]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_REGISTRY_FINAL.md "Final Source Registry"
[7]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CANONICAL_REVIEW_FINAL.md "Canonical Duplicate Review — Final"
[8]: /home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "Canonical SEG governed manifest schema"
[9]: /home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_INTEGRATION_PLAN.md "SEG Content Integration Plan"
