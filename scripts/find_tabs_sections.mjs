import fs from 'fs';

function findTabsAndSections() {
  const html = fs.readFileSync('data/real_ipn_export/sample_product_details.html', 'utf8');
  
  // Search for div IDs, class names or headers
  const divs = Array.from(html.matchAll(/<div[^>]+id="([^"]+)"[^>]*>/gi), m => m[1]);
  console.log('Div IDs in details.asp:', divs);

  // Search for tables or tabs
  const h2h3 = Array.from(html.matchAll(/<(?:h1|h2|h3|h4|strong|b|legend)[^>]*>([\s\S]*?)<\/(?:h1|h2|h3|h4|strong|b|legend)>/gi), m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('Headers in details.asp:', Array.from(new Set(h2h3)).filter(h => h.length > 2));
}

findTabsAndSections();
