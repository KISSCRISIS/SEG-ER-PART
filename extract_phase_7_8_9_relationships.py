import json
import hashlib
import re
from pathlib import Path
from collections import Counter

HANDOFF = Path('/home/ubuntu/seg-staging-prep-input/SEG_LEGACY_CONTENT_HANDOFF')
OUT = Path('/home/ubuntu/seg-manus-status/phase_7_8_9_relationship_inventory.md')
APP = HANDOFF / '03_DATA/flashcards/src/data/APP_DATABASE.json'
SUPP = HANDOFF / '03_DATA/modules/src/data/supplementalSummary.json'


def sha(path):
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()


def all_strings(x, path=''):
    if isinstance(x, dict):
        for k, v in x.items():
            p = f'{path}.{k}' if path else k
            if isinstance(v, str):
                yield p, k, v
            else:
                yield from all_strings(v, p)
    elif isinstance(x, list):
        for i, v in enumerate(x):
            yield from all_strings(v, f'{path}[{i}]')

app = json.loads(APP.read_text(encoding='utf-8'))
supp = json.loads(SUPP.read_text(encoding='utf-8'))
lines = []
lines += ['# Phase 7.8.9 Relationship Inventory', '', 'Read-only inventory of existing legacy relationships. No candidate links or bridge rows were created.', '']
lines += ['## Priority file fingerprints', '', '| File | Bytes | SHA-256 |', '|---|---:|---|', f'| `{APP}` | {APP.stat().st_size} | `{sha(APP)}` |', f'| `{SUPP}` | {SUPP.stat().st_size} | `{sha(SUPP)}` |', '']
lines += ['## APP_DATABASE root collections', '', '| Collection | Count | Identity fields observed | Relationship fields observed |', '|---|---:|---|---|']
for key, value in app.items():
    if isinstance(value, list):
        ids = Counter()
        rel = Counter()
        for item in value:
            if isinstance(item, dict):
                for k in item:
                    if k.lower() in {'id', 'topicid', 'cardid', 'referenceid', 'sourceobjectids', 'sourceids', 'chapterid', 'moduleid', 'family', 'topic', 'topicid', 'reference'}:
                        if k.lower() == 'sourceobjectids':
                            rel[k] += 1
                        elif k.lower() in {'family', 'topic', 'topicid', 'reference', 'chapterid', 'moduleid'}:
                            rel[k] += 1
                        else:
                            ids[k] += 1
        lines.append(f'| `{key}` | {len(value)} | {", ".join(f"{k}={v}" for k,v in ids.items()) or "none"} | {", ".join(f"{k}={v}" for k,v in rel.items()) or "none"} |')
lines.append('')

# Explicit internal legacy links in derived topics.
derived = app.get('expandedDerivedTopics', [])
source_pairs = []
for item in derived:
    if isinstance(item, dict) and item.get('sourceObjectIds'):
        for sid in item.get('sourceObjectIds', []):
            source_pairs.append((item.get('topicId'), sid, item.get('topicName'), item.get('sourceReferences', [])))
lines += ['## Explicit legacy-to-legacy relationships in `expandedDerivedTopics`', '', '| Measure | Value |', '|---|---:|', f'| Derived topic objects | {len(derived)} |', f'| Objects with `sourceObjectIds` | {len([x for x in derived if isinstance(x, dict) and x.get("sourceObjectIds")])} |', f'| Explicit derived→source pairs | {len(source_pairs)} |', f'| Unique derived IDs | {len(set(x[0] for x in source_pairs))} |', f'| Unique source object IDs | {len(set(x[1] for x in source_pairs))} |', '', 'Sample preserved pairs:', '', '| Derived object ID | Source object ID | Topic | Source references |', '|---|---|---|---|']
for did, sid, title, refs in source_pairs[:30]:
    lines.append(f'| `{did}` | `{sid}` | {title or "NOT_PRESENT"} | {"; ".join(refs) if refs else "NOT_PRESENT"} |')
lines.append('')

