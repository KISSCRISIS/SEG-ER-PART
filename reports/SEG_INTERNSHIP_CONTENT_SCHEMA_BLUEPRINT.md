# SEG Internship Doctor Pathway — Content Schema Blueprint

**Phase:** 5.1 — Internship Content Schema Preparation  
**Mode:** `READ_ONLY DESIGN PREPARATION`  
**Status:** Blueprint only; not a production schema, database schema, JSON contract, import payload, or activation record.  
**Author:** Manus AI

## 1. Scope and authority

This blueprint defines how future source-derived content may be organized for the **SEG Internship Doctor Pathway**. It is a design artifact only. It does not convert the supplied content, select canonical clinical versions, create production records, modify application architecture, or expose content to learners.

The blueprint uses only the four supplied authority inputs: the Internship Content Master Map, Source Catalog, Gap and Duplicate Report, and Integration Ready Report.[1] [2] [3] [4] The source catalog contains **115 data rows plus one header row**. All catalog rows are marked `Needs review / verify` and `Check required`; therefore, no row is treated as clinically approved or activation-ready.[2]

The approved pathway organization used here is:

```text
SEG Internship Doctor Pathway
├── Core Rotations
│   ├── Internal Medicine
│   ├── Surgery
│   ├── Pediatrics
│   └── OBGYN
├── Clinical Foundation
│   ├── Emergency Basics
│   ├── Clinical Skills
│   ├── Drug Essentials
│   ├── ECG
│   ├── Critical Care
│   └── Toxicology
└── Learning Engine
    ├── Learn
    ├── Practice
    ├── MCQ
    ├── Cases
    └── Progress
```

`00 — START HERE` and `04 — ASSESSMENT & LOGBOOK` are preserved as supporting source locations from the supplied map and catalog. This blueprint does not create a fourth top-level pathway branch. Their future placement remains subject to explicit pathway-contract approval.[1] [2]

> **Design boundary:** A blueprint field or mapping candidate describes future structure. It does not prove that the corresponding content exists, is complete, is clinically correct, is rights-cleared, or is approved.

## 2. Design principles

### 2.1 Traceability before conversion

Every future content item must retain its source identity, exact source location, source version, review state, and audit lineage. The blueprint does not replace the original source and does not authorize normalization that would obscure the source wording or duplicate lineage.

### 2.2 Track separation

The intended professional track is `02_Internship` only when explicitly supplied by the governed intake context. A filename, folder, topic, or UI label must not be used to infer a professional track. Cross-track reuse requires an explicit governed relationship and must not silently mix Internship content with physician, student, paramedic, nursing, general-practitioner, or shared-core content.

### 2.3 Review state is fail-closed

The observed catalog state is `Needs review / verify`; this value remains non-final. `Clinical Approval Status` must remain `NOT_APPROVED` until an independent qualified clinical-review record supplies an explicit decision. A structurally complete blueprint or future schema validation result is not clinical approval.

### 2.4 Duplicate preservation

Duplicate candidates remain preserved for audit. The supplied reports identify canonical-selection work for Drug Essentials and Emergency Cases, and the catalog marks every row `Check required` for duplicate review.[2] [3] No canonical version is selected by this blueprint.

### 2.5 Source and implementation artifacts remain distinct

The catalog includes Markdown, PDF, TXT, TypeScript, and TSX files. Markdown/PDF/TXT materials may be source candidates subject to intake review; TS/TSX files such as pages, question data, parsers, and UI components are source-layer or implementation artifacts until a separate review proves that a content payload can be extracted without altering meaning. They must not be treated as learner-facing records solely because they appear in the catalog.[2]

## 3. Cross-cutting record envelope

The field groups below are conceptual metadata required around each future item, regardless of content type. They are not a database table and are not a JSON schema.

| Cross-cutting field | Blueprint requirement | Initial state for this phase |
|---|---|---|
| Content ID | Stable ID assigned only during a separately authorized conversion contract | `NOT_CREATED` |
| Pathway | `SEG Internship Doctor Pathway` | Design target only |
| Professional track | Explicit `02_Internship` when supplied by governed intake | Must be verified; do not infer |
| Pathway location | One approved branch and specialty/module location | Candidate from master map; requires record-level verification |
| Source ID | Catalog `Source ID` or a governed source identifier | Catalog IDs are inventory references, not approval evidence |
| Source version | Supplied release/version and checksum | Missing or unresolved for the source package until intake metadata is complete |
| Source locator | File, page, heading, question ID, case ID, or equivalent exact location | Must be observed and preserved |
| Taxonomy | Explicit taxonomy ID and version when supplied | `NOT_SUPPLIED` in the four authority inputs |
| Rights | Text usage, image usage, display scope, license or decision | Must be supplied and reviewed separately |
| Review status | Observed review state with audit trail | `Needs review / verify` for catalog rows |
| Clinical approval status | Independent clinical decision | `NOT_APPROVED` |
| Audit trail | Append-only creation, review, duplicate, rights, and decision events | Not complete in supplied inputs |

