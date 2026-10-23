import json
import hashlib
import re
from pathlib import Path
from collections import Counter, defaultdict

ROOT = Path('/home/ubuntu/seg-staging-prep-input/SEG_LEGACY_CONTENT_HANDOFF')
OUT = Path('/home/ubuntu/seg-manus-status')
FILES = [
    ROOT / '03_DATA/flashcards/src/data/APP_DATABASE.json',
    ROOT / '05_APPLICATION_STRUCTURE/src/data/APP_DATABASE.json',
    ROOT / '03_DATA/modules/src/data/supplementalSummary.json',
    ROOT / '05_APPLICATION_STRUCTURE/src/data/supplementalSummary.json',
]
PATTERNS = {
    'legacy_id': re.compile(r'^(UNI_[A-Z0-9_]+|FC_[A-Z0-9_]+|TRP_[A-Z0-9_]+|ALG_[A-Z0-9_]+|ANT_[A-Z0-9_]+|[a-z]+_c\d+|[A-Z]{2,}_\d+)$'),
    'seg_candidate_id': re.compile(r'^(CAND-7\.6-SRC-\d+|SRC-\d+)$'),
    'topic_id': re.compile(r'(topic|family|domain|category|subject)', re.I),
    'relation_key': re.compile(r'(parent|child|chapter|module|section|reference|related|topic|family|category|source|map|index|id)', re.I),
}

def sha(path):
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()

def load(path):
    return json.loads(path.read_text(encoding='utf-8'))

def shape(obj):
    if isinstance(obj, list):
        return {'root_type': 'list', 'length': len(obj), 'first_keys': sorted(obj[0].keys()) if obj and isinstance(obj[0], dict) else []}
    if isinstance(obj, dict):
        return {'root_type': 'object', 'keys': sorted(obj.keys())}
    return {'root_type': type(obj).__name__}

def walk(obj, path=''):
    if isinstance(obj, dict):
        for k, v in obj.items():
            p = f'{path}.{k}' if path else k
            yield p, k, v
            yield from walk(v, p)
    elif isinstance(obj, list):
        for i, v in enumerate(obj[:2000]):
            p = f'{path}[{i}]'
            yield p, '[index]', v
            yield from walk(v, p)

def flatten_strings(obj, path=''):
    for p, k, v in walk(obj, path):
        if isinstance(v, str):
            yield p, k, v

out_lines = []
out_lines.append('# Phase 7.8.9 Identity Evidence Discovery — Raw Analysis')
out_lines.append('')
out_lines.append('Read-only structural and identity-signal analysis of priority legacy files. No mapping rows were created.')
out_lines.append('')
for path in FILES:
    if not path.exists():
        out_lines.append(f'## MISSING {path}')
        out_lines.append('')
        continue
    obj = load(path)
    out_lines.append(f'## {path}')
    out_lines.append(f'- bytes: {path.stat().st_size}')
    out_lines.append(f'- sha256: {sha(path)}')
    out_lines.append(f'- shape: {shape(obj)}')
    strings = list(flatten_strings(obj))
    ids = Counter()
    exact_values = []
    key_counts = Counter()
    relation_hits = Counter()
    for p, k, v in strings:
        key_counts[k] += 1
        if PATTERNS['legacy_id'].match(v) or PATTERNS['seg_candidate_id'].match(v):
            kind = 'SEG_ID' if PATTERNS['seg_candidate_id'].match(v) else 'LEGACY_ID'
            ids[f'{kind}:{v}'] += 1
            exact_values.append((p, k, v))
        if PATTERNS['topic_id'].search(k) or PATTERNS['relation_key'].search(k):
            relation_hits[k] += 1
    out_lines.append(f'- string_values: {len(strings)}')
    out_lines.append(f'- detected_identity_values: {len(exact_values)}')
    out_lines.append('- top_keys: ' + ', '.join(f'{k}={n}' for k, n in key_counts.most_common(30)))
    out_lines.append('- relation_key_hits: ' + ', '.join(f'{k}={n}' for k, n in relation_hits.most_common(50)))
    out_lines.append('- detected_ids: ' + ', '.join(f'{k}={n}' for k, n in ids.most_common(80)))
    out_lines.append('- sample_identity_paths:')
    for p, k, v in exact_values[:80]:
        out_lines.append(f'  - {p} :: {k} = {v}')
    out_lines.append('')

# Compare the duplicate copies byte-for-byte.
app_a, app_b, sum_a, sum_b = FILES
out_lines.append('## Duplicate-copy checks')
out_lines.append(f'- APP_DATABASE copies identical: {sha(app_a) == sha(app_b)}')
out_lines.append(f'- supplementalSummary copies identical: {sha(sum_a) == sha(sum_b)}')
out_lines.append('')

# Search the handoff inventory for candidate relationship filename signals, excluding content payload leaf files.
inventory = OUT / 'phase_7_8_9_legacy_file_inventory.txt'
if inventory.exists():
    terms = re.compile(r'(mapping|migration|export|registry|content[_-]?map|topic[_-]?map|chapter[_-]?map|database|seed|supabase|schema|index)', re.I)
    paths = [line.strip() for line in inventory.read_text(encoding='utf-8').splitlines() if line.strip()]
    candidates = [p for p in paths if terms.search(Path(p).name)]
    out_lines.append('## Relationship-oriented filenames in handoff inventory')
    out_lines.append(f'- inventory_paths: {len(paths)}')
    out_lines.append(f'- filename_candidates: {len(candidates)}')
    for p in candidates[:300]:
        full = ROOT / p
        if full.exists() and full.is_file():
            out_lines.append(f'- {p}\t{full.stat().st_size} bytes\t{sha(full)}')
        else:
            out_lines.append(f'- {p}\tUNRESOLVED_PATH')
    out_lines.append('')

(OUT / 'phase_7_8_9_identity_evidence_raw_analysis.md').write_text('\n'.join(out_lines) + '\n', encoding='utf-8')
print('wrote', OUT / 'phase_7_8_9_identity_evidence_raw_analysis.md')
