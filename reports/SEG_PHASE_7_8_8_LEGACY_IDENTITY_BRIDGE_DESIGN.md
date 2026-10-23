# SEG Phase 7.8.8 — Legacy Identity Bridge Design

## Mode and scope

This document defines an isolated, read-only identity bridge design between the legacy knowledge-object namespace and the SEG_CONTENT_RECORD_V1_1 staging-candidate namespace. It is a mapping contract and evidence assessment only. It does not create bridge rows, production records, JSON payloads, database records, adapter code, content transformations, approvals, activation, or publication.

Phase 7.8.7 is treated as completed input evidence and is not repeated here: **1,919 legacy objects**, **48 SEG candidates**, `MATCHED=0`, `PROBABLE_MATCH=0`, `NO_MATCH=1919`, `CONFLICT=0`.

## Evidence inputs

| Input | Role in this design | Observed evidence | SHA-256 |
|---|---|---|---|
| `/home/ubuntu/seg-manus-status/phase_7_8_7_legacy_object_crosswalk.tsv` | Completed object-level crosswalk; no populated candidate joins | 1,919 rows; all `NO_MATCH` | `ee47b10be3f0278359700ab1feb82ab371e938695c4383e12c618a1752aaa59b` |
| `/home/ubuntu/seg-manus-status/phase_7_8_7_legacy_object_crosswalk_summary.md` | Crosswalk counts, asset inventory, and exact matching constraints | 8 assets; 1,919 objects; 48 candidates | `f28f368afe15463a499f5390b34fc682d901357c55acf8769d97f2d1f3dcae34` |
| `/home/ubuntu/seg-internship-output/SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv` | SEG staging identity inventory | 48 rows; source IDs, candidate IDs, paths, SHA, type, lineage, review/rights/closure states | `7f5cc40b0cca6e8de8f363f512ae7eafa67505eee46ce792d4d2afe2bf2d5ca6` |
| `SEG_PHASE_7_8_5_ID_COMPATIBILITY_DECISION.md` | Prior design evidence | Original candidate IDs remain preserved; normalized v1.1 IDs were proposed only, not executed | Existing report |

## 1. Legacy identity model

A legacy identity is the tuple `(legacy_source, legacy_object_id, legacy_object_type)`, supplemented by observed title, topic, chapter, reference, and family relationships when those fields exist. The legacy ID/key is authoritative only inside its source asset namespace; it is not assumed to be a SEG `record_id`, `source_id`, or candidate ID.

| Legacy identity component | Meaning | Current evidence state | Bridge consequence |
|---|---|---|---|
| `legacy_source` | Exact legacy JSON asset filename and source package location | Present for all 1,919 rows | Required for namespace disambiguation |
| `legacy_object_id` | Existing object ID/key such as `UNI_*`, `FC_*`, `TRP_*`, `ALG_*`, `ANT_*`, or reference key | Present where supplied | Preserve exactly; never replace with a SEG ID |
| `legacy_object_type` | Source-derived object family/asset class | Present through asset and crosswalk target implication | Treat as source classification, not automatic v1.1 content approval |
| `legacy_title` | Existing title where present | Sparse/not uniformly present in crosswalk; some rows use `NOT_PRESENT` | Cannot serve as universal deterministic key |
| `topic/chapter/reference/family` | Contextual relationship signals | Present selectively and often non-unique | Context only unless an explicit contract makes the relation unique |

## 2. SEG staging identity model

The SEG staging identity remains the existing candidate inventory. `candidate_record_id` is the preserved historical/governance key, `source_id` is the SEG handoff source key, and `source_path` plus `sha256` provide the current staging evidence tuple. The bridge must not overwrite any of these fields.

| SEG staging identity component | Current evidence | Bridge rule |
|---|---|---|
| `target_candidate_id` | Existing `candidate_record_id` values `CAND-7.6-SRC-xxxx` for 48 candidates | Preserve exactly as the bridge target; do not normalize in place |
| `source_id` | Existing `SRC-xxxx` values for 48 candidates | Preserve as a secondary SEG-side key; it is not a legacy join key |
| `target_content_type` | Existing staging types: lesson, question_bank, clinical_case, clinical_skill, book | Copy only from candidate inventory after a link is evidenced |
| `source_path` | Existing candidate file paths | Use as evidence/locator context, not as an inferred legacy identity |
| `sha256` | Existing candidate source checksum | Preserve for lineage and later idempotency; never use SHA equality unless the exact source object is evidenced |
| `duplicate_lineage` / `duplicate_role` | Existing duplicate families and roles | Preserve; ambiguity routes to manual review, never merge/delete |
| `medical_review_status`, `rights_status`, `closure_status` | Existing open/pending states | Carry as observed metadata only; bridge does not change them |

