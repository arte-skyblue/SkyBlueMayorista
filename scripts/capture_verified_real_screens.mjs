import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.resolve('data/ipn_screenshots/verified_real');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function captureVerifiedRealScreens() {
  console.log('=== INICIANDO CAPTURA VERIFICADA EN IPN ERP ===');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors']
  });

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);

    // 1. First authenticate with HTTP POST to get the authentic session cookies
    console.log('1. Autenticando con credenciales...');
    const loginRes = await fetch('https://app.ipn.com.ar/login.asp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: new URLSearchParams({
        doAction: '1',
        userName: '46792-juli',
        password: 'chicha1992',
        browserName: 'Chrome',
        browserVersion: '120',
        browserLongName: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }),
      redirect: 'manual'
    });

    const rawCookies = loginRes.headers.get('set-cookie') || '';
    console.log('Cookies recibidas:', rawCookies);

    const cookieMatches = rawCookies.match(/ASPSESSIONID[A-Z]+=[^;]+/gi) || [];
    const sessionCookie = cookieMatches.join('; ');

    // Select Company 1
    const compRes = await fetch('https://app.ipn.com.ar/selectCompany.asp?CompanyID=1', {
      headers: {
        'Cookie': sessionCookie,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      redirect: 'manual'
    });
    console.log('Status selectCompany:', compRes.status);
    const compCookies = compRes.headers.get('set-cookie') || '';
    const allCookieMatches = [...cookieMatches, ...(compCookies.match(/ASPSESSIONID[A-Z]+=[^;]+/gi) || [])];

    // Set cookies into Puppeteer
    const puppeteerCookies = allCookieMatches.map(c => {
      const [name, value] = c.split('=');
      return {
        name: name.trim(),
        value: value.trim(),
        domain: 'app.ipn.com.ar',
        path: '/'
      };
    });

    // Also add company cookie if any
    puppeteerCookies.push({
      name: 'CompanyID',
      value: '1',
      domain: 'app.ipn.com.ar',
      path: '/'
    });

    await page.setCookie(...puppeteerCookies);

    // List of key sections to capture
    const sections = [
      { name: '01_dashboard_principal', url: 'https://app.ipn.com.ar/dashboard.asp' },
      { name: '02_catalogo_maestro_grilla_3264', url: 'https://app.ipn.com.ar/control/products/ws/productDefault.asp' },
      { name: '03_edicion_producto_ficha_360', url: 'https://app.ipn.com.ar/control/products/productEdit.asp?masterProductUID=2325A737-9687-499F-B7AB-753FFE6B3314' },
      { name: '04_stock_por_sucursal', url: 'https://app.ipn.com.ar/stock/default.asp' },
      { name: '05_movimientos_de_stock', url: 'https://app.ipn.com.ar/stock/movements/default.asp' },
      { name: '06_pedidos_mayoristas_listado', url: 'https://app.ipn.com.ar/sales/order/default.asp' },
      { name: '07_nuevo_pedido_formulario', url: 'https://app.ipn.com.ar/sales/order/orderEdit.asp' },
      { name: '08_clientes_directorio', url: 'https://app.ipn.com.ar/admin/customers/default.asp' },
      { name: '09_cliente_cuenta_corriente', url: 'https://app.ipn.com.ar/admin/customers/customerEdit.asp?customerID=1' },
      { name: '10_transportes_y_expresos', url: 'https://app.ipn.com.ar/configuration/transport/default.asp' },
      { name: '11_listas_de_precios_1_a_10', url: 'https://app.ipn.com.ar/configuration/prices/default.asp' },
      { name: '12_ordenes_de_produccion_talleres', url: 'https://app.ipn.com.ar/production/orders/default.asp' },
      { name: '13_embarques_importacion_altamar', url: 'https://app.ipn.com.ar/imports/shipments/default.asp' }
    ];

    for (const sec of sections) {
      try {
        console.log(`Navegando a ${sec.name} (${sec.url})...`);
        const res = await page.goto(sec.url, { waitUntil: 'networkidle2', timeout: 30000 });
        await new Promise(r => setTimeout(r, 2000));
        const title = await page.title();
        console.log(`  -> Título: "${title}" | URL: ${page.url()}`);
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${sec.name}.png`) });
      } catch (err) {
        console.log(`  -> Error en ${sec.name}:`, err.message);
      }
    }

    console.log('=== CAPTURAS VERIFICADAS GUARDADAS EN data/ipn_screenshots/verified_real ===');
  } finally {
    await browser.close();
  }
}

captureVerifiedRealScreens().catch(console.error);
