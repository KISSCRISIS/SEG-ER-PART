# SEG Professional Pathways Governance Model

## Metadata

| Field | Value |
|---|---|
| Document ID | `SEG-PROFESSIONAL-PATHWAYS-GOVERNANCE-4.4` |
| Phase | `4.4 — Professional Pathways Governance Design` |
| Mode | `READ_ONLY DESIGN ANALYSIS` |
| Author | Manus AI |
| Generated date | `2026-08-17` |
| Scope | Internship Doctor Pathway, Emergency Medicine Pathway, and future professional pathways |
| Application changes | None |
| Content import / activation | None |
| Database / routes / components | Not modified |
| Governance state | Design proposal only; not an approval or implementation authorization |
| Output location | `/home/ubuntu/seg-internship-output/` — outside the SEG repository |

## 1. Purpose and decision

This document defines a reusable governance model for professional pathways in the Smart Emergency Guide (SEG). A pathway is treated as a **governed orchestration layer** that organizes approved, traceable content and learner activities for one explicit professional track. It is not itself a medical source, a clinical review decision, a database schema, a route, or an activation command.

The model is designed to reuse the current authenticated Dashboard hosts—My Pathway, Learn, Practice, Atlas & Visual Assets, Medical Journal, and Account—before introducing any new surface. The current application exposes these hosts through `/dashboard` and internal anchors; it does not evidence a dedicated Internship or Emergency Medicine pathway implementation.[1] [2] [3]

> **Core rule:** A pathway may organize content only after each bound record has passed the applicable provenance, rights, taxonomy/track, clinical-review, QA, and implementation gates. A reusable host is not proof that pathway content is approved or learner-facing.

The governing content sequence remains:

> **Source → Version → Governance Record → Clinical Review → Approval → Activation**.[4] [5]

Extraction, pathway composition, assessment design, progress display, QA, and release planning support this sequence; none of them replaces a required gate.[4]

## 2. Pathway concept

### 2.1 Definition

A **Professional Pathway** is a versioned, track-bound plan that defines a learner’s intended progression through a set of governed learning domains, practice activities, assessments, and—where separately authorized—competency or logbook activities. It references content records; it does not duplicate or replace their source payloads.

The pathway layer should answer the following governance questions without making clinical claims of its own:

| Question | Required pathway-level answer |
|---|---|
| Who is the pathway for? | An explicitly supplied professional track and audience; never inferred from a title or UI label. |
| What does it contain? | A versioned list of domains, milestones, content bindings, assessment bindings, and optional activity contracts. |
| Which content may appear? | Only records with the required source, version, rights, taxonomy, review, QA, and release evidence. |
| What is the learner expected to do? | Read, study, practice, assess, or record an authorized activity according to explicit pathway rules. |
| How is progress represented? | As governed activity events and defined completion rules, not as an unqualified claim of competence. |
| When is it available? | Only when the pathway and all required child records satisfy the applicable operational and governance gates. |
| How can it be removed? | Through a documented withdrawal or reversible release action that preserves source and audit history. |

### 2.2 Proposed pathway identity contract

The following is a **conceptual separate pathway contract**, not an amendment to `manifest.schema.json`. The canonical manifest is a record contract for individual content records; it does not contain pathway hierarchy, parent/child relationships, route fields, database IDs, assessment bodies, or track fields.[6]

| Proposed field group | Purpose | Governance rule |
|---|---|---|
| `pathway_id` and `pathway_version` | Stable identity of the pathway definition | A new composition or scope change requires a new version or an explicit governed revision. |
| `display_name` and `purpose` | Human-readable pathway identity | Descriptive only; must not imply clinical approval or professional eligibility by itself. |
| `professional_track` | Audience boundary | Must be explicitly supplied and validated; never inferred from `Internship`, `Emergency Medicine`, a folder, or a UI label. |
| `taxonomy_id` and `taxonomy_version` | Classification boundary | Must align with the supplied governed taxonomy; conflicts block handoff. |
| `language` | Language scope | Explicitly recorded for the pathway and its bound records. |
| `scope` and `domains` | Defines the pathway’s learning areas | Domain labels are structural labels, not permission to invent or rewrite medical content. |
| `content_bindings` | References governed source-derived records | Bindings must resolve to stable record IDs and versions; unresolved or mixed-track bindings block readiness. |
| `assessment_bindings` | References approved assessment records and contracts | Assessment content requires separate traceability, review, and QA evidence. |
| `milestones` and `completion_rules` | Defines sequence, optionality, prerequisites, and completion semantics | Rules must be explicit and must not silently equate completion with clinical competence. |
| `eligibility` | Describes intended audience and access boundary | Must remain separate from authentication and must not alter OAuth or route behavior in this design phase. |
| `governance_state` | External pathway operational state | Must remain separate from canonical `medical_review.decision` values. |
| `audit` and `release_reference` | Preserves composition and release history | Append-only evidence, exact hashes, owner, target, and rollback reference are required before release. |

