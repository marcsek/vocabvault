import { PrismaClient } from '@prisma/client';
import { generateProfilePicture } from '../dist/utils/generateProfilePicture.js';

const generateSocialId = () => Math.floor(100000000 + Math.random() * 900000000);

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      socialId: generateSocialId(),
      email: 'jakubmarcek95@gmail.com',
      name: 'Jakub Marcek',
      profileImage: await generateProfilePicture('Jakub Marcek'),
      type: 'ADULT',
      id: 'd0683cd7-02b3-4835-9d51-eb0b4292867b',
      Parent: { create: {} },
    },
  });

  await prisma.user.create({
    data: {
      socialId: generateSocialId(),
      email: 'jakubmarcek955@gmail.com',
      name: 'Jakub Marcek',
      profileImage: await generateProfilePicture('Jakub Marcek'),
      type: 'CHILD',
      id: 'b31fd8af-ac15-4d91-af3c-27ae3537e9ed',
      Child: { create: { parentId: 'd0683cd7-02b3-4835-9d51-eb0b4292867b' } },
    },
  });

  await prisma.user.createMany({
    data: [
      {
        email: 'marek@gmail.com',
        socialId: generateSocialId(),
        name: 'Marek',
        profileImage: await generateProfilePicture('Jakub Marcek'),
        type: 'ADULT',
        id: '64c8e1fa-82f4-44f3-8eaf-61d92172f74a',
      },
      {
        email: 'dado@gmail.com',
        socialId: generateSocialId(),
        name: 'Dado',
        profileImage: await generateProfilePicture('Jakub Marcek'),
        type: 'ADULT',
        id: 'f8383cfe-a0ee-44b0-9ac1-79ba349b3e27',
      },
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
      name: 'Marekovi zdielany source',
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
        createMany: { data: [{ userId: '64c8e1fa-82f4-44f3-8eaf-61d92172f74a' }, { userId: 'd0683cd7-02b3-4835-9d51-eb0b4292867b' }] },
      },
    },
  });

  await prisma.wordSource.create({
    data: {
      documentType: 'excel',
      firstLanguage: {
        connectOrCreate: { where: { code: 'sk' }, create: { code: 'sk', languageNAame: 'Slovak' } },
      },
      secondLanguage: {
        connectOrCreate: { where: { code: 'es' }, create: { code: 'es', languageName: 'Spanish' } },
      },
      creator: { connect: { id: 'd0683cd7-02b3-4835-9d51-eb0b4292867b' } },
      name: 'Marekov marcekov source',
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

  await prisma.wordSource.create({
    data: {
      documentType: 'excel',
      firstLanguage: {
        connectOrCreate: { where: { code: 'sk' }, create: { code: 'sk', languageName: 'Slovak' } },
      },
      secondLanguage: {
        connectOrCreate: { where: { code: 'es' }, create: { code: 'es', languageName: 'Spanish' } },
      },
      creator: { connect: { id: 'd0683cd7-02b3-4835-9d51-eb0b4292867b' } },
      name: 'Marekov zdiealny marcekov source',
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
      userAvailableSources: {
        createMany: { data: [{ userId: '64c8e1fa-82f4-44f3-8eaf-61d92172f74a' }, { userId: 'b31fd8af-ac15-4d91-af3c-27ae3537e9ed' }] },
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
