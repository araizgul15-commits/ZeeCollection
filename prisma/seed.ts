// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { name: 'Sample Product 1', priceCents: 1999, description: 'High quality product', sizes: '[]' },
      { name: 'Sample Product 2', priceCents: 2999, description: 'Premium quality', sizes: '[]' },
      { name: 'Sample Product 3', priceCents: 3999, description: 'Luxury item', sizes: '[]' },
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