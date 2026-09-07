import express from 'express';
import { prisma } from '../db.js';

export const ordersRouter = express.Router();

// GET /api/v1/orders - Get all orders with full detail for Kanban
ordersRouter.get('/', async (req, res) => {
  try {
    const { status, customerId } = req.query;

    const where = {};
    if (status) where.status = status;
    if (customerId) where.customerId = Number(customerId);

    const orders = await prisma.order.findMany({
      where,
      include: {
        customer: true,
        warehouse: true,
        items: {
          include: {
            variantSize: {
              include: {
                productColor: {
                  include: {
                    product: {
                      include: { brand: true }
                    }
                  }
                }
              }
            },
            shipment: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formatted = orders.map((o) => {
      const totalPairs = o.items.reduce((sum, it) => sum + it.quantity, 0);

      return {
        id: o.id,
        orderNumber: o.orderNumber,
        customerName: o.customer.name,
        customerBusiness: o.customer.businessName,
        customerCuit: o.customer.cuit,
        customerPhone: o.customer.phone,
        warehouseName: o.warehouse.name,
        orderType: o.orderType,
        status: o.status,
        totalAmount: o.totalAmount,
        totalPairs,
        paymentMethod: o.paymentMethod,
        sellerName: o.sellerName || o.customer.sellerName || 'Showroom',
        notes: o.notes,
        createdAt: o.createdAt,
        items: o.items.map((it) => ({
          id: it.id,
          sku: it.variantSize.productColor.product.sku,
          title: it.variantSize.productColor.product.title,
          brand: it.variantSize.productColor.product.brand.name,
          color: it.variantSize.productColor.colorName,
          size: it.variantSize.sizeNumber,
          quantity: it.quantity,
          unitPrice: it.unitPrice,
          subtotal: it.subtotal,
          isPreorder: it.isPreorder,
          shipmentNumber: it.shipment?.shipmentNumber,
          etaDate: it.shipment?.etaDate
        }))
      };
    });

    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/orders - Create new order
ordersRouter.post('/', async (req, res) => {
  try {
    const { customerId, warehouseCode, orderType, paymentMethod, notes, sellerName, items } = req.body;

    if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Cliente e ítems son obligatorios' });
    }

    const warehouse = await prisma.warehouse.findUnique({
      where: { code: warehouseCode || 'DEP_GRAL_SHOWROOM' }
    });

    const count = await prisma.order.count();
    const orderNumber = `PED-2026-${String(count + 1).padStart(4, '0')}`;

    let calculatedTotal = 0;
    const itemsData = [];

    for (const it of items) {
      const qty = Number(it.quantity) || 1;
      const price = Number(it.unitPrice) || 0;
      const subtotal = qty * price;
      calculatedTotal += subtotal;

      itemsData.push({
        variantSizeId: Number(it.variantSizeId),
        quantity: qty,
        unitPrice: price,
        subtotal,
        isPreorder: it.isPreorder || false,
        shipmentId: it.shipmentId ? Number(it.shipmentId) : null
      });

      // Mark committedStock on warehouse if physical order
      if (!it.isPreorder) {
        const stock = await prisma.stockByWarehouse.findUnique({
          where: { warehouseId_variantSizeId: { warehouseId: warehouse.id, variantSizeId: Number(it.variantSizeId) } }
        });
        if (stock) {
          await prisma.stockByWarehouse.update({
            where: { id: stock.id },
            data: { committedStock: stock.committedStock + qty }
          });
        }
      }
    }

    const isAllPreorder = itemsData.every((i) => i.isPreorder);
    const initialStatus = isAllPreorder ? 'PREORDER_PENDING' : 'NEW';

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: Number(customerId),
        warehouseId: warehouse.id,
        orderType: orderType || (isAllPreorder ? 'WHOLESALE_PREORDER' : 'WHOLESALE_PHYSICAL'),
        status: initialStatus,
        totalAmount: calculatedTotal,
        paymentMethod: paymentMethod || 'CTA_CTE',
        sellerName: sellerName || 'Showroom',
        notes: notes || '',
        items: {
          create: itemsData
        }
      },
      include: {
        customer: true,
        items: {
          include: {
            variantSize: {
              include: {
                productColor: {
                  include: { product: true }
                }
              }
            }
          }
        }
      }
    });

    res.json({ success: true, message: `Pedido ${order.orderNumber} generado con éxito`, data: order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/v1/orders/:id/status - Advance order status in Kanban
ordersRouter.patch('/:id/status', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status, notes } = req.body;

    const validStatuses = ['NEW', 'PREORDER_PENDING', 'APPROVED', 'IN_PICKING', 'READY_TO_SHIP', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Estado de pedido no válido' });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: {
        status,
        ...(notes ? { notes } : {})
      }
    });

    res.json({ success: true, message: `Estado actualizado a ${status}`, data: updated });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/orders/:id/whatsapp-payload - Format clean WhatsApp message for client
ordersRouter.get('/:id/whatsapp-payload', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        warehouse: true,
        items: {
          include: {
            variantSize: {
              include: {
                productColor: {
                  include: { product: { include: { brand: true } } }
                }
              }
            },
            shipment: true
          }
        }
      }
    });

    if (!order) return res.status(404).json({ success: false, error: 'Pedido no encontrado' });

    let message = `👟 *SKY BLUE MAYORISTA - DETALLE DE PEDIDO*\n`;
    message += `📋 *Pedido N°:* ${order.orderNumber}\n`;
    message += `👤 *Cliente:* ${order.customer.name} (${order.customer.businessName || ''})\n`;
    message += `🏬 *Depósito/Origen:* ${order.warehouse.name}\n`;
    message += `🔖 *Estado:* ${order.status}\n`;
    message += `------------------------------------\n`;

    let totalPairs = 0;
    for (const it of order.items) {
      const prod = it.variantSize.productColor.product;
      const color = it.variantSize.productColor.colorName;
      const size = it.variantSize.sizeNumber;
      totalPairs += it.quantity;

      message += `• *${prod.brand.name} ${prod.sku}* (${color} - Talle ${size})\n`;
      message += `   ${it.quantity} pares × $${it.unitPrice.toLocaleString('es-AR')} = *$${it.subtotal.toLocaleString('es-AR')}*\n`;
      if (it.isPreorder && it.shipment) {
        message += `   _⏳ Preventa en tránsito - Arribo estimado: ${new Date(it.shipment.etaDate).toLocaleDateString('es-AR')}_\n`;
      }
    }

    message += `------------------------------------\n`;
    message += `📦 *Total Pares:* ${totalPairs}\n`;
    message += `💰 *Total Final:* $${order.totalAmount.toLocaleString('es-AR')}\n`;
    message += `💳 *Forma de Pago:* ${order.paymentMethod || 'A convenir'}\n`;
    message += `\n¡Gracias por elegir Sky Blue Mayorista! 🙌`;

    const phone = order.customer.phone ? order.customer.phone.replace(/[^0-9]/g, '') : '';
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    res.json({
      success: true,
      text: message,
      whatsappUrl,
      customerPhone: order.customer.phone
    });
  } catch (error) {
    console.error('Error generating WhatsApp payload:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
