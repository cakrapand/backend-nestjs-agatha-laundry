import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, createOrderSchema } from './dto/create-order.dto';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { IJwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { ZodPipe } from 'src/common/pipes/validation.pipe';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ResponseMessage('Order created')
  create(
    @User() user: IJwtPayload,
    @Body(new ZodPipe(createOrderSchema)) createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(user.id, createOrderDto);
  }

  @Get()
  @ResponseMessage('OK')
  findAll(@User() user: IJwtPayload) {
    return this.ordersService.findAll(user.id);
  }

  @Get(':orderId')
  @ResponseMessage('OK')
  findOne(@Param('orderId') orderId: string) {
    return this.ordersService.findOne(orderId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, updateOrderDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id);
  // }
}
