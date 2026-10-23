# SEG P0 Rights and Review Status

**Mode:** `CONTROLLED READ-ONLY EVIDENCE CLOSURE`  
**Assessment date:** 2026-08-22  
**Scope:** Drug HTML Artifact, OSCE Atlas Package, and PreTest Question Package  
**Status:** `P0_EXTERNAL_EVIDENCE_CLOSURE_COMPLETE`

## 1. Purpose and decision boundary

This register records the available rights evidence and the medical-review requirements for the three P0 source families. It does not grant permission, determine ownership, approve clinical content, assign a named reviewer, or authorize normalization, mapping, import, activation, publication, or learner exposure.

Official publisher catalog and copyright pages are treated as external identity and ownership-context evidence only. They are not source-specific licenses for the local files. In particular, a product page or copyright notice cannot be used as evidence of permission to reproduce, display, redistribute, or publish a recovered or derived artifact.

## 2. Rights status matrix

| Source | Overall rights state | Ownership evidence | License evidence | Educational usage rights | Redistribution restrictions | Publication/display limitations | Required rights action |
|---|---|---|---|---|---|---|---|
| Drug HTML Artifact | `PENDING_EXTERNAL_EVIDENCE` | No owner/rightsholder statement in the HTML. Elsevier and McGraw Hill pages establish Rosen/Tintinalli product context, not ownership of this local file.[1] [2] | No license, permission letter, or source-specific terms supplied | Not established for the local HTML | Not established | No display or publication permission documented; absence of restrictions is not permission | Obtain a written statement from the source owner/publisher or authorized custodian linking the exact artifact to a source and specifying permitted educational display/use |
| OSCE Atlas Package | `UNKNOWN` for owner; `PENDING_EXTERNAL_EVIDENCE` for license/use | Owner of `CopyofEmergency-Medicine-FULL.pdf`, station text, and 14 PNGs is not identified. McGraw Hill Atlas 5e is a separate catalog candidate and not a verified match.[3] | No text, station, diagram, or image license supplied | Not established | Not established | No permission for the 14 PNGs or station text is documented | Identify the original owner or publisher and obtain source-level and image-level rights evidence, including display, attribution, redistribution, and publication limits |
| PreTest Question Package | `PENDING_EXTERNAL_EVIDENCE` | Official McGraw Hill PreTest pages identify a product and authors, but do not establish ownership of the local `UPD811-007` representation.[4] [5] | No license or permission for the recovered representation supplied | Not established for the local representation | Not established | No permission to display or publish the recovered questions/text documented | Obtain a written source-specific permission or license and evidence tying it to the recovered representation and exact edition |

## 3. Rights evidence detail

### 3.1 Drug HTML Artifact

The local HTML contains a Rosen/Tintinalli title signal and clinical medication material. The official Elsevier page identifies a Rosen’s Emergency Medicine product, and the official McGraw Hill page identifies Tintinalli’s Emergency Medicine 9e.[1] [2] Neither page identifies the local HTML, confirms that it is an authorized derivative, or supplies a license for its embedded text, medication descriptions, or any display in SEG.

The rights closure remains `PENDING_EXTERNAL_EVIDENCE`. Required evidence includes the rightsholder identity, the exact source or derivative relationship, educational-use scope, display permission, redistribution restrictions, attribution requirements, geographic or institutional limits if any, and any expiration or takedown terms.

### 3.2 OSCE Atlas Package

The recovery package establishes that a text artifact, validation notes, and 14 PNG members exist and are hash-verifiable. It does not identify the owner of the named `CopyofEmergency-Medicine-FULL.pdf`, the station synthesis, or the individual images. The official McGraw Hill page identifies *The Atlas of Emergency Medicine, 5e* and its listed editors, but does not establish that the recovered OSCE package originated from that resource or authorize its images.[3]

The owner state is therefore `UNKNOWN`, and the license/display state is `PENDING_EXTERNAL_EVIDENCE`. Each visual member requires image-level rights evidence or a documented rights basis. The visual validation notes are readability observations only and cannot be used as permission.

### 3.3 PreTest Question Package

The recovered inner text exactly matches the prior `UPD811-007` representation, but the hash match is evidence of representation continuity, not permission. McGraw Hill’s official pages identify *PreTest Emergency Medicine, Fifth Edition* and its authors, and the Access platform identifies the related PreTest 5e resource.[4] [5] These pages do not establish that the local representation is from that edition or authorize copying, display, redistribution, or publication.

The rights state remains `PENDING_EXTERNAL_EVIDENCE`. The separate all-chapters artifact remains a distinct lineage and has no separate rights evidence.

## 4. Medical-review status matrix

| Source | Required specialty/reviewer profile | Review scope | Known evidence conflicts or unresolved issues | Reviewer assignment status | Clinical decision/approval |
|---|---|---|---|---|---|
| Drug HTML Artifact | Qualified Emergency Medicine clinician with medication/pharmacology competence; section-specific escalation to toxicology, critical care, resuscitation, pediatric, obstetric, or other domains as authorized | Verify exact artifact against authoritative source/version; review drug names, doses, contraindications, interactions/precautions, completeness claims, source locators, clinical currency, and conflict disposition | Artifact claims `40+` drugs and `120+` exam traps while inspected arrays contain 47 drug objects and 20 trap entries; Rosen/Tintinalli relationship is unverified | `REQUIRED / NOT ASSIGNED` | `NOT AVAILABLE` |
| OSCE Atlas Package | Qualified Emergency Medicine clinician/OSCE educator; separate visual/image reviewer and accessibility reviewer where required | Review station-level clinical claims, image interpretation context, source/page locators, educational synthesis, local-protocol conflicts, image identity, visual readability, alt text, contrast, and accessibility | Original PDF absent; Atlas 5e catalog is not proven to match; station text requests educator checking; limited readability notes cover only selected images; professional track unresolved | `REQUIRED / NOT ASSIGNED` | `NOT AVAILABLE` |
| PreTest Question Package | Qualified Emergency Medicine educational reviewer experienced with question-bank/PreTest material; specialty escalation as authorized after source restoration | Review restored source comparison, OCR/extraction corruption, question/answer/explanation traceability, source-versioned locators, clinical accuracy, conflicts, completeness, and professional-track implications | Visible OCR/extraction corruption remains; authoritative `pretestnew.pdf` absent; separate all-chapters artifact relationship is unresolved; external PreTest 5e match is unverified | `REQUIRED / NOT ASSIGNED` | `NOT AVAILABLE` |

