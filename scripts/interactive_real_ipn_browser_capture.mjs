import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.resolve('data/ipn_screenshots/real_browser');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function runInteractiveCapture() {
  console.log('=== INICIANDO NAVEGADOR AUTOMATIZADO REAL PARA IPN ERP ===');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new', // Use new headless mode
    defaultViewport: { width: 1440, height: 900 },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--ignore-certificate-errors',
      '--disable-web-security'
    ]
  });

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);
    page.setDefaultTimeout(60000);

    // Set real user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // 1. Navigate to Login
    console.log('1. Cargando https://app.ipn.com.ar/login.asp ...');
    await page.goto('https://app.ipn.com.ar/login.asp', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_login_initial.png') });

    // 2. Fill login form
    console.log('2. Escribiendo usuario y contraseña...');
    
    // Check available inputs
    const inputs = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('input'));
      return els.map(el => ({ id: el.id, name: el.name, type: el.type, placeholder: el.placeholder }));
    });
    console.log('Inputs encontrados en login:', inputs);

    // Fill user field
    await page.waitForSelector('#userName, input[name="User"], #user', { visible: true });
    await page.type('#userName, input[name="User"], #user', '46792-juli', { delay: 30 });

    // Fill password field
    await page.waitForSelector('#userPassword, input[name="Password"], #password, input[type="password"]', { visible: true });
    await page.type('#userPassword, input[name="Password"], #password, input[type="password"]', 'chicha1992', { delay: 30 });

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02_credentials_typed.png') });

    // Click submit
    console.log('3. Haciendo clic en Iniciar Sesión...');
    const submitBtn = await page.$('#btnIniciarSesion, input[type="submit"], button[type="submit"]');
    if (submitBtn) {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(e => console.log('Nav wait:', e.message)),
        submitBtn.click()
      ]);
    }

    console.log('4. URL tras submit:', page.url());
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03_after_login_submit.png') });

    // If company selection screen
    const pageHtml = await page.content();
    console.log('Título de la página actual:', await page.title());

    if (page.url().includes('selectCompany') || pageHtml.includes('selectCompany') || pageHtml.includes('GRASSO')) {
      console.log('5. Detectada selección de empresa...');
      const companyLink = await page.$('a[href*="CompanyID=1"], a[href*="company"]');
      if (companyLink) {
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {}),
          companyLink.click()
        ]);
      } else {
        await page.goto('https://app.ipn.com.ar/selectCompany.asp?CompanyID=1', { waitUntil: 'networkidle2' });
      }
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04_company_selected.png') });
    }

    // Capture all core modules
    const modules = [
      { name: '05_dashboard_control', url: 'https://app.ipn.com.ar/control/default.asp' },
      { name: '06_menu_lateral', url: 'https://app.ipn.com.ar/menu.asp' },
      { name: '07_catalogo_maestro_articulos', url: 'https://app.ipn.com.ar/control/products/default.asp' },
      { name: '08_grilla_ws_productos_3264', url: 'https://app.ipn.com.ar/control/products/ws/productDefault.asp' },
      { name: '09_ficha_edicion_producto_real', url: 'https://app.ipn.com.ar/control/products/productEdit.asp?masterProductUID=2325A737-9687-499F-B7AB-753FFE6B3314' },
      { name: '10_stock_general', url: 'https://app.ipn.com.ar/stock/default.asp' },
      { name: '11_stock_movimientos_transferencias', url: 'https://app.ipn.com.ar/stock/movements/default.asp' },
      { name: '12_ventas_pedidos_mayoristas', url: 'https://app.ipn.com.ar/sales/order/default.asp' },
      { name: '13_clientes_directorio', url: 'https://app.ipn.com.ar/admin/customers/default.asp' },
      { name: '14_ficha_cliente_cuenta_corriente', url: 'https://app.ipn.com.ar/admin/customers/customerEdit.asp?customerID=1' },
      { name: '15_transportes_56_expresos', url: 'https://app.ipn.com.ar/configuration/transport/default.asp' },
      { name: '16_listas_de_precios_configuracion', url: 'https://app.ipn.com.ar/configuration/prices/default.asp' },
      { name: '17_produccion_talleres_ordenes', url: 'https://app.ipn.com.ar/production/orders/default.asp' },
      { name: '18_embarques_importaciones', url: 'https://app.ipn.com.ar/imports/shipments/default.asp' }
    ];

    for (const mod of modules) {
      try {
        console.log(`Navegando y capturando ${mod.name} (${mod.url})...`);
        await page.goto(mod.url, { waitUntil: 'networkidle2', timeout: 30000 });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${mod.name}.png`) });
      } catch (err) {
        console.log(`Error capturando ${mod.name}:`, err.message);
      }
    }

    console.log('=== CAPTURAS REALES COMPLETADAS EXITOSAMENTE ===');
  } finally {
    await browser.close();
  }
}

runInteractiveCapture().catch(console.error);
