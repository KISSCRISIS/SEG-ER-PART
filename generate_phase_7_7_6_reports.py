from __future__ import annotations

import csv
import hashlib
import re
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

OUT = Path('/home/ubuntu/seg-internship-output')
SRC_ROOT = Path('/home/ubuntu/seg-internship-phase-5.6/staging/extracted')
NOW = '2026-08-21T10:03:00Z'

MAP_PATH = OUT / 'SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv'
REGISTER_PATH = OUT / 'SEG_PHASE_7_7_5_MEDICAL_OWNER_REVIEW_REGISTER.md'
QUEUE_PATH = OUT / 'SEG_PHASE_7_7_5_CLINICAL_QA_QUEUE.md'
EXTRACTION_PATH = OUT / 'SEG_PHASE_7_7_CONTENT_EXTRACTION_REGISTER.md'

map_rows = list(csv.DictReader(MAP_PATH.open(encoding='utf-8'), delimiter='\t'))
register_lines = REGISTER_PATH.read_text(encoding='utf-8').splitlines()

register = {}
for line in register_lines:
    if line.startswith('|') and 'CAND-7.6-' in line:
        cells = [c.strip().strip('`') for c in line.strip().strip('|').split('|')]
        if len(cells) >= 11:
            register[cells[0]] = {
                'source_id': cells[1], 'target_type': cells[2], 'path': cells[3],
                'sha': cells[4], 'owner': cells[5], 'origin': cells[6],
                'framework': cells[7], 'track': cells[8], 'clinical': cells[9], 'rights': cells[10],
            }

assert len(map_rows) == 48
assert len(register) == 48
assert {r['candidate_record_id'] for r in map_rows} == set(register)

# Evidence-bound promotion: only the source files that explicitly declare an
# original SEG educational synthesis are promoted from the conservative Mixed class.
original_sources = {'SRC-0023', 'SRC-0027', 'SRC-0033', 'SRC-0037'}
books = {'book'}

def classification(row: dict) -> tuple[str, str]:
    if row['target_type'] == 'book':
        return 'External Reference Based', 'External PDF/reference material; no SEG ownership claim.'
    if row['source_id'] in original_sources:
        return 'SEG Original', 'Source explicitly states an original SEG educational synthesis and non-verbatim source use.'
    return 'Mixed Educational Content', 'Local educational structure is present, but the supplied source does not provide sufficient authorship evidence for SEG Original.'

for row in map_rows:
    cls, rationale = classification(row)
    row['final_classification'] = cls
    row['classification_rationale'] = rationale
    row['reg'] = register[row['candidate_record_id']]
    row['actual_path'] = SRC_ROOT / row['source_path']
    row['actual_sha'] = hashlib.sha256(row['actual_path'].read_bytes()).hexdigest()
    row['sha_match'] = row['actual_sha'] == row['sha256']

assert all(r['sha_match'] for r in map_rows)

# Source-supported QA field states copied from Phase 7.7.5 queue; no fields are repaired.
qb = {
'SRC-0003': ('MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','EXTRACTED'),
'SRC-0004': ('MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','EXTRACTED'),
'SRC-0068': ('MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','EXTRACTED'),
'SRC-0069': ('EXTRACTED','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','EXTRACTED'),
'SRC-0070': ('EXTRACTED','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','EXTRACTED'),
'SRC-0071': ('EXTRACTED','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','EXTRACTED'),
'SRC-0072': ('MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','EXTRACTED'),
'SRC-0074': ('EXTRACTED','EXTRACTED','EXTRACTED','EXTRACTED','EXTRACTED'),
'SRC-0075': ('MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','EXTRACTED','EXTRACTED'),
'SRC-0076': ('EXTRACTED','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','EXTRACTED','EXTRACTED'),
'SRC-0077': ('MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','EXTRACTED','EXTRACTED'),
'SRC-0078': ('EXTRACTED','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','EXTRACTED','EXTRACTED'),
'SRC-0079': ('EXTRACTED','EXTRACTED','EXTRACTED','MISSING_FROM_SOURCE','EXTRACTED'),
'SRC-0080': ('EXTRACTED','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','EXTRACTED','EXTRACTED'),
'SRC-0081': ('EXTRACTED','EXTRACTED','EXTRACTED','EXTRACTED','EXTRACTED'),
'SRC-0082': ('MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','EXTRACTED','EXTRACTED'),
'SRC-0083': ('MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','EXTRACTED'),
}
case_fields = {
'SRC-0033': ('EXTRACTED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','NOT_PRESENT_IN_EXTRACTION_REGISTER'),
'SRC-0034': ('UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','NOT_PRESENT_IN_EXTRACTION_REGISTER'),
'SRC-0035': ('UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','NOT_PRESENT_IN_EXTRACTION_REGISTER'),
'SRC-0037': ('EXTRACTED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','NOT_PRESENT_IN_EXTRACTION_REGISTER'),
'SRC-0038': ('UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','NOT_PRESENT_IN_EXTRACTION_REGISTER'),
'SRC-0039': ('UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','UNRESOLVED','NOT_PRESENT_IN_EXTRACTION_REGISTER'),
}
skill_fields = {
'SRC-0019': ('EXTRACTED','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','NOT_PRESENT_IN_EXTRACTION_REGISTER'),
'SRC-0020': ('EXTRACTED','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','NOT_PRESENT_IN_EXTRACTION_REGISTER'),
'SRC-0090': ('EXTRACTED','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','EXTRACTED','MISSING_FROM_SOURCE','EXTRACTED','NOT_PRESENT_IN_EXTRACTION_REGISTER'),
'SRC-0094': ('EXTRACTED','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','EXTRACTED','NOT_PRESENT_IN_EXTRACTION_REGISTER'),
'SRC-0095': ('EXTRACTED','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','MISSING_FROM_SOURCE','EXTRACTED','NOT_PRESENT_IN_EXTRACTION_REGISTER'),
}

