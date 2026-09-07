import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando carga de datos semilla optimizada...');

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

  // 2. Warehouses
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

  const canning = await prisma.warehouse.upsert({
    where: { code: 'SBW_CANNING' },
    update: {},
    create: {
      code: 'SBW_CANNING',
      name: 'SBW Canning',
      type: 'RETAIL_LOCAL',
      address: 'Canning',
      companyId: gaticar.id
    }
  });

  // 3. Price Lists
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
    { name: 'SKY BLUE', slug: 'skyblue', logoUrl: '/brand-logos/skyblue.png' }
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
    { name: 'CARTERAS', slug: 'carteras' }
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

  // 8. Customers
  const customersData = [
    { code: 'CLI-001', name: 'SALAMONE CALZADOS', businessName: 'SALAMONE HNOS S.R.L.', cuit: '30658493021', email: 'compras@salamone.com.ar', phone: '1144556677', city: 'Tapiales', province: 'Buenos Aires', sellerName: 'Juliana', creditLimit: 5000000 },
    { code: 'CLI-002', name: 'CALZADOS DEL SUR', businessName: 'MARIA DEL CARMEN LOPEZ', cuit: '27284950392', email: 'ventas@calzadosdelsur.com.ar', phone: '1133221100', city: 'Canning', province: 'Buenos Aires', sellerName: 'Marcelino', creditLimit: 3500000 },
    { code: 'CLI-003', name: 'ZAPATERIA MODA EXPRESS', businessName: 'ROBERTO CARLOS DIAZ', cuit: '20304958391', email: 'modaexpress@gmail.com', phone: '1199887766', city: 'Rosario', province: 'Santa Fe', sellerName: 'Jesica', creditLimit: 2000000 }
  ];

  for (const cust of customersData) {
    await prisma.customer.upsert({
      where: { cuit: cust.cuit },
      update: cust,
      create: { ...cust, priceListId: 2 }
    });
  }

  // 9. Curated Products Catalog
  const catalogList = [
    {
      sku: 'PJ-8326',
      title: 'Sandalia Taco Palo Petite Jolie',
      brand: 'PETITE JOLIE',
      season: 'Verano 2026',
      category: 'SANDALIA',
      priceCost: 14000,
      mainImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
      description: 'Sandalia taco medio con pulsera y plantilla confort J-Lastic.',
      variants: [
        { color: 'Negro', hex: '#000000', sizes: [{ s: '35', st: 12 }, { s: '36', st: 24 }, { s: '37', st: 36 }, { s: '38', st: 36 }, { s: '39', st: 24 }, { s: '40', st: 12 }] },
        { color: 'Nude', hex: '#E8D0BA', sizes: [{ s: '35', st: 6 }, { s: '36', st: 18 }, { s: '37', st: 24 }, { s: '38', st: 24 }, { s: '39', st: 18 }, { s: '40', st: 6 }] }
      ]
    },
    {
      sku: 'PJ-4102',
      title: 'Ojota Scarlett Petite Jolie con Moño',
      brand: 'PETITE JOLIE',
      season: 'Verano 2026',
      category: 'OJOTAS',
      priceCost: 8500,
      mainImage: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&auto=format&fit=crop&q=80',
      description: 'Ojota playera con aplique de moño icónico Petite Jolie.',
      variants: [
        { color: 'Rosa Pastel', hex: '#F4C2C2', sizes: [{ s: '35', st: 10 }, { s: '36', st: 20 }, { s: '37', st: 30 }, { s: '38', st: 30 }, { s: '39', st: 20 }, { s: '40', st: 10 }] },
        { color: 'Negro', hex: '#000000', sizes: [{ s: '35', st: 15 }, { s: '36', st: 30 }, { s: '37', st: 45 }, { s: '38', st: 45 }, { s: '39', st: 30 }, { s: '40', st: 15 }] }
      ]
    },
    {
      sku: 'REF-1714',
      title: 'Zapatilla Urban Refresh Chunky',
      brand: 'REFRESH',
      season: 'Verano 2026',
      category: 'ZAPATILLAS',
      priceCost: 18000,
      mainImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',
      description: 'Zapatilla estilo urbano suela track ultraliviana.',
      variants: [
        { color: 'Blanco', hex: '#FFFFFF', sizes: [{ s: '35', st: 10 }, { s: '36', st: 20 }, { s: '37', st: 30 }, { s: '38', st: 30 }, { s: '39', st: 20 }, { s: '40', st: 10 }] },
        { color: 'Beige', hex: '#F5F5DC', sizes: [{ s: '35', st: 8 }, { s: '36', st: 16 }, { s: '37', st: 24 }, { s: '38', st: 24 }, { s: '39', st: 16 }, { s: '40', st: 8 }] }
      ]
    },
    {
      sku: 'REF-2290',
      title: 'Sandalia Plataforma Yute Refresh',
      brand: 'REFRESH',
      season: 'Verano 2026',
      category: 'SANDALIA',
      priceCost: 16500,
      mainImage: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=600&auto=format&fit=crop&q=80',
      description: 'Sandalia con base forrada en yute natural y tiras ajustables.',
      variants: [
        { color: 'Camel', hex: '#C19A6B', sizes: [{ s: '35', st: 12 }, { s: '36', st: 24 }, { s: '37', st: 36 }, { s: '38', st: 36 }, { s: '39', st: 24 }, { s: '40', st: 12 }] },
        { color: 'Negro', hex: '#000000', sizes: [{ s: '35', st: 8 }, { s: '36', st: 16 }, { s: '37', st: 24 }, { s: '38', st: 24 }, { s: '39', st: 16 }, { s: '40', st: 8 }] }
      ]
    },
    {
      sku: 'XTI-4482',
      title: 'Mocasín Clásico XTI con Hebilla',
      brand: 'XTI BY SKY BLUE',
      season: 'Invierno 2026',
      category: 'MOCASINES',
      priceCost: 19500,
      mainImage: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80',
      description: 'Mocasín de vestir con suela antideslizante y herraje dorado.',
      variants: [
        { color: 'Suela', hex: '#8B5A2B', sizes: [{ s: '35', st: 5 }, { s: '36', st: 15 }, { s: '37', st: 20 }, { s: '38', st: 20 }, { s: '39', st: 15 }, { s: '40', st: 5 }] },
        { color: 'Negro', hex: '#000000', sizes: [{ s: '35', st: 10 }, { s: '36', st: 20 }, { s: '37', st: 25 }, { s: '38', st: 25 }, { s: '39', st: 20 }, { s: '40', st: 10 }] }
      ]
    },
    {
      sku: 'GD-9031',
      title: 'Botineta Cuero Premium Giulia Domna',
      brand: 'GIULIA DOMNA',
      season: 'Invierno 2026',
      category: 'BOTINETAS',
      priceCost: 28000,
      mainImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
      description: 'Botineta caña corta en 100% cuero vacuno graneado.',
      variants: [
        { color: 'Bordo', hex: '#800020', sizes: [{ s: '35', st: 6 }, { s: '36', st: 12 }, { s: '37', st: 18 }, { s: '38', st: 18 }, { s: '39', st: 12 }, { s: '40', st: 6 }] },
        { color: 'Negro', hex: '#000000', sizes: [{ s: '35', st: 10 }, { s: '36', st: 20 }, { s: '37', st: 30 }, { s: '38', st: 30 }, { s: '39', st: 20 }, { s: '40', st: 10 }] }
      ]
    }
  ];

  const allCreatedVariantIds = [];

  for (const item of catalogList) {
    const brandId = brandMap[item.brand] || brandMap['SKY BLUE'];
    const seasonId = seasonMap[item.season] || seasonMap['Verano 2026'];
    const categoryId = categoryMap[item.category] || categoryMap['SANDALIA'];
    const defaultType = typeMap['Calzado Dama (35-40)'];

    const prod = await prisma.product.upsert({
      where: { sku: item.sku },
      update: {},
      create: {
        sku: item.sku,
        title: item.title,
        description: item.description,
        brandId,
        seasonId,
        categoryId,
        productTypeId: defaultType.id,
        priceCost: item.priceCost,
        isPublishedWeb: true,
        isFeatured: true,
        isB2BPublished: true,
        mainImage: item.mainImage,
        imagesJson: JSON.stringify([item.mainImage])
      }
    });

    // Create 10 prices
    for (const pl of priceListsData) {
      const priceAmount = Math.round(item.priceCost * (1 + pl.markupPercent / 100));
      await prisma.productPrice.upsert({
        where: { productId_priceListId: { productId: prod.id, priceListId: pl.listNumber } },
        update: { priceAmount },
        create: { productId: prod.id, priceListId: pl.listNumber, priceAmount }
      });
    }

    // Create colors & size variants
    for (const v of item.variants) {
      const color = await prisma.productColor.create({
        data: {
          productId: prod.id,
          colorName: v.color,
          colorCode: v.color.slice(0, 3).toUpperCase(),
          hexCode: v.hex,
          imageUrl: prod.mainImage
        }
      });

      for (const s of v.sizes) {
        const barcode = `779${Math.floor(1000000000 + Math.random() * 9000000000)}`;
        const variantSize = await prisma.productVariantSize.create({
          data: {
            productColorId: color.id,
            sizeNumber: s.s,
            barcodeEan13: barcode,
            packageRatio: 1
          }
        });

        allCreatedVariantIds.push(variantSize.id);

        // Depósito General (Showroom) Stock
        await prisma.stockByWarehouse.create({
          data: {
            warehouseId: depGeneral.id,
            variantSizeId: variantSize.id,
            physicalStock: s.st,
            committedStock: 0,
            reservedStock: 0,
            inTransitStock: 0
          }
        });

        // Outlet Tapiales Stock (40% de showroom)
        await prisma.stockByWarehouse.create({
          data: {
            warehouseId: outletTapiales.id,
            variantSizeId: variantSize.id,
            physicalStock: Math.floor(s.st * 0.4),
            committedStock: 0,
            reservedStock: 0,
            inTransitStock: 0
          }
        });
      }
    }
  }

  // 10. Sample Incoming Shipment (Mercadería en Tránsito / Importación)
  console.log('Creando Embarque de Importación en Tránsito (ETA: 15/Septiembre)...');
  const shipment = await prisma.shipment.upsert({
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

  // Assign in-transit stock for first 8 variant sizes
  const sampleItems = allCreatedVariantIds.slice(0, 8);
  for (const varId of sampleItems) {
    const qtyInTransit = 48; // 4 bultos
    await prisma.shipmentItem.create({
      data: {
        shipmentId: shipment.id,
        variantSizeId: varId,
        quantityExpected: qtyInTransit,
        quantityReceived: 0
      }
    });

    const existingStock = await prisma.stockByWarehouse.findUnique({
      where: { warehouseId_variantSizeId: { warehouseId: depGeneral.id, variantSizeId: varId } }
    });

    if (existingStock) {
      await prisma.stockByWarehouse.update({
        where: { id: existingStock.id },
        data: { inTransitStock: qtyInTransit }
      });
    }
  }

  // 11. Sample Pre-order for Customer
  const firstCustomer = await prisma.customer.findFirst();
  if (firstCustomer && sampleItems.length > 0) {
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
          variantSizeId: sampleItems[i],
          quantity: 12,
          unitPrice: 12250,
          subtotal: 147000,
          isPreorder: true,
          shipmentId: shipment.id
        }
      });
    }
  }

  console.log('--- Seed Completado Exitosamente con Modelos Reales de SkyBlue ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
