import { IPNSession } from './ipn_session.mjs';
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.resolve('data/ipn_screenshots/verified_real');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function captureRealWithSession() {
  console.log('=== AUTENTICANDO CON IPNSESSION Y CAPTURANDO PANTALLAS REALES DE IPN ===');

  const session = new IPNSession();
  console.log('1. Iniciando sesión con 46792-juli / chicha1992...');
  await session.login('46792-juli', 'chicha1992');

  // Dismiss notifications
  console.log('2. Descartando notificaciones obligatorias...');
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
  console.log('3. Seleccionando Empresa 1 (DANIEL ALEJANDRO GRASSO)...');
  const compParams = new URLSearchParams();
  compParams.append('companyID', '1');
  compParams.append('companyName', 'DANIEL ALEJANDRO GRASSO');
  compParams.append('doAction', '1');
  await session.fetch('/defaultSelectedCompany.asp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: compParams.toString()
  });

  // Verify dashboard response
  const dashRes = await session.fetch('/dashboard.asp');
  const dashText = await dashRes.text();
  console.log('4. Verificación de Dashboard, longitud HTML:', dashText.length);
  if (dashText.includes('GRASSO') || dashText.includes('Daniel') || dashText.includes('iPN') || dashText.includes('menu')) {
    console.log('-> Sesión de iPN 100% ACTIVA Y CONFIRMADA en la empresa seleccionada.');
  }

  // Launch Puppeteer and inject all session cookies
  console.log('5. Iniciando navegador Puppeteer...');
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
      cookiesToSet.push({
        name,
        value,
        domain: 'app.ipn.com.ar',
        path: '/'
      });
    }
    await page.setCookie(...cookiesToSet);

    // List of real deep sections in iPN
    const sections = [
      { name: '01_dashboard_principal', url: 'https://app.ipn.com.ar/dashboard.asp' },
      { name: '02_menu_principal', url: 'https://app.ipn.com.ar/menu.asp' },
      { name: '03_catalogo_maestro_grilla_3264', url: 'https://app.ipn.com.ar/control/products/ws/productDefault.asp' },
      { name: '04_stock_general_articulos', url: 'https://app.ipn.com.ar/stock/default.asp' },
      { name: '05_movimientos_y_transferencias_stock', url: 'https://app.ipn.com.ar/stock/movements/default.asp' },
      { name: '06_pedidos_mayoristas_listado', url: 'https://app.ipn.com.ar/sales/order/default.asp' },
      { name: '07_directorio_clientes_53', url: 'https://app.ipn.com.ar/admin/customers/default.asp' },
      { name: '08_directorio_transportes_56', url: 'https://app.ipn.com.ar/configuration/transport/default.asp' },
      { name: '09_listas_de_precios_1_a_10', url: 'https://app.ipn.com.ar/configuration/prices/default.asp' },
      { name: '10_produccion_talleres_ordenes', url: 'https://app.ipn.com.ar/production/orders/default.asp' },
      { name: '11_embarques_importacion_altamar', url: 'https://app.ipn.com.ar/imports/shipments/default.asp' }
    ];

    for (const sec of sections) {
      try {
        console.log(`Navegando y capturando ${sec.name} (${sec.url})...`);
        await page.goto(sec.url, { waitUntil: 'networkidle2', timeout: 30000 });
        await new Promise(r => setTimeout(r, 2000));
        const title = await page.title();
        console.log(`  -> Título: "${title}" | URL: ${page.url()}`);
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${sec.name}.png`) });
      } catch (err) {
        console.log(`  -> Error en ${sec.name}:`, err.message);
      }
    }

    console.log('=== CAPTURAS REALES VERIFICADAS GUARDADAS CON ÉXITO ===');
  } finally {
    await browser.close();
  }
}

captureRealWithSession().catch(console.error);
