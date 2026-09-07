async function verify() {
  const base = 'http://localhost:4000/api/v1';

  const pRes = await fetch(`${base}/products?limit=10`);
  const products = await pRes.json();
  console.log('Products API count:', products.total, 'Sample:', products.products[0]?.title);

  const cRes = await fetch(`${base}/orders/customers/list`);
  const customers = await cRes.json();
  console.log('Customers API count:', customers.length, 'Sample:', customers[0]?.name, 'CUIT:', customers[0]?.cuit);

  const sRes = await fetch(`${base}/stock/summary`);
  const stock = await sRes.json();
  console.log('Stock API summary total items:', stock.data?.length, 'Sample:', stock.data[0]);

  const shRes = await fetch(`${base}/shipments`);
  const shipments = await shRes.json();
  console.log('Shipments API count:', shipments.length, 'Sample:', shipments[0]?.shipmentNumber);
}

verify().catch(console.error);
