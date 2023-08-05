import { Website } from 'src/websites/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';
import { WebpageSetting } from 'src/webpage-settings/entities/webpage-setting.entity';
import { AutoMap } from '@automapper/classes';
import { Menu } from 'src/menu/entities/menu.entity';
import { SeoMetadataDto } from '../dto/webpage.dto';
import { WebpageBlock } from '../../webpage-blocks/base-block/base-block.entity';
import { PageType } from './page-type';
import { ThemeDto } from 'src/themes/dto/theme.dto';
import { PageLayoutDto } from 'src/webpage-blocks/base-block/base-block.dto';

@Entity({ name: 'website_pages' })
export class Webpage extends BaseEntity {
  @ManyToOne(() => Website, (ws) => ws.pages)
  @JoinColumn()
  website: Website;

  @Column()
  websiteId: string;

  @Column({ length: 100, nullable: true })
  @AutoMap()
  title?: string;

  @OneToMany(() => Menu, (m) => m.webpage, { cascade: true })
  menus: Menu[];

  @OneToMany(() => WebpageSetting, (setting) => setting.webpage, {
    cascade: true,
  })
  settings: WebpageSetting[];

  @Column({ length: 100, nullable: true })
  @AutoMap()
  slug?: string;

  @Column({
    type: 'enum',
    enum: PageType,
    name: 'page_type',
  })
  @AutoMap()
  pageType: PageType;

  @Column({ length: 50, name: 'page_variant' })
  @AutoMap()
  pageVariant: string;

  @Column({ length: 50, name: 'theme_code', nullable: true })
  themeCode?: string;
}
class Webpage2 extends BaseEntity {
  @ManyToOne(() => Website, (ws) => ws.pages)
  @JoinColumn()
  website: Website;

  @Column()
  websiteId: string;

  // @OneToMany(() => WebpageBlock, (s) => s.webpage, { cascade: true })
  // blocks?: WebpageBlock[];

  @OneToMany(() => Menu, (m) => m.webpage, { cascade: true })
  menus: Menu[];

  @Column({ length: 100, nullable: true })
  @AutoMap()
  title?: string;

  @Column({ length: 100, nullable: true })
  @AutoMap()
  slug?: string;

  @Column({
    type: 'enum',
    enum: PageType,
    name: 'page_type',
  })
  @AutoMap()
  pageType: PageType;

  @Column({ length: 50, name: 'page_variant' })
  @AutoMap()
  pageVariant: string;

  @Column({ type: 'json', default: {}, name: 'layout_overrides' })
  layoutOverrides?: Partial<PageLayoutDto>;

  // @Column({ length: 50, name: 'page_custom_layout_variant', nullable: true })
  // customLayoutVariant?: string; // custom layout for a website page (landing pages)
  // @Column({ type: 'json', default: {}, name: 'page_custom_layout_overrides' })
  // customLayoutOverrides?: PageSettingsDto;

  @Column({ type: 'json', default: {}, name: 'seo_metadata' })
  seoMetadata?: SeoMetadataDto;

  //   // from pageSectionFactory
  //   @Column(() => SectionInfo)
  //   topBarConfig: SectionInfo;

  // from pageSectionFactory
  // @Column({ type: 'json', default: {} })
  // header?: Header;

  //   // from pageSectionFactory
  //   @Column(() => SectionInfo)
  //   heroConfig: SectionInfo;

  //   // from pageSectionFactory
  //   @Column(() => SectionInfo)
  //   contentConfig: SectionInfo;

  //   // from pageSectionFactory
  //   @Column(() => SectionInfo)
  //   footerConfig: SectionInfo;

  @Column({ length: 50, name: 'theme_code', nullable: true })
  themeCode?: string;
  @Column({ type: 'json', default: {}, name: 'theme_overrides' })
  themeOverrides?: ThemeDto; // TODO: strong type

  @OneToMany(() => WebpageSetting, (setting) => setting.webpage, {
    cascade: true,
  })
  settings: WebpageSetting[];
}
