import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CreateUserDto } from './dto/create-user-dto';
import { hashPassword } from 'src/common/helpers/hash.helper';

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

      return { message: 'User created' };
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    this.logger.info('Getting all user profile');
    return await this.usersRepository.getUsers();
  }

  async findOneById(id: string) {
    this.logger.info(`Getting user with id ${id}`);
    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findOneByEmail(email: string) {
    this.logger.info(`Getting user with email ${email}`);
    const user = await this.usersRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
