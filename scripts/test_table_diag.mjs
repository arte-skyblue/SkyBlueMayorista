import fs from 'fs';

const html = fs.readFileSync('scripts/sample_4228.html', 'utf8');
const tableMatch = html.match(/<table[\s\S]*?class="[^"]*prices-table[^"]*"[\s\S]*?>([\s\S]*?)<\/table>/i);

if (tableMatch) {
  console.log('Table found! Length:', tableMatch[0].length);
  const rows = [...tableMatch[1].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)];
  console.log('Total rows found (including thead):', rows.length);

  for (let i = 0; i < rows.length; i++) {
    console.log(`--- ROW ${i} ---`);
    console.log(rows[i][0].slice(0, 300));
  }
} else {
  console.log('Table not matched');
}
