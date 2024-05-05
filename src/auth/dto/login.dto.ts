import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string({ required_error: 'email is required' }),
  password: z.string({ required_error: 'password is required' }),
});

export type LoginDto = z.infer<typeof loginSchema>;
