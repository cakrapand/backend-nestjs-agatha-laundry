import { Module } from '@nestjs/common';
import { UsersModule } from './models/users/users.module';
import { OrdersModule } from './models/orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { PrismaConfigModule } from './config/prisma/config.module';
import { LoggerConfigModule } from './config/logger/config.module';

@Module({
  imports: [
    LoggerConfigModule,
    PrismaConfigModule,
    UsersModule,
    AuthModule,
    OrdersModule,
  ],
})
export class AppModule {}
