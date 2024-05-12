import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { MidtransService } from './midtrans.service';
import {
  MidtransHandlingDto,
  midtransHandlingSchema,
} from './dto/midtrans-handling.dto';
import { ZodPipe } from 'src/common/pipes/validation.pipe';
import { Public } from 'src/common/decorators/public.decorator';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { ChargeOrderDto, chargeOrderSchema } from './dto/charge-order.dto';

@Controller('api/midtrans')
export class MidtransController {
  constructor(private readonly midtransService: MidtransService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @Public()
  create(
    @Body(new ZodPipe(midtransHandlingSchema))
    midtransHandlingDto: MidtransHandlingDto,
  ) {
    return this.midtransService.create(midtransHandlingDto);
  }

  @Post('charge')
  @Public()
  @ResponseMessage('Order charged')
  charge(@Body(new ZodPipe(chargeOrderSchema)) chargeOrderDto: ChargeOrderDto) {
    return this.midtransService.charge(chargeOrderDto);
  }
}
