# SEG Internship Review Assignment Matrix

**Phase:** 7.0 — Controlled Evidence Collection & Closure Execution  
**Mode:** `READ_ONLY EVIDENCE COLLECTION`  
**Generated at (UTC):** `2026-08-18T00:00:00Z`  
**Assignment state:** `ROLE REQUIREMENTS IDENTIFIED — ATTRIBUTABLE ASSIGNMENTS NOT RECORDED`

## 1. Purpose

This matrix identifies the qualified role required to review or close each governance domain before a separately authorized, non-production schema-revalidation review. It does not assign a person, infer qualification, record a clinical decision, or authorize implementation. The current assignment state is therefore explicitly separated from the required role.

A role is considered assigned only when an attributable record names the reviewer identity or accountable owner, qualification/authority, exact artifact scope, review questions, dates, conflict handling, evidence locators, and expected decision output. No such complete assignment package is inferred from prior design documents.

## 2. Assignment status vocabulary

| Status | Meaning |
|---|---|
| `ROLE IDENTIFIED — ASSIGNMENT OPEN` | The required role is defined, but no attributable reviewer/owner assignment is recorded. |
| `PARTIAL DESIGN OWNER IDENTIFIED` | A design authority is implied by the contract or governance package, but formal assignment evidence is absent. |
| `NOT ASSIGNED` | No complete attributable assignment record exists. |
| `ASSIGNED` | Reserved for a future explicit assignment record; no row is marked assigned in Phase 7.0. |
| `CLOSED` | Reserved for a future completed decision record; no review domain is closed by this matrix. |

## 3. Review assignment matrix

| Review domain | Required role | Evidence required | Current assignment state | Required output before closure |
|---|---|---|---|---|
| **Provenance** | Source-governance owner / source-intake custodian with authority over the Internship source registry | Per-source owner/publisher, source ID, source-local ID and namespace, immutable archive path, access date, exact locator, relationship record, checksum linkage, and audit reference | `ROLE IDENTIFIED — ASSIGNMENT OPEN` | Attributable provenance closure record covering every exact in-scope artifact in the manifest. |
| **Version** | Version/release governance owner, independent of the content candidate where possible | Governed version/release identifier, version authority, effective/access date, release evidence, comparison basis, and conflict disposition; `v2_Pack` naming alone is not sufficient | `ROLE IDENTIFIED — ASSIGNMENT OPEN` | Version reconciliation record linked to source IDs, paths, hashes, and audit events. |
| **Rights** | Rights/licensing owner plus independent rights reviewer | Ownership/license evidence for text, images, excerpts, display scope, restrictions, permitted use, exact locators, reviewer identity, and decision date | `NOT ASSIGNED` | Rights decision record or documented exclusion for each artifact; no display assumption where rights are open. |
| **Reviewer evidence — clinical/relevant** | Qualified clinical/relevant reviewer appropriate to the Internship level and content domain | Reviewer identity/role, qualification or authority, exact source scope, source locators, review questions, decision, date, limitations, conflicts, and unresolved-issue disposition | `NOT ASSIGNED` | Attributable clinical/relevant review record; this matrix does not perform or infer clinical review. |
| **Audit** | Governance/audit owner with authority to maintain append-only audit records | Ordered immutable events for intake, evidence collection, lineage, duplicate review, rights, track/taxonomy, contract confirmation, QA, scope authorization, and entry decision, linked to artifact hashes | `ROLE IDENTIFIED — ASSIGNMENT OPEN` | Append-only audit package with integrity/reconciliation evidence. |
| **Track** | Professional-track governance owner for `02_Internship` | Source-level track, audience, level, pathway, module/branch, separation from Resident/Student/EMS/Nursing/GP/Shared Core, and rationale | `NOT ASSIGNED` | Explicit track decision record for every included candidate or an exclusion record. |
| **Taxonomy** | Taxonomy owner and professional-track reviewer | Taxonomy ID/version, source-level mapping, pathway/domain rationale, unresolved conflict disposition, and review attribution | `NOT ASSIGNED` | Taxonomy confirmation record with versioned taxonomy reference. |
| **Contract confirmation — Clinical Case** | Architecture/schema governance owner plus clinical/relevant contract authority | Contract identity/version, required and optional fields, unknown-field policy, source linkage, review states, safety/clinical boundary, approval owner, and exact contract artifact hash | `PARTIAL DESIGN OWNER IDENTIFIED` | Versioned contract confirmation; no canonical enum or production schema activation. |
| **Contract confirmation — Skills / Procedures** | Architecture/schema governance owner plus competency/skills authority and relevant clinical reviewer | Contract identity/version, competency boundary, distinction between framework/skill/procedure/assessment/sign-off, field semantics, review states, source linkage, and approval owner | `PARTIAL DESIGN OWNER IDENTIFIED` | Versioned contract confirmation with competency boundary; no completion, credential, OSCE, or sign-off activation. |
| **Contract confirmation — Reference / Book** | Architecture/schema governance owner plus rights authority and reference-content reviewer | Contract identity/version, reference type, source/version/locator, rights and display scope, track/taxonomy, review state, audit, approval owner, and restrictions | `PARTIAL DESIGN OWNER IDENTIFIED` | Versioned contract and rights confirmation; no learner-facing display authorization. |
| **Duplicate comparison — `DUP-DRUG-001`** | Independent duplicate-governance comparison reviewer with source-diff capability | Exact Base and `v2_Pack` files, hashes, comparison method, content/structure/version differences, reviewer identity, outcome, unresolved differences, and no-delete disposition | `NOT ASSIGNED` | Attributable file-level comparison record; `v2_Pack` remains a design candidate and Base lineage remains preserved. |
| **Duplicate comparison — `DUP-EMERGENCY-001`** | Independent duplicate-governance comparison reviewer with source-diff capability | Exact Base and `v2_Pack` files, hashes, comparison method, content/structure/version differences, reviewer identity, outcome, unresolved differences, and no-delete disposition | `NOT ASSIGNED` | Attributable file-level comparison record; `v2_Pack` remains a design candidate and Base lineage remains preserved. |
| **Lineage namespace — `SRC-0078` / `phone-pediatrics-main`** | Lineage-governance owner plus namespace decision authority and source-governance reviewer | Both identifiers, namespace definitions, exact locator, SHA-256, evidence of relationship, alias/distinct-namespace analysis, affected scope, unresolved disposition, rationale, and audit event | `NOT ASSIGNED` | Authorized namespace decision preserving both identifiers; no replacement or normalization. |
| **Exact artifact and SHA verification** | Evidence/package owner plus independent checksum verification reviewer | Frozen manifest, preserved originals, exact paths, source IDs/local IDs, versions, exclusions, SHA-256 values, mismatch log, and verification date | `ROLE IDENTIFIED — ASSIGNMENT OPEN` | Immutable/versioned artifact and checksum verification record linked to audit. |
| **Revalidation scope** | Schema-revalidation scope owner plus governance authority | Written finite non-production scope, tracks, source IDs/files, content candidates, contract versions, target candidates, excluded technical assets, test method, outputs, retention, rollback, stop conditions, and prohibited actions | `NOT ASSIGNED` | Separate scope authorization package; no production writes or activation. |
| **QA / schema readiness** | Content QA validator and schema/architecture validator operating under the authorized scope | Explicit schema/metadata contract, source/lineage evidence, rights/track/taxonomy/reviewer/audit records, validation logs, unresolved issue handling, and exact artifact hashes | `NOT ASSIGNED` | Read-only QA/revalidation report; not a clinical approval or import authorization. |
| **Separate implementation authorization** | Authorized governance/implementation authority | Written authorization defining exact purpose, scope, output location, retention, rollback, reviewer assignments, stop conditions, and prohibited actions | `NOT GRANTED` | Separate authorization record. This phase does not request or grant it. |

