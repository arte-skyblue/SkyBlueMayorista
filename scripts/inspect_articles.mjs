import fs from 'fs';

const html = fs.readFileSync('scripts/products_page.html', 'utf8');

// Find all article tags
const articles = [];
const articleRegex = /<article\b[^>]*>([\s\S]*?)<\/article>/gi;
let match;
while ((match = articleRegex.exec(html)) !== null) {
  articles.push(match[0]);
}

console.log('Total articles found on page:', articles.length);

if (articles.length > 0) {
  console.log('\n--- SAMPLE ARTICLE 1 ---\n');
  console.log(articles[0]);

  console.log('\n--- SAMPLE ARTICLE 2 (con stock si hay) ---\n');
  const available = articles.find(a => !a.includes('producto-no-disponible'));
  if (available) {
    console.log(available);
  } else {
    console.log(articles[1] || 'No second article');
  }
}
