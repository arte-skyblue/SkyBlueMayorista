import fs from 'fs';

const html = fs.readFileSync('scripts/product_detail_3924.html', 'utf8');

// Find script tags
const scripts = [];
const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  if (!match[0].includes('appInsights') && !match[0].includes('jquery') && !match[0].includes('bootstrap')) {
    scripts.push(match[0]);
  }
}

console.log('Scripts in detail page:');
scripts.forEach((s, idx) => console.log(`--- SCRIPT ${idx} ---\n`, s.slice(0, 1500)));

// Check product info elements
console.log('\n--- HEADINGS & TEXT ---');
const titles = [...html.matchAll(/<(?:h1|h2|h3|h4|span|div|p)\b[^>]*class=["']([^"']*(?:title|desc|price|sku|brand|code|detail|breadcrumb|stock)[^"']*)["'][^>]*>([\s\S]*?)<\/(?:h1|h2|h3|h4|span|div|p)>/gi)]
  .slice(0, 30)
  .map(m => `Class: ${m[1]} -> Content: ${m[2].trim().replace(/\s+/g, ' ').slice(0, 100)}`);
console.log(titles.join('\n'));
