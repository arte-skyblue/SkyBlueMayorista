import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  const prods = await prisma.product.count();
  const vars = await prisma.productVariantSize.count();
  const stocks = await prisma.stockByWarehouse.count();
  const transports = await prisma.transport.count();
  const custs = await prisma.customer.count();
  console.log({ prods, vars, stocks, transports, custs });
  
  const sample = await prisma.product.findFirst({
    select: {
      sku: true,
      title: true,
      brand: { select: { name: true } },
      category: { select: { name: true } },
      season: { select: { name: true } }
    }
  });
  console.log('Sample product:', sample);
}

check().finally(() => prisma.$disconnect());
