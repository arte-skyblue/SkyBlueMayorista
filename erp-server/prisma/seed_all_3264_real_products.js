import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'item';
}

async function main() {
  console.log('=== SEMBRANDO EL CATÁLOGO COMPLETO DE 3.264 PRODUCTOS REALES DE IPN ===');

  const rawJsonPath = path.resolve('../data/real_ipn_export/master_complete_3264_products.json');
  if (!fs.existsSync(rawJsonPath)) {
    console.error('No se encontró master_complete_3264_products.json');
    return;
  }

  const rawProducts = JSON.parse(fs.readFileSync(rawJsonPath, 'utf8'));
  console.log(`Total productos a procesar: ${rawProducts.length}`);

  // 1. Ensure Brands
  const uniqueBrands = [...new Set(rawProducts.map(p => p.brand))];
  const brandMap = new Map();
  for (const b of uniqueBrands) {
    const slug = slugify(b);
    const brand = await prisma.brand.upsert({
      where: { name: b },
      update: {},
      create: { name: b, slug: `${slug}-${Math.floor(Math.random()*10000)}` }
    });
    brandMap.set(b, brand.id);
  }

  // 2. Ensure Categories
  const uniqueCategories = [...new Set(rawProducts.map(p => p.category))];
  const categoryMap = new Map();
  for (const c of uniqueCategories) {
    const slug = slugify(c);
    const cat = await prisma.category.upsert({
      where: { name: c },
      update: {},
      create: { name: c, slug: `${slug}-${Math.floor(Math.random()*10000)}` }
    });
    categoryMap.set(c, cat.id);
  }

  // 3. Ensure Seasons
  const uniqueSeasons = [...new Set(rawProducts.map(p => p.season))];
  const seasonMap = new Map();
  for (const s of uniqueSeasons) {
    const season = await prisma.season.upsert({
      where: { name: s },
      update: {},
      create: {
        name: s,
        code: s.toUpperCase().replace(/\s+/g, '_').slice(0, 20),
        isActive: true
      }
    });
    seasonMap.set(s, season.id);
  }

  // 4. Product Types (Curves)
  const defaultCurve = await prisma.productType.upsert({
    where: { name: 'Calzado Dama (35-40)' },
    update: {},
    create: {
      name: 'Calzado Dama (35-40)',
      family: 'Calzado',
      sizesList: '35, 36, 37, 38, 39, 40'
    }
  });

  // 5. Price Lists
  const priceLists = await prisma.priceList.findMany();
  const plMap = new Map();
  priceLists.forEach(pl => plMap.set(pl.listNumber, pl.id));

  // 6. Warehouses
  const depGral = await prisma.warehouse.findUnique({ where: { code: 'DEP_GRAL_SHOWROOM' } });
  const outlet = await prisma.warehouse.findUnique({ where: { code: 'OUTLET_TAPIALES' } });
  const canning = await prisma.warehouse.findUnique({ where: { code: 'SBW_CANNING' } });
  const canuelas = await prisma.warehouse.findUnique({ where: { code: 'DEP_CANUELAS' } });

  console.log('Limpiando tablas anteriores de productos...');
  await prisma.stockMovement.deleteMany();
  await prisma.shipmentItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.stockByWarehouse.deleteMany();
  await prisma.productVariantSize.deleteMany();
  await prisma.productColor.deleteMany();
  await prisma.productPrice.deleteMany();
  await prisma.product.deleteMany();

  console.log('Insertando 3.264 productos reales por lotes en SQLite...');
  const BATCH_SIZE = 50;
  const sizes = ['35', '36', '37', '38', '39', '40'];
  const seenSkus = new Map();

  for (let i = 0; i < rawProducts.length; i += BATCH_SIZE) {
    const batch = rawProducts.slice(i, i + BATCH_SIZE);
    
    await prisma.$transaction(
      batch.map((p, idx) => {
        const brandId = brandMap.get(p.brand) || brandMap.get('SKY BLUE');
        const categoryId = categoryMap.get(p.category) || categoryMap.get('Calzado');
        const seasonId = seasonMap.get(p.season) || seasonMap.get('Todo el año');

        const baseCost = p.priceCost || 18500;
        const l2Mayorista = p.wholesalePrice || Math.round(baseCost * 1.5);
        const l1Publico = p.retailPrice || Math.round(baseCost * 2.0);

        // Precompute price list entries
        const pricesData = [];
        for (let num = 1; num <= 10; num++) {
          const plId = plMap.get(num);
          if (plId) {
            let amount = l2Mayorista;
            if (num === 1) amount = l1Publico;
            else if (num === 2) amount = l2Mayorista;
            else if (num === 3) amount = l2Mayorista;
            else if (num === 4) amount = Math.round(baseCost * 1.25);
            else if (num === 5) amount = Math.round(baseCost * 1.15);
            else if (num === 6) amount = Math.round(baseCost * 1.35);
            else if (num === 7) amount = Math.round(baseCost * 1.80);
            else if (num === 8) amount = Math.round(baseCost * 1.60);
            else if (num === 9) amount = Math.round(baseCost * 2.50);
            else if (num === 10) amount = Math.round(baseCost / 1200); // USD
            pricesData.push({ priceListId: plId, priceAmount: amount });
          }
        }

        // Handle unique SKU
        let finalSku = p.sku;
        const count = (seenSkus.get(p.sku) || 0) + 1;
        seenSkus.set(p.sku, count);
        if (count > 1) {
          finalSku = `${p.sku}-${count}`;
        }

        // Realistic stock
        const globalIdx = i + idx;
        const depGralStock = (globalIdx % 4 === 0) ? 0 : ((globalIdx % 9) + 2) * 6;
        const outletStock = (globalIdx % 3 === 0) ? 0 : ((globalIdx % 5) + 1) * 3;
        const canningStock = (globalIdx % 5 === 0) ? 0 : 4;
        const canuelasStock = (globalIdx % 6 === 0) ? 0 : 3;
        const inTransitStock = (globalIdx % 7 === 0) ? 24 : 0;

        return prisma.product.create({
          data: {
            sku: finalSku,
            title: p.title,
            description: p.description,
            brandId,
            categoryId,
            seasonId,
            productTypeId: defaultCurve.id,
            priceCost: baseCost,
            isPublishedWeb: globalIdx % 2 === 0,
            isFeatured: globalIdx % 10 === 0,
            isB2BPublished: true,
            mainImage: p.mainImage,
            prices: { create: pricesData },
            colors: {
              create: [
                {
                  colorName: p.color || 'Negro',
                  hexCode: p.color === 'Nude' ? '#e8c5a8' : (p.color === 'Arena' ? '#d9c9ba' : (p.color === 'Blanco' ? '#ffffff' : (p.color === 'Dulce de Leche' ? '#9c6644' : '#111111'))),
                  sizes: {
                    create: sizes.map((sz, szIdx) => ({
                      sizeNumber: sz,
                      barcodeEan13: `7798${String(globalIdx).padStart(6, '0')}${szIdx}1`,
                      stocks: {
                        create: [
                          { warehouseId: depGral.id, physicalStock: Math.floor(depGralStock / 6), inTransitStock: Math.floor(inTransitStock / 6), committedStock: 0 },
                          { warehouseId: outlet.id, physicalStock: Math.floor(outletStock / 6), inTransitStock: 0, committedStock: 0 },
                          { warehouseId: canning.id, physicalStock: Math.floor(canningStock / 6), inTransitStock: 0, committedStock: 0 },
                          { warehouseId: canuelas.id, physicalStock: Math.floor(canuelasStock / 6), inTransitStock: 0, committedStock: 0 }
                        ]
                      }
                    }))
                  }
                }
              ]
            }
          }
        });
      })
    );

    console.log(`  -> Insertados ${Math.min(i + BATCH_SIZE, rawProducts.length)} de ${rawProducts.length} productos reales...`);
  }

  console.log('=== CARGA DE LOS 3.264 PRODUCTOS REALES COMPLETADA CON ÉXITO ===');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
