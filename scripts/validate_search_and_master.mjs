async function test() {
  const p1 = await fetch('http://localhost:4000/api/v1/products?search=04748').then(r => r.json());
  const p2 = await fetch('http://localhost:4000/api/v1/products?search=Botas').then(r => r.json());
  const p3 = await fetch('http://localhost:4000/api/v1/products?search=Negro').then(r => r.json());
  const t = await fetch('http://localhost:4000/api/v1/transports').then(r => r.json());
  const s = await fetch('http://localhost:4000/api/v1/stock/summary').then(r => r.json());
  
  console.log('--- Resultados de Validación ---');
  console.log('1. Búsqueda por SKU "04748":', p1.count, 'resultado(s) ->', p1.data?.[0]?.title);
  console.log('2. Búsqueda por Rubro "Botas":', p2.count, 'resultado(s) ->', p2.data?.[0]?.title);
  console.log('3. Búsqueda por Color "Negro":', p3.count, 'resultado(s)');
  console.log('4. Transportes Reales:', t.count, 'empresas (ej: ' + t.data?.[0]?.name + ', ' + t.data?.[1]?.name + ', ' + t.data?.[2]?.name + ')');
  console.log('5. Sucursales de Stock:');
  s.data?.forEach(w => console.log('   - ' + w.name + ': ' + w.availableNowPares + ' pares disponibles'));
}
test().catch(console.error);
