import fs from 'fs';
import crypto from 'crypto';

const TARGET = 'SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE/edic-sba-2026-question-bank.jsonl';
const BACKUP = 'edic-sba-2026-question-bank.jsonl.before-arabic-merge.bak';

const SOURCES = [
  'edic-arabic-batch-001.jsonl',
  'edic-arabic-batch-002.jsonl',
  'edic-arabic-batch-003.jsonl',
  'edic-arabic-batch-004.jsonl',
  'edic-arabic-batch-005.jsonl',
  'edic-arabic-remaining-u1.jsonl',
  'edic-arabic-remaining-u2.jsonl',
  'edic-arabic-remaining-u3.jsonl',
];

const norm = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const keyOf = (q) => norm(q.question) + ' || ' + norm((q.options || []).map((o) => o.text).join(' '));

// 1. Backup
const originalRaw = fs.readFileSync(TARGET, 'utf8');
if (!fs.existsSync(BACKUP)) {
  fs.writeFileSync(BACKUP, originalRaw, 'utf8');
}
const backupMd5 = crypto.createHash('md5').update(fs.readFileSync(BACKUP)).digest('hex');

const original = originalRaw.trim().split('\n').map((l) => JSON.parse(l));
const originalCount = original.length;

// 2. Load arabic explanations keyed by normalized question
const arabicByKey = new Map();
const arabicByRecord = new Map();
let dupMatches = 0;
let sourceRecords = 0;
for (const f of SOURCES) {
  const lines = fs.readFileSync(f, 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  sourceRecords += lines.length;
  for (const q of lines) {
    const key = keyOf(q);
    if (arabicByKey.has(key)) {
      if (arabicByKey.get(key) !== q.arabicExplanation) {
        console.log('CONFLICT:', f, q.id);
      }
      dupMatches++;
      continue;
    }
    arabicByKey.set(key, q.arabicExplanation);
    arabicByRecord.set(key, q);
  }
}

// 3. Merge
let received = 0;
let answerMismatches = 0;
const merged = original.map((q) => {
  const key = keyOf(q);
  const src = arabicByKey.get(key);
  if (src) {
    received++;
    const rec = arabicByRecord.get(key);
    if (rec && norm(String(rec.correctAnswer)) !== norm(String(q.correctAnswer))) answerMismatches++;
    return { ...q, arabicExplanation: src };
  }
  return q;
});
const missing = merged.length - received;

// 4. Integrity check vs original
let integrityIssues = [];
for (let i = 0; i < merged.length; i++) {
  const o = original[i], m = merged[i];
  for (const field of ['question', 'options', 'correctAnswer', 'correctAnswerKey', 'englishExplanation', 'references', 'metadata', 'id']) {
    if (JSON.stringify(o[field]) !== JSON.stringify(m[field])) integrityIssues.push(`${i}:${field}`);
  }
}
const englishOK = merged.every((q, i) => q.englishExplanation === original[i].englishExplanation);

// 5. Write merged file (validate each line first)
const outLines = merged.map((q) => JSON.stringify(q));
fs.writeFileSync(TARGET, outLines.join('\n') + '\n', 'utf8');
const reread = fs.readFileSync(TARGET, 'utf8').trim().split('\n');
const jsonOK = reread.every((l) => { try { JSON.parse(l); return true; } catch { return false; } });

console.log('=== EDIC ARABIC INTEGRATION FINAL AUDIT ===');
console.log('A. Original record count:', originalCount);
console.log('B. Records receiving arabicExplanation:', received);
console.log('C. Records still missing arabicExplanation:', missing);
console.log('   Source records loaded:', sourceRecords, '| unique keys:', arabicByKey.size, '| duplicate source matches:', dupMatches);
console.log('D. Duplicate matches detected:', dupMatches, '(source-side duplicate keys) | answer mismatches on matched records:', answerMismatches);
console.log('E. Question/options/answer integrity check:', integrityIssues.length === 0 ? 'PASS (0 issues)' : `FAIL ${integrityIssues.length}`);
integrityIssues.slice(0, 5).forEach((i) => console.log('   -', i));
console.log('F. English explanation integrity check:', englishOK ? 'PASS' : 'FAIL');
console.log('G. JSONL validation:', jsonOK ? `PASS (${reread.length} lines)` : 'FAIL');
console.log('H. Backup path:', BACKUP, '| md5:', backupMd5, '| size:', fs.statSync(BACKUP).size);
