import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';

@Entity({ name: 'website_menu' })
export class Menu extends BaseEntity {
  @OneToMany(() => Menu, (m) => m.parent, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  items?: Menu[];

  @Column({ default: false })
  isParent: boolean;

  @ManyToOne(() => Menu, (menu) => menu.items)
  parent?: Menu;

  @Column({ default: 0 })
  order?: number;

  @Column({ length: 50, nullable: true })
  title?: string;

  @Column({ length: 100, nullable: true })
  url?: string;

  @Column({ length: 10, nullable: true })
  target?: string;

  @Column({ default: false })
  isFeatured?: boolean;

  @Column({ type: 'json', default: {}, name: 'ui_props' })
  uiProps?: object;

  @Column({ length: 100, nullable: true })
  icon?: string;
}
