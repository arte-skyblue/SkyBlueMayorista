import fs from 'fs';

function findDetailTabUrls() {
  const html = fs.readFileSync('data/real_ipn_export/sample_product_details.html', 'utf8');
  const links = Array.from(html.matchAll(/href="([^"]+)"/gi), m => m[1]);
  console.log('All links in details.asp:', Array.from(new Set(links)).filter(l => l.includes('control') || l.includes('Stock') || l.includes('price') || l.includes('asp')));
}

findDetailTabUrls();
