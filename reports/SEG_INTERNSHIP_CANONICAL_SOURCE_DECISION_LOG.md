# SEG Internship Canonical Source Decision Log

**Phase:** 5.4 — Internship Source Evidence & Canonical Decision Closure  
**Mode:** `READ_ONLY GOVERNANCE CLOSURE`  
**Scope:** Drug Essentials and Emergency Cases only.  
**Author:** Manus AI  
**Decision policy:** Evidence-insufficient cases remain `BLOCKED`; no canonical source is selected by inference.

## 1. Decision register

| Content family | Source lineage | Comparison basis | Canonical decision | Archive decision | Decision status |
|---|---|---|---|---|---|
| Drug Essentials | Base lineage: `SRC-0023` `drug_essentials_intern_level_v2.md`, `SRC-0024` `implementation_notes.md`, `SRC-0025` `README.txt`.<br><br>v2 lineage: `SRC-0027` `drug_essentials_intern_level_v2.md`, `SRC-0028` `implementation_notes.md`, `SRC-0029` `README.txt`. | Phase 5.3 identified mirrored logical roles and a base/`v2_Pack` pattern. All rows remain `Needs review / verify` and `Check required`. `CONTENT_METADATA.md` supplies package version `2.0`, but no per-file checksums, owner/publisher, rights, precise locators, or independent clinical review. | `UNRESOLVED — no canonical primary can be selected from supplied evidence` | `NONE DESIGNATED — preserve both source lineages; no archive action` | `BLOCKED_PENDING_CANONICAL_REVIEW` |
| Emergency Cases | Base lineage: `SRC-0033` `emergency_cases_intern_level.md`, `SRC-0034` `implementation_notes.md`, `SRC-0035` `README.txt`.<br><br>v2 lineage: `SRC-0037` `emergency_cases_intern_level.md`, `SRC-0038` `implementation_notes.md`, `SRC-0039` `README.txt`. | Phase 5.3 identified mirrored logical roles and a base/`v2_Pack` pattern. All rows remain `Needs review / verify` and `Check required`. `CONTENT_METADATA.md` does not identify which lineage owns the governed version, rights, checksums, locators, or clinical decision. | `UNRESOLVED — no canonical primary can be selected from supplied evidence` | `NONE DESIGNATED — preserve both source lineages; no archive action` | `BLOCKED_PENDING_CANONICAL_REVIEW` |

## 2. Decision rationale

The new metadata file improves package-level identity by supplying a package label, audience, specialty, and version `2.0`, but it does not contain a controlled file-by-file comparison or an attributable declaration that either the base package or the `v2_Pack` is canonical.[1] [4]

The comparison basis is therefore limited to the observed catalog lineage and naming/path signals. Those signals are not sufficient to choose a medical source, infer precedence, or mark another source as archive-only. Medical Governance requires conflicts and missing provenance, rights, track/taxonomy, review, and audit evidence to remain blocked rather than silently resolved.[7]

## 3. Required future decision evidence

A future canonical decision requires immutable checksums for all involved originals, explicit owner/publisher and version mapping, rights evidence, exact locators, an attributable controlled comparison, track/taxonomy confirmation, independent clinical review, rights review, and an append-only decision record. Until these are supplied, both lineages remain preserved and available for audit.

## 4. Non-actions

No canonical source was selected. No archive candidate was designated. No source was deleted, renamed, moved, overwritten, rewritten, or imported. No clinical or rights approval was granted, and no activation or learner exposure occurred.

## References

[1]: /home/ubuntu/upload/CONTENT_METADATA.md "CONTENT_METADATA — 02_Internship"
[2]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_REGISTRY_FINAL.md "SEG Internship source registry final"
[3]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_METADATA_CLOSURE_REPORT.md "SEG Internship metadata closure report"
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_DUPLICATE_FINAL_DECISION.md "SEG Internship duplicate final decision"
[5]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_5_3_READINESS_DECISION.md "SEG Internship Phase 5.3 readiness decision"
[6]: /home/ubuntu/skills/seg-metadata-source-mapper/SKILL.md "SEG Metadata & Source Mapper"
[7]: /home/ubuntu/skills/seg-medical-governance/SKILL.md "SEG Medical Governance"
[8]: /home/ubuntu/skills/seg-content-architecture-schema-validator/SKILL.md "SEG Content Architecture / Schema Validator"
[9]: /home/ubuntu/skills/seg-content-qa/SKILL.md "SEG Content QA"
