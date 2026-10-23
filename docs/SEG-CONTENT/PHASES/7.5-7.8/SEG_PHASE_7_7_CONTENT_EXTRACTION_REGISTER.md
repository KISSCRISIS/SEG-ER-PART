# SEG Phase 7.7 — Content Extraction Register

> **Status:** `CONTENT_EXTRACTION_PREPARED` — non-production, source-linked extraction only.
>
> This register does not approve, correct, summarize, activate, import, publish, or create learner-facing content. Original sources remain authoritative and unchanged.

**Generated at:** `2026-08-21T09:49:37Z`
**Input rows:** `48`
**SHA verification:** `48/48 PASS`
**Medical review status for every candidate:** `OWNER_REVIEW_REQUIRED`

## Extraction rules

Only fields explicitly supported by the mapped source were recorded. Missing fields are marked `MISSING_FROM_SOURCE` or `UNRESOLVED`; source-heading variants are marked `CONDITIONAL_SOURCE_HEADING_VARIANT`. No content was reconstructed from memory, and no book text was copied.

| Content type | Candidates | Extraction scope |
|---|---:|---|
| `lesson` | 16 | title, educational objective, teaching sections, key learning points, explicit references |
| `question_bank` | 17 | question text, options, correct answer, explanation, reference |
| `clinical_case` | 6 | presentation, history, examination, investigations, assessment, differential, management, reasoning |
| `clinical_skill` | 5 | skill name, indication, contraindication, equipment, steps, assessment method |
| `book` | 4 | title, author, edition/version if explicit, source identity, candidate reference_framework relationship |

## CAND-7.6-SRC-0003 — SRC-0003 — `question_bank`

**Source path:** `02_Internship/Assessments/Assessment_Structure.md`
**SHA-256:** `8c1df6ff33d01eaa58d996ca218485701db3b25afdc3c0aee3eb3f30227de7f2`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Assessments/Assessment_Structure.md:L1-L1` | Assessments — هيكل التقييم الذاتي للامتياز | — |
| `question_text` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `options` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `correct_answer` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `explanation` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `reference` | `EXTRACTED` | `02_Internship/Assessments/Assessment_Structure.md:L2-L2` | L2: > **مستوى:** امتياز (Intern) \| **المصدر:** Pending Source Verification \| **الحالة:** Pending Review | Exact matching lines only; no reconstruction. |

## CAND-7.6-SRC-0004 — SRC-0004 — `question_bank`

**Source path:** `02_Internship/Assessments/README.md`
**SHA-256:** `c09e38390df246d1702365db11796e05fef1e378d9e71bcfb766831ac778246a`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Assessments/README.md:L1-L1` | Assessments — أدوات التقييم للامتياز | — |
| `question_text` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `options` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `correct_answer` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `explanation` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `reference` | `EXTRACTED` | `02_Internship/Assessments/README.md:L11-L11` | L11: ## المصدر الموصى به | Exact matching lines only; no reconstruction. |

## CAND-7.6-SRC-0007 — SRC-0007 — `lesson`

**Source path:** `02_Internship/Clinical_Rotations/Emergency_Basics/Emergency_Basics_Intern_Framework.md`
**SHA-256:** `6905896a44c7cd82696876ca5d6e4a7e0ca969d3d9af4e524390d26a0abc90fd`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Emergency_Basics/Emergency_Basics_Intern_Framework.md:L1-L1` | Emergency Basics — أساسيات الطوارئ للامتياز | — |
| `educational_objective` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit objective/purpose heading found. |
| `teaching_sections` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Emergency_Basics/Emergency_Basics_Intern_Framework.md:L5-L32` | 1. التقييم الأولي للمريض (Initial Assessment) [02_Internship/Clinical_Rotations/Emergency_Basics/Emergency_Basics_Intern_Framework.md:L5-L5]; 2. نهج ABCDE [02_Internship/Clinical_Rotations/Emergency_Basics/Emergency_Basics_Intern_Framework.md:L9-L9]; 3. العروض الطارئة الشائعة [02_Internship/Clinical_Rotations/Emergency_Basics/Emergency_Basics_Intern_Framework.md:L18-L18]; 4. متى تُصعّد (When to Escalate) [02_Internship/Clinical_Rotations/Emergency_Basics/Emergency_Basics_Intern_Framework.md:L25-L25]; 5. سير العمل الأساسي [02_Internship/Clinical_Rotations/Emergency_Basics/Emergency_Basics_Intern_Framework.md:L29-L29] | Heading inventory only; source bodies remain in original files. |
| `key_learning_points` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit key-learning heading found. |
| `references` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Emergency_Basics/Emergency_Basics_Intern_Framework.md:L2-L2` | > **مستوى:** امتياز (Intern) \| **المصدر:** Pending Source Verification \| **الحالة:** Pending Review | Explicit reference/source line. |

## CAND-7.6-SRC-0008 — SRC-0008 — `lesson`

**Source path:** `02_Internship/Clinical_Rotations/Emergency_Basics/README.md`
**SHA-256:** `4e70507f9248eb1e8babef0a7d0882989c2609934725cfd4b757a16474560a86`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Emergency_Basics/README.md:L1-L1` | Emergency Basics — أساسيات الطوارئ للامتياز | — |
| `educational_objective` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit objective/purpose heading found. |
| `teaching_sections` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Emergency_Basics/README.md:L5-L18` | المحتوى المتاح محلياً [02_Internship/Clinical_Rotations/Emergency_Basics/README.md:L5-L5]; الفجوة [02_Internship/Clinical_Rotations/Emergency_Basics/README.md:L16-L16] | Heading inventory only; source bodies remain in original files. |
| `key_learning_points` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit key-learning heading found. |
| `references` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Emergency_Basics/README.md:L19-L22` | ## المصدر الموصى به<br>- Jordan Medical Council — قسم الطوارئ في الامتياز<br>- مصادر طوارئ امتياز معتمدة | Original heading: المصدر الموصى به |

## CAND-7.6-SRC-0010 — SRC-0010 — `lesson`

**Source path:** `02_Internship/Clinical_Rotations/Internal_Medicine/Rotation_Objectives.md`
**SHA-256:** `8c5ba43ad4d14a788f8f152a8fab65e9bb2c5478404538726a22106c66626988`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Internal_Medicine/Rotation_Objectives.md:L1-L1` | Internal Medicine — أهداف تناوب الامتياز | — |
| `educational_objective` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Internal_Medicine/Rotation_Objectives.md:L1-L4` | # Internal Medicine — أهداف تناوب الامتياز<br>> **مستوى:** امتياز (Intern) \| **المصدر:** Pending Source Verification \| **الحالة:** Pending Review | Original heading: Internal Medicine — أهداف تناوب الامتياز |
| `teaching_sections` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Internal_Medicine/Rotation_Objectives.md:L10-L24` | 2. المعرفة المتوقعة (Expected Knowledge) [02_Internship/Clinical_Rotations/Internal_Medicine/Rotation_Objectives.md:L10-L10]; 3. المهارات الأساسية (Core Skills) [02_Internship/Clinical_Rotations/Internal_Medicine/Rotation_Objectives.md:L16-L16]; 4. الحالات الشائعة (Common Cases) [02_Internship/Clinical_Rotations/Internal_Medicine/Rotation_Objectives.md:L21-L21] | Heading inventory only; source bodies remain in original files. |
| `key_learning_points` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Internal_Medicine/Rotation_Objectives.md:L10-L24` | 2. المعرفة المتوقعة (Expected Knowledge) [02_Internship/Clinical_Rotations/Internal_Medicine/Rotation_Objectives.md:L10-L10]; 3. المهارات الأساسية (Core Skills) [02_Internship/Clinical_Rotations/Internal_Medicine/Rotation_Objectives.md:L16-L16]; 4. الحالات الشائعة (Common Cases) [02_Internship/Clinical_Rotations/Internal_Medicine/Rotation_Objectives.md:L21-L21] | Exact heading labels only; no inferred learning points. |
| `references` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Internal_Medicine/Rotation_Objectives.md:L2-L2` | > **مستوى:** امتياز (Intern) \| **المصدر:** Pending Source Verification \| **الحالة:** Pending Review | Explicit reference/source line. |

## CAND-7.6-SRC-0012 — SRC-0012 — `lesson`

**Source path:** `02_Internship/Clinical_Rotations/Obstetrics_Gynecology/Rotation_Objectives.md`
**SHA-256:** `6028f47c68a813428aa563166e93cd28bc18cb082eee7437e8993d3938dd8bef`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Obstetrics_Gynecology/Rotation_Objectives.md:L1-L1` | Obstetrics & Gynecology — أهداف تناوب الامتياز | — |
| `educational_objective` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Obstetrics_Gynecology/Rotation_Objectives.md:L1-L4` | # Obstetrics & Gynecology — أهداف تناوب الامتياز<br>> **مستوى:** امتياز (Intern) \| **المصدر:** Pending Source Verification \| **الحالة:** Pending Review | Original heading: Obstetrics & Gynecology — أهداف تناوب الامتياز |
| `teaching_sections` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Obstetrics_Gynecology/Rotation_Objectives.md:L10-L24` | 2. المعرفة المتوقعة (Expected Knowledge) [02_Internship/Clinical_Rotations/Obstetrics_Gynecology/Rotation_Objectives.md:L10-L10]; 3. المهارات الأساسية (Core Skills) [02_Internship/Clinical_Rotations/Obstetrics_Gynecology/Rotation_Objectives.md:L16-L16]; 4. الحالات الشائعة (Common Cases) [02_Internship/Clinical_Rotations/Obstetrics_Gynecology/Rotation_Objectives.md:L21-L21] | Heading inventory only; source bodies remain in original files. |
| `key_learning_points` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Obstetrics_Gynecology/Rotation_Objectives.md:L10-L24` | 2. المعرفة المتوقعة (Expected Knowledge) [02_Internship/Clinical_Rotations/Obstetrics_Gynecology/Rotation_Objectives.md:L10-L10]; 3. المهارات الأساسية (Core Skills) [02_Internship/Clinical_Rotations/Obstetrics_Gynecology/Rotation_Objectives.md:L16-L16]; 4. الحالات الشائعة (Common Cases) [02_Internship/Clinical_Rotations/Obstetrics_Gynecology/Rotation_Objectives.md:L21-L21] | Exact heading labels only; no inferred learning points. |
| `references` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Obstetrics_Gynecology/Rotation_Objectives.md:L2-L2` | > **مستوى:** امتياز (Intern) \| **المصدر:** Pending Source Verification \| **الحالة:** Pending Review | Explicit reference/source line. |

## CAND-7.6-SRC-0014 — SRC-0014 — `lesson`

