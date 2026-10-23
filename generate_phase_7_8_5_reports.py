from __future__ import annotations

import csv
import hashlib
import json
import re
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

OUT = Path('/home/ubuntu/seg-internship-output')
LEGACY = Path('/home/ubuntu/seg-phase-7-8-5-legacy-assets')
STATUS = Path('/home/ubuntu/seg-manus-status')
MAP_PATH = OUT / 'SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv'
DECISION_PATH = OUT / 'SEG_PHASE_7_7_6_FINAL_MEDICAL_OWNER_DECISION.md'
QA_PATH = OUT / 'SEG_PHASE_7_7_6_CLINICAL_QA_CLOSURE_REGISTER.md'
SCHEMA_PATH = STATUS / 'schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json'
P78 = {
    'map': OUT / 'SEG_PHASE_7_8_IMPORT_PREPARATION_MAP.md',
    'blueprint': OUT / 'SEG_PHASE_7_8_JSON_BLUEPRINT.md',
    'field_mapping': OUT / 'SEG_PHASE_7_8_FIELD_MAPPING_VALIDATION.md',
    'duplicate_plan': OUT / 'SEG_PHASE_7_8_DUPLICATE_HANDLING_PLAN.md',
    'gate': OUT / 'SEG_PHASE_7_8_GATE_REPORT.md',
}

NOW = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
STATUS_VALUE = 'BLOCKED_PENDING_FINAL_GATES'


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def esc(value: object) -> str:
    return str(value).replace('|', '\\|').replace('\n', ' ').strip()


def md_table(headers, data):
    lines = ['| ' + ' | '.join(headers) + ' |', '|' + '|'.join('---' for _ in headers) + '|']
    lines.extend('| ' + ' | '.join(esc(x) for x in row) + ' |' for row in data)
    return '\n'.join(lines)


def parse_decision_rows(path: Path):
    result = {}
    for line in path.read_text(encoding='utf-8').splitlines():
        if not line.startswith('| `CAND-7.6-'):
            continue
        cells = [c.strip().strip('`').strip() for c in line.strip().strip('|').split('|')]
        if len(cells) >= 10 and re.fullmatch(r'CAND-7\.6-SRC-\d{4}', cells[0]):
            result[cells[0]] = cells
    return result


def parse_map():
    with MAP_PATH.open(encoding='utf-8') as f:
        return list(csv.DictReader(f, delimiter='\t'))


def metadata_state(blockers: str):
    b = set(blockers.split(';'))
    return {
        'OWNER_PENDING': bool({'OWNER_NOT_SUPPLIED', 'PUBLISHER_NOT_SUPPLIED'} & b),
        'VERSION_PENDING': 'SOURCE_VERSION_NOT_SUPPLIED' in b,
        'RIGHTS_PENDING': 'RIGHTS_SCOPE_NOT_CLASSIFIED' in b,
        'TAXONOMY_PENDING': 'TAXONOMY_ID_AND_VERSION_NOT_SUPPLIED' in b,
        'LOCATOR_PENDING': 'PRECISE_CONTENT_LOCATOR_NOT_SUPPLIED' in b,
    }


def normalize_id(candidate_id: str) -> str:
    # Deterministic, reversible for the preserved cross-reference table; not executed.
    return 'seg-02-internship-' + candidate_id.lower().replace('.', '-')

rows = parse_map()
decision = parse_decision_rows(DECISION_PATH)
assert len(rows) == 48 and len(decision) == 48
by_id = {r['candidate_record_id']: r for r in rows}
assert len(by_id) == 48

# Cross-check decision/source/SHA/classification before writing any report.
for r in rows:
    d = decision[r['candidate_record_id']]
    assert r['source_id'] == d[1]
    assert r['target_type'] == d[2]
    assert r['source_path'] == d[3]
    assert r['sha256'] == d[4]
    assert r['duplicate_lineage'] == d[5]
    assert r['duplicate_role'] == d[6]
    assert r['sha256'] and re.fullmatch(r'[0-9a-fA-F]{64}', r['sha256'])

