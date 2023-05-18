import { BaseEntity } from 'src/shared/base.entity';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { WebsiteConfigDto } from '../dto/sections.dto';

@Entity({ name: 'websites' })
export class Website extends BaseEntity {
  @Column({ length: 100 })
  handle: string;

  @Column({ type: 'json', default: {} })
  config: WebsiteConfigDto;

  @Column()
  ownerId: string;

  @OneToMany(() => Webpage, (page) => page.website, { cascade: true })
  pages: Webpage[];
}
