import { IPNSession } from './ipn_session.mjs';
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.resolve('data/ipn_screenshots/real_clean_modules');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function captureKeyModules() {
  console.log('=== CAPTURANDO LOS MÓDULOS EXACTOS DE IPN ===');

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

  const targets = [
    { name: '01_catalogo_maestro_grilla_3264', url: 'https://app.ipn.com.ar/control/products/ws/productDefault.asp' },
    { name: '02_clientes_directorio', url: 'https://app.ipn.com.ar/admin/customers/default.asp' },
    { name: '03_clientes_saldos_ctas_ctes', url: 'https://app.ipn.com.ar/admin/accounting/customersBalance.asp' },
    { name: '04_clientes_deuda_vencida_aging', url: 'https://app.ipn.com.ar/admin/accounting/aging.asp' },
    { name: '05_transportes_y_expresos', url: 'https://app.ipn.com.ar/configuration/transport/default.asp' },
    { name: '06_stock_disponibilidad_articulos', url: 'https://app.ipn.com.ar/reports/productsAvailability/default.asp' },
    { name: '07_stock_valorizado_por_fecha', url: 'https://app.ipn.com.ar/reports/stockReports/valuedStockByDate.asp' },
    { name: '08_produccion_tickets_ops', url: 'https://app.ipn.com.ar/production/tickets/default.asp' },
    { name: '09_produccion_talleres_destajo', url: 'https://app.ipn.com.ar/production/employees/default.asp' },
    { name: '10_produccion_liquidacion_haberes', url: 'https://app.ipn.com.ar/reports/incomeSettlementReport/default.asp' },
    { name: '11_ventas_analisis_pedidos', url: 'https://app.ipn.com.ar/admin/customers/productRequest/requestsReport.asp' },
    { name: '12_ventas_pedidos_abiertos_b2b', url: 'https://app.ipn.com.ar/iB2B/openOrders/default.asp' },
    { name: '13_historial_cambios_precios', url: 'https://app.ipn.com.ar/reports/productsPriceListChanges/default.asp' }
  ];

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

    for (const t of targets) {
      try {
        console.log(`Accediendo a: ${t.name} (${t.url})...`);
        await page.goto(t.url, { waitUntil: 'networkidle2', timeout: 30000 });
        await new Promise(r => setTimeout(r, 2000));
        const pageTitle = await page.title();
        console.log(`  -> OK: "${pageTitle}"`);
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${t.name}.png`) });
      } catch (e) {
        console.log(`  -> Error en ${t.name}:`, e.message);
      }
    }

    console.log('=== CAPTURAS DE MÓDULOS COMPLETADAS CON ÉXITO ===');
  } finally {
    await browser.close();
  }
}

captureKeyModules().catch(console.error);
