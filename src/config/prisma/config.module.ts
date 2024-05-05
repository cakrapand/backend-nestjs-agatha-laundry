import { Global, Module } from '@nestjs/common';
import { PrismaConfigService } from './config.service';

@Global()
@Module({
  providers: [PrismaConfigService],
  exports: [PrismaConfigService],
})
export class PrismaConfigModule {}
