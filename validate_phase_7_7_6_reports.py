from __future__ import annotations

import csv
import hashlib
import re
from pathlib import Path

out = Path('/home/ubuntu/seg-internship-output')
map_path = out / 'SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv'
map_rows = list(csv.DictReader(map_path.open(encoding='utf-8'), delimiter='\t'))
ids = {r['candidate_record_id'] for r in map_rows}

paths = [
    out / 'SEG_PHASE_7_7_6_FINAL_MEDICAL_OWNER_DECISION.md',
    out / 'SEG_PHASE_7_7_6_CLINICAL_QA_CLOSURE_REGISTER.md',
    out / 'SEG_PHASE_7_7_6_GATE_REPORT.md',
]
for p in paths:
    assert p.is_file(), p

text_decision = paths[0].read_text(encoding='utf-8')
text_qa = paths[1].read_text(encoding='utf-8')
text_gate = paths[2].read_text(encoding='utf-8')

def row_ids(text: str) -> set[str]:
    return set(re.findall(r'^\| `(CAND-7\.6-SRC-\d+)` \|', text, flags=re.M))

assert row_ids(text_decision) == ids
assert row_ids(text_qa) == ids
assert text_gate.count('READY_FOR_IMPORT_PREPARATION_REVIEW') >= 1
assert 'PRODUCTION_READY' in text_gate
assert 'Production JSON generation | Not performed.' in text_gate
assert 'Content import or database write | Not performed.' in text_gate
assert 'Original source modification | Not performed.' in text_gate
assert text_decision.count('| `SRC-') >= 48
assert text_qa.count('| `SRC-') >= 48

# Exact field-queue row counts are checked by source IDs, not heading text.
for sid in ['SRC-0003','SRC-0004','SRC-0068','SRC-0069','SRC-0070','SRC-0071','SRC-0072','SRC-0074','SRC-0075','SRC-0076','SRC-0077','SRC-0078','SRC-0079','SRC-0080','SRC-0081','SRC-0082','SRC-0083']:
    assert f'`{sid}`' in text_qa
for sid in ['SRC-0033','SRC-0034','SRC-0035','SRC-0037','SRC-0038','SRC-0039']:
    assert f'`{sid}`' in text_qa
for sid in ['SRC-0019','SRC-0020','SRC-0090','SRC-0094','SRC-0095']:
    assert f'`{sid}`' in text_qa

schema = Path('/home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json')
assert hashlib.sha256(schema.read_bytes()).hexdigest() == '97e3dd54891e1686a7f8388f82b1c6bf7d74c7c8c0235439efac4c1298a4145d'

for p in paths[:2]:
    digest = hashlib.sha256(p.read_bytes()).hexdigest()
    assert digest in text_gate

print('reports_exist', len(paths), '/', len(paths))
print('decision_candidate_rows', len(row_ids(text_decision)))
print('qa_candidate_rows', len(row_ids(text_qa)))
print('gate_status', 'READY_FOR_IMPORT_PREPARATION_REVIEW')
print('canonical_schema_unchanged', True)
print('embedded_output_hashes_match', True)
print('non_actions_confirmed', True)