by_source = {r['source_id']: r for r in map_rows}

def md_escape(text: str) -> str:
    return text.replace('|', '\\|').replace('\n', ' ')

def ref_block() -> str:
    return '''## References

[1]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_7_5_MEDICAL_OWNER_REVIEW_REGISTER.md "Phase 7.7.5 Medical Owner Review Register"
[2]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_7_5_CLINICAL_QA_QUEUE.md "Phase 7.7.5 Clinical QA Queue"
[3]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_7_CONTENT_EXTRACTION_REGISTER.md "Phase 7.7 Content Extraction Register"
[4]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv "Phase 7.6 Candidate Record Map"
[5]: file:///home/ubuntu/seg-internship-phase-5.6/staging/extracted/02_Internship "Preserved Internship source package"
[6]: file:///home/ubuntu/seg-manus-status/SEG_PROJECT_CONTINUITY_PACKAGE/03_CONTENT_PREPARATION_STATE/SEG_CONTENT_LIBRARY_GOVERNANCE/manifest.schema.json "Canonical v1.0 content manifest schema"
'''

# ---------- Final Medical Owner Decision ----------
origin_counts = Counter(r['final_classification'] for r in map_rows)
type_counts = Counter(r['target_type'] for r in map_rows)

lines = []
lines += [
'# SEG Phase 7.7.6 — Final Medical Owner Decision',
'',
'> **Status:** `MEDICAL_OWNER_REVIEW_CLOSED_FOR_PHASE_7_7_6` — controlled governance decision record only.',
'>',
'> **Target handoff state:** `READY_FOR_IMPORT_PREPARATION_REVIEW` — not production-ready, not rights-cleared, and not an activation or import authorization.',
'',
'**Decision timestamp:** `2026-08-21T10:03:00Z`  ',
'**Authority:** `SEG Project Owner — Emergency Medicine Specialist — Medical Educational Content Owner`  ',
'**Scope:** `48` candidates in the `02_Internship` / Internship Emergency Medicine Education review scope  ',
'**Audience:** Medical Intern Doctors  ',
'**Prepared by:** Manus AI under the supplied SEG governance instructions',
'',
'## 1. Authority and decision boundary',
'',
'This record documents the supplied Medical Owner decision for educational scope, content-origin classification, and the educational boundaries of Question Bank, Clinical Case, Clinical Skill, Lesson, and Book candidates. It does not certify clinical correctness, grant copyright or display rights, create a learner-facing record, or authorize import, activation, publication, or production exposure. The review remains bounded by the source, version, governance, clinical review, approval, and activation sequence.[1] [2] [3]',
'',
'Clinical review and rights review remain separate evidence streams. The present closure records the Medical Owner’s educational decision model and preserves unresolved source fields; it does not substitute for an independent rights review or a separately evidenced clinical approval.',
'',
'## 2. Applied Medical Owner decision model',
'',
'| Decision rule | Applied outcome | Evidence boundary |',
'|---|---|---|',
'| SEG-authored explanations | Classified as `SEG Original` only where the source itself explicitly states an original SEG educational synthesis or equivalent non-verbatim authorship evidence. | Four source files met this explicit evidence threshold: `SRC-0023`, `SRC-0027`, `SRC-0033`, and `SRC-0037`.[5] |',
'| Local structure with external or unresolved source basis | Classified as `Mixed Educational Content`; no ownership claim is inferred from a filename, folder, or educational format. | Applies conservatively to 40 non-book candidates without explicit authorship evidence. |',
'| External books/PDFs | Classified as `External Reference Based`; the files may serve as reference-framework inputs only. | No external-book ownership claim, verbatim reproduction, or learner display permission is created by this record. |',
'| Missing source fields | Remain `MISSING_FROM_SOURCE`, `UNRESOLVED`, or `NOT_PRESENT_IN_EXTRACTION_REGISTER`. | No reconstruction, correction, or clinical inference was performed.[2] [3] |',
'',
'## 3. Scope and provenance verification',
'',
'| Verification | Result |',
'|---|---|',
'| Candidate count | `48/48` preserved. |',
'| Candidate IDs | `48` unique IDs; register/map pair set equal. |',
'| Source IDs | `48` unique source IDs. |',
'| Source files | `48/48` exist under the preserved extracted source package. |',
'| SHA-256 | `48/48 MATCH` against the Phase 7.6 map and Phase 7.7.5 register. |',
'| Content types | `lesson=16`, `question_bank=17`, `clinical_case=6`, `clinical_skill=5`, `book=4`. |',
'| Duplicate lineage | `DUP-DRUG-001=6`, `DUP-EMERGENCY-001=6`, and `36` candidates with no duplicate marker in the input handoff. |',
'| Track scope | All candidates remain in `02_Internship`; explicit taxonomy/version confirmation remains a downstream metadata requirement. |',
'',
'## 4. Final educational classification summary',
'',
'| Final classification | Count | Decision meaning |',
'|---|---:|---|',
'| `SEG Original` | %d | Explicit source-level statement of original SEG educational synthesis; still subject to clinical and rights gates. |' % origin_counts['SEG Original'],
'| `Mixed Educational Content` | %d | Local educational structure combined with declared, pending, or unresolved source/reference basis; no unsupported ownership claim. |' % origin_counts['Mixed Educational Content'],
'| `External Reference Based` | %d | External book/PDF reference material only; no ownership or display-rights decision. |' % origin_counts['External Reference Based'],
'',
'## 5. Final decision for all 48 candidates',
'',
'Each row below preserves the candidate ID, source ID, path, SHA-256, duplicate lineage, duplicate role, framework evidence, and final educational classification. The decision is closed for this governance phase while the listed blockers remain open for later review.',
'',
'| Candidate | Source ID | Type | Source path | SHA-256 | Lineage | Role | Final classification | Declared framework evidence | Phase 7.7.6 decision |',
'|---|---|---|---|---|---|---|---|---|---|',
]
for r in map_rows:
    fw = r['reg']['framework']
    decision = 'OWNER_DECISION_RECORDED; RETAIN_SOURCE_AND_CLASSIFICATION'
    lines.append('| `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | %s | `%s` |' % (
        r['candidate_record_id'], r['source_id'], r['target_type'], md_escape(r['source_path']), r['sha256'],
        r['duplicate_lineage'], r['duplicate_role'], r['final_classification'], md_escape(fw), decision))

