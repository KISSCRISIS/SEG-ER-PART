# SEG Internship Schema Revalidation Authorization

**Phase:** 6.13 — Project Owner Decision Closure  
**Mode:** `READ_ONLY GOVERNANCE`  
**Authorization status:** `AUTHORIZED_FOR_SCHEMA_REVALIDATION_REVIEW_SCOPE`

## 1. Authorization statement

Based on the Project Owner declaration recorded for Phase 6.13, the SEG Internship package is authorized for a **controlled Schema Revalidation Dry Run / Review Scope ONLY**. This authorization is limited to read-only structural checks and does not authorize any production action.

> **Authorized scope:** Structural validation, field mapping, and schema compatibility testing only.

The authorization records a review boundary. It must not be interpreted as clinical approval, rights approval, content activation, publication permission, or permission to alter the SEG application or database.

## 2. Authorized actions

The following actions are permitted within the controlled review scope:

| Action | Boundary |
|---|---|
| Structural validation | Compare existing candidate metadata and documentation with the approved design-level contracts and documented schema expectations. Do not mutate a schema or source. |
| Field mapping | Document source-field to target-domain/contract relationships and identify missing, ambiguous, or incompatible fields. Do not create production records. |
| Schema compatibility testing | Perform read-only compatibility checks and produce discrepancy/evidence reports. Do not migrate, write, import, or activate. |

The review may use the existing 48-candidate package and its preserved Source IDs, paths, and carried-forward SHA-256 values. The review must preserve all identifiers and must report unresolved provenance, rights, reviewer, track/taxonomy, lineage, duplicate, and audit issues rather than resolving them by inference.

## 3. Explicit exclusions

The following actions are expressly excluded:

- **Import** of content, JSON, metadata, or transformed records.
- **Activation** of any Lesson, Question Bank, Clinical Case, Skills / Procedures, or Reference / Book record.
- **Publication** or learner-facing display.
- Learner exposure in any environment.
- JSON generation or production content conversion.
- Schema migration, schema mutation, Prisma/database change, or application change.
- Modification of authentication, API contracts, routes, security boundaries, or existing medical governance.
- Rights approval, copyright override, license determination, display permission, or attribution decision.
- Clinical/relevant content approval, safety approval, or reviewer substitution.
- Canonical duplicate selection, source deletion, rename, merge, archive, overwrite, or lineage identifier replacement.
- Deployment, commit, push, or release.

## 4. Separate governance gates

This authorization does not close the following gates:

| Gate | Status under this authorization |
|---|---|
| Source provenance and governed version | Remains subject to evidence closure. |
| Rights and display permission | Separate; not approved by this authorization. |
| Clinical/relevant review | Separate; not replaced by structural testing. |
| Track/taxonomy | Must remain explicit and source-linked; no inference from filenames or folders. |
| Audit | Dry-run actions must be logged append-only if executed. |
| Production implementation | Not authorized. |

Schema compatibility testing can establish only structural observations. It cannot establish medical accuracy, clinical safety, copyright ownership, rights to display, learner suitability, or activation authority.

## 5. Required dry-run controls

If the authorized review is executed, the operator must record the run scope, actor, role, timestamp, input manifest/version, source IDs, paths, observed SHA values, checks performed, discrepancies, unresolved issues, and output hash. The run must be reproducible and read-only. Any conflict must be recorded and escalated; no source or contract may be silently changed.

The dry-run report must explicitly state that no import, activation, publication, learner exposure, database change, application change, or schema mutation occurred.

## 6. Owner and authority record

| Field | Value |
|---|---|
| Decision authority | `SEG Project Owner — user-declared` |
| Professional role | `Emergency Medicine Specialist — user-declared` |
| Medical review role | `Medical content reviewer for the educational scope — user-declared` |
| Name/account identifier | `NOT_SUPPLIED` |
| Decision date | `NOT_SUPPLIED` |
| Signature/attribution | `Instruction-level declaration recorded; formal signature not supplied` |
| Authorized scope | `Structural validation; field mapping; schema compatibility testing` |
| Authorization expiry | `NOT_SUPPLIED` |

## 7. Current implementation state

This record authorizes the **review scope**, not execution of a production implementation. No Schema Revalidation Dry Run has been executed by the creation of this document. The next permitted action is a separate, controlled read-only dry-run execution with append-only audit evidence.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DECISION_OWNER_APPROVAL.md "SEG Internship Decision Owner Approval"
[2]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_12_SCHEMA_AUTHORIZATION_REQUEST.md "SEG Phase 6.12 Schema Authorization Request"
[3]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_12_GATE_REPORT.md "SEG Phase 6.12 Gate Report"
[4]: file:///home/ubuntu/skills/seg-medical-governance/SKILL.md "SEG Medical Governance"

<!-- END OF AUTHORIZATION -->
