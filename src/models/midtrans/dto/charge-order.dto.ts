import { z } from 'zod';

export class ChargeOrderDto {
  orderId: string;
  costumerName: string;
  email: string;
  phone: string;
  address: string;
  orderDetails: [{ id: string; quantity: string }];
}

export const chargeOrderSchema = z.object({
  orderId: z.string({ required_error: 'order id is required' }),
  costumerName: z.string({ required_error: 'constumer name is required' }),
  email: z.string({ required_error: 'email name is required' }),
  phone: z.string({ required_error: 'phone name is required' }),
  address: z.string({ required_error: 'address name is required' }),
  orderDetails: z
    .array(
      z.object({
        id: z.string({
          required_error: 'orderd detail id is required',
        }),
        quantity: z.number({ required_error: 'quantity is required' }),
      }),
    )
    .nonempty('Order Detail is Required'),
});
