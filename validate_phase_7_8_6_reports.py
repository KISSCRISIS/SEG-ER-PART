from pathlib import Path
import hashlib

out = Path('/home/ubuntu/seg-internship-output')
required = [
    'SEG_LEGACY_PROVENANCE_MATRIX.md',
    'SEG_LEGACY_TAXONOMY_CROSSWALK.md',
    'SEG_LEGACY_CONTENT_LAYER_SEPARATION.md',
    'SEG_LEGACY_MIGRATION_PRIORITY_MATRIX.md',
    'SEG_PHASE_7_8_6_GATE_REPORT.md',
]
for name in required:
    p = out / name
    assert p.exists() and p.stat().st_size > 0, name

text = {name: (out / name).read_text(encoding='utf-8') for name in required}
prov = text[required[0]]
tax = text[required[1]]
layers = text[required[2]]
priority = text[required[3]]
gate = text[required[4]]

for name in ['officialUnifiedTopics.json','referenceLibrary.json','flashcards.json','examTraps.json','algorithms.json','arabicMentorExplanations.json','topicFamilyIndex.json','antidotes.json']:
    assert name in prov and name in layers and name in priority, name
all_text = '\n'.join(text.values())
for token in ['lesson','question_bank','book','clinical_case','clinical_skill']:
    assert token in all_text, token
for token in ['Layer A','Layer B','Layer C','Layer D','External Reference Knowledge','SEG Original Educational Layer','Derived Exam Intelligence','Navigation/Index Metadata']:
    assert token in layers, token
for token in ['Priority 1','Priority 2','Priority 3','reference-only','metadata completion']:
    assert token.lower() in priority.lower(), token
for token in ['CROSSWALK_COMPLETE','production_json_created=false','database_import_executed=false','schema_modified=false','approval_assigned=false']:
    assert token in gate, token
for token in ['Medical Owner','rights','version','locator','taxonomy','pathway']:
    assert token.lower() in prov.lower() + tax.lower() + gate.lower(), token
assert '99 family objects' in tax
assert 'No source was modified' in gate
assert 'No taxonomy value was activated' in tax
assert 'No layer was imported' in layers

for name in required:
    digest = hashlib.sha256((out / name).read_bytes()).hexdigest()
    print(f'{digest}  {out/name}')
print('VALIDATION=PASS')
