from pathlib import Path
import csv, json, re, hashlib, unicodedata
from collections import Counter, defaultdict

BASE = Path('/home/ubuntu/seg-legacy-knowledge-audit-input')
OUT = Path('/home/ubuntu/seg-manus-status')
ASSETS = [
    'officialUnifiedTopics.json', 'referenceLibrary.json', 'flashcards.json',
    'examTraps.json', 'algorithms.json', 'arabicMentorExplanations.json',
    'topicFamilyIndex.json', 'antidotes.json'
]
CAND_PATH = Path('/home/ubuntu/seg-internship-output/SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv')
PREP_PATH = Path('/home/ubuntu/seg-internship-output/SEG_PHASE_7_8_IMPORT_PREPARATION_MAP.md')

id_keys = ['id','key','uid','uuid','slug','topicId','topic_id','familyId','family_id','cardId','card_id','questionId','question_id','bookId','book_id','trapId','trap_id','algorithmId','algorithm_id','antidoteId','antidote_id']
title_keys = ['title','name','label','topic','question','questionText','question_text','englishTitle','arabicTitle','chapter','chapterName','chapter_name']
topic_keys = ['topic','topicName','topic_name','family','familyName','family_name','topicFamily','topic_family','category','subject','domain','section','chapter','chapterName','chapter_name']
ref_keys = ['reference','references','source','sources','book','books','framework','frameworks','citation','citations','referenceName','reference_name']


def norm(x):
    if x is None: return ''
    s = unicodedata.normalize('NFKC', str(x)).lower().strip()
    s = re.sub(r'[^\w\u0600-\u06ff]+', ' ', s, flags=re.UNICODE)
    return re.sub(r'\s+', ' ', s).strip()


def scalar(v):
    return v if isinstance(v, (str,int,float,bool)) else None


def first_field(obj, keys):
    for k in keys:
        if k in obj:
            v = scalar(obj[k])
            if v is not None and str(v).strip():
                return str(v).strip()
    return ''


def compact_fields(obj, keys):
    found = []
    for k in keys:
        if k in obj:
            v = obj[k]
            if isinstance(v, list):
                vals = [str(x).strip() for x in v if isinstance(x,(str,int,float,bool)) and str(x).strip()]
                if vals: found.append(f'{k}=' + ' || '.join(vals[:8]))
            elif isinstance(v, dict):
                vals = []
                for kk, vv in v.items():
                    if isinstance(vv,(str,int,float,bool)) and str(vv).strip(): vals.append(f'{kk}:{vv}')
                if vals: found.append(f'{k}=' + '; '.join(vals[:8]))
            elif scalar(v) is not None and str(v).strip():
                found.append(f'{k}={v}')
    return ' | '.join(found[:10])


def is_record(d):
    if not isinstance(d, dict): return False
    return any(k in d for k in id_keys + title_keys + topic_keys + ref_keys + ['answer','options','steps','algorithm','antidote','toxin','trap','explanation'])


def extract_records(data):
    if isinstance(data, list):
        return [(i, x) for i,x in enumerate(data) if isinstance(x, dict)]
    if not isinstance(data, dict): return []
    # Prefer the first meaningful top-level collection, preserving object order.
    preferred = ['items','data','entries','topics','cards','flashcards','questions','families','traps','algorithms','books','chapters','records','antidotes']
    for k in preferred:
        v = data.get(k)
        if isinstance(v, list) and any(isinstance(x, dict) for x in v):
            return [(i, x) for i,x in enumerate(v) if isinstance(x, dict)]
    list_values = [(k,v) for k,v in data.items() if isinstance(v,list) and any(isinstance(x,dict) for x in v)]
    if list_values:
        k,v = list_values[0]
        return [(f'{k}[{i}]', x) for i,x in enumerate(v) if isinstance(x,dict)]
    if is_record(data): return [('root', data)]
    return []


def load_candidates():
    rows=[]
    with CAND_PATH.open(encoding='utf-8') as f:
        reader=csv.DictReader(f, delimiter='\t')
        headers=reader.fieldnames or []
        for row in reader:
            rows.append(row)
    return headers, rows


def candidate_tokens(row):
    vals=[]
    for h,v in row.items():
        if v and any(x in h.lower() for x in ['id','path','title','name','topic','source']):
            vals.append((h,str(v).strip()))
    return vals


def path_stem_tokens(row):
    vals=[]
    for h,v in candidate_tokens(row):
        if 'path' in h.lower() or 'source' in h.lower():
            s=Path(v).stem
            vals.append(norm(s.replace('_',' ').replace('-',' ')))
    return [x for x in vals if x]


def first_value(row, terms):
    for h,v in row.items():
        if v and any(term in h.lower() for term in terms): return str(v).strip()
    return ''

TARGETS = {
    'officialUnifiedTopics.json': ('lesson','topic/lesson source; no direct record until metadata and review closure'),
    'referenceLibrary.json': ('book','book/reference_framework only; no ownership or display rights inferred'),
    'flashcards.json': ('question_bank','question_bank enrichment candidate; not a production assessment'),
    'examTraps.json': ('question_bank','derived exam-intelligence enrichment; requires medical review'),
    'algorithms.json': ('clinical_case','support-only educational algorithm candidate; not a complete case/protocol'),
    'arabicMentorExplanations.json': ('lesson','SEG educational-layer candidate; authorship/clinical review remain open'),
    'topicFamilyIndex.json': ('lesson','taxonomy support only; not a standalone lesson record'),
    'antidotes.json': ('lesson','specialized educational enrichment candidate; target remains provisional'),
}

