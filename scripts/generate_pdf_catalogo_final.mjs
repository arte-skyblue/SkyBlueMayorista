import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'catalog-marroquineria');
const OUTPUT_PDF = path.join(__dirname, '..', 'Catalogo_SkyBlue_Mayorista_2026.pdf');

function imgBase64(filename) {
  const fullPath = path.join(IMAGES_DIR, filename);
  if (!fs.existsSync(fullPath)) {
    console.warn(`Imagen no encontrada: ${fullPath}`);
    return '';
  }
  const buffer = fs.readFileSync(fullPath);
  return `data:image/jpeg;base64,${buffer.toString('base64')}`;
}

const pagesData = [
  // PÁGINA 1: MODELOS 144170 & 144264
  {
    pageTitle: "Línea Urbana Retro & Classic",
    pageNumber: "02",
    prod1: {
      brand: "XTI",
      code: "144170",
      title: "Zapatilla Urbana Retro Gamuzada",
      category: "Calzado Urbano / Sneaker Moda",
      wholesalePrice: "$ 38.500",
      pvpPrice: "$ 77.000",
      profit: "+$ 38.500",
      colorsText: "Disponible en 2 combinaciones exclusivas:",
      variants: [
        { sku: "14417001", color: "Beige Gamuza con Verde y Suela Caramelo", img: imgBase64("14417001.jpg") },
        { sku: "14417006", color: "Marfil / Arena Suave con Suela Caramelo", img: imgBase64("14417006.jpg") }
      ]
    },
    prod2: {
      brand: "XTI",
      code: "144264",
      title: "Zapatilla Confort Classic",
      category: "Calzado Urbano / Confort Diario",
      wholesalePrice: "$ 36.900",
      pvpPrice: "$ 73.800",
      profit: "+$ 36.900",
      colorsText: "Color de tendencia temporada 2026:",
      variants: [
        { sku: "14426401", color: "Blanco Puro con Detalles Gris Neutro", img: imgBase64("14426401.jpg") }
      ]
    }
  },

  // PÁGINA 2: MODELOS 146156 & 146157
  {
    pageTitle: "Línea Sporty Chic & Running",
    pageNumber: "03",
    prod1: {
      brand: "XTI",
      code: "146156",
      title: "Zapatilla Sporty Chic Mesh",
      category: "Zapatilla Moda / Tejido Transpirable",
      wholesalePrice: "$ 42.000",
      pvpPrice: "$ 84.000",
      profit: "+$ 42.000",
      colorsText: "Detalles metálicos y malla técnica:",
      variants: [
        { sku: "14615603", color: "Tostado / Cobre con Malla Transpirable", img: imgBase64("14615603.jpg") }
      ]
    },
    prod2: {
      brand: "XTI",
      code: "146157",
      title: "Zapatilla Confort Running Chic",
      category: "Zapatilla Moda / Confort Ultraliviano",
      wholesalePrice: "$ 39.500",
      pvpPrice: "$ 79.000",
      profit: "+$ 39.500",
      colorsText: "2 Colores ultracombinables:",
      variants: [
        { sku: "14615701", color: "Gris Plata con Base Blanca", img: imgBase64("14615701.jpg") },
        { sku: "14615703", color: "Camel Cálido con Acento Dorado", img: imgBase64("14615703.jpg") }
      ]
    }
  },

  // PÁGINA 3: MODELOS 146218 & 146292
  {
    pageTitle: "Línea Refresh Street & Plataforma",
    pageNumber: "04",
    prod1: {
      brand: "REFRESH",
      code: "146218",
      title: "Zapatilla Urbana Plataforma",
      category: "Calzado Urbano Juvenil",
      wholesalePrice: "$ 35.800",
      pvpPrice: "$ 71.600",
      profit: "+$ 35.800",
      colorsText: "Suela elevada antideslizante en 2 tonos:",
      variants: [
        { sku: "14621802", color: "Blanco Óptico con Toques Pasteles", img: imgBase64("14621802.jpg") },
        { sku: "14621803", color: "Beige Cálido / Nude Neutro", img: imgBase64("14621803.jpg") }
      ]
    },
    prod2: {
      brand: "REFRESH",
      code: "146292",
      title: "Sneaker Casual Street",
      category: "Básicos Esenciales de Tendencia",
      wholesalePrice: "$ 34.000",
      pvpPrice: "$ 68.000",
      profit: "+$ 34.000",
      colorsText: "Los dos colores que nunca pueden faltar:",
      variants: [
        { sku: "14629201", color: "Negro Total con Suela Blanca", img: imgBase64("14629201.jpg") },
        { sku: "14629202", color: "Blanco Monocromo Total", img: imgBase64("14629202.jpg") }
      ]
    }
  },

  // PÁGINA 4: MODELOS 146376 & 146400
  {
    pageTitle: "Sandalias Confort & Fiesta",
    pageNumber: "05",
    prod1: {
      brand: "REFRESH",
      code: "146376",
      title: "Sandalia Confort Anatómica",
      category: "Sandalias de Verano / Confort",
      wholesalePrice: "$ 29.900",
      pvpPrice: "$ 59.800",
      profit: "+$ 29.900",
      colorsText: "Plantilla anatómica acolchada:",
      variants: [
        { sku: "14637602", color: "Cuero Suela con Doble Hebilla Metálica", img: imgBase64("14637602.jpg") }
      ]
    },
    prod2: {
      brand: "XTI",
      code: "146400",
      title: "Sandalia Tira Fina Minimalista",
      category: "Fiesta / Noche / Eventos",
      wholesalePrice: "$ 32.500",
      pvpPrice: "$ 65.000",
      profit: "+$ 32.500",
      colorsText: "Colección fiesta en 3 terminaciones:",
      variants: [
        { sku: "14640001", color: "Dorado Champagne Metalizado", img: imgBase64("14640001.jpg") },
        { sku: "14640002", color: "Plata Brillante Metalizado", img: imgBase64("14640002.jpg") },
        { sku: "14640003", color: "Negro Clásico Sofisticado", img: imgBase64("14640003.jpg") }
      ]
    }
  },

  // PÁGINA 5: MODELOS 146418 & 146442
  {
    pageTitle: "Tacos Elegantes & Fiestas",
    pageNumber: "06",
    prod1: {
      brand: "REFRESH",
      code: "146418",
      title: "Sandalia Taco Bloque Verano",
      category: "Sandalia de Vestir / Taco Medio Cómodo",
      wholesalePrice: "$ 33.800",
      pvpPrice: "$ 67.600",
      profit: "+$ 33.800",
      colorsText: "Taco ancho de máxima estabilidad en 2 tonos:",
      variants: [
        { sku: "14641801", color: "Nude Elegante con Hebilla Dorada", img: imgBase64("14641801.jpg") },
        { sku: "14641802", color: "Negro Charol Luminoso", img: imgBase64("14641802.jpg") }
      ]
    },
    prod2: {
      brand: "XTI",
      code: "146442",
      title: "Zapato Taco T-Strap Charol",
      category: "Zapato de Vestir / Fiesta Alta Gama",
      wholesalePrice: "$ 41.500",
      pvpPrice: "$ 83.000",
      profit: "+$ 41.500",
      colorsText: "Detalle exclusivo con dije dorado colgante:",
      variants: [
        { sku: "14644202", color: "Negro Charol Grabado con Dije Oro", img: imgBase64("14644202.jpg") }
      ]
    }
  },

  // PÁGINA 6: MODELO 176100 + MÓDULO DE CONDICIONES
  {
    pageTitle: "Botas de Tendencia & Cierre Comercial",
    pageNumber: "07",
    prod1: {
      brand: "XTI",
      code: "176100",
      title: "Bota Corta / Calzado Tendencia",
      category: "Calzado de Media Estación / Invierno 2026",
      wholesalePrice: "$ 46.000",
      pvpPrice: "$ 92.000",
      profit: "+$ 46.000",
      colorsText: "Disponible en 2 acabados:",
      variants: [
        { sku: "17610003", color: "Cuero Suela / Camel Tostado", img: imgBase64("17610003.jpg") },
        { sku: "17610004", color: "Negro Mate Clásico", img: imgBase64("17610004.jpg") }
      ]
    },
    prod2: null // Aquí va el módulo comercial
  }
];

