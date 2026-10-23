# SEG P0 Source Identity Register

**Mode:** `CONTROLLED READ-ONLY EVIDENCE CLOSURE`  
**Assessment date:** 2026-08-22  
**Scope:** Drug HTML Artifact, OSCE Atlas Package, and PreTest Question Package  
**Status:** `P0_EXTERNAL_EVIDENCE_CLOSURE_COMPLETE`

## 1. Register purpose

This register records the identity evidence available for the three P0 source families. It distinguishes **artifact identity** from **authoritative source identity**. A file hash confirms the bytes of an observed local file or recovered package; it does not confirm the original publisher, edition, rights, authenticity, or clinical status.

The external publisher pages reviewed in this pass are retained as candidate identity evidence only. They are not treated as source-specific permissions and do not establish that any local artifact is an authorized copy or derivative.

## 2. Identity register

| Source family | SEG/source identifier | Local artifact or package | Canonical title status | Publisher/owner status | Author/organization status | Edition/version status | Date status | Original locator status | Evidence confidence | Current identity gate |
|---|---|---|---|---|---|---|---|---|---|---|
| Drug HTML Artifact | No governed source ID supplied | `deepseek_html_20260615_a3266b.html`; SHA-256 `5367711d08df2393cf852815b1b9d0ad4dac8240ac061cd88c71a53884e938ac` | Local Arabic title signal observed; authoritative canonical title not available | Exact local owner not available; Rosen/Tintinalli catalog products are candidate references only [1] [2] | No attributable local author; official product authors are not attributable to the HTML | Not available | Filename date signal only; not verified as publication date | No authoritative URL, ISBN, page, chapter, or versioned locator | `PARTIALLY_CONFIRMED` candidate signal; `NOT_AVAILABLE` exact source identity | `BLOCKED_PENDING_EVIDENCE` |
| OSCE Atlas Package | Prior requested label `ATLAS_ASSET_OSCE_VISUAL_001`; no authoritative source ID established | `OSCE_Emergency_Medicine_Imaging_Section_Package.zip`; SHA-256 `ca5a7f5713bf5101daa839a546633366d7b5b876604bd3dbf7cea2972d59f66e`; 14 PNGs and text/notes members | Recovered text title observed: `EMERGENCY MEDICINE OSCE IMAGING SECTION — Bilingual Station-Based Study Guide`; original canonical title not available | Original PDF `CopyofEmergency-Medicine-FULL.pdf` is named but owner is not established; McGraw Hill Atlas 5e is a separate catalog candidate only [3] | Not supplied | Not supplied | No verified publication or extraction date | Filename signal only; authoritative PDF/page/edition locator not available | `PARTIALLY_CONFIRMED` recovery identity; `NOT_AVAILABLE` authoritative source identity | `BLOCKED_PENDING_EVIDENCE` |
| PreTest Question Package | `UPD811-007` for the prior intake representation | `pretestnew_Study_Guide_SEPARATE_Package.zip`; container SHA-256 `83911dd03c31470f3982dc6541d2e317f222f36433e10804bd8ff545ffe3f755`; inner text SHA-256 `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166` | PreTest naming signal and McGraw Hill PreTest 5e catalog identity are partially aligned, but the local canonical source title is not restored [4] [5] | McGraw Hill is a catalog-level candidate for PreTest 5e; exact local artifact owner is not confirmed [4] [5] | Adam J. Rosh and Ciara J. Barclay-Buchanan are listed on the official PreTest pages, but local attribution is not established [4] [5] | Local edition/version not available; 5th Edition is an external candidate only [4] [5] | No verified date for local source | Required `pretestnew.pdf` absent; source-versioned page/question locators unavailable | `CONFIRMED` representation identity; `PARTIALLY_CONFIRMED` external candidate; `NOT_AVAILABLE` exact source identity | `BLOCKED_PENDING_EVIDENCE` |

## 3. Source-specific identity evidence

### 3.1 Drug HTML Artifact

The local artifact contains the observed title signal `الملخص الشامل لروزن وتينتينالي – الأدوية، الجرعات، الموانع`. The title references Rosen and Tintinalli, but there is no owner statement, author attribution, edition, verified date, or original locator in the supplied artifact evidence. The official Elsevier page identifies *Rosen’s Emergency Medicine: Concepts and Clinical Practice*, 10th Edition, while the McGraw Hill page identifies *Tintinalli’s Emergency Medicine: A Comprehensive Study Guide*, 9e.[1] [2] These pages establish that the named products exist; they do not identify the local HTML as belonging to either edition.

