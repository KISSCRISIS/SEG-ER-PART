from pathlib import Path
import csv, json
BASE=Path('/home/ubuntu/seg-legacy-knowledge-audit-input')
CAND=Path('/home/ubuntu/seg-internship-output/SEG_PHASE_7_6_CANDIDATE_RECORD_MAP.tsv')
with CAND.open(encoding='utf-8') as f:
    r=csv.DictReader(f, delimiter='\t')
    print('HEADERS:', r.fieldnames)
    for i,row in zip(range(5),r):
        print('CAND', i, {k:row.get(k,'') for k in ['source_id','target_type','candidate_record_id','source_path','duplicate_lineage','duplicate_role']})
for name in ['officialUnifiedTopics.json','referenceLibrary.json','flashcards.json','examTraps.json','algorithms.json','arabicMentorExplanations.json','topicFamilyIndex.json','antidotes.json']:
    data=json.loads((BASE/name).read_text(encoding='utf-8'))
    obj=data[0] if isinstance(data,list) and data else data
    print('ASSET',name,'root=',type(data).__name__,'first_keys=',list(obj.keys())[:40] if isinstance(obj,dict) else [])
    if isinstance(obj,dict):
        vals={k:obj[k] for k in list(obj.keys())[:12] if isinstance(obj[k],(str,int,float,bool))}
        print('SCALARS',vals)
