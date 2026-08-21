import { Session } from './session_helper.mjs';

async function inspectProductDetail() {
  const session = new Session();
  await session.login('maarcelino.designs@gmail.com', 'marce26');
  await session.selectCustomer('SALAMONE');

  console.log('Fetching /Products/3924...');
  const res = await session.fetch('/Products/3924');
  const html = await res.text();
  console.log('Product detail HTML length:', html.length);
  
  import('fs').then(fs => {
    fs.writeFileSync('scripts/product_detail_3924.html', html);
    console.log('Saved scripts/product_detail_3924.html');
  });
}

inspectProductDetail().catch(console.error);
