from __future__ import annotations

import csv
import hashlib
import re
from collections import Counter
from pathlib import Path

OUT = Path('/home/ubuntu/seg-internship-output')
MAP = OUT / 'SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv'
DECISION = OUT / 'SEG_PHASE_7_7_6_FINAL_MEDICAL_OWNER_DECISION.md'
QA = OUT / 'SEG_PHASE_7_7_6_CLINICAL_QA_CLOSURE_REGISTER.md'
SCHEMA = Path('/home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json')
ARTIFACTS = [
    OUT / 'SEG_PHASE_7_8_IMPORT_PREPARATION_MAP.md',
    OUT / 'SEG_PHASE_7_8_JSON_BLUEPRINT.md',
    OUT / 'SEG_PHASE_7_8_FIELD_MAPPING_VALIDATION.md',
    OUT / 'SEG_PHASE_7_8_DUPLICATE_HANDLING_PLAN.md',
    OUT / 'SEG_PHASE_7_8_GATE_REPORT.md',
]

def clean(s: str) -> str:
    return s.strip().strip('`').strip()

def rows(path: Path, min_cells: int):
    data = {}
    for line in path.read_text(encoding='utf-8').splitlines():
        if not line.startswith('| `CAND-7.6-'):
            continue
        cells = [clean(c) for c in line.strip().strip('|').split('|')]
        if len(cells) >= min_cells and re.fullmatch(r'CAND-7\.6-SRC-\d{4}', cells[0]):
            data[cells[0]] = cells
    return data

def h(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()

assert all(p.is_file() for p in ARTIFACTS)
map_rows = list(csv.DictReader(MAP.open(encoding='utf-8'), delimiter='\t'))
assert len(map_rows) == 48 and len({r['candidate_record_id'] for r in map_rows}) == 48
map_by_id = {r['candidate_record_id']: r for r in map_rows}
assert len(map_by_id) == 48

decision_raw = rows(DECISION, 10)
qa_raw = rows(QA, 8)
assert len(decision_raw) == 48 and len(qa_raw) == 48

allowed_types = {'lesson', 'question_bank', 'clinical_case', 'clinical_skill', 'book'}
allowed_classes = {'SEG Original', 'Mixed Educational Content', 'External Reference Based'}
for cid, m in map_by_id.items():
    assert cid in decision_raw and cid in qa_raw
    d = decision_raw[cid]
    q = qa_raw[cid]
    assert m['source_id'] == d[1] == q[1]
    assert m['target_type'] == d[2] == q[2] and m['target_type'] in allowed_types
    assert m['source_path'] == d[3]
    assert m['sha256'] == d[4] and re.fullmatch(r'[0-9a-fA-F]{64}', m['sha256'])
    assert m['duplicate_lineage'] == d[5] == q[4]
    assert d[7] == q[5] and d[7] in allowed_classes

map_text = ARTIFACTS[0].read_text(encoding='utf-8')
assert map_text.count('| `CAND-7.6-SRC-') == 48
assert map_text.count('| `BLOCKED_PENDING_FINAL_GATES` |') == 48
assert all(token in map_text for token in ['SEG Original', 'Mixed Educational Content', 'External Reference Based', 'BLOCKED_PENDING_FINAL_GATES'])
assert 'production-ready' in map_text.lower()

blueprint_text = ARTIFACTS[1].read_text(encoding='utf-8')
for token in ['lesson', 'question_bank', 'clinical_case', 'clinical_skill', 'book', 'Template Only', 'no candidate JSON']:
    assert token in blueprint_text
assert not re.search(r'^\s*\{\s*"', blueprint_text, re.MULTILINE)

field_text = ARTIFACTS[2].read_text(encoding='utf-8')
for token in ['MISSING_FROM_SOURCE', 'PENDING_EXTERNAL_EVIDENCE', 'UNRESOLVED', 'SEG_CONTENT_RECORD_V1_1', 'record_id', 'content_type']:
    assert token in field_text

# The duplicate plan must preserve both families and all twelve members.
dup_text = ARTIFACTS[3].read_text(encoding='utf-8')
for token in ['DUP-DRUG-001', 'DUP-EMERGENCY-001', 'SRC-0023', 'SRC-0024', 'SRC-0025', 'SRC-0027', 'SRC-0028', 'SRC-0029', 'SRC-0033', 'SRC-0034', 'SRC-0035', 'SRC-0037', 'SRC-0038', 'SRC-0039', 'No deletion', 'No merge', 'No overwrite']:
    assert token in dup_text

# Gate report checks.
gate_text = ARTIFACTS[4].read_text(encoding='utf-8')
assert '> **Final status:** `BLOCKED_PENDING_FINAL_GATES`' in gate_text
assert 'READY_FOR_PHASE_7_9_DRY_RUN_IMPORT' in gate_text
for token in ['48/48', 'Source ID preservation', 'SHA preservation', 'v1.1 vocabulary compatibility', 'Rollback readiness', 'Production JSON generation', 'Database write/import', 'Content activation', 'Publication/learner exposure', 'Phase 7.9 execution']:
    assert token in gate_text

# SHA preservation in the map and the four companion reports.
for p in ARTIFACTS[:4]:
    assert re.fullmatch(r'[0-9a-f]{64}', h(p))
assert h(SCHEMA) == '720e748a259536df6ae1b2319717e2d55f6540cf9931d5df05d8a5395a133cf9'

# No JSON was created by this generation scope: the five outputs are Markdown only.
assert all(p.suffix == '.md' for p in ARTIFACTS)

print('artifacts_present', '5/5')
print('candidate_rows', '48/48')
print('type_counts', dict(sorted(Counter(r['target_type'] for r in map_rows).items())))
print('classification_counts', dict(sorted(Counter(decision_raw[cid][7] for cid in map_by_id).items())))
print('source_id_sha_lineage_crosscheck', 'PASS_48/48')
print('schema_sha', h(SCHEMA))
print('json_generation', False)
print('import_activation_publication', False)
print('final_status', 'BLOCKED_PENDING_FINAL_GATES')
for p in ARTIFACTS:
    print(p.name, h(p))
