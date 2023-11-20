import { Website } from 'src/websites/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';
import { AutoMap } from '@automapper/classes';
import { WebpageBlock } from '../../webpage-blocks/blocks/_base-block/base-block.entity';
import { PageType } from './page-type';

@Entity({ name: 'website_pages' })
export class Webpage extends BaseEntity {
  @ManyToOne(() => Website, (ws) => ws.pages)
  @JoinColumn()
  website: Website;

  @Column()
  websiteId: string;

  @Column({ length: 100 })
  @AutoMap()
  title: string;

  @Column({ length: 300, nullable: true })
  @AutoMap()
  description?: string;

  @Column({ length: 100 })
  @AutoMap()
  slug: string;

  @Column({
    type: 'enum',
    enum: PageType,
    name: 'page_type',
  })
  @AutoMap()
  pageType: PageType;

  @Column({ name: 'is_rtl', default: false })
  isRtl: boolean;

  @Column({ name: 'favicon_url', nullable: true })
  faviconUrl?: string;

  @Column({ length: 50, name: 'page_variant' })
  @AutoMap()
  pageVariant: string;

  @Column({ name: 'is_home_page', default: false })
  @AutoMap()
  isHomePage: boolean;

  @Column({ length: 50, name: 'theme_code', nullable: true })
  themeCode?: string;

  @OneToMany(() => WebpageBlock, (s) => s.webpage, { cascade: true })
  blocks?: WebpageBlock[];

  // @Column({ type: 'json', default: {}, name: 'theme_overrides' })
  // themeOverrides?: ThemeDto; // TODO: strong type
}
