import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: 'qwe@qwe.qwe',
        name: 'qwe',
        passwordHash:
          '$2b$10$oHw55w2M4BeXK4FDtIMRx.tds/GQ8XOAXTQCKPlLOH5nWd4vlBNnC',
      },
      {
        email: 'ewq@ewq.ewq',
        name: 'ewq',
        passwordHash:
          '$2b$10$oHw55w2M4BeXK4FDtIMRx.tds/GQ8XOAXTQCKPlLOH5nWd4vlBNnC',
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        name: 'Product 1',
        price: 10,
      },
      {
        name: 'Product 2',
        price: 20,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
