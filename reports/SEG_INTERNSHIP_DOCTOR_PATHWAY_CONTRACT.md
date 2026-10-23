# SEG Internship Doctor Pathway Contract

## Metadata

| Field | Value |
|---|---|
| Contract ID | `SEG-INTERNSHIP-DOCTOR-PATHWAY-CONTRACT-4.5A` |
| Contract type | Design alignment contract; separate from the canonical content-record manifest |
| Mode | `READ_ONLY DESIGN ALIGNMENT` |
| Approved audience | Medical Intern Doctors |
| Professional track context | `02_Internship` as supplied by the approved pathway definition |
| Generated date | `2026-08-17` |
| Implementation status | Design only; not implemented |
| Medical-content status | No content imported, converted, approved, or activated by this document |
| Route status | No route created or changed |
| Database status | No database or schema changed |
| Output location | `/home/ubuntu/seg-internship-output/` — outside the SEG repository |

## Contract purpose

This document defines the approved **SEG Internship Doctor Pathway** as a reusable, traceable pathway concept that can later be aligned with existing SEG hosts. It is not application code, a JSON import payload, a database schema, a medical guideline, or a clinical approval record.

The contract preserves the current SEG architecture by treating the pathway as a composition layer over existing generic hosts—Pathway, Learn, Practice, Medical Journal, Reference/Atlas, Assessments, and Progress—without creating a route or duplicate Dashboard section.[1] [2] [3]

> **Design rule:** The pathway contract organizes governed records and learner activities; it does not create medical content or replace the source → metadata → review → clinical approval → activation lifecycle.[4] [5]

## 1. Pathway Identity

| Identity field | Contract value |
|---|---|
| Name | **SEG Internship Doctor Pathway** |
| Audience | **Medical Intern Doctors** |
| Level | Internship-level professional education; intended for the `02_Internship` professional track supplied by the approved project structure |
| Purpose | Provide a governed learning progression through core clinical rotations, clinical foundation domains, and a structured learning engine using reusable SEG capabilities |
| Root concept | **Intern Core** |
| Language | To be supplied and validated during future source intake; not inferred from the pathway title or filenames |
| Pathway version | To be assigned by a future governed pathway registry; this design document is not an implementation version record |
| Owner / reviewer | To be explicitly supplied in a future governance decision; no reviewer or clinical approval is assigned here |
| Availability | Design-only; not learner-facing and not activated |

### Identity boundaries

The audience and track are part of the pathway definition supplied for this phase. They must not be used to infer the professional track of individual sources. Each future source package must preserve its own source ID, version, rights, taxonomy, review decision, and audit evidence. Track relationships must be explicit and must not be inferred from a title, folder, UI label, or topic.[6] [7]

The pathway name does not authorize access changes, OAuth changes, database changes, new routes, or medical-content activation. The current authenticated boundary remains `/dashboard`, with its existing access states and internal anchors.[2] [3]

## 2. Pathway Structure

The approved pathway contains one root concept and three approved branches. No additional top-level branch is created by this contract.

```text
SEG Internship Doctor Pathway
Target: Medical Intern Doctors

└── INTERN CORE
    ├── 1. CORE ROTATIONS
    │   ├── Internal Medicine
    │   ├── Surgery
    │   ├── Pediatrics
    │   └── OBGYN
    │
    ├── 2. CLINICAL FOUNDATION
    │   ├── Emergency Basics
    │   ├── Clinical Skills
    │   ├── Drug Essentials
    │   ├── ECG
    │   ├── Critical Care
    │   └── Toxicology
    │
    └── 3. LEARNING ENGINE
        ├── Learn
        ├── Practice
        ├── MCQ
        ├── Cases
        └── Progress Analytics
```

### 2.1 Core Rotations

| Approved section | Contract meaning | Existing SEG alignment boundary |
|---|---|---|
| Internal Medicine | An Internship Doctor rotation domain | Reuse the existing `#pathway` and `#learn` hosts only after governed source and rotation bindings exist. No rotation content is created here. |
| Surgery | An Internship Doctor rotation domain | Reuse the existing `#pathway` and `#learn` hosts only after governed source and rotation bindings exist. |
| Pediatrics | An Internship Doctor rotation domain | Reuse the existing `#pathway` and `#learn` hosts only after governed source and rotation bindings exist. |
| OBGYN | An Internship Doctor rotation domain | Reuse the existing `#pathway` and `#learn` hosts only after governed source and rotation bindings exist. |

The four rotations remain separate pathway domains. Their names must not be used to merge or substitute source material. A future content binding must identify the exact source, version, track, taxonomy, rights, review state, and audit trail for each bound record.

### 2.2 Clinical Foundation

