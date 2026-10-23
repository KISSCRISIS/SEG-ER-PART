# SEG Pathway Gap Analysis

## Metadata

| Field | Value |
|---|---|
| Document ID | `SEG-PATHWAY-GAP-ANALYSIS-4.4` |
| Phase | `4.4 — Professional Pathways Governance Design` |
| Mode | `READ_ONLY DESIGN ANALYSIS` |
| Scope | Internship Doctor Pathway, Emergency Medicine Pathway, and future professional pathways |
| Generated date | `2026-08-17` |
| Application changes | None |
| Content import / activation | None |
| Database / routes / components | Not modified |
| Implementation authorization | Not requested or granted |
| Output location | `/home/ubuntu/seg-internship-output/` — outside the SEG repository |

## Executive finding

SEG currently provides a **reusable generic shell** for authenticated pathway, learning, practice, reference, journal, account, and progress presentation. The current client route registry contains `/dashboard` and internal anchors rather than dedicated professional-pathway routes.[1] [2] [3] These capabilities are useful host boundaries, but they do not constitute an implemented Internship Doctor Pathway or Emergency Medicine Pathway.

The principal gaps are not solved by adding labels to existing cards. A future pathway requires a separate composition contract, explicit track/taxonomy context, versioned content bindings, assessment semantics, progress-event rules, clinical-skills/OSCE/logbook contracts, and a reversible governed integration boundary. The official SEG content workflow already supplies the evidence gates and must remain the source of truth.[4] [5]

> **Decision:** Future implementation is **BLOCKED for learner-facing pathway exposure** until pathway contracts, governed source packages, independent review evidence, QA, implementation authorization, deployment ownership, parity, and rollback evidence are complete. This Phase 4.4 report performs no implementation.

## 1. Existing SEG capabilities

### 1.1 Application capabilities confirmed by source inspection

| Existing capability | Status | Evidence | Reusable pathway role | Limitation |
|---|---|---|---|---|
| Authenticated `/dashboard` shell | `PRESENT` | `DashboardLayout` uses the existing auth state and protects the dashboard; `/dashboard` is registered in the route switch.[1] [2] | Common authenticated host for future pathways | Not a pathway registry or professional-track authorization layer. |
| My Pathway anchor | `PRESENT / GENERIC` | `#pathway` renders “My Learning Pathway,” learning steps, milestones, and generic progress.[1] | Host for future pathway overview and milestones | No Internship rotations, Emergency Medicine domains, or explicit pathway contract is evidenced. |
| Learn anchor | `PRESENT / GENERIC` | `#learn` renders learning workspace, module cards, and progress metrics.[1] | Host for governed Modules, Lessons, summaries, reviews, and foundations | Generic module labels do not establish track, source, review, or activation status. |
| Practice anchor | `PRESENT / GENERIC` | `#practice` renders practice modes, generic MCQ entry, activity, and performance presentation.[1] | Host for question-bank practice, mock exams, assessments, and review | JMC bank selection, mock-exam state, assessment contract, OSCE, and logbook workflows are not evidenced. |
| Atlas / Reference anchor | `PRESENT / GENERIC` | `#reference` includes Anatomy, ECG, Imaging, Ultrasound/POCUS, Critical Care, and Toxicology categories in the Dashboard source.[1] | Host for governed visual/reference content | A category is not proof of Internship or Emergency Medicine content availability, rights clearance, or track assignment. |
| Medical Journal anchor | `PRESENT / GOVERNED EMPTY BOUNDARY` | `#journal` requires approved source, version, review status, and audit trail before display and preserves an approved-content-only state.[1] | Host for approved reading, professional-development material, and records | It is not a pathway registry, logbook, or automatic content importer. |
| Account boundary | `PRESENT` | `#account` and profile controls exist in the Dashboard shell.[2] | Profile/access boundary for a future pathway experience | Account UI is not a competency record, supervisor sign-off, or logbook. |
| Mobile/desktop anchor navigation | `PRESENT` | `DashboardLayout` provides navigation for My Home, My Pathway, Learn, Practice, Atlas & Visual Assets, Medical Journal, and My Account.[2] | Reusable navigation boundary | No Internship or Emergency Medicine navigation item is evidenced. |
| Generic Learning/Practice/Mastery metrics | `PRESENT / GENERIC` | Dashboard progress widgets render generic metrics and activity.[1] | Visual host for future governed progress summaries | No rotation, JMC, OSCE, logbook, or competency calculation contract is evidenced. |

