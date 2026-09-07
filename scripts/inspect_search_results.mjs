import fs from 'fs';

function inspectResults() {
  const html = fs.readFileSync('data/real_ipn_export/products_search_results.html', 'utf8');
  
  // Find all rows or products
  const matches = html.match(/masterPID[=\d"'\s]+|productID[=\d"'\s]+/gi) || [];
  console.log('Matches of masterPID / productID:', matches.slice(0, 20));

  // Find all links
  const links = html.match(/href="([^"]+)"/gi) || [];
  console.log('Sample links in results:', links.filter(l => l.includes('control') || l.includes('product')).slice(0, 20));

  // Find images
  const imgs = html.match(/src="([^"]+)"/gi) || [];
  console.log('Sample images:', imgs.filter(i => i.includes('jpg') || i.includes('png') || i.includes('product')).slice(0, 10));

  // Look for text in tables
  const rows = html.match(/<tr[\s\S]*?<\/tr>/gi) || [];
  console.log(`Total rows in results: ${rows.length}`);
  for (let i = 0; i < Math.min(25, rows.length); i++) {
    const text = rows[i].replace(/<[^>]+>/g, ' | ').replace(/\s+/g, ' ').trim();
    if (text.length > 20 && !text.includes('Seleccione')) {
      console.log(`Row ${i}:`, text);
    }
  }
}

inspectResults();
