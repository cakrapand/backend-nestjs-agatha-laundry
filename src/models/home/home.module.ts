import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { UsersModule } from '../users/users.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [UsersModule, OrdersModule],
  controllers: [HomeController],
  providers: [HomeService],
  exports: [HomeService],
})
export class HomeModule {}
