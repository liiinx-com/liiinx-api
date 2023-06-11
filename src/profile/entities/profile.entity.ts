import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';
import { AutoMap } from '@automapper/classes';

export class Logo {
  @Column({ name: 'text_logo', nullable: true })
  @AutoMap()
  textLogo?: string;

  @Column({ name: 'text_logo_props', default: {}, type: 'json' })
  @AutoMap()
  textLogoProps?: object;

  @Column({ name: 'image_logo_url', nullable: true })
  @AutoMap()
  imageLogoUrl?: string;

  @Column({ type: 'json', name: 'image_logo_props', default: {} })
  @AutoMap()
  imageLogoProps?: object;

  @Column({ nullable: true })
  @AutoMap()
  slogan?: string;

  @Column({ type: 'json', name: 'slogan_props', default: {} })
  @AutoMap()
  sloganProps?: object;
}

@Entity({ name: 'data_profile' })
export class Profile extends BaseEntity {
  @Column()
  @AutoMap()
  webpageId: string;

  @Column(() => Logo)
  @AutoMap(() => Logo)
  headerLogo: Logo;

  @Column(() => Logo)
  @AutoMap(() => Logo)
  footerLogo: Logo;

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
