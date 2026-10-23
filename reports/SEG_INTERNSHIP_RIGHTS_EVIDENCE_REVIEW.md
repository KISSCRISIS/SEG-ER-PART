# SEG Internship Rights Evidence Review

**Phase:** 7.1 — Governed Evidence Closure Execution  
**Mode:** `READ_ONLY SOURCE EVIDENCE REVIEW`  
**Review scope:** Existing rights-related statements and restrictions in the preserved `02_Internship` package and governance artifacts.  
**Decision boundary:** This report records evidence only. It is not a rights approval, license grant, ownership determination, display authorization, or production-use permission.

## 1. Summary

The source package contains several explicit use-boundary statements. These include conceptual-reference-only language, prohibitions on copying copyrighted wording/questions/tables, no-direct-publication rules for raw or reviewed source material, and a requirement that future visuals be permission-safe and medically reviewed. These statements are useful restrictions, but they do not identify a rights owner, provide a license, establish permitted display scope, or document a rights reviewer and decision date.

Accordingly, no rights gate is closed by this review. Where a source-local restriction exists, the evidence is recorded as `PARTIAL` rather than upgraded to rights clearance. Where no direct evidence was supplied, the result is `NOT_SUPPLIED`.

## 2. Rights evidence inventory

| Rights domain | Existing observed evidence | Source location | Related source/artifact | Status | Closure impact |
|---|---|---|---|---|---|
| Text ownership | The package contains original-synthesis statements for selected SEG educational files and names external references used conceptually. | `02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md` line 442; `Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md` line 442; corresponding Emergency Cases and Toxicology files | `SRC-0023`, `SRC-0027`, `SRC-0033`, `SRC-0037`, and related implementation-note records | `PARTIAL` | Supports a no-verbatim-copy boundary; does not prove ownership of all source materials or grant reuse rights. |
| Text license | No license identifier, license text, rights grant, or permission record was found for the package text or source-derived materials. | Scanned package metadata, manifests, implementation notes, and governance artifacts | All in-scope text candidates | `NOT_SUPPLIED` | Text use cannot be treated as licensed or cleared. |
| Text copying restriction | Implementation notes say to use references conceptually and not copy copyrighted wording or questions. | `Drug_Essentials/implementation_notes.md` line 54; `Drug_Essentials_v2_Pack/implementation_notes.md` line 54; corresponding Emergency Cases/Toxicology notes | `DUP-DRUG-001`, `DUP-EMERGENCY-001`, related candidates | `PARTIAL` | Provides a restriction and risk control, not a positive rights authorization. |
| Raw source publication restriction | The Pediatrics phone source is marked `raw_extracted_unpublished_source`, `source_review_only`, and `do_not_publish_directly`; its body also prohibits public navigation/direct publication. | `JMC_Exam_Practice/Sources_Phone/pediatrics-main.md` lines 2–23 | `phone-pediatrics-main`; crosswalk with `SRC-0078` | `PARTIAL` | Confirms exclusion from direct publication; does not identify owner or lawful display permission. |
| Reviewed-draft publication restriction | The reviewed Pediatrics draft is marked `reviewed_draft_unpublished`, `public_navigation: false`, and `do_not_publish_directly`. | `JMC_Exam_Practice/Reviewed/pediatrics-intern-jmc.md` lines 2–27 | `reviewed-pediatrics-intern-jmc`; inventory `SRC-0070` | `PARTIAL` | Confirms draft/non-public status; does not establish review authority or rights clearance. |
| Image rights | ECG file states that no ECG images are included and any future visual must be verified permission-safe and medically reviewed; copyrighted textbook screenshots/tables without permission are prohibited. | `ECG_Essentials/ecg_essentials_intern_level.md` lines 7, 367–394 | ECG candidate; no image artifact asserted in this review | `PARTIAL` | Provides a preventive constraint; no image license or display permission is supplied. |
| Image inventory/permission | No supplied image-rights inventory, image owner, license, permission grant, or display-scope record was found for the in-scope package. | Phase 7.0 manifest and package scan | All in-scope candidates | `NOT_SUPPLIED` | Image rights remain open; absence of observed images does not grant future display permission. |
| PDF rights | Four PDF reference candidates are listed in the Phase 7.0 artifact manifest with hashes and paths. No PDF ownership/license/display record was supplied in the reviewed evidence. | `SEG_INTERNSHIP_REVALIDATION_ARTIFACT_MANIFEST.md` lines 63–66; preserved archive paths under `02_Internship/Internship books SEG/` | `SRC-0041`–`SRC-0044` | `NOT_SUPPLIED` | PDFs remain blocked for display, import, or learner-facing reference use until rights evidence is supplied. |
| Display permission | Raw and reviewed manifests prohibit public linking/direct publication. No positive display-permission statement was supplied for text, images, or PDFs. | `JMC_Exam_Practice/Sources_Phone/_manifest.md`; `JMC_Exam_Practice/Reviewed/_manifest.md`; Pediatrics source/draft frontmatter | Phone/reviewed source families and package artifacts | `PARTIAL` | Negative publication restrictions are observed; positive display authorization is absent. |
| External reference attribution | Implementation notes name Tintinalli Emergency Medicine Examination and Board Review 2023, Rosen’s Emergency Medicine 10e Q&A, and Rosh Rapid Review — Emergency Medicine Rotation Exam as conceptual source bases for selected modules. | Drug Essentials and Emergency Cases `implementation_notes.md`; Toxicology implementation note | `SRC-0028`, `SRC-0038`, related candidates | `PARTIAL` | Provides attribution/reference evidence; it is not a license or permission record. |
| Rights reviewer | No attributable rights reviewer identity, qualification, decision date, conflict record, or rights decision artifact was supplied. | Phase 7.0 review assignment and governance evidence records | All rights domains | `NOT_SUPPLIED` | Rights review assignment and closure remain open. |
| Rights audit linkage | Existing extraction/governance reports record package processing and restrictions, but no completed append-only rights decision event linked to every artifact hash was supplied. | Phase 5.6 extraction manifest; Phase 7.0 register/manifest | All in-scope artifacts | `PARTIAL` | Audit readiness remains incomplete; no rights gate closure. |

