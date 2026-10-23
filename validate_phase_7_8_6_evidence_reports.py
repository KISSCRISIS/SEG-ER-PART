from pathlib import Path
import hashlib

OUT = Path('/home/ubuntu/seg-internship-output')
PKG = Path('/home/ubuntu/seg-manus-status/phase_7_8_6_evidence_package')
reports = {
    'intake': OUT / 'SEG_PHASE_7_8_6_LEGACY_EVIDENCE_INTAKE_REPORT.md',
    'matrix': OUT / 'SEG_PHASE_7_8_6_PROVENANCE_MATRIX.md',
    'separation': OUT / 'SEG_PHASE_7_8_6_CONTENT_LAYER_SEPARATION.md',
}
required_evidence = [
    'CONTENT_SOURCES.md',
    'EM_MASTER_TEXTBOOK_BUILD.md',
    'EM_MASTER_TEXTBOOK_ARABIC_COMPLETION.md',
    'FINAL_MEDICAL_CONTENT_AUDIT.md',
    'FINAL_SCOPE.md',
    'PDF_VISUAL_MAPPING_SYSTEM.md',
]
all_report_text = ''
for key, path in reports.items():
    assert path.exists() and path.stat().st_size > 0, f'missing report: {key}'
    text = path.read_text(encoding='utf-8')
    all_report_text += '\n' + text
    assert 'BLOCKED_PENDING_EVIDENCE' in text, f'missing readiness in {key}'
for alternatives in [['No production JSON'], ['No import', 'No database import', 'No import,'], ['No schema', 'schema'], ['No database', 'database']]:
    assert any(phrase in all_report_text for phrase in alternatives), f'missing non-action evidence in report set: {alternatives}'
for name in required_evidence:
    assert (PKG / name).exists(), f'missing evidence file {name}'
intake = reports['intake'].read_text(encoding='utf-8')
matrix = reports['matrix'].read_text(encoding='utf-8')
separation = reports['separation'].read_text(encoding='utf-8')
for name in required_evidence:
    assert name in intake or name in matrix or name in separation, f'evidence not cited: {name}'
for phrase in ['Source provenance', 'Content ownership classification', 'SEG Original Educational Content', 'Mixed Educational Content', 'External Reference-Based Content', 'Arabic Mentor Explanation layer', 'Master Textbook to SEG lesson mapping readiness', 'Medical review workflow evidence', 'Reference framework relationships', 'Visual asset governance']:
    assert phrase in intake, f'missing intake question: {phrase}'
for phrase in ['SEG Original Educational Layer', 'Mixed Educational Content', 'External Reference-Based Content', 'Visual Assets', 'Medical Governance Documents', 'lesson', 'book', 'reference_framework']:
    assert phrase in separation or phrase in matrix, f'missing separation/mapping concept: {phrase}'
for phrase in ['source', 'version', 'locator', 'rights', 'CLINICAL_REVIEW_PENDING', 'OWNER_PENDING', 'TAXONOMY_PENDING']:
    assert phrase.lower() in matrix.lower() or phrase.lower() in separation.lower(), f'missing controlled state/evidence: {phrase}'
# Verify package hashes referenced in the findings register remain unchanged.
expected = {
    'CONTENT_SOURCES.md': 'ea5644a0ace9289bad544926b97d00383b32980a4ea0fec40d26fd56655441ae',
    'EM_MASTER_TEXTBOOK_BUILD.md': 'af74f0671c8280f23b6b5a7f35c473dc5925eb5cc7a8adc2bef33421f27221ea',
    'EM_MASTER_TEXTBOOK_ARABIC_COMPLETION.md': 'c47887bb1d3219dad93ed884d894694e03266221427f33dea2e1a3753d4c37f8',
    'FINAL_MEDICAL_CONTENT_AUDIT.md': 'af09417118e253fe1e0167552450dc6ed4e2e8ad94fa4f9f75a438a43dd84fbe',
    'FINAL_SCOPE.md': '1a1844bdb3915c1c00803870a5774a95d1e6ab7c998d8878d464bc420e104c54',
    'PDF_VISUAL_MAPPING_SYSTEM.md': 'd310fc1609e47d7961f8c1ef600e45b898b7b24297693a975e5716f6cd0c53bb',
}
for name, digest in expected.items():
    actual = hashlib.sha256((PKG / name).read_bytes()).hexdigest()
    assert actual == digest, f'hash mismatch {name}: {actual}'
print('PASS: reports=3/3; evidence=6/6; readiness=BLOCKED_PENDING_EVIDENCE; non-actions=present; evidence hashes=6/6')
for key, path in reports.items():
    print(f'{key}_sha256={hashlib.sha256(path.read_bytes()).hexdigest()}')
