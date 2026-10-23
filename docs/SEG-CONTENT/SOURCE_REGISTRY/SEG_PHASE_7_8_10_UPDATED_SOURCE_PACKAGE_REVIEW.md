# SEG PHASE 7.8.10 — UPDATED LEGACY SOURCE PACKAGE REVIEW

**Mode:** Controlled source intake and read-only governance review
**Decision scope:** Assess whether `كتبعلاءنصدراسي.zip` may replace the previously retained legacy source package.
**Final decision:** `NOT_YET_ADOPTED_AS_REPLACEMENT`
**Current source state:** `UPDATED_SOURCE_CANDIDATE — BLOCKED_PENDING_SOURCE_REPLACEMENT_GATES`

## 1. Executive decision

The uploaded archive is a materially useful **updated source package candidate** containing study-book text, question-and-explanation material, PDF exports, and editable DOCX representations. It must **not replace, delete, overwrite, rename, merge, or supersede the previously retained legacy sources at this time**.

The package can be registered as a new, separately fingerprinted source version for controlled metadata review. It cannot yet be treated as the authoritative replacement because the supplied evidence does not close the required provenance, version/edition, rights/display, track/taxonomy, clinical-review, or identity gates. The archive contains no literal `SRC-*` or `CAND-*` staging identifiers, so it does not close the Phase 7.8.8/7.8.9 identity blocker.

This is a source-governance decision, not a clinical judgment about the medical correctness of the material. No medical claims were corrected, approved, activated, or published by this review.

## 2. Package identity and preservation

The supplied archive is preserved at `/home/ubuntu/upload/كتبعلاءنصدراسي.zip`. Its SHA-256 is `34650a96c8b244c65a0bfb4969a658df1c9d45220636c9ed661b11acf2358bf3`, and its size is 8,962,439 bytes. A read-only extraction was placed in `/home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake/`; the extraction is an intake workspace, not a production or import directory.

The archive contains twelve supplied content artifacts. The extracted workspace also contains a generated checksum manifest, which is an audit sidecar and not source content. The FRCEM high-yield TXT appears twice inside the archive and the two copies are byte-identical with SHA-256 `f5fb6b3f88b94a1b5a1a360acfe4616a5b3a5940a4b0854a35ba646f5f95a4a1`. This is retained as duplicate representation evidence; it is not silently merged into the old source package.

## 3. Artifact inventory and controlled classification

The table below describes the supplied artifacts at the layer level only. It does not assign a SEG professional track, clinical approval, rights decision, or production content type.

| Supplied artifact | Observed evidence | Provisional layer | Governance state |
|---|---|---|---|
| `FRCEM_High_Yield_Study_Book.txt` and duplicate copy | States “Comprehensive Deduplicated Study Book,” prepared for Dr. Alaa Al-Asfar, and a synthesis of 1,529 source questions across 32 chapters. | Derived study-book / question-bank enrichment; external-reference-based or mixed until provenance is separated. | `VERSION_UNRESOLVED`, `RIGHTS_PENDING`, `PENDING_CLINICAL_REVIEW` |
| `FRCEM_High_Yield_Study_Book_Colored.pdf` | 258 pages; cover states 32 chapters and 1,529 source questions; Producer is WeasyPrint 69.0. | Presentation representation of the FRCEM study-book artifact. | Same lineage as the text only if an explicit version record confirms it; otherwise separate representations remain. |
| `FRCEM_High_Yield_Study_Book_Editable.docx` | Editable DOCX representation; core creator metadata is `python-docx`. | Editable representation of the study-book artifact. | `SOURCE_VERSION_UNRESOLVED`; no rights or publisher evidence observed in core properties. |
| `frcem All_Chapters_Questions_and_Explanations_Full.txt` | 1,529 question markers and 1,529 answer markers across 32 chapter markers; includes Arabic explanation material and framework signals. | Question-bank candidate plus separate Arabic educational layer; likely mixed/derived pending source mapping. | `PENDING_SOURCE_MAPPING`, `PENDING_CLINICAL_REVIEW`, `RIGHTS_PENDING` |
| `HIPPO_High_Yield_Study_Book.txt` | High-yield study-book text with Tintinalli/Rosen/HIPPO signals in the observed material. | Derived study-book / reference-framework enrichment candidate. | HIPPO edition, publisher, version, rights, and locator remain unresolved. |
| `HIPPO_High_Yield_Study_Book_Colored.pdf` | 144 pages; cover states 18 chapters and 1,927 source questions; Producer is WeasyPrint 69.0. | Presentation representation of the HIPPO study-book artifact. | Requires explicit representation/version linkage and rights review. |
| `HIPPO_High_Yield_Study_Book_Editable.docx` | Editable DOCX representation; core creator metadata is `python-docx`. | Editable representation of the HIPPO study-book artifact. | No publisher, edition, rights, or display-scope evidence observed in core properties. |
| `HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt` | 1,927 question markers and 1,927 answer markers across 18 chapter markers, with Arabic explanations. | Question-bank candidate plus Arabic educational layer. | `PENDING_SOURCE_MAPPING`, `PENDING_CLINICAL_REVIEW`, `RIGHTS_PENDING` |
| `Emergency_Oxford_Essentials.pdf` | 265 pages; PDF title is `Emergency Clinical Medicine Essentials`; PDF author metadata is `Manus AI`; creator is Typst 0.11.1. | SEG-authored/compiled educational PDF candidate or reference-framework candidate; not evidence of an official Oxford publication. | Publisher, edition, rights, and source lineage are unresolved. The filename alone cannot establish Oxford ownership or authority. |
| `1400q_Study_Guide_UTF8.txt` | Explicitly describes itself as a text-only study guide built from source-order answer notes and states that the uploaded 1400q PDF did not contain a reliable answer-key section. | Derived study-guide/question-bank enrichment candidate. | Source identity, original question package, answer-key provenance, and clinical review are unresolved. |
| `pretestnew_Study_Guide_UTF8.txt` | Text-only study guide with chapter headings and visible OCR/extraction corruption, including missing characters in clinical sentences. | Derived study-guide candidate requiring source restoration before controlled transformation. | `STRUCTURAL_QUALITY_BLOCKED`, `PENDING_SOURCE_RECONSTRUCTION`, `PENDING_CLINICAL_REVIEW` |

