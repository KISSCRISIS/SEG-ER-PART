import { readFileSync } from 'node:fs';

const lines = readFileSync('./pilot-edic-arabic.jsonl', 'utf8').trim().split('\n');
const data = lines.map(l => { try { return JSON.parse(l) } catch(e) { return null } }).filter(Boolean);

console.log('Valid entries:', data.length);
console.log('');

let prefixes = new Map();
let noParens = [];
let tooShort = [];
let totalLen = 0;

for (let i = 0; i < data.length; i++) {
  const ar = data[i].arabicExplanation;
  const en = data[i].englishExplanation;
  const q = data[i].question;
  
  const prefix = ar.match(/^[^:]+:/);
  const prefixName = prefix ? prefix[0] : 'none';
  prefixes.set(prefixName, (prefixes.get(prefixName) || 0) + 1);
  
  const hasParens = /\([^)]+\)/.test(ar);
  const hasEnglishTerms = /[A-Z][a-z]+(?:[A-Z][a-z]+)+/.test(ar) || /[A-Z]{2,}/.test(ar);
  
  totalLen += ar.length;
  
  if (!hasParens) noParens.push(i + 1);
  if (ar.length < 100) tooShort.push({ q: i + 1, len: ar.length });
  
  console.log(`Q${i+1}: prefix="${prefixName}" | len=${ar.length} | parens=${hasParens} | engTerms=${hasEnglishTerms} | question=${q.substring(0,50)}...`);
}

console.log('\n=== SUMMARY ===');
console.log('Total questions:', data.length);
console.log('Average Arabic length:', Math.round(totalLen / data.length));
console.log('\nPrefix distribution:');
for (const [k, v] of prefixes) console.log(`  ${k}: ${v}`);
console.log('\nQuestions without English terms in parens:', noParens.length ? noParens.join(', ') : 'none');
console.log('Questions too short (<100 chars):', tooShort.length ? tooShort.map(t=>'Q'+t.q).join(', ') : 'none');
