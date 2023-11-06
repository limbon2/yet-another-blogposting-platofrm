import { AfterCreate, Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { IUser } from '../interface/user.interface';

const tableName = 'users';

@Entity({ tableName })
export class UserEntity implements IUser {
  @PrimaryKey({ type: 'uuid' })
  public id: string;

  @Property({ type: 'varchar', length: 96 })
  public username: string;

  @Index()
  @Property({ unique: true })
  public email: string;

  @Property()
  public password: string;

  @Property()
  public createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  public updatedAt: Date = new Date();

  @AfterCreate()
  public hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 12);
  }
}