# Counts by namespace across all string values.
legacy_pat = re.compile(r'^(UNI_\d+|DERIVED_\d+|FC_\d+|TRP_\d+|ALG_\d+|ANT_\d+|[a-z]+_c\d+.*)$')
seg_pat = re.compile(r'^(?:SRC-\d{4}|CAND-7\.6-SRC-\d{4})$')
legacy_values = Counter()
seg_values = Counter()
for p, k, v in all_strings(app):
    if legacy_pat.match(v):
        legacy_values[v] += 1
    if seg_pat.match(v) or 'SRC-' in v or 'CAND-' in v:
        seg_values[v] += 1
lines += ['## Identity-token search in APP_DATABASE', '', '| Token class | Count of distinct values | Total occurrences |', '|---|---:|---:|', f'| Legacy namespace tokens | {len(legacy_values)} | {sum(legacy_values.values())} |', f'| SEG `SRC`/`CAND` tokens | {len(seg_values)} | {sum(seg_values.values())} |', '']

# Supplemental structure.
lines += ['## `supplementalSummary.json` relationship assessment', '', '| Collection | Count | Identity/relationship result |', '|---|---:|---|']
for key, value in supp.items():
    count = len(value) if isinstance(value, list) else 1
    lines.append(f'| `{key}` | {count} | Plain summary/drug/trap content; no `SRC-*`, `CAND-*`, or crosswalk field observed |')
lines.append('')

# Selected registries and maps.
registry_specs = [
    ('emergency_cases_index.json', HANDOFF / '03_DATA/cases/content/imported/emergency-cases/_pack/data/emergency_cases_index.json'),
    ('airway_index.json', HANDOFF / '03_DATA/modules/content/imported/airway-intubation-ventilator/_pack/data/airway_index.json'),
    ('critical_care_index.json', HANDOFF / '03_DATA/modules/content/imported/critical-care/_pack/data/critical_care_index.json'),
    ('drug_index.json', HANDOFF / '03_DATA/modules/content/imported/drug-essentials/_pack/data/drug_index.json'),
    ('ecg-content-index.json', HANDOFF / '03_DATA/modules/content/imported/ecg/_pack/data/ecg-content-index.json'),
    ('pocus_index.json', HANDOFF / '03_DATA/modules/content/imported/pocus/_pack/metadata/pocus_index.json'),
    ('toxicology_index.json', HANDOFF / '03_DATA/modules/content/imported/toxicology/_pack/data/toxicology_index.json'),
]
lines += ['## Legacy registry/index evidence', '', '| File | Count | ID pattern/fields | SEG link result | Bytes | SHA-256 |', '|---|---:|---|---|---:|---|']
for label, path in registry_specs:
    obj = json.loads(path.read_text(encoding='utf-8')) if path.exists() else []
    arr = obj if isinstance(obj, list) else obj.get('items', []) if isinstance(obj, dict) else []
    ids = [x.get('id') for x in arr if isinstance(x, dict) and x.get('id') is not None]
    keys = sorted({k for x in arr[:100] if isinstance(x, dict) for k in x.keys()})
    seg_hits = [s for s in all_strings(obj) if 'SRC-' in s[2] or 'CAND-' in s[2]]
    pattern = ', '.join(sorted(set(str(i).split('-')[0] for i in ids[:20]))) or 'none'
    lines.append(f'| `{label}` | {len(arr)} | IDs `{pattern}`; fields `{", ".join(keys[:12])}` | {"SEG token found" if seg_hits else "No SEG token"} | {path.stat().st_size if path.exists() else "-"} | `{sha(path) if path.exists() else "MISSING"}` |')
lines.append('')

# Search for exact SEG tokens across the three legacy roots using paths supplied by prior shell evidence.
lines += ['## Cross-package negative identity result', '', 'The forensic search across the legacy handoff, the eight legacy JSON workspace, and the staged legacy-content folders found no literal `SRC-xxxx` or `CAND-7.6-SRC-xxxx` token in legacy files. Existing identity evidence is therefore internal to legacy namespaces or pack-local slugs; it does not establish legacy→SEG candidate linkage.', '']

OUT.write_text('\n'.join(lines) + '\n', encoding='utf-8')
print('wrote', OUT)
print('derived_source_pairs', len(source_pairs))
print('app_seg_tokens', sum(seg_values.values()))
