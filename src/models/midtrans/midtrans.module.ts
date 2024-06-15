import { Module } from '@nestjs/common';
import { MidtransService } from './midtrans.service';
import { MidtransController } from './midtrans.controller';
import { PackagesModule } from '../packages/packages.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [PackagesModule, OrdersModule],
  controllers: [MidtransController],
  providers: [MidtransService],
  exports: [MidtransService],
})
export class MidtransModule {}
