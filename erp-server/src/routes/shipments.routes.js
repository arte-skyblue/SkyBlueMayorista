import express from 'express';
import { prisma } from '../db.js';

export const shipmentsRouter = express.Router();

// GET /api/v1/shipments - List all incoming shipments
shipmentsRouter.get('/', async (req, res) => {
  try {
    const shipments = await prisma.shipment.findMany({
      include: {
        items: {
          include: {
            variantSize: {
              include: {
                productColor: {
                  include: {
                    product: {
                      include: { brand: true, category: true }
                    }
                  }
                }
              }
            }
          }
        },
        orderItems: {
          include: {
            order: {
              include: { customer: true }
            }
          }
        }
      },
      orderBy: { etaDate: 'asc' }
    });

    const formatted = shipments.map((sh) => {
      const totalUnitsExpected = sh.items.reduce((acc, item) => acc + item.quantityExpected, 0);
      const totalUnitsReceived = sh.items.reduce((acc, item) => acc + item.quantityReceived, 0);
      const preordersCount = sh.orderItems.length;
      const totalPreorderedUnits = sh.orderItems.reduce((acc, oi) => acc + oi.quantity, 0);

      return {
        id: sh.id,
        shipmentNumber: sh.shipmentNumber,
        containerNumber: sh.containerNumber,
        origin: sh.origin,
        status: sh.status,
        departureDate: sh.departureDate,
        etaDate: sh.etaDate,
        receivedDate: sh.receivedDate,
        notes: sh.notes,
        totalUnitsExpected,
        totalUnitsReceived,
        totalPreorderedUnits,
        preordersCount,
        items: sh.items.map((it) => ({
          id: it.id,
          sku: it.variantSize.productColor.product.sku,
          productTitle: it.variantSize.productColor.product.title,
          brand: it.variantSize.productColor.product.brand.name,
          color: it.variantSize.productColor.colorName,
          size: it.variantSize.sizeNumber,
          quantityExpected: it.quantityExpected,
          quantityReceived: it.quantityReceived
        })),
        preorders: sh.orderItems.map((oi) => ({
          orderNumber: oi.order.orderNumber,
          customerName: oi.order.customer.name,
          quantity: oi.quantity,
          status: oi.order.status
        }))
      };
    });

    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (error) {
    console.error('Error fetching shipments:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/shipments - Create new import shipment
shipmentsRouter.post('/', async (req, res) => {
  try {
    const { shipmentNumber, containerNumber, origin, etaDate, departureDate, notes, items } = req.body;

    if (!shipmentNumber || !etaDate) {
      return res.status(400).json({ success: false, error: 'Número de embarque y fecha estimada (ETA) son requeridos' });
    }

    const depGeneral = await prisma.warehouse.findUnique({ where: { code: 'DEP_GRAL_SHOWROOM' } });

    const shipment = await prisma.shipment.create({
      data: {
        shipmentNumber,
        containerNumber: containerNumber || '',
        origin: origin || 'Brasil',
        etaDate: new Date(etaDate),
        departureDate: departureDate ? new Date(departureDate) : null,
        status: 'IN_TRANSIT',
        notes: notes || ''
      }
    });

    // Create items and mark inTransitStock on Depósito General
    if (items && Array.isArray(items)) {
      for (const it of items) {
        if (it.variantSizeId && it.quantityExpected) {
          await prisma.shipmentItem.create({
            data: {
              shipmentId: shipment.id,
              variantSizeId: Number(it.variantSizeId),
              quantityExpected: Number(it.quantityExpected),
              quantityReceived: 0
            }
          });

          // Increase inTransitStock on warehouse
          const existingStock = await prisma.stockByWarehouse.findUnique({
            where: {
              warehouseId_variantSizeId: {
                warehouseId: depGeneral.id,
                variantSizeId: Number(it.variantSizeId)
              }
            }
          });

          if (existingStock) {
            await prisma.stockByWarehouse.update({
              where: { id: existingStock.id },
              data: { inTransitStock: existingStock.inTransitStock + Number(it.quantityExpected) }
            });
          }
        }
      }
    }

    res.json({ success: true, message: 'Embarque de importación creado correctamente', data: shipment });
  } catch (error) {
    console.error('Error creating shipment:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/shipments/:id/receive - Single-click reception & auto-matching to customer orders
shipmentsRouter.post('/:id/receive', async (req, res) => {
  try {
    const shipmentId = Number(req.params.id);
    const shipment = await prisma.shipment.findUnique({
      where: { id: shipmentId },
      include: {
        items: true,
        orderItems: {
          include: { order: true }
        }
      }
    });

    if (!shipment) return res.status(404).json({ success: false, error: 'Embarque no encontrado' });
    if (shipment.status === 'RECEIVED') {
      return res.status(400).json({ success: false, error: 'Este embarque ya fue recibido previamente' });
    }

    const depGeneral = await prisma.warehouse.findUnique({ where: { code: 'DEP_GRAL_SHOWROOM' } });

    // 1. Move inTransitStock to physicalStock for all items
    for (const item of shipment.items) {
      const stock = await prisma.stockByWarehouse.findUnique({
        where: {
          warehouseId_variantSizeId: {
            warehouseId: depGeneral.id,
            variantSizeId: item.variantSizeId
          }
        }
      });

      if (stock) {
        const qtyReceived = item.quantityExpected;
        await prisma.stockByWarehouse.update({
          where: { id: stock.id },
          data: {
            physicalStock: stock.physicalStock + qtyReceived,
            inTransitStock: Math.max(0, stock.inTransitStock - qtyReceived)
          }
        });

        await prisma.shipmentItem.update({
          where: { id: item.id },
          data: { quantityReceived: qtyReceived }
        });

        // Record stock movement
        await prisma.stockMovement.create({
          data: {
            toWarehouseId: depGeneral.id,
            variantSizeId: item.variantSizeId,
            quantity: qtyReceived,
            type: 'SHIPMENT_RECEIPT',
            reference: `Recepción Embarque ${shipment.shipmentNumber} (Contenedor ${shipment.containerNumber || 'N/A'})`
          }
        });
      }
    }

    // 2. Auto-Matching: Update preorders linked to this shipment -> READY_TO_SHIP
    const matchedOrderIds = new Set();
    for (const oi of shipment.orderItems) {
      matchedOrderIds.add(oi.orderId);
    }

    for (const orderId of matchedOrderIds) {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'READY_TO_SHIP',
          notes: `Mercadería arribada y asignada automáticamente del Embarque ${shipment.shipmentNumber}. Lista para empaque y factura.`
        }
      });
    }

    // 3. Mark shipment as RECEIVED
    const updatedShipment = await prisma.shipment.update({
      where: { id: shipmentId },
      data: {
        status: 'RECEIVED',
        receivedDate: new Date()
      }
    });

    res.json({
      success: true,
      message: `Embarque ${shipment.shipmentNumber} recibido con éxito. El stock pasó a Físico Real en Depósito General y se asignaron ${matchedOrderIds.size} pedidos de preventa a listos para despacho.`,
      data: updatedShipment,
      matchedOrdersCount: matchedOrderIds.size
    });
  } catch (error) {
    console.error('Error receiving shipment:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