internal_ids = [normalize_id(r['candidate_record_id']) for r in rows]
assert len(set(internal_ids)) == 48
assert all(re.fullmatch(r'[a-z0-9][a-z0-9._-]{2,127}', x) for x in internal_ids)

assets = {}
for name in ['appFlashcards.json','fullReferenceLibrary.json','chapterStudyMap.json','masterTopicFamilyIndex.json','masterTrapIndex.json']:
    path = LEGACY / name
    assets[name] = json.loads(path.read_text(encoding='utf-8'))

candidate_source_ids = {r['source_id'] for r in rows}
legacy_text = {name: json.dumps(obj, ensure_ascii=False) for name, obj in assets.items()}
legacy_source_matches = {name: sorted(s for s in candidate_source_ids if s in text) for name, text in legacy_text.items()}
assert all(not matches for matches in legacy_source_matches.values())

# Deterministic metadata state summaries.
state_counts = Counter()
for r in rows:
    states = metadata_state(r['blockers'])
    for state, present in states.items():
        if present:
            state_counts[state] += 1
assert all(state_counts[s] == 48 for s in ['OWNER_PENDING','VERSION_PENDING','RIGHTS_PENDING','TAXONOMY_PENDING','LOCATOR_PENDING'])

# Prepare detailed cross-reference rows.
id_rows = []
for r in rows:
    cid = r['candidate_record_id']
    id_rows.append((cid, normalize_id(cid), r['source_id'], r['target_type'], r['duplicate_lineage'], r['duplicate_role'], r['sha256'], 'PROPOSED_ONLY_NOT_EXECUTED'))

id_report = f'''# SEG Phase 7.8.5 — ID Compatibility Decision

> **Mode:** Controlled preparation only. No production JSON, import, activation, publication, or database/application/schema modification was performed.
>
> **Decision status:** `DECISION_PREPARED_FOR_FUTURE_ADAPTER_REVIEW`
>
> **Review timestamp (UTC):** `{NOW}`

## 1. Scope and authority

This decision is limited to candidate identifier compatibility between the preserved Phase 7.6/7.7 handoff identity and the isolated `SEG_CONTENT_RECORD_V1_1` profile. It does not create records, rename source files, mutate candidate IDs in place, or authorize Phase 7.9.

The v1.1 schema requires `record_id` to match `^[a-z0-9][a-z0-9._-]{{2,127}}$` [1]. The existing candidate IDs are preserved uppercase handoff identifiers such as `CAND-7.6-SRC-0003`; therefore, they remain the immutable cross-reference key and are not suitable as direct v1.1 `record_id` values.

## 2. Selected strategy

The selected preparation strategy is **dual-key preservation**:

1. Preserve the original `candidate_record_id` exactly as the historical and governance cross-reference key.
2. Propose, but do not execute, a deterministic v1.1-compliant internal ID using the function `seg-02-internship-` + lowercase(original candidate ID) with `.` replaced by `-`.
3. Preserve `source_id`, original SHA-256, duplicate lineage, duplicate role, content type, and final educational classification alongside the cross-reference. The normalized ID is not evidence of a new medical record.
4. Use the same proposed normalized ID for any future `book_record_id` reference only after a separately authorized recordization pass validates the book candidate and the relationship contract.

This strategy is reversible because the original ID is never discarded, and the normalized form is an injective transformation over the current 48 IDs. It remains **proposed only** until a future per-run implementation authorization and schema validation are supplied.

## 3. Coverage and deterministic validation

| Check | Result |
|---|---|
| Candidate scope | `48/48` candidates represented |
| Original candidate IDs preserved | `PASS` |
| Proposed internal IDs unique | `48/48` unique |
| Proposed internal IDs match v1.1 pattern | `48/48` |
| Source IDs and SHA cross-check | `PASS_48/48` |
| Duplicate lineage and role retained | `PASS_48/48` |
| Production IDs created | `false` |
| Database/import operation | `false` |

## 4. Cross-reference mapping

The following is a preparation mapping only. It is not a JSON record set and must not be treated as an import payload.

{md_table(['Original candidate ID','Proposed v1.1 internal ID','Source ID','content_type','Duplicate lineage','Duplicate role','SHA-256','Execution state'], id_rows)}

## 5. Safety and implementation conditions

The mapping must not be used to overwrite the original candidate ID, source path, source checksum, or historical lineage. A future implementation pass must revalidate the exact target schema, verify the original SHA values, prove idempotency using the proposed internal ID plus source/version/checksum policy, and preserve the original ID in an explicit adapter cross-reference outside the v1.1 closed-world record unless a separately approved contract adds such a field.

This decision does not close clinical review, rights review, taxonomy confirmation, metadata completion, or implementation authorization.

## References

[1]: file://{SCHEMA_PATH} "SEG Content Record v1.1 schema profile"
[2]: file://{MAP_PATH} "SEG Phase 7.6 candidate record map"
[3]: file://{DECISION_PATH} "SEG Phase 7.7.6 Final Medical Owner Decision"
'''

