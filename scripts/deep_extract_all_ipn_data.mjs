import { IPNSession } from './ipn_session.mjs';
import fs from 'fs';
import path from 'path';

async function deepExtract() {
  console.log('--- Iniciando Extracción Profunda de Datos Reales de iPN ---');
  const session = new IPNSession();
  await session.login();

  // Pass notifications and select company 1 (DANIEL ALEJANDRO GRASSO)
  const notifParams = new URLSearchParams();
  notifParams.append('doAction', '1');
  notifParams.append('action', 'submit');
  await session.fetch('/notifications.asp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: notifParams.toString()
  });

  const compParams = new URLSearchParams();
  compParams.append('companyID', '1');
  compParams.append('doAction', '1');
  compParams.append('action', 'selectCompany');
  await session.fetch('/configuration/companies/selectCompany.asp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: compParams.toString()
  });

  const outputDir = path.resolve('./data/real_ipn_export');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 1. Fetch Customers
  console.log('Extrayendo Clientes y Cuentas Corrientes...');
  const customersRes = await session.fetch('/control/customers/default.asp');
  const customersHtml = await customersRes.text();
  fs.writeFileSync(path.join(outputDir, 'customers_raw.html'), customersHtml);

  // 2. Fetch Suppliers / Proveedores
  console.log('Extrayendo Proveedores...');
  const providersRes = await session.fetch('/control/providers/default.asp');
  const providersHtml = await providersRes.text();
  fs.writeFileSync(path.join(outputDir, 'providers_raw.html'), providersHtml);

  // 3. Fetch Stock / Inventario
  console.log('Extrayendo Inventario y Depósitos...');
  const stockRes = await session.fetch('/control/stock/default.asp');
  const stockHtml = await stockRes.text();
  fs.writeFileSync(path.join(outputDir, 'stock_raw.html'), stockHtml);

  // 4. Fetch Price Lists
  console.log('Extrayendo Listas de Precios...');
  const priceListsRes = await session.fetch('/configuration/productsPriceLists/default.asp');
  const priceListsHtml = await priceListsRes.text();
  fs.writeFileSync(path.join(outputDir, 'price_lists_raw.html'), priceListsHtml);

  // 5. Fetch Production / Talleres
  console.log('Extrayendo Producción y Fichas Técnicas...');
  const prodRes = await session.fetch('/control/production/default.asp');
  const prodHtml = await prodRes.text();
  fs.writeFileSync(path.join(outputDir, 'production_raw.html'), prodHtml);

  // 6. Fetch Orders / Pedidos
  console.log('Extrayendo Pedidos de Venta...');
  const ordersRes = await session.fetch('/control/orders/default.asp');
  const ordersHtml = await ordersRes.text();
  fs.writeFileSync(path.join(outputDir, 'orders_raw.html'), ordersHtml);

  console.log('--- Extracción de HTMLs completada ---');
}

deepExtract().catch(console.error);
