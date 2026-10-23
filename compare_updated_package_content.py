from __future__ import annotations
import json
import re
from pathlib import Path
from collections import Counter

NEW_ROOT = Path('/home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake')
OLD_ROOT = Path('/home/ubuntu/seg-legacy-knowledge-audit-input')
OUT = Path('/home/ubuntu/seg-manus-status/phase_7_8_10_content_overlap.md')


def norm(s: str) -> str:
    s = s.lower().replace('’', "'")
    s = re.sub(r'[^a-z0-9]+', ' ', s)
    return re.sub(r'\s+', ' ', s).strip()


def collect(obj, wanted_keys, out):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if isinstance(v, str) and k.lower() in wanted_keys and len(v.strip()) >= 12:
                out.append((k, v))
            else:
                collect(v, wanted_keys, out)
    elif isinstance(obj, list):
        for v in obj:
            collect(v, wanted_keys, out)

new_text = '\n'.join(p.read_text(encoding='utf-8', errors='replace') for p in NEW_ROOT.rglob('*.txt') if p.name != 'sha256_manifest.txt')
new_norm = norm(new_text)
new_lines = {norm(line) for line in new_text.splitlines() if len(norm(line)) >= 20}

results = []
for path in sorted(OLD_ROOT.glob('*.json')):
    obj = json.loads(path.read_text(encoding='utf-8'))
    fields = []
    collect(obj, {'question', 'prompt', 'stem', 'topicname', 'topic', 'name', 'title', 'arabicmentorexplanation', 'explanation', 'trap', 'algorithm'}, fields)
    unique = {}
    for k, v in fields:
        n = norm(v)
        if n:
            unique[n] = (k, v)
    exact_line_hits = sum(1 for n in unique if n in new_lines)
    substring_hits = sum(1 for n in unique if len(n) >= 40 and n in new_norm)
    results.append((path.name, len(unique), exact_line_hits, substring_hits))

# Explicit title matching for the 40 official topics.
off = json.loads((OLD_ROOT / 'officialUnifiedTopics.json').read_text(encoding='utf-8'))
title_hits = []
for item in off:
    title = item.get('topicName', '')
    n = norm(title)
    if n and n in new_norm:
        title_hits.append(title)

lines = []
lines.append('# Updated Package — Conservative Legacy Content Overlap')
lines.append('')
lines.append('This file reports textual overlap only. It does not create identity mappings, candidate joins, or provenance conclusions from similarity.')
lines.append('')
lines.append('| Legacy file | Unique selected text fields | Exact full-line hits in new text | Substring hits in new text |')
lines.append('|---|---:|---:|---:|')
for r in results:
    lines.append(f'| `{r[0]}` | {r[1]} | {r[2]} | {r[3]} |')
lines.append('')
lines.append(f'Official unified topic names with a normalized textual occurrence somewhere in the new text: **{len(title_hits)} / {len(off)}**.')
if title_hits:
    lines.append('')
    lines.append('| Topic name |')
    lines.append('|---|')
    for title in title_hits:
        lines.append(f'| {title} |')
lines.append('')
lines.append('## Interpretation')
lines.append('')
lines.append('Exact or substring overlap can indicate reuse, derivation, duplication, or common reference language. It cannot establish a deterministic legacy-object-to-SEG-candidate identity because the comparison has no shared object ID, versioned locator, or authoritative cross-reference row.')
lines.append('')
lines.append('Any future use of overlap evidence must remain `POSSIBLE_REFERENCE_ONLY` or `MANUAL_REVIEW_REQUIRED` until an authorized reviewer supplies source/version/locator and an explicit relationship decision. No clinical claims were evaluated or corrected by this analysis.')
OUT.write_text('\n'.join(lines) + '\n', encoding='utf-8')
print(f'created {OUT}')
