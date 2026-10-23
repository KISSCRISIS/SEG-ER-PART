# SEG Source Closure Decision Queue

**Mode:** `CONTROLLED GOVERNANCE EXECUTION`  
**Purpose:** Track source-level evidence closure decisions without approving any source.  
**Prepared by:** **Manus AI**  
**Queue status:** `SEG_P0_SOURCE_CLOSURE_QUEUE_UPDATED_V1`

## 1. Control Boundary

This queue records whether each source is ready for role-based review, waiting for external evidence, or incomplete. The queue does not approve a source, close an evidence gate, authorize normalization, authorize import, or change the Master Source Registry. No queue state below is an approval state.

The eight content-source tracks remain separate from the JEM Nexus Calculator tool track. JEM is listed for governance tracking only and is not added to the content-source registry.

## 2. Current Official Controls

```text
APPROVED_SOURCES = NONE
NORMALIZATION = BLOCKED_PENDING_APPROVED_SOURCE
SOURCE_REGISTRY_APPROVAL_STATES = UNCHANGED
```

## 3. Source Closure Queue

Only the permitted queue states are used: `READY_FOR_REVIEW`, `WAITING_FOR_EXTERNAL_EVIDENCE`, and `EVIDENCE_INCOMPLETE`.

| Source | Queue state | Evidence currently present | Review status | Blocking evidence or review need | Next queue action |
|---|---|---|---|---|---|
| Drug HTML | `WAITING_FOR_EXTERNAL_EVIDENCE` | v2 locked the exact local artifact `LOCAL_INTAKE_ARTIFACT` at `/home/ubuntu/upload/deepseek_html_20260615_a3266b.html`: 25,918 bytes, 394 lines, SHA-256 `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac`; read-only structure observations include 19 `summaryData`, 21 `quick`, 47 `drugList`, and 20 `trapsList` entries, embedded JavaScript data, and Arabic/English labels; no explicit pairwise interaction table was observed. Internal ownership, version-control, audit-trail, and reviewer-package records remain available. | `BLOCKED_PENDING_EVIDENCE_AND_REVIEWER_ASSIGNMENT` | Canonical source identity/version/locator, original-to-artifact provenance, rights for any incorporated third-party material, exact-artifact Emergency Medicine and Pharmacology/Drug Safety review, technical review, authorized reviewer appointment, and audit-event closure remain open | Obtain the missing attributable evidence, appoint authorized reviewers, execute the separate medical, drug-safety, and technical checks against the locked artifact, and keep the source blocked |
| OSCE Atlas | `WAITING_FOR_EXTERNAL_EVIDENCE` | v2 locked target `ATLAS_ASSET_OSCE_VISUAL_001`, the recovered package and outer container hashes, the 14-PNG inventory, station text, and validation notes; read-only archive integrity passed. Limited readability evidence exists for two selected images only. Internal ownership, version-control, audit-trail, and reviewer-package records remain available. | `BLOCKED_PENDING_EVIDENCE_AND_REVIEWER_ASSIGNMENT` | Authoritative atlas identity/version/locator, text/image rights for any incorporated third-party material, per-image lineage, completeness, Emergency Medicine review, full visual/accessibility and technical review, authorized reviewer appointment, and audit-event closure remain open | Obtain authoritative source/owner and rights evidence, reconcile all 14 PNG members, appoint authorized reviewers, execute separate medical/visual/accessibility checks, and keep the source blocked and separate from Clinical Images |
| PreTest | `WAITING_FOR_EXTERNAL_EVIDENCE` | v2 locked `UPD811-007` / `pretestnew_Study_Guide_UTF8.txt`: 131,490 bytes, 1,349 lines, SHA-256 `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166`; hash matches the registered representation. Known OCR/extraction corruption remains documented and the authoritative PDF is absent. Internal ownership, version-control, audit-trail, and reviewer-package records remain available. | `BLOCKED_PENDING_EVIDENCE_AND_REVIEWER_ASSIGNMENT` | Authoritative PDF/equivalent, canonical version/date/locator, immutable OCR comparison, completeness/numbering, provenance, rights for any incorporated third-party material, Emergency Medicine and Assessment Quality review, authorized reviewer appointment, and audit-event closure remain open | Obtain the authoritative representation and rights/provenance evidence, perform a read-only comparison, appoint authorized reviewers, execute separate medical and assessment-quality checks, and keep the source blocked |
| HIPPO HY | `WAITING_FOR_EXTERNAL_EVIDENCE` | Retained text, colored PDF, and DOCX representations with checksum continuity | Canonical identity/version, representation-specific rights/provenance, locators, track evidence, exact-representation clinical review, completeness/conflict disposition | Request source/version and rights/provenance packet; preserve representations separately and queue role-based review |
| HIPPO QBank | `WAITING_FOR_EXTERNAL_EVIDENCE` | Registered QBank text, structural observations, path/checksum continuity, and recovery notes | Official release identity/version, completeness/numbering, rights, stable locators, provenance, track evidence, question-level review | Request official release and completeness/rights evidence; queue question-level and track review |
| FRCEM | `WAITING_FOR_EXTERNAL_EVIDENCE` | Five retained representations, checksum/path observations, duplicate relationship, and representation notes | Canonical authority/version, rights, representation locators, provenance, separate study-book/Q&A clinical review, track decision | Request canonical authority and rights/provenance evidence; keep study-book and Q&A review queues separate |
| Clinical Images | `EVIDENCE_INCOMPLETE` | No standalone source-specific package, authoritative locator, or per-file source manifest | Source package/locator, per-file inventory and SHA-256, owner/creator, rights, provenance, interpretation, visual/accessibility, completeness, track evidence | Recover or independently locate a standalone source family; do not substitute OSCE PNGs |
| Hamilton Ventilator Clinical Engineering Guide | `WAITING_FOR_EXTERNAL_EVIDENCE` | ZIP and embedded PDF integrity/hash observations; mixed PDF/application candidate and local custody records | Owner-issued identity/version/date/locator, configuration/software relationship, rights, transformation provenance, Emergency Medicine/ICU and ventilation review, device technical review, currency/track/audit evidence | Request owner-issued evidence packet and role-based medical/device review; retain candidate internally and blocked |
| JEM Nexus Calculator — separate tool track | `WAITING_FOR_EXTERNAL_EVIDENCE` | Static artifact inventory and supplied package continuity | Developer/owner, repository/release/version, documentation, formula/reference validation, rights/dependencies, privacy/AI data flow, reproducible tests, software/security and track review | Request external developer/release, clinical, rights, privacy, security, and reproducibility evidence; do not execute or integrate the tool |

