from pathlib import Path
import csv, hashlib
from collections import Counter, defaultdict

OUT=Path('/home/ubuntu/seg-internship-output')
TSV=Path('/home/ubuntu/seg-manus-status/phase_7_8_7_legacy_object_crosswalk.tsv')
SUMMARY=Path('/home/ubuntu/seg-manus-status/phase_7_8_7_legacy_object_crosswalk_summary.md')
INPUTS=[
    Path('/home/ubuntu/seg-legacy-knowledge-audit-input/officialUnifiedTopics.json'),
    Path('/home/ubuntu/seg-legacy-knowledge-audit-input/referenceLibrary.json'),
    Path('/home/ubuntu/seg-legacy-knowledge-audit-input/flashcards.json'),
    Path('/home/ubuntu/seg-legacy-knowledge-audit-input/examTraps.json'),
    Path('/home/ubuntu/seg-legacy-knowledge-audit-input/algorithms.json'),
    Path('/home/ubuntu/seg-legacy-knowledge-audit-input/arabicMentorExplanations.json'),
    Path('/home/ubuntu/seg-legacy-knowledge-audit-input/topicFamilyIndex.json'),
    Path('/home/ubuntu/seg-legacy-knowledge-audit-input/antidotes.json'),
]

def esc(v):
    s=str(v if v not in (None,'') else 'NOT_PRESENT').replace('\n',' ').replace('\r',' ').replace('|','\\|')
    return s[:500]

def sha(p):
    h=hashlib.sha256()
    with p.open('rb') as f:
        for b in iter(lambda:f.read(1024*1024),b''): h.update(b)
    return h.hexdigest()

with TSV.open(encoding='utf-8', newline='') as f:
    rows=list(csv.DictReader(f, delimiter='\t'))
assert len(rows)==1919, len(rows)
status=Counter(r['status'] for r in rows)
asset_counts=Counter(r['asset'] for r in rows)
type_counts=Counter(r['target_type'] for r in rows)

summary_sha=sha(SUMMARY) if SUMMARY.exists() else 'NOT_AVAILABLE'
input_hashes={p.name:sha(p) for p in INPUTS if p.exists()}

cross=[]
cross += ['# SEG Phase 7.8.7 — Legacy Object Crosswalk','',
'## Scope and decision discipline','',
'This is an object-level evidence crosswalk only. It is not a production record set, import payload, medical review, rights decision, or approval artifact. Each row is derived from the deterministic crosswalk TSV and preserves observed identifiers/labels only. Missing candidate joins remain `UNRESOLVED`; no medical fields, versions, rights, citations, or approvals are inferred.','',
'## Evidence basis','',
'- Legacy object rows analyzed: **1,919** across the eight supplied JSON assets.','- SEG candidate rows available for comparison: **48** from the existing candidate map.','- Matching rule: exact observed identity/key or exact observed title/topic/path-stem equality only; no fuzzy matching.','- Crosswalk summary SHA-256: `'+summary_sha+'`.','- All eight source asset SHA-256 values are listed in the appendix.','',
'## Crosswalk status summary','',
'| Status | Count | Meaning |','|---|---:|---|',
'| MATCHED | %d | No rows had an explicit candidate-level match under the controlled exact-match rules. |'%status.get('MATCHED',0),
'| PROBABLE_MATCH | %d | No rows had a sufficiently exact observed title/topic/path-stem match to assign a candidate. |'%status.get('PROBABLE_MATCH',0),
'| NO_MATCH | %d | No candidate-level join is evidenced by supplied fields; this is not a medical rejection. |'%status.get('NO_MATCH',0),
'| CONFLICT | %d | No explicit conflict was detected; absence of a join remains unresolved rather than conflict. |'%status.get('CONFLICT',0),
'',
'## Object-level mapping table','',
'| Legacy JSON object | Legacy ID / key | Title | Topic | Chapter | References | SEG candidate | Status | SEG_CONTENT_RECORD_V1_1 target | Evidence rationale |','|---|---|---|---|---|---|---|---|---|---|']
for r in rows:
    cross.append('| '+' | '.join([esc(r['asset']),esc(r['legacy_id']),esc(r['title']),esc(r['topic']),esc(r['chapter']),esc(r['references']),esc(r['candidate']),esc(r['status']),esc(r['target_type']),esc(r['rationale'])])+' |')
