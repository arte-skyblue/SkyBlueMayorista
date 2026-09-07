import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  const companies = await prisma.company.count();
  const warehouses = await prisma.warehouse.count();
  const brands = await prisma.brand.count();
  const seasons = await prisma.season.count();
  const categories = await prisma.category.count();
  const products = await prisma.product.count();
  const colors = await prisma.productColor.count();
  const variants = await prisma.productVariantSize.count();
  const stocks = await prisma.stockByWarehouse.count();
  const shipments = await prisma.shipment.count();
  const customers = await prisma.customer.count();
  const orders = await prisma.order.count();

  console.log({
    companies,
    warehouses,
    brands,
    seasons,
    categories,
    products,
    colors,
    variants,
    stocks,
    shipments,
    customers,
    orders
  });
}

check().catch(console.error).finally(() => prisma.$disconnect());
