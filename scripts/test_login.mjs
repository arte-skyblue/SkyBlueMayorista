const BASE_URL = 'https://mayoristas.skyblue.com.ar';

class Session {
  constructor() {
    this.cookies = new Map();
  }

  updateCookies(response) {
    const setCookieHeaders = response.headers.getSetCookie 
      ? response.headers.getSetCookie() 
      : [response.headers.get('set-cookie')].filter(Boolean);

    for (const header of setCookieHeaders) {
      const parts = header.split(';');
      const [cookiePair] = parts;
      const idx = cookiePair.indexOf('=');
      if (idx !== -1) {
        const name = cookiePair.slice(0, idx).trim();
        const value = cookiePair.slice(idx + 1).trim();
        this.cookies.set(name, value);
      }
    }
  }

  getCookieHeader() {
    return Array.from(this.cookies.entries())
      .map(([k, v]) => `${k}=${v}`)
      .join('; ');
  }

  async fetch(url, options = {}) {
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    const headers = new Headers(options.headers || {});
    const cookieHeader = this.getCookieHeader();
    if (cookieHeader) {
      headers.set('Cookie', cookieHeader);
    }
    
    if (!headers.has('User-Agent')) {
      headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    }

    const response = await fetch(fullUrl, {
      ...options,
      headers,
      redirect: 'manual'
    });

    this.updateCookies(response);

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('Location');
      console.log(`[Redirect ${response.status}] -> ${location}`);
      if (location) {
        return this.fetch(location, { method: 'GET' });
      }
    }

    return response;
  }
}

async function main() {
  const session = new Session();

  console.log('1. Obteniendo página de login...');
  const loginPageRes = await session.fetch('/');
  const loginHtml = await loginPageRes.text();

  const tokenMatch = loginHtml.match(/name="__RequestVerificationToken"\s+type="hidden"\s+value="([^"]+)"/);
  if (!tokenMatch) {
    console.error('No se encontró el token de verificación CSRF');
    return;
  }
  const token = tokenMatch[1];
  console.log('Token obtenido:', token.slice(0, 20) + '...');

  console.log('2. Enviando credenciales...');
  const formData = new URLSearchParams();
  formData.append('ReturnUrl', '/');
  formData.append('UserName', 'maarcelino.designs@gmail.com');
  formData.append('UserPassword', 'marce26');
  formData.append('__RequestVerificationToken', token);

  const loginRes = await session.fetch('/Account/Login?returnurl=%2F', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': `${BASE_URL}/`,
      'Origin': BASE_URL
    },
    body: formData.toString()
  });

  const responseText = await loginRes.text();
  const custTokenMatch = responseText.match(/name="__RequestVerificationToken"\s+type="hidden"\s+value="([^"]+)"/);
  const custToken = custTokenMatch ? custTokenMatch[1] : token;

  console.log('3. Buscando clientes con textSearch=SALAMONE...');
  const searchCustRes = await session.fetch('/Core/GetCustomerListLogin?textSearch=SALAMONE', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const customers = await searchCustRes.json();
  console.log('Clientes encontrados:', customers);

  const selectedCustomer = customers[0];
  console.log('Seleccionando cliente:', selectedCustomer);

  console.log('4. Enviando selección de cliente...');
  const custFormData = new URLSearchParams();
  custFormData.append('CustomerID', selectedCustomer.id);
  custFormData.append('__RequestVerificationToken', custToken);

  const selectRes = await session.fetch('/Account/CustomerSelect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': `${BASE_URL}/Account/CustomerSelect`,
      'Origin': BASE_URL
    },
    body: custFormData.toString()
  });

  console.log('Status después de CustomerSelect:', selectRes.status);
  const homeHtml = await selectRes.text();
  console.log('Home HTML preview:', homeHtml.slice(0, 1500));

  console.log('5. Accediendo a /Products...');
  const productsRes = await session.fetch('/Products');
  const productsHtml = await productsRes.text();
  
  // Extract script tags or relevant sections
  const scripts = [];
  const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(productsHtml)) !== null) {
    if (!match[0].includes('appInsights')) {
      scripts.push(match[0]);
    }
  }
  
  console.log('Scripts encontrados en /Products:', scripts.join('\n\n--- SCRIPT ---\n\n'));

  // Also check product grid or items in HTML
  console.log('Productos HTML length:', productsHtml.length);
  // Let's write the HTML to a temporary file so we can analyze it
  import('fs').then(fs => {
    fs.writeFileSync('scripts/products_page.html', productsHtml);
    console.log('Guardado scripts/products_page.html');
  });
}

main().catch(console.error);
