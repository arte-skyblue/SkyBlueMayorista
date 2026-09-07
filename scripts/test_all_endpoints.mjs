async function testAllEndpoints() {
  const base = 'http://localhost:4000/api/v1';

  const [p, c, pr, pos, s, st, m] = await Promise.all([
    fetch(`${base}/products?limit=5`).then(r => r.json()),
    fetch(`${base}/customers`).then(r => r.json()),
    fetch(`${base}/production`).then(r => r.json()),
    fetch(`${base}/pos/scan/04748`).then(r => r.json()),
    fetch(`${base}/shipments`).then(r => r.json()),
    fetch(`${base}/stock/summary`).then(r => r.json()),
    fetch(`${base}/meta`).then(r => r.json())
  ]);

  console.log('--- Resumen de Endpoints Reales del ERP ---');
  console.log('1. Productos Reales:', p.count, 'modelos');
  console.log('2. Clientes Reales:', c.count, 'clientes (Deuda total: $' + c.totalDebtorsBalance + ')');
  console.log('3. Producción y Talleres:', pr.data?.workshops?.length, 'talleres /', pr.data?.orders?.length, 'OPs');
  console.log('4. POS Barcode Scan (SKU 04748):', pos.data?.title, '- Mayorista: $' + pos.data?.prices?.wholesale);
  console.log('5. Embarques de Importación:', s.data?.length, 'contenedores');
  console.log('6. Depósitos y Stock:', st.data?.length, 'depósitos');
  console.log('7. Metadatos (Marcas/Rubros/Listas):', m.data?.brands?.length, 'marcas /', m.data?.priceLists?.length, 'listas de precios');
}

testAllEndpoints().catch(console.error);
