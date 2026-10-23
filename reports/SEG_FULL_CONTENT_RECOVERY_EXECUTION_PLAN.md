# SEG Full Content Recovery Execution Plan

**Mode:** `CONTROLLED EXECUTION PLANNING`  
**Decision:** All seven SEG source families are `REQUIRED`  
**Decision basis:** `SEG_MASTER_SOURCE_REGISTRY_STATUS.md`  
**Final status:** `FULL_CONTENT_RECOVERY_PLAN_COMPLETE`

## 1. Purpose and governing decision

This plan converts the explicit SEG decision that all seven source families are required into a controlled recovery workflow. `REQUIRED` means that no source family is to be discarded, retired, silently substituted, or excluded from the recovery program. It does **not** mean that any source is approved for normalization, database integration, learner exposure, publication, or activation.

The current Master Source Registry records all seven families as `BLOCKED_PENDING_EVIDENCE`, with operational use limited to `INTERNAL_REFERENCE_ONLY` / `WAITING_FOR_EVIDENCE`.[1] Accordingly, the plan addresses evidence recovery and governance closure only. It preserves every existing artifact and representation in place, treats separate representations as separate evidence until an authorized lineage decision exists, and keeps missing evidence distinct from negative evidence.

> **Non-disposition rule:** Every source below remains `REQUIRED`. Recovery of a missing or incomplete artifact means obtaining or restoring source-specific evidence; it does not authorize replacing the source family, deleting a representation, merging duplicates, rewriting medical content, or substituting one source with another.

## 2. Recovery status vocabulary

| Status | Meaning in this plan |
|---|---|
| `REQUIRED` | The source family remains in the SEG scope and must be preserved and pursued through the recovery workflow. |
| `RECOVERY_PENDING` | Existing evidence or representations are present, but one or more authoritative evidence components are missing. |
| `SOURCE_SPECIFIC_ARTIFACT_REQUIRED` | A standalone artifact or inventory is missing and must be recovered for that source family; this is not a replacement decision. |
| `BLOCKED_PENDING_EVIDENCE` | Identity, rights, review, provenance, completeness, or related governance evidence is incomplete, so downstream processing is not authorized. |
| `READY_FOR_NORMALIZATION_REVIEW` | A future gate state available only after the required evidence, review decisions, and approvals are complete. No source currently has this state. |

## 3. Master recovery scope

