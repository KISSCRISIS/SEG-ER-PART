from __future__ import annotations

import csv
import hashlib
import json
import re
from collections import Counter
from pathlib import Path

OUT = Path('/home/ubuntu/seg-internship-output')
SCHEMA_PATH = Path('/home/ubuntu/seg-manus-status/schemas/SEG_CONTENT_RECORD_V1_1/SEG_CONTENT_RECORD_V1_1.schema.json')
MAP_PATH = OUT / 'SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv'
EXTRACT_PATH = OUT / 'SEG_PHASE_7_7_CONTENT_EXTRACTION_REGISTER.md'
DECISION_PATH = OUT / 'SEG_PHASE_7_7_6_FINAL_MEDICAL_OWNER_DECISION.md'
QA_PATH = OUT / 'SEG_PHASE_7_7_6_CLINICAL_QA_CLOSURE_REGISTER.md'

MAP_OUT = OUT / 'SEG_PHASE_7_8_IMPORT_PREPARATION_MAP.md'
BLUEPRINT_OUT = OUT / 'SEG_PHASE_7_8_JSON_BLUEPRINT.md'
FIELD_OUT = OUT / 'SEG_PHASE_7_8_FIELD_MAPPING_VALIDATION.md'
DUP_OUT = OUT / 'SEG_PHASE_7_8_DUPLICATE_HANDLING_PLAN.md'
GATE_OUT = OUT / 'SEG_PHASE_7_8_GATE_REPORT.md'


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def clean(value: str) -> str:
    return value.strip().strip('`').strip()


def parse_pipe_rows(path: Path, prefix: str, min_cells: int):
    rows = {}
    for line in path.read_text(encoding='utf-8').splitlines():
        if not line.startswith(prefix):
            continue
        cells = [clean(c) for c in line.strip().strip('|').split('|')]
        if len(cells) >= min_cells and re.fullmatch(r'CAND-7\.6-SRC-\d{4}', cells[0]):
            rows[cells[0]] = cells
    return rows


map_rows = list(csv.DictReader(MAP_PATH.open(encoding='utf-8'), delimiter='\t'))
assert len(map_rows) == 48
map_by_id = {r['candidate_record_id']: r for r in map_rows}
assert len(map_by_id) == 48

# Parse the authoritative Phase 7.7.6 decision table.
decision_rows_raw = parse_pipe_rows(DECISION_PATH, '| `CAND-7.6-', 10)
assert len(decision_rows_raw) == 48, len(decision_rows_raw)
decision_by_id = {}
for cid, cells in decision_rows_raw.items():
    decision_by_id[cid] = {
        'source_id': cells[1],
        'content_type': cells[2],
        'source_path': cells[3],
        'sha256': cells[4],
        'lineage': cells[5],
        'role': cells[6],
        'classification': cells[7],
        'framework': cells[8],
    }

# Parse the authoritative Phase 7.7.6 QA closure table.
qa_rows_raw = parse_pipe_rows(QA_PATH, '| `CAND-7.6-', 8)
assert len(qa_rows_raw) == 48, len(qa_rows_raw)
qa_by_id = {}
for cid, cells in qa_rows_raw.items():
    qa_by_id[cid] = {
        'source_id': cells[1],
        'content_type': cells[2],
        'sha_match': cells[3],
        'lineage': cells[4],
        'classification': cells[5],
        'qa_status': cells[6],
        'remaining_blockers': cells[7],
    }

# Parse source-only field statuses from the extraction register.
extraction = EXTRACT_PATH.read_text(encoding='utf-8')
field_states: dict[str, dict[str, str]] = {}
current = None
for line in extraction.splitlines():
    m = re.match(r'## (CAND-7\.6-SRC-\d{4}) —', line)
    if m:
        current = m.group(1)
        field_states[current] = {}
        continue
    if current and line.startswith('| `'):
        cells = [clean(c) for c in line.strip().strip('|').split('|')]
        if len(cells) >= 2 and cells[0] not in {'Field', '---'}:
            field_states[current][cells[0]] = cells[1]
assert len(field_states) == 48, len(field_states)

schema = json.loads(SCHEMA_PATH.read_text(encoding='utf-8'))
allowed_types = schema['properties']['content_type']['enum']
assert allowed_types == ['lesson', 'question_bank', 'book', 'clinical_case', 'clinical_skill']

