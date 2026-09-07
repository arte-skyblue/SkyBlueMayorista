import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedShipment() {
  console.log('Seeding Shipment & Preorders...');

  const depGeneral = await prisma.warehouse.findUnique({ where: { code: 'DEP_GRAL_SHOWROOM' } });
  const allVariants = await prisma.productVariantSize.findMany({ take: 20 });

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

  for (const v of allVariants.slice(0, 10)) {
    const qty = 48; // 4 bultos
    await prisma.shipmentItem.create({
      data: {
        shipmentId: shipment.id,
        variantSizeId: v.id,
        quantityExpected: qty,
        quantityReceived: 0
      }
    });

    const stock = await prisma.stockByWarehouse.findUnique({
      where: { warehouseId_variantSizeId: { warehouseId: depGeneral.id, variantSizeId: v.id } }
    });

    if (stock) {
      await prisma.stockByWarehouse.update({
        where: { id: stock.id },
        data: { inTransitStock: qty }
      });
    }
  }

  const customer = await prisma.customer.findFirst();
  if (customer && allVariants.length > 0) {
    const preorder = await prisma.order.create({
      data: {
        orderNumber: 'PED-PRE-2026-001',
        customerId: customer.id,
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
          variantSizeId: allVariants[i].id,
          quantity: 12,
          unitPrice: 12250,
          subtotal: 147000,
          isPreorder: true,
          shipmentId: shipment.id
        }
      });
    }
  }

  console.log('Shipment & Preorder seeded successfully!');
}

seedShipment().catch(console.error).finally(() => prisma.$disconnect());
