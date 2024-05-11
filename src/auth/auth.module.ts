import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/models/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret:
        'c6607902a3495c2c00d7f81155cbeb5386525bbf19f0a45803fa800b57f1c43afa93975482a90ff8d188c52bd1a2ae66ae9936ea00f2728fce82c73e97589830',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
