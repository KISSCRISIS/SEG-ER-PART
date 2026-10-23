from __future__ import annotations
import hashlib
from pathlib import Path

OUT = Path('/home/ubuntu/seg-internship-output')
ROOT = Path('/home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake')
ZIP = Path('/home/ubuntu/upload/كتبعلاءنصدراسي.zip')


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()


def rel(name: str) -> str:
    return name

package_sha = sha256(ZIP)

# Intake-local source IDs are registry identifiers only. They are not SEG SRC/CAND IDs,
# not content IDs, not identity links, and not production identifiers.
entries = [
    {
        'source_id':'UPD811-001','filename':'اسئله +الشرح بالعربي/FRCEM_High_Yield_Study_Book.txt','artifact_type':'study_book_text','format':'TXT','priority':'1','duplicate_of':'','language':'English signal observed; full language metadata not supplied','owner_status':'PREPARER_SIGNAL_ONLY','publisher_status':'NOT_SUPPLIED','version_status':'UNRESOLVED','rights_status':'PENDING_EXTERNAL_EVIDENCE','clinical_review_status':'PENDING_CLINICAL_REVIEW','note':'Text says prepared for Dr. Alaa Al-Asfar and describes a synthesis of 1,529 source questions across 32 chapters; preparer signal is not ownership evidence.'
    },
    {
        'source_id':'UPD811-002','filename':'اسئله +الشرح بالعربي/HIPPO_Questions_Answers_Brief_Arabic_Explanations_By_Chapter.txt','artifact_type':'question_explanation_text','format':'TXT','priority':'1','duplicate_of':'','language':'English questions/answers with Arabic explanations observed','owner_status':'NOT_SUPPLIED','publisher_status':'NOT_SUPPLIED','version_status':'UNRESOLVED','rights_status':'PENDING_EXTERNAL_EVIDENCE','clinical_review_status':'PENDING_CLINICAL_REVIEW','note':'1,927 question markers and 1,927 answer markers across 18 chapter markers; source edition and rights are not supplied.'
    },
    {
        'source_id':'UPD811-003','filename':'اسئله +الشرح بالعربي/frcem All_Chapters_Questions_and_Explanations_Full.txt','artifact_type':'question_explanation_text','format':'TXT','priority':'1','duplicate_of':'','language':'English questions/answers with Arabic explanations observed','owner_status':'NOT_SUPPLIED','publisher_status':'NOT_SUPPLIED','version_status':'UNRESOLVED','rights_status':'PENDING_EXTERNAL_EVIDENCE','clinical_review_status':'PENDING_CLINICAL_REVIEW','note':'1,529 question markers and 1,529 answer markers across 32 chapter markers; reference signals are not a versioned citation contract.'
    },
    {
        'source_id':'UPD811-004','filename':'كتب علاء نص دراسي/FRCEM_High_Yield_Study_Book.txt','artifact_type':'study_book_text','format':'TXT','priority':'1','duplicate_of':'UPD811-001','language':'English signal observed; full language metadata not supplied','owner_status':'PREPARER_SIGNAL_ONLY','publisher_status':'NOT_SUPPLIED','version_status':'UNRESOLVED','rights_status':'PENDING_EXTERNAL_EVIDENCE','clinical_review_status':'PENDING_CLINICAL_REVIEW','note':'Byte-identical duplicate representation of UPD811-001; retained separately for lineage and not merged.'
    },
    {
        'source_id':'UPD811-005','filename':'كتب علاء نص دراسي/HIPPO_High_Yield_Study_Book.txt','artifact_type':'study_book_text','format':'TXT','priority':'1','duplicate_of':'','language':'English signal observed; full language metadata not supplied','owner_status':'NOT_SUPPLIED','publisher_status':'NOT_SUPPLIED','version_status':'UNRESOLVED','rights_status':'PENDING_EXTERNAL_EVIDENCE','clinical_review_status':'PENDING_CLINICAL_REVIEW','note':'Study-book text with Tintinalli/Rosen/HIPPO signals; those signals do not establish edition, publisher, or rights.'
    },
    {
        'source_id':'UPD811-006','filename':'كتب علاء نص دراسي/1400q_Study_Guide_UTF8.txt','artifact_type':'study_guide_text','format':'TXT','priority':'2','duplicate_of':'','language':'English and Arabic educational headings observed','owner_status':'NOT_SUPPLIED','publisher_status':'NOT_SUPPLIED','version_status':'UNRESOLVED','rights_status':'PENDING_EXTERNAL_EVIDENCE','clinical_review_status':'PENDING_CLINICAL_REVIEW','note':'States that it was built from source-order answer notes and that the uploaded 1400q PDF lacked a reliable answer-key section.'
    },
    {
        'source_id':'UPD811-007','filename':'كتب علاء نص دراسي/pretestnew_Study_Guide_UTF8.txt','artifact_type':'study_guide_text','format':'TXT','priority':'2','duplicate_of':'','language':'English and Arabic educational headings observed','owner_status':'NOT_SUPPLIED','publisher_status':'NOT_SUPPLIED','version_status':'UNRESOLVED','rights_status':'PENDING_EXTERNAL_EVIDENCE','clinical_review_status':'PENDING_CLINICAL_REVIEW; REQUIRES_SOURCE_RESTORATION','note':'Visible OCR/extraction corruption is present in clinical sentences; no transformation is allowed until source restoration and review.'
    },
    {
        'source_id':'UPD811-008','filename':'كتب علاء نص دراسي/Emergency_Oxford_Essentials.pdf','artifact_type':'study_book_pdf','format':'PDF','priority':'2','duplicate_of':'','language':'English signal observed; language metadata not supplied','owner_status':'FILE_AUTHOR_METADATA_ONLY','publisher_status':'NOT_SUPPLIED','version_status':'UNRESOLVED','rights_status':'PENDING_EXTERNAL_EVIDENCE','clinical_review_status':'PENDING_CLINICAL_REVIEW','note':'PDF title is Emergency Clinical Medicine Essentials; author metadata says Manus AI. This does not establish an official Oxford source or ownership.'
    },
    {
        'source_id':'UPD811-009','filename':'كتب علاء نص دراسي/FRCEM_High_Yield_Study_Book_Colored.pdf','artifact_type':'study_book_pdf_representation','format':'PDF','priority':'3','duplicate_of':'UPD811-001','language':'English signal observed; language metadata not supplied','owner_status':'NOT_SUPPLIED','publisher_status':'NOT_SUPPLIED','version_status':'REPRESENTATION_VERSION_UNRESOLVED','rights_status':'PENDING_EXTERNAL_EVIDENCE','clinical_review_status':'PENDING_CLINICAL_REVIEW','note':'Presentation representation; 258 pages and cover signals for 32 chapters/1,529 source questions. Not needed for immediate transformation.'
    },
    {
        'source_id':'UPD811-010','filename':'كتب علاء نص دراسي/HIPPO_High_Yield_Study_Book_Colored.pdf','artifact_type':'study_book_pdf_representation','format':'PDF','priority':'3','duplicate_of':'UPD811-005','language':'English signal observed; language metadata not supplied','owner_status':'NOT_SUPPLIED','publisher_status':'NOT_SUPPLIED','version_status':'REPRESENTATION_VERSION_UNRESOLVED','rights_status':'PENDING_EXTERNAL_EVIDENCE','clinical_review_status':'PENDING_CLINICAL_REVIEW','note':'Presentation representation; 144 pages and cover signals for 18 chapters/1,927 source questions. Not needed for immediate transformation.'
    },
    {
        'source_id':'UPD811-011','filename':'كتب علاء نص دراسي/FRCEM_High_Yield_Study_Book_Editable.docx','artifact_type':'study_book_docx_representation','format':'DOCX','priority':'3','duplicate_of':'UPD811-001','language':'English signal observed; language metadata not supplied','owner_status':'FILE_CREATOR_METADATA_ONLY','publisher_status':'NOT_SUPPLIED','version_status':'REPRESENTATION_VERSION_UNRESOLVED','rights_status':'PENDING_EXTERNAL_EVIDENCE','clinical_review_status':'PENDING_CLINICAL_REVIEW','note':'Editable representation; python-docx creator metadata is not publisher or ownership evidence.'
    },
    {
        'source_id':'UPD811-012','filename':'كتب علاء نص دراسي/HIPPO_High_Yield_Study_Book_Editable.docx','artifact_type':'study_book_docx_representation','format':'DOCX','priority':'3','duplicate_of':'UPD811-005','language':'English signal observed; language metadata not supplied','owner_status':'FILE_CREATOR_METADATA_ONLY','publisher_status':'NOT_SUPPLIED','version_status':'REPRESENTATION_VERSION_UNRESOLVED','rights_status':'PENDING_EXTERNAL_EVIDENCE','clinical_review_status':'PENDING_CLINICAL_REVIEW','note':'Editable representation; python-docx creator metadata is not publisher or ownership evidence.'
    },
    {
        'source_id':'UPD811-AUDIT-001','filename':'sha256_manifest.txt','artifact_type':'audit_sidecar','format':'TXT','priority':'AUDIT_SIDECAR','duplicate_of':'','language':'NOT_APPLICABLE','owner_status':'NOT_APPLICABLE_AUDIT_SIDECAR','publisher_status':'NOT_APPLICABLE_AUDIT_SIDECAR','version_status':'NOT_APPLICABLE_AUDIT_SIDECAR','rights_status':'NOT_APPLICABLE_AUDIT_SIDECAR','clinical_review_status':'NOT_APPLICABLE_AUDIT_SIDECAR','note':'Checksum manifest only; not a medical or educational content artifact.'
    },
]

