import fs from 'fs';

const html = fs.readFileSync('scripts/products_page.html', 'utf8');

// Let's find product links or containers
const productBlocks = [];
const lines = html.split('\n');
console.log('Total lines:', lines.length);

// Let's search for some patterns
const productIds = [];
const idMatches = html.matchAll(/(?:data-id|data-product-id|data-articulo|id=)["']?(\d+)["']?/gi);
for (const m of idMatches) {
  // console.log(m[0]);
}

// Let's check sections or containers
const formActions = [...html.matchAll(/action=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Form actions:', formActions);

// Let's search for class names containing product or item
const classMatches = [...html.matchAll(/class=["']([^"']+)["']/gi)].map(m => m[1]);
const uniqueClasses = [...new Set(classMatches)].filter(c => /prod|art|card|item|list|grid/i.test(c));
console.log('Relevant classes:', uniqueClasses);

// Let's look for product elements snippet
const snippetMatch = html.match(/<div[^>]*class="[^"]*(?:product|card|articulo|catalog-item)[^"]*"[^>]*>[\s\S]{1,1000}/i);
if (snippetMatch) {
  console.log('Product element snippet:', snippetMatch[0]);
} else {
  // Let's look for images or titles
  console.log('Searching for images under /images/ or similar:');
  const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)].slice(0, 10).map(m => m[0]);
  console.log('Sample images:', imgMatches);
}