lines += [
'',
'## 6. Question Bank Medical Owner closure — 17 candidates',
'',
'The Question Bank review checked the five required review dimensions: question, options, answer, explanation, and reference linkage. The status below is a closure of the field audit and owner decision boundary, not a certification that the medical answer is correct. Missing fields remain flagged exactly as supplied by the Phase 7.7.5 queue.[2] [3]',
'',
'| Source ID | Candidate | Question | Options | Answer | Explanation | Reference | Closure decision | Remaining blockers |',
'|---|---|---|---|---|---|---|---|---|',
]
for r in map_rows:
    if r['target_type'] != 'question_bank':
        continue
    q, o, a, e, ref = qb[r['source_id']]
    missing = ', '.join(f for f, s in [('question',q),('options',o),('answer',a),('explanation',e),('reference',ref)] if s != 'EXTRACTED')
    blockers = 'Missing fields: ' + (missing if missing else 'none') + '; independent clinical review evidence; rights/display-scope review; source version/publisher/owner/taxonomy evidence.'
    lines.append('| `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `CLOSED_WITH_FIELD_FLAGS` | %s |' % (r['source_id'], r['candidate_record_id'], q, o, a, e, ref, blockers))

lines += [
'',
'## 7. Clinical Case educational boundary closure — 6 candidates',
'',
'The Medical Owner boundary decision confirms that the six Clinical Case candidates are intended as emergency-medicine educational case structures, not patient records, clinical protocols, competency approvals, or authorization records. This does not fill unresolved clinical fields or replace qualified clinical review. The case structure is therefore closed as an educational boundary while content completeness remains open.[2] [3]',
'',
'| Source ID | Candidate | Presentation | History | Examination | Investigations | Assessment | Differential | Management | Clinical reasoning | Boundary decision | Remaining blockers |',
'|---|---|---|---|---|---|---|---|---|---|---|---|',
]
for r in map_rows:
    if r['target_type'] != 'clinical_case':
        continue
    vals = case_fields[r['source_id']]
    missing = ', '.join(name for name, state in zip(['presentation','history','examination','investigations','assessment','differential','management','clinical_reasoning'], vals) if state != 'EXTRACTED')
    lines.append('| `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `EDUCATIONAL_CASE_BOUNDARY_CONFIRMED; NOT_A_PATIENT_RECORD` | Unresolved/not-present fields: %s; independent clinical review; rights/display-scope review; source version/publisher/owner/taxonomy evidence. |' % ((r['source_id'], r['candidate_record_id']) + vals + (missing,)))

