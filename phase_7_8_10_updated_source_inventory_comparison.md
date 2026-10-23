# Updated Legacy Source Package — Read-only Inventory and Comparison

**Purpose:** structural and identity evidence review only; no medical correction, approval, production JSON, import, or replacement was performed.

## Package-level result

The extracted package contains **8 text files** plus PDF and DOCX representations. The analysis recorded exact checksums, text structure, question markers, chapter markers, reference signals, version/rights signals, and literal SEG identity tokens. The new package contains `SRC/CAND` tokens: **False**; observed tokens: `none`.

## Text-file inventory

| File | Bytes | SHA-256 | Lines | Q markers | Correct-answer markers | Chapter markers | SRC/CAND token | Version signal | Rights signal |
|---|---:|---|---:|---:|---:|---:|---|---|---|
| `sha256_manifest.txt` | 2596 | `2723a82743a4c844f5517c762e47888cca43925f9190f5ecc1e3c7643f36337b` | 14 | 0 | 0 | 0 | NO | NO | NO |
| `اسئله +الشرح بالعربي/FRCEM_High_Yield_Study_Book.txt` | 519822 | `f5fb6b3f88b94a1b5a1a360acfe4616a5b3a5940a4b0854a35ba646f5f95a4a1` | 5049 | 0 | 0 | 97 | NO | YES | NO |
| `اسئله +الشرح بالعربي/HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt` | 2137094 | `b9c1636f84f802d9f68794a3fa6f3d6ca34617fc08eda0a9ffb863262001771b` | 25137 | 1927 | 1927 | 18 | NO | YES | NO |
| `اسئله +الشرح بالعربي/frcem All_Chapters_Questions_and_Explanations_Full.txt` | 5249304 | `08d73b475a7ff1eda0cbbe905c5109628598b5210e8710ac0e8fae19dddad995` | 55592 | 1529 | 1529 | 32 | NO | YES | YES |
| `كتب علاء نص دراسي/1400q_Study_Guide_UTF8.txt` | 37414 | `66ffbf5e7936488e12e71950d617f2f40114587d017b45c017607e8a8603ed74` | 584 | 0 | 0 | 0 | NO | NO | NO |
| `كتب علاء نص دراسي/FRCEM_High_Yield_Study_Book.txt` | 519822 | `f5fb6b3f88b94a1b5a1a360acfe4616a5b3a5940a4b0854a35ba646f5f95a4a1` | 5049 | 0 | 0 | 97 | NO | YES | NO |
| `كتب علاء نص دراسي/HIPPO_High_Yield_Study_Book.txt` | 304644 | `fe9b1df0eae11416195c919095aa946c80212ed48e3ef59f9c0a50e2db5eef5c` | 2388 | 0 | 0 | 36 | NO | YES | YES |
| `كتب علاء نص دراسي/pretestnew_Study_Guide_UTF8.txt` | 131490 | `b4ba84879b1247b9aaeb6172c6dffcb7dcc0860f8894e4651b2bc8a9fd669166` | 1350 | 0 | 0 | 0 | NO | YES | YES |

## Selected content signals

- `sha256_manifest.txt` begins with: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  /home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake/sha256_manifest.txt'; reference signals: Oxford=1, HIPPO=4, FRCEM=5, RCEM=5.
- `اسئله +الشرح بالعربي/FRCEM_High_Yield_Study_Book.txt` begins with: 'FRCEM EMERGENCY MEDICINE HIGH-YIELD REVIEW'; reference signals: FRCEM=55, RCEM=206.
- `اسئله +الشرح بالعربي/HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt` begins with: 'HIPPO EMERGENCY MEDICINE QBANK — QUESTIONS, ANSWERS, AND BRIEF ARABIC EXPLANATIONS'; reference signals: HIPPO=2.
- `اسئله +الشرح بالعربي/frcem All_Chapters_Questions_and_Explanations_Full.txt` begins with: '================================================================================'; reference signals: Rosen=1, Oxford=1, HIPPO=2, Kaplan=7, RCEM=164.
- `كتب علاء نص دراسي/1400q_Study_Guide_UTF8.txt` begins with: '================================================================================'; reference signals: none detected.
- `كتب علاء نص دراسي/FRCEM_High_Yield_Study_Book.txt` begins with: 'FRCEM EMERGENCY MEDICINE HIGH-YIELD REVIEW'; reference signals: FRCEM=55, RCEM=206.
- `كتب علاء نص دراسي/HIPPO_High_Yield_Study_Book.txt` begins with: 'HIPPO EMERGENCY MEDICINE HIGH-YIELD REVIEW'; reference signals: Tintinalli=13, Rosen=58, HIPPO=16, FRCEM=1, RCEM=3.
- `كتب علاء نص دراسي/pretestnew_Study_Guide_UTF8.txt` begins with: '================================================================================'; reference signals: RCEM=1.

