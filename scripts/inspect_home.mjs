import { Session } from './session_helper.mjs';
import fs from 'fs';

async function inspectHome() {
  const session = new Session();
  await session.login('maarcelino.designs@gmail.com', 'marce26');
  await session.selectCustomer('SALAMONE');

  console.log('Fetching Home /...');
  const res = await session.fetch('/');
  const html = await res.text();
  
  fs.writeFileSync('scripts/home_page.html', html);
  console.log('Saved scripts/home_page.html');

  // Let's check banners, seasons, brands
  console.log('\n--- BANNERS / SLIDES ---');
  const banners = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
  console.log('Images found on home:', banners.slice(0, 10));

  console.log('\n--- SECTIONS / BRANDS ---');
  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map(m => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }))
    .filter(l => l.text.length > 0 && !l.href.startsWith('javascript'));
  console.log('Links:', links.slice(0, 25));
}

inspectHome().catch(console.error);
