import { IPNSession } from './ipn_session.mjs';
import fs from 'fs';

async function fetchProductDetailSample() {
  const session = new IPNSession();
  await session.login('46792-juli', 'chicha1992');

  // Dismiss notifications and select company 1
  let res = await session.fetch('/notifications.asp');
  let html = await res.text();
  let loop = 0;
  while (loop < 5) {
    loop++;
    const notifIdMatch = html.match(/name="notificationID"\s+id="[^"]+"\s+value="([^"]+)"/i);
    const notifNameMatch = html.match(/name="notificationName"\s+id="[^"]+"\s+value="([^"]+)"/i);
    if (!notifIdMatch) break;
    const params = new URLSearchParams();
    params.append('doAction', '1');
    params.append('notificationID', notifIdMatch[1]);
    params.append('notificationName', notifNameMatch ? notifNameMatch[1] : '');
    params.append('lastViewTimeSpend', '00:00:05');
    res = await session.fetch('/notifications.asp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    html = await res.text();
  }

  const compParams = new URLSearchParams();
  compParams.append('companyID', '1');
  compParams.append('companyName', 'DANIEL ALEJANDRO GRASSO');
  compParams.append('doAction', '1');
  await session.fetch('/defaultSelectedCompany.asp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: compParams.toString()
  });

  const detailRes = await session.fetch('/control/products/details.asp?masterProductUID=39CE3A74-8FC5-4665-BD55-5716D4A94725');
  const detailHtml = await detailRes.text();
  console.log('Product details length:', detailHtml.length);
  fs.writeFileSync('data/real_ipn_export/sample_product_details.html', detailHtml);

  // Look for tables in details
  const tables = detailHtml.match(/<table[\s\S]*?<\/table>/gi) || [];
  console.log(`Found ${tables.length} tables in product details`);
  for (let i = 0; i < Math.min(10, tables.length); i++) {
    const clean = tables[i].replace(/<[^>]+>/g, ' | ').replace(/\s+/g, ' ').trim();
    if (clean.length > 20) {
      console.log(`Table ${i}:`, clean.slice(0, 200));
    }
  }
}

fetchProductDetailSample().catch(console.error);
