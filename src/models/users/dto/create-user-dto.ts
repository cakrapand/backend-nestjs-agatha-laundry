import { z } from 'zod';

class CreateUserDto {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
}

const createUserSchema = z.object({
  email: z.string({ required_error: 'email is required' }),
  password: z.string({ required_error: 'password is required' }),
  name: z.string({ required_error: 'name is required' }),
  address: z.string({ required_error: 'address is required' }),
  phone: z.string({ required_error: 'phone is required' }),
});

export { CreateUserDto, createUserSchema };