## Existing legacy JSON comparison

| Legacy file | Items | SHA-256 | Distinct identity-like fields | Distinct title/name-like fields |
|---|---:|---|---:|---:|
| `algorithms.json` | 28 | `5b2e6fc836aab89a9c3f2e0e7aac62565f6950eeca0e3b0305c6bf5ed2e6d0fc` | 53 | 31 |
| `antidotes.json` | 16 | `744a1993d27c0658822478bcb755fed57016f9c217f7a3ae61740d91361bf324` | 27 | 27 |
| `arabicMentorExplanations.json` | 367 | `95cf6dde36e026d117b2c47eb7513f32ecc4fd1340588dc883f3c94d5e4aa153` | 367 | 196 |
| `examTraps.json` | 415 | `0108ee68e8176914f7596e90f645546873ddc3ab708a5806972ed73eac110366` | 825 | 217 |
| `flashcards.json` | 760 | `830bc36fcfe433566a7edb331a4dd0f5866fb807d0ba6489102976d29aae85f3` | 341 | 677 |
| `officialUnifiedTopics.json` | 40 | `9b056ce983aa1e53e5e70d4122c0fdbf6919525d5e1c1cb3098462c508b982b9` | 40 | 0 |
| `referenceLibrary.json` | 194 | `6c0832b83ac56319fdfe486b2824baf9c3ca49e27554e4769422029aebc16f38` | 194 | 189 |
| `topicFamilyIndex.json` | 99 | `a0e1e6a8cdbff58b05cb31ba696edf2165ec2fbddd9237466fa75161f4cd7b9b` | 0 | 0 |

Across the legacy JSON workspace, the analysis observed **871 distinct identity-like values** and **378 normalized title/name-like values**. New-package text has **0 legacy-style ID mentions** and **0 SEG staging ID mentions**.

## Evidence interpretation

The package contains substantial educational material and repeated reference/framework signals, but textual overlap or repeated topic names is not an identity bridge. The package also contains derived study books, question-and-explanation material, Arabic explanations, PDF exports, and editable documents; these representations require source/version/rights/locator separation before any controlled transformation.

No deterministic legacy-to-SEG relationship is established by this structural comparison alone. Any exact match based on title, topic, chapter, or question wording would require an explicit, versioned cross-reference contract and independent review; it must not be inferred from content similarity.

## Governance flags for subsequent review

| Gate | Observed state |
|---|---|
| Source identity | Supplied archive identity and per-file checksums recorded; internal owner/publisher/version not fully established. |
| Version/edition | Not consistently supplied in inspected text/PDF/DOCX metadata; `UNRESOLVED` until explicit evidence. |
| Rights/display | No complete rights/license/display-scope evidence observed in the inspected metadata; `PENDING_EXTERNAL_EVIDENCE`. |
| Clinical review | Not performed by this analysis; `PENDING_CLINICAL_REVIEW`. |
| Track/taxonomy | Content-level audience and pathway assignment not authorized by this inventory; `UNRESOLVED`. |
| Identity bridge | No `SRC-*`/`CAND-*` token observed in new text; no candidate join established. |

## Non-actions

The original legacy sources were not deleted, renamed, overwritten, merged, or replaced. No schema, application, database, authentication, route, or security boundary was modified. No production JSON, import, migration, activation, publication, clinical approval, or rights approval was performed.

## Next allowed decision

The package may proceed only to a governed source-metadata comparison and independent rights/clinical review preparation. It is not yet a replacement source. A replacement decision requires a versioned source registry entry, explicit supersession decision, preserved old-source lineage, rights evidence, locator mapping, track/taxonomy evidence, and clinical review authorization.