| Approved section | Contract meaning | Existing SEG alignment boundary |
|---|---|---|
| Emergency Basics | Foundational emergency learning domain for the intern pathway | Reuse generic Learn and Practice hosts; current related emergency labels are not proof of an Internship-specific approved package. |
| Clinical Skills | Governed clinical-skills learning domain | Reuse Learn and Practice hosts only when an explicit skills contract and source-grounded records exist. A generic Practice surface is not a competency sign-off. |
| Drug Essentials | Foundational drug-learning domain | No explicit current Dashboard/Atlas container was confirmed in Phase 4.5A alignment; do not create or populate it in this design phase. |
| ECG | ECG learning/reference domain | Reuse the existing Reference/Atlas ECG category and generic Learn/Practice hosts; category presence is not pathway-specific approval. |
| Critical Care | Critical-care foundation/reference domain | Reuse the existing Reference/Atlas Critical Care category and generic Learn/Practice hosts; no Internship-specific sequence is activated. |
| Toxicology | Toxicology foundation/reference domain | Reuse the existing Reference/Atlas Toxicology category and generic Learn/Practice hosts; no Internship-specific sequence is activated. |

Medical Journal and Reference/Atlas are **existing supporting SEG capabilities**, not additional top-level branches of the approved pathway. Medical Journal remains restricted to approved content with source, version, review status, and audit trail.[1]

### 2.3 Learning Engine

| Approved section | Contract meaning | Existing SEG alignment boundary |
|---|---|---|
| Learn | Governed learning-module and lesson host | Reuse `#learn` and its existing module presentation; bind only reviewed, track-correct records in a future authorized implementation. |
| Practice | Practice workspace for learner activities | Reuse `#practice`; do not equate its generic activity/score presentation with a JMC, OSCE, or competency system. |
| MCQ | Multiple-choice practice mode within the Learning Engine | Reuse the existing generic `Practice MCQs` capability; future JMC banks require their own source/item/review/assessment evidence. |
| Cases | Case-based learning or practice mode | No current dedicated Cases container is evidenced; the contract reserves the approved concept without creating a route or component. |
| Progress Analytics | Pathway-specific activity/progress presentation | Reuse generic Learning, Practice, Mastery, pathway progress, and activity hosts only after explicit completion and analytics rules are defined. |

`Assessments` is a cross-cutting governed content/activity type that may be bound to Practice, MCQ, Cases, Clinical Foundation, or Progress Analytics. It is not added as a fourth top-level pathway branch because the approved pathway definition contains exactly three branches.

## 3. Content Types

The pathway may reference the following conceptual content types. Each type must remain traceable to a source and exact version; no content is generated or imported by this contract.

| Content type | Intended pathway use | Minimum future evidence | Allowed relationship to approved structure |
|---|---|---|---|
| Lessons | Rotation, foundation, or learning-engine instruction | Source ID, version, locator, rights, taxonomy/track, medical-review evidence, and audit trail | Bind to Core Rotations, Clinical Foundation, or Learn. |
| Questions | MCQ or question-bank practice items | Question source, stable item identity, exact version, answer/review lineage, rights, track/taxonomy, and audit evidence | Bind to MCQ or Practice. |
| Cases | Case-based learning or assessment material | Source/locator, case identity/version, rights, review, learning/assessment purpose, and audit evidence | Bind to Cases, Emergency Basics, or Clinical Foundation only after an explicit case contract exists. |
| References | Approved reference texts, HTML, journal material, or structured reference records | Source/version/locator, rights/display scope, taxonomy, review state, and audit trail | Bind to Reference/Atlas, Medical Journal, Clinical Foundation, or Learn. |
| Skills | Clinical-skills material and authorized activity evidence | Source lineage plus explicit skills/activity contract; supervised sign-off fields only when separately authorized | Bind to Clinical Skills, Practice, or Progress Analytics; do not infer competency from reading or self-entry. |
| Assessments | Formative or summative evaluation artifacts | Assessment identity/version, item/station lineage, review, scoring/result semantics, rights, track/taxonomy, QA, and audit | Bind cross-cutting to Practice, MCQ, Cases, Clinical Foundation, or Progress Analytics. |

### Canonical schema boundary

The canonical SEG content-record manifest supports individual record kinds such as `knowledge_unit`, `module`, `lesson`, `flashcard`, and `assessment`, but it does not contain pathway membership, parent/child hierarchy, track, assessment options, route fields, or database IDs.[8] Those relationships require separate explicit contracts. This document is a human-readable design contract only; it does not modify the canonical manifest or produce JSON.

A structurally valid content record is not thereby clinically approved. The content record’s observed medical-review state and the pathway’s operational state must remain separate.[8] [9]

## 4. Governance States

The pathway and its bound content follow the required lifecycle:

```text
Source
  → Metadata
  → Review
  → Clinical Approval
  → Activation
```

This sequence is aligned with the official SEG governance workflow, which further distinguishes intake, schema validation, rights/provenance, clinical review, governance registration, Content QA, implementation authorization, and controlled release.[4] [5]

