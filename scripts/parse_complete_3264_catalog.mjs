import fs from 'fs';
import path from 'path';

function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&ntilde;/gi, 'ñ')
    .replace(/&Ntilde;/gi, 'Ñ')
    .replace(/&aacute;/gi, 'á')
    .replace(/&eacute;/gi, 'é')
    .replace(/&iacute;/gi, 'í')
    .replace(/&oacute;/gi, 'ó')
    .replace(/&uacute;/gi, 'ú')
    .replace(/&Aacute;/gi, 'Á')
    .replace(/&Eacute;/gi, 'É')
    .replace(/&Iacute;/gi, 'Í')
    .replace(/&Oacute;/gi, 'Ó')
    .replace(/&Uacute;/gi, 'Ú')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/&nbsp;/gi, ' ')
    .trim();
}

function parseMoney(str) {
  if (!str) return 0;
  // Clean string: '$ 24.500,00' -> 24500
  const clean = str.replace(/[^\d,\.]/g, '').trim();
  if (!clean || clean === '-') return 0;
  // Replace thousand separators and decimal comma
  const parts = clean.split(',');
  const intPart = parts[0].replace(/\./g, '');
  return parseInt(intPart, 10) || 0;
}

async function parseAll3264Products() {
  console.log('=== PROCESANDO LAS 33 PÁGINAS DEL CATÁLOGO REAL DE IPN (3.264 PRODUCTOS) ===');
  const pagesDir = path.resolve('data/real_ipn_export/all_pages');
  const files = fs.readdirSync(pagesDir).filter(f => f.startsWith('page_') && f.endsWith('.html'));

  const parsedProducts = [];
  const uniqueSkus = new Set();
  const brandsSet = new Set();
  const categoriesSet = new Set();
  const seasonsSet = new Set();

  for (const file of files) {
    const html = fs.readFileSync(path.join(pagesDir, file), 'utf8');
    const rows = html.match(/<tr[^>]*name=['"]ItemTR['"][^>]*>([\s\S]*?)<\/tr>/gi) || [];

    for (const row of rows) {
      if (row.includes('id=\'headerRow\'') || row.includes('id="headerRow"')) continue;

      // 1. Extract MasterProductUID
      const uidMatch = row.match(/openProduct\(['"]([A-F0-9\-]+)['"]\)/i) || row.match(/masterProductUID=([A-F0-9\-]+)/i);
      const masterUID = uidMatch ? uidMatch[1] : '';

      // 2. Extract SKU [<b>04748</b>] or [04748]
      const skuMatch = row.match(/\[(?:<b>)?([^\]<]+)(?:<\/b>)?\]/i);
      if (!skuMatch) continue;
      const sku = skuMatch[1].trim();

      // 3. Extract Brand: e.g. [007] SKY BLUE (DANIEL ALEJANDRO GRASSO)
      const brandMatch = row.match(/\[(?:<b>)?[^\]<]+(?:<\/b>)?\]\s*([^<(\n]+)/i);
      let brandName = brandMatch ? decodeHtmlEntities(brandMatch[1].trim()) : 'SKY BLUE';
      if (brandName.toUpperCase().includes('PETITE')) brandName = 'PETITE JOLIE';
      else if (brandName.toUpperCase().includes('REFRESH')) brandName = 'REFRESH';
      else if (brandName.toUpperCase().includes('XTI')) brandName = 'XTI';
      else if (brandName.toUpperCase().includes('GIULIA')) brandName = 'GIULIA DOMNA';
      else if (brandName.toUpperCase().includes('GATICAR')) brandName = 'GATICAR';
      else if (!brandName || brandName.includes('DANIEL')) brandName = 'SKY BLUE';
      brandsSet.add(brandName);

      // 4. Extract Category / Rubro: (BOTAS), (SANDALIAS), (ZAPATILLAS), etc.
      const catMatch = row.match(/\(([A-Z\s\ñ\Ñ]+)\)/i);
      let categoryName = catMatch ? decodeHtmlEntities(catMatch[1].trim()) : 'Calzado';
      // Normalize category capitalization
      categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();
      if (categoryName.toLowerCase().includes('bota')) categoryName = 'Botas';
      else if (categoryName.toLowerCase().includes('sandalia')) categoryName = 'Sandalias';
      else if (categoryName.toLowerCase().includes('zapatill')) categoryName = 'Zapatillas';
      else if (categoryName.toLowerCase().includes('mocas')) categoryName = 'Mocasines';
      else if (categoryName.toLowerCase().includes('ojota')) categoryName = 'Ojotas';
      else if (categoryName.toLowerCase().includes('zueco')) categoryName = 'Zuecos';
      else if (categoryName.toLowerCase().includes('cartera') || categoryName.toLowerCase().includes('bolso')) categoryName = 'Carteras';
      categoriesSet.add(categoryName);

      // 5. Extract Curve / Product Type: Calzado Dama (35-40)
      const curveMatch = row.match(/(Calzado[^\(<]+)/i);
      const productTypeName = curveMatch ? decodeHtmlEntities(curveMatch[1].trim()) : 'Calzado Dama (35-40)';

      // 6. Extract Season & Name from span: <span>Todo el año - Genérica<br />SANDALIA LAURA</span>
      const spanMatch = row.match(/<span>([\s\S]*?)<\/span>/i);
      let seasonName = 'Todo el año';
      let modelName = '';
      if (spanMatch) {
        const spanContent = decodeHtmlEntities(spanMatch[1]);
        const lines = spanContent.split(/<br\s*\/?>|\n/).map(l => l.trim()).filter(Boolean);
        if (lines.length > 0) {
          const seasonLine = lines[0].split('-')[0].trim();
          if (seasonLine) seasonName = seasonLine;
        }
        if (lines.length > 1) {
          modelName = lines[1].trim();
        }
      }
      if (seasonName.includes('27') || seasonName.toLowerCase().includes('verano 27')) seasonName = 'Verano 2027';
      else if (seasonName.includes('26') || seasonName.toLowerCase().includes('verano 26')) seasonName = 'Verano 2026';
      else if (seasonName.toLowerCase().includes('invierno')) seasonName = 'Invierno 2026';
      else seasonName = 'Todo el año';
      seasonsSet.add(seasonName);

      // 7. Extract Prices: Cost, Cash / Public (L1), CC (L2 Mayorista)
      const costMatch = row.match(/id='[^']*_priceCost'[^>]*>([^<]+)</i);
      const priceCost = costMatch ? parseMoney(costMatch[1]) : 15000;

      const cashMatch = row.match(/id='[^']*_priceListCash'[^>]*>([^<]+)</i);
      let priceL1 = cashMatch ? parseMoney(cashMatch[1]) : Math.round((priceCost || 15000) * 2.0);

      const mayoristaMatch = row.match(/id='[^']*_priceListMayorista'[^>]*>([^<]+)</i);
      let priceL2 = mayoristaMatch ? parseMoney(mayoristaMatch[1]) : Math.round((priceCost || 15000) * 1.5);
      if (priceL2 <= 0) priceL2 = Math.round((priceCost || 15000) * 1.5);
      if (priceL1 <= 0) priceL1 = Math.round(priceL2 * 1.35);

      // 8. Determine dominant color from model name or fallback
      let colorName = 'Negro';
      const upperName = (modelName + ' ' + sku).toUpperCase();
      if (upperName.includes('NUDE')) colorName = 'Nude';
      else if (upperName.includes('ARENA')) colorName = 'Arena';
      else if (upperName.includes('DULCE') || upperName.includes('LECHE')) colorName = 'Dulce de Leche';
      else if (upperName.includes('CHOCOLATE')) colorName = 'Chocolate';
      else if (upperName.includes('BLANCO') || upperName.includes('WHITE')) colorName = 'Blanco';
      else if (upperName.includes('FUCSIA') || upperName.includes('PINK')) colorName = 'Fucsia';
      else if (upperName.includes('CAMEL')) colorName = 'Camel';
      else if (upperName.includes('BEIGE')) colorName = 'Beige';

      // 9. Exact Nomenclature Format requested by User:
      // "${sku} - Categoría (${category}) - Color (${color}) - Colección (${season})"
      const exactTitle = `${sku} - Categoría (${categoryName}) - Color (${colorName}) - Colección (${seasonName})`;

      // Image mapping by brand/category
      let mainImage = `https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop`;
      if (categoryName === 'Sandalias') mainImage = `https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=800&auto=format&fit=crop`;
      else if (categoryName === 'Zapatillas') mainImage = `https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop`;
      else if (categoryName === 'Botas' || categoryName === 'Botinetas') mainImage = `https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop`;
      else if (categoryName === 'Mocasines') mainImage = `https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop`;
      else if (categoryName === 'Carteras') mainImage = `https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop`;

      parsedProducts.push({
        masterUID,
        sku,
        title: exactTitle,
        description: modelName ? `${modelName} - ${brandName}` : `${categoryName} ${brandName}`,
        brand: brandName,
        category: categoryName,
        season: seasonName,
        productType: productTypeName,
        priceCost: priceCost > 100 ? priceCost : 18500,
        wholesalePrice: priceL2 > 100 ? priceL2 : 27750,
        retailPrice: priceL1 > 100 ? priceL1 : 37400,
        color: colorName,
        mainImage
      });

      uniqueSkus.add(sku);
    }
  }

  console.log(`\n======================================================`);
  console.log(`TOTAL REGISTROS EXTRAÍDOS: ${parsedProducts.length}`);
  console.log(`TOTAL SKUs ÚNICOS: ${uniqueSkus.size}`);
  console.log(`MARCAS:`, Array.from(brandsSet));
  console.log(`CATEGORÍAS:`, Array.from(categoriesSet));
  console.log(`COLECCIONES:`, Array.from(seasonsSet));
  console.log(`======================================================\n`);

  fs.writeFileSync(
    'data/real_ipn_export/master_complete_3264_products.json',
    JSON.stringify(parsedProducts, null, 2)
  );
  console.log('Guardado data/real_ipn_export/master_complete_3264_products.json con éxito.');
}

parseAll3264Products().catch(console.error);
