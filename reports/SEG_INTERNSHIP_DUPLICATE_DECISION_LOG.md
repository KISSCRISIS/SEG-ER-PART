# SEG Internship Duplicate Decision Log

> **Status:** Provisional, append-only review record. Decisions below are structural/source-grounded dispositions only. They do not decide clinical correctness, preferred answers, rights, approval, activation, or publication.

**Review timestamp (UTC):** `2026-08-17T16:40:28.397252Z`  
**Review scope:** Existing outputs only; no original source file was read or modified during this quality-review pass.

## Input artifacts

| Artifact | SHA-256 | Bytes | Lines |
|---|---|---:|---:|
| `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_MASTER_QUESTION_BANK.md` | `552bae63e3ac5338b6f02906c713cd0f4c4f189db0313f2ee93aec45646cf15e` | 3839231 | 88463 |
| `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DUPLICATE_RECONCILIATION_REPORT.md` | `c54fe748bdb87039459f4f9360baddde7cdfc2403babd884c4dcddd97ce520ef` | 9077 | 231 |
| `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_MISSING_COVERAGE_REPORT.md` | `7a286fda1b2762134abb04b2b07033301575c97623a8e4b5bb79effcbb8eb1b1` | 32913 | 156 |

## Decision rules

1. A duplicate decision is accepted only from the existing reconciliation report and its deterministic selection. No clinical preference is added.
2. A secondary duplicate is retained as raw audit evidence and marked `DUPLICATE_AUDIT_ONLY`; it is not silently deleted.
3. An incomplete candidate is recoverable only when a complete record with the same specialty and exact normalized stem exists within the three supplied outputs. No semantic similarity, answer inference, or medical repair is allowed.
4. If no exact complete record exists, the candidate remains `INCOMPLETE_UNRESOLVED` with its original source ID, location, and flags.

## Duplicate-group decisions

| Group | Specialty | Members | Deterministic provisional representation | Secondary disposition |
|---:|---|---|---|---|
| 1 | Pediatrics | `PED-Q270` (Pediatrics_Question_Bank_Dr_Alaa_Aqrabawi.md, L2261-L2268)<br>`PED-Q279` (Pediatrics_Question_Bank_Dr_Alaa_Aqrabawi.md, L2333-L2340) | `PED-Q270` (Pediatrics_Question_Bank_Dr_Alaa_Aqrabawi.md, L2261-L2268) | `DUPLICATE_AUDIT_ONLY`: `PED-Q279` |
| 2 | Pediatrics | `Q818` (ALL_Question_Banks_Dr_Alaa_Aqrabawi.md, L12093-L12106)<br>`Q827` (ALL_Question_Banks_Dr_Alaa_Aqrabawi.md, L12219-L12232) | `Q818` (ALL_Question_Banks_Dr_Alaa_Aqrabawi.md, L12093-L12106) | `DUPLICATE_AUDIT_ONLY`: `Q827` |
| 3 | Obstetrics & Gynecology | `CH19-Q002` (ObGyn.md, L4271-L4281)<br>`CH19-Q010` (ObGyn.md, L4359-L4369) | `CH19-Q002` (ObGyn.md, L4271-L4281) | `DUPLICATE_AUDIT_ONLY`: `CH19-Q010` |
| 4 | Obstetrics & Gynecology | `Q384` (ALL_Question_Banks_Dr_Alaa_Aqrabawi.md, L5765-L5779)<br>`Q392` (ALL_Question_Banks_Dr_Alaa_Aqrabawi.md, L5885-L5899) | `Q384` (ALL_Question_Banks_Dr_Alaa_Aqrabawi.md, L5765-L5779) | `DUPLICATE_AUDIT_ONLY`: `Q392` |

### Group 1 — Pediatrics

**Observed classification:** `near duplicate`; similarity `0.9777`; pair ``PED-Q270` ↔ `PED-Q279``.
**Decision:** Keep `PED-Q270` as `PRIMARY_PROVISIONAL` exactly as selected by the existing deterministic reconciliation report. Mark every other member as `DUPLICATE_AUDIT_ONLY`. Preserve all raw member excerpts and source locations. No answer or medical-meaning decision was made.

**Existing evidence excerpt:**