The contract should be maintained as a separate architecture/governance artifact if implementation is later authorized. No field above should be added to a canonical content record merely to make the pathway relationship fit.[6]

### 2.3 Pathway readiness is fail-closed

A pathway must not become learner-facing because its shell or index exists. A proposed pathway readiness decision should be computed from explicit evidence:

| Readiness condition | Required result |
|---|---|
| Pathway identity, version, audience, track, taxonomy, and scope | Present and internally consistent |
| Every required content binding | Resolves to a stable record and exact version |
| Source and provenance | Complete for every bound record |
| Rights and display scope | Clear for every record and asset used by the intended surface |
| Clinical review and governance | Independently evidenced for every medical-content record |
| Assessment contract | Explicit, traceable, and separately reviewed where applicable |
| Track separation | No unauthorized mixing across the seven SEG tracks |
| Content QA | Exact artifact and lineage checks pass; no hidden repair or inferred data |
| Implementation authorization | Separate authorization names the target, allowed paths, consequence, idempotency, and rollback |
| Release and deployment | Ownership, parity, evidence package, and rollback are present |

If any required condition is missing, ambiguous, conflicting, or unsafe, the pathway remains `BLOCKED` or `DEFERRED`; it is not silently downgraded to a partial release.

## 3. Shared governance components

The following components form the **reusable governance framework**. Some are already evidenced as documentation or generic UI hosts; others are future contracts or capabilities and must not be described as implemented.

| Shared component | Responsibility | Current evidence | Future-pathway reuse rule |
|---|---|---|---|
| Pathway registry | Holds versioned pathway identity, track, taxonomy, scope, state, and ownership | Not evidenced as an application registry; the concept is defined here | One registry contract should support many pathways without hard-coded specialty sections. |
| Source and provenance registry | Preserves source ID, owner/location, version, checksum, locators, rights, and audit | Governed source-selection and metadata-mapping rules exist.[7] [8] | Every pathway binds to existing source identities; originals remain immutable. |
| Canonical content-record validator | Checks individual records against the canonical manifest contract | Read-only schema contract and validator are established.[6] [9] | Run once per record/version; do not treat a structural PASS as clinical approval. |
| Track and taxonomy boundary | Keeps `01_Emergency_Medicine_Physician`, `02_Internship`, `03_Medical_Students`, `04_Paramedic_EMS`, `05_Emergency_Nursing`, `06_General_Practitioner`, and `07_Shared_Medical_Core` separate | Track separation is a project governance rule.[7] [8] | A pathway may reference shared core only through an explicit taxonomy relationship; never merge silently. |
| Content binding layer | Links pathway domains and milestones to exact governed record IDs and versions | Not evidenced as an implemented adapter | Bindings should be declarative and versioned rather than embedded in page-specific code. |
| Governance decision package | Separates rights, clinical review, taxonomy, QA, and implementation decisions | Official workflow and status matrix exist.[4] [10] | A pathway gate may aggregate evidence but cannot replace any underlying decision stream. |
| Assessment contract | Defines question banks, assessments, attempts, scoring, review, and remediation references | Generic Practice/MCQ UI host exists; a governed assessment contract is not evidenced.[1] | Reuse the same contract for JMC, EM, future pathways, OSCE, and other authorized assessment types. |
| Progress event contract | Records learner activity and defined completion events | Generic Learning/Practice/Mastery presentation exists; a formal pathway progress contract is not evidenced.[1] | Store activity meaning separately from clinical governance and do not infer competence from views or scores alone. |
| Audit and evidence ledger | Keeps append-only decisions, hashes, timestamps, reviewer evidence, release identity, and rollback evidence | Governance and QA reporting contracts exist.[4] [10] | Every pathway composition and release must be reproducible from evidence. |
| Reversible integration adapter | Exposes approved records while retaining empty-state fallback | Integration plan defines this as future, separately authorized work.[5] | One adapter boundary should support future pathway bindings without changing auth, database, or routes unless separately authorized. |
| Release and rollback gate | Confirms exact artifact, deployment ownership, parity, and recovery path | Release/rollback rules exist; current deployment ownership issue remains a separate blocker.[11] | A pathway release must be reversible and must not depend on deleting original sources. |

