# SEG Hamilton Ventilator Guide — Source Intake Review

**Mode:** Controlled Read-Only Evidence Intake  
**Review status:** `SEG_HAMILTON_SOURCE_INTAKE_COMPLETE`  
**Initial source status:** `BLOCKED_PENDING_REVIEW`  
**Review type:** Artifact and source-governance intake only  
**Content modified:** `false`  
**Source preserved:** `true`  
**Production registry/database record created:** `false`

> This report registers the submitted archive as a **source candidate for evidence review only**. It does not approve the material, complete clinical or technical review, grant rights, assign a final SEG track, create content records, or authorize normalization, import, activation, or learner exposure.

## 1. Executive Intake Decision

The submitted ZIP is a readable, structurally intact mixed package containing a 19-page PDF guide and an interactive Vite/TypeScript application bundle. The PDF identifies itself as a HAMILTON-G5 / HAMILTON-S1 clinical and technical reference for Emergency Department and ICU orientation. It also states that it is a translation and technical rewrite of a local Arabic source and that it must not replace the current Hamilton Medical operator manual, local training, or institutional protocols. These statements establish strong domain relevance but also establish unresolved source-lineage, rights, device-version, and review requirements.[2] [4]

The candidate therefore remains `BLOCKED_PENDING_REVIEW`. It is suitable for continued **internal evidence handling and governance review**, but not for SEG content normalization or any production content path.

## 2. Artifact Evidence

### 2.1 Archive identity and integrity

| Field | Observed value | Evidence classification |
|---|---|---|
| Submitted filename | `hamilton-ventilator-clinical-engineering-field-guide_with_redesigned_pdf.zip` | `OBSERVED_FACT` |
| Intake location | `/home/ubuntu/upload/hamilton-ventilator-clinical-engineering-field-guide_with_redesigned_pdf.zip` | `OBSERVED_FACT` |
| Archive size | 13,362,582 bytes | `OBSERVED_FACT` |
| Archive SHA-256 | `e354eb5dc8b10540125b367d6352bd49d12822d12db52237b767eb846890ae87` | `OBSERVED_FACT` |
| Archive integrity | `unzip -t`: all members `OK`; no compressed-data errors detected | `OBSERVED_FACT` |
| Archive members | 44 total: 39 regular files and 5 directory entries | `OBSERVED_FACT` |
| Uncompressed member total | 13,497,683 bytes | `OBSERVED_FACT` |
| Compressed member total reported by ZIP inventory | 13,357,124 bytes | `OBSERVED_FACT` |
| Duplicate member names | None observed in the static member-name check | `OBSERVED_FACT` |
| Source modification | None; inspection used read-only archive listing and extraction to temporary paths | `OBSERVED_FACT` |

The archive is therefore **technically readable and intact**, but archive integrity does not establish source identity, rights, provenance completeness, or medical approval.[1] [6]

### 2.2 Internal file inventory

The archive contains the following file groups. Directory entries are listed separately from regular files.

| Group | Members observed |
|---|---|
| Primary document | `HAMILTON_G5_S1_Redesigned_Clean_English_Guide.pdf` |
| Metadata and context | `metadata.json`, `README.md` |
| Application entry and types | `src/App.tsx`, `src/main.tsx`, `src/types.ts` |
| Clinical/content data modules | `src/data/manualContent.ts`, `src/data/scenarios.ts`, `src/data/alarms.ts`, `src/data/quizQuestions.ts` |
| First component set | `src/components/DynamicLung.tsx`, `WaveformDisplay.tsx`, `IbwCalculator.tsx`, `VentilatorCockpit.tsx`, `DiagramGallery.tsx`, `HeaderNav.tsx`, `ManualReader.tsx`, `ScenariosView.tsx`, `AlarmsView.tsx`, `PreopCheckSimulator.tsx`, `QuizView.tsx` |
| Additional Hamilton-specific components | `src/components/DynamicLungGraphic.tsx`, `HamiltonPVLoop.tsx`, `HamiltonWaveforms.tsx`, `HamiltonModesModal.tsx`, `HamiltonStandbyScreen.tsx`, `HamiltonControlsModal.tsx`, `HamiltonAlarmsModal.tsx`, `HamiltonMainScreen.tsx`, `HamiltonBezel.tsx` |
| Configuration and packaging | `tsconfig.json`, `package.json`, `.env.example`, `index.html`, `.gitignore`, `src/index.css`, `vite.config.ts`, `bun.lock`, `assets/.aistudio/.gitignore` |
| Directory entries | `src/`, `src/data/`, `src/components/`, `assets/`, `assets/.aistudio/` |

