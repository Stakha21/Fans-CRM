import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from '../../infrastructure/repository/user.repository';
import { User } from '../../domain/user';
import { ErrorType } from '../../enums/error-types';
import { createPasswordHash } from '../../helpers/create-password-hash';

@Injectable()
export class UsersService {
  private readonly logger = new Logger();

  constructor(private readonly userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User | Error> {
    const { email, password } = createUserDto;

    let user = await this.userRepository.getByEmail(email);

    if (!(user instanceof Error)) {
      return new Error(ErrorType.INVALID_ARGUMENTS);
    }

    const { salt, passwordHash } = await createPasswordHash(password);

    user = await this.userRepository.create({
      email,
      salt,
      hash: passwordHash,
    });

    this.logger.log(user);

    return user;
  }

  async get(referenceId: string): Promise<User | Error> {
    const user = await this.userRepository.get(referenceId);

    this.logger.log(user);

    return user;
  }
}
