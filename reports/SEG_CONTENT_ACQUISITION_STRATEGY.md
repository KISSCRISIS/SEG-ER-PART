# SEG Content Acquisition Strategy

**Mode:** `CONTROLLED DECISION REVIEW`  
**Decision basis:** `SEG_MASTER_SOURCE_REGISTRY_STATUS.md`  
**Scope:** Drug HTML, OSCE Atlas, PreTest, HIPPO High Yield, HIPPO QBank, FRCEM, and Clinical Images  
**Final status:** `CONTENT_ACQUISITION_STRATEGY_COMPLETE`

## 1. Executive decision

This document converts the current Master Source Registry evidence state into a controlled acquisition strategy. It is a disposition recommendation, not an authorization to replace, download, normalize, map, import, activate, publish, or expose content to learners. Every source remains governed by its current `BLOCKED_PENDING_EVIDENCE` gate until the required identity, rights, medical-review, and provenance evidence is completed.[1]

The recommended portfolio is to **recover six source families** whose artifacts or representations already provide recoverable educational value and traceable evidence leads, while **replace Clinical Images through a separately rights-cleared acquisition path** because no standalone image source package or inventory is currently evidenced. The Clinical Images replacement decision is strategic and conditional; it does not authorize substituting OSCE images, deleting any prior evidence, or importing a new source.[1]

No source is recommended for `RETIRE` at this stage. `INTERNAL_ONLY` remains the operational restriction for every source until the applicable governance gate is closed. The strategy labels below describe the preferred acquisition path, not the permitted learner-facing state.

> **Portfolio rule:** Recover where a retained artifact has material educational value and a plausible evidence-closure path. Replace only where the source family lacks a separately recoverable, rights-clear, and traceable package. Keep all retained evidence unchanged and segregated until governance approval.

## 2. Decision vocabulary

| Strategy | Meaning for this controlled review |
|---|---|
| `RECOVER` | Pursue authoritative source recovery, identity confirmation, rights evidence, provenance closure, and required review for an existing evidence-bearing artifact or representation. It does not authorize content correction or normalization. |
| `REPLACE` | Pursue a separately acquired, rights-clear, traceable source because the current family lacks a sufficient recovery basis. It is a conditional acquisition recommendation, not an automatic substitution or deletion decision. |
| `INTERNAL_ONLY` | Retain and inspect the existing evidence only; do not pursue downstream content use until a later decision changes the status. This may coexist with `RECOVER` or `REPLACE` as the current operational restriction. |
| `RETIRE` | Stop pursuing the source family and retain only the required audit evidence. No source is assigned this strategy in the present review because educational value and/or a recoverable path remain plausible, or the absence of evidence is not sufficient to justify retirement. |

## 3. Portfolio decision matrix

