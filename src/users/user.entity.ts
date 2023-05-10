import { BaseEntity } from 'src/shared/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  USER = 'USER',
  EMPLOYEE = 'EMPLOYEE',
  BUSINESS_PARTNER = 'BUSINESS_PARTNER',
  ADMIN = 'ADMIN',
}

@Entity()
export class User extends BaseEntity {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: [UserRole.USER],
  })
  roles: string[];

  @Column({ length: 100 })
  timezone: string;
}