# Cross-check the five authority artifacts before writing anything.
for cid, row in map_by_id.items():
    assert cid in decision_by_id and cid in qa_by_id and cid in field_states
    d = decision_by_id[cid]
    q = qa_by_id[cid]
    assert row['source_id'] == d['source_id'] == q['source_id']
    assert row['target_type'] == d['content_type'] == q['content_type']
    assert row['source_path'] == d['source_path']
    assert row['sha256'] == d['sha256']
    assert row['duplicate_lineage'] == d['lineage'] == q['lineage']
    assert d['classification'] == q['classification']
    assert row['target_type'] in allowed_types
    assert re.fullmatch(r'[0-9a-fA-F]{64}', row['sha256'])

class_counts = Counter(r['target_type'] for r in map_rows)
classification_counts = Counter(d['classification'] for d in decision_by_id.values())
assert class_counts == Counter({'lesson': 16, 'question_bank': 17, 'clinical_case': 6, 'clinical_skill': 5, 'book': 4})
assert classification_counts == Counter({'Mixed Educational Content': 40, 'SEG Original': 4, 'External Reference Based': 4})

# Shared blockers preserved for every candidate; candidate-specific source/QA blockers are appended below.
shared_blockers = (
    'OWNER_NOT_SUPPLIED;PUBLISHER_NOT_SUPPLIED;SOURCE_VERSION_NOT_SUPPLIED;'
    'TAXONOMY_ID_AND_VERSION_NOT_SUPPLIED;RIGHTS_SCOPE_NOT_CLASSIFIED;'
    'PRECISE_CONTENT_LOCATOR_NOT_SUPPLIED;PATHWAY_TRACK_REQUIRES_EXPLICIT_SOURCE_CONFIRMATION;'
    'EXTERNAL_CLINICAL_APPROVAL_NOT_CLAIMED'
)

# 1) Import preparation map.
map_lines = [
    '# SEG Phase 7.8 — Import Preparation Map',
    '',
    '> **Status:** Controlled preparation only. Every candidate remains `BLOCKED_PENDING_FINAL_GATES`; no candidate is production-ready.',
    '>',
    '> This map preserves the Phase 7.7.6 decision baseline. It does not create records, normalize identifiers, fill missing fields, or authorize Phase 7.9.',
    '',
    '## 1. Authority and preservation contract',
    '',
    'The map was generated only from the five authorized Phase 7.8 inputs. Candidate identity, source identity, content type, SHA-256, duplicate lineage, and final educational classification were cross-checked before writing. The declared pathway scope is `SEG Internship Doctor Pathway / 02_Internship`; explicit source confirmation for pathway/track remains pending where flagged by the source map.',
    '',
    '| Authority input | SHA-256 | Use |',
    '|---|---|---|',
]
for p, use in [
    (MAP_PATH, 'Candidate/source/SHA/lineage baseline'),
    (EXTRACT_PATH, 'Source-only field states'),
    (DECISION_PATH, 'Medical Owner classification and provenance baseline'),
    (QA_PATH, 'QA closure status and remaining blockers'),
    (SCHEMA_PATH, 'SEG_CONTENT_RECORD_V1_1 target vocabulary and structure'),
]:
    map_lines.append(f'| `{p.name}` | `{sha(p)}` | {use} |')
map_lines += [
    '',
    '## 2. Candidate-level preparation map',
    '',
    '| Candidate ID | Source ID | SHA-256 | content_type | Final classification | Pathway/track state | Metadata state | Unresolved blockers | Target v1.1 object | Import readiness |',
    '|---|---|---|---|---|---|---|---|---|---|',
]
for row in map_rows:
    cid = row['candidate_record_id']
    d = decision_by_id[cid]
    q = qa_by_id[cid]
    target = f"`content_type={row['target_type']}`"
    if row['target_type'] == 'clinical_case':
        target += '; `content` → clinicalCase object'
    elif row['target_type'] == 'clinical_skill':
        target += '; `content` → clinicalSkill object'
    elif row['target_type'] == 'book':
        target += '; optional `relationships.reference_framework` only when independently mapped'
    else:
        target += '; no `content` object under v1.1 conditional profile'
    blockers = '; '.join(filter(None, [row['blockers'], q['remaining_blockers'], 'RECORD_ID_PATTERN_COMPATIBILITY_PENDING'])).replace('|', '/')
    track_state = 'SEG Internship Doctor Pathway / `02_Internship`; explicit source-level pathway confirmation pending'
    map_lines.append(
        f"| `{cid}` | `{row['source_id']}` | `{row['sha256']}` | `{row['target_type']}` | `{d['classification']}` | {track_state} | `{row['metadata_status']}`; review `{row['medical_review_status']}`; rights `{row['rights_status']}`; closure `{row['closure_status']}` | {blockers} | {target} | `BLOCKED_PENDING_FINAL_GATES` |"
    )
