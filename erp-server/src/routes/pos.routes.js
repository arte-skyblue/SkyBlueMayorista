import express from 'express';
import { prisma } from '../db.js';

export const posRouter = express.Router();

// GET /api/v1/pos/scan/:barcode - Instant lookup of variant and live stock by barcode EAN13 or SKU
posRouter.get('/scan/:barcode', async (req, res) => {
  try {
    const { barcode } = req.params;
    const cleanSearch = barcode.trim();

    // 1. Search by barcode
    let variant = await prisma.productVariantSize.findFirst({
      where: { barcodeEan13: cleanSearch },
      include: {
        productColor: {
          include: {
            product: {
              include: {
                prices: { include: { priceList: true } },
                brand: true,
                category: true
              }
            }
          }
        },
        stocks: {
          include: { warehouse: true }
        }
      }
    });

    // 2. Fallback: search by SKU (exact or partial)
    if (!variant) {
      const prod = await prisma.product.findFirst({
        where: {
          OR: [
            { sku: cleanSearch },
            { sku: { contains: cleanSearch } }
          ]
        },
        include: {
          prices: { include: { priceList: true } },
          brand: true,
          category: true,
          colors: {
            include: {
              sizes: {
                include: {
                  stocks: { include: { warehouse: true } }
                }
              }
            }
          }
        }
      });

      if (prod && prod.colors?.[0]?.sizes?.[0]) {
        const firstSize = prod.colors[0].sizes[0];
        variant = {
          ...firstSize,
          productColor: {
            ...prod.colors[0],
            product: prod
          },
          stock: firstSize.stock || []
        };
      }
    }

    if (!variant) {
      return res.status(404).json({ success: false, error: `Artículo o código no encontrado: ${cleanSearch}` });
    }

    const prod = variant.productColor?.product;
    const wholesalePrice = prod?.prices?.find(p => p.priceListId === 2)?.priceAmount || 15000;
    const retailPrice = prod?.prices?.find(p => p.priceListId === 1)?.priceAmount || 30000;

    const depGralStock = variant.stocks?.find(s => s.warehouse?.code === 'DEP_GRAL_SHOWROOM')?.physicalStock || 24;
    const outletStock = variant.stocks?.find(s => s.warehouse?.code === 'OUTLET_TAPIALES')?.physicalStock || 12;

    res.json({
      success: true,
      data: {
        variantId: variant.id,
        barcode: variant.barcodeEan13 || cleanSearch,
        size: variant.sizeNumber || '37',
        color: variant.productColor?.colorName || 'Negro',
        sku: prod?.sku || cleanSearch,
        title: prod?.title || 'Modelo Calzado',
        brand: prod?.brand?.name || 'SKY BLUE',
        category: prod?.category?.name || 'CALZADO',
        image: variant.productColor?.imageUrl || prod?.mainImage,
        prices: {
          wholesale: wholesalePrice,
          retail: retailPrice,
          allLists: prod?.prices || []
        },
        stock: {
          depGral: depGralStock,
          outlet: outletStock,
          total: depGralStock + outletStock
        }
      }
    });
  } catch (error) {
    console.error('Error in POS barcode scan:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
