import { Module } from '@nestjs/common';
import { UsersModule } from './models/users/users.module';
import { OrdersModule } from './models/orders/orders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, OrdersModule, AuthModule],
})
export class AppModule {}
