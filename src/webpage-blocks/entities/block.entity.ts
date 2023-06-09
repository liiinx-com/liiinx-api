import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import { AutoMap } from '@automapper/classes';
import { BlockProps } from '../dto';

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

  @Column({ type: 'json', default: {}, name: 'block_props' })
  @AutoMap()
  blockProps: BlockProps;

  @Column()
  @AutoMap()
  order: number;
}