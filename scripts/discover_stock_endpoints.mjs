async function checkStockEndpoints() {
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

  const endpoints = [
    'https://app.ipn.com.ar/stock/default.asp',
    'https://app.ipn.com.ar/stock/article/default.asp',
    'https://app.ipn.com.ar/stock/ws/articleDefault.asp',
    'https://app.ipn.com.ar/stock/article/articleDefault.asp',
    'https://app.ipn.com.ar/control/products/ws/productStock.asp'
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep, { headers: { Cookie: sessionCookie } });
      console.log(`Endpoint: ${ep} -> Status: ${res.status}`);
      const text = await res.text();
      console.log(`Length: ${text.length} bytes | Snippet: ${text.slice(0, 200).replace(/\s+/g, ' ')}\n`);
    } catch (e) {
      console.log(`Error on ${ep}:`, e.message);
    }
  }
}

checkStockEndpoints().catch(console.error);