cross += ['', '## Exact blockers after object-level crosswalk','',
'- **No explicit candidate joins:** 1,919/1,919 legacy objects remain `NO_MATCH`; therefore no object can be promoted to `MATCHED` or `PROBABLE_MATCH` without a source-level cross-reference or authorized deterministic mapping evidence.','- **Identity closure remains open:** original legacy IDs are preserved, but no v1.1 internal candidate ID is assigned to any legacy object in this report.','- **Provenance closure remains open:** source/version/locator evidence is not created by this crosswalk.','- **Rights and clinical gates remain separate and open:** no rights clearance, display permission, clinical review, or Medical Owner approval is inferred.','- **Taxonomy/pathway closure remains open:** observed topics and family labels are retained as labels only; they do not authorize Internship or Resident placement.','- **No adapter dry-run authorization:** the evidence is not sufficient to proceed to `READY_FOR_PHASE_7_9_ADAPTER_DRY_RUN`.','',
'## Source asset hashes','',
'| Asset | SHA-256 |','|---|---|']
for name,h in input_hashes.items(): cross.append(f'| `{name}` | `{h}` |')
cross += ['', '## Non-actions','', '- No JSON was generated.', '- No database import or production record was created.', '- No schema, application, source, or content was modified.', '- No activation, publication, learner exposure, clinical approval, or rights approval occurred.', '']
(OUT/'SEG_PHASE_7_8_7_LEGACY_OBJECT_CROSSWALK.md').write_text('\n'.join(cross)+'\n', encoding='utf-8')

# Taxonomy mapping update
asset_target={
    'officialUnifiedTopics.json':'lesson',
    'referenceLibrary.json':'book + relationships.reference_framework',
    'flashcards.json':'question_bank candidate enrichment',
    'examTraps.json':'question_bank/lesson enrichment candidate',
    'algorithms.json':'clinical_case or clinical_skill support candidate; no direct assignment',
    'arabicMentorExplanations.json':'lesson/question_bank enrichment layer; authorship unresolved',
    'topicFamilyIndex.json':'taxonomy/index metadata only',
    'antidotes.json':'lesson/clinical_skill support candidate; no direct assignment',
}
counts_by_asset=defaultdict(Counter)
for r in rows: counts_by_asset[r['asset']][r['status']]+=1
lines=['# SEG Phase 7.8.7 — Taxonomy Mapping Update','',
'## Controlled interpretation','',
'The supplied legacy objects provide observed topic/family labels and relationships, but the object-level crosswalk produced no explicit joins to the 48 SEG candidates. Accordingly, this update records mapping candidates only; it does not assign pathway, taxonomy, ownership, review, or activation state.','',
'## Asset-to-taxonomy/pathway mapping','',
'| Legacy asset | Observed metadata basis | SEG taxonomy/pathway use | v1.1 target implication | Crosswalk status |','|---|---|---|---|---|']
for asset in [p.name for p in INPUTS]:
    sample=next((r for r in rows if r['asset']==asset),{})
    basis='observed IDs/titles/topics/chapters/family labels where present; no inferred values'
    lines.append('| `%s` | %s | %s | %s | %s |' % (asset,basis,asset_target[asset],sample.get('target_type','UNRESOLVED'),', '.join(f'{k}={v}' for k,v in sorted(counts_by_asset[asset].items()))))
lines += ['', '## Pathway evidence state','',
'- **Internship Doctor Pathway:** not assigned at object level by this report; requires explicit candidate/source crosswalk and owner authorization.','- **Emergency Medicine Resident Pathway:** not assigned at object level by this report; advanced or board relevance cannot be inferred from a topic label alone.','- **Board review relevance:** reference/exam signals may be observed, but no independent pathway assignment or learner exposure is authorized.','- **Emergency Medicine domains:** topics/families are preserved as legacy labels; a taxonomy mapping adapter would require controlled vocabulary matching and review.','',
'## Exact taxonomy blockers','',
'- No `SRC-xxxx` or equivalent SEG candidate key was observed in the crosswalk output for any of the 1,919 objects.','- Family/topic names are not sufficient evidence for pathway placement, level, or clinical governance status.','- No version, locator, rights, or reviewer closure was added.','- No schema records or adapter payload were generated.','', '## Decision', '', '`NO_READY_FOR_ADAPTER_DRY_RUN` — retain all mappings as unresolved preparation evidence pending explicit object-to-source crosswalk evidence and required review gates.', '']
(OUT/'SEG_PHASE_7_8_7_TAXONOMY_MAPPING_UPDATE.md').write_text('\n'.join(lines)+'\n', encoding='utf-8')