## 3. Proposed isolated bridge record shape

The following is a design-level field contract, not a JSON schema and not a generated record. A future implementation must store it outside the closed v1.1 record unless a separately approved additive contract explicitly permits otherwise.

| Required bridge field | Required value rule | Current state |
|---|---|---|
| `legacy_source` | Exact asset filename/path from the source package | Available |
| `legacy_object_id` | Exact legacy ID/key; no renaming | Available where supplied |
| `legacy_object_type` | Source object family, preserved as observed | Available from asset/crosswalk |
| `legacy_title` | Exact observed title; otherwise explicit `NOT_PRESENT` | Incomplete across assets |
| `target_content_type` | Candidate `target_type` only after a valid link | Candidate vocabulary exists; no legacy links |
| `target_candidate_id` | Existing SEG `candidate_record_id`; `UNRESOLVED` until link evidence exists | Unresolved for all 1,919 legacy rows |
| `mapping_confidence` | One of the controlled confidence states below | `NO_MATCH / UNRESOLVED`; not reviewer-confirmed `NO_LINK` |
| `evidence_used` | Exact IDs/keys/titles/topics/chapters/references/family links used | Must be enumerated per future row |
| `review_status` | Observed bridge-review state, initially `PENDING_IDENTITY_REVIEW` or `UNRESOLVED` | No bridge review performed |

Recommended non-medical audit fields for a future authorized implementation are `legacy_object_locator`, `candidate_source_id`, `candidate_source_path`, `candidate_sha256`, `duplicate_lineage`, `duplicate_role`, `mapping_rule_id`, `reviewer_role`, `reviewed_at`, `conflict_note`, and `bridge_contract_version`. These are design recommendations only and are not added to v1.1 schema artifacts.

## 4. Current evidence result

| Check | Result | Interpretation |
|---|---|---|
| Legacy object coverage | `PASS_1919/1919` | All rows from the completed crosswalk are represented as input evidence |
| SEG candidate coverage | `PASS_48/48` | Existing staging candidate inventory is available |
| Shared explicit ID namespace | `FAIL_0/1919` | Legacy IDs do not equal `SRC-xxxx` or `CAND-7.6-SRC-xxxx` keys |
| Exact title join | `NOT_ESTABLISHED` | Candidate map does not provide a complete legacy-comparable title key; title fields are sparse in legacy crosswalk |
| Topic/chapter/family join | `NOT_DETERMINISTIC` | Contextual signals are non-unique or lack an authorized target relation |
| Reference relation join | `NOT_ESTABLISHED` | No explicit object-to-candidate reference locator contract is supplied |
| Deterministic populated bridge | `BLOCKED` | Existing evidence supports a design but not safe row-level target assignment |

## 5. Minimum additional evidence required

The minimum identity evidence is an authoritative, versioned cross-reference that maps each intended legacy object to either a specific `candidate_record_id`/`source_id` or an explicit `NO_LINK` disposition. At minimum, each mapping entry must preserve the exact legacy source and object ID, the exact SEG candidate key when linked, the rule/evidence used, and the identity-review status. If a direct cross-reference cannot be supplied, an approved deterministic contract must define unique title/topic/chapter/reference combinations and collision handling; the current evidence does not provide that contract.

For the duplicate families `DUP-DRUG-001` and `DUP-EMERGENCY-001`, the minimum evidence also includes an explicit lineage decision that preserves all source rows and distinguishes primary educational candidate, historical lineage, and any `NO_LINK` disposition. No merge or deletion is permitted by this design.

Clinical review, rights review, metadata completion, and implementation authorization remain separate gates after identity evidence. They are not replaced by a bridge match.

## 6. Design decision

`BLOCKED_PENDING_IDENTITY_EVIDENCE` — an isolated bridge contract can be designed from existing evidence, but a deterministic populated bridge cannot be created safely because the current evidence contains no explicit legacy-to-SEG identity link.

## Non-actions

- No JSON production records or bridge rows were generated.
- No content was transformed, rewritten, merged, corrected, or clinically evaluated.
- No schema, database, application, adapter, source asset, or authentication boundary was modified.
- No import, activation, publication, learner exposure, approval, or rights clearance occurred.
