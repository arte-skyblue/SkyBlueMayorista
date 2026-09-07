import fs from 'fs';

const html = fs.readFileSync('data/ipn_dump/core_modules/products_main.html', 'utf8');

// Find all forms in products_main.html
const forms = html.match(/<form[\s\S]*?<\/form>/gi) || [];
console.log('Forms count:', forms.length);
for (const f of forms) {
  console.log('--- Form action & method ---');
  console.log(f.match(/<form[^>]+>/i)?.[0]);
  const inputs = f.match(/<input[^>]+>/gi) || [];
  console.log('Inputs in form:', inputs);
  const selects = f.match(/<select[^>]+>/gi) || [];
  console.log('Selects in form:', selects);
}

// Find table results if any
const tables = html.match(/<table[\s\S]*?<\/table>/gi) || [];
console.log('Tables count:', tables.length);
for (let i = 0; i < tables.length; i++) {
  console.log(`Table ${i} length:`, tables[i].length);
  if (tables[i].includes('Artículo') || tables[i].includes('Descrip') || tables[i].includes('Código') || tables[i].includes('Precio')) {
    console.log(`Table ${i} preview:`, tables[i].slice(0, 1500));
  }
}