# Gate update
status_gate='BLOCKED_PENDING_FINAL_GATES'
gate=['# SEG Phase 7.8.7 — Legacy Object Crosswalk Gate Update','',
'## Final status','',f'`{status_gate}`','',
'## Gate assessment','',
'- Legacy objects analyzed: **1,919/1,919**.','- Candidate comparison set: **48**.','- Object-level statuses: `MATCHED=0`, `PROBABLE_MATCH=0`, `NO_MATCH=1919`, `CONFLICT=0`.','- Candidate-level evidence preservation: original legacy IDs/keys and observed titles/topics/references/chapters are retained; no candidate assignment was invented.','- Target vocabulary: mapping implications are limited to v1.1 target types; no v1.1 record was produced.','- Taxonomy/pathway: labels remain unresolved evidence; no Internship/Resident/Board authorization was assigned.','',
'## Exact remaining gates','',
'1. **GATE-1 — Legacy-to-candidate join key missing:** `0/1919` legacy objects matched; an explicit, authoritative crosswalk contract is required before any candidate-level adapter mapping.','2. **GATE-2 — Candidate schema compatibility:** preserved uppercase handoff IDs do not match the v1.1 lowercase `record_id` pattern; the approved dual-key/internal-ID strategy remains unexecuted and unresolved.','3. **GATE-3 — Basic metadata completeness:** owner, publisher, version, taxonomy, locator, language, review state, and audit evidence remain incomplete or pending; no values are inferred from legacy assets.','4. **GATE-4 — Rights/display review:** independent rights/display evidence remains open for any learner-displayed or copied material. This gate is not treated as a standalone adapter-dry-run blocker when the dry-run is reference-only and explicitly excludes display/import; it remains mandatory before display or activation.','5. **GATE-5 — Clinical review:** independent qualified clinical review evidence is required; this crosswalk performs no clinical review and grants no approval.','6. **GATE-6 — Implementation authorization:** Phase 7.9 adapter/import execution has not been authorized; this report does not grant authorization.','',
'## Conditions that do not independently block a reference-only adapter dry-run','',
'- Unknown external edition, when no edition is asserted or invented.','- Reference-only content, when it remains separated from SEG-owned educational content.','- Unresolved display rights, provided the dry-run produces no learner display and no copied text/images; rights clearance is still required before display/activation.','- Optional metadata, provided it is explicitly optional under the applicable contract.','',
'## Why the final gate remains blocked','',
'GATE-1, GATE-2, GATE-3, GATE-5, and GATE-6 remain open. These are sufficient to prevent `READY_FOR_PHASE_7_9_ADAPTER_DRY_RUN`. GATE-4 remains an independent pre-display/activation requirement and is not silently closed.','',
'## Required next evidence','',
'- An authoritative object-to-source/candidate cross-reference or approved deterministic identity contract.','- Candidate-level version, locator, owner/publisher, language, taxonomy, review-state, audit, and identifier evidence.','- Separate Medical Owner and rights review records where applicable.','- A separately authorized, reversible adapter dry-run contract with no production import or learner display.','',
'## Non-actions','',
'- No JSON generation.','- No import, migration, database write, activation, publication, or learner exposure.','- No schema, application, source, or content modification.','- No clinical approval, rights clearance, ownership claim, or authorization record.','',
'## Conclusion','',
'Object-level legacy analysis is complete as a read-only crosswalk. The evidence is not sufficient for `READY_FOR_PHASE_7_9_ADAPTER_DRY_RUN`; retain `BLOCKED_PENDING_FINAL_GATES` and preserve all unresolved states.', '']
(OUT/'SEG_PHASE_7_8_7_GATE_UPDATE.md').write_text('\n'.join(gate)+'\n', encoding='utf-8')

print('created', [p.name for p in [OUT/'SEG_PHASE_7_8_7_LEGACY_OBJECT_CROSSWALK.md',OUT/'SEG_PHASE_7_8_7_TAXONOMY_MAPPING_UPDATE.md',OUT/'SEG_PHASE_7_8_7_GATE_UPDATE.md']])
print('rows',len(rows),'status',dict(status))
