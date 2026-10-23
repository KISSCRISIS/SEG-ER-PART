# SEG OSCE Atlas Authority Evidence Record

**Review mode:** `CONTROLLED EVIDENCE COLLECTION`  
**Record scope:** Authority-evidence recovery only; this record is not an Atlas approval, content mapping, normalization decision, or clinical validation.  
**Target artifact:** `ATLAS_ASSET_OSCE_VISUAL_001`  
**Current source gate:** `BLOCKED_PENDING_EVIDENCE`  
**Operational state:** `INTERNAL_REFERENCE_ONLY` / `WAITING_FOR_EVIDENCE`

## 1. Evidence basis

This record uses the existing read-only OSCE recovery status. The recovered package establishes a verified artifact inventory and file-level hashes. It does not independently establish the identity, ownership, license, clinical correctness, complete provenance, or accessibility readiness of the original atlas or its assets.[1]

## 2. Source identity and package evidence

| Required field | Observed evidence | Status |
|---|---|---|
| Original atlas/source title | The station text describes an emergency-medicine OSCE imaging section and names `CopyofEmergency-Medicine-FULL.pdf`. This is an internal artifact claim, not an independently verified canonical title. | `PARTIALLY_CONFIRMED` |
| Original creator/owner | No original creator, publisher, manufacturer, copyright owner, or authorized custodian is identified. | `NOT_AVAILABLE` |
| Edition/version | No independently verified edition, version, or release identifier is present. | `NOT_AVAILABLE` |
| Publication date | No publication or release date is present. | `NOT_AVAILABLE` |
| Original source location | The artifact includes source-page references, but the cited original PDF and an authoritative locator are not present in the recovered package. | `PARTIALLY_CONFIRMED` |
| Target asset identity | Target `ATLAS_ASSET_OSCE_VISUAL_001` and the recovered OSCE package are recorded in the SEG recovery material. | `PARTIALLY_CONFIRMED` |
| Recovered package integrity | `OSCE_Emergency_Medicine_Imaging_Section_Package.zip`, SHA-256 `ca5a7f5713bf5101daa839a546633366d7b5b876604bd3dbf7cea2972d59f66e`; ZIP integrity passed. | `CONFIRMED` |
| PNG inventory | 14 PNG members, each 1041 × 1347 pixels, 8-bit RGB, non-interlaced. | `CONFIRMED` |
| Station text and notes | One UTF-8 station text file and one visual-validation notes file are present. | `CONFIRMED` |

The artifact package provides byte-level evidence only. It must not be treated as proof of authorship, license, or approval.[1]

## 3. Provenance and image lineage

| Provenance element | Available evidence | Status |
|---|---|---|
| Package origin | The recovery status records an outer recovery container with SHA-256 `8182d243fc762e29efba5adeda4233042f5e337846b3fbe819fcd374ef948758` and the recovered OSCE package hash. | `PARTIALLY_CONFIRMED` |
| Extraction origin | Station text states that the material was extracted from a supplied `CopyofEmergency-Medicine-FULL.pdf`. | `PARTIALLY_CONFIRMED` |
| Extraction event | No independently evidenced extraction date, actor, tool record, or event log tied to the original PDF is available in the package. | `NOT_AVAILABLE` |
| Transformation history | The relationship between the original PDF, station text, image crops, filenames, and package is described but not independently evidenced. | `NOT_AVAILABLE` |
| Image lineage | The station text contains 14 image references and source-page references; the image-to-original-page chain is not independently verified. | `PARTIALLY_CONFIRMED` |
| Chain of custody | Recovery container and member hashes are recorded, but the chain from original source to extraction to recovery artifact to SEG registry entry is incomplete. | `PARTIALLY_CONFIRMED` |
| Registry relationship | The target asset identifier is recorded in the recovery status, but a complete governed source envelope is not present. | `PARTIALLY_CONFIRMED` |

## 4. Rights and ownership evidence

| Rights requirement | Available evidence | Status |
|---|---|---|
| Copyright owner | No owner or rights holder is identified. | `NOT_AVAILABLE` |
| PNG ownership | No image-specific ownership or permission evidence is present. | `NOT_AVAILABLE` |
| Text ownership | No ownership evidence for the station text or synthesis is present. | `NOT_AVAILABLE` |
| License | No license identifier or license text is present. | `NOT_AVAILABLE` |
| Educational use | No permission for internal educational review, teaching display, adaptation, or learner use is present. | `NOT_AVAILABLE` |
| Redistribution/publication | No permission or restriction statement addresses redistribution, public display, or publication. | `NOT_AVAILABLE` |
| Source-page context rights | No evidence permits reproducing source-page context or captions derived from the original PDF. | `NOT_AVAILABLE` |