### 1.2 Governance and content-preparation capabilities confirmed by project evidence

| Existing governance capability | Status | Evidence | Reusable pathway role | Limitation |
|---|---|---|---|---|
| Source handoff and READ_ONLY intake model | `PRESENT AS GOVERNANCE CONTRACT` | SEG workflow defines source handoff, immutable intake, identity, version, checksum, rights, locators, and explicit track/taxonomy fields.[4] [6] | Common intake for every future pathway | It does not supply missing source packages or approve content. |
| Canonical content-record schema | `PRESENT AS RECORD CONTRACT` | Canonical contract requires identity, content type, language, source, version, references, rights, taxonomy, medical review, and audit.[7] [8] | Shared structural validation for content records | It is not a pathway schema, database schema, assessment-body schema, or route contract.[8] |
| Track separation | `PRESENT AS GOVERNANCE RULE` | Seven professional tracks are explicitly enumerated and must not be inferred or silently mixed.[6] [9] | Protects Internship, physician, EMS, nursing, GP, student, and shared-core boundaries | Exact pathway track must be supplied; pathway title alone is insufficient. |
| Medical review and rights gates | `PRESENT AS GOVERNANCE CONTRACT` | Workflow separates rights/provenance, clinical review, registration, QA, and implementation authorization.[4] [5] | Common gate chain for all pathway-bound medical content | No pathway record becomes approved merely because the gate exists. |
| Content QA | `PRESENT AS GOVERNANCE CAPABILITY` | QA requires exact artifact, schema/metadata/lineage, review, rights, track separation, and repository safety checks.[10] | Shared fail-closed QA before integration | A QA PASS is not clinical approval or activation. |
| Integration and rollback boundary | `PRESENT AS DESIGN CONTRACT` | Integration plan allows only a separately authorized additive/reversible adapter and preserves the empty-state fallback.[5] | Shared future release boundary | No implementation authorization exists in this phase. |
| Release and deployment parity gate | `PRESENT AS GOVERNANCE REQUIREMENT` | Release requires candidate identity, ownership, local/remote/deployed parity, and rollback evidence.[11] | Common release gate for every pathway | Existing deployment ownership/stale-runtime issue remains a separate blocker and was not changed here. |

## 2. Missing capabilities

### 2.1 Missing pathway-governance capabilities

| Missing capability | Status | Why it is required | Consequence if absent |
|---|---|---|---|
| Versioned pathway registry | `MISSING` | SEG needs a stable identity, version, owner, purpose, scope, track, taxonomy, and operational state for each pathway. | Pathway definitions would be page-specific or ambiguous, preventing reproducible composition. |
| Pathway composition contract | `MISSING` | Domains, milestones, prerequisites, optionality, content bindings, assessments, and completion rules require a separate contract. | Generic cards cannot represent a governed Internship or Emergency Medicine sequence. |
| Explicit pathway track/taxonomy context | `MISSING / BLOCKED UNTIL SUPPLIED` | Track must be explicit and must not be inferred from pathway name, folder, or UI label.[6] [9] | Cross-track contamination or invalid learner targeting could occur. |
| Versioned content-binding layer | `MISSING` | Each domain must bind to an exact record ID and version without copying source payloads. | Content drift, unresolved references, and broken lineage cannot be detected reliably. |
| Pathway-level composition review | `MISSING` | A reviewer must verify that child records, versions, prerequisites, and track boundaries form a coherent package. | Individual PASS results could be mistaken for pathway readiness. |
| Pathway operational-state model | `MISSING` | Pathway design, gate status, release, activation, withdrawal, and deferral must be separated from medical-review decisions.[12] | A UI state could be incorrectly treated as approval or activation. |
| Pathway audit/release manifest | `MISSING` | Composition changes and releases need append-only evidence, hashes, owner, target, and rollback identity. | Reproducibility and rollback would be incomplete. |

