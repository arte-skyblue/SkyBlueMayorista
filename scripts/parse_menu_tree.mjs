import fs from 'fs';

const html = fs.readFileSync('data/ipn_dump/after_company_select.html', 'utf8');

// Find all top navigation and submenus
// In IPN ERP, let's see the menu container
const menuMatches = html.match(/<ul\s+class=["'][^"']*menu[^"']*["'][\s\S]*?<\/ul>/gi) ||
                    html.match(/<nav[\s\S]*?<\/nav>/gi) ||
                    html.match(/<div\s+class=["'][^"']*ipn2-nav[^"']*["'][\s\S]*?<\/div>/gi) ||
                    html.match(/<div\s+id=["']nav[^"']*["'][\s\S]*?<\/div>/gi);

console.log('Menu matches count:', menuMatches?.length);

// Let's find all module headings and items
const itemRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
let m;
const listItems = [];
while ((m = itemRegex.exec(html)) !== null) {
  const content = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const link = m[1].match(/href=["']([^"']+)["']/i)?.[1];
  if (content) {
    listItems.push({ text: content, link });
  }
}

console.log('List items found:', listItems.length);
fs.writeFileSync('data/ipn_dump/menu_structure.json', JSON.stringify(listItems, null, 2));

console.log('First 40 menu items:');
console.table(listItems.slice(0, 40));
