import fs from 'fs';

const items = JSON.parse(fs.readFileSync('data/ipn_dump/menu_structure.json', 'utf8'));
const categorized = [];

for (const item of items) {
  if (item.link && !item.link.includes('terminos') && !item.link.includes('privacidad') && !item.link.includes('certipedia')) {
    categorized.push({
      title: item.text.replace(/\s+/g, ' ').trim(),
      url: item.link
    });
  }
}

// Remove duplicates by URL
const unique = [];
const seen = new Set();
for (const c of categorized) {
  if (!seen.has(c.url)) {
    seen.add(c.url);
    unique.push(c);
  }
}

console.log(`Total Unique Operational Endpoints/Pages: ${unique.length}\n`);
for (const u of unique) {
  console.log(`- [${u.title}](${u.url})`);
}

fs.writeFileSync('data/ipn_dump/unique_erp_endpoints.json', JSON.stringify(unique, null, 2));
