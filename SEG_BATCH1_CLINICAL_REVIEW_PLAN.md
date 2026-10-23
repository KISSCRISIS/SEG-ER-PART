# SEG Batch 1 Clinical Review Plan

**Project:** Smart Emergency Guide (SEG)  
**Mode:** Governance and review structure only  
**Scope:** Preparation of the clinical-review workflow for 269 Batch 1 knowledge-unit review rows  
**Status:** Review structure ready; medical-content activation remains blocked  
**Author:** Manus AI  
**Date:** 16 August 2026

## 1. Purpose and boundary

This document defines the controlled workflow for a future clinical review of the 269 Batch 1 knowledge-unit review rows. It creates a review structure only. It does not import, copy, extract, transform, summarize, classify, edit, approve, reject, publish, or activate medical content. The companion CSV is a review-queue tracker and is not a medical-content registry.

The 269 rows are deterministic tracking identifiers only. Their titles, tracks, sources, reviewers, dates, comments, and approval decisions remain unpopulated unless a separately supplied and governed source package passes the applicable intake gates. No reviewer identity or decision is invented in this preparation step.

The current project state remains:

> **Governed Source Intake BLOCKED — No Medical Content Activation**

The current repository, the governed intake records, the existing Vite/Express architecture, the Visual Freeze, Manus OAuth, protected routes, database schema, approved assets, and empty medical-content state remain unchanged. Legacy material and the unverified Migration Map v2.0 are not execution authority.

## 2. Review workflow

The workflow is sequential, evidence-based, reversible, and append-only. A review row must not advance merely because it exists in the tracker. Each transition requires the evidence listed below and must be recorded in the audit trail.

| Stage | Responsible role | Required action | Required output | Gate decision |
|---|---|---|---|---|
| 0. Review-queue preparation | Governance coordinator | Create stable tracking IDs and empty review fields | `SEG_BATCH1_REVIEW_TRACKER.csv` | Structure ready; no source record created |
| 1. Source handoff | Source owner or publisher with governance coordinator | Supply an immutable, identifiable package and handoff information | Source handoff record, package inventory, owner/publisher identity | Continue only when the package is accessible and traceable |
| 2. Read-only governed intake | Governance coordinator | Inspect provenance, version, checksum, references, taxonomy, rights metadata, and package completeness without changing the source | Intake checklist and findings | Missing or contradictory evidence blocks review |
| 3. Rights and provenance review | Rights reviewer and governance coordinator | Verify ownership, license, display scope, derivative-use limits, attribution, and image/media permissions | Rights decision record and source/version records | Ambiguous or missing rights block clinical review and publication |
| 4. Clinical review assignment | Clinical review lead | Assign a qualified reviewer by topic and record the assignment without fabricating a reviewer | Reviewer assignment record | No review begins without an accountable reviewer |
| 5. Independent clinical review | Assigned qualified reviewer | Evaluate the candidate against the criteria in Section 4 and record rationale, references, limitations, and required updates | Medical review record | Result is hold, reject, or explicit approve; no implicit approval |
| 6. Governance reconciliation | Governance coordinator and clinical review lead | Confirm that medical decision, rights decision, taxonomy, references, version, checksum, and audit entries agree | Reconciled governed record | Conflicts or missing fields keep the row blocked |
| 7. Approval gate | Authorized clinical approver | Make an explicit, attributable decision after all prior evidence is complete | Signed/attributed approval decision, review date, next-review date | Only an explicit `approved` decision can pass the medical gate |
| 8. Separate implementation authorization | Project owner or explicitly authorized technical authority | Authorize any adapter, schema work, import, testing, or publication as a separate command | Scoped implementation authorization with rollback criteria | No implementation follows automatically from clinical approval |
| 9. Controlled publication | Authorized implementation team | Expose only approved records through an approved, reversible path | Tests, deployment evidence, rollback evidence, and publication record | Requires separate confirmation and verification |

The permitted governed lifecycle is `pending-intake` → `under-review` → `approved` or `rejected`. `approved` → `withdrawn` is permitted when a later governance decision requires removal. A row lacking provenance, rights, references, taxonomy, medical review, or audit evidence remains blocked and must not be exposed to learners.

## 3. Reviewer assignment structure

Reviewer assignments must be role-based until a real accountable person is supplied and verified. This plan does not assign fictional names, credentials, signatures, or approvals. The governance coordinator maintains the assignment record, while the clinical review lead confirms that the reviewer is qualified for the clinical domain and has no unmanaged conflict of interest.