## 4. Learning Content blueprint

Learning Content represents a future lesson, summary, framework, or other educational unit after source intake and review. The blueprint does not create any lesson or summarize any supplied source.

| Field | Definition and future handling | Required evidence |
|---|---|---|
| Pathway | The governed pathway container | Explicit pathway contract |
| Level | Professional level, here intended as Internship Doctor | Explicit track/level metadata; do not infer from topic |
| Module | Approved pathway module, such as Internal Medicine or Emergency Basics | Master-map location plus record-level confirmation |
| Specialty | Clinical rotation or foundation specialty | Explicit taxonomy or governed mapping |
| Topic | Narrow educational topic | Exact source locator and source wording |
| Content Type | Lesson, summary, framework, or another approved learning subtype | Authorized content-type vocabulary |
| Title | Source-preserving or governed display title | Source title and title decision |
| Source | Source ID, owner/location, and provenance | Source catalog plus completed intake metadata |
| Version | Release/version plus checksum | Supplied version and immutable fingerprint |
| Review Status | Observed lifecycle state, such as `Needs review / verify` or `Pending Clinical Review` | Independent review record |
| Clinical Approval Status | Separate clinical decision, not implied by review or schema validation | Qualified reviewer, decision, date, and cited locators |

A future Learning Content record may be related to `Learn`, but the Learning Engine is a delivery and progression layer rather than permission to skip provenance or review. An item with missing source, version, rights, taxonomy, or review evidence remains blocked.

## 5. Question Bank blueprint

Question Bank records represent future MCQ or other approved question items. The supplied catalog indicates question-bank-related source and implementation artifacts, including `questionData.ts`, reviewed Markdown files, question pages, parsers, and question-card components. These are inventory evidence only; they are not converted here.[2]

| Field | Definition and future handling | Required evidence |
|---|---|---|
| Pathway | `SEG Internship Doctor Pathway` | Explicit pathway assignment |
| Specialty | Internal Medicine, Surgery, Pediatrics, OBGYN, or another approved module | Governed module mapping |
| Topic | Question topic as supported by the source | Source locator |
| Difficulty | Difficulty value only when supplied or separately approved | Explicit source/assessment contract; otherwise `NOT_SUPPLIED` |
| Question | Original question text | Immutable source text and locator |
| Options | Original answer options with preserved ordering | Complete source item; no reconstruction |
| Answer | Supplied answer key | Source evidence and clinical review |
| Explanation | Supplied or separately authored rationale | Provenance and independent clinical review |
| Reference | Source/reference supporting the item | Claim-level reference and locator |
| Review Status | Observed review state | Question-level review evidence |

Question records must not be fabricated from UI code, filenames, or a partial question object. Missing options, answer, explanation, reference, or source locator produces an unresolved/incomplete candidate rather than recovery by invention.

## 6. Clinical Cases blueprint

Clinical Cases represent future case-based learning records. The master map identifies Emergency Cases under Emergency Basics and case content across the four core rotations; the supplied reports also identify canonical-selection work for Emergency Cases.[1] [3]

| Field | Definition and future handling | Required evidence |
|---|---|---|
| Pathway | `SEG Internship Doctor Pathway` | Explicit pathway assignment |
| Specialty | Rotation or Clinical Foundation specialty | Governed mapping |
| Topic | Case topic | Source locator |
| Case Type | Case category supplied or approved by the future contract | Explicit case taxonomy |
| Presentation | Original presenting information | Complete source content and locator |
| Assessment | Source-supported assessment data | Clinical source and reviewer evidence |
| Reasoning | Source-supported reasoning or decision pathway | Source provenance; no invented reasoning |
| Management | Source-supported management content | Clinical review and rights evidence |
| References | Claim-level references and locators | Complete reference set |
| Review Status | Observed review state | Case-level review evidence |

A case with missing presentation, assessment, reasoning, management, or references remains incomplete. A duplicate case is retained in the duplicate audit until a separately authorized canonical-selection decision is recorded.

## 7. Skills blueprint

