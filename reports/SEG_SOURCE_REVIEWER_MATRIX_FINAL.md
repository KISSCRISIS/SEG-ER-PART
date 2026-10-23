# SEG Source Reviewer Matrix — Final

**Mode:** `CONTROLLED GOVERNANCE ONLY` / role matrix, not an assignment or approval  
**Purpose:** Define the independent reviewer roles required to close evidence gates for the current SEG source families and the separate JEM Nexus tool path.  
**Prepared by:** **Manus AI**

> **Control boundary:** This matrix defines reviewer roles only. It does not name, appoint, authenticate, or approve any reviewer; it does not record a clinical, rights, technical, visual, accessibility, track, or activation decision. Every review status is `NOT_STARTED` unless a source-specific evidence record independently proves otherwise. [1] [2] [3] [4] [5] [6]

## 1. Reviewer Role Definitions

| Stream | Role definition | Required evidence from the reviewer | Governance boundary |
|---|---|---|---|
| Medical | Qualified clinical reviewer appropriate to the source domain and professional level | Source-versioned clinical findings, conflicts, resolutions, date, attributable identity/role, and explicit review outcome | Does not approve rights, software security, accessibility, activation, or publication |
| Technical | Medical-device, software, or technical reviewer appropriate to the artifact | Technical scope, version/build evidence, limitations, reproducibility, test evidence, and explicit technical outcome | Required only where artifact behavior, device instructions, or future integration makes it applicable |
| Visual Quality | Qualified reviewer for clinical image legibility and visual fidelity | Asset-level visual findings, source correspondence, legibility, ambiguity, and explicit outcome | Does not approve medical correctness, rights, or accessibility by itself |
| Accessibility | Qualified accessibility reviewer for the proposed presentation surface | Keyboard, screen-reader, contrast, responsive, semantic, alternative-text, language, and non-color findings | Applies to a future user-facing presentation; no UI approval is implied |
| Rights | Rights/copyright reviewer with source-specific authority or evidence access | Ownership, license, educational use, display, redistribution, attribution, third-party assets, restrictions, and explicit outcome | Possession, hashes, or educational intent do not substitute for rights evidence |
| Provenance | Source/provenance reviewer | Original source, extraction event, transformation history, recovery artifact, locators, custody, and lineage decision | Does not approve medical content or rights |
| Track/Taxonomy | SEG governance reviewer for professional-level and taxonomy fit | Evidence-based pathway classification, scope boundaries, conflicts, and explicit decision | Does not infer track from filenames, folders, or artifact labels alone |
| Security | Security/software-data-flow reviewer | Authentication/authorization boundary, secrets, dependencies, data flow, privacy, retention, logging, abuse controls, and explicit outcome | Required for JEM or future software/tool integration; no integration is authorized by this matrix |

All roles are **role placeholders**, not named individuals or appointments. The matrix preserves professional-track separation and does not authorize mixing resident, internship, student, shared-core, or advanced content. [1]

## 2. Source-by-Source Matrix

