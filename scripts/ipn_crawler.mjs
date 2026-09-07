import { IPNSession } from './ipn_session.mjs';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const session = new IPNSession();
  console.log('Logging in to IPN...');
  await session.login('46792-juli', 'chicha1992');
  console.log('Login successful.');

  const dumpDir = path.resolve('data/ipn_dump');
  if (!fs.existsSync(dumpDir)) {
    fs.mkdirSync(dumpDir, { recursive: true });
  }

  // 1. Check index.asp or default redirect
  console.log('Fetching main pages...');
  const pagesToVisit = [
    'notifications.asp',
    'index.asp',
    'default.asp',
    'main.asp',
    'menu.asp',
    'home.asp',
    'top.asp',
    'left.asp'
  ];

  const visited = new Set();
  const menuLinks = new Set();

  for (const page of pagesToVisit) {
    try {
      console.log(`Fetching ${page}...`);
      const res = await session.fetch(page);
      const text = await res.text();
      visited.add(page);
      fs.writeFileSync(path.join(dumpDir, page.replace(/[\/\?&=:]/g, '_') + '.html'), text);
      console.log(`Saved ${page} (${text.length} bytes)`);

      // Extract all links href="..."
      const linkMatches = text.matchAll(/href=["']([^"']+)["']/gi);
      for (const m of linkMatches) {
        const link = m[1].trim();
        if (!link.startsWith('#') && !link.startsWith('javascript:') && !link.startsWith('mailto:')) {
          menuLinks.add(link);
        }
      }

      // Extract iframe/frame src
      const frameMatches = text.matchAll(/src=["']([^"']+\.asp[^"']*)["']/gi);
      for (const m of frameMatches) {
        menuLinks.add(m[1].trim());
      }
    } catch (e) {
      console.error(`Error fetching ${page}:`, e.message);
    }
  }

  console.log('\n--- Discovered Links from Initial Pages ---');
  console.log(Array.from(menuLinks));

  fs.writeFileSync(path.join(dumpDir, 'discovered_links.json'), JSON.stringify(Array.from(menuLinks), null, 2));
}

main().catch(console.error);
