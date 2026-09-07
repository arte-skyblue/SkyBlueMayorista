import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkCount() {
  const pCount = await prisma.product.count();
  const cCount = await prisma.customer.count();
  const vCount = await prisma.productVariantSize.count();
  const sCount = await prisma.stockByWarehouse.count();

  console.log({
    productsCount: pCount,
    customersCount: cCount,
    variantsCount: vCount,
    stockRowsCount: sCount
  });
}

checkCount().finally(() => prisma.$disconnect());