### 2.2 Missing content and assessment capabilities

| Missing capability | Status | Internship Doctor Pathway impact | Emergency Medicine Pathway impact |
|---|---|---|---|
| Governed pathway content library | `MISSING` | No complete governed containers for rotations, Emergency Foundation, skills, or professional development are evidenced. | No pathway-specific Cases, Airway Basics, ECG Essentials, Toxicology, or Critical Care Foundations package is evidenced. |
| JMC question-bank model | `MISSING` | Four bank identities, item lineage, reconciliation state, practice mode, and mock-exam binding are not represented by the generic Practice surface.[1] | Not required for the initial scope, but the same reusable assessment contract should remain available. |
| Assessment contract | `MISSING` | Practice, mock exams, module checks, assessments, result review, and remediation require explicit semantics. | Future emergency assessments require the same contract. |
| OSCE contract | `MISSING` | Stations, rubrics, assessor identity, attempt state, review, and outcome are not generic MCQ behavior. | Future procedure-based assessments would need the same separate contract. |
| Clinical-skills contract | `MISSING` | Procedures, skill practice, competency evidence, and prerequisites are not represented. | Airway and critical-care skills would need explicit semantics if later included. |
| Logbook contract | `MISSING` | Rotation/procedure entries, supervisor sign-off, evidence, and audit are absent. | Not in the initial EM scope but must be extensible without treating self-entry as sign-off. |
| Professional-development content contract | `MISSING` | Professionalism, transition, roadmap, and study-plan records and completion semantics are not evidenced. | A future pathway may reuse the same reading/plan contract. |
| Assessment-result and remediation layer | `MISSING` | No governed result, feedback, remediation, or reassessment relationship is evidenced. | Same gap for future Emergency Medicine assessments. |
| Pathway-specific progress-event model | `MISSING` | Generic progress percentages do not distinguish rotations, JMC, OSCE, logbook, or professional development.[1] | Generic metrics do not measure Emergency Medicine domain completion. |

### 2.3 Missing application/integration capabilities

| Missing capability | Status | Evidence interpretation |
|---|---|---|
| Declarative pathway configuration boundary | `MISSING` | The current code shows page-local arrays and generic hosts; no pathway registry/configuration boundary is evidenced.[1] |
| Approved-only pathway adapter | `MISSING / NOT AUTHORIZED` | The integration plan defines this as future work after governance and separate authorization, not as current behavior.[5] |
| Empty-state and withdrawal behavior at pathway level | `PARTIAL` | The Journal has an approved-content-only empty state, but an equivalent pathway-level fallback is not evidenced.[1] |
| Pathway access/eligibility boundary | `MISSING` | Authentication exists, but pathway-specific eligibility is not a substitute for OAuth or an authorization contract. |
| Pathway deployment ownership and parity | `BLOCKED` | Deployment ownership and parity are prerequisites for controlled publication; the current project has a separate stale-runtime/ownership blocker.[11] |
| Monitoring and periodic review | `MISSING` | No pathway-level expiry, source-update, withdrawal, or review cadence surface is evidenced. |

## 3. Pathway-specific gap matrix

### 3.1 Internship Doctor Pathway

| Required domain | Existing host | Current capability | Gap decision |
|---|---|---|---|
| Clinical Rotations | `#pathway`, `#learn` | Generic pathway steps and learning modules | `MISSING` rotation container, specialty sequence, objectives, prerequisites, and completion rules |
| JMC Exam Preparation | `#practice` | Generic Practice/MCQ entry | `MISSING` four-bank identity, mock-exam workflow, assessment contract, item lineage, and JMC progress model |
| Emergency Foundation | `#learn`, `#pathway` | Generic learning/pathway hosts | `MISSING` governed case/workflow package and Internship-specific foundation sequence |
| Clinical Skills | `#learn`, `#practice` | Generic learning and practice hosts | `MISSING` procedure taxonomy, skill practice, competency evidence, and track-specific progression |
| OSCE | `#practice` | Generic practice host only | `MISSING` station, rubric, assessor, attempt, result, and remediation contract |
| Logbook | `#pathway`, `#journal`, `#account` | Generic milestones, records, and profile boundary | `MISSING` supervised activity, evidence, sign-off, audit, and withdrawal semantics |
| Professional Development | `#journal`, `#pathway`, `#learn` | Generic approved-reading and pathway hosts | `MISSING` Internship-specific content package and plan/roadmap completion contract |
| Assessments | `#practice` | Generic activity/performance display | `MISSING` governed assessment registry, result model, remediation, and review state |

