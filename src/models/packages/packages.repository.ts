import { Injectable } from '@nestjs/common';
import { PrismaProviderService } from 'src/provider/prisma/provider.service';

@Injectable()
export class PackagesRepository {
  constructor(private prismaService: PrismaProviderService) {}

  async getPackages() {}
}