| # | Source family | Required | Current gate | Current evidence state | Recovery objective | Current permitted handling |
|---:|---|---|---|---|---|---|
| 1 | **Drug HTML Artifact** | `REQUIRED` | `BLOCKED_PENDING_EVIDENCE` | `PARTIALLY_CONFIRMED`: the local HTML integrity is recorded by SHA-256 `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac`, but the authoritative source relationship is open. | Recover exact source identity, rights, original extraction context, and medication-review evidence for the retained HTML. | Preserve and inspect internally only; do not rewrite, normalize, map, import, publish, or activate. |
| 2 | **OSCE Atlas Package** | `REQUIRED` | `BLOCKED_PENDING_EVIDENCE` | `PARTIALLY_CONFIRMED`: recovery container, OSCE text, validation notes, and 14 PNG members are evidenced; the named original and owner remain unverified. | Recover the authoritative OSCE source or attributable owner evidence, plus text-level and image-level rights and provenance. | Preserve the text and 14 PNGs as a distinct OSCE package; do not reclassify them as Clinical Images. |
| 3 | **PreTest Question Package** | `REQUIRED` | `BLOCKED_PENDING_EVIDENCE` | `PARTIALLY_CONFIRMED`: recovered inner text SHA-256 `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166` matches the registered `UPD811-007` representation; authoritative `pretestnew.pdf` is absent and OCR corruption remains. | Recover the authoritative PreTest artifact or independently verifiable equivalent and preserve an immutable comparison with the recovered representation. | Preserve recovered text and separate all-chapters evidence internally; no OCR correction, normalization, mapping, or assessment generation. |
| 4 | **HIPPO High Yield** | `REQUIRED` | `BLOCKED_PENDING_EVIDENCE` | `PARTIALLY_CONFIRMED`: registered text `UPD811-005`, colored PDF `UPD811-010`, and editable DOCX `UPD811-012` are available and checksum-verifiable; canonical identity and rights remain open. | Recover authoritative title/version/owner evidence, source-specific rights, representation lineage, and explicit professional-track and clinical-review evidence. | Keep text, PDF, and DOCX separate and internal-only; no merging or transformation. |
| 5 | **HIPPO QBank** | `REQUIRED` | `BLOCKED_PENDING_EVIDENCE` | `PARTIALLY_CONFIRMED`: registered text `UPD811-002` and structural counts are evidenced; completeness, canonical identity, locators, rights, and review remain open. | Recover authoritative QBank identity/version, completeness and locator evidence, rights, and question-level review requirements. | Preserve the artifact and structural evidence only; do not convert counts into records or mappings. |
| 6 | **FRCEM Representations** | `REQUIRED` | `BLOCKED_PENDING_EVIDENCE` | `PARTIALLY_CONFIRMED`: study-book, Q&A, PDF, DOCX, and duplicate representations are available and checksum-verifiable; canonical authority, rights, and review remain open. | Recover authoritative FRCEM edition/version, owner, rights, representation-level locators, duplicate lineage, and clinical-review evidence. | Preserve every representation and duplicate relationship; no deletion, merge, or silent substitution. |
| 7 | **Clinical Images** | `REQUIRED` | `BLOCKED_PENDING_EVIDENCE` | `NOT_AVAILABLE` for a standalone family: no source-specific artifact inventory, per-file hashes, archive, or closed registry entry is evidenced. | Recover a source-specific Clinical Images package or authoritative source evidence, with per-file inventory, hashes, locators, rights, and image-review requirements. | Maintain the evidence-gap state internally; OSCE PNGs are not a substitute and must not be relabeled. |

## 4. Recovery sequence

### Phase 0 — Recovery control and preservation

The recovery custodian first freezes the current evidence set for each family without changing content. The custodian records filenames, package membership, representation identifiers, existing SHA-256 values, file sizes, acquisition or recovery dates where known, and the exact location of every retained artifact. The custodian also records missing items as `NOT_AVAILABLE` rather than inferring them from filenames or catalog signals.

No source is renamed, deleted, merged, corrected, or moved into a production content structure during this phase. The recovery package remains an evidence package, not a content import package.

### Phase 1 — P0 recovery evidence closure

P0 recovery begins with **Drug HTML**, **PreTest**, and **OSCE Atlas** because their current gaps prevent reliable downstream source handling and because concrete artifact-level evidence is already present for each.

| Order | Source | Recovery action | Exit evidence for the phase |
|---:|---|---|---|
| 1 | Drug HTML | Obtain attributable owner, publisher, or authorized-custodian evidence that links the local HTML to the exact canonical source; record version/date context and original locator; obtain source-specific rights terms; preserve the existing hash; prepare medication/pharmacology review. | Exact source relationship, rights evidence, immutable artifact identity, and review request package are present, or the item remains explicitly blocked with a documented failed evidence path. |
| 2 | PreTest | Restore or obtain authoritative `pretestnew.pdf` or an independently verifiable equivalent; preserve recovered text and the separate all-chapters artifact; perform an evidence-only comparison for OCR/extraction discrepancies; collect rights and prepare PreTest/QBank clinical review. | Authoritative comparison target, representation lineage, rights evidence, and review request package are present, or the source remains blocked without altering the recovered text. |
| 3 | OSCE Atlas | Recover the named original source or an attributable owner/publisher statement; inventory the recovery container and 14 PNGs; collect separate station-text and image-level rights evidence; document image-to-source provenance; prepare clinical and visual/accessibility review. | Source-level and image-level provenance/rights evidence and separate review request packages are present, or the package remains blocked without reclassification. |

