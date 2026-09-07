import fs from 'fs';

const html = fs.readFileSync('data/ipn_dump/after_company_select.html', 'utf8');

// Find all links containing 'products' or 'article' or 'stock' or 'season' or 'temporada' or 'precio' or 'catalog'
const links = html.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi);
const matches = [];

for (const m of links) {
  const href = m[1].trim();
  const text = m[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  if (/product|art[ií]cul|stock|temporad|season|precio|talle|color|rubro|categor|marca|b2b|b2c|pedido|venta|caja|pos/i.test(href) || 
      /product|art[ií]cul|stock|temporad|season|precio|talle|color|rubro|categor|marca|b2b|b2c|pedido|venta|caja|pos/i.test(text)) {
    matches.push({ text, href });
  }
}

console.log(`Matching Product/Catalog Links (${matches.length}):`);
console.table(matches);

fs.writeFileSync('data/ipn_dump/catalog_links.json', JSON.stringify(matches, null, 2));