## 4. Shared application hosts

The current Dashboard offers generic visual and interaction boundaries that can be reused in a future implementation. They are **hosts**, not proof that the requested pathways or their medical content are present.

| Existing host | Suitable future pathway role | Boundary |
|---|---|---|
| `#pathway` / My Pathway | Pathway overview, domain sequence, milestones, prerequisites, and progress summary | Current content is generic; no Internship or Emergency Medicine semantics are currently evidenced.[1] |
| `#learn` / Learn | Modules, Lessons, study resources, high-yield reviews, and foundation learning | Only governed, track-correct records may be bound; generic cards do not establish a curriculum. |
| `#practice` / Practice | Question-bank sessions, practice modes, assessments, and review outcomes | JMC, mock exams, OSCE, and specialty assessment contracts are not currently evidenced. |
| `#reference` / Atlas & Visual Assets | Governed visual/reference materials such as ECG, Toxicology, Critical Care, and future approved assets | Asset rights, display scope, source/version, and taxonomy gates remain mandatory. |
| `#journal` / Medical Journal | Approved reading, professional records, saved knowledge, and governed references | Current implementation explicitly preserves an approved-content-only boundary and empty fallback.[1] |
| `#account` / My Account | Profile and access boundary | It is not a clinical logbook, competency sign-off, or pathway registry. |
| `/dashboard` | Existing authenticated shell for the future pathway experience | No new route is proposed or authorized by this document.[2] |

## 5. Content types and pathway relationships

The canonical content contract permits `book`, `html`, `image`, `video`, `question_bank`, `knowledge_unit`, `module`, `lesson`, `flashcard`, and `assessment` as content types.[6] A pathway should reference these records through an external composition contract rather than altering the canonical record.

| Content type | Pathway role | Required governance treatment |
|---|---|---|
| `book`, `html`, `video` | Original or reference source | Preserve source identity, version, rights, locators, and intended display scope. |
| `image` | Atlas or visual reference | Require image rights, display scope, source locator, and taxonomy; do not create placeholders. |
| `question_bank` | Assessment source package | Preserve question/answer lineage and source identity; no learner-facing generation without separate review and authorization. |
| `knowledge_unit` | Traceable concept-level derivative | Must retain source references and remain pending review until independently governed. |
| `module` | Organized learning unit | Requires explicit parent/child contract outside the canonical manifest if hierarchy is needed. |
| `lesson` | Learner-facing instructional unit candidate | Requires exact source/version/track context, review evidence, and approved display state. |
| `flashcard` | Retrieval-practice derivative | Requires source lineage and QA; a flashcard is not a replacement for the source or clinical review. |
| `assessment` | Governed evaluation artifact | Requires assessment contract, item/answer lineage, review evidence, attempt/result semantics, and QA. |

The canonical manifest does not contain pathway membership, parent IDs, assessment options, route fields, database IDs, or track fields. Those relationships require separate explicit contracts and must be validated without weakening the canonical record boundary.[6]

### 5.1 Shared-core content

`07_Shared_Medical_Core` may be reused by multiple pathways only through an explicit taxonomy and governance relationship. A record from `01_Emergency_Medicine_Physician` must not be assigned to `02_Internship` merely because both pathways use a topic such as ECG, Toxicology, or Airway. The binding must preserve the source track and document any authorized relationship.

### 5.2 Pathway-specific content

Pathway-specific records should retain the explicit track supplied during intake. For the Internship Doctor Pathway, the intended track is `02_Internship` because that track is explicitly defined in the project scope. For the Emergency Medicine Pathway, the exact professional track must be supplied and validated before intake; it must not be inferred from the pathway title.[7] [8]

