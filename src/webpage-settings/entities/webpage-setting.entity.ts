import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';
import { Webpage } from 'src/webpages/entities/webpage.entity';

@Entity({ name: 'webpage_settings' })
export class WebpageSetting extends BaseEntity {
  setValue(val: object | string | number | boolean) {
    if (typeof val === 'object') this.value = val;
    else if (['string', 'number', 'boolean', 'bigint'].includes(typeof val))
      this.value = { __value: val };
  }

  getValue() {
    if (this.value['__value']) return this.value['__value'];
    return this.value;
  }

  @ManyToOne(() => Webpage, (wp) => wp.settings)
  @JoinColumn()
  webpage: Webpage;

  @Column()
  webpageId: string;

  @Column()
  key: string;

  @Column({ type: 'json' })
  value: object;
}
