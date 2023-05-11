import { BaseEntity } from 'src/shared/base.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { PageConfig, PageTypes } from './section-info';

@Entity({ name: 'websites' })
export class Website extends BaseEntity {
  @Column({ length: 100 })
  handle: string;

  @Column({ type: 'json', default: {} })
  config: object;

  @Column({ type: 'json', default: {}, name: 'seo_metadata' })
  seoMetadata: object;

  @Column()
  ownerId: string;

  @OneToMany(() => WebPage, (page) => page.website)
  pages: WebPage[];
}

@Entity({ name: 'website_pages' })
export class WebPage extends BaseEntity {
  @ManyToOne(() => WebPage, (page) => page.website)
  website: Website;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 100 })
  slug: string;

  @Column({
    type: 'enum',
    enum: PageTypes,
    name: 'page_type',
  })
  pageType: PageTypes;
  @Column({ length: 50, name: 'page_variant' })
  pageVariant: string;
  @Column({ type: 'json', default: {}, name: 'page_overrides' })
  pageOverrides: PageConfig;

  @Column({ length: 50, name: 'layout_code', nullable: true })
  layoutCode?: string;
  @Column({ type: 'json', default: {}, name: 'layout_overrides' })
  layoutOverrides: object;

  @Column({ type: 'json', default: {}, name: 'seo_metadata' })
  seoMetadata: object;

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
  themeOverrides: object;
}
