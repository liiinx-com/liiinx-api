import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';
import { AutoMap } from '@automapper/classes';
import { Webpage } from 'src/webpages/entities/webpage.entity';

@Entity({ name: 'webpage_blocks' })
export class WebpageBlock extends BaseEntity {
  @ManyToOne(() => Webpage, (wp) => wp.blocks)
  @JoinColumn()
  webpage: Webpage;

  @Column()
  webpageId: string;

  @Column()
  @AutoMap()
  blockType: string;

  @Column()
  @AutoMap()
  blockVariant: string;

  @Column({ nullable: true, name: 'is_ltr', default: true })
  @AutoMap()
  isLtr: boolean;

  @Column({ generated: true })
  @AutoMap()
  order: number;

  @Column({ name: 'block_classname', default: '' })
  @AutoMap()
  blockClassName: string;

  @Column({ name: 'block_style', default: {}, type: 'json' })
  @AutoMap()
  blockStyle: object;

  @Column({ name: 'block_contained', default: true })
  @AutoMap()
  blockContained: boolean;

  @Column({ name: 'wrapper_contained', default: false })
  @AutoMap()
  wrapperContained: boolean;

  @Column({ name: 'wrapper_classname', default: '' })
  @AutoMap()
  wrapperClassName: string;

  @Column({ type: 'json', default: {}, name: 'wrapper_style' })
  @AutoMap()
  wrapperStyle: object;
}
