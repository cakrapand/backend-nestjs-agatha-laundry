import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, createUserSchema } from './dto/create-user-dto';
import { ZodPipe } from 'src/common/pipes/validation.pipe';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { IJwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @UsePipes(new ZodPipe(createUserSchema))
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  async findOne(@User() user: IJwtPayload) {
    return await this.usersService.findOneById(user.id);
  }
}
