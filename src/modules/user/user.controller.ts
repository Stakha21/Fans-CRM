import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service';
import { response } from 'express';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller({ path: 'user', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto | Error> {
    const user = await this.usersService.create(createUserDto);

    if (user instanceof Error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();

      return user;
    }

    return new UserDto(user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findOne(@Req() req: Request): Promise<UserDto | Error> {
    const referenceId = req['user'].referenceId;

    const user = await this.usersService.get(referenceId);

    if (user instanceof Error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();

      return user;
    }

    return new UserDto(user);
  }
}
