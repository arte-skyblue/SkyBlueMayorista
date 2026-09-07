import { IPNSession } from './ipn_session.mjs';
import * as fs from 'fs';

async function fetchJS() {
  const session = new IPNSession();
  await session.login('46792-juli', 'chicha1992');

  const files = [
    'https://app.ipn.com.ar/system/core/coreFunctionsv2.js',
    'https://app.ipn.com.ar/control/products/js/productDefault.js',
    'https://app.ipn.com.ar/system/js/modules/control/products/productDefault.js',
    'https://app.ipn.com.ar/control/products/js/productAdd.js'
  ];

  for (const url of files) {
    try {
      const res = await session.fetch(url);
      console.log(`Fetch ${url} -> Status: ${res.status}`);
      if (res.status === 200) {
        const text = await res.text();
        const filename = url.split('/').pop();
        fs.writeFileSync(`data/ipn_dump/${filename}`, text);
        console.log(`  Saved ${filename} (${text.length} bytes)`);
      }
    } catch (e) {
      console.error('Error:', e.message);
    }
  }
}

fetchJS().catch(console.error);
