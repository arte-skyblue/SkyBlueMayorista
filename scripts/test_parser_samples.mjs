import fs from 'fs';
import { parseProductDetailHtml } from './parse_detail_helper.mjs';

const files = [
  { file: 'scripts/product_detail_3924.html', id: '3924' },
  { file: 'scripts/sample_4228.html', id: '4228' },
  { file: 'scripts/sample_4658.html', id: '4658' }
];

for (const f of files) {
  if (fs.existsSync(f.file)) {
    const html = fs.readFileSync(f.file, 'utf8');
    const parsed = parseProductDetailHtml(html, f.id);
    console.log(`\n=== Parsed ${f.id} ===`);
    console.log(JSON.stringify(parsed, null, 2));
  }
}