### 4.1 State definitions

| State | Meaning | Evidence required | Learner-facing effect |
|---|---|---|---|
| **Source** | Original source package has been handed off or identified for intake | Stable source identity, exact location, observed type, owner/publisher when supplied, and preservation evidence | Not exposed as pathway content |
| **Metadata** | Source/version/rights/locator/taxonomy/track context is being mapped | Version/checksum, language, locators, rights/display scope, explicit taxonomy, and professional-track context | Not exposed unless later gates pass |
| **Review** | Structural, provenance, rights, taxonomy, QA, and/or clinical review is in progress or pending | Reviewer assignment/decision evidence appropriate to the review type; append-only audit events | Blocked or unavailable while required review is unresolved |
| **Clinical Approval** | Qualified clinical governance has explicitly approved the relevant content records for the intended scope | Attributable clinical decision, review evidence, rights, taxonomy/track, QA, and governance record | Eligible for controlled release only; approval alone does not activate it |
| **Activation** | Approved records are exposed through an authorized, reversible release | Implementation authorization, exact artifact identity, parity, deployment ownership, release evidence, and rollback reference | May be learner-facing within the approved scope |

### 4.2 State boundaries

`Source`, `Metadata`, `Review`, `Clinical Approval`, and `Activation` are governance lifecycle states. They must not be collapsed into a single UI label or treated as a shortcut around clinical review. Operational states such as `BLOCKED`, `QA_PASS`, `RELEASE_DRY_RUN`, and `RELEASED_NOT_ACTIVATED` remain separate from canonical medical-review decisions.[9]

The pathway itself must remain unavailable when a required bound record is missing, unresolved, mixed-track, rights-blocked, clinically unreviewed, QA-blocked, or not included in an authorized release. Optional content may be shown as optional only when that optionality is explicit and governed; it must not be silently substituted with unreviewed content.

### 4.3 Governance responsibilities

| Responsibility | Contract rule |
|---|---|
| Source preservation | Original sources remain immutable and are not deleted, replaced, or silently duplicated. |
| Metadata mapping | Track, taxonomy, version, rights, and locators are recorded from supplied evidence; nothing is inferred from a filename or topic. |
| Review | Structural, rights, provenance, taxonomy, clinical, and QA decisions remain attributable and independently evidenced. |
| Clinical approval | Approval applies to the reviewed content and scope; it does not automatically approve the pathway composition or other records. |
| Activation | Activation requires a separate authorized release and rollback path; no activation occurs in this document. |

## 5. Progress Model

The progress model describes the status of a pathway item, domain, or learner activity in the future pathway experience. It must not overwrite medical-review state or represent completion as clinical competence.

### 5.1 Required progress states

| Progress state | Contract meaning | Required interpretation |
|---|---|---|
| **Not Started** | The learner has no recorded activity for the item/domain, or the item is not yet begun | No conclusion about knowledge, competence, or clinical readiness |
| **In Progress** | The learner has started an authorized activity but has not met the explicit completion rule | Activity is ongoing; do not infer partial clinical competence |
| **Completed** | The learner has met the defined activity/completion rule for the item/domain | Completion is an activity result, not clinical approval or professional certification |
| **Reviewed** | The learner has completed or revisited the required review step, or a governed reviewer event has been recorded according to the applicable contract | The meaning must be bound to a defined review event; it is not automatically a clinical sign-off |
| **Approved** | The relevant governed content/activity has an explicit approved state for the intended scope, or an authorized reviewer has recorded the defined approval event | This is a governance/authorization state, not a learner-achievement claim; it must remain distinct from Completed and from raw learner scores |

### 5.2 Progress-state rules

1. `Not Started`, `In Progress`, and `Completed` describe learner activity only when an explicit activity contract exists.
2. `Reviewed` must identify what was reviewed, by whom or by what authorized event, and against which version; it cannot be inferred from opening a page.
3. `Approved` must not be used to imply that an intern is clinically competent, certified, or ready for independent practice. It refers to content or a separately governed approval event, not to a percentage on a Dashboard card.
4. A learner-facing progress summary must preserve the underlying source/version/track/review state of each bound item.
5. If a completion rule or review event is absent, the system must show an unresolved or unavailable state rather than inventing progress.
6. A pathway cannot be marked available because a learner has completed an item whose content is not clinically approved or whose release is not authorized.

### 5.3 Progress aggregation

A future pathway summary may aggregate progress across Core Rotations, Clinical Foundation, and Learning Engine only after the following are explicitly defined:

