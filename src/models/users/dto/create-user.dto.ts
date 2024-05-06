import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class CreateUserDto {
  @ApiProperty({
    example: 'cakrapand@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    minimum: 8,
    example: 'mysecretpassword',
    required: true,
  })
  password: string;

  @ApiProperty({
    example: 'Cakra',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'Jakarta, Indonesia',
    required: true,
  })
  address: string;

  @ApiProperty({
    example: '081234567890',
    required: true,
  })
  phone: string;
}

export const createUserSchema = z.object({
  email: z.string({ required_error: 'email is required' }),
  password: z
    .string({ required_error: 'password is required' })
    .min(8, 'password at least 8 character'),
  name: z.string({ required_error: 'name is required' }),
  address: z.string({ required_error: 'address is required' }),
  phone: z.string({ required_error: 'phone is required' }),
});