**Identity state:** `PARTIALLY_CONFIRMED` for the local title signal and external candidate references; `NOT_AVAILABLE` for the exact authoritative source.

### 3.2 OSCE Atlas Package

The recovered text identifies the artifact as an emergency-medicine OSCE imaging section and names `CopyofEmergency-Medicine-FULL.pdf` as the asserted original source. The PDF itself, its owner, author, edition, date, and source-versioned locator were not supplied. McGraw Hill’s official catalog identifies *The Atlas of Emergency Medicine, 5e* and lists Kevin J. Knoop, Lawrence B. Stack, Alan B. Storrow, and R. Jason Thurman.[3] The catalog evidence is retained as a possible investigation lead only; it does not demonstrate that the recovered OSCE package or its 14 PNGs came from that Atlas.

**Identity state:** `PARTIALLY_CONFIRMED` for the recovered package identity; `NOT_AVAILABLE` for the authoritative original source.

### 3.3 PreTest Question Package

The SHA-256 of the recovered inner study-guide text exactly matches the previously registered `UPD811-007` representation. This confirms representation continuity, not original-source authenticity. McGraw Hill’s official pages identify *PreTest Emergency Medicine, Fifth Edition* and *Emergency Medicine PreTest Self-Assessment and Review, 5e*, listing Adam J. Rosh and Ciara J. Barclay-Buchanan.[4] [5] The local `pretestnew` artifact is not independently tied to that edition, and the authoritative `pretestnew.pdf` remains unavailable.

**Identity state:** `CONFIRMED` for the recovered representation’s match to `UPD811-007`; `PARTIALLY_CONFIRMED` for the external PreTest candidate; `NOT_AVAILABLE` for the exact authoritative source.

## 4. Missing identity evidence required for closure

| Source | Required evidence still missing |
|---|---|
| Drug HTML | A source-owner or publisher statement linking the exact HTML or its underlying source to a canonical title, author/organization, edition/version, date, and original locator; evidence explaining the Rosen/Tintinalli relationship |
| OSCE Atlas | The authoritative original PDF or independently verifiable source-owner statement; canonical title, publisher/owner, author, edition/version, date, source-versioned page/chapter locators, and evidence linking the 14 PNGs and station text to that source |
| PreTest | The authoritative `pretestnew.pdf` or independently verifiable equivalent; canonical title, publisher/owner, author, edition/version, date, source-versioned question/page locators, and evidence linking the local representation to the external PreTest product |

## 5. Closure rule and next allowed action

No identity row may be promoted to `CONFIRMED` for the authoritative source until the exact local artifact-to-source relationship is independently verifiable. The next allowed action is evidence acquisition from the source owner, publisher, or authorized custodian, followed by a separate rights review and clinical-review packet. No normalization, content mapping, database record, import, activation, or learner exposure is allowed.

## References

[1]: https://shop.elsevier.com/books/rosens-emergency-medicine-concepts-and-clinical-practice/walls/978-0-323-75789-8 "Elsevier: Rosen's Emergency Medicine, 10th Edition"
[2]: https://accessmedicine.mhmedical.com/book.aspx?bookid=2353 "McGraw Hill AccessMedicine: Tintinalli's Emergency Medicine, 9e"
[3]: https://accessemergencymedicine.mhmedical.com/book.aspx?bookid=2969 "McGraw Hill Access: The Atlas of Emergency Medicine, 5e"
[4]: https://www.mheducation.com/highered/mhp/product/pretest-emergency-medicine-fifth-edition.html "McGraw Hill: PreTest Emergency Medicine, Fifth Edition"
[5]: https://accessemergencymedicine.mhmedical.com/qa.aspx?resourceid=3016 "McGraw Hill Access: Emergency Medicine PreTest Self-Assessment and Review, 5e"

Local evidence basis: `SEG_P0_SOURCE_EVIDENCE_COLLECTION_REPORT.md`, `SEG_SOURCE_EVIDENCE_RECOVERY_VALIDATION_REPORT.md`, `SEG_SOURCE_REGISTRY_GOVERNANCE_CLOSURE_REPORT.md`, and `SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md`.

---

**Document control:** Prepared by **Manus AI**. Evidence Management Only. This register does not create or approve a source record.