## 3.1 P0 Sprint v1 Evidence-Status Update

The P0 sprint re-evaluated the evidence already present for Drug HTML, OSCE Atlas, and PreTest. The result is a documentation-level status update only: no authoritative external evidence was added, no evidence gate was closed, and no source approval state changed.

| P0 source | Evidence status after sprint | Review readiness | Queue state |
|---|---|---|---|
| Drug HTML | `EVIDENCE_INCOMPLETE` for canonical identity, version, rights, provenance, and required reviews; internal ownership evidence, retained artifact evidence, version-control preparation, and audit-trail preparation are now recorded; source-level closure remains open | `ROLE_PREPARATION_COMPLETE — EXECUTION_PENDING_EVIDENCE_AND_REVIEWER_APPOINTMENT` | `WAITING_FOR_EXTERNAL_EVIDENCE` |
| OSCE Atlas | `EVIDENCE_INCOMPLETE` for authoritative identity/version, per-image rights/lineage, completeness, and required reviews; internal ownership evidence, recovered package evidence, version-control preparation, and audit-trail preparation are now recorded; source-level closure remains open | `ROLE_PREPARATION_COMPLETE — EXECUTION_PENDING_EVIDENCE_AND_REVIEWER_APPOINTMENT` | `WAITING_FOR_EXTERNAL_EVIDENCE` |
| PreTest | `EVIDENCE_INCOMPLETE` for authoritative representation/version, identity, rights, provenance, completeness, and required reviews; internal ownership evidence, recovered text evidence, version-control preparation, and audit-trail preparation are now recorded; source-level closure remains open | `ROLE_PREPARATION_COMPLETE — EXECUTION_PENDING_EVIDENCE_AND_REVIEWER_APPOINTMENT` | `WAITING_FOR_EXTERNAL_EVIDENCE` |

These labels describe the unresolved evidence categories and are not queue states or approvals. `APPROVED_SOURCES = NONE` and `SOURCE_REGISTRY_APPROVAL_STATES = UNCHANGED` remain in force.