metadata_rows = []
for r in rows:
    states = metadata_state(r['blockers'])
    active = [s for s, yes in states.items() if yes]
    metadata_rows.append((r['candidate_record_id'], r['source_id'], r['target_type'], r['sha256'], ', '.join(active), 'No value invented; source evidence remains incomplete', 'BLOCKED_PENDING_FINAL_GATES'))

by_type = Counter(r['target_type'] for r in rows)
meta_report = f'''# SEG Phase 7.8.5 — Metadata State Closure

> **Mode:** Controlled preparation only. This report converts unresolved metadata into explicit controlled states; it does not fill, infer, approve, or activate any field.
>
> **Review timestamp (UTC):** `{NOW}`
>
> **Overall metadata status:** `BLOCKED_PENDING_FINAL_GATES`

## 1. Controlled state vocabulary

| Controlled state | Meaning in this phase | Permitted evidence to close later |
|---|---|---|
| `OWNER_PENDING` | Owner/publisher evidence is not supplied in the authorized handoff. | Explicit owner/publisher evidence with provenance. |
| `VERSION_PENDING` | A source SHA is preserved, but a source version value is not supplied. | Explicit version value tied to the source and checksum. |
| `RIGHTS_PENDING` | Rights scope is not classified by an independent rights review. | Independent text/image/display rights decision. |
| `TAXONOMY_PENDING` | Taxonomy ID/version evidence is not supplied or closed. | Explicit taxonomy assignment and version evidence. |
| `LOCATOR_PENDING` | A complete v1.1 reference/content locator is not supplied. | Exact locator tied to the source/version and, where applicable, display policy. |

These states are preparation metadata, not v1.1 enum values and not approvals. The existing `MISSING_FROM_SOURCE`, `PENDING_EXTERNAL_EVIDENCE`, and `UNRESOLVED` findings remain preserved in the Phase 7.8 map and field-mapping record [1] [2].

## 2. Closure summary

| Content type | Candidate count | OWNER_PENDING | VERSION_PENDING | RIGHTS_PENDING | TAXONOMY_PENDING | LOCATOR_PENDING |
|---|---:|---:|---:|---:|---:|---:|
| lesson | {by_type['lesson']} | {sum(metadata_state(r['blockers'])['OWNER_PENDING'] for r in rows if r['target_type']=='lesson')} | {sum(metadata_state(r['blockers'])['VERSION_PENDING'] for r in rows if r['target_type']=='lesson')} | {sum(metadata_state(r['blockers'])['RIGHTS_PENDING'] for r in rows if r['target_type']=='lesson')} | {sum(metadata_state(r['blockers'])['TAXONOMY_PENDING'] for r in rows if r['target_type']=='lesson')} | {sum(metadata_state(r['blockers'])['LOCATOR_PENDING'] for r in rows if r['target_type']=='lesson')} |
| question_bank | {by_type['question_bank']} | {sum(metadata_state(r['blockers'])['OWNER_PENDING'] for r in rows if r['target_type']=='question_bank')} | {sum(metadata_state(r['blockers'])['VERSION_PENDING'] for r in rows if r['target_type']=='question_bank')} | {sum(metadata_state(r['blockers'])['RIGHTS_PENDING'] for r in rows if r['target_type']=='question_bank')} | {sum(metadata_state(r['blockers'])['TAXONOMY_PENDING'] for r in rows if r['target_type']=='question_bank')} | {sum(metadata_state(r['blockers'])['LOCATOR_PENDING'] for r in rows if r['target_type']=='question_bank')} |
| clinical_case | {by_type['clinical_case']} | {sum(metadata_state(r['blockers'])['OWNER_PENDING'] for r in rows if r['target_type']=='clinical_case')} | {sum(metadata_state(r['blockers'])['VERSION_PENDING'] for r in rows if r['target_type']=='clinical_case')} | {sum(metadata_state(r['blockers'])['RIGHTS_PENDING'] for r in rows if r['target_type']=='clinical_case')} | {sum(metadata_state(r['blockers'])['TAXONOMY_PENDING'] for r in rows if r['target_type']=='clinical_case')} | {sum(metadata_state(r['blockers'])['LOCATOR_PENDING'] for r in rows if r['target_type']=='clinical_case')} |
| clinical_skill | {by_type['clinical_skill']} | {sum(metadata_state(r['blockers'])['OWNER_PENDING'] for r in rows if r['target_type']=='clinical_skill')} | {sum(metadata_state(r['blockers'])['VERSION_PENDING'] for r in rows if r['target_type']=='clinical_skill')} | {sum(metadata_state(r['blockers'])['RIGHTS_PENDING'] for r in rows if r['target_type']=='clinical_skill')} | {sum(metadata_state(r['blockers'])['TAXONOMY_PENDING'] for r in rows if r['target_type']=='clinical_skill')} | {sum(metadata_state(r['blockers'])['LOCATOR_PENDING'] for r in rows if r['target_type']=='clinical_skill')} |
| book | {by_type['book']} | {sum(metadata_state(r['blockers'])['OWNER_PENDING'] for r in rows if r['target_type']=='book')} | {sum(metadata_state(r['blockers'])['VERSION_PENDING'] for r in rows if r['target_type']=='book')} | {sum(metadata_state(r['blockers'])['RIGHTS_PENDING'] for r in rows if r['target_type']=='book')} | {sum(metadata_state(r['blockers'])['TAXONOMY_PENDING'] for r in rows if r['target_type']=='book')} | {sum(metadata_state(r['blockers'])['LOCATOR_PENDING'] for r in rows if r['target_type']=='book')} |
| **Total** | **48** | **{state_counts['OWNER_PENDING']}** | **{state_counts['VERSION_PENDING']}** | **{state_counts['RIGHTS_PENDING']}** | **{state_counts['TAXONOMY_PENDING']}** | **{state_counts['LOCATOR_PENDING']}** |

## 3. Candidate-level state register

{md_table(['Candidate ID','Source ID','content_type','SHA-256','Controlled states','Evidence handling','Readiness'], metadata_rows)}

## 4. Closure rules

No owner, publisher, version value, rights decision, taxonomy ID/version, locator, reviewer identity, or clinical conclusion is inferred from a filename, legacy JSON field, framework name, topic label, or SHA. The legacy JSON assets are analyzed separately as metadata enrichment candidates and do not close any of the five states in this register.

A future closure event must cite the exact source, version, locator, reviewer/rights authority where applicable, timestamp, and append-only audit event. Until then, each candidate remains `BLOCKED_PENDING_FINAL_GATES` and is not production-ready.

## Non-actions

| Action | Result |
|---|---|
| Metadata values invented | `false` |
| Original sources modified | `false` |
| Production JSON generated | `false` |
| Import or database write | `false` |
| Activation or publication | `false` |

## References

[1]: file://{P78['map']} "SEG Phase 7.8 Import Preparation Map"
[2]: file://{P78['field_mapping']} "SEG Phase 7.8 Field Mapping Validation"
[3]: file://{SCHEMA_PATH} "SEG Content Record v1.1 schema profile"
[4]: file://{DECISION_PATH} "SEG Phase 7.7.6 Final Medical Owner Decision"
'''

