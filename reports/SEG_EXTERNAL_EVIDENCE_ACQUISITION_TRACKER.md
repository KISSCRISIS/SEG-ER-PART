# SEG External Evidence Acquisition Tracker

**Mode:** `CONTROLLED GOVERNANCE EXECUTION`  
**Prepared by:** **Manus AI**  
**Tracker status:** `SEG_EXTERNAL_EVIDENCE_ACQUISITION_TRACKER_COMPLETE`  
**Scope:** Eight SEG content-source tracks plus the separate JEM Nexus Calculator tool track

## 1. Control Boundary

This tracker is an evidence-acquisition worklist only. It records the current evidence state, missing evidence, responsible reviewer roles, and closure conditions. It does not approve a source, close an evidence gate, grant rights, validate medical content, create a source or content record, or authorize normalization, import, activation, publication, or learner exposure.[1] [2]

The eight content sources remain separate from the JEM Nexus Calculator tool track. JEM Nexus is not added to the Master Source Registry by this tracker. No source identity, owner, rights status, review status, or approval may be inferred from a file name, checksum, structural count, recovery status, or reviewer-role requirement.[1] [2]

### Status vocabulary note

The evidence and review fields in this tracker use only the permitted states:

```text
CONFIRMED
PARTIALLY_CONFIRMED
NOT_AVAILABLE
PENDING_REVIEW
```

`PENDING_REVIEW` means that the required role-based review has not produced a completed decision; it is not an approval. The `Current gate` field retains the official SEG governance-gate vocabulary (`BLOCKED_PENDING_EVIDENCE` or `BLOCKED_PENDING_REVIEW`) because that field describes the downstream control boundary rather than an evidence-field state.[1] [2]

## 2. Official Governance Check

| Control | Current state |
|---|---|
| Documentation governance | `SEG_GOVERNANCE_DOCUMENTATION_REVISION_COMPLETE` |
| Approved sources | `APPROVED_SOURCES = NONE` |
| Normalization | `BLOCKED_PENDING_APPROVED_SOURCE` |
| Source-level promotion | Blocked until each source independently satisfies its evidence and review gates |
| Registry mutation | Not performed by this tracker |
| Production integration | Not authorized |

The tracker is consistent with the official state: no listed source is approved for normalization, and no source-level evidence gate is closed by the existence of this document.[1] [2] [3]

## 3. Content Source Track Register

### 3.1 Drug HTML

| Field | Current state |
|---|---|
| Source identity evidence status | `PARTIALLY_CONFIRMED` — local artifact and title/structure signals are recorded; canonical identity is not closed |
| Original publisher/owner status | `NOT_AVAILABLE` |
| Version/edition status | `NOT_AVAILABLE` |
| Provenance status | `PARTIALLY_CONFIRMED` — local artifact continuity is recorded; original-source and extraction relationship remain incomplete |
| Rights/license status | `NOT_AVAILABLE` |
| Medical review status | `PENDING_REVIEW` |
| Technical review status | `NOT_AVAILABLE` for the current retained static HTML source-level gate; future rendering or integration requires separate technical review |
| Visual/accessibility review status | `NOT_AVAILABLE` for the current retained representation; future learner-facing visual use would require separate review |
| Current gate | `BLOCKED_PENDING_EVIDENCE` |
| Missing evidence | Canonical title, exact publisher/owner, author or responsible organization, version/date, original locator, source-to-artifact relationship, rights and redistribution terms, extraction/provenance chain, exact-artifact Emergency Medicine medication/pharmacology review, dose/interaction/contraindication conflict disposition, and audit evidence |
| Required next action | Obtain attributable identity, rights, and provenance evidence; prepare exact-artifact Emergency Medicine medication/pharmacology review; preserve the HTML unchanged and do not normalize, map, import, or publish |

### 3.2 OSCE Atlas Package

