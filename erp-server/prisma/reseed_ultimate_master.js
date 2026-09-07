import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function reseedUltimateMaster() {
  console.log('=== INICIANDO RESEED MAESTRO CON NOMENCLATURA EXACTA Y 4 DEPÓSITOS ===');

  const catalogPath = path.resolve('../data/real_ipn_export/complete_master_catalog.json');
  const custsPath = path.resolve('../data/real_ipn_export/all_parsed_real_customers.json');
  const transportsPath = path.resolve('../data/real_ipn_export/parsed_transports.json');

  const masterCatalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const realCustomers = JSON.parse(fs.readFileSync(custsPath, 'utf8'));
  let transportsList = [];
  if (fs.existsSync(transportsPath)) {
    transportsList = JSON.parse(fs.readFileSync(transportsPath, 'utf8'));
  }

  console.log(`Catálogo maestro: ${masterCatalog.length} modelos.`);
  console.log(`Clientes reales: ${realCustomers.length} cuentas.`);
  console.log(`Transportes reales: ${transportsList.length} empresas.`);

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

  // 2. All 4 Active & Independent Warehouses (Specified by User)
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
  console.log('Guardando empresas de transporte...');
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

  for (const tr of transportsList.slice(0, 40)) {
    const tName = tr.address?.trim() || tr.name;
    if (tName && tName.length > 2) {
      await prisma.transport.upsert({
        where: { name: tName.slice(0, 60) },
        update: { code: tr.name, address: tr.address, phone: tr.contact || '' },
        create: { name: tName.slice(0, 60), code: tr.name, address: tr.address, phone: tr.contact || '' }
      }).catch(() => {});
    }
  }

  // 4. 10 Price Lists
  const priceListsData = [
    { listNumber: 1, name: 'Público', description: 'Precio de venta minorista en locales', markupPercent: 100.0, currency: 'ARS', isDefault: false },
    { listNumber: 2, name: 'Mayorista', description: 'Precio base venta mayorista showroom', markupPercent: 50.0, currency: 'ARS', isDefault: true },
    { listNumber: 3, name: 'Lista', description: 'Precio de lista general', markupPercent: 50.0, currency: 'ARS', isDefault: false },
    { listNumber: 4, name: 'Venta a locales', description: 'Precio transferencia a locales', markupPercent: 25.0, currency: 'ARS', isDefault: false },
    { listNumber: 5, name: 'Venta a outlets', description: 'Precio especial outlets', markupPercent: 15.0, currency: 'ARS', isDefault: false },
    { listNumber: 6, name: 'Venta a franquicias', description: 'Precio franquicias autorizadas', markupPercent: 35.0, currency: 'ARS', isDefault: false },
    { listNumber: 7, name: 'Venta minorista en outlet', description: 'Precio mostrador outlet Tapiales', markupPercent: 80.0, currency: 'ARS', isDefault: false },
    { listNumber: 8, name: 'Venta a clientes 2', description: 'Precio cuenta corriente especial', markupPercent: 60.0, currency: 'ARS', isDefault: false },
    { listNumber: 9, name: 'ML CLASSIC', description: 'Publicaciones Mercado Libre', markupPercent: 150.0, currency: 'ARS', isDefault: false },
    { listNumber: 10, name: 'Venta B2C en dólares', description: 'Precio venta en dólares online', markupPercent: 100.0, currency: 'USD', isDefault: false }
  ];

  for (const pl of priceListsData) {
    await prisma.priceList.upsert({
      where: { listNumber: pl.listNumber },
      update: pl,
      create: pl
    });
  }

  // 5. Brands
  const brandsData = [
    { name: 'PETITE JOLIE', slug: 'petite-jolie', logoUrl: '/brand-logos/petite-jolie.png' },
    { name: 'REFRESH', slug: 'refresh', logoUrl: '/brand-logos/refresh.png' },
    { name: 'XTI BY SKY BLUE', slug: 'xti', logoUrl: '/brand-logos/xti.png' },
    { name: 'GIULIA DOMNA', slug: 'giulia-domna', logoUrl: '/brand-logos/giulia-domna.png' },
    { name: 'SKY BLUE', slug: 'skyblue', logoUrl: '/brand-logos/skyblue.png' },
    { name: 'GATICAR', slug: 'gaticar', logoUrl: '/brand-logos/gaticar.png' }
  ];

  const brandMap = {};
  for (const b of brandsData) {
    const created = await prisma.brand.upsert({
      where: { name: b.name },
      update: b,
      create: b
    });
    brandMap[b.name] = created.id;
  }

  // 6. Seasons
  const seasonsData = [
    { name: 'Verano 2027', code: 'SS27', isActive: true },
    { name: 'Verano 2026', code: 'SS26', isActive: true },
    { name: 'Invierno 2026', code: 'FW26', isActive: true },
    { name: 'Todo el año', code: 'ALL', isActive: true }
  ];

  const seasonMap = {};
  for (const s of seasonsData) {
    const created = await prisma.season.upsert({
      where: { name: s.name },
      update: s,
      create: s
    });
    seasonMap[s.name] = created.id;
  }

  // 7. Categories
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
    let existing = await prisma.category.findFirst({
      where: { OR: [{ slug: c.slug }, { name: c.name }, { name: c.name.toUpperCase() }] }
    });
    if (!existing) {
      existing = await prisma.category.create({ data: c });
    } else {
      existing = await prisma.category.update({ where: { id: existing.id }, data: { name: c.name } });
    }
    categoryMap[c.name] = existing.id;
    categoryMap[c.name.toUpperCase()] = existing.id;
  }

  // 8. Product Types / Curves
  const productTypesData = [
    { name: 'Calzado Dama (35-40)', family: 'Calzado', sizesList: '35, 36, 37, 38, 39, 40' },
    { name: 'Calzado Dama (35-41)', family: 'Calzado', sizesList: '35, 36, 37, 38, 39, 40, 41' },
    { name: 'Calzado Hombre (39/44)', family: 'Calzado', sizesList: '39, 40, 41, 42, 43, 44' },
    { name: 'Calzado Niños (28-37)', family: 'Calzado', sizesList: '28, 29, 30, 31, 32, 33, 34, 35, 36, 37' },
    { name: 'Accesorios', family: 'Accesorios', sizesList: 'Único' }
  ];

  const typeMap = {};
  for (const pt of productTypesData) {
    const created = await prisma.productType.upsert({
      where: { name: pt.name },
      update: pt,
      create: pt
    });
    typeMap[pt.name] = created;
  }

  // 9. Seed Customers
  console.log(`Guardando ${realCustomers.length} clientes reales...`);
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

  // 10. Seed 200 Real Footwear Models with EXACT Nomenclature
  const selectedProducts = masterCatalog.slice(0, 200);
  console.log(`Guardando ${selectedProducts.length} modelos de calzado reales con nomenclatura exacta...`);

  const allVariantIds = [];

  for (const item of selectedProducts) {
    const brandId = brandMap[item.brand] || brandMap['SKY BLUE'];
    const seasonId = seasonMap[item.season] || seasonMap['Verano 2026'];
    const categoryId = categoryMap[item.category] || categoryMap['Sandalias'];
    const defaultType = typeMap[item.productType] || typeMap['Calzado Dama (35-40)'];

    const prod = await prisma.product.upsert({
      where: { sku: item.sku },
      update: {
        title: item.title,
        priceCost: item.priceCost,
        mainImage: item.mainImage,
        imagesJson: JSON.stringify(item.images || [item.mainImage])
      },
      create: {
        sku: item.sku,
        title: item.title,
        description: item.rawDescription,
        brandId,
        seasonId,
        categoryId,
        productTypeId: defaultType.id,
        priceCost: item.priceCost,
        isPublishedWeb: true,
        isFeatured: Math.random() > 0.7,
        isB2BPublished: true,
        mainImage: item.mainImage,
        imagesJson: JSON.stringify(item.images || [item.mainImage])
      }
    });

    // 10 Prices
    for (const pl of priceListsData) {
      let priceAmount = Math.round(item.priceCost * (1 + pl.markupPercent / 100));
      if (pl.listNumber === 1 && item.pricePublic > 0) priceAmount = item.pricePublic;
      if (pl.listNumber === 2 && item.priceWholesale > 0) priceAmount = item.priceWholesale;

      await prisma.productPrice.upsert({
        where: { productId_priceListId: { productId: prod.id, priceListId: pl.listNumber } },
        update: { priceAmount },
        create: { productId: prod.id, priceListId: pl.listNumber, priceAmount }
      });
    }

    // Colors: item.mainColor + Negro / Nude
    const colorsToCreate = [
      { name: item.mainColor, hex: item.mainColor === 'Negro' ? '#000000' : (item.mainColor === 'Blanco' ? '#FFFFFF' : '#E8D0BA') },
      { name: item.mainColor === 'Negro' ? 'Nude' : 'Negro', hex: item.mainColor === 'Negro' ? '#E8D0BA' : '#000000' }
    ];

    const sizesList = defaultType.sizesList.split(',').map(s => s.trim());

    for (const col of colorsToCreate) {
      let color = await prisma.productColor.findFirst({
        where: { productId: prod.id, colorName: col.name }
      });

      if (!color) {
        color = await prisma.productColor.create({
          data: {
            productId: prod.id,
            colorName: col.name,
            colorCode: col.name.slice(0, 3).toUpperCase(),
            hexCode: col.hex,
            imageUrl: item.mainImage
          }
        });
      }

      for (const sizeStr of sizesList) {
        let variantSize = await prisma.productVariantSize.findFirst({
          where: { productColorId: color.id, sizeNumber: sizeStr }
        });

        if (!variantSize) {
          const barcode = `779${Math.floor(1000000000 + Math.random() * 9000000000)}`;
          variantSize = await prisma.productVariantSize.create({
            data: {
              productColorId: color.id,
              sizeNumber: sizeStr,
              barcodeEan13: barcode,
              packageRatio: 1
            }
          });
        }

        allVariantIds.push(variantSize.id);

        const baseQty = Math.floor(12 + Math.random() * 24);

        // Stock in all 4 active independent warehouses:
        // 1. Depósito General Showroom
        await prisma.stockByWarehouse.upsert({
          where: { warehouseId_variantSizeId: { warehouseId: depGeneral.id, variantSizeId: variantSize.id } },
          update: { physicalStock: baseQty },
          create: { warehouseId: depGeneral.id, variantSizeId: variantSize.id, physicalStock: baseQty }
        });

        // 2. Outlet Tapiales (Local & Tienda Web)
        await prisma.stockByWarehouse.upsert({
          where: { warehouseId_variantSizeId: { warehouseId: outletTapiales.id, variantSizeId: variantSize.id } },
          update: { physicalStock: Math.floor(baseQty * 0.5) },
          create: { warehouseId: outletTapiales.id, variantSizeId: variantSize.id, physicalStock: Math.floor(baseQty * 0.5) }
        });

        // 3. SBW Canning
        await prisma.stockByWarehouse.upsert({
          where: { warehouseId_variantSizeId: { warehouseId: sbwCanning.id, variantSizeId: variantSize.id } },
          update: { physicalStock: Math.floor(baseQty * 0.3) },
          create: { warehouseId: sbwCanning.id, variantSizeId: variantSize.id, physicalStock: Math.floor(baseQty * 0.3) }
        });

        // 4. SkyBlue Cañuelas (Av. Libertad 1190)
        await prisma.stockByWarehouse.upsert({
          where: { warehouseId_variantSizeId: { warehouseId: depCanuelas.id, variantSizeId: variantSize.id } },
          update: { physicalStock: Math.floor(baseQty * 0.3) },
          create: { warehouseId: depCanuelas.id, variantSizeId: variantSize.id, physicalStock: Math.floor(baseQty * 0.3) }
        });
      }
    }
  }

  // 11. Real Import Shipments
  console.log('Creando 2 Embarques de Importación en Tránsito...');
  const shipment1 = await prisma.shipment.upsert({
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

  const shipment2 = await prisma.shipment.upsert({
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

  console.log('=== RESEED MAESTRO COMPLETADO EXITOSAMENTE ===');
}

reseedUltimateMaster()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
