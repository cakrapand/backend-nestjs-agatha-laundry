import { AppConfigService } from 'src/common/config/app/config.service';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ChargeOrderDto } from './dto/charge-order.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { OrdersService } from '../orders/orders.service';
import { IOrderStatus } from '../orders/interfaces/order.interface';

@Injectable()
export class MidtransService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly appConfigService: AppConfigService,
    private readonly ordersServices: OrdersService,
    // private readonly transactionsServices: TransactionsService,
  ) {}

  async charge(chargeOrderDto: ChargeOrderDto) {
    this.logger.info(`Charging order ${chargeOrderDto.orderId}`);
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

    //Update Order.orderStatus, Order.redirectUrl and Order.amount
    this.ordersServices.updateOrder(chargeOrderDto.orderId, {
      amount: gross_amount,
      orderStatus: IOrderStatus.ON_PROGRESS,
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

  // async create(midtransHandlingDto: MidtransHandlingDto) {
  //   this.logger.info(
  //     `Midtrans handing ${midtransHandlingDto.order_id}, amount:${midtransHandlingDto.gross_amount}, status: ${midtransHandlingDto.transaction_status}`,
  //   );

  //   try {
  //     if (midtransHandlingDto.transaction_status == 'capture') {
  //       if (midtransHandlingDto.fraud_status == 'accept') {
  //         // Set Transactions.status on db to 'SUCCESS' and Order.status to 'ON_PROGRESS'
  //         await this.transactionsServices.update(midtransHandlingDto.order_id, {
  //           transactionStatus: TransactionStatus.SUCCESS,
  //         });
  //         await this.ordersServices.updateOrder(midtransHandlingDto.order_id, {
  //           orderStatus: IOrderStatus.ON_PROGRESS,
  //         });
  //       }
  //     } else if (midtransHandlingDto.transaction_status == 'settlement') {
  //       // Set Transactions.status on db to 'SUCCESS' and Order.status to 'ON_PROGRESS'
  //       await this.transactionsServices.update(midtransHandlingDto.order_id, {
  //         transactionStatus: TransactionStatus.SUCCESS,
  //       });
  //       await this.ordersServices.updateOrder(midtransHandlingDto.order_id, {
  //         orderStatus: IOrderStatus.ON_PROGRESS,
  //       });
  //     } else if (
  //       midtransHandlingDto.transaction_status == 'cancel' ||
  //       midtransHandlingDto.transaction_status == 'deny' ||
  //       midtransHandlingDto.transaction_status == 'expire'
  //     ) {
  //       // Set Transaction.status on db to 'FAILURE' and Order.status to 'CANCEL'
  //       await this.transactionsServices.update(midtransHandlingDto.order_id, {
  //         transactionStatus: TransactionStatus.FAILURE,
  //       });
  //       await this.ordersServices.updateOrder(midtransHandlingDto.order_id, {
  //         orderStatus: IOrderStatus.CANCEL,
  //       });
  //     } else if (midtransHandlingDto.transaction_status == 'pending') {
  //       // Set Transaction.status on db to 'PENDING' and create Transactions
  //       await this.transactionsServices.update(midtransHandlingDto.order_id, {
  //         transactionStatus: TransactionStatus.PENDING,
  //       });
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //     this.logger.info(
  //       `Midtrans fail handing ${midtransHandlingDto.order_id}, amount:${midtransHandlingDto.gross_amount}, status: ${midtransHandlingDto.transaction_status}`,
  //     );
  //     throw new InternalServerErrorException();
  //   }
  // }

  // async charge(chargeOrderDto: ChargeOrderDto) {
  //   this.logger.info(`Charging order ${chargeOrderDto.orderId}`);
  //   //Count gross amount and check if packageOnService exist
  //   let gross_amount = 0;
  //   for (const orderDetail of chargeOrderDto.orderDetails) {
  //     const detail = await this.ordersServices.findOneOrderDetail(
  //       orderDetail.id,
  //     );
  //     if (!detail) throw new BadRequestException('detail order not ofund');
  //     else
  //       gross_amount += detail.packageOnService.price * +orderDetail.quantity;
  //   }

  //   // //Debug
  //   // console.log(chargeOrderDto);
  //   // console.log(this.appConfigService.midtransServerKey);
  //   // console.log(gross_amount);

  //   const response = await fetch(
  //     'https://app.sandbox.midtrans.com/snap/v1/transactions',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         Authorization: `Basic ${Buffer.from('SB-Mid-server-VjBtW6XPj2X0CCbNlb1n7jF-').toString('base64')}`,
  //       },
  //       body: JSON.stringify({
  //         transaction_details: {
  //           order_id: chargeOrderDto.orderId,
  //           gross_amount: gross_amount,
  //         },
  //         credit_card: {
  //           secure: true,
  //         },
  //         customer_details: {
  //           first_name: chargeOrderDto.costumerName,
  //           email: chargeOrderDto.email,
  //           phone: chargeOrderDto.phone,
  //           address: chargeOrderDto.address,
  //         },
  //       }),
  //     },
  //   );

  //   if (!response.ok)
  //     throw new HttpException(response.statusText, response.status);
  //   const snapToken = await response.json();

  //   //Update Order.orderStatus, Order.redirectUrl and Order.amount
  //   this.ordersServices.updateOrder(chargeOrderDto.orderId, {
  //     redirectUrl: snapToken.redirect_url,
  //     amount: gross_amount,
  //     orderStatus: IOrderStatus.PAYMENT,
  //   });

  //   //Update all of order OrderDetail.quantity accordingly
  //   for (const orderDetail of chargeOrderDto.orderDetails) {
  //     const isOrderDetailUpdated = this.ordersServices.updateOrderDetail(
  //       orderDetail.id,
  //       { quantity: +orderDetail.quantity },
  //     );
  //     if (!isOrderDetailUpdated) throw new InternalServerErrorException();
  //   }

  //   //Create Transactionss
  //   this.transactionsServices.create({
  //     orderId: chargeOrderDto.orderId,
  //     amount: gross_amount,
  //   });
  // }
}