for e in entries:
    p = ROOT / e['filename']
    e['sha256'] = sha256(p)
    e['bytes'] = p.stat().st_size
    e['source_location'] = str(p)

# Content overlap evidence from Phase 7.8.10. These are signals only, never identity links.
comparisons = [
    ('officialUnifiedTopics.json','40','OVERLAPPING_CONTENT','10 of 40 normalized topic names occurred in the new text; selected fields showed 3 exact-line and 1 substring signal.','No shared object ID, versioned locator, or explicit relationship. NEW_CONTENT not established.'),
    ('referenceLibrary.json','194','EXTERNAL_REFERENCE_CONTENT; OVERLAPPING_CONTENT','Reference signals and 4 exact-line/1 substring selected-field signals were observed.','Framework/reference language is not a rights, edition, or identity decision. NEW_CONTENT not established.'),
    ('flashcards.json','760','DERIVED_CONTENT; OVERLAPPING_CONTENT','Selected fields showed 5 exact-line/1 substring signals; new package contains question/explanation material.','Similarity may reflect reuse, derivation, or common references. No object-level join. NEW_CONTENT not established.'),
    ('examTraps.json','415','DERIVED_CONTENT; OVERLAPPING_CONTENT','Selected fields showed 5 exact-line/1 substring signals.','No explicit trap ID, versioned locator, or source-to-artifact relationship. NEW_CONTENT not established.'),
    ('algorithms.json','28','OVERLAPPING_CONTENT','Selected fields showed 1 exact-line signal.','Single text overlap is insufficient for identity or clinical equivalence. NEW_CONTENT not established.'),
    ('topicFamilyIndex.json','99','UNKNOWN','No selected text-field overlap was established in the conservative comparison.','No topic-family IDs or explicit taxonomy contract in the new package. NEW_CONTENT not established.'),
    ('antidotes.json','16','OVERLAPPING_CONTENT','Selected fields showed 3 exact-line signals.','Antidote terminology overlap is not object identity or clinical approval. NEW_CONTENT not established.'),
]

