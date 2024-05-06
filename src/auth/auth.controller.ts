import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodPipe } from 'src/common/pipes/validation.pipe';
import { LoginDto, loginSchema } from './dto/login.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UsersService } from 'src/models/users/users.service';
import {
  CreateUserDto,
  createUserSchema,
} from 'src/models/users/dto/create-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodPipe(loginSchema))
  async login(@Body(new ZodPipe(loginSchema)) loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('/register')
  @UsePipes(new ZodPipe(createUserSchema))
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request invalid input type or credential used.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
