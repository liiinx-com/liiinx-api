import { BaseEntity } from 'src/shared/base.entity';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity({ name: 'websites' })
export class Website extends BaseEntity {
  @Column({ length: 100 })
  handle: string;

  @Column()
  ownerId: string;

  @OneToMany(() => Webpage, (page) => page.website, { cascade: true })
  pages: Webpage[];
}
