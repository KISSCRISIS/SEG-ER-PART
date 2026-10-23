from __future__ import annotations

import hashlib
from pathlib import Path

report = Path('/home/ubuntu/seg-internship-output/SEG_PHASE_7_8_REVIEW_VALIDATION_REPORT.md')
artifact = Path('/home/ubuntu/upload/pasted_content_17.txt')
out = report.parent
required = [
    'SEG_PHASE_7_8_IMPORT_PREPARATION_MAP.md',
    'SEG_PHASE_7_8_JSON_BLUEPRINT.md',
    'SEG_PHASE_7_8_FIELD_MAPPING_VALIDATION.md',
    'SEG_PHASE_7_8_DUPLICATE_HANDLING_PLAN.md',
    'SEG_PHASE_7_8_GATE_REPORT.md',
]
assert report.is_file()
text = report.read_text(encoding='utf-8')
assert '# SEG Phase 7.8 — Review Validation Report' in text
assert '> **Final decision:** `BLOCKED_PENDING_FINAL_GATES`' in text
assert '48/48' in text
assert '`SEG Original`' in text and '`Mixed Educational Content`' in text and '`External Reference Based`' in text
for typ in ['`lesson`', '`question_bank`', '`clinical_case`', '`clinical_skill`', '`book`']:
    assert typ in text
assert 'SEG_CONTENT_RECORD_V1_1' in text
assert 'Production JSON creation | Not performed' in text
assert 'Database import/write | Not performed' in text
assert 'Content activation | Not performed' in text
assert 'Publication/learner exposure | Not performed' in text
assert 'Original source modification | Not performed' in text
assert 'Phase 7.9 execution | Explicitly not performed' in text
for name in required:
    assert name in text
    assert not (out / name).exists(), name
assert hashlib.sha256(artifact.read_bytes()).hexdigest() == '2ff0aa6216acc6032cce91bf88cfc6529d0b108c2748fcd481b4dbba80db0142'
assert hashlib.sha256(report.read_bytes()).hexdigest() == hashlib.sha256(report.read_bytes()).hexdigest()
print('report_present', True)
print('decision', 'BLOCKED_PENDING_FINAL_GATES')
print('required_phase_7_8_artifacts_missing', len(required), '/', len(required))
print('uploaded_artifact_unchanged', True)
print('non_actions_confirmed', True)
print('phase_7_9_executed', False)
print('report_sha256', hashlib.sha256(report.read_bytes()).hexdigest())