**Source path:** `02_Internship/Clinical_Rotations/Pediatrics/Rotation_Objectives.md`
**SHA-256:** `4e179a35361f619bc63d495d871473d6cbad232c71188956f4ea23015de4ba72`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Pediatrics/Rotation_Objectives.md:L1-L1` | Pediatrics — أهداف تناوب الامتياز | — |
| `educational_objective` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Pediatrics/Rotation_Objectives.md:L1-L4` | # Pediatrics — أهداف تناوب الامتياز<br>> **مستوى:** امتياز (Intern) \| **المصدر:** Pending Source Verification \| **الحالة:** Pending Review | Original heading: Pediatrics — أهداف تناوب الامتياز |
| `teaching_sections` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Pediatrics/Rotation_Objectives.md:L10-L24` | 2. المعرفة المتوقعة (Expected Knowledge) [02_Internship/Clinical_Rotations/Pediatrics/Rotation_Objectives.md:L10-L10]; 3. المهارات الأساسية (Core Skills) [02_Internship/Clinical_Rotations/Pediatrics/Rotation_Objectives.md:L16-L16]; 4. الحالات الشائعة (Common Cases) [02_Internship/Clinical_Rotations/Pediatrics/Rotation_Objectives.md:L21-L21] | Heading inventory only; source bodies remain in original files. |
| `key_learning_points` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Pediatrics/Rotation_Objectives.md:L10-L24` | 2. المعرفة المتوقعة (Expected Knowledge) [02_Internship/Clinical_Rotations/Pediatrics/Rotation_Objectives.md:L10-L10]; 3. المهارات الأساسية (Core Skills) [02_Internship/Clinical_Rotations/Pediatrics/Rotation_Objectives.md:L16-L16]; 4. الحالات الشائعة (Common Cases) [02_Internship/Clinical_Rotations/Pediatrics/Rotation_Objectives.md:L21-L21] | Exact heading labels only; no inferred learning points. |
| `references` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Pediatrics/Rotation_Objectives.md:L2-L2` | > **مستوى:** امتياز (Intern) \| **المصدر:** Pending Source Verification \| **الحالة:** Pending Review | Explicit reference/source line. |

## CAND-7.6-SRC-0015 — SRC-0015 — `lesson`

**Source path:** `02_Internship/Clinical_Rotations/README.md`
**SHA-256:** `94d6b002261f320a9c8e71188926204837e5918d073a40e170b3d3b50a31b62a`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Clinical_Rotations/README.md:L1-L1` | Clinical Rotations — التناوبات السريرية للامتياز | — |
| `educational_objective` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit objective/purpose heading found. |
| `teaching_sections` | `EXTRACTED` | `02_Internship/Clinical_Rotations/README.md:L7-L15` | التناوبات المطلوبة [02_Internship/Clinical_Rotations/README.md:L7-L7] | Heading inventory only; source bodies remain in original files. |
| `key_learning_points` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit key-learning heading found. |
| `references` | `EXTRACTED` | `02_Internship/Clinical_Rotations/README.md:L16-L20` | ## المصدر الموصى به للتحقق<br>- Jordan Ministry of Health (moh.gov.jo) — متطلبات تدريب الامتياز<br>- Jordan Medical Council (jmc.gov.jo) — لوائح الامتياز والتقييم<br>- Official curricula: University of Jordan, JUST, Hashemite University | Original heading: المصدر الموصى به للتحقق |

## CAND-7.6-SRC-0017 — SRC-0017 — `lesson`

**Source path:** `02_Internship/Clinical_Rotations/Surgery/Rotation_Objectives.md`
**SHA-256:** `1cc4aa679dce0c3ef1fc9f1a8abd193945041804296e044c524a292b0f0a348a`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Surgery/Rotation_Objectives.md:L1-L1` | Surgery — أهداف تناوب الامتياز | — |
| `educational_objective` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Surgery/Rotation_Objectives.md:L1-L4` | # Surgery — أهداف تناوب الامتياز<br>> **مستوى:** امتياز (Intern) \| **المصدر:** Pending Source Verification \| **الحالة:** Pending Review | Original heading: Surgery — أهداف تناوب الامتياز |
| `teaching_sections` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Surgery/Rotation_Objectives.md:L10-L25` | 2. المعرفة المتوقعة (Expected Knowledge) [02_Internship/Clinical_Rotations/Surgery/Rotation_Objectives.md:L10-L10]; 3. المهارات الأساسية (Core Skills) [02_Internship/Clinical_Rotations/Surgery/Rotation_Objectives.md:L17-L17]; 4. الحالات الشائعة (Common Cases) [02_Internship/Clinical_Rotations/Surgery/Rotation_Objectives.md:L22-L22] | Heading inventory only; source bodies remain in original files. |
| `key_learning_points` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Surgery/Rotation_Objectives.md:L10-L25` | 2. المعرفة المتوقعة (Expected Knowledge) [02_Internship/Clinical_Rotations/Surgery/Rotation_Objectives.md:L10-L10]; 3. المهارات الأساسية (Core Skills) [02_Internship/Clinical_Rotations/Surgery/Rotation_Objectives.md:L17-L17]; 4. الحالات الشائعة (Common Cases) [02_Internship/Clinical_Rotations/Surgery/Rotation_Objectives.md:L22-L22] | Exact heading labels only; no inferred learning points. |
| `references` | `EXTRACTED` | `02_Internship/Clinical_Rotations/Surgery/Rotation_Objectives.md:L2-L2` | > **مستوى:** امتياز (Intern) \| **المصدر:** Pending Source Verification \| **الحالة:** Pending Review | Explicit reference/source line. |

## CAND-7.6-SRC-0019 — SRC-0019 — `clinical_skill`

**Source path:** `02_Internship/Clinical_Skills/Clinical_Skills_Internship_Framework.md`
**SHA-256:** `2ee9c201e9e431fac17ab1644bfb826ecfd5d546683acc5ec128b8482ab10d27`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `skill_name` | `EXTRACTED` | `02_Internship/Clinical_Skills/Clinical_Skills_Internship_Framework.md:L1-L1` | Clinical Skills — المهارات السريرية الأساسية (مستوى امتياز) | Source title only; not a competency record. |
| `indication` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `contraindication` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `equipment` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `steps` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `assessment_method` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `competency_boundary` | `EXPLICIT_NON_ACTION` | `N/A` | NO_SIGN_OFF; NO_AUTHORIZATION; NO_CREDENTIAL | Governance boundary required by Phase 7.7. |

## CAND-7.6-SRC-0020 — SRC-0020 — `clinical_skill`

**Source path:** `02_Internship/Clinical_Skills/README.md`
**SHA-256:** `6e3156e5deabcbbf63b6b8c7f0c097bf66941a59c0267a4f86603e254901119b`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `skill_name` | `EXTRACTED` | `02_Internship/Clinical_Skills/README.md:L1-L1` | Clinical Skills — المهارات السريرية الأساسية للامتياز | Source title only; not a competency record. |
| `indication` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `contraindication` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `equipment` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `steps` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `assessment_method` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `competency_boundary` | `EXPLICIT_NON_ACTION` | `N/A` | NO_SIGN_OFF; NO_AUTHORIZATION; NO_CREDENTIAL | Governance boundary required by Phase 7.7. |

## CAND-7.6-SRC-0023 — SRC-0023 — `lesson`

**Source path:** `02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md`
**SHA-256:** `bb0508f5b5a4bbdbf4919d28f4115f444c26ed514c2c4f50f13723bab91225fb`
**Duplicate lineage:** `DUP-DRUG-001`; role `HISTORICAL_LINEAGE_PRESERVED`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L1-L1` | ﻿# Drug Essentials â€” Intern Level v2 | — |
| `educational_objective` | `EXTRACTED` | `02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L27-L41` | ## Page Purpose<br><br>This page teaches the intern how to think safely before, during, and after ED medication use. It is not a drug dosing table and not a substitute for local drug references.<br><br>The intern goal is simple:<br><br>- Recognize high-risk medication situations.<br>- Check patient-specific risk factors before prescribing or administering.<br>- Confirm uncertain plans with a senior, nurse, pharmacist, or local reference.<br>- Monitor after medication.<br>- Document clearly.<br>- Avoid acting alone with high-risk medication decisions.<br><br>--- | Original heading: Page Purpose |
| `teaching_sections` | `EXTRACTED` | `02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L13-L416` | Header [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L13-L13]; 1. Medication Safety Mindset [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L42-L42]; 2. The 30-Second Medication Pause [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L63-L63]; Patient checks [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L67-L67]; Medication checks [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L82-L82]; 3. High-Risk Drug Groups in the ED [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L98-L98]; Opioids [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L102-L102]; Sedatives and anxiolytics [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L110-L110]; Paralytics and RSI-related drugs [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L118-L118]; Vasopressors and inotropes [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L126-L126]; Anticoagulants and antiplatelets [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L134-L134]; Insulin and glucose-changing therapies [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L142-L142]; Potassium and electrolyte therapies [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L150-L150]; Antiarrhythmics [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L158-L158]; Antibiotics [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L166-L166]; Toxicology-related antidotes [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L174-L174]; 4. What Interns Should Not Do Alone [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L184-L184]; 5. Medication Confirmation Workflow [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L215-L215]; Confirm with the senior [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L219-L219]; Confirm with the nurse [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L229-L229]; Confirm with pharmacy or local reference [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L241-L241]; Confirm with yourself [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L253-L253]; 6. Monitoring After Medication [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L267-L267]; 7. Medication Documentation Essentials [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L291-L291]; 8. Common JMC / Exam Traps [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L321-L321]; Trap 1 â€” Treating the number instead of the patient [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L323-L323]; Trap 2 â€” Ignoring allergy history [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L327-L327]; Trap 3 â€” Forgetting renal or liver disease [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L331-L331]; Trap 4 â€” Sedating the undifferentiated agitated patient [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L335-L335]; Trap 5 â€” Missing duplicate therapy [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L339-L339]; Trap 6 â€” Giving a high-risk medication without monitoring [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L343-L343]; Trap 7 â€” Treating toxicology like routine pharmacology [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L347-L347]; Trap 8 â€” Calling late [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L351-L351]; 9. Quick Medication Safety Checklist [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L357-L357]; Future Leveling Notes [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L382-L382]; Resident Level Later [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L384-L384]; EMS Level Later [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L396-L396]; Medical Student Level Later [02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L406-L406] | Heading inventory only; source bodies remain in original files. |
| `key_learning_points` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit key-learning heading found. |
| `references` | `EXTRACTED` | `02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L241-L252` | ### Confirm with pharmacy or local reference<br><br>Use when:<br><br>- High-risk medication.<br>- Pediatric or frail elderly patient.<br>- Renal/liver disease.<br>- Pregnancy/lactation.<br>- Multiple medications.<br>- Unfamiliar medication.<br>- Toxicology/antidote situation. | Original heading: Confirm with pharmacy or local reference |
| `references` | `EXTRACTED` | `02_Internship/Drug_Essentials/drug_essentials_intern_level_v2.md:L440-L443` | ## Copyright and Source Use Note<br><br>This content is an original SEG educational synthesis. It uses the uploaded emergency medicine sources only as conceptual study references. It does not reproduce copyrighted questions, tables, or explanations verbatim. | Original heading: Copyright and Source Use Note |

## CAND-7.6-SRC-0024 — SRC-0024 — `lesson`

**Source path:** `02_Internship/Drug_Essentials/implementation_notes.md`
**SHA-256:** `810d08ed40ef7f190995b2eead2d8ee670d06de511223e1455dea5bb3d9d1e1e`
**Duplicate lineage:** `DUP-DRUG-001`; role `HISTORICAL_LINEAGE_PRESERVED`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Drug_Essentials/implementation_notes.md:L1-L1` | ﻿# Implementation Notes â€” Drug Essentials Intern Level v2 | — |
| `educational_objective` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit objective/purpose heading found. |
| `teaching_sections` | `EXTRACTED` | `02_Internship/Drug_Essentials/implementation_notes.md:L3-L46` | Target [02_Internship/Drug_Essentials/implementation_notes.md:L3-L3]; SEG rules [02_Internship/Drug_Essentials/implementation_notes.md:L7-L7]; Safety boundaries [02_Internship/Drug_Essentials/implementation_notes.md:L14-L14]; Build workflow [02_Internship/Drug_Essentials/implementation_notes.md:L25-L25] | Heading inventory only; source bodies remain in original files. |
| `key_learning_points` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit key-learning heading found. |
| `references` | `EXTRACTED` | `02_Internship/Drug_Essentials/implementation_notes.md:L47-L55` | ## Source basis<br><br>Core uploaded sources:<br>- Tintinalliâ€™s Emergency Medicine Examination and Board Review 2023.<br>- Rosenâ€™s Emergency Medicine 10e Q&A.<br>- Rosh Rapid Review â€” Emergency Medicine Rotation Exam.<br><br>Use as conceptual source-informed references only. Do not copy copyrighted wording or questions. | Original heading: Source basis |

## CAND-7.6-SRC-0025 — SRC-0025 — `lesson`

