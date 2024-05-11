import { Injectable } from '@nestjs/common';
import { PrismaProviderService } from 'src/provider/prisma/provider.service';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prismaService: PrismaProviderService) {}
}