| Source or path | Current gate and evidence posture | Medical Reviewer | Technical Reviewer | Visual Reviewer | Accessibility Reviewer | Rights Reviewer | Other required governance roles | Assignment state |
|---|---|---|---|---|---|---|---|---|
| **Drug HTML** | `BLOCKED_PENDING_EVIDENCE`; local HTML/hash and structural medication-related observations exist, but canonical identity, rights, provenance, clinical review, and track evidence remain open. [2] | Emergency Medicine Pharmacology / Medication Safety Reviewer; review medication claims, doses, precautions, and interaction/contraindication statements | `NOT_REQUIRED_FOR_CURRENT_STATIC_SOURCE_CLOSURE`; separate renderer/integration review only if a learner-facing surface is proposed | `NOT_REQUIRED_FOR_CURRENT_STATIC_SOURCE_CLOSURE` | `NOT_REQUIRED_FOR_CURRENT_STATIC_SOURCE_CLOSURE`; future UI presentation review if proposed | Source-specific Rights Reviewer | Provenance Reviewer; Track/Taxonomy Reviewer | `NOT_STARTED` |
| **HIPPO HY** | `BLOCKED_PENDING_EVIDENCE`; text, colored PDF, and DOCX representations are retained, but identity, rights, provenance, clinical review, and track evidence remain open. [3] | Emergency Medicine / Critical Care reviewer appropriate to the retained source scope | `NOT_REQUIRED_FOR_CURRENT_STATIC_SOURCE_CLOSURE`; future document/rendering review if proposed | `NOT_REQUIRED_FOR_CURRENT_STATIC_SOURCE_CLOSURE`; PDF visual review only if a future surface is proposed | `NOT_REQUIRED_FOR_CURRENT_STATIC_SOURCE_CLOSURE`; future learner-facing presentation review if proposed | Source-specific Rights Reviewer | Provenance Reviewer; Track/Taxonomy Reviewer | `NOT_STARTED` |
| **HIPPO QBank** | `BLOCKED_PENDING_EVIDENCE`; recovered QBank text is available, but authoritative identity, completeness, locators, rights, clinical review, provenance, and track evidence remain open. [4] | Emergency Medicine / QBank and examination-content reviewer | `NOT_REQUIRED_FOR_CURRENT_STATIC_SOURCE_CLOSURE`; future question-delivery implementation review if proposed | `NOT_REQUIRED_FOR_CURRENT_STATIC_SOURCE_CLOSURE` | `NOT_REQUIRED_FOR_CURRENT_STATIC_SOURCE_CLOSURE`; future question-interface review if proposed | Source-specific Rights Reviewer | Provenance Reviewer; Track/Taxonomy Reviewer | `NOT_STARTED` |
| **FRCEM Representations** | `BLOCKED_PENDING_EVIDENCE`; multiple traceable representations and a duplicate relationship are retained; no merge, deletion, or approval is inferred. [5] | Emergency Medicine / examination-content reviewer, with level-specific review of study-book and Q&A representations | `NOT_REQUIRED_FOR_CURRENT_STATIC_SOURCE_CLOSURE`; future document/rendering review if proposed | `NOT_REQUIRED_FOR_CURRENT_STATIC_SOURCE_CLOSURE`; only if the colored PDF is presented | `NOT_REQUIRED_FOR_CURRENT_STATIC_SOURCE_CLOSURE`; only if a learner-facing surface is proposed | Source-specific Rights Reviewer for each representation/asset | Provenance Reviewer; Track/Taxonomy Reviewer | `NOT_STARTED` |
| **PreTest** | `BLOCKED_PENDING_EVIDENCE`; recovered UTF-8 representation is hash-confirmed, but authoritative PDF, OCR comparison, identity, rights, provenance, clinical review, and track evidence remain open. [6] | Emergency Medicine / PreTest and QBank reviewer; OCR discrepancies require clinical disposition | `NOT_REQUIRED_FOR_CURRENT_STATIC_SOURCE_CLOSURE`; future question-delivery implementation review if proposed | `NOT_REQUIRED_FOR_CURRENT_STATIC_SOURCE_CLOSURE` | `NOT_REQUIRED_FOR_CURRENT_STATIC_SOURCE_CLOSURE`; future question-interface review if proposed | Source-specific Rights Reviewer | Provenance Reviewer; Track/Taxonomy Reviewer | `NOT_STARTED` |
| **OSCE Atlas** | `BLOCKED_PENDING_EVIDENCE`; recovered text, validation notes, 14 PNGs, and hashes are present, but original-source identity, rights, provenance, clinical, visual, accessibility, and track evidence remain open. [7] | Emergency Medicine / OSCE reviewer, with domain reviewers where the station content requires them | `NOT_REQUIRED_FOR_CURRENT_STATIC_SOURCE_CLOSURE`; separate Atlas integration review only if future integration is authorized | Visual Quality Reviewer for all 14 PNGs and their text/image correspondence | Accessibility Reviewer for all 14 PNGs, captions/alternatives, responsive behavior, and presentation | Source-specific Rights Reviewer for station text and each image/asset | Provenance Reviewer; Track/Taxonomy Reviewer | `NOT_STARTED` |
| **Hamilton Ventilator Clinical Engineering Guide** | `BLOCKED_PENDING_EVIDENCE`; archive/PDF integrity is evidenced, but identity, transformation provenance, rights, clinical, device-technical, track, and audit gates remain open. [8] | Emergency Medicine / ICU reviewer **and** Ventilation Specialist | Medical Device Technical Reviewer with model/software-specific device-manual scope | `CONDITIONAL`; only if PDF visuals are later proposed for user-facing use | `CONDITIONAL`; only if PDF visuals are later proposed for user-facing use | Source-specific Rights Reviewer covering PDF, translation/derivative work, visuals, and any code/app shell | Provenance Reviewer; Track/Taxonomy Reviewer; Security Reviewer only if the mixed application bundle is considered for integration | `NOT_STARTED` |
| **JEM Nexus Emergency Medical Calculator** *(separate path)* | `BLOCKED_PENDING_EVIDENCE`; not in the Master Source Registry; package identity, clinical formulas/validation, rights, provenance, software/security, AI/data flow, intended-use, and track evidence remain open. [9] | Emergency Medicine / ICU Clinical Calculator Reviewer; domain specialists as required by calculator scope | Software/Clinical Calculator Technical Reviewer | `NOT_REQUIRED_FOR_CURRENT_STATIC_TOOL_CLOSURE`; future UI review if a tool surface is proposed | `NOT_REQUIRED_FOR_CURRENT_STATIC_TOOL_CLOSURE`; future tool-interface review if proposed | Source-specific Rights Reviewer for code, formulas, embedded material, dependencies, and assets | Provenance Reviewer; Track/Taxonomy Reviewer; Security Reviewer; AI/Data-Flow Reviewer | `NOT_STARTED` |
| **Clinical Images** | `BLOCKED_PENDING_EVIDENCE`; no standalone source-specific artifact, inventory, per-file manifest, or closed registry entry is available. OSCE PNGs are not substitutes. [10] | Emergency Medicine / Clinical Image Interpretation Reviewer, with specialty reviewer where clinically required | `NOT_REQUIRED_FOR_CURRENT_STATIC_SOURCE_CLOSURE`; future image-delivery/integration review if proposed | Visual Quality Reviewer for each recovered image and source correspondence | Accessibility Reviewer for alternative text, captions, contrast, responsive and assistive presentation | Source-specific Rights Reviewer for every image/asset | Provenance Reviewer; Track/Taxonomy Reviewer | `NOT_STARTED` |

## 3. Review Sequencing and Independence

Evidence closure must proceed in separate streams. First, the source/provenance and rights reviewers establish attributable identity, version, owner, license, permitted use, transformation history, and source locators. Medical reviewers then assess source-versioned content and record conflicts without silently changing the retained artifact. Visual and accessibility reviewers assess the complete visual set and any proposed presentation surface. Technical and security reviewers apply where device behavior, software behavior, AI/data flow, or future integration is in scope. Track/taxonomy review remains separate from clinical approval.

A reviewer role may not be used as a substitute for another stream. In particular, a medical review does not grant rights, a rights review does not certify clinical accuracy, a technical review does not approve normalization, and a visual or accessibility review does not authorize publication. No stream is considered complete without attributable evidence and an explicit decision record.

## 4. Current Matrix Outcome

| Check | Result |
|---|---|
| Medical role defined for Drug HTML, HIPPO HY, HIPPO QBank, FRCEM, PreTest, OSCE, Hamilton, and JEM | `YES` |
| Technical role defined for Hamilton and JEM | `YES` |
| Visual role defined for OSCE and Clinical Images | `YES` |
| Accessibility role defined for OSCE and Clinical Images | `YES` |
| Rights role defined for all source families and JEM | `YES` |
| Named reviewers assigned | `NO` |
| Clinical approval recorded | `NO` |
| Rights approval recorded | `NO` |
| Technical/security approval recorded | `NO` |
| Normalization authorized | `NO` |
| Content records, mappings, imports, activation, or publication authorized | `NO` |

## 5. Final Matrix Status

```text
SEG_SOURCE_REVIEWER_MATRIX_FINAL
ROLE_MATRIX_COMPLETE = YES
NAMED_REVIEWERS_ASSIGNED = NO
APPROVALS_GRANTED = NO
NORMALIZATION_AUTHORIZED = NO
CURRENT_SOURCE_GATE = BLOCKED_PENDING_EVIDENCE
```

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_TARGETED_EVIDENCE_CLOSURE_PLAN.md "SEG Targeted Evidence Closure Plan"

[2]: file:///home/ubuntu/seg-internship-output/SEG_DRUG_HTML_SOURCE_CLOSURE_DECISION.md "SEG Drug HTML Source Closure Decision"

[3]: file:///home/ubuntu/seg-internship-output/SEG_HIPPO_HY_RECOVERY_STATUS.md "SEG HIPPO High Yield Recovery Status"

[4]: file:///home/ubuntu/seg-internship-output/SEG_HIPPO_QBANK_RECOVERY_STATUS.md "SEG HIPPO QBank Recovery Status"

[5]: file:///home/ubuntu/seg-internship-output/SEG_FRCEM_RECOVERY_STATUS.md "SEG FRCEM Recovery Status"

[6]: file:///home/ubuntu/seg-internship-output/SEG_PRETEST_SOURCE_CLOSURE_DECISION.md "SEG PreTest Source Closure Decision"

[7]: file:///home/ubuntu/seg-internship-output/SEG_OSCE_ATLAS_SOURCE_CLOSURE_DECISION.md "SEG OSCE Atlas Source Closure Decision"

[8]: file:///home/ubuntu/seg-internship-output/SEG_HAMILTON_SOURCE_CLOSURE_DECISION.md "SEG Hamilton Source Closure Decision"

[9]: file:///home/ubuntu/seg-internship-output/SEG_JEM_NEXUS_SOURCE_CLOSURE_DECISION.md "SEG JEM Nexus Source Closure Decision"

[10]: file:///home/ubuntu/seg-internship-output/SEG_MASTER_SOURCE_REGISTRY_STATUS.md "SEG Master Source Registry Status"

---

**SEG_SOURCE_REVIEWER_MATRIX_FINAL**