# Registry report.
lines = []
lines += ['# SEG PHASE 7.8.11 — UPDATED SOURCE REGISTRY', '', '**Mode:** `CONTROLLED GOVERNANCE / READ-ONLY`  ', '**Registry state:** `SEPARATE_LINEAGE_CANDIDATE`  ', '**Final gate state:** `BLOCKED_PENDING_METADATA`  ', f'**Package SHA-256:** `{package_sha}`  ', '**Package source:** `كتبعلاءنصدراسي.zip`', '']
lines += ['## Registry interpretation', '', 'This registry records the updated archive as a separate intake lineage candidate. The `source_id` values below are intake-local registry identifiers only. They are not SEG `SRC-*` IDs, not `CAND-*` IDs, not identity links, not content IDs, and not production identifiers. No old source is replaced, merged, or superseded by this registry.', '', 'Missing values are represented as controlled states. No owner, publisher, edition, rights decision, clinical approval, track, taxonomy, or identity relationship is inferred from a filename, title, reference signal, or file metadata.', '']
lines += ['## Artifact registry', '', '| source_id | filename | artifact_type | format | priority | sha256 | language | owner_status | publisher_status | version_status | rights_status | clinical_review_status | duplicate_of |', '|---|---|---|---|---|---|---|---|---|---|---|---|---|']
for e in entries:
    lines.append('| ' + ' | '.join(str(e[k]).replace('|','\\|') for k in ['source_id','filename','artifact_type','format','priority','sha256','language','owner_status','publisher_status','version_status','rights_status','clinical_review_status','duplicate_of']) + ' |')
lines += ['', '## Artifact notes', '', '| source_id | bytes | source_location | observed note |', '|---|---:|---|---|']
for e in entries:
    lines.append('| ' + ' | '.join(str(e[k]).replace('|','\\|') for k in ['source_id','bytes','source_location','note']) + ' |')
