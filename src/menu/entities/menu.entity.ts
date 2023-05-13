import { Entity } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';

@Entity({ name: 'website_menus' })
export class Menu extends BaseEntity {}

@Entity({ name: 'website_menu_items' })
export class MenuItem extends BaseEntity {}
