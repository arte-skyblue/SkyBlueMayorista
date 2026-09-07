import { IPNSession } from './ipn_session.mjs';
import fs from 'fs';

async function diagnose() {
  const session = new IPNSession();
  console.log('Logging in to iPN ERP...');
  await session.login();

  // Test 1: Fetch article list page
  console.log('Fetching /stock/article/default.asp...');
  const res = await session.fetch('/stock/article/default.asp');
  const html = await res.text();
  console.log('Response status:', res.status, 'length:', html.length);

  fs.writeFileSync('data/sample_article_page.html', html);
  console.log('Saved data/sample_article_page.html');

  // Look for total count or pages
  const matches = html.match(/(\d+)\s*(?:registros|artículos|productos|páginas)/gi);
  console.log('Matches for counts:', matches);

  // Look for table rows
  const trMatches = html.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi);
  console.log('Total table rows found on page 1:', trMatches ? trMatches.length : 0);

  if (trMatches) {
    console.log('--- Primeras 5 filas encontradas en el HTML real de iPN ---');
    for (let i = 0; i < Math.min(6, trMatches.length); i++) {
      const clean = trMatches[i].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      console.log(`Fila ${i}:`, clean);
    }
  }

  // Check form action and input names
  const formMatches = html.match(/<form[^>]*action="([^"]*)"[^>]*>([\s\S]*?)<\/form>/gi);
  if (formMatches) {
    console.log('Forms found:', formMatches.length);
  }
}

diagnose().catch(console.error);