| Field | Current state |
|---|---|
| Source identity evidence status | `PARTIALLY_CONFIRMED` — recovered container, inner package, text, and 14 PNG members are recorded; the authoritative original is not established |
| Original publisher/owner status | `NOT_AVAILABLE` |
| Version/edition status | `NOT_AVAILABLE` |
| Provenance status | `PARTIALLY_CONFIRMED` — recovery artifacts are recorded; original PDF, image-to-source relationship, and complete chain remain open |
| Rights/license status | `NOT_AVAILABLE` |
| Medical review status | `PENDING_REVIEW` |
| Technical review status | `PENDING_REVIEW` for package integrity and completeness closure |
| Visual/accessibility review status | `PENDING_REVIEW` |
| Current gate | `BLOCKED_PENDING_EVIDENCE` |
| Missing evidence | Authoritative atlas title/owner/version/date/original locator, text rights, per-image ownership and rights, image-to-source lineage, source-versioned locators, OSCE clinical review, visual-quality review, accessibility review, and completeness evidence |
| Required next action | Obtain the authoritative atlas or independently verifiable owner statement; collect text and image-rights evidence; reconcile all 14 PNGs to source locators; queue Emergency Medicine/OSCE, visual, accessibility, provenance, rights, and technical review; do not create Atlas records, content links, N:M links, or learner exposure |

### 3.3 PreTest Question Package

| Field | Current state |
|---|---|
| Source identity evidence status | `PARTIALLY_CONFIRMED` — a PreTest study-guide signal and recovered representation are recorded; authoritative identity is not closed |
| Original publisher/owner status | `NOT_AVAILABLE` |
| Version/edition status | `NOT_AVAILABLE` |
| Provenance status | `PARTIALLY_CONFIRMED` — recovered representation and hash continuity are recorded; authoritative PDF comparison and separate-lineage decision remain open |
| Rights/license status | `NOT_AVAILABLE` |
| Medical review status | `PENDING_REVIEW` |
| Technical review status | `PENDING_REVIEW` for OCR and representation-integrity comparison |
| Visual/accessibility review status | `NOT_AVAILABLE` for the current retained text representation |
| Current gate | `BLOCKED_PENDING_EVIDENCE` |
| Missing evidence | Authoritative `pretestnew.pdf` or independently verifiable equivalent, owner/author/version/date, original and source-versioned locators, rights, OCR-to-source comparison, authoritative provenance, completeness and numbering, assessment review, and ambiguity/conflict disposition |
| Required next action | Recover or obtain the authoritative PDF or equivalent; perform an immutable read-only comparison without correcting the recovered text; collect rights and provenance evidence; prepare Emergency Medicine/PreTest assessment review; keep the separate all-chapters artifact separate |

### 3.4 HIPPO High Yield

| Field | Current state |
|---|---|
| Source identity evidence status | `PARTIALLY_CONFIRMED` — text, colored PDF, and DOCX representations are checksum-verifiable; canonical identity is not confirmed |
| Original publisher/owner status | `NOT_AVAILABLE` |
| Version/edition status | `NOT_AVAILABLE` |
| Provenance status | `PARTIALLY_CONFIRMED` — retained representations and relationships are recorded; authoritative source and extraction event are not closed |
| Rights/license status | `NOT_AVAILABLE` |
| Medical review status | `PENDING_REVIEW` |
| Technical review status | `PENDING_REVIEW` for representation fidelity and exact retained representation |
| Visual/accessibility review status | `NOT_AVAILABLE` for the current evidence-only stage; any retained visuals would require separate review before permitted use |
| Current gate | `BLOCKED_PENDING_EVIDENCE` |
| Missing evidence | Canonical title, owner, author/organization, edition/version/date, original locator, representation-specific rights, original-to-extraction provenance, locators, professional-track evidence, exact-representation clinical review, completeness, and conflict disposition |
| Required next action | Obtain identity/version and representation-specific rights/provenance evidence; preserve text, PDF, and DOCX separately; obtain explicit track evidence; queue exact-representation Emergency Medicine/critical-care review; keep all representations internal and unnormalized |

### 3.5 HIPPO QBank

| Field | Current state |
|---|---|
| Source identity evidence status | `PARTIALLY_CONFIRMED` — the registered QBank text and structural observations are recorded; official identity and completeness are not confirmed |
| Original publisher/owner status | `NOT_AVAILABLE` |
| Version/edition status | `NOT_AVAILABLE` |
| Provenance status | `PARTIALLY_CONFIRMED` — registered path and checksum exist; original QBank, extraction event, and source-version locators remain open |
| Rights/license status | `NOT_AVAILABLE` |
| Medical review status | `PENDING_REVIEW` |
| Technical review status | `PENDING_REVIEW` for completeness, numbering, and representation integrity |
| Visual/accessibility review status | `NOT_AVAILABLE` for the current retained text representation |
| Current gate | `BLOCKED_PENDING_EVIDENCE` |
| Missing evidence | Official title/owner/author/version/date, authoritative release and completeness, rights, stable question locators, provenance, professional-track evidence, question-level clinical review, and ambiguity/conflict disposition |
| Required next action | Obtain official release, completeness, rights, and locator evidence; preserve observed structural counts as evidence only; assign question-level Emergency Medicine/QBank and track review; do not normalize, map, import, or expose questions |

