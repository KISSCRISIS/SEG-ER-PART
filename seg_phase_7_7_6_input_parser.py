from __future__ import annotations

import csv
import re
from collections import Counter
from pathlib import Path

out = Path('/home/ubuntu/seg-internship-output')
map_rows = list(csv.DictReader((out / 'SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv').open(encoding='utf-8'), delimiter='\t'))
register_lines = (out / 'SEG_PHASE_7_7_5_MEDICAL_OWNER_REVIEW_REGISTER.md').read_text(encoding='utf-8').splitlines()

register = {}
for line in register_lines:
    if line.startswith('|') and 'CAND-7.6-' in line:
        cells = [c.strip().strip('`') for c in line.strip().strip('|').split('|')]
        if len(cells) >= 11:
            register[cells[0]] = {
                'source_id': cells[1], 'target_type': cells[2], 'path': cells[3],
                'sha': cells[4], 'owner': cells[5], 'origin': cells[6],
                'framework': cells[7], 'track': cells[8], 'clinical': cells[9], 'rights': cells[10],
            }

print('register_parsed', len(register))
print('framework_rows')
for cid, item in register.items():
    if 'NO_DECLARED_FRAMEWORK' not in item['framework']:
        print(cid, item['source_id'], item['target_type'], item['framework'])
print('register_type_counts', dict(sorted(Counter(x['target_type'] for x in register.values()).items())))
print('register_origin_counts', dict(sorted(Counter(x['origin'] for x in register.values()).items())))
print('register_sha_unique', len({x['sha'] for x in register.values()}))
print('map_vs_register_ids', len({x['candidate_record_id'] for x in map_rows} & set(register)))
