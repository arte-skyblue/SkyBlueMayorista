import fs from 'fs';
import path from 'path';

export function parseTransportsAndProviders() {
  const dir = path.resolve('data/real_ipn_export');

  // 1. Transports
  const transpText = fs.readFileSync(path.join(dir, 'transports.html'), 'utf8');
  const transpTrs = transpText.match(/<tr[\s\S]*?<\/tr>/gi) || [];
  console.log(`Total transport rows: ${transpTrs.length}`);

  const transports = [];
  for (const tr of transpTrs) {
    if (tr.includes('transportID') || tr.includes('edit.asp') || tr.includes('transportName') || tr.includes('details.asp')) {
      const tds = Array.from(tr.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi), m => m[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim());
      if (tds.length >= 2 && tds[0].length > 1) {
        transports.push({
          name: tds[0],
          address: tds[1] || 'Buenos Aires',
          phone: tds[2] || '',
          contact: tds[3] || ''
        });
      }
    }
  }

  console.log(`Parsed ${transports.length} transport companies!`);
  console.log('Sample transports:', transports.slice(0, 10));

  // 2. Providers
  const provText = fs.readFileSync(path.join(dir, 'admin_providers.html'), 'utf8');
  const provTrs = provText.match(/<tr[\s\S]*?<\/tr>/gi) || [];
  console.log(`Total provider rows: ${provTrs.length}`);

  const providers = [];
  for (const tr of provTrs) {
    if (tr.includes('providerID') || tr.includes('edit.asp') || tr.includes('details.asp')) {
      const tds = Array.from(tr.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi), m => m[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim());
      if (tds.length >= 2 && tds[0].length > 1) {
        providers.push({
          code: tds[0],
          name: tds[1],
          cuit: tds[2] || '',
          city: tds[3] || 'Buenos Aires'
        });
      }
    }
  }

  console.log(`Parsed ${providers.length} suppliers/providers!`);
  console.log('Sample providers:', providers.slice(0, 5));

  fs.writeFileSync(path.join(dir, 'parsed_transports.json'), JSON.stringify(transports, null, 2));
  fs.writeFileSync(path.join(dir, 'parsed_providers.json'), JSON.stringify(providers, null, 2));
}

parseTransportsAndProviders();
