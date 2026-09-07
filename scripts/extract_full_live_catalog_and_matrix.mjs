import { IPNSession } from './ipn_session.mjs';
import fs from 'fs';
import path from 'path';

async function extractFullLiveCatalogAndMatrix() {
  console.log('=== INICIANDO EXTRACCIÓN COMPLETA DE BASE DE DATOS REAL (iPN ERP) ===');
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

  const outputDir = path.resolve('data/real_ipn_export');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // 1. Fetch Master Products List
  console.log('Descargando catálogo maestro de productos...');
  const prodParams = new URLSearchParams();
  prodParams.append('doAction', '1');
  prodParams.append('action', 'search');
  prodParams.append('resultsPerPage', '500');
  prodParams.append('orderBy', 'productCode');

  const prodsResp = await session.fetch('/control/products/default.asp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: prodParams.toString()
  });
  const prodsHtml = await prodsResp.text();
  fs.writeFileSync(path.join(outputDir, 'products_list.html'), prodsHtml);

  // 2. Fetch Customers
  console.log('Descargando listado completo de clientes...');
  const custParams = new URLSearchParams();
  custParams.append('doAction', '1');
  custParams.append('action', 'search');
  custParams.append('resultsPerPage', '500');

  const custResp = await session.fetch('/control/customers/default.asp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: custParams.toString()
  });
  const custHtml = await custResp.text();
  fs.writeFileSync(path.join(outputDir, 'customers_list.html'), custHtml);

  // 3. Fetch Stock By Store
  console.log('Descargando stock por depósito...');
  const stockStoreResp = await session.fetch('/control/stockAvailable/stockByStoreProviderAndProduct.asp');
  const stockStoreHtml = await stockStoreResp.text();
  fs.writeFileSync(path.join(outputDir, 'stock_by_store.html'), stockStoreHtml);

  // 4. Fetch Stock Committed & Tracking
  console.log('Descargando stock comprometido y seguimiento...');
  const stockTrackResp = await session.fetch('/control/stockTracking/default.asp');
  const stockTrackHtml = await stockTrackResp.text();
  fs.writeFileSync(path.join(outputDir, 'stock_tracking.html'), stockTrackHtml);

  // 5. Fetch Open Orders / Pedidos
  console.log('Descargando pedidos abiertos...');
  const ordersResp = await session.fetch('/iB2B/openOrders/default.asp');
  const ordersHtml = await ordersResp.text();
  fs.writeFileSync(path.join(outputDir, 'b2b_orders.html'), ordersHtml);

  // 6. Fetch Production Raw Material & Tickets
  console.log('Descargando órdenes de producción y materias primas...');
  const prodRawResp = await session.fetch('/production/rawMaterial/default.asp');
  const prodRawHtml = await prodRawResp.text();
  fs.writeFileSync(path.join(outputDir, 'production_materials.html'), prodRawHtml);

  const prodTicketsResp = await session.fetch('/production/tickets/default.asp');
  const prodTicketsHtml = await prodTicketsResp.text();
  fs.writeFileSync(path.join(outputDir, 'production_tickets.html'), prodTicketsHtml);

  console.log('=== Extracción cruda finalizada. Analizando datos... ===');
}

extractFullLiveCatalogAndMatrix().catch(console.error);
