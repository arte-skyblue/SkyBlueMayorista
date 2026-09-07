import { IPNSession } from './ipn_session.mjs';
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.resolve('data/ipn_screenshots/full_system_walkthrough');
const DATA_DIR = path.resolve('data/ipn_deep_audit');

async function crawlGaticarFresh() {
  console.log('=== RASTREO EXCLUSIVO Y DEDICADO PARA GATICAR S.R.L. (EMPRESA #2) ===');

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

  // Select company 2 (GATICAR S.R.L.)
  const compParams = new URLSearchParams();
  compParams.append('companyID', '2');
  compParams.append('companyName', 'GATICAR S.R.L.');
  compParams.append('doAction', '1');
  await session.fetch('/defaultSelectedCompany.asp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: compParams.toString()
  });

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors']
  });

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);

    const cookiesToSet = [];
    for (const [name, value] of session.cookies.entries()) {
      cookiesToSet.push({ name, value, domain: 'app.ipn.com.ar', path: '/' });
    }
    await page.setCookie(...cookiesToSet);

    const gaticarSections = [
      { key: '01_dashboard_sucursales', url: 'https://app.ipn.com.ar/defaultSelectedStore.asp' },
      { key: '02_admin_panel_general', url: 'https://app.ipn.com.ar/adminPanel.asp' },
      { key: '03_catalogo_maestro_grilla', url: 'https://app.ipn.com.ar/control/products/default.asp' },
      { key: '04_catalogo_maestro_ws_items', url: 'https://app.ipn.com.ar/control/products/ws/productDefault.asp' },
      { key: '05_stock_disponibilidad', url: 'https://app.ipn.com.ar/reports/productsAvailability/default.asp' },
      { key: '06_stock_valorizado_por_fecha', url: 'https://app.ipn.com.ar/reports/stockReports/valuedStockByDate.asp' },
      { key: '07_stock_movimientos_operaciones', url: 'https://app.ipn.com.ar/reports/stockReports/stockLogOperations.asp' },
      { key: '08_stock_rotacion_reposicion', url: 'https://app.ipn.com.ar/reports/stockReplacement/default.asp' },
      { key: '09_produccion_ordenes_tickets', url: 'https://app.ipn.com.ar/production/tickets/default.asp' },
      { key: '10_produccion_operarios_talleres', url: 'https://app.ipn.com.ar/production/employees/default.asp' },
      { key: '11_produccion_materias_primas', url: 'https://app.ipn.com.ar/production/rawMaterial/default.asp' },
      { key: '12_produccion_fichas_tecnicas', url: 'https://app.ipn.com.ar/production/preProducts/default.asp' },
      { key: '13_produccion_liquidacion_haberes', url: 'https://app.ipn.com.ar/reports/incomeSettlementReport/default.asp' },
      { key: '14_clientes_directorio', url: 'https://app.ipn.com.ar/admin/customers/default.asp' },
      { key: '15_clientes_saldos_ctas_ctes', url: 'https://app.ipn.com.ar/admin/accounting/customersBalance.asp' },
      { key: '16_clientes_deuda_aging', url: 'https://app.ipn.com.ar/admin/accounting/aging.asp' },
      { key: '17_ventas_pedidos_mayoristas_b2b', url: 'https://app.ipn.com.ar/iB2B/openOrders/default.asp' },
      { key: '18_ventas_analisis_pedidos', url: 'https://app.ipn.com.ar/admin/customers/productRequest/requestsReport.asp' },
      { key: '19_ventas_detalle_realizadas', url: 'https://app.ipn.com.ar/admin/accounting/salesList.asp' },
      { key: '20_compras_gastos_listado', url: 'https://app.ipn.com.ar/admin/accounting/purchasesList.asp' },
      { key: '21_compras_proveedores_saldos', url: 'https://app.ipn.com.ar/admin/accounting/providersBalance.asp' },
      { key: '22_config_transportes_56', url: 'https://app.ipn.com.ar/configuration/transport/default.asp' }
    ];

    for (const sec of gaticarSections) {
      try {
        console.log(`[GATICAR] Navegando: ${sec.key} (${sec.url})...`);
        await page.goto(sec.url, { waitUntil: 'networkidle2', timeout: 30000 });
        await new Promise(r => setTimeout(r, 1500));
        const pageTitle = await page.title();
        console.log(`  -> Título: "${pageTitle}"`);

        const filenamePrefix = `02_GATICAR_${sec.key}`;
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${filenamePrefix}.png`) });

        const content = await page.content();
        fs.writeFileSync(path.join(DATA_DIR, `${filenamePrefix}.html`), content, 'utf8');
      } catch (err) {
        console.log(`  -> Error en GATICAR ${sec.key}:`, err.message);
      }
    }

    console.log('=== RASTREO DE GATICAR FINALIZADO CON ÉXITO ===');
  } finally {
    await browser.close();
  }
}

crawlGaticarFresh().catch(console.error);
