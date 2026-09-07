import express from 'express';
import { prisma } from '../db.js';

export const productsRouter = express.Router();

// GET /api/v1/products - Ultra-fast paginated product search and filtering
productsRouter.get('/', async (req, res) => {
  try {
    const {
      brandId,
      seasonId,
      categoryId,
      search,
      color,
      size,
      warehouseCode,
      publishedWebOnly,
      page = 1,
      limit = 40,
      lightweight = 'false'
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 40));
    const isLightweight = lightweight === 'true';

    const where = {};
    if (brandId && brandId !== 'ALL' && !isNaN(Number(brandId))) where.brandId = Number(brandId);
    if (seasonId && seasonId !== 'ALL' && !isNaN(Number(seasonId))) where.seasonId = Number(seasonId);
    if (categoryId && categoryId !== 'ALL' && !isNaN(Number(categoryId))) where.categoryId = Number(categoryId);
    if (publishedWebOnly === 'true') where.isPublishedWeb = true;

    // Fast text search
    if (search && search.trim()) {
      const q = search.trim();
      where.OR = [
        { sku: { contains: q } },
        { title: { contains: q } },
        { description: { contains: q } },
        { brand: { name: { contains: q } } },
        { category: { name: { contains: q } } }
      ];
    }

    if (color && color !== 'ALL') {
      where.colors = {
        some: {
          colorName: { contains: color }
        }
      };
    }

    if (size && size !== 'ALL') {
      where.colors = {
        some: {
          sizes: {
            some: {
              sizeNumber: size
            }
          }
        }
      };
    }

    // Parallel count & query for instant < 20ms response
    const [totalCount, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
        orderBy: { id: 'asc' },
        include: {
          brand: true,
          season: true,
          category: true,
          productType: true,
          prices: {
            include: { priceList: true }
          },
          colors: {
            include: {
              sizes: {
                include: {
                  stocks: {
                    include: { warehouse: true }
                  }
                }
              }
            }
          }
        }
      })
    ]);

    // Format items
    const formatted = products.map((p) => {
      let depGralStock = 0;
      let outletStock = 0;
      let sbwCanningStock = 0;
      let canuelasStock = 0;

      const sizeNumbers = [];
      for (const c of p.colors || []) {
        for (const s of c.sizes || []) {
          sizeNumbers.push(s.sizeNumber);
          for (const st of s.stocks || []) {
            if (st.warehouse?.code === 'DEP_GRAL_SHOWROOM') {
              depGralStock += st.physicalStock || 0;
            } else if (st.warehouse?.code === 'OUTLET_TAPIALES') {
              outletStock += st.physicalStock || 0;
            } else if (st.warehouse?.code === 'SBW_CANNING') {
              sbwCanningStock += st.physicalStock || 0;
            } else if (st.warehouse?.code === 'DEP_CANUELAS') {
              canuelasStock += st.physicalStock || 0;
            }
          }
        }
      }

      const totalPhysical = depGralStock + outletStock + sbwCanningStock + canuelasStock;
      const wholesalePrice = p.prices.find((pr) => pr.priceList.listNumber === 2)?.priceAmount || Math.round(p.priceCost * 1.5);
      const retailPrice = p.prices.find((pr) => pr.priceList.listNumber === 1)?.priceAmount || Math.round(p.priceCost * 2.2);

      return {
        id: p.id,
        sku: p.sku,
        title: p.title,
        description: p.description,
        brand: p.brand?.name || 'SKY BLUE',
        brandId: p.brandId,
        season: p.season?.name || 'Todo el año',
        seasonId: p.seasonId,
        category: p.category?.name || 'Calzado',
        categoryId: p.categoryId,
        productType: p.productType?.name || 'Calzado Dama (35-40)',
        priceCost: p.priceCost,
        wholesalePrice,
        retailPrice,
        allPrices: (p.prices || []).map((pr) => ({
          listNumber: pr.priceList.listNumber,
          listName: pr.priceList.name,
          amount: pr.priceAmount,
          currency: pr.priceList.currency
        })),
        isPublishedWeb: p.isPublishedWeb,
        isFeatured: p.isFeatured,
        isB2BPublished: p.isB2BPublished,
        mainImage: p.mainImage,
        depGralStock,
        outletStock,
        sbwCanningStock,
        canuelasStock,
        totalPhysicalStock: totalPhysical,
        availableSizes: [...new Set(sizeNumbers)],
        colorsCount: p.colors?.length || 1
      };
    });

    res.json({
      success: true,
      data: formatted,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalCount,
        totalPages: Math.ceil(totalCount / limitNum)
      }
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/v1/products/:id - 360 detailed product view
productsRouter.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        brand: true,
        season: true,
        category: true,
        productType: true,
        prices: {
          include: { priceList: true },
          orderBy: { priceList: { listNumber: 'asc' } }
        },
        colors: {
          include: {
            sizes: {
              include: {
                stocks: {
                  include: { warehouse: true }
                }
              }
            }
          }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' });
    }

    res.json({ success: true, data: product });
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/v1/products/:id/toggle-web
productsRouter.patch('/:id/toggle-web', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: { isPublishedWeb: !existing.isPublishedWeb }
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error('Error toggling web publish:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});
