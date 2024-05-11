import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcryptjs';

const prisma = new PrismaClient();

const hashPassword = async (value: string) => {
  const salt = await genSalt(10);
  return await hash(value, salt);
};

async function main() {
  const seedUsers = async () => {
    const password = await hashPassword('password');
    for (let i = 0; i < 5; i++) {
      const id = faker.string.uuid();

      await prisma.userCredential.create({
        data: {
          id: id,
          email: faker.internet.email(),

          password: password,
        },
      });

      await prisma.userProfile.create({
        data: {
          name: faker.person.fullName(),
          address: faker.location.street(),
          phone: faker.phone.number(),
          userCredentialId: id,
        },
      });
    }
  };

  const seedAdmins = async () => {
    const password = await hashPassword('password');
    await prisma.admin.createMany({
      data: [
        {
          username: 'superadmin',
          password: password,
          name: 'superadmin name',
          isSuperAdmin: true,
        },
        { username: 'admin1', password: password, name: 'admin 1 name' },
        { username: 'admin2', password: password, name: 'admin 2 name' },
        { username: 'admin3', password: password, name: 'admin 3 name' },
      ],
    });
  };

  const seedPackages = async () => {
    await prisma.package.createMany({
      data: [
        { name: 'Hemat', duration: 3 },
        { name: 'Kilat', duration: 2 },
        { name: 'Express', duration: 1 },
      ],
    });
  };

  const seedServices = async () => {
    await prisma.service.createMany({
      data: [
        { name: 'Setrika' },
        { name: 'Cuci Kering' },
        { name: 'Cuci Kering Setrika' },
      ],
    });
  };

  const seedPackageOnServices = async () => {
    const packages = await prisma.package.findMany();
    const services = await prisma.service.findMany();
    await prisma.packageOnService.createMany({
      data: [
        //Hemat
        { packageId: packages[0].id, serviceId: services[0].id, price: 4000 },
        { packageId: packages[0].id, serviceId: services[1].id, price: 4000 },
        { packageId: packages[0].id, serviceId: services[2].id, price: 5000 },
        //Kilat
        { packageId: packages[1].id, serviceId: services[0].id, price: 6000 },
        { packageId: packages[1].id, serviceId: services[1].id, price: 6000 },
        { packageId: packages[1].id, serviceId: services[2].id, price: 7000 },
        //Express
        { packageId: packages[2].id, serviceId: services[0].id, price: 8000 },
        { packageId: packages[2].id, serviceId: services[1].id, price: 8000 },
        { packageId: packages[2].id, serviceId: services[2].id, price: 9000 },
      ],
    });
  };

  const seedOrders = async () => {
    const userCredentials = await prisma.userCredential.findMany();

    await prisma.order.createMany({
      data: [
        {
          userCredentialId: userCredentials[0].id,
          amount: 10000,
          // redirectUrl: "a",
        },
        {
          userCredentialId: userCredentials[1].id,
          amount: 10000,
          // redirectUrl: "b",
        },
      ],
    });
  };

  const seedOrderDetails = async () => {
    const packageOnServices = await prisma.packageOnService.findMany();
    const orders = await prisma.order.findMany();

    await prisma.orderDetail.createMany({
      data: [
        {
          orderId: orders[0].id,
          packageOnServiceId: packageOnServices[0].id,
          quantity: 1,
        },
        {
          orderId: orders[0].id,
          packageOnServiceId: packageOnServices[6].id,
          quantity: 6,
        },
        {
          orderId: orders[1].id,
          packageOnServiceId: packageOnServices[3].id,
          quantity: 3,
        },
        {
          orderId: orders[1].id,
          packageOnServiceId: packageOnServices[6].id,
          quantity: 6,
        },
      ],
    });
  };

  // const seedTransactions = async () => {
  //   const orders = await prisma.order.findMany();

  //   await prisma.transaction.createMany({
  //     data: [
  //       { orderId: orders[0].id, amount: 10000 },
  //       { orderId: orders[1].id, amount: 15000 },
  //     ],
  //   });
  // };

  await seedUsers();
  await seedAdmins();
  await seedPackages();
  await seedServices();
  await seedPackageOnServices();
  await seedOrders();
  await seedOrderDetails();
  // await seedTransactions();
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
