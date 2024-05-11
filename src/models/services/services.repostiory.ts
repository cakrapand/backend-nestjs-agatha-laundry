import { Injectable } from '@nestjs/common';
import { PrismaProviderService } from 'src/provider/prisma/provider.service';

@Injectable()
export class ServicesRepository {
  constructor(private readonly prismaService: PrismaProviderService) {}

  async getServices() {
    return await this.prismaService.service.findMany();
  }

  async getServiceById(serviceId: string) {
    return await this.prismaService.service.findUnique({
      where: { id: serviceId },
    });
  }
}
