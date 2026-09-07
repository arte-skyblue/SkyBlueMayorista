async function testRoutes() {
  const base = 'http://localhost:4000/api/v1';

  try {
    const pRes = await fetch(`${base}/products`);
    const pData = await pRes.json();
    console.log('Products route returned keys:', Object.keys(pData));
    if (pData.data) console.log('pData.data length:', pData.data.length, 'Item 0:', pData.data[0]);
  } catch (e) {
    console.error('Products error:', e);
  }

  try {
    const mRes = await fetch(`${base}/meta/all`);
    const mData = await mRes.json();
    console.log('Meta route returned keys:', Object.keys(mData));
  } catch (e) {
    console.error('Meta error:', e);
  }
}

testRoutes();
