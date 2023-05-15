import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';
import { Webpage } from 'src/webpages/entities/webpage.entity';

@Entity({ name: 'menu' })
export class Menu extends BaseEntity {
  @OneToMany(() => Menu, (m) => m.menu, {
    cascade: true,
    nullable: true,
  })
  items?: Menu[];

  @ManyToOne(() => Webpage, (wp) => wp.menus)
  @JoinColumn()
  webpage?: Webpage;
  @Column({ nullable: true })
  webpageId?: string;

  @Column({ default: 'ITEM' }) // TOP_BAR, HEADER_PRIMARY, HEADER_SECONDARY, SIDEBAR, FOOTER_PRIMARY, FOOTER_SECONDARY
  menuType: string;

  @Column({ default: false })
  isParent: boolean;

  @ManyToOne(() => Menu, (menu) => menu.items)
  menu?: Menu;

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
