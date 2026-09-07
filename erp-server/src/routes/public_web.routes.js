import express from 'express';
import { prisma } from '../db.js';

export const publicWebRouter = express.Router();

// GET /api/v1/public/catalog - Consumed directly by SkyBlue Web Store
publicWebRouter.get('/catalog', async (req, res) => {
  try {
    const { brand, category, featured } = req.query;

    const where = {
      isPublishedWeb: true
    };

    if (featured === 'true') where.isFeatured = true;

    const products = await prisma.product.findMany({
      where,
      include: {
        brand: true,
        season: true,
        category: true,
        prices: {
          where: {
            priceListId: { in: [1, 2, 9] } // 1: Público, 2: Mayorista, 9: ML
          },
          include: { priceList: true }
        },
        colors: {
          include: {
            sizes: {
              include: {
                stocks: {
                  include: { warehouse: true }
                },
                shipmentItems: {
                  include: { shipment: true }
                }
              }
            }
          }
        }
      },
      orderBy: [
        { isFeatured: 'desc' },
        { id: 'desc' }
      ]
    });

    const formatted = products.map((p) => {
      const publicPrice = p.prices.find((pr) => pr.priceList.listNumber === 1)?.priceAmount || Math.round(p.priceCost * 2.0);
      const wholesalePrice = p.prices.find((pr) => pr.priceList.listNumber === 2)?.priceAmount || Math.round(p.priceCost * 1.5);

      // Extract all incoming ETA dates if product has items in transit
      const incomingShipmentETAs = [];
      let totalStockOutlet = 0;
      let totalStockDepGral = 0;
      let totalStockInTransit = 0;

      const colorsData = p.colors.map((c) => {
        const sizesData = c.sizes.map((s) => {
          const outletSt = s.stocks.find((st) => st.warehouse.code === 'OUTLET_TAPIALES')?.physicalStock || 0;
          const depGralSt = s.stocks.find((st) => st.warehouse.code === 'DEP_GRAL_SHOWROOM')?.physicalStock || 0;
          const inTransitSt = s.stocks.find((st) => st.warehouse.code === 'DEP_GRAL_SHOWROOM')?.inTransitStock || 0;

          totalStockOutlet += outletSt;
          totalStockDepGral += depGralSt;
          totalStockInTransit += inTransitSt;

          for (const si of s.shipmentItems) {
            if (si.shipment && si.shipment.status === 'IN_TRANSIT') {
              incomingShipmentETAs.push(si.shipment.etaDate);
            }
          }

          return {
            size: s.sizeNumber,
            barcode: s.barcodeEan13,
            stockOnline: outletSt,
            stockShowroom: depGralSt,
            stockInTransit: inTransitSt,
            isAvailable: (outletSt + depGralSt) > 0
          };
        });

        return {
          id: c.id,
          name: c.colorName,
          hex: c.hexCode,
          sizes: sizesData
        };
      });

      const nextArrivalDate = incomingShipmentETAs.length > 0
        ? new Date(Math.min(...incomingShipmentETAs.map((d) => new Date(d).getTime()))).toLocaleDateString('es-AR')
        : null;

      return {
        id: p.id,
        sku: p.sku,
        title: p.title,
        description: p.description,
        brand: p.brand.name,
        season: p.season.name,
        category: p.category.name,
        publicPrice,
        wholesalePrice,
        isFeatured: p.isFeatured,
        mainImage: p.mainImage,
        images: p.imagesJson ? JSON.parse(p.imagesJson) : [p.mainImage],
        inStockPhysical: totalStockOutlet + totalStockDepGral,
        inStockInTransit: totalStockInTransit,
        isAvailableNow: (totalStockOutlet + totalStockDepGral) > 0,
        hasPreorderAvailable: totalStockInTransit > 0,
        nextArrivalDate,
        colors: colorsData
      };
    });

    res.json({
      success: true,
      count: formatted.length,
      timestamp: new Date().toISOString(),
      products: formatted
    });
  } catch (error) {
    console.error('Error fetching public catalog:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
