// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { name: 'Sample Product 1', price: 19.99 },
      { name: 'Sample Product 2', price: 29.99 },
      { name: 'Sample Product 3', price: 39.99 },
    ],
  });
  console.log('Sample products inserted.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });