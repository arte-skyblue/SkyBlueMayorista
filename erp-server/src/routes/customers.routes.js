import express from 'express';
import { prisma } from '../db.js';

export const customersRouter = express.Router();

// GET /api/v1/customers - Full list of real customers with search and filters
customersRouter.get('/', async (req, res) => {
  try {
    const { search, customerType, onlyDebtors } = req.query;

    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { businessName: { contains: search } },
        { cuit: { contains: search } },
        { code: { contains: search } },
        { city: { contains: search } }
      ];
    }
    if (customerType) {
      where.customerType = customerType;
    }
    if (onlyDebtors === 'true') {
      where.currentBalance = { gt: 0 };
    }

    const customers = await prisma.customer.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        priceList: true,
        orders: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    const totalDebtors = customers.reduce((acc, c) => acc + (c.currentBalance > 0 ? c.currentBalance : 0), 0);

    res.json({
      success: true,
      count: customers.length,
      totalDebtorsBalance: totalDebtors,
      data: customers
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/v1/customers/:id - Customer Detail & Account Statement
customersRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await prisma.customer.findUnique({
      where: { id: parseInt(id) },
      include: {
        priceList: true,
        orders: {
          orderBy: { createdAt: 'desc' },
          include: {
            items: {
              include: {
                variantSize: {
                  include: {
                    productColor: {
                      include: {
                        product: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!customer) {
      return res.status(404).json({ success: false, error: 'Cliente no encontrado' });
    }

    res.json({ success: true, data: customer });
  } catch (error) {
    console.error('Error fetching customer detail:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/v1/customers - Create New Customer
customersRouter.post('/', async (req, res) => {
  try {
    const { name, businessName, cuit, customerType, phone, email, address, city, province, creditLimit, priceListId, sellerName } = req.body;

    const newCustomer = await prisma.customer.create({
      data: {
        code: `CLI-${Date.now().toString().slice(-6)}`,
        name,
        businessName: businessName || name,
        cuit: cuit || `30${Date.now().toString().slice(-8)}1`,
        customerType: customerType || 'Mayorista',
        phone: phone || '',
        email: email || '',
        address: address || '',
        city: city || 'Tapiales',
        province: province || 'Buenos Aires',
        creditLimit: parseFloat(creditLimit) || 5000000,
        priceListId: parseInt(priceListId) || 2,
        sellerName: sellerName || 'Juliana',
        currentBalance: 0
      }
    });

    res.status(201).json({ success: true, data: newCustomer });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH /api/v1/customers/:id - Update Customer Details or Balance
customersRouter.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updated = await prisma.customer.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