map_lines += [
    '',
    '## 3. Coverage summary',
    '',
    '| Check | Result |',
    '|---|---|',
    f"| Candidate rows | `48/48` |",
    f"| Content types | `lesson=16`, `question_bank=17`, `clinical_case=6`, `clinical_skill=5`, `book=4` |",
    f"| Final classifications | `SEG Original=4`, `Mixed Educational Content=40`, `External Reference Based=4` |",
    '| Candidate readiness | `48/48 BLOCKED_PENDING_FINAL_GATES`; no production-ready record |',
    '| SHA preservation in handoff | `48/48` map values cross-checked against Phase 7.7.6 decision rows |',
    '| Medical review | Phase 7.7.6 educational decision preserved; independent clinical review remains separate |',
    '| Rights | External/reference rights state remains open and independent |',
    '',
    '## 4. Readiness interpretation',
    '',
    'This is a preparation map, not an import manifest. The `BLOCKED_PENDING_FINAL_GATES` value is intentional for every candidate because metadata, source-version evidence, taxonomy/version, rights scope, clinical review, field completeness, identifier compatibility, and implementation authorization are not closed by this artifact. Missing and unresolved fields remain unchanged and are not replaced with placeholders that could be mistaken for evidence.',
    '',
    '## References',
    '',
    f'[1]: file://{MAP_PATH} "Phase 7.6 candidate record map"',
    f'[2]: file://{EXTRACT_PATH} "Phase 7.7 content extraction register"',
    f'[3]: file://{DECISION_PATH} "Phase 7.7.6 Final Medical Owner Decision"',
    f'[4]: file://{QA_PATH} "Phase 7.7.6 Clinical QA Closure Register"',
    f'[5]: file://{SCHEMA_PATH} "SEG Content Record v1.1 schema profile"',
]
MAP_OUT.write_text('\n'.join(map_lines) + '\n', encoding='utf-8')

