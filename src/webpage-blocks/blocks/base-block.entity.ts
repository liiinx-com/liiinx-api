import { AutoMap } from '@automapper/classes';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseBlockEntity {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  baseBlockId: string;
}
