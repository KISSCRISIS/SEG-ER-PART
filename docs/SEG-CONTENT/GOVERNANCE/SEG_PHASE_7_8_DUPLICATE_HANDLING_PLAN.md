# SEG Phase 7.8 — Duplicate Handling Plan

> **Status:** Preparation and lineage policy only. No deletion, merge, overwrite, import, activation, or source modification was performed.

## 1. Controlled rules

The duplicate families are handled as lineage families, not as permission to remove or mutate records. Every candidate retains its original candidate ID, Source ID, SHA-256, source path, phase status, and educational classification. Primary ordering is a preparation recommendation only; it is not an import command or activation decision.

| Rule | Applied policy |
|---|---|
| Preserve lineage | Retain family ID, member Source IDs, candidate IDs, roles, paths, and SHA evidence. |
| No deletion | No source or candidate is deleted. |
| No merge | No content is merged and no record is collapsed. |
| No overwrite | No existing source, map, schema, or application artifact is overwritten. |
| SHA evidence | Each family member keeps its exact SHA-256 from the Phase 7.6 map and Phase 7.7.6 decision. |
| Primary ordering only | `PRIMARY_EDUCATIONAL_CANDIDATE` is preserved as ordering metadata only. |
| Historical lineage | `HISTORICAL_LINEAGE_PRESERVED` remains visible and is not treated as a deletion candidate. |
| Stable evidence tuple | Candidate ID + Source ID + SHA-256 remain the preparation evidence tuple. No database key is inferred here. |

## 2. DUP-DRUG-001

| Role | Members | Handling |
|---|---|---|
| `HISTORICAL_LINEAGE_PRESERVED` | `SRC-0023`, `SRC-0024`, `SRC-0025` | Preserve all three members and their source evidence. Do not delete, merge, or overwrite. |
| `PRIMARY_EDUCATIONAL_CANDIDATE` | `SRC-0027`, `SRC-0028`, `SRC-0029` | Preserve v2_Pack ordering as preparation metadata only; no import or activation. |

All six family members remain part of the 48-candidate coverage and retain the Phase 7.7.6 classifications: `SRC-0023` and `SRC-0027` are `SEG Original`; the remaining family members are `Mixed Educational Content`.

## 3. DUP-EMERGENCY-001

| Role | Members | Handling |
|---|---|---|
| `HISTORICAL_LINEAGE_PRESERVED` | `SRC-0033`, `SRC-0034`, `SRC-0035` | Preserve all three members and their source evidence. Do not delete, merge, or overwrite. |
| `PRIMARY_EDUCATIONAL_CANDIDATE` | `SRC-0037`, `SRC-0038`, `SRC-0039` | Preserve v2_Pack ordering as preparation metadata only; no import or activation. |

All six family members remain part of the 48-candidate coverage and retain the Phase 7.7.6 classifications: `SRC-0033` and `SRC-0037` are `SEG Original`; the remaining family members are `Mixed Educational Content`.

## 4. Rollback and conflict handling

No production state exists from this preparation action, so no database rollback was executed or required. If a later, separately authorized dry-run creates a reversible staging derivative, rollback must disable or discard only that derivative while preserving all original sources and governance evidence. Any checksum conflict, lineage conflict, or source mismatch must be marked as a blocker and escalated; it must not be silently resolved.

## 5. Gate conclusion

Duplicate handling is `PASS_FOR_PREPARATION_ONLY`. It does not make any candidate importable and does not authorize Phase 7.9.

## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv "Phase 7.6 candidate record map"
[2]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_7_6_FINAL_MEDICAL_OWNER_DECISION.md "Phase 7.7.6 Final Medical Owner Decision"
[3]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_7_6_CLINICAL_QA_CLOSURE_REGISTER.md "Phase 7.7.6 Clinical QA Closure Register"
