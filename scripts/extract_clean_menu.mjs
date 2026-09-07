import fs from 'fs';

function extractCleanIpnMenu() {
  const html = fs.readFileSync('data/default_main_menu.html', 'utf8');
  
  // Extract all <a> tags with href and text
  const links = [];
  const regex = /<a[^>]*href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const href = match[1].trim();
    const text = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (href && !href.includes('javascript') && !href.includes('#') && !href.includes('logout')) {
      links.push({ href, text });
    }
  }

  console.log(`Extracted ${links.length} menu items from iPN:`);
  links.forEach((l, i) => {
    console.log(`[${i+1}] "${l.text}" -> ${l.href}`);
  });

  fs.writeFileSync('data/ipn_clean_menu_structure.json', JSON.stringify(links, null, 2));
}

extractCleanIpnMenu();
