import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'data_profile' })
export class Profile extends BaseEntity {
  @Column()
  @AutoMap()
  webpageId: string;

  @Column()
  @AutoMap()
  title: string;

  @AutoMap()
  @Column({ nullable: true })
  copyrightText?: string;

  @AutoMap()
  @Column({ nullable: true })
  termsText?: string;

  @AutoMap()
  @Column({ nullable: true })
  privacyText?: string;
}
