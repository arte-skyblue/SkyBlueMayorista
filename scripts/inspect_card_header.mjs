import fs from 'fs';

const html = fs.readFileSync('scripts/product_detail_3924.html', 'utf8');

const start = html.indexOf('<div class="pd-detail-content product-main-card">');
const end = html.indexOf('<table');

console.log(html.slice(start, end));
