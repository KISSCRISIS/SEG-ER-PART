# SEG Internship Phase 6.12 Schema Authorization Request

**Mode:** `READ_ONLY GOVERNANCE`  
**Request type:** Controlled authorization request  
**Current status:** `PENDING_EXTERNAL_REVIEW_AND_DECISION_OWNER_AUTHORIZATION`

## 1. Request summary

This document requests, for separate Decision Owner consideration, a narrowly bounded **Schema Revalidation Dry Run ONLY** for the already identified SEG Internship candidate package. It is a request for authorization, not an authorization record. No dry run has been executed by this phase.

The request cannot supersede the open rights, clinical/relevant-review, provenance, lineage, taxonomy, and audit gates. The existence of this request does not establish approval, production readiness, or permission to alter any source or system.

## 2. Scope

The proposed dry-run scope is limited to read-only structural comparison of the documented candidate package against the already approved design-level contracts and revalidation checklist. The scope may include:

| Scope item | Boundary |
|---|---|
| Candidate set | The existing 48 candidate artifacts listed in the governed revalidation manifest and Phase 6.12 worksheet. |
| Structural inputs | Existing contract and manifest documentation only; no production schema mutation. |
| Checks | Presence/shape compatibility, source-ID/path/SHA linkage comparison, domain mapping readiness, and reporting of unresolved fields. |
| Outputs | A dry-run evidence report and discrepancy list only, if separately authorized. |
| Source handling | Read-only access; preserve original paths, IDs, lineages, and hashes. |
| Governance | Keep clinical/relevant review, rights review, and Decision Owner signoff as separate gates. |

## 3. Allowed action

> **Allowed action: `SCHEMA REVALIDATION DRY RUN ONLY`**

If and only if separately authorized in writing, the dry run may compare existing documentation and candidate metadata for structural compatibility. It may report missing fields, conflicts, or unresolved evidence. It may not write to production schemas, database tables, application code, content records, or activation state.

## 4. Explicit exclusions

The following are explicitly excluded from this request:

- **Import** of content, metadata, JSON, or transformed records.
- **Activation** of any Lesson, Question Bank, Clinical Case, Skills/Procedures, or Reference/Book record.
- **Publication** or learner-facing display of any source-derived material.
- JSON generation or production content conversion.
- Schema migration, schema mutation, Prisma/database change, or application change.
- Source deletion, rename, merge, archive, overwrite, or canonical replacement.
- Clinical approval, medical-safety approval, or reviewer substitution.
- Rights approval, license determination, or display-permission grant.
- Duplicate canonicalization or lineage identifier replacement.
- Track/taxonomy approval based on filename or folder inference.

## 5. Preconditions for consideration

Before a Decision Owner considers authorizing the dry run, the external-review handoff should receive attributable responses from the rights reviewer and the qualified clinical/relevant reviewer. At minimum, unresolved limitations must be explicitly acknowledged, the Decision Owner authority scope must be recorded, and the exact dry-run boundary must be accepted without expanding it to import, activation, or publication.

A dry-run authorization does not waive missing evidence. It may only permit a read-only structural check that reports those gaps.

## 6. Required authorization record

| Field | Required value |
|---|---|
| Decision Owner | `NOT_SUPPLIED — must be completed by the actual authority` |
| Authority scope | Must explicitly include `Schema Revalidation Dry Run ONLY`. |
| Approved scope | Existing candidate package and documented contracts only. |
| Excluded actions | Import, Activation, Publication, JSON generation, schema/database/application changes. |
| Conditions | Rights and clinical/relevant review remain separate and unresolved unless independently closed. |
| Start date | `NOT_SUPPLIED` |
| Expiry/review date | `NOT_SUPPLIED` |
| Signature/attribution | `PENDING` |

## 7. Current decision state

This request remains **pending**. No authorization is inferred from the Phase 6.10 `READY_FOR_EVIDENCE_REVIEW` package status or from the preparation of this document. The Phase 6.12 gate remains `BLOCKED_PENDING_EXTERNAL_REVIEW` until the external review handoff and Decision Owner record are completed.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_12_EXTERNAL_REVIEW_HANDOFF.md "SEG Phase 6.12 External Review Handoff"
[2]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_12_EVIDENCE_CLOSURE_WORKSHEET.md "SEG Phase 6.12 Evidence Closure Worksheet"
[3]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SCHEMA_REVALIDATION_GATE_DECISION.md "SEG Internship Schema Revalidation Gate Decision"
[4]: file:///home/ubuntu/seg-internship-output/SEG_INTERNSHIP_REVALIDATION_ARTIFACT_MANIFEST.md "SEG Internship Revalidation Artifact Manifest"

<!-- END OF REQUEST -->
