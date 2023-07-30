import { Column, Entity } from 'typeorm';
import { BlockTemplateEntity } from '../../base-block/block-template.entity';

@Entity({ name: 'webpage_header_blocks' })
export class HeaderBlockEntity extends BlockTemplateEntity {
  @Column({ name: 'text_logo' })
  textLogo: string;

  @Column({ name: 'text_logo_style', default: {}, type: 'json' })
  textLogoStyle: object;

  @Column({ name: 'text_logo_classname', default: '' })
  textLogoClassName: string;
}