# 2) Template-only blueprint. It intentionally uses tables rather than executable or candidate JSON.
blueprint_lines = [
    '# SEG Phase 7.8 — JSON Blueprint (Template Only)',
    '',
    '> **Status:** Non-production blueprint. This document defines field placement only; it contains no candidate JSON, no generated medical record, and no import payload.',
    '',
    '## 1. Envelope template for all five content types',
    '',
    '| v1.1 field | Template source/evidence | Preparation rule |',
    '|---|---|---|',
    '| `record_id` | Candidate ID from the candidate map | Preserve identity evidence; do not silently lowercase or normalize. v1.1 lowercase pattern compatibility remains blocked. |',
    '| `title` | Extraction register when `EXTRACTED` | Map only source-supported title evidence. |',
    '| `content_type` | `target_type` from candidate map | Must be one of `lesson`, `question_bank`, `book`, `clinical_case`, `clinical_skill`. |',
    '| `language` | Not supplied by the authorized preparation inputs as a complete v1.1 field | `MISSING_FROM_SOURCE`; do not infer. |',
    '| `source` | `source_id`, source path, owner/publisher/access evidence | Preserve source ID and location; missing owner/publisher/access fields remain flagged. |',
    '| `version` | SHA-256 from candidate map plus source version evidence | Preserve checksum; version value remains missing when not supplied. |',
    '| `references` | Extraction register reference status | Preserve source locator status; do not create citations. |',
    '| `rights` | Candidate map rights state and separate review stream | `PENDING_EXTERNAL_EVIDENCE` until independently reviewed. |',
    '| `taxonomy` | Explicit taxonomy evidence only | `MISSING_FROM_SOURCE` / pending; do not derive from filename or topic. |',
    '| `medical_review` | Observed Phase 7.7.6 status | Preserve as governance evidence; do not convert educational closure into clinical approval. |',
    '| `audit` | Existing append-only governance evidence | Map only supplied events; no fabricated reviewer, date, or approval event. |',
    '| `content` | Required only for `clinical_case` and `clinical_skill` by v1.1 | Use source-section states; absent/unresolved sections stay flagged. |',
    '| `relationships` | `reference_framework` when explicitly supported | Preserve reference-only boundary; do not create a generic reference type. |',
    '',
    '## 2. `lesson` template',
    '',
    'The template uses the v1.1 envelope with `content_type=lesson`. Source-supported title, educational objective, teaching-section headings, key-learning headings, and explicit references may be mapped only when their extraction status is `EXTRACTED`. Missing lesson content, owner/publisher, version, taxonomy, rights, and review evidence remain flagged. The v1.1 conditional profile rejects a `content` object for this type; no content object is generated here.',
    '',
    '## 3. `question_bank` template',
    '',
    'The template uses the v1.1 envelope with `content_type=question_bank`. The preparation checklist preserves the source status for `question_text`, `options`, `correct_answer`, `explanation`, and `reference`. A missing question-bank field remains `MISSING_FROM_SOURCE` or `UNRESOLVED`; no answer, option, explanation, or citation is reconstructed. The v1.1 conditional profile rejects a `content` object for this type.',
    '',
    '## 4. `clinical_case` template',
    '',
    '| `content` member | v1.1 shape | Source-state rule |',
    '|---|---|---|',
    '| `case_type` | Non-empty string | Required target field; source evidence and review state must be supplied. |',
    '| `presentation` | Source section object | Preserve `present`, `absent`, or `unresolved`; present values require origin and locator. |',
    '| `history` | Source section object | `MISSING_FROM_SOURCE` / `UNRESOLVED` remains flagged. |',
    '| `examination` | Source section object | No patient-record interpretation; source state only. |',
    '| `investigations` | Source section object | Do not invent tests or results. |',
    '| `assessment` | Source section object | Do not infer clinical conclusions. |',
    '| `differential` | Source section object | Do not add diagnoses not present in source. |',
    '| `management` | Source section object | Do not add treatment steps or doses. |',
    '| `clinical_reasoning` | Source section object | Educational framework only; no clinical approval. |',
    '| `references` | Non-empty reference array | Preserve only declared references and locators. |',
    '',
    'A Clinical Case remains an educational case structure for emergency-medicine learning. It is not a clinical protocol, patient record, or competency approval.',
    '',
    '## 5. `clinical_skill` template',
    '',
    '| `content` member | v1.1 shape | Source-state rule |',
    '|---|---|---|',
    '| `skill_name` | Non-empty string | Preserve source-supported identity only. |',
    '| `category` | Non-empty string | Do not infer category from filename. |',
    '| `indication` | Source section object | Missing source state remains flagged. |',
    '| `contraindication` | Source section object | Do not add contraindications. |',
    '| `steps` | Source section object | Do not add procedural steps. |',
    '| `equipment` | Source section object | Do not add equipment lists. |',
    '| `assessment_method` | Source section object | Educational assessment only; no sign-off. |',
    '| `competency_level` | Non-empty string | Must be explicit evidence; no competency approval is created. |',
    '',
    'A Clinical Skill is an educational skill framework only. It is not a learner competency record, procedure authorization, or sign-off.',
    '',
    '## 6. `book` template',
    '',
    'The template uses the v1.1 envelope with `content_type=book`. The four book candidates remain `External Reference Based`. They may support a `relationships.reference_framework` mapping only when the book record ID, framework name, role, citation locator policy, and display scope are independently evidenced. No verbatim book text, ownership claim, or learner-display permission is created. The v1.1 conditional profile rejects a `content` object for this type.',
    '',
    '## 7. Blueprint safety rules',
    '',
    'This blueprint is not executable, contains no candidate values, and is not an import payload. Any future recordization requires a separate, explicitly authorized dry-run contract and must preserve `MISSING_FROM_SOURCE`, `PENDING_EXTERNAL_EVIDENCE`, and `UNRESOLVED` without clinical repair or rights assumptions.',
    '',
    '## References',
    '',
    f'[1]: file://{SCHEMA_PATH} "SEG Content Record v1.1 schema profile"',
    f'[2]: file://{EXTRACT_PATH} "Phase 7.7 content extraction register"',
    f'[3]: file://{DECISION_PATH} "Phase 7.7.6 Final Medical Owner Decision"',
]
BLUEPRINT_OUT.write_text('\n'.join(blueprint_lines) + '\n', encoding='utf-8')

