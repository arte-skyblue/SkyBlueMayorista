import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'catalog-marroquineria');
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'stories_auto_batch');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function imgBase64(imgPath) {
  const fullPath = path.isAbsolute(imgPath) ? imgPath : path.join(PUBLIC_DIR, imgPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`Imagen no encontrada: ${fullPath}`);
    return '';
  }
  const ext = path.extname(fullPath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
  const buffer = fs.readFileSync(fullPath);
  return `data:${mime};base64,${buffer.toString('base64')}`;
}

// 1. Plantilla para Historias de Producto (1080 x 1920)
function getProductStoryHtml(prod) {
  const bgImage = imgBase64(prod.imagePath);

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      width: 1080px;
      height: 1920px;
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background: radial-gradient(circle at top right, #0f172a, #030712 90%);
      color: #ffffff;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 70px 50px;
    }

    /* Ambient Glows */
    .glow-top {
      position: absolute;
      top: -120px;
      left: 50%;
      transform: translateX(-50%);
      width: 700px;
      height: 700px;
      background: radial-gradient(circle, rgba(14, 165, 233, 0.25) 0%, transparent 70%);
      pointer-events: none;
      filter: blur(50px);
    }
    .glow-bottom {
      position: absolute;
      bottom: -150px;
      right: -100px;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%);
      pointer-events: none;
      filter: blur(60px);
    }

    /* Header */
    .header {
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      padding-bottom: 25px;
    }
    .brand-logo-container {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .brand-avatar {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0284c7, #38bdf8);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: 900;
      color: #ffffff;
      box-shadow: 0 10px 25px rgba(2, 132, 199, 0.4);
    }
    .brand-name {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .brand-sub {
      font-size: 16px;
      color: #38bdf8;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    .badge-wholesale {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: #000;
      padding: 10px 22px;
      border-radius: 999px;
      font-size: 18px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 6px 20px rgba(245, 158, 11, 0.35);
    }

    /* Product Showcase Card */
    .product-card {
      position: relative;
      z-index: 10;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 40px;
      padding: 40px;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(20px);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .product-meta-top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }
    .brand-tag {
      background: rgba(14, 165, 233, 0.15);
      border: 1px solid rgba(14, 165, 233, 0.4);
      color: #38bdf8;
      padding: 8px 20px;
      border-radius: 12px;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 1px;
    }
    .sku-tag {
      font-size: 18px;
      color: #94a3b8;
      font-weight: 600;
      letter-spacing: 1px;
    }
    .image-container {
      width: 100%;
      height: 720px;
      border-radius: 28px;
      overflow: hidden;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 0 20px rgba(0,0,0,0.05), 0 15px 35px rgba(0,0,0,0.4);
      position: relative;
    }
    .product-img {
      max-width: 92%;
      max-height: 92%;
      object-fit: contain;
      filter: drop-shadow(0 20px 25px rgba(0,0,0,0.15));
    }
    .min-badge {
      position: absolute;
      bottom: 20px;
      left: 20px;
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 8px 18px;
      border-radius: 999px;
      font-size: 17px;
      font-weight: 700;
      color: #f8fafc;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.5);
    }
    .product-title {
      font-size: 38px;
      font-weight: 800;
      text-align: center;
      margin-top: 30px;
      line-height: 1.2;
      color: #ffffff;
    }
    .product-color {
      font-size: 20px;
      color: #cbd5e1;
      margin-top: 10px;
      font-weight: 600;
    }

    /* Pricing Section */
    .pricing-grid {
      position: relative;
      z-index: 10;
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 20px;
      margin-top: 15px;
    }
    .price-box-wholesale {
      background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(2, 132, 199, 0.05));
      border: 2px solid #0284c7;
      border-radius: 28px;
      padding: 25px;
      text-align: center;
    }
    .price-label {
      font-size: 18px;
      color: #38bdf8;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .price-amount {
      font-size: 56px;
      font-weight: 900;
      color: #ffffff;
      margin-top: 5px;
      letter-spacing: -1px;
    }
    .price-box-pvp {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 28px;
      padding: 25px;
      text-align: center;
    }
    .pvp-label {
      font-size: 16px;
      color: #94a3b8;
      font-weight: 700;
      text-transform: uppercase;
    }
    .pvp-amount {
      font-size: 38px;
      font-weight: 800;
      color: #e2e8f0;
      margin-top: 5px;
    }
    .profit-tag {
      font-size: 18px;
      color: #10b981;
      font-weight: 800;
      margin-top: 4px;
    }

    /* Footer & CTA */
    .footer {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .condition-strip {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 16px 25px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 19px;
      font-weight: 700;
      color: #f1f5f9;
    }
    .condition-item {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .condition-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #f59e0b;
    }
    .cta-button {
      background: linear-gradient(135deg, #25D366, #128C7E);
      border-radius: 30px;
      padding: 28px 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      box-shadow: 0 15px 35px rgba(37, 211, 102, 0.4);
    }
    .cta-text-main {
      font-size: 32px;
      font-weight: 900;
      color: #ffffff;
      letter-spacing: -0.5px;
    }
    .cta-subtext {
      text-align: center;
      font-size: 19px;
      color: #94a3b8;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="glow-top"></div>
  <div class="glow-bottom"></div>

  <!-- Header -->
  <div class="header">
    <div class="brand-logo-container">
      <div class="brand-avatar">SB</div>
      <div>
        <div class="brand-name">SkyBlue Mayorista</div>
        <div class="brand-sub">Distribuidora Oficial</div>
      </div>
    </div>
    <div class="badge-wholesale">Precios Mayoristas</div>
  </div>

  <!-- Product Card -->
  <div class="product-card">
    <div class="product-meta-top">
      <div class="brand-tag">${prod.brand}</div>
      <div class="sku-tag">ART. ${prod.sku}</div>
    </div>
    <div class="image-container">
      <img src="${bgImage}" class="product-img" alt="${prod.title}" />
      <div class="min-badge">
        <span>⚡</span> Mínimo solo 6 unidades surtidas
      </div>
    </div>
    <div class="product-title">${prod.title}</div>
    <div class="product-color">${prod.color}</div>
  </div>

  <!-- Pricing -->
  <div class="pricing-grid">
    <div class="price-box-wholesale">
      <div class="price-label">Precio Mayorista</div>
      <div class="price-amount">${prod.wholesalePrice}</div>
    </div>
    <div class="price-box-pvp">
      <div class="pvp-label">PVP Sugerido</div>
      <div class="pvp-amount">${prod.pvpPrice}</div>
      <div class="profit-tag">Margen: ${prod.profit}</div>
    </div>
  </div>

  <!-- Footer & CTA -->
  <div class="footer">
    <div class="condition-strip">
      <div class="condition-item"><span class="condition-dot"></span> Descuento 1ra compra</div>
      <div class="condition-item"><span class="condition-dot"></span> Envíos a todo el país</div>
    </div>
    <div class="cta-button">
      <span style="font-size: 40px;">💬</span>
      <span class="cta-text-main">Tocá el Enlace y Pedí Catálogo</span>
    </div>
    <div class="cta-subtext">WhatsApp Comercial: +54 9 11 3891-6779</div>
  </div>
</body>
</html>
  `;
}

// 2. Plantilla para Historias Institucionales / Beneficios Mayoristas
function getPromoStoryHtml(promo) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1080px;
      height: 1920px;
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background: radial-gradient(circle at top right, #0f172a, #020617 90%);
      color: #ffffff;
      padding: 80px 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }
    .glow {
      position: absolute;
      width: 700px;
      height: 700px;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
    }
    .glow-cyan { top: -100px; right: -100px; background: rgba(14, 165, 233, 0.3); }
    .glow-amber { bottom: -100px; left: -100px; background: rgba(245, 158, 11, 0.25); }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 10;
    }
    .brand-logo-container {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .brand-avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0284c7, #38bdf8);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      font-weight: 900;
      color: #fff;
    }
    .brand-name { font-size: 32px; font-weight: 800; }
    .brand-sub { font-size: 18px; color: #38bdf8; font-weight: 700; }
    .badge {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 12px 24px;
      border-radius: 999px;
      font-size: 20px;
      font-weight: 800;
      color: #f59e0b;
    }

    .main-content {
      position: relative;
      z-index: 10;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 35px;
    }
    .icon-hero {
      font-size: 110px;
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid rgba(255, 255, 255, 0.15);
      width: 200px;
      height: 200px;
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    }
    .tagline {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 3px;
      color: #38bdf8;
      text-transform: uppercase;
    }
    .title {
      font-size: 64px;
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: -1.5px;
    }
    .highlight {
      background: linear-gradient(135deg, #f59e0b, #fbbf24);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .desc {
      font-size: 28px;
      color: #94a3b8;
      line-height: 1.5;
      max-width: 850px;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 25px;
      width: 100%;
      margin-top: 15px;
    }
    .info-card {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 28px;
      padding: 30px;
      text-align: left;
    }
    .info-card h4 {
      font-size: 26px;
      color: #f8fafc;
      margin-bottom: 10px;
    }
    .info-card p {
      font-size: 20px;
      color: #94a3b8;
      line-height: 1.4;
    }

    .footer {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .cta-button {
      background: linear-gradient(135deg, #25D366, #128C7E);
      border-radius: 30px;
      padding: 28px 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      box-shadow: 0 15px 35px rgba(37, 211, 102, 0.4);
    }
    .cta-text-main {
      font-size: 32px;
      font-weight: 900;
      color: #ffffff;
    }
    .cta-subtext {
      text-align: center;
      font-size: 20px;
      color: #94a3b8;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="glow glow-cyan"></div>
  <div class="glow glow-amber"></div>

  <div class="header">
    <div class="brand-logo-container">
      <div class="brand-avatar">SB</div>
      <div>
        <div class="brand-name">SkyBlue Mayorista</div>
        <div class="brand-sub">Comunidad de Revendedoras</div>
      </div>
    </div>
    <div class="badge">${promo.badge}</div>
  </div>

  <div class="main-content">
    <div class="icon-hero">${promo.icon}</div>
    <div class="tagline">${promo.tagline}</div>
    <div class="title">${promo.title}</div>
    <div class="desc">${promo.desc}</div>

    <div class="cards-grid">
      <div class="info-card">
        <h4>${promo.card1Title}</h4>
        <p>${promo.card1Desc}</p>
      </div>
      <div class="info-card">
        <h4>${promo.card2Title}</h4>
        <p>${promo.card2Desc}</p>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="cta-button">
      <span style="font-size: 40px;">📲</span>
      <span class="cta-text-main">${promo.ctaText}</span>
    </div>
    <div class="cta-subtext">WhatsApp Oficial: +54 9 11 3891-6779</div>
  </div>
</body>
</html>
  `;
}

// 3. Dataset de productos desde CSV
function parseCsv(csvPath) {
  const content = fs.readFileSync(csvPath, 'utf8');
  const lines = content.trim().split('\n');
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    // Regex para CSV respetando comillas
    const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(',');
    const cleanMatches = matches.map(m => m.replace(/^"|"$/g, '').trim());
    
    if (cleanMatches.length >= 8) {
      rows.push({
        sku: cleanMatches[0],
        title: cleanMatches[1],
        brand: cleanMatches[2],
        category: cleanMatches[3],
        wholesalePrice: cleanMatches[4],
        pvpPrice: cleanMatches[5],
        profit: cleanMatches[6],
        color: cleanMatches[7],
        imagePath: cleanMatches[8]
      });
    }
  }
  return rows;
}

// 4. Promociones y Beneficios Institucionales
const promoStories = [
  {
    id: "promo_minimo_6",
    badge: "Condición Comercial",
    icon: "📦",
    tagline: "EMPRENDÉ CON TRANQUILIDAD",
    title: "Mínimo de Compra: <br><span class=\"highlight\">Solo 6 Unidades Surtidas</span>",
    desc: "No necesitás comprar cajas cerradas ni curvas completas. Podés combinar modelos, marcas y talles como quieras.",
    card1Title: "✨ 100% Surtido Libre",
    card1Desc: "Combiná carteras, mochilas y calzado a tu gusto.",
    card2Title: "🚀 Stock Inmediato",
    card2Desc: "Ideal para arrancar tu showroom o venta online.",
    ctaText: "Pedir Condiciones al WhatsApp"
  },
  {
    id: "promo_envios_pais",
    badge: "Logística Federal",
    icon: "🚚",
    tagline: "DESPACHOS A TODA ARGENTINA",
    title: "Llegamos a tu Local <br><span class=\"highlight\">En Cualquier Provincia</span>",
    desc: "Despachamos en 24/48 hs hábiles por tu expreso de confianza, Vía Cargo o Andreani directo a tu puerta o sucursal.",
    card1Title: "🛡️ Embalaje Seguro",
    card1Desc: "Tu mercadería viaja 100% protegida y asegurada.",
    card2Title: "📍 Seguimiento Online",
    card2Desc: "Te enviamos la guía y remito apenas despachamos.",
    ctaText: "Consultar Envíos a mi Ciudad"
  },
  {
    id: "promo_descuento_primera_compra",
    badge: "Beneficio Exclusivo",
    icon: "🎁",
    tagline: "BIENVENIDA A SKYBLUE",
    title: "Descuento Especial <br><span class=\"highlight\">En tu Primera Compra</span>",
    desc: "Queremos que pruebes la calidad de XTI, Refresh y Petite Jolie. Pagando con transferencia o efectivo tenés beneficio directo.",
    card1Title: "💰 Margen Superior",
    card1Desc: "Duplicás o más tu inversión en cada venta.",
    card2Title: "🌟 Calidad Europea",
    card2Desc: "Materiales premium que tus clientas vuelven a pedir.",
    ctaText: "Reclamar mi Descuento de Bienvenida"
  },
  {
    id: "promo_pasos_compra",
    badge: "Guía Rápida",
    icon: "📋",
    tagline: "¿CÓMO COMPRAR?",
    title: "Tu Pedido Mayorista <br><span class=\"highlight\">En Solo 3 Pasos</span>",
    desc: "Sin registros complicados ni demoras. Atención personalizada y directa con nuestro equipo comercial.",
    card1Title: "1. Elegís del Catálogo",
    card1Desc: "Te pasamos el PDF completo con fotos y stock.",
    card2Title: "2. Confirmamos y Enviamos",
    card2Desc: "Armamos tu pedido y despachamos en 24 hs.",
    ctaText: "Escribir al WhatsApp Comercial"
  }
];

async function main() {
  console.log("🚀 Iniciando generación por lotes de historias 1080x1920 para SkyBlue Mayorista...");

  const csvPath = path.join(__dirname, '..', 'data', 'catalogo_canva_dataset.csv');
  const products = parseCsv(csvPath);
  console.log(`📦 Se encontraron ${products.length} productos para historias.`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1080,1920']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

  // 1. Generar historias de productos
  for (let i = 0; i < products.length; i++) {
    const prod = products[i];
    console.log(`[${i+1}/${products.length}] Generando historia: ${prod.sku} - ${prod.title}...`);
    const html = getProductStoryHtml(prod);
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    
    const outputFilename = `story_prod_${prod.sku}.jpg`;
    const outputPath = path.join(OUTPUT_DIR, outputFilename);
    await page.screenshot({ path: outputPath, type: 'jpeg', quality: 95 });
  }

  // 2. Generar historias institucionales/promocionales
  for (let i = 0; i < promoStories.length; i++) {
    const promo = promoStories[i];
    console.log(`[Promo ${i+1}/${promoStories.length}] Generando historia promo: ${promo.id}...`);
    const html = getPromoStoryHtml(promo);
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    
    const outputFilename = `story_${promo.id}.jpg`;
    const outputPath = path.join(OUTPUT_DIR, outputFilename);
    await page.screenshot({ path: outputPath, type: 'jpeg', quality: 95 });
  }

  await browser.close();
  console.log(`\n🎉 ¡Generación completada con éxito! Todas las historias están en:\n${OUTPUT_DIR}`);
}

main().catch(err => {
  console.error("❌ Error en la generación:", err);
  process.exit(1);
});
