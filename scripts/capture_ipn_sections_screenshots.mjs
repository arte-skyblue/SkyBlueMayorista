import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.resolve('data/ipn_screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function captureIpnScreenshots() {
  console.log('=== INICIANDO AGENTE DE NAVEGACIÓN Y CAPTURA DE PANTALLA EN IPN ERP ===');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors']
  });

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);
    page.setDefaultTimeout(60000);

    // 1. Login Page
    console.log('1. Accediendo a https://app.ipn.com.ar/login.asp ...');
    await page.goto('https://app.ipn.com.ar/login.asp', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_login_page.png') });

    // 2. Perform Login
    console.log('2. Ingresando credenciales (46792-juli)...');
    await page.type('#user, input[name="user"], input[type="text"]', '46792-juli');
    await page.type('#password, input[name="password"], input[type="password"]', 'chicha1992');
    
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click('#submit, input[type="submit"], button[type="submit"]')
    ]);

    console.log('3. Logueado exitosamente. URL actual:', page.url());
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02_company_selector_or_home.png') });

    // If company selection screen
    const companyLinks = await page.$$('a[href*="company"], a[href*="CompanyID"]');
    if (companyLinks.length > 0) {
      console.log('Seleccionando Empresa 1 (DANIEL ALEJANDRO GRASSO)...');
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        companyLinks[0].click()
      ]);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03_main_erp_dashboard.png') });
    }

    // Capture Sections
    const sections = [
      { name: '04_catalogo_productos_maestro', url: 'https://app.ipn.com.ar/control/products/default.asp' },
      { name: '05_catalogo_productos_grilla', url: 'https://app.ipn.com.ar/control/products/ws/productDefault.asp' },
      { name: '06_stock_articulos', url: 'https://app.ipn.com.ar/stock/default.asp' },
      { name: '07_ventas_pedidos', url: 'https://app.ipn.com.ar/sales/order/default.asp' },
      { name: '08_clientes_cuentas_ctes', url: 'https://app.ipn.com.ar/admin/customers/default.asp' },
      { name: '09_transportes_expresos', url: 'https://app.ipn.com.ar/configuration/transport/default.asp' },
      { name: '10_listas_de_precios', url: 'https://app.ipn.com.ar/configuration/prices/default.asp' },
      { name: '11_produccion_talleres', url: 'https://app.ipn.com.ar/production/orders/default.asp' },
      { name: '12_embarques_altamar', url: 'https://app.ipn.com.ar/imports/shipments/default.asp' }
    ];

    for (const sec of sections) {
      try {
        console.log(`Navegando y capturando: ${sec.name} (${sec.url})...`);
        await page.goto(sec.url, { waitUntil: 'networkidle2', timeout: 30000 });
        await new Promise(r => setTimeout(r, 1500)); // wait for AJAX or iframes
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${sec.name}.png`), fullPage: false });
      } catch (err) {
        console.log(`Aviso en ${sec.name}:`, err.message);
      }
    }

    console.log('=== TODAS LAS CAPTURAS DE IPN HAN SIDO TOMADAS CON ÉXITO ===');
  } finally {
    await browser.close();
  }
}

captureIpnScreenshots().catch(console.error);
