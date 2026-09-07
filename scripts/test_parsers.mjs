import fs from 'fs';
import path from 'path';

function testParsers() {
  const dir = path.resolve('data/real_ipn_export');

  // Customers
  const custHtml = fs.readFileSync(path.join(dir, 'admin_customers.html'), 'utf8');
  const custTrs = custHtml.match(/<tr[\s\S]*?<\/tr>/gi) || [];
  console.log(`admin_customers.html total rows: ${custTrs.length}`);

  const parsedCustomers = [];
  for (const tr of custTrs) {
    if (tr.includes('customerID') || tr.includes('edit.asp')) {
      const tds = Array.from(tr.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi), m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
      if (tds.length >= 4) {
        parsedCustomers.push({
          code: tds[0],
          name: tds[1],
          cuit: tds[2] || 'N/A',
          balance: tds[3] || '0',
          fullTds: tds
        });
      }
    }
  }
  console.log(`Parsed ${parsedCustomers.length} real customers!`);
  console.log('Sample customer:', parsedCustomers.slice(0, 3));

  // Workshops
  const workHtml = fs.readFileSync(path.join(dir, 'workshops.html'), 'utf8');
  const workTrs = workHtml.match(/<tr[\s\S]*?<\/tr>/gi) || [];
  console.log(`workshops.html total rows: ${workTrs.length}`);
  for (let i = 0; i < Math.min(10, workTrs.length); i++) {
    const text = workTrs[i].replace(/<[^>]+>/g, ' | ').replace(/\s+/g, ' ').trim();
    if (text.length > 10) console.log(`Workshop row ${i}:`, text);
  }
}

testParsers();
