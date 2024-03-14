import { hash } from './create-hash';

export type ComparePasswordsParameters = {
  password: string;
  salt: string;
  originalPasswordHash: string;
};

export const comparePasswords = async ({
  password,
  salt,
  originalPasswordHash,
}: ComparePasswordsParameters) => {
  const verySecretSalt = 'VERY-SECRET-SALT';

  const saltWithMagic = await hash(salt, verySecretSalt);
  const passwordHash = await hash(password, saltWithMagic);

  return passwordHash === originalPasswordHash;
};
