import { Website } from 'src/websites/entities/website.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from 'src/shared/base.entity';
import { LayoutConfig, PageConfig, PageTypes } from '../types';
import { SeoMetadata } from 'src/websites/types';

@Entity({ name: 'website_pages' })
export class WebPage extends BaseEntity {
  @ManyToOne(() => Website, (ws) => ws.pages)
  website: Website;

  @Column({ length: 100, nullable: true })
  title?: string;

  @Column({ length: 100, nullable: true })
  slug?: string;

  @Column({
    type: 'enum',
    enum: PageTypes,
    name: 'page_type',
  })
  pageType: PageTypes;
  @Column({ length: 50, name: 'page_variant' })
  pageVariant: string;
  @Column({ type: 'json', default: {}, name: 'page_overrides' })
  pageOverrides?: PageConfig;

  @Column({ length: 50, name: 'page_custom_layout_code', nullable: true })
  customLayoutCode?: string; // custom layout for a website page (landing pages)
  @Column({ type: 'json', default: {}, name: 'page_custom_layout_overrides' })
  customLayoutOverrides?: LayoutConfig;

  @Column({ type: 'json', default: {}, name: 'seo_metadata' })
  seoMetadata?: SeoMetadata;

  //   // from pageSectionFactory
  //   @Column(() => SectionInfo)
  //   topBarConfig: SectionInfo;

  //   // from pageSectionFactory
  //   @Column(() => SectionInfo)
  //   headerConfig: SectionInfo;

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
}
