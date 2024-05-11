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

  findAll() {
    return this.servicesRepository.getServices();
  }

  findOne(id: string) {
    return this.servicesRepository.getServiceById(id);
  }
}