lines += [
'',
'## 8. Clinical Skill educational framework closure — 5 candidates',
'',
'The five Clinical Skill candidates are confirmed for educational skill-framework use only. They do not create a learner competency record, procedure authorization, or sign-off. Missing skill fields remain missing, and the framework confirmation does not certify procedural safety or competency.[2] [3]',
'',
'| Source ID | Candidate | Skill name | Indication | Contraindication | Steps | Equipment | Assessment method | Competency level | Boundary decision | Remaining blockers |',
'|---|---|---|---|---|---|---|---|---|---|---|',
]
for r in map_rows:
    if r['target_type'] != 'clinical_skill':
        continue
    vals = skill_fields[r['source_id']]
    missing = ', '.join(name for name, state in zip(['skill_name','indication','contraindication','steps','equipment','assessment_method','competency_level'], vals) if state != 'EXTRACTED')
    lines.append('| `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `EDUCATIONAL_FRAMEWORK_ONLY; NO_SIGN_OFF_OR_AUTHORIZATION` | Missing/not-present fields: %s; independent clinical review; rights/display-scope review; source version/publisher/owner/taxonomy evidence. |' % ((r['source_id'], r['candidate_record_id']) + vals + (missing,)))

lines += [
'',
'## 9. Book and Reference Framework closure — 4 candidates',
'',
'The four PDF candidates remain `External Reference Based`. Their intended design role is `content_type=book` with a future/reference relationship, not copied learner-facing text. Framework name, edition/version, locator, rights status, and display scope must be independently established before any display or import preparation decision. This record does not clear rights.[1] [2] [4]',
'',
'| Source ID | Candidate | Source path | SHA-256 | Final classification | Reference decision | Remaining blockers |',
'|---|---|---|---|---|---|---|',
]
for r in map_rows:
    if r['target_type'] != 'book':
        continue
    lines.append('| `%s` | `%s` | `%s` | `%s` | `External Reference Based` | `REFERENCE_FRAMEWORK_ONLY; NO_OWNERSHIP_CLAIM` | Independent rights review, source identity/version/publisher/owner, locator policy, display scope, track/taxonomy evidence. |' % (r['source_id'], r['candidate_record_id'], md_escape(r['source_path']), r['sha256']))

lines += [
'',
'## 10. Duplicate lineage decisions',
'',
'| Lineage family | Historical lineage preserved | Primary educational candidates | Medical Owner decision | Restrictions |',
'|---|---|---|---|---|',
'| `DUP-DRUG-001` | `SRC-0023`, `SRC-0024`, `SRC-0025` | `SRC-0027`, `SRC-0028`, `SRC-0029` | Preserve all six source records and their SHA-256 values; use the v2 pack as the primary educational candidate ordering for later import-preparation review. | No deletion, merge, overwrite, or source modification. |',
'| `DUP-EMERGENCY-001` | `SRC-0033`, `SRC-0034`, `SRC-0035` | `SRC-0037`, `SRC-0038`, `SRC-0039` | Preserve all six source records and their SHA-256 values; use the v2 pack as the primary educational candidate ordering for later import-preparation review. | No deletion, merge, overwrite, or source modification. |',
'',
'## 11. Rights, clinical review, and implementation separation',
'',
'Rights review remains an independent stream covering text, images, questions, references, display scope, and any applicable license or permission. The `External Reference Based` classification is not rights clearance. Likewise, the present owner decision does not replace a separately attributable clinical-review record with decision, date, cited locations, and unresolved-issue disposition. Import, activation, publication, and learner exposure remain outside this phase.[1] [2]',
'',
'## 12. Explicit non-actions',
'',
'| Non-action | Result |',
'|---|---|',
'| Production JSON generation | Not performed. |',
'| Import or database write | Not performed. |',
'| Activation or learner exposure | Not performed. |',
'| Publication/deployment | Not performed. |',
'| Application, authentication, schema, or database modification | Not performed. |',
'| Original source modification | Not performed; source package remains preserved. |',
'| Copyright ownership claim over external books | Not made. |',
'| Verbatim reproduction of external material | Not performed. |',
'',
'## 13. Next allowed phase',
'',
'**Next allowed phase:** `Import Preparation Review` in a separate controlled phase. It must remain a dry-run/readiness activity until independent rights review, clinical review evidence, metadata closure, and explicit implementation authorization are supplied. The current state is not `PRODUCTION_READY`.',
'',
ref_block(),
]
DECISION_PATH = OUT / 'SEG_PHASE_7_7_6_FINAL_MEDICAL_OWNER_DECISION.md'
DECISION_PATH.write_text('\n'.join(lines), encoding='utf-8')

