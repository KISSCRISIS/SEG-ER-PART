# STYLE SPEC — Integrated ED Review Book

Read this file completely before writing. It is binding for every chapter.

## 1. What this book is

A resident-level emergency medicine revision book built **exclusively** from three
SEG question banks:

| Tag | Source |
|-----|--------|
| `PEER-PH` | PEER Physicians 2026 Unified |
| `PEER-CS` | PEER Case Series 2026 |
| `ROSH` | ROSH Initial Certification 2026 |

The book is a distillation of the **teaching points** already present in those
banks' explanations. It is a revision aid, not a textbook.

## 2. Hard rules — violating any of these makes the output unusable

1. **No external medical information.** Nothing may appear that is not supported
   by the supplied blueprint and evidence files. No guidelines, no trial names,
   no society recommendations, no drug doses, no numbers that are not in your
   evidence pack.
2. **No invention.** If the sources do not cover something a section calls for,
   write less — never fill the gap from your own knowledge. It is correct for a
   section to be short or to state "not addressed in the source material".
3. **Never contradict a source answer key.** Where the evidence shows a question's
   answer, present that answer. Do not "correct" it.
4. **No meta-language.** Never write "the question bank says", "this question
   tests", "according to the explanation". Write as a study resource states facts.
5. **No patient vignettes reproduced verbatim as filler.** The clinical substance
   is what you extract, not the case narrative.

## 3. Chapter structure — use these headings, in this order, verbatim

```
## High-Yield Exam Review
## Core Concepts
## Pathophysiology
## Diagnosis
## Management
## Clinical Pearls
## مراجعة عربية مركزة
```

- `## High-Yield Exam Review` — 18–30 tight bullets. The single most testable
  facts of the chapter. This is the section a resident reads the night before.
- `## Core Concepts` — the organising ideas, grouped under `###` subheadings.
- `## Pathophysiology` — mechanism. Group under `###` subheadings.
- `## Diagnosis` — clinical recognition + investigations. Prefer tables:
  `| Finding | Suggests |`. Use `###` subheadings for major entities.
- `## Management` — what to do, in order. Prefer numbered steps for time-critical
  pathways and tables for drug/antidote comparisons.
- `## Clinical Pearls` — 10–20 bullets of discriminators, traps, and
  cannot-miss items. Each bullet should be decision-changing, not a restatement.
- `## مراجعة عربية مركزة` — a genuine Arabic section (250–450 words) summarising
  the key points of the chapter. **Translate and summarise from the English
  explanations in your evidence pack.** Never introduce a fact in Arabic that is
  not in the English material of the same chapter. Write natural medical Arabic,
  not a word-for-word translation. Use the Arabic names of conditions followed by
  the English term in parentheses on first mention, e.g. `الانتباذ الكبدي (ectopic
  liver)`. Keep all numbers, drug names, and units in Latin script inside the
  Arabic text (e.g. `1 mg/kg`), and write drug names in Latin script.

## 4. Sourcing tags

Append a source tag to any bullet carrying a **specific numeric fact, dose,
threshold, or named sign**:

- `[ROSH]` `[PEER-PH]` `[PEER-CS]` — one tag per supporting source, e.g. `[ROSH][PEER-PH]`

Do **not** tag every bullet — it becomes noise. Tag the specific, checkable claims.
Never invent a tag: only tag with a source that actually appears in your evidence.

## 5. Style

- Telegraphic resident-review register: dense, factual, scannable.
- Bullets over paragraphs. Tables where a table is clearer.
- Abbreviations standard in EM (ED, ECG, CT, ABG, GCS, MAP, ROSC). Expand on
  first use in the chapter: `Glasgow Coma Scale (GCS)`.
- Units: `mg`, `mcg`, `mg/kg`, `mmHg`, `mmol/L`. Never invent a dose.
- No emoji. No exclamation marks. No "remember to always…" filler.
- Do not use a heading level deeper than `###`.
- Do not add a chapter title `#` heading — the builder adds it.

## 6. Length

Target **13,000–17,000 characters per part file** (see your task for how many
parts). Keep total chapter output within the range you are given. Density beats
length: a shorter chapter that is all signal is better than a padded one.

## 7. Arabic quality checklist

- Right-to-left, natural phrasing, correct medical terminology.
- No machine-translation artifacts, no English word order.
- Every claim in the Arabic section must be traceable to the English evidence of
  that same chapter.
- Numbers/drugs/units stay in Latin script.

## 8. What to do when evidence is thin

Some chapters have fewer explanations than questions. When your evidence pack is
thin for a topic:

- Lean on the **blueprint** (every question stem + its answer) — that is the
  authoritative statement of *what is tested* in this chapter.
- Write the concept at the level the blueprint supports, and stop.
- Never pad with general medical knowledge to reach a length target. Falling
  short of the target is always preferable to inventing content.