**Source path:** `02_Internship/Drug_Essentials/README.txt`
**SHA-256:** `64469d1134e1045a96230469388ea31b7f4adc797be7f2260696df30a0e93401`
**Duplicate lineage:** `DUP-DRUG-001`; role `HISTORICAL_LINEAGE_PRESERVED`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Drug_Essentials/README.txt:L1-L1` | ﻿SEG Drug Essentials â€” Intern Level v2 | — |
| `educational_objective` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit objective/purpose heading found. |
| `teaching_sections` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No teaching section headings identified under the source-supported rule. |
| `key_learning_points` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit key-learning heading found. |
| `references` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit reference/source section found. |

## CAND-7.6-SRC-0027 — SRC-0027 — `lesson`

**Source path:** `02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md`
**SHA-256:** `2bc084ccf0d074cf22573b8ca352b0918eb1ca448eed8f2a6885a3f5e2777d27`
**Duplicate lineage:** `DUP-DRUG-001`; role `PRIMARY_EDUCATIONAL_CANDIDATE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L1-L1` | Drug Essentials — Intern Level v2 | — |
| `educational_objective` | `EXTRACTED` | `02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L27-L41` | ## Page Purpose<br><br>This page teaches the intern how to think safely before, during, and after ED medication use. It is not a drug dosing table and not a substitute for local drug references.<br><br>The intern goal is simple:<br><br>- Recognize high-risk medication situations.<br>- Check patient-specific risk factors before prescribing or administering.<br>- Confirm uncertain plans with a senior, nurse, pharmacist, or local reference.<br>- Monitor after medication.<br>- Document clearly.<br>- Avoid acting alone with high-risk medication decisions.<br><br>--- | Original heading: Page Purpose |
| `teaching_sections` | `EXTRACTED` | `02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L13-L416` | Header [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L13-L13]; 1. Medication Safety Mindset [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L42-L42]; 2. The 30-Second Medication Pause [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L63-L63]; Patient checks [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L67-L67]; Medication checks [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L82-L82]; 3. High-Risk Drug Groups in the ED [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L98-L98]; Opioids [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L102-L102]; Sedatives and anxiolytics [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L110-L110]; Paralytics and RSI-related drugs [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L118-L118]; Vasopressors and inotropes [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L126-L126]; Anticoagulants and antiplatelets [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L134-L134]; Insulin and glucose-changing therapies [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L142-L142]; Potassium and electrolyte therapies [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L150-L150]; Antiarrhythmics [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L158-L158]; Antibiotics [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L166-L166]; Toxicology-related antidotes [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L174-L174]; 4. What Interns Should Not Do Alone [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L184-L184]; 5. Medication Confirmation Workflow [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L215-L215]; Confirm with the senior [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L219-L219]; Confirm with the nurse [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L229-L229]; Confirm with pharmacy or local reference [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L241-L241]; Confirm with yourself [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L253-L253]; 6. Monitoring After Medication [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L267-L267]; 7. Medication Documentation Essentials [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L291-L291]; 8. Common JMC / Exam Traps [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L321-L321]; Trap 1 — Treating the number instead of the patient [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L323-L323]; Trap 2 — Ignoring allergy history [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L327-L327]; Trap 3 — Forgetting renal or liver disease [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L331-L331]; Trap 4 — Sedating the undifferentiated agitated patient [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L335-L335]; Trap 5 — Missing duplicate therapy [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L339-L339]; Trap 6 — Giving a high-risk medication without monitoring [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L343-L343]; Trap 7 — Treating toxicology like routine pharmacology [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L347-L347]; Trap 8 — Calling late [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L351-L351]; 9. Quick Medication Safety Checklist [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L357-L357]; Future Leveling Notes [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L382-L382]; Resident Level Later [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L384-L384]; EMS Level Later [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L396-L396]; Medical Student Level Later [02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L406-L406] | Heading inventory only; source bodies remain in original files. |
| `key_learning_points` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit key-learning heading found. |
| `references` | `EXTRACTED` | `02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L241-L252` | ### Confirm with pharmacy or local reference<br><br>Use when:<br><br>- High-risk medication.<br>- Pediatric or frail elderly patient.<br>- Renal/liver disease.<br>- Pregnancy/lactation.<br>- Multiple medications.<br>- Unfamiliar medication.<br>- Toxicology/antidote situation. | Original heading: Confirm with pharmacy or local reference |
| `references` | `EXTRACTED` | `02_Internship/Drug_Essentials_v2_Pack/drug_essentials_intern_level_v2.md:L440-L442` | ## Copyright and Source Use Note<br><br>This content is an original SEG educational synthesis. It uses the uploaded emergency medicine sources only as conceptual study references. It does not reproduce copyrighted questions, tables, or explanations verbatim. | Original heading: Copyright and Source Use Note |

## CAND-7.6-SRC-0028 — SRC-0028 — `lesson`

**Source path:** `02_Internship/Drug_Essentials_v2_Pack/implementation_notes.md`
**SHA-256:** `5a30d419e6aa14626652532d3d657a7657f4cea2dc49980805497d29d5a36831`
**Duplicate lineage:** `DUP-DRUG-001`; role `PRIMARY_EDUCATIONAL_CANDIDATE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Drug_Essentials_v2_Pack/implementation_notes.md:L1-L1` | Implementation Notes — Drug Essentials Intern Level v2 | — |
| `educational_objective` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit objective/purpose heading found. |
| `teaching_sections` | `EXTRACTED` | `02_Internship/Drug_Essentials_v2_Pack/implementation_notes.md:L3-L46` | Target [02_Internship/Drug_Essentials_v2_Pack/implementation_notes.md:L3-L3]; SEG rules [02_Internship/Drug_Essentials_v2_Pack/implementation_notes.md:L7-L7]; Safety boundaries [02_Internship/Drug_Essentials_v2_Pack/implementation_notes.md:L14-L14]; Build workflow [02_Internship/Drug_Essentials_v2_Pack/implementation_notes.md:L25-L25] | Heading inventory only; source bodies remain in original files. |
| `key_learning_points` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit key-learning heading found. |
| `references` | `EXTRACTED` | `02_Internship/Drug_Essentials_v2_Pack/implementation_notes.md:L47-L54` | ## Source basis<br><br>Core uploaded sources:<br>- Tintinalli’s Emergency Medicine Examination and Board Review 2023.<br>- Rosen’s Emergency Medicine 10e Q&A.<br>- Rosh Rapid Review — Emergency Medicine Rotation Exam.<br><br>Use as conceptual source-informed references only. Do not copy copyrighted wording or questions. | Original heading: Source basis |

## CAND-7.6-SRC-0029 — SRC-0029 — `lesson`

**Source path:** `02_Internship/Drug_Essentials_v2_Pack/README.txt`
**SHA-256:** `5c2377e8c30aa6c901eb5bb5a3b4c6679c33f27de883c480a42e38eab6282eb5`
**Duplicate lineage:** `DUP-DRUG-001`; role `PRIMARY_EDUCATIONAL_CANDIDATE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Drug_Essentials_v2_Pack/README.txt:L1-L1` | SEG Drug Essentials — Intern Level v2 | — |
| `educational_objective` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit objective/purpose heading found. |
| `teaching_sections` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No teaching section headings identified under the source-supported rule. |
| `key_learning_points` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit key-learning heading found. |
| `references` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit reference/source section found. |

## CAND-7.6-SRC-0033 — SRC-0033 — `clinical_case`

**Source path:** `02_Internship/Emergency_Cases/emergency_cases_intern_level.md`
**SHA-256:** `2b3afae2bf4d19d837f0075ca979c5810d49eb3e82f0dcb9356ce1a47962a99c`
**Duplicate lineage:** `DUP-EMERGENCY-001`; role `HISTORICAL_LINEAGE_PRESERVED`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L69-L69` | Case 1 â€” Chest Pain | — |
| `presentation` | `EXTRACTED` | `02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L71-L576` | Presentation [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L71-L74]; Presentation [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L121-L124]; Presentation [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L179-L182]; Presentation [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L233-L236]; Presentation [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L293-L296]; Presentation [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L347-L350]; Presentation [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L403-L406]; Presentation [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L459-L462]; Presentation [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L513-L516]; Presentation [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L573-L576] | Original heading labels preserved; no clinical normalization. |
| `history` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `examination` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `investigations` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `assessment` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `differential` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `management` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `reasoning` | `CONDITIONAL_SOURCE_HEADING_VARIANT` | `02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L86-L607` | Immediate thinking [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L86-L98]; Immediate thinking [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L139-L155]; Immediate thinking [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L197-L209]; Immediate thinking [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L251-L268]; Immediate thinking [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L311-L323]; Immediate thinking [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L365-L379]; Immediate thinking [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L420-L434]; Immediate thinking [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L476-L489]; Immediate thinking [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L533-L547]; Immediate thinking [02_Internship/Emergency_Cases/emergency_cases_intern_level.md:L593-L607] | Original heading labels preserved; no clinical normalization. |

## CAND-7.6-SRC-0034 — SRC-0034 — `clinical_case`

**Source path:** `02_Internship/Emergency_Cases/implementation_notes.md`
**SHA-256:** `6b74fe4e4b450289df6cb54358f32f46da737236646310da9784d5cefde649a8`
**Duplicate lineage:** `DUP-EMERGENCY-001`; role `HISTORICAL_LINEAGE_PRESERVED`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Emergency_Cases/implementation_notes.md:L1-L1` | ﻿# Implementation Notes â€” Emergency Cases Intern Level | — |
| `presentation` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `history` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `examination` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `investigations` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `assessment` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `differential` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `management` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `reasoning` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |

## CAND-7.6-SRC-0035 — SRC-0035 — `clinical_case`

**Source path:** `02_Internship/Emergency_Cases/README.txt`
**SHA-256:** `e22eeb24f6ed69e75ae1d4d6c90e4ce67a4b0549a2c7af5364e578011e8a17bd`
**Duplicate lineage:** `DUP-EMERGENCY-001`; role `HISTORICAL_LINEAGE_PRESERVED`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Emergency_Cases/README.txt:L1-L1` | ﻿SEG Emergency Cases â€” Intern Level | — |
| `presentation` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `history` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `examination` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `investigations` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `assessment` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `differential` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `management` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `reasoning` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |

## CAND-7.6-SRC-0037 — SRC-0037 — `clinical_case`

**Source path:** `02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md`
**SHA-256:** `455983813a4f540fc6b5f9520e245886ed775c1ae472ade79ce7089b6ed068a4`
**Duplicate lineage:** `DUP-EMERGENCY-001`; role `PRIMARY_EDUCATIONAL_CANDIDATE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L1-L1` | Emergency Cases — Intern Level | — |
| `presentation` | `EXTRACTED` | `02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L71-L576` | Presentation [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L71-L74]; Presentation [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L121-L124]; Presentation [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L179-L182]; Presentation [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L233-L236]; Presentation [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L293-L296]; Presentation [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L347-L350]; Presentation [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L403-L406]; Presentation [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L459-L462]; Presentation [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L513-L516]; Presentation [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L573-L576] | Original heading labels preserved; no clinical normalization. |
| `history` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `examination` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `investigations` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `assessment` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `differential` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `management` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `reasoning` | `CONDITIONAL_SOURCE_HEADING_VARIANT` | `02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L86-L607` | Immediate thinking [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L86-L98]; Immediate thinking [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L139-L155]; Immediate thinking [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L197-L209]; Immediate thinking [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L251-L268]; Immediate thinking [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L311-L323]; Immediate thinking [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L365-L379]; Immediate thinking [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L420-L434]; Immediate thinking [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L476-L489]; Immediate thinking [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L533-L547]; Immediate thinking [02_Internship/Emergency_Cases_v2_Pack/emergency_cases_intern_level.md:L593-L607] | Original heading labels preserved; no clinical normalization. |

## CAND-7.6-SRC-0038 — SRC-0038 — `clinical_case`

**Source path:** `02_Internship/Emergency_Cases_v2_Pack/implementation_notes.md`
**SHA-256:** `4fedbe459e19e938cb63fb164d025e651593d0b7dc56a75237d05c8fd83d3495`
**Duplicate lineage:** `DUP-EMERGENCY-001`; role `PRIMARY_EDUCATIONAL_CANDIDATE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Emergency_Cases_v2_Pack/implementation_notes.md:L1-L1` | Implementation Notes — Emergency Cases Intern Level | — |
| `presentation` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `history` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `examination` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `investigations` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `assessment` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `differential` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `management` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `reasoning` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |

