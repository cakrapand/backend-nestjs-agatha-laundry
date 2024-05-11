import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PackagesRepository } from './packages.repository';

@Injectable()
export class PackagesService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly packagesRepository: PackagesRepository,
  ) {}

  async findAll() {
    return await this.packagesRepository.getPackages();
  }

  async findOne(id: string) {
    return await this.packagesRepository.getPackageById(id);
  }
}