lines += ['', '## Priority handling', '', 'Priority 1 contains the four requested text artifacts for later question-bank, lesson-engine, Arabic Mentor, and exam-preparation review. Priority 2 contains `Emergency_Oxford_Essentials.pdf`, `1400q_Study_Guide_UTF8.txt`, and `pretestnew_Study_Guide_UTF8.txt`; the pretest file is explicitly marked `REQUIRES_SOURCE_RESTORATION`. Priority 3 contains PDF/DOCX presentation representations that are preserved but excluded from immediate transformation. The checksum manifest is retained as an audit sidecar.', '', '## Governance state', '', 'The registry is structurally complete as an intake inventory, but critical metadata is incomplete. Therefore the registry does not pass the downstream replacement gate and does not authorize conversion, identity linking, adapter design, import, activation, or publication.', '', '## Non-actions', '', 'No production JSON, database write, schema modification, source replacement, source merge, identity link, adapter, import, migration, activation, publication, clinical approval, or rights approval was performed.', '', '## References', '', '[1]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_10_UPDATED_SOURCE_PACKAGE_REVIEW.md "Phase 7.8.10 updated package review"', '[2]: file:///home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_inventory_comparison.md "Phase 7.8.10 structural inventory comparison"', '[3]: file:///home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_intake/INTAKE_FINDINGS.md "Updated package intake findings"', '[4]: file:///home/ubuntu/skills/seg-metadata-source-mapper/SKILL.md "SEG metadata/source mapping governance"', '']
(OUT / 'SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md').write_text('\n'.join(lines), encoding='utf-8')

# Comparison matrix.
lines = []
lines += ['# SEG PHASE 7.8.11 — LEGACY COMPARISON MATRIX', '', '**Mode:** `CONTROLLED GOVERNANCE / READ-ONLY`  ', '**Purpose:** Compare the updated package with legacy knowledge assets without creating identity links, SRC/CAND IDs, mappings, or transformations.', '']
lines += ['## Classification rule', '', 'The classifications below describe evidence signals at the package/content-layer level. They do not assert that an updated artifact is the same object as a legacy object. `NEW_CONTENT` is not established by this comparison because novelty requires authoritative versioned provenance, not absence of a byte-identical file.', '']
lines += ['| Legacy asset | Legacy item count | Classification | Evidence observed | Boundary / unresolved state |', '|---|---:|---|---|---|']
for row in comparisons:
    lines.append('| ' + ' | '.join(row) + ' |')
lines += ['', '## Classification summary', '', '| Classification | Determination |', '|---|---|', '| `NEW_CONTENT` | Not established for any compared asset. |', '| `OVERLAPPING_CONTENT` | Observed for official topics, reference library, flashcards, exam traps, algorithms, and antidotes through limited textual/reference signals. |', '| `DERIVED_CONTENT` | Applicable as a provisional layer for question/explanation and study-guide artifacts; transformation has not occurred. |', '| `EXTERNAL_REFERENCE_CONTENT` | Reference/framework signals are present; rights, edition, and display scope remain pending. |', '| `UNKNOWN` | Applies where the supplied evidence does not support a conservative layer determination, including topic-family direct mapping. |', '']
lines += ['## Priority 1 comparison interpretation', '', 'The four Priority 1 text artifacts are suitable for a later controlled review queue because they contain question/explanation and study-book material. They remain source candidates rather than SEG records. Their possible relationships to `officialUnifiedTopics`, `referenceLibrary`, `flashcards`, `examTraps`, `algorithms`, `topicFamilyIndex`, and `antidotes` must remain `OVERLAPPING_CONTENT`, `DERIVED_CONTENT`, `EXTERNAL_REFERENCE_CONTENT`, or `UNKNOWN` until versioned locators and independent review are supplied.', '', '## Explicit exclusions', '', 'This matrix does not assign `SRC-*` or `CAND-*` IDs, does not create legacy-to-candidate links, does not choose professional tracks, does not create taxonomy mappings, does not determine medical correctness, and does not establish rights or ownership.', '', '## References', '', '[1]: file:///home/ubuntu/seg-manus-status/phase_7_8_10_content_overlap.md "Phase 7.8.10 conservative content overlap"', '[2]: file:///home/ubuntu/seg-manus-status/phase_7_8_10_updated_source_inventory_comparison.md "Phase 7.8.10 structural comparison"', '[3]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/officialUnifiedTopics.json "Legacy official unified topics"', '[4]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/referenceLibrary.json "Legacy reference library"', '[5]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/flashcards.json "Legacy flashcards"', '[6]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/examTraps.json "Legacy exam traps"', '[7]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/algorithms.json "Legacy algorithms"', '[8]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/topicFamilyIndex.json "Legacy topic family index"', '[9]: file:///home/ubuntu/seg-legacy-knowledge-audit-input/antidotes.json "Legacy antidotes"', '']
(OUT / 'SEG_PHASE_7_8_11_LEGACY_COMPARISON_MATRIX.md').write_text('\n'.join(lines), encoding='utf-8')

