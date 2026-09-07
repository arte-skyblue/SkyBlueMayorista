async function test() {
  console.time('Fetch all 3264 products');
  const res = await fetch('http://localhost:4000/api/v1/products').then(r => r.json());
  console.timeEnd('Fetch all 3264 products');
  console.log('Total returned:', res.count);

  console.time('Search SKU 04748');
  const sRes = await fetch('http://localhost:4000/api/v1/products?search=04748').then(r => r.json());
  console.timeEnd('Search SKU 04748');
  console.log('Search results for 04748:', sRes.count, sRes.data?.[0]?.title);
}

test().catch(console.error);