## 5. Medical-review evidence requirements

A clinical reviewer must be assigned by the authorized medical owner; this document does not assign a person or imply a credential. The review packet must identify the reviewer role and identity, scope, cited source locations, review date, unresolved issues, conflict-resolution disposition, and decision status. A role placeholder is not a signature, approval, or clinical judgment.

For Drug HTML, the review cannot be treated as complete while the authoritative source and version remain unidentified. For OSCE, clinical review must remain separate from image-rights review, visual review, and accessibility review. For PreTest, source restoration and an immutable comparison against the authoritative source must precede clinical adjudication because the existing representation contains documented OCR/extraction corruption.

## 6. Provenance and audit implications

| Source | Evidence currently available | Missing audit/provenance evidence |
|---|---|---|
| Drug HTML | Local file hash and prior source-review documentation | Extraction actor, timestamp, tool, original source URL/version, source-to-HTML relationship, rights review event, clinical-review event, conflict disposition, and append-only audit record |
| OSCE Atlas | Outer recovery package, inner container hash, text/notes hashes, and 14 PNG hashes | Original PDF/source identity, extraction event details, recovery date/source envelope, image-to-source relation, rights events, clinical/visual/accessibility review events, track decision, and Atlas audit record |
| PreTest | Recovery container hash and exact representation match to `UPD811-007`; separate artifact hash | Authoritative original, extraction/restoration details, OCR comparison event, source-versioned locators, rights review event, clinical review event, separate-lineage disposition, and append-only audit record |

Hashes are retained as integrity evidence. They do not substitute for a provenance event record or a governance approval.

## 7. Final source gate

| Source | Rights gate | Medical-review gate | Final source classification |
|---|---|---|---|
| Drug HTML Artifact | Open: `PENDING_EXTERNAL_EVIDENCE` | Open: reviewer and decision not available | `BLOCKED_PENDING_EVIDENCE` |
| OSCE Atlas Package | Open: owner `UNKNOWN`; license/display `PENDING_EXTERNAL_EVIDENCE` | Open: clinical, visual, and accessibility review not available | `BLOCKED_PENDING_EVIDENCE` |
| PreTest Question Package | Open: `PENDING_EXTERNAL_EVIDENCE` | Open: source restoration and clinical review not available | `BLOCKED_PENDING_EVIDENCE` |

No source reaches `READY_FOR_NORMALIZATION_REVIEW`.

## 8. Next allowed evidence actions

The allowed next action for all three sources is to obtain source-specific identity and rights evidence from a publisher, owner, or authorized custodian. The evidence packet must include a direct artifact-to-source relationship, written usage/display scope, restrictions, attribution requirements, and a rights-review event with an evidence locator.

In parallel, the authorized medical owner may prepare reviewer-role assignments without issuing approval. Drug HTML requires medication/pharmacology review planning. OSCE requires clinical/OSCE, visual, and accessibility reviewer planning. PreTest requires authoritative-source restoration and OCR-comparison planning before clinical review.

## 9. Non-actions

This status report did not:

- modify, rewrite, translate, correct, normalize, or clinically adjudicate any medical content;
- create Prisma models, Zod schemas, database records, content records, Atlas records, or mappings;
- execute SQL, migrations, adapters, seeds, imports, activation, publication, or learner exposure;
- grant rights, assign named reviewers, approve content, or select a professional track;
- modify Supabase, application architecture, authentication, repositories, or deployment assets.

**Final status:** `P0_EXTERNAL_EVIDENCE_CLOSURE_COMPLETE`

## References

[1]: https://shop.elsevier.com/books/rosens-emergency-medicine-concepts-and-clinical-practice/walls/978-0-323-75789-8 "Elsevier: Rosen's Emergency Medicine, 10th Edition"
[2]: https://accessmedicine.mhmedical.com/book.aspx?bookid=2353 "McGraw Hill AccessMedicine: Tintinalli's Emergency Medicine, 9e"
[3]: https://accessemergencymedicine.mhmedical.com/book.aspx?bookid=2969 "McGraw Hill Access: The Atlas of Emergency Medicine, 5e"
[4]: https://www.mheducation.com/highered/mhp/product/pretest-emergency-medicine-fifth-edition.html "McGraw Hill: PreTest Emergency Medicine, Fifth Edition"
[5]: https://accessemergencymedicine.mhmedical.com/qa.aspx?resourceid=3016 "McGraw Hill Access: Emergency Medicine PreTest Self-Assessment and Review, 5e"

Local evidence basis: `SEG_P0_SOURCE_EVIDENCE_COLLECTION_REPORT.md`, `SEG_SOURCE_EVIDENCE_RECOVERY_VALIDATION_REPORT.md`, `SEG_SOURCE_REGISTRY_GOVERNANCE_CLOSURE_REPORT.md`, and `SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md`.

---

**Document control:** Prepared by **Manus AI**. Evidence Management Only. This register records open rights and review requirements; it does not grant permission or clinical approval.
