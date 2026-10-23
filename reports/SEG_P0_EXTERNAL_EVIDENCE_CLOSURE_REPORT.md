# SEG P0 External Evidence Closure Report

**Mode:** `CONTROLLED READ-ONLY EVIDENCE CLOSURE`  
**Assessment date:** 2026-08-22  
**Scope:** Drug HTML Artifact, OSCE Atlas Package, and PreTest Question Package  
**Final status:** `P0_EXTERNAL_EVIDENCE_CLOSURE_COMPLETE`

## 1. Executive decision

This pass reviewed the available local evidence and additional public publisher-side evidence for the three P0 source families. The external pages provide useful **catalog-level identity signals** for Rosen’s Emergency Medicine, Tintinalli’s Emergency Medicine, The Atlas of Emergency Medicine, and Emergency Medicine PreTest. They do not establish that the supplied Drug HTML, recovered OSCE package, or recovered PreTest representation is an authorized copy or derivative of any one of those products. They also do not provide a source-specific license, display permission, redistribution permission, or clinical approval for the local artifacts.

Accordingly, the evidence closure pass is complete, but no source reaches `READY_FOR_NORMALIZATION_REVIEW`. The final gate for all three sources remains `BLOCKED_PENDING_EVIDENCE`. The next allowed step is targeted acquisition of source-specific ownership/licensing and authoritative source-package evidence, followed by separate clinical and rights review. Normalization, content mapping, database creation, import, activation, publication, and learner exposure remain prohibited.

## 2. Governing standard and evidence semantics

The governing sequence remains:

> **Original Source → Version → Governance Record → Clinical Review → Approval → Activation**

The following distinctions are mandatory:

| State | Meaning in this report |
|---|---|
| `CONFIRMED` | The requested source fact is directly and independently evidenced for the exact local source/package. |
| `PARTIALLY_CONFIRMED` | An external catalog or local representation supports a candidate identity, but the exact artifact-to-source relationship or required field remains unresolved. |
| `NOT_AVAILABLE` | No independently verifiable evidence for the exact requested fact was found. |
| `PENDING_EXTERNAL_EVIDENCE` | Rights evidence is not sufficient for a decision and must be supplied by an owner, publisher, or authorized rights reviewer. |
| `UNKNOWN` | The responsible owner or rights position cannot presently be identified from the evidence set. |
| `BLOCKED_PENDING_EVIDENCE` | A governance-critical identity, rights, provenance, review, or audit requirement remains open. |

A publisher catalog page is not treated as a license. A copyright notice is not treated as permission to copy, display, redistribute, or publish a local artifact. A public product description is not treated as clinical review of the SEG artifact.

## 3. Evidence inputs and integrity

| Evidence input | Result used in this closure pass |
|---|---|
| Drug HTML `deepseek_html_20260615_a3266b.html` | 25,918 bytes; 394 lines; SHA-256 `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac`; 19 observed sections, 47 `drugList` entities, and 20 `trapsList` entries |
| OSCE recovery container | `OSCE_Emergency_Medicine_Imaging_Section_Package.zip`; 4,254,983 bytes; SHA-256 `ca5a7f5713bf5101daa839a546633366d7b5b876604bd3dbf7cea2972d59f66e` |
| OSCE recovered members | Station text SHA-256 `c5e53a1b3df0b5aaaf9a21326981ccd8f1ffdadbfcdac01c4078940734283f2d`; validation-notes SHA-256 `ac343825616ae93d78c2b14aa01741b04a4405434b67ec9a2e71a57ac2b3e4bf8`; 14 PNG members individually hashed |
| Recovery package | `SEG_SOURCE_EVIDENCE_RECOVERY_PACKAGE_v1.0.zip`; 4,617,068 bytes; SHA-256 `8182d243fc762e29efba5adeda4233042f5e337846b3fbe819fcd374ef948758` |
| PreTest recovered representation | Container SHA-256 `83911dd03c31470f3982dc6541d2e317f222f36433e10804bd8ff545ffe3f755`; inner text 131,490 bytes; SHA-256 `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166`, exactly matching the prior `UPD811-007` representation |
| Separate PreTest artifact | 451,668 bytes; SHA-256 `29624c9c37f0e5f8e103125be783743a879a42b03d0c1cd0031d60654064e5f0`; kept as a separate lineage |

