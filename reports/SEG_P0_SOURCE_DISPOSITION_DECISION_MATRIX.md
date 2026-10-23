# SEG P0 Source Disposition Decision Matrix

**Mode:** `CONTROLLED GOVERNANCE REVIEW`  
**Assessment date:** 2026-08-22  
**Scope:** Drug HTML Artifact, OSCE Atlas Package, and PreTest Question Package  
**Final status:** `P0_SOURCE_DISPOSITION_MATRIX_COMPLETE`

## 1. Executive decision

All three P0 source families remain blocked after the controlled external-evidence closure pass. Their recovered files may be preserved as **internal evidence references only**, under source custody and access controls, but none may be used for learner-facing content, normalization, clinical correction, content mapping, database storage, import, activation, publication, or redistribution.

The current disposition is not a rejection of the underlying sources and is not an instruction to replace them automatically. `REPLACE_SOURCE_REQUIRED` becomes applicable only after an authorized decision owner documents that the source cannot be authenticated, the required rights cannot be obtained, the source is unavailable after a documented recovery effort, or the source-owner evidence conflicts irreconcilably with the artifact. No such replacement decision is created by this matrix.

## 2. Disposition-state definitions

| Allowed usage state | Meaning in this matrix |
|---|---|
| `INTERNAL_REFERENCE_ONLY` | The artifact may remain preserved for evidence custody, integrity verification, and governance investigation. It must not be exposed to learners or used as an approved content source. |
| `WAITING_FOR_EVIDENCE` | The source is pending specific identity, rights, provenance, review, or audit evidence before any promotion decision can be considered. |
| `REPLACE_SOURCE_REQUIRED` | An authorized decision owner has determined that the artifact cannot proceed and a replacement source must be obtained. This state is not assigned automatically by missing evidence alone. |
| `READY_AFTER_APPROVAL` | All required evidence and reviews are complete, and a separate authorized approval exists. None of the three sources is in this state. |

For the three sources in scope, the operational disposition is `INTERNAL_REFERENCE_ONLY`, with a mandatory transition condition of `WAITING_FOR_EVIDENCE`. This means that internal preservation is allowed as evidence handling; no substantive use is allowed while evidence remains open.

## 3. Decision matrix

| Source | Current evidence state | Remaining blockers | Allowed usage state | Required decision owner | Required evidence before promotion |
|---|---|---|---|---|---|
| Drug HTML Artifact | Local artifact is hash-verifiable: 25,918 bytes, 394 lines, SHA-256 `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac`. The file has observable medication-related HTML structure and Rosen/Tintinalli title signals, but no exact authoritative source identity. [1] **Overall governance gate: `BLOCKED_PENDING_EVIDENCE`.** | Canonical title, exact owner/publisher, author, edition/version, date, original locator, artifact-to-source relationship, license/display permission, redistribution limits, clinical reviewer and decision, conflict disposition, professional-track decision, and append-only audit evidence are missing. | `INTERNAL_REFERENCE_ONLY`  
Transition gate: `WAITING_FOR_EVIDENCE` | SEG Source Governance Decision Owner, with authorized Medical Content Owner for the clinical disposition. Rights Reviewer and Emergency Medicine medication/pharmacology Reviewer provide separate evidence; neither role is assigned a named person here. | Source-owner or publisher statement linking the exact HTML to a canonical edition/version; complete bibliographic identity; written rights and display scope; source-versioned locators; qualified clinical review of doses, contraindications, interactions, and completeness conflicts; track decision; conflict and audit records. |
| OSCE Atlas Package | Recovery package and inner OSCE container are hash-verifiable. The inner container SHA-256 is `ca5a7f5713bf5101daa839a546633366d7b5b876604bd3dbf7cea2972d59f66e`; the recovered package includes station text, validation notes, and 14 PNG members. The text names `CopyofEmergency-Medicine-FULL.pdf`, but the original PDF and owner are not supplied. [1] **Overall governance gate: `BLOCKED_PENDING_EVIDENCE`.** | Authoritative source identity, owner/publisher, author, edition/version, date, source-versioned locators, text and image rights, image-level display permission, clinical/OSCE review, visual and accessibility review, professional-track decision, and Atlas audit lineage are missing. The official McGraw Hill Atlas catalog is not proven to match the recovered package.[2] | `INTERNAL_REFERENCE_ONLY`  
Transition gate: `WAITING_FOR_EVIDENCE` | SEG Source Governance Decision Owner, with authorized Medical Content Owner and Atlas/visual governance owner. Rights Reviewer, Emergency Medicine/OSCE Reviewer, Visual Reviewer, and Accessibility Reviewer provide separate evidence. | Authoritative original PDF or independently verifiable source-owner identity; source and image rights; exact locators and lineage; station-level clinical review; separate visual/accessibility review; explicit track decision; image-to-source relationship; audit events; and separate confirmation that recovered assets are not being substituted for managed runtime assets. |
| PreTest Question Package | Recovered inner text SHA-256 `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166` exactly matches the prior intake representation `UPD811-007`. The authoritative `pretestnew.pdf` is absent, and visible OCR/extraction corruption remains documented. McGraw Hill PreTest 5e is a catalog candidate only.[1] [3] [4] **Overall governance gate: `BLOCKED_PENDING_EVIDENCE`.** | Authoritative source, exact publisher/owner, author attribution for the local representation, edition/version, date, original locators, rights, source restoration/comparison evidence, OCR conflict disposition, clinical review, track decision, separate-lineage decision for the all-chapters artifact, and audit evidence are missing. | `INTERNAL_REFERENCE_ONLY`  
Transition gate: `WAITING_FOR_EVIDENCE` | SEG Source Governance Decision Owner, with authorized Medical Content Owner. Rights Reviewer and Emergency Medicine QBank/PreTest Reviewer provide separate evidence after source restoration; no named reviewer is assigned here. | Authoritative `pretestnew.pdf` or independently verifiable equivalent; immutable comparison/restoration record addressing OCR corruption; exact bibliographic identity and locators; source-specific rights; clinical review of questions, answers, explanations, and conflicts; professional-track decision; disposition of the separate all-chapters lineage; and append-only audit events. |