| Role | Minimum responsibility | Assignment evidence | Cannot do alone |
|---|---|---|---|
| Clinical review lead | Own the review protocol, resolve reviewer conflicts, confirm completeness, and authorize the clinical decision path | Named accountable reviewer, scope, credentials/qualification evidence, conflict declaration | Cannot replace rights or provenance evidence |
| Domain clinical reviewer | Review clinical accuracy, risk, currency, scope, and rationale for assigned units | Named reviewer, domain scope, review date, rationale, references, next-review date | Cannot publish or alter the application |
| Secondary clinical reviewer | Independently review high-risk, disputed, safety-critical, or guideline-sensitive units | Independent reviewer identity, comparison notes, discrepancy resolution | Cannot silently override the primary record |
| Pharmacology/toxicology reviewer | Review medication, poisoning, antidote, dose, contraindication, and interaction claims when applicable | Domain assignment, current evidence, explicit disposition | Cannot approve unrelated domains |
| Emergency-care or specialty reviewer | Review domain-specific clinical pathways and escalation criteria when applicable | Topic assignment and evidence-linked comments | Cannot waive missing rights or source identity |
| Rights and provenance reviewer | Verify owner/publisher, license, display scope, derivative-use limits, and version identity | Source registry, rights decision, license evidence, checksum/version evidence | Cannot grant medical approval |
| Taxonomy reviewer | Confirm taxonomy ID/version and mapping rationale | Taxonomy record and mapping rationale | Cannot infer taxonomy from UI labels alone |
| Governance coordinator | Maintain immutable records, statuses, audit events, and evidence links | Append-only audit events and reconciliation checklist | Cannot approve content without the authorized clinical decision |
| Implementation authority | Conduct only separately authorized technical integration and rollback work | Explicit command, scope, tests, and rollback evidence | Cannot infer authorization from this preparation plan |

A reviewer must be assigned only after the source package is traceable and the review scope is clear. A reviewer may request clarification, place a row on hold, or recommend rejection. A blank reviewer field means that no review assignment has been made.

## 4. Review criteria

The clinical reviewer must evaluate each candidate unit against the following criteria and record evidence-linked comments. The criteria are applied to the supplied source and any separately traceable derived artifact; they do not authorize editing or rewriting the source during review.

| Criterion | Review question | Minimum evidence | Failure disposition |
|---|---|---|---|
| Clinical accuracy | Are the clinical statements consistent with current authoritative evidence and internally coherent? | Claim-linked references and reviewer rationale | Hold or reject until resolved |
| Clinical safety | Could an omission, ambiguity, dosage statement, contraindication, or escalation instruction create foreseeable harm? | Risk notes, safety references, and explicit disposition | Block approval; escalate for secondary review |
| Currency | Is the source current for the intended use, and are superseded recommendations identified? | Publication/release date, version, update history, next-review date | Hold pending currency evidence |
| Scope and intended audience | Is the unit appropriate for the stated learner group and educational purpose? | Track, taxonomy, intended display scope, audience rationale | Hold or reject for scope mismatch |
| Evidence traceability | Can material claims be traced to identifiable references and source locations? | Reference identifiers, page/section/location mapping | Block approval |
| Provenance | Can owner, publisher, location, access date, version, and checksum be verified? | Source Registry and Version Control records | Block intake and review |
| Rights and copyright | Are text, image, video, and derivative-use permissions clear for the intended display scope? | Rights Review decision and license evidence | Block review completion and publication |
| Taxonomy alignment | Does the unit map to an approved taxonomy ID and version using documented rationale? | Taxonomy Mapping record | Hold; UI labels are insufficient |
| Internal consistency | Are definitions, units, abbreviations, thresholds, and recommendations consistent within the source? | Reviewer comments and source locations | Hold or reject until reconciled |
| Educational clarity | Is the material unambiguous, appropriately scoped, and distinguishable from individualized medical advice? | Reviewer rationale and learner-safety notes | Hold for clarification |
| Change sensitivity | Are high-risk claims, guideline-sensitive values, and version changes identified for future review? | Risk flag, version evidence, next-review date | Require secondary review or hold |
| Duplication and conflict | Does the unit conflict with another approved or candidate unit? | Cross-unit comparison and conflict note | Hold until governance reconciliation |
| Auditability | Can another reviewer reproduce the decision from the evidence record? | Complete audit event, rationale, status history, and evidence links | No approval |

A reviewer may not mark a unit approved based on readability, UI fit, or the existence of a source file alone. Visual presentation, application route availability, or a tracker row never substitutes for medical evidence or governance approval.

## 5. Required evidence package

Before a clinical review is considered complete, the following evidence must be available for the specific unit or clearly referenced immutable package:

| Evidence category | Required contents |
|---|---|
| Package identity | Stable package identifier, owner/publisher, source location, access date, source type, handoff record |
| Version control | Version, release/publication date, SHA-256 checksum, supersedes/superseded-by information, immutable source reference |
| References | Claim-linked references with stable identifiers and source locations; citations must be sufficient for independent verification |
| Rights | Text license, image/media license where applicable, display scope, attribution requirements, derivative-use limits, and explicit rights decision |
| Taxonomy | Taxonomy ID, taxonomy version, mapping rationale, intended track, audience, and taxonomy reviewer |
| Clinical review | Reviewer identity and qualification evidence, decision, reviewed date, rationale, risk notes, unresolved issues, and next-review date |
| Secondary review | Independent reviewer evidence for high-risk, disputed, medication, toxicology, guideline-sensitive, or otherwise escalated units |
| Audit trail | Actor, timestamp, event, reason, prior status, next status, evidence references, and reproducible decision history |
| Separation of derivatives | Any normalized or derived artifact is separately identified, traceable to the immutable source, and never replaces the source |
| Implementation boundary | If technical integration is later requested, a separate authorization, scope, tests, rollback plan, and boundary confirmation |

Missing, contradictory, or unverifiable evidence keeps the review row blocked. No evidence may be invented to complete a tracker field.

## 6. Approval conditions

Approval is a governance decision, not a consequence of completing the tracker. The following conditions must all be satisfied before an authorized clinical approver may record `approved`:

1. The source package is immutable, identifiable, traceable to an owner or publisher, and recorded with version and SHA-256 evidence.
2. Rights and copyright have been reviewed for the exact intended use, including text, image, video, display, attribution, and derivative-use scope.
3. All required clinical claims have traceable references, and the qualified reviewer has recorded a rationale and risk disposition.
4. The unit has a valid taxonomy ID and version with documented mapping rationale.
5. The intended learner audience, track, scope, and safety boundaries are explicit.
6. Required secondary review has been completed for high-risk, disputed, medication, toxicology, or guideline-sensitive material.
7. The review status history and audit trail are complete, append-only, and reproducible.
8. The decision is explicit, attributable, dated, and includes a next-review date; no blank or inferred decision counts as approval.
9. No unresolved rights, provenance, reference, clinical safety, taxonomy, or conflict issue remains.
10. A separate implementation authorization is obtained before any schema work, adapter, import, application exposure, or publication.

This preparation task grants none of these approvals. The companion tracker therefore uses `NOT_APPROVED` for every row and leaves source, reviewer, date, and decision details unpopulated.

## 7. Tracker conventions

`SEG_BATCH1_REVIEW_TRACKER.csv` contains exactly 269 deterministic review-queue rows with IDs `B1-KU-001` through `B1-KU-269`. The rows are placeholders for review coordination, not loaded knowledge units. `Review Status` is initialized to `pending-intake` as the permitted lifecycle starting state, while `Approval State` is initialized to `NOT_APPROVED` to prevent any implication of clinical approval.

`Title`, `Track`, `Source`, `Reviewer`, and `Review Date` are intentionally blank or marked as not supplied. The comments field states that the row is a structure-only placeholder and that no source or medical content has been loaded. These placeholders must be replaced only from a separately authorized, governed source handoff; they must not be filled from the unverified Legacy migration map.

## 8. Validation statement

The requested structure is ready for a future governed review intake:

- **269 units registered:** Yes, as deterministic review-queue identifiers only.
- **No content modified:** Confirmed.
- **No approvals granted:** Confirmed; every row has `Approval State = NOT_APPROVED`.
- **Review workflow ready:** Confirmed for later use after source handoff and governed intake.
- **Medical content activated:** No.
- **Lessons published:** No.
- **Schema, database, code, routes, authentication, OAuth, assets, and Visual Freeze changed:** No.

The next allowed action is a READ_ONLY governed source handoff and intake when a traceable source package is supplied. Clinical review must not begin until the source, rights, provenance, references, taxonomy, and reviewer assignment gates are satisfied.

## References

[1]: SEG_CONTENT_LIBRARY/03_MEDICAL_GOVERNANCE/GOVERNANCE_TEMPLATES.md "SEG governance template index"
[2]: SEG_CONTENT_INTEGRATION_PLAN.md "SEG governed content integration plan"
[3]: SEG_GOVERNED_SOURCE_INTAKE_REPORT.md "SEG governed source intake report"
[4]: SEG_CONTENT_INTAKE_CHECKLIST.md "SEG governed source intake checklist"
