import fs from 'fs';

const html = fs.readFileSync('scripts/sample_4228.html', 'utf8');

const start = html.indexOf('<div class="pd-detail-content product-main-card">');
const end = html.indexOf('<!--SLIDER DE ARTÍCULOS RELACIONADOS-->');

console.log(html.slice(start, end));