### 3.6 FRCEM Representations

| Field | Current state |
|---|---|
| Source identity evidence status | `PARTIALLY_CONFIRMED` — five representations and their relationships are recorded; canonical authority and edition are not confirmed |
| Original publisher/owner status | `NOT_AVAILABLE` |
| Version/edition status | `NOT_AVAILABLE` |
| Provenance status | `PARTIALLY_CONFIRMED` — paths, hashes, duplicate relationship, and representation relationships are recorded; authoritative source and extraction event remain open |
| Rights/license status | `NOT_AVAILABLE` |
| Medical review status | `PENDING_REVIEW` |
| Technical review status | `PENDING_REVIEW` for representation identity and fidelity |
| Visual/accessibility review status | `NOT_AVAILABLE` for the current evidence-only stage; retained PDF visuals require separate review if later considered for use |
| Current gate | `BLOCKED_PENDING_EVIDENCE` |
| Missing evidence | Canonical authority, publisher/owner, author, official edition/version/date, representation-specific locators, rights for text/PDF/DOCX, original-to-extraction provenance, separate study-book and Q&A clinical review, professional-track decision, completeness, and conflict disposition |
| Required next action | Obtain canonical authority/version, rights, locators, and provenance; preserve duplicate and representations as separate traceable items; separate study-book and Q&A review queues; obtain explicit track evidence; do not merge into a normalized source or import |

### 3.7 Clinical Images

| Field | Current state |
|---|---|
| Source identity evidence status | `NOT_AVAILABLE` — no standalone Clinical Images source package or authoritative locator is available |
| Original publisher/owner status | `NOT_AVAILABLE` |
| Version/edition status | `NOT_AVAILABLE` |
| Provenance status | `NOT_AVAILABLE` — original source, extraction event, recovery artifact, per-file lineage, and registry relationship are not established |
| Rights/license status | `NOT_AVAILABLE` |
| Medical review status | `PENDING_REVIEW` |
| Technical review status | `PENDING_REVIEW` for source-specific asset inventory and per-file integrity |
| Visual/accessibility review status | `PENDING_REVIEW` |
| Current gate | `BLOCKED_PENDING_EVIDENCE` |
| Missing evidence | Standalone source package or authoritative locator, per-file inventory and SHA-256 manifest, owner/creator, version/date, rights, original-to-extraction provenance, image-interpretation review, visual-quality review, accessibility/alt-text review, completeness, and track evidence |
| Required next action | Recover or independently locate a source-specific Clinical Images package; create an evidence-only per-file inventory with hashes and locators; collect owner and rights evidence; queue specialty, visual, accessibility, provenance, rights, and technical review; do not substitute OSCE PNGs |

### 3.8 Hamilton Ventilator Clinical Engineering Guide

| Field | Current state |
|---|---|
| Source identity evidence status | `PARTIALLY_CONFIRMED` — ZIP and embedded PDF identity/integrity are recorded; authority, currency, ownership, and exact guide identity remain incomplete |
| Original publisher/owner status | `NOT_AVAILABLE` |
| Version/edition status | `PARTIALLY_CONFIRMED` for observed device/model signals only; authoritative guide version, date, software/configuration relationship, and current manual status remain open |
| Provenance status | `PARTIALLY_CONFIRMED` — local custody and retained artifact hashes are recorded; translation/rewrite event and complete original-to-registry chain are not closed |
| Rights/license status | `NOT_AVAILABLE` |
| Medical review status | `PENDING_REVIEW` |
| Technical review status | `PENDING_REVIEW` |
| Visual/accessibility review status | `PENDING_REVIEW` for retained PDF visuals if they are later considered for governed use |
| Current gate | `BLOCKED_PENDING_EVIDENCE` |
| Missing evidence | Original locator, owner/publisher, edition/version/date, device model/configuration, applicable software/manual version, source-to-translation/rewrite provenance, rights for PDF/text/translation/visuals/code/dependencies, Emergency Medicine/ICU and ventilation review, biomedical/device technical review, currency verification, track/taxonomy decision, and audit closure |
| Required next action | Request the current HAMILTON-G5/HAMILTON-S1 operator-manual relationship, exact configuration/software evidence, owner-issued rights packet, transformation provenance, and role-based medical/device technical review; preserve the candidate internally and blocked |

