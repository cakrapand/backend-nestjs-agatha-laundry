import { Module } from '@nestjs/common';
import { UsersModule } from './models/users/users.module';
import { OrdersModule } from './models/orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { PrismaProviderModule } from './provider/prisma/provider.module';
import { LoggerProviderModule } from './provider/logger/provider.module';

@Module({
  imports: [
    LoggerProviderModule,
    PrismaProviderModule,
    UsersModule,
    AuthModule,
    OrdersModule,
  ],
})
export class AppModule {}
