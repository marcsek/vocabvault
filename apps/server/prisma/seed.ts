import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { email: 'marek@gmail.com', name: 'Marek', profileImage: '/daco', type: 'ADULT', id: '64c8e1fa-82f4-44f3-8eaf-61d92172f74a' },
      { email: 'dado@gmail.com', name: 'Dado', profileImage: '/daco', type: 'ADULT', id: 'f8383cfe-a0ee-44b0-9ac1-79ba349b3e27' },
    ],
  });

  await prisma.wordSource.create({
    data: {
      documentType: 'excel',
      firstLanguage: {
        connectOrCreate: { where: { code: 'sk' }, create: { code: 'sk', languageName: 'Slovak' } },
      },
      secondLanguage: {
        connectOrCreate: { where: { code: 'es' }, create: { code: 'es', languageName: 'Spanish' } },
      },
      creator: { connect: { id: 'f8383cfe-a0ee-44b0-9ac1-79ba349b3e27' } },
      name: 'Marekov source',
      wordPairs: {
        createMany: {
          data: [
            { firstValue: 'a', secondValue: 'b' },
            { firstValue: 's', secondValue: 'x' },
            { firstValue: 'a', secondValue: 'b' },
            { firstValue: 's', secondValue: 'x' },
            { firstValue: 'a', secondValue: 'b' },
            { firstValue: 's', secondValue: 'x' },
            { firstValue: 'a', secondValue: 'b' },
            { firstValue: 's', secondValue: 'x' },
          ],
        },
      },
      userAvailableSources: {
        create: { userId: '64c8e1fa-82f4-44f3-8eaf-61d92172f74a' },
      },
    },
  });

  await prisma.wordSource.create({
    data: {
      documentType: 'excel',
      firstLanguage: {
        connectOrCreate: { where: { code: 'sk' }, create: { code: 'sk', languageName: 'Slovak' } },
      },
      secondLanguage: {
        connectOrCreate: { where: { code: 'es' }, create: { code: 'es', languageName: 'Spanish' } },
      },
      creator: { connect: { id: 'f8383cfe-a0ee-44b0-9ac1-79ba349b3e27' } },
      name: 'Marekov source 2',
      wordPairs: {
        createMany: {
          data: [
            { firstValue: 'a', secondValue: 'b' },
            { firstValue: 'a', secondValue: 'b' },
            { firstValue: 'a', secondValue: 'b' },
            { firstValue: 'a', secondValue: 'b' },
            { firstValue: 'a', secondValue: 'b' },
          ],
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