# ---------- Clinical QA Closure Register ----------
q_lines = [
'# SEG Phase 7.7.6 — Clinical QA Closure Register',
'',
'> **Status:** `QA_CLOSURE_COMPLETE_WITH_OPEN_DEPENDENCIES` — field audit and educational-boundary closure only.',
'>',
'> **Overall handoff:** `READY_FOR_IMPORT_PREPARATION_REVIEW`; this is not clinical approval, rights clearance, production authorization, import, activation, or publication.',
'',
'**Closure timestamp:** `2026-08-21T10:03:00Z`  ',
'**QA mode:** Read-only, fail-closed, source-linked governance QA  ',
'**Scope:** 48 candidate records from Phase 7.7.5  ',
'',
'## 1. QA closure interpretation',
'',
'QA closure in this register means that the Phase 7.7.6 review dimensions were recorded, source identifiers and checksums were rechecked, educational boundaries were documented, and missing fields were retained as flags. It does not mean that a structurally incomplete candidate is importable or that medical correctness, copyright rights, or learner exposure has been approved.[1] [2] [3] [4]',
'',
'## 2. Closure status vocabulary',
'',
'| Status | Meaning |',
'|---|---|',
'| `CLOSED_FOR_PHASE_7_7_6` | Provenance, classification, lineage, and phase decision are recorded; downstream gates remain separate. |',
'| `CLOSED_WITH_FIELD_FLAGS` | The required field audit is closed, but source-missing or unresolved fields remain explicitly flagged. |',
'| `CLOSED_WITH_RIGHTS_BLOCKER` | The external-reference boundary is closed, but rights/display evidence is absent or separate. |',
'| `BLOCKED_FOR_IMPORT` | The candidate is not eligible for import based on missing metadata, clinical, rights, or implementation evidence. |',
'',
'## 3. Candidate-level QA closure register',
'',
'| Candidate | Source ID | Type | SHA match | Lineage | Final classification | Phase 7.7.6 QA closure | Remaining blockers |',
'|---|---|---|---|---|---|---|---|',
]
for r in map_rows:
    if r['target_type'] == 'book':
        status = 'CLOSED_WITH_RIGHTS_BLOCKER'
    elif r['target_type'] == 'question_bank':
        status = 'CLOSED_WITH_FIELD_FLAGS'
    elif r['target_type'] in ('clinical_case','clinical_skill'):
        status = 'CLOSED_WITH_FIELD_FLAGS'
    else:
        status = 'CLOSED_FOR_PHASE_7_7_6'
    if r['target_type'] == 'question_bank':
        vals = qb[r['source_id']]
        missing = ', '.join(name for name, state in zip(['question','options','answer','explanation','reference'], vals) if state != 'EXTRACTED')
        block = 'Missing fields: %s; independent clinical review; rights review; metadata completion; implementation authorization.' % (missing or 'none')
    elif r['target_type'] == 'clinical_case':
        vals = case_fields[r['source_id']]
        missing = ', '.join(name for name, state in zip(['presentation','history','examination','investigations','assessment','differential','management','clinical_reasoning'], vals) if state != 'EXTRACTED')
        block = 'Unresolved/not-present fields: %s; independent clinical review; rights review; metadata completion; implementation authorization.' % missing
    elif r['target_type'] == 'clinical_skill':
        vals = skill_fields[r['source_id']]
        missing = ', '.join(name for name, state in zip(['skill_name','indication','contraindication','steps','equipment','assessment_method','competency_level'], vals) if state != 'EXTRACTED')
        block = 'Missing/not-present fields: %s; independent clinical review; rights review; metadata completion; implementation authorization.' % missing
    elif r['target_type'] == 'book':
        block = 'Independent rights/display-scope review; reference identity/version/locator; metadata completion; implementation authorization.'
    else:
        block = 'Lesson completeness and clinical review evidence; source version/publisher/owner; rights scope; taxonomy/version; implementation authorization.'
    if r['duplicate_lineage'] != 'NO_DUPLICATE_MARKER_IN_INPUT_HANDOFF':
        block += ' Duplicate family ordering preserved; no merge/delete action.'
    q_lines.append('| `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | %s |' % (r['candidate_record_id'], r['source_id'], r['target_type'], 'PASS' if r['sha_match'] else 'FAIL', r['duplicate_lineage'], r['final_classification'], status, block))