## 4. Separate Tool Track: JEM Nexus Calculator

JEM Nexus is tracked separately from the eight content sources. This row does not add JEM to the Master Source Registry and does not authorize execution, API calls, integration, or calculator use.[1] [2]

| Field | Current state |
|---|---|
| Source identity evidence status | `PARTIALLY_CONFIRMED` — static artifact identity and inventory are recorded; original developer/owner and owner-controlled release are not established |
| Original publisher/owner status | `NOT_AVAILABLE` |
| Version/edition status | `NOT_AVAILABLE` — immutable release/version/commit and release date remain open |
| Provenance status | `PARTIALLY_CONFIRMED` — supplied static artifact and inventory are recorded; repository/release relationship and tool lineage remain open |
| Rights/license status | `NOT_AVAILABLE` |
| Medical review status | `PENDING_REVIEW` |
| Technical review status | `PENDING_REVIEW` — software, reproducibility, dependencies, validation, and security review are not complete |
| Visual/accessibility review status | `NOT_AVAILABLE` for the current static evidence-only tool review |
| Current gate | `BLOCKED_PENDING_EVIDENCE` |
| Missing evidence | Developer/owner, repository or release locator, immutable version/commit, documentation, formula-by-function validation, clinical references, units/rounding/thresholds/warnings/dose presets, intended scope and users, code/clinical-content rights, dependency licenses, authentication/authorization, request validation, privacy/PHI/retention, external AI data flow, reproducible tests, audit/persistence/isolation, security findings, and track decision |
| Required next action | Assemble the external-evidence packet; queue Medical Reviewer, Rights Reviewer, Provenance Reviewer, Technical Reviewer, Security Reviewer, and track/taxonomy review; do not execute the application or calculators, call APIs, integrate, map, normalize, import, or expose the tool |

## 5. Evidence Collection Queue

The queue is organized by evidence packet rather than by assumed individuals. `Responsible reviewer role` identifies the accountable role only; it is not a named assignment or approval.

