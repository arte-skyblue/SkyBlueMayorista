import fs from 'fs';
import path from 'path';

export function buildCompleteRealCatalog() {
  const dir = path.resolve('data/real_ipn_export');
  const files = fs.readdirSync(dir).filter(f => f.startsWith('ws_products_list_p') && f.endsWith('.html'));

  const parsedProducts = [];
  const seenSkus = new Set();

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

        // Extract SKU code e.g. "XTI144716" or "04748" or "PJ10072"
        const codeMatch = rawText.match(/\[\s*([0-9a-zA-Z\-_]+)\s*\]/);
        let skuCode = codeMatch ? codeMatch[1].trim() : 'SKU-' + uidMatch[1].slice(0, 6);
        if (skuCode.length <= 2 && rawText.includes('XTI')) skuCode = 'XTI' + skuCode;

        // Skip duplicates to keep catalogue clean and unique
        if (seenSkus.has(skuCode)) continue;
        seenSkus.add(skuCode);

        // Brand match
        let brand = 'SKY BLUE';
        if (rawText.toUpperCase().includes('PETITE JOLIE') || skuCode.startsWith('PJ')) brand = 'PETITE JOLIE';
        else if (rawText.toUpperCase().includes('REFRESH') || skuCode.startsWith('REF')) brand = 'REFRESH';
        else if (rawText.toUpperCase().includes('XTI') || skuCode.startsWith('XTI')) brand = 'XTI BY SKY BLUE';
        else if (rawText.toUpperCase().includes('GIULIA') || skuCode.startsWith('GD')) brand = 'GIULIA DOMNA';
        else if (rawText.toUpperCase().includes('GATICAR')) brand = 'GATICAR';

        // Category match
        let category = 'Zapatillas';
        if (rawText.toUpperCase().includes('SANDALIA') || rawText.toUpperCase().includes('SANDALIAS')) category = 'Sandalias';
        else if (rawText.toUpperCase().includes('BOTINETA') || rawText.toUpperCase().includes('BOTINETAS')) category = 'Botinetas';
        else if (rawText.toUpperCase().includes('BOTA') || rawText.toUpperCase().includes('BOTAS')) category = 'Botas';
        else if (rawText.toUpperCase().includes('MOCASIN') || rawText.toUpperCase().includes('MOCASINES')) category = 'Mocasines';
        else if (rawText.toUpperCase().includes('OJOTA') || rawText.toUpperCase().includes('OJOTAS')) category = 'Ojotas';
        else if (rawText.toUpperCase().includes('CARTERA') || rawText.toUpperCase().includes('CARTERAS')) category = 'Carteras';
        else if (rawText.toUpperCase().includes('ZUECO') || rawText.toUpperCase().includes('ZUECOS')) category = 'Zuecos';
        else if (rawText.toUpperCase().includes('BILLETERA')) category = 'Billeteras';

        // Season match
        let season = 'Verano 2026';
        if (rawText.includes('Verano 27') || rawText.includes('Verano 2027')) season = 'Verano 2027';
        else if (rawText.includes('Verano 26') || rawText.includes('Verano 2026') || rawText.includes('Verano 21') || rawText.includes('Verano')) season = 'Verano 2026';
        else if (rawText.includes('Invierno 26') || rawText.includes('Invierno 2026') || rawText.includes('Invierno')) season = 'Invierno 2026';
        else if (rawText.includes('Todo el año') || rawText.includes('ALL')) season = 'Todo el año';

        // Colors palette
        let mainColor = 'Negro';
        const colMatch = rawText.match(/\b(NEGRO|BLANCO|NUDE|ARENA|CHOCOLATE|DULCE DE LECHE|FUCSIA|CAMEL|ROJO|AZUL|VERDE|LILA|CORAL|CREMA|VAINILLA|ROSA|PLATA|ORO)\b/i);
        if (colMatch) {
          mainColor = colMatch[1].charAt(0).toUpperCase() + colMatch[1].slice(1).toLowerCase();
        }

        // Product Title FORMATTED EXACTLY as requested:
        // "XTI144716 - Categoría (Botas) - Color (Negro) - Colección (Verano 27)"
        const formattedTitle = `${skuCode} - Categoría (${category}) - Color (${mainColor}) - Colección (${season})`;

        // Prices parsing
        const parseMoney = (str) => {
          if (!str || str === '-') return 0;
          const clean = str.replace(/[^0-9,]/g, '').replace(',', '.');
          return Math.round(parseFloat(clean) || 0);
        };

        const cost = parseMoney(tds[3]) || 16500;
        const pricePublic = parseMoney(tds[4]) || Math.round(cost * 2.0);
        const priceWholesale = parseMoney(tds[5]) || Math.round(cost * 1.5);

        // Product Type / Curve
        let productType = 'Calzado Dama (35-40)';
        if (rawText.includes('Calzado Dama (35-41)')) productType = 'Calzado Dama (35-41)';
        else if (rawText.includes('Calzado Hombre (39/44)') || rawText.includes('Calzado de Hombre (39/45)')) productType = 'Calzado Hombre (39/44)';
        else if (rawText.includes('Niño') || rawText.includes('Niños')) productType = 'Calzado Niños (28-37)';
        else if (category === 'Carteras' || category === 'Billeteras') productType = 'Accesorios';

        // Images mapping based on Brand & Category
        const imageGallery = {
          'Sandalias': [
            'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=800&auto=format&fit=crop&q=80'
          ],
          'Zapatillas': [
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80'
          ],
          'Botas': [
            'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80'
          ],
          'Botinetas': [
            'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80'
          ],
          'Mocasines': [
            'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80'
          ],
          'Ojotas': [
            'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&auto=format&fit=crop&q=80'
          ],
          'Carteras': [
            'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80'
          ],
          'Zuecos': [
            'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=800&auto=format&fit=crop&q=80'
          ]
        };

        const mainImage = (imageGallery[category] || imageGallery['Sandalias'])[0];

        parsedProducts.push({
          uid: uidMatch[1],
          sku: skuCode,
          title: formattedTitle,
          rawDescription: rawText,
          brand,
          category,
          season,
          mainColor,
          productType,
          priceCost: cost,
          pricePublic,
          priceWholesale,
          mainImage,
          images: imageGallery[category] || [mainImage]
        });
      }
    }
  }

  console.log(`=== Catálogo Maestro Completo Creado: ${parsedProducts.length} modelos de calzado únicos ===`);
  console.log('Muestra de título formateado:', parsedProducts[0].title);
  console.log('Muestra 2:', parsedProducts[1]?.title);

  fs.writeFileSync(path.join(dir, 'complete_master_catalog.json'), JSON.stringify(parsedProducts, null, 2));
  return parsedProducts;
}

buildCompleteRealCatalog();
