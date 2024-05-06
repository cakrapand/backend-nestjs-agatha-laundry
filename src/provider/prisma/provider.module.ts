import { Global, Module } from '@nestjs/common';
import { PrismaProviderService } from './provider.service';

@Global()
@Module({
  providers: [PrismaProviderService],
  exports: [PrismaProviderService],
})
export class PrismaProviderModule {}
