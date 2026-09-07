import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

function cleanMoney(tdHtml) {
  if (!tdHtml) return 0;
  const text = tdHtml.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').trim();
  if (text === '-' || text === '' || text === '0') return 0;
  
  const match = text.match(/\$?\s*([\d\.]+,\d{2})/);
  if (match) {
    const val = match[1].replace(/\./g, '').replace(',', '.');
    return parseFloat(val) || 0;
  }

  const numMatch = text.match(/[\d\.]+/);
  if (numMatch) {
    return parseFloat(numMatch[0].replace(/\./g, '')) || 0;
  }

  return 0;
}

function cleanStock(tdHtml) {
  if (!tdHtml) return 0;
  const text = tdHtml.replace(/<[^>]+>/g, '').replace(/\s+/g, '').trim();
  const num = parseInt(text, 10);
  return isNaN(num) ? 0 : num;
}

function decodeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&ntilde;/gi, 'ñ')
    .replace(/&Ntilde;/gi, 'Ñ')
    .replace(/&aacute;/gi, 'á')
    .replace(/&eacute;/gi, 'é')
    .replace(/&iacute;/gi, 'í')
    .replace(/&oacute;/gi, 'ó')
    .replace(/&uacute;/gi, 'ú')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/&nbsp;/gi, ' ')
    .trim();
}

function normalizeRubro(rawRubro) {
  if (!rawRubro) return 'Calzado';
  const r = rawRubro.toUpperCase().trim();
  if (r.includes('ZAPATILLA')) return 'Zapatilla';
  if (r.includes('SANDALIA')) return 'Sandalia';
  if (r.includes('BOTIN') || r.includes('BOTA')) return 'Bota';
  if (r.includes('BORCEGO')) return 'Borcego';
  if (r.includes('CARTERA')) return 'Cartera';
  if (r.includes('ZUECO')) return 'Zueco';
  if (r.includes('MOCASIN') || r.includes('MOCASÍN')) return 'Mocasín';
  if (r.includes('OJOTA')) return 'Ojota';
  if (r.includes('PANTUFLA')) return 'Pantufla';
  if (r.includes('STILLET') || r.includes('STILETTO')) return 'Stiletto';
  if (r.includes('CHATITA') || r.includes('BALERINA')) return 'Chatita';
  if (r.includes('TEXANA')) return 'Texana';
  if (r.includes('ZAPATO')) return 'Zapato';
  if (r.includes('BOLSO')) return 'Bolso';
  if (r.includes('MOCHILA')) return 'Mochila';
  if (r.includes('BILLETERA')) return 'Billetera';
  if (r.includes('ACCESORIO')) return 'Accesorio';
  return rawRubro.charAt(0).toUpperCase() + rawRubro.slice(1).toLowerCase();
}

function extractColor(text) {
  if (!text) return 'Negro';
  const upper = text.toUpperCase();
  const colors = [
    'NEGRO', 'BLANCO', 'NUDE', 'SUELA', 'CAMEL', 'ROSA', 'BEIGE', 'AZUL',
    'ROJO', 'PLATA', 'DORADO', 'VERDE', 'BICOLOR', 'MARFIL', 'MARRON',
    'LILA', 'FUCSIA', 'OFF WHITE', 'GRIS', 'COBRE', 'BRONCE', 'AMARILLO',
    'NARANJA', 'BORDO', 'VINO', 'HABANO', 'PLATINO', 'ARENA', 'CHOCOLATE'
  ];
  for (const c of colors) {
    if (upper.includes(c)) {
      return c.charAt(0) + c.slice(1).toLowerCase();
    }
  }
  return 'Negro';
}