## 4. Source-specific disposition rationale

### 4.1 Drug HTML Artifact

The file-level hash and static structure support preservation as an evidence artifact. They do not support treating the HTML as an approved Rosen or Tintinalli source. The official publisher pages for Rosen and Tintinalli can support further identity investigation, but they do not establish that the local HTML belongs to a particular edition or that SEG has permission to use it.[5] [6]

The correct disposition is therefore `INTERNAL_REFERENCE_ONLY`, not `READY_AFTER_APPROVAL`. The artifact should remain unchanged while source-owner evidence, rights evidence, and an attributable Emergency Medicine medication/pharmacology review are sought. The observed discrepancy between the artifact’s stated counts and inspected arrays is a review issue to preserve, not a basis for rewriting or silently selecting a source.

### 4.2 OSCE Atlas Package

The recovery evidence supports controlled preservation of the package and its 14 PNG members. It does not establish that the package is an authorized Atlas of Emergency Medicine derivative. The public McGraw Hill Atlas page identifies a catalog resource and lists its authors, but it is not evidence that the recovered `CopyofEmergency-Medicine-FULL.pdf` or the PNGs originated from that resource.[2]

The correct disposition is `INTERNAL_REFERENCE_ONLY`, with a `WAITING_FOR_EVIDENCE` transition gate. The package must remain separate from managed published assets, from any Atlas record, and from any Internship or Resident content until original-source identity, image rights, clinical review, visual/accessibility review, and track governance are independently documented.

### 4.3 PreTest Question Package

The exact match to `UPD811-007` establishes representation continuity and supports preservation of the recovered bytes. It does not restore the absent authoritative source, remove the documented OCR/extraction corruption, or prove that the representation is McGraw Hill PreTest 5e. The official PreTest pages are useful candidate identity evidence only.[3] [4]

The correct disposition is `INTERNAL_REFERENCE_ONLY`, with a `WAITING_FOR_EVIDENCE` transition gate. The authoritative source must be restored or independently verified before any correction, comparison, clinical review, or promotion can be considered. The separate all-chapters artifact must remain separate; no merge or replacement is implied.

## 5. Promotion decision rules

A source may not move from `INTERNAL_REFERENCE_ONLY` / `WAITING_FOR_EVIDENCE` to `READY_AFTER_APPROVAL` unless all required evidence streams are complete and independently attributable. The minimum promotion packet must contain the following:

