import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { response } from 'express';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: CreateUserDto,
  ): Promise<Error | { jwt: string }> {
    const signInResult = await this.authService.signIn({
      email: signInDto.email,
      password: signInDto.password,
    });

    if (signInResult instanceof Error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();

      return signInResult;
    }

    return signInResult;
  }
}