## CAND-7.6-SRC-0039 — SRC-0039 — `clinical_case`

**Source path:** `02_Internship/Emergency_Cases_v2_Pack/README.txt`
**SHA-256:** `81d8a30163db1bc453c936dc9815a42630acebd88f48905d4befb44b626c0ce1`
**Duplicate lineage:** `DUP-EMERGENCY-001`; role `PRIMARY_EDUCATIONAL_CANDIDATE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Emergency_Cases_v2_Pack/README.txt:L1-L1` | SEG Emergency Cases — Intern Level | — |
| `presentation` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `history` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `examination` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `investigations` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `assessment` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `differential` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `management` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |
| `reasoning` | `UNRESOLVED` | `NOT_FOUND` | UNRESOLVED | Requested contract field not explicitly present in this source. |

## CAND-7.6-SRC-0041 — SRC-0041 — `book`

**Source path:** `02_Internship/Internship books SEG/IM_HighYield_Review.pdf`
**SHA-256:** `d6374402fc43b236023cebf6679240c4229d6e570be4f81a216a9498a9f7543d`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;PAGE_LOCATOR_REVIEW_REQUIRED`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Internship books SEG/IM_HighYield_Review.pdf; pdfinfo:Title` | Internal Medicine High-Yield Review — Dr Alaa Aqrabawi | No book text copied. |
| `author` | `MISSING_FROM_SOURCE` | `02_Internship/Internship books SEG/IM_HighYield_Review.pdf` | MISSING_FROM_SOURCE | No author inferred. |
| `edition_or_version` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Only explicit PDF metadata is considered. |
| `source_identity` | `EXTRACTED` | `02_Internship/Internship books SEG/IM_HighYield_Review.pdf` | path=02_Internship/Internship books SEG/IM_HighYield_Review.pdf; sha256=d6374402fc43b236023cebf6679240c4229d6e570be4f81a216a9498a9f7543d | Book text not copied; future reference_framework relationship requires owner/rights/locator review. |
| `reference_framework_relationship` | `CANDIDATE_ONLY` | `02_Internship/Internship books SEG/IM_HighYield_Review.pdf` | book_record_id=PROVISIONAL; framework_name=NOT_SUPPLIED; framework_role=NOT_SUPPLIED; citation_locator_policy=NOT_SUPPLIED; display_scope=NOT_SUPPLIED | Design relationship only; no learner display or rights decision. |

## CAND-7.6-SRC-0042 — SRC-0042 — `book`

**Source path:** `02_Internship/Internship books SEG/ObGyn_HighYield_Review_Dr_Alaa_Aqrabawi.pdf`
**SHA-256:** `2ea59d2787806fc09d0922f0e8116b08e41ca57c2aaa2aa42b4d179f1f9138f9`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;PAGE_LOCATOR_REVIEW_REQUIRED`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Internship books SEG/ObGyn_HighYield_Review_Dr_Alaa_Aqrabawi.pdf; pdfinfo:Title` | Obstetrics & Gynecology High-Yield Review — Dr Alaa Aqrabawi | No book text copied. |
| `author` | `MISSING_FROM_SOURCE` | `02_Internship/Internship books SEG/ObGyn_HighYield_Review_Dr_Alaa_Aqrabawi.pdf` | MISSING_FROM_SOURCE | No author inferred. |
| `edition_or_version` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Only explicit PDF metadata is considered. |
| `source_identity` | `EXTRACTED` | `02_Internship/Internship books SEG/ObGyn_HighYield_Review_Dr_Alaa_Aqrabawi.pdf` | path=02_Internship/Internship books SEG/ObGyn_HighYield_Review_Dr_Alaa_Aqrabawi.pdf; sha256=2ea59d2787806fc09d0922f0e8116b08e41ca57c2aaa2aa42b4d179f1f9138f9 | Book text not copied; future reference_framework relationship requires owner/rights/locator review. |
| `reference_framework_relationship` | `CANDIDATE_ONLY` | `02_Internship/Internship books SEG/ObGyn_HighYield_Review_Dr_Alaa_Aqrabawi.pdf` | book_record_id=PROVISIONAL; framework_name=NOT_SUPPLIED; framework_role=NOT_SUPPLIED; citation_locator_policy=NOT_SUPPLIED; display_scope=NOT_SUPPLIED | Design relationship only; no learner display or rights decision. |

## CAND-7.6-SRC-0043 — SRC-0043 — `book`

**Source path:** `02_Internship/Internship books SEG/Pediatrics_HighYield_Review.pdf`
**SHA-256:** `9817f7cf2a905d76deb029a1658f81eb1c0e4e05e7de104ea71b6914626aee7a`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;PAGE_LOCATOR_REVIEW_REQUIRED`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Internship books SEG/Pediatrics_HighYield_Review.pdf; pdfinfo:Title` | Pediatrics High-Yield Review — Dr Alaa Aqrabawi | No book text copied. |
| `author` | `MISSING_FROM_SOURCE` | `02_Internship/Internship books SEG/Pediatrics_HighYield_Review.pdf` | MISSING_FROM_SOURCE | No author inferred. |
| `edition_or_version` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Only explicit PDF metadata is considered. |
| `source_identity` | `EXTRACTED` | `02_Internship/Internship books SEG/Pediatrics_HighYield_Review.pdf` | path=02_Internship/Internship books SEG/Pediatrics_HighYield_Review.pdf; sha256=9817f7cf2a905d76deb029a1658f81eb1c0e4e05e7de104ea71b6914626aee7a | Book text not copied; future reference_framework relationship requires owner/rights/locator review. |
| `reference_framework_relationship` | `CANDIDATE_ONLY` | `02_Internship/Internship books SEG/Pediatrics_HighYield_Review.pdf` | book_record_id=PROVISIONAL; framework_name=NOT_SUPPLIED; framework_role=NOT_SUPPLIED; citation_locator_policy=NOT_SUPPLIED; display_scope=NOT_SUPPLIED | Design relationship only; no learner display or rights decision. |

## CAND-7.6-SRC-0044 — SRC-0044 — `book`

**Source path:** `02_Internship/Internship books SEG/Surgery_HighYield_Review.pdf`
**SHA-256:** `c5d05145b2cb796da45a07870ef4b7917890efb42731761f3cbba96282c8dc8f`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;PAGE_LOCATOR_REVIEW_REQUIRED`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Internship books SEG/Surgery_HighYield_Review.pdf; pdfinfo:Title` | Surgery High-Yield Review — Dr Alaa Aqrabawi | No book text copied. |
| `author` | `MISSING_FROM_SOURCE` | `02_Internship/Internship books SEG/Surgery_HighYield_Review.pdf` | MISSING_FROM_SOURCE | No author inferred. |
| `edition_or_version` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Only explicit PDF metadata is considered. |
| `source_identity` | `EXTRACTED` | `02_Internship/Internship books SEG/Surgery_HighYield_Review.pdf` | path=02_Internship/Internship books SEG/Surgery_HighYield_Review.pdf; sha256=c5d05145b2cb796da45a07870ef4b7917890efb42731761f3cbba96282c8dc8f | Book text not copied; future reference_framework relationship requires owner/rights/locator review. |
| `reference_framework_relationship` | `CANDIDATE_ONLY` | `02_Internship/Internship books SEG/Surgery_HighYield_Review.pdf` | book_record_id=PROVISIONAL; framework_name=NOT_SUPPLIED; framework_role=NOT_SUPPLIED; citation_locator_policy=NOT_SUPPLIED; display_scope=NOT_SUPPLIED | Design relationship only; no learner display or rights decision. |

## CAND-7.6-SRC-0046 — SRC-0046 — `lesson`

**Source path:** `02_Internship/Internship_Guides/Intern_Professionalism_Guide.md`
**SHA-256:** `9b86500a51bef6b28db1b8636f99b77f153353711392c59e91ccf191eb7863f1`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Internship_Guides/Intern_Professionalism_Guide.md:L1-L1` | Intern Professionalism Guide — دليل الاحترافية المهنية | — |
| `educational_objective` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit objective/purpose heading found. |
| `teaching_sections` | `EXTRACTED` | `02_Internship/Internship_Guides/Intern_Professionalism_Guide.md:L5-L26` | 1. المبادئ الأساسية [02_Internship/Internship_Guides/Intern_Professionalism_Guide.md:L5-L5]; 2. التواصل المهني [02_Internship/Internship_Guides/Intern_Professionalism_Guide.md:L11-L11]; 3. الحدود المهنية (Professional Boundaries) [02_Internship/Internship_Guides/Intern_Professionalism_Guide.md:L16-L16]; 4. التعامل مع الأخطاء [02_Internship/Internship_Guides/Intern_Professionalism_Guide.md:L21-L21] | Heading inventory only; source bodies remain in original files. |
| `key_learning_points` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit key-learning heading found. |
| `references` | `EXTRACTED` | `02_Internship/Internship_Guides/Intern_Professionalism_Guide.md:L2-L2` | > **مستوى:** امتياز (Intern) \| **المصدر:** Pending Source Verification \| **الحالة:** Pending Review | Explicit reference/source line. |

## CAND-7.6-SRC-0047 — SRC-0047 — `lesson`

**Source path:** `02_Internship/Internship_Guides/Intern_Transition_Guide.md`
**SHA-256:** `0fa4aaff3bc1e698e15f8e51a405aa33d2ec8f72199a54e8271ed38e62d0efc2`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Internship_Guides/Intern_Transition_Guide.md:L1-L1` | Intern Transition Guide — دليل الانتقال للامتياز | — |
| `educational_objective` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit objective/purpose heading found. |
| `teaching_sections` | `EXTRACTED` | `02_Internship/Internship_Guides/Intern_Transition_Guide.md:L5-L26` | 1. من طالب إلى امتياز (Transition) [02_Internship/Internship_Guides/Intern_Transition_Guide.md:L5-L5]; 2. التوقعات الأساسية [02_Internship/Internship_Guides/Intern_Transition_Guide.md:L10-L10]; 3. أدوات النجاح [02_Internship/Internship_Guides/Intern_Transition_Guide.md:L16-L16]; 4. الأخطاء الشائعة لتجنبها [02_Internship/Internship_Guides/Intern_Transition_Guide.md:L21-L21] | Heading inventory only; source bodies remain in original files. |
| `key_learning_points` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit key-learning heading found. |
| `references` | `EXTRACTED` | `02_Internship/Internship_Guides/Intern_Transition_Guide.md:L2-L2` | > **مستوى:** امتياز (Intern) \| **المصدر:** Pending Source Verification \| **الحالة:** Pending Review | Explicit reference/source line. |

## CAND-7.6-SRC-0068 — SRC-0068 — `question_bank`

**Source path:** `02_Internship/JMC_Exam_Practice/Reviewed/internal-medicine-intern-jmc.md`
**SHA-256:** `7fe6260a61598ba5aaf41652cee25c9a6fb63cdccc511e176005109eb5d2feb0`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Reviewed/internal-medicine-intern-jmc.md:L18-L18` | Internal Medicine Intern/JMC Reviewed Source | — |
| `question_text` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `options` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `correct_answer` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `explanation` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `reference` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Reviewed/internal-medicine-intern-jmc.md:L2-L418` | L2: source_id: reviewed-internal-medicine-intern-jmc; L4: audience: intern_jmc_source_review_only; L9: - content/imported/interns/jmc-phone-sources/internal-medicine-internship.md; L10: - content/imported/interns/jmc-phone-sources/internal-medicine-study-summary.md; L11: source_word_count:; L18: # Internal Medicine Intern/JMC Reviewed Source; L22: This is an unpublished reviewed source draft.; L344: - assess symptoms, hemodynamic stability, bleeding source, medication history, and comorbidities; L400: When converting this source into public Intern/JMC content:; L411: ## Source Traceability; L413: Raw source files reviewed at high level:; L418: Unsafe raw details were intentionally not copied directly into this reviewed source draft. | Exact matching lines only; no reconstruction. |

