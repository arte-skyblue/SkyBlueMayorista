import { IPNSession } from './ipn_session.mjs';
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.resolve('data/ipn_screenshots/full_system_walkthrough');
const DATA_DIR = path.resolve('data/ipn_deep_audit');

if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

async function fullAutonomousCrawler() {
  console.log('=== INICIANDO RASTREADOR AUTÓNOMO COMPLETO DE IPN ERP ===');

  const session = new IPNSession();
  console.log('1. Autenticando con usuario 46792-juli...');
  await session.login('46792-juli', 'chicha1992');

  // Dismiss notifications
  let res = await session.fetch('/notifications.asp');
  let html = await res.text();
  let loop = 0;
  while (loop < 5) {
    loop++;
    const notifIdMatch = html.match(/name="notificationID"\s+id="[^"]+"\s+value="([^"]+)"/i);
    const notifNameMatch = html.match(/name="notificationName"\s+id="[^"]+"\s+value="([^"]+)"/i);
    if (!notifIdMatch) break;
    const params = new URLSearchParams();
    params.append('doAction', '1');
    params.append('notificationID', notifIdMatch[1]);
    params.append('notificationName', notifNameMatch ? notifNameMatch[1] : '');
    params.append('lastViewTimeSpend', '00:00:05');
    res = await session.fetch('/notifications.asp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    html = await res.text();
  }

  // Define companies to inspect
  const companies = [
    { id: '1', name: 'DANIEL ALEJANDRO GRASSO (SkyBlue)', prefix: '01_SKYBLUE' },
    { id: '2', name: 'GATICAR S.R.L.', prefix: '02_GATICAR' }
  ];

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors']
  });

  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);

    for (const comp of companies) {
      console.log(`\n========================================`);
      console.log(`OPERANDO SOBRE EMPRESA: ${comp.name} (ID: ${comp.id})`);
      console.log(`========================================`);

      const compParams = new URLSearchParams();
      compParams.append('companyID', comp.id);
      compParams.append('companyName', comp.name);
      compParams.append('doAction', '1');
      await session.fetch('/defaultSelectedCompany.asp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: compParams.toString()
      });

      // Update Puppeteer cookies
      const cookiesToSet = [];
      for (const [name, value] of session.cookies.entries()) {
        cookiesToSet.push({ name, value, domain: 'app.ipn.com.ar', path: '/' });
      }
      await page.setCookie(...cookiesToSet);

      // Core sections to visit & download data
      const sections = [
        // 1. Panel & Sucursales
        { key: '01_dashboard_sucursales', url: 'https://app.ipn.com.ar/defaultSelectedStore.asp', download: true },
        { key: '02_admin_panel_general', url: 'https://app.ipn.com.ar/adminPanel.asp', download: true },
        
        // 2. Inventario & Catálogo
        { key: '03_catalogo_maestro_grilla', url: 'https://app.ipn.com.ar/control/products/default.asp', download: true },
        { key: '04_catalogo_maestro_ws_items', url: 'https://app.ipn.com.ar/control/products/ws/productDefault.asp', download: true },
        { key: '05_catalogo_nuevo_producto_form', url: 'https://app.ipn.com.ar/control/products/productEdit.asp', download: false },
        { key: '06_stock_disponibilidad', url: 'https://app.ipn.com.ar/reports/productsAvailability/default.asp', download: true },
        { key: '07_stock_valorizado_por_fecha', url: 'https://app.ipn.com.ar/reports/stockReports/valuedStockByDate.asp', download: true },
        { key: '08_stock_movimientos_operaciones', url: 'https://app.ipn.com.ar/reports/stockReports/stockLogOperations.asp', download: true },
        { key: '09_stock_rotacion_reposicion', url: 'https://app.ipn.com.ar/reports/stockReplacement/default.asp', download: true },

        // 3. Producción (MRP)
        { key: '10_produccion_ordenes_tickets', url: 'https://app.ipn.com.ar/production/tickets/default.asp', download: true },
        { key: '11_produccion_nuevo_ticket_op', url: 'https://app.ipn.com.ar/production/tickets/ticketEdit.asp', download: false },
        { key: '12_produccion_operarios_talleres', url: 'https://app.ipn.com.ar/production/employees/default.asp', download: true },
        { key: '13_produccion_materias_primas', url: 'https://app.ipn.com.ar/production/rawMaterial/default.asp', download: true },
        { key: '14_produccion_semielaborados', url: 'https://app.ipn.com.ar/production/preProducts/default.asp', download: true },
        { key: '15_produccion_liquidacion_haberes', url: 'https://app.ipn.com.ar/reports/incomeSettlementReport/default.asp', download: true },
        { key: '16_produccion_planilla_diaria', url: 'https://app.ipn.com.ar/reports/dailyProductionResume/default.asp', download: true },

        // 4. Ventas & Clientes
        { key: '17_clientes_directorio', url: 'https://app.ipn.com.ar/admin/customers/default.asp', download: true },
        { key: '18_clientes_saldos_cuentas_corrientes', url: 'https://app.ipn.com.ar/admin/accounting/customersBalance.asp', download: true },
        { key: '19_clientes_deuda_aging', url: 'https://app.ipn.com.ar/admin/accounting/aging.asp', download: true },
        { key: '20_clientes_comprobantes_pendientes_cobro', url: 'https://app.ipn.com.ar/admin/accounting/reportPayedSales.asp', download: true },
        { key: '21_ventas_pedidos_mayoristas_b2b', url: 'https://app.ipn.com.ar/iB2B/openOrders/default.asp', download: true },
        { key: '22_ventas_analisis_pedidos', url: 'https://app.ipn.com.ar/admin/customers/productRequest/requestsReport.asp', download: true },
        { key: '23_ventas_detalle_realizadas', url: 'https://app.ipn.com.ar/admin/accounting/salesList.asp', download: true },
        { key: '24_ventas_por_sucursal_fecha', url: 'https://app.ipn.com.ar/reports/filter.asp?reportID=1&reportCategoryID=43', download: true },
        { key: '25_ventas_cobranzas_realizadas', url: 'https://app.ipn.com.ar/admin/accounting/incomeResume.asp', download: true },
        { key: '26_finanzas_cheques_terceros', url: 'https://app.ipn.com.ar/admin/accounting/checksReportByDate.asp', download: true },
        { key: '27_finanzas_movimiento_diario_fondos', url: 'https://app.ipn.com.ar/reports/dailyPaymentSourcesMovements/default.asp', download: true },

        // 5. Compras & Proveedores
        { key: '28_compras_gastos_listado', url: 'https://app.ipn.com.ar/admin/accounting/purchasesList.asp', download: true },
        { key: '29_compras_proveedores_saldos', url: 'https://app.ipn.com.ar/admin/accounting/providersBalance.asp', download: true },
        { key: '30_compras_comprobantes_pendientes_pago', url: 'https://app.ipn.com.ar/admin/accounting/purchasePendingInvoices.asp', download: true },

        // 6. E-Commerce Omnicanal
        { key: '31_ecommerce_tiendanube_productos', url: 'https://app.ipn.com.ar/B2C/TDN/Products/default.asp', download: true },
        { key: '32_ecommerce_tiendanube_ventas', url: 'https://app.ipn.com.ar/B2C/TDN/orders/default.asp', download: true },
        { key: '33_ecommerce_mercadolibre_publicaciones', url: 'https://app.ipn.com.ar/B2C/MLA/Items/default.asp', download: true },
        { key: '34_ecommerce_mercadolibre_ventas', url: 'https://app.ipn.com.ar/B2C/MLA/orders/default.asp', download: true },
        { key: '35_ecommerce_ordenes_compra', url: 'https://app.ipn.com.ar/B2C/Orders/default.asp', download: true },

        // 7. Configuración General
        { key: '36_config_transportes_56', url: 'https://app.ipn.com.ar/configuration/transport/default.asp', download: true },
        { key: '37_config_listas_precios_1_a_10', url: 'https://app.ipn.com.ar/reports/productsPriceListChanges/default.asp', download: true },
        { key: '38_config_usuarios_y_permisos', url: 'https://app.ipn.com.ar/usersLog.asp', download: true },
        { key: '39_config_datos_empresa', url: 'https://app.ipn.com.ar/myAccount.asp?tab=2', download: true },
        { key: '40_config_soluciones_disponibles', url: 'https://app.ipn.com.ar/myAccount.asp?tab=3', download: true }
      ];

      for (const sec of sections) {
        try {
          const filenamePrefix = `${comp.prefix}_${sec.key}`;
          console.log(`[${comp.id}] Navegando: ${sec.key} (${sec.url})...`);
          
          await page.goto(sec.url, { waitUntil: 'networkidle2', timeout: 30000 });
          await new Promise(r => setTimeout(r, 1500));
          
          const pageTitle = await page.title();
          console.log(`  -> Título: "${pageTitle}"`);

          // Take screenshot
          const screenshotPath = path.join(SCREENSHOTS_DIR, `${filenamePrefix}.png`);
          await page.screenshot({ path: screenshotPath });

          // Download raw HTML data if flag enabled
          if (sec.download) {
            const content = await page.content();
            const dataPath = path.join(DATA_DIR, `${filenamePrefix}.html`);
            fs.writeFileSync(dataPath, content, 'utf8');
          }
        } catch (err) {
          console.log(`  -> Error en ${sec.key}:`, err.message);
        }
      }
    }

    console.log('\n=== RASTREO Y DESCARGA COMPLETA DE TODAS LAS PESTAÑAS FINALIZADO ===');
  } finally {
    await browser.close();
  }
}

fullAutonomousCrawler().catch(console.error);