Possession of the recovered ZIP, file hashes, source-name signal, or educational purpose does not establish rights clearance.[1]

## 5. Review requirements

| Review stream | Required role and scope | Current status |
|---|---|---|
| Medical review | Emergency Medicine reviewer with OSCE suitability and current-protocol scope, supported by appropriate subject-matter review for ECG/conduction, infectious disease, cardiology/shock, emergency imaging, orthopedics, pediatrics, and acute abdominal presentations as applicable to the stations. | `PENDING_REVIEW` |
| Technical review | Technical reviewer for package integrity, image-to-text correspondence, source-page locators, transformation lineage, and any future governed asset adapter. | `PENDING_REVIEW` |
| Visual review | Visual quality reviewer for legibility, crop integrity, annotations, image-to-caption correspondence, and responsive presentation. | `PENDING_REVIEW` |
| Accessibility review | Accessibility reviewer for alt-text or equivalent descriptions for all 14 images, non-color dependence, contrast, responsive legibility, reading order, and assistive-technology behavior. | `PENDING_REVIEW` |
| Rights/provenance review | Rights reviewer and provenance reviewer to verify owner authorization, permitted scope, extraction history, and source-versioned locators. | `PENDING_REVIEW` |

The existing notes report readability for only `016_first_degree_heart_block.png` and `142_acute_cholecystitis.png`. That limited observation is not a complete visual or accessibility review for the remaining 12 images.[1]

## 6. Accessibility requirements

| Requirement | Current evidence | Status |
|---|---|---|
| Text alternatives for all 14 PNGs | No complete alt-text or equivalent text-description set is present. | `NOT_AVAILABLE` |
| Captions and non-visual station context | Station text exists, but complete accessible correspondence and presentation behavior are not verified. | `PARTIALLY_CONFIRMED` |
| Full-set legibility | Readability is recorded for two selected images only. | `PARTIALLY_CONFIRMED` |
| Contrast and non-color dependence | No complete audit is present. | `NOT_AVAILABLE` |
| Semantic/assistive technology behavior | No learner-facing presentation exists and no audit is present. | `NOT_AVAILABLE` |
| Language/localization accessibility | No complete bilingual terminology or equivalent-text review is present. | `NOT_AVAILABLE` |

No PNG, text artifact, or validation note was modified during this evidence review.[1]

## 7. Evidence recovered versus still missing

**Recovered:** verified outer and inner package hashes, ZIP integrity, inventory of 14 PNG files, image dimensions and encoding, station text with image/source-page references, and limited readability notes for two images.[1]

**Still missing:** the authoritative original atlas or PDF, canonical title, original creator/owner, edition/version/date, original locator, independently evidenced extraction event, transformation history, complete image-to-source-page lineage, PNG and text ownership, license, educational-use and redistribution permissions, medical review, technical lineage review, full visual review, and complete accessibility evidence.

## 8. Closure impact and next allowed action

The available evidence does not change the existing P0 closure decision. It confirms recovery-package integrity but leaves source identity, rights, provenance, review, and accessibility gates open. The next allowed action is to obtain the original source or an authorized-custodian statement, document source-to-image lineage and extraction history, close rights scope for PNGs and text, and assign the required medical, technical, visual, accessibility, rights, and provenance reviews.

No Atlas record, content mapping, N:M link, normalization, database write, import, activation, publication, or learner exposure is authorized by this record.

## 9. Current classification

| Dimension | Classification |
|---|---|
| Original source identity | `PARTIALLY_CONFIRMED` at artifact-claim level; canonical identity and owner `NOT_AVAILABLE` |
| Provenance | `PARTIALLY_CONFIRMED` at recovery-package level; complete chain `NOT_AVAILABLE` |
| Rights/license | `NOT_AVAILABLE` |
| Medical review | `PENDING_REVIEW` |
| Technical review | `PENDING_REVIEW` |
| Visual/accessibility review | `PENDING_REVIEW` |
| Source disposition | `BLOCKED_PENDING_EVIDENCE` |

## References

[1]: /home/ubuntu/seg-internship-output/SEG_OSCE_ATLAS_RECOVERY_STATUS.md "SEG OSCE Atlas Recovery Status"

**Record status:** `PARTIALLY_CONFIRMED` recovery evidence record; source remains blocked.