# Legacy summaries derived from structure-only analysis, no medical payload copied.
flash = assets['appFlashcards.json']
ref = assets['fullReferenceLibrary.json']
study = assets['chapterStudyMap.json']
topic = assets['masterTopicFamilyIndex.json']
trap = assets['masterTrapIndex.json']
ref_sources = Counter(x.get('source') for x in ref if isinstance(x, dict))
ref_verify = Counter(bool(x.get('needsVerification')) for x in ref if isinstance(x, dict))
flash_types = Counter(x.get('type') for x in flash if isinstance(x, dict))
flash_yield = Counter(x.get('yield') for x in flash if isinstance(x, dict))
study_sources = Counter(x.get('source') for x in study if isinstance(x, dict))
trap_sources = Counter(x.get('source') for x in trap if isinstance(x, dict))

legacy_rows = [
    ('appFlashcards.json', sha(LEGACY/'appFlashcards.json'), len(flash), 'question_bank candidate enrichment', 'cardId, question, answer, source, type, yield', 'No explicit SRC-xxxx candidate linkage found; UNRESOLVED linkage', 'No direct import; enrichment only after candidate-level review'),
    ('fullReferenceLibrary.json', sha(LEGACY/'fullReferenceLibrary.json'), len(ref), 'lesson/reference_framework enrichment', 'id, topic, source, chapterNumber, chapterTitle, reference metadata, needsVerification', 'No explicit SRC-xxxx candidate linkage found; UNRESOLVED linkage', 'Reference framework metadata only; no verbatim display or ownership claim'),
    ('chapterStudyMap.json', sha(LEGACY/'chapterStudyMap.json'), len(study), 'taxonomy support', 'chapterNumber, count, entries, source', 'No explicit SRC-xxxx candidate linkage found; taxonomy relationship UNRESOLVED', 'Support evidence only; does not close TAXONOMY_PENDING'),
    ('masterTopicFamilyIndex.json', sha(LEGACY/'masterTopicFamilyIndex.json'), len(topic), 'taxonomy support', 'family, count, entries', 'No explicit SRC-xxxx candidate linkage found; taxonomy relationship UNRESOLVED', 'Support evidence only; does not assign taxonomy IDs or versions'),
    ('masterTrapIndex.json', sha(LEGACY/'masterTrapIndex.json'), len(trap), 'lesson enhancement', 'referenceId, topic, chapterNumber, chapterTitle, source, trap', 'No explicit SRC-xxxx candidate linkage found; lesson relationship UNRESOLVED', 'Enhancement candidate only; no medical text copied or activated'),
]
legacy_report = f'''# SEG Phase 7.8.5 — Legacy Asset Mapping

> **Mode:** Controlled preparation only. The five legacy JSON files are treated as educational enrichment metadata. They are not replacement sources, not import payloads, and not production records.
>
> **Analysis timestamp (UTC):** `{NOW}`
>
> **Mapping status:** `METADATA_ONLY_UNRESOLVED_LINKAGE`

## 1. Input inventory and immutable evidence

{md_table(['Legacy asset','SHA-256','Records','SEG layer target','Observed metadata fields','Candidate linkage result','Allowed use in this phase'], legacy_rows)}

The archive itself was preserved as an uploaded input with SHA-256 `f09eb079d15be2eb99218cb40a111f4a1fbf136d906548e6ba78e13a2062ce52`. The extracted working copies are read-only derivatives. The original source package and Phase 7.8 candidate map remain unchanged.

## 2. Layer mapping rules

| Legacy asset | Proposed SEG layer | Mapping decision | Evidence limitation |
|---|---|---|---|
| `appFlashcards.json` | `question_bank` candidate enrichment | Use only as a possible enrichment/reference surface for the 17 question-bank candidates after explicit candidate linkage and QA. Preserve card identity and observed answer/question presence as metadata; do not create a question record here. | The JSON contains 128 flashcard objects, but no `SRC-xxxx` identifiers matching the 48 candidate Source IDs. It cannot establish candidate ownership, clinical approval, rights, or reference linkage. |
| `fullReferenceLibrary.json` | `lesson` enrichment and `relationships.reference_framework` preparation | Treat `source`, chapter identifiers, topic labels, reference IDs, and verification flags as reference metadata candidates. External frameworks remain reference frameworks only. | The 126 objects contain declared source labels but no candidate Source ID joins. `needsVerification=true` occurs for 28 objects; `Tintinalli?` occurs 3 times and `Patch` once, so external evidence remains open. |
| `chapterStudyMap.json` | Taxonomy support | Use chapter and entry structure only as a possible taxonomy-support index. | The 85 objects do not provide the v1.1 `taxonomy_id`/`taxonomy_version` contract or candidate joins. No taxonomy state is closed. |
| `masterTopicFamilyIndex.json` | Taxonomy support | Use family labels and counts only as a candidate vocabulary-support source. | The 38 family objects do not provide an approved taxonomy ID/version or candidate joins. |
| `masterTrapIndex.json` | `lesson` enhancement | Use reference/topic/chapter/trap metadata as a possible lesson-enhancement index after separate mapping and clinical QA. | The 126 objects do not provide candidate joins; no medical text is copied into SEG records by this phase. |

## 3. Observed structural metadata

| Asset | Observed counts |
|---|---|
| Flashcards | 128 objects; types: Topic=123, Fact=3, Numerical=2; yields: High=102, Needs verification=25, Critical=1. |
| Reference library | 126 objects; source labels: Tintinalli=65, Rosen=57, Tintinalli?=3, Patch=1; `needsVerification=true` for 28. |
| Chapter study map | 85 objects; source labels: Rosen=51, Tintinalli=30, Tintinalli?=3, Patch=1. |
| Topic family index | 38 family objects. |
| Trap index | 126 objects; source labels: Tintinalli=65, Rosen=58, Tintinalli?=3. |

These counts are structural observations only. They do not establish clinical correctness, copyright permission, candidate membership, taxonomy approval, or learner display permission.

## 4. Required future join contract

Before any enrichment can be associated with a candidate, a future controlled review must define an explicit join key and evidence path. Acceptable evidence would include a candidate/source ID cross-reference, exact source/version/locator, field-level provenance, rights state, taxonomy state, and the relevant clinical/QA review record. Topic similarity, chapter name, filename, or framework name alone is not an approved join key.

No direct import, replacement, source overwrite, medical-content rewrite, or learner exposure is permitted by this mapping.

## Non-actions

| Action | Result |
|---|---|
| Original source replacement | `false` |
| Production JSON generation | `false` |
| Database import/write | `false` |
| Schema/application modification | `false` |
| Clinical approval or rights clearance | `false` |
| Activation/publication | `false` |

## References

[1]: file://{LEGACY/'appFlashcards.json'} "Legacy flashcards metadata asset"
[2]: file://{LEGACY/'fullReferenceLibrary.json'} "Legacy reference library metadata asset"
[3]: file://{LEGACY/'chapterStudyMap.json'} "Legacy chapter study map metadata asset"
[4]: file://{LEGACY/'masterTopicFamilyIndex.json'} "Legacy topic family metadata asset"
[5]: file://{LEGACY/'masterTrapIndex.json'} "Legacy trap metadata asset"
[6]: file://{MAP_PATH} "SEG Phase 7.6 candidate record map"
[7]: file://{SCHEMA_PATH} "SEG Content Record v1.1 schema profile"
'''

