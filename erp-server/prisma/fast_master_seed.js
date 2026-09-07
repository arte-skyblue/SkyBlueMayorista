import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function fastMasterSeed() {
  console.log('=== SEEDING ULTRARÁPIDO CON NOMENCLATURA EXACTA Y 4 SUCURSALES ===');

  const catalogPath = path.resolve('../data/real_ipn_export/complete_master_catalog.json');
  const custsPath = path.resolve('../data/real_ipn_export/all_parsed_real_customers.json');
  const transportsPath = path.resolve('../data/real_ipn_export/parsed_transports.json');

  const masterCatalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const realCustomers = JSON.parse(fs.readFileSync(custsPath, 'utf8'));
  let transportsList = [];
  if (fs.existsSync(transportsPath)) {
    transportsList = JSON.parse(fs.readFileSync(transportsPath, 'utf8'));
  }

  // Clear products to have clean titles and relations
  console.log('Limpiando tablas de catálogo...');
  await prisma.stockMovement.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.shipmentItem.deleteMany({});
  await prisma.stockByWarehouse.deleteMany({});
  await prisma.productVariantSize.deleteMany({});
  await prisma.productColor.deleteMany({});
  await prisma.productPrice.deleteMany({});
  await prisma.product.deleteMany({});

  // 1. Companies
  const grasso = await prisma.company.upsert({
    where: { cuit: '20260382161' },
    update: {},
    create: {
      name: 'SKY BLUE',
      businessName: 'DANIEL ALEJANDRO GRASSO',
      cuit: '20260382161',
      taxCondition: 'IVA Responsable Inscripto'
    }
  });

  const gaticar = await prisma.company.upsert({
    where: { cuit: '30712577009' },
    update: {},
    create: {
      name: 'GATICAR',
      businessName: 'GATICAR S.A.',
      cuit: '30712577009',
      taxCondition: 'IVA Responsable Inscripto'
    }
  });

  // 2. Warehouses (All 4 exact user requested active warehouses)
  const depGeneral = await prisma.warehouse.upsert({
    where: { code: 'DEP_GRAL_SHOWROOM' },
    update: {
      name: 'Depósito General (Showroom Mayorista - Tapiales)',
      address: 'Showroom Central Tapiales',
      type: 'SHOWROOM_WHOLESALE'
    },
    create: {
      code: 'DEP_GRAL_SHOWROOM',
      name: 'Depósito General (Showroom Mayorista - Tapiales)',
      type: 'SHOWROOM_WHOLESALE',
      address: 'Showroom Central Tapiales',
      companyId: grasso.id
    }
  });

  const outletTapiales = await prisma.warehouse.upsert({
    where: { code: 'OUTLET_TAPIALES' },
    update: {
      name: 'Outlet > SkyBlue Tapiales (Local en Curapaligue 1428 + Stock Tienda Web Minorista www.skyblue.com.ar / Tiendanube / Mercado Libre)',
      address: 'Curapaligue 1428 - Tapiales',
      type: 'RETAIL_ONLINE_OUTLET'
    },
    create: {
      code: 'OUTLET_TAPIALES',
      name: 'Outlet > SkyBlue Tapiales (Local en Curapaligue 1428 + Stock Tienda Web Minorista www.skyblue.com.ar / Tiendanube / Mercado Libre)',
      type: 'RETAIL_ONLINE_OUTLET',
      address: 'Curapaligue 1428 - Tapiales',
      companyId: grasso.id
    }
  });

  const sbwCanning = await prisma.warehouse.upsert({
    where: { code: 'SBW_CANNING' },
    update: {
      name: 'SBW Canning',
      address: 'Canning - Buenos Aires',
      type: 'RETAIL_LOCAL'
    },
    create: {
      code: 'SBW_CANNING',
      name: 'SBW Canning',
      type: 'RETAIL_LOCAL',
      address: 'Canning - Buenos Aires',
      companyId: gaticar.id
    }
  });

  const depCanuelas = await prisma.warehouse.upsert({
    where: { code: 'DEP_CANUELAS' },
    update: {
      name: 'SkyBlue Cañuelas (Local en Av. Libertad 1190)',
      address: 'Av. Libertad 1190, Cañuelas - Buenos Aires',
      type: 'RETAIL_LOCAL'
    },
    create: {
      code: 'DEP_CANUELAS',
      name: 'SkyBlue Cañuelas (Local en Av. Libertad 1190)',
      type: 'RETAIL_LOCAL',
      address: 'Av. Libertad 1190, Cañuelas - Buenos Aires',
      companyId: grasso.id
    }
  });

  // 3. Transports
  console.log('Sembrando transportes...');
  const keyTransports = [
    { name: 'VÍA CARGO', address: 'Depósito Central', phone: '0810-222-7722', contact: 'Atención Envíos' },
    { name: 'ANDREANI', address: 'Planta Operativa', phone: '0810-122-1111', contact: 'Logística B2B' },
    { name: 'CRUZ DEL SUR', address: 'Terminal Cargas', phone: '0800-444-2789', contact: 'Despachos Interior' },
    { name: 'EXPRESO BRIO', address: 'Centro de Distribución', phone: '11-4912-3344', contact: 'Recepción' },
    { name: 'MORABITO', address: 'Parque Patricios', phone: '11-4918-5566', contact: 'Despachos Cuyo' },
    { name: 'OCA LOGÍSTICA', address: 'Centro Logístico', phone: '0800-999-7700', contact: 'E-commerce' }
  ];

  for (const t of keyTransports) {
    await prisma.transport.upsert({
      where: { name: t.name },
      update: t,
      create: t
    });
  }

  for (const tr of transportsList.slice(0, 50)) {
    const tName = tr.address?.trim() || tr.name;
    if (tName && tName.length > 2) {
      await prisma.transport.upsert({
        where: { name: tName.slice(0, 60) },
        update: { code: tr.name, address: tr.address, phone: tr.contact || '' },
        create: { name: tName.slice(0, 60), code: tr.name, address: tr.address, phone: tr.contact || '' }
      }).catch(() => {});
    }
  }

  // 4. Brands, Seasons, Categories, ProductTypes, PriceLists
  const brandsData = [
    { name: 'PETITE JOLIE', slug: 'petite-jolie' },
    { name: 'REFRESH', slug: 'refresh' },
    { name: 'XTI BY SKY BLUE', slug: 'xti' },
    { name: 'GIULIA DOMNA', slug: 'giulia-domna' },
    { name: 'SKY BLUE', slug: 'skyblue' },
    { name: 'GATICAR', slug: 'gaticar' }
  ];
  const brandMap = {};
  for (const b of brandsData) {
    const res = await prisma.brand.upsert({ where: { name: b.name }, update: b, create: b });
    brandMap[b.name] = res.id;
  }

  const seasonsData = [
    { name: 'Verano 2027', code: 'SS27', isActive: true },
    { name: 'Verano 2026', code: 'SS26', isActive: true },
    { name: 'Invierno 2026', code: 'FW26', isActive: true },
    { name: 'Todo el año', code: 'ALL', isActive: true }
  ];
  const seasonMap = {};
  for (const s of seasonsData) {
    const res = await prisma.season.upsert({ where: { name: s.name }, update: s, create: s });
    seasonMap[s.name] = res.id;
  }

  const categoriesData = [
    { name: 'Sandalias', slug: 'sandalias' },
    { name: 'Zapatillas', slug: 'zapatillas' },
    { name: 'Botas', slug: 'botas' },
    { name: 'Botinetas', slug: 'botinetas' },
    { name: 'Mocasines', slug: 'mocasines' },
    { name: 'Ojotas', slug: 'ojotas' },
    { name: 'Zuecos', slug: 'zuecos' },
    { name: 'Carteras', slug: 'carteras' },
    { name: 'Billeteras', slug: 'billeteras' }
  ];
  const categoryMap = {};
  for (const c of categoriesData) {
    let existing = await prisma.category.findFirst({ where: { OR: [{ slug: c.slug }, { name: c.name }] } });
    if (!existing) existing = await prisma.category.create({ data: c });
    categoryMap[c.name] = existing.id;
  }

  const ptDama = await prisma.productType.upsert({
    where: { name: 'Calzado Dama (35-40)' },
    update: {},
    create: { name: 'Calzado Dama (35-40)', family: 'Calzado', sizesList: '35, 36, 37, 38, 39, 40' }
  });

  const priceListsData = [
    { listNumber: 1, name: 'Público', markupPercent: 100.0 },
    { listNumber: 2, name: 'Mayorista', markupPercent: 50.0 },
    { listNumber: 3, name: 'Lista', markupPercent: 50.0 },
    { listNumber: 4, name: 'Venta a locales', markupPercent: 25.0 },
    { listNumber: 5, name: 'Venta a outlets', markupPercent: 15.0 },
    { listNumber: 6, name: 'Venta a franquicias', markupPercent: 35.0 },
    { listNumber: 7, name: 'Venta minorista en outlet', markupPercent: 80.0 },
    { listNumber: 8, name: 'Venta a clientes 2', markupPercent: 60.0 },
    { listNumber: 9, name: 'ML CLASSIC', markupPercent: 150.0 },
    { listNumber: 10, name: 'Venta B2C en dólares', markupPercent: 100.0, currency: 'USD' }
  ];

  for (const pl of priceListsData) {
    await prisma.priceList.upsert({
      where: { listNumber: pl.listNumber },
      update: pl,
      create: pl
    });
  }

  // 5. Seed Real Customers
  console.log(`Sembrando ${realCustomers.length} clientes...`);
  for (const cust of realCustomers) {
    await prisma.customer.upsert({
      where: { cuit: cust.cuit },
      update: {
        name: cust.name,
        customerType: cust.customerType,
        phone: cust.phone,
        address: cust.address,
        city: cust.city,
        province: cust.province,
        currentBalance: cust.currentBalance,
        sellerName: cust.sellerName
      },
      create: {
        code: cust.code,
        name: cust.name,
        businessName: cust.name,
        cuit: cust.cuit,
        customerType: cust.customerType,
        phone: cust.phone,
        address: cust.address,
        city: cust.city,
        province: cust.province,
        currentBalance: cust.currentBalance,
        creditLimit: 5000000,
        sellerName: cust.sellerName,
        priceListId: 2
      }
    });
  }

  // 6. Fast batch seed of 300 Real Products with EXACT Nomenclature
  const selectedProducts = masterCatalog.slice(0, 300);
  console.log(`Sembrando ${selectedProducts.length} productos con nomenclatura exacta...`);

  const sizes = ['35', '36', '37', '38', '39', '40'];

  for (let i = 0; i < selectedProducts.length; i++) {
    const item = selectedProducts[i];
    const brandId = brandMap[item.brand] || brandMap['SKY BLUE'];
    const seasonId = seasonMap[item.season] || seasonMap['Verano 2026'];
    const categoryId = categoryMap[item.category] || categoryMap['Sandalias'];

    const prod = await prisma.product.create({
      data: {
        sku: item.sku,
        title: item.title,
        description: item.rawDescription,
        brandId,
        seasonId,
        categoryId,
        productTypeId: ptDama.id,
        priceCost: item.priceCost,
        isPublishedWeb: true,
        isFeatured: i % 4 === 0,
        isB2BPublished: true,
        mainImage: item.mainImage,
        imagesJson: JSON.stringify(item.images || [item.mainImage]),
        prices: {
          create: priceListsData.map(pl => {
            let amount = Math.round(item.priceCost * (1 + pl.markupPercent / 100));
            if (pl.listNumber === 1 && item.pricePublic > 0) amount = item.pricePublic;
            if (pl.listNumber === 2 && item.priceWholesale > 0) amount = item.priceWholesale;
            return { priceListId: pl.listNumber, priceAmount: amount };
          })
        },
        colors: {
          create: [
            {
              colorName: item.mainColor,
              colorCode: item.mainColor.slice(0, 3).toUpperCase(),
              hexCode: item.mainColor === 'Negro' ? '#000000' : (item.mainColor === 'Blanco' ? '#FFFFFF' : '#D2B48C'),
              imageUrl: item.mainImage,
              sizes: {
                create: sizes.map((s, sIdx) => ({
                  sizeNumber: s,
                  barcodeEan13: `779${(1000000000 + i * 100 + sIdx).toString().slice(0, 10)}`,
                  packageRatio: 1,
                  stocks: {
                    create: [
                      { warehouseId: depGeneral.id, physicalStock: 24, inTransitStock: 12 },
                      { warehouseId: outletTapiales.id, physicalStock: 12, inTransitStock: 0 },
                      { warehouseId: sbwCanning.id, physicalStock: 8, inTransitStock: 0 },
                      { warehouseId: depCanuelas.id, physicalStock: 8, inTransitStock: 0 }
                    ]
                  }
                }))
              }
            }
          ]
        }
      }
    });

    if (i % 50 === 0) console.log(`  -> Insertados ${i + 1} de ${selectedProducts.length} productos...`);
  }

  // 7. Shipments
  console.log('Sembrando embarques...');
  await prisma.shipment.upsert({
    where: { shipmentNumber: 'IMP-2026-004' },
    update: {},
    create: {
      shipmentNumber: 'IMP-2026-004',
      containerNumber: 'MSCU-829182-3',
      origin: 'Brasil (Porto Alegre)',
      status: 'IN_TRANSIT',
      departureDate: new Date('2026-08-10'),
      etaDate: new Date('2026-09-15'),
      notes: 'Colección Verano 2026/2027 - Sandalias y Zapatillas Petite Jolie y Refresh'
    }
  });

  await prisma.shipment.upsert({
    where: { shipmentNumber: 'IMP-2026-005' },
    update: {},
    create: {
      shipmentNumber: 'IMP-2026-005',
      containerNumber: 'CMA-992102-1',
      origin: 'Brasil (Novo Hamburgo)',
      status: 'IN_TRANSIT',
      departureDate: new Date('2026-08-18'),
      etaDate: new Date('2026-09-28'),
      notes: 'Colección Calzado Confort Giulia Domna y Xti'
    }
  });

  console.log('=== SEEDING ULTRARÁPIDO COMPLETADO EXITOSAMENTE ===');
}

fastMasterSeed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
