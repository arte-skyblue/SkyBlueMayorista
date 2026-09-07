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

async function reseedCleanNomenclatureAndPhotos() {
  console.log('=== RE-SEMBRADO CON NOMENCLATURA EXACTA (SKU - RUBRO - COLOR) Y FOTOS REALES ===');
  
  const pagesDir = path.resolve('../data/real_ipn_export/all_pages');
  const files = fs.readdirSync(pagesDir).filter(f => f.startsWith('page_') && f.endsWith('.html'));

  // Build images index
  const imagesBaseDir = path.resolve('../public/product-images');
  const imageMap = new Map(); // normalizedSku -> relativeUrl
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

      // TD 1: Data block
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
      const allParens = [...td1.matchAll(/\(([^)]+)\)/g)].map(m => m[1].trim());
      let rawRubro = 'Calzado';
      for (const p of allParens) {
        const pUpper = p.toUpperCase();
        if (pUpper.includes('SKY BLUE') || pUpper.includes('DANIEL') || pUpper.includes('GATICAR')) continue;
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

      // Formula exact: SKU - *Rubro - *Color (e.g. "REF175019 - Zapatilla - Negro")
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

      // Handle duplicate SKUs cleanly
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

  console.log(`Total artículos parseados con nomenclatura exacta: ${parsedItems.length}`);

  // Fetch warehouses and price lists
  const depGral = await prisma.warehouse.findUnique({ where: { code: 'DEP_GRAL_SHOWROOM' } });
  const outlet = await prisma.warehouse.findUnique({ where: { code: 'OUTLET_TAPIALES' } });
  const canning = await prisma.warehouse.findUnique({ where: { code: 'SBW_CANNING' } });
  const canuelas = await prisma.warehouse.findUnique({ where: { code: 'DEP_CANUELAS' } });

  const priceLists = await prisma.priceList.findMany();
  const plMap = new Map();
  priceLists.forEach(pl => plMap.set(pl.listNumber, pl.id));

  console.log('Indexando marcas...');
  const uniqueBrands = [...new Set(parsedItems.map(p => p.brand))];
  const brandMap = new Map();
  for (const bName of uniqueBrands) {
    const slug = bName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const b = await prisma.brand.upsert({
      where: { name: bName },
      update: {},
      create: { name: bName, slug }
    });
    brandMap.set(bName, b.id);
  }

  console.log('Indexando rubros/categorías...');
  const uniqueRubros = [...new Set(parsedItems.map(p => p.rubro))];
  const catMap = new Map();
  for (const cName of uniqueRubros) {
    const slug = cName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const c = await prisma.category.upsert({
      where: { name: cName },
      update: {},
      create: { name: cName, slug }
    });
    catMap.set(cName, c.id);
  }

  console.log('Indexando temporadas...');
  const uniqueSeasons = [...new Set(parsedItems.map(p => p.season))];
  const seasonMap = new Map();
  for (let sIdx = 0; sIdx < uniqueSeasons.length; sIdx++) {
    const sName = uniqueSeasons[sIdx];
    const s = await prisma.season.upsert({
      where: { name: sName },
      update: {},
      create: { name: sName, code: `SEA_${sIdx}_${sName.slice(0, 10).toUpperCase().replace(/[^A-Z0-9]/g, '_')}` }
    });
    seasonMap.set(sName, s.id);
  }

  let defaultProductType = await prisma.productType.findFirst();
  if (!defaultProductType) {
    defaultProductType = await prisma.productType.create({
      data: {
        name: 'Calzado Dama (35-40)',
        family: 'Calzado',
        sizesList: '35, 36, 37, 38, 39, 40'
      }
    });
  }

  console.log('Limpiando base de datos SQLite antes de la inserción masiva...');
  await prisma.stockMovement.deleteMany();
  await prisma.shipmentItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.stockByWarehouse.deleteMany();
  await prisma.productVariantSize.deleteMany();
  await prisma.productColor.deleteMany();
  await prisma.productPrice.deleteMany();
  await prisma.product.deleteMany();

  console.log('Sembrando 3.264 productos con nomenclatura limpia y fotos...');
  const BATCH_SIZE = 50;
  const sizes = ['35', '36', '37', '38', '39', '40'];

  for (let i = 0; i < parsedItems.length; i += BATCH_SIZE) {
    const batch = parsedItems.slice(i, i + BATCH_SIZE);

    await prisma.$transaction(
      batch.map((p, idx) => {
        const globalIdx = i + idx + 1;
        const brandId = brandMap.get(p.brand);
        const categoryId = catMap.get(p.rubro);
        const seasonId = seasonMap.get(p.season);

        // Prices
        const pricesData = [
          { priceListId: plMap.get(1) || 1, priceAmount: p.l1Cash },
          { priceListId: plMap.get(2) || 2, priceAmount: p.l2Mayorista },
          { priceListId: plMap.get(3) || 3, priceAmount: p.l3MayoristaEsp },
          { priceListId: plMap.get(4) || 4, priceAmount: p.l4Stores },
          { priceListId: plMap.get(5) || 5, priceAmount: p.l5CashOutlet },
          { priceListId: plMap.get(6) || 6, priceAmount: p.l6CC2 },
          { priceListId: plMap.get(7) || 7, priceAmount: Math.round(p.l2Mayorista * 0.92) },
          { priceListId: plMap.get(8) || 8, priceAmount: Math.round(p.l2Mayorista * 1.05) },
          { priceListId: plMap.get(9) || 9, priceAmount: Math.round(p.priceCost / 1200) },
          { priceListId: plMap.get(10) || 10, priceAmount: Math.round(p.l5CashOutlet * 0.85) }
        ];

        // Stock curve calculation
        const totalStock = p.stockIpn || 0;
        const basePerSize = Math.floor(totalStock / 6);
        const remainder = totalStock % 6;

        return prisma.product.create({
          data: {
            sku: p.sku,
            title: p.title,
            description: p.description,
            priceCost: p.priceCost,
            mainImage: p.mainImage,
            brandId,
            categoryId,
            seasonId,
            productTypeId: defaultProductType.id,
            isPublishedWeb: true,
            isB2BPublished: true,
            prices: {
              create: pricesData
            },
            colors: {
              create: [
                {
                  colorName: p.color,
                  colorCode: 'COL_' + p.color.toUpperCase().replace(/\s+/g, '_'),
                  hexCode: '#1e293b',
                  sizes: {
                    create: sizes.map((sNum, sIdx) => {
                      const eanSuffix = String(globalIdx).padStart(6, '0') + String(sNum);
                      const barcodeEan13 = `7798123${eanSuffix}`.slice(0, 13);
                      const sizeQty = basePerSize + (sIdx < remainder ? 1 : 0);
                      const showroomQty = Math.round(sizeQty * 0.6);
                      const outletQty = sizeQty - showroomQty;

                      return {
                        sizeNumber: sNum,
                        barcodeEan13,
                        packageRatio: 1,
                        stocks: {
                          create: [
                            {
                              warehouseId: depGral.id,
                              physicalStock: showroomQty,
                              availableStock: showroomQty,
                              inTransitStock: 0,
                              committedStock: 0
                            },
                            {
                              warehouseId: outlet.id,
                              physicalStock: outletQty,
                              availableStock: outletQty,
                              inTransitStock: 0,
                              committedStock: 0
                            },
                            {
                              warehouseId: canning.id,
                              physicalStock: 0,
                              availableStock: 0,
                              inTransitStock: 0,
                              committedStock: 0
                            },
                            {
                              warehouseId: canuelas.id,
                              physicalStock: 0,
                              availableStock: 0,
                              inTransitStock: 0,
                              committedStock: 0
                            }
                          ]
                        }
                      };
                    })
                  }
                }
              ]
            }
          }
        });
      })
    );

    console.log(`Guardados ${Math.min(i + BATCH_SIZE, parsedItems.length)} de ${parsedItems.length} productos...`);
  }

  console.log('=== ¡RE-SEMBRADO DE PRODUCTOS COMPLETADO CON ÉXITO! ===');
}

reseedCleanNomenclatureAndPhotos()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
