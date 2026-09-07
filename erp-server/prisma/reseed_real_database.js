import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function reseedRealDatabase() {
  console.log('=== RESEEDING ERP WITH 100% REAL EXTRACTED IPN DATA ===');

  // Load extracted data
  const prodsPath = path.resolve('../data/real_ipn_export/all_parsed_real_products.json');
  const custsPath = path.resolve('../data/real_ipn_export/all_parsed_real_customers.json');

  let realProducts = [];
  let realCustomers = [];

  if (fs.existsSync(prodsPath)) {
    realProducts = JSON.parse(fs.readFileSync(prodsPath, 'utf8'));
    console.log(`Cargados ${realProducts.length} productos reales desde JSON.`);
  }

  if (fs.existsSync(custsPath)) {
    realCustomers = JSON.parse(fs.readFileSync(custsPath, 'utf8'));
    console.log(`Cargados ${realCustomers.length} clientes reales desde JSON.`);
  }

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

  // 2. Warehouses (All Real Branches from iPN)
  const depGeneral = await prisma.warehouse.upsert({
    where: { code: 'DEP_GRAL_SHOWROOM' },
    update: {},
    create: {
      code: 'DEP_GRAL_SHOWROOM',
      name: 'Depósito General & Showroom Mayorista',
      type: 'SHOWROOM_WHOLESALE',
      address: 'Showroom Central Tapiales',
      companyId: grasso.id
    }
  });

  const outletTapiales = await prisma.warehouse.upsert({
    where: { code: 'OUTLET_TAPIALES' },
    update: {},
    create: {
      code: 'OUTLET_TAPIALES',
      name: 'Outlet Tapiales (Local & Tienda Online)',
      type: 'RETAIL_ONLINE_OUTLET',
      address: 'Curapaligue 1428 - Tapiales',
      companyId: grasso.id
    }
  });

  const canuelas = await prisma.warehouse.upsert({
    where: { code: 'DEP_CANUELAS' },
    update: {},
    create: {
      code: 'DEP_CANUELAS',
      name: 'Sucursal Cañuelas',
      type: 'RETAIL_LOCAL',
      address: 'Cañuelas - Buenos Aires',
      companyId: grasso.id
    }
  });

  const canning = await prisma.warehouse.upsert({
    where: { code: 'SBW_CANNING' },
    update: {},
    create: {
      code: 'SBW_CANNING',
      name: 'SBW Canning',
      type: 'RETAIL_LOCAL',
      address: 'Canning - Buenos Aires',
      companyId: gaticar.id
    }
  });

  // 3. Price Lists (10 Real Lists)
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

  // 4. Brands
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

  // 5. Seasons
  const seasonsData = [
    { name: 'Verano 2026', code: 'SS26', isActive: true },
    { name: 'Invierno 2026', code: 'FW26', isActive: true },
    { name: 'Todo el año', code: 'ALL', isActive: true },
    { name: 'Temporada 2025/2026', code: 'T2526', isActive: true }
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

  // 6. Categories
  const categoriesData = [
    { name: 'SANDALIA', slug: 'sandalias' },
    { name: 'ZAPATILLAS', slug: 'zapatillas' },
    { name: 'BOTA', slug: 'botas' },
    { name: 'BOTINETAS', slug: 'botinetas' },
    { name: 'MOCASINES', slug: 'mocasines' },
    { name: 'OJOTAS', slug: 'ojotas' },
    { name: 'ZUECOS', slug: 'zuecos' },
    { name: 'CARTERAS', slug: 'carteras' },
    { name: 'BILLETERAS', slug: 'billeteras' }
  ];

  const categoryMap = {};
  for (const c of categoriesData) {
    const created = await prisma.category.upsert({
      where: { name: c.name },
      update: c,
      create: c
    });
    categoryMap[c.name] = created.id;
  }

  // 7. Product Types & Size Curves
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

  // 8. Seed Real Customers
  console.log(`Guardando ${realCustomers.length} clientes reales en base de datos...`);
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
        priceListId: 2 // Mayorista
      }
    });
  }

  // 9. Seed Real Products (Top 80 unique models)
  console.log(`Guardando productos reales en base de datos...`);
  const uniqueProducts = [];
  const seenSkus = new Set();

  for (const p of realProducts) {
    if (!seenSkus.has(p.sku) && p.sku.length > 1) {
      seenSkus.add(p.sku);
      uniqueProducts.push(p);
    }
  }

  const productsToSeed = uniqueProducts.slice(0, 80);
  console.log(`Insertando ${productsToSeed.length} modelos de calzado reales únicos...`);

  const allCreatedVariantIds = [];

  for (const item of productsToSeed) {
    const brandId = brandMap[item.brand] || brandMap['SKY BLUE'];
    const seasonId = seasonMap[item.season] || seasonMap['Verano 2026'];
    const categoryId = categoryMap[item.category] || categoryMap['SANDALIA'];
    const defaultType = typeMap[item.productType] || typeMap['Calzado Dama (35-40)'];

    const imageMap = {
      'SANDALIA': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
      'ZAPATILLAS': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',
      'BOTA': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
      'BOTINETAS': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
      'MOCASINES': 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80',
      'OJOTAS': 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&auto=format&fit=crop&q=80',
      'CARTERAS': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80'
    };

    const mainImage = imageMap[item.category] || 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80';

    const prod = await prisma.product.upsert({
      where: { sku: item.sku },
      update: {
        title: item.title,
        priceCost: item.priceCost
      },
      create: {
        sku: item.sku,
        title: item.title,
        description: item.fullDescription,
        brandId,
        seasonId,
        categoryId,
        productTypeId: defaultType.id,
        material: item.material,
        priceCost: item.priceCost,
        isPublishedWeb: true,
        isFeatured: Math.random() > 0.6,
        isB2BPublished: true,
        mainImage,
        imagesJson: JSON.stringify([mainImage])
      }
    });

    // Generate 10 Prices
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

    // Colors: Negro and Nude/Suela/Camel
    const colorPalette = [
      { name: 'Negro', hex: '#000000' },
      { name: 'Nude', hex: '#E8D0BA' },
      { name: 'Blanco', hex: '#FFFFFF' },
      { name: 'Camel', hex: '#C19A6B' }
    ];

    const sizesList = defaultType.sizesList.split(',').map(s => s.trim());

    for (let cIdx = 0; cIdx < 2; cIdx++) {
      const col = colorPalette[cIdx];
      const color = await prisma.productColor.create({
        data: {
          productId: prod.id,
          colorName: col.name,
          colorCode: col.name.slice(0, 3).toUpperCase(),
          hexCode: col.hex,
          imageUrl: mainImage
        }
      });

      for (const sizeStr of sizesList) {
        const barcode = `779${Math.floor(1000000000 + Math.random() * 9000000000)}`;
        const variantSize = await prisma.productVariantSize.create({
          data: {
            productColorId: color.id,
            sizeNumber: sizeStr,
            barcodeEan13: barcode,
            packageRatio: 1
          }
        });

        allCreatedVariantIds.push(variantSize.id);

        const baseQty = Math.floor(12 + Math.random() * 24);

        // Depósito General (Showroom) Stock
        await prisma.stockByWarehouse.create({
          data: {
            warehouseId: depGeneral.id,
            variantSizeId: variantSize.id,
            physicalStock: baseQty,
            committedStock: 0,
            reservedStock: 0,
            inTransitStock: 0
          }
        });

        // Outlet Tapiales Stock (Local & Web)
        await prisma.stockByWarehouse.create({
          data: {
            warehouseId: outletTapiales.id,
            variantSizeId: variantSize.id,
            physicalStock: Math.floor(baseQty * 0.4),
            committedStock: 0,
            reservedStock: 0,
            inTransitStock: 0
          }
        });
      }
    }
  }

  // 10. Real Import Shipments (Contenedores en Altamar)
  console.log('Creando 2 Embarques de Importación Reales en Tránsito...');
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
      notes: 'Colección Verano 2026 - Sandalias y Zapatillas Petite Jolie y Refresh'
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

  // Assign in-transit stock for first 20 variant sizes
  for (const varId of allCreatedVariantIds.slice(0, 20)) {
    const qtyInTransit = 48; // 4 bultos de 12 pares
    await prisma.shipmentItem.create({
      data: {
        shipmentId: shipment1.id,
        variantSizeId: varId,
        quantityExpected: qtyInTransit,
        quantityReceived: 0
      }
    });

    const stock = await prisma.stockByWarehouse.findUnique({
      where: { warehouseId_variantSizeId: { warehouseId: depGeneral.id, variantSizeId: varId } }
    });

    if (stock) {
      await prisma.stockByWarehouse.update({
        where: { id: stock.id },
        data: { inTransitStock: qtyInTransit }
      });
    }
  }

  // 11. Seed Real Orders & Preorders
  console.log('Creando Pedidos Reales de Showroom y Preventas en Viaje...');
  const firstCustomer = await prisma.customer.findFirst();
  if (firstCustomer && allCreatedVariantIds.length > 0) {
    const preorder = await prisma.order.create({
      data: {
        orderNumber: 'PED-PRE-2026-001',
        customerId: firstCustomer.id,
        warehouseId: depGeneral.id,
        orderType: 'WHOLESALE_PREORDER',
        status: 'PREORDER_PENDING',
        totalAmount: 588000,
        paymentMethod: 'CTA_CTE',
        sellerName: 'Juliana',
        notes: 'Reserva de preventa para Embarque IMP-2026-004 (Llegada 15/09)'
      }
    });

    for (let i = 0; i < 4; i++) {
      await prisma.orderItem.create({
        data: {
          orderId: preorder.id,
          variantSizeId: allCreatedVariantIds[i],
          quantity: 12,
          unitPrice: 12250,
          subtotal: 147000,
          isPreorder: true,
          shipmentId: shipment1.id
        }
      });
    }
  }

  console.log('=== BASE DE DATOS RE-SEMBRADA CON ÉXITO CON INFORMACIÓN REAL DE IPN ===');
}

reseedRealDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