The observed formats are PDF, JSON, TypeScript/TSX, Markdown, CSS, HTML, environment-example text, Git-ignore text, and a JSON-formatted lockfile. No standalone PNG/JPEG image files were present in the ZIP inventory. The PDF does contain embedded image streams; these are not a substitute for separate visual-asset provenance or rights evidence.[6]

### 2.3 Embedded PDF evidence

| Field | Observed value | Evidence classification |
|---|---|---|
| Embedded PDF filename | `HAMILTON_G5_S1_Redesigned_Clean_English_Guide.pdf` | `OBSERVED_FACT` |
| Embedded PDF size | 13,132,453 bytes | `OBSERVED_FACT` |
| Embedded PDF SHA-256 | `38add94eaeb93604cd01a496b085079e80bf048709632d2f7288f7c7b4117f61` | `OBSERVED_FACT` |
| PDF version | 1.7; this is a file-format version, not a confirmed guide edition | `OBSERVED_FACT` / `UNRESOLVED` |
| Page count | 19 pages | `OBSERVED_FACT` |
| Encryption | Not encrypted | `OBSERVED_FACT` |
| JavaScript in PDF | None reported by `pdfinfo` | `OBSERVED_FACT` |
| Extracted text | 578 lines; text extraction completed for inspection | `OBSERVED_FACT` |
| Embedded image streams | 20 image rows reported by `pdfimages -list`, including image-mask rows | `OBSERVED_FACT` |
| Standalone visual inventory | Not supplied; embedded visual provenance remains unresolved | `MISSING_EVIDENCE` |

The application package also contains 4 clinical/content data modules and 20 component modules. This makes the handoff a **mixed document-plus-application package**, not a pure PDF source handoff.[5] [6]

## 3. Source Identity Assessment

### 3.1 Identity fields

| Field | Assessment | Status |
|---|---|---|
| Source title from metadata | `HAMILTON Ventilator Clinical & Engineering Field Guide` | `OBSERVED_FACT` |
| Source title from PDF | `HAMILTON-G5 / HAMILTON-S1 Comprehensive Clinical and Technical Guide`; the PDF also uses `Comprehensive Field and Clinical Reference` | `OBSERVED_FACT` |
| Device scope | HAMILTON-G5 / HAMILTON-S1 ventilators | `OBSERVED_FACT` |
| Author | `Dr. Alaa Aqrabawi — Emergency Department, Al-Bashir Hospital` | `OBSERVED_FACT` |
| Publisher/owner | Not supplied. Al-Bashir Hospital appears as an author affiliation, not a confirmed publisher or rights owner | `MISSING_EVIDENCE` |
| Edition/version | The PDF says “Developed and expanded edition,” but provides no numbered edition or release identifier. PDF 1.7 is not a guide edition | `UNRESOLVED` |
| Publication date | Not supplied | `MISSING_EVIDENCE` |
| Archive timestamps | ZIP member timestamps show 2026-08-22 packaging times; these are not verified publication dates | `OBSERVED_FACT` / `NOT_ACTIONABLE` for publication identity |
| Original locator | Not supplied. The README contains an AI Studio app URL, which identifies an app context rather than the canonical clinical source | `MISSING_EVIDENCE` |
| Source language/context | The PDF explicitly describes itself as an English translation and technical rewrite of a local Arabic source and says that parts were retained from supplied Hamilton-G5 source presentations | `OBSERVED_FACT` |
| Original Arabic source/presentations | Referred to by the PDF but not included in the submitted archive | `MISSING_EVIDENCE` |
| SEG source ID | Not assigned; this is an intake candidate and no production registry record was created | `OBSERVED_FACT` |

