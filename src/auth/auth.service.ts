import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { LoginDto } from './dto/login.dto';
import { checkPassword } from 'src/common/helpers/hash.helper';
import { UsersService } from 'src/models/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto) {
    const userCredential = await this.usersService.findOneByEmail(
      loginDto.email,
    );

    if (
      !userCredential ||
      !(await checkPassword(loginDto.password, userCredential.password))
    )
      throw new UnauthorizedException('Wrong email or password');

    return { message: `${userCredential.email} logged in` };
  }
}
