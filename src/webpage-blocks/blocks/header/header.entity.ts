import { Column, Entity } from 'typeorm';
import { BlockTemplateEntity } from '../_base-block/block-template.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'webpage_header_blocks' })
export class HeaderBlockEntity extends BlockTemplateEntity {
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
