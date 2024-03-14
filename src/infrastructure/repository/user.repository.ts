import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User as SequelizeUser } from '../models/user.model';
import {
  CreateUserParameters,
  IUserRepository,
} from '../../port/user.repository.port';
import { ErrorType } from '../../enums/error-types';
import { toDomainUser } from '../mappers/user-mapper';
import { User } from '../../domain/user';
import { v4 } from 'uuid';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(
    @InjectModel(SequelizeUser)
    private readonly userModel: typeof SequelizeUser,
  ) {}

  async create(
    createUserParameters: CreateUserParameters,
  ): Promise<User | Error> {
    try {
      const sequelizeUser = await this.userModel.create({
        email: createUserParameters.email,
        referenceId: v4(),
        salt: createUserParameters.salt,
        hash: createUserParameters.hash,
      });

      return toDomainUser(sequelizeUser);
    } catch (error) {
      return new Error(ErrorType.UNEXPECTED_BEHAVIOR);
    }
  }

  async getByEmail(email: string): Promise<User | Error> {
    try {
      const sequelizeUser = await this.userModel.findOne({
        where: {
          email,
        },
      });

      return toDomainUser(sequelizeUser);
    } catch (error) {
      return new Error(ErrorType.UNEXPECTED_BEHAVIOR);
    }
  }

  async get(referenceId: string): Promise<User | Error> {
    try {
      console.log(referenceId);

      const sequelizeUser = await this.userModel.findOne({
        where: {
          referenceId,
        },
      });

      return toDomainUser(sequelizeUser);
    } catch (error) {
      return new Error(ErrorType.UNEXPECTED_BEHAVIOR);
    }
  }
}
