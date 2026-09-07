import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { productsRouter } from './routes/products.routes.js';
import { stockRouter } from './routes/stock.routes.js';
import { ordersRouter } from './routes/orders.routes.js';
import { metaRouter } from './routes/meta.routes.js';
import { customersRouter } from './routes/customers.routes.js';
import { productionRouter } from './routes/production.routes.js';
import { transportsRouter } from './routes/transports.routes.js';
import { publicWebRouter } from './routes/public_web.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../../dist');
const productImagesPath = path.resolve(__dirname, '../../public/product-images');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(morgan('dev'));

// Static Product Images
app.use('/product-images', express.static(productImagesPath));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'SkyBlue ERP Core API',
    version: '3.0.0 (Executive Light Mode & Real Data Synced)',
    time: new Date().toISOString()
  });
});

// ERP Routes
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/stock', stockRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/customers', customersRouter);
app.use('/api/v1/production', productionRouter);
app.use('/api/v1/transports', transportsRouter);
app.use('/api/v1/meta', metaRouter);
app.use('/api/v1/public', publicWebRouter);

// Serve static frontend build
app.use(express.static(distPath));

// Fallback for SPA routing
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint no encontrado' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`=============================================`);
  console.log(`🚀 SkyBlue ERP Core API v3.0 en puerto ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/api/health`);
  console.log(`📍 Web ERP: http://localhost:${PORT}/erp`);
  console.log(`🖼️ Static Images: http://localhost:${PORT}/product-images`);
  console.log(`=============================================`);
});
