# Topic Registry Gap Report — Phase 4-F.2

**Analysis only. No registry or mapping modified.**

## 1. Current Topics (22, all `under-review`)

| Topic ID | System | Priority | Qbank Mapped (Tintinalli pilot) |
|---|---|---|---|
| EM_CRIT_ARREST | critical-care | Very High | 87 (tintinalli 13) |
| EM_CRIT_SHOCK | critical-care | Very High | 68 |
| EM_CRIT_ANAPHYLAXIS | critical-care | Very High | 2 |
| EM_CARDIO_ACS | cardiovascular | Very High | 64 |
| EM_CARDIO_TAMPONADE | cardiovascular | High | - |
| EM_RESP_ASTHMA | respiratory | High | 86 |
| EM_RESP_COPD | respiratory | Medium | 60 |
| EM_RESP_PNEUMOTHORAX | respiratory | High | 70 |
| EM_RESP_PE | respiratory | High | - |
| EM_TRAUMA_PRIMARY_SURVEY | trauma | Very High | - |
| EM_TRAUMA_TBI | trauma | Very High | 78 |
| EM_NEURO_STROKE | neurology | Very High | 110 |
| EM_NEURO_STATUS | neurology | High | - |
| EM_GI_ABD_PAIN | gastrointestinal | High | 336 |
| EM_GI_BLEED | gastrointestinal | High | - |
| EM_ID_SEPSIS | infectious-disease | Very High | 69 |
| EM_ENDO_DKA_HHS | endocrinology | High | - |
| EM_ENDO_HYPERK | endocrinology | High | - |
| EM_ENDO_HYPO | endocrinology | High | - |
| EM_TOX_OPIOID | toxicology | High | - |
| EM_OBGYN_ECTOPIC | obstetrics-gynecology | High | - |
| EM_PEDS_FEVER | pediatrics | Medium | 6 |

## 2. Missing Domains (Tintinalli 22 categories → 22 topics)

**Mapped (8 Medium, 1 Low):** Resuscitation (21), Cardiovascular Disorders (67), Gastrointestinal Disorders (50), Gynecology (30), Pediatrics (59), Nervous System Disorders (35), Toxicologic Disorders (28), Traumatic Disorders (69), Nutritional Disorders (20, Low)

**Unmapped (13 distinct titles, 293 questions in refined pilot):**

| Source Category (Tintinalli `chapterTitle` as stored) | Tintinalli Qs | Canonical counterpart | Affected (pilot UNRESOLVED) | Gap Type |
|---|---|---|---|---|
| **Disorders** (truncated, chapters 6,8,11) | 117 | Unknown (original titles lost) | 117 | **Data quality — not a domain gap** |
| **and Oral Disorders** (truncated, likely Head/Ear/Eye/Nose/Throat and Oral) | 32 | None | 32 | Truncated |
| **Hematologic Disorders** | 39 | None | 39 | Missing domain |
| **and Joints** (truncated, likely Musculoskeletal and Joints) | 23 | None | 23 | Truncated |
| **and Procedural Sedation** (truncated, likely Airway and Procedural Sedation) | 21 | None | 21 | Truncated |
| **Disaster Management** | 20 | None | 20 | Missing domain |
| **Wound Management** | 20 | None | 20 | Missing domain |
| **Environmental Injuries** | 20 | None | 20 | Missing domain |
| **Psychosocial Disorders** | 20 | None | 20 | Missing domain |
| **Department** (truncated, likely Emergency Department Administration) | 18 | None | 18 | Truncated |
| **Dermatology** | 17 | None | 17 | Missing domain |
| **Abuse and Assault** | 15 | None | 15 | Missing domain |
| **Special Situations** | 15 | None | 15 | Vague — not a domain |
| **Nutritional Disorders** (Low, 3 candidates) | 20 | EM_ENDO_* (weak) | 20 in REVIEW → 2 kept, 18 demoted | Weak bridge |

**Total Tintinalli unmapped in refined pilot: 511/756 (67.6%)** — 293 original + 218 demoted from category-level REVIEW.

## 3. Affected Question Count (if domain added)