The identity is therefore **partially described but not canonically closed**. The supplied author/context cues must not be converted into a publisher, owner, edition, date, or original-source locator without additional evidence.[2] [4]

### 3.2 Source-context evidence

The PDF states that operational details can vary by software version, hardware configuration, patient population, or local policy, and repeatedly directs users to verify device-specific details against the current Hamilton Medical operator manual and institutional protocols. It also labels itself an educational orientation and quick-reference document rather than a replacement for the official operator manual.[4]

These statements are useful governance evidence because they identify the document’s intended limitation. They do **not** independently verify any clinical claim, ventilator setting, alarm behavior, menu path, threshold, or device performance statement.

## 4. Content Classification

### 4.1 Candidate domain classification

| Category | Classification | Basis |
|---|---|---|
| Medical Device Guide | **PRIMARY** | Device anatomy, controls, calibration, modes, alarms, operating behavior, and model-specific cautions are described for HAMILTON-G5 / HAMILTON-S1 devices | `OBSERVED_FACT` |
| ICU / Ventilation Education | **PRIMARY** | The guide is explicitly prepared for ED and ICU orientation and includes ventilation modes, clinical scenarios, monitoring, and bedside safety reminders | `OBSERVED_FACT` |
| Emergency Medicine Reference | **PRIMARY** | The guide explicitly addresses emergency physicians and ED use, including ARDS, severe asthma/COPD, TBI, alarms, and preoperational setup | `OBSERVED_FACT` |
| Clinical Protocol | **SECONDARY / REQUIRES REVIEW** | It contains protocol-like setup, alarm-response, and scenario guidance, but the document itself says local protocols and the current operator manual must control | `OBSERVED_FACT` / `UNRESOLVED` |
| Technical Engineering Reference | **SECONDARY / REQUIRES TECHNICAL REVIEW** | Pneumatic/electrical connections, calibration, battery, flow sensor, components, and preventive-maintenance references are included | `OBSERVED_FACT` |

The source contains clinically consequential material, including settings, ranges, alarm responses, calibration instructions, and device-behavior descriptions. This is a **governed medical-device education candidate**, not an ordinary educational article or a production-ready protocol.

### 4.2 Package composition and transfer boundary

The PDF is accompanied by a Vite/TypeScript interactive application shell with local content modules for manual sections, scenarios, alarms, and quiz questions. The archive also includes an `.env.example` referencing `GEMINI_API_KEY` and `APP_URL`, as well as an `@google/genai` dependency in `package.json`.[3] [7]

For SEG intake purposes, the PDF, local content modules, visual material, and application code must be treated as separate evidence classes. The application shell and external-AI configuration are **not** source identity evidence and must not be transferred into SEG architecture or used to bypass SEG’s Next.js, Supabase, Prisma, authentication, security, or content-governance boundaries.

## 5. Governance Assessment

### 5.1 Provenance

| Provenance stage | Observed state | Gate |
|---|---|---|
| Original source | Local Arabic source and supplied Hamilton-G5 presentations are referenced but absent | `BLOCKED_PROVENANCE` |
| Extraction/translation event | Translation and technical rewrite are asserted, but no event owner, date, method, source package, or transformation log is supplied | `BLOCKED_PROVENANCE` |
| Recovery artifact | Submitted ZIP and embedded PDF are hash-verified and preserved | `PARTIALLY_CONFIRMED` |
| SEG registry entry | No production/source-registry record assigned; candidate remains intake-only | `BLOCKED_PROVENANCE` |

**Finding:** The recovery artifact is verifiable as a file, but the upstream source and transformation lineage are incomplete. The archive hash proves the identity of the submitted ZIP only; it does not prove the identity or rights of the underlying clinical source.

### 5.2 Rights

No license, permission statement, ownership declaration, translation authorization, derivative-work permission, redistribution permission, display scope, or image-usage statement was observed in `metadata.json`, `README.md`, or the extracted PDF. The official Hamilton Medical operator manual is referenced but is not included as a rights document. The embedded PDF visual material and any code-generated or retained illustrations have no separate provenance or rights register.[2] [3] [4]

