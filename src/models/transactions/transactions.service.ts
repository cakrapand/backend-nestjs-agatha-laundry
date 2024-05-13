import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { TransactionsRepository } from './transactions.repository';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    return await this.transactionsRepository.createTransaction(
      createTransactionDto,
    );
  }

  async update(orderId: string, updateTransactionDto: UpdateTransactionDto) {
    return await this.transactionsRepository.updateTransaction(
      orderId,
      updateTransactionDto,
    );
  }
}
