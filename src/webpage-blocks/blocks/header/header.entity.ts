import { Column, Entity } from 'typeorm';
import { BaseBlockEntity } from '../base-block.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'webpage_header_block' })
export class HeaderBlock extends BaseBlockEntity {
  @Column({ nullable: true })
  @AutoMap()
  height?: number;
}
