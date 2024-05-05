// import { hashPassword } from '../src/common/helpers/hash.helper';
// import prisma from '../src/utils/db.server';
// import { faker } from '@faker-js/faker';

// async function main() {
//   const seedUsers = async () => {
//     const password = await hashPassword('password');
//     for (let i = 0; i < 5; i++) {
//       const id = faker.string.uuid();

//       await prisma.userCredential.create({
//         data: {
//           id: id,
//           email: faker.internet.email(),

//           password: password,
//         },
//       });

//       await prisma.userProfile.create({
//         data: {
//           name: faker.person.fullName(),
//           address: faker.location.street(),
//           phone: faker.phone.number(),
//           userCredentialId: id,
//         },
//       });
//     }
//   };

//   const seedAdmins = async () => {
//     const password = await hashPassword('password');
//     await prisma.admin.createMany({
//       data: [
//         {
//           username: 'superadmin',
//           password: password,
//           name: 'superadmin name',
//           isSuperAdmin: true,
//         },
//         { username: 'admin1', password: password, name: 'admin 1 name' },
//         { username: 'admin2', password: password, name: 'admin 2 name' },
//         { username: 'admin3', password: password, name: 'admin 3 name' },
//       ],
//     });
//   };

//   const seedServices = async () => {
//     await prisma.service.createMany({
//       data: [
//         { name: 'Reguler', price: 4000, duration: 3 },
//         { name: 'Express', price: 6000, duration: 2 },
//         { name: 'Same Day', price: 10000, duration: 1 },
//       ],
//     });
//   };

//   const seedOrders = async () => {
//     const services = await prisma.service.findMany();
//     const userCredentials = await prisma.userCredential.findMany();

//     await prisma.order.createMany({
//       data: [
//         {
//           serviceId: services[0].id,
//           userCredentialId: userCredentials[0].id,
//           redirectUrl: 'a',
//           quantity: 1,
//         },
//         {
//           serviceId: services[1].id,
//           userCredentialId: userCredentials[1].id,
//           redirectUrl: 'b',
//           quantity: 1,
//         },
//         {
//           serviceId: services[1].id,
//           userCredentialId: userCredentials[2].id,
//           redirectUrl: 'c',
//           quantity: 1,
//         },
//       ],
//     });
//   };

//   const seedTransactions = async () => {
//     const orders = await prisma.order.findMany();

//     await prisma.transaction.createMany({
//       data: [
//         { orderId: orders[0].id, amount: 10000 },
//         { orderId: orders[1].id, amount: 15000 },
//         { orderId: orders[2].id, amount: 20000 },
//       ],
//     });
//   };

//   await seedUsers();
//   await seedAdmins();
//   await seedServices();
//   await seedOrders();
//   await seedTransactions();
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
