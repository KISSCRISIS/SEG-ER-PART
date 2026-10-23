from __future__ import annotations

import csv
import hashlib
import re
from collections import Counter
from pathlib import Path

MAP = Path('/home/ubuntu/seg-internship-output/SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv')
REGISTER = Path('/home/ubuntu/seg-internship-output/SEG_PHASE_7_7_5_MEDICAL_OWNER_REVIEW_REGISTER.md')
SOURCE_ROOT = Path('/home/ubuntu/seg-internship-phase-5.6/staging/extracted')

rows = list(csv.DictReader(MAP.open('r', encoding='utf-8'), delimiter='\t'))
register_text = REGISTER.read_text(encoding='utf-8')

actual_checks = []
for row in rows:
    path = SOURCE_ROOT / row['source_path']
    exists = path.is_file()
    actual_sha = hashlib.sha256(path.read_bytes()).hexdigest() if exists else None
    actual_checks.append({
        'source_id': row['source_id'],
        'candidate_id': row['candidate_record_id'],
        'target_type': row['target_type'],
        'source_path': row['source_path'],
        'expected_sha': row['sha256'],
        'actual_sha': actual_sha,
        'exists': exists,
        'sha_match': exists and actual_sha == row['sha256'],
        'duplicate_lineage': row['duplicate_lineage'],
        'duplicate_role': row['duplicate_role'],
    })

ids_in_register = re.findall(r'\| `?(CAND-7\.6-SRC-\d+)`? \| `?(SRC-\d+)`? \|', register_text)
register_pairs = set(ids_in_register)
map_pairs = {(r['candidate_record_id'], r['source_id']) for r in rows}

print('rows', len(rows))
print('candidate_ids_unique', len({r['candidate_record_id'] for r in rows}))
print('source_ids_unique', len({r['source_id'] for r in rows}))
print('type_counts', dict(sorted(Counter(r['target_type'] for r in rows).items())))
print('lineage_counts', dict(sorted(Counter(r['duplicate_lineage'] for r in rows).items())))
print('role_counts', dict(sorted(Counter(r['duplicate_role'] for r in rows).items())))
print('register_candidate_source_pairs', len(register_pairs))
print('map_candidate_source_pairs', len(map_pairs))
print('register_pairs_equal_map_pairs', register_pairs == map_pairs)
print('sources_exist', sum(x['exists'] for x in actual_checks), '/', len(actual_checks))
print('sha_matches', sum(x['sha_match'] for x in actual_checks), '/', len(actual_checks))
for x in actual_checks:
    if not x['sha_match']:
        print('MISMATCH', x)
print('duplicate_families')
for family in ('DUP-DRUG-001', 'DUP-EMERGENCY-001'):
    family_rows = [x for x in actual_checks if x['duplicate_lineage'] == family]
    print(family, [(x['source_id'], x['duplicate_role']) for x in family_rows])
