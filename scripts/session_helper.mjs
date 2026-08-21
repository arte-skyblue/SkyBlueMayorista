export const BASE_URL = 'https://mayoristas.skyblue.com.ar';

export class Session {
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
      if (location) {
        return this.fetch(location, { method: 'GET' });
      }
    }

    return response;
  }

  async login(email, password) {
    console.log('Logging in...');
    const loginPageRes = await this.fetch('/');
    const loginHtml = await loginPageRes.text();

    const tokenMatch = loginHtml.match(/name="__RequestVerificationToken"\s+type="hidden"\s+value="([^"]+)"/);
    if (!tokenMatch) throw new Error('No CSRF token on login page');
    const token = tokenMatch[1];

    const formData = new URLSearchParams();
    formData.append('ReturnUrl', '/');
    formData.append('UserName', email);
    formData.append('UserPassword', password);
    formData.append('__RequestVerificationToken', token);

    const loginRes = await this.fetch('/Account/Login?returnurl=%2F', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': `${BASE_URL}/`,
        'Origin': BASE_URL
      },
      body: formData.toString()
    });

    return loginRes;
  }

  async selectCustomer(searchQuery = 'SALAMONE') {
    console.log(`Selecting customer matching "${searchQuery}"...`);
    const custPageRes = await this.fetch('/Account/CustomerSelect');
    const custHtml = await custPageRes.text();
    const tokenMatch = custHtml.match(/name="__RequestVerificationToken"\s+type="hidden"\s+value="([^"]+)"/);
    const token = tokenMatch ? tokenMatch[1] : '';

    const searchCustRes = await this.fetch(`/Core/GetCustomerListLogin?textSearch=${encodeURIComponent(searchQuery)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const customers = await searchCustRes.json();
    if (!customers || customers.length === 0) {
      throw new Error(`Customer not found for query ${searchQuery}`);
    }

    const selectedCustomer = customers[0];
    console.log('Customer chosen:', selectedCustomer);

    const custFormData = new URLSearchParams();
    custFormData.append('CustomerID', selectedCustomer.id);
    if (token) custFormData.append('__RequestVerificationToken', token);

    const selectRes = await this.fetch('/Account/CustomerSelect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': `${BASE_URL}/Account/CustomerSelect`,
        'Origin': BASE_URL
      },
      body: custFormData.toString()
    });

    return selectRes;
  }
}