q_lines += [
'',
'## 4. Question Bank field closure',
'',
'| Source ID | Question | Options | Answer | Explanation | Reference | QA result |',
'|---|---|---|---|---|---|---|',
]
for sid, vals in qb.items():
    q_lines.append('| `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `FIELD_AUDIT_CLOSED; MISSING_FIELDS_RETAINED` |' % ((sid,) + vals))
q_lines += [
'',
'All five required Question Bank dimensions were checked. The source-supported `EXTRACTED` values were not rewritten, while `MISSING_FROM_SOURCE` values remain blockers for any later recordization or import-preparation decision. Even candidates with all five fields extracted remain subject to independent clinical and rights gates.',
'',
'## 5. Clinical Case field closure',
'',
'| Source ID | Presentation | History | Examination | Investigations | Assessment | Differential | Management | Clinical reasoning | QA result |',
'|---|---|---|---|---|---|---|---|---|---|',
]
for sid, vals in case_fields.items():
    q_lines.append('| `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `EDUCATIONAL_BOUNDARY_CLOSED; FIELD_GAPS_RETAINED` |' % ((sid,) + vals))
q_lines += [
'',
'The case QA confirms educational-case framing only. It does not interpret any candidate as a patient record and does not create a protocol, competency approval, or authorization. Unresolved and not-present fields remain unchanged.',
'',
'## 6. Clinical Skill field closure',
'',
'| Source ID | Skill name | Indication | Contraindication | Steps | Equipment | Assessment method | Competency level | QA result |',
'|---|---|---|---|---|---|---|---|---|',
]
for sid, vals in skill_fields.items():
    q_lines.append('| `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `%s` | `EDUCATIONAL_FRAMEWORK_CLOSED; NO_SIGN_OFF_OR_AUTHORIZATION` |' % ((sid,) + vals))
q_lines += [
'',
'The skill QA confirms educational framework scope only. It does not establish learner competency, authorize a procedure, or create a sign-off record. Missing and not-present fields remain unchanged.',
'',
'## 7. Gate summary',
'',
'| Gate | Result | Evidence / blocker |',
'|---|---|---|',
'| Candidate identity and source SHA | `PASS` | 48/48 source files exist and match the recorded SHA-256 values. |',
'| Type and origin classification | `PASS_FOR_PHASE` | All 48 candidates classified using the evidence-bound model; no unsupported SEG Original assignment. |',
'| Duplicate lineage | `PASS_FOR_PHASE` | DUP-DRUG-001 and DUP-EMERGENCY-001 preserved with historical/primary roles; no destructive action. |',
'| Question Bank field audit | `PASS_WITH_FLAGS` | 17 candidates checked; missing question/options/answer/explanation/reference values remain flagged. |',
'| Clinical Case boundary audit | `PASS_WITH_FLAGS` | 6 candidates confirmed as educational-case scope only; unresolved fields remain. |',
'| Clinical Skill boundary audit | `PASS_WITH_FLAGS` | 5 candidates confirmed as educational-framework scope only; missing fields remain. |',
'| Metadata completeness | `BLOCKED` | Owner, publisher, version, taxonomy/version, rights scope, and precise locator gaps remain in the candidate map. |',
'| Independent clinical review | `BLOCKED` | This package does not certify clinical correctness or replace an attributable clinical-review record. |',
'| Rights review | `BLOCKED` | Rights and display scope remain a separate review stream, especially for external PDFs and any verbatim display. |',
'| Implementation authorization | `BLOCKED` | No import, activation, publication, or learner exposure authorization exists in this phase. |',
'',
'## 8. Audit trail',
'',
'| Event | Evidence artifact | Observed/recorded time | Audit statement |',
'|---|---|---|---|',
'| Candidate mapping | Phase 7.6 Candidate Record Map | Predecessor evidence | 48 source-linked candidate mappings retained with SHA and duplicate lineage. |',
'| Source extraction | Phase 7.7 Content Extraction Register | `2026-08-21T09:49:37Z` | Source-supported fields recorded; missing and unresolved fields preserved. |',
'| Medical Owner review preparation | Phase 7.7.5 Review Register and QA Queue | `2026-08-21T09:55:02Z` | Review owner, provisional origin classes, and QA queues assigned. |',
'| Final owner decision closure | This Phase 7.7.6 Decision and QA Register | `2026-08-21T10:03:00Z` | Educational origin and boundary decisions recorded; no approval, import, activation, or publication performed. |',
'',
'## 9. Explicit non-actions',
'',
'| Non-action | Result |',
'|---|---|',
'| Content modification or clinical correction | Not performed. |',
'| Production JSON generation | Not performed. |',
'| Import/database write | Not performed. |',
'| Activation/publication/learner exposure | Not performed. |',
'| Application, schema, authentication, or database changes | Not performed. |',
'| Rights clearance or ownership claim | Not performed; external books remain reference-only. |',
'',
'## 10. Next allowed phase',
'',
'**Next allowed phase:** `Import Preparation Review`, limited to a separately authorized dry-run/readiness package. Any import, activation, publication, or learner exposure requires new, explicit authorization after clinical and rights evidence are separately closed.',
'',
ref_block(),
]
QA_PATH = OUT / 'SEG_PHASE_7_7_6_CLINICAL_QA_CLOSURE_REGISTER.md'
QA_PATH.write_text('\n'.join(q_lines), encoding='utf-8')

