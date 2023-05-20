import { Website } from 'src/websites/entities/website.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';
import { WebpageSetting } from 'src/webpage-settings/entities/webpage-setting.entity';
import { AutoMap } from '@automapper/classes';
import { Menu } from 'src/menu/entities/menu.entity';
import { SeoMetadataDto } from '../dto';
import { PageSettingsDto } from 'src/webpage-settings/dto';
import { WebpageSection } from '../../webpage-sections/entities/webpage-section.entity';

export enum PageTypes {
  LAYOUT = 'LAYOUT',
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
}

@Entity({ name: 'website_pages' })
export class Webpage extends BaseEntity {
  @ManyToOne(() => Website, (ws) => ws.pages)
  @JoinColumn()
  website: Website;

  @Column()
  websiteId: string;

  @OneToMany(() => WebpageSection, (s) => s.webpage, { cascade: true })
  sections?: WebpageSection[];

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
    enum: PageTypes,
    name: 'page_type',
  })
  @AutoMap()
  pageType: PageTypes;

  @Column({ length: 50, name: 'page_variant' })
  @AutoMap()
  pageVariant: string;

  @Column({ type: 'json', default: {}, name: 'page_overrides' })
  pageOverrides?: PageSettingsDto;

  @Column({ length: 50, name: 'page_custom_layout_code', nullable: true })
  customLayoutCode?: string; // custom layout for a website page (landing pages)
  @Column({ type: 'json', default: {}, name: 'page_custom_layout_overrides' })
  customLayoutOverrides?: PageSettingsDto;

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
  themeOverrides?: object; // TODO: strong type

  @OneToMany(() => WebpageSetting, (setting) => setting.webpage, {
    cascade: true,
  })
  settings: WebpageSetting[];
}
