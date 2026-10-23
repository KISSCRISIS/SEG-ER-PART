from __future__ import annotations
import json
from collections import Counter
from pathlib import Path

ROOT = Path('/home/ubuntu/seg-phase-7-8-5-legacy-assets')
OUT = Path('/home/ubuntu/seg-manus-status/SEG_PHASE_7_8_5_LEGACY_ASSET_STRUCTURE.txt')
FILES = ['appFlashcards.json','fullReferenceLibrary.json','chapterStudyMap.json','masterTopicFamilyIndex.json','masterTrapIndex.json']

def shape(value):
    if isinstance(value, dict):
        return {'kind':'object','keys':sorted(value.keys())}
    if isinstance(value, list):
        return {'kind':'array','length':len(value),'first':shape(value[0]) if value else None}
    return {'kind':type(value).__name__}

lines=[]
for name in FILES:
    path=ROOT/name
    obj=json.loads(path.read_text(encoding='utf-8'))
    lines.append(f'FILE {name}')
    lines.append(f'ROOT_SHAPE {shape(obj)}')
    if isinstance(obj, dict):
        for key, value in sorted(obj.items()):
            lines.append(f'TOP_KEY {key!r} SHAPE {shape(value)}')
    elif isinstance(obj, list):
        for i, value in enumerate(obj[:5]):
            lines.append(f'ITEM_{i} {shape(value)}')
    lines.append('')

OUT.write_text('\n'.join(lines)+'\n', encoding='utf-8')
print(OUT)
print('\n'.join(lines))
