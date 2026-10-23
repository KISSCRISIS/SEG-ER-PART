**Phase:** 6.3 — Contract Adoption Status  
**Mode:** `READ_ONLY ARCHITECTURE GOVERNANCE`  
**Generated at (UTC):** `2026-08-17T20:28:49Z`

# SEG Internship Contract Adoption Matrix

## Scope

This matrix records reference-design adoption only. It does not create canonical enums, amend the manifest, convert source content, or authorize implementation. The architecture reference is adopted with limitations; individual contracts remain at the statuses below.

| Domain | Current status | Adoption status | Required approval | Implementation impact |
|---|---|---|---|---|
| Lesson | Existing canonical `content_type=lesson` candidate; source candidates remain pending/blocked | `Candidate` | Per-source provenance, explicit track/taxonomy, rights, reviewer decision, QA, audit, and implementation authorization | Can reuse the existing lesson candidate boundary after exact-artifact validation; no source record is created now. |
| Question Bank | Existing canonical `content_type=question_bank` candidate; `SRC-0078` has unresolved lineage | `Candidate` | Item/source lineage crosswalk, complete question evidence, rights, track/taxonomy, relevant/clinical review, QA, audit, and implementation authorization | Can reuse the existing question-bank candidate boundary only after lineage and governance closure; no question payload is created now. |
| Clinical Case | Candidate extension; canonical `case` enum absent | `Pending` | Separate architecture approval of the case contract/enum, then source/rights/clinical review, taxonomy, QA, audit, and implementation authorization | Requires a future authorized enum/adapter decision; no case schema target is active. |
| Skills / Procedures | Candidate extension; canonical `skill` enum absent | `Pending` | Separate approval distinguishing framework candidate from competency/sign-off, plus relevant/clinical review, assessment contract, rights, taxonomy, QA, audit, and implementation authorization | Requires a future authorized contract and may not create sign-off or competency records implicitly. |
| Reference / Book | Candidate extension; generic `reference` enum absent; `book` requires separate contract | `Pending` | Separate book/reference contract and enum decision, provenance/rights/display review, exact locators, taxonomy, relevant review, QA, audit, and implementation authorization | Requires a future authorized reference target; no learner-facing display or generic reference record is enabled. |

## Cross-domain controls

All five domains inherit the common governance envelope: stable identity, title, language, source identity/location, accessed date, governed version/checksum, exact references and locators, rights/display scope, taxonomy ID/version, attributable review decision, and append-only audit events. Missing values remain `NOT_SUPPLIED` or `UNRESOLVED` and block handoff.

Technical assets are not a sixth content contract. TS/TSX/JS routes, components, parsers, utilities, manifests, and implementation artifacts remain `EXCLUDED_FROM_MEDICAL_CONTENT_INGESTION`.

## Adoption conclusion

The blueprint is adopted as a **reference design with limitations**. No content domain is adopted as an implementation-ready production contract in this phase. The Phase 5.11 state remains `BLOCKED_PENDING_GOVERNANCE`.

## Non-actions and scope boundary

This Phase 6.3 package is documentation-only. It does not modify the canonical manifest schema, create JSON, convert source content, create production records, import to a database, change the application, change authentication/routes/components/assets, activate or publish medical content, delete/rename/merge/archive sources, commit, push, deploy, or grant clinical approval. The Phase 5.11 governance gate remains `BLOCKED_PENDING_GOVERNANCE`. The three extension contracts remain candidate/pending design elements unless separately approved.


## References

[1]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_CONTENT_MODEL_BLUEPRINT.md` "SEG Internship Content Model Blueprint"  
[2]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_6_2_BLUEPRINT_GATE_REPORT.md` "Phase 6.2 Blueprint Gate Report"  
[3]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_EXTENDED_CONTENT_CONTRACTS.md` "Extended Content Contracts"  
[4]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_TAXONOMY_CLOSURE_PLAN.md` "Taxonomy Closure Plan"  
[5]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_SOURCE_LINEAGE_RECONCILIATION.md` "Source Lineage Reconciliation"  
[6]: `/home/ubuntu/seg-internship-output/SEG_INTERNSHIP_PHASE_5_11_FINAL_GATE_REPORT.md` "Phase 5.11 Final Gate Report"  
