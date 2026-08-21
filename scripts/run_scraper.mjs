import fs from 'fs';
import path from 'path';
import { Session, BASE_URL } from './session_helper.mjs';
import { parseProductDetailHtml } from './parse_detail_helper.mjs';

function sanitizeFilename(name) {
  return name.replace(/[/\\?%*:|"<>]/g, '_').trim();
}

function escapeCsvField(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""').replace(/\r\n/g, ' ').replace(/[\r\n]/g, ' ');
  return `"${str}"`;
}

async function runScraper() {
  console.log('=== INICIANDO SCRAPER DE PRODUCTOS SKYBLUE MAYORISTA ===\n');

  const session = new Session();
  await session.login('maarcelino.designs@gmail.com', 'marce26');
  await session.selectCustomer('SALAMONE');

  console.log('\nDescargando catálogo completo desde /Products...');
  const catalogRes = await session.fetch('/Products');
  const catalogHtml = await catalogRes.text();

  const articleRegex = /<article\b([\s\S]*?)<\/article>/gi;
  let match;
  const catalogProducts = [];

  while ((match = articleRegex.exec(catalogHtml)) !== null) {
    const articleHtml = match[1];
    const idMatch = articleHtml.match(/b2bproductid=["']?(\d+)["']?/i);
    const id = idMatch ? idMatch[1] : null;

    const linkMatch = articleHtml.match(/href=["'](\/Products\/\d+)["']/i);
    const url = linkMatch ? `${BASE_URL}${linkMatch[1]}` : (id ? `${BASE_URL}/Products/${id}` : null);

    const imgMatch = articleHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
    const image = imgMatch ? imgMatch[1].replace(/&amp;/g, '&') : null;

    const codeMatch = articleHtml.match(/<h2 class="download-card__content-box__catagory">\s*<span>([^<]+)<\/span>/i);
    const code = codeMatch ? codeMatch[1].trim() : '';

    const titleMatch = articleHtml.match(/<h3 class="download-card__content-box__title">\s*([^<]+)\s*<\/h3>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    const brandMatch = articleHtml.match(/<p class="download-card__content-box__brand">\s*([^<]+)\s*<\/p>/i);
    const brand = brandMatch ? brandMatch[1].trim() : '';

    const isUnavailable = articleHtml.includes('producto-no-disponible') || articleHtml.includes('no-disponible');
    const available = !isUnavailable;

    const priceMatch = articleHtml.match(/<h3 class="download-card__content-box__title price-color">([\s\S]*?)<\/h3>/i);
    let price = null;
    let priceText = null;
    if (priceMatch) {
      const rawPrice = priceMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      priceText = rawPrice;
      const numMatch = rawPrice.match(/\$\s*([\d\.,]+)/);
      if (numMatch) {
        price = parseFloat(numMatch[1].replace(/\./g, '').replace(',', '.'));
      }
    }

    if (id) {
      catalogProducts.push({
        id,
        code,
        title,
        brand,
        catalogPrice: price,
        catalogPriceText: priceText,
        catalogAvailable: available,
        catalogImage: image,
        url
      });
    }
  }

  console.log(`Se encontraron ${catalogProducts.length} productos en el catálogo.\n`);

  // Directories setup
  const outDir = path.resolve('data');
  const individualDir = path.join(outDir, 'products_individual');
  const byBrandDir = path.join(outDir, 'products_by_brand');
  
  fs.mkdirSync(individualDir, { recursive: true });
  fs.mkdirSync(byBrandDir, { recursive: true });

  const allFullProducts = [];
  const CONCURRENCY = 8;
  let completed = 0;
  const total = catalogProducts.length;

  async function processProduct(catProd) {
    let retries = 3;
    let detailHtml = '';
    while (retries > 0) {
      try {
        const res = await session.fetch(`/Products/${catProd.id}`);
        detailHtml = await res.text();
        if (detailHtml && detailHtml.length > 5000) {
          break;
        }
        retries--;
        await new Promise(r => setTimeout(r, 500));
      } catch (err) {
        retries--;
        if (retries === 0) {
          console.error(`Error al descargar producto ${catProd.id}:`, err.message);
        }
        await new Promise(r => setTimeout(r, 500));
      }
    }

    let parsedDetail = {};
    if (detailHtml && detailHtml.length > 5000) {
      parsedDetail = parseProductDetailHtml(detailHtml, catProd.id);
    }

    const fullProduct = {
      id: catProd.id,
      sku: parsedDetail.sku || catProd.code,
      title: parsedDetail.title || catProd.title,
      brand: catProd.brand || 'SkyBlue',
      season: parsedDetail.season || '',
      description: parsedDetail.description || '',
      price: parsedDetail.price !== null ? parsedDetail.price : catProd.catalogPrice,
      priceFormatted: parsedDetail.priceFormatted || catProd.catalogPriceText || '',
      available: catProd.catalogAvailable,
      totalStock: parsedDetail.totalStock !== undefined ? parsedDetail.totalStock : 0,
      mainImage: parsedDetail.mainImage || catProd.catalogImage,
      images: parsedDetail.images && parsedDetail.images.length > 0 ? parsedDetail.images : (catProd.catalogImage ? [catProd.catalogImage] : []),
      url: catProd.url,
      publishedByUnits: parsedDetail.publishedByUnits ?? false,
      purchaseModalities: (parsedDetail.productTasks || []).map(t => ({
        taskName: t.taskName,
        sizesBreakdown: t.sizesStr ? t.sizesStr.trim() : '',
        salePrice: t.salePrice
      })),
      variants: parsedDetail.variants || []
    };

    allFullProducts.push(fullProduct);

    // Save individual JSON by ID
    const singleFilePath = path.join(individualDir, `${fullProduct.id}.json`);
    fs.writeFileSync(singleFilePath, JSON.stringify(fullProduct, null, 2), 'utf8');

    // Save individual JSON by Brand and Code
    const brandFolder = path.join(byBrandDir, sanitizeFilename(fullProduct.brand));
    fs.mkdirSync(brandFolder, { recursive: true });
    const brandFilePath = path.join(brandFolder, `${sanitizeFilename(fullProduct.sku || fullProduct.id)}.json`);
    fs.writeFileSync(brandFilePath, JSON.stringify(fullProduct, null, 2), 'utf8');

    completed++;
    if (completed % 25 === 0 || completed === total) {
      const percent = ((completed / total) * 100).toFixed(1);
      process.stdout.write(`\rProgreso: ${completed}/${total} (${percent}%) productos procesados y guardados...`);
    }
  }

  // Run in chunks with concurrency pool
  for (let i = 0; i < catalogProducts.length; i += CONCURRENCY) {
    const chunk = catalogProducts.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(processProduct));
  }

  console.log('\n\nGuardando archivo consolidado JSON: data/products_all.json...');
  // Sort by Brand, SKU
  allFullProducts.sort((a, b) => a.brand.localeCompare(b.brand) || a.sku.localeCompare(b.sku));
  fs.writeFileSync(path.join(outDir, 'products_all.json'), JSON.stringify(allFullProducts, null, 2), 'utf8');

  console.log('Generando archivo CSV: data/products.csv...');
  const csvHeaders = [
    'ID',
    'SKU',
    'Marca',
    'Titulo',
    'Temporada',
    'Precio_ARS',
    'Precio_Formateado',
    'Disponible',
    'Stock_Total',
    'Colores_Disponibles',
    'Talles_Disponibles',
    'Modalidades_Compra',
    'Descripcion',
    'Imagen_Principal',
    'Todas_Las_Imagenes',
    'URL_Producto'
  ];

  const csvRows = [csvHeaders.join(',')];

  const variantCsvHeaders = [
    'Producto_ID',
    'SKU',
    'Marca',
    'Titulo',
    'Temporada',
    'Color',
    'Color_ID',
    'Talle',
    'Talle_ID',
    'Stock_Variante',
    'Precio_Variante',
    'URL_Producto'
  ];
  const variantCsvRows = [variantCsvHeaders.join(',')];

  for (const p of allFullProducts) {
    const colorsList = [...new Set(p.variants.map(v => v.color).filter(Boolean))].join('; ');
    
    const sizesSet = new Set();
    for (const v of p.variants) {
      for (const s of v.sizes) {
        if (s.size) sizesSet.add(s.size);
      }
    }
    const sizesList = Array.from(sizesSet).join('; ');

    const modalitiesList = p.purchaseModalities.map(m => m.taskName + (m.sizesBreakdown ? ` (${m.sizesBreakdown})` : '')).join(' | ');

    csvRows.push([
      escapeCsvField(p.id),
      escapeCsvField(p.sku),
      escapeCsvField(p.brand),
      escapeCsvField(p.title),
      escapeCsvField(p.season),
      escapeCsvField(p.price),
      escapeCsvField(p.priceFormatted),
      escapeCsvField(p.available ? 'SI' : 'NO'),
      escapeCsvField(p.totalStock),
      escapeCsvField(colorsList),
      escapeCsvField(sizesList),
      escapeCsvField(modalitiesList),
      escapeCsvField(p.description),
      escapeCsvField(p.mainImage),
      escapeCsvField((p.images || []).join(' | ')),
      escapeCsvField(p.url)
    ].join(','));

    // Populate variant rows
    if (p.variants && p.variants.length > 0) {
      for (const v of p.variants) {
        for (const s of v.sizes) {
          variantCsvRows.push([
            escapeCsvField(p.id),
            escapeCsvField(p.sku),
            escapeCsvField(p.brand),
            escapeCsvField(p.title),
            escapeCsvField(p.season),
            escapeCsvField(v.color),
            escapeCsvField(v.colorId),
            escapeCsvField(s.size),
            escapeCsvField(s.sizeId),
            escapeCsvField(s.stock),
            escapeCsvField(v.price),
            escapeCsvField(p.url)
          ].join(','));
        }
      }
    } else {
      // Fallback row without variants
      variantCsvRows.push([
        escapeCsvField(p.id),
        escapeCsvField(p.sku),
        escapeCsvField(p.brand),
        escapeCsvField(p.title),
        escapeCsvField(p.season),
        escapeCsvField(''),
        escapeCsvField(''),
        escapeCsvField(''),
        escapeCsvField(''),
        escapeCsvField(p.totalStock),
        escapeCsvField(p.priceFormatted),
        escapeCsvField(p.url)
      ].join(','));
    }
  }

  fs.writeFileSync(path.join(outDir, 'products.csv'), '\ufeff' + csvRows.join('\r\n'), 'utf8'); // Added BOM for Excel UTF-8 support
  fs.writeFileSync(path.join(outDir, 'products_variants.csv'), '\ufeff' + variantCsvRows.join('\r\n'), 'utf8');

  console.log('Generación completada exitosamente!');
  console.log(`\nArchivos generados en data/:`);
  console.log(`- data/products_all.json (${allFullProducts.length} productos)`);
  console.log(`- data/products.csv (Catálogo general con toda la info)`);
  console.log(`- data/products_variants.csv (Desglose por color y talle)`);
  console.log(`- data/products_individual/ (${allFullProducts.length} archivos .json)`);
  console.log(`- data/products_by_brand/ (Organizados por marcas: PETITE JOLIE, REFRESH, Xti by Sky Blue)`);
}

runScraper().catch(console.error);
