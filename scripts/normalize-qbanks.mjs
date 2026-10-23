import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
const src="SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE";
const out=path.join(src,"normalized"); fs.mkdirSync(out,{recursive:true});
const files=fs.readdirSync(src).filter(f=>f.endsWith("-question-bank.jsonl")); const seen=new Set(); let total=0,dupes=0;
for(const file of files){const rows=fs.readFileSync(path.join(src,file),"utf8").split(/\r?\n/).filter(Boolean).map(JSON.parse); const result=[];
 for(const q of rows){const key=crypto.createHash("sha1").update(String(q.question).trim().toLowerCase()).digest("hex"); if(seen.has(key)){dupes++;continue;} seen.add(key); const answerKey=q.correctAnswerKey ?? q.options?.find(o=>o.text?.trim().toLowerCase()===String(q.correctAnswer).trim().toLowerCase())?.key ?? null;
  result.push({Question_ID:q.id,Question:q.question,Options:q.options??[],Answer:answerKey,CorrectAnswer:q.correctAnswer??null,ExplanationEN:q.englishExplanation??"",ExplanationAR:q.arabicExplanation??"",Source:q.family??file.replace("-question-bank.jsonl",""),Chapter:q.chapterTitle??"",Category:q.family??"",Difficulty:q.difficulty??"unclassified",ClinicalScenario:q.clinicalScenario??q.question,Page:q.sourceLocator?.page??q.sourceLocator?.pdfPage??null,References:q.references??[],ReviewStatus:q.governanceStatus??"under-review",Provenance:{sourceFile:file,sourceQuestionNumber:q.sourceQuestionNumber??null}}); total++;
 }
 fs.writeFileSync(path.join(out,file),result.map(x=>JSON.stringify(x)).join("\n")+"\n");
}
fs.writeFileSync(path.join(out,"manifest.json"),JSON.stringify({generatedAt:new Date().toISOString(),total,duplicatesRemoved:dupes,canonicalFields:["Question_ID","Question","Options","Answer","CorrectAnswer","ExplanationEN","ExplanationAR","Source","Chapter","Category","Difficulty","ClinicalScenario","Page","References","ReviewStatus","Provenance"]},null,2)); console.log({total,duplicatesRemoved:dupes});
