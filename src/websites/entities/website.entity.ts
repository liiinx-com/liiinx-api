import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/shared/base.entity';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity({ name: 'websites' })
export class Website extends BaseEntity {
  constructor(partial: Partial<Website> = {}) {
    super();
    Object.assign(this, partial);
  }

  @AutoMap()
  @Column({ length: 100 })
  handle: string;

  @Column()
  ownerId: string;

  @Column({ name: 'custom_url', nullable: true })
  @AutoMap()
  customUrl?: string;

  @Column({ name: 'subscription_plan', default: 'FREE' })
  @AutoMap()
  subscriptionPlan: string;

  @OneToMany(() => Webpage, (page) => page.website, { cascade: true })
  pages: Webpage[];
}
