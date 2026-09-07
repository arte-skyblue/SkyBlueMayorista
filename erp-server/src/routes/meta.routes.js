import express from 'express';
import { prisma } from '../db.js';

export const metaRouter = express.Router();

// GET /api/v1/meta - Master reference tables for dropdowns and selectors
metaRouter.get('/', async (req, res) => {
  try {
    const [brands, seasons, categories, productTypes, priceLists, warehouses, customers] = await Promise.all([
      prisma.brand.findMany({ orderBy: { name: 'asc' } }),
      prisma.season.findMany({ orderBy: { name: 'asc' } }),
      prisma.category.findMany({ orderBy: { name: 'asc' } }),
      prisma.productType.findMany({ orderBy: { name: 'asc' } }),
      prisma.priceList.findMany({ orderBy: { listNumber: 'asc' } }),
      prisma.warehouse.findMany({ orderBy: { id: 'asc' } }),
      prisma.customer.findMany({ orderBy: { name: 'asc' } })
    ]);

    res.json({
      success: true,
      data: {
        brands,
        seasons,
        categories,
        productTypes,
        priceLists,
        warehouses,
        customers
      }
    });
  } catch (error) {
    console.error('Error fetching meta:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