Skills represent future procedural and practical competency records. The master map states that a Clinical Skills framework exists but that practical skills library modules are missing; the Integration Ready Report also lists a practical skills library as needing creation.[1] [4]

| Field | Definition and future handling | Required evidence |
|---|---|---|
| Skill Name | Exact skill title | Explicit source or approved skill inventory |
| Category | Clinical skills category | Approved skills taxonomy |
| Required Level | Internship level or other explicit level | Governed pathway contract |
| Teaching Material | Source-linked teaching resources | Source, version, rights, and locators |
| Assessment Method | Approved observation, checklist, OSCE, or other method | Assessment contract and reviewer evidence |
| Reviewer Status | Observed review/assessment state | Assigned reviewer and decision record |

No practical skill module, OSCE station, sign-off, or competency result is created by this blueprint. The absence of the practical skills library and full OSCE station bank remains a readiness gap.[3] [4]

## 8. References blueprint

References are source/provenance objects supporting future learning, question, case, or skills records. They are not automatically learner-facing and do not establish rights by their presence in the catalog.

| Field | Definition and future handling | Required evidence |
|---|---|---|
| Source | Source name/ID and owner/location | Provenance handoff |
| Version | Release/version plus checksum | Version record |
| Author | Supplied author or publisher | Explicit metadata; never guessed |
| Locator | Page, section, heading, figure, question ID, or equivalent | Exact observed locator |
| Rights Status | Text/image usage and display scope decision | Independent rights review |

A PDF, Markdown file, or other source listed in the catalog becomes a governed Reference only after metadata, rights, taxonomy, review, and audit requirements are met. The catalog’s `Source ID` is an inventory identifier, not proof of rights or approval.

## 9. Mapping rules to the Internship Doctor Pathway

### 9.1 Core Rotations

| Rotation | Candidate source vocabulary in the supplied inputs | Future mapping rule | Current readiness |
|---|---|---|---|
| Internal Medicine | Rotation objectives, high-yield PDF, JMC pages/question data, reviewed JMC Markdown, source Markdown, lessons/MCQ/cases/references/summaries | Map only records whose source locator and explicit module identify Internal Medicine. Keep rotation objectives, question payloads, cases, and references as separate content types. | Candidate content exists; all catalog rows remain `Needs review / verify` and `Check required`. |
| Surgery | Rotation objectives, high-yield PDF, JMC sources, lessons/MCQ/cases/references/summaries | Apply the same record-level provenance and question/case separation. Do not merge Surgery with Emergency Basics because of shared emergency topics. | Candidate content exists; review and duplicate gates remain. |
| Pediatrics | Rotation objectives, high-yield PDF, JMC sources, lessons/MCQ/cases/references/summaries | Keep Pediatrics separate. Structured case expansion is a recommendation, not permission to create cases. | Candidate content exists; expanded Pediatrics case bank is a listed gap. |
| OBGYN | Rotation objectives, high-yield PDF, JMC sources, lessons/MCQ/cases/references/summaries | Preserve OBGYN as a separate rotation and specialty. Do not use the presence of TSX pages as proof of approved questions. | Candidate content exists; review items remain. |

### 9.2 Clinical Foundation

| Foundation module | Candidate source vocabulary in the supplied inputs | Future mapping rule | Current readiness |
|---|---|---|---|
| Emergency Basics | ABCDE, ED workflow, airway basics, first night shift, handover, emergency cases, implementation notes, pages | Map teaching units, cases, and references separately under Emergency Basics. Implementation notes and UI/page artifacts remain source-layer evidence until payload status is verified. | Candidate content is listed as ready for future integration, but review, encoding, metadata, and duplicate checks remain. |
| Drug Essentials | Drug Essentials v2 Markdown, implementation notes, README, and duplicated `v2_Pack` counterparts | Do not select a canonical version here. Preserve both lineages, perform duplicate review, then map only the explicitly selected version. | Blocked by canonical selection and review. |
| ECG | ECG Essentials intern-level Markdown | Map theory as Learning Content only when record-level source and review evidence are complete. Image-based practice is a separate future content requirement. | Theory candidate exists; ECG image-practice bank is missing. |
| Critical Care | Distributed content collected according to the master map | Do not invent a dedicated module from distributed items. A future mapping may associate independently governed records with Critical Care after a module contract and source locators are approved. | Dedicated module missing; blocked for complete module readiness. |
| Toxicology | Lessons, cases, and references | Keep Lessons, Cases, and References as separate content types under Toxicology. Do not collapse them into one record. | Candidate content exists; all catalog governance fields remain unresolved. |
| Clinical Skills | Clinical Skills Internship Framework | Map the framework as design/reference input only until practical skills modules and assessment methods exist. | Practical skills library missing. |