The hashes establish the identity of observed local files and recovered members. They do not establish source ownership, authenticity, edition, rights, or clinical correctness.

## 4. External evidence reviewed

| External source | Observed evidence | Closure limitation |
|---|---|---|
| Elsevier, *Rosen’s Emergency Medicine: Concepts and Clinical Practice* | Official page identifies a 2-volume 10th Edition dated June 13, 2022 and lists Ron Walls, Robert Hockberger, Marianne Gausche-Hill, Timothy B. Erickson, and Susan R. Wilcox.[5] | No link to the local Drug HTML, no source-specific license, and no evidence that the local artifact is from this edition |
| McGraw Hill AccessMedicine, *Tintinalli’s Emergency Medicine: A Comprehensive Study Guide, 9e* | Official page identifies the 9e title and lists Judith E. Tintinalli, O. John Ma, Donald M. Yealy, Garth D. Meckler, J. Stephan Stapczynski, David M. Cline, and Stephen H. Thomas.[6] | No link to the local Drug HTML and no permission for local reproduction or display |
| McGraw Hill, *PreTest Emergency Medicine, Fifth Edition* | Official page identifies the 5th Edition, Adam J. Rosh and Ciara Barclay-Buchanan, ISBN-10 `1260468941`, and ISBN-13 `9781260468946`.[7] | No evidence that the recovered `UPD811-007` representation or `pretestnew` source is this edition; no local-use license |
| McGraw Hill Access, *Emergency Medicine PreTest Self-Assessment and Review, 5e* | Official platform identifies PreTest 5e and the same two authors.[8] | Platform catalog evidence only; it does not identify the local representation or grant copying/display rights |
| McGraw Hill Access, *The Atlas of Emergency Medicine, 5e* | Official page identifies the Atlas 5e and lists Kevin J. Knoop, Lawrence B. Stack, Alan B. Storrow, and R. Jason Thurman.[9] | The recovered OSCE text names `CopyofEmergency-Medicine-FULL.pdf`, not this catalog title; no evidence that the 14 PNGs originate from this Atlas and no image license |
| McGraw Hill Tintinalli copyright page | Official copyright page provides a citation for Tintinalli 9e, identifies McGraw-Hill Education and 2020, and shows ISBN `978-1-260-01993-3`.[10] | Copyright ownership context is not a license for the local HTML or any recovered artifact |

## 5. Source A — Drug HTML Artifact

### 5.1 Source identity closure

| Field | Closure finding | State |
|---|---|---|
| Canonical title | The local HTML contains the observed Arabic title signal `الملخص الشامل لروزن وتينتينالي – الأدوية، الجرعات، الموانع`. This is not a verified canonical bibliographic title. | `PARTIALLY_CONFIRMED` as a local title signal; exact canonical identity `NOT_AVAILABLE` |
| Original publisher/owner | Elsevier and McGraw Hill official pages verify the existence of Rosen and Tintinalli products, but no evidence identifies the local HTML owner or confirms its origin.[5] [6] | `NOT_AVAILABLE` for the local artifact |
| Author/organization | No local author statement; official product authors are not attributable to the local HTML. | `NOT_AVAILABLE` |
| Edition/version | No edition or version in the local artifact. Official pages identify candidate editions only. | `NOT_AVAILABLE` |
| Publication date | The filename contains `20260615`; it is not verified as a publication or release date. | `NOT_AVAILABLE` |
| Original source locator | No authoritative URL, ISBN, page, chapter, or source-versioned locator for the local HTML. | `NOT_AVAILABLE` |
| Artifact identity | 25,918 bytes; 394 lines; SHA-256 `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac`. | `CONFIRMED` for the observed file only |
| Evidence confidence | External Rosen/Tintinalli candidate identity is catalog-supported; exact local artifact identity is not. | `PARTIALLY_CONFIRMED` candidate / `NOT_AVAILABLE` exact source |

### 5.2 Rights closure

| Rights field | Evidence | State |
|---|---|---|
| Ownership evidence | No owner/rightsholder statement in the artifact; publisher pages evidence ownership context for products but not for this file. | `PENDING_EXTERNAL_EVIDENCE` |
| License evidence | No license, permission letter, written grant, or source-specific terms supplied. | `PENDING_EXTERNAL_EVIDENCE` |
| Educational usage rights | Not established for the local HTML. | `PENDING_EXTERNAL_EVIDENCE` |
| Redistribution restrictions | Not established. | `PENDING_EXTERNAL_EVIDENCE` |
| Publication/display limitations | Not established; absence of a restriction statement is not permission. | `PENDING_EXTERNAL_EVIDENCE` |