# ---------- Gate Report ----------
def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()

decision_sha = sha(DECISION_PATH)
qa_sha = sha(QA_PATH)
input_hashes = [
    (MAP_PATH, 'Phase 7.6 candidate map'),
    (REGISTER_PATH, 'Phase 7.7.5 Medical Owner review register'),
    (QUEUE_PATH, 'Phase 7.7.5 clinical QA queue'),
    (EXTRACTION_PATH, 'Phase 7.7 content extraction register'),
]

g = [
'# SEG Phase 7.7.6 — Gate Report',
'',
'> **FINAL STATUS:** `READY_FOR_IMPORT_PREPARATION_REVIEW`',
'>',
'> **Important:** This status is a controlled handoff readiness state only. It is not `PRODUCTION_READY`, rights clearance, clinical approval, import authorization, activation authorization, publication approval, or learner exposure.',
'',
'**Gate timestamp:** `2026-08-21T10:03:00Z`  ',
'**Authority:** `SEG Project Owner — Emergency Medicine Specialist — Medical Educational Content Owner`  ',
'**Mode:** Controlled Medical Governance Review — read-only closure  ',
'**Scope:** 48 candidates / `02_Internship` / Internship Emergency Medicine Education  ',
'',
'## 1. Decision',
'',
'The Phase 7.7.6 Medical Owner review package is closed for its authorized scope. All 48 candidate identities, source paths, SHA-256 values, duplicate lineage, and source-supported QA field statuses were preserved. The final educational classifications are recorded as `SEG Original=4`, `Mixed Educational Content=40`, and `External Reference Based=4`. The package may proceed only to a separately controlled Import Preparation Review.',
'',
'## 2. Gate matrix',
'',
'| Gate | Result | Evidence | Limitation / blocker |',
'|---|---|---|---|',
'| Scope completeness | `PASS` | 48/48 candidates represented; type counts 16 lesson, 17 question_bank, 6 clinical_case, 5 clinical_skill, 4 book. | None for this phase. |',
'| Provenance and SHA | `PASS` | 48/48 source files exist and match the Phase 7.6 candidate map. | Version, publisher, owner, and precise locator gaps remain where predecessor records mark them open. |',
'| Origin classification | `PASS_FOR_PHASE` | Evidence-bound classification: 4 SEG Original, 40 Mixed, 4 External Reference Based. | Classification does not clear rights or certify clinical correctness. |',
'| Question Bank review | `PASS_WITH_FLAGS` | 17 candidates checked for question/options/answer/explanation/reference. | Missing fields remain flagged; no answer correctness approval is granted. |',
'| Clinical Case review | `PASS_WITH_FLAGS` | 6 candidates bounded as educational emergency-medicine cases, not patient records. | Unresolved/not-present clinical fields remain; no protocol or clinical approval is created. |',
'| Clinical Skill review | `PASS_WITH_FLAGS` | 5 candidates bounded as educational skill frameworks only. | Missing fields remain; no competency record, sign-off, or authorization is created. |',
'| Book/reference review | `PASS_WITH_FLAGS` | 4 PDFs classified as external reference-based material. | Rights, display scope, locator, and version evidence remain separate blockers. |',
'| Track/taxonomy | `BLOCKED_FOR_IMPORT` | All candidates remain scoped to `02_Internship`. | Explicit taxonomy ID/version and pathway confirmation remain open in the candidate map. |',
'| Clinical governance | `BLOCKED_FOR_IMPORT` | Medical Owner educational decision recorded. | Independent attributable clinical-review evidence and clinical approval are not replaced by this record. |',
'| Rights governance | `BLOCKED_FOR_IMPORT` | Rights stream explicitly preserved as separate. | No rights clearance or display permission is granted. |',
'| Implementation authorization | `BLOCKED_FOR_IMPORT` | No production action performed. | Import, activation, publication, and learner exposure remain unauthorized. |',
'',
'## 3. Provenance, lineage, and classification counts',
'',
'| Measure | Result |',
'|---|---|',
'| Source files verified | `48/48` |',
'| SHA-256 matches | `48/48` |',
'| Unique candidate IDs | `48` |',
'| Unique source IDs | `48` |',
'| `DUP-DRUG-001` | 6 preserved: 3 historical lineage, 3 primary educational candidates. |',
'| `DUP-EMERGENCY-001` | 6 preserved: 3 historical lineage, 3 primary educational candidates. |',
'| No duplicate marker | 36 candidates. |',
'| Final `SEG Original` | 4 candidates with explicit source-level original-synthesis evidence. |',
'| Final `Mixed Educational Content` | 40 candidates with insufficient explicit authorship evidence for SEG Original. |',
'| Final `External Reference Based` | 4 external PDF/book candidates. |',
'',
'## 4. Artifact hashes',
'',
'| Artifact | SHA-256 | Role |',
'|---|---|---|',
'| `SEG_PHASE_7_7_6_FINAL_MEDICAL_OWNER_DECISION.md` | `%s` | Final owner decision register. |' % decision_sha,
'| `SEG_PHASE_7_7_6_CLINICAL_QA_CLOSURE_REGISTER.md` | `%s` | Candidate-level QA closure register. |' % qa_sha,
]
for path, label in input_hashes:
    g.append('| `%s` | `%s` | %s. |' % (path.name, sha(path), label))