A P0 artifact may proceed to the next evidence phase only when the exit evidence is attributable and internally consistent. A failure to obtain evidence does not authorize replacement or retirement.

### Phase 2 — P1 recovery evidence closure

P1 recovery follows the P0 evidence pass and covers **HIPPO High Yield**, **HIPPO QBank**, **FRCEM**, and **Clinical Images**. The P1 label controls sequencing; it does not weaken any identity, rights, medical-review, or provenance requirement.

| Order | Source | Recovery action | Exit evidence for the phase |
|---:|---|---|---|
| 4 | FRCEM Representations | Establish canonical authority, edition/version, owner, rights, source-versioned locators, and representation-level lineage; preserve the byte-identical duplicate as evidence; prepare separate study-book and Q&A review scopes. | Canonical source envelope, rights evidence, duplicate lineage, locators, and review request package are complete or the source remains blocked. |
| 5 | HIPPO High Yield | Establish canonical title/version/owner and source locator; obtain rights terms for text, PDF, and DOCX; preserve each representation; document original-to-extraction-to-registry provenance; prepare Emergency Medicine review and explicit track review. | Representation-specific source envelope, rights, provenance, review scope, and track evidence are complete or the source remains blocked. |
| 6 | HIPPO QBank | Establish authoritative QBank identity/version; collect completeness, official numbering, and precise locator evidence; obtain rights terms; preserve structural observations separately; prepare question, answer, explanation, and conflict review. | Identity, completeness, locators, rights, provenance, and QBank review package are complete or the source remains blocked. |
| 7 | Clinical Images | Recover the source-specific package or inventory without using OSCE images as a substitute; record per-file names, sizes, hashes, original locators, creator/owner evidence, rights, and visual-review requirements. | A standalone Clinical Images evidence package and source-specific governance envelope are present or the family remains `SOURCE_SPECIFIC_ARTIFACT_REQUIRED` and blocked. |

### Phase 3 — Cross-source evidence verification

After source-specific collection, the governance custodian compares each evidence package against the Master Source Registry and the immutable recovery records. The comparison checks that every retained representation has a unique evidence identity, that duplicate and derivative relationships are explicit, that hashes are reproducible, that source-versioned locators are present where available, and that no OSCE asset has been silently assigned to the Clinical Images family.

The cross-source pass also confirms that rights evidence is source-specific, that professional-track labels are supported by explicit source/level evidence rather than filenames, and that medical-review requests identify the exact representation and clinical scope. Any inconsistency remains `OPEN` or `UNRESOLVED`; it is not repaired by rewriting source content.

### Phase 4 — Governance decision preparation

Once evidence collection is complete for a source, prepare—not execute—the relevant governance decision package. The package must include identity evidence, rights evidence, provenance evidence, medical-review assignment and decision record, professional-track rationale, completeness/locator evidence, unresolved conflicts, and an append-only audit trail. This phase does not itself approve, activate, normalize, import, or publish content.

## 5. Evidence requirements by source family