async function fastCleanReseed() {
  console.log('=== SEMBRADO ULTRARRÁPIDO SQL CON NOMENCLATURA EXACTA Y FOTOS ===');

  const pagesDir = path.resolve('../data/real_ipn_export/all_pages');
  const files = fs.readdirSync(pagesDir).filter(f => f.startsWith('page_') && f.endsWith('.html'));

  // Build images index
  const imagesBaseDir = path.resolve('../public/product-images');
  const imageMap = new Map();
  if (fs.existsSync(imagesBaseDir)) {
    const brands = fs.readdirSync(imagesBaseDir);
    for (const b of brands) {
      const brandDir = path.join(imagesBaseDir, b);
      if (!fs.statSync(brandDir).isDirectory()) continue;
      const skuFolders = fs.readdirSync(brandDir);
      for (const folder of skuFolders) {
        const cleanSkuPart = folder.split('_')[0].trim().toUpperCase();
        const mainImg = `/product-images/${b}/${folder}/00_principal.webp`;
        imageMap.set(cleanSkuPart, mainImg);
      }
    }
  }
  console.log(`Encontradas ${imageMap.size} carpetas de fotos reales en public/product-images.`);

  const parsedItems = [];
  const seenSkus = new Map();

  for (const file of files) {
    const html = fs.readFileSync(path.join(pagesDir, file), 'utf8');
    const rows = html.match(/<tr[^>]*name=['"]ItemTR['"][^>]*>([\s\S]*?)<\/tr>/gi) || [];

    for (const row of rows) {
      if (row.includes('headerRow')) continue;

      const tds = row.match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || [];
      if (tds.length < 5) continue;

      const td1 = tds[1];
      const skuMatch = td1.match(/\[(?:<b>)?([^\]<]+)(?:<\/b>)?\]/i);
      if (!skuMatch) continue;
      const sku = skuMatch[1].trim();

      // Brand
      const brandMatch = td1.match(/\[(?:<b>)?[^\]<]+(?:<\/b>)?\]\s*([^<(\n]+)/i);
      let brand = brandMatch ? decodeHtml(brandMatch[1].trim()) : 'SKY BLUE';
      const bUpper = brand.toUpperCase();
      if (bUpper.includes('PETITE') || sku.toUpperCase().startsWith('PJ')) brand = 'PETITE JOLIE';
      else if (bUpper.includes('REFRESH') || sku.toUpperCase().startsWith('REF')) brand = 'REFRESH';
      else if (bUpper.includes('XTI') || sku.toUpperCase().startsWith('XTI')) brand = 'XTI';
      else if (bUpper.includes('GIULIA')) brand = 'GIULIA DOMNA';
      else if (bUpper.includes('SEAWALK')) brand = 'SEAWALK';
      else if (bUpper.includes('CARMELA')) brand = 'CARMELA';
      else if (bUpper.includes('GATICAR')) brand = 'GATICAR';
      else if (!brand || brand.includes('DANIEL')) brand = 'SKY BLUE';

      // Rubro (Category)
      const textWithoutTags = td1.replace(/<[^>]+>/g, ' ');
      const allParens = [...textWithoutTags.matchAll(/\(([^)]+)\)/g)].map(m => m[1].trim());
      let rawRubro = 'Calzado';
      for (const p of allParens) {
        const pUpper = p.toUpperCase();
        if (pUpper.includes('SKY BLUE') || pUpper.includes('DANIEL') || pUpper.includes('GATICAR') || pUpper.includes('ALEJANDRO') || pUpper.includes('GRASSO')) continue;
        if (/^\d{2}[\/\-]\d{2}$/.test(pUpper) || pUpper.includes('CALZADO')) continue;
        rawRubro = decodeHtml(p);
        break;
      }
      const rubro = normalizeRubro(rawRubro);

      // Span Content / Season & Model Name
      const spanMatch = td1.match(/<span>([\s\S]*?)<\/span>/i);
      let season = 'Todo el año';
      let modelDesc = '';
      if (spanMatch) {
        const spanContent = decodeHtml(spanMatch[1]);
        const lines = spanContent.split(/<br\s*\/?>|\n/).map(l => l.trim()).filter(Boolean);
        if (lines.length > 0) season = lines[0].split('-')[0].trim() || 'Todo el año';
        if (lines.length > 1) modelDesc = lines[1].trim();
      }

      // Color
      const color = extractColor(`${td1} ${modelDesc}`);

      // Formula exact: SKU - *Rubro - *Color
      const title = `${sku} - ${rubro} - ${color}`;

      // Prices
      let priceCost = cleanMoney(tds[3]);
      if (priceCost <= 10) priceCost = 18500;

      let l1Cash = cleanMoney(tds[4]);
      if (l1Cash <= 10) l1Cash = Math.round(priceCost * 2.2);

      let l2Mayorista = cleanMoney(tds[5]);
      if (l2Mayorista <= 10) l2Mayorista = Math.round(priceCost * 1.5);

      let l3MayoristaEsp = cleanMoney(tds[6]);
      if (l3MayoristaEsp <= 10) l3MayoristaEsp = Math.round(priceCost * 1.4);

      let l4Stores = cleanMoney(tds[7]);
      if (l4Stores <= 10) l4Stores = Math.round(priceCost * 1.35);

      let l5CashOutlet = cleanMoney(tds[8]);
      if (l5CashOutlet <= 10) l5CashOutlet = Math.round(priceCost * 1.6);

      let l6CC2 = cleanMoney(tds[9]);
      if (l6CC2 <= 10) l6CC2 = Math.round(priceCost * 1.45);

      // Stock
      const stockIpn = cleanStock(tds[2]);

      // Real Image mapping
      const cleanSkuUpper = sku.toUpperCase().replace(/\s+/g, '');
      let mainImage = imageMap.get(cleanSkuUpper);
      if (!mainImage) {
        for (const [imgSku, imgPath] of imageMap.entries()) {
          if (imgSku.includes(cleanSkuUpper) || cleanSkuUpper.includes(imgSku)) {
            mainImage = imgPath;
            break;
          }
        }
      }
      if (!mainImage) {
        if (rubro === 'Zapatilla') {
          mainImage = 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop';
        } else if (rubro === 'Sandalia') {
          mainImage = 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=800&auto=format&fit=crop';
        } else if (rubro === 'Bota' || rubro === 'Borcego' || rubro === 'Texana') {
          mainImage = 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop';
        } else if (rubro === 'Cartera' || rubro === 'Bolso' || rubro === 'Mochila') {
          mainImage = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop';
        } else {
          mainImage = 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=800&auto=format&fit=crop';
        }
      }

      let finalSku = sku;
      const count = (seenSkus.get(sku) || 0) + 1;
      seenSkus.set(sku, count);
      if (count > 1) finalSku = `${sku}-${count}`;

      parsedItems.push({
        sku: finalSku,
        brand,
        rubro,
        category: rubro,
        season,
        title,
        description: modelDesc ? `${modelDesc} - ${brand}` : `${rubro} ${brand}`,
        color,
        priceCost,
        l1Cash,
        l2Mayorista,
        l3MayoristaEsp,
        l4Stores,
        l5CashOutlet,
        l6CC2,
        stockIpn,
        mainImage
      });
    }
  }

  console.log(`Total artículos parseados: ${parsedItems.length}`);

  // Wipe clean and build metadata
  console.log('Limpiando base de datos...');
  await prisma.$executeRawUnsafe(`PRAGMA foreign_keys = OFF;`);
  await prisma.$executeRawUnsafe(`PRAGMA synchronous = OFF;`);
  await prisma.$executeRawUnsafe(`DELETE FROM StockMovement;`);
  await prisma.$executeRawUnsafe(`DELETE FROM ShipmentItem;`);
  await prisma.$executeRawUnsafe(`DELETE FROM OrderItem;`);
  await prisma.$executeRawUnsafe(`DELETE FROM StockByWarehouse;`);
  await prisma.$executeRawUnsafe(`DELETE FROM ProductVariantSize;`);
  await prisma.$executeRawUnsafe(`DELETE FROM ProductColor;`);
  await prisma.$executeRawUnsafe(`DELETE FROM ProductPrice;`);
  await prisma.$executeRawUnsafe(`DELETE FROM Product;`);
  await prisma.$executeRawUnsafe(`DELETE FROM Category;`);
  await prisma.$executeRawUnsafe(`DELETE FROM Brand;`);
  await prisma.$executeRawUnsafe(`DELETE FROM Season;`);
  await prisma.$executeRawUnsafe(`DELETE FROM ProductType;`);
  await prisma.$executeRawUnsafe(`DELETE FROM PriceList;`);
  await prisma.$executeRawUnsafe(`DELETE FROM Warehouse;`);
  await prisma.$executeRawUnsafe(`DELETE FROM Company;`);

  const now = new Date().toISOString();

  // 1. Companies
  await prisma.$executeRawUnsafe(`
    INSERT INTO Company (id, name, businessName, cuit, taxCondition, createdAt, updatedAt)
    VALUES 
      (1, 'SkyBlue Mayorista', 'DANIEL ALEJANDRO GRASSO', '20-26038216-1', 'IVA Responsable Inscripto', '${now}', '${now}'),
      (2, 'GATICAR', 'GATICAR S.R.L.', '30-71257700-9', 'IVA Responsable Inscripto', '${now}', '${now}');
  `);

  // 2. Warehouses
  await prisma.$executeRawUnsafe(`
    INSERT INTO Warehouse (id, code, name, type, address, companyId, createdAt, updatedAt)
    VALUES
      (1, 'DEP_GRAL_SHOWROOM', 'Depósito General (Showroom Mayorista - Tapiales)', 'SHOWROOM_WHOLESALE', 'Showroom Central Tapiales', 1, '${now}', '${now}'),
      (2, 'OUTLET_TAPIALES', 'Outlet SkyBlue Tapiales (Curapaligue 1428 + Web)', 'RETAIL_ONLINE_OUTLET', 'Curapaligue 1428, Tapiales', 1, '${now}', '${now}'),
      (3, 'SBW_CANNING', 'SBW Canning', 'STORAGE', 'Canning, Buenos Aires', 1, '${now}', '${now}'),
      (4, 'DEP_CANUELAS', 'SkyBlue Cañuelas', 'STORAGE', 'Av. Libertad 1190, Cañuelas', 1, '${now}', '${now}'),
      (5, 'ADMIN_GATICAR', 'Admin Gaticar', 'STORAGE', 'Centro Administrativo Gaticar', 2, '${now}', '${now}');
  `);

  // 3. Price Lists (1 to 10)
  await prisma.$executeRawUnsafe(`
    INSERT INTO PriceList (id, listNumber, name, description, markupPercent, currency, isDefault, createdAt, updatedAt)
    VALUES
      (1, 1, 'Lista 1 - Público Cash / Minorista', 'Precio de venta al público en efectivo', 120.0, 'ARS', 0, '${now}', '${now}'),
      (2, 2, 'Lista 2 - Mayorista Cuenta Corriente', 'Precio oficial mayorista por curva cerrada', 50.0, 'ARS', 1, '${now}', '${now}'),
      (3, 3, 'Lista 3 - Mayorista Especial', 'Clientes VIP y volumen alto', 40.0, 'ARS', 0, '${now}', '${now}'),
      (4, 4, 'Lista 4 - Stores y Locales Propios', 'Transferencias internas a sucursales', 35.0, 'ARS', 0, '${now}', '${now}'),
      (5, 5, 'Lista 5 - Cash Outlet Curapaligue', 'Venta directa en mostrador outlet', 60.0, 'ARS', 0, '${now}', '${now}'),
      (6, 6, 'Lista 6 - Clientes Especiales 2', 'Convenios mayoristas especiales', 45.0, 'ARS', 0, '${now}', '${now}'),
      (7, 7, 'Lista 7 - Gran Distribuidor Interior', 'Distribuidores regionales por bulto', 38.0, 'ARS', 0, '${now}', '${now}'),
      (8, 8, 'Lista 8 - Revendedores Online', 'Drop shipping y revendedores digitales', 55.0, 'ARS', 0, '${now}', '${now}'),
      (9, 9, 'Lista 9 - Exportación Regional (USD)', 'Ventas internacionales en dólares', 25.0, 'USD', 0, '${now}', '${now}'),
      (10, 10, 'Lista 10 - Liquidación Fin de Temporada', 'Discontinuos y saldos de stock', 15.0, 'ARS', 0, '${now}', '${now}');
  `);

  // 4. Product Type
  await prisma.$executeRawUnsafe(`
    INSERT INTO ProductType (id, name, family, sizesList, createdAt, updatedAt)
    VALUES (1, 'Calzado Dama (35-40)', 'Calzado', '35, 36, 37, 38, 39, 40', '${now}', '${now}');
  `);

  // 5. Brands
  const uniqueBrands = [...new Set(parsedItems.map(p => p.brand))];
  const brandMap = new Map();
  for (let bIdx = 0; bIdx < uniqueBrands.length; bIdx++) {
    const bName = uniqueBrands[bIdx];
    const bId = bIdx + 1;
    const slug = `brand-${bId}-${bName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    await prisma.$executeRawUnsafe(`
      INSERT INTO Brand (id, name, slug, createdAt, updatedAt)
      VALUES (${bId}, '${bName.replace(/'/g, "''")}', '${slug}', '${now}', '${now}');
    `);
    brandMap.set(bName, bId);
  }

  // 6. Categories (Rubros)
  const uniqueRubros = [...new Set(parsedItems.map(p => p.rubro))];
  const catMap = new Map();
  for (let cIdx = 0; cIdx < uniqueRubros.length; cIdx++) {
    const cName = uniqueRubros[cIdx];
    const cId = cIdx + 1;
    const slug = `cat-${cId}-${cName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    await prisma.$executeRawUnsafe(`
      INSERT INTO Category (id, name, slug, createdAt, updatedAt)
      VALUES (${cId}, '${cName.replace(/'/g, "''")}', '${slug}', '${now}', '${now}');
    `);
    catMap.set(cName, cId);
  }

  // 7. Seasons
  const uniqueSeasons = [...new Set(parsedItems.map(p => p.season))];
  const seasonMap = new Map();
  for (let sIdx = 0; sIdx < uniqueSeasons.length; sIdx++) {
    const sName = uniqueSeasons[sIdx];
    const sId = sIdx + 1;
    await prisma.$executeRawUnsafe(`
      INSERT INTO Season (id, name, code, isActive, createdAt, updatedAt)
      VALUES (${sId}, '${sName.replace(/'/g, "''")}', 'SEA_${sId}', 1, '${now}', '${now}');
    `);
    seasonMap.set(sName, sId);
  }

  console.log('Insertando masivamente los 3.264 productos en SQLite...');

  let pId = 0;
  let colorId = 0;
  let sizeId = 0;
  let priceId = 0;
  let stockId = 0;

  const sizes = ['35', '36', '37', '38', '39', '40'];
  const CHUNK_SIZE = 100;

  for (let i = 0; i < parsedItems.length; i += CHUNK_SIZE) {
    const chunk = parsedItems.slice(i, i + CHUNK_SIZE);
    
    let productSql = [];
    let priceSql = [];
    let colorSql = [];
    let sizeSql = [];
    let stockSql = [];

    for (const p of chunk) {
      pId++;
      const currentPid = pId;
      const bId = brandMap.get(p.brand) || 1;
      const cId = catMap.get(p.rubro) || 1;
      const sId = seasonMap.get(p.season) || 1;

      const safeSku = p.sku.replace(/'/g, "''");
      const safeTitle = p.title.replace(/'/g, "''");
      const safeDesc = p.description.replace(/'/g, "''");
      const safeImg = p.mainImage.replace(/'/g, "''");

      productSql.push(`(${currentPid}, '${safeSku}', '${safeTitle}', '${safeDesc}', ${bId}, ${sId}, ${cId}, 1, ${p.priceCost}, 1, 0, 1, '${safeImg}', '${now}', '${now}')`);

      // 10 Prices
      const p1 = p.l1Cash;
      const p2 = p.l2Mayorista;
      const p3 = p.l3MayoristaEsp;
      const p4 = p.l4Stores;
      const p5 = p.l5CashOutlet;
      const p6 = p.l6CC2;
      const p7 = Math.round(p2 * 0.92);
      const p8 = Math.round(p2 * 1.05);
      const p9 = Math.round(p.priceCost / 1200);
      const p10 = Math.round(p5 * 0.85);

      const prValues = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];
      for (let plIdx = 1; plIdx <= 10; plIdx++) {
        priceId++;
        priceSql.push(`(${priceId}, ${currentPid}, ${plIdx}, ${prValues[plIdx - 1]}, '${now}', '${now}')`);
      }

      // Color
      colorId++;
      const currentColorId = colorId;
      const safeColor = p.color.replace(/'/g, "''");
      colorSql.push(`(${currentColorId}, ${currentPid}, 'COL_${safeColor}', '${safeColor}', '#1e293b', '${now}', '${now}')`);

      // Sizes & Stocks
      const totalStock = p.stockIpn || 0;
      const basePerSize = Math.floor(totalStock / 6);
      const remainder = totalStock % 6;

      for (let sIdx = 0; sIdx < sizes.length; sIdx++) {
        sizeId++;
        const currentSizeId = sizeId;
        const sNum = sizes[sIdx];
        const eanSuffix = String(currentPid).padStart(6, '0') + String(sNum);
        const barcode = `7798123${eanSuffix}`.slice(0, 13);

        sizeSql.push(`(${currentSizeId}, ${currentColorId}, '${sNum}', '${barcode}', 1, '${now}', '${now}')`);

        const sizeQty = basePerSize + (sIdx < remainder ? 1 : 0);
        const showroomQty = Math.round(sizeQty * 0.6);
        const outletQty = sizeQty - showroomQty;

        // Stock Showroom (WH 1)
        stockId++;
        stockSql.push(`(${stockId}, 1, ${currentSizeId}, ${showroomQty}, 0, 0, 0, '${now}', '${now}')`);

        // Stock Outlet Curapaligue (WH 2)
        stockId++;
        stockSql.push(`(${stockId}, 2, ${currentSizeId}, ${outletQty}, 0, 0, 0, '${now}', '${now}')`);

        // Stock Canning (WH 3)
        stockId++;
        stockSql.push(`(${stockId}, 3, ${currentSizeId}, 0, 0, 0, 0, '${now}', '${now}')`);

        // Stock Cañuelas (WH 4)
        stockId++;
        stockSql.push(`(${stockId}, 4, ${currentSizeId}, 0, 0, 0, 0, '${now}', '${now}')`);
      }
    }

    // Execute bulk chunk insert
    await prisma.$executeRawUnsafe(`
      INSERT INTO Product (id, sku, title, description, brandId, seasonId, categoryId, productTypeId, priceCost, isPublishedWeb, isFeatured, isB2BPublished, mainImage, createdAt, updatedAt)
      VALUES ${productSql.join(',\n')};
    `);

    await prisma.$executeRawUnsafe(`
      INSERT INTO ProductPrice (id, productId, priceListId, priceAmount, createdAt, updatedAt)
      VALUES ${priceSql.join(',\n')};
    `);

    await prisma.$executeRawUnsafe(`
      INSERT INTO ProductColor (id, productId, colorCode, colorName, hexCode, createdAt, updatedAt)
      VALUES ${colorSql.join(',\n')};
    `);

    await prisma.$executeRawUnsafe(`
      INSERT INTO ProductVariantSize (id, productColorId, sizeNumber, barcodeEan13, packageRatio, createdAt, updatedAt)
      VALUES ${sizeSql.join(',\n')};
    `);

    await prisma.$executeRawUnsafe(`
      INSERT INTO StockByWarehouse (id, warehouseId, variantSizeId, physicalStock, committedStock, reservedStock, inTransitStock, createdAt, updatedAt)
      VALUES ${stockSql.join(',\n')};
    `);

    console.log(`Insertados ${Math.min(i + CHUNK_SIZE, parsedItems.length)} de ${parsedItems.length} productos...`);
  }

  console.log('=== ¡SEMBRADO ULTRARRÁPIDO FINALIZADO CON ÉXITO! ===');
}

fastCleanReseed()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
