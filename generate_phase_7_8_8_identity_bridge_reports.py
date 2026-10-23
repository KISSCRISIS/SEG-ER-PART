from pathlib import Path
import csv, hashlib
from collections import Counter

OUT = Path('/home/ubuntu/seg-internship-output')
CROSSWALK = Path('/home/ubuntu/seg-manus-status/phase_7_8_7_legacy_object_crosswalk.tsv')
SUMMARY = Path('/home/ubuntu/seg-manus-status/phase_7_8_7_legacy_object_crosswalk_summary.md')
CANDIDATES = OUT / 'SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv'
LEGACY_ROOT = Path('/home/ubuntu/seg-legacy-knowledge-audit-input')
ASSETS = [
    'officialUnifiedTopics.json', 'referenceLibrary.json', 'flashcards.json',
    'examTraps.json', 'algorithms.json', 'arabicMentorExplanations.json',
    'topicFamilyIndex.json', 'antidotes.json'
]

def file_sha(path):
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()

with CROSSWALK.open(encoding='utf-8', newline='') as f:
    legacy_rows = list(csv.DictReader(f, delimiter='\t'))
with CANDIDATES.open(encoding='utf-8', newline='') as f:
    candidate_rows = list(csv.DictReader(f, delimiter='\t'))
assert len(legacy_rows) == 1919
assert len(candidate_rows) == 48
assert Counter(r['status'] for r in legacy_rows) == Counter({'NO_MATCH': 1919})

asset_counts = Counter(r['asset'] for r in legacy_rows)
legacy_types = Counter(r['target_type'] for r in legacy_rows)
candidate_types = Counter(r['target_type'] for r in candidate_rows)
legacy_hashes = {asset: file_sha(LEGACY_ROOT / asset) for asset in ASSETS}
crosswalk_sha = file_sha(CROSSWALK)
candidate_sha = file_sha(CANDIDATES)
summary_sha = file_sha(SUMMARY)

