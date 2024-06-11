import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UsersService } from '../users/users.service';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class HomeService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
  ) {}

  async getHome(userId: string) {
    this.logger.info(`Get home data ${userId}`);
    const user = await this.usersService.findOneById(userId);
    const orders = await this.ordersService.findActive(userId);
    return { user: user, orders: orders };
  }
}
