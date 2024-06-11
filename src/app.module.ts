import { Module } from '@nestjs/common';
import { UsersModule } from './models/users/users.module';
import { OrdersModule } from './models/orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { PrismaProviderModule } from './provider/prisma/provider.module';
import { LoggerProviderModule } from './provider/logger/provider.module';
import { AppConfigModule } from './common/config/app/config.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AuthGuard } from './common/guards/auth.guard';
import { PackagesModule } from './models/packages/packages.module';
import { ServicesModule } from './models/services/services.module';
import { MidtransModule } from './models/midtrans/midtrans.module';
import { TransactionsModule } from './models/transactions/transactions.module';
import { HomeModule } from './models/home/home.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerProviderModule,
    PrismaProviderModule,
    UsersModule,
    HomeModule,
    AuthModule,
    OrdersModule,
    PackagesModule,
    ServicesModule,
    MidtransModule,
    TransactionsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
