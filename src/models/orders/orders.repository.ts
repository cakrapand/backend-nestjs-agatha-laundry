import { Injectable } from '@nestjs/common';
import { PrismaProviderService } from 'src/provider/prisma/provider.service';
import {
  IOrder,
  IOrderDetail,
  IUpdateOrder,
  IUpdateOrderDetail,
} from './interfaces/order.interface';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prismaService: PrismaProviderService) {}

  async createOrder(order: IOrder) {
    return await this.prismaService.order.create({ data: order });
  }

  async createOrderDetail(orderDetail: IOrderDetail) {
    return await this.prismaService.orderDetail.create({ data: orderDetail });
  }

  async getOrders(userCredentialId: string) {
    return await this.prismaService.order.findMany({
      where: { userCredentialId: userCredentialId },
      include: { orderDetail: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOrderById(orderId: string) {
    return await this.prismaService.order.findUnique({
      where: { id: orderId },
      include: {
        orderDetail: {
          include: {
            packageOnService: { include: { package: true, service: true } },
          },
        },
      },
    });
  }

  async getOrderDetailById(orderDetailId: string) {
    return await this.prismaService.orderDetail.findUnique({
      where: { id: orderDetailId },
      include: { packageOnService: true },
    });
  }

  async updateOrderById(orderId: string, order: IUpdateOrder) {
    return await this.prismaService.order.update({
      where: { id: orderId },
      data: order,
    });
  }

  async updateOrderDetailById(
    orderDetailId: string,
    orderDetail: IUpdateOrderDetail,
  ) {
    return await this.prismaService.orderDetail.update({
      where: { id: orderDetailId },
      data: orderDetail,
    });
  }
}
