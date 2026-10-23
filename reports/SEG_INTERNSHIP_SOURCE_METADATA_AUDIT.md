# SEG Internship Source Metadata Audit

**Phase:** 5.2 — Internship Governed Source Metadata & Duplicate Review  
**Mode:** `READ_ONLY GOVERNANCE REVIEW`  
**Authority scope:** The four supplied authority inputs only.  
**Author:** Manus AI  
**Validated data rows:** 115 CSV records plus one header row.

## 1. Scope and decision

This audit reviews the source inventory at the catalog-record level. It does not claim that the catalog is the complete original source package, and it does not derive owner, version, rights, taxonomy, or clinical status from filenames or folders. The catalog provides eight observed columns: `Source ID`, `File name`, `Type`, `Module`, `Topic`, `Pathway location`, `Review status`, and `Duplicate status`.[1]

Every one of the 115 catalog records is classified overall as **`INCOMPLETE`**. The catalog identity and path fields are present, but governance-critical provenance and review fields are absent or unresolved. A path beginning with `02_Internship` is recorded as a location signal only; it is not treated as an explicit governed professional-track assignment.[1] [4]

> **Decision:** The catalog is useful for a governed metadata handoff, but it is not a complete source metadata package and cannot support schema conversion or activation.

## 2. Field-level audit

| Required field | Observed catalog evidence | Classification | Reason and required follow-up |
|---|---|---|---|
| Source ID | All 115 rows have `SRC-` identifiers | `COMPLETE` at inventory level | Confirm that each ID is immutable and tied to the actual source file during Stage 0 fingerprinting. |
| Owner / Publisher | No catalog column or supplied value | `MISSING` | Obtain an attributable owner/publisher and handoff record. |
| Version | No governed version/release field; filenames containing `v2` are not sufficient | `MISSING` | Obtain explicit version, edition, or release label and resolve conflicts. |
| Checksum | No SHA-256 values in the supplied inputs | `MISSING` | Fingerprint each accessible original file without changing it. |
| Rights | No text-use, image-use, license, display-scope, or rights decision | `MISSING` | Obtain rights evidence before learner display or derivative processing. |
| Track | `02_Internship` appears in source paths, but no explicit track field exists | `INCOMPLETE` | Confirm governed `02_Internship` assignment; do not infer it solely from a path prefix. |
| Taxonomy | Module/topic labels exist, but no taxonomy ID/version is supplied | `INCOMPLETE` | Provide approved taxonomy identifiers and version. |
| Locator | File names and pathway locations are present; page/section/question/case locators are not | `INCOMPLETE` | Add exact source locators for each future content record. |
| Review status | All rows are `Needs review / verify` | `INCOMPLETE` | Preserve pending review; no approval is evidenced. |
| Duplicate status | All rows are `Check required` | `INCOMPLETE` | Complete the separate duplicate decision register; do not select a canonical version silently. |
| Overall source record | Eight catalog columns only; governance fields unresolved | `INCOMPLETE` | Block schema conversion pending provenance, rights, track/taxonomy, review, and audit evidence. |

## 3. Inventory profile

### 3.1 File types

| Type | Count |
|---|---:|
| `tsx` | 56 |
| `md` | 45 |
| `txt` | 5 |
| `ts` | 5 |
| `pdf` | 4 |

### 3.2 Modules

| Module | Count |
|---|---:|
| OBGYN | 22 |
| Internal Medicine | 16 |
| Pediatrics | 16 |
| Surgery | 16 |
| Source / Other | 14 |
| Emergency Basics | 11 |
| Drug Essentials | 6 |
| Start Here | 5 |
| Assessment & Logbook | 3 |
| Toxicology | 3 |
| OSCE | 2 |
| ECG | 1 |


The inventory includes content-like Markdown, TXT, and PDF entries alongside TSX and TS source-layer or implementation artifacts. The catalog does not by itself establish which file is the authoritative educational payload. That role must be resolved through a traceable source classification step; no source-layer file is promoted to content by this audit.[2] [4]

## 4. Per-source classification

The following table records the outcome for every catalog row. `COMPLETE` is used only for the inventory-level Source ID field; the overall row remains `INCOMPLETE` because the governance package is incomplete. No row is approved or activation-ready.

