# SEG Internship Content Mapping Plan

## Metadata

| Field | Value |
|---|---|
| Document ID | `SEG-INTERNSHIP-CONTENT-MAPPING-PLAN-4.3` |
| Phase | `4.3 — Internship Content Mapping Design` |
| Mode | `READ_ONLY ARCHITECTURE MAPPING` |
| Professional track | `02_Internship` |
| Generated date | `2026-08-17` |
| Source package | Phase 4.3 category brief plus existing SEG source, application, and governance evidence |
| Clinical approval | Not performed |
| Integration / activation | Not performed |
| Output location | `/home/ubuntu/seg-internship-output/` — outside the SEG repository |

## Scope and decision rule

This document maps the complete Internship package described in the Phase 4.3 brief against the **existing SEG dashboard information architecture**. The mapping is structural only. It does not convert, summarize, classify, validate, import, activate, or publish medical content. The eight required categories and their sub-items are taken from the Phase 4.3 brief.[1]

The decision rule is **reuse existing SEG architecture first**. A generic workspace is recorded as a reusable host, but it is not treated as an Internship pathway, an approved content surface, or evidence that Internship material is already available to learners. The existing dashboard contains anchor-based workspaces for Pathway, Learn, Practice, Atlas/Reference, Medical Journal, and Account; the current application does not register a dedicated Internship route.[2] [3] [4]

For this report, the aggregate status has the following meaning:

| Status | Meaning in this mapping |
|---|---|
| `FOUND` | A dedicated existing SEG location and a corresponding reusable component are evidenced for the complete mapped category. |
| `PARTIAL` | A generic existing SEG host is reusable in principle, but one or more category-specific containers, content surfaces, or governed records are not evidenced. |
| `MISSING` | No suitable existing host is evidenced for the mapped function, or the required dedicated surface is explicitly absent. |

Because the current SEG evidence shows generic hosts but no dedicated Internship implementation, the category-level results are `PARTIAL`; the missing dedicated containers and surfaces are recorded explicitly rather than being hidden inside a pass-like status.[6]

## Existing SEG architecture used for mapping

| Existing SEG location | Evidence of current capability | Reusable role for future approved Internship content | Current limitation |
|---|---|---|---|
| `/dashboard` authenticated shell | Dashboard is rendered behind the existing authentication boundary; unauthenticated users are directed to sign in.[3] | Common authenticated host for future approved learner content. | It is not an Internship route and does not prove content readiness. |
| `#pathway` / **My Pathway** | `PathwaySection` contains a generic learning pathway, module steps, milestones, and Learning/Practice/Mastery progress.[2] [5] | Candidate host for an Internship roadmap, rotation sequence, or governed study plan. | No Internal Medicine, Surgery, Pediatrics, OBGYN, Emergency Basics, or Internship-labelled rotation structure is evidenced. |
| `#learn` / **Learn** | `LearnSection` contains generic learning modules, continuation controls, overview metrics, and module cards such as airway, ACLS, and trauma-related learning items.[2] [5] | Candidate host for reviewed study summaries, high-yield material, Emergency Foundation lessons, and medical essentials lessons. | No Internship-specific module taxonomy or source-derived package surface is evidenced. |
| `#practice` / **Practice** | `PracticeSection` contains generic practice modes, a `Practice MCQs` quick action, activity records, and progress indicators.[2] [5] | Candidate host for approved question-bank practice, mock exams, and assessments after separate governance and integration authorization. | No JMC-labelled bank, mock-exam workflow, Internship assessment container, scoring contract, or dedicated assessment route is evidenced. |
| `#reference` / **Atlas & Visual Assets** | `AtlasSection` defines visual categories for Anatomy, ECG, Imaging, Ultrasound/POCUS, Critical Care, and Toxicology.[2] [5] | Candidate host for reviewed reference material and visual medical assets, including ECG and Toxicology references where track/provenance remain explicit. | It is a visual information-architecture surface, not evidence of Internship content. Drug Essentials and Internship-specific reference collections are not evidenced there. |
| `#journal` / **Medical Journal** | `JournalSection` includes professional records, learning activity, a disabled search field, and an explicit approved-content-only reading state.[2] [5] | Candidate host for approved study resources, high-yield references, professional-development records, and governed reading items. | Journal articles require source, version, review status, and audit trail; the existing reading interface is empty for approved journal articles. |
| `#account` / **My Account** | `DashboardLayout` provides the account rail, profile summary, theme control, and sign-out action.[3] | Reusable account/profile boundary only; potentially a future location for non-medical learner metadata. | Not a content library, pathway, assessment, logbook, or professional-development content surface. |
| User progress widgets | Dashboard includes Learning, Practice, and Mastery values and activity/progress cards.[2] | Reusable progress presentation for future governed Internship activity if an authorized data contract exists. | Static/generic presentation evidence does not establish an Internship progress model, rotation completion model, or assessment analytics contract. |

