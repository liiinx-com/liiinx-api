import { BaseEntity } from 'src/shared/base.entity';
import { WebPage } from 'src/webpages/entities/webpage.entity';
import { Entity, Column, OneToMany } from 'typeorm';

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