| Aggregation input | Required contract detail |
|---|---|
| Rotation progress | Required/optional rotation, milestone order, completion event, and versioned content bindings |
| Foundation progress | Domain-specific lessons, references, skills, assessments, and completion/review rules |
| Learning progress | Lesson/module activity, practice attempts, MCQ results, case activity, and remediation links |
| Analytics | Calculation method, data scope, timestamp, unresolved states, and non-competence disclaimer |
| Assessment results | Attempt identity, scoring method, review state, remediation, and reassessment semantics |
| Skills evidence | Activity identity, supervisor/assessor semantics, sign-off status, and audit trail where authorized |

The current Dashboard’s Learning, Practice, and Mastery percentages are generic presentation capabilities. They must not be relabeled as Internship rotation, clinical-foundation, MCQ, or competency analytics without a separately approved progress contract.[1]

## 6. Architecture alignment rules

The contract aligns to the existing SEG architecture as follows:

| Contract area | Existing SEG host | Alignment rule |
|---|---|---|
| Pathway overview | `#pathway` / My Learning Pathway | Reuse as the future pathway overview host; do not create a duplicate Internship section in this phase. |
| Learning domains | `#learn` / Learn | Reuse for governed lessons/modules after content binding and review. |
| Practice and MCQ | `#practice` / Practice Modes | Reuse the generic practice host; add no JMC/assessment behavior without separate authorization. |
| Cases | `#learn` and `#practice` as future hosts | No current Cases surface is confirmed; reserve the concept without adding a component or route. |
| Progress Analytics | Existing progress cards and activity presentation | Reuse visual host only after progress-event and aggregation rules are governed. |
| Medical Journal | `#journal` / approved-content-only Journal | Reuse only for approved records with source, version, review, and audit evidence. It is not a logbook or rotation registry. |
| Reference / Atlas | `#reference` / Atlas & Visual Assets | Reuse the existing generic Atlas host and its ECG/Critical Care/Toxicology categories; category presence is not activation. |
| Assessments | `#practice` and relevant pathway domains | Treat assessment as a separate governed content/activity contract, not as a new top-level branch. |
| Authentication | Existing `/dashboard` auth boundary | Preserve current OAuth/authentication and access behavior; no pathway authorization change is made here. |
| Routes | Existing `/dashboard` and anchors | No new Internship route is created or required by this design document. |

## 7. Non-actions and validation statement

This contract has been prepared as design alignment only.

| Validation item | Result |
|---|---|
| Uses the approved Internship structure only | `PASS` — Intern Core with exactly Core Rotations, Clinical Foundation, and Learning Engine |
| New architecture created | `NO` |
| New routes created | `NO` |
| New components created | `NO` |
| Application code modified | `NO` |
| Database/schema modified | `NO` |
| Medical content imported | `NO` |
| Content converted to JSON | `NO` |
| Medical content approved | `NO` |
| Pathway activated | `NO` |
| Authentication/OAuth modified | `NO` |
| Assets/Visual Freeze modified | `NO` |
| Commit/push/deployment performed | `NO` |

## 8. Next allowed phase

The next allowed phase is not application implementation. It is a separately authorized, bounded source and pathway-contract preparation step that must identify one explicit source set, language, taxonomy/track context, rights boundary, and review scope. Future content records must pass the SEG source, metadata, schema, rights, clinical review, QA, implementation authorization, and release gates before any activation consideration.[4] [5] [8]

Per Phase 4.5A instructions, this document stops at contract alignment and does not create or activate the pathway.

## References

[1]: /home/ubuntu/seg-manus-status/client/src/pages/DashboardPage.tsx "SEG Dashboard current pathway, learning, practice, journal, atlas, and progress hosts"

[2]: /home/ubuntu/seg-manus-status/client/src/components/DashboardLayout.tsx "SEG authenticated Dashboard shell and existing internal navigation"

[3]: /home/ubuntu/seg-manus-status/client/src/lib/seg-navigation.ts "SEG route and Dashboard access registry"

[4]: /home/ubuntu/seg-manus-status/docs/SEG-CONTENT/SEG_CONTENT_REVIEW_WORKFLOW.md "SEG governed content review workflow"

[5]: /home/ubuntu/seg-manus-status/docs/SEG-GOVERNANCE/SEG_CONTENT_PIPELINE_SPEC.md "SEG content pipeline and activation boundaries"

[6]: /home/ubuntu/seg-manus-status/docs/SEG-CONTENT/SEG_CONTENT_SOURCE_SELECTION.md "SEG source selection and professional-track separation rules"

[7]: /home/ubuntu/skills/seg-metadata-source-mapper/SKILL.md "SEG Metadata & Source Mapper"

[8]: /home/ubuntu/seg-manus-status/docs/SEG-CONTENT/SEG_CONTENT_SCHEMA.md "SEG canonical content-record schema and separate-contract boundaries"

[9]: /home/ubuntu/seg-manus-status/docs/SEG-CONTENT/GOVERNANCE/SEG_STATUS_MATRIX.md "SEG operational status matrix and medical-review separation"