If a new canonical topic were added and all Qs in that category mapped 1:1:

- Hematologic Disorders: 39 Tintinalli Qs + 46 FRCEM/Hippo hematology Qs (from other banks) ≈ 85
- and Oral Disorders (ENT): 32 + 32 (FRCEM ENT) ≈ 64
- Disaster Management: 20 + ~10 (other banks) ≈ 30
- Wound Management: 20 + ~20 (trauma wound) ≈ 40
- Environmental Injuries: 20 + ~20 (heat/cold) ≈ 40
- Dermatology: 17 + ~30 (Hippo Cutaneous 73) ≈ 90
- Psychosocial: 20 + ~68 (Hippo Psychobehavioral) ≈ 88
- and Joints: 23 + ~87 (Hippo Musculoskeletal) ≈ 110
- Disorders (truncated, 117) — cannot estimate until source re-extracted

**Largest impact if fixed:** Truncated titles (117+32+23+21+18 = 211 Qs) — not a domain gap but a data fix.

## 4. Recommendation: Keep / Merge / Add Topic

| Missing Domain | Recommendation | Rationale |
|---|---|---|
| **Disorders (117), and Oral (32), and Joints (23), and Procedural Sedation (21), Department (18)** | **Keep (no topic) — Fix source** | Truncated `chapterTitle`; original Tintinalli PDF title must be re-extracted. Adding a topic for “Disorders” would be guessed. |
| **Hematologic Disorders (39)** | **Add topic** | Clear domain, 39 Tintinalli + 39 Hippo/Hematologic, no canonical counterpart. Propose `EM_HEME_*` (e.g., `EM_HEME_ANEMIA`, `EM_HEME_COAG`) — requires 1-2 topics, not one broad. |
| **Dermatology (17)** | **Add topic** | 17 Tintinalli + 73 Hippo Cutaneous + 17 FRCEM Dermatology ≈ 107 Qs; propose `EM_DERM_*`. |
| **Environmental Injuries (20)** | **Add topic** | 20 + 20 + heat/cold Qs; overlaps with `EM_TOX` but distinct; propose `EM_ENV_HEAT_COLD` or merge into `EM_TOX` if review prefers. |
| **Wound Management (20)** | **Merge** | Overlaps with `EM_TRAUMA_PRIMARY_SURVEY` (wound closure is part of trauma survey); keep, do not add separate topic. Map via per-question keywords instead. |
| **Psychosocial Disorders (20)** | **Add topic** | 20 + 68 Hippo Psychobehavioral; propose `EM_PSYCH_*` but note outside core EM board — Low priority. |
| **Abuse and Assault (15), Special Situations (15), Disaster Management (20)** | **Keep (no topic)** | System-agnostic or too vague; keep unmapped, do not add topic. |
| **Nutritional Disorders (20, Low)** | **Keep** | Weak link to 3 endo topics; keep as `REVIEW_REQUIRED` with 3 candidates, do not add new topic. |

**Proposed additions only (3-4 high-impact):**
- `EM_HEME_ANEMIA_COAG` (covers Hematologic)
- `EM_DERM_RASH` (covers Dermatology/Cutaneous)
- `EM_ENV_HEAT_COLD` (covers Environmental Injuries)

Each addition must be `under-review` and added to `topics.json` only with clinical reviewer sign-off; no existing 22 topics merged or removed.

## 5. Risks

- **Adding topics for truncated titles** would encode a data artifact as a domain — must re-extract source PDF titles first (117 Qs blocked until then).
- **Broad topics (e.g., one `EM_HEME_*` for 39 Qs)** would repeat the same system-level over-mapping that caused Rosh refinement to drop 7 links; prefer 1-2 narrow topics.
- **Coverage inflation:** Adding 3 topics for 39+17+20=76 Qs raises Tintinalli mapped 243→~319 (32→42%), but full 5,612 coverage only moves 25.9→27.3% — must not claim board coverage without blueprint.

---

*Analysis only. No `topic-registry.json`, no `qbank-topic-mapping.json`, no UI/DB modified. Next: re-extract truncated titles, then curate 3 proposals with review.*
