import json
from collections import Counter
from pathlib import Path

work = Path('/home/ubuntu/seg-legacy-knowledge-audit-input')
path = work / 'topicFamilyIndex.json'
data = json.loads(path.read_text(encoding='utf-8'))
print(f'families={len(data)}')
for row in data:
    entries = row.get('entries') or []
    prefixes = Counter()
    for e in entries:
        if isinstance(e, str):
            prefixes[e.split('_', 1)[0] if '_' in e else e] += 1
        elif isinstance(e, dict):
            for key in ('id', 'topicId', 'referenceId', 'source'):
                value = e.get(key)
                if isinstance(value, str):
                    prefixes[value.split('_', 1)[0] if '_' in value else value] += 1
                    break
    print(f"family={row.get('family')}|count={row.get('count')}|entry_count={len(entries)}|prefixes={dict(prefixes)}")

for filename in ['officialUnifiedTopics.json', 'referenceLibrary.json', 'flashcards.json', 'examTraps.json', 'algorithms.json', 'arabicMentorExplanations.json', 'antidotes.json']:
    obj = json.loads((work / filename).read_text(encoding='utf-8'))
    rows = obj if isinstance(obj, list) else []
    fields = Counter()
    for row in rows:
        if isinstance(row, dict):
            for k in row:
                fields[k] += 1
    print(f'fields={filename}|top={fields.most_common(12)}')
