import fs from 'fs';

const html = fs.readFileSync('data/ipn_dump/after_company_select.html', 'utf8');

// Extract all menu structures, links, navbars
const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
const allLinks = [];
let match;

while ((match = linkRegex.exec(html)) !== null) {
  const href = match[1].trim();
  const text = match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  if (href && !href.startsWith('javascript:void') && !href.startsWith('#') && !href.startsWith('mailto:')) {
    allLinks.push({ href, text });
  }
}

console.log('Total Links in Dashboard:', allLinks.length);
fs.writeFileSync('data/ipn_dump/dashboard_links.json', JSON.stringify(allLinks, null, 2));

// Extract Navigation Menu structure (looking for nav, ul, li, menu classes)
console.log('\n--- Menu Items Sample ---');
const uniqueHrefs = new Map();
for (const item of allLinks) {
  if (!uniqueHrefs.has(item.href)) {
    uniqueHrefs.set(item.href, item.text);
  }
}

for (const [href, text] of uniqueHrefs.entries()) {
  console.log(`${href.padEnd(60)} | ${text}`);
}