**Rights status:** `PENDING_EXTERNAL_EVIDENCE` / `UNKNOWN`  
**Rights gate:** `BLOCKED_RIGHTS`

This is an evidence classification, not a legal conclusion. A rights owner or authorized reviewer must determine whether the guide, its translation/rewrite, embedded visuals, and any derivative application content may be retained, transformed, displayed, or distributed within SEG.

### 5.3 Medical review requirement

A qualified clinical review is required before any normalization or educational reuse. The review must cover, at minimum, the device-specific setup/calibration instructions, ventilation modes, ARDS/COPD/TBI scenario guidance, alarm causes and immediate actions, numeric settings or ranges, patient-safety warnings, and all statements that could be interpreted as bedside management guidance.

**Required reviewer roles:** Emergency Medicine and Critical Care/Intensive Care reviewers with ventilator expertise; Respiratory Therapy or equivalent ventilator-practice review should be included where available. No named reviewer, review decision, review date, cited approval evidence, or unresolved-issue disposition was supplied.

**Medical review status:** `BLOCKED_CLINICAL_REVIEW`  
**Clinical approval:** Not performed and not granted by this intake.

### 5.4 Technical review requirement

A separate technical review is required by a biomedical-engineering or device-qualified reviewer against the current HAMILTON-G5/HAMILTON-S1 operator manual, exact device model, hardware configuration, and software version. The PDF itself flags variable menu paths, alarm behavior, battery runtime, O2-enrichment behavior, flow-sensor connections, calibration procedures, and component/autoclave details as items requiring verification.[4]

**Technical review status:** `BLOCKED_TECHNICAL_REVIEW`  
**Technical approval:** Not performed and not granted by this intake.

### 5.5 Professional-track relevance

The PDF explicitly names emergency physicians, intensivists, and respiratory/cardiac anesthesia staff as intended users, and describes ED/ICU orientation. However, no SEG professional-track label or taxonomy version was supplied. The candidate must not be assigned to a SEG track solely from its filename, author affiliation, or topic familiarity.

**Provisional relevance for review:** `01_Emergency_Medicine_Physician` and possible `07_Shared_Medical_Core`; an `Advanced Reference` designation may be considered during a separate track/taxonomy decision. These are review destinations, not final assignments. No Internship, Medical Student, Paramedic EMS, Emergency Nursing, or General Practitioner assignment is made by this intake.

**Track/taxonomy status:** `TRACK_UNSUPPLIED` / `BLOCKED_TRACK_OR_TAXONOMY`

## 6. Missing Evidence Register

| Missing evidence | Impact | Required closure evidence |
|---|---|---|
| Canonical original title and source owner/publisher | Source identity cannot be closed | Owner/publisher confirmation or authoritative original-source record |
| Original local Arabic source and supplied Hamilton-G5 presentations | Translation/rewrite lineage cannot be independently verified | Original source package or an authorized provenance statement with precise locators |
| Translation/technical-rewrite event | Transformation history is incomplete | Event owner, date, source version, method, and append-only transformation record |
| Edition/release identifier and publication date | Version comparison and currency cannot be controlled | Canonical edition/version and publication/release evidence |
| Original locator | External verification and future citation are blocked | Official URL, document identifier, repository locator, or owner-provided source location |
| License/ownership/permission evidence | Text, translation, derivative, code, and visual reuse rights are unknown | Rights owner, license, permission, redistribution and display scope, including image rights |
| Visual-asset provenance | Embedded illustrations cannot be separately governed | Image inventory, origin, rights status, and permitted use for each visual asset |
| Exact device/software context | Device-specific claims may not generalize | Model/configuration and software-version scope, verified against current manual |
| Qualified clinical review | Medical safety and educational correctness are unreviewed | Reviewer role/identity, date, cited locations, decisions, and unresolved-issue disposition |
| Qualified technical review | Device operation and engineering claims are unverified | Biomedical/device review against current operator manual and local service records where applicable |
| Explicit SEG track and taxonomy | Professional-level separation is not closed | Authorized track/taxonomy decision with version and no conflict |
| Audit evidence | Governance chain is incomplete | Append-only intake, rights, technical, clinical, and track-review events |

## 7. Recommended SEG Destination

