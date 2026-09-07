import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function inspectProds() {
  const products = await prisma.product.findMany({
    take: 20,
    select: {
      id: true,
      sku: true,
      title: true,
      brand: { select: { name: true } },
      category: { select: { name: true } },
      season: { select: { name: true } },
      productType: { select: { name: true } },
      colors: {
        select: {
          colorName: true,
          sizes: { select: { sizeNumber: true, barcodeEan13: true } }
        }
      }
    }
  });

  console.log('Sample 20 Products in Database:');
  console.table(products.map(p => ({
    id: p.id,
    sku: p.sku,
    title: p.title,
    brand: p.brand.name,
    category: p.category.name,
    season: p.season.name,
    colors: p.colors.map(c => c.colorName).join(', ')
  })));
}

inspectProds().finally(() => prisma.$disconnect());
