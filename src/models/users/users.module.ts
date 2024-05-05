import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaConfigModule } from 'src/config/prisma/config.module';
import { LoggerConfigModule } from 'src/config/logger/config.module';

@Module({
  imports: [PrismaConfigModule, LoggerConfigModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
