import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { User } from '../../infrastructure/models/user.model';
import { UsersRepository } from '../../infrastructure/repository/user.repository';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  exports: [SequelizeModule, UsersRepository],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
})
export class UserModule {}