## 6. Assessment layer

The assessment layer is a reusable governance and activity boundary, not merely a collection of question cards. It should support different assessment families while preserving common traceability and review rules.

### 6.1 Common assessment contract

A future assessment contract should define the following conceptual groups separately from the canonical content record:

| Group | Required meaning |
|---|---|
| Assessment identity | Stable assessment ID, version, title, language, pathway binding, track, taxonomy, and scope. |
| Source lineage | Exact question-bank or source record, version, checksum, locators, and rights/display scope. |
| Item contract | Stable item IDs, prompt/options/rationale fields where supplied, item-level source references, and duplicate/reconciliation state. |
| Delivery contract | Practice, mock, formative, summative, OSCE, or other explicitly named mode; timing and attempt rules only when authorized. |
| Review contract | Clinical review, answer-key review, rights review, taxonomy review, and QA state as separate evidence streams. |
| Attempt contract | Learner attempt identity, start/submit state, selected response or station outcome, and timestamp. |
| Result contract | Scoring method, result state, review feedback reference, and remediation link; no inferred competence claim. |
| Governance state | External operational state plus observed canonical medical-review decision; never collapse these into one field. |
| Audit and release | Append-only item/assessment changes, exact hashes, release identity, and rollback reference. |

The current SEG Practice surface provides a reusable visual boundary and a generic MCQ entry point, but it does not evidence the full contract above, nor JMC-specific banks, mock examinations, OSCE stations, or competency outcomes.[1] [12]

### 6.2 Assessment families

| Family | Internship Doctor Pathway | Emergency Medicine Pathway | Future reuse rule |
|---|---|---|---|
| Question-bank practice | JMC banks for Internal Medicine, Surgery, Pediatrics, and OBGYN | Future emergency-medicine question bank if separately supplied | Same item/source/review/attempt contract; only source, track, taxonomy, and scope change. |
| Mock examination | JMC mock exams | Emergency Medicine mock exam if authorized | Same delivery/result contract; timing and scoring must be explicit. |
| Module assessment | Emergency Foundation, Clinical Skills, and learning-module checks | Emergency Cases, Airway, ECG, Toxicology, and Critical Care checks | Bind to reviewed module/lesson records; do not create questions from unreviewed text. |
| OSCE | OSCE stations and structured performance review | Future emergency-procedure stations if authorized | Requires a separate station, rubric, assessor, and evidence contract; not a generic MCQ extension. |
| Logbook / competency evidence | Procedures and rotation evidence | Future supervised emergency activity if authorized | Requires explicit supervisor/sign-off semantics; activity viewed or self-reported is not sign-off. |
| Remediation / review | Targeted review after JMC or OSCE outcomes | Targeted review after pathway assessment outcomes | Link to approved source-derived materials; preserve the original assessment result and audit trail. |

### 6.3 Fail-closed assessment rules

An assessment cannot be exposed if its source identity, version, rights, track/taxonomy, answer/review evidence, or audit trail is missing. A structural QA PASS does not certify clinical correctness or authorize activation.[9] A score must not be represented as competence, certification, or clinical readiness without a separately governed definition and authorized reviewer evidence.

## 7. Progress tracking layer

Progress tracking should be designed as a separate learner-activity contract. It must not overwrite medical-review status and must not create an approval shortcut.

### 7.1 Progress dimensions

| Dimension | What may be measured | What must not be inferred |
|---|---|---|
| Pathway navigation | Started, viewed, resumed, or completed pathway milestone according to explicit rules | Clinical competence or readiness |
| Learning | Lesson/module opened, completed, reviewed, or revisited | That reading equals mastery |
| Retrieval practice | Question attempted, submitted, reviewed, or remediated | That an answer score equals safe clinical performance |
| Assessment | Attempt state, score/result state, review status, and remediation reference | That the result grants professional eligibility or approval |
| Clinical skills | Authorized practice event or supervised observation | That self-entry equals competency sign-off |
| OSCE | Station attempt, assessor decision, rubric outcome, and review event | That one station result proves overall clinical competence |
| Logbook | Explicitly authorized activity record, supervisor identity, sign-off state, and audit trail | That an unverified entry is completed or approved |
| Professional development | Reading/activity completion and plan milestones | That completion guarantees transition success |

