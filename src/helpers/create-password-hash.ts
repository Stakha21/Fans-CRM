import * as crypto from 'crypto';
import { hash } from './create-hash';

export const createPasswordHash = async (password: string) => {
  const verySecretSalt = 'VERY-SECRET-SALT';

  const salt = crypto.randomBytes(20).toString('hex');
  const saltWithMagic = await hash(salt, verySecretSalt);
  const passwordHash = await hash(password, saltWithMagic);

  return { salt, passwordHash };
};