The provisional Internship Question Bank v1.1 remains a source-derived package with `Pending Clinical Review`, 2,842 reconciled records, 105 unresolved incomplete candidates, and zero supported recoveries from the Phase 4.2.2 recovery process. It is therefore not a pathway-ready or activated assessment set.[13] This finding is a content-governance blocker, not an implementation task performed here.

### 3.2 Emergency Medicine Pathway

| Required domain | Existing host | Current capability | Gap decision |
|---|---|---|---|
| Emergency Cases | `#learn`, `#practice` | Generic learning/practice hosts | `MISSING` governed case container, source-bound case records, and case-review/progress semantics |
| Airway Basics | `#learn`, `#practice` | Generic learning surface includes airway-related labels | `MISSING` pathway-specific foundation scope, content binding, assessment, and competency boundary |
| ECG Essentials | `#learn`, `#reference`, `#journal` | ECG Atlas category and generic learning/reference hosts | `PARTIAL host only`; pathway-specific records, track, review, and display scope remain unverified |
| Toxicology | `#learn`, `#reference`, `#journal` | Toxicology Atlas category and generic hosts | `PARTIAL host only`; no pathway-specific governed collection is evidenced |
| Critical Care Foundations | `#learn`, `#reference`, `#pathway` | Critical Care Atlas category and generic hosts | `PARTIAL host only`; no pathway-specific foundation sequence or governed binding is evidenced |

The exact professional track for an Emergency Medicine Pathway is not established by the pathway title alone. It must be explicitly supplied and validated before source intake. This prevents an unapproved transfer of physician-track content into another pathway.[6] [9]

### 3.3 Future Professional Pathways

| Scalability requirement | Current state | Gap |
|---|---|---|
| Add a new pathway by configuration rather than page rewrite | Generic hosts exist, but no pathway configuration contract is evidenced | `MISSING` versioned pathway registry and composition contract |
| Preserve track isolation while sharing core content | Governance rules exist | `PARTIAL` governance rule; binding and taxonomy relationship contract are missing |
| Reuse assessment and progress semantics | Generic Practice/progress presentation exists | `MISSING` reusable assessment and progress-event contracts |
| Support novel workflows safely | No OSCE/logbook/supervision contract is evidenced | `MISSING` explicit contracts for any novel behavior |
| Release and withdraw one pathway independently | Release/rollback guidance exists | `MISSING` pathway-level release manifest, activation state, and monitoring surface |

## 4. Recommended future implementation order

The order below is a **recommendation**, not execution. Every step requires its own scope, evidence, and authorization. The order preserves the principle of reusing existing architecture and avoids creating a duplicate section before a confirmed contract exists.

