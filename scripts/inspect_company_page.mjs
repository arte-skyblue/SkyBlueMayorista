import fs from 'fs';

const html = fs.readFileSync('data/ipn_dump/defaultSelectedCompany.html', 'utf8');

// Find all company / store options or rows
const tableMatch = html.match(/<table[\s\S]*?<\/table>/gi);
if (tableMatch) {
  for (const t of tableMatch) {
    console.log('--- Table ---');
    console.log(t.replace(/<style[\s\S]*?<\/style>/gi, ''));
  }
}

const buttons = html.match(/<button[\s\S]*?<\/button>/gi) || [];
console.log('Buttons:', buttons);

// Search for onClick or javascript calls that set storeID / companyID
const jsCalls = html.match(/selectCompany\([^)]*\)|setStore\([^)]*\)|javascript:[^'"]+/gi) || [];
console.log('JS calls found:', jsCalls);

// Look for cards / divs with company / store data
const cards = html.match(/class=["'][^"']*company[^"']*["'][\s\S]*?<\/div>/gi) || [];
console.log('Company elements:', cards.slice(0, 10));
