import { BaseEntity } from 'src/shared/base.entity';
import { WebPage } from 'src/webpages/entities/webpage.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { SeoMetadata, WebsiteConfig } from '../types';

@Entity({ name: 'websites' })
export class Website extends BaseEntity {
  @Column({ length: 100 })
  handle: string;

  @Column({ type: 'json', default: {} })
  config: WebsiteConfig;

  @Column({ type: 'json', default: {}, name: 'seo_metadata' })
  seoMetadata: SeoMetadata;

  @Column()
  ownerId: string;

  @OneToMany(() => WebPage, (page) => page.website)
  pages: WebPage[];
}