## Category mapping table

| Internship Content | Existing SEG Location | Reusable Component | Status | Notes |
|---|---|---|---|---|
| **1. Clinical Rotations** — Internal Medicine, Surgery, Pediatrics, Obstetrics & Gynecology, Emergency Basics | `#pathway` / My Pathway; `#learn` / Learn | `PathwaySection`; `LearnSection`; existing progress widgets | `PARTIAL` | Generic pathway and learning hosts exist. A dedicated rotation sequence, specialty containers, rotation objectives, Emergency Basics curriculum, completion rules, and Internship-specific progress surface are not evidenced. The dedicated Internship pathway remains `MISSING`; do not infer one from generic module labels.[2] [6] |
| **2. JMC Exam Preparation** — four question banks: Internal Medicine, Surgery, Pediatrics, OBGYN; Practice Questions, Mock Exams, Assessments | `#practice` / Practice; `#learn` / Learn; dashboard activity/progress surfaces | `PracticeSection`; `quickActions` including `Practice MCQs`; `ActivityRows`; progress widgets | `PARTIAL` | A generic practice host and MCQ entry point exist. JMC bank containers, question-bank selection, mock-exam mode, assessment records, answer-review contract, and Internship-specific analytics are not evidenced. The existing provisional bank remains source-derived and `Pending Clinical Review`, not application content.[2] [7] |
| **3. Study Resources** — four study summaries: Internal Medicine, Surgery, Pediatrics, OBGYN | `#learn` / Learn; `#journal` / Medical Journal; optionally `#reference` for governed reference material | `LearnSection`; `JournalSection`; `AtlasSection` as a reference host | `PARTIAL` | Learning and journal hosts could carry approved summaries after governance. No study-summary library, specialty filters, source/version display, reader state, or Internship-specific content surface is evidenced. The journal explicitly requires approved content before display.[2] [5] |
| **4. High-Yield Review Library** — IM, Surgery, Pediatrics, OBGYN high-yield files | `#learn` / Learn; `#journal` / Medical Journal; `#practice` only for a future review action | `LearnSection`; `JournalSection`; `PracticeSection` as a potential review entry point | `PARTIAL` | Generic learning, reading, and practice hosts are reusable in principle. A high-yield library, specialty grouping, search/filter experience, bookmarking persistence for governed records, and review-status display are not evidenced. No high-yield file is treated as activated by this mapping.[2] [6] |
| **5. Emergency Foundation** — Emergency Cases, Airway Basics, ED Workflow, First Night Shift, Handover | `#learn` / Learn; `#pathway` / My Pathway; `#practice` / Practice | `LearnSection`; `PathwaySection`; `PracticeSection` | `PARTIAL` | Generic learning and pathway containers exist, and the current learning array includes an advanced airway item. That does not establish the required Internship Emergency Foundation curriculum. Dedicated case, airway-basics, ED-workflow, first-night-shift, and handover surfaces are `MISSING`.[2] [6] |
| **6. Medical Essentials** — Drug Essentials, ECG Essentials, Toxicology Essentials | `#reference` / Atlas & Visual Assets; `#learn` / Learn; `#journal` / Medical Journal | `AtlasSection`; `LearnSection`; `JournalSection` | `PARTIAL` | Atlas explicitly includes ECG and Toxicology categories, so a generic reference host is evidenced. Internship-specific Drug/ECG/Toxicology containers, source-bound records, and track-separated learner surfaces are not evidenced. Existing physician-track material must not be silently reassigned to `02_Internship`.[2] [6] [7] |
| **7. Clinical Skills** — Clinical Skills Framework, Procedures, OSCE Framework, Logbook Requirements | `#learn` / Learn; `#practice` / Practice; `#journal` / Medical Journal; `#pathway` / My Pathway | `LearnSection`; `PracticeSection`; `JournalSection`; `PathwaySection` | `PARTIAL` | Generic hosts could organize reviewed skills learning and progress. No procedures library, OSCE station/assessment surface, skills checklist, competency sign-off, logbook entity, supervisor workflow, or Internship-specific skills container is evidenced. Account/profile UI is not a logbook substitute.[2] [3] [6] |
| **8. Professional Development** — Intern Professionalism Guide, Intern Transition Guide, Internship Roadmap, Study Plan | `#pathway` / My Pathway; `#journal` / Medical Journal; `#account` / My Account for profile boundary only | `PathwaySection`; `JournalSection`; account rail | `PARTIAL` | Generic pathway and professional-record surfaces are reusable in principle. Dedicated Internship professionalism, transition, roadmap, and study-plan content, learner goals, versioned guidance, and progress semantics are not evidenced. `#account` is an account boundary, not a content container.[2] [3] |