| Source | Identity evidence required | Rights/provenance evidence required | Medical review requirement |
|---|---|---|---|
| Drug HTML | Canonical title, publisher/owner, author or organization, version/edition, date, original locator, and exact link to the local HTML. | Ownership and license evidence; educational-use, display, redistribution, attribution, and publication restrictions; original-to-extraction-to-recovery-to-registry chain; immutable hash and extraction date. | Qualified Emergency Medicine medication/pharmacology reviewer for doses, contraindications, interactions, medication completeness, and conflicts in the exact artifact. |
| OSCE Atlas | Authoritative title, publisher/owner, author/organization, edition/version, date, original source, station locators, and exact relationship to the recovered package. | Separate station-text and image-level ownership/license evidence; educational/display/redistribution/attribution/publication terms; per-image hash, source locator, image-to-source lineage, extraction event, and recovery date. | Emergency Medicine/OSCE clinical reviewer for stations and procedures, plus visual interpretation and accessibility/alt-text review for each image set. |
| PreTest | Authoritative title, owner/publisher, author/organization, edition/version, date, original locator, and restoration target for `pretestnew.pdf` or an independently verifiable equivalent. | Rights evidence for the authoritative and recovered representations; educational-use and publication restrictions; immutable comparison record; separate lineage for recovered text and all-chapters artifact. | Qualified Emergency Medicine/assessment reviewer after authoritative comparison, covering questions, answers, explanations, OCR discrepancies, completeness, and conflicts. |
| HIPPO High Yield | Canonical title, owner/publisher, author/organization, edition/version, date, original locator, and representation-level identity for text/PDF/DOCX. | Representation-specific ownership/license and use restrictions; original extraction event; recovery dates; SHA-256; explicit relationships among retained representations without merging. | Emergency Medicine educational reviewer for exact retained representations, clinical conflicts, scope, and advanced/resident-level claims. |
| HIPPO QBank | Canonical QBank title, owner/publisher, author/organization, edition/version, date, original locator, official numbering, completeness evidence, and question locators. | Source-specific rights for questions, answers, explanations, display, redistribution, and publication; original source and extraction event; checksum and reproducible lineage. | Emergency Medicine/QBank reviewer for question, answer, explanation, completeness, conflicts, and assessment-level safety. |
| FRCEM | Canonical authority, official title, publisher/owner, author/organization, edition/version, date, original locators, and representation-level identity for study-book and Q&A. | Rights evidence for each text/PDF/DOCX representation; duplicate and derivative lineage; extraction/recovery dates; checksums; display and publication limitations. | Emergency Medicine/examination reviewer with separate scopes for study-book and Q&A representations, including conflicts and level appropriateness. |
| Clinical Images | Canonical image-set title/family, owner/creator/photographer, publisher if applicable, version/date, original locator, and per-file inventory. | Per-file ownership/license or other permitted-use evidence; educational display, attribution, redistribution, and publication terms; per-file SHA-256; original-to-extraction-to-recovery-to-registry lineage. | Appropriate specialty/image reviewer for clinical interpretation, plus visual quality, accessibility, and alt-text review. |

## 6. Professional-track and review controls

Professional-track assignment is a governed classification, not an assumption derived from a filename or package label. Each source must receive explicit evidence for its intended SEG pathway or remain unassigned until review. Candidate signals may guide reviewer selection, but they do not close the track gap.

| Source family | Review track to investigate | Track decision rule |
|---|---|---|
| Drug HTML | Internship Doctor clinical foundation, with possible shared emergency-medicine core. | Confirm from content scope and level evidence; do not infer from the HTML filename. |
| OSCE Atlas | Internship clinical skills and/or Emergency Medicine Resident applied skills. | Separate station complexity and image-use review; no single track is final without evidence. |
| PreTest | Emergency Medicine Resident/examination preparation, subject to source level. | Confirm against authoritative edition and question difficulty; OCR artifacts cannot determine level. |
| HIPPO High Yield | Emergency Medicine Resident/advanced study. | Keep provisional until explicit content-level evidence and medical review are complete. |
| HIPPO QBank | Emergency Medicine Resident/advanced exam preparation. | Require authoritative QBank scope, completeness, and reviewer decision before assigning a track. |
| FRCEM | Emergency Medicine Resident and board-preparation sub-track; possible Shared Core subsets require explicit review. | Review study-book and Q&A representations separately and preserve unresolved level conflicts. |
| Clinical Images | Unassigned until source and image-level review are available. | Do not infer a track and do not borrow the OSCE track. |

## 7. Normalization gate

No source may enter normalization review until all of the following conditions are satisfied for that source family and the exact retained representation:

