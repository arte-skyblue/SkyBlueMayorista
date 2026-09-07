import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const outDir = path.resolve('data/screenshots_light_theme');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Navigate to ERP in light mode
  console.log('Navegando al ERP en modo claro (http://localhost:5173/?mode=erp)...');
  await page.goto('http://localhost:5173/?mode=erp', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Screenshot 1: Dashboard
  await page.screenshot({ path: path.join(outDir, '01_dashboard_light.png') });
  console.log('Captura 1: Dashboard guardada');

  // Click on Catálogo
  const navButtons = await page.$$('aside button');
  for (const btn of navButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('Catálogo')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, '02_catalog_products_light.png') });
  console.log('Captura 2: Catálogo guardada');

  // Click on first product row to open 360 Drawer
  const firstRow = await page.$('tbody tr');
  if (firstRow) {
    await firstRow.click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(outDir, '03_product_drawer_360.png') });
    console.log('Captura 3: Drawer 360 guardada');
  }

  // Click on Clientes
  for (const btn of navButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('Clientes')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, '04_customers_crm_light.png') });
  console.log('Captura 4: Clientes CRM guardada');

  await browser.close();
  console.log('=== Capturas completadas con éxito ===');
}

main().catch(console.error);
