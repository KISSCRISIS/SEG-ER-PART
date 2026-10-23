**Phase:** 6.3 — Architecture Decision Record & Blueprint Adoption  
**Mode:** `READ_ONLY ARCHITECTURE GOVERNANCE`  
**Generated at (UTC):** `2026-08-17T20:28:49Z`  
**Decision scope:** Reference architecture documentation only; no implementation authorization.

# SEG Internship Architecture Decision Record

## 1. Decision context

The SEG Internship Doctor Pathway content work has reached a consolidated architecture blueprint after controlled source intake, classification, domain normalization, governed review, schema-readiness preparation, and a non-production dry run. The Phase 6.2 gate established that the blueprint was complete as a read-only architecture document but had not yet been adopted as the reference design. Phase 5.11 also remains `BLOCKED_PENDING_GOVERNANCE` because source-level provenance, rights, taxonomy, review, audit, duplicate governance, and implementation authorization are incomplete.

This record documents a bounded architecture decision: the Internship Content Model Blueprint is adopted as the **reference design for future controlled planning only**. This adoption does not adopt source records, amend the canonical manifest, authorize the three candidate contract extensions, or permit implementation.

## 2. Problem statement

SEG requires a reusable Internship content model that can organize rotation learning, clinical foundations, assessments, cases, skills, and references while preserving professional-track separation, source lineage, medical governance, and the existing application architecture. The project must avoid two unsafe extremes: importing provisional files as if they were governed records, or inventing a parallel architecture that bypasses the existing SEG hosts and governance lifecycle.

The evidence shows that `Lesson` and `Question Bank` have existing canonical content-type candidates, while `Clinical Case`, `Skills / Procedures`, and `Reference / Book` require explicit contract and enum decisions. The evidence also shows unresolved lineage for `SRC-0078` / `phone-pediatrics-main`, unresolved duplicate families, and incomplete per-source governance fields. These facts constrain adoption to a non-production reference design.

## 3. Adopted design principles

The following principles are adopted for future controlled planning:

1. **Reuse existing architecture.** The pathway is a composition layer over existing generic SEG hosts rather than a new route, dashboard, database boundary, or duplicate application subsystem.
2. **Evidence before decision before execution.** A mapping candidate is not an approved record, and a structurally valid artifact is not clinical approval.
3. **Closed-world schema discipline.** The canonical manifest remains unchanged. New domains require explicit architecture and governance decisions before becoming canonical enums.
4. **Source fidelity and traceability.** Original paths, source IDs, local aliases, checksums, versions, exact locators, rights evidence, and audit lineage are preserved.
5. **Professional-track separation.** `02_Internship` remains distinct from Emergency Medicine Resident, Medical Student, Paramedic/EMS, Emergency Nursing, General Practitioner, and Shared Medical Core content.
6. **Fail-closed governance.** Missing provenance, rights, track, taxonomy, review, audit, or contract evidence blocks conversion and release.
7. **Reversible controlled implementation.** Any future implementation requires separately authorized exact-artifact QA, release evidence, deployment parity, and rollback planning.

## 4. Approved Internship pathway model

The reference design adopts the approved pathway vocabulary below without creating it in the application:

| Level | Approved structure |
|---|---|
| Pathway | `SEG Internship Doctor Pathway` |
| Audience | `Medical Intern Doctors` |
| Root concept | `Intern Core` |
| Branch 1 | `Core Rotations`: Internal Medicine, Surgery, Pediatrics, OBGYN |
| Branch 2 | `Clinical Foundation`: Emergency Basics, Clinical Skills, Drug Essentials, ECG, Critical Care, Toxicology |
| Branch 3 | `Learning Engine`: Learn, Practice, MCQ, Cases, Progress Analytics |

`Medical Journal`, `Reference / Atlas`, `Assessments`, and `Progress` remain supporting or cross-cutting SEG capabilities; they are not additional top-level branches. No resident, student, paramedic, nursing, GP, or shared-core material is silently mixed into the Internship pathway.

## 5. Approved future content domains

The reference design adopts the following domain vocabulary for future planning. Adoption here is conceptual and does not grant a canonical manifest enum or a production schema target.

| Domain | Reference-design role | Current contract status |
|---|---|---|
| Lesson | Learning unit bound to a rotation, foundation module, or Learn host | Existing candidate; implementation pending governance |
| Question Bank | Assessment/question-bank item bound to MCQ or Practice | Existing candidate; implementation pending lineage and review |
| Clinical Case | Source-derived case for Cases, Emergency Basics, or Clinical Foundation | Candidate extension; canonical `case` enum not adopted |
| Skills / Procedures | Skill framework or procedure candidate with explicit framework-vs-competency role | Candidate extension; canonical `skill` enum not adopted |
| Reference / Book | Governed reference/book-like source with exact locators and rights/display scope | Candidate extension; generic `reference` enum not adopted |

## 6. Technical asset exclusion rules

TS, TSX, JS, route/page, component, parser, utility, manifest, README, governance, and implementation artifacts are evidence or technical assets, not medical content records. They remain outside medical-content ingestion and cannot be converted into Lessons, Questions, Cases, Skills, or References merely because they mention clinical topics. Technical ownership may be reviewed separately, but no medical approval or schema target is assigned.

