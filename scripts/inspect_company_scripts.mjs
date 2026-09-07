import fs from 'fs';

const html = fs.readFileSync('data/ipn_dump/defaultSelectedCompany.html', 'utf8');

const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
for (const s of scripts) {
  if (s.includes('ipn-rsc-row') || s.includes('data-company-id') || s.includes('setStore') || s.includes('frmSelected')) {
    console.log('--- Script ---');
    console.log(s);
  }
}