# Report 1: Bridge design
bridge = [
    '# SEG Phase 7.8.8 — Legacy Identity Bridge Design', '',
    '## Mode and scope', '',
    'This document defines an isolated, read-only identity bridge design between the legacy knowledge-object namespace and the SEG_CONTENT_RECORD_V1_1 staging-candidate namespace. It is a mapping contract and evidence assessment only. It does not create bridge rows, production records, JSON payloads, database records, adapter code, content transformations, approvals, activation, or publication.', '',
    'Phase 7.8.7 is treated as completed input evidence and is not repeated here: **1,919 legacy objects**, **48 SEG candidates**, `MATCHED=0`, `PROBABLE_MATCH=0`, `NO_MATCH=1919`, `CONFLICT=0`.', '',
    '## Evidence inputs', '',
    '| Input | Role in this design | Observed evidence | SHA-256 |',
    '|---|---|---|---|',
    f'| `{CROSSWALK}` | Completed object-level crosswalk; no populated candidate joins | 1,919 rows; all `NO_MATCH` | `{crosswalk_sha}` |',
    f'| `{SUMMARY}` | Crosswalk counts, asset inventory, and exact matching constraints | 8 assets; 1,919 objects; 48 candidates | `{summary_sha}` |',
    f'| `{CANDIDATES}` | SEG staging identity inventory | 48 rows; source IDs, candidate IDs, paths, SHA, type, lineage, review/rights/closure states | `{candidate_sha}` |',
    '| `SEG_PHASE_7_8_5_ID_COMPATIBILITY_DECISION.md` | Prior design evidence | Original candidate IDs remain preserved; normalized v1.1 IDs were proposed only, not executed | Existing report |',
    '',
    '## 1. Legacy identity model', '',
    'A legacy identity is the tuple `(legacy_source, legacy_object_id, legacy_object_type)`, supplemented by observed title, topic, chapter, reference, and family relationships when those fields exist. The legacy ID/key is authoritative only inside its source asset namespace; it is not assumed to be a SEG `record_id`, `source_id`, or candidate ID.', '',
    '| Legacy identity component | Meaning | Current evidence state | Bridge consequence |',
    '|---|---|---|---|',
    '| `legacy_source` | Exact legacy JSON asset filename and source package location | Present for all 1,919 rows | Required for namespace disambiguation |',
    '| `legacy_object_id` | Existing object ID/key such as `UNI_*`, `FC_*`, `TRP_*`, `ALG_*`, `ANT_*`, or reference key | Present where supplied | Preserve exactly; never replace with a SEG ID |',
    '| `legacy_object_type` | Source-derived object family/asset class | Present through asset and crosswalk target implication | Treat as source classification, not automatic v1.1 content approval |',
    '| `legacy_title` | Existing title where present | Sparse/not uniformly present in crosswalk; some rows use `NOT_PRESENT` | Cannot serve as universal deterministic key |',
    '| `topic/chapter/reference/family` | Contextual relationship signals | Present selectively and often non-unique | Context only unless an explicit contract makes the relation unique |',
    '',
    '## 2. SEG staging identity model', '',
    'The SEG staging identity remains the existing candidate inventory. `candidate_record_id` is the preserved historical/governance key, `source_id` is the SEG handoff source key, and `source_path` plus `sha256` provide the current staging evidence tuple. The bridge must not overwrite any of these fields.', '',
    '| SEG staging identity component | Current evidence | Bridge rule |',
    '|---|---|---|',
    '| `target_candidate_id` | Existing `candidate_record_id` values `CAND-7.6-SRC-xxxx` for 48 candidates | Preserve exactly as the bridge target; do not normalize in place |',
    '| `source_id` | Existing `SRC-xxxx` values for 48 candidates | Preserve as a secondary SEG-side key; it is not a legacy join key |',
    '| `target_content_type` | Existing staging types: lesson, question_bank, clinical_case, clinical_skill, book | Copy only from candidate inventory after a link is evidenced |',
    '| `source_path` | Existing candidate file paths | Use as evidence/locator context, not as an inferred legacy identity |',
    '| `sha256` | Existing candidate source checksum | Preserve for lineage and later idempotency; never use SHA equality unless the exact source object is evidenced |',
    '| `duplicate_lineage` / `duplicate_role` | Existing duplicate families and roles | Preserve; ambiguity routes to manual review, never merge/delete |',
    '| `medical_review_status`, `rights_status`, `closure_status` | Existing open/pending states | Carry as observed metadata only; bridge does not change them |',
    '',
    '## 3. Proposed isolated bridge record shape', '',
    'The following is a design-level field contract, not a JSON schema and not a generated record. A future implementation must store it outside the closed v1.1 record unless a separately approved additive contract explicitly permits otherwise.', '',
    '| Required bridge field | Required value rule | Current state |',
    '|---|---|---|',
    '| `legacy_source` | Exact asset filename/path from the source package | Available |',
    '| `legacy_object_id` | Exact legacy ID/key; no renaming | Available where supplied |',
    '| `legacy_object_type` | Source object family, preserved as observed | Available from asset/crosswalk |',
    '| `legacy_title` | Exact observed title; otherwise explicit `NOT_PRESENT` | Incomplete across assets |',
    '| `target_content_type` | Candidate `target_type` only after a valid link | Candidate vocabulary exists; no legacy links |',
    '| `target_candidate_id` | Existing SEG `candidate_record_id`; `UNRESOLVED` until link evidence exists | Unresolved for all 1,919 legacy rows |',
    '| `mapping_confidence` | One of the controlled confidence states below | `NO_MATCH / UNRESOLVED`; not reviewer-confirmed `NO_LINK` |',
    '| `evidence_used` | Exact IDs/keys/titles/topics/chapters/references/family links used | Must be enumerated per future row |',
    '| `review_status` | Observed bridge-review state, initially `PENDING_IDENTITY_REVIEW` or `UNRESOLVED` | No bridge review performed |',
    '',
    'Recommended non-medical audit fields for a future authorized implementation are `legacy_object_locator`, `candidate_source_id`, `candidate_source_path`, `candidate_sha256`, `duplicate_lineage`, `duplicate_role`, `mapping_rule_id`, `reviewer_role`, `reviewed_at`, `conflict_note`, and `bridge_contract_version`. These are design recommendations only and are not added to v1.1 schema artifacts.', '',
    '## 4. Current evidence result', '',
    '| Check | Result | Interpretation |',
    '|---|---|---|',
    '| Legacy object coverage | `PASS_1919/1919` | All rows from the completed crosswalk are represented as input evidence |',
    '| SEG candidate coverage | `PASS_48/48` | Existing staging candidate inventory is available |',
    '| Shared explicit ID namespace | `FAIL_0/1919` | Legacy IDs do not equal `SRC-xxxx` or `CAND-7.6-SRC-xxxx` keys |',
    '| Exact title join | `NOT_ESTABLISHED` | Candidate map does not provide a complete legacy-comparable title key; title fields are sparse in legacy crosswalk |',
    '| Topic/chapter/family join | `NOT_DETERMINISTIC` | Contextual signals are non-unique or lack an authorized target relation |',
    '| Reference relation join | `NOT_ESTABLISHED` | No explicit object-to-candidate reference locator contract is supplied |',
    '| Deterministic populated bridge | `BLOCKED` | Existing evidence supports a design but not safe row-level target assignment |',
    '',
    '## 5. Minimum additional evidence required', '',
    'The minimum identity evidence is an authoritative, versioned cross-reference that maps each intended legacy object to either a specific `candidate_record_id`/`source_id` or an explicit `NO_LINK` disposition. At minimum, each mapping entry must preserve the exact legacy source and object ID, the exact SEG candidate key when linked, the rule/evidence used, and the identity-review status. If a direct cross-reference cannot be supplied, an approved deterministic contract must define unique title/topic/chapter/reference combinations and collision handling; the current evidence does not provide that contract.', '',
    'For the duplicate families `DUP-DRUG-001` and `DUP-EMERGENCY-001`, the minimum evidence also includes an explicit lineage decision that preserves all source rows and distinguishes primary educational candidate, historical lineage, and any `NO_LINK` disposition. No merge or deletion is permitted by this design.', '',
    'Clinical review, rights review, metadata completion, and implementation authorization remain separate gates after identity evidence. They are not replaced by a bridge match.', '',
    '## 6. Design decision', '',
    '`BLOCKED_PENDING_IDENTITY_EVIDENCE` — an isolated bridge contract can be designed from existing evidence, but a deterministic populated bridge cannot be created safely because the current evidence contains no explicit legacy-to-SEG identity link.', '',
    '## Non-actions', '',
    '- No JSON production records or bridge rows were generated.',
    '- No content was transformed, rewritten, merged, corrected, or clinically evaluated.',
    '- No schema, database, application, adapter, source asset, or authentication boundary was modified.',
    '- No import, activation, publication, learner exposure, approval, or rights clearance occurred.',
]
(OUT / 'SEG_PHASE_7_8_8_LEGACY_IDENTITY_BRIDGE_DESIGN.md').write_text('\n'.join(bridge) + '\n', encoding='utf-8')

