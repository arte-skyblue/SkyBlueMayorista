import { IPNSession } from './ipn_session.mjs';
import * as fs from 'fs';
import * as path from 'path';

async function fetchAllCoreModules() {
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

  const endpoints = [
    { key: 'products_main', url: '/control/products/default.asp' },
    { key: 'product_add', url: '/control/products/add.asp' },
    { key: 'product_types', url: '/configuration/productType/default.asp' },
    { key: 'product_categories', url: '/control/category/default.asp' },
    { key: 'trademarks_brands', url: '/configuration/trademarks/default.asp' },
    { key: 'colors', url: '/configuration/colors/default.asp' },
    { key: 'price_lists_config', url: '/configuration/productsPriceLists/default.asp' },
    { key: 'product_visualization', url: '/configuration/productVisualization/details.asp' },
    { key: 'stock_available', url: '/control/stockAvailable/stockByStoreProviderAndProduct.asp' },
    { key: 'stock_tracking', url: '/control/stockTracking/default.asp' },
    { key: 'stock_committed', url: '/control/stockCommitted/default.asp' },
    { key: 'stock_summary_filter', url: '/control/stockSummary/filter.asp' },
    { key: 'stock_summary_projects', url: '/control/stockSummary/projects.asp' },
    { key: 'purchases_refer', url: '/control/purchasesRefer/default.asp' },
    { key: 'sales_point_dash', url: '/salesPoint/dashBoard/default.asp' },
    { key: 'sales_book', url: '/admin/accounting/salesBook.asp' },
    { key: 'purchases_book', url: '/admin/accounting/purchasesBookResume.asp' },
    { key: 'export_txt', url: '/admin/accounting/exportTXT.asp' },
    { key: 'b2b_users', url: '/iB2B/users/default.asp' },
    { key: 'b2b_open_orders', url: '/iB2B/openOrders/default.asp' },
    { key: 'b2c_mla_items', url: '/B2C/MLA/Items/default.asp' },
    { key: 'b2c_tdn_products', url: '/B2C/TDN/Products/default.asp' },
    { key: 'b2c_mercadopago', url: '/B2C/mercadoPagoAccounts/default.asp' },
    { key: 'production_preproducts', url: '/production/preProducts/default.asp' },
    { key: 'production_raw_material', url: '/production/rawMaterial/default.asp' },
    { key: 'production_tickets', url: '/production/tickets/default.asp' }
  ];

  const dumpDir = path.resolve('data/ipn_dump/core_modules');
  if (!fs.existsSync(dumpDir)) fs.mkdirSync(dumpDir, { recursive: true });

  const results = [];

  for (const ep of endpoints) {
    try {
      console.log(`Fetching ${ep.key} (${ep.url})...`);
      const resp = await session.fetch(ep.url);
      const text = await resp.text();
      fs.writeFileSync(path.join(dumpDir, `${ep.key}.html`), text);

      const title = (text.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '').replace(/[\r\n\t]+/g, ' ').trim();
      const forms = (text.match(/<form[^>]*>/gi) || []).length;
      const tables = (text.match(/<table[^>]*>/gi) || []).length;
      const inputs = (text.match(/<input[^>]*>/gi) || []).length;

      results.push({
        key: ep.key,
        url: ep.url,
        status: resp.status,
        length: text.length,
        title,
        forms,
        tables,
        inputs
      });
      console.log(`  -> [${resp.status}] ${title} (${text.length} bytes)`);
    } catch (e) {
      console.error(`  -> Error on ${ep.key}:`, e.message);
    }
  }

  console.log('\n--- Core Modules Inspection Finished ---');
  console.table(results);
}

fetchAllCoreModules().catch(console.error);