## 3.2 P0 Final Closure Readiness Update

This readiness update evaluates the existing P0 evidence, review preparation, and audit records without granting source approval. `BLOCKED_PENDING_EVIDENCE` is used here as a readiness state only; it is not an approval state and does not set `READY_FOR_NORMALIZATION`.

| P0 source | Current readiness | Remaining blockers | Next allowed action |
|---|---|---|---|
| Drug HTML | `BLOCKED_PENDING_EVIDENCE` | Canonical identity/version/locator; original-to-artifact provenance; rights for incorporated material; assigned and completed Emergency Medicine, Pharmacology/Drug Safety, technical, rights/provenance, version, and audit reviews | Obtain attributable identity/version/rights/provenance evidence, appoint authorized reviewers, execute the separate reviews against the locked HTML hash, and record findings and dispositions |
| OSCE Atlas | `BLOCKED_PENDING_EVIDENCE` | Authoritative atlas identity/version/locator; source-to-member lineage; per-image text/image rights; completeness; assigned and completed Emergency Medicine, full 14-image visual, accessibility, technical, rights/provenance, version, and audit reviews | Obtain authoritative source/owner and rights evidence, reconcile all 14 PNG members, appoint authorized reviewers, execute separate medical/visual/accessibility reviews, and preserve separation from Clinical Images |
| PreTest | `BLOCKED_PENDING_EVIDENCE` | Authoritative PDF/equivalent; canonical identity/version/locator; immutable OCR comparison; completeness/numbering; answer-key and explanation evidence; rights/provenance; assigned and completed Emergency Medicine, Assessment Quality, technical/OCR, version, and audit reviews | Obtain the authoritative representation and rights/provenance evidence, perform read-only comparison and OCR reconciliation, appoint authorized reviewers, execute separate medical and assessment-quality reviews, and preserve the recovered text unchanged |

No P0 source qualifies for `READY_FOR_FINAL_REVIEW` or `READY_FOR_NORMALIZATION_REVIEW` on the current evidence. The existing Queue state for each P0 row remains `WAITING_FOR_EXTERNAL_EVIDENCE`; no Source Registry approval or approval state has changed.

## 4. Queue-State Interpretation

`WAITING_FOR_EXTERNAL_EVIDENCE` means that retained local evidence exists but one or more authoritative external identity, provenance, rights, or review dependencies remain open. `EVIDENCE_INCOMPLETE` means that the currently available material does not establish a minimally attributable source package or equivalent evidence basis. `READY_FOR_REVIEW` would mean only that the applicable evidence packet is sufficient to begin the specified role-based review; it would not mean approval or normalization readiness. No source currently has that state in this update.

## 5. Governance Rules for Next Actions

External evidence must be attributable to the exact source or retained representation and must record scope, locator, version/date where applicable, custody, and rights applicability. A checksum, file count, recovered artifact, structural observation, or queue status cannot replace source identity, rights, provenance, medical review, technical review, or approval evidence.

Any subsequent role-based review must identify the exact artifact examined and record reviewer role, date, conflicts, findings, and disposition. No individual reviewer names or approvals are created by this queue.

The next allowed action is evidence acquisition and preparation of independent role-based reviews. The following actions remain prohibited: normalization, Content Record creation, Zod or Prisma work, SQL, migrations, import, activation, publication, learner exposure, database changes, application changes, and Source Registry approval-state changes.

The final-readiness update above is evidence/readiness-only. It does not replace the permitted Queue states, does not grant source approval, and does not authorize normalization.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_EXTERNAL_EVIDENCE_ACQUISITION_TRACKER.md "SEG External Evidence Acquisition Tracker"
[2]: file:///home/ubuntu/seg-internship-output/SEG_EXTERNAL_EVIDENCE_COLLECTION_REPORT_v1.md "SEG External Evidence Collection Report v1"
[3]: file:///home/ubuntu/seg-internship-output/SEG_MASTER_SOURCE_REGISTRY_STATUS.md "SEG Master Source Registry Status"
[4]: file:///home/ubuntu/seg-internship-output/SEG_FINAL_NORMALIZATION_READINESS_CHECK.md "SEG Final Normalization Readiness Check"

---

**SEG_P0_SOURCE_CLOSURE_QUEUE_UPDATED_V1**
