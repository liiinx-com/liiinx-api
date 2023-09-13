import { AutoMap } from '@automapper/classes';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BlockTemplateEntity {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column({ name: 'base_block_id' })
  @AutoMap()
  baseBlockId: string;
}
