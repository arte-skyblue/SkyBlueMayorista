import fs from 'fs';

function parseProductRows() {
  const html = fs.readFileSync('data/real_ipn_export/ws_products_list_p1.html', 'utf8');
  const trMatches = html.match(/<tr[\s\S]*?<\/tr>/gi) || [];
  console.log(`Found ${trMatches.length} <tr> rows in WS response`);

  const parsedProducts = [];

  for (const tr of trMatches) {
    if (!tr.includes('masterProductUID')) continue;

    const uidMatch = tr.match(/masterProductUID=([a-zA-Z0-9\-]+)/i);
    const skuMatch = tr.match(/openProduct\('([^']+)'\)[^>]*>([^<]+)<\/a>/i);
    const imgMatch = tr.match(/src="([^"]+)"/i);

    // Extract all td contents
    const tds = Array.from(tr.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi), m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());

    if (uidMatch) {
      parsedProducts.push({
        uid: uidMatch[1],
        sku: skuMatch ? skuMatch[2].trim() : (tds[1] || 'N/A'),
        tds: tds.slice(0, 10),
        image: imgMatch ? imgMatch[1] : null
      });
    }
  }

  console.log(`Parsed ${parsedProducts.length} valid product items!`);
  console.log('Sample parsed products:', JSON.stringify(parsedProducts.slice(0, 5), null, 2));
}

parseProductRows();