| Source | Evidence needed | Responsible reviewer role | Closure condition |
|---|---|---|---|
| Drug HTML | Attributable identity/version/locator; owner and rights terms; original-to-extraction-to-artifact provenance; exact HTML medication/pharmacology review; conflict and audit record | SEG Evidence Owner; External Source Owner/Publisher; Rights Reviewer; Provenance Reviewer; Medical Reviewer; Technical Reviewer as representation reviewer | Identity, rights, provenance, exact-artifact clinical review, conflict disposition, and audit evidence are independently documented and accepted; then reconsider the source gate |
| OSCE Atlas | Authority/original package; text and per-image rights; 14-image source locators; completeness; OSCE clinical review; visual and accessibility review | SEG Evidence Owner; External Source Owner/Publisher; Rights Reviewer; Provenance Reviewer; Medical Reviewer; Visual Quality Reviewer; Accessibility Reviewer; Technical Reviewer | Text and every retained PNG are attributable, rights-cleared, traceable, clinically reviewed, visually/accessibly reviewed, and completeness/conflicts are recorded |
| PreTest | Authoritative PDF/equivalent; identity/version/locators; immutable OCR comparison; rights; provenance; completeness; assessment review | SEG Evidence Owner; External Source Owner/Publisher; Rights Reviewer; Provenance Reviewer; Medical Reviewer; Technical Reviewer | Authoritative representation is preserved, OCR differences are documented without correction, rights/provenance are closed, completeness is evidenced, and qualified assessment review is recorded |
| HIPPO HY | Canonical identity/version; representation-specific rights; provenance; exact-representation locators; track evidence; clinical and conflict review | SEG Evidence Owner; External Source Owner/Publisher; Rights Reviewer; Provenance Reviewer; Medical Reviewer; Technical Reviewer; Track/Taxonomy Reviewer | All retained representations are tied to an evidenced source/version or explicitly separated, rights/provenance are closed, track is explicit, and exact-representation review is complete |
| HIPPO QBank | Official release identity/version; completeness and numbering; rights; stable question locators; provenance; track evidence; question-level review | SEG Evidence Owner; External Source Owner/Publisher; Rights Reviewer; Provenance Reviewer; Medical Reviewer; Technical Reviewer; Track/Taxonomy Reviewer | Official release and completeness are evidenced, each review unit has a stable locator, rights/provenance and track are closed, and clinical conflicts are dispositioned |
| FRCEM | Canonical authority/version; rights; representation-level locators; provenance; separate study-book/Q&A review; track decision | SEG Evidence Owner; External Source Owner/Publisher; Rights Reviewer; Provenance Reviewer; Medical Reviewer; Technical Reviewer; Track/Taxonomy Reviewer | Each representation has an evidenced role and locator, rights/provenance are closed, study-book and Q&A reviews are separate, and track/conflict decisions are recorded |
| Clinical Images | Standalone source package; per-file inventory and SHA-256; creator/owner; rights; locators; provenance; image-interpretation, visual, accessibility, and completeness review | SEG Evidence Owner; External Source Owner/Publisher; Rights Reviewer; Provenance Reviewer; Medical Reviewer; Visual Quality Reviewer; Accessibility Reviewer; Technical Reviewer | A standalone source family is established, every image has identity/hash/locator, rights/provenance are closed, applicable reviews are complete, and OSCE assets are not substituted |
| Hamilton Ventilator Guide | Owner-issued identity/version/date/locator; device/model/configuration/software evidence; rights for PDF/text/translation/visuals/code; transformation provenance; Emergency Medicine/ICU/ventilation review; biomedical/device technical review | SEG Evidence Owner; Hamilton or attributable Source Owner/Publisher; Rights Reviewer; Provenance Reviewer; Medical Reviewer; Technical Reviewer; Visual Quality Reviewer; Accessibility Reviewer; Track/Taxonomy Reviewer | Authority, currency/configuration, rights, transformation provenance, exact-guide medical review, device-qualified technical review, visual/accessibility findings, track, and audit decision are complete |
| JEM Nexus Calculator — separate tool track | Developer/repository/release identity; immutable version; documentation; formula/reference validation; rights/dependencies; privacy/AI data flow; reproducible tests; software/security review; intended users/track | SEG Evidence Owner; Tool Developer/Owner; Rights Reviewer; Provenance Reviewer; Medical Reviewer; Technical Reviewer; Security Reviewer; Track/Taxonomy Reviewer | Tool identity, rights, provenance, clinical formula/reference validation, medical review, software/security review, privacy/data-flow evidence, reproducible testing, isolation/audit, and separate tool-governance decision are complete |

## 6. Queue Operating Rules

Evidence collection must preserve the exact retained representation and its custody. A checksum, inventory, structural count, recovered artifact, or role requirement may support artifact continuity but cannot replace identity, rights, provenance, medical review, technical review, or approval evidence.[1] [2]

All reviewer activity must remain attributable to a qualified role and must record scope, date, conflicts, disposition, and the exact representation reviewed. No individual names are assigned by this tracker. Any rights statement must apply to the exact artifact and intended SEG use; absence of rights evidence must not be interpreted as permission or automatic replacement.

The eight content tracks must remain separated by source family and professional-track evidence. JEM Nexus must remain outside the eight-source registry count and outside content normalization unless a separate explicit tool-governance decision is later recorded.[1]

## 7. Non-Actions and Current Gate

This tracker performs no approval, evidence-gate closure, normalization, content-record creation, Zod or Prisma work, SQL, migration, import, activation, publication, learner exposure, database modification, application modification, Source Registry modification, or Git operation. It does not change any existing evidence state or disposition.

```text
APPROVED_SOURCES = NONE
NORMALIZATION = BLOCKED_PENDING_APPROVED_SOURCE
SOURCE_LEVEL_EVIDENCE_GATES = OPEN_UNLESS_INDIVIDUALLY_APPROVED
SEG_EXTERNAL_EVIDENCE_ACQUISITION_TRACKER_COMPLETE
```

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_TARGETED_EVIDENCE_CLOSURE_PLAN.md "SEG Targeted Evidence Closure Plan"
[2]: file:///home/ubuntu/seg-internship-output/SEG_MASTER_SOURCE_REGISTRY_STATUS.md "SEG Master Source Registry Status"
[3]: file:///home/ubuntu/seg-internship-output/SEG_EXTERNAL_EVIDENCE_ACQUISITION_FILE_REVIEW_REPORT.md "SEG External Evidence Acquisition File Review Report"

---

**SEG_EXTERNAL_EVIDENCE_ACQUISITION_TRACKER_COMPLETE**
