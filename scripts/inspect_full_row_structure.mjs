import fs from 'fs';

const html = fs.readFileSync('data/real_ipn_export/ws_products_list_p1.html', 'utf8');

// Match rows
const rows = html.match(/<tr[^>]*name=['"]ItemTR['"][^>]*>([\s\S]*?)<\/tr>/gi) || [];
console.log('Total ItemTR rows found in Page 1:', rows.length);

if (rows.length > 1) {
  console.log('Row 1 HTML:');
  console.log(rows[1]);
}