function renderProductSection(prod) {
  if (!prod) return '';

  const waLink = `https://wa.me/5491138916779?text=Hola!%20Quiero%20consultar%20por%20el%20modelo%20${prod.code}%20(${encodeURIComponent(prod.title)})`;

  const variantsHtml = prod.variants.map(v => `
    <div class="variant-item">
      <div class="img-box">
        <img src="${v.img}" alt="${v.sku}" />
      </div>
      <div class="variant-info">
        <span class="sku-tag">${v.sku}</span>
        <span class="variant-desc">${v.color}</span>
      </div>
    </div>
  `).join('');

  const brandClass = prod.brand === 'XTI' ? 'brand-xti' : 'brand-refresh';

  return `
    <div class="product-card">
      <div class="card-header">
        <div class="header-left">
          <span class="brand-badge ${brandClass}">${prod.brand}</span>
          <span class="code-badge">COD: ${prod.code}</span>
          <span class="category-name">${prod.category}</span>
        </div>
        <a href="${waLink}" class="order-btn-link" target="_blank">
          Pedir por WhatsApp ➔
        </a>
      </div>

      <div class="card-body">
        <div class="title-and-colors">
          <h3 class="product-title">${prod.title}</h3>
          <p class="colors-label">${prod.colorsText}</p>
        </div>

        <div class="variants-row count-${prod.variants.length}">
          ${variantsHtml}
        </div>

        <div class="pricing-footer">
          <div class="price-cell">
            <span class="price-title">PRECIO MAYORISTA</span>
            <span class="price-value highlight">${prod.wholesalePrice}</span>
          </div>
          <div class="price-cell">
            <span class="price-title">PVP SUGERIDO (+100%)</span>
            <span class="price-value">${prod.pvpPrice}</span>
          </div>
          <div class="price-cell profit-cell">
            <span class="price-title">TU GANANCIA ESTIMADA</span>
            <span class="price-value profit">${prod.profit}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderHtml() {
  const pagesHtml = pagesData.map(page => {
    let secondSectionHtml = '';
    if (page.prod2) {
      secondSectionHtml = renderProductSection(page.prod2);
    } else {
      // Módulo Comercial
      secondSectionHtml = `
        <div class="commercial-module-card">
          <div class="commercial-header">
            <span class="comm-tag">CONDICIONES EXCLUSIVAS MAYORISTAS</span>
            <h3>¿Por qué elegir a SkyBlue como tu distribuidor?</h3>
          </div>
          <div class="commercial-grid">
            <div class="comm-box">
              <div class="comm-icon">📦</div>
              <h4>Mínimo Accesible</h4>
              <p>Solo 6 pares surtidos. Podés combinar modelos y marcas libremente.</p>
            </div>
            <div class="comm-box">
              <div class="comm-icon">💸</div>
              <h4>Beneficio 1ra Compra</h4>
              <p>Descuento especial abonando en efectivo o transferencia bancaria.</p>
            </div>
            <div class="comm-box">
              <div class="comm-icon">🚚</div>
              <h4>Envíos a todo el País</h4>
              <p>Despachos diarios en 24 a 48 hs con las mejores empresas de transporte.</p>
            </div>
            <div class="comm-box">
              <div class="comm-icon">📈</div>
              <h4>Margen Garantizado</h4>
              <p>Multiplicá tu inversión con productos de rotación rápida probada.</p>
            </div>
          </div>
          <div class="comm-cta-box">
            <span>Hacé tu pedido directo al WhatsApp oficial:</span>
            <a href="https://wa.me/5491138916779" class="cta-wa-button">+54 9 11 3891-6779</a>
          </div>
        </div>
      `;
    }

    return `
      <div class="page-sheet">
        <header class="page-header">
          <div class="brand-brandmark">
            <span class="sb-logo">SKYBLUE</span>
            <span class="sb-sub">CALZADO MAYORISTA</span>
          </div>
          <div class="page-meta">
            <span class="page-category">${page.pageTitle}</span>
            <span class="page-num">PAG ${page.pageNumber}</span>
          </div>
        </header>

        <main class="page-content">
          ${renderProductSection(page.prod1)}
          ${secondSectionHtml}
        </main>

        <footer class="page-footer">
          <span>SkyBlue Mayorista • Venta a Comerciantes y Showrooms</span>
          <span>Mínimo 6 pares surtidos • Pedidos: +54 9 11 3891-6779</span>
        </footer>
      </div>
    `;
  }).join('');

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Catálogo Mayorista SkyBlue 2026</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #f1f5f9;
      color: #0f172a;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* CONTENEDOR DE CADA PÁGINA (A4 EXACTO) */
    .page-sheet {
      width: 210mm;
      height: 297mm;
      padding: 14mm 14mm 10mm 14mm;
      background: #ffffff;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    /* PÁGINA DE PORTADA */
    .cover-page {
      width: 210mm;
      height: 297mm;
      background: linear-gradient(135deg, #090d16 0%, #0f172a 50%, #0c4a6e 100%);
      color: #ffffff;
      position: relative;
      page-break-after: always;
      padding: 22mm 20mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .cover-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255,255,255,0.15);
      padding-bottom: 6mm;
    }
    .cover-logo-box {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .cover-logo-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: linear-gradient(135deg, #38bdf8, #0284c7);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 22px;
      color: white;
    }
    .cover-logo-text h1 {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
      line-height: 1;
    }
    .cover-logo-text span {
      font-size: 11px;
      color: #38bdf8;
      font-weight: 700;
      letter-spacing: 2px;
    }
    .cover-badge-season {
      padding: 6px 14px;
      border-radius: 9999px;
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.4);
      color: #7dd3fc;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .cover-center {
      margin: auto 0;
      text-align: left;
    }
    .cover-tagline {
      color: #38bdf8;
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 3px;
      margin-bottom: 10px;
    }
    .cover-title {
      font-size: 46px;
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -1.5px;
      margin-bottom: 16px;
    }
    .cover-title span {
      background: linear-gradient(to right, #38bdf8, #67e8f9);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .cover-brands {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
    }
    .brand-pill {
      padding: 6px 16px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 8px;
      font-weight: 800;
      font-size: 13px;
      letter-spacing: 1px;
    }
    .cover-desc {
      font-size: 14px;
      line-height: 1.6;
      color: #cbd5e1;
      max-width: 520px;
    }

    .cover-features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      margin-top: 24px;
    }
    .cover-feature {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      padding: 14px;
    }
    .cover-feature-icon {
      font-size: 20px;
      margin-bottom: 6px;
    }
    .cover-feature h4 {
      font-size: 13px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 2px;
    }
    .cover-feature p {
      font-size: 11px;
      color: #94a3b8;
      line-height: 1.3;
    }

    .cover-footer {
      border-top: 1px solid rgba(255,255,255,0.15);
      padding-top: 6mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cover-contact-text {
      font-size: 12px;
      color: #94a3b8;
    }
    .cover-contact-phone {
      font-family: 'Space Mono', monospace;
      font-size: 16px;
      font-weight: 700;
      color: #38bdf8;
    }
    .cover-cta-btn {
      padding: 10px 20px;
      border-radius: 10px;
      background: #22c55e;
      color: #ffffff;
      font-weight: 800;
      font-size: 13px;
      text-decoration: none;
    }

    /* HEADER DE PÁGINA INTERNA */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 3.5mm;
    }
    .brand-brandmark {
      display: flex;
      align-items: baseline;
      gap: 6px;
    }
    .sb-logo {
      font-size: 16px;
      font-weight: 800;
      color: #0284c7;
      letter-spacing: -0.5px;
    }
    .sb-sub {
      font-size: 9px;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 1.5px;
    }
    .page-meta {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .page-category {
      font-size: 11px;
      font-weight: 700;
      color: #334155;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .page-num {
      padding: 2px 8px;
      border-radius: 4px;
      background: #0f172a;
      color: #ffffff;
      font-family: 'Space Mono', monospace;
      font-size: 10px;
      font-weight: 700;
    }

    /* CONTENIDO PRINCIPAL: 2 PRODUCTOS EXACTOS */
    .page-content {
      display: flex;
      flex-direction: column;
      gap: 4.5mm;
      flex: 1;
      margin: 4.5mm 0;
    }

    /* TARJETA DE PRODUCTO */
    .product-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      padding: 3.8mm 4.5mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 124mm;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 2mm;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .brand-badge {
      padding: 3px 8px;
      border-radius: 5px;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .brand-xti {
      background: #0f172a;
      color: #ffffff;
    }
    .brand-refresh {
      background: #0284c7;
      color: #ffffff;
    }
    .code-badge {
      font-family: 'Space Mono', monospace;
      font-weight: 700;
      font-size: 11px;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 2px 7px;
      border-radius: 5px;
      color: #1e293b;
    }
    .category-name {
      font-size: 10px;
      font-weight: 600;
      color: #64748b;
    }
    .order-btn-link {
      font-size: 10px;
      font-weight: 700;
      color: #0284c7;
      text-decoration: none;
      border-bottom: 1px dashed #0284c7;
    }

    .title-and-colors {
      margin: 1.5mm 0;
    }
    .product-title {
      font-size: 13.5px;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.2;
    }
    .colors-label {
      font-size: 10px;
      color: #64748b;
      margin-top: 1px;
      font-weight: 500;
    }

    /* GRILLA DE VARIANTES / FOTOS */
    .variants-row {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: center;
      margin: 2mm 0;
      height: 68mm;
    }
    .variant-item {
      flex: 1;
      max-width: 80mm;
      height: 100%;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2mm;
      justify-content: space-between;
    }
    .variants-row.count-1 .variant-item {
      max-width: 95mm;
    }
    .variants-row.count-3 .variant-item {
      max-width: 58mm;
    }
    .img-box {
      width: 100%;
      height: 54mm;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .img-box img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .variant-info {
      text-align: center;
      width: 100%;
      padding-top: 1mm;
      border-top: 1px solid #f8fafc;
    }
    .sku-tag {
      font-family: 'Space Mono', monospace;
      font-size: 9.5px;
      font-weight: 700;
      color: #0284c7;
      display: block;
    }
    .variant-desc {
      font-size: 9px;
      color: #475569;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      font-weight: 500;
    }

    /* FOOTER DE PRECIOS */
    .pricing-footer {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      display: grid;
      grid-template-columns: 1.2fr 1.2fr 1.4fr;
      padding: 2mm 3mm;
      text-align: center;
    }
    .price-cell {
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-right: 1px solid #e2e8f0;
      padding: 0 4px;
    }
    .price-cell:last-child {
      border-right: none;
    }
    .price-title {
      font-size: 8.5px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .price-value {
      font-family: 'Space Mono', monospace;
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
    }
    .price-value.highlight {
      color: #0284c7;
    }
    .price-value.profit {
      color: #16a34a;
    }

    /* MÓDULO COMERCIAL DE CIERRE */
    .commercial-module-card {
      background: linear-gradient(135deg, #0f172a, #1e293b);
      border-radius: 12px;
      padding: 4.5mm 6mm;
      height: 124mm;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .commercial-header .comm-tag {
      font-size: 9px;
      font-weight: 800;
      color: #38bdf8;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }
    .commercial-header h3 {
      font-size: 16px;
      font-weight: 800;
      margin-top: 2px;
    }
    .commercial-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3mm;
      margin: 2mm 0;
    }
    .comm-box {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 8px;
      padding: 3mm 4mm;
    }
    .comm-icon {
      font-size: 16px;
      margin-bottom: 2px;
    }
    .comm-box h4 {
      font-size: 11px;
      font-weight: 700;
      color: #38bdf8;
    }
    .comm-box p {
      font-size: 9.5px;
      color: #cbd5e1;
      line-height: 1.3;
    }
    .comm-cta-box {
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 8px;
      padding: 3mm;
      text-align: center;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .comm-cta-box span {
      font-size: 11px;
      font-weight: 600;
      color: #cbd5e1;
    }
    .cta-wa-button {
      background: #22c55e;
      color: white;
      padding: 4px 12px;
      border-radius: 6px;
      font-family: 'Space Mono', monospace;
      font-size: 12px;
      font-weight: 700;
      text-decoration: none;
    }

    /* FOOTER DE PÁGINA INTERNA */
    .page-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 2.5mm;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #94a3b8;
      font-weight: 600;
    }
  </style>
</head>
<body>

  <!-- ==================== PÁGINA 1: PORTADA ==================== -->
  <div class="cover-page">
    <div class="cover-top">
      <div class="cover-logo-box">
        <div class="cover-logo-icon">SB</div>
        <div class="cover-logo-text">
          <h1>SkyBlue</h1>
          <span>CALZADO MAYORISTA</span>
        </div>
      </div>
      <div class="cover-badge-season">Temporada 2026</div>
    </div>

    <div class="cover-center">
      <div class="cover-tagline">Lanzamiento Exclusivo a Comerciantes</div>
      <div class="cover-title">
        Catálogo Mayorista de <span>Calzado & Tendencia</span>
      </div>
      <div class="cover-brands">
        <div class="brand-pill">XTI</div>
        <div class="brand-pill">REFRESH</div>
        <div class="brand-pill">PETITE JOLIE</div>
      </div>
      <p class="cover-desc">
        Selección oficial de sneakers retro, zapatillas de moda y calzado de vestir con stock inmediato y precios directos de fábrica para showrooms y revendedoras de todo el país.
      </p>

      <div class="cover-features-grid">
        <div class="cover-feature">
          <div class="cover-feature-icon">📦</div>
          <h4>Solo 6 Unidades</h4>
          <p>Mínimo accesible. Surtí modelos y marcas a tu elección.</p>
        </div>
        <div class="cover-feature">
          <div class="cover-feature-icon">💸</div>
          <h4>Descuento 1ra Compra</h4>
          <p>Abonando en efectivo o por transferencia bancaria.</p>
        </div>
        <div class="cover-feature">
          <div class="cover-feature-icon">🚚</div>
          <h4>Envíos en 24/48hs</h4>
          <p>Despachos asegurados a todas las provincias de Argentina.</p>
        </div>
      </div>
    </div>

    <div class="cover-footer">
      <div>
        <div class="cover-contact-text">Atención y Pedidos por WhatsApp Oficial:</div>
        <div class="cover-contact-phone">+54 9 11 3891-6779</div>
      </div>
      <a href="https://wa.me/5491138916779" class="cover-cta-btn">Contactar Ventas</a>
    </div>
  </div>

  <!-- ==================== PÁGINAS DE PRODUCTO (2 X HOJA) ==================== -->
  ${pagesHtml}

</body>
</html>
  `;
}

async function run() {
  console.log('Generando HTML para el catálogo en PDF...');
  const html = renderHtml();
  const tempHtmlPath = path.join(__dirname, 'temp_catalog.html');
  fs.writeFileSync(tempHtmlPath, html, 'utf-8');

  console.log('Iniciando Chromium para renderizar PDF...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });

  console.log('Exportando archivo PDF de alta definición...');
  await page.pdf({
    path: OUTPUT_PDF,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();
  if (fs.existsSync(tempHtmlPath)) fs.unlinkSync(tempHtmlPath);

  console.log(`✅ ¡Catálogo generado exitosamente en: ${OUTPUT_PDF}`);
}

run().catch(err => {
  console.error('Error generando PDF:', err);
  process.exit(1);
});
