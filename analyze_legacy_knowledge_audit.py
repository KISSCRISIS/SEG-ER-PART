from __future__ import annotations
import json
import re
from collections import Counter
from pathlib import Path

WORK = Path('/home/ubuntu/seg-legacy-knowledge-audit-input')
OUT = Path('/home/ubuntu/seg-manus-status/SEG_LEGACY_KNOWLEDGE_AUDIT_STRUCTURE.txt')
FILES = [
    'officialUnifiedTopics.json',
    'referenceLibrary.json',
    'flashcards.json',
    'examTraps.json',
    'algorithms.json',
    'arabicMentorExplanations.json',
    'topicFamilyIndex.json',
    'antidotes.json',
]
FRAMEWORKS = {
    'Tintinalli': re.compile(r'tintinalli', re.I),
    "Rosen's/Rosen": re.compile(r'rosen', re.I),
    'HIPPO': re.compile(r'hippo', re.I),
    'FRCEM': re.compile(r'frcem', re.I),
    'Rosh Review': re.compile(r'rosh', re.I),
    'Oxford': re.compile(r'oxford', re.I),
    'Kaplan': re.compile(r'kaplan', re.I),
}
ID_PATTERNS = {
    'UNI_*': re.compile(r'\bUNI_[A-Za-z0-9_-]+\b'),
    'DERIVED_*': re.compile(r'\bDERIVED_[A-Za-z0-9_-]+\b'),
    'tint_*': re.compile(r'\btint_[A-Za-z0-9_-]+\b', re.I),
    'rosen_*': re.compile(r'\brosen_[A-Za-z0-9_-]+\b', re.I),
    'hippo_*': re.compile(r'\bhippo_[A-Za-z0-9_-]+\b', re.I),
    'frcem_*': re.compile(r'\bfrcem_[A-Za-z0-9_-]+\b', re.I),
}

def flatten_strings(x):
    if isinstance(x, str):
        yield x
    elif isinstance(x, dict):
        for v in x.values():
            yield from flatten_strings(v)
    elif isinstance(x, list):
        for v in x:
            yield from flatten_strings(v)

def objects_at_root(data):
    if isinstance(data, list):
        return [x for x in data if isinstance(x, dict)]
    if isinstance(data, dict):
        return [data]
    return []

def field_presence(items):
    counts = Counter()
    for obj in items:
        for key in obj:
            counts[key] += 1
    return counts

def value_counter(items, keys):
    out = Counter()
    for obj in items:
        for key in keys:
            v = obj.get(key)
            if isinstance(v, str) and v.strip():
                out[v.strip()] += 1
    return out

lines = []
lines.append('SEG Legacy Knowledge Integration Audit — deterministic structural analysis')
lines.append('Mode: READ_ONLY; output contains metadata observations only; no medical payload reproduction.')
lines.append('')
all_frameworks = Counter()
all_id_patterns = Counter()
for name in FILES:
    path = WORK / name
    raw = path.read_text(encoding='utf-8')
    data = json.loads(raw)
    items = objects_at_root(data)
    root = 'array' if isinstance(data, list) else type(data).__name__
    top_keys = sorted(data[0].keys()) if isinstance(data, list) and data and isinstance(data[0], dict) else sorted(data.keys()) if isinstance(data, dict) else []
    presence = field_presence(items)
    strings = '\n'.join(flatten_strings(data))
    fw = Counter()
    for label, pat in FRAMEWORKS.items():
        n = len(pat.findall(strings))
        if n:
            fw[label] = n
            all_frameworks[label] += n
    ids = Counter()
    for label, pat in ID_PATTERNS.items():
        n = len(pat.findall(strings))
        if n:
            ids[label] = n
            all_id_patterns[label] += n
    id_values = []
    for key in ('id','cardId','topicId','referenceId','family','source'):
        for obj in items:
            v = obj.get(key)
            if isinstance(v, str) and v.strip():
                id_values.append((key, v.strip()))
    by_key = Counter(k for k, _ in id_values)
    duplicate_by_key = {}
    for key in by_key:
        vals = [v for k, v in id_values if k == key]
        dup = len(vals) - len(set(vals))
        if dup:
            duplicate_by_key[key] = dup
    empty_fields = Counter()
    for obj in items:
        for key, value in obj.items():
            if value is None or value == '' or value == [] or value == {}:
                empty_fields[key] += 1
    lines.append(f'## {name}')
    lines.append(f'- bytes: {path.stat().st_size}')
    lines.append(f'- sha256: {__import__("hashlib").sha256(path.read_bytes()).hexdigest()}')
    lines.append(f'- root_type: {root}')
    lines.append(f'- root_object_count: {len(items)}')
    lines.append(f'- first_object_keys: {", ".join(top_keys) if top_keys else "NONE"}')
    lines.append('- field_presence_counts: ' + ', '.join(f'{k}={v}' for k,v in presence.most_common()))
    lines.append('- id_like_fields: ' + (', '.join(f'{k}={v}' for k,v in by_key.items()) if by_key else 'NONE'))
    lines.append('- duplicate_id_like_values: ' + (', '.join(f'{k}={v}' for k,v in duplicate_by_key.items()) if duplicate_by_key else 'NONE_OBSERVED'))
    lines.append('- empty_field_counts: ' + (', '.join(f'{k}={v}' for k,v in empty_fields.items()) if empty_fields else 'NONE_OBSERVED'))
    lines.append('- framework_mentions: ' + (', '.join(f'{k}={v}' for k,v in fw.items()) if fw else 'NONE_OBSERVED'))
    lines.append('- id_pattern_mentions: ' + (', '.join(f'{k}={v}' for k,v in ids.items()) if ids else 'NONE_OBSERVED'))
    lines.append('')
lines.append('## Aggregate reference/framework observations')
lines.append('- ' + (', '.join(f'{k}={v}' for k,v in all_frameworks.items()) if all_frameworks else 'NONE_OBSERVED'))
lines.append('## Aggregate identifier-family observations')
lines.append('- ' + (', '.join(f'{k}={v}' for k,v in all_id_patterns.items()) if all_id_patterns else 'NONE_OBSERVED'))
lines.append('## Safety interpretation')
lines.append('- These are structural counts and lexical observations only.')
lines.append('- No source-to-candidate ownership, rights clearance, clinical approval, taxonomy approval, or learner-display permission is inferred.')
lines.append('- Any v1.1 mapping remains a future adapter/design mapping until explicit joins, metadata, clinical review, rights review, and implementation authorization exist.')
OUT.write_text('\n'.join(lines) + '\n', encoding='utf-8')
print(OUT)
