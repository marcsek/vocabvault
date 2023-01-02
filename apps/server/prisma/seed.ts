import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
console.log('tu som');

async function main() {
  const id = '1231231231231';

  await prisma.user.create({
    data: {
      id,
      email: 'marek',
      name: 'Nieco',
      profileImage: 'tiez nieco',
      type: 'ADULT',
      password: 'michael average',
      Parent: {
        create: {},
      },
    },
  });

  await prisma.user.update({
    where: { id: id },
    data: {
      wordSource: {
        create: { secondLanguage: 'german', firstLanguage: 'slovak', documentType: 'Excel', name: 'Moje slovicka' },
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
