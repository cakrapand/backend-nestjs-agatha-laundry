import { z } from 'zod';
import { IOrderStatus } from '../interfaces/order.interface';

export class UpdateOrderDto {
  redirectUrl?: string;
  amount?: number;
  orderStatus?: IOrderStatus;
}

export const updateOrderSchema = z.object({
  redirectUrl: z.string().optional(),
  amount: z.number().optional(),
  orderStatus: z.nativeEnum(IOrderStatus).optional(),
});
