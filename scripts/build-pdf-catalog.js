const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const INPUT_DIR = 'D:\\Usuarios\\BRUNO-PC\\Downloads\\attached20260831172409';
const OUTPUT_PDF = path.join(__dirname, '..', 'catalogo_skyblue.pdf');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function imageToBase64(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase().replace('.', '');
    const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
    return `data:${mime};base64,${fileBuffer.toString('base64')}`;
  } catch (err) {
    console.error('Error encoding image:', filePath, err.message);
    return null;
  }
}

function parseModels() {
  const items = fs.readdirSync(INPUT_DIR);
  const modelsMap = {};

  items.forEach(item => {
    const fullPath = path.join(INPUT_DIR, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const code = item.trim();
      if (!modelsMap[code]) modelsMap[code] = { code, mainImage: null, sizes: [], detailImages: [] };
      const files = fs.readdirSync(fullPath);
      files.forEach(f => {
        const match = f.match(/_(\d+)/);
        if (match) {
          const size = match[1];
          if (!modelsMap[code].sizes.includes(size)) modelsMap[code].sizes.push(size);
        }
        modelsMap[code].detailImages.push(path.join(fullPath, f));
      });
    } else if (item.endsWith('.jpg') || item.endsWith('.png') || item.endsWith('.jpeg')) {
      if (item.includes('- OK')) {
        const code = item.replace('- OK.jpg', '').replace('- OK.jpeg', '').replace('- OK.png', '').trim();
        if (!modelsMap[code]) modelsMap[code] = { code, mainImage: null, sizes: [], detailImages: [] };
        modelsMap[code].mainImage = fullPath;
      } else {
        const code = path.basename(item, path.extname(item)).trim();
        if (!modelsMap[code]) modelsMap[code] = { code, mainImage: null, sizes: [], detailImages: [] };
        if (!modelsMap[code].mainImage) modelsMap[code].mainImage = fullPath;
      }
    }
  });

  const modelsList = Object.values(modelsMap).map(m => {
    if (!m.mainImage && m.detailImages.length > 0) {
      m.mainImage = m.detailImages[0];
    }
    m.sizes.sort((a, b) => Number(a) - Number(b));
    return m;
  });

  // Sort models by code
  modelsList.sort((a, b) => a.code.localeCompare(b.code));
  return modelsList;
}

