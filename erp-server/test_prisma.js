import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

async function test() {
  console.log('Connecting to Prisma...');
  await prisma.$connect();
  console.log('Connected!');

  const comp = await prisma.company.create({
    data: {
      name: 'SKY BLUE',
      businessName: 'DANIEL ALEJANDRO GRASSO',
      cuit: '20260382161',
      taxCondition: 'IVA Responsable Inscripto'
    }
  });

  console.log('Created company:', comp);
  const all = await prisma.company.findMany();
  console.log('All companies:', all);
}

test().catch(console.error).finally(() => prisma.$disconnect());
