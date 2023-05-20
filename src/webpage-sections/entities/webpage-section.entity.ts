import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import { AutoMap } from '@automapper/classes';
import { SectionProps } from '../dto';

@Entity({ name: 'webpage_sections' })
export class WebpageSection extends BaseEntity {
  @ManyToOne(() => Webpage, (wp) => wp.sections)
  @JoinColumn()
  webpage: Webpage;

  @Column()
  webpageId: string;

  @Column()
  @AutoMap()
  sectionType: string;

  @Column()
  @AutoMap()
  sectionVariant: string;

  @Column({ type: 'json', default: {}, name: 'section_props' })
  @AutoMap()
  sectionProps: SectionProps;

  @Column()
  @AutoMap()
  order: number;
}
