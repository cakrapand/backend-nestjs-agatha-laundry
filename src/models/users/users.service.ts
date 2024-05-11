import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { hashPassword } from 'src/common/helpers/hash.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    this.logger.info(`Register user ${createUserDto.email}`);

    if (await this.usersRepository.getUserByEmail(createUserDto.email))
      throw new BadRequestException('Email used');

    try {
      const hashedPassword = await hashPassword(createUserDto.password);

      const newUser = await this.usersRepository.createUserCredential({
        email: createUserDto.email,
        password: hashedPassword,
      });
      if (!newUser)
        throw new InternalServerErrorException('Failed create user');

      const newProfile = await this.usersRepository.createUserProfile({
        address: createUserDto.address,
        name: createUserDto.name,
        userCredentialId: newUser.id,
        phone: createUserDto.phone,
      });
      if (!newProfile)
        throw new InternalServerErrorException('Failed create user');

      return;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    this.logger.info('Getting all user profile');
    return await this.usersRepository.getUsers();
  }

  async findOneById(userCredentialId: string) {
    this.logger.info(`Getting user with id ${userCredentialId}`);
    return await this.usersRepository.getUserById(userCredentialId);
  }

  async findOneByEmail(email: string) {
    this.logger.info(`Getting user with email ${email}`);
    return await this.usersRepository.getUserByEmail(email);
  }

  async update(userCredentialId: string, updateUserDto: UpdateUserDto) {
    this.logger.info(`Updating user with id ${userCredentialId}`);
    await this.usersRepository.updateUserProfile(
      userCredentialId,
      updateUserDto,
    );
  }
}
