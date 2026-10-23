import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
base = root / 'SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT'
sources = [
    ('ROSH_ROTATION_2019', 'Rosh Review Emergency Medicine Rotation Exam', 'rosh'),
    ('TINTINALLI_MANUAL_8E', "Tintinalli's Emergency Medicine Manual 8e", 'tintinalli'),
    ('ROSEN_BARKIN_5MIN', "Rosen & Barkin's 5-Minute Emergency Medicine Consult 5e", 'rosen'),
]
chapters=[]
for folder, label, kind in sources:
    manifest=json.loads((base/folder/'manifest.json').read_text(encoding='utf-8'))
    entries=manifest.get('chapters') or manifest.get('topics') or []
    for index, entry in enumerate(entries, 1):
        title=entry.get('title') or f'Chapter {index}'
        chapters.append({
            'id': f"unified-{kind}-{index:04}", 'source': label,
            'sourceId': manifest['id'], 'title': title,
            'sourcePages': {'start': entry.get('pdfStart'), 'end': entry.get('pdfEnd')},
            'objectives': ['Identify the emergency presentation and immediate priorities.', 'Organize diagnostic and management decisions.', 'Recognize red flags and escalation triggers.'],
            'examPearls': [], 'examTraps': [], 'arabicExplanation': 'شرح عربي مبسط يُكتب بعد مراجعة المحتوى والمصادر الحالية.',
            'linkedQuestionIds': [], 'status': 'under-review', 'clinicalReview': 'pending',
            'coverage': 'unmapped-until-official-blueprint',
        })
out=base/'SEG_UNIFIED_REVIEW_GUIDE'
out.mkdir(parents=True, exist_ok=True)
(out/'outline.json').write_text(json.dumps({'id':'seg-unified-review-guide','title':'SEG Unified Emergency Medicine Review Guide','targetPages':400,'status':'under-review','chapters':chapters,'notes':['Original high-yield synthesis; not a replacement for source books.','Official Jordanian Board blueprint weights are not publicly verified.','All clinical claims require current-source and reviewer sign-off.']},ensure_ascii=False,indent=2),encoding='utf-8')
lines=['# SEG Unified Emergency Medicine Review Guide','','Original high-yield synthesis from the selected references. Every chapter remains under clinical review until a reviewer signs it.','']
for item in chapters:
    pages=item['sourcePages']; locator=f"PDF pages {pages['start']}-{pages['end']}" if pages['start'] else 'Page locator pending'
    lines += [f"## {len([x for x in chapters[:chapters.index(item)] if x['source']==item['source']])+1}. {item['title']}", f"Source: {item['source']} · {locator}", 'Status: under-review · Clinical review: pending', '', '### Learning objectives', '- Identify the emergency presentation and immediate priorities.', '- Organize diagnostic and management decisions.', '- Recognize red flags and escalation triggers.', '', '### Arabic explanation', item['arabicExplanation'], '', '### Editorial fields', 'Exam pearls: pending review', 'Exam traps: pending review', 'Linked SEG questions: pending mapping', '']
(out/'outline.md').write_text('\n'.join(lines),encoding='utf-8')
print(json.dumps({'chapters':len(chapters),'output':str(out)}))
