import fs from 'fs';
import path from 'path';

export function parseAllRealProducts() {
  const dir = path.resolve('data/real_ipn_export');
  const files = fs.readdirSync(dir).filter(f => f.startsWith('ws_products_list_p') && f.endsWith('.html'));

  const products = [];

  for (const file of files) {
    const html = fs.readFileSync(path.join(dir, file), 'utf8');
    const trMatches = html.match(/<tr[\s\S]*?<\/tr>/gi) || [];

    for (const tr of trMatches) {
      if (!tr.includes('masterProductUID')) continue;

      const uidMatch = tr.match(/masterProductUID=([a-zA-Z0-9\-]+)/i);
      const skuBlockMatch = tr.match(/openProduct\('[^']+'\)[^>]*>([\s\S]*?)<\/a>/i);
      const tds = Array.from(tr.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi), m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());

      if (uidMatch && skuBlockMatch) {
        let rawText = skuBlockMatch[1]
          .replace(/<[^>]+>/g, ' ')
          .replace(/&nbsp;/g, ' ')
          .replace(/&ntilde;/g, 'ñ')
          .replace(/&Ntilde;/g, 'Ñ')
          .replace(/&aacute;/g, 'á')
          .replace(/&eacute;/g, 'é')
          .replace(/&iacute;/g, 'í')
          .replace(/&oacute;/g, 'ó')
          .replace(/&uacute;/g, 'ú')
          .replace(/\s+/g, ' ')
          .trim();
        
        // Extract SKU code e.g. "04748" from "[04748]"
        const codeMatch = rawText.match(/\[\s*([0-9a-zA-Z\-_]+)\s*\]/);
        const skuCode = codeMatch ? codeMatch[1].trim() : 'SKU-' + uidMatch[1].slice(0, 6);

        // Brand match
        let brand = 'SKY BLUE';
        if (rawText.toUpperCase().includes('PETITE JOLIE')) brand = 'PETITE JOLIE';
        else if (rawText.toUpperCase().includes('REFRESH')) brand = 'REFRESH';
        else if (rawText.toUpperCase().includes('XTI')) brand = 'XTI BY SKY BLUE';
        else if (rawText.toUpperCase().includes('GIULIA')) brand = 'GIULIA DOMNA';
        else if (rawText.toUpperCase().includes('GATICAR')) brand = 'GATICAR';

        // Category match
        let category = 'ZAPATILLAS';
        if (rawText.toUpperCase().includes('SANDALIA') || rawText.toUpperCase().includes('SANDALIAS')) category = 'SANDALIA';
        else if (rawText.toUpperCase().includes('BOTA') || rawText.toUpperCase().includes('BOTAS')) category = 'BOTA';
        else if (rawText.toUpperCase().includes('BOTINETA') || rawText.toUpperCase().includes('BOTINETAS')) category = 'BOTINETAS';
        else if (rawText.toUpperCase().includes('MOCASIN') || rawText.toUpperCase().includes('MOCASINES')) category = 'MOCASINES';
        else if (rawText.toUpperCase().includes('OJOTA') || rawText.toUpperCase().includes('OJOTAS')) category = 'OJOTAS';
        else if (rawText.toUpperCase().includes('CARTERA') || rawText.toUpperCase().includes('CARTERAS')) category = 'CARTERAS';
        else if (rawText.toUpperCase().includes('ZUECO') || rawText.toUpperCase().includes('ZUECOS')) category = 'ZUECOS';

        // Curve Type match
        let productType = 'Calzado Dama (35-40)';
        if (rawText.includes('Calzado Dama (35-41)')) productType = 'Calzado Dama (35-41)';
        else if (rawText.includes('Calzado Hombre (39/44)') || rawText.includes('Calzado de Hombre (39/45)')) productType = 'Calzado Hombre (39/44)';
        else if (rawText.includes('Niño') || rawText.includes('Niños')) productType = 'Calzado Niños (28-37)';
        else if (rawText.includes('Accesorios') || rawText.includes('Cinturon')) productType = 'Accesorios';

        // Material match
        let material = 'PU';
        const matMatch = rawText.match(/\b(CHAROL|CROCO|CUERO|EVA|GAMUZA|GOMA|LONA|MICROFIBRA|PELO|PLUSH|PU|RAFIA|RASO|SET|TEJIDO)\b/i);
        if (matMatch) material = matMatch[1].toUpperCase();

        // Title clean
        let title = rawText;
        const lastBracketMatch = rawText.match(/\[[^\]]+\]\s*([^\[\]]+)$/);
        if (lastBracketMatch) {
          title = lastBracketMatch[1].trim();
        } else {
          const parts = rawText.split(')');
          title = parts[parts.length - 1].trim();
        }
        if (!title || title.length < 2) title = `Modelo ${skuCode}`;

        // Prices from TDs
        // td[2]: stock, td[3]: costo base, td[4]: lista 1 público, td[5]: lista 2 mayorista, td[8]: ML
        const parseMoney = (str) => {
          if (!str || str === '-') return 0;
          const clean = str.replace(/[^0-9,]/g, '').replace(',', '.');
          return Math.round(parseFloat(clean) || 0);
        };

        const cost = parseMoney(tds[3]) || 15000;
        const pricePublic = parseMoney(tds[4]) || (cost > 0 ? cost * 2 : 30000);
        const priceWholesale = parseMoney(tds[5]) || (cost > 0 ? Math.round(cost * 1.5) : 22500);
        const stockTotal = parseInt(tds[2]) || 0;

        products.push({
          uid: uidMatch[1],
          sku: skuCode,
          title: title.length > 50 ? title.slice(0, 50) : title,
          fullDescription: rawText,
          brand,
          category,
          productType,
          material,
          season: rawText.includes('Verano') ? 'Verano 2026' : (rawText.includes('Invierno') ? 'Invierno 2026' : 'Todo el año'),
          priceCost: cost > 0 ? cost : 15000,
          pricePublic: pricePublic > 0 ? pricePublic : 30000,
          priceWholesale: priceWholesale > 0 ? priceWholesale : 22500,
          stockTotal
        });
      }
    }
  }

  return products;
}

const prods = parseAllRealProducts();
console.log(`Successfully parsed ${prods.length} real products from live iPN database!`);
console.log('Sample parsed product:', prods[0]);
fs.writeFileSync('data/real_ipn_export/all_parsed_real_products.json', JSON.stringify(prods, null, 2));