## 4. Scope allocation

The artifact manifest defines 48 candidate medical-content records and 61 exact technical implementation assets excluded from medical-content ingestion. Review assignments must use the exact paths and hashes in that manifest, not broad directories or filename-only references.

The following special populations require explicit handling by the assigned reviewers:

| Population | Required review handling |
|---|---|
| `DUP-DRUG-001` | Compare Base (`SRC-0023..0025`) against `v2_Pack` (`SRC-0027..0029`) without canonical, archive, merge, deletion, or overwrite action. |
| `DUP-EMERGENCY-001` | Compare Base (`SRC-0033..0035`) against `v2_Pack` (`SRC-0037..0039`) without canonical, archive, merge, deletion, or overwrite action. |
| `SRC-0078` / `phone-pediatrics-main` | Preserve inventory and source-local identifiers and determine namespace semantics without replacement. |
| Unknown / unresolved rows | Keep held back until source role, locator, track/taxonomy, rights, and review evidence are resolved. |
| Technical `.ts`/`.tsx` assets | Exclude from medical-content ingestion; any technical review would require a separate authorized scope. |

## 5. Assignment closure rule

No governance gate may be marked closed merely because the required role is listed. Closure requires an attributable assignment and completed evidence record that names the reviewer/owner, scope, qualification or authority, decision criteria, source locators, dates, conflicts, outcome, unresolved issues, and audit linkage.

The current assignment state is therefore:

> **`REVIEW_ASSIGNMENTS_NOT_CLOSED`**

The absence of a complete assignment package keeps the future schema-revalidation entry gate fail-closed. No clinical, rights, taxonomy, duplicate, lineage, contract, QA, or implementation conclusion is inferred from this matrix.

## 6. Protected boundaries and validation

| Boundary | Result |
|---|---|
| READ_ONLY evidence collection | `PASS` |
| Reviewer identities invented | `FALSE` |
| Clinical/relevant review performed | `FALSE` |
| Rights approval performed | `FALSE` |
| Evidence gates closed | `FALSE` |
| JSON generation | `FALSE` |
| Schema conversion/revalidation | `FALSE` |
| Import/database writes | `FALSE` |
| Application changes | `FALSE` |
| Activation/publication | `FALSE` |
| Original source deletion/rename/merge/archive | `FALSE` |
| Separate authorization granted | `FALSE` |

## References

[1]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_REVALIDATION_ARTIFACT_MANIFEST.md` "Phase 7.0 Revalidation Artifact Manifest"  
[2]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_EVIDENCE_COLLECTION_REGISTER.md` "Phase 7.0 Evidence Collection Register"  
[3]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SCHEMA_REVALIDATION_ENTRY_CHECKLIST.md` "Phase 6.9 Schema-Revalidation Entry Checklist"  
[4]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_GOVERNANCE_ACCEPTANCE_DECISION_RECORD.md` "Phase 6.8 Governance Acceptance Decision Record"  
[5]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DUPLICATE_RECOMMENDATION_DECISION.md` "Phase 6.6 Duplicate Recommendation Decision"  
[6]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_LINEAGE_RECOMMENDATION_DECISION.md` "Phase 6.6 Lineage Recommendation Decision"  
