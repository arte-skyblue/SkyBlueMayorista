import fs from 'fs';
import path from 'path';

function parseRealDatabase() {
  const dir = path.resolve('data/real_ipn_export');
  
  // 1. Parse Products
  const prodsHtml = fs.readFileSync(path.join(dir, 'products_list.html'), 'utf8');
  console.log(`products_list.html length: ${prodsHtml.length} bytes`);

  // Look for product rows in tables
  const rows = prodsHtml.match(/<tr[\s\S]*?<\/tr>/gi) || [];
  console.log(`Total table rows in products_list.html: ${rows.length}`);

  // 2. Parse Customers
  const custHtml = fs.readFileSync(path.join(dir, 'customers_list.html'), 'utf8');
  console.log(`customers_list.html length: ${custHtml.length} bytes`);
  const custRows = custHtml.match(/<tr[\s\S]*?<\/tr>/gi) || [];
  console.log(`Total table rows in customers_list.html: ${custRows.length}`);

  // 3. Parse Stock By Store
  const stockHtml = fs.readFileSync(path.join(dir, 'stock_by_store.html'), 'utf8');
  console.log(`stock_by_store.html length: ${stockHtml.length} bytes`);

  // Let's print snippets of tables
  for (let i = 0; i < Math.min(10, rows.length); i++) {
    const cleanRow = rows[i].replace(/<[^>]+>/g, ' | ').replace(/\s+/g, ' ').trim();
    if (cleanRow.length > 10) {
      console.log(`Product Row ${i}:`, cleanRow);
    }
  }

  for (let i = 0; i < Math.min(10, custRows.length); i++) {
    const cleanCust = custRows[i].replace(/<[^>]+>/g, ' | ').replace(/\s+/g, ' ').trim();
    if (cleanCust.length > 10) {
      console.log(`Customer Row ${i}:`, cleanCust);
    }
  }
}

parseRealDatabase();