### 7.2 Progress-state separation

Three state families must remain distinct:

1. **Content governance state**, such as `CLINICAL_REVIEW_PENDING`, `APPROVED`, `QA_PASS`, or `BLOCKED`.
2. **Pathway operational state**, such as `DESIGN_DRAFT`, `CONTENT_GATES_PENDING`, `READY_FOR_IMPLEMENTATION`, `RELEASED_NOT_ACTIVATED`, `ACTIVE`, `WITHDRAWN`, or `DEFERRED`.
3. **Learner activity state**, such as `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`, `ATTEMPTED`, `REVIEWED`, or `SIGNED_OFF` where a qualified signer is explicitly evidenced.

These states must not be collapsed. The official SEG status matrix explicitly separates operational states from canonical medical-review decisions and forbids a status from authorizing activation or publication.[10]

### 7.3 Progress calculation rule

A future pathway progress summary should be derived only from an explicit completion contract. It should identify which domains are required, optional, or conditional, how a milestone is completed, whether an assessment is formative or summative, and whether a sign-off is required. If the rule is absent, the system should show activity evidence or an unresolved state rather than inventing a percentage or mastery claim.

The current Dashboard’s Learning, Practice, and Mastery metrics are generic presentation capabilities; they are not evidence of an Internship rotation, JMC, OSCE, or logbook progress model.[1]

## 8. Governance lifecycle for a professional pathway

The following lifecycle reuses the existing SEG content gates and adds only the pathway-composition decisions needed to aggregate already-governed records.

| Phase | Pathway governance activity | Exit evidence | Block condition |
|---|---|---|---|
| 0. Pathway proposal | Define intended audience, explicit track, purpose, domains, scope, and owner | Versioned design proposal | Track, scope, or owner is ambiguous |
| 1. Source intake | Inventory source packages for each domain and assessment family | Immutable source inventory and handoff | Source access, identity, or version missing |
| 2. Metadata and schema | Map source/version/rights/taxonomy/locators and validate candidate records | Source map and schema report | Required evidence missing or schema contract unavailable |
| 3. Rights and provenance | Resolve text/image usage and display scope | Rights decision record | Rights unclear or conflicting |
| 4. Clinical review | Review source-derived content by qualified reviewer and scope | Independent clinical decision record | Review evidence absent, conflicted, or unresolved |
| 5. Governance registration | Register records, decisions, track/taxonomy, and audit events | Reproducible governance package | Decision or audit evidence incomplete |
| 6. Pathway composition review | Verify bindings, version compatibility, prerequisites, optionality, and cross-track isolation | Composition review record | Unresolved binding, mixed track, or broken parent/child contract |
| 7. Content QA | Validate exact artifact, lineage, metadata, review state, and repository safety | Deterministic QA report | QA gate fails or evidence is incomplete |
| 8. Implementation authorization | Name target, allowed paths, consequence, idempotency, and rollback | Separate per-run authorization | Authorization absent or too broad |
| 9. Integration and release dry-run | Test additive adapter, empty-state fallback, parity, and rollback | Dry-run and release evidence | Deployment ownership, parity, or rollback missing |
| 10. Controlled activation | Expose approved records only and monitor | Release/activation record | Any required child record is not approved or release is unsafe |
| 11. Review / withdrawal | Monitor expiry, source changes, conflicts, or governance withdrawal | New decision and audit event | Stale or withdrawn content remains exposed |

The composition review is an additional aggregation gate; it does not replace the individual content gates. If one required child record is `BLOCKED`, `REJECTED`, `WITHDRAWN`, or missing, the relevant pathway milestone remains unavailable. A pathway may contain optional content only when optionality is explicit and the learner-facing behavior is governed.

## 9. Reusable architecture strategy

The future architecture should be **data-driven at the governance boundary and host-driven at the UI boundary**. This means the same conceptual pathway registry, content-binding contract, assessment contract, progress-event contract, audit package, and release gate can support different pathways while the current Dashboard hosts remain the presentation boundary.