```markdown
### Duplicate group 1 — Pediatrics

**Members:**

| Source | Source ID | Location | Kind | Specialty |
|---|---|---|---|---|
| `Pediatrics_Question_Bank_Dr_Alaa_Aqrabawi.md` | `PED-Q270` | L2261-L2268 | source_specific | Pediatrics |
| `Pediatrics_Question_Bank_Dr_Alaa_Aqrabawi.md` | `PED-Q279` | L2333-L2340 | source_specific | Pediatrics |

| Pair | Classification | Similarity |
|---|---|---:|
| `PED-Q270` ↔ `PED-Q279` | near duplicate | 0.9777 |

**Deterministic selected representation:** `Pediatrics_Question_Bank_Dr_Alaa_Aqrabawi.md` / `PED-Q270` / L2261-L2268. This selection is a formatting/completeness choice only; it is not a clinical adjudication.

**Raw member excerpts:**

#### `Pediatrics_Question_Bank_Dr_Alaa_Aqrabawi.md` / `PED-Q270` / L2261-L2268

```markdown
**PED-Q270** — Which of the following vaccines is part of the Jordanian neonatal vaccination program?
- (A) Meningococcal conjugate vaccine
- (B) Pneumococcal conjugate vaccine
- (C) Varicella vaccine
- (D) Hepatitis A vaccine
- (E) Inactivated polio vaccine
> **Answer: E** — Jordanian Vaccination Program Includes: — BCG (birth) IPV — (2,3,4 months) Hepatitis B (2,3,4 months) DTaP (2,3,4 months) Hib (2,3,4 months) Rotavirus (2,3,4 months)
```

#### `Pediatrics_Question_Bank_Dr_Alaa_Aqrabawi.md` / `PED-Q279` / L2333-L2340

```markdown
**PED-Q279** — Which of the following vaccines is part of the Jordanian national vaccination program?
- (A) Meningococcal conjugate vaccine
- (B) Pneumococcal conjugate vaccine
- (C) Varicella vaccine
- (D) Hepatitis A vaccine
- (E) Inactivated polio vaccine
> **Answer: E** — IPV — is included in the Jordanian vaccination program.
```
```

### Group 2 — Pediatrics

**Observed classification:** `near duplicate`; similarity `0.9829`; pair ``Q818` ↔ `Q827``.
**Decision:** Keep `Q818` as `PRIMARY_PROVISIONAL` exactly as selected by the existing deterministic reconciliation report. Mark every other member as `DUPLICATE_AUDIT_ONLY`. Preserve all raw member excerpts and source locations. No answer or medical-meaning decision was made.

**Existing evidence excerpt:**

```markdown
### Duplicate group 2 — Pediatrics

**Members:**

| Source | Source ID | Location | Kind | Specialty |
|---|---|---|---|---|
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q818` | L12093-L12106 | combined_master | Pediatrics |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q827` | L12219-L12232 | combined_master | Pediatrics |

| Pair | Classification | Similarity |
|---|---|---:|
| `Q818` ↔ `Q827` | near duplicate | 0.9829 |

**Deterministic selected representation:** `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` / `Q818` / L12093-L12106. This selection is a formatting/completeness choice only; it is not a clinical adjudication.

**Raw member excerpts:**

#### `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` / `Q818` / L12093-L12106

```markdown
**Q818.** Which of the following vaccines is part of the Jordanian neonatal vaccination program?

- A) {'letter': 'A', 'text': 'Meningococcal conjugate vaccine'}
- B) {'letter': 'B', 'text': 'Pneumococcal conjugate vaccine'}
- C) {'letter': 'C', 'text': 'Varicella vaccine'}
- D) {'letter': 'D', 'text': 'Hepatitis A vaccine'}
- E) {'letter': 'E', 'text': 'Inactivated polio vaccine'}

**Answer:** E

*Explanation:* Jordanian Vaccination Program Includes: — BCG (birth) IPV — (2,3,4 months) Hepatitis B (2,3,4 months) DTaP (2,3,4 months) Hib (2,3,4 months) Rotavirus (2,3,4 months)

---
```

#### `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` / `Q827` / L12219-L12232

```markdown
**Q827.** Which of the following vaccines is part of the Jordanian national vaccination program?

