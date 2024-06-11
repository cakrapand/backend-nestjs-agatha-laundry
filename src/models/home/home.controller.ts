import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { User } from 'src/common/decorators/user.decorator';
import { IJwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { ResponseMessage } from 'src/common/decorators/response.decorator';

@Controller('api/home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @ResponseMessage('OK')
  async getHome(@User() user: IJwtPayload) {
    return await this.homeService.getHome(user.id);
  }
}
