import { Column } from 'typeorm';

export class SectionInfo {
  constructor() {
    this.enabled = false;
    this.sectionProps = {};
  }

  @Column({ length: 50, name: 'section_type', nullable: true })
  sectionType?: string;

  @Column({ length: 50, name: 'section_variant', nullable: true })
  sectionVariant?: string;

  @Column({ type: 'json', default: {}, name: 'section_props', nullable: true })
  sectionProps?: object;

  @Column({ default: 0 })
  order: number;

  @Column({ default: false })
  enabled: boolean;
}

export class PageConfig {
  icon: string;
  isRtl: boolean;
}

export enum PageTypes {
  LAYOUT = 'LAYOUT',
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
}