## CAND-7.6-SRC-0069 — SRC-0069 — `question_bank`

**Source path:** `02_Internship/JMC_Exam_Practice/Reviewed/obgyn-intern-jmc.md`
**SHA-256:** `d7516728cccd2f008f2d1d17ccb20c12724dee94566a780aa05f4c093d6159ee`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Reviewed/obgyn-intern-jmc.md:L17-L17` | OB/GYN Intern/JMC Reviewed Source | — |
| `question_text` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Reviewed/obgyn-intern-jmc.md:L55-L60` | L55: 1. Is the patient pregnant or possibly pregnant?; L56: 2. Is there bleeding, pain, collapse, fever, hypertension symptoms, or reduced fetal movement?; L57: 3. Is the patient unstable?; L58: 4. Is there severe pain, peritonism, shoulder-tip pain, syncope, or heavy bleeding?; L59: 5. Is this early pregnancy, late pregnancy, postpartum, or gynecologic?; L60: 6. Does this need urgent senior or OB/GYN review? | Exact matching lines only; no reconstruction. |
| `options` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `correct_answer` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `explanation` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `reference` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Reviewed/obgyn-intern-jmc.md:L2-L21` | L2: source_id: reviewed-ob-gyn-intern-jmc; L4: audience: intern_jmc_source_review_only; L9: - content\\imported\\interns\\jmc-phone-sources\\obgyn-main.md; L10: - content\\imported\\interns\\jmc-phone-sources\\obgyn-study-summary.md; L11: source_word_count:; L17: # OB/GYN Intern/JMC Reviewed Source; L21: This is an unpublished reviewed source draft. | Exact matching lines only; no reconstruction. |

## CAND-7.6-SRC-0070 — SRC-0070 — `question_bank`

**Source path:** `02_Internship/JMC_Exam_Practice/Reviewed/pediatrics-intern-jmc.md`
**SHA-256:** `b6b682469b93b74713589db3747e00aa94d33a8e75a439e91f2d79f382c6122b`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Reviewed/pediatrics-intern-jmc.md:L19-L19` | Pediatrics Intern/JMC Reviewed Source | — |
| `question_text` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Reviewed/pediatrics-intern-jmc.md:L58-L64` | L58: 1. Is the child alert, interactive, or unusually quiet?; L59: 2. Is breathing comfortable or labored?; L60: 3. Is color/perfusion normal?; L61: 4. Is hydration adequate?; L62: 5. Are there danger signs?; L63: 6. Is the caregiver worried that the child is "not normal"?; L64: 7. Does this need senior review now? | Exact matching lines only; no reconstruction. |
| `options` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `correct_answer` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `explanation` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `reference` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Reviewed/pediatrics-intern-jmc.md:L2-L23` | L2: source_id: reviewed-pediatrics-intern-jmc; L4: audience: intern_jmc_source_review_only; L9: - content\\imported\\interns\\jmc-phone-sources\\pediatrics-main.md; L10: - content\\imported\\interns\\jmc-phone-sources\\pediatrics-summary.md; L11: - content\\imported\\interns\\jmc-phone-sources\\pediatrics-summary-questions.md; L12: source_word_count:; L19: # Pediatrics Intern/JMC Reviewed Source; L23: This is an unpublished reviewed source draft. | Exact matching lines only; no reconstruction. |

## CAND-7.6-SRC-0071 — SRC-0071 — `question_bank`

**Source path:** `02_Internship/JMC_Exam_Practice/Reviewed/surgery-intern-jmc.md`
**SHA-256:** `8e0e975051fb0bf814d84516b356de0171d5cc24ac41d4c5340cb0dd6827d035`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Reviewed/surgery-intern-jmc.md:L17-L17` | Surgery Intern/JMC Reviewed Source | — |
| `question_text` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Reviewed/surgery-intern-jmc.md:L55-L61` | L55: 1. Is the patient unstable?; L56: 2. Is there peritonism?; L57: 3. Is pain severe, sudden, worsening, or disproportionate?; L58: 4. Is there vomiting, distension, bleeding, ischemic pain, or sepsis concern?; L59: 5. Is there trauma?; L60: 6. Is there a vulnerable context: elderly, pregnant, anticoagulated, immunosuppressed?; L61: 7. Does this need urgent surgical review? | Exact matching lines only; no reconstruction. |
| `options` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `correct_answer` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `explanation` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `reference` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Reviewed/surgery-intern-jmc.md:L2-L21` | L2: source_id: reviewed-surgery-intern-jmc; L4: audience: intern_jmc_source_review_only; L9: - content\\imported\\interns\\jmc-phone-sources\\surgery-internship.md; L10: - content\\imported\\interns\\jmc-phone-sources\\surgery-summary.md; L11: source_word_count:; L17: # Surgery Intern/JMC Reviewed Source; L21: This is an unpublished reviewed source draft. | Exact matching lines only; no reconstruction. |

## CAND-7.6-SRC-0072 — SRC-0072 — `question_bank`

**Source path:** `02_Internship/JMC_Exam_Practice/Reviewed/_manifest.md`
**SHA-256:** `f69b14e2030f58e348d8591743a4ba10a95a1fcb41a8fe06f2dfefa581e7a34c`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Reviewed/_manifest.md:L1-L1` | JMC reviewed intern sources manifest | — |
| `question_text` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `options` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `correct_answer` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `explanation` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `reference` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Reviewed/_manifest.md:L1-L8` | L1: # JMC reviewed intern sources manifest; L3: Status: unpublished reviewed sources only.; L8: ## Reviewed sources | Exact matching lines only; no reconstruction. |

## CAND-7.6-SRC-0074 — SRC-0074 — `question_bank`

**Source path:** `02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-internship.md`
**SHA-256:** `d36ae18c178d3677eed265264418550e7453c6f7d9552d47f3e914922c76b706`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-internship.md:L15-L15` | Internal Medicine phone source - internal-medicine-internship | — |
| `question_text` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-internship.md:L44-L4373` | L44: ** Q1:** Which of the following is the most sensitive combination for diagnosing acute myocardial infarction ?; L61: ** Q2:** A patient presents with chest pain that starts after exertion and resolves with rest. What type of angina is this ?; L78: ** Q3:** According to the MONA-B protocol for acute MI, what does "A" represent ?; L105: ** Q4:** Which is the most common site for atherosclerotic plaque deposition in coronary vessels ?; L122: ** Q5:** What ECG finding is characteristic of STEMI ?; L139: ** Q6:** Which of the following is NOT a risk factor for coronary artery disease mentioned in the text ?; L156: ** Q7:** What is the recommended treatment for life-threatening digoxin-induced arrhythmia ?; L173: ** Q8:** Which of the following treatments for heart failure decreases mortality (improves survival) ?; L190: ** Q9:** What is the best treatment for acute MI according to the text ?; L207: ** Q10:** Which of the following is NOT a risk factor for CAD mentioned in the text ?; L226: ** Q1:** A 55-year-old male presents with central chest pain radiating to the left arm, associated with diaphoresis. ECG shows ST elevation in leads V1-V4. What is the best next step ?; L243: ** Q2:** A patient on digoxin develops nausea, vomiting, and visual disturbances. ECG shows bradycardia. What is the best next step ? | Exact matching lines only; no reconstruction. |
| `options` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-internship.md:L46-L4301` | L46: A. CK-MB and LDH; L47: B. Troponin I and CK-MB; L48: C. Troponin T only; L49: D. Myoglobin and CK-MB; L63: A. Unstable angina; L64: B. Stable angina; L65: C. Prinzmetal angina; L66: D. Acute coronary syndrome; L80: A. Amiodarone; L81: B. Aspirin; L82: C. Atenolol; L83: D. Adenosine | Exact matching lines only; no reconstruction. |
| `correct_answer` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-internship.md:L51-L4303` | L51: ** Correct Answer:** B; L68: ** Correct Answer:** B; L85: ** Correct Answer:** B; L112: ** Correct Answer:** C; L129: ** Correct Answer:** C; L146: ** Correct Answer:** C; L163: ** Correct Answer:** C; L180: ** Correct Answer:** D; L197: ** Correct Answer:** B; L214: ** Correct Answer:** B; L233: ** Correct Answer:** B; L250: ** Correct Answer:** B | Exact matching lines only; no reconstruction. |
| `explanation` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-internship.md:L53-L4389` | L53: ** Explanation:** The combination of troponin I and CK-MB are the most sensitive markers for diagnosing acute MI. Troponin is highly specific for cardiac injury, while CK-MB provides additional diagnostic value and can help detect reinfarction .; L55: ** Arabic Explanation :** يعتبر مزيج التروبونين I و CK-MB الأكثر حساسية لتشخيص احتشاء عضلة القلب الحاد. التروبونين محدد للغاية لإصابة القلب، بينما يوفر CK-MB قيمة تشخيصية إضافية ويساعد في اكتشاف الاحتشاء المتكرر.; L70: ** Explanation:** Stable angina occurs with exertion and resolves with rest. It is associated with fixed coronary artery obstruction. Unstable angina occurs at rest or with minimal exertion and represents an acute coronary syndrome .; L72: ** Arabic Explanation :** تحدث الذبحة الصدرية المستقرة مع المجهود وتزول بالراحة. ترتبط بانسداد ثابت في الشرايين التاجية. تحدث الذبحة غير المستقرة في حالة الراحة أو مع مجهود بسيط وتمثل متلازمة تاجية حادة.; L87: ** Explanation:** MONA-B stands for :; L94: ** Arabic Explanation:** MONA-B تعني:; L114: ** Explanation:** The left anterior descending (LAD) artery is the most common site for atherosclerotic plaque deposition. This is clinically significant as it supplies a large territory of the left ventricle .; L116: ** Arabic Explanation :** الشريان النازل الأمامي الأيسر هو الموقع الأكثر شيوعاً لترسب اللويحات التصلبية في الشرايين التاجية. هذا مهم سريرياً لأنه يغذي مساحة كبيرة من البطين الأيسر.; L131: ** Explanation:** STEMI (ST-elevation myocardial infarction) is characterized by ST elevation on ECG. Non-STEMI shows ST depression and other ECG changes without ST elevation .; L133: ** Arabic Explanation :** يتميز STEMI بارتفاع ST في تخطيط القلب. بينما يظهر Non-STEMI انخفاض ST وتغييرات أخرى في تخطيط القلب دون ارتفاع ST .; L148: ** Explanation:** Risk factors mentioned include Type A behavioral patterns, diabetes mellitus, hypertension, stress, diet rich in saturated fats, obesity, male gender, lack of exercise, and alcohol consumption. A vegetarian diet is not a risk factor .; L150: ** Arabic Explanation :** تشمل عوامل الخطر المذكورة نمط السلوك من النوع A ، داء السكري، ارتفاع ضغط الدم، الإجهاد، النظام الغذائي الغني بالدهون المشبعة، السمنة، الجنس الذكري، قلة التمارين، واستهلاك الكحول. النظام الغذائي النباتي ليس عامل خطر. | Exact matching lines only; no reconstruction. |
| `reference` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-internship.md:L2-L4395` | L2: source_id: phone-internal-medicine-internship; L3: status: raw_extracted_unpublished_source; L4: audience: source_review_only; L15: # Internal Medicine phone source - internal-medicine-internship; L17: ## Source safety policy; L19: - This file is raw extracted source material only.; L23: - Use only for later reviewed Markdown source conversion and audience-specific adaptation.; L25: ## Source metadata; L3420: " Not considering cellulitis as a source of fever ",; L4395: ## WEAK MODULES (Limited Source Material) | Exact matching lines only; no reconstruction. |

## CAND-7.6-SRC-0075 — SRC-0075 — `question_bank`

**Source path:** `02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-study-summary.md`
**SHA-256:** `8ee1ac17b5443ad879e4e4777a188c6a540afc867f2ee60522e8f96b5b61d1f4`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-study-summary.md:L15-L15` | Internal Medicine phone source - internal-medicine-study-summary | — |
| `question_text` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `options` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `correct_answer` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `explanation` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-study-summary.md:L3261-L3335` | L3261: Detailed Explanations:; L3270: Arabic Explanation \| شرح مبسط تعد أورام البرولاكتين (Prolactinoma) أكثر كتل النخامية شيوعاً وتسبب إفراز الحليب واضطراب الدورة. في الغدة الدرقية، مرض غريفز هو السبب الأشهر لفرط النشاط (جحوظ العينين)، بينما هاشيموتو هو الأشهر لقصور النشاط. تشخيص السكري يعتمد على سكر صائم ≥126 أو تراكمي ≥6.5%، ويعد الميتفورمين العلاج الأول. في حالات نقص هرمونات النخامية، يفقد هرمون FSH/LH أولاً ثم GH ثم TSH وأخيراً ACTH. يجب الحذر عند تصحيح نقص الصوديوم (SIADH) لتجنب تلف أعصاب الدماغ [8 ، 1506 -1510].; L3284: Arabic Explanation \| شرح مبسط الذبحة الصدرية والجلطة القلبية تعالج ببروتوكول MONA (مورفين، أكسجين، نيترو، أسبرين)، والقسطرة (PCI) هي الحل الأفضل. في فشل القلب، الأدوية التي تطيل العمر هي مثبطات ACE وحاصرات بيتا والسبيرونولاكتون، بينما الديجوكسين والمدرات تحسن الأعراض فقط. تضيق الصمام الأبهري يتميز بثلاثية: ألم صدر، إغماء، وضيق تنفس. احذر من "نباتات القلب " (Tamponade) التي تسبب كتمان أصوات القلب وانخفاض الضغط، وهي حالة طارئة [5، 744-748؛ 8، 1578-1582] .; L3294: Arabic Explanation \| شرح مبسط في الجهاز الهضمي، يتميز "تعذر الارتخاء " (Achalasia) بصعوبة بلع السوائل والجوامد معاً، ويظهر بشكل "منقار الطير" في الأشعة. جرثومة المعدة هي السبب الأول للقرحة، وفحص النفس أو البراز هو الأفضل للتشخيص. في تليف الكبد، ارتفاع ضغط الوريد البابي يسبب دوالي المريء والاستسقاء. إذا حدث التهاب في سائل البطن (SBP) ، يُعالج بالسيفوتاكسيم. لعلاج غيبوبة الكبد، نستخدم اللاكتولوز لتقليل الأمونيا [8 ، 1552 -1571].; L3304: Arabic Explanation \| شرح مبسط فقر الدم يصنف حسب حجم الكريات (MCV): الصغير ( نقص حديد - يتميز بارتفاع TIBC) ، والكبير ( نقص B12 أو فولات ). نقص B12 يتميز بوجود أعراض عصبية، على عكس نقص الفولات. الهيموفيليا (أ و ب) تسبب نزيفاً عميقاً في المفاصل وارتفاع PTT. مرض فون ويلبراند هو الأشهر وراثياً ويسبب نزيف أغشية مخاطية (رعاف). الـ ITP هو نقص صفيحات مناعي يحدث غالباً بعد زكام، ولا يوجد فيه تضخم طحال [8 ، 1596 -1609].; L3316: Arabic Explanation \| شرح مبسط الفشل الكلوي الحاد قد يكون قبل كلوي (Prerenal - نسبة اليوريا للكرياتينين > 20:1) أو داخل كلوي (ATN - تتميز بوجود "أسطوانات بنية" في البول). في حالات ارتفاع البوتاسيوم الطارئة، أول خطوة هي إعطاء غلوكونات الكالسيوم لحماية القلب، ثم الأنسولين والجلوكوز لإدخال البوتاسيوم للخلايا [8، 1637-1646 ].; L3322: Arabic Explanation \| شرح مبسط التهاب الرئة قد يكون نموذجياً (بلغم صدئي) أو غير نموذجي (سعال جاف). الربو يتميز بتحسن وظائف الرئة بعد الموسع القصبي. علامة الخطر الكبرى في الربو هي ارتفاع ثاني أكسيد الكربون (PCO2 > 60) ، مما يعني إجهاد المريض وفشل التنفس. الجلطة الرئوية تسبب ضيق تنفس مفاجئ، وأفضل فحص لها هو الأشعة المقطعية للشرايين الرئوية (CTPA) [5 ، 777-786؛ 8، 1620-1659 ].; L3328: Arabic Explanation \| شرح مبسط السكتة الدماغية في الشريان الدماغي الأوسط (MCA) تضعف الوجه واليد أكثر من الرجل، بينما الشريان الأمامي (ACA) يضعف الرجل أكثر. مرض باركنسون يتميز برعاش الراحة، التصلب، وبطء الحركة. التصلب اللويحي (MS) يتميز بهجمات متفرقة ووجود "حزم قليلة النسيلة" في سائل النخاع [8 ، 1667 -1674].; L3335: Arabic Explanation \| شرح مبسط تسمم الباراسيتامول يعالج بـ NAC. تسمم الأفيونات (تضيق بؤبؤ العين وفشل تنفس) يعالج بـ Naloxone. تسمم المبيدات الحشرية يعالج بـ Atropine. في تسمم أول أكسيد الكربون (CO) ، يكون نبض الأكسجين طبيعياً كاذباً، ويجب فحص الكربوكسي هيموغلوبين والعلاج بالأكسجين 100 % [8 ، 1663 -1666]. | Exact matching lines only; no reconstruction. |
| `reference` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/internal-medicine-study-summary.md:L2-L3256` | L2: source_id: phone-internal-medicine-study-summary; L3: status: raw_extracted_unpublished_source; L4: audience: source_review_only; L15: # Internal Medicine phone source - internal-medicine-study-summary; L17: ## Source safety policy; L19: - This file is raw extracted source material only.; L23: - Use only for later reviewed Markdown source conversion and audience-specific adaptation.; L25: ## Source metadata; L3256: This study file for Internal Medicine is a comprehensive guide synthesized exclusively from your provided Notebook sources. | Exact matching lines only; no reconstruction. |

