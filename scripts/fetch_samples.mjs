import { Session } from './session_helper.mjs';
import fs from 'fs';

async function testFetchVariations() {
  const session = new Session();
  await session.login('maarcelino.designs@gmail.com', 'marce26');
  await session.selectCustomer('SALAMONE');

  // Let's test a shoe from REFRESH and XTI
  const sampleIds = ['4658', '3924', '4556', '3700', '4000', '4200'];

  for (const id of sampleIds) {
    try {
      const res = await session.fetch(`/Products/${id}`);
      const html = await res.text();
      fs.writeFileSync(`scripts/sample_${id}.html`, html);
      console.log(`Fetched /Products/${id}, size: ${html.length}`);
    } catch (e) {
      console.error(`Error fetching ${id}:`, e.message);
    }
  }
}

testFetchVariations().catch(console.error);
