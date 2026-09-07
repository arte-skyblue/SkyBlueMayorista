import fs from 'fs';

const html = fs.readFileSync('data/ipn_dump/after_notifications.html', 'utf8');

// Extract all <a> tags with text and href
const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
const links = [];
let match;

while ((match = linkRegex.exec(html)) !== null) {
  const href = match[1].trim();
  const text = match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  if (href && !href.startsWith('javascript:void') && !href.startsWith('#')) {
    links.push({ href, text });
  }
}

console.log('Total links found:', links.length);
console.log('Links overview:');
console.table(links);

fs.writeFileSync('data/ipn_dump/admin_links.json', JSON.stringify(links, null, 2));