- A) {'letter': 'A', 'text': 'Meningococcal conjugate vaccine'}
- B) {'letter': 'B', 'text': 'Pneumococcal conjugate vaccine'}
- C) {'letter': 'C', 'text': 'Varicella vaccine'}
- D) {'letter': 'D', 'text': 'Hepatitis A vaccine'}
- E) {'letter': 'E', 'text': 'Inactivated polio vaccine'}

**Answer:** E

*Explanation:* IPV — is included in the Jordanian vaccination program.

---
```
```

### Group 3 — Obstetrics & Gynecology

**Observed classification:** `near duplicate`; similarity `0.9393`; pair ``CH19-Q002` ↔ `CH19-Q010``.
**Decision:** Keep `CH19-Q002` as `PRIMARY_PROVISIONAL` exactly as selected by the existing deterministic reconciliation report. Mark every other member as `DUPLICATE_AUDIT_ONLY`. Preserve all raw member excerpts and source locations. No answer or medical-meaning decision was made.

**Existing evidence excerpt:**

```markdown
### Duplicate group 3 — Obstetrics & Gynecology

**Members:**

| Source | Source ID | Location | Kind | Specialty |
|---|---|---|---|---|
| `ObGyn.md` | `CH19-Q002` | L4271-L4281 | source_specific | Obstetrics & Gynecology |
| `ObGyn.md` | `CH19-Q010` | L4359-L4369 | source_specific | Obstetrics & Gynecology |

| Pair | Classification | Similarity |
|---|---|---:|
| `CH19-Q002` ↔ `CH19-Q010` | near duplicate | 0.9393 |

**Deterministic selected representation:** `ObGyn.md` / `CH19-Q002` / L4271-L4281. This selection is a formatting/completeness choice only; it is not a clinical adjudication.

**Raw member excerpts:**

#### `ObGyn.md` / `CH19-Q002` / L4271-L4281

```markdown
**CH19-Q002** — Which of the following is a red flag in a patient with PCOS?

- (A) . Hirsutism
- (B) . Irregular menstruation
- (C) . Endometrial hyperplasia
- (D) . Acne

> **Answer: C** — Endometrial hyperplasia is a red flag in PCOS due to unopposed estrogen stimulation.

> **بالعربية:** تضخم بطانة الرحم هو علامة خطر في متلازمة المبيض المتعدد الكيسات بسبب التحفيز الإستروجيني غير المعاكس.
```

#### `ObGyn.md` / `CH19-Q010` / L4359-L4369

```markdown
**CH19-Q010** — Which of the following is a red flag in PCOS?

- (A) . Hirsutism
- (B) . Irregular menstruation
- (C) . Endometrial hyperplasia
- (D) . Acne

> **Answer: C** — Endometrial hyperplasia is a red flag in PCOS due to risk of progression to endometrial cancer.

> **بالعربية:** تضخم بطانة الرحم هو علامة خطر في متلازمة المبيض المتعدد الكيسات بسبب خطر التطور إلى سرطان بطانة الرحم.
```
```

### Group 4 — Obstetrics & Gynecology

**Observed classification:** `near duplicate`; similarity `0.9383`; pair ``Q384` ↔ `Q392``.
**Decision:** Keep `Q384` as `PRIMARY_PROVISIONAL` exactly as selected by the existing deterministic reconciliation report. Mark every other member as `DUPLICATE_AUDIT_ONLY`. Preserve all raw member excerpts and source locations. No answer or medical-meaning decision was made.

**Existing evidence excerpt:**

```markdown
### Duplicate group 4 — Obstetrics & Gynecology

**Members:**

| Source | Source ID | Location | Kind | Specialty |
|---|---|---|---|---|
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q384` | L5765-L5779 | combined_master | Obstetrics & Gynecology |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q392` | L5885-L5899 | combined_master | Obstetrics & Gynecology |

| Pair | Classification | Similarity |
|---|---|---:|
| `Q384` ↔ `Q392` | near duplicate | 0.9383 |

**Deterministic selected representation:** `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` / `Q384` / L5765-L5779. This selection is a formatting/completeness choice only; it is not a clinical adjudication.

**Raw member excerpts:**

#### `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` / `Q384` / L5765-L5779

```markdown
**Q384.** Which of the following is a red flag in a patient with PCOS?

- A) . Hirsutism
- B) . Irregular menstruation
- C) . Endometrial hyperplasia
- D) . Acne

**Answer:** C

*Explanation:* Endometrial hyperplasia is a red flag in PCOS due to unopposed estrogen stimulation.