### 5.3 Provenance closure

```text
Original Source
  → Rosen/Tintinalli are observed title signals only
  → Exact original edition, owner, and locator NOT AVAILABLE

Extraction Event
  → Derived HTML with embedded JavaScript arrays is present
  → Actor, timestamp, tool, source URL, source version, and extraction locator NOT AVAILABLE

Recovered Artifact
  → Local HTML is available and hash-verified
  → No Drug HTML member is present in the named recovery package
  → Recovery date NOT AVAILABLE

SEG Registry Entry
  → Prior Drug HTML source review exists as evidence documentation
  → No production source record, content record, mapping, or activation exists
```

**Lineage confidence:** `LOW`. The local file is reproducible, but the original-to-extraction relationship is not independently evidenced.

### 5.4 Medical-review requirements

The required review profile is a qualified **Emergency Medicine clinical reviewer with medication/pharmacology competence**. Section-specific review may require toxicology, critical care, resuscitation, pediatric, obstetric, or other domain expertise, but no named reviewer is assigned here.

The review scope must cover the exact artifact, source-versioned citations, dose and contraindication claims, interaction or precaution statements, completeness claims, internal count discrepancies, and any conflicts between the observed title signals and authoritative source editions. Known evidence conflicts include the artifact’s claims of `40+` drugs and `120+` exam traps versus the inspected arrays containing 47 drug objects and 20 trap entries. These are unresolved evidence-quality issues, not clinical findings.

**Reviewer assignment status:** `REQUIRED / NOT ASSIGNED`.  
**Clinical decision:** `NOT AVAILABLE`.  
**Approval evidence:** `NOT AVAILABLE`.

### 5.5 Final source gate

**Final classification:** `BLOCKED_PENDING_EVIDENCE`  
**Reason:** Exact source identity, source-specific rights, source-versioned locators, attributable clinical review, conflict disposition, and audit evidence are missing.

**Next allowed action:** Obtain a source-owner or publisher statement linking the artifact to a canonical edition/version, obtain written rights/display evidence, and prepare a role-based clinical review packet. No dose correction, normalization, mapping, import, or activation is allowed.

## 6. Source B — OSCE Atlas Package

### 6.1 Source identity closure

| Field | Closure finding | State |
|---|---|---|
| Canonical title | Recovered text title: `EMERGENCY MEDICINE OSCE IMAGING SECTION — Bilingual Station-Based Study Guide`. It is an observed recovered-artifact title, not a verified original title. | `PARTIALLY_CONFIRMED` artifact signal |
| Original publisher/owner | The recovered text names `CopyofEmergency-Medicine-FULL.pdf`, but the PDF, owner, publisher, author, edition, and source locator are absent. The official McGraw Hill Atlas 5e page is a separate catalog candidate, not a match.[9] | `NOT_AVAILABLE` |
| Author/organization | Not supplied. | `NOT_AVAILABLE` |
| Edition/version | Not supplied. | `NOT_AVAILABLE` |
| Publication date | Archive timestamps do not establish source publication or extraction date. | `NOT_AVAILABLE` |
| Original source locator | `CopyofEmergency-Medicine-FULL.pdf` is a filename signal only; authoritative page/chapter/edition locators are absent. | `NOT_AVAILABLE` |
| Recovered package identity | Inner ZIP SHA-256 `ca5a7f5713bf5101daa839a546633366d7b5b876604bd3dbf7cea2972d59f66e`; station text SHA-256 `c5e53a1b3df0b5aaaf9a21326981ccd8f1ffdadbfcdac01c4078940734283f2d`; 14 PNGs present and hashed. | `CONFIRMED` for recovered package members only |
| Evidence confidence | Recovery evidence is strong; authoritative source identity is unavailable. | `PARTIALLY_CONFIRMED` recovery / `NOT_AVAILABLE` original source |

### 6.2 Rights closure

