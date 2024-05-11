import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ServicesRepository } from './services.repostiory';
import { Logger } from 'winston';

@Injectable()
export class ServicesService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly servicesRepository: ServicesRepository,
  ) {}

  async findAll() {
    return await this.servicesRepository.getServices();
  }

  async findOne(id: string) {
    return await this.servicesRepository.getServiceById(id);
  }
}