## 7. Source lineage rules

Every future governed artifact must preserve the inventory Source ID, any source-local identifier, namespace, immutable archive path, SHA-256, governed version, accessed date, owner/publisher, exact locator, rights evidence, explicit track/taxonomy, review decision, and append-only audit events. Conflicting identifiers must be resolved by an authorized append-only crosswalk. For `SRC-0078` and `phone-pediatrics-main`, both values remain preserved until a reviewer decides whether they are aliases or distinct namespaces; silent replacement, renaming, or merging is rejected.

## 8. Duplicate preservation rules

The original members of `DUP-DRUG-001` and `DUP-EMERGENCY-001` remain immutable and separately traceable. No source is deleted, renamed, merged, archived, or selected as canonical by this record. A future duplicate decision must compare content overlap, structure, version evidence, rights, and lineage, then record primary/secondary/archive treatment with reviewer attribution and rollback-safe evidence.

## 9. Governance lifecycle

Future content must remain within the following lifecycle:

```text
Source → Metadata → Structural/Provenance/Rights/Taxonomy Review → Clinical/Relevant Review → QA → Governance Registration → Implementation Authorization → Controlled Release → Activation
```

`Pending Clinical Review`, `NOT_APPROVED`, `BLOCKED`, and `RELEASE_DRY_RUN` remain distinct states. Blueprint adoption does not change any source or content review state and does not make any record learner-facing.

## 10. Rejected alternatives and reasons

| Rejected alternative | Reason |
|---|---|
| Import the 129 classified files directly | Classification is provisional; 20 unknown items and 67 unresolved rows remain, and governance evidence is incomplete. |
| Infer `02_Internship` and taxonomy from folder names | Folder placement is not explicit per-source track/taxonomy evidence and risks cross-track mixing. |
| Replace `SRC-0078` with `phone-pediatrics-main` | The identifiers may be aliases or distinct namespaces; silent replacement destroys lineage. |
| Treat Case, Skills, or Reference as existing canonical enums | Phase 6.0/6.1 established that these contracts/enums are not authorized in the canonical manifest. |
| Merge or archive duplicate families now | `DUP-DRUG-001` and `DUP-EMERGENCY-001` lack completed canonical comparison and reviewer decision. |
| Create a new route/database/content architecture | The pathway is designed to reuse existing SEG hosts and preserve application/security/database boundaries. |
| Treat dry-run or structural QA as clinical approval | Structural mapping cannot establish medical correctness, rights, governance, or activation eligibility. |

## Decision status

**Reference-design adoption:** `ADOPTED_WITH_LIMITATIONS`  
**Canonical schema adoption:** `NOT_ADOPTED`  
**Implementation authorization:** `NOT_GRANTED`  
**Clinical approval or activation:** `NOT_GRANTED`

## Non-actions and scope boundary

This Phase 6.3 package is documentation-only. It does not modify the canonical manifest schema, create JSON, convert source content, create production records, import to a database, change the application, change authentication/routes/components/assets, activate or publish medical content, delete/rename/merge/archive sources, commit, push, deploy, or grant clinical approval. The Phase 5.11 governance gate remains `BLOCKED_PENDING_GOVERNANCE`. The three extension contracts remain candidate/pending design elements unless separately approved.


## References

[1]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_MODEL_BLUEPRINT.md` "SEG Internship Content Model Blueprint"  
[2]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_2_BLUEPRINT_GATE_REPORT.md` "Phase 6.2 Blueprint Gate Report"  
[3]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_EXTENDED_CONTENT_CONTRACTS.md` "Extended Content Contracts"  
[4]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_TAXONOMY_CLOSURE_PLAN.md` "Taxonomy Closure Plan"  
[5]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_LINEAGE_RECONCILIATION.md` "Source Lineage Reconciliation"  
[6]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_5_11_FINAL_GATE_REPORT.md` "Phase 5.11 Final Gate Report"  

## Evidence input hashes

| Label | File | SHA-256 |
|---|---|---|
| `blueprint` | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_MODEL_BLUEPRINT.md` | `8b33354f2176950e5c89f9c1824a4426c336a7c8a805ac1c8e5171a9f8fdf2dd` |
| `blueprint_gate` | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_2_BLUEPRINT_GATE_REPORT.md` | `680adf4315d9267e95eab2ea17d11770db45819902364e99740afb2db128717c` |
| `extended_contracts` | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_EXTENDED_CONTENT_CONTRACTS.md` | `99274b53bc635565141cbf5e848e93346970fa42beacfcce673883e35550c3a1` |
| `taxonomy` | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_TAXONOMY_CLOSURE_PLAN.md` | `f2bbee36c949e743e48cb06f5e0e52dd6c1310231e22ad9ae746f2384bddc97a` |
| `lineage` | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_LINEAGE_RECONCILIATION.md` | `9dd79f14efe63771e83f5093d1227da957db90a8a9c4d783bdaeadc49ccfb812` |
| `governance_gate` | `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_5_11_FINAL_GATE_REPORT.md` | `2c2ddf8edf96da2080dbcbc2d806b97d87fa6b1363b613818405d0b601605eb7` |