headers, candidates = load_candidates()
# Build conservative lookup indices from explicit candidate columns only.
by_id=defaultdict(list); by_norm=defaultdict(list); by_path=defaultdict(list)
for row in candidates:
    cid = first_value(row,['candidate','record_id','recordid'])
    sid = first_value(row,['source_id','sourceid'])
    for v in {cid,sid}:
        if v: by_id[norm(v)].append(row)
    for h,v in candidate_tokens(row):
        nv=norm(v)
        if nv and (('title' in h.lower()) or ('name' in h.lower()) or ('topic' in h.lower())):
            by_norm[nv].append(row)
    for v in path_stem_tokens(row): by_path[v].append(row)

records=[]
asset_meta=[]
for fname in ASSETS:
    p=BASE/fname
    raw=p.read_bytes(); data=json.loads(raw.decode('utf-8'))
    recs=extract_records(data)
    asset_meta.append((fname,len(raw),hashlib.sha256(raw).hexdigest(),type(data).__name__,len(recs),list(data.keys())[:20] if isinstance(data,dict) else []))
    for idx,obj in recs:
        legacy_id=first_field(obj,id_keys)
        legacy_key=legacy_id if legacy_id else f'index:{idx}'
        title=first_field(obj,title_keys)
        topic=first_field(obj,topic_keys)
        refs=compact_fields(obj,ref_keys)
        chapter=first_field(obj,['chapter','chapterName','chapter_name','section'])
        # Exact evidence only: explicit id/key equality, then conservative title/path token comparison.
        matched=[]; probable=[]
        for candidate in by_id.get(norm(legacy_id),[]) if legacy_id else []:
            matched.append(first_value(candidate,['candidate','record_id','recordid']) or first_value(candidate,['source_id','sourceid']) or 'UNRESOLVED')
        if not matched:
            nt=norm(title)
            if nt:
                for candidate in by_norm.get(nt,[]):
                    probable.append(first_value(candidate,['candidate','record_id','recordid']) or first_value(candidate,['source_id','sourceid']) or 'UNRESOLVED')
            # Exact stem match is treated as probable only when whole normalized title equals path stem.
            if not probable and nt:
                for candidate in candidates:
                    if nt in path_stem_tokens(candidate):
                        probable.append(first_value(candidate,['candidate','record_id','recordid']) or first_value(candidate,['source_id','sourceid']) or 'UNRESOLVED')
        all_matches=sorted(set(matched+probable))
        if len(all_matches)>1: status='CONFLICT'
        elif matched: status='MATCHED'
        elif probable: status='PROBABLE_MATCH'
        else: status='NO_MATCH'
        cid = all_matches[0] if len(all_matches)==1 else (';'.join(all_matches) if all_matches else 'UNRESOLVED')
        target, rationale=TARGETS[fname]
        records.append({
            'asset':fname,'legacy_key':legacy_key,'legacy_id':legacy_id or 'NOT_PRESENT','title':title or 'NOT_PRESENT',
            'topic':topic or 'NOT_PRESENT','chapter':chapter or 'NOT_PRESENT','references':refs or 'NOT_PRESENT',
            'candidate':cid,'status':status,'target_type':target,'rationale':rationale
        })

out_tsv=OUT/'phase_7_8_7_legacy_object_crosswalk.tsv'
with out_tsv.open('w',encoding='utf-8',newline='') as f:
    fields=['asset','legacy_key','legacy_id','title','topic','chapter','references','candidate','status','target_type','rationale']
    w=csv.DictWriter(f,fieldnames=fields,delimiter='\t'); w.writeheader(); w.writerows(records)

summary=OUT/'phase_7_8_7_legacy_object_crosswalk_summary.md'
counts=Counter(r['status'] for r in records)
by_asset=defaultdict(Counter)
for r in records: by_asset[r['asset']][r['status']]+=1
lines=['# Phase 7.8.7 Object Crosswalk Evidence Summary','',f'- Candidate map headers: {" | ".join(headers)}',f'- Candidate rows: {len(candidates)}',f'- Legacy object rows analyzed: {len(records)}','', '## Status counts','', '| Status | Count |','|---|---:|']
for s in ('MATCHED','PROBABLE_MATCH','NO_MATCH','CONFLICT'): lines.append(f'| {s} | {counts.get(s,0)} |')
lines += ['', '## Asset counts','', '| Asset | Bytes | SHA-256 | Root type | Objects | Status summary |','|---|---:|---|---|---:|---|']
for fname, size, sha, root_type, n, keys in asset_meta:
    ss=', '.join(f'{k}={v}' for k,v in sorted(by_asset[fname].items()))
    lines.append(f'| `{fname}` | {size} | `{sha}` | {root_type} | {n} | {ss} |')
lines += ['', '## Matching constraints','', '- Exact candidate matches use only explicit ID/key equality against candidate-map identity fields.', '- Probable matches use exact observed title/topic equality or exact source-path stem equality; no fuzzy similarity is used.', '- No match is not a rejection of the medical content; it means no candidate-level join is evidenced by the supplied fields.', '- No clinical, rights, version, locator, taxonomy, or ownership value is invented.']
summary.write_text('\n'.join(lines)+'\n',encoding='utf-8')
print(summary)
print(out_tsv)
print(f'legacy_objects={len(records)} candidates={len(candidates)}')
print('status_counts=' + ' '.join(f'{k}:{counts.get(k,0)}' for k in ('MATCHED','PROBABLE_MATCH','NO_MATCH','CONFLICT')))
