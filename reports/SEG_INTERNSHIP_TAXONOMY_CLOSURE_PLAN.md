**Phase:** 6.1 — Content Contract Extension & Governance Closure  
**Mode:** `READ_ONLY GOVERNED DESIGN`  
**Generated at (UTC):** `2026-08-17T20:14:42Z`  
**Design status:** Candidate contracts and closure plans only; no production schema, JSON, import, approval, or activation.

# SEG Internship Taxonomy and Track Closure Plan

## 1. Closure status

The pathway vocabulary is fixed by the approved Internship Doctor Pathway contract, but **per-source track and taxonomy closure is not complete**. This plan preserves the approved branch vocabulary without assigning a taxonomy ID/version that has not been supplied.

## 2. Pathway identity

| Field | Controlled value | Closure interpretation |
|---|---|---|
| Professional Pathway | `SEG Internship Doctor Pathway` | Approved pathway identity. |
| Audience | `Medical Intern Doctors` | Approved audience. |
| Level | `Internship / Intern Core` | Approved level context; not a substitute for per-source track evidence. |
| Professional track | `02_Internship` | Required explicit per-source value; currently open for the source package. |
| Taxonomy | `NOT_SUPPLIED` | A governed taxonomy ID and version must be supplied; do not infer them. |

## 3. Controlled branch mapping

| Top-level branch | Approved sections | Mapping rule |
|---|---|---|
| Core Rotations | Internal Medicine; Surgery; Pediatrics; OBGYN | Use only when the source evidence supports the rotation and explicit track context. |
| Clinical Foundation | Emergency Basics; Clinical Skills; Drug Essentials; ECG; Critical Care; Toxicology | Use only when the source evidence supports the foundation module and explicit track context. |
| Learning Engine | Learn; Practice; MCQ; Cases; Progress Analytics | Use as a learning-function location, not as proof of content type, approval, or taxonomy. |

The branch vocabulary must remain separate from the seven professional tracks. No resident, student, paramedic, nursing, GP, or shared-core content may be mixed into `02_Internship` without an explicit governed relationship.

## 4. Required per-source taxonomy record

Before any future exact-artifact validation, every candidate must have a separately evidenced mapping containing:

| Requirement | Required evidence | Current state |
|---|---|---|
| Inventory/source identity | Stable source ID, local alias if any, immutable path, SHA-256 | Partially observed; lineage conflicts remain. |
| Track | Explicit `02_Internship` label in governed context | `BLOCKED_TRACK_UNSUPPLIED` for the package. |
| Taxonomy ID | Supplied governed taxonomy identifier | `BLOCKED_TAXONOMY_UNSUPPLIED`. |
| Taxonomy version | Supplied taxonomy release/version | `BLOCKED_TAXONOMY_VERSION_UNSUPPLIED`. |
| Branch/module | One approved branch and section with evidence locator | Provisional for some candidates; unresolved for others. |
| Specialty/topic | Explicit source or reviewer value | Present for some candidates, not globally closed. |
| Cross-track conflict check | Independent check against all seven tracks | Not closed. |
| Review and audit | Attributable reviewer decision, date, locators, unresolved disposition, audit event | `BLOCKED_REVIEW_OR_AUDIT`. |

## 5. Closure sequence

First, issue the source-lineage crosswalk for conflicting identifiers, including `SRC-0078` and `phone-pediatrics-main`. Second, supply the governed `02_Internship` track label and taxonomy ID/version for each candidate without modifying the canonical manifest or source files. Third, map each candidate to one approved branch/module using exact locators and preserve `UNRESOLVED` where evidence is insufficient. Fourth, perform independent taxonomy/relevant review and append the decision and audit event. Fifth, run exact-artifact structural QA only after the contract and governance evidence are complete.

## 6. Blocking rules

A filename, folder, topic, UI label, or source-local role cannot close track or taxonomy. A pathway candidate is not an approved record. Missing or conflicting track/taxonomy evidence produces a fail-closed result, and no schema conversion, JSON generation, import, or activation may proceed.

## 7. Non-actions

This plan does not assign taxonomy IDs, create record IDs, modify the canonical manifest schema, mix professional tracks, alter source files, perform clinical review, grant approval, create JSON, import records, activate content, or authorize implementation.

## References

[1]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_5_11_FINAL_GATE_REPORT.md "Phase 5.11 Final Governance Gate"
[2]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_TRACK_TAXONOMY_CONTRACT.md "Phase 5.11 Track and Taxonomy Contract"
[3]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_TYPE_CONTRACT.md "Phase 5.10 Content Type Contract"
[4]: /home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SCHEMA_FIELD_READINESS_MATRIX.md "Phase 5.10 Schema Field Readiness Matrix"
[5]: /home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "Canonical SEG Manifest Schema"