| Order | Future phase | Objective | Required outputs | Gate / stop condition |
|---:|---|---|---|---|
| 0 | Governance decision and scope freeze | Select one initial pathway, explicit track, language, scope, and owner. | Decision record and bounded scope statement. | Stop if pathway identity, track, or owner is ambiguous. |
| 1 | Pathway contract design | Define pathway identity, version, domains, milestones, bindings, optionality, state, and audit fields as a separate contract. | Versioned pathway contract and composition rules. | Stop if the contract requires modifying the canonical content manifest or protected architecture. |
| 2 | Source handoff and metadata mapping | Inventory one source set and preserve originals; capture source/version/checksum/rights/locators/track/taxonomy. | Source inventory, metadata map, missing-data register. | Stop on missing or conflicting provenance, rights, track, taxonomy, or source access. |
| 3 | Canonical record and hierarchy validation | Validate individual records and any separate parent/child contract without mutation. | Schema report and hierarchy/lineage findings. | Stop on schema failure, unknown fields, broken lineage, or mixed tracks. |
| 4 | Rights and clinical governance | Complete independent rights, clinical, taxonomy, and audit decisions. | Governance decision package with observed states. | Stop when any required stream is absent or conflicting. |
| 5 | Bounded content pilot | Convert only an explicitly authorized, small source set and retain `Pending Clinical Review` / `NOT_APPROVED`. | Traceable provisional Knowledge Units, Modules, Lessons, Flashcards, or Assessments as applicable. | Stop if claims are invented, sources are merged, or track is inferred. |
| 6 | Assessment and progress contracts | Define JMC/EM assessment families, attempts, results, remediation, activity events, and competency boundaries. | Separate assessment and progress contracts; no automatic clinical claims. | Stop if score/progress semantics imply competence without evidence. |
| 7 | Pathway composition review | Assemble approved/eligible bindings, verify prerequisites, versions, optionality, track isolation, and child-state consistency. | Composition review record and pathway readiness matrix. | Block the pathway if any required child record is unavailable or not approved. |
| 8 | Content QA and integration dry-run | Validate exact artifacts, hashes, metadata, lineage, repository safety, idempotency, isolation, and rollback. | QA report, integration dry-run, rollback plan. | Stop on QA failure, missing authorization, unsafe target, or missing rollback. |
| 9 | Additive implementation in existing hosts | Only after explicit authorization, expose approved records through the existing dashboard boundary and preserve empty-state fallback. | Minimal reversible adapter and tests; no duplicate route unless separately justified. | Stop if auth, database, routes, assets, or Visual Freeze would change outside scope. |
| 10 | Deployment parity and controlled release | Confirm deployment ownership, source/build identity, local/remote/deployed parity, runtime behavior, and rollback. | Release manifest, evidence package, parity report, rollback reference. | Block if ownership or parity is missing; do not create an unrelated Website/WebDev project. |
| 11 | Activation and monitoring | Expose only approved records, monitor activity and source/review expiry, and preserve withdrawal path. | Activation record, monitoring/periodic-review plan, withdrawal procedure. | Withdraw or block affected records when governance or source validity changes. |

## 5. Priority order for the first future pathway

### 5.1 Recommended first candidate: bounded Internship sub-scope

The full Internship Doctor Pathway is broad and should not be implemented as one uncontrolled batch. If separately authorized, the safer future sequence would begin with one bounded sub-scope—one source set, one language, one explicit `02_Internship` track, and one domain such as a governed study-resource or question-bank pilot—before composing the complete pathway. This follows the SEG implementation strategy of starting with one source set, one scope, one language, and one professional track.[14]

The existing provisional JMC package should not be selected as implementation-ready merely because reconciliation completed. It remains pending clinical review with unresolved incomplete candidates.[13]

### 5.2 Emergency Medicine pathway sequencing

The Emergency Medicine Pathway should begin only after its exact professional track is explicitly supplied. A reasonable future design sequence would establish the pathway contract, intake one bounded domain, complete rights/clinical review, validate the record set, and then compose it into the existing Learn/Reference/Pathway hosts. ECG, Toxicology, and Critical Care Atlas labels may be reused as host boundaries, but their presence does not establish pathway readiness.[1]

### 5.3 Future pathway onboarding pattern

Every additional professional pathway should use the same onboarding checklist: explicit track and taxonomy, source package and rights, canonical record validation, review and audit evidence, pathway composition review, assessment/progress contracts where needed, QA, implementation authorization, release ownership, parity, and rollback. Only the pathway definition, bound source records, assessment configuration, and progress rules should vary; the governance lifecycle must remain shared.

## 6. Confirmed, unverified, and requires-validation findings