| Rights field | Evidence | State |
|---|---|---|
| Ownership evidence | No owner or publisher identified for `CopyofEmergency-Medicine-FULL.pdf` or the recovered OSCE package. | `UNKNOWN` |
| License evidence | No text, station, diagram, or image license supplied. | `PENDING_EXTERNAL_EVIDENCE` |
| Educational usage rights | Not established. | `PENDING_EXTERNAL_EVIDENCE` |
| Redistribution restrictions | Not established. | `PENDING_EXTERNAL_EVIDENCE` |
| Publication/display limitations | No permission for the 14 PNGs or station text is documented. | `PENDING_EXTERNAL_EVIDENCE` |

The official Atlas 5e catalog page establishes that a McGraw Hill Atlas resource exists and lists its authors, but it does not prove that the recovered package originates from it or authorize reproduction.[9]

### 6.3 Provenance closure

```text
Original Source
  → `CopyofEmergency-Medicine-FULL.pdf` named in recovered text
  → PDF, owner, edition, date, and authoritative locator NOT AVAILABLE

Extraction Event
  → Recovered text states that selected diagrams/pages were extracted and synthesized into OSCE stations
  → Actor, timestamp, tool, source version, and reproducible locator NOT AVAILABLE

Recovered Artifact
  → Outer recovery package SHA-256 `8182d243...`
  → Inner OSCE container SHA-256 `ca5a7f57...`
  → One station text artifact, validation notes, and fourteen PNGs are present and hashed
  → Recovery date NOT AVAILABLE from the supplied source envelope

SEG Registry Entry
  → Prior package-availability blocker is superseded by recovery evidence
  → Current state remains `PARTIALLY_RECOVERED / BLOCKED_PENDING_EXTERNAL_EVIDENCE`
  → No Atlas record, N:M link, import, or activation exists
```

**Lineage confidence:** `MEDIUM` for the recovered-package chain; `LOW` for the original-source-to-extraction relationship.

### 6.4 Medical-review requirements

The required clinical reviewer is a qualified **Emergency Medicine clinician/OSCE educator**. The review scope must cover station-level clinical claims, image interpretation context, source-versioned locators, educational synthesis boundaries, local-protocol conflicts, and the separation of clinical review from rights, visual, and accessibility review.

The recovered text itself requests checking against current local protocols and a supervising emergency-medicine educator. The `visual_validation_notes.txt` evidence records readability observations for two named PNGs, but it is not a clinical review, rights decision, accessibility approval, or source-identity decision. A separate visual/image review and accessibility review are required for any future learner-facing use.

**Reviewer assignment status:** `REQUIRED / NOT ASSIGNED`.  
**Known conflicts:** Original PDF absent; catalog Atlas 5e not proven to match; image-level rights absent; track remains unresolved between Internship and Resident contexts.  
**Clinical decision:** `NOT AVAILABLE`.

### 6.5 Final source gate

**Final classification:** `BLOCKED_PENDING_EVIDENCE`  
**Reason:** Original-source identity, owner, edition/version, rights for text and images, clinical review, visual/accessibility review, professional-track decision, and Atlas audit evidence are missing.

**Next allowed action:** Obtain the authoritative original PDF or an independently verifiable publisher/source-owner identity, image-level rights, and review assignments. Keep the recovered package separate from managed runtime assets and from any Internship/Resident content until an explicit governed relationship is supplied. No Atlas record or Atlas-to-content link may be created.

## 7. Source C — PreTest Question Package

### 7.1 Source identity closure

| Field | Closure finding | State |
|---|---|---|
| Registered source ID | `UPD811-007` remains the intake-local representation identifier. | `CONFIRMED` for prior registry representation |
| Canonical title | Local naming signals `pretestnew` and `pretestnew_Study_Guide_UTF8.txt`; original title is not independently restored. McGraw Hill identifies a separate *PreTest Emergency Medicine, Fifth Edition*.[7] | `PARTIALLY_CONFIRMED` candidate / exact source `NOT_AVAILABLE` |
| Original publisher/owner | McGraw Hill is an official publisher candidate for the named PreTest 5e product, but no evidence ties that product to the recovered representation. | `PARTIALLY_CONFIRMED` candidate / exact source `NOT_AVAILABLE` |
| Author/organization | Official PreTest 5e page lists Adam J. Rosh and Ciara J. Barclay-Buchanan.[7] The local representation does not independently attribute itself to them. | `PARTIALLY_CONFIRMED` candidate / exact source `NOT_AVAILABLE` |
| Edition/version | Local source edition is not supplied. Official page identifies 5th Edition only as a candidate. | `NOT_AVAILABLE` |
| Publication date | No verified date for the local source. | `NOT_AVAILABLE` |
| Original source locator | `pretestnew.pdf` is required but absent; source-versioned page/question locators are not available. | `NOT_AVAILABLE` |
| Representation identity | Inner text SHA-256 `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166` exactly matches the previous `UPD811-007` representation. | `CONFIRMED` for representation identity |
| Separate artifact | All-chapters artifact SHA-256 `29624c9c37f0e5f8e103125be783743a879a42b03d0c1cd0031d60654064e5f0` remains a separate lineage. | `CONFIRMED` as separate evidence item |
| Evidence confidence | Representation identity is strong; exact original-source identity is not established. | `PARTIALLY_CONFIRMED` representation / `NOT_AVAILABLE` exact source |