## CAND-7.6-SRC-0076 — SRC-0076 — `question_bank`

**Source path:** `02_Internship/JMC_Exam_Practice/Sources_Phone/obgyn-main.md`
**SHA-256:** `973e9403b5731bee2f4cb2a3308bc5dfd3a6906bf09fe5ebc79333dbe1d93c04`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/obgyn-main.md:L15-L15` | OB/GYN phone source - obgyn-main | — |
| `question_text` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/obgyn-main.md:L41-L915` | L41: السؤال 1: What is the definition of gestational age ?; L50: السؤال 2: At how many weeks is an embryo called a fetus ?; L59: السؤال 3: What is the total duration of pregnancy measured in gestational age ?; L68: السؤال 4: Which of the following is considered a risk factor for placental abruption ?; L77: السؤال 5: Which of the following is a sign of placental abruption ?; L86: السؤال 6: What is the median age of menopause ?; L95: السؤال 7: Which factors decrease the age of menopause ?; L104: السؤال 8: What is the definition of menopause ?; L113: السؤال 9: Which hormone changes occur during menopause ?; L122: السؤال 10: What is the definition of post-term pregnancy ?; L131: السؤال 11: A pregnant woman at 42 weeks gestation with an uncomplicated pregnancy presents for routine visit. What is the best next step ?; L140: السؤال 12: A woman presents with vaginal bleeding after 20 weeks gestation with abdominal pain and a tender uterus. What is the best next step ? | Exact matching lines only; no reconstruction. |
| `options` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `correct_answer` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `explanation` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/obgyn-main.md:L47-L927` | L47: Explanation: Gestational age is measured starting from the last menstrual period (LMP), while fertilization age is measured from fertilization (38 weeks from 1st to 3rd weeks) .; L48: Arabic Explanation : عمر الحمل يُحسب من تاريخ آخر دورة شهرية ( LMP )، بينما عمر الإخصاب يُحسب من تاريخ الإخصاب (38 أسبوعاً من الأسبوع الأول إلى الثالث).; L56: Explanation: At 10 weeks, the developing baby is called a fetus .; L57: Arabic Explanation : في الأسبوع العاشر يُطلق على الجنين اسم " fetus ".; L65: Explanation: Gestational age is approximately 40 weeks from the LMP, while fertilization age is 38 weeks .; L66: Arabic Explanation : عمر الحمل التقريبي هو 40 أسبوعاً من آخر دورة شهرية، بينما عمر الإخصاب هو 38 أسبوعاً.; L74: Explanation: Risk factors for placental abruption include multiple gestation, polyhydramnios, ROM (rupture of membranes), trauma, short umbilical cord, maternal systemic conditions, and alcohol use .; L75: Arabic Explanation : عوامل خطر انفصال المشيمة تشمل الحمل المتعدد، كثرة السائل السلوي، تمزق الأغشية، الصدمات، قصر الحبل السري، الأمراض الجهازية للأم، وتعاطي الكحول.; L83: Explanation: Signs and symptoms of placental abruption include abdominal pain, fetal distress, maternal symptoms, and tender globular uterus .; L84: Arabic Explanation : علامات وأعراض انفصال المشيمة تشمل آلام البطن، ضائقة جنينية، أعراض أمومية، ورحم كروي مؤلم.; L92: Explanation: The median age of menopause is 51 years .; L93: Arabic Explanation : متوسط عمر سن اليأس هو 51 عاماً. | Exact matching lines only; no reconstruction. |
| `reference` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/obgyn-main.md:L2-L25` | L2: source_id: phone-obgyn-main; L3: status: raw_extracted_unpublished_source; L4: audience: source_review_only; L15: # OB/GYN phone source - obgyn-main; L17: ## Source safety policy; L19: - This file is raw extracted source material only.; L23: - Use only for later reviewed Markdown source conversion and audience-specific adaptation.; L25: ## Source metadata | Exact matching lines only; no reconstruction. |

## CAND-7.6-SRC-0077 — SRC-0077 — `question_bank`