| Gate criterion | Required evidence |
|---|---|
| Identity | Canonical title, owner/publisher, author/organization where available, edition/version, date, original locator, and representation-level identity are attributable and internally consistent. |
| Rights | Ownership and license or other permitted-use evidence is recorded with educational-use, display, attribution, redistribution, and publication limitations. Unknown or merely assumed rights do not pass the gate. |
| Provenance | The chain `Original Source → Extraction Event → Recovery Artifact → SEG Registry` is documented, hash-verifiable, date-stamped, and representation-specific. |
| Medical review | Qualified reviewer role, exact review scope, conflicts, review result, and required approval evidence are documented; absence of review is not a pass. |
| Professional track | Pathway and level are supported by explicit evidence and do not mix Internship, Resident, Shared Core, or Advanced content without a governed decision. |
| Completeness and locators | Completeness is supported where relevant, and source-versioned chapter, station, question, page, or image locators are recorded. |
| Audit | Evidence collection, review, unresolved issue, and decision events are append-only and attributable. |
| Governance approval | The applicable SEG governance owner explicitly approves the source for normalization review. This plan does not grant that approval. |

Until all criteria pass, the source remains `BLOCKED_PENDING_EVIDENCE` and `INTERNAL_REFERENCE_ONLY` / `WAITING_FOR_EVIDENCE`.

## 8. Database integration gate

Database integration is a separate downstream gate and must not be conflated with recovery or normalization. Even after a source passes the normalization gate, no database integration is allowed until the following design and authorization conditions are separately satisfied:

| Integration criterion | Required condition |
|---|---|
| Content contract | The normalized package is reviewed against the canonical `SEG_CONTENT_RECORD_V1_1` contract without changing that contract in this plan. |
| Source governance envelope | Source identity, artifacts, hashes, rights, provenance, review state, track, and audit evidence are complete and linked by an approved integration design. |
| Mapping authorization | Any future source-to-content mapping is explicitly designed, reviewed, and authorized; this plan creates no mappings. |
| Database design approval | The existing SEG database foundation and compatibility decisions are formally approved for implementation; this plan creates no Prisma models, migrations, or database objects. |
| Security approval | RLS, roles, grants, audit boundaries, and service-role behavior are reviewed and approved for the target architecture; this plan does not modify security. |
| Adapter/import QA | A separately authorized dry run proves idempotency, reversibility, lineage preservation, and rejection of incomplete evidence; no import is performed here. |
| Release approval | Controlled release, rollback, activation, and learner-exposure decisions are separately approved; none is granted by this plan. |

The database integration gate is therefore **not started** for any source. Recovery evidence must remain outside production content storage until all applicable gates pass.

## 9. Prohibited actions during recovery

The following actions are outside this plan and remain prohibited: discarding or retiring a required source; replacing or silently substituting a source; deleting, renaming, merging, or rewriting artifacts; correcting OCR or medical content; creating Prisma or Zod definitions; changing schemas; creating mappings; executing SQL; changing Supabase or any database; importing or seeding content; activating or publishing content; exposing content to learners; and performing Git operations.

Recovery personnel may copy evidence into a controlled evidence package only when the copy itself is documented and hash-verified. A copied evidence item is not a production record and does not become eligible for learner use by virtue of being cataloged.

## 10. Completion criteria and current decision

The full recovery program is complete only when each of the seven required source families has either a complete, attributable evidence package or an explicit unresolved-evidence record that identifies the missing item, owner, dependency, and next evidence action. Completion of this plan does not imply that every source is ready for normalization; readiness remains source-specific and approval-dependent.

**Current decision:** Proceed with controlled recovery and evidence closure for all seven source families. Keep every source required, preserved, and blocked from normalization and database integration until the applicable gates pass. Do not discard or replace any source.

**Final status:** `FULL_CONTENT_RECOVERY_PLAN_COMPLETE`

## References

[1]: /home/ubuntu/seg-internship-output/SEG_MASTER_SOURCE_REGISTRY_STATUS.md "SEG Master Source Registry Status"

---

**Document control:** Prepared by **Manus AI**. Controlled execution planning only. This document defines an evidence-recovery workflow and does not modify sources, schemas, databases, mappings, content, rights, medical approvals, activation state, or production systems.
