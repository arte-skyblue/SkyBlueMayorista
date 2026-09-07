import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testFrontend() {
  console.log('=== DIAGNOSTICANDO ERROR DE RENDERIZADO EN FRONTEND ===');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error('BROWSER CONSOLE ERROR:', msg.text());
      } else {
        console.log('BROWSER CONSOLE LOG:', msg.text());
      }
    });

    page.on('pageerror', err => {
      console.error('BROWSER UNCAUGHT PAGE ERROR:', err.message, err.stack);
    });

    console.log('1. Cargando http://localhost:5173/ ...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 15000 }).catch(e => console.log('Home error:', e.message));
    
    const homeHtml = await page.content();
    console.log('Home HTML has ErrorBoundary message:', homeHtml.includes('Hubo un detalle al cargar esta vista'));

    console.log('2. Cargando http://localhost:5173/erp ...');
    await page.goto('http://localhost:5173/erp', { waitUntil: 'networkidle2', timeout: 15000 }).catch(e => console.log('ERP error:', e.message));

    const erpHtml = await page.content();
    console.log('ERP HTML has ErrorBoundary message:', erpHtml.includes('Hubo un detalle al cargar esta vista'));

    if (erpHtml.includes('Hubo un detalle al cargar esta vista')) {
      const errorText = await page.evaluate(() => {
        const p = document.querySelector('p.font-mono');
        return p ? p.innerText : 'No se encontró mensaje en <p>';
      });
      console.error('\n>>> MENSAJE EXACTO DEL ERROR EN PANTALLA >>>:', errorText);
    }
  } finally {
    await browser.close();
  }
}

testFrontend().catch(console.error);
