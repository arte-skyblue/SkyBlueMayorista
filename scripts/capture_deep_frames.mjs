import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.resolve('data/ipn_screenshots/frames');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function captureDeepFrames() {
  console.log('=== CAPTURANDO FRAMES Y SECCIONES DETALLADAS DE IPN ===');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors']
  });

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);

    await page.goto('https://app.ipn.com.ar/login.asp', { waitUntil: 'networkidle2' });
    await page.type('#user, input[name="user"]', '46792-juli');
    await page.type('#password, input[name="password"]', 'chicha1992');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click('#submit, input[type="submit"]')
    ]);

    // Select Company 1
    const companySelectUrl = 'https://app.ipn.com.ar/selectCompany.asp?CompanyID=1';
    await page.goto(companySelectUrl, { waitUntil: 'networkidle2' });

    // Key Deep URLs in iPN
    const deepUrls = [
      { name: '01_dashboard_principal', url: 'https://app.ipn.com.ar/dashboard.asp' },
      { name: '02_grilla_catalogo_3264', url: 'https://app.ipn.com.ar/control/products/ws/productDefault.asp' },
      { name: '03_edicion_producto_360', url: 'https://app.ipn.com.ar/control/products/productEdit.asp?masterProductUID=2325A737-9687-499F-B7AB-753FFE6B3314' },
      { name: '04_stock_por_sucursal_deposito', url: 'https://app.ipn.com.ar/stock/default.asp' },
      { name: '05_movimientos_y_transferencias_stock', url: 'https://app.ipn.com.ar/stock/movements/default.asp' },
      { name: '06_pedidos_mayoristas_listado', url: 'https://app.ipn.com.ar/sales/order/default.asp' },
      { name: '07_nuevo_pedido_venta_form', url: 'https://app.ipn.com.ar/sales/order/orderEdit.asp' },
      { name: '08_clientes_directorio', url: 'https://app.ipn.com.ar/admin/customers/default.asp' },
      { name: '09_ficha_cuenta_corriente_cliente', url: 'https://app.ipn.com.ar/admin/customers/customerEdit.asp?customerID=1' },
      { name: '10_transportes_56_expresos', url: 'https://app.ipn.com.ar/configuration/transport/default.asp' },
      { name: '11_listas_de_precios_1_a_10', url: 'https://app.ipn.com.ar/configuration/prices/default.asp' },
      { name: '12_ordenes_de_produccion_talleres', url: 'https://app.ipn.com.ar/production/orders/default.asp' },
      { name: '13_embarques_importacion_altamar', url: 'https://app.ipn.com.ar/imports/shipments/default.asp' }
    ];

    for (const item of deepUrls) {
      try {
        console.log(`Accediendo a: ${item.name} (${item.url})...`);
        const res = await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 25000 });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${item.name}.png`) });
      } catch (e) {
        console.log(`Error capturando ${item.name}:`, e.message);
      }
    }

    console.log('=== CAPTURAS DETALLADAS COMPLETADAS ===');
  } finally {
    await browser.close();
  }
}

captureDeepFrames().catch(console.error);