| Architecture principle | Application to future pathways | Protected boundary |
|---|---|---|
| One pathway model, many pathway instances | Create pathway records/configurations for Internship, Emergency Medicine, and future tracks rather than hard-coding one page per pathway. | No new route or component is created in this phase. |
| One content contract, many content types | Use the canonical record contract for source-derived items and explicit separate contracts for hierarchy, track, assessment, and pathway membership. | Do not add unrecognized pathway fields to the canonical manifest.[6] |
| One assessment contract, many assessment modes | Reuse item lineage, review, attempt, result, and audit groups for JMC, mock, module, OSCE, and future assessments. | Do not infer OSCE/logbook semantics from MCQ UI. |
| One progress-event model, many domains | Record learning, practice, assessment, skills, and plan events using explicit event semantics. | Never equate activity with approval or competence. |
| One governance gate chain, many source packages | Apply the same source/version/rights/review/QA/release evidence to each pathway domain. | Never bypass a gate because a pathway is already visible. |
| Explicit track isolation | Keep professional tracks and taxonomy relationships as separate governed context. | Never infer or silently merge tracks. |
| Additive and reversible exposure | Future adapters expose approved records and preserve empty-state fallback. | No database/auth/route changes without separate authorization.[5] |
| Version everything that changes scope | Version pathways, content bindings, assessments, and release manifests independently. | Preserve prior versions and audit history. |
| Fail closed on missing evidence | Unresolved source, rights, track, clinical, QA, ownership, or rollback evidence blocks the affected domain/pathway. | No placeholders, guessed metadata, or hidden fallback to unreviewed content. |

### 9.1 Supporting future pathways without rebuilding architecture

A future professional pathway should require only a new governed pathway definition, explicit track/taxonomy context, source packages, content bindings, assessment definitions, progress rules, and release evidence. It should not require a new page architecture merely because its domains differ.

For example, a future pathway could contain a different set of domains—such as Paramedic EMS, Emergency Nursing, General Practitioner, or a future shared-core program—while using the same conceptual pathway registry, module/lesson binding, assessment family, progress-event semantics, and governance lifecycle. The content remains isolated by track, and shared material is linked only through explicit taxonomy relationships.

The phrase **without rebuilding architecture** must not be interpreted as permission to bypass a new contract. A pathway with novel behavior, such as supervised clinical sign-off or external certification, requires a separate explicit contract and governance review. Reuse applies to the boundary and lifecycle, not to unverified medical semantics.

## 10. Expected pathway compositions

### 10.1 Internship Doctor Pathway

| Domain | Proposed pathway role | Likely host | Required governance note |
|---|---|---|---|
| Clinical Rotations | Ordered specialty domains and rotation milestones | My Pathway / Learn | Rotation objectives, sequencing, completion rules, and source track must be explicit. |
| JMC Exam Preparation | Four question banks, practice questions, mock exams, and assessments | Practice | Each bank and derivative assessment requires source lineage, review, QA, and separate assessment contract. |
| Emergency Foundation | Emergency Cases, Airway Basics, ED Workflow, First Night Shift, and Handover | Learn / My Pathway | These labels do not authorize content creation; each source package requires intake and governance. |
| Clinical Skills | Framework and procedures learning | Learn / Practice | Skills content must remain source-grounded and track-separated. |
| OSCE | Stations, rubrics, attempts, assessor review, and outcomes | Practice | Requires an explicit OSCE contract; it is not a generic MCQ extension. |
| Logbook | Authorized activity evidence and sign-off | My Pathway / Journal | Requires supervisor and audit semantics; profile UI is not a logbook. |
| Professional Development | Professionalism, transition, roadmap, and study-plan materials | Journal / My Pathway | Reading completion must not be represented as professional eligibility. |
| Assessments | Aggregated formative/summative assessment layer | Practice | Result and remediation rules must be explicit and independently reviewed. |

The Internship pathway is intended for `02_Internship` under the project’s explicit track taxonomy. Its provisional question-bank package remains a governed preparation artifact and must not be treated as activated pathway content.[13]

### 10.2 Emergency Medicine Pathway