### 7.2 Rights closure

| Rights field | Evidence | State |
|---|---|---|
| Ownership evidence | McGraw Hill product pages identify the publisher-side PreTest product, but not the local artifact.[7] [8] | `PENDING_EXTERNAL_EVIDENCE` |
| License evidence | No source-specific license or permission supplied. | `PENDING_EXTERNAL_EVIDENCE` |
| Educational usage rights | Not established for the local representation. | `PENDING_EXTERNAL_EVIDENCE` |
| Redistribution restrictions | Not established. | `PENDING_EXTERNAL_EVIDENCE` |
| Publication/display limitations | Not established; a matching representation hash is not permission. | `PENDING_EXTERNAL_EVIDENCE` |

### 7.3 Provenance closure

```text
Original Source
  → `pretestnew.pdf` is required but NOT PRESENT
  → McGraw Hill PreTest 5e is an external candidate identity only
  → Owner, edition, date, and authoritative locator for the local source NOT AVAILABLE

Extraction Event
  → Prior intake representation `UPD811-007` exists
  → OCR/extraction corruption is documented
  → Actor, timestamp, tool, source version, and restoration event NOT AVAILABLE

Recovered Artifact
  → `pretestnew_Study_Guide_SEPARATE_Package.zip` SHA-256 `83911dd0...`
  → Inner text SHA-256 `b4ba8487...` exactly matches `UPD811-007`
  → Separate all-chapters artifact SHA-256 `29624c9c...` remains unmerged
  → Recovery date NOT AVAILABLE from the source envelope

SEG Registry Entry
  → `UPD811-007` remains intake-local and non-approved
  → Current state remains `RECOVERED_REPRESENTATION_CONFIRMED / BLOCKED_PENDING_SOURCE_RESTORATION_AND_GOVERNANCE_CLOSURE`
  → No content record, mapping, import, or activation exists
```

**Lineage confidence:** `MEDIUM` for the recovered-representation-to-`UPD811-007` relationship; `LOW` for the authoritative-original relationship.

### 7.4 Medical-review requirements

The required reviewer is a qualified **Emergency Medicine educational reviewer experienced with question-bank/pretest material**. The review scope must include restoration evidence, comparison against the authoritative source, OCR/extraction conflict disposition, question/answer and explanation traceability, source-versioned locators, professional-track implications, and any clinical claims requiring specialty escalation.

The known clinical-governance conflict is that visible OCR/extraction corruption remains in the representation while the authoritative original is absent. The separate all-chapters artifact must not be merged or used as a correction source without a documented, authorized source comparison.

**Reviewer assignment status:** `REQUIRED / NOT ASSIGNED`.  
**Clinical decision:** `NOT AVAILABLE`.  
**Approval evidence:** `NOT AVAILABLE`.

### 7.5 Final source gate

**Final classification:** `BLOCKED_PENDING_EVIDENCE`  
**Reason:** The exact original source, edition/version, owner, locators, rights, restoration comparison, clinical review, conflict disposition, track decision, and audit evidence remain open.

**Next allowed action:** Obtain the authoritative `pretestnew.pdf` or independently verifiable source package, document an immutable restoration comparison, obtain rights evidence, and prepare a separate clinical-review packet. Keep both recovered representations separate until the relationship is explicitly evidenced. No correction, normalization, mapping, import, or activation is allowed.

## 8. Cross-source gate summary

