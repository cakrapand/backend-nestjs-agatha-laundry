import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { IJwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
