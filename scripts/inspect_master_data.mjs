import fs from 'fs';
import path from 'path';

function extractTableRows(html) {
  const rows = [];
  const trMatches = html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
  for (const tr of trMatches) {
    const cells = [];
    const cellMatches = tr[1].matchAll(/<(?:td|th)[^>]*>([\s\S]*?)<\/(?:td|th)>/gi);
    for (const td of cellMatches) {
      cells.push(td[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));
    }
    if (cells.length > 0 && cells.some(c => c.length > 0)) {
      rows.push(cells);
    }
  }
  return rows;
}

const dir = 'data/ipn_dump/core_modules';
const files = [
  { name: 'Marcas', file: 'trademarks_brands.html' },
  { name: 'Tipos de Producto', file: 'product_types.html' },
  { name: 'Categorías', file: 'product_categories.html' },
  { name: 'Colores', file: 'colors.html' },
  { name: 'Listas de Precios', file: 'price_lists_config.html' }
];

const masterData = {};

for (const f of files) {
  const fullPath = path.join(dir, f.file);
  if (fs.existsSync(fullPath)) {
    const html = fs.readFileSync(fullPath, 'utf8');
    masterData[f.name] = extractTableRows(html);
    console.log(`\n=== ${f.name} (Total rows: ${masterData[f.name].length}) ===`);
    console.table(masterData[f.name].slice(0, 15));
  }
}

fs.writeFileSync('data/ipn_dump/master_data_extracted.json', JSON.stringify(masterData, null, 2));