**Source path:** `02_Internship/JMC_Exam_Practice/Sources_Phone/obgyn-study-summary.md`
**SHA-256:** `7826588463334182241ae2a7143e16f990b7ded39340bae4cf592a0cd20cf066`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/obgyn-study-summary.md:L15-L15` | OB/GYN phone source - obgyn-study-summary | — |
| `question_text` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `options` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `correct_answer` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `explanation` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/obgyn-study-summary.md:L80-L2050` | L80: **شرح مبسط:**; L124: **شرح مبسط:**; L141: **شرح مبسط:**; L169: **شرح مبسط:**; L213: **شرح مبسط:**; L246: **شرح مبسط:**; L274: **شرح مبسط:**; L299: **شرح مبسط:**; L338: **شرح مبسط:**; L359: **شرح مبسط:**; L375: **شرح مبسط:**; L401: **شرح مبسط:** | Exact matching lines only; no reconstruction. |
| `reference` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/obgyn-study-summary.md:L2-L1948` | L2: source_id: phone-obgyn-study-summary; L3: status: raw_extracted_unpublished_source; L4: audience: source_review_only; L15: # OB/GYN phone source - obgyn-study-summary; L17: ## Source safety policy; L19: - This file is raw extracted source material only.; L23: - Use only for later reviewed Markdown source conversion and audience-specific adaptation.; L25: ## Source metadata; L49: - ** Source**: Placental syncytiotrophoblast; L61: - ** Source**: Placental syncytiotrophoblast; L66: - ** Source**: 0-7 weeks (corpus luteum), 7-9 weeks (both), >9 weeks (placenta only); L72: \| Type \| Timing \| Source \| | Exact matching lines only; no reconstruction. |

## CAND-7.6-SRC-0078 — SRC-0078 — `question_bank`

**Source path:** `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-main.md`
**SHA-256:** `189768c49b5be2df0a537a92d8c0a55ec0ea016d4f34ac10b314965a6eb10eac`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-main.md:L15-L15` | Pediatrics phone source - pediatrics-main | — |
| `question_text` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-main.md:L53-L3636` | L53: " question": "Which of the following is the characteristic X-ray finding in Respiratory Distress Syndrome (RDS) ?",; L72: " question": "Which group of patients is most commonly affected by Respiratory Distress Syndrome ?",; L91: " question": "What is the primary prevention strategy for Respiratory Distress Syndrome in at-risk pregnancies ?",; L110: " question": "What respiratory support modality is used to keep alveoli open in RDS ?",; L129: " question": "When do symptoms of Respiratory Distress Syndrome typically begin ?",; L148: " question": "Which of the following is a predisposing factor for RDS ?",; L167: " question": "What sign is commonly associated with RDS ?",; L186: " question": "What is the most common location for diaphragmatic hernia ?",; L205: " question": "What abdominal finding is associated with diaphragmatic hernia in a newborn ?",; L224: " question": "What is a common postoperative complication in patients with diaphragmatic hernia ?",; L243: " question": "A premature newborn develops respiratory distress with grunting, nasal flaring, and retractions. What is the best next step in management ?",; L262: " question": "A newborn presents with cyanosis, respiratory distress, and scaphoid abdomen. What is the best next diagnostic step ?", | Exact matching lines only; no reconstruction. |
| `options` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `correct_answer` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `explanation` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-main.md:L61-L3216` | L61: " explanation": "In RDS, CXR shows ground glass appearance (reticulogranular pattern) with air bronchograms due to surfactant deficiency and alveolar collapse .",; L62: " arabicExplanation ": "في متلازمة الضائقة التنفسية، تظهر صورة الأشعة مظهر الزجاج الأرضي مع تخططات هوائية بسبب نقص المادة الفعالة سطحياً وانهيار الحويصلات الهوائية.",; L80: " explanation": "RDS most commonly occurs in premature infants due to surfactant deficiency. It can sometimes occur in term infants with certain conditions .",; L81: " arabicExplanation ": "تحدث متلازمة الضائقة التنفسية بشكل شائع عند الخدج بسبب نقص المادة الفعالة سطحياً، وقد تحدث أحياناً عند الأطفال كاملي النمو في حالات معينة.",; L99: " explanation": "Antenatal steroids (dexamethasone) given to the mother before delivery help stimulate fetal lung maturity and surfactant production, reducing the risk of RDS .",; L100: " arabicExplanation ": "إعطاء الكورتيكوستيرويدات (ديكساميثازون) للأم قبل الولادة يساعد في تحفيز نضج الرئة الجنينية وإنتاج المادة الفعالة سطحياً، مما يقلل من خطر الإصابة بمتلازمة الضائقة التنفسية.",; L118: " explanation": "PEEP or CPAP helps keep alveoli open by providing continuous positive airway pressure, preventing alveolar collapse in RDS .",; L119: " arabicExplanation ": "يساعد ضغط المجرى الهوائي الإيجابي المستمر أو ضغط الزفير النهائي الإيجابي في إبقاء الحويصلات الهوائية مفتوحة، مما يمنع انهيارها في متلازمة الضائقة التنفسية.",; L137: " explanation": "Symptoms of RDS typically start in the first hours after delivery as the infant's surfactant production is insufficient to maintain alveolar stability .",; L138: " arabicExplanation ": "تبدأ أعراض متلازمة الضائقة التنفسية عادة في الساعات الأولى بعد الولادة حيث يكون إنتاج المادة الفعالة سطحياً غير كافٍ للحفاظ على استقرار الحويصلات الهوائية.",; L156: " explanation": "Infants of diabetic mothers (IDM) are at higher risk for RDS due to delayed surfactant production caused by maternal hyperglycemia and hyperinsulinemia .",; L157: " arabicExplanation ": "يكون أطفال الأمهات المصابات بالسكري أكثر عرضة للإصابة بمتلازمة الضائقة التنفسية بسبب تأخر إنتاج المادة الفعالة سطحياً الناتج عن ارتفاع السكر والأنسولين لدى الأم.", | Exact matching lines only; no reconstruction. |
| `reference` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-main.md:L2-L3673` | L2: source_id: phone-pediatrics-main; L3: status: raw_extracted_unpublished_source; L4: audience: source_review_only; L15: # Pediatrics phone source - pediatrics-main; L17: ## Source safety policy; L19: - This file is raw extracted source material only.; L23: - Use only for later reviewed Markdown source conversion and audience-specific adaptation.; L25: ## Source metadata; L897: " explanation": "Active TB in children can lead to failure to clear mucus secretion, which is mentioned in the source material .",; L898: " arabicExplanation ": "يمكن أن يؤدي السل النشط لدى الأطفال إلى فشل تنظيف إفرازات المخاط، كما هو مذكور في المادة المصدرية.",; L1858: " question": "What is the source of VP shunt infection ?",; L1980: " explanation": "Electroshock (electroconvulsive therapy) is the drug of choice for tonic-clonic seizures according to the source .", | Exact matching lines only; no reconstruction. |

## CAND-7.6-SRC-0079 — SRC-0079 — `question_bank`

**Source path:** `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary-questions.md`
**SHA-256:** `608017bb39330062570d6faf664f74ec2c85573c426fb31c967161a560acd5ae`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary-questions.md:L15-L15` | Pediatrics phone source - pediatrics-summary-questions | — |
| `question_text` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary-questions.md:L99-L3457` | L99: Which of the following findings is characteristic of pathological jaundice in a newborn ?; L153: A newborn is diagnosed with Erythema Toxicum . Which of the following statements is correct ?; L218: Which of the following is true regarding Caput Succedaneum ?; L242: A newborn is noted to have bilateral choanal atresia. Which of the following is the most appropriate immediate management ?; L311: Which of the following is NOT a normal physiological finding in a newborn ?; L355: A term newborn is noted to have a shortened left lower extremity, multiple scars on the trunk, bilateral absence of red reflex, and microcephaly. During pregnancy, which laboratory finding would most likely be noted in the mother ?; L417: Which of the following is a risk factor for kernicterus ?; L463: A newborn has a 1-minute Apgar score of 4. Which of the following is the most appropriate next step ?; L484: Which of the following is true about breast milk jaundice ?; L568: A newborn is diagnosed with subgaleal hemorrhage. Which of the following is true ?; L609: Which of the following medications is NOT recommended in infants ?; L686: Which of the following is the most common cause of pathological jaundice in the first 24 hours of life ? | Exact matching lines only; no reconstruction. |
| `options` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary-questions.md:L40-L3553` | L40: A. Transient tachypnea of the newborn; L41: B. Congenital diaphragmatic hernia; L42: C. Meconium aspiration syndrome; L43: D. Pneumothorax; L44: E. Respiratory distress syndrome; L57: A. 5; L58: B. 6; L59: C. 7; L60: D. 8; L61: E. 9; L77: A. Prematurity; L78: B. Maternal diabetes | Exact matching lines only; no reconstruction. |
| `correct_answer` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary-questions.md:L284-L534` | L284: The correct answer should be **B: 1 **; L534: The correct answer is **C: 7 ** | Exact matching lines only; no reconstruction. |
| `explanation` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `reference` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary-questions.md:L2-L25` | L2: source_id: phone-pediatrics-summary-questions; L3: status: raw_extracted_unpublished_source; L4: audience: source_review_only; L15: # Pediatrics phone source - pediatrics-summary-questions; L17: ## Source safety policy; L19: - This file is raw extracted source material only.; L23: - Use only for later reviewed Markdown source conversion and audience-specific adaptation.; L25: ## Source metadata | Exact matching lines only; no reconstruction. |

## CAND-7.6-SRC-0080 — SRC-0080 — `question_bank`

**Source path:** `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary.md`
**SHA-256:** `9d5404b0ca18949c0a0d1e514af8b87a9fb3824de9923ba9bd29680391225755`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary.md:L15-L15` | Pediatrics phone source - pediatrics-summary | — |
| `question_text` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary.md:L1856-L1857` | L1856: Which specialty would you like me to prepare next: Internal Medicine, or Obstetrics & Gynecology? (Wait, these are done. Re-asking per prompt instruction):; L1857: “Which specialty would you like next: Internal Medicine, Pediatrics, or Obstetrics & Gynecology?” | Exact matching lines only; no reconstruction. |
| `options` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `correct_answer` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `explanation` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary.md:L56-L2177` | L56: **شرح مبسط:**; L82: **شرح مبسط:**; L98: **شرح مبسط:**; L121: **شرح مبسط:**; L138: **شرح مبسط:**; L162: **شرح مبسط:**; L195: **شرح مبسط:**; L211: **شرح مبسط:**; L238: **شرح مبسط:**; L281: **شرح مبسط:**; L293: **شرح مبسط:**; L322: **شرح مبسط:** | Exact matching lines only; no reconstruction. |
| `reference` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/pediatrics-summary.md:L2-L1773` | L2: source_id: phone-pediatrics-summary; L3: status: raw_extracted_unpublished_source; L4: audience: source_review_only; L15: # Pediatrics phone source - pediatrics-summary; L17: ## Source safety policy; L19: - This file is raw extracted source material only.; L23: - Use only for later reviewed Markdown source conversion and audience-specific adaptation.; L25: ## Source metadata; L1773: This study file for Pediatrics is a comprehensive guide synthesized exclusively from the provided source material. | Exact matching lines only; no reconstruction. |

## CAND-7.6-SRC-0081 — SRC-0081 — `question_bank`

