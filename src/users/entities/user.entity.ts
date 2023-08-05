import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/shared/base.entity';
import { Entity, Column } from 'typeorm';

export enum UserRole {
  USER = 'USER',
  EMPLOYEE = 'EMPLOYEE',
  BUSINESS_PARTNER = 'BUSINESS_PARTNER',
  ADMIN = 'ADMIN',
}

@Entity()
export class User extends BaseEntity {
  @Column({ name: 'first_name' })
  @AutoMap()
  firstName: string;

  @Column({ name: 'last_name' })
  @AutoMap()
  lastName: string;

  @Column({ name: 'photo_url' })
  @AutoMap()
  photoUrl: string;

  @Column({ name: 'google_userid' })
  @AutoMap()
  googleUserId: string;

  @Column({ name: 'display_name' })
  @AutoMap()
  displayName: string;

  @Column()
  @AutoMap()
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: [UserRole.USER],
  })
  roles: string[];

  @Column({ length: 100, default: 'GMT' })
  timezone: string;
}