| Source | Recommended strategy | Educational value | Evidence availability | Rights feasibility | Medical-review effort | SEG roadmap priority | Current operational state |
|---|---|---|---|---|---|---|---|
| **Drug HTML Artifact** | `RECOVER` | High. It is a candidate source for drug-essentials and emergency medication learning, subject to exact-artifact clinical review. | `PARTIALLY_CONFIRMED`: local HTML SHA-256 is recorded as `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac`; source identity and exact origin remain unproven. | Low-to-uncertain until an owner, publisher, or authorized custodian supplies source-specific permission and restrictions. | High and representation-specific because doses, contraindications, interactions, and completeness claims require qualified medication/pharmacology review. | High for the Internship Doctor clinical foundation, but roadmap value does not override evidence gates. | `INTERNAL_ONLY` and `WAITING_FOR_EVIDENCE`; governance gate remains `BLOCKED_PENDING_EVIDENCE`.[1] |
| **OSCE Atlas Package** | `RECOVER` | High. The package can support procedural and examination-oriented visual learning if the source and image rights are established. | `PARTIALLY_CONFIRMED`: a recovery container, OSCE text, validation notes, and 14 PNG members are evidenced; the named original PDF and owner are not established. | Low-to-uncertain because rights must be established separately for station text and every image or image group. | Very high. It requires Emergency Medicine/OSCE review plus visual interpretation, accessibility, and representation review. | High as an applied clinical-skills resource, but below foundational sources until source and rights evidence are closed. | `INTERNAL_ONLY` and `WAITING_FOR_EVIDENCE`; OSCE PNGs must not be reclassified as Clinical Images.[1] |
| **PreTest Question Package** | `RECOVER` | High. Question-based learning is relevant to structured emergency-medicine study and assessment preparation, subject to authoritative-source comparison. | `PARTIALLY_CONFIRMED`: recovered inner text SHA-256 `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166` matches the prior `UPD811-007` representation, but the authoritative `pretestnew.pdf` is absent and OCR corruption remains. | Low-to-uncertain until source-specific permission and publication restrictions are documented for the recovered representation and the separate all-chapters artifact. | High. Authoritative-source restoration must precede clinical review so OCR discrepancies are not mistaken for medical content. | High for exam-oriented learning, but downstream use is blocked by restoration and evidence closure. | `INTERNAL_ONLY` and `WAITING_FOR_EVIDENCE`; no correction or normalization of the recovered text is permitted.[1] |
| **HIPPO High Yield** | `RECOVER` | High. The registered study material has potential value for advanced emergency-medicine learning and structured review. | `PARTIALLY_CONFIRMED`: text `UPD811-005`, colored PDF `UPD811-010`, and editable DOCX `UPD811-012` are available and checksum-verifiable; catalog-like signals are not canonical proof. | Low-to-uncertain until HIPPO owner/source evidence and usage restrictions are obtained for each retained representation. | High. Review must cover the exact retained representation, conflicts, clinical scope, and any advanced-level claims. | High for the resident/advanced roadmap, with the final professional track still requiring explicit evidence. | `INTERNAL_ONLY` and `WAITING_FOR_EVIDENCE`; retain text, PDF, and DOCX as separate representations.[1] |
| **HIPPO QBank** | `RECOVER` | High. The registered question-bank artifact may support examination preparation and active recall after completeness and clinical review are proven. | `PARTIALLY_CONFIRMED`: `UPD811-002` and structural counts are evidenced, but counts do not prove canonical identity, completeness, official numbering, or source locators. | Low-to-uncertain until source-specific licensing, display, educational-use, redistribution, and publication terms are documented. | Very high. Questions, answers, explanations, and conflicts require qualified Emergency Medicine/QBank review. | High for resident/advanced exam preparation, but only after identity, completeness, and review closure. | `INTERNAL_ONLY` and `WAITING_FOR_EVIDENCE`; structural counts must not become question records or mappings.[1] |
| **FRCEM Representations** | `RECOVER` | High. FRCEM study and Q&A representations are aligned with a high-priority examination-oriented roadmap need. | `PARTIALLY_CONFIRMED`: study-book, Q&A, PDF, DOCX, and duplicate representations are available and checksum-verifiable; duplicate and representation relationships are preserved as evidence. | Low-to-uncertain until official authority, rights, and restrictions are established for each relevant representation. | Very high. Study-book and Q&A materials require separate Emergency Medicine/examination review, conflict handling, and track review. | Very high for the Emergency Medicine Resident/board-preparation roadmap. | `INTERNAL_ONLY` and `WAITING_FOR_EVIDENCE`; do not merge, delete, or silently substitute the duplicate or any representation.[1] |
| **Clinical Images** | `REPLACE` | Potentially high for visual diagnosis and image-based learning, but the current family has no usable evidence package. | `NOT_AVAILABLE`: no standalone artifact, source inventory, per-file hashes, source archive, or closed registry entry is evidenced; OSCE PNGs are not substitutes. | Currently infeasible for the existing family. A replacement must be obtained with explicit ownership, educational-use, display, attribution, and publication evidence. | High. Any replacement package requires specialty interpretation review and visual/accessibility/alt-text review. | Medium-to-high as a visual learning capability, but not a blocker for evidence closure of the other source families. | `INTERNAL_ONLY` as an evidence-gap state; pursue only a separately approved, rights-clear replacement acquisition. No replacement has been imported or activated.[1] |

## 4. Source-by-source acquisition decisions

