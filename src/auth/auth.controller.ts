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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { UsersService } from 'src/models/users/users.service';
import {
  CreateUserDto,
  createUserSchema,
} from 'src/models/users/dto/create-user.dto';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('OK')
  async login(@Body(new ZodPipe(loginSchema)) loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('/register')
  @Public()
  @UsePipes(new ZodPipe(createUserSchema))
  @ResponseMessage('User Registered')
  @ApiCreatedResponse({
    schema: { example: { message: 'User created' } },
    description: 'The user has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request invalid input type or credential used.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
