import { IPNSession } from './ipn_session.mjs';
import * as fs from 'fs';

async function searchProducts() {
  const session = new IPNSession();
  await session.login('46792-juli', 'chicha1992');

  // Dismiss notifications
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

  // Select company 1
  const compParams = new URLSearchParams();
  compParams.append('companyID', '1');
  compParams.append('companyName', 'DANIEL ALEJANDRO GRASSO');
  compParams.append('doAction', '1');
  compParams.append('storeID', '0');
  compParams.append('storeTypeID', '0');
  compParams.append('storeName', '');
  compParams.append('reportCategoryID', '0');
  compParams.append('parentModuleID', '');

  await session.fetch('/defaultSelectedCompany.asp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': 'https://app.ipn.com.ar/defaultSelectedCompany.asp'
    },
    body: compParams.toString()
  });

  // Post search to /control/products/default.asp
  const searchParams = new URLSearchParams();
  searchParams.append('doAction', '1');
  searchParams.append('productDesc', '');
  searchParams.append('searchType', '2'); // like search
  searchParams.append('masterPIDToFilter', '');
  searchParams.append('providerID', '0');
  searchParams.append('trademarkID', '0');
  searchParams.append('seasonID', '0');
  searchParams.append('productTypeID', '0');
  searchParams.append('materialID', '0');
  searchParams.append('lineID', '0');
  searchParams.append('displayOnlyStock', '0');
  searchParams.append('displayOnlyB2B', '0');
  searchParams.append('displayOnlyTDN', '0');

  console.log('Sending search POST to /control/products/default.asp...');
  const searchRes = await session.fetch('/control/products/default.asp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': 'https://app.ipn.com.ar/control/products/default.asp'
    },
    body: searchParams.toString()
  });

  console.log('Search res status:', searchRes.status);
  const searchHtml = await searchRes.text();
  fs.writeFileSync('data/ipn_dump/products_search_result.html', searchHtml);
  console.log('Search result length:', searchHtml.length);

  // Extract products found
  const rows = searchHtml.matchAll(/<tr[^>]*class=["'][^"']*grid[^"']*["'][^>]*>([\s\S]*?)<\/tr>/gi);
  let count = 0;
  for (const r of rows) {
    count++;
    console.log(`Product row ${count}:`, r[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150));
  }
  console.log(`Total grid rows found: ${count}`);
}

searchProducts().catch(console.error);
