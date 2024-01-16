import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        email: 'qwe@qwe.qwe',
        name: 'qwe',
        passwordHash:
          '$2b$10$oHw55w2M4BeXK4FDtIMRx.tds/GQ8XOAXTQCKPlLOH5nWd4vlBNnC',
      },
      {
        id: 2,
        email: 'ewq@ewq.ewq',
        name: 'ewq',
        passwordHash:
          '$2b$10$oHw55w2M4BeXK4FDtIMRx.tds/GQ8XOAXTQCKPlLOH5nWd4vlBNnC',
      },
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
      },
      {
        userId: 2,
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
