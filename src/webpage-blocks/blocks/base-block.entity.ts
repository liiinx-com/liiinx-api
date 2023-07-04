import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/shared/base.entity';
import { Column } from 'typeorm';

export class BaseBlockEntity extends BaseEntity {
  // TODO: general block options, rtl, contained, containerStyles...
  @Column({ default: false, name: 'is_rtl' })
  @AutoMap()
  isRtl: boolean;
}
