import { AutoMap } from '@automapper/classes';
import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column({ type: 'boolean', default: true })
  @AutoMap()
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  @AutoMap()
  isArchived: boolean; // visible to user

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean; // only visible to admin

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  internalComment: string | null;
}
