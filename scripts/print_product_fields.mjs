import fs from 'fs';

const fields = JSON.parse(fs.readFileSync('data/ipn_dump/product_add_fields.json', 'utf8'));

console.log('--- All Selects in Product Form ---');
for (const f of fields) {
  if (f.tag === 'select') {
    console.log(`\nSelect: "${f.name}" (Options: ${f.optionsCount})`);
    console.log(f.sampleOptions);
  }
}

console.log('\n--- All Inputs in Product Form ---');
for (const f of fields) {
  if (f.tag === 'input') {
    console.log(`Input: name="${f.name}", id="${f.id}", type="${f.type}", value="${f.value}"`);
  }
}
