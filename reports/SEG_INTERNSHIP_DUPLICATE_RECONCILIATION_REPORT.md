# SEG Internship Duplicate & Reconciliation Report

> **Status:** Provisional, Pending Clinical Review. Duplicate detection is structural and source-grounded; it does not decide clinical correctness, preferred answers, or activation status.

## Method and limits

The reconciliation pass parses question markers, normalizes only identifiers and Markdown punctuation for comparison, then detects exact duplicates and conservative near-duplicates within the same specialty. The original text is never rewritten. No semantic clinical equivalence is claimed for records that did not meet the conservative match rule.

A source-specific record and a combined-master record can have different formatting or explanatory text. Therefore, absence of a detected duplicate is not proof that the two records are clinically different, and presence of a detected duplicate is not a clinical approval decision.

## Summary

| Metric | Result |
|---|---:|
| Parsed source records | 2846 |
| Provisional reconciliation groups | 2842 |
| Detected duplicate groups | 4 |
| Combined-only groups | 1421 |

## Detected duplicate groups

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
