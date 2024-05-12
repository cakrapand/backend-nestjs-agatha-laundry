import { AppConfigService } from 'src/common/config/app/config.service';
import { MidtransHandlingDto } from './dto/midtrans-handling.dto';
import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ChargeOrderDto } from './dto/charge-order.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class MidtransService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly appConfigService: AppConfigService,
    private readonly ordersServices: OrdersService,
  ) {}

  async create(midtransHandlingDto: MidtransHandlingDto) {
    console.log('Executed================================');
    try {
      if (midtransHandlingDto.transaction_status == 'capture') {
        if (midtransHandlingDto.fraud_status == 'accept') {
          // TODO set transaction status on your database to 'success' and response with 200 OK
          // await editTransactionStatusById(order_id, "SUCCESS");
          // await editOrderStatusById(order_id, "PICKED_UP");
        }
      } else if (midtransHandlingDto.transaction_status == 'settlement') {
        // TODO set transaction status on your database to 'success' and response with 200 OK
        // await editTransactionStatusById(order_id, 'SUCCESS');
        // await editOrderStatusById(order_id, 'PICKED_UP');
      } else if (
        midtransHandlingDto.transaction_status == 'cancel' ||
        midtransHandlingDto.transaction_status == 'deny' ||
        midtransHandlingDto.transaction_status == 'expire'
      ) {
        // TODO set transaction status on your database to 'failure' and response with 200 OK
        // await editTransactionStatusById(order_id, 'FAILURE');
        // await editOrderStatusById(order_id, 'CANCEL');
      } else if (midtransHandlingDto.transaction_status == 'pending') {
        // TODO set transaction status on your database to 'pending' / waiting payment
        // await createTransaction({ orderId: order_id, amount: +gross_amount });
      }
    } catch (error: any) {
      throw new InternalServerErrorException();
    }
  }

  async charge(chargeOrderDto: ChargeOrderDto) {
    //Count gross amount and check if packageOnService exist
    let gross_amount = 0;
    for (const orderDetail of chargeOrderDto.orderDetails) {
      const detail = await this.ordersServices.findOneOrderDetail(
        orderDetail.id,
      );
      if (!detail) throw new BadRequestException('detail order not ofund');
      else
        gross_amount += detail.packageOnService.price * +orderDetail.quantity;
    }

    const response = await fetch(
      'https://app.sandbox.midtrans.com/snap/v1/transactions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Basic ${Buffer.from(this.appConfigService.midtransServerKey).toString('base64')}`,
        },
        body: JSON.stringify({
          transaction_details: {
            order_id: chargeOrderDto.orderId,
            gross_amount: gross_amount,
          },
          credit_card: {
            secure: true,
          },
          customer_details: {
            first_name: chargeOrderDto.costumerName,
            email: chargeOrderDto.email,
            phone: chargeOrderDto.phone,
            address: chargeOrderDto.address,
          },
        }),
      },
    );

    if (!response.ok) new HttpException(response.statusText, response.status);
    const snapToken = await response.json();

    //Update Order.redirectUrl and Order.amount
    this.ordersServices.updateOrder(chargeOrderDto.orderId, {
      redirectUrl: snapToken.redirect_url,
      amount: gross_amount,
    });

    //Update all of order OrderDetail.quantity accordingly
    for (const orderDetail of chargeOrderDto.orderDetails) {
      const isOrderDetailUpdated = this.ordersServices.updateOrderDetail(
        orderDetail.id,
        { quantity: +orderDetail.quantity },
      );
      if (!isOrderDetailUpdated) throw new InternalServerErrorException();
    }
  }
}