### 4.1 Drug HTML Artifact — RECOVER

Recovery is preferred because the local artifact has a stable fingerprint and an observable medication-oriented structure. The next acquisition objective is not to rewrite the HTML; it is to obtain an attributable statement or primary-source evidence that identifies the exact artifact, its owner, its version/date context, and its permitted use. A qualified medication/pharmacology reviewer must then be assigned to the exact retained representation, with doses, contraindications, interactions, and unresolved conflicts explicitly reviewed.

If no owner or authorized custodian can establish the source relationship or rights terms after a documented evidence search, a separate future decision may consider a rights-clear replacement. That contingency does not change the present recommendation: recover first, preserve the local artifact unchanged, and keep it internal-only.

### 4.2 OSCE Atlas Package — RECOVER

Recovery is preferred because the evidence package contains a recovered text artifact, validation notes, and 14 image members. The recovery path must establish the authoritative original or an attributable owner statement, and must treat the station text and image members as separately reviewable evidence. Rights must be collected at the appropriate granularity, and the image-to-source relationship must be documented before any future Atlas consideration.

The OSCE package must remain distinct from Clinical Images. No image substitution, Atlas record, content link, learner-facing display, or activation is allowed under this strategy. If authoritative source and rights evidence cannot be obtained, a later controlled decision may replace the Atlas package with a separately rights-cleared OSCE resource; that contingency is not an authorization to do so now.

### 4.3 PreTest Question Package — RECOVER

Recovery is preferred because the recovered representation is hash-continuous with `UPD811-007`, providing a specific evidence lead. The decisive next step is restoration or acquisition of the authoritative `pretestnew.pdf` or an independently verifiable equivalent. The recovered text and the separate all-chapters artifact must remain separate until an evidence-only comparison and lineage decision are documented.

No OCR correction, content rewriting, normalization, question mapping, or assessment generation is allowed under this strategy. If authoritative restoration fails and rights cannot be proven, a later decision may select a rights-clear alternative question source; the current strategy remains recover-first and internal-only.

### 4.4 HIPPO High Yield — RECOVER

Recovery is preferred because multiple retained representations are available and their relationships can be preserved without deletion or merging. Acquisition should focus on official identity/version evidence, owner and rights evidence, exact representation-level provenance, explicit resident/advanced track evidence, and a role-based Emergency Medicine review.

The strategy does not treat HIPPO, Tintinalli, or Rosen signals as canonical identity. It also does not permit transformation of the text, PDF, or DOCX into governed content until the source envelope and clinical-review evidence are complete.

### 4.5 HIPPO QBank — RECOVER

Recovery is preferred because the QBank artifact and structural evidence provide a plausible source-closure path. The next acquisition must establish authoritative identity, version, completeness, official numbering or locators, owner/rights terms, professional-track evidence, and a qualified review of questions, answers, explanations, and conflicts.

Observed structural counts are evidence about the retained artifact only. They are not a license to create question records, mappings, normalization outputs, or learner-facing assessments.

### 4.6 FRCEM Representations — RECOVER

Recovery is preferred because the source family contains multiple traceable representations, including a study book, Q&A material, PDF, DOCX, and a byte-identical duplicate. The duplicate relationship must be preserved as evidence, while the authoritative edition/version, owner, rights, locators, provenance, and representation-level clinical review are closed separately.

The FRCEM strategy is consistent with the roadmap priority of resident and board preparation, but priority does not waive rights or review. No merge, deletion, replacement, normalization, mapping, or import is authorized by this strategy.

### 4.7 Clinical Images — REPLACE

A controlled replacement strategy is recommended because the current Clinical Images family has no standalone artifact inventory or source-governance envelope from which to recover. The replacement target must be a separately acquired package with identifiable creator/owner, source locators, version or date context where applicable, per-file hashes, explicit educational-use and display rights, attribution terms, and publication restrictions.

The replacement target must also undergo specialty interpretation review and visual/accessibility review before any future promotion. OSCE PNGs must not be used as a proxy for Clinical Images, and the word `REPLACE` does not authorize deleting or renaming the current evidence-gap family.

