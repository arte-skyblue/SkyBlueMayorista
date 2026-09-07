import fs from 'fs';
import path from 'path';

function inspectExactHtml() {
  const html = fs.readFileSync('data/real_ipn_export/all_pages/page_1.html', 'utf8');
  const rows = html.match(/<tr[^>]*name=['"]ItemTR['"][^>]*>([\s\S]*?)<\/tr>/gi) || [];

  console.log(`Found ${rows.length} rows in page 1. Inspecting first 5 rows:`);

  for (let i = 0; i < Math.min(5, rows.length); i++) {
    const row = rows[i];
    if (row.includes('headerRow')) continue;

    console.log(`\n--- ROW ${i} ---`);
    // Print all <td> elements in the row
    const tds = row.match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || [];
    tds.forEach((td, tdIdx) => {
      const text = td.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      console.log(`TD [${tdIdx}]: ${text}`);
    });
  }
}

inspectExactHtml();
