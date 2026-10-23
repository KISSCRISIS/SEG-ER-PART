import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
const dir="SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE";
const files=fs.readdirSync(dir).filter(f=>f.endsWith("-question-bank.jsonl"));
const seen=new Map(); const banks=[];
for(const file of files){const rows=fs.readFileSync(path.join(dir,file),"utf8").split(/\r?\n/).filter(Boolean).map(JSON.parse); let missing=0; for(const q of rows){if(!q.question||!q.options||!q.correctAnswerKey) missing++; const key=crypto.createHash("sha1").update(String(q.question).trim().toLowerCase()).digest("hex"); seen.set(key,(seen.get(key)||0)+1);} banks.push({file,source:file.replace("-question-bank.jsonl",""),count:rows.length,missingRequiredFields:missing});}
const duplicates=[...seen.values()].filter(n=>n>1).reduce((a,n)=>a+n,0);
fs.writeFileSync(path.join(dir,"qbank-audit.json"),JSON.stringify({generatedAt:new Date().toISOString(),banks,total:banks.reduce((a,b)=>a+b.count,0),duplicateQuestionRecords:duplicates,canonicalFields:["Question","Options","CorrectAnswer","EnglishExplanation","ArabicExplanation","Source","Page","Chapter","Category","Difficulty","ClinicalScenario"]},null,2));
console.log(JSON.stringify({total:banks.reduce((a,b)=>a+b.count,0),duplicateQuestionRecords:duplicates,banks}));
