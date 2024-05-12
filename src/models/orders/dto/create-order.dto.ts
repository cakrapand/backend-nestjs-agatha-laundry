import { z } from 'zod';

export class CreateOrderDto {
  packageOnServiceIds: string[];
}

export const createOrderSchema = z.object({
  packageOnServiceIds: z
    .array(z.string({ required_error: 'packageOnServiceId is required' }))
    .nonempty('Order Detail is Required'),
});
