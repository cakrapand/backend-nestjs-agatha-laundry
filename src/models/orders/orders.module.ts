import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { UsersModule } from '../users/users.module';
import { PackagesModule } from '../packages/packages.module';

@Module({
  imports: [UsersModule, PackagesModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
