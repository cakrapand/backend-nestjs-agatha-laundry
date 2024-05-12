import { z } from 'zod';

export class MidtransHandlingDto {
  order_id: string;
  transaction_status: string;
  fraud_status: string;
  gross_amount: string;
}

export const midtransHandlingSchema = z.object({
  order_id: z.string({ required_error: 'order_id is required' }),
  transaction_status: z.string({
    required_error: 'transaction_status is required',
  }),
  fraud_status: z.string({ required_error: 'fraud_status is required' }),
  gross_amount: z.string({ required_error: 'gross_amount is required' }),
});
