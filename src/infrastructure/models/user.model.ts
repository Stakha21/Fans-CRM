import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column
  referenceId: string;

  @Column
  email: string;

  @Column
  hash: string;

  @Column
  salt: string;
}
