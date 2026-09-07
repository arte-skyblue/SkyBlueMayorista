import { IPNSession } from './ipn_session.mjs';
import * as fs from 'fs';
import * as path from 'path';

async function deepInspect() {
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

  const dumpDir = path.resolve('data/ipn_dump/modules');
  if (!fs.existsSync(dumpDir)) {
    fs.mkdirSync(dumpDir, { recursive: true });
  }

  // Key endpoints to inspect
  const targetEndpoints = [
    // 1. Articles & Catalog
    { key: 'products_list', url: '/admin/products/default.asp' },
    { key: 'products_add', url: '/admin/products/add.asp' },
    { key: 'seasons', url: '/admin/products/seasons/default.asp' },
    { key: 'categories', url: '/admin/products/categories/default.asp' },
    { key: 'price_lists', url: '/admin/products/priceLists/default.asp' },
    { key: 'brands', url: '/admin/products/brands/default.asp' },
    { key: 'colors', url: '/admin/products/colors/default.asp' },
    { key: 'sizes', url: '/admin/products/sizes/default.asp' },
    { key: 'tags', url: '/admin/products/tags/default.asp' },
    { key: 'barcodes', url: '/admin/products/barcodes/default.asp' },
    { key: 'promotions', url: '/admin/products/promotions/default.asp' },

    // 2. Stock & Inventory
    { key: 'stock_list', url: '/control/stock/default.asp' },
    { key: 'stock_movements', url: '/control/stockMovements/default.asp' },
    { key: 'stock_reservation', url: '/control/stockReservation/default.asp' },
    { key: 'stock_valued', url: '/reports/stockReports/valuedStockByDate.asp' },
    { key: 'stock_availability', url: '/reports/productsAvailability/default.asp' },

    // 3. Customers & Orders
    { key: 'customers_list', url: '/admin/customers/default.asp' },
    { key: 'customers_requests', url: '/admin/customers/productRequest/default.asp' },
    { key: 'customers_balance', url: '/admin/accounting/customersBalance.asp' },

    // 4. Purchases & Providers
    { key: 'providers_list', url: '/admin/providers/default.asp' },
    { key: 'purchases_orders', url: '/admin/purchasesOrder/default.asp' },
    { key: 'expenses', url: '/admin/expenses/default.asp' },

    // 5. Production
    { key: 'production_preproducts', url: '/production/preProducts/default.asp' },
    { key: 'production_raw_material', url: '/production/rawMaterial/default.asp' },
    { key: 'production_tickets', url: '/production/tickets/default.asp' },
    { key: 'production_employees', url: '/production/employees/default.asp' },

    // 6. Integrations & eCommerce
    { key: 'ib2b_dashboard', url: '/iB2B/defaultSelectedB2BStore.asp' },
    { key: 'ib2b_users', url: '/iB2B/users/default.asp' },
    { key: 'ib2b_open_orders', url: '/iB2B/openOrders/default.asp' },
    { key: 'b2c_dashboard', url: '/B2C/defaultSelectedB2CStore.asp' },
    { key: 'b2c_mla_items', url: '/B2C/MLA/Items/default.asp' },
    { key: 'b2c_tdn_products', url: '/B2C/TDN/Products/default.asp' },
    { key: 'b2c_orders', url: '/B2C/Orders/default.asp' },

    // 7. Company & System Config
    { key: 'my_account', url: '/myAccount.asp' },
    { key: 'security_users', url: '/adminPanel/securityUsers.asp' },
    { key: 'stores_config', url: '/admin/stores/default.asp' }
  ];

  console.log(`Starting deep inspection of ${targetEndpoints.length} ERP endpoints...`);

  const summary = [];

  for (const ep of targetEndpoints) {
    try {
      console.log(`Fetching ${ep.key} (${ep.url})...`);
      const resp = await session.fetch(ep.url);
      const text = await resp.text();
      const filename = `${ep.key}.html`;
      fs.writeFileSync(path.join(dumpDir, filename), text);

      // Analyze page
      const titleMatch = text.match(/<title>([\s\S]*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1].replace(/[\r\n\t]+/g, ' ').trim() : 'No Title';
      const forms = text.match(/<form[\s\S]*?<\/form>/gi) || [];
      const inputs = text.match(/<input[^>]+>/gi) || [];
      const selects = text.match(/<select[^>]+>/gi) || [];
      const tables = text.match(/<table[\s\S]*?<\/table>/gi) || [];

      summary.push({
        key: ep.key,
        url: ep.url,
        title,
        status: resp.status,
        htmlBytes: text.length,
        formsCount: forms.length,
        inputsCount: inputs.length,
        selectsCount: selects.length,
        tablesCount: tables.length
      });

      console.log(`  -> OK [${resp.status}] ${title} (${text.length} bytes)`);
    } catch (e) {
      console.error(`  -> ERROR on ${ep.key}:`, e.message);
      summary.push({
        key: ep.key,
        url: ep.url,
        error: e.message
      });
    }
  }

  fs.writeFileSync('data/ipn_dump/deep_inspection_summary.json', JSON.stringify(summary, null, 2));
  console.log('\n--- Deep Inspection Complete ---');
  console.table(summary);
}

deepInspect().catch(console.error);
