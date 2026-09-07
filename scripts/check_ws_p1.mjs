import fs from 'fs';

const html = fs.readFileSync('data/real_ipn_export/ws_products_list_p1.html', 'utf8');
console.log('File size:', html.length);
console.log('First 500 characters:');
console.log(html.slice(0, 500));
console.log('Last 500 characters:');
console.log(html.slice(-500));
