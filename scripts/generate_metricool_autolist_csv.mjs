import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_SOURCE = path.join(__dirname, '..', 'data', 'catalogo_canva_dataset.csv');
const OUTPUT_CSV = path.join(__dirname, '..', 'data', 'metricool_autolist_historias_skyblue.csv');
const STORIES_DIR = path.join(__dirname, '..', 'public', 'stories_auto_batch');

function parseCsv(csvPath) {
  const content = fs.readFileSync(csvPath, 'utf8');
  const lines = content.trim().split('\n');
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
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
        whatsapp: cleanMatches[9] || "https://wa.me/5491138916779"
      });
    }
  }
  return rows;
}

const promoCaptions = [
  {
    file: "story_promo_minimo_6.jpg",
    text: "🔥 ¡Emprendé con SkyBlue! Mínimo de compra de solo 6 unidades surtidas. Combiná marcas y modelos a tu gusto. Envíos a todo el país.",
    link: "https://wa.me/5491138916779?text=Hola!%20Quiero%20info%20del%20minimo%20de%206%20unidades"
  },
  {
    file: "story_promo_envios_pais.jpg",
    text: "🚚 Despachamos pedidos todos los días a todas las provincias de Argentina por expreso, Vía Cargo y Andreani. ¡Sumate a nuestra red de revendedoras!",
    link: "https://wa.me/5491138916779?text=Hola!%20Quiero%20consultar%20envios%20a%20mi%20ciudad"
  },
  {
    file: "story_promo_descuento_primera_compra.jpg",
    text: "🎁 ¿Primera vez que comprás en SkyBlue? Aprovechá descuento especial por transferencia o efectivo. Pedí el catálogo mayorista.",
    link: "https://wa.me/5491138916779?text=Hola!%20Quiero%20mi%20descuento%20de%20primera%20compra"
  },
  {
    file: "story_promo_pasos_compra.jpg",
    text: "📋 Comprar al por mayor nunca fue tan fácil. En solo 3 pasos armás tu pedido y recibís en tu local. Contactanos por WhatsApp.",
    link: "https://wa.me/5491138916779?text=Hola!%20Quiero%20hacer%20un%20pedido%20mayorista"
  }
];

function generateAutolistCsv() {
  const products = parseCsv(CSV_SOURCE);
  const outRows = [
    ["Texto", "Enlace", "Archivo_Creativo", "Tipo_Red"]
  ];

  // Intercalar historias de producto con historias promocionales para dinamismo
  let promoIndex = 0;
  products.forEach((prod, index) => {
    // 1 Historia de Producto
    const prodFile = `story_prod_${prod.sku}.jpg`;
    const prodText = `✨ ${prod.title} (${prod.brand}) - Mayorista: ${prod.wholesalePrice} | Margen: ${prod.profit}. Mínimo 6 unidades surtidas. Pedilo por WhatsApp.`;
    outRows.push([
      `"${prodText}"`,
      `"${prod.whatsapp}"`,
      `"${prodFile}"`,
      `"Instagram Stories, Facebook Stories"`
    ]);

    // Cada 4 productos, meter una historia institucional/promocional
    if ((index + 1) % 4 === 0 && promoIndex < promoCaptions.length) {
      const p = promoCaptions[promoIndex];
      outRows.push([
        `"${p.text}"`,
        `"${p.link}"`,
        `"${p.file}"`,
        `"Instagram Stories, Facebook Stories"`
      ]);
      promoIndex++;
    }
  });

  // Agregar las promos restantes si quedaron
  while (promoIndex < promoCaptions.length) {
    const p = promoCaptions[promoIndex];
    outRows.push([
      `"${p.text}"`,
      `"${p.link}"`,
      `"${p.file}"`,
      `"Instagram Stories, Facebook Stories"`
    ]);
    promoIndex++;
  }

  const csvContent = outRows.map(r => r.join(',')).join('\n');
  fs.writeFileSync(OUTPUT_CSV, csvContent, 'utf8');
  console.log(`✅ CSV de Autolista generado con éxito en:\n${OUTPUT_CSV} (${outRows.length - 1} historias configuradas)`);
}

generateAutolistCsv();
