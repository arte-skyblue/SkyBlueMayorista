import fs from 'fs';

const html = fs.readFileSync('scripts/products_page.html', 'utf8');

const articleRegex = /<article\b([\s\S]*?)<\/article>/gi;
let match;
const products = [];

while ((match = articleRegex.exec(html)) !== null) {
  const articleHtml = match[1];
  const idMatch = articleHtml.match(/b2bproductid=["']?(\d+)["']?/i);
  const id = idMatch ? idMatch[1] : null;
  const brandMatch = articleHtml.match(/<p class="download-card__content-box__brand">\s*([^<]+)\s*<\/p>/i);
  const brand = brandMatch ? brandMatch[1].trim() : null;
  const codeMatch = articleHtml.match(/<h2 class="download-card__content-box__catagory">\s*<span>([^<]+)<\/span>/i);
  const code = codeMatch ? codeMatch[1].trim() : null;
  products.push({ id, code, brand });
}

console.log('Sample PETITE JOLIE:', products.filter(p => p.brand === 'PETITE JOLIE').slice(0, 3));
console.log('Sample REFRESH:', products.filter(p => p.brand === 'REFRESH').slice(0, 3));
console.log('Sample Xti:', products.filter(p => p.brand.includes('Xti')).slice(0, 3));