| Evidence stream | Promotion requirement |
|---|---|
| Identity | Exact artifact-to-source relationship, canonical title, owner/publisher, author or organization, edition/version, date, and original locator |
| Provenance | Original source, extraction event, recovery artifact, registry lineage, checksums, and reproducible evidence locations |
| Rights | Ownership evidence, license or permission, educational-use scope, display scope, redistribution restrictions, attribution, and publication limitations |
| Clinical review | Qualified reviewer identity and role, cited locations, review date, findings, conflict disposition, and explicit decision |
| Track/taxonomy | Explicit professional-track decision with no unresolved cross-track conflict |
| Audit | Append-only evidence and review events for collection, identity, rights, clinical review, and disposition |
| Implementation authorization | Separate explicit authorization before any adapter, mapping, database storage, import, activation, publication, or learner exposure |

One passing stream cannot substitute for another. A public product page cannot substitute for a license. A hash cannot substitute for a source identity. A readability note cannot substitute for clinical, accessibility, or rights approval.

## 6. Replacement rule

`REPLACE_SOURCE_REQUIRED` is a governed decision state, not an automatic response to an incomplete evidence package. It may be assigned only by the authorized decision owner after a documented determination that the original cannot be authenticated or recovered, rights are denied or unavailable within the approved effort, or an authoritative source-owner statement establishes that the local artifact is unusable or unauthorized.

If replacement is considered, the original evidence must be preserved, the reason must be recorded, the replacement candidate must undergo a new identity and rights review, and no silent deletion, renaming, merge, or substitution is permitted. Until such a decision exists, the three current artifacts remain `INTERNAL_REFERENCE_ONLY`.

## 7. Current state and next allowed phase

| Source | Current disposition | Learner-facing use | Next allowed phase |
|---|---|---|---|
| Drug HTML | `INTERNAL_REFERENCE_ONLY` / `WAITING_FOR_EVIDENCE` | Not allowed | Targeted source-owner/rights evidence acquisition and reviewer-role preparation |
| OSCE Atlas | `INTERNAL_REFERENCE_ONLY` / `WAITING_FOR_EVIDENCE` | Not allowed | Original-source and image-rights evidence acquisition plus clinical/visual/accessibility reviewer preparation |
| PreTest | `INTERNAL_REFERENCE_ONLY` / `WAITING_FOR_EVIDENCE` | Not allowed | Authoritative source restoration and documented OCR comparison, followed by rights and clinical-review preparation |

No source is eligible for normalization review, content mapping, database storage, import, activation, publication, or learner exposure.

## 8. Non-actions and governance boundary

This matrix did not:

- normalize, rewrite, translate, correct, summarize, or clinically adjudicate medical content;
- create Prisma models, Zod schemas, database objects, content records, Atlas records, or mappings;
- execute SQL, migrations, adapters, seeds, imports, activation, publication, or learner exposure;
- grant rights, assign a named reviewer, approve content, or finalize a professional track;
- delete, rename, merge, replace, or overwrite any source, representation, image, or archive;
- modify Supabase, application architecture, authentication, repositories, or deployment assets.

**Final status:** `P0_SOURCE_DISPOSITION_MATRIX_COMPLETE`

## References

[1]: `/home/ubuntu/seg-internship-output/SEG_P0_EXTERNAL_EVIDENCE_CLOSURE_REPORT.md` "SEG P0 External Evidence Closure Report"
[2]: https://accessemergencymedicine.mhmedical.com/book.aspx?bookid=2969 "McGraw Hill Access: The Atlas of Emergency Medicine, 5e"
[3]: https://www.mheducation.com/highered/mhp/product/pretest-emergency-medicine-fifth-edition.html "McGraw Hill: PreTest Emergency Medicine, Fifth Edition"
[4]: https://accessemergencymedicine.mhmedical.com/qa.aspx?resourceid=3016 "McGraw Hill Access: Emergency Medicine PreTest Self-Assessment and Review, 5e"
[5]: https://shop.elsevier.com/books/rosens-emergency-medicine-concepts-and-clinical-practice/walls/978-0-323-75789-8 "Elsevier: Rosen's Emergency Medicine, 10th Edition"
[6]: https://accessmedicine.mhmedical.com/book.aspx?bookid=2353 "McGraw Hill AccessMedicine: Tintinalli's Emergency Medicine, 9e"

---

**Document control:** Prepared by **Manus AI**. Evidence Management Only. This matrix records future disposition conditions; it does not approve, reject, replace, or activate any source.
