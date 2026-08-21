import fs from 'fs';

const html = fs.readFileSync('scripts/products_page.html', 'utf8');

// Find filters
const filterSection = html.match(/<form[^>]*id="filterForm"[^>]*>([\s\S]*?)<\/form>/i) || html.match(/class="filter-list"[\s\S]*?<\/div>/i);
if (filterSection) {
  console.log('Filter section preview:\n', filterSection[0].slice(0, 2000));
}

// Check brands in products page
const brands = [...html.matchAll(/name="Brands"[^>]*value="([^"]*)"[^>]*>([^<]*)/gi)].map(m => ({ id: m[1], text: m[2].trim() }));
console.log('Brands found:', brands);

const seasons = [...html.matchAll(/name="Seasons"[^>]*value="([^"]*)"[^>]*>([^<]*)/gi)].map(m => ({ id: m[1], text: m[2].trim() }));
console.log('Seasons found:', seasons);

const categories = [...html.matchAll(/name="Categories"[^>]*value="([^"]*)"[^>]*>([^<]*)/gi)].map(m => ({ id: m[1], text: m[2].trim() }));
console.log('Categories found:', categories);