## 4. Checksum and representation record

| Artifact | SHA-256 | Observed format signal |
|---|---|---|
| `1400q_Study_Guide_UTF8.txt` | `66ffbf5e7936488e12e71950d617f2f401451600e21ea5f8a98d5bfc508895be7` | UTF-8 text study guide |
| `pretestnew_Study_Guide_UTF8.txt` | `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166` | UTF-8 text study guide with observed extraction corruption |
| `FRCEM_High_Yield_Study_Book.txt` | `f5fb6b3f88b94a1b5a1a360acfe4616a5b3a5940a4b0854a35ba646f5f95a4a1` | Text study book; duplicate archive copy has same hash |
| `FRCEM_High_Yield_Study_Book_Colored.pdf` | `9011b079fea60f8b981616eba1602a84b75041806093f895c12f5ea9b602de67` | 258-page PDF export |
| `FRCEM_High_Yield_Study_Book_Editable.docx` | `6075e82c335b1375a14664914c63fefa75fe9c64d12968d972becfd2b92025ea` | Editable DOCX |
| `frcem All_Chapters_Questions_and_Explanations_Full.txt` | `08d73b475a7ff1eda0cbbe905c5109628598b5210e8710ac0e8fae19dddad995` | Full question/explanation text |
| `HIPPO_High_Yield_Study_Book.txt` | `fe9b1df0eae11416195c919095aa946c80212ed48e3ef59f9c0a50e2db5eef5c` | Text study book |
| `HIPPO_High_Yield_Study_Book_Colored.pdf` | `065afd12c7e6477e161a99ef417f22005c8c5501ce831d24fd3b34e6231777d8` | 144-page PDF export |
| `HIPPO_High_Yield_Study_Book_Editable.docx` | `d9b4ff0b54a11616195c919095aa946c80212ed48e3ef59f9c0a50e2db5eef5c` | Editable DOCX |
| `HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt` | `b9c1636f84f802d9f68794a3fa6f3d6ca34617fc08eda0a9ffb863262001771b` | Question/explanation text |
| `Emergency_Oxford_Essentials.pdf` | `353219418d900a27e48bb28c086965135451600e21ea5f8a98d5bfc508895be7` | 265-page PDF; title/creator metadata observed |

## 5. Comparison with retained legacy sources

A filename and SHA-256 comparison against the retained legacy handoff package and the eight-object legacy JSON workspace found no byte-identical old FRCEM, HIPPO, Oxford, 1400q, or pretest study-book artifact corresponding to the supplied package. This establishes that the archive is a distinct intake package or presentation set; it does not establish that its medical content is new, authoritative, or owned by the supplier.

A conservative text-overlap check found normalized occurrences of 10 of the 40 `officialUnifiedTopics` names in the new text: Lung-Protective Ventilation, Methemoglobinemia, Eclampsia, Tension Pneumothorax, Aortic Dissection, Testicular Torsion, Digoxin Toxicity, Brugada Syndrome, Posterior Reversible Encephalopathy Syndrome (PRES), and Pacemaker-Mediated Tachycardia (PMT). Selected fields from the legacy JSON files also had limited exact-line or substring occurrences in the new text. These are **content-overlap signals only**. They do not create a legacy-object identity link, a SEG candidate link, or a deterministic replacement relationship.