### 9.3 Learning Engine

The Learning Engine is a controlled relationship layer across approved content types. It does not become a source category and must not be used to hide missing provenance. Future records may be surfaced through:

| Learning Engine surface | Permitted future relation | Gate |
|---|---|---|
| Learn | Approved Learning Content | Source, metadata, review, clinical approval, schema validation |
| Practice | Approved questions and cases | Complete item structure, references, review, clinical approval |
| MCQ | Approved Question Bank items | Answer key, options, explanation/reference, review evidence |
| Cases | Approved Clinical Case records | Complete case fields, references, clinical review |
| Progress | Learner state derived from approved pathway items | Separate progress contract and implementation authorization; no learner state in this blueprint |

`OSCE` and `Logbook` are visible in the supplied source catalog and master map as assessment/logbook inputs, but the reports state that a full OSCE station bank, digital logbook, and progress engine require creation.[1] [3] [4] They remain future capability requirements rather than activated Learning Engine records.

## 10. Governance gates

The required operational sequence for future schema preparation is:

```text
Source
  ↓
Metadata Complete
  ↓
Review
  ↓
Clinical Approval
  ↓
Schema Validation
  ↓
Activation Ready
```

`Activation Ready` is a readiness state only. It is not activation and does not expose content. The following evidence is required at each gate.

| Gate | Minimum evidence | Failure behavior |
|---|---|---|
| Source | Immutable original, source ID, exact location, source type, preserved lineage | `BLOCKED_SOURCE` |
| Metadata Complete | Owner/publisher, version, checksum, language, track, taxonomy, rights, display scope, locators | `BLOCKED_METADATA` |
| Review | Content-type completeness, duplicate decision, encoding check, source integrity, unresolved-issue register | `BLOCKED_REVIEW` |
| Clinical Approval | Qualified reviewer role/identity, decision, date, cited locations, unresolved-issue disposition | `BLOCKED_CLINICAL_APPROVAL` |
| Schema Validation | Explicit approved blueprint/contract, required fields and types, lineage, references, review state, audit checks | `BLOCKED_SCHEMA_VALIDATION` |
| Activation Ready | All prior gates pass plus separate implementation authorization, QA, rollback, and release evidence | `BLOCKED_ACTIVATION_READINESS` |

The governance chain remains separate from content structure. A future structural pass cannot grant clinical approval, and a clinical approval cannot by itself authorize database import or application exposure. The original source, version, rights evidence, professional track, taxonomy, and audit trail must remain preserved.[5] [6] [7]

## 11. Non-actions and future handoff

This blueprint intentionally does not:

- import or normalize any source content;
- create production records or database tables;
- convert content to JSON;
- select canonical versions for duplicates;
- create routes, components, adapters, or progress implementations;
- activate or publish medical content;
- change authentication, database, assets, architecture, or the existing visual freeze.

The next permitted step is a separate READ_ONLY metadata/source mapping and duplicate-resolution package for the selected source set. Only after complete provenance, rights, track, taxonomy, review, and clinical-governance evidence may a separately authorized schema-conversion dry run be considered.

## References

[1]: file:///home/ubuntu/upload/SEG_INTERNSHIP_CONTENT_MASTER_MAP.md "SEG Internship Content Master Map"

[2]: file:///home/ubuntu/upload/SEG_INTERNSHIP_SOURCE_CATALOG.csv "SEG Internship Source Catalog"

[3]: file:///home/ubuntu/upload/SEG_INTERNSHIP_GAP_AND_DUPLICATE_REPORT.md "SEG Internship Gap and Duplicate Report"

[4]: file:///home/ubuntu/upload/SEG_INTERNSHIP_INTEGRATION_READY_REPORT.md "SEG Internship Integration Ready Report"

[5]: file:///home/ubuntu/skills/seg-metadata-source-mapper/SKILL.md "SEG Metadata & Source Mapper"

[6]: file:///home/ubuntu/skills/seg-medical-governance/SKILL.md "SEG Medical Governance"

[7]: file:///home/ubuntu/skills/seg-content-architecture-schema-validator/SKILL.md "SEG Content Architecture / Schema Validator"

[8]: file:///home/ubuntu/skills/seg-content-qa/SKILL.md "SEG Content QA"

[9]: file:///home/ubuntu/skills/seg-project-continuity/SKILL.md "SEG Project Continuity"
