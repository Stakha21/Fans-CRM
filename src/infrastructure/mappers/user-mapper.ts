import { User as SequelizeUser } from '../models/user.model';
import { User } from '../../domain/user';

export function toDomainUser(sequelizeUser: SequelizeUser): User {
  return {
    id: sequelizeUser.id,
    referenceId: sequelizeUser.referenceId,
    email: sequelizeUser.email,
    salt: sequelizeUser.salt,
    hash: sequelizeUser.hash,
    createdAt: sequelizeUser.createdAt,
    updatedAt: sequelizeUser.updatedAt,
  };
}
