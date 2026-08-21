import fs from 'fs';

const html = fs.readFileSync('scripts/products_page.html', 'utf8');

const articleRegex = /<article\b([\s\S]*?)<\/article>/gi;
let match;
const products = [];

while ((match = articleRegex.exec(html)) !== null) {
  const articleHtml = match[1];
  
  // Extract b2bproductid
  const idMatch = articleHtml.match(/b2bproductid=["']?(\d+)["']?/i);
  const id = idMatch ? idMatch[1] : null;

  // Extract link
  const linkMatch = articleHtml.match(/href=["'](\/Products\/\d+)["']/i);
  const url = linkMatch ? `https://mayoristas.skyblue.com.ar${linkMatch[1]}` : (id ? `https://mayoristas.skyblue.com.ar/Products/${id}` : null);

  // Extract image
  const imgMatch = articleHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
  const image = imgMatch ? imgMatch[1] : null;

  // Extract category / code (catagory class)
  const codeMatch = articleHtml.match(/<h2 class="download-card__content-box__catagory">\s*<span>([^<]+)<\/span>/i);
  const code = codeMatch ? codeMatch[1].trim() : null;

  // Extract title
  const titleMatch = articleHtml.match(/<h3 class="download-card__content-box__title">\s*([^<]+)\s*<\/h3>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;

  // Extract brand
  const brandMatch = articleHtml.match(/<p class="download-card__content-box__brand">\s*([^<]+)\s*<\/p>/i);
  const brand = brandMatch ? brandMatch[1].trim() : null;

  // Extract availability
  const isUnavailable = articleHtml.includes('producto-no-disponible') || articleHtml.includes('no-disponible');
  const available = !isUnavailable;

  // Extract price
  const priceMatch = articleHtml.match(/<h3 class="download-card__content-box__title price-color">([\s\S]*?)<\/h3>/i);
  let price = null;
  let priceText = null;
  if (priceMatch) {
    const rawPrice = priceMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    priceText = rawPrice;
    const numMatch = rawPrice.match(/\$\s*([\d\.,]+)/);
    if (numMatch) {
      price = parseFloat(numMatch[1].replace(/\./g, '').replace(',', '.'));
    }
  }

  products.push({
    id,
    code,
    title,
    brand,
    price,
    priceText,
    available,
    image,
    url
  });
}

console.log(`Parsed ${products.length} products.`);
console.log('Sample parsed products:');
console.log(JSON.stringify(products.slice(0, 5), null, 2));

const brandsCount = {};
let availableCount = 0;
for (const p of products) {
  brandsCount[p.brand] = (brandsCount[p.brand] || 0) + 1;
  if (p.available) availableCount++;
}

console.log('\nBrands breakdown:', brandsCount);
console.log(`Available products: ${availableCount} / ${products.length}`);
