# SEG Source Registry Priority Matrix

**Mode:** Evidence Management Only — Controlled Read-Only

**Final status:** `SOURCE_GOVERNANCE_GAP_MATRIX_COMPLETE`

## 1. Priority policy

This matrix applies the priority rules requested for the nine SEG source families. **P0** means the unresolved evidence prevents safe normalization of the affected source and therefore prevents any source-derived contract, mapping, import, or activation for that source. **P1** means the gap blocks a specific source decision or source representation but is not itself a platform-wide blocker once the P0 governance envelope is closed. **P2** means a quality or publication-readiness improvement that must be completed before learner-facing release.

| Priority | Operational meaning in this matrix | Examples |
|---|---|---|
| **P0** | Direct normalization/governance blocker | Missing or unverified canonical identity, undefined rights, absent medical-review decision, incomplete original-source provenance, required Pretest restoration, or absent Clinical Images inventory. |
| **P1** | Source-specific closure blocker | Unresolved locators, professional-track decision, completeness evidence, duplicate/representation decision, or source-specific audit closure. |
| **P2** | Pre-publication quality gate | Alt-text/accessibility review, display/readability review, representation comparison after identity is established, or non-blocking evidence-package quality improvement. |

A priority label is not an approval. A row is closed only when the listed evidence is obtained, linked to the relevant source/artifact SHA, and reviewed under the SEG governance process.

## 2. Unified source/gap matrix

