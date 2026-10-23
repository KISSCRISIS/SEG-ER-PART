import fs from 'fs';

const srcLines = fs.readFileSync('SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/RESIDENT_EMERGENCY_MEDICINE/edic-sba-2026-question-bank.jsonl', 'utf8').trim().split('\n').map(l => JSON.parse(l));

const covered = new Set();
for (const f of ['001', '002', '003', '004', '005']) {
  const lines = fs.readFileSync(`edic-arabic-batch-${f}.jsonl`, 'utf8').trim().split('\n').map(l => JSON.parse(l));
  for (const q of lines) covered.add(normalize(q.question));
}

function normalize(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

const first500 = srcLines.slice(0, 500);
const rest = srcLines.slice(500);

let dupOfCovered = 0;
const uniqueUnseen = [];

// Track ID patterns
const idPatterns = {};
for (const q of rest) {
  const id = q.id;
  const pattern = id.replace(/\d+/g, 'N');
  idPatterns[pattern] = (idPatterns[pattern] || 0) + 1;

  const n = normalize(q.question);
  if (covered.has(n)) { dupOfCovered++; continue; }
  uniqueUnseen.push(q);
}

// Check uniqueness within the unique set itself
const seen = new Set();
const finalUnique = [];
let internalDups = 0;
for (const q of uniqueUnseen) {
  const n = normalize(q.question);
  if (seen.has(n)) { internalDups++; continue; }
  seen.add(n);
  finalUnique.push(q);
}

// Write queue
fs.writeFileSync('edic-arabic-remaining-unique.jsonl', finalUnique.map(q => JSON.stringify(q)).join('\n') + '\n', 'utf8');

console.log('=== EDIC REMAINING UNIQUE AUDIT ===');
console.log('A. Total remaining records analyzed:', rest.length);
console.log('B. Exact duplicates found (vs covered batches):', dupOfCovered);
console.log('   Internal duplicates within remaining:', internalDups);
console.log('   Total duplicates excluded:', dupOfCovered + internalDups);
console.log('C. Unique unseen questions found:', finalUnique.length);
console.log('D. ID patterns of remaining questions:');
for (const [p, c] of Object.entries(idPatterns)) console.log('   ', p, '->', c, 'records');
console.log('   Unique queue ID range:', finalUnique[0].id, '->', finalUnique[finalUnique.length - 1].id);
console.log('E. Proposed batch plan:');
const batchSize = 100;
const batches = Math.ceil(finalUnique.length / batchSize);
for (let i = 0; i < batches; i++) {
  const chunk = finalUnique.slice(i * batchSize, (i + 1) * batchSize);
  console.log(`   Batch U${i + 1}: ${chunk.length} questions (${chunk[0].id} -> ${chunk[chunk.length - 1].id})`);
}
console.log('Queue written: edic-arabic-remaining-unique.jsonl (' + finalUnique.length + ' records)');
console.log('Coverage stats: source total', srcLines.length, '| first500', first500.length, '| rest', rest.length);