| Domain | Proposed pathway role | Likely host | Required governance note |
|---|---|---|---|
| Emergency Cases | Case-based learning and review | Learn / Practice | Case source, version, locators, review, and display scope are required. |
| Airway Basics | Foundational learning and practice | Learn / Practice | Do not infer level or clinical correctness from an existing generic airway label. |
| ECG Essentials | Learning and reference | Learn / Atlas / Journal | ECG references and assets require source/version/rights/taxonomy evidence. |
| Toxicology | Learning and reference | Learn / Atlas / Journal | Existing Atlas category is a reusable host only, not pathway content proof.[1] |
| Critical Care Foundations | Foundational learning and reference | Learn / Atlas / Pathway | Existing Critical Care category is a reusable host only; track and review remain required.[1] |

The exact professional track for this pathway must be supplied and validated before intake. It must not be inferred solely from the name “Emergency Medicine Pathway.”

### 10.3 Future professional pathways

Future pathways should be represented as additional versioned pathway definitions with their own explicit track, taxonomy, scope, content bindings, assessment rules, and progress semantics. They should use the same gate chain and release/rollback policy. A future pathway may reuse `07_Shared_Medical_Core` only where the taxonomy contract explicitly authorizes the relationship; it must retain its own track identity and audit trail.

## 11. Non-actions and protected boundaries

| Check | Result |
|---|---|
| Routes created | `NO` |
| Components created or modified | `NO` |
| CSS/assets modified | `NO` |
| Authentication/OAuth modified | `NO` |
| Database schema or data modified | `NO` |
| Medical content imported or rewritten | `NO` |
| Content approved or activated | `NO` |
| Assessment items generated | `NO` |
| Progress records created | `NO` |
| Commit or push performed | `NO` |
| Deployment or redeployment performed | `NO` |
| Visual Freeze changed | `NO` |

## 12. Design conclusion

SEG can support multiple professional pathways without rebuilding its core architecture if it separates **pathway composition**, **content governance**, **assessment delivery**, **learner progress**, and **release control** into explicit contracts. The current Dashboard provides reusable generic hosts, but the requested Internship and Emergency Medicine pathway semantics are not currently implemented.[1] [2] [3]

The safest future sequence is to establish the pathway contract and source/track/taxonomy boundaries first, then process one explicit source set and one professional track at a time. Only after individual content governance, pathway composition QA, implementation authorization, deployment ownership, and rollback evidence are complete may a future adapter expose approved records.[4] [5] [10]

This document is a design analysis only. It does not create an implementation backlog ticket, approve any content, define a database schema, authorize a route, or authorize a release.

## References

[1]: /home/ubuntu/seg-manus-status/client/src/pages/DashboardPage.tsx "SEG Dashboard generic Pathway, Learn, Practice, Atlas, Journal, and progress hosts"

[2]: /home/ubuntu/seg-manus-status/client/src/components/DashboardLayout.tsx "SEG authenticated Dashboard shell and anchor navigation"

[3]: /home/ubuntu/seg-manus-status/client/src/App.tsx "SEG current route registry"

[4]: /home/ubuntu/seg-manus-status/docs/SEG-CONTENT/SEG_CONTENT_REVIEW_WORKFLOW.md "SEG governed content review workflow"

[5]: /home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_INTEGRATION_PLAN.md "SEG content integration plan and adapter boundary"

[6]: /home/ubuntu/seg-manus-status/docs/SEG-CONTENT/SEG_CONTENT_SCHEMA.md "SEG canonical content schema crosswalk"

[7]: /home/ubuntu/seg-manus-status/docs/SEG-CONTENT/SEG_CONTENT_SOURCE_SELECTION.md "SEG source selection and track separation rules"

[8]: /home/ubuntu/skills/seg-metadata-source-mapper/SKILL.md "SEG Metadata & Source Mapper"

[9]: /home/ubuntu/skills/seg-content-architecture-schema-validator/SKILL.md "SEG Content Architecture / Schema Validator"

[10]: /home/ubuntu/seg-manus-status/docs/SEG-CONTENT/GOVERNANCE/SEG_STATUS_MATRIX.md "SEG unified operational status matrix"

[11]: /home/ubuntu/seg-manus-status/docs/SEG-GOVERNANCE/SEG_DEPLOYMENT_STATUS.md "SEG deployment status and ownership evidence"

[12]: /home/ubuntu/skills/seg-content-qa/SKILL.md "SEG Content QA gate"

[13]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_MASTER_QUESTION_BANK_v1.1.md "SEG Internship provisional question-bank master"