# Write exactly the three new Phase 7.8.5 reports.
outputs = {
    'SEG_PHASE_7_8_5_ID_COMPATIBILITY_DECISION.md': id_report,
    'SEG_PHASE_7_8_5_METADATA_STATE_CLOSURE.md': meta_report,
    'SEG_PHASE_7_8_5_LEGACY_ASSET_MAPPING.md': legacy_report,
}
for name, text in outputs.items():
    (OUT/name).write_text(text.rstrip()+'\n', encoding='utf-8')

# Update the existing Phase 7.8 gate report by append-only closure section.
gate_update = f'''\n\n## 7. Phase 7.8.5 final gate assessment\n\n> **Final status:** `{STATUS_VALUE}`\n\nPhase 7.8.5 completed controlled preparation for identifier compatibility, explicit metadata states, and legacy educational-enrichment mapping. The three Phase 7.8.5 reports were generated without production JSON, import, activation, publication, source replacement, or application/database/schema modification.\n\n| Phase 7.8.5 gate | Result | Evidence / limitation |\n|---|---|---|\n| ID compatibility decision | `PASS_FOR_PREPARATION_ONLY` | Original candidate IDs preserved; 48 deterministic lowercase internal IDs proposed and pattern-checked, but not executed. |\n| Cross-reference preservation | `PASS_48/48` | Source IDs, SHA-256, content types, duplicate lineage, and duplicate roles retained in the preparation mapping. |\n| Metadata state closure | `PASS_FOR_STATE_LABELING_ONLY` | `OWNER_PENDING`, `VERSION_PENDING`, `RIGHTS_PENDING`, `TAXONOMY_PENDING`, and `LOCATOR_PENDING` explicitly assigned; no values invented. |\n| Legacy asset inventory | `PASS_FOR_METADATA_ONLY` | Five uploaded JSON assets parsed read-only; archive and per-file SHA evidence preserved. |\n| Legacy candidate linkage | `BLOCKED` | No explicit `SRC-xxxx` identifiers matched across the five legacy assets; topic/chapter similarity is not an approved join key. |\n| Clinical review | `BLOCKED_PENDING_CLINICAL_REVIEW` | Phase 7.8.5 does not replace independent clinical review or the Phase 7.7.6 pending limitations. |\n| Rights review | `BLOCKED_PENDING_RIGHTS_REVIEW` | External/reference-based material remains subject to separate rights and display review. |\n| Taxonomy/version/locator | `BLOCKED_PENDING_METADATA_EVIDENCE` | Legacy assets provide support signals only; they do not close v1.1 required metadata. |\n| Implementation authorization | `BLOCKED` | No Phase 7.9 authorization is supplied by this preparation phase. |\n\nThe status remains `BLOCKED_PENDING_FINAL_GATES`. No candidate is production-ready, and Phase 7.9 dry-run import is not executed or authorized by this update.\n\n### Phase 7.8.5 artifact hashes\n\n| Artifact | SHA-256 |\n|---|---|\n| `SEG_PHASE_7_8_5_ID_COMPATIBILITY_DECISION.md` | `{sha(OUT/'SEG_PHASE_7_8_5_ID_COMPATIBILITY_DECISION.md')}` |\n| `SEG_PHASE_7_8_5_METADATA_STATE_CLOSURE.md` | `{sha(OUT/'SEG_PHASE_7_8_5_METADATA_STATE_CLOSURE.md')}` |\n| `SEG_PHASE_7_8_5_LEGACY_ASSET_MAPPING.md` | `{sha(OUT/'SEG_PHASE_7_8_5_LEGACY_ASSET_MAPPING.md')}` |\n\n### Phase 7.8.5 non-actions\n\n| Action | Result |\n|---|---|\n| Production JSON generation | `false` |\n| Database import/write | `false` |\n| Application/database/schema modification | `false` |\n| Original source replacement or modification | `false` |\n| Clinical approval or rights clearance | `false` |\n| Activation/publication | `false` |\n| Phase 7.9 execution | `false` |\n\n### Phase 7.8.5 references\n\n[6]: file://{OUT/'SEG_PHASE_7_8_5_ID_COMPATIBILITY_DECISION.md'} "SEG Phase 7.8.5 ID Compatibility Decision"\n[7]: file://{OUT/'SEG_PHASE_7_8_5_METADATA_STATE_CLOSURE.md'} "SEG Phase 7.8.5 Metadata State Closure"\n[8]: file://{OUT/'SEG_PHASE_7_8_5_LEGACY_ASSET_MAPPING.md'} "SEG Phase 7.8.5 Legacy Asset Mapping"\n[9]: file://{LEGACY} "Extracted legacy JSON metadata working directory"\n'''
with P78['gate'].open('a', encoding='utf-8') as f:
    f.write(gate_update)

print('created', *[str(OUT/name) for name in outputs], sep='\n')
print('updated', P78['gate'])
print('status', STATUS_VALUE)
print('candidate_count', len(rows))
print('internal_ids_unique', len(set(internal_ids)))
print('metadata_state_counts', dict(state_counts))
print('legacy_candidate_linkage', legacy_source_matches)