| Classification | Finding |
|---|---|
| `CONFIRMED` | The current application exposes generic Dashboard hosts for My Pathway, Learn, Practice, Atlas & Visual Assets, Medical Journal, and Account.[1] [2] |
| `CONFIRMED` | The client route registry contains `/dashboard` but no dedicated Internship or Emergency Medicine pathway route.[3] |
| `CONFIRMED` | The governance documents define source mapping, schema validation, rights/provenance, clinical review, QA, separate implementation authorization, release, and rollback gates.[4] [5] [10] |
| `CONFIRMED` | The canonical content contract does not contain pathway membership, hierarchy, assessment bodies, database IDs, route fields, or `track`; these require separate contracts.[8] |
| `CONFIRMED` | The provisional Internship Question Bank v1.1 remains pending clinical review with unresolved incomplete candidates and zero supported recoveries.[13] |
| `UNVERIFIED` | Whether any hidden backend or external storage contains pathway records not represented by the inspected client architecture. This phase did not inspect or modify such systems. |
| `UNVERIFIED` | Whether the named Emergency Medicine sources exist as complete, accessible, rights-cleared packages. The pathway request names domains but does not establish source intake evidence. |
| `REQUIRES VALIDATION` | The exact professional track and taxonomy for the Emergency Medicine Pathway before any source mapping. |
| `REQUIRES VALIDATION` | The exact pathway, assessment, progress, OSCE, logbook, and implementation contracts before structural implementation. |
| `HISTORICAL ONLY` | Previous chat descriptions not re-established by current source files. They do not authorize implementation or override the current repository/governance evidence. |

## 7. Protected-boundary confirmation

| Boundary | Result |
|---|---|
| Routes | Not modified |
| Components | Not modified |
| CSS/assets | Not modified |
| Authentication/OAuth | Not modified |
| Database/schema | Not modified |
| Medical content | Not imported, rewritten, approved, or activated |
| Existing Dashboard architecture | Preserved |
| Visual Freeze | Preserved |
| Commit/push | Not performed |
| Deployment/redeployment | Not performed |

## 8. Next allowed phase

The next allowed phase is **a separately authorized bounded pathway contract and governed source-intake design**, beginning with one explicit pathway, one scope, one language, and one professional track. The immediate governance gate is not application implementation. It is evidence completion for source identity, version, rights, taxonomy/track, review scope, and audit.

Per the Phase 4.4 instruction, execution stops after generation of this report and the Professional Pathways Governance Model. No implementation should begin from the recommendations in this document without a new explicit authorization.

## References

[1]: /home/ubuntu/seg-manus-status/client/src/pages/DashboardPage.tsx "SEG Dashboard generic pathway, learning, practice, reference, journal, and progress surfaces"

[2]: /home/ubuntu/seg-manus-status/client/src/components/DashboardLayout.tsx "SEG authenticated Dashboard shell and internal navigation"

[3]: /home/ubuntu/seg-manus-status/client/src/App.tsx "SEG route registry"

[4]: /home/ubuntu/seg-manus-status/docs/SEG-CONTENT/SEG_CONTENT_REVIEW_WORKFLOW.md "SEG governed content review workflow"

[5]: /home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_INTEGRATION_PLAN.md "SEG content integration and reversible adapter boundary"

[6]: /home/ubuntu/seg-manus-status/docs/SEG-CONTENT/SEG_CONTENT_SOURCE_SELECTION.md "SEG source selection and track separation rules"

[7]: /home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "SEG canonical governed content-record schema"

[8]: /home/ubuntu/seg-manus-status/docs/SEG-CONTENT/SEG_CONTENT_SCHEMA.md "SEG canonical schema crosswalk and separate-contract boundaries"

[9]: /home/ubuntu/skills/seg-metadata-source-mapper/SKILL.md "SEG Metadata & Source Mapper"

[10]: /home/ubuntu/skills/seg-content-qa/SKILL.md "SEG Content QA gate"

[11]: /home/ubuntu/seg-manus-status/docs/SEG-GOVERNANCE/SEG_DEPLOYMENT_STATUS.md "SEG deployment status and ownership evidence"

[12]: /home/ubuntu/seg-manus-status/docs/SEG-CONTENT/GOVERNANCE/SEG_STATUS_MATRIX.md "SEG unified operational status matrix"

[13]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_MASTER_QUESTION_BANK_v1.1.md "SEG Internship provisional question-bank master"

[14]: /home/ubuntu/seg-manus-status/docs/SEG-GOVERNANCE/SEG_CONTENT_PIPELINE_SPEC.md "SEG content pipeline specification and bounded implementation strategy"
