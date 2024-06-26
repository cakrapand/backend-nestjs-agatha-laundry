import { Injectable } from '@nestjs/common';
import { IUserCredential, IUserProfile } from './interfaces/user.interface';
import { PrismaProviderService } from 'src/provider/prisma/provider.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private prismaService: PrismaProviderService) {}

  async getUsers() {
    return await this.prismaService.userCredential.findMany({
      include: {
        userProfile: true,
      },
    });
  }

  async getUserByEmail(email: string) {
    return await this.prismaService.userCredential.findUnique({
      where: { email: email },
      include: { userProfile: true },
    });
  }

  async getUserById(userCredentialId: string) {
    return await this.prismaService.userCredential.findUnique({
      where: { id: userCredentialId },
      include: { userProfile: true },
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

  async updateUserProfile(
    userCredentialId: string,
    userProfile: UpdateUserDto,
  ) {
    await this.prismaService.userProfile.update({
      where: { userCredentialId: userCredentialId },
      data: { ...userProfile },
    });
  }
}