## 5. Prioritization and sequence

The recommended acquisition sequence follows evidence leverage and roadmap value, not immediate content-production demand:

| Sequence | Source family | Strategy | Rationale for order | Required stop condition |
|---:|---|---|---|---|
| 1 | Drug HTML | `RECOVER` | High Internship Foundation value and a stable local fingerprint; identity and rights evidence are the immediate leverage points. | Stop if exact source ownership or rights cannot be attributed. |
| 2 | PreTest | `RECOVER` | Hash continuity gives a concrete restoration target, but authoritative source comparison is mandatory. | Stop until `pretestnew.pdf` or an independently verifiable equivalent is restored. |
| 3 | OSCE Atlas | `RECOVER` | Recovered text and 14 PNGs provide substantial educational value, but rights and image provenance are granular and effort-intensive. | Stop if original source or per-image rights/provenance cannot be established. |
| 4 | FRCEM Representations | `RECOVER` | Very high resident-roadmap value and multiple preserved representations; requires careful duplicate and edition handling. | Stop until canonical edition, rights, locators, and review scope are closed. |
| 5 | HIPPO High Yield | `RECOVER` | Multiple representations are present, but canonical identity and rights remain open. | Stop until owner/version evidence and track/review decisions are attributable. |
| 6 | HIPPO QBank | `RECOVER` | High value but high review effort and unresolved completeness/locator evidence. | Stop until completeness, locators, rights, and QBank review are closed. |
| 7 | Clinical Images | `REPLACE` | No recoverable standalone package is evidenced; a rights-clear alternative is more reliable than substituting unrelated OSCE images. | Stop if no rights-clear, traceable, specialty-reviewable package is available. |

This sequence is a planning priority only. It does not authorize concurrent normalization or bypass source-specific governance. `INTERNAL_ONLY` remains the operating status throughout the sequence.

## 6. Global disposition and governance rules

The acquisition strategy does not change the Master Source Registry status. All seven source families remain `BLOCKED_PENDING_EVIDENCE`, and none is `READY_FOR_NORMALIZATION`. The strategy label is therefore subordinate to the following controls:

- `RECOVER` does not mean recovered evidence is clinically approved, rights-cleared, normalized, or publishable.
- `REPLACE` does not mean a substitute source may be downloaded, registered, imported, or activated without a separate decision and evidence package.
- `INTERNAL_ONLY` prohibits learner-facing educational use, public display, publication, redistribution, and activation.
- `RETIRE` has not been assigned because the present evidence does not justify irreversible disposition for any source family.
- Original sources and recovered artifacts must not be deleted, renamed, merged, silently corrected, or substituted.
- Professional-track labels remain provisional until supported by source content/level evidence and governance review.
- Clinical, rights, provenance, and accessibility reviews are evidence and approval gates; this document does not create or record those approvals.

The following remain explicitly out of scope: content normalization, medical rewriting or correction, schemas, Prisma/Zod, SQL, database changes, mappings, imports, seed operations, activation, publication, learner exposure, and Git operations.

## 7. Final recommendation

Proceed with **evidence acquisition only**. Use `RECOVER` for Drug HTML, OSCE Atlas, PreTest, HIPPO High Yield, HIPPO QBank, and FRCEM; use a controlled `REPLACE` strategy for Clinical Images; keep all seven source families operationally `INTERNAL_ONLY` and `WAITING_FOR_EVIDENCE`.

Do not proceed to normalization for any source until its exact governance envelope is complete and approved through the existing SEG process. Do not treat the acquisition strategy as a source approval, rights grant, clinical review decision, replacement authorization, or activation decision.

**Final status:** `CONTENT_ACQUISITION_STRATEGY_COMPLETE`

## References

[1]: /home/ubuntu/seg-internship-output/SEG_MASTER_SOURCE_REGISTRY_STATUS.md "SEG Master Source Registry Status"

---

**Document control:** Prepared by **Manus AI**. Controlled decision review only. This document defines a future acquisition strategy and permitted evidence-collection direction; it does not modify, replace, normalize, map, import, activate, publish, merge, delete, rename, or approve any source or medical content.