# Report 2: Mapping rules
rules = [
    '# SEG Phase 7.8.8 — Mapping Rules', '',
    '## Rule status', '',
    'These rules are a fail-closed design for a future identity bridge. They do not classify any current legacy object as linked, do not create bridge rows, and do not override the completed Phase 7.8.7 result.', '',
    '## Controlled confidence vocabulary', '',
    '| Mapping confidence | Qualification rule | Automatic assignment allowed? | Current count |',
    '|---|---|---:|---:|',
    '| `EXACT_ID_MATCH` | The exact legacy source/object ID appears in an explicitly authorized legacy-to-SEG cross-reference and resolves to one unique candidate. Namespace and collision checks must pass. | Only after the explicit cross-reference is supplied and reviewed | 0 |',
    '| `EXACT_TITLE_MATCH` | The complete observed legacy title equals the complete target-comparable candidate title under a documented exact comparison rule; one unique candidate only. No fuzzy similarity, synonym, translation, or partial-title matching. | Only when candidate title evidence is present and uniqueness is proven | 0 established |',
    '| `TOPIC_RELATION_MATCH` | A controlled taxonomy/pathway relation explicitly maps one legacy topic/family to one candidate, with versioned vocabulary and collision rules. Topic similarity alone is insufficient. | No, until the relation contract and review are supplied | 0 established |',
    '| `REFERENCE_RELATION_MATCH` | An explicit reference/chapter/locator relation identifies the same source object and resolves to one candidate; book/reference context alone is insufficient. | No, until source locator/version evidence is supplied | 0 established |',
    '| `MANUAL_REVIEW_REQUIRED` | A human identity reviewer must decide because evidence is ambiguous, non-unique, duplicate-family related, missing, or conflicting. The reviewer must record evidence and disposition. | No automatic link | 0 bridge rows created |',
    '| `NO_LINK` | No sufficient identity evidence exists, or the object is index/navigation/enrichment-only and no direct SEG candidate is authorized. | Yes as an explicit non-link disposition only; never as a candidate assignment | 0 reviewer-confirmed; 1,919 current rows are `NO_MATCH`, not confirmed `NO_LINK` |',
    '',
    '## Deterministic evaluation order', '',
    '1. Verify the legacy namespace: exact asset filename, object ID/key, and object type must be preserved.',
    '2. Check an authorized exact ID cross-reference first. If one unique target exists, record `EXACT_ID_MATCH`; if multiple targets or contradictory targets exist, stop at `MANUAL_REVIEW_REQUIRED` or `CONFLICT` in a later governed workflow.',
    '3. Check exact title equality only when both sides contain complete comparable title values. A missing title, partial title, translation, synonym, or topic label cannot pass this rule.',
    '4. Check topic/family relationships only through an explicit, versioned taxonomy/pathway contract. Do not promote a topic label to an identity key.',
    '5. Check reference/chapter relations only when source identity, version/edition if known, locator, and one target candidate are explicit. A reference framework signal is not a record join.',
    '6. Route ambiguity, duplicate lineage, missing target evidence, or conflicting signals to `MANUAL_REVIEW_REQUIRED`.',
    '7. If no rule passes and no authorized review is available, record `NO_LINK`; preserve the object for future evidence intake.',
    '',
    '## Evidence precedence and conflict handling', '',
    '| Evidence condition | Required handling |',
    '|---|---|',
    '| Exact ID and exact title agree | Candidate may be proposed at the corresponding confidence, subject to review status and governance gates. |',
    '| Exact ID conflicts with title/topic | Do not choose silently; route to manual identity review and record the conflict. |',
    '| Multiple candidates share the same title/topic | No automatic link; route to manual review. |',
    '| Duplicate lineage is present | Preserve every source/candidate row; no merge, overwrite, deletion, or silent primary selection. |',
    '| Only external reference name is present | Keep as reference relation/context; do not assign a SEG candidate. |',
    '| Only family/index relationship is present | Keep as taxonomy/navigation support; do not create a direct content link. |',
    '| Rights or clinical review is missing | Identity may be reviewed as a mapping proposal, but the target remains non-production and non-learner-facing. |',
    '',
    '## Asset-specific default handling', '',
    '| Legacy asset | Default bridge treatment |',
    '|---|---|',
    '| `officialUnifiedTopics.json` | Potential lesson-candidate source only; exact topic/title is not a candidate join without explicit target evidence. |',
    '| `referenceLibrary.json` | Book/reference-framework context; no direct lesson or candidate link without explicit source/locator relation. |',
    '| `flashcards.json` | Question-bank enrichment candidate; no direct candidate link from `FC_*` alone. |',
    '| `examTraps.json` | Question-bank/lesson enrichment candidate; `TRP_*` alone is not a target identity. |',
    '| `algorithms.json` | Clinical-case/skill support candidate; no direct target assignment from `ALG_*` alone. |',
    '| `arabicMentorExplanations.json` | Educational-layer enrichment with authorship/review state unresolved; no direct candidate link from the object key alone. |',
    '| `topicFamilyIndex.json` | Taxonomy/navigation support only; no direct v1.1 record or candidate link. |',
    '| `antidotes.json` | Toxicology enrichment/support candidate; no direct target assignment from `ANT_*` alone. |',
    '',
    '## Required review statuses', '',
    '| State | Meaning |',
    '|---|---|',
    '| `UNRESOLVED` | No target identity has been established. |',
    '| `PENDING_IDENTITY_REVIEW` | Evidence package is ready for a designated identity reviewer; no link is active. |',
    '| `IDENTITY_REVIEWED_NOT_GOVERNANCE_APPROVED` | Identity relation was reviewed as a mapping fact, but clinical/rights/implementation gates remain open. |',
    '| `NO_LINK_CONFIRMED` | Reviewer explicitly confirms no SEG candidate relation for the current scope. |',
    '| `CONFLICT_ESCALATED` | Conflicting identity evidence is preserved and requires escalation. |',
    '',
    '## Current rule application', '',
    'Applying these rules to the available evidence does not yield any deterministic target assignment. The prior result remains `MATCHED=0`, `PROBABLE_MATCH=0`, `NO_MATCH=1919`, `CONFLICT=0`. This is an identity-evidence result, not a clinical content rejection.', '',
    '## Non-actions', '',
    'No bridge rows, JSON, adapter, import, database write, schema modification, content rewrite, approval, activation, or publication was performed.',
]
(OUT / 'SEG_PHASE_7_8_8_MAPPING_RULES.md').write_text('\n'.join(rules) + '\n', encoding='utf-8')

