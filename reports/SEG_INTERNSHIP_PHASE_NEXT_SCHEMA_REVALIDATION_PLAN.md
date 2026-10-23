**Phase:** Next gate after 6.6 — Schema Revalidation Preparation  
**Prepared during:** Phase 6.6 — Governance Recommendation Closure  
**Mode:** `READ_ONLY GOVERNANCE PLANNING`  
**Generated at (UTC):** `2026-08-17T20:45:00Z`  
**Author:** Manus AI  
**Plan state:** `PREPARATION_ONLY — NOT_AUTHORIZED_FOR_REVALIDATION_EXECUTION`

# SEG Internship Phase Next Schema Revalidation Plan

## 1. Purpose and entry condition

This document defines the evidence and decision requirements that must be satisfied before a separately authorized SEG Internship schema-revalidation dry-run may be considered. It is a preparation plan, not a schema validator run, schema conversion, JSON-generation instruction, import plan, or production authorization.

The current Phase 6.6 status is `BLOCKED_PENDING_FINAL_APPROVAL`. The plan may be advanced only after the required governance evidence is supplied, independently attributable, internally consistent, and accepted through the appropriate human/governance decision records. The Phase 6.4 evidence matrix remains the governing baseline: the current package is not equivalent to `GOVERNANCE_READY_FOR_SCHEMA_REVALIDATION`, `APPROVED`, `ACTIVATED`, or `PUBLISHED`. [1] [2]

## 2. Required pre-revalidation gates

Schema revalidation must not begin until every gate below has an explicit evidence package. A recommendation, filename, folder, or structural candidate is not a substitute for the required evidence.

### Gate 1 — Governance acceptance

| Requirement | Required evidence | Acceptance condition |
|---|---|---|
| Lineage recommendation | Authorized decision record for the recommended `CROSSWALK RELATIONSHIP` between `SRC-0078` and `phone-pediatrics-main` | Both IDs, namespaces, path, and SHA-256 remain preserved; alias versus distinct-namespace semantics are explicit; unresolved issues and audit event are recorded. |
| Duplicate recommendations | Independent decision record for `DUP-DRUG-001` and `DUP-EMERGENCY-001` | `v2_Pack` recommendations are accepted, rejected, or returned separately; no deletion/archive/merge is implied without a separate authorization; rollback and historical lineage are preserved. |
| Overall governance decision | Append-only governance acceptance or blocking decision | Reviewer role, identity, scope, rationale, date, and decision state are attributable and complete. |

**Gate result required:** `PASS` or an explicitly documented `BLOCKED` outcome. A recommendation artifact alone is not acceptance evidence.

### Gate 2 — Provenance closure

Each candidate source must have a closed provenance record containing the stable Source ID, source-local ID and namespace where present, owner/publisher, immutable location, accessed date, governed version, exact locator, SHA-256, source relationship, intended track, and audit references.

For the duplicate families, the evidence must distinguish a filename/path `v2` signal from an attributable governed version. For the lineage conflict, both the inventory namespace and source-local namespace must remain visible. Missing or conflicting values must remain explicit and block revalidation rather than being inferred.

**Gate result required:** `PASS` only when per-source provenance and governed version evidence are independently attributable and internally consistent.

### Gate 3 — Rights closure

Rights review must be recorded independently from clinical review and architecture approval. For every candidate intended for any future display or conversion, the evidence package must specify text usage, image usage, license or rights decision when applicable, display scope, owner/publisher evidence, exact source location, reviewer role and identity, decision date, and any restrictions or unresolved issues.

Reference / Book candidates cannot proceed without the explicit rights gate. A PDF, filename, folder, or existing path is not rights evidence. Rights closure must also cover any embedded tables, figures, images, quotations, or derivative display surfaces that the contract would permit.

**Gate result required:** `PASS` with no unresolved rights or display-scope conflict.

### Gate 4 — Reviewer evidence

Clinical/relevant review must be supplied by an authorized and attributable reviewer for the exact candidate scope. The record must include reviewer identity and role, decision, date, cited source locations, unresolved-issue disposition, and any limitations. Clinical review, rights review, taxonomy review, and implementation authorization must remain separate streams; one passing stream cannot substitute for another.

No claim, diagnosis, dose, threshold, management step, contraindication, competency level, or reference may be invented or repaired during revalidation. Missing source sections must remain missing and be reported as blockers where the contract requires them.

**Gate result required:** `PASS` only when the exact artifact is covered by an attributable review record and no unresolved clinical/relevant blocker remains.

### Gate 5 — Taxonomy and professional-track confirmation

Each source-derived candidate must carry explicit `02_Internship` track evidence and a closed taxonomy ID/version. Confirmation must identify the pathway, audience, level, branch/module placement, and any taxonomy relationship without inferring these values from folder names or topic labels.

The review must explicitly confirm that Internship content remains separated from `01_Emergency_Medicine_Physician`, `03_Medical_Students`, `04_Paramedic_EMS`, `05_Emergency_Nursing`, `06_General_Practitioner`, and `07_Shared_Medical_Core`. Any cross-track relationship must be explicit and authorized rather than silently mixed.

**Gate result required:** `PASS` with no missing, conflicting, or inferred track/taxonomy values.

### Gate 6 — Audit readiness

The audit package must be append-only and must cover source intake, metadata closure, lineage crosswalk, duplicate review, rights review, taxonomy/track decision, clinical/relevant review, contract decision, QA, and any later authorization. Each event must include event type, actor, timestamp, scope, rationale where supplied, and links to the exact evidence artifact.

