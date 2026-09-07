import fs from 'fs';

function parseFormFields(html) {
  const fields = [];

  // Match inputs
  const inputMatches = html.matchAll(/<input[^>]+>/gi);
  for (const m of inputMatches) {
    const str = m[0];
    const name = str.match(/name=["']([^"']+)["']/i)?.[1] || '';
    const id = str.match(/id=["']([^"']+)["']/i)?.[1] || '';
    const type = str.match(/type=["']([^"']+)["']/i)?.[1] || 'text';
    const value = str.match(/value=["']([^"']*)["']/i)?.[1] || '';
    fields.push({ tag: 'input', name, id, type, value });
  }

  // Match selects and their options
  const selectMatches = html.matchAll(/<select[^>]*name=["']([^"']+)["'][^>]*>([\s\S]*?)<\/select>/gi);
  for (const m of selectMatches) {
    const name = m[1];
    const optionsHtml = m[2];
    const options = [];
    const optMatches = optionsHtml.matchAll(/<option[^>]*value=["']([^"']*)["'][^>]*>([\s\S]*?)<\/option>/gi);
    for (const opt of optMatches) {
      options.push({ value: opt[1], text: opt[2].replace(/<[^>]+>/g, '').trim() });
    }
    fields.push({ tag: 'select', name, optionsCount: options.length, sampleOptions: options.slice(0, 15) });
  }

  return fields;
}

const addHtml = fs.readFileSync('data/ipn_dump/core_modules/product_add.html', 'utf8');
const addFields = parseFormFields(addHtml);

const mainHtml = fs.readFileSync('data/ipn_dump/core_modules/products_main.html', 'utf8');
const mainFields = parseFormFields(mainHtml);

console.log('--- Product Add Form Structure ---');
console.log(JSON.stringify(addFields, null, 2));

fs.writeFileSync('data/ipn_dump/product_add_fields.json', JSON.stringify(addFields, null, 2));
fs.writeFileSync('data/ipn_dump/products_main_fields.json', JSON.stringify(mainFields, null, 2));