## Cross-category architecture findings

The current dashboard provides **reusable generic hosts**, not complete Internship delivery surfaces. The canonical in-page navigation is limited to My Home, My Pathway, Learn, Practice, Atlas & Visual Assets, Medical Journal, and My Account.[3] The router registers `/`, `/register`, `/login`, `/dashboard`, and `/404` only; no Internship, question-bank, assessment, OSCE, logbook, or journal-specific standalone route is registered.[4]

The current application therefore supports a future **reuse decision**: approved Internship records may eventually be exposed through existing dashboard boundaries, but only after source/version mapping, schema and metadata checks, separate rights and clinical governance, QA, and explicit integration authorization. The generic UI does not satisfy those gates and must not be interpreted as activation evidence.[8] [9] [10]

The Phase 4.2.2 pathway audit independently recorded the same architectural conclusion: generic hosts exist, while a dedicated Internship pathway and its dedicated component areas were not evidenced.[6] The provisional question-bank artifact records 2,842 reconciled records, 105 unresolved incomplete candidates, and `Pending Clinical Review`; it is an audit artifact and not an application import or activation payload.[7]

## Non-actions and protected boundaries

| Check | Result |
|---|---|
| Content imported | `NO` |
| JSON or schema conversion performed | `NO` |
| Database modified | `NO` |
| Routes modified or created | `NO` |
| Existing components modified | `NO` |
| Duplicate Internship sections created | `NO` |
| Medical content activated or published | `NO` |
| Clinical approval performed | `NO` |
| Source files altered | `NO` |
| Professional tracks mixed | `NO`; `02_Internship` remains distinct, and physician-track material is not reassigned |
| Visual Freeze changed | `NO` |

## Next allowed phase

The next allowed step is a governed source-intake and provenance/schema review of the Internship source package, followed by the separately authorized clinical and rights-governance workflow. This mapping does not authorize extraction, JSON creation, schema conversion, database integration, application exposure, activation, deployment, commit, or push.[8] [9] [10]

## References

[1]: /home/ubuntu/upload/pasted_content_4.txt "SEG Phase 4.3 — Internship Content Mapping Design brief"

[2]: /home/ubuntu/seg-manus-status/client/src/pages/DashboardPage.tsx "SEG Dashboard page and existing workspace sections"

[3]: /home/ubuntu/seg-manus-status/client/src/components/DashboardLayout.tsx "SEG authenticated dashboard shell and in-page navigation"

[4]: /home/ubuntu/seg-manus-status/client/src/App.tsx "SEG client route registry"

[5]: /home/ubuntu/seg-manus-status/client/src/pages/DashboardPage.test.tsx "SEG Dashboard canonical section and anchor tests"

[6]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PATHWAY_MAPPING_REPORT.md "SEG Phase 4.2.2 Internship pathway audit"

[7]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_MASTER_QUESTION_BANK_v1.1.md "SEG Internship provisional question-bank master"

[8]: /home/ubuntu/seg-manus-status/docs/SEG-CONTENT/SEG_CONTENT_REVIEW_WORKFLOW.md "SEG governed content review workflow"

[9]: /home/ubuntu/seg-manus-status/docs/SEG-CONTENT/GOVERNANCE/SEG_STATUS_MATRIX.md "SEG operational status matrix"

[10]: /home/ubuntu/skills/seg-content-architecture-schema-validator/SKILL.md "SEG read-only content architecture/schema validator boundaries"
