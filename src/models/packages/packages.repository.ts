import { Injectable } from '@nestjs/common';
import { PrismaProviderService } from 'src/provider/prisma/provider.service';

@Injectable()
export class PackagesRepository {
  constructor(private readonly prismaService: PrismaProviderService) {}

  async getPackages() {
    return await this.prismaService.packageOnService.findMany({
      include: {
        package: true,
        service: true,
      },
    });
  }

  async getPackageById(packageOnServiceId: string) {
    return await this.prismaService.packageOnService.findUnique({
      where: { id: packageOnServiceId },
      include: {
        package: true,
        service: true,
      },
    });
  }
}