# Gate report.
lines = []
lines += ['# SEG PHASE 7.8.11 — GATE REPORT', '', '**Mode:** `CONTROLLED GOVERNANCE / READ-ONLY`  ', '**Final status:** `BLOCKED_PENDING_METADATA`  ', '**Registry state:** `SEPARATE_LINEAGE_CANDIDATE`', '']
lines += ['## Decision', '', 'The updated package has been registered in a separate intake-local registry and compared against the seven specified legacy knowledge assets. The evidence is sufficient to preserve the package and document its priority, format, checksum, and provisional layer signals. It is not sufficient to pass the replacement or downstream transformation gate.', '', '> `BLOCKED_PENDING_METADATA` does not reject the medical usefulness of the package. It records that critical governance metadata and review evidence remain incomplete.', '']
lines += ['## Gate results', '', '| Gate | Result | Evidence / remaining requirement |', '|---|---|---|', '| Updated package registry entries | `PASS — INTAKE_ONLY` | 13 archive entries recorded, including the checksum sidecar; intake-local IDs only. |', '| Priority separation | `PASS` | Priority 1/2/3 applied as requested; `pretestnew` marked `REQUIRES_SOURCE_RESTORATION`. |', '| SHA-256 preservation | `PASS` | Package and per-artifact SHA-256 values recorded. |', '| Legacy comparison | `PASS — READ_ONLY` | Seven legacy assets compared using Phase 7.8.10 evidence. |', '| Identity links | `NOT_PERFORMED` | No SRC/CAND IDs or identity links created, as required. |', '| Owner/publisher/version | `BLOCKED` | Not consistently supplied or independently verified. |', '| Rights/display | `BLOCKED` | License, text/image use, and learner-display scope evidence missing. |', '| Clinical review | `BLOCKED` | Independent qualified clinical review not performed. |', '| Track/taxonomy/locators | `BLOCKED` | Explicit governed track, taxonomy version, and precise locator coverage incomplete. |', '| Supersession/replacement | `BLOCKED` | No authorized decision supersedes old sources. |', '| Phase 7.9 adapter/import | `NOT_AUTHORIZED` | No adapter, import, database, activation, or publication is allowed by this phase. |', '']
lines += ['## Exact remaining gates', '', 'Before the updated package can replace any old source, the project needs a versioned source registry with owner/publisher/edition/language/locator evidence, a supersession decision preserving old lineage, independent rights/display evidence, explicit track/taxonomy assignment, clinical review, and a separate identity decision. `pretestnew_Study_Guide_UTF8.txt` additionally requires source restoration before controlled transformation.', '', '## Non-actions', '', 'No production JSON was generated. No database or schema was changed. No adapter was designed or executed. No source was deleted, renamed, overwritten, merged, or replaced. No identity links or SRC/CAND IDs were assigned. No content transformation, clinical correction, medical approval, rights approval, activation, publication, or learner exposure occurred.', '', '## Next allowed phase', '', 'The next allowed phase is governed metadata completion and replacement-gate review. Priority 1 files may be queued for source-locator and independent clinical/rights review preparation only. The project must not proceed to Phase 7.9 based on this report.', '', '## References', '', '[1]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_10_UPDATED_SOURCE_PACKAGE_REVIEW.md "Phase 7.8.10 updated package review"', '[2]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_11_UPDATED_SOURCE_REGISTRY.md "Phase 7.8.11 updated source registry"', '[3]: file:///home/ubuntu/seg-internship-output/SEG_PHASE_7_8_11_LEGACY_COMPARISON_MATRIX.md "Phase 7.8.11 legacy comparison matrix"', '[4]: file:///home/ubuntu/skills/seg-metadata-source-mapper/SKILL.md "SEG metadata/source mapping governance"', '']
(OUT / 'SEG_PHASE_7_8_11_GATE_REPORT.md').write_text('\n'.join(lines), encoding='utf-8')

print('created Phase 7.8.11 registry, comparison matrix, and gate report')
print(f'package_sha256={package_sha}')
print(f'entries={len(entries)}')
