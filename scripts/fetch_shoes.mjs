import { Session } from './session_helper.mjs';
import fs from 'fs';

async function testFetchShoes() {
  const session = new Session();
  await session.login('maarcelino.designs@gmail.com', 'marce26');
  await session.selectCustomer('SALAMONE');

  const sampleIds = ['4228', '4366'];

  for (const id of sampleIds) {
    const res = await session.fetch(`/Products/${id}`);
    const html = await res.text();
    fs.writeFileSync(`scripts/sample_${id}.html`, html);
    console.log(`Fetched /Products/${id}, size: ${html.length}`);
  }
}

testFetchShoes().catch(console.error);