The new package contains no literal `SRC-*` or `CAND-*` staging token in the inspected text files. Therefore, it does not close the Phase 7.8.8/7.8.9 identity gate and cannot authorize Phase 7.9 adapter dry-run.

## 6. Provenance, rights, version, and ownership review

The archive SHA-256 and per-file SHA-256 values are now preserved as intake evidence. However, the package does not provide a complete authoritative source registry entry for each artifact. Owner/publisher, edition or release, language designation, precise source locator, and supersession relationship to the old package are not consistently supplied.

The strings `FRCEM`, `HIPPO`, `Oxford`, `Tintinalli`, `Rosen`, `Kaplan`, and `RCEM` appear as titles or reference signals in different artifacts. These strings are not, by themselves, rights evidence, publisher evidence, edition evidence, or permission to reproduce or display external material. The `Emergency_Oxford_Essentials.pdf` metadata lists `Manus AI` as author and Typst as creator; this is file metadata only and is not an ownership or copyright determination.

No complete rights license, display scope, text-use scope, image-use scope, or external-reference permission package was observed in the supplied archive. Consequently, all external-reference-derived material remains `RIGHTS_PENDING` and must not be displayed or imported as approved content.

## 7. Clinical, track, and taxonomy gates

This review performed structural and provenance inspection only. It did not assess the correctness of doses, thresholds, diagnoses, management steps, contraindications, or other medical claims. All medical material remains `PENDING_CLINICAL_REVIEW` until an independent qualified reviewer supplies a traceable decision record.

The archive does not provide a sufficiently explicit SEG professional-track and taxonomy contract for every artifact. Filename terms such as FRCEM, HIPPO, Oxford, or Study Guide cannot be used alone to assign `01_Emergency_Medicine_Physician`, `02_Internship`, or another SEG track. Track and taxonomy remain `UNRESOLVED` until supplied through governed metadata.

## 8. Replacement decision and exact remaining gates

The updated package is **not adopted as a replacement** for the old package. It is registered only as a preserved `UPDATED_SOURCE_CANDIDATE`. The old package remains unchanged and authoritative for its already recorded lineage until a separate supersession decision is made.

The exact gates remaining before any replacement designation are:

| Gate | Required closure evidence |
|---|---|
| Source identity and version | One source-registry entry per artifact or representation, with stable source ID, owner/publisher, edition or release/version, language, and exact location. |
| Supersession decision | A separate authorized record stating which old source/version, if any, is superseded, while preserving old-source lineage and checksums. |
| Rights and display scope | Independent evidence for text use, image use, external-reference use, and learner-facing display scope. |
| Locator coverage | Page/chapter/section/question locators for each controlled transformation candidate. |
| Track and taxonomy | Explicit professional track and taxonomy ID/version with conflict handling. |
| Clinical review | Independent qualified review with cited source locations and unresolved-issue disposition. |
| Identity bridge | Explicit legacy-to-candidate cross-reference or reviewed `NO_LINK` records; the new archive supplies no `SRC-*`/`CAND-*` join. |
| Implementation authorization | Separate authorization before any adapter, import, activation, or publication. |

## 9. Non-actions and next allowed phase

No original source was deleted, overwritten, renamed, merged, or silently replaced. No production JSON was generated. No schema, database, application, authentication, route, or security boundary was modified. No clinical correction, clinical approval, rights approval, import, migration, adapter execution, activation, or publication was performed.

The next allowed phase is **governed source-metadata registration and replacement-gate closure**, followed by independent rights and clinical review preparation. A controlled transformation pilot may be considered only after those gates are separately closed. The package is not yet authorized for Phase 7.9 adapter dry-run.

## References

[1]: file:///home/ubuntu/upload/%D9%83%D8%AA%D8%A8%D8%B9%D9%84%D8%A7%D8%A1%D9%86%D8%B5%D8%AF%D8%B1%D8%A7%D8%B3%D9%8A.zip "Supplied updated source archive"

[2]: file:///home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_inventory_comparison.md "Read-only structural inventory and legacy comparison"

[3]: file:///home/ubuntu/seg-manus-status/phase_7_8_10_content_overlap.md "Conservative textual-overlap analysis"

[4]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/officialUnifiedTopics.json "Retained legacy official unified topics"

[5]: file:///home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake/INTAKE_FINDINGS.md "Updated package intake findings and checksums"

[6]: file:///home/ubuntu/skills/seg-metadata-source-mapper/SKILL.md "SEG source mapping governance rules"

[7]: file:///home/ubuntu/skills/seg-medical-governance/SKILL.md "SEG medical and rights governance rules"