| Source | Gap Type | Priority | Blocking | Resolution Action | Owner Type |
|---|---|---:|---|---|---|
| OSCE Atlas Package | Source identity: canonical title, owner/publisher, author/editor, edition/version, date, original locator absent or unverified | P0 | Blocks OSCE normalization and governed Atlas closure | Obtain authoritative source/package citation and link it to the recovered container, text artifact, and 14-member inventory | Source owner / Provenance reviewer |
| OSCE Atlas Package | Provenance: recovery and member SHA evidence exists, but original source and extraction event are not fully linked | P0 | Blocks reliable source-to-artifact lineage | Document original → extraction → recovery chain, including archive/member paths, timestamps/events, and exact hashes | Provenance reviewer |
| OSCE Atlas Package | Rights: no confirmed license/display/derivative permission for text and PNG members | P0 | Blocks visual use, import, and publication | Obtain rights-holder evidence covering the archive/text and each visual member or the governing license | Rights reviewer |
| OSCE Atlas Package | Medical review: visual validation notes are not clinical approval | P0 | Blocks medical/visual activation | Assign emergency-medicine/imaging reviewer; record scope, conflicts, decision, and approval evidence | Medical reviewer / Imaging reviewer |
| OSCE Atlas Package | Professional track: Internship versus Resident/Shared Core unresolved | P1 | Blocks pathway-specific classification | Record explicit track decision with curriculum rationale and reviewer event; preserve separation | Curriculum owner / Clinical reviewer |
| OSCE Atlas Package | Locators and audit closure: station/image linkage and append-only decision events incomplete | P1 | Blocks precise traceability and release audit | Capture station/source-version locators and intake, recovery, rights, review, and track events | Provenance reviewer / Governance owner |
| OSCE Atlas Package | Accessibility/display quality: alt text and accessibility review not evidenced | P2 | Blocks publication-quality acceptance, not evidence recovery | Conduct image-level alt-text, readability, contrast, and display review after rights/medical gates | Accessibility reviewer |
| Drug HTML Artifact | Source identity: HTML structure and SHA exist, but canonical title, owner/publisher, author, version/date, and original locator are not established | P0 | Blocks drug-content normalization | Obtain authoritative source envelope and tie it to SHA `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac` | Source owner / Provenance reviewer |
| Drug HTML Artifact | Provenance: artifact fingerprint is known, original source and extraction context are not fully evidenced | P0 | Blocks source-derived transformation | Record source locator, extraction method/process, timestamps, input/output hashes, and transformation boundary | Provenance reviewer |
| Drug HTML Artifact | Rights: permission/licence and permitted SEG use are not confirmed | P0 | Blocks derivative use, import, and display | Obtain rights evidence with scope, restrictions, evidence locator, and review date if applicable | Rights reviewer |
| Drug HTML Artifact | Medical review: no clinical pharmacology/emergency-medicine approval record | P0 | Blocks clinical use of drugs, doses, interactions, and warnings | Assign reviewer and record domain coverage, conflicts, unresolved issues, and decision | Medical reviewer / Clinical pharmacology reviewer |
| Drug HTML Artifact | Professional track: Shared Core versus Internship/Advanced scope unresolved | P1 | Blocks track-separated routing | Decide track from reviewed scope; do not infer from filename or HTML headings | Curriculum owner / Medical reviewer |
| Drug HTML Artifact | Locators/audit: source-versioned section/entity locators and complete governance events missing | P1 | Blocks auditable source closure | Capture versioned section/entity locators and append-only evidence events | Provenance reviewer / Governance owner |
| Drug HTML Artifact | Structural quality: counts are observations, not completeness or correctness validation | P2 | Blocks publication-quality assurance only | Run later completeness/readability/accessibility checks after governance closure | Content QA reviewer |
| Pretest Package | Source identity: recovered representations are fingerprinted, but canonical source identity, owner, edition/version, date, and locator remain open | P0 | Blocks Pretest normalization | Obtain authoritative `pretestnew` source identity and original artifact evidence | Source owner / Provenance reviewer |
| Pretest Package | Provenance/restoration: representation identity is confirmed, but OCR/extraction corruption and original-source chain remain unresolved | P0 | Blocks safe use of all affected text | Restore or verify authoritative source; document restoration event, input/output hashes, affected sections, and reviewer acceptance | Provenance reviewer / Restoration owner |
| Pretest Package | Rights: no source-specific permission/display evidence | P0 | Blocks import and display | Obtain rights evidence for each recovered representation and intended SEG use | Rights reviewer |
| Pretest Package | Medical review: corruption and clinical correctness are unresolved; no approval evidence | P0 | Blocks question/explanation use | Assign emergency-medicine/question-bank reviewer; review restored source, conflicts, and approval scope | Medical reviewer |
| Pretest Package | Professional track: Internship/Resident/Shared Core classification unresolved | P1 | Blocks pathway-specific derivatives | Record explicit pathway decision after source and clinical review | Curriculum owner / Clinical reviewer |
| Pretest Package | Representation relation/locators/audit: separate artifacts must not be merged; exact source locators and event history incomplete | P1 | Blocks representation-level traceability | Preserve separate lineage and capture source-versioned locators plus recovery/restoration/decision events | Provenance reviewer / Governance owner |
| Pretest Package | Post-restoration quality: OCR readability and completeness comparison | P2 | Blocks publication-quality acceptance only after P0/P1 closure | Perform controlled comparison against the authoritative source without silently rewriting the evidence artifact | Content QA reviewer |
| 1400 Questions Package | Source identity: study-guide and Q&A representations are separated, but canonical title, owner, edition/version, date, and locator are open | P0 | Blocks 1400q normalization | Obtain identity evidence separately for the study guide and Q&A representation/family | Source owner / Provenance reviewer |
| 1400 Questions Package | Provenance: package/README separation and hashes exist, but original source and extraction event are not closed | P0 | Blocks representation-to-source lineage | Record original source, extraction event, recovery package/member paths, and registry relationship for both representations | Provenance reviewer |
| 1400 Questions Package | Rights: rights/display/derivative scope not confirmed | P0 | Blocks question, answer, explanation, and guide use | Obtain rights evidence per representation or governing source licence | Rights reviewer |
| 1400 Questions Package | Medical review: no question/explanation approval or conflict closure | P0 | Blocks clinical publication | Assign emergency-medicine/question-bank reviewer and record coverage and decision for each representation | Medical reviewer |
| 1400 Questions Package | Professional track: Internship/Resident/Shared Core unresolved | P1 | Blocks pathway routing | Make explicit track decision; keep representations separate until reviewed | Curriculum owner / Clinical reviewer |
| 1400 Questions Package | Completeness/locators/audit: structural markers do not validate completeness; precise question/source locators and event lineage incomplete | P1 | Blocks reliable source closure | Obtain completeness evidence, versioned locators, and append-only governance events | Content QA reviewer / Provenance reviewer |
| 1400 Questions Package | Representation quality: comparison between separate representations after identity is established | P2 | Blocks publication-quality acceptance only | Conduct controlled representation comparison without merge, delete, or replacement | Content QA reviewer |
| HIPPO High Yield | Source identity: family is named, but canonical title, publisher/owner, author/editor, edition/version, date, and locator are not closed | P0 | Blocks HIPPO HY normalization | Obtain source-owned bibliographic and locator evidence | Source owner / Provenance reviewer |
| HIPPO High Yield | Provenance: family-level registry evidence exists, but artifact-specific source/extraction/recovery chain is incomplete | P0 | Blocks reliable lineage | Attach exact artifact SHA/path and extraction/recovery events to the family evidence | Provenance reviewer |
| HIPPO High Yield | Rights: pending/unknown | P0 | Blocks derivative use and display | Obtain permission/licence evidence and permitted-use scope | Rights reviewer |
| HIPPO High Yield | Medical review: no closed emergency-medicine review decision | P0 | Blocks clinical use | Assign reviewer, define domain coverage/conflicts, and record approval evidence | Medical reviewer |
| HIPPO High Yield | Professional track: Resident/Board Prep versus Advanced Reference and separation from Internship unresolved | P1 | Blocks pathway routing | Record reviewed track decision and excluded tracks | Curriculum owner / Clinical reviewer |
| HIPPO High Yield | Locators/completeness/audit: source-versioned chapter locators, completeness evidence, and full event history incomplete | P1 | Blocks auditable source closure | Capture authoritative locators, completeness evidence, and governance events | Provenance reviewer / Content QA reviewer |
| HIPPO High Yield | Presentation/representation quality | P2 | Blocks publication-quality acceptance only | Compare available representations after identity and rights gates, without merging them | Content QA reviewer |
| HIPPO QBank | Source identity: QBank is separate from HIPPO HY, but canonical title, owner/publisher, authors/editors, edition/version, date, and locator are open | P0 | Blocks QBank-specific normalization | Obtain QBank-specific identity evidence; do not infer from HIPPO HY | Source owner / Provenance reviewer |
| HIPPO QBank | Provenance: family separation exists, but per-artifact extraction/recovery lineage is incomplete | P0 | Blocks question-bank lineage | Document exact artifact paths/SHAs and source/extraction/recovery events | Provenance reviewer |
| HIPPO QBank | Rights: question, answer, explanation, and derivative-use permission not confirmed | P0 | Blocks import/display | Obtain rights evidence with scope and restrictions | Rights reviewer |
| HIPPO QBank | Medical review: completeness, answer fidelity, explanation accuracy, and current correctness are not closed | P0 | Blocks clinical use | Assign emergency-medicine/QBank reviewer and record conflicts and decision | Medical reviewer |
| HIPPO QBank | Professional track: Resident/Board Prep or Advanced Reference unresolved | P1 | Blocks pathway routing and separation from Internship | Record explicit track decision with reviewer rationale | Curriculum owner / Clinical reviewer |
| HIPPO QBank | Completeness/locators/audit: precise question locators, completeness evidence, and decision events absent | P1 | Blocks auditable QBank closure | Obtain edition-specific completeness and locators; append review and track events | Content QA reviewer / Governance owner |
| HIPPO QBank | QBank representation quality | P2 | Blocks publication-quality acceptance only | Perform later answer/explanation consistency and accessibility checks | Content QA reviewer |
| FRCEM Representations | Source identity: multiple representations/IDs are preserved, but canonical edition/volume, owner, author/editor, date, and original locators are not closed | P0 | Blocks FRCEM normalization and canonical decision | Obtain identity evidence per representation and authoritative edition | Source owner / Provenance reviewer |
| FRCEM Representations | Provenance: duplicate/representation lineage is recorded, but original-to-extraction-to-recovery chain remains incomplete | P0 | Blocks safe deduplication/normalization | Link each representation to its source, extraction event, recovery artifact, and exact SHA | Provenance reviewer |
| FRCEM Representations | Rights: no confirmed rights evidence for the representations | P0 | Blocks import/display | Obtain representation-specific rights/licence evidence | Rights reviewer |
| FRCEM Representations | Medical review: no FRCEM-aligned clinical/examination review decision | P0 | Blocks clinical/exam publication | Assign emergency-medicine/examination reviewer and record conflicts and approval scope | Medical reviewer |
| FRCEM Representations | Professional track: Resident/Board Prep and Advanced Reference classification must be explicit and separate from Internship | P1 | Blocks pathway routing | Record track decision per representation/module | Curriculum owner / Clinical reviewer |
| FRCEM Representations | Duplicate/representation decision, locators, and audit events incomplete | P1 | Blocks canonical representation handling and traceability | Preserve all files; document comparison method, decision, locators, and append-only events | Provenance reviewer / Governance owner |
| FRCEM Representations | Cross-representation quality comparison | P2 | Blocks publication-quality acceptance only | Compare representations only after identity/rights/review gates; no silent merge | Content QA reviewer |
| Oxford Reference | Source identity: local representation exists, but official Oxford identity, ISBN/equivalent, publisher/imprint, edition, date, author/editor, and locator are unresolved | P0 | Blocks Oxford normalization | Obtain official bibliographic record and match it to the exact artifact SHA | Source owner / Provenance reviewer |
| Oxford Reference | Provenance: representation-level evidence exists, but original/extraction/recovery chain is incomplete | P0 | Blocks reliable source lineage | Record source, extraction, recovery, and registry relationships | Provenance reviewer |
| Oxford Reference | Rights: use/display/derivative permission is unknown or pending | P0 | Blocks import/display | Obtain Oxford/publisher rights evidence with scope and restrictions | Rights reviewer |
| Oxford Reference | Medical review: no final domain review or approval evidence | P0 | Blocks clinical publication | Assign emergency-medicine/source-verification reviewer and record decision | Medical reviewer |
| Oxford Reference | Professional track: exact title may support Shared Core, Internship, Resident, or Advanced Reference; classification is unresolved | P1 | Blocks pathway routing | Decide track from verified title/scope and clinical-owner review | Curriculum owner / Clinical reviewer |
| Oxford Reference | Precise locators and audit events incomplete | P1 | Blocks auditable source closure | Capture official edition/page/chapter locators and governance event chain | Provenance reviewer / Governance owner |
| Oxford Reference | Representation/readability quality | P2 | Blocks publication-quality acceptance only | Perform display/accessibility review after governance closure | Content QA / Accessibility reviewer |
| Clinical Images | Artifact inventory: no source-specific inventory or per-file hashes | P0 | Blocks Clinical Images family completely | Recover or obtain inventory, original files, per-file hashes, and collection membership | Source owner / Asset custodian |
| Clinical Images | Source identity: no canonical collection/title, owner, creator, edition/version/date, or original locator | P0 | Blocks all image governance | Obtain authoritative origin evidence for every image or governed collection | Source owner / Provenance reviewer |
| Clinical Images | Provenance: original → extraction → recovery → registry chain absent | P0 | Blocks any image-derived action | Build evidence-only per-image/collection lineage with source and recovery events | Provenance reviewer |
| Clinical Images | Rights/privacy: rights, consent where relevant, display/derivative scope, and restrictions absent | P0 | Blocks any use or display | Obtain rights, permission, and privacy/de-identification evidence | Rights reviewer / Privacy reviewer |
| Clinical Images | Medical review: diagnostic/educational interpretation, conflicts, and approval absent | P0 | Blocks clinical use | Assign emergency-medicine/imaging reviewer and record image-level or collection-level decision | Medical reviewer / Imaging reviewer |
| Clinical Images | Professional track: no evidence-supported Internship/Resident/Shared Core/Advanced routing | P1 | Blocks pathway assignment | Decide track only after identity, rights, and clinical review | Curriculum owner / Clinical reviewer |
| Clinical Images | Audit and locators: image-level source locators and append-only events absent | P1 | Blocks traceability and release governance | Record source locator, hash, rights, privacy, medical, visual, and track events | Provenance reviewer / Governance owner |
| Clinical Images | Alt text/accessibility/display suitability | P2 | Blocks publication-quality acceptance | Complete image-level alt text, accessibility, readability, and UI display review after P0/P1 gates | Accessibility reviewer |

