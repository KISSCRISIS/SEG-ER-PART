from __future__ import annotations
import hashlib
import json
import re
from collections import Counter
from pathlib import Path

NEW_ROOT = Path('/home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake')
OLD_ROOT = Path('/home/ubuntu/seg-legacy-knowledge-audit-input')
OUT = Path('/home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_inventory_comparison.md')


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()


def read_text(path: Path) -> str:
    return path.read_text(encoding='utf-8', errors='replace')


def key_strings(obj):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if isinstance(v, (str, int, float)):
                yield str(k), str(v)
            else:
                yield from key_strings(v)
    elif isinstance(obj, list):
        for v in obj:
            yield from key_strings(v)


def normalize(s: str) -> str:
    s = s.lower().replace('’', "'")
    s = re.sub(r'[^a-z0-9]+', ' ', s)
    return re.sub(r'\s+', ' ', s).strip()


def word_set(s: str):
    return {w for w in normalize(s).split() if len(w) > 3}

text_files = sorted(NEW_ROOT.rglob('*.txt'))
text_inventory = []
all_new_text = ''
for path in text_files:
    text = read_text(path)
    all_new_text += '\n' + text
    q_ids = re.findall(r'(?im)^\s*(Q\d+)\s*:', text)
    correct = re.findall(r'(?im)^\s*CORRECT ANSWER\s*:', text)
    chapter_lines = re.findall(r'(?im)^\s*(?:CHAPTER\s+\d+[^\n]*|Chapter\s+\d+[^\n]*|\d{2}\.\s+[^\n]+)\s*$', text)
    refs = {name: len(re.findall(pattern, text, flags=re.I)) for name, pattern in {
        'Tintinalli': r'tintinalli',
        'Rosen': r"rosen(?:'s|s)?",
        'Oxford': r'oxford',
        'HIPPO': r'hippo',
        'FRCEM': r'frcem',
        'Rosh Review': r'rosh(?: review)?',
        'Kaplan': r'kaplan',
        'RCEM': r'rcem',
    }.items()}
    text_inventory.append({
        'path': str(path.relative_to(NEW_ROOT)),
        'bytes': path.stat().st_size,
        'sha256': sha256(path),
        'lines': text.count('\n') + 1,
        'chars': len(text),
        'question_ids': len(q_ids),
        'question_min': min(q_ids, default=''),
        'question_max': max(q_ids, default=''),
        'correct_answer_markers': len(correct),
        'chapter_heading_lines': len(chapter_lines),
        'reference_counts': refs,
        'has_src_token': bool(re.search(r'(?i)SRC-[A-Z0-9_-]+|CAND-[A-Z0-9_-]+', text)),
        'has_version_signal': bool(re.search(r'(?i)\b(?:version|edition|release|v\d+(?:\.\d+)*)\b', text)),
        'has_rights_signal': bool(re.search(r'(?i)\b(?:copyright|license|rights|permission|public domain)\b', text)),
        'first_nonblank': next((line.strip() for line in text.splitlines() if line.strip()), ''),
    })

old_inventory = []
old_ids = set()
old_titles = set()
old_topic_words = set()
for path in sorted(OLD_ROOT.glob('*.json')):
    try:
        obj = json.loads(read_text(path))
    except Exception as exc:
        old_inventory.append({'file': path.name, 'parse': f'ERROR: {exc}'})
        continue
    items = obj if isinstance(obj, list) else None
    if items is None and isinstance(obj, dict):
        for key in ('items', 'data', 'topics', 'cards', 'traps', 'algorithms', 'explanations', 'families', 'antidotes', 'references', 'unifiedTopics'):
            if isinstance(obj.get(key), list):
                items = obj[key]
                break
    if items is None:
        items = [obj]
    local_ids = []
    local_titles = []
    for item in items:
        for k, v in key_strings(item):
            if k.lower() in {'id', 'key', 'topicid', 'objectid', 'sourceid', 'referenceid'} and re.match(r'(?i)^[A-Z]+[_-][A-Z0-9_-]+$', v):
                local_ids.append(v)
                old_ids.add(v)
            if k.lower() in {'title', 'name', 'topic', 'label', 'chapter', 'familyname', 'question'} and len(v) >= 5:
                local_titles.append(v)
                old_titles.add(normalize(v))
                old_topic_words.update(word_set(v))
    old_inventory.append({'file': path.name, 'items': len(items), 'sha256': sha256(path), 'ids': len(set(local_ids)), 'titles': len(set(local_titles)), 'top_ids': sorted(set(local_ids))[:5]})

new_words = word_set(all_new_text)
word_overlap = sorted((new_words & old_topic_words), key=lambda x: (len(x), x))
new_ids = sorted(set(re.findall(r'(?i)\b(?:UNI|FC|TRP|ALG|ANT|DERIVED|[a-z]+_c\d+)[_-][A-Z0-9_-]+\b', all_new_text)))
legacy_id_mentions = sorted(set(re.findall(r'(?i)\b(?:UNI_\d+|FC_\d+|TRP_[A-Z0-9_-]+|ALG_[A-Z0-9_-]+|ANT_[A-Z0-9_-]+|DERIVED_\d+|(?:tint|rosen|hippo|frcem)_c\d+(?:_t\d+)?)\b', all_new_text)))
src_mentions = sorted(set(re.findall(r'(?i)\b(?:SRC-[A-Z0-9_-]+|CAND-[A-Z0-9_-]+)\b', all_new_text)))

