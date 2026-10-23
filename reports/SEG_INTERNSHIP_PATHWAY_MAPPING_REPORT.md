# SEG Internship Pathway Mapping Report

## Metadata

| Field | Value |
|---|---|
| Record ID | `SEG-INTERNSHIP-PATHWAY-AUDIT-4.2.2` |
| Audit type | READ_ONLY architecture/pathway audit |
| Generated at | `2026-08-17T16:59:05.681984+00:00` |
| Professional track | `02_Internship` |
| Source package | Existing SEG application and governance documentation only |
| Clinical approval | Not performed |
| Activation/integration | Not performed |

## Scope and decision rule

This report audits whether the current SEG application already contains a dedicated Internship Professional Pathway. It does **not** create a route, section, component, content record, database table, or new professional track. Existing generic workspaces are mapped as reusable hosts only; they are not treated as Internship-specific content.

The audit used the following evidence:

- `client/src/pages/DashboardPage.tsx` — existing `#pathway`, `#learn`, `#practice`, `#journal`, and the Atlas/Reference section.
- `client/src/components/DashboardLayout.tsx` — existing dashboard anchor/navigation shell.
- `client/src/lib/seg-navigation.ts` — current route inventory; no dedicated Internship or Question Bank route.
- `client/src/pages/DashboardPage.test.tsx` — approved dashboard hierarchy and canonical anchors.
- `docs/SEG-GOVERNANCE/SEG_CONTENT_PIPELINE_SPEC.md` and `docs/SEG-CONTENT/` — governed content boundaries.

## Required component mapping

| Internship Component | Existing SEG Location | Status |
|---|---|---|
| Clinical Rotations | Generic `#pathway` / `#learn` workspaces; no Internal Medicine, Surgery, Pediatrics, OBGYN, or Emergency Basics rotation sections | **MISSING** |
| JMC Practice | Generic `#practice` and `#learn` workspaces; no JMC-labelled banks, mock exams, or subject-specific practice | **MISSING** |
| Emergency Foundation | No dedicated Emergency Cases, Airway Basics, ED Workflow, First Night Shift, or Handover Skills section | **MISSING** |
| Clinical Skills | No dedicated Clinical Skills Framework, Procedures, OSCE Preparation, or Logbook section | **MISSING** |
| Assessments | Generic progress/activity UI exists, but no Internship assessment or mock-exam content surface | **MISSING** |

## Extended pathway audit

| Expected pathway area | Existing reusable host | Dedicated Internship implementation | Status |
|---|---|---|---|
| Clinical Rotations | `#pathway`, `#learn` | Not evidenced | **MISSING** |
| JMC Exam Preparation | `#practice`, `#learn` | Not evidenced | **MISSING** |
| Clinical Knowledge Library | `#reference`, `#journal` | Not evidenced as Internship library | **MISSING** |
| Emergency Foundation | `#learn`, `#practice` | Not evidenced | **MISSING** |
| Medical Essentials | `#reference` / existing dashboard shell | No dedicated Internship Medical Essentials content surface evidenced in audited files | **MISSING** |
| Clinical Skills Development | `#practice` | Not evidenced | **MISSING** |
| Professional Development | `#pathway`, `#journal` | Not evidenced | **MISSING** |

## Reuse decision

The correct architectural decision is **reuse existing dashboard hosts without creating duplicate Internship sections**. The current application can host future approved Internship content through the existing pathway, learning, practice, reference, and journal boundaries only after content governance, schema validation, clinical review, QA, and separate integration authorization are complete.

This report does not claim that the generic hosts are ready for activation. It records an architecture mapping gap: **generic UI hosts exist, but a dedicated Internship content pathway is not evidenced**.

## Next allowed phase

`Source Intake → Schema Validation → Rights/Provenance Review → Provisional Clinical Governance`.

No Schema conversion, JSON conversion, database import, application activation, route creation, or content publication was performed.