# 3) Field mapping validation.
field_lines = [
    '# SEG Phase 7.8 — Field Mapping Validation',
    '',
    '> **Status:** Controlled source-to-v1.1 mapping review only. No candidate JSON was generated and no missing value was filled.',
    '',
    '## 1. Contract and validation scope',
    '',
    f'Canonical target profile: `{SCHEMA_PATH}` with SHA-256 `{sha(SCHEMA_PATH)}`. The v1.1 profile declares the five permitted content types and closed required objects. This report validates mapping availability and evidence states; it does not claim that any candidate passes the full schema or governance gates.',
    '',
    '| Source / legacy field | SEG_CONTENT_RECORD_V1_1 target | State | Rule |',
    '|---|---|---|---|',
    '| `candidate_record_id` | `record_id` | `UNRESOLVED` | Existing IDs are preserved as evidence. v1.1 requires a lowercase pattern; no normalization or new ID was created. |',
    '| Source title | `title` | `SOURCE_STATUS_VARIES` | Map only `EXTRACTED` title values from the extraction register. |',
    '| `target_type` | `content_type` | `PASS_FOR_VOCABULARY` | Cross-checked counts: lesson 16, question_bank 17, clinical_case 6, clinical_skill 5, book 4. |',
    '| No complete language field in authorized inputs | `language` | `MISSING_FROM_SOURCE` | Do not infer language from folder or text. |',
    '| `source_id` | `source.source_id` | `PASS_FOR_PRESERVATION` | Preserve exact Source ID. |',
    '| `source_path` | `source.location` | `PASS_FOR_PRESERVATION` | Preserve exact relative source path. |',
    '| Owner/publisher evidence | `source.publisher_or_owner` | `MISSING_FROM_SOURCE` | Candidate map explicitly marks owner/publisher as not supplied. |',
    '| Access timestamp | `source.accessed_at` | `PENDING_EXTERNAL_EVIDENCE` | No RFC3339 accessed-at evidence is supplied in the authorized inputs. |',
    '| Source version | `version.value` | `MISSING_FROM_SOURCE` | Do not replace with a guessed version. |',
    '| `sha256` | `version.checksum` | `PASS_FOR_PRESERVATION` | Preserve exact 64-hex checksum from the candidate map and decision baseline. |',
    '| Source `reference` / `references` | `references[]` | `UNRESOLVED` / `PENDING_EXTERNAL_EVIDENCE` | Preserve only extracted references and locators; no citation is created where source verification is pending. |',
    '| Candidate rights state | `rights.text_usage`, `rights.image_usage`, `rights.display_scope` | `PENDING_EXTERNAL_EVIDENCE` | Rights review remains independent and open. |',
    '| Taxonomy and track evidence | `taxonomy.taxonomy_id`, `taxonomy.taxonomy_version` | `MISSING_FROM_SOURCE` / `PENDING_EXTERNAL_EVIDENCE` | Do not derive taxonomy; explicit `02_Internship` source confirmation remains pending where flagged. |',
    '| Observed Medical Owner status | `medical_review.reviewer`, `medical_review.decision` | `UNRESOLVED` | Preserve educational closure as governance evidence; do not translate it into clinical approval or invent reviewer credentials. |',
    '| Existing governance events | `audit.created_by`, `audit.created_at`, `audit.events[]` | `UNRESOLVED` | Future recordization must map supplied append-only events; no event is fabricated here. |',
    '| Case extraction fields | `content` → Clinical Case object | `MISSING_FROM_SOURCE` / `UNRESOLVED` | Preserve field-level status for presentation, history, examination, investigations, assessment, differential, management, reasoning, and references. |',
    '| Skill extraction fields | `content` → Clinical Skill object | `MISSING_FROM_SOURCE` / `UNRESOLVED` | Preserve field-level status for indication, contraindication, steps, equipment, assessment method, and competency level. |',
    '| Book/framework evidence | `relationships.reference_framework[]` | `PENDING_EXTERNAL_EVIDENCE` | Reference-only relationship; no generic reference type, ownership claim, or display permission. |',
    '',
    '## 2. Candidate field-state preservation',
    '',
    '| Domain | Required source fields audited | Preservation rule | Current result |',
    '|---|---|---|---|',
    '| Lesson | title, educational objective, teaching sections, key learning points, references | Keep `MISSING_FROM_SOURCE` when absent; keep extracted heading evidence source-linked | `BLOCKED_PENDING_METADATA_AND_REVIEW` |',
    '| Question Bank | question text, options, correct answer, explanation, reference | Missing question/options/answer/explanation remain flagged per candidate | `BLOCKED_WITH_FIELD_FLAGS` |',
    '| Clinical Case | presentation, history, examination, investigations, assessment, differential, management, reasoning | No case field is reconstructed; absent/unresolved fields remain exact | `BLOCKED_WITH_FIELD_FLAGS` |',
    '| Clinical Skill | skill name, indication, contraindication, equipment, steps, assessment method | No skill steps or competency evidence is added | `BLOCKED_WITH_FIELD_FLAGS` |',
    '| Book | title, author/identity, edition/version if explicit, source identity, framework relation | External reference boundary and rights evidence remain separate | `BLOCKED_PENDING_EXTERNAL_EVIDENCE` |',
    '',
    '## 3. Required status vocabulary',
    '',
    '| Status | Meaning in this preparation package |',
    '|---|---|',
    '| `MISSING_FROM_SOURCE` | The authorized source/extraction register does not supply the field. No value is inserted. |',
    '| `PENDING_EXTERNAL_EVIDENCE` | The field depends on independent rights, reviewer, taxonomy, locator, version, or other evidence not supplied in this phase. |',
    '| `UNRESOLVED` | The field or lifecycle mapping cannot be safely resolved from the authorized inputs without inference or a separate governance decision. |',
    '',
    '## 4. Validation conclusion',
    '',
    'Vocabulary and checksum-preservation mappings are available for preparation. Candidate-level schema compatibility is not a PASS because no records are generated, `record_id` compatibility remains unresolved, and required metadata, rights, taxonomy, medical-review, audit, and source-field evidence remain incomplete. This report is not a clinical review, rights clearance, import authorization, or activation decision.',
    '',
    '## References',
    '',
    f'[1]: file://{SCHEMA_PATH} "SEG Content Record v1.1 schema profile"',
    f'[2]: file://{MAP_PATH} "Phase 7.6 candidate record map"',
    f'[3]: file://{EXTRACT_PATH} "Phase 7.7 content extraction register"',
    f'[4]: file://{DECISION_PATH} "Phase 7.7.6 Final Medical Owner Decision"',
    f'[5]: file://{QA_PATH} "Phase 7.7.6 Clinical QA Closure Register"',
]
FIELD_OUT.write_text('\n'.join(field_lines) + '\n', encoding='utf-8')

