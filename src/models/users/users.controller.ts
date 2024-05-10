import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/common/decorators/user.decorator';
import { IJwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Public()
  @ResponseMessage('OK')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('/profile')
  @ResponseMessage('OK')
  @ApiBearerAuth()
  async findOne(@User() user: IJwtPayload) {
    return await this.usersService.findOneById(user.id);
  }
}
