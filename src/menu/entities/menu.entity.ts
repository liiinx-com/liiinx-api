import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';
import { AutoMap } from '@automapper/classes';
import { Webpage } from 'src/webpages/entities/webpage.entity';

@Entity({ name: 'menu' })
export class Menu extends BaseEntity {
  @OneToMany(() => Menu, (m) => m.parent, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  items?: Menu[];

  @ManyToOne(() => Webpage, (wp) => wp.menus)
  @JoinColumn()
  webpage?: Webpage;
  @Column({ nullable: true })
  webpageId?: string;

  @Column({ default: 'ITEM' }) // visit ./menu-keys.ts
  menuType: string;

  @Column({ default: false })
  isParent: boolean;

  @ManyToOne(() => Menu, (menu) => menu.items)
  parent?: Menu;

  @Column({ default: 0 })
  @AutoMap()
  order?: number;

  @Column({ length: 50, nullable: true })
  @AutoMap()
  title?: string;

  @Column({ length: 100, nullable: true })
  @AutoMap()
  url?: string;

  @Column({ length: 10, nullable: true })
  @AutoMap()
  target?: string;

  @Column({ default: false })
  @AutoMap()
  isFeatured?: boolean;

  @Column({ type: 'json', default: {}, name: 'ui_props' })
  @AutoMap()
  uiProps?: object;

  @Column({ length: 100, nullable: true })
  @AutoMap()
  icon?: string;
}