function generateHtml(models) {
  const dateStr = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
  
  // Group models 2 per page
  const pages = [];
  for (let i = 0; i < models.length; i += 2) {
    pages.push(models.slice(i, i + 2));
  }

  let pagesHtml = '';

  pages.forEach((pageModels, pageIdx) => {
    let modelsInPageHtml = pageModels.map(model => {
      const mainImgBase64 = imageToBase64(model.mainImage);
      
      // Select up to 4 detail images (excluding duplicate of main)
      const detailBase64s = model.detailImages
        .slice(0, 4)
        .map(img => imageToBase64(img))
        .filter(b => b && b !== mainImgBase64);

      const sizesBadges = model.sizes.length > 0
        ? model.sizes.map(s => `<span class="size-badge">${s}</span>`).join('')
        : `<span class="size-badge-none">Consultar talles</span>`;

      const detailThumbnailsHtml = detailBase64s.length > 0
        ? `<div class="details-grid">
             ${detailBase64s.map(b => `<div class="detail-thumb"><img src="${b}" alt="Detalle" /></div>`).join('')}
           </div>`
        : '';

      return `
        <div class="model-card">
          <div class="model-header">
            <span class="model-code-badge">ART. ${model.code}</span>
            <span class="model-tag">SkyBlue Mayorista</span>
          </div>

          <div class="model-body">
            <div class="main-image-container">
              ${mainImgBase64 ? `<img src="${mainImgBase64}" class="main-image" alt="Artículo ${model.code}" />` : '<div class="no-img">Sin Imagen</div>'}
            </div>

            <div class="model-info">
              <h2 class="model-title">Artículo ${model.code}</h2>
              
              <div class="section-block">
                <span class="section-label">Talles Disponibles:</span>
                <div class="sizes-container">
                  ${sizesBadges}
                </div>
              </div>

              ${detailThumbnailsHtml ? `
              <div class="section-block">
                <span class="section-label">Vistas / Detalles:</span>
                ${detailThumbnailsHtml}
              </div>
              ` : ''}

              <div class="order-box">
                <div class="order-text">
                  <span class="order-title">Venta Mayorista</span>
                  <span class="order-sub">Consulte precios y stock por WhatsApp</span>
                </div>
                <div class="order-badge">DISPONIBLE</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    pagesHtml += `
      <div class="pdf-page content-page">
        <div class="page-header">
          <div class="header-logo">
            <span class="logo-sky">SkyBlue</span> <span class="logo-sub">MAYORISTA</span>
          </div>
          <div class="header-cat">Catálogo de Productos</div>
        </div>

        <div class="page-content">
          ${modelsInPageHtml}
        </div>

        <div class="page-footer">
          <span>SkyBlue Mayorista &bull; Catálogo Oficial</span>
          <span>Página ${pageIdx + 2} de ${pages.length + 2}</span>
        </div>
      </div>
    `;
  });

  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Catálogo SkyBlue Mayorista</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        background-color: #f1f5f9;
        color: #0f172a;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      @page {
        size: A4 portrait;
        margin: 0;
      }

      .pdf-page {
        width: 210mm;
        height: 297mm;
        padding: 15mm 15mm 12mm 15mm;
        position: relative;
        background-color: #ffffff;
        page-break-after: always;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      /* PORTADA */
      .cover-page {
        background: linear-gradient(135deg, #0b192c 0%, #1e3a8a 50%, #0284c7 100%);
        color: #ffffff;
        justify-content: space-between;
        padding: 25mm 20mm;
      }

      .cover-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .cover-brand {
        display: flex;
        flex-direction: column;
      }

      .brand-title {
        font-size: 38px;
        font-weight: 800;
        letter-spacing: -1px;
        color: #ffffff;
        line-height: 1;
      }

      .brand-title span {
        color: #38bdf8;
      }

      .brand-subtitle {
        font-size: 14px;
        letter-spacing: 4px;
        text-transform: uppercase;
        color: #93c5fd;
        font-weight: 600;
        margin-top: 6px;
      }

      .cover-date-pill {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 600;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .cover-hero {
        margin: 40px 0;
        text-align: center;
      }

      .hero-tag {
        display: inline-block;
        background: #38bdf8;
        color: #0f172a;
        font-size: 12px;
        font-weight: 800;
        text-transform: uppercase;
        padding: 6px 14px;
        border-radius: 4px;
        letter-spacing: 2px;
        margin-bottom: 20px;
      }

      .hero-title {
        font-size: 44px;
        font-weight: 800;
        line-height: 1.15;
        margin-bottom: 16px;
        color: #ffffff;
      }

      .hero-desc {
        font-size: 16px;
        color: #cbd5e1;
        max-width: 480px;
        margin: 0 auto;
        line-height: 1.6;
      }

      .cover-stats {
        display: flex;
        justify-content: center;
        gap: 25px;
        margin-top: 30px;
      }

      .stat-card {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        padding: 16px 24px;
        border-radius: 12px;
        min-width: 140px;
        text-align: center;
      }

      .stat-num {
        font-size: 28px;
        font-weight: 800;
        color: #38bdf8;
      }

      .stat-lbl {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #94a3b8;
        margin-top: 4px;
      }

      .cover-footer {
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        color: #94a3b8;
      }

      /* PAGE HEADER & FOOTER */
      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 8px;
        margin-bottom: 12px;
      }

      .header-logo {
        font-size: 18px;
        font-weight: 800;
      }

      .logo-sky { color: #0284c7; }
      .logo-sub { color: #475569; font-weight: 600; font-size: 14px; }

      .header-cat {
        font-size: 12px;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .page-footer {
        margin-top: auto;
        border-top: 1px solid #e2e8f0;
        padding-top: 8px;
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        color: #64748b;
        font-weight: 500;
      }

      .page-content {
        display: flex;
        flex-direction: column;
        gap: 14px;
        flex: 1;
        justify-content: flex-start;
      }

      /* MODEL CARD */
      .model-card {
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 12px 14px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        gap: 10px;
        height: 120mm;
      }

      .model-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .model-code-badge {
        background-color: #0b192c;
        color: #ffffff;
        font-size: 14px;
        font-weight: 800;
        padding: 4px 12px;
        border-radius: 6px;
        letter-spacing: 0.5px;
      }

      .model-tag {
        font-size: 11px;
        font-weight: 600;
        color: #0284c7;
        background-color: #e0f2fe;
        padding: 3px 8px;
        border-radius: 4px;
      }

      .model-body {
        display: flex;
        gap: 16px;
        flex: 1;
      }

      .main-image-container {
        width: 105mm;
        height: 98mm;
        background-color: #f8fafc;
        border-radius: 8px;
        border: 1px solid #f1f5f9;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .main-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }

      .no-img {
        color: #94a3b8;
        font-size: 12px;
      }

      .model-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .model-title {
        font-size: 20px;
        font-weight: 700;
        color: #0f172a;
      }

      .section-block {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .section-label {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        color: #64748b;
        letter-spacing: 0.5px;
      }

      .sizes-container {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }

      .size-badge {
        background-color: #f1f5f9;
        border: 1px solid #cbd5e1;
        color: #1e293b;
        font-size: 12px;
        font-weight: 700;
        padding: 4px 9px;
        border-radius: 6px;
      }

      .size-badge-none {
        font-size: 12px;
        color: #64748b;
        font-style: italic;
      }

      .details-grid {
        display: flex;
        gap: 6px;
      }

      .detail-thumb {
        width: 40px;
        height: 40px;
        border-radius: 6px;
        border: 1px solid #e2e8f0;
        overflow: hidden;
        background-color: #f8fafc;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .detail-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .order-box {
        margin-top: auto;
        background-color: #f0fdf4;
        border: 1px solid #bbf7d0;
        padding: 10px;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .order-text {
        display: flex;
        flex-direction: column;
      }

      .order-title {
        font-size: 12px;
        font-weight: 700;
        color: #166534;
      }

      .order-sub {
        font-size: 10px;
        color: #15803d;
      }

      .order-badge {
        background-color: #22c55e;
        color: #ffffff;
        font-size: 9px;
        font-weight: 800;
        padding: 4px 8px;
        border-radius: 4px;
        letter-spacing: 1px;
      }

      /* BACK COVER */
      .back-cover {
        background: #0f172a;
        color: #ffffff;
        justify-content: space-between;
        padding: 25mm 20mm;
        text-align: center;
      }

      .back-header {
        font-size: 32px;
        font-weight: 800;
        color: #38bdf8;
      }

      .back-sub {
        font-size: 16px;
        color: #94a3b8;
        margin-top: 10px;
      }

      .contact-card {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 30px;
        margin: 40px auto;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .contact-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .contact-lbl {
        font-size: 11px;
        text-transform: uppercase;
        color: #38bdf8;
        font-weight: 700;
        letter-spacing: 1px;
      }

      .contact-val {
        font-size: 18px;
        font-weight: 700;
        color: #ffffff;
      }
    </style>
  </head>
  <body>

    <!-- COVER PAGE -->
    <div class="pdf-page cover-page">
      <div class="cover-header">
        <div class="cover-brand">
          <div class="brand-title">Sky<span>Blue</span></div>
          <div class="brand-subtitle">VENTA MAYORISTA</div>
        </div>
        <div class="cover-date-pill">${dateStr}</div>
      </div>

      <div class="cover-hero">
        <div class="hero-tag">CATÁLOGO EXCLUSIVO</div>
        <h1 class="hero-title">COLECCIÓN DE MODELOS & CALZADOS</h1>
        <p class="hero-desc">Explorá nuestro catálogo de artículos mayoristas con disponibilidad de talles y fotografías de producto.</p>
        
        <div class="cover-stats">
          <div class="stat-card">
            <div class="stat-num">${models.length}</div>
            <div class="stat-lbl">Artículos</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">HD</div>
            <div class="stat-lbl">Fotografías</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">CURVAS</div>
            <div class="stat-lbl">Talles Variados</div>
          </div>
        </div>
      </div>

      <div class="cover-footer">
        <span>SkyBlue Mayorista &copy; ${new Date().getFullYear()}</span>
        <span>Consulte por envíos a todo el país</span>
      </div>
    </div>

    <!-- CONTENT PAGES -->
    ${pagesHtml}

    <!-- BACK COVER PAGE -->
    <div class="pdf-page back-cover">
      <div>
        <h2 class="back-header">SkyBlue Mayorista</h2>
        <p class="back-sub">¿Listo para realizar tu pedido mayorista?</p>
      </div>

      <div class="contact-card">
        <div class="contact-item">
          <span class="contact-lbl">Atención Comercial & Pedidos</span>
          <span class="contact-val">Consultar por WhatsApp</span>
        </div>
        <div class="contact-item">
          <span class="contact-lbl">Plataforma Online</span>
          <span class="contact-val">SkyBlueMayorista Web</span>
        </div>
        <div class="contact-item">
          <span class="contact-lbl">Condiciones Mayoristas</span>
          <span class="contact-val">Venta por curva / bultos cerrados</span>
        </div>
      </div>

      <div class="cover-footer" style="justify-content: center;">
        <span>Gracias por confiar en SkyBlue Mayorista</span>
      </div>
    </div>

  </body>
  </html>
  `;
}

async function buildPdf() {
  console.log('--- Iniciando generación de Catálogo PDF ---');
  console.log('Carpeta origen:', INPUT_DIR);
  
  const models = parseModels();
  console.log(`Se procesarán ${models.length} modelos.`);

  const htmlContent = generateHtml(models);
  
  console.log('Lanzando Puppeteer (Chrome)...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  console.log('Generando PDF en A4...');
  await page.pdf({
    path: OUTPUT_PDF,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });

  await browser.close();
  console.log('✅ Catálogo PDF generado con éxito en:', OUTPUT_PDF);
}

buildPdf().catch(err => {
  console.error('❌ Error generando el catálogo PDF:', err);
  process.exit(1);
});