## 3. Required evidence still absent

The following evidence was not supplied in the reviewed package: an accountable rights owner or publisher per artifact; an explicit license or permission grant for text; image-by-image ownership and display permissions; PDF ownership/license/display permissions; allowed-use scope and restrictions tied to exact locators; rights reviewer identity and qualification; decision date; conflict handling; and an append-only audit event linking the rights decision to the exact SHA-256 manifest.

The absence of these records is not interpreted as evidence that rights are absent. It is recorded as `NOT_SUPPLIED` and remains a blocking condition for any learner-facing display, schema import, or production activation.

## 4. Rights status by controlled population

| Population | Observed status | Rights closure result |
|---|---|---|
| `DUP-DRUG-001` Base and `v2_Pack` | Conceptual-reference/no-verbatim-copy statements exist in implementation and synthesis notes | `PARTIAL — NOT RIGHTS CLEARED` |
| `DUP-EMERGENCY-001` Base and `v2_Pack` | Conceptual-reference/no-verbatim-copy statements exist in implementation and synthesis notes | `PARTIAL — NOT RIGHTS CLEARED` |
| Phone-source material including `phone-pediatrics-main` | Raw/unpublished/source-review-only and no-direct-publication restrictions exist | `PARTIAL — NOT RIGHTS CLEARED` |
| Reviewed JMC drafts | Reviewed-draft/unpublished/no-direct-publication restrictions exist | `PARTIAL — NOT RIGHTS CLEARED` |
| PDF reference candidates `SRC-0041`–`SRC-0044` | Paths and hashes are listed; rights evidence is not supplied | `NOT_SUPPLIED` |
| Technical `.ts`/`.tsx` assets | Explicitly excluded from medical-content ingestion | `OUT OF MEDICAL CONTENT SCOPE; no rights conclusion inferred` |

## 5. Protected boundaries and conclusion

No license was inferred from a citation, filename, folder, source organization name, or original-synthesis statement. No rights approval, display permission, publication authorization, clinical approval, schema conversion, JSON generation, import, activation, deletion, rename, merge, or archive action occurred.

> **Rights closure result: `BLOCKED_PENDING_RIGHTS_EVIDENCE`**

## References

[1]: `/home/ubuntu/seg-internship-phase-5.6/staging/extracted/02_Internship/CONTENT_METADATA.md` "Package metadata"
[2]: `/home/ubuntu/seg-internship-phase-5.6/staging/extracted/02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-main.md` "Pediatrics raw source metadata and publication restrictions"
[3]: `/home/ubuntu/seg-internship-phase-5.6/staging/extracted/02_Internship/JMC_Exam_Practice/Reviewed/pediatrics-intern-jmc.md` "Reviewed Pediatrics draft metadata and publication restrictions"
[4]: `/home/ubuntu/seg-internship-phase-5.6/staging/extracted/02_Internship/Drug_Essentials_v2_Pack/implementation_notes.md` "Drug Essentials source-use boundary"
[5]: `/home/ubuntu/seg-internship-phase-5.6/staging/extracted/02_Internship/Emergency_Cases_v2_Pack/implementation_notes.md` "Emergency Cases source-use boundary"
[6]: `/home/ubuntu/seg-internship-phase-5.6/staging/extracted/02_Internship/ECG_Essentials/ecg_essentials_intern_level.md` "ECG visual and copyrighted-material restrictions"
[7]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_REVALIDATION_ARTIFACT_MANIFEST.md` "Phase 7.0 artifact manifest"
