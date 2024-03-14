import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UsersRepository } from '../../infrastructure/repository/user.repository';
import { ErrorType } from '../../enums/error-types';
import { comparePasswords } from '../../helpers/compare-passwords';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: CreateUserDto): Promise<any> {
    const user = await this.usersRepository.getByEmail(email);

    if (user instanceof Error) {
      return new Error(ErrorType.INVALID_ARGUMENTS);
    }

    const isPasswordValid = await comparePasswords({
      password,
      salt: user.salt,
      originalPasswordHash: user.hash,
    });

    console.log(isPasswordValid);

    if (!isPasswordValid) {
      return new Error(ErrorType.INVALID_ARGUMENTS);
    }

    const payload = {
      referenceId: user.referenceId,
    };

    return {
      jwt: await this.jwtService.signAsync(payload),
    };
  }
}