# 4) Duplicate handling plan.
dup_lines = [
    '# SEG Phase 7.8 — Duplicate Handling Plan',
    '',
    '> **Status:** Preparation and lineage policy only. No deletion, merge, overwrite, import, activation, or source modification was performed.',
    '',
    '## 1. Controlled rules',
    '',
    'The duplicate families are handled as lineage families, not as permission to remove or mutate records. Every candidate retains its original candidate ID, Source ID, SHA-256, source path, phase status, and educational classification. Primary ordering is a preparation recommendation only; it is not an import command or activation decision.',
    '',
    '| Rule | Applied policy |',
    '|---|---|',
    '| Preserve lineage | Retain family ID, member Source IDs, candidate IDs, roles, paths, and SHA evidence. |',
    '| No deletion | No source or candidate is deleted. |',
    '| No merge | No content is merged and no record is collapsed. |',
    '| No overwrite | No existing source, map, schema, or application artifact is overwritten. |',
    '| SHA evidence | Each family member keeps its exact SHA-256 from the Phase 7.6 map and Phase 7.7.6 decision. |',
    '| Primary ordering only | `PRIMARY_EDUCATIONAL_CANDIDATE` is preserved as ordering metadata only. |',
    '| Historical lineage | `HISTORICAL_LINEAGE_PRESERVED` remains visible and is not treated as a deletion candidate. |',
    '| Stable evidence tuple | Candidate ID + Source ID + SHA-256 remain the preparation evidence tuple. No database key is inferred here. |',
    '',
    '## 2. DUP-DRUG-001',
    '',
    '| Role | Members | Handling |',
    '|---|---|---|',
    '| `HISTORICAL_LINEAGE_PRESERVED` | `SRC-0023`, `SRC-0024`, `SRC-0025` | Preserve all three members and their source evidence. Do not delete, merge, or overwrite. |',
    '| `PRIMARY_EDUCATIONAL_CANDIDATE` | `SRC-0027`, `SRC-0028`, `SRC-0029` | Preserve v2_Pack ordering as preparation metadata only; no import or activation. |',
    '',
    'All six family members remain part of the 48-candidate coverage and retain the Phase 7.7.6 classifications: `SRC-0023` and `SRC-0027` are `SEG Original`; the remaining family members are `Mixed Educational Content`.',
    '',
    '## 3. DUP-EMERGENCY-001',
    '',
    '| Role | Members | Handling |',
    '|---|---|---|',
    '| `HISTORICAL_LINEAGE_PRESERVED` | `SRC-0033`, `SRC-0034`, `SRC-0035` | Preserve all three members and their source evidence. Do not delete, merge, or overwrite. |',
    '| `PRIMARY_EDUCATIONAL_CANDIDATE` | `SRC-0037`, `SRC-0038`, `SRC-0039` | Preserve v2_Pack ordering as preparation metadata only; no import or activation. |',
    '',
    'All six family members remain part of the 48-candidate coverage and retain the Phase 7.7.6 classifications: `SRC-0033` and `SRC-0037` are `SEG Original`; the remaining family members are `Mixed Educational Content`.',
    '',
    '## 4. Rollback and conflict handling',
    '',
    'No production state exists from this preparation action, so no database rollback was executed or required. If a later, separately authorized dry-run creates a reversible staging derivative, rollback must disable or discard only that derivative while preserving all original sources and governance evidence. Any checksum conflict, lineage conflict, or source mismatch must be marked as a blocker and escalated; it must not be silently resolved.',
    '',
    '## 5. Gate conclusion',
    '',
    'Duplicate handling is `PASS_FOR_PREPARATION_ONLY`. It does not make any candidate importable and does not authorize Phase 7.9.',
    '',
    '## References',
    '',
    f'[1]: file://{MAP_PATH} "Phase 7.6 candidate record map"',
    f'[2]: file://{DECISION_PATH} "Phase 7.7.6 Final Medical Owner Decision"',
    f'[3]: file://{QA_PATH} "Phase 7.7.6 Clinical QA Closure Register"',
]
DUP_OUT.write_text('\n'.join(dup_lines) + '\n', encoding='utf-8')