The candidate should remain in the following non-production queue:

```text
SEG Source Registry
  ↓
Device-Specific Clinical / Technical Reference Candidate
  ↓
Provenance and Rights Closure
  ↓
Separate Technical Review + Clinical Review + Track/Taxonomy Review
  ↓
Schema/Content QA Read-Only Review
  ↓
Only after separate authorization: governed normalization review
```

The recommended provisional review destination is the **Emergency Medicine Physician / Advanced Device Reference** queue, with possible later reuse of reviewed, non-device-specific elements in Shared Medical Core only if a separate governance decision supports it. This is not a final track assignment and does not authorize content extraction or transfer.

The application shell, Vite configuration, Gemini environment configuration, dependencies, and UI components should remain **reference-only** for SEG architecture. They must not be ported as application architecture, authentication, database, integration, or security changes.

## 8. Current Gate and Next Allowed Action

| Governance dimension | Current state |
|---|---|
| Artifact readability | `PASS` for archive integrity and local inspection |
| Source identity | `BLOCKED_PENDING_EVIDENCE` |
| Provenance | `BLOCKED_PROVENANCE` |
| Rights | `BLOCKED_RIGHTS` |
| Medical review | `BLOCKED_CLINICAL_REVIEW` |
| Technical review | `BLOCKED_TECHNICAL_REVIEW` |
| Track/taxonomy | `BLOCKED_TRACK_OR_TAXONOMY` |
| Audit completeness | `BLOCKED_AUDIT` |
| Normalization | Not authorized; not started |
| Database/schema integration | Not authorized; not started |
| Import/activation/publication | Not performed and not authorized |
| Overall candidate state | `BLOCKED_PENDING_REVIEW` |

**Exact next allowed action:** preserve the submitted archive and its hashes as an internal intake artifact, then obtain the missing original-source, rights, version, technical, clinical, track/taxonomy, and audit evidence. The next phase is a governed **evidence-closure review**, not normalization. No source-derived content may enter `SEG_CONTENT_RECORD_V1_1` until the required governance gates and separate implementation authorization are complete.

## 9. Explicit Non-Actions and Audit Record

| Action | Result |
|---|---|
| Source archive modified | `false` |
| Internal source files modified | `false` |
| Content rewritten or clinically corrected | `false` |
| Source ID/production registry record created | `false` |
| SEG content mapping created | `false` |
| Zod schema created or modified | `false` |
| Prisma schema created or modified | `false` |
| SQL executed | `false` |
| Database/Supabase changed | `false` |
| Application architecture changed | `false` |
| Content imported | `false` |
| Content activated or published | `false` |
| Learner exposure enabled | `false` |
| Clinical approval granted | `false` |
| Rights approval granted | `false` |
| Technical approval granted | `false` |

## 10. Final Status

```text
SEG_HAMILTON_SOURCE_INTAKE_COMPLETE

Candidate state: BLOCKED_PENDING_REVIEW
Rights state: PENDING_EXTERNAL_EVIDENCE / UNKNOWN
Provenance state: BLOCKED_PROVENANCE
Medical review: REQUIRED, NOT PERFORMED
Technical review: REQUIRED, NOT PERFORMED
SEG track: NOT ASSIGNED
Normalization: NOT AUTHORIZED
Production integration: NOT AUTHORIZED
```

### References

[1]: file:///home/ubuntu/upload/hamilton-ventilator-clinical-engineering-field-guide_with_redesigned_pdf.zip "Submitted Hamilton Ventilator Guide archive"
[2]: file:///tmp/hamilton_metadata.json "Read-only extracted metadata.json"
[3]: file:///tmp/hamilton_readme.md "Read-only extracted README.md"
[4]: file:///tmp/hamilton_guide.txt "Read-only extracted PDF text"
[5]: file:///tmp/hamilton_pdfinfo.txt "Read-only PDF technical metadata"
[6]: file:///tmp/hamilton_intake_inventory.txt "Read-only archive integrity and inventory log"
[7]: file:///tmp/hamilton_content_scan.txt "Read-only static package/content scan"

**Author:** Manus AI  
**Review boundary:** Controlled read-only evidence intake only
