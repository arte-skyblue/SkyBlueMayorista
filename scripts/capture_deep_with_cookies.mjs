import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.resolve('data/ipn_screenshots/detailed');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function getIpnSessionCookie() {
  console.log('Obteniendo cookie de sesión de iPN...');
  const loginRes = await fetch('https://app.ipn.com.ar/login.asp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ User: '46792-juli', Password: 'chicha1992', Submit: 'Ingresar' }),
    redirect: 'manual'
  });

  const rawCookies = loginRes.headers.get('set-cookie') || '';
  const cookieMatches = rawCookies.match(/ASPSESSIONID[A-Z]+=[^;]+/gi) || [];
  const sessionCookie = cookieMatches.join('; ');
  console.log('Session Cookie:', sessionCookie);

  // Select company 1
  await fetch('https://app.ipn.com.ar/selectCompany.asp?CompanyID=1', {
    headers: { Cookie: sessionCookie }
  });
  console.log('Empresa 1 (DANIEL ALEJANDRO GRASSO) seleccionada.');

  return { rawCookies, cookieMatches };
}

async function captureAllIpnPages() {
  console.log('=== CAPTURANDO TODAS LAS PANTALLAS REALES DE IPN CON PUPPETEER ===');

  const { cookieMatches } = await getIpnSessionCookie();

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors']
  });

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);

    // Set ASP Session cookies in Puppeteer
    const puppeteerCookies = cookieMatches.map(c => {
      const [name, value] = c.split('=');
      return {
        name: name.trim(),
        value: value.trim(),
        domain: 'app.ipn.com.ar',
        path: '/'
      };
    });

    await page.setCookie(...puppeteerCookies);

    const sections = [
      { name: '01_dashboard_principal', url: 'https://app.ipn.com.ar/default.asp' },
      { name: '02_menu_principal', url: 'https://app.ipn.com.ar/menu.asp' },
      { name: '03_catalogo_maestro_3264_filas', url: 'https://app.ipn.com.ar/control/products/ws/productDefault.asp' },
      { name: '04_stock_general_articulos', url: 'https://app.ipn.com.ar/stock/default.asp' },
      { name: '05_movimientos_transferencias_stock', url: 'https://app.ipn.com.ar/stock/movements/default.asp' },
      { name: '06_listado_pedidos_ventas', url: 'https://app.ipn.com.ar/sales/order/default.asp' },
      { name: '07_directorio_clientes', url: 'https://app.ipn.com.ar/admin/customers/default.asp' },
      { name: '08_directorio_transportes_56', url: 'https://app.ipn.com.ar/configuration/transport/default.asp' },
      { name: '09_listas_de_precios_1_al_10', url: 'https://app.ipn.com.ar/configuration/prices/default.asp' },
      { name: '10_produccion_talleres', url: 'https://app.ipn.com.ar/production/orders/default.asp' },
      { name: '11_embarques_importacion', url: 'https://app.ipn.com.ar/imports/shipments/default.asp' }
    ];

    for (const sec of sections) {
      try {
        console.log(`Capturando ${sec.name} (${sec.url})...`);
        await page.goto(sec.url, { waitUntil: 'networkidle2', timeout: 30000 });
        await new Promise(r => setTimeout(r, 1500));
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${sec.name}.png`), fullPage: false });
      } catch (err) {
        console.log(`Error capturando ${sec.name}:`, err.message);
      }
    }

    console.log('=== CAPTURAS REALIZADAS EXITOSAMENTE EN data/ipn_screenshots/detailed ===');
  } finally {
    await browser.close();
  }
}

captureAllIpnPages().catch(console.error);
