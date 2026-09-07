import { IPNSession } from './ipn_session.mjs';
import fs from 'fs';

async function testProductsListWS() {
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
  await session.fetch('/defaultSelectedCompany.asp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: compParams.toString()
  });

  const wsParams = new URLSearchParams();
  wsParams.append('func', 'productsList');
  wsParams.append('PageIndex', '1');
  wsParams.append('PageSize', '100');
  wsParams.append('providerID', '0');
  wsParams.append('productTypeID', '0');
  wsParams.append('productDesc', '');
  wsParams.append('searchType', '0');
  wsParams.append('seasonID', '0');
  wsParams.append('materialID', '0');
  wsParams.append('displayOnlyStock', '0');
  wsParams.append('displayOnlyImported', '0');
  wsParams.append('displayOnlyB2B', '0');
  wsParams.append('displayOnlyB2C', '0');
  wsParams.append('orderField', 'productCode');
  wsParams.append('sortDirection', 'ASC');
  wsParams.append('productCategoryID', '0');
  wsParams.append('trademarkID', '0');
  wsParams.append('lineID', '0');
  wsParams.append('storeIDForExpo', '0');
  wsParams.append('B2BstoreIDToFilter', '0');

  const wsRes = await session.fetch('/control/products/ws/productDefault.asp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      'Referer': 'https://app.ipn.com.ar/control/products/default.asp'
    },
    body: wsParams.toString()
  });

  const wsText = await wsRes.text();
  console.log('productsList WS Response length:', wsText.length);
  fs.writeFileSync('data/real_ipn_export/ws_products_list_p1.html', wsText);

  // Look for product codes and masterProductUID
  const uids = wsText.match(/masterProductUID=[a-zA-Z0-9\-]+/gi) || [];
  console.log(`Found ${uids.length} masterProductUIDs in page 1!`);
  console.log('Sample UIDs:', uids.slice(0, 5));
}

testProductsListWS().catch(console.error);