# 5) Gate report. Hashes for the first four outputs are embedded; the gate report's final SHA is delivered separately after write.
output_hashes = {p.name: sha(p) for p in [MAP_OUT, BLUEPRINT_OUT, FIELD_OUT, DUP_OUT]}
gate_lines = [
    '# SEG Phase 7.8 — Gate Report',
    '',
    '> **Final status:** `BLOCKED_PENDING_FINAL_GATES`',
    '>',
    '> The PASS status `READY_FOR_PHASE_7_9_DRY_RUN_IMPORT` is not granted. Phase 7.9 is not executed or authorized by this report.',
    '',
    '## 1. Gate identity',
    '',
    '| Item | Value |',
    '|---|---|',
    '| Phase | `SEG Phase 7.8 — Import Preparation Artifact Completion` |',
    '| Mode | Controlled preparation only; no production / no import |',
    '| Candidate scope | `48` candidates in `SEG Internship Doctor Pathway / 02_Internship` review scope |',
    '| Target profile | `SEG_CONTENT_RECORD_V1_1` |',
    '| Overall status | `BLOCKED_PENDING_FINAL_GATES` |',
    '| Production readiness | Not granted; no record is production-ready |',
    '',
    '## 2. Artifact validation',
    '',
    '| Artifact | SHA-256 | Result |',
    '|---|---|---|',
]
for p in [MAP_OUT, BLUEPRINT_OUT, FIELD_OUT, DUP_OUT]:
    gate_lines.append(f'| `{p.name}` | `{output_hashes[p.name]}` | `PASS_FOR_PREPARATION_ARTIFACT` |')