The audit package must distinguish recommendation, acceptance, approval, implementation authorization, release, and activation. A Phase 6.6 recommendation event must not be represented as a clinical approval or production event.

**Gate result required:** `PASS` when all required events are attributable, ordered, immutable, and reconciled with the decision records.

### Gate 7 — Contract confirmation

Architecture/schema authority must separately confirm or reject the three contract recommendations before any candidate can be validated against a canonical target:

| Contract | Required confirmation |
|---|---|
| Clinical Case | Confirm the field contract and source-section fidelity rules; decide whether and how a canonical `case` enum may exist. |
| Skills / Procedures | Confirm the framework-versus-competency boundary, record roles, required level semantics, assessment method, and any separate sign-off model. |
| Reference / Book | Confirm reference/book type semantics, exact locator rules, rights/display controls, and any authorized enum. |

Contract confirmation must be accompanied by explicit schema version/contract identity, unknown-field policy, required-field rules, review-state semantics, track/taxonomy handling, lineage requirements, and approval owner. No canonical enum is assumed from a design recommendation.

**Gate result required:** `PASS` only when the relevant contract is explicit, authorized, and compatible with the unchanged canonical architecture boundary.

## 3. Revalidation execution prerequisites

After all seven evidence gates pass, a separate authorization must explicitly define the exact revalidation scope. That authorization must identify the source artifacts, source IDs, versions, checksums, contract/schema version, professional track, taxonomy context, output report path, reviewer scope, and permitted non-production status.

The revalidation dry-run must be read-only and must validate exact supplied artifacts without rewriting them. It must record input paths and SHA-256 values, contract/schema path and version, per-field results, lineage findings, rights and review state, track separation, blockers, and non-actions. A structural pass must not be interpreted as clinical approval or implementation authorization. [3] [4]

## 4. Required fail-closed outcomes

| Condition encountered | Required outcome |
|---|---|
| Missing provenance, version, rights, reviewer, taxonomy, track, or audit evidence | `BLOCKED` with the exact missing gate; do not infer or repair. |
| Unresolved namespace relationship | `BLOCKED_LINEAGE_IDENTITY_CONFLICT`; preserve both identifiers and do not replace either. |
| Incomplete duplicate comparison | `BLOCKED_PENDING_CANONICAL_REVIEW`; preserve both lineages and do not execute archive, merge, or deletion. |
| Unconfirmed Case, Skills, or Reference contract | `BLOCKED_SCHEMA_CONTRACT_MISSING` or equivalent explicit contract blocker; do not invent an enum. |
| Mixed or inferred professional tracks | `BLOCKED_TRACK_OR_TAXONOMY`; do not silently reclassify. |
| Rights or display-scope conflict | `BLOCKED_RIGHTS`; do not expose or convert the affected candidate. |
| Clinical/relevant review absent or incomplete | `BLOCKED_CLINICAL_REVIEW`; keep the source pending and not approved. |
| Missing separate implementation authorization | `BLOCKED_IMPLEMENTATION_AUTHORIZATION`; stop before adapter/import/application work. |

## 5. Expected revalidation package after authorization

Only after the prerequisites are accepted and execution is separately authorized may a later phase create a revalidation report containing the exact input and contract identities, hashes, candidate scope, gate-by-gate results, unresolved findings, observed review states, and explicit non-actions. That later package must not generate production JSON, write to a database, alter the application, activate content, or change original sources unless a separate authorization changes those boundaries.

The expected handoff sequence is:

```text
Governance acceptance
→ Provenance closure
→ Rights closure
→ Reviewer evidence
→ Taxonomy and 02_Internship confirmation
→ Audit readiness
→ Contract confirmation
→ Separate revalidation authorization
→ Read-only schema revalidation dry-run
→ QA / implementation planning only if explicitly authorized
```

## 6. Current gate status

| Gate | Current Phase 6.6 status |
|---|---|
| Governance acceptance | `OPEN` |
| Provenance closure | `BLOCKED` |
| Rights closure | `BLOCKED` |
| Reviewer evidence | `BLOCKED` |
| Taxonomy confirmation | `BLOCKED` |
| Audit readiness | `BLOCKED` |
| Contract confirmation | `OPEN` |
| Separate revalidation authorization | `NOT_GRANTED` |
| Schema revalidation execution | `NOT_STARTED` |

## 7. Non-actions and implementation restrictions

This plan does not generate JSON, convert schemas, create production records, import content, modify the database or application, change routes/components/authentication/assets, activate or publish content, delete/rename/merge/archive/overwrite original sources, commit, push, deploy, or change the Visual Freeze. It is not clinical approval, rights approval, canonical-source selection, canonical-schema activation, or production authorization.

## References

[1]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_GOVERNANCE_EVIDENCE_STATUS.md` "Phase 6.4 Governance Evidence Status"  
[2]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_4_GATE_REPORT.md` "Phase 6.4 Gate Report"  
[3]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_3_DECISION_REPORT.md` "Phase 6.3 Decision Report"  
[4]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_5_DECISION_PACKAGE_REPORT.md` "Phase 6.5 Decision Package Report"  
[5]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_LINEAGE_RECOMMENDATION_DECISION.md` "Phase 6.6 Lineage Recommendation Decision"  
[6]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DUPLICATE_RECOMMENDATION_DECISION.md` "Phase 6.6 Duplicate Recommendation Decision"  
[7]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_CONTRACT_RECOMMENDATION_STATUS.md` "Phase 6.6 Content Contract Recommendation Status"
