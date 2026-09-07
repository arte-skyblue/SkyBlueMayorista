import { IPNSession } from './ipn_session.mjs';
import fs from 'fs';
import path from 'path';

async function extractAllPages() {
  console.log('=== EXTRAYENDO LAS 33 PÁGINAS COMPLETAS DEL CATÁLOGO REAL DE IPN (3.264 PRODUCTOS) ===');
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

  const outputDir = path.resolve('data/real_ipn_export/all_pages');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const totalPages = 33;
  console.log(`Descargando ${totalPages} páginas (100 productos por página)...`);

  for (let page = 1; page <= totalPages; page++) {
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

    try {
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
      const filePath = path.join(outputDir, `page_${page}.html`);
      fs.writeFileSync(filePath, wsText);

      const rowsCount = (wsText.match(/<tr[^>]*name=['"]ItemTR['"]/gi) || []).length;
      console.log(`  -> [Página ${page}/${totalPages}] Descargados ${rowsCount} productos.`);
    } catch (err) {
      console.error(`Error en página ${page}:`, err.message);
    }
  }

  console.log('=== Descarga de las 33 páginas finalizada con éxito ===');
}

extractAllPages().catch(console.error);
