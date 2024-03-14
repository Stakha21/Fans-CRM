import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from '../../infrastructure/repository/user.repository';
import { User } from '../../domain/user';
import { ErrorType } from '../../enums/error-types';
import { createPasswordHash } from '../../helpers/create-password-hash';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User | Error> {
    const { email, password } = createUserDto;

    const user = await this.userRepository.getByEmail(email);

    if (!(user instanceof Error)) {
      return new Error(ErrorType.INVALID_ARGUMENTS);
    }

    const { salt, passwordHash } = await createPasswordHash(password);

    return this.userRepository.create({
      email,
      salt,
      hash: passwordHash,
    });
  }

  async get(referenceId: string): Promise<User | Error> {
    return this.userRepository.get(referenceId);
  }
}
