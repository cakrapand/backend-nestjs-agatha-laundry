import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { PackagesRepository } from './packages.repository';

@Module({
  controllers: [PackagesController],
  providers: [PackagesService, PackagesRepository],
  exports: [PackagesService],
})
export class PackagesModule {}
