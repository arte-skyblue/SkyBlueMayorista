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
      if (item.includes('Copia de Catálogo')) return; // Ignore template directory
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

  // Sort models by code numerically/alphabetically
  modelsList.sort((a, b) => a.code.localeCompare(b.code));
  return modelsList;
}

function generateHtml(models) {
  // Group models 2 per page
  const pages = [];
  for (let i = 0; i < models.length; i += 2) {
    pages.push(models.slice(i, i + 2));
  }

  let pagesHtml = '';

  pages.forEach((pageModels, pageIdx) => {
    let modelsInPageHtml = pageModels.map(model => {
      const mainImgBase64 = imageToBase64(model.mainImage);
      
      // Select secondary variant photo if available
      let secondImgBase64 = null;
      if (model.detailImages.length > 0) {
        for (const detailImg of model.detailImages) {
          const b64 = imageToBase64(detailImg);
          if (b64 && b64 !== mainImgBase64) {
            secondImgBase64 = b64;
            break;
          }
        }
      }

      const tallesStr = model.sizes.length > 0
        ? `Talles: ${model.sizes.join(', ')}`
        : `Talles: Consultar disponibilidad`;

      const imagesLayoutHtml = secondImgBase64
        ? `<div class="images-wrapper">
             <div class="img-box"><img src="${mainImgBase64}" alt="Vista 1" /></div>
             <div class="img-box"><img src="${secondImgBase64}" alt="Vista 2" /></div>
           </div>`
        : `<div class="images-wrapper single-image">
             <div class="img-box"><img src="${mainImgBase64}" alt="Vista 1" /></div>
           </div>`;

      return `
        <div class="xti-card">
          ${imagesLayoutHtml}
          
          <div class="xti-meta">
            <div class="xti-code">XTI${model.code}</div>
            <div class="xti-talles">${tallesStr}</div>
            <div class="xti-price">$ CONSULTAR</div>
          </div>
        </div>
      `;
    }).join('');

    pagesHtml += `
      <div class="pdf-page content-page">
        <div class="page-content">
          ${modelsInPageHtml}
        </div>

        <div class="xti-footer">
          <div class="footer-text">CATÁLOGO XTI - SS 2026 / 2027</div>
          <div class="footer-brand">SkyBlue</div>
        </div>
      </div>
    `;
  });

  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Catálogo XTI SS 2026/2027 - SkyBlue</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,800&display=swap');

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
        background-color: #ffffff;
        color: #000000;
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
        position: relative;
        background-color: #ffffff;
        page-break-after: always;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      /* PORTADA XTI (RED COVER) */
      .cover-page {
        background-color: #e31b23;
        color: #000000;
        padding: 20mm;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .cover-center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        text-align: center;
      }

      .cover-logo-xti {
        font-size: 150px;
        font-weight: 900;
        letter-spacing: -6px;
        color: #000000;
        line-height: 0.85;
        position: relative;
      }

      .cover-logo-xti span {
        font-size: 32px;
        position: absolute;
        top: 20px;
        right: -35px;
        font-weight: 700;
      }

      .cover-season {
        font-size: 56px;
        font-weight: 800;
        color: #000000;
        letter-spacing: -1px;
        margin-top: 20px;
      }

      .cover-footer-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid rgba(0, 0, 0, 0.4);
        padding-top: 12px;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 2px;
        color: #000000;
      }

      .cover-footer-brand {
        font-size: 22px;
        font-weight: 900;
        color: #000000;
        letter-spacing: -1px;
      }

      /* PRODUCT PAGES */
      .content-page {
        padding: 16mm 16mm 12mm 16mm;
        justify-content: space-between;
      }

      .page-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
        flex: 1;
        justify-content: space-between;
      }

      .xti-card {
        border: 1.5px solid #e2e8f0;
        border-radius: 4px;
        padding: 16px 20px;
        height: 125mm;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background-color: #ffffff;
      }

      .images-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        width: 100%;
        height: 75mm;
      }

      .images-wrapper.single-image .img-box {
        max-width: 80%;
      }

      .img-box {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .img-box img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }

      .xti-meta {
        text-align: center;
        margin-top: 8px;
      }

      .xti-code {
        font-size: 26px;
        font-weight: 800;
        color: #000000;
        letter-spacing: -0.5px;
        line-height: 1.1;
      }

      .xti-talles {
        font-size: 13px;
        font-weight: 500;
        color: #777777;
        margin-top: 4px;
        margin-bottom: 8px;
      }

      .xti-price {
        font-size: 34px;
        font-weight: 800;
        color: #e31b23;
        letter-spacing: -1px;
        line-height: 1;
      }

      .xti-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #e0e0e0;
        padding-top: 10px;
        margin-top: 10px;
      }

      .footer-text {
        font-size: 11px;
        font-weight: 600;
        color: #bbbbbb;
        letter-spacing: 2.5px;
        text-transform: uppercase;
      }

      .footer-brand {
        font-size: 20px;
        font-weight: 900;
        color: #cccccc;
        letter-spacing: -1px;
      }
    </style>
  </head>
  <body>

    <!-- XTI RED COVER PAGE -->
    <div class="pdf-page cover-page">
      <div></div>

      <div class="cover-center">
        <div class="cover-logo-xti">Xti<span>&reg;</span></div>
        <div class="cover-season">FW.2027</div>
      </div>

      <div class="cover-footer-bar">
        <span>CATÁLOGO XTI - SS 2026 / 2027</span>
        <span class="cover-footer-brand">SkyBlue</span>
      </div>
    </div>

    <!-- PRODUCT PAGES -->
    ${pagesHtml}

  </body>
  </html>
  `;
}

async function buildPdf() {
  console.log('--- Generando Catálogo XTI (Estilo Réplica Exacta) ---');
  
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
  console.log('✅ Catálogo Estilo XTI generado con éxito en:', OUTPUT_PDF);
}

buildPdf().catch(err => {
  console.error('❌ Error generando el catálogo PDF:', err);
  process.exit(1);
});
