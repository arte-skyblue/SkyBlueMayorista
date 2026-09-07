import { IPNSession } from './ipn_session.mjs';
import fs from 'fs';

async function inspectProductJs() {
  const session = new IPNSession();
  await session.login('46792-juli', 'chicha1992');

  const jsRes = await session.fetch('/control/products/ws/productDefault.js');
  const jsText = await jsRes.text();
  console.log('productDefault.js length:', jsText.length);
  fs.writeFileSync('data/real_ipn_export/productDefault.js', jsText);

  // Look for URLs, endpoints, or AJAX calls
  const ajaxUrls = jsText.match(/['"][\w\/\.\-]+\.asp[\w\?\=\&]*['"]/gi) || [];
  console.log('Found ASP URLs in productDefault.js:', Array.from(new Set(ajaxUrls)));
}

inspectProductJs().catch(console.error);
