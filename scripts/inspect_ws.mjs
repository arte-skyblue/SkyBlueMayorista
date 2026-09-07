import { IPNSession } from './ipn_session.mjs';
import * as fs from 'fs';

async function inspectWS() {
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

  // Query ws/productDefault.asp or search products
  console.log('Fetching ws/productDefault.asp...');
  const wsRes = await session.fetch('/control/products/ws/productDefault.asp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': 'https://app.ipn.com.ar/control/products/default.asp'
    },
    body: 'doAction=1&recordsPerPage=20&pageNumber=1'
  });

  console.log('WS status:', wsRes.status);
  const wsText = await wsRes.text();
  fs.writeFileSync('data/ipn_dump/ws_products_sample.html', wsText);
  console.log('WS text length:', wsText.length);
  console.log('WS preview:', wsText.slice(0, 1500));
}

inspectWS().catch(console.error);
