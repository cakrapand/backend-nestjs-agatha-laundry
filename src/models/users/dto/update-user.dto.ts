import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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

export const updateUserSchema = z.object({
  name: z.string({ required_error: 'name is required' }),
  address: z.string({ required_error: 'address is required' }),
  phone: z.string({ required_error: 'phone is required' }),
});
