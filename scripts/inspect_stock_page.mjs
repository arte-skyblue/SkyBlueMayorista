import fs from 'fs';

async function inspectStockPage() {
  const loginRes = await fetch('https://app.ipn.com.ar/login.asp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ User: '46792-juli', Password: 'chicha1992', Submit: 'Ingresar' }),
    redirect: 'manual'
  });

  const rawCookies = loginRes.headers.get('set-cookie') || '';
  const cookieMatches = rawCookies.match(/ASPSESSIONID[A-Z]+=[^;]+/gi) || [];
  const sessionCookie = cookieMatches.join('; ');

  await fetch('https://app.ipn.com.ar/selectCompany.asp?CompanyID=1', {
    headers: { Cookie: sessionCookie }
  });

  const res = await fetch('https://app.ipn.com.ar/stock/default.asp', {
    headers: { Cookie: sessionCookie }
  });

  const html = await res.text();
  fs.writeFileSync('data/stock_default_raw.html', html);
  console.log('Saved data/stock_default_raw.html, length:', html.length);

  // Look for iframes, forms, or ajax urls
  const iframes = html.match(/<iframe[^>]+>/gi) || [];
  console.log('Iframes in stock page:', iframes);

  const scripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
  console.log('Scripts count:', scripts.length);
  for (const s of scripts) {
    if (s.includes('.asp') || s.includes('url') || s.includes('fetch') || s.includes('ajax')) {
      console.log('Script relevant snippet:', s.slice(0, 300));
    }
  }
}

inspectStockPage().catch(console.error);