g += [
'',
'`SEG_PHASE_7_7_6_GATE_REPORT.md` is hashed after write as part of final execution verification; its post-write SHA is reported in the handoff message and is intentionally not embedded inside the file to avoid a self-referential hash.',
'',
'## 5. Explicit non-actions and safety confirmation',
'',
'| Restricted action | Confirmation |',
'|---|---|',
'| Production JSON generation | Not performed. |',
'| Content import or database write | Not performed. |',
'| Activation, publication, or learner exposure | Not performed. |',
'| Application, database, schema, authentication, or security-boundary change | Not performed. |',
'| Original source modification | Not performed. |',
'| Verbatim reproduction of external books | Not performed. |',
'| External rights clearance | Not performed; remains a separate gate. |',
'| Clinical correctness certification | Not performed; remains a separate qualified-review gate. |',
'',
'## 6. Remaining blockers',
'',
'The next phase must not treat this gate as production readiness. Remaining blockers include independent clinical review evidence, rights and display-scope review, source metadata completion for owner/publisher/version/taxonomy/precise locator, and a separate implementation authorization. Missing Question Bank, Clinical Case, and Clinical Skill fields remain exactly as flagged in the QA closure register.',
'',
'## 7. Next allowed phase',
'',
'**Allowed next phase:** `Import Preparation Review`, restricted to a controlled, read-only or dry-run preparation package. Any production JSON generation, import, activation, publication, or learner exposure requires a new explicit authorization and passing downstream gates.',
'',
ref_block(),
]
GATE_PATH = OUT / 'SEG_PHASE_7_7_6_GATE_REPORT.md'
GATE_PATH.write_text('\n'.join(g), encoding='utf-8')
print('created', DECISION_PATH)
print('created', QA_PATH)
print('created', GATE_PATH)
print('decision_sha', decision_sha)
print('qa_sha', qa_sha)
print('gate_sha', sha(GATE_PATH))
print('source_sha_matches', sum(1 for r in map_rows if r['sha_match']), '/', len(map_rows))
print('class_counts', dict(sorted(origin_counts.items())))