*الشرح المبسط:* تضخم بطانة الرحم هو علامة خطر في متلازمة المبيض المتعدد الكيسات بسبب التحفيز الإستروجيني غير المعاكس.

---
```

#### `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` / `Q392` / L5885-L5899

```markdown
**Q392.** Which of the following is a red flag in PCOS?

- A) . Hirsutism
- B) . Irregular menstruation
- C) . Endometrial hyperplasia
- D) . Acne

**Answer:** C

*Explanation:* Endometrial hyperplasia is a red flag in PCOS due to risk of progression to endometrial cancer.

*الشرح المبسط:* تضخم بطانة الرحم هو علامة خطر في متلازمة المبيض المتعدد الكيسات بسبب خطر التطور إلى سرطان بطانة الرحم.

---
```

## Unresolved reconciliation items

The combined file contains the same question-marker counts by specialty as the four source-specific files, but only the conservative matches listed above were automatically established. Any remaining semantic duplicates, partial duplicates, answer conflicts, or omissions require human review against the original files before a record can advance beyond Pending Clinical Review.

## Governance disposition

| Gate | Status |
|---|---|
| Source preservation | PASS — originals referenced, not modified |
| Structural duplicate detection | PASS — provisional findings recorded |
| Clinical correctness review | NOT RUN |
| Approval / activation | BLOCKED — not authorized by this artifact |
| Database/application integration | NOT RUN |
```

## Incomplete-candidate decisions

**Total reviewed:** 105. **Exact complete recoveries:** 0. **Retained unresolved:** 105.

| Specialty | Candidates | Exact complete recoveries | Retained unresolved |
|---|---:|---:|---:|
| Internal Medicine | 27 | 0 | 27 |
| Obstetrics & Gynecology | 24 | 0 | 24 |
| Surgery | 54 | 0 | 54 |

### Per-candidate disposition

