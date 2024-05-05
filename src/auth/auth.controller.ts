import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodPipe } from 'src/common/pipes/validation.pipe';
import { LoginDto, loginSchema } from './dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ZodPipe(loginSchema))
  async login(@Body(new ZodPipe(loginSchema)) loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
