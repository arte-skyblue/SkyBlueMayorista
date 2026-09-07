import { IPNSession } from './ipn_session.mjs';
import fs from 'fs';
import path from 'path';

async function scrapeCompleteErpEntities() {
  console.log('=== EXTRAYENDO TODAS LAS ENTIDADES Y DATOS REALES DE iPN ERP ===');
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

  // Select company 1 (DANIEL ALEJANDRO GRASSO)
  const compParams = new URLSearchParams();
  compParams.append('companyID', '1');
  compParams.append('companyName', 'DANIEL ALEJANDRO GRASSO');
  compParams.append('doAction', '1');
  await session.fetch('/defaultSelectedCompany.asp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: compParams.toString()
  });

  const outputDir = path.resolve('data/real_ipn_export');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // 1. Fetch Customers List from /admin/customers/default.asp
  console.log('1. Extrayendo Clientes Reales y Cuentas Corrientes...');
  const custPost = new URLSearchParams();
  custPost.append('doAction', '1');
  custPost.append('action', 'search');
  custPost.append('resultsPerPage', '500');

  const custResp = await session.fetch('/admin/customers/default.asp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: custPost.toString()
  });
  const custText = await custResp.text();
  fs.writeFileSync(path.join(outputDir, 'admin_customers.html'), custText);

  // 2. Fetch Workshops / Talleres from /production/workshop/default.asp
  console.log('2. Extrayendo Talleres Externos de Producción...');
  const workResp = await session.fetch('/production/workshop/default.asp');
  const workText = await workResp.text();
  fs.writeFileSync(path.join(outputDir, 'workshops.html'), workText);

  // 3. Fetch Production Phases & Tickets
  console.log('3. Extrayendo Etapas y Órdenes de Producción...');
  const phasesResp = await session.fetch('/production/phases/default.asp');
  const phasesText = await phasesResp.text();
  fs.writeFileSync(path.join(outputDir, 'production_phases.html'), phasesText);

  // 4. Fetch Products List via WS (Page 1 and Page 2)
  console.log('4. Extrayendo Catálogo Completo de Productos...');
  const allProductsWs = [];
  for (let page = 1; page <= 4; page++) {
    const wsParams = new URLSearchParams();
    wsParams.append('func', 'productsList');
    wsParams.append('PageIndex', String(page));
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
    fs.writeFileSync(path.join(outputDir, `ws_products_list_p${page}.html`), wsText);
    allProductsWs.push(wsText);
  }

  // 5. Fetch Price Lists from /configuration/productsPriceLists/default.asp
  console.log('5. Extrayendo Listas de Precios y Configuración...');
  const plResp = await session.fetch('/configuration/productsPriceLists/default.asp');
  const plText = await plResp.text();
  fs.writeFileSync(path.join(outputDir, 'price_lists.html'), plText);

  // 6. Fetch Checkbook / Cheques from /admin/checks/default.asp
  console.log('6. Extrayendo Cartera de Cheques...');
  const checksResp = await session.fetch('/admin/checks/default.asp');
  const checksText = await checksResp.text();
  fs.writeFileSync(path.join(outputDir, 'checks.html'), checksText);

  console.log('=== Extracción completa exitosa ===');
}

scrapeCompleteErpEntities().catch(console.error);
