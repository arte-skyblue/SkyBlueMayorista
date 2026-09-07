const API_KEY = process.env.GEMINI_API_KEY || '';
const PROJECT_ID = '14522040208529830513';

async function generateStitchScreen(title, prompt) {
  console.log(`\n=== GENERATING STITCH SCREEN: ${title} ===`);
  try {
    const res = await fetch('https://stitch.googleapis.com/mcp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/call',
        params: {
          name: 'generate_screen_from_text',
          arguments: {
            projectId: PROJECT_ID,
            prompt: prompt,
            deviceType: 'DESKTOP'
          }
        }
      })
    });

    console.log(`Status for ${title}:`, res.status, res.statusText);
    const data = await res.json();
    console.log('Result:', JSON.stringify(data, null, 2).slice(0, 500));
    return data;
  } catch (err) {
    console.error(`Error generating ${title}:`, err.message);
  }
}

async function run() {
  console.log('=== STARTING STITCH AUTOMATION AGENT ===');
  console.log(`Target Project: projects/${PROJECT_ID} (SkyBlue ERP Enterprise)`);

  // Screen 1: Master Catalog & 360 Matrix
  await generateStitchScreen(
    'Catalogo Maestro 360',
    `High-end Enterprise Footwear ERP Product Catalog and 360 Matrix Inspector. Dark obsidian slate modern theme inspired by Linear and Stripe. 
    Header with brand 'SkyBlue ERP Enterprise', Omnibar search (Ctrl+K), stats badge '3.264 Articulos'.
    Filter bar with Brand, Category, Season, Size, Warehouse.
    High density data table listing shoes (SKU, Title, Brand, Season, Wholesale Price, Showroom Stock, Outlet Stock, Total Physical).
    On the right, a slide-over inspector drawer showing the 360 degree product sheet with size curve breakdown (sizes 35 to 40), barcodes EAN-13, stocks across 4 warehouses (Showroom Tapiales, Outlet Tapiales, SBW Canning, SkyBlue Cañuelas) and 10 official price lists.`
  );

  // Screen 2: Multi-Warehouse Inventory & Stock Transfers
  await generateStitchScreen(
    'Control Multi-Deposito y Transferencias',
    `Enterprise Footwear ERP Multi-Warehouse Stock Management and Inter-Branch Transfer System.
    Visual grid for 4 active warehouses: 1) Deposito General Showroom Tapiales, 2) Outlet Curapaligue 1428 + Web, 3) SBW Canning, 4) SkyBlue Canuelas.
    Live stock gauges, total pairs physical vs in-transit import sea containers.
    A modal and form to create a new Stock Transfer Remito with Origin Warehouse selector, Destination Warehouse selector, Product size matrix curve quantity picker, and print remito button.`
  );

  // Screen 3: Wholesale Sales Orders & Kanban Dispatch
  await generateStitchScreen(
    'Pedidos Mayoristas y Despachos',
    `Wholesale Sales Order Management System and Dispatch Kanban Board.
    Columns: Preventa / Pendiente de Stock, En Picking Showroom, Empacado para Transporte, Despachado con Remito.
    Order cards with Customer Name, Transport Company (Via Cargo, Andreani, Cruz del Sur), Pair Count, Total ARS amount, and 1-click WhatsApp notification button.
    New Wholesale Order modal with size curve matrix picker (12-pair closed box vs loose pairs) and price list selector (Lista 1 to Lista 10).`
  );

  console.log('=== STITCH SCREEN GENERATION COMPLETED ===');
}

run().catch(console.error);
