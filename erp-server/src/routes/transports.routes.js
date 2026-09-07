import express from 'express';
import { prisma } from '../db.js';

export const transportsRouter = express.Router();

// GET /api/v1/transports
transportsRouter.get('/', async (req, res) => {
  try {
    const transports = await prisma.transport.findMany({
      orderBy: { name: 'asc' }
    });
    res.json({ success: true, count: transports.length, data: transports });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