gate_lines += [
    '| `SEG_PHASE_7_8_GATE_REPORT.md` | Computed after final write and delivered with the package | `PASS_FOR_ARTIFACT_EXISTENCE` |',
    '',
    '## 3. Readiness gates',
    '',
    '| Gate | Result | Evidence and limitation |',
    '|---|---|---|',
    '| Artifact validation | `PASS` | All five Phase 7.8 artifacts are present after this controlled write. |',
    '| Candidate count | `PASS` | `48/48` candidate IDs are represented in the import preparation map. |',
    '| Source ID preservation | `PASS` | `48/48` Source IDs cross-checked against the candidate map, decision record, and QA closure. |',
    '| SHA preservation | `PASS` | `48/48` SHA-256 values are preserved and cross-checked across authorized handoff artifacts. |',
    '| Final classification preservation | `PASS` | `SEG Original=4`, `Mixed Educational Content=40`, `External Reference Based=4`. |',
    '| Content-type coverage | `PASS` | `lesson=16`, `question_bank=17`, `clinical_case=6`, `clinical_skill=5`, `book=4`. |',
    '| v1.1 vocabulary compatibility | `PASS_FOR_VOCABULARY` | All five target types are declared by the readable v1.1 schema profile. |',
    '| Candidate schema compatibility | `BLOCKED` | No candidate JSON was generated or validated; required metadata is incomplete and uppercase candidate IDs do not meet the v1.1 lowercase pattern without an authorized normalization decision. |',
    '| Metadata completeness | `BLOCKED` | Owner/publisher, version value, taxonomy/version, rights scope, locator, language, and review/audit fields remain incomplete or unresolved. |',
    '| Medical Owner closure | `PASS_FOR_PHASE_7_7_6_BASELINE` | Educational classification and boundaries are preserved; this is not independent clinical approval. |',
    '| Rights state | `BLOCKED_PENDING_EXTERNAL_EVIDENCE` | Rights/display review remains separate and open, especially for external reference-based books. |',
    '| Taxonomy/pathway | `BLOCKED_PENDING_EXTERNAL_EVIDENCE` | `02_Internship` scope is preserved; explicit source/taxonomy confirmation remains pending where flagged. |',
    '| Version/locator | `BLOCKED` | SHA is preserved, but source version values and complete v1.1 locator evidence are not closed. |',
    '| Duplicate handling | `PASS_FOR_PREPARATION_ONLY` | Both duplicate families preserve lineage, roles, and SHA; no deletion, merge, or overwrite occurred. |',
    '| Rollback readiness | `PASS_FOR_NO-WRITE_PREPARATION` | No production state was created; any future staging derivative must remain isolated and reversible. |',
    '| Implementation authorization | `BLOCKED` | This phase authorizes preparation artifacts only; no Phase 7.9 implementation authorization is supplied. |',
    '',
    '## 4. Open final gates',
    '',
    'The overall gate remains blocked because structural preparation does not replace the independent clinical review, rights review, metadata closure, identifier compatibility decision, complete source-version/locator evidence, or per-run implementation authorization required before any future dry-run import. The status is therefore `BLOCKED_PENDING_FINAL_GATES`, not `READY_FOR_PHASE_7_9_DRY_RUN_IMPORT`.',
    '',
    '## 5. Non-actions',
    '',
    '| Action | Result |',
    '|---|---|',
    '| Production JSON generation | `false` — no candidate JSON was generated. |',
    '| Database write/import | `false` — no database operation was executed. |',
    '| Migration/schema modification | `false` — manifest and v1.1 schema artifacts were not modified. |',
    '| Application/auth/routes modification | `false`. |',
    '| Content activation | `false`. |',
    '| Publication/learner exposure | `false`. |',
    '| Original source modification | `false`. |',
    '| Medical content rewriting/invention | `false`. |',
    '| Phase 7.9 execution | `false` — stop condition observed. |',
    '',
    '## 6. Next allowed phase',
    '',
    'The permitted next action is a separate governance review of the remaining final gates and, only after explicit authorization, a controlled Phase 7.9 dry-run import. This package itself does not authorize import, activation, publication, or learner exposure.',
    '',
    '## References',
    '',
    f'[1]: file://{MAP_PATH} "Phase 7.6 candidate record map"',
    f'[2]: file://{EXTRACT_PATH} "Phase 7.7 content extraction register"',
    f'[3]: file://{DECISION_PATH} "Phase 7.7.6 Final Medical Owner Decision"',
    f'[4]: file://{QA_PATH} "Phase 7.7.6 Clinical QA Closure Register"',
    f'[5]: file://{SCHEMA_PATH} "SEG Content Record v1.1 schema profile"',
]
GATE_OUT.write_text('\n'.join(gate_lines) + '\n', encoding='utf-8')

print('created', MAP_OUT)
print('created', BLUEPRINT_OUT)
print('created', FIELD_OUT)
print('created', DUP_OUT)
print('created', GATE_OUT)
print('candidate_count', len(map_rows))
print('type_counts', dict(sorted(class_counts.items())))
print('classification_counts', dict(sorted(classification_counts.items())))
print('status', 'BLOCKED_PENDING_FINAL_GATES')
