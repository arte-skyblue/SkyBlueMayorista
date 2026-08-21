import fs from 'fs';

const html = fs.readFileSync('scripts/products_page.html', 'utf8');

// Find all filter lists
const filterLists = [...html.matchAll(/<ul class="filter-list"[\s\S]*?<\/ul>/gi)];
console.log('Total filter lists:', filterLists.length);
filterLists.forEach((fl, idx) => {
  console.log(`\n--- FILTER LIST ${idx} ---\n`, fl[0]);
});
