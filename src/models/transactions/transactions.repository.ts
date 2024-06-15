// import { Injectable } from '@nestjs/common';
// import { PrismaProviderService } from 'src/provider/prisma/provider.service';
// import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';

// @Injectable()
// export class TransactionsRepository {
//   constructor(private readonly prismaService: PrismaProviderService) {}

//   async createTransaction(createTransactionDto: CreateTransactionDto) {
//     return await this.prismaService.transaction.create({
//       data: createTransactionDto,
//     });
//   }

//   async updateTransaction(
//     orderId: string,
//     updateTransactionDto: UpdateTransactionDto,
//   ) {
//     return await this.prismaService.transaction.update({
//       data: updateTransactionDto,
//       where: { orderId: orderId },
//     });
//   }
// }
