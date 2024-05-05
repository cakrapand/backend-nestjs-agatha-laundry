import { Injectable } from '@nestjs/common';
import { PrismaConfigService } from 'src/config/prisma/config.service';
import { IUserCredential, IUserProfile } from './interfaces/user.interface';

@Injectable()
export class UsersRepository {
  constructor(private prismaService: PrismaConfigService) {}

  async getUsers() {
    return await this.prismaService.userCredential.findMany({
      include: {
        userProfile: true,
      },
    });
  }

  async getUserCredentialByEmail(email: string) {
    return await this.prismaService.userCredential.findUnique({
      where: { email: email },
    });
  }

  async getUserProfileById(credentialId: string) {
    return await this.prismaService.userProfile.findUnique({
      where: { userCredentialId: credentialId },
    });
  }

  async createUserCredential(userCredential: IUserCredential) {
    return await this.prismaService.userCredential.create({
      data: userCredential,
    });
  }

  async createUserProfile(userProfile: IUserProfile) {
    return await this.prismaService.userProfile.create({
      data: userProfile,
    });
  }
}
