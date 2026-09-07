import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function takeErpScreenshot() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.goto('http://localhost:5173/erp', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.screenshot({ path: path.resolve('data/erp_working_live.png') });
    console.log('Screenshot of working ERP saved to data/erp_working_live.png');
  } finally {
    await browser.close();
  }
}

takeErpScreenshot().catch(console.error);
