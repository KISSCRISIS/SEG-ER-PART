# SEG Phase 7.8.17 — Normalized Chapter Index

**Mode:** `CONTROLLED / READ-ONLY STRUCTURAL INDEX`  
**Status:** `CHAPTER_INDEX_READY_FOR_REVIEW`  
**Content modification:** `false`  
**Source preservation:** `true`

## 1. Interpretation rule

This index records observed chapter-like markers and a deterministic normalized chapter key where the evidence supports one. It does not rewrite headings, choose a canonical medical taxonomy, or infer a lesson boundary. Repeated headings with the same explicit chapter number are represented as multiple raw markers under one normalized chapter candidate. Citation-like strings such as `Chapter 105` from an external reference are retained as **reference signals**, not promoted to source chapters.

> A normalized chapter candidate is a structural review key only. It is not a SEG module, lesson, clinical topic approval, or production mapping.

## 2. Normalized chapter summary

| Source ID | Artifact | Raw/observed structural evidence | Normalized chapter candidates | Locator quality | Interpretation |
|---|---|---:|---:|---|---|
| `UPD811-001` | FRCEM High Yield Study Book | 64 observed chapter rows in the extracted index; two heading forms commonly appear for each explicit chapter number | 32 candidates, `01`–`32` | Line locators observed | Paired uppercase and compact/final headings remain separate raw markers under the same numbered review key |
| `UPD811-004` | FRCEM High Yield Study Book duplicate representation | Same 64-row chapter index and same chapter starts as `UPD811-001` | 32 candidates, `01`–`32` | Line locators observed | Structurally identical representation; separate lineage retained |
| `UPD811-002` | HIPPO Questions/Answers with Arabic explanations | 18 chapter markers | 18 candidates, `01`–`18` | Line locators observed | Chapter boundary is structural only; question/explanation review remains separate |
| `UPD811-003` | FRCEM Questions and Explanations | 32 chapter markers | 32 candidates, `01`–`32` | Line locators observed | Seven section-like markers were also observed in the raw inventory; they are not silently promoted to chapters |
| `UPD811-005` | HIPPO High Yield Study Book | 18 chapter markers | 18 candidates, `01`–`18` | Line locators observed | Citation-like external chapter strings remain reference signals and are not normalized as HIPPO chapters |

## 3. FRCEM study-book paired-marker rule

The FRCEM study-book index shows repeated headings for the same explicit chapter number. For example, chapter `01` appears as `SURGICAL EMERGENCIES` and as `Surgical Emergencies — Final (compact FRCEM study notes)` at separate line locators. The same pattern continues across the numbered chapter candidates. The safe normalization is therefore:

```text
raw marker 1 + raw marker 2
        ↓
normalized structural key: source_id + chapter_number
```

This key does not decide whether the two sections are duplicates, revisions, summaries, or intended complements. That decision requires source/version evidence and later review. No text was merged or discarded.

## 4. Locator and boundary constraints

The index stores observed line locations from the source text. It does not create page locators for text files, infer chapter semantics from topic familiarity, or claim that every section is complete. The FRCEM QBank contains repeated low-number question identifiers, so chapter position alone cannot provide a stable question identity. The HIPPO QBank has a clean observed question-ID signal within the extracted file, but that does not establish external edition identity or rights.

## 5. Downstream use

The index is suitable for a review queue and for a future mapping design that preserves source ID, raw marker number, normalized chapter number, exact line locator, and evidence class. It is not suitable for production import, adapter execution, content activation, or learner exposure.

## 6. Evidence references

[1]: file:///tmp/seg-phase-7-8-17/chapter_index.tsv "Phase 7.8.17 raw chapter index"
[2]: file:///tmp/seg-phase-7-8-17/artifact_inventory.tsv "Phase 7.8.17 artifact inventory"
[3]: file:///home/ubuntu/seg-manus-status/phase_7_8_12_content_intelligence_raw.json "Phase 7.8.12 raw content-intelligence evidence"

## Final chapter-index decision

**`STRUCTURAL_INDEX_READY — NO_PRODUCTION_MAPPING`**. The normalized keys are review aids only and preserve all raw markers and source lineages.
