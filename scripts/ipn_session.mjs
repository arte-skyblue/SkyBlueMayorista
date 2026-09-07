export const BASE_URL = 'https://app.ipn.com.ar';

export class IPNSession {
  constructor() {
    this.cookies = new Map();
    this.baseUrl = BASE_URL;
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
    const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}/${url.replace(/^\//, '')}`;
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

  async login(userName = '46792-juli', password = 'chicha1992') {
    await this.fetch('/');
    const params = new URLSearchParams();
    params.append('browserName', 'Chrome');
    params.append('browserVersion', '120.0.0.0');
    params.append('browserLongName', 'Chrome');
    params.append('doAction', '1');
    params.append('userName', userName);
    params.append('password', password);

    const loginRes = await this.fetch('/login.asp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': `${this.baseUrl}/`
      },
      body: params.toString()
    });

    return loginRes;
  }
}
