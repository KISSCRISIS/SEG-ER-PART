from __future__ import annotations
import csv
import hashlib
import json
import re
from pathlib import Path

OUT = Path('/home/ubuntu/seg-internship-output')
LEGACY = Path('/home/ubuntu/seg-phase-7-8-5-legacy-assets')
ZIP = Path('/home/ubuntu/upload/SEG_SELECTED_JSON_FILES.zip')
MAP = OUT / 'SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv'
NEW = [
    OUT / 'SEG_PHASE_7_8_5_ID_COMPATIBILITY_DECISION.md',
    OUT / 'SEG_PHASE_7_8_5_METADATA_STATE_CLOSURE.md',
    OUT / 'SEG_PHASE_7_8_5_LEGACY_ASSET_MAPPING.md',
]
GATE = OUT / 'SEG_PHASE_7_8_GATE_REPORT.md'
LEGACY_NAMES = ['appFlashcards.json','fullReferenceLibrary.json','chapterStudyMap.json','masterTopicFamilyIndex.json','masterTrapIndex.json']

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def require(cond, msg):
    if not cond:
        raise AssertionError(msg)

for path in NEW + [GATE, MAP, ZIP]:
    require(path.exists(), f'missing: {path}')
for name in LEGACY_NAMES:
    require((LEGACY/name).exists(), f'missing extracted legacy: {name}')

with MAP.open(encoding='utf-8') as f:
    rows = list(csv.DictReader(f, delimiter='\t'))
require(len(rows) == 48, 'candidate map count != 48')
require(len({r['candidate_record_id'] for r in rows}) == 48, 'candidate IDs not unique')
require(all(re.fullmatch(r'[0-9a-fA-F]{64}', r['sha256']) for r in rows), 'candidate SHA invalid')

id_doc = NEW[0].read_text(encoding='utf-8')
meta_doc = NEW[1].read_text(encoding='utf-8')
legacy_doc = NEW[2].read_text(encoding='utf-8')
gate_doc = GATE.read_text(encoding='utf-8')

# ID report: one table row for each candidate and a compliant proposed ID.
id_rows = re.findall(r'^\| `?(CAND-7\.6-SRC-\d{4})`? \| `?(seg-02-internship-[a-z0-9._-]+)`?', id_doc, flags=re.M)
require(len(id_rows) == 48, f'ID mapping rows != 48: {len(id_rows)}')
require(len({x[0] for x in id_rows}) == 48, 'ID candidate coverage not unique')
require(len({x[1] for x in id_rows}) == 48, 'internal ID coverage not unique')
require(all(re.fullmatch(r'[a-z0-9][a-z0-9._-]{2,127}', x[1]) for x in id_rows), 'invalid proposed internal ID')
require('PROPOSED_ONLY_NOT_EXECUTED' in id_doc, 'ID non-execution state absent')

# Metadata report: one candidate row and all five controlled states.
meta_ids = re.findall(r'^\| `?(CAND-7\.6-SRC-\d{4})`? \| `?SRC-\d{4}`? \|', meta_doc, flags=re.M)
require(len(meta_ids) == 48, f'metadata rows != 48: {len(meta_ids)}')
require(len(set(meta_ids)) == 48, 'metadata candidate coverage not unique')
for state in ['OWNER_PENDING','VERSION_PENDING','RIGHTS_PENDING','TAXONOMY_PENDING','LOCATOR_PENDING']:
    require(f'**48**' in meta_doc, 'metadata total missing')
    require(state in meta_doc, f'metadata state absent: {state}')
require('No value invented' in meta_doc, 'no-invention clause absent')

# Legacy mapping: five assets, actual SHA values, no explicit candidate joins.
for name in LEGACY_NAMES:
    require(name in legacy_doc, f'legacy asset absent: {name}')
    require(sha(LEGACY/name) in legacy_doc, f'legacy SHA absent: {name}')
require(sha(ZIP) in legacy_doc, 'archive SHA absent')
require('No explicit SRC-xxxx candidate linkage found' in legacy_doc, 'legacy linkage finding absent')
require('METADATA_ONLY_UNRESOLVED_LINKAGE' in legacy_doc, 'legacy mapping status absent')

# Gate closure assessment must remain blocked and must preserve non-actions.
require('## 7. Phase 7.8.5 final gate assessment' in gate_doc, 'gate update absent')
require('`BLOCKED_PENDING_FINAL_GATES`' in gate_doc, 'blocked gate status absent')
for phrase in ['Production JSON generation | `false`', 'Database import/write | `false`', 'Phase 7.9 execution | `false`']:
    require(phrase in gate_doc, f'non-action absent: {phrase}')
for path in NEW:
    require(sha(path) in gate_doc, f'new artifact SHA absent from gate: {path.name}')

# Ensure no Phase 7.8.5 production JSON artifact was written in the governed output directory.
produced_json = list(OUT.glob('*7_8_5*.json'))
require(not produced_json, f'production JSON-like outputs found: {produced_json}')

print('PASS: phase 7.8.5 report validation')
print('candidate_coverage=48/48')
print('id_mapping=48/48')
print('metadata_state_rows=48/48')
print('legacy_assets=5/5')
print('legacy_source_id_matches=0')
print('gate_status=BLOCKED_PENDING_FINAL_GATES')
print('production_json_outputs=0')
for path in NEW:
    print(f'{path.name} sha256={sha(path)}')
print(f'{GATE.name} sha256={sha(GATE)}')