| Source | Identity state | Rights state | Provenance confidence | Medical review | Final gate |
|---|---|---|---|---|---|
| Drug HTML | Candidate references partially supported; exact local source identity unavailable | `PENDING_EXTERNAL_EVIDENCE` | `LOW` | Required, not assigned | `BLOCKED_PENDING_EVIDENCE` |
| OSCE Atlas | Recovery confirmed; authoritative source identity unavailable | `UNKNOWN` / `PENDING_EXTERNAL_EVIDENCE` | `MEDIUM` recovery, `LOW` original link | Required, not assigned | `BLOCKED_PENDING_EVIDENCE` |
| PreTest | Representation identity confirmed; exact original source unavailable | `PENDING_EXTERNAL_EVIDENCE` | `MEDIUM` representation, `LOW` original link | Required, not assigned | `BLOCKED_PENDING_EVIDENCE` |

No source meets the criteria for `READY_FOR_NORMALIZATION_REVIEW`.

## 9. Closure requirements for the next gate

The next evidence package must provide, for each source, a source-owner or publisher statement that identifies the exact artifact or source edition; canonical title; author or organization; edition/version; publication date; original locator; and a reproducible relationship between the external source and the local hash. It must also provide a written license or permission with text/image scope, educational-use terms, display permission, redistribution restrictions, attribution requirements, and publication limitations.

The review packet must be separate from rights evidence and must identify the required reviewer role, reviewer identity once supplied by the authorized owner, review scope, cited locations, date, conflicts, disposition, and append-only audit events. A public catalog page may support identity investigation but cannot substitute for these source-specific items.

## 10. Non-actions and governance boundary

This closure pass did not:

- modify, rewrite, translate, correct, normalize, or clinically adjudicate any medical content;
- delete, rename, merge, replace, or overwrite any source, representation, image, or archive;
- create Prisma models, Zod schemas, database objects, production records, content records, Atlas records, or mappings;
- execute SQL, migrations, adapters, seeds, imports, activation, publication, or learner exposure;
- grant rights, complete clinical review, assign named reviewers, approve content, or select a professional track;
- modify Supabase, application architecture, authentication, repositories, or deployment assets.

**Final status:** `P0_EXTERNAL_EVIDENCE_CLOSURE_COMPLETE`

This status means that the external-evidence review and closure report are complete. It does not mean that any of the three source families is governance-ready.

## References

[1]: `/home/ubuntu/seg-internship-output/SEG_P0_SOURCE_EVIDENCE_COLLECTION_REPORT.md` "SEG P0 Source Evidence Collection Report"
[2]: `/home/ubuntu/seg-internship-output/SEG_SOURCE_EVIDENCE_RECOVERY_VALIDATION_REPORT.md` "SEG Source Evidence Recovery Validation Report"
[3]: `/home/ubuntu/seg-internship-output/SEG_SOURCE_REGISTRY_GOVERNANCE_CLOSURE_REPORT.md` "SEG Source Registry Governance Closure Report"
[4]: `/home/ubuntu/seg-internship-output/SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md` "SEG Phase 7.8.11 Updated Source Registry"
[5]: https://shop.elsevier.com/books/rosens-emergency-medicine-concepts-and-clinical-practice/walls/978-0-323-75789-8 "Elsevier: Rosen's Emergency Medicine, 10th Edition"
[6]: https://accessmedicine.mhmedical.com/book.aspx?bookid=2353 "McGraw Hill AccessMedicine: Tintinalli's Emergency Medicine, 9e"
[7]: https://www.mheducation.com/highered/mhp/product/pretest-emergency-medicine-fifth-edition.html "McGraw Hill: PreTest Emergency Medicine, Fifth Edition"
[8]: https://accessemergencymedicine.mhmedical.com/qa.aspx?resourceid=3016 "McGraw Hill Access: Emergency Medicine PreTest Self-Assessment and Review, 5e"
[9]: https://accessemergencymedicine.mhmedical.com/book.aspx?bookid=2969 "McGraw Hill Access: The Atlas of Emergency Medicine, 5e"
[10]: https://accessmedicine.mhmedical.com/content.aspx?bookid=2353&sectionid=183421313 "McGraw Hill AccessMedicine: Tintinalli 9e Copyright Page"

---

**Document control:** Prepared by **Manus AI**. Evidence Management Only. No source governance gate was closed by this report.
