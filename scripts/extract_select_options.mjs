import fs from 'fs';

const html = fs.readFileSync('data/ipn_dump/core_modules/products_main.html', 'utf8');

const selects = html.matchAll(/<select[^>]*id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/select>/gi);
const catalogEntities = {};

for (const s of selects) {
  const id = s[1];
  const options = [];
  const optMatches = s[2].matchAll(/<option[^>]*value=["']([^"']*)["'][^>]*>([\s\S]*?)<\/option>/gi);
  for (const opt of optMatches) {
    if (opt[1] !== '' && opt[1] !== '0' && !opt[2].includes('Seleccione')) {
      options.push({ id: opt[1], name: opt[2].replace(/<[^>]+>/g, '').trim() });
    }
  }
  catalogEntities[id] = options;
  console.log(`Select #${id}: ${options.length} options`);
}

fs.writeFileSync('data/ipn_dump/catalog_filter_entities.json', JSON.stringify(catalogEntities, null, 2));

console.log('\n--- TEMPORADAS (seasonID) ---');
console.table(catalogEntities['seasonID'] || []);

console.log('\n--- MARCAS (trademarkID) ---');
console.table(catalogEntities['trademarkID'] || []);

console.log('\n--- PROVEEDORES (providerID) ---');
console.table((catalogEntities['providerID'] || []).slice(0, 20));

console.log('\n--- MATERIALES (materialID) ---');
console.table(catalogEntities['materialID'] || []);

console.log('\n--- LÍNEAS (lineID) ---');
console.table(catalogEntities['lineID'] || []);
