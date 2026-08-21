import fs from 'fs';

const html = fs.readFileSync('scripts/product_detail_3924.html', 'utf8');

// Find the main product container
const mainMatch = html.match(/<div class="pd-detail-content product-main-card">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i);
if (mainMatch) {
  console.log('Main product card:\n', mainMatch[0]);
} else {
  // Extract between pd-detail-content and SLIDER DE ARTÍCULOS RELACIONADOS
  const start = html.indexOf('product-main-card');
  const end = html.indexOf('SLIDER DE ARTÍCULOS RELACIONADOS');
  if (start !== -1 && end !== -1) {
    console.log(html.slice(start - 20, end));
  } else {
    console.log('Not found');
  }
}
