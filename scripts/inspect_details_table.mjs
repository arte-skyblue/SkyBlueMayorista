import fs from 'fs';

function inspectDetailsTable() {
  const html = fs.readFileSync('data/real_ipn_export/sample_product_details.html', 'utf8');
  
  // Extract all sections and fields
  const rows = html.match(/<tr[\s\S]*?<\/tr>/gi) || [];
  console.log(`Total rows in details: ${rows.length}`);
  
  for (let i = 0; i < rows.length; i++) {
    const text = rows[i].replace(/<[^>]+>/g, ' | ').replace(/\s+/g, ' ').trim();
    if (text.length > 5 && !text.includes('DANIEL ALEJANDRO GRASSO')) {
      console.log(`[Row ${i}]: ${text}`);
    }
  }
}

inspectDetailsTable();