| Source | Source ID | Specialty | Location | Detected flags | Decision | Recovery evidence |
|---|---|---|---|---|---|---|
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q114` | Obstetrics & Gynecology | L1731-L1740 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q139` | Obstetrics & Gynecology | L2105-L2114 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q168` | Obstetrics & Gynecology | L2541-L2550 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q177` | Obstetrics & Gynecology | L2671-L2680 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q199` | Obstetrics & Gynecology | L2999-L3008 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q260` | Obstetrics & Gynecology | L3921-L3930 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q261` | Obstetrics & Gynecology | L3931-L3940 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q271` | Obstetrics & Gynecology | L4076-L4085 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q283` | Obstetrics & Gynecology | L4251-L4260 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q307` | Obstetrics & Gynecology | L4609-L4618 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q366` | Obstetrics & Gynecology | L5498-L5507 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q393` | Obstetrics & Gynecology | L5900-L5909 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q489` | Internal Medicine | L7348-L7357 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q490` | Internal Medicine | L7358-L7367 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q491` | Internal Medicine | L7368-L7379 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q515` | Internal Medicine | L7725-L7734 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q516` | Internal Medicine | L7735-L7744 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q517` | Internal Medicine | L7745-L7756 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q541` | Internal Medicine | L8102-L8111 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q542` | Internal Medicine | L8112-L8121 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q543` | Internal Medicine | L8122-L8133 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q567` | Internal Medicine | L8479-L8488 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q568` | Internal Medicine | L8489-L8498 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q569` | Internal Medicine | L8499-L8510 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q593` | Internal Medicine | L8856-L8865 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q594` | Internal Medicine | L8866-L8875 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q595` | Internal Medicine | L8876-L8887 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q619` | Internal Medicine | L9233-L9242 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q620` | Internal Medicine | L9243-L9252 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q621` | Internal Medicine | L9253-L9264 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q645` | Internal Medicine | L9620-L9629 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q646` | Internal Medicine | L9630-L9639 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q647` | Internal Medicine | L9640-L9651 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q671` | Internal Medicine | L9997-L10006 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q672` | Internal Medicine | L10007-L10016 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q673` | Internal Medicine | L10017-L10028 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q697` | Internal Medicine | L10374-L10383 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q698` | Internal Medicine | L10384-L10393 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q699` | Internal Medicine | L10394-L10407 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1060` | Surgery | L15733-L15742 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1061` | Surgery | L15743-L15752 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1062` | Surgery | L15753-L15764 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1086` | Surgery | L16110-L16119 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1087` | Surgery | L16120-L16129 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1088` | Surgery | L16130-L16141 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1096` | Surgery | L16247-L16256 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1097` | Surgery | L16257-L16266 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1098` | Surgery | L16267-L16278 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1104` | Surgery | L16354-L16363 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1105` | Surgery | L16364-L16373 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1106` | Surgery | L16374-L16385 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1130` | Surgery | L16731-L16740 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1131` | Surgery | L16741-L16750 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1132` | Surgery | L16751-L16762 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1156` | Surgery | L17108-L17117 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1157` | Surgery | L17118-L17127 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1158` | Surgery | L17128-L17139 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1166` | Surgery | L17245-L17254 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1167` | Surgery | L17255-L17264 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1168` | Surgery | L17265-L17276 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1192` | Surgery | L17622-L17631 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1193` | Surgery | L17632-L17641 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1194` | Surgery | L17642-L17653 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1202` | Surgery | L17759-L17768 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1203` | Surgery | L17769-L17778 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1204` | Surgery | L17779-L17790 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1228` | Surgery | L18136-L18145 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1229` | Surgery | L18146-L18155 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1230` | Surgery | L18156-L18167 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1254` | Surgery | L18513-L18522 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1255` | Surgery | L18523-L18532 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1256` | Surgery | L18533-L18544 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1265` | Surgery | L18665-L18674 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1266` | Surgery | L18675-L18684 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1267` | Surgery | L18685-L18696 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1291` | Surgery | L19042-L19051 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1292` | Surgery | L19052-L19061 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1293` | Surgery | L19062-L19073 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1317` | Surgery | L19419-L19428 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1318` | Surgery | L19429-L19438 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1319` | Surgery | L19439-L19450 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1343` | Surgery | L19796-L19805 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1344` | Surgery | L19806-L19815 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1345` | Surgery | L19816-L19827 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1369` | Surgery | L20173-L20182 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1370` | Surgery | L20183-L20192 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1371` | Surgery | L20193-L20204 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1395` | Surgery | L20550-L20559 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1396` | Surgery | L20560-L20569 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1397` | Surgery | L20570-L20581 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1421` | Surgery | L20927-L20936 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1422` | Surgery | L20937-L20946 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ALL_Question_Banks_Dr_Alaa_Aqrabawi.md` | `Q1423` | Surgery | L20947-L20955 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ObGyn.md` | `CH07-Q008` | Obstetrics & Gynecology | L1313-L1317 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ObGyn.md` | `CH08-Q006` | Obstetrics & Gynecology | L1588-L1592 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ObGyn.md` | `CH10-Q005` | Obstetrics & Gynecology | L1909-L1913 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ObGyn.md` | `CH10-Q014` | Obstetrics & Gynecology | L2002-L2006 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ObGyn.md` | `CH11-Q006` | Obstetrics & Gynecology | L2242-L2246 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ObGyn.md` | `CH14-Q004` | Obstetrics & Gynecology | L2925-L2929 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ObGyn.md` | `CH14-Q005` | Obstetrics & Gynecology | L2930-L2934 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ObGyn.md` | `CH14-Q015` | Obstetrics & Gynecology | L3034-L3038 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ObGyn.md` | `CH14-Q027` | Obstetrics & Gynecology | L3160-L3164 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ObGyn.md` | `CH15-Q008` | Obstetrics & Gynecology | L3422-L3426 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ObGyn.md` | `CH18-Q009` | Obstetrics & Gynecology | L4077-L4081 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |
| `ObGyn.md` | `CH19-Q011` | Obstetrics & Gynecology | L4370-L4374 | stem=present, options=0, answer=not-detected, explanation=present, expected_points=not-detected, dangerous_mistakes=not-detected | `INCOMPLETE_UNRESOLVED` | No exact complete same-specialty normalized-stem match in the three existing outputs; raw source block remains preserved in the supplied source lineage. |

## Non-actions

| Action | Result |
|---|---|
| Medical content modified | `false` |
| Missing text invented or repaired | `false` |
| Clinical approval performed | `false` |
| Rights approval performed | `false` |
| Schema/JSON conversion performed | `false` |
| Database/application import performed | `false` |
| Commit/push/deployment performed | `false` |