# Report 3: Gate report
# Explicitly separate identity blocker from downstream governance gates.
gate = [
    '# SEG Phase 7.8.8 — Legacy Identity Bridge Gate Report', '',
    '## Final status', '',
    '`BLOCKED_PENDING_IDENTITY_EVIDENCE`', '',
    '## Evidence basis', '',
    '| Measure | Result |',
    '|---|---:|',
    '| Legacy objects analyzed in completed Phase 7.8.7 | 1,919 |',
    '| SEG staging candidates | 48 |',
    '| `MATCHED` | 0 |',
    '| `PROBABLE_MATCH` | 0 |',
    '| `NO_MATCH` | 1,919 |',
    '| `CONFLICT` | 0 |',
    '| Bridge rows created in this phase | 0 |',
    '',
    '## Gate decision', '',
    'A deterministic identity bridge **cannot be created from existing evidence**. The existing evidence supports an isolated bridge design and fail-closed mapping rules, but it does not provide a shared identity namespace or an authorized unique relation from any legacy object to any SEG candidate.', '',
    '| Gate | Status | Evidence-based finding |',
    '|---|---|---|',
    '| Legacy namespace preservation | `PASS` | Legacy asset/object IDs and observed fields can be preserved exactly. |',
    '| SEG staging identity preservation | `PASS` | Candidate ID, source ID, target type, path, SHA, duplicate lineage, and observed review/rights/closure states are available. |',
    '| Explicit legacy-to-SEG join | `BLOCKED` | No shared explicit join key; 0/1,919 linked. |',
    '| Exact title join | `BLOCKED` | Candidate inventory does not provide a complete legacy-comparable title key, and legacy title coverage is incomplete. |',
    '| Topic/family join | `BLOCKED` | Topic/family relationships are contextual and lack an authorized unique mapping contract. |',
    '| Reference/chapter join | `BLOCKED` | No explicit source/version/locator relation to a unique candidate is supplied. |',
    '| Bridge review state | `BLOCKED` | No identity review was performed or assigned by this design. |',
    '| Downstream clinical/rights/implementation gates | `OPEN` | Remain separate; this identity design does not close them. |',
    '',
    '## Minimum evidence needed to unblock identity design', '',
    '1. A versioned authoritative cross-reference with one row per intended legacy object, including `legacy_source`, exact `legacy_object_id`, `legacy_object_type`, and either one exact `target_candidate_id`/`source_id` or an explicit `NO_LINK` disposition.',
    '2. If the cross-reference is derived from titles/topics/chapters/references instead of IDs, an approved deterministic contract must define exact comparison fields, uniqueness, collision handling, source/version/locator requirements, and conflict escalation.',
    '3. A designated identity reviewer role and review record format must be supplied. This is separate from clinical review, rights review, and Medical Owner approval.',
    '4. Duplicate families must have explicit lineage handling for `DUP-DRUG-001` and `DUP-EMERGENCY-001`, with no merge, deletion, overwrite, or silent primary selection.',
    '',
    '## Why the next status is not ready', '',
    '`READY_FOR_PHASE_7_9_ADAPTER_DESIGN` is not supported because the adapter target cannot yet be populated with traceable legacy-to-candidate relations. Designing an adapter around guessed joins would violate source preservation, lineage, and fail-closed integration requirements.', '',
    '## Next allowed phase', '',
    'The next allowed action is **identity evidence closure / controlled bridge review**, not adapter execution. After explicit identity evidence is supplied and reviewed, a separate Phase 7.9 adapter-design review may reassess readiness. No import authorization is implied.', '',
    '## Non-actions verified', '',
    '| Action | Result |',
    '|---|---|',
    '| Production JSON generation | `false` |',
    '| Content transformation or rewriting | `false` |',
    '| Schema replacement/modification | `false` |',
    '| Database write/import/migration | `false` |',
    '| Adapter execution | `false` |',
    '| Activation/publication/learner exposure | `false` |',
    '| Clinical or rights approval | `false` |',
]
(OUT / 'SEG_PHASE_7_8_8_GATE_REPORT.md').write_text('\n'.join(gate) + '\n', encoding='utf-8')

print('created 3 Phase 7.8.8 markdown reports')
print('legacy_rows', len(legacy_rows), 'candidate_rows', len(candidate_rows), 'statuses', dict(Counter(r['status'] for r in legacy_rows)))
print('legacy_assets', dict(asset_counts))
print('legacy_target_implications', dict(legacy_types))
print('candidate_types', dict(candidate_types))
print('output_dir', OUT)