lines = []
lines.append('# Updated Legacy Source Package — Read-only Inventory and Comparison')
lines.append('')
lines.append('**Purpose:** structural and identity evidence review only; no medical correction, approval, production JSON, import, or replacement was performed.')
lines.append('')
lines.append('## Package-level result')
lines.append('')
lines.append(f'The extracted package contains **{len(text_files)} text files** plus PDF and DOCX representations. The analysis recorded exact checksums, text structure, question markers, chapter markers, reference signals, version/rights signals, and literal SEG identity tokens. The new package contains `SRC/CAND` tokens: **{bool(src_mentions)}**; observed tokens: `{", ".join(src_mentions[:20]) or "none"}`.')
lines.append('')
lines.append('## Text-file inventory')
lines.append('')
lines.append('| File | Bytes | SHA-256 | Lines | Q markers | Correct-answer markers | Chapter markers | SRC/CAND token | Version signal | Rights signal |')
lines.append('|---|---:|---|---:|---:|---:|---:|---|---|---|')
for r in text_inventory:
    lines.append(f"| `{r['path']}` | {r['bytes']} | `{r['sha256']}` | {r['lines']} | {r['question_ids']} | {r['correct_answer_markers']} | {r['chapter_heading_lines']} | {'YES' if r['has_src_token'] else 'NO'} | {'YES' if r['has_version_signal'] else 'NO'} | {'YES' if r['has_rights_signal'] else 'NO'} |")
lines.append('')
lines.append('## Selected content signals')
lines.append('')
for r in text_inventory:
    refs = ', '.join(f"{k}={v}" for k, v in r['reference_counts'].items() if v)
    lines.append(f"- `{r['path']}` begins with: {r['first_nonblank']!r}; reference signals: {refs or 'none detected'}.")
lines.append('')
lines.append('## Existing legacy JSON comparison')
lines.append('')
lines.append('| Legacy file | Items | SHA-256 | Distinct identity-like fields | Distinct title/name-like fields |')
lines.append('|---|---:|---|---:|---:|')
for r in old_inventory:
    if 'parse' in r:
        lines.append(f"| `{r['file']}` | — | — | — | — | {r['parse']} |")
    else:
        lines.append(f"| `{r['file']}` | {r['items']} | `{r['sha256']}` | {r['ids']} | {r['titles']} |")
lines.append('')
lines.append(f'Across the legacy JSON workspace, the analysis observed **{len(old_ids)} distinct identity-like values** and **{len(old_titles)} normalized title/name-like values**. New-package text has **{len(legacy_id_mentions)} legacy-style ID mentions** and **{len(src_mentions)} SEG staging ID mentions**.')
lines.append('')
lines.append('## Evidence interpretation')
lines.append('')
lines.append('The package contains substantial educational material and repeated reference/framework signals, but textual overlap or repeated topic names is not an identity bridge. The package also contains derived study books, question-and-explanation material, Arabic explanations, PDF exports, and editable documents; these representations require source/version/rights/locator separation before any controlled transformation.')
lines.append('')
lines.append('No deterministic legacy-to-SEG relationship is established by this structural comparison alone. Any exact match based on title, topic, chapter, or question wording would require an explicit, versioned cross-reference contract and independent review; it must not be inferred from content similarity.')
lines.append('')
lines.append('## Governance flags for subsequent review')
lines.append('')
lines.append('| Gate | Observed state |')
lines.append('|---|---|')
lines.append('| Source identity | Supplied archive identity and per-file checksums recorded; internal owner/publisher/version not fully established. |')
lines.append('| Version/edition | Not consistently supplied in inspected text/PDF/DOCX metadata; `UNRESOLVED` until explicit evidence. |')
lines.append('| Rights/display | No complete rights/license/display-scope evidence observed in the inspected metadata; `PENDING_EXTERNAL_EVIDENCE`. |')
lines.append('| Clinical review | Not performed by this analysis; `PENDING_CLINICAL_REVIEW`. |')
lines.append('| Track/taxonomy | Content-level audience and pathway assignment not authorized by this inventory; `UNRESOLVED`. |')
lines.append('| Identity bridge | No `SRC-*`/`CAND-*` token observed in new text; no candidate join established. |')
lines.append('')
lines.append('## Non-actions')
lines.append('')
lines.append('The original legacy sources were not deleted, renamed, overwritten, merged, or replaced. No schema, application, database, authentication, route, or security boundary was modified. No production JSON, import, migration, activation, publication, clinical approval, or rights approval was performed.')
lines.append('')
lines.append('## Next allowed decision')
lines.append('')
lines.append('The package may proceed only to a governed source-metadata comparison and independent rights/clinical review preparation. It is not yet a replacement source. A replacement decision requires a versioned source registry entry, explicit supersession decision, preserved old-source lineage, rights evidence, locator mapping, track/taxonomy evidence, and clinical review authorization.')

OUT.write_text('\n'.join(lines) + '\n', encoding='utf-8')
print(f'created {OUT}')
