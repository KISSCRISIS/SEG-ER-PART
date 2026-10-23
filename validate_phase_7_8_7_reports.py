from pathlib import Path
import hashlib

out = Path('/home/ubuntu/seg-internship-output')
review = out / 'SEG_PHASE_7_8_7_ADDITIONAL_EVIDENCE_REVIEW.md'
gate = out / 'SEG_PHASE_7_8_7_GATE_UPDATE.md'
artifact = Path('/home/ubuntu/upload/pasted_content_19.txt')

for p in (review, gate, artifact):
    assert p.exists(), f'missing: {p}'

assert hashlib.sha256(artifact.read_bytes()).hexdigest() == 'b6daafa12f9bab6709e1474f1b561a5211524ff3111b029fafa6bce8d8a9cacf'
r = review.read_text()
g = gate.read_text()
assert 'NO_NEW_CLOSURE' in r and 'NO_NEW_CLOSURE' in g
assert 'INSUFFICIENT_EVIDENCE' in r
assert 'ALREADY_EXISTING' in r
assert 'CONFLICT_WITH_EXISTING_RECORD' in r
assert 'NEW_EVIDENCE' in r
for token in ('Source provenance','Legacy asset mapping','SEG Original Educational Content identification','Mixed Educational Content classification','External Reference-Based Content separation','Lesson transformation readiness','Question Bank readiness','Clinical Case / Clinical Skill mapping','Medical Owner review evidence','Taxonomy/pathway evidence','Version / checksum / locator closure'):
    assert token in r, token
for token in ('Source provenance','Legacy asset mapping','ID compatibility','Taxonomy/pathway','Medical Owner review','Clinical review','Rights/display','Duplicate closure','v1.1 staging validation','Adapter dry-run authorization'):
    assert token in g, token
for token in ('No production JSON','import','migration','activation','publication','source modification'):
    assert token in g, token
assert 'BLOCKED_PENDING_EVIDENCE' in g
print('PASS: phase 7.8.7 reports validated; no new closure; non-actions preserved')
print(f'review_sha256={hashlib.sha256(review.read_bytes()).hexdigest()}')
print(f'gate_sha256={hashlib.sha256(gate.read_bytes()).hexdigest()}')
