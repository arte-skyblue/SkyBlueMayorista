import { IPNSession } from './ipn_session.mjs';
import fs from 'fs';
import path from 'path';

async function extractTransportsAndMasterCatalog() {
  console.log('=== EXTRAYENDO TRANSPORTES, PROVEEDORES Y CATÁLOGO COMPLETO DE IPN ===');
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

  // 1. Fetch Transports / Transportes
  console.log('1. Extrayendo Empresas de Transporte...');
  try {
    const transpRes = await session.fetch('/configuration/transport/default.asp');
    const transpText = await transpRes.text();
    fs.writeFileSync(path.join(outputDir, 'transports.html'), transpText);
    console.log('  -> Transports HTML length:', transpText.length);
  } catch (e) {
    console.error('  -> Error fetching transports:', e.message);
  }

  // 2. Fetch Providers / Proveedores
  console.log('2. Extrayendo Proveedores...');
  try {
    const provRes = await session.fetch('/admin/providers/default.asp');
    const provText = await provRes.text();
    fs.writeFileSync(path.join(outputDir, 'admin_providers.html'), provText);
    console.log('  -> Providers HTML length:', provText.length);
  } catch (e) {
    console.error('  -> Error fetching providers:', e.message);
  }

  // 3. Deep Fetch of Products across ALL pages (1 to 10)
  console.log('3. Extrayendo TODAS las páginas del catálogo maestro...');
  const allProductsHtml = [];
  for (let page = 1; page <= 10; page++) {
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
    
    // Check if page had results
    if (wsText.includes('masterProductUID')) {
      const matchCount = (wsText.match(/masterProductUID/g) || []).length / 2;
      console.log(`  -> Página ${page}: ${matchCount} productos encontrados.`);
    } else {
      console.log(`  -> Página ${page}: Fin de resultados.`);
      break;
    }
  }

  console.log('=== Extracción completada con éxito ===');
}

extractTransportsAndMasterCatalog().catch(console.error);