**Source path:** `02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-internship.md`
**SHA-256:** `91a73199e4eebbdc1d85abb8993d5a2ae488f41499699952091bb0a5dcec736f`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-internship.md:L15-L15` | Surgery phone source - surgery-internship | — |
| `question_text` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-internship.md:L48-L6230` | L48: ** Q1:** A patient with severe ascites is scheduled for surgery. Which of the following is indicated to decrease bleeding tendency ?; L78: ** Q3:** Intubation should be performed at which level of anesthesia ?; L93: ** Q4:** Which of the following is NOT an indication for FFP administration in pre-operative patients ?; L108: ** Q5:** Long-acting insulin is administered to surgical patients via which route ?; L123: ** Q6:** Which of the following statements about pre-operative preparation is correct ?; L168: ** Q9:** Which of the following is correct regarding FFP in pre-operative patients ?; L200: ** Q11:** A patient with severe ascites is scheduled for surgery tomorrow. What is the best next step in management ?; L215: ** Q12:** A patient requires intubation for surgery. What is the best approach ?; L230: ** Q13:** A diabetic surgical patient needs insulin management. What is the best approach ?; L245: ** Q14:** A patient with severe ascites is at risk of bleeding. What is the best next step ?; L260: ** Q15:** A patient is scheduled for surgery and has portal hypertension. What is the best pre-operative intervention ?; L277: ** Q16:** Which finding in a pre-operative patient requires immediate attention ? | Exact matching lines only; no reconstruction. |
| `options` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-internship.md:L50-L6179` | L50: A. Fresh frozen plasma (FFP); L51: B. Platelet transfusion; L52: C. Vitamin K injection; L53: D. Long-acting insulin; L65: A. Decrease the volume of ventilation; L66: B. Increase the volume of ventilation; L67: C. Prevent bronchospasm; L68: D. Improve cardiac output; L80: A. Light anesthesia; L81: B. Deep anesthesia; L82: C. Moderate anesthesia; L83: D. Before induction | Exact matching lines only; no reconstruction. |
| `correct_answer` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-internship.md:L55-L6181` | L55: ** Correct Answer: A **; L70: ** Correct Answer: A **; L85: ** Correct Answer: B **; L100: ** Correct Answer: D **; L115: ** Correct Answer: C **; L130: ** Correct Answer: C **; L145: ** Correct Answer: B **; L160: ** Correct Answer: B **; L175: ** Correct Answer: C **; L190: ** Correct Answer: C **; L207: ** Correct Answer: B **; L222: ** Correct Answer: B ** | Exact matching lines only; no reconstruction. |
| `explanation` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-internship.md:L57-L6241` | L57: ** Explanation:** FFP is indicated to decrease bleeding tendency in patients with severe ascites. Source : خطاطبة جراحة. pdf - Page 7; L59: ** Arabic Explanation :** يتم استخدام FFP لتقليل ميل النزيف لدى المرضى الذين يعانون من الاستسقاء الشديد.; L72: ** Explanation:** Routine pre-operative oxygen therapy decreases the volume of ventilation. Source : خطاطبة جراحة. pdf - Page 7; L74: ** Arabic Explanation :** العلاج الروتيني بالأكسجين قبل العملية يقلل من حجم التهوية.; L87: ** Explanation:** Intubation is done at deep anesthesia level to prevent bronchospasm during anesthesia. Source : خطاطبة جراحة. pdf - Page 7; L89: ** Arabic Explanation :** يتم التنبيب في مستوى التخدير العميق لمنع تشنج القصبات أثناء التخدير.; L102: ** Explanation:** FFP is indicated to decrease bleeding tendency, decrease portal pressure, and decrease systemic shunt. It does not increase oxygen saturation. Source : خطاطبه جراحة. pdf - Page 7; L104: ** Arabic Explanation :** يستخدم FFP لتقليل ميل النزيف وتقليل الضغط البابي وتقليل التحويلة الجهازية، ولا يزيد من تشبع الأكسجين.; L117: ** Explanation:** Long-acting insulin is given by injection. Source : خطاطبة جراحة. pdf - Page 7; L119: ** Arabic Explanation :** يعطى الأنسولين طويل المفعول عن طريق الحقن.; L132: ** Explanation:** Routine pre-operative O2 therapy decreases the volume of ventilation. The other options are incorrect. Source : خطاطبة جراحة. pdf - Page 7; L134: ** Arabic Explanation :** العلاج الروتيني بالأكسجين قبل العملية يقلل من حجم التهوية. | Exact matching lines only; no reconstruction. |
| `reference` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-internship.md:L2-L6276` | L2: source_id: phone-surgery-internship; L3: status: raw_extracted_unpublished_source; L4: audience: source_review_only; L15: # Surgery phone source - surgery-internship; L17: ## Source safety policy; L19: - This file is raw extracted source material only.; L23: - Use only for later reviewed Markdown source conversion and audience-specific adaptation.; L25: ## Source metadata; L38: ## Generated from PDF Source Material; L57: ** Explanation:** FFP is indicated to decrease bleeding tendency in patients with severe ascites. Source : خطاطبة جراحة. pdf - Page 7; L72: ** Explanation:** Routine pre-operative oxygen therapy decreases the volume of ventilation. Source : خطاطبة جراحة. pdf - Page 7; L87: ** Explanation:** Intubation is done at deep anesthesia level to prevent bronchospasm during anesthesia. Source : خطاطبة جراحة. pdf - Page 7 | Exact matching lines only; no reconstruction. |

## CAND-7.6-SRC-0082 — SRC-0082 — `question_bank`

**Source path:** `02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-summary.md`
**SHA-256:** `641fcea76723575ef7e6ac94b6d643f1c65e66a060848731823f87b55ab9e9b6`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-summary.md:L15-L15` | Surgery phone source - surgery-summary | — |
| `question_text` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `options` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `correct_answer` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `explanation` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-summary.md:L95-L5039` | L95: **شرح مبسط:**; L266: **شرح مبسط:**; L423: **شرح مبسط:**; L603: **شرح مبسط:**; L1052: **شرح مبسط:**; L1268: **شرح مبسط:**; L1392: **شرح مبسط:**; L1529: **شرح مبسط:**; L1749: **شرح مبسط:**; L1791: **شرح مبسط:**; L1971: **شرح مبسط:**; L2097: **شرح مبسط:** | Exact matching lines only; no reconstruction. |
| `reference` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/surgery-summary.md:L2-L5044` | L2: source_id: phone-surgery-summary; L3: status: raw_extracted_unpublished_source; L4: audience: source_review_only; L15: # Surgery phone source - surgery-summary; L17: ## Source safety policy; L19: - This file is raw extracted source material only.; L23: - Use only for later reviewed Markdown source conversion and audience-specific adaptation.; L25: ## Source metadata; L65: \| Material \| Source \| Tensile Strength Loss \| Inflammatory Reaction \| Complete Absorption \| Common Uses \|; L4033: - ** Treatment**: Remove source, fluid resuscitation, pressors, Antibiotics: Clindamycin + (vancomycin/oxacillin); L4248: - Synovial joint; Common source of back pain; L5044: ## 📋 THE MOST COMMON (Quick Reference) | Exact matching lines only; no reconstruction. |

## CAND-7.6-SRC-0083 — SRC-0083 — `question_bank`

**Source path:** `02_Internship/JMC_Exam_Practice/Sources_Phone/_manifest.md`
**SHA-256:** `7c4bdd6c7e9a0bde90f4372f4b63bb2c730cf2b9bb5db92d39df77688eb4f3e8`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/_manifest.md:L1-L1` | JMC phone sources manifest | — |
| `question_text` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `options` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `correct_answer` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `explanation` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | Required field absent under the source-only extraction rule. |
| `reference` | `EXTRACTED` | `02_Internship/JMC_Exam_Practice/Sources_Phone/_manifest.md:L1-L30` | L1: # JMC phone sources manifest; L3: Status: unpublished source material only.; L7: - Do not publish raw source directly.; L8: - Convert to reviewed source Markdown before any UI/page work.; L10: - Detailed management, dose tables, and protocols belong to Residents or source review, not Intern pages.; L12: ## Created source files; L16: \| Internal Medicine \| content\\imported\\interns\\jmc-phone-sources\\internal-medicine-internship.md \| 25848 \| 25 \| 154 \|; L17: \| Internal Medicine \| content\\imported\\interns\\jmc-phone-sources\\internal-medicine-study-summary.md \| 15553 \| 51 \| 74 \|; L18: \| OB/GYN \| content\\imported\\interns\\jmc-phone-sources\\obgyn-main.md \| 7883 \| 5 \| 6 \|; L19: \| OB/GYN \| content\\imported\\interns\\jmc-phone-sources\\obgyn-study-summary.md \| 14808 \| 32 \| 13 \|; L20: \| Pediatrics \| content\\imported\\interns\\jmc-phone-sources\\pediatrics-main.md \| 21160 \| 10 \| 34 \|; L21: \| Pediatrics \| content\\imported\\interns\\jmc-phone-sources\\pediatrics-summary.md \| 19873 \| 36 \| 60 \| | Exact matching lines only; no reconstruction. |

## CAND-7.6-SRC-0090 — SRC-0090 — `clinical_skill`

**Source path:** `02_Internship/Logbook/Logbook_Requirements.md`
**SHA-256:** `8537c2e245f2240e3df6c66dd6191c17de03832a554e445ee0b4f355c899bad8`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `skill_name` | `EXTRACTED` | `02_Internship/Logbook/Logbook_Requirements.md:L1-L1` | Logbook — متطلبات سجل الامتياز | Source title only; not a competency record. |
| `indication` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `contraindication` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `equipment` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `steps` | `EXTRACTED` | `02_Internship/Logbook/Logbook_Requirements.md:L23-L29` | 4. الإجراءات الأساسية المتوقع تسجيلها (مستوى امتياز) [02_Internship/Logbook/Logbook_Requirements.md:L23-L29] | Original heading labels preserved. |
| `assessment_method` | `EXTRACTED` | `02_Internship/Logbook/Logbook_Requirements.md:L1-L7` | Logbook — متطلبات سجل الامتياز [02_Internship/Logbook/Logbook_Requirements.md:L1-L4]; 1. ما هو سجل الامتياز (Logbook)? [02_Internship/Logbook/Logbook_Requirements.md:L5-L7] | Source evidence only; does not create competency sign-off, authorization, or credential. |
| `competency_boundary` | `EXPLICIT_NON_ACTION` | `N/A` | NO_SIGN_OFF; NO_AUTHORIZATION; NO_CREDENTIAL | Governance boundary required by Phase 7.7. |

## CAND-7.6-SRC-0094 — SRC-0094 — `clinical_skill`

**Source path:** `02_Internship/OSCE/OSCE_Internship_Framework.md`
**SHA-256:** `e0b5d40f2fd4ca2cca65ba6dec73c826b3ff6076a06865e26afa7fd0198a91c9`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `skill_name` | `EXTRACTED` | `02_Internship/OSCE/OSCE_Internship_Framework.md:L1-L1` | OSCE — إطار الفحص السريري الموضوعي (مستوى امتياز) | Source title only; not a competency record. |
| `indication` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `contraindication` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `equipment` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `steps` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `assessment_method` | `EXTRACTED` | `02_Internship/OSCE/OSCE_Internship_Framework.md:L1-L25` | OSCE — إطار الفحص السريري الموضوعي (مستوى امتياز) [02_Internship/OSCE/OSCE_Internship_Framework.md:L1-L4]; 3. هيكل التقييم [02_Internship/OSCE/OSCE_Internship_Framework.md:L21-L25] | Source evidence only; does not create competency sign-off, authorization, or credential. |
| `competency_boundary` | `EXPLICIT_NON_ACTION` | `N/A` | NO_SIGN_OFF; NO_AUTHORIZATION; NO_CREDENTIAL | Governance boundary required by Phase 7.7. |

## CAND-7.6-SRC-0095 — SRC-0095 — `clinical_skill`

**Source path:** `02_Internship/OSCE/README.md`
**SHA-256:** `18356f2b7d2ae19d5290ad486229afdb900b0085a0d25dff0b607a1f6b699b88`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `skill_name` | `EXTRACTED` | `02_Internship/OSCE/README.md:L1-L1` | OSCE — Objective Structured Clinical Examination | Source title only; not a competency record. |
| `indication` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `contraindication` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `equipment` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `steps` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | MISSING_FROM_SOURCE | No explicit source section found. |
| `assessment_method` | `EXTRACTED` | `02_Internship/OSCE/README.md:L1-L10` | OSCE — Objective Structured Clinical Examination [02_Internship/OSCE/README.md:L1-L2]; متطلبات OSCE الامتياز [02_Internship/OSCE/README.md:L5-L10] | Source evidence only; does not create competency sign-off, authorization, or credential. |
| `competency_boundary` | `EXPLICIT_NON_ACTION` | `N/A` | NO_SIGN_OFF; NO_AUTHORIZATION; NO_CREDENTIAL | Governance boundary required by Phase 7.7. |

## CAND-7.6-SRC-0111 — SRC-0111 — `lesson`

**Source path:** `02_Internship/Study/Roadmap/README.md`
**SHA-256:** `a03ace5aec416597ccf949c2d258fa69b72ca473f08852f752711fcaaa7f3cab`
**Duplicate lineage:** `NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF`; role `NOT_APPLICABLE`
**Source locator status:** `PATH_SHA_VERIFIED;LINE_LOCATORS_AVAILABLE`
**Medical review status:** `OWNER_REVIEW_REQUIRED`
**Production status:** `NOT_PRODUCTION`

### Candidate object (non-production)

| Field | Status | Source locator | Source-supported value / evidence | Notes |
|---|---|---|---|---|
| `title` | `EXTRACTED` | `02_Internship/Study/Roadmap/README.md:L1-L1` | Roadmap — خارطة مسار الامتياز (12 شهراً) | — |
| `educational_objective` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit objective/purpose heading found. |
| `teaching_sections` | `EXTRACTED` | `02_Internship/Study/Roadmap/README.md:L5-L17` | موقع الخارطة الفعلية [02_Internship/Study/Roadmap/README.md:L5-L5]; لماذا هذا المجلد كان فارغاً؟ [02_Internship/Study/Roadmap/README.md:L13-L13]; الإجراء [02_Internship/Study/Roadmap/README.md:L16-L16] | Heading inventory only; source bodies remain in original files. |
| `key_learning_points` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit key-learning heading found. |
| `references` | `MISSING_FROM_SOURCE` | `NOT_FOUND` | — | No explicit reference/source section found. |
