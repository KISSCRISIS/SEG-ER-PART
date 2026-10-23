# SEG Phase 7.8.17 — Question Structure Map

**Mode:** `CONTROLLED / READ-ONLY STRUCTURAL PREPARATION`  
**Status:** `QUESTION_STRUCTURE_MAPPED — IDENTITY REVIEW REQUIRED`  
**Content modification:** `false`  
**Source preservation:** `true`

## 1. Scope

This map describes the observed structure of the two Priority 1 QBank texts. It records counts, observed identifier ranges, option markers, Arabic-line signals, and duplicate-ID findings. It does not create question-bank records, verify answers, rewrite explanations, deduplicate questions, or assign SEG content IDs.

## 2. QBank structural map

| Source ID | Artifact | Observed question markers | Observed ID range | Duplicate-ID signal | Option markers | Arabic lines | Structural decision |
|---|---|---:|---:|---|---:|---:|---|
| `UPD811-002` | HIPPO Questions/Answers Brief Arabic Explanations by Chapter | 1,927 | `1`–`1,531` | `NONE_OBSERVED` in the extracted question-ID field | 7,717 | 3,854 | Suitable for controlled question-structure review; identity, version, rights, and clinical review remain open |
| `UPD811-003` | FRCEM All Chapters Questions and Explanations Full | 1,529 | `1`–`21` in the extracted ID field | Repeated low-number IDs, including `1`–`154` and additional repeated identifiers | 8,228 | 14,804 | Question count is usable as a structural count only; question identity is unresolved and cannot be treated as a stable primary key |

## 3. Identity and deduplication implications

The HIPPO extraction produced a non-repeated identifier signal within this file, but that is not proof of uniqueness across editions, files, or external sources. The FRCEM extraction produced repeated question identifiers, which means the visible numeric identifier cannot be used as a deterministic identity bridge. Chapter number, question number, title, or answer pattern must not be combined into an invented ID.

The safe future review key is a compound evidence tuple, not a production ID:

```text
source_id
+ source_sha256
+ exact chapter locator
+ observed question marker
+ exact line locator
```

This tuple is a review locator only. It remains unresolved until version/edition evidence, source ownership, rights scope, and independent medical review are available.

## 4. Explanation and Arabic layer boundaries

The QBank files contain explanation and Arabic-line signals, but this report does not classify any line as clinically correct, SEG-original, external-reference-based, or approved mentor content. Arabic explanation signals remain a separate review queue layer. They must not be converted into `arabic_mentor_explanation`, lesson, flashcard, exam trap, algorithm, or assessment records in this phase.

## 5. Exact-overlap result

The dedicated exact normalized-block overlap table contains no data rows. This is recorded as `NO_EXACT_NORMALIZED_QBANK_OVERLAP_OBSERVED_IN_THIS_RUN`, not as proof that the sources are medically distinct and not as permission to merge or replace any source.

## 6. Downstream use

The map can support a future review queue containing source ID, checksum, chapter locator, observed question marker, line locator, duplicate-ID status, and review state. It cannot support production import, answer verification, clinical approval, or adapter execution.

## 7. Evidence references

[1]: file:///tmp/seg-phase-7-8-17/question_structure.tsv "Phase 7.8.17 question structure evidence"
[2]: file:///tmp/seg-phase-7-8-17/qbank_exact_overlap.tsv "Phase 7.8.17 exact normalized overlap evidence"
[3]: file:///tmp/seg-phase-7-8-17/chapter_index.tsv "Phase 7.8.17 chapter locator evidence"

## Final question-structure decision

**`QUESTION_STRUCTURE_READY_FOR_REVIEW — BLOCKED_PENDING_IDENTITY_VERSION_RIGHTS_CLINICAL_REVIEW`**. Structural counts are recorded, but no question-level production identity or content approval is assigned.
