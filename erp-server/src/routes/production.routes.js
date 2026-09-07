import express from 'express';
import { prisma } from '../db.js';

export const productionRouter = express.Router();

// Mock production and workshops state
const WORKSHOPS = [
  { id: 1, name: 'FABRICA CENTRAL', type: 'PROPIO', contact: 'Daniel Grasso', phone: '11-4455-6677', activeJobs: 3, capacityPairsPerWeek: 1200 },
  { id: 2, name: 'TALLER FEDE MARRA', type: 'EXTERNO', contact: 'Federico Marra', phone: '11-3322-1100', activeJobs: 2, capacityPairsPerWeek: 600 },
  { id: 3, name: 'TALLER SANTIAGO', type: 'EXTERNO', contact: 'Santiago Rodríguez', phone: '11-9988-7766', activeJobs: 1, capacityPairsPerWeek: 450 }
];

const PRODUCTION_ORDERS = [
  {
    id: 'OP-2026-081',
    sku: '04748',
    modelTitle: 'MIAMI PLATAFORMA',
    workshop: 'TALLER FEDE MARRA',
    stage: 'APARADO_Y_COSTURA', // CORTE, APARADO, ARMADO, SUELA, EMPAQUE, TERMINADO
    pairsQuantity: 360,
    destajoRatePerPair: 1850,
    totalDestajoCost: 666000,
    startDate: '2026-08-15',
    estimatedFinishDate: '2026-08-28',
    status: 'IN_PROGRESS',
    materialsAssigned: [
      { name: 'Capellada PU Blanco', qty: '180 mts' },
      { name: 'Forro Textil Respirable', qty: '90 mts' },
      { name: 'Bases TR Miami 35-40', qty: '360 pares' }
    ]
  },
  {
    id: 'OP-2026-082',
    sku: '0759',
    modelTitle: 'LEAN CONFORT HOMBRE',
    workshop: 'FABRICA CENTRAL',
    stage: 'ARMADO_Y_SUELA',
    pairsQuantity: 240,
    destajoRatePerPair: 2200,
    totalDestajoCost: 528000,
    startDate: '2026-08-18',
    estimatedFinishDate: '2026-09-02',
    status: 'IN_PROGRESS',
    materialsAssigned: [
      { name: 'Cuero Vacuno Floater', qty: '320 dm2' },
      { name: 'Plantilla Confort memory', qty: '240 pares' },
      { name: 'Fondo Inyectado Eva/Goma', qty: '240 pares' }
    ]
  },
  {
    id: 'OP-2026-083',
    sku: '007',
    modelTitle: 'SANDALIA LAURA TACO',
    workshop: 'TALLER SANTIAGO',
    stage: 'EMPAQUE_FINAL',
    pairsQuantity: 480,
    destajoRatePerPair: 1500,
    totalDestajoCost: 720000,
    startDate: '2026-08-05',
    estimatedFinishDate: '2026-08-25',
    status: 'READY_FOR_INSPECTION',
    materialsAssigned: [
      { name: 'Tiras Charol Negro', qty: '120 mts' },
      { name: 'Tacos Forrados 7cm', qty: '480 pares' },
      { name: 'Hebillas Níquel 14mm', qty: '960 unidades' }
    ]
  }
];

// GET /api/v1/production - Summary of workshops and active production orders
productionRouter.get('/', (req, res) => {
  const totalPairsInProduction = PRODUCTION_ORDERS.reduce((acc, o) => acc + o.pairsQuantity, 0);
  const totalDestajoPending = PRODUCTION_ORDERS.reduce((acc, o) => acc + o.totalDestajoCost, 0);

  res.json({
    success: true,
    data: {
      workshops: WORKSHOPS,
      orders: PRODUCTION_ORDERS,
      kpis: {
        totalPairsInProduction,
        totalDestajoPending,
        activeWorkshops: WORKSHOPS.length,
        activeOrdersCount: PRODUCTION_ORDERS.length
      }
    }
  });
});

// POST /api/v1/production/orders - Create New Production Order
productionRouter.post('/orders', (req, res) => {
  const { sku, modelTitle, workshop, pairsQuantity, destajoRatePerPair, estimatedFinishDate, materialsAssigned } = req.body;
  const newOrder = {
    id: `OP-2026-${Math.floor(100 + Math.random() * 900)}`,
    sku,
    modelTitle: modelTitle || `Modelo ${sku}`,
    workshop: workshop || 'FABRICA CENTRAL',
    stage: 'CORTE',
    pairsQuantity: parseInt(pairsQuantity) || 120,
    destajoRatePerPair: parseFloat(destajoRatePerPair) || 1800,
    totalDestajoCost: (parseInt(pairsQuantity) || 120) * (parseFloat(destajoRatePerPair) || 1800),
    startDate: new Date().toISOString().split('T')[0],
    estimatedFinishDate: estimatedFinishDate || '2026-09-15',
    status: 'IN_PROGRESS',
    materialsAssigned: materialsAssigned || []
  };

  PRODUCTION_ORDERS.unshift(newOrder);
  res.status(201).json({ success: true, data: newOrder });
});

// PATCH /api/v1/production/orders/:id/advance - Advance stage or complete
productionRouter.patch('/orders/:id/advance', (req, res) => {
  const { id } = req.params;
  const { nextStage, status } = req.body;

  const order = PRODUCTION_ORDERS.find(o => o.id === id);
  if (!order) return res.status(404).json({ success: false, error: 'Orden no encontrada' });

  if (nextStage) order.stage = nextStage;
  if (status) order.status = status;

  res.json({ success: true, data: order });
});
