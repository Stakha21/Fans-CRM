export type User = {
  id: number;
  referenceId: string;
  email: string;
  hash: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
};