## 3. Cross-source priority summary

| Gap class | Sources affected | Priority pattern | Current state |
|---|---|---:|---|
| Canonical source identity | All nine families | P0 | No source family has a complete, independently evidenced canonical identity envelope in the current closure package. |
| Original provenance chain | All nine families; strongest recovery evidence for OSCE, Pretest, and 1400q | P0 | Recovery hashes exist for selected artifacts, but original-source and extraction links remain incomplete. |
| Rights/permission | All nine families | P0 | No family has a closed source-specific rights decision covering intended SEG use. |
| Medical review | All nine families | P0 | No family has a completed clinical-review/approval record. |
| Restoration/inventory | Pretest and Clinical Images | P0 | Pretest restoration remains open; Clinical Images lacks an artifact inventory entirely. |
| Track, locators, completeness, representation decisions | All nine families, with family-specific applicability | P1 | These decisions remain provisional and must preserve professional-track separation. |
| Accessibility and display quality | OSCE, Clinical Images, and later visual representations | P2 | Must be completed before publication; not a substitute for identity, rights, or clinical review. |

## 4. Governance effect

The matrix confirms that no source is currently eligible for normalization, Zod contract preparation, Prisma mapping, database storage, import, seed, activation, or learner exposure. The only allowed next actions are evidence acquisition, evidence verification, reviewer assignment, and preparation of governance decision records. No source may be closed by filename, SHA alone, structural counts, visual readability notes, or an apparent exam level.

## 5. Final status

**`SOURCE_GOVERNANCE_GAP_MATRIX_COMPLETE`**

This matrix is complete as a prioritization artifact. It does not close any gap, create any record, or authorize implementation.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_SOURCE_REGISTRY_GOVERNANCE_CLOSURE_REPORT.md "SEG Source Registry Governance Closure Report"
[2]: file:///home/ubuntu/seg-internship-output/SEG_SOURCE_EVIDENCE_RECOVERY_VALIDATION_REPORT.md "SEG Source Evidence Recovery Validation Report"
[3]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md "SEG Phase 7.8.11 Updated Source Registry"
[4]: file:///home/ubuntu/seg-internship-output/SEG_DRUG_HTML_SOURCE_REVIEW.md "SEG Drug HTML Source Review"
[5]: file:///home/ubuntu/skills/seg-metadata-source-mapper/SKILL.md "SEG Metadata Source Mapper Governance Rules"
[6]: file:///home/ubuntu/skills/seg-content-qa/SKILL.md "SEG Content QA Governance Rules"
[7]: file:///home/ubuntu/skills/seg-project-continuity/SKILL.md "SEG Project Continuity Governance Rules"
