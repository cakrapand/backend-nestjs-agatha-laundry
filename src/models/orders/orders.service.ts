import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UsersService } from '../users/users.service';
import { PackagesService } from '../packages/packages.service';
import { IUpdateOrder, IUpdateOrderDetail } from './interfaces/order.interface';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly ordersRepository: OrdersRepository,
    private readonly usersService: UsersService,
    private readonly packagesService: PackagesService,
  ) {}

  async create(userCredentialId: string, createOrderDto: CreateOrderDto) {
    //Check if user exist
    const userCredential =
      await this.usersService.findOneById(userCredentialId);
    if (!userCredential) throw new BadRequestException('User not found');

    //Check if packageOnService is exist
    for (const packageOnServiceId of createOrderDto.packageOnServiceIds) {
      const packageOnService =
        await this.packagesService.findOne(packageOnServiceId);
      if (!packageOnService) throw new BadRequestException('Package not found');
    }

    //Create order
    const order = await this.ordersRepository.createOrder({ userCredentialId });

    //Create detail order
    for (const packageOnService of createOrderDto.packageOnServiceIds) {
      await this.ordersRepository.createOrderDetail({
        orderId: order.id,
        packageOnServiceId: packageOnService,
      });
    }
  }

  async findAll(userCredentialId: string) {
    return this.ordersRepository.getOrders(userCredentialId);
  }

  async findActive(userCredentialId: string) {
    return this.ordersRepository.getActiveOrders(userCredentialId);
  }

  async findOne(orderId: string) {
    return this.ordersRepository.getOrderById(orderId);
  }

  async findOneOrderDetail(orderDetailId: string) {
    return this.ordersRepository.getOrderDetailById(orderDetailId);
  }

  async updateOrder(orderId: string, newOrder: IUpdateOrder) {
    return this.ordersRepository.updateOrderById(orderId, newOrder);
  }

  async updateOrderDetail(
    orderDetailId: string,
    newOrdeDetail: IUpdateOrderDetail,
  ) {
    return this.ordersRepository.updateOrderDetailById(
      orderDetailId,
      newOrdeDetail,
    );
  }
}
