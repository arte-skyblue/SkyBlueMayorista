import express from 'express';
import { prisma } from '../db.js';

export const stockRouter = express.Router();

// GET /api/v1/stock/summary - Real-time comparative stock breakdown
stockRouter.get('/summary', async (req, res) => {
  try {
    const warehouses = await prisma.warehouse.findMany({
      include: {
        stocks: {
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
        }
      }
    });

    const summary = warehouses.map((w) => {
      let totalPhysical = 0;
      let totalCommitted = 0;
      let totalReserved = 0;
      let totalInTransit = 0;

      for (const st of w.stocks) {
        totalPhysical += st.physicalStock;
        totalCommitted += st.committedStock;
        totalReserved += st.reservedStock;
        totalInTransit += st.inTransitStock;
      }

      return {
        id: w.id,
        code: w.code,
        name: w.name,
        type: w.type,
        address: w.address,
        totalItemsCount: w.stocks.length,
        totalPhysicalPares: totalPhysical,
        totalCommittedPares: totalCommitted,
        totalReservedPares: totalReserved,
        totalInTransitPares: totalInTransit,
        availableNowPares: totalPhysical - totalCommitted
      };
    });

    res.json({ success: true, data: summary });
  } catch (error) {
    console.error('Error fetching stock summary:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/stock/transfer - Transfer pairs between Depósito General and Outlet Tapiales
stockRouter.post('/transfer', async (req, res) => {
  try {
    const { fromWarehouseCode, toWarehouseCode, variantSizeId, quantity, notes } = req.body;

    if (!fromWarehouseCode || !toWarehouseCode || !variantSizeId || !quantity) {
      return res.status(400).json({ success: false, error: 'Faltan datos obligatorios para la transferencia' });
    }

    const fromWh = await prisma.warehouse.findUnique({ where: { code: fromWarehouseCode } });
    const toWh = await prisma.warehouse.findUnique({ where: { code: toWarehouseCode } });

    if (!fromWh || !toWh) {
      return res.status(404).json({ success: false, error: 'Depósitos no encontrados' });
    }

    const qty = Number(quantity);
    const varId = Number(variantSizeId);

    // Check origin stock
    const originStock = await prisma.stockByWarehouse.findUnique({
      where: { warehouseId_variantSizeId: { warehouseId: fromWh.id, variantSizeId: varId } }
    });

    if (!originStock || originStock.physicalStock < qty) {
      return res.status(400).json({
        success: false,
        error: `Stock insuficiente en ${fromWh.name}. Stock físico disponible: ${originStock ? originStock.physicalStock : 0}`
      });
    }

    // Decrement origin
    await prisma.stockByWarehouse.update({
      where: { id: originStock.id },
      data: { physicalStock: originStock.physicalStock - qty }
    });

    // Increment destination
    const destStock = await prisma.stockByWarehouse.upsert({
      where: { warehouseId_variantSizeId: { warehouseId: toWh.id, variantSizeId: varId } },
      update: { physicalStock: { increment: qty } },
      create: {
        warehouseId: toWh.id,
        variantSizeId: varId,
        physicalStock: qty,
        committedStock: 0,
        reservedStock: 0,
        inTransitStock: 0
      }
    });

    // Record movement log
    await prisma.stockMovement.create({
      data: {
        fromWarehouseId: fromWh.id,
        toWarehouseId: toWh.id,
        variantSizeId: varId,
        quantity: qty,
        type: 'TRANSFER',
        reference: notes || `Transferencia de ${fromWh.name} a ${toWh.name}`
      }
    });

    res.json({
      success: true,
      message: `Transferencia de ${qty} pares de ${fromWh.name} a ${toWh.name} realizada correctamente.`,
      destStock
    });
  } catch (error) {
    console.error('Error transferring stock:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
