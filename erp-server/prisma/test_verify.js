import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const p = await prisma.product.findFirst({
    where: { sku: { contains: '175019' } },
    include: { brand: true, category: true, prices: true, colors: true }
  });
  console.log('=== PRODUCTO VERIFICADO EN SQLITE ===');
  console.log('SKU:', p?.sku);
  console.log('Title:', p?.title);
  console.log('Brand:', p?.brand?.name);
  console.log('Category (Rubro):', p?.category?.name);
  console.log('Main Image:', p?.mainImage);
  console.log('Prices count:', p?.prices?.length);
}

main().catch(console.error).finally(() => prisma.$disconnect());
