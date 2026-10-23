from __future__ import annotations
import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path('/home/ubuntu/seg-phase-7-8-5-legacy-assets')
OUT = Path('/home/ubuntu/seg-manus-status/SEG_PHASE_7_8_5_LEGACY_METADATA_ANALYSIS.txt')
MAP = Path('/home/ubuntu/seg-internship-output/SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv')
FILES = ['appFlashcards.json','fullReferenceLibrary.json','chapterStudyMap.json','masterTopicFamilyIndex.json','masterTrapIndex.json']

def flatten_strings(value):
    if isinstance(value, dict):
        for k, v in value.items():
            yield from flatten_strings(v)
    elif isinstance(value, list):
        for v in value:
            yield from flatten_strings(v)
    elif isinstance(value, str):
        yield value

def val_counts(items, key):
    return Counter(v.get(key) for v in items if isinstance(v, dict) and v.get(key) not in (None, ''))

candidate_sources = []
for line in MAP.read_text(encoding='utf-8').splitlines()[1:]:
    if not line.strip():
        continue
    candidate_sources.append(line.split('\t')[0])
source_tokens = set(candidate_sources)
lines = []
for name in FILES:
    obj = json.loads((ROOT/name).read_text(encoding='utf-8'))
    items = obj if isinstance(obj, list) else []
    all_text = '\n'.join(flatten_strings(obj))
    matched_sources = sorted(s for s in source_tokens if s in all_text)
    lines.append(f'FILE {name}')
    lines.append(f'RECORD_COUNT {len(items)}')
    lines.append(f'TOP_LEVEL_TYPE {type(obj).__name__}')
    lines.append(f'MATCHED_SEG_SOURCE_IDS {matched_sources if matched_sources else "NONE"}')
    if items:
        for key in ['cardId','id','source','type','yield','topic','family','chapterNumber','chapterTitle','referenceId','needsVerification']:
            c = val_counts(items, key)
            if c:
                lines.append(f'FIELD {key} UNIQUE_VALUES {len(c)} TOP_VALUES {c.most_common(12)}')
        # Presence only, not content.
        union = sorted({k for item in items if isinstance(item, dict) for k in item.keys()})
        lines.append(f'FIELD_UNION {union}')
        for key in union:
            present = sum(1 for item in items if isinstance(item, dict) and key in item and item[key] not in (None, '', [], {}))
            lines.append(f'PRESENCE {key} {present}/{len(items)}')
    lines.append('')

OUT.write_text('\n'.join(lines)+'\n', encoding='utf-8')
print(OUT)
print('\n'.join(lines))