| Source ID | File name | Type | Module | Topic | Pathway location | Review status | Duplicate status | Overall |
|---|---|---|---|---|---|---|---|---|
| SRC-0003 | `02_Internship/Assessments/Assessment_Structure.md` | `md` | Assessment & Logbook | `Assessment_Structure` | `04 — ASSESSMENT & LOGBOOK` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0004 | `02_Internship/Assessments/README.md` | `md` | Assessment & Logbook | `README` | `04 — ASSESSMENT & LOGBOOK` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0007 | `02_Internship/Clinical_Rotations/Emergency_Basics/Emergency_Basics_Intern_Framework.md` | `md` | Emergency Basics | `Emergency_Basics_Intern_Framework` | `02 — CLINICAL FOUNDATION/Emergency Basics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0008 | `02_Internship/Clinical_Rotations/Emergency_Basics/README.md` | `md` | Emergency Basics | `README` | `02 — CLINICAL FOUNDATION/Emergency Basics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0010 | `02_Internship/Clinical_Rotations/Internal_Medicine/Rotation_Objectives.md` | `md` | Internal Medicine | `Rotation_Objectives` | `01 — CORE ROTATIONS/Internal Medicine` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0012 | `02_Internship/Clinical_Rotations/Obstetrics_Gynecology/Rotation_Objectives.md` | `md` | OBGYN | `Rotation_Objectives` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0014 | `02_Internship/Clinical_Rotations/Pediatrics/Rotation_Objectives.md` | `md` | Pediatrics | `Rotation_Objectives` | `01 — CORE ROTATIONS/Pediatrics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0015 | `02_Internship/Clinical_Rotations/README.md` | `md` | Source / Other | `README` | `Content Source Layer` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0017 | `02_Internship/Clinical_Rotations/Surgery/Rotation_Objectives.md` | `md` | Surgery | `Rotation_Objectives` | `01 — CORE ROTATIONS/Surgery` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0019 | `02_Internship/Clinical_Skills/Clinical_Skills_Internship_Framework.md` | `md` | Source / Other | `Clinical_Skills_Internship_Framework` | `Content Source Layer` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0020 | `02_Internship/Clinical_Skills/README.md` | `md` | Source / Other | `README` | `Content Source Layer` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0021 | `02_Internship/CONTENT_METADATA.md` | `md` | Source / Other | `CONTENT_METADATA` | `Content Source Layer` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0023 | `02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md` | `md` | Drug Essentials | `drug_essentials_intern_level_v2` | `02 — CLINICAL FOUNDATION/Drug Essentials` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0024 | `02_Internship/Drug_Essentials/implementation_notes.md` | `md` | Drug Essentials | `implementation_notes` | `02 — CLINICAL FOUNDATION/Drug Essentials` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0025 | `02_Internship/Drug_Essentials/README.txt` | `txt` | Drug Essentials | `README` | `02 — CLINICAL FOUNDATION/Drug Essentials` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0027 | `02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md` | `md` | Drug Essentials | `drug_essentials_intern_level_v2` | `02 — CLINICAL FOUNDATION/Drug Essentials` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0028 | `02_Internship/Drug_Essentials_v2_Pack/implementation_notes.md` | `md` | Drug Essentials | `implementation_notes` | `02 — CLINICAL FOUNDATION/Drug Essentials` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0029 | `02_Internship/Drug_Essentials_v2_Pack/README.txt` | `txt` | Drug Essentials | `README` | `02 — CLINICAL FOUNDATION/Drug Essentials` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0031 | `02_Internship/ECG_Essentials/ecg_essentials_intern_level.md` | `md` | ECG | `ecg_essentials_intern_level` | `02 — CLINICAL FOUNDATION/ECG` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0033 | `02_Internship/Emergency_Cases/emergency_cases_intern_level.md` | `md` | Emergency Basics | `emergency_cases_intern_level` | `02 — CLINICAL FOUNDATION/Emergency Basics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0034 | `02_Internship/Emergency_Cases/implementation_notes.md` | `md` | Emergency Basics | `implementation_notes` | `02 — CLINICAL FOUNDATION/Emergency Basics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0035 | `02_Internship/Emergency_Cases/README.txt` | `txt` | Emergency Basics | `README` | `02 — CLINICAL FOUNDATION/Emergency Basics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0037 | `02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md` | `md` | Emergency Basics | `emergency_cases_intern_level` | `02 — CLINICAL FOUNDATION/Emergency Basics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0038 | `02_Internship/Emergency_Cases_v2_Pack/implementation_notes.md` | `md` | Emergency Basics | `implementation_notes` | `02 — CLINICAL FOUNDATION/Emergency Basics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0039 | `02_Internship/Emergency_Cases_v2_Pack/README.txt` | `txt` | Emergency Basics | `README` | `02 — CLINICAL FOUNDATION/Emergency Basics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0041 | `02_Internship/Internship books SEG/IM_HighYield_Review.pdf` | `pdf` | Internal Medicine | `IM_HighYield_Review` | `01 — CORE ROTATIONS/Internal Medicine` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0042 | `02_Internship/Internship books SEG/ObGyn_HighYield_Review_Dr_Alaa_Aqrabawi.pdf` | `pdf` | OBGYN | `ObGyn_HighYield_Review_Dr_Alaa_Aqrabawi` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0043 | `02_Internship/Internship books SEG/Pediatrics_HighYield_Review.pdf` | `pdf` | Pediatrics | `Pediatrics_HighYield_Review` | `01 — CORE ROTATIONS/Pediatrics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0044 | `02_Internship/Internship books SEG/Surgery_HighYield_Review.pdf` | `pdf` | Surgery | `Surgery_HighYield_Review` | `01 — CORE ROTATIONS/Surgery` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0046 | `02_Internship/Internship_Guides/Intern_Professionalism_Guide.md` | `md` | Start Here | `Intern_Professionalism_Guide` | `00 — START HERE` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0047 | `02_Internship/Internship_Guides/Intern_Transition_Guide.md` | `md` | Start Here | `Intern_Transition_Guide` | `00 — START HERE` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0050 | `02_Internship/JMC_Exam_Practice/Internal_Medicine/page.tsx` | `tsx` | Internal Medicine | `page` | `01 — CORE ROTATIONS/Internal Medicine` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0051 | `02_Internship/JMC_Exam_Practice/Internal_Medicine/questionData.ts` | `ts` | Internal Medicine | `questionData` | `01 — CORE ROTATIONS/Internal Medicine` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0053 | `02_Internship/JMC_Exam_Practice/Internal_Medicine/[moduleSlug]/page.tsx` | `tsx` | Internal Medicine | `page` | `01 — CORE ROTATIONS/Internal Medicine` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0055 | `02_Internship/JMC_Exam_Practice/OBGYN/page.tsx` | `tsx` | OBGYN | `page` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0056 | `02_Internship/JMC_Exam_Practice/OBGYN/questionData.ts` | `ts` | OBGYN | `questionData` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0058 | `02_Internship/JMC_Exam_Practice/OBGYN/[moduleSlug]/page.tsx` | `tsx` | OBGYN | `page` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0059 | `02_Internship/JMC_Exam_Practice/page.tsx` | `tsx` | Source / Other | `page` | `Content Source Layer` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0060 | `02_Internship/JMC_Exam_Practice/parseQuestions.ts` | `ts` | Source / Other | `parseQuestions` | `Content Source Layer` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0062 | `02_Internship/JMC_Exam_Practice/Pediatrics/page.tsx` | `tsx` | Pediatrics | `page` | `01 — CORE ROTATIONS/Pediatrics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0063 | `02_Internship/JMC_Exam_Practice/Pediatrics/questionData.ts` | `ts` | Pediatrics | `questionData` | `01 — CORE ROTATIONS/Pediatrics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0065 | `02_Internship/JMC_Exam_Practice/Pediatrics/[moduleSlug]/page.tsx` | `tsx` | Pediatrics | `page` | `01 — CORE ROTATIONS/Pediatrics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0066 | `02_Internship/JMC_Exam_Practice/QuestionCard.tsx` | `tsx` | Source / Other | `QuestionCard` | `Content Source Layer` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0068 | `02_Internship/JMC_Exam_Practice/Reviewed/internal-medicine-intern-jmc.md` | `md` | Internal Medicine | `internal-medicine-intern-jmc` | `01 — CORE ROTATIONS/Internal Medicine` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0069 | `02_Internship/JMC_Exam_Practice/Reviewed/obgyn-intern-jmc.md` | `md` | OBGYN | `obgyn-intern-jmc` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0070 | `02_Internship/JMC_Exam_Practice/Reviewed/pediatrics-intern-jmc.md` | `md` | Pediatrics | `pediatrics-intern-jmc` | `01 — CORE ROTATIONS/Pediatrics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0071 | `02_Internship/JMC_Exam_Practice/Reviewed/surgery-intern-jmc.md` | `md` | Surgery | `surgery-intern-jmc` | `01 — CORE ROTATIONS/Surgery` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0072 | `02_Internship/JMC_Exam_Practice/Reviewed/_manifest.md` | `md` | Source / Other | `_manifest` | `Content Source Layer` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0074 | `02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-internship.md` | `md` | Internal Medicine | `internal-medicine-internship` | `01 — CORE ROTATIONS/Internal Medicine` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0075 | `02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-study-summary.md` | `md` | Internal Medicine | `internal-medicine-study-summary` | `01 — CORE ROTATIONS/Internal Medicine` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0076 | `02_Internship/JMC_Exam_Practice/Sources_Phone/obgyn-main.md` | `md` | OBGYN | `obgyn-main` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0077 | `02_Internship/JMC_Exam_Practice/Sources_Phone/obgyn-study-summary.md` | `md` | OBGYN | `obgyn-study-summary` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0078 | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-main.md` | `md` | Pediatrics | `pediatrics-main` | `01 — CORE ROTATIONS/Pediatrics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0079 | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary-questions.md` | `md` | Pediatrics | `pediatrics-summary-questions` | `01 — CORE ROTATIONS/Pediatrics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0080 | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary.md` | `md` | Pediatrics | `pediatrics-summary` | `01 — CORE ROTATIONS/Pediatrics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0081 | `02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-internship.md` | `md` | Surgery | `surgery-internship` | `01 — CORE ROTATIONS/Surgery` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0082 | `02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-summary.md` | `md` | Surgery | `surgery-summary` | `01 — CORE ROTATIONS/Surgery` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0083 | `02_Internship/JMC_Exam_Practice/Sources_Phone/_manifest.md` | `md` | Source / Other | `_manifest` | `Content Source Layer` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0085 | `02_Internship/JMC_Exam_Practice/Surgery/page.tsx` | `tsx` | Surgery | `page` | `01 — CORE ROTATIONS/Surgery` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0086 | `02_Internship/JMC_Exam_Practice/Surgery/questionData.ts` | `ts` | Surgery | `questionData` | `01 — CORE ROTATIONS/Surgery` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0088 | `02_Internship/JMC_Exam_Practice/Surgery/[moduleSlug]/page.tsx` | `tsx` | Surgery | `page` | `01 — CORE ROTATIONS/Surgery` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0090 | `02_Internship/Logbook/Logbook_Requirements.md` | `md` | Assessment & Logbook | `Logbook_Requirements` | `04 — ASSESSMENT & LOGBOOK` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0092 | `02_Internship/MCQ/README.md` | `md` | Source / Other | `README` | `Content Source Layer` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0094 | `02_Internship/OSCE/OSCE_Internship_Framework.md` | `md` | OSCE | `OSCE_Internship_Framework` | `04 — ASSESSMENT & LOGBOOK` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0095 | `02_Internship/OSCE/README.md` | `md` | OSCE | `README` | `04 — ASSESSMENT & LOGBOOK` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0098 | `02_Internship/Study/Airway_Basics/page.tsx` | `tsx` | Emergency Basics | `page` | `02 — CLINICAL FOUNDATION/Emergency Basics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0100 | `02_Internship/Study/ED_Workflow/page.tsx` | `tsx` | Source / Other | `page` | `Content Source Layer` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0102 | `02_Internship/Study/Exam_Focus_Map/page.tsx` | `tsx` | Source / Other | `page` | `Content Source Layer` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0104 | `02_Internship/Study/First_Night_Shift/page.tsx` | `tsx` | Emergency Basics | `page` | `02 — CLINICAL FOUNDATION/Emergency Basics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0106 | `02_Internship/Study/Handover/page.tsx` | `tsx` | Emergency Basics | `page` | `02 — CLINICAL FOUNDATION/Emergency Basics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0108 | `02_Internship/Study/Overview/page.tsx` | `tsx` | Start Here | `page` | `00 — START HERE` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0109 | `02_Internship/Study/page.tsx` | `tsx` | Source / Other | `page` | `Content Source Layer` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0111 | `02_Internship/Study/Roadmap/README.md` | `md` | Start Here | `README` | `00 — START HERE` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0115 | `02_Internship/Study/Study_Plan/internal-medicine/emergency-cardiology/page.tsx` | `tsx` | Internal Medicine | `page` | `01 — CORE ROTATIONS/Internal Medicine` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0117 | `02_Internship/Study/Study_Plan/internal-medicine/endocrine-emergencies/page.tsx` | `tsx` | Internal Medicine | `page` | `01 — CORE ROTATIONS/Internal Medicine` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0119 | `02_Internship/Study/Study_Plan/internal-medicine/gi-emergencies/page.tsx` | `tsx` | Internal Medicine | `page` | `01 — CORE ROTATIONS/Internal Medicine` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0121 | `02_Internship/Study/Study_Plan/internal-medicine/infectious-disease/page.tsx` | `tsx` | Internal Medicine | `page` | `01 — CORE ROTATIONS/Internal Medicine` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0123 | `02_Internship/Study/Study_Plan/internal-medicine/nephrology-electrolytes/page.tsx` | `tsx` | Internal Medicine | `page` | `01 — CORE ROTATIONS/Internal Medicine` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0125 | `02_Internship/Study/Study_Plan/internal-medicine/neurology-emergencies/page.tsx` | `tsx` | Internal Medicine | `page` | `01 — CORE ROTATIONS/Internal Medicine` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0126 | `02_Internship/Study/Study_Plan/internal-medicine/page.tsx` | `tsx` | Internal Medicine | `page` | `01 — CORE ROTATIONS/Internal Medicine` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0128 | `02_Internship/Study/Study_Plan/internal-medicine/respiratory-emergencies/page.tsx` | `tsx` | Internal Medicine | `page` | `01 — CORE ROTATIONS/Internal Medicine` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0131 | `02_Internship/Study/Study_Plan/obgyn/breast-disorders/page.tsx` | `tsx` | OBGYN | `page` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0133 | `02_Internship/Study/Study_Plan/obgyn/contraception-oncology-basics/page.tsx` | `tsx` | OBGYN | `page` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0135 | `02_Internship/Study/Study_Plan/obgyn/early-pregnancy-bleeding/page.tsx` | `tsx` | OBGYN | `page` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0137 | `02_Internship/Study/Study_Plan/obgyn/ectopic-pregnancy/page.tsx` | `tsx` | OBGYN | `page` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0139 | `02_Internship/Study/Study_Plan/obgyn/gynecologic-emergencies/page.tsx` | `tsx` | OBGYN | `page` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0141 | `02_Internship/Study/Study_Plan/obgyn/hypertensive-disorders/page.tsx` | `tsx` | OBGYN | `page` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0143 | `02_Internship/Study/Study_Plan/obgyn/labor-delivery/page.tsx` | `tsx` | OBGYN | `page` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0145 | `02_Internship/Study/Study_Plan/obgyn/menstrual-hormonal-disorders/page.tsx` | `tsx` | OBGYN | `page` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0146 | `02_Internship/Study/Study_Plan/obgyn/page.tsx` | `tsx` | OBGYN | `page` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0148 | `02_Internship/Study/Study_Plan/obgyn/perinatal-infections/page.tsx` | `tsx` | OBGYN | `page` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0150 | `02_Internship/Study/Study_Plan/obgyn/postpartum-hemorrhage/page.tsx` | `tsx` | OBGYN | `page` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0152 | `02_Internship/Study/Study_Plan/obgyn/prenatal-care-testing/page.tsx` | `tsx` | OBGYN | `page` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0154 | `02_Internship/Study/Study_Plan/obgyn/reproductive-basics/page.tsx` | `tsx` | OBGYN | `page` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0156 | `02_Internship/Study/Study_Plan/obgyn/stds-vaginal-infections/page.tsx` | `tsx` | OBGYN | `page` | `01 — CORE ROTATIONS/OBGYN` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0157 | `02_Internship/Study/Study_Plan/page.tsx` | `tsx` | Source / Other | `page` | `Content Source Layer` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0160 | `02_Internship/Study/Study_Plan/pediatrics/dehydration-gastroenteritis/page.tsx` | `tsx` | Pediatrics | `page` | `01 — CORE ROTATIONS/Pediatrics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0162 | `02_Internship/Study/Study_Plan/pediatrics/emergency-cases/page.tsx` | `tsx` | Pediatrics | `page` | `01 — CORE ROTATIONS/Pediatrics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0164 | `02_Internship/Study/Study_Plan/pediatrics/infectious-disease-vaccines/page.tsx` | `tsx` | Pediatrics | `page` | `01 — CORE ROTATIONS/Pediatrics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0166 | `02_Internship/Study/Study_Plan/pediatrics/neonatal-emergencies/page.tsx` | `tsx` | Pediatrics | `page` | `01 — CORE ROTATIONS/Pediatrics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0167 | `02_Internship/Study/Study_Plan/pediatrics/page.tsx` | `tsx` | Pediatrics | `page` | `01 — CORE ROTATIONS/Pediatrics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0169 | `02_Internship/Study/Study_Plan/pediatrics/red-flags/page.tsx` | `tsx` | Pediatrics | `page` | `01 — CORE ROTATIONS/Pediatrics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0171 | `02_Internship/Study/Study_Plan/pediatrics/respiratory-emergencies/page.tsx` | `tsx` | Pediatrics | `page` | `01 — CORE ROTATIONS/Pediatrics` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0174 | `02_Internship/Study/Study_Plan/surgery/acute-abdomen/page.tsx` | `tsx` | Surgery | `page` | `01 — CORE ROTATIONS/Surgery` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0176 | `02_Internship/Study/Study_Plan/surgery/fluids-electrolytes-transfusion/page.tsx` | `tsx` | Surgery | `page` | `01 — CORE ROTATIONS/Surgery` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0177 | `02_Internship/Study/Study_Plan/surgery/page.tsx` | `tsx` | Surgery | `page` | `01 — CORE ROTATIONS/Surgery` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0179 | `02_Internship/Study/Study_Plan/surgery/procedures/page.tsx` | `tsx` | Surgery | `page` | `01 — CORE ROTATIONS/Surgery` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0181 | `02_Internship/Study/Study_Plan/surgery/surgical-basics/page.tsx` | `tsx` | Surgery | `page` | `01 — CORE ROTATIONS/Surgery` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0183 | `02_Internship/Study/Study_Plan/surgery/trauma/page.tsx` | `tsx` | Surgery | `page` | `01 — CORE ROTATIONS/Surgery` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0185 | `02_Internship/Study/Study_Plan/surgery/vascular-urology/page.tsx` | `tsx` | Surgery | `page` | `01 — CORE ROTATIONS/Surgery` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0187 | `02_Internship/Study/Study_Plan/surgery/wounds-infections/page.tsx` | `tsx` | Surgery | `page` | `01 — CORE ROTATIONS/Surgery` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0189 | `02_Internship/Study/Study_Plan_Overview/page.tsx` | `tsx` | Start Here | `page` | `00 — START HERE` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0191 | `02_Internship/Toxicology_Essentials/implementation_notes.md` | `md` | Toxicology | `implementation_notes` | `02 — CLINICAL FOUNDATION/Toxicology` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0192 | `02_Internship/Toxicology_Essentials/README.txt` | `txt` | Toxicology | `README` | `02 — CLINICAL FOUNDATION/Toxicology` | `Needs review / verify` | `Check required` | `INCOMPLETE` |
| SRC-0193 | `02_Internship/Toxicology_Essentials/toxicology_essentials_intern_level.md` | `md` | Toxicology | `toxicology_essentials_intern_level` | `02 — CLINICAL FOUNDATION/Toxicology` | `Needs review / verify` | `Check required` | `INCOMPLETE` |


## 5. Governance interpretation

`Needs review / verify` and `Check required` are observed input states, not decisions granted by this audit. Clinical review, rights review, taxonomy review, duplicate adjudication, and implementation authorization remain separate evidence streams.[3] [4]

The audit preserves the following non-actions:

- `content_modified: false`
- `source_preserved: true`
- No source was deleted, renamed, overwritten, normalized, or archived.
- No duplicate was canonically selected.
- No clinical approval, rights approval, schema conversion, database import, activation, commit, push, or deployment was performed.

## 6. Next allowed phase

The next allowed phase is a governed Stage 0/Stage 1 source handoff that fingerprints the actual accessible originals and collects owner, version, rights, explicit track, taxonomy, and locator evidence. The handoff must retain unresolved values as `NOT_SUPPLIED` or `UNRESOLVED`; it must not infer them from file names or folders.[4]

## References

[1]: /home/ubuntu/upload/SEG_INTERNSHIP_SOURCE_CATALOG.csv "SEG Internship source catalog"
[2]: /home/ubuntu/upload/SEG_INTERNSHIP_CONTENT_MASTER_MAP.md "SEG Internship Content Master Map"
[3]: /home/ubuntu/upload/SEG_INTERNSHIP_GAP_AND_DUPLICATE_REPORT.md "SEG Internship Gap and Duplicate Report"
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SCHEMA_MAPPING_READINESS_REPORT.md "SEG Internship Schema Mapping Readiness Report"
