import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';

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

  @Column()
  webpageId: string;

  @Column()
  key: string;

  @Column({ type: 'json' })
  value: object;
}
