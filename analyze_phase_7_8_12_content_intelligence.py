from __future__ import annotations
import hashlib
import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path('/home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake')
OUT = Path('/home/ubuntu/seg-manus-status')
FILES = [
    ('كتب علاء نص دراسي/FRCEM_High_Yield_Study_Book.txt', 'FRCEM_High_Yield_Study_Book.txt'),
    ('اسئله +الشرح بالعربي/frcem All_Chapters_Questions_and_Explanations_Full.txt', 'frcem All_Chapters_Questions_and_Explanations_Full.txt'),
    ('كتب علاء نص دراسي/HIPPO_High_Yield_Study_Book.txt', 'HIPPO_High_Yield_Study_Book.txt'),
    ('اسئله +الشرح بالعربي/HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt', 'HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt'),
]
LEGACY = Path('/home/ubuntu/seg-legacy-knowledge-audit-input')


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open('rb') as f:
        for c in iter(lambda: f.read(1024 * 1024), b''):
            h.update(c)
    return h.hexdigest()


def read_text(path: Path) -> str:
    return path.read_text(encoding='utf-8', errors='replace')


def unique_preserve(items):
    seen = set(); out = []
    for x in items:
        x = re.sub(r'\s+', ' ', x).strip(' :-–—')
        if x and x not in seen:
            seen.add(x); out.append(x)
    return out


def analyze(relative: str, name: str, text: str) -> dict:
    path = ROOT / relative
    lines = text.splitlines()
    headings = unique_preserve([m.group(1) for line in lines if (m := re.match(r'^\s{0,3}#{1,6}\s+(.+?)\s*$', line))])
    chapter_lines = unique_preserve([
        m.group(0) for line in lines
        if (m := re.search(r'(?i)\b(?:chapter|section|part)\s+(?:[0-9]{1,3}|[IVXLC]+)\b[^\n]*', line))
    ])
    chapter_markers = len(re.findall(r'(?i)\b(?:chapter|section|part)\s+(?:[0-9]{1,3}|[IVXLC]+)\b', text))
    q_matches = re.findall(r'(?im)^\s*(?:#{1,6}\s*)?(?:question|q(?:uestion)?\s*[-.:#]?|q\s*[-.:#]?)\s*([0-9]{1,5})\b', text)
    q_numbered = len(q_matches)
    q_word = len(re.findall(r'(?i)\bquestion\b', text))
    answers = len(re.findall(r'(?i)\banswer\b|\bcorrect answer\b|الإجابة|الجواب', text))
    explanations = len(re.findall(r'(?i)\bexplanation\b|\brationale\b|شرح|التفسير|التوضيح|السبب', text))
    arabic_chars = len(re.findall(r'[\u0600-\u06FF]', text))
    english_chars = len(re.findall(r'[A-Za-z]', text))
    arabic_markers = Counter()
    for marker in ['شرح', 'توضيح', 'الإجابة', 'الجواب', 'السبب', 'ملاحظة', 'نصيحة', 'قاعدة', 'لماذا', 'بالعربي']:
        c = len(re.findall(re.escape(marker), text, flags=re.I))
        if c: arabic_markers[marker] = c
    exam_markers = Counter()
    for marker in ['high yield', 'exam', 'FRCEM', 'HIPPO', 'Rosh', 'trap', 'pattern', 'red flag', 'must know', 'important', 'key point', 'differential', 'management', 'algorithm', 'mnemonic']:
        c = len(re.findall(re.escape(marker), text, flags=re.I))
        if c: exam_markers[marker] = c
    q_ids = unique_preserve(re.findall(r'(?im)^\s*(?:question|q)\s*[-.:#]?\s*([0-9]{1,5})\b', text))[:30]
    return {
        'name': name, 'path': str(path), 'bytes': path.stat().st_size,
        'sha256': sha256(path), 'lines': len(lines), 'headings': headings[:40],
        'chapter_markers': chapter_markers, 'chapter_examples': chapter_lines[:25],
        'question_markers': q_numbered, 'question_word_mentions': q_word,
        'answer_markers': answers, 'explanation_markers': explanations,
        'arabic_chars': arabic_chars, 'english_chars': english_chars,
        'arabic_markers': dict(arabic_markers), 'exam_markers': dict(exam_markers),
        'question_ids_sample': q_ids,
    }

results = [analyze(relative, name, read_text(ROOT / relative)) for relative, name in FILES]

# Reproduce the conservative comparison signals already recorded in Phase 7.8.10.
legacy_counts = {}
for name in ['officialUnifiedTopics.json', 'flashcards.json', 'examTraps.json', 'topicFamilyIndex.json']:
    p = LEGACY / name
    data = json.loads(p.read_text(encoding='utf-8'))
    legacy_counts[name] = len(data) if isinstance(data, list) else len(data.keys())

summary = {
    'files': results,
    'legacy_counts': legacy_counts,
    'non_actions': {
        'identity_links_created': False,
        'src_cand_mappings_created': False,
        'production_json_created': False,
        'clinical_approval': False,
        'rights_approval': False,
        'content_transformed': False,
    }
}
(OUT / 'phase_7_8_12_content_intelligence_raw.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding='utf-8')

md = ['# Phase 7.8.12 Raw Content Intelligence Analysis', '', 'This is a deterministic, read-only structural analysis. It is not a production artifact, a medical review, a rights decision, an identity bridge, or a content transformation.', '']
md += ['## Priority 1 file summary', '', '| file | bytes | sha256 | chapter markers | question markers | answer markers | explanation markers | Arabic chars |', '|---|---:|---|---:|---:|---:|---:|---:|']
for r in results:
    md.append('| ' + ' | '.join(str(r[k]) for k in ['name','bytes','sha256','chapter_markers','question_markers','answer_markers','explanation_markers','arabic_chars']) + ' |')
md += ['', '## Legacy counts', '']
for k,v in legacy_counts.items(): md.append(f'- {k}: {v}')
(OUT / 'phase_7_8_12_content_intelligence_raw.md').write_text('\n'.join(md), encoding='utf-8')
print(json.dumps(summary, ensure_ascii=False, indent=2))
