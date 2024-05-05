import { z } from 'zod';

class loginDto {
  email: string;
  password: string;
}

const loginSchema = z.object({
  email: z.string({ required_error: 'email is required' }),
  password: z.string({ required_error: 'password is required' }),
});

export { loginDto, loginSchema };
