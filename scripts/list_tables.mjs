import fs from 'fs';

const html = fs.readFileSync('scripts/sample_4228.html', 'utf8');
const tables = [...html.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/gi)];

console.log('Total tables in page:', tables.length);
tables.forEach((t, i) => {
  const tableTag = t[0].match(/<table\b[^>]*>/i)[0];
  console.log(`\n--- TABLE ${i}: ${tableTag} ---`);
  console.log(t[0].slice(0, 400));
});
