import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
guide = root / 'SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/SEG_UNIFIED_REVIEW_GUIDE/outline.json'
data = json.loads(guide.read_text(encoding='utf-8'))
priority_words = ('resuscitation','airway','cardio','cardiac','pulmonary','trauma','toxic','neurolog','pediatric','sepsis','shock','critical','obstetric','pregnan','infect')
queue = []
for item in data['chapters']:
    lower = item['title'].lower()
    priority = 1 if any(word in lower for word in priority_words) else 2
    if 'rosen' in item['id'] and priority == 2:
        priority = 3
    queue.append({'unitId': item['id'], 'title': item['title'], 'source': item['source'], 'sourcePages': item['sourcePages'], 'priority': priority, 'residentYears': [1,2,3,4], 'boardParts': [1,2], 'deliverables': ['original high-yield synthesis','diagnostic and management framework','exam pearls and traps','Arabic plain-language explanation','SEG question links'], 'status': 'queued', 'clinicalReview': 'pending', 'reviewer': None})
queue.sort(key=lambda row: (row['priority'], row['source'], row['sourcePages'].get('start') or 0))
out = guide.parent / 'editorial-queue.json'
out.write_text(json.dumps({'guideId': data['id'], 'generatedAt': '2026-09-09', 'total': len(queue), 'queued': len(queue), 'inProgress': 0, 'reviewed': 0, 'priorityDefinition': {'1':'core emergency and high-risk presentations','2':'core specialty and general emergency topics','3':'supplementary reference topics'}, 'items': queue}, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'total': len(queue), 'priority1': sum(row['priority'] == 1 for row in queue), 'priority2': sum(row['priority'] == 2 for row in queue), 'priority3': sum(row['priority'] == 3 for row in queue), 'output': str(out)}))
