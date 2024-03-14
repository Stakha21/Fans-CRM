import { User } from '../../../domain/user';

export class UserDto {
  email: string;
  referenceId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.email = user.email;
    this.referenceId = user.referenceId;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
