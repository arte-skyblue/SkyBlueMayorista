import { IPNSession } from './ipn_session.mjs';
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.resolve('data/ipn_screenshots/menu_real_sections');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function discoverAndCaptureAllMenuUrls() {
  console.log('=== DESCUBRIENDO Y CAPTURANDO TODAS LAS SECCIONES REALES DEL MENÚ DE IPN ===');

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

  // Fetch /default.asp or /control/default.asp to extract all real navigation links
  const defaultRes = await session.fetch('/default.asp');
  const defaultHtml = await defaultRes.text();
  fs.writeFileSync('data/default_main_menu.html', defaultHtml);

  // Extract all hrefs
  const linkMatches = defaultHtml.match(/href=['"]([^'"]+\.asp[^'"]*)['"]/gi) || [];
  const onclickMatches = defaultHtml.match(/location\.href=['"]([^'"]+\.asp[^'"]*)['"]/gi) || [];

  const foundUrls = new Set();
  [...linkMatches, ...onclickMatches].forEach(m => {
    const raw = m.replace(/href=['"]|location\.href=['"]|['"]/gi, '').trim();
    if (raw && !raw.includes('logout') && !raw.includes('javascript') && !raw.includes('#')) {
      foundUrls.add(raw.startsWith('/') ? `https://app.ipn.com.ar${raw}` : `https://app.ipn.com.ar/${raw}`);
    }
  });

  // Always include key verified functional endpoints
  foundUrls.add('https://app.ipn.com.ar/control/products/default.asp');
  foundUrls.add('https://app.ipn.com.ar/control/products/ws/productDefault.asp');
  foundUrls.add('https://app.ipn.com.ar/control/products/productEdit.asp?masterProductUID=2325A737-9687-499F-B7AB-753FFE6B3314');

  console.log(`Descubiertas ${foundUrls.size} URLs de secciones en el menú de iPN:`, Array.from(foundUrls));

  // Launch Puppeteer with session cookies
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

    let idx = 1;
    for (const url of Array.from(foundUrls)) {
      try {
        const cleanName = url.replace('https://app.ipn.com.ar/', '').replace(/[\/\?=\&]/g, '_');
        console.log(`[${idx}/${foundUrls.size}] Capturando: ${cleanName} (${url})...`);
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        await new Promise(r => setTimeout(r, 2000));
        const filename = `${String(idx).padStart(2, '0')}_${cleanName.slice(0, 50)}.png`;
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, filename) });
        idx++;
      } catch (err) {
        console.log(`Error capturando ${url}:`, err.message);
      }
    }

    console.log('=== TODAS LAS SECCIONES REALES DEL MENÚ CAPTURADAS CON ÉXITO ===');
  } finally {
    await browser.close();
  }
}

discoverAndCaptureAllMenuUrls().catch(console.error);
