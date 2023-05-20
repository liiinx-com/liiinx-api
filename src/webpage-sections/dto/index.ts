import { AutoMap } from '@automapper/classes';
import { HeroItem } from '../dto/hero-props.builder';

export * from '../dto/hero-props.builder';
export class SectionProps {}
export class HeroProps extends SectionProps {
  items: HeroItem[];
  constructor() {
    super();
    this.items = [];
  }
}
export class TopBarProps extends SectionProps {}
export class HeaderProps extends SectionProps {}
export class FooterProps extends SectionProps {}

export class GenericSectionDto {
  @AutoMap()
  sectionType: string;

  @AutoMap()
  sectionVariant: string;

  @AutoMap()
  sectionProps: SectionProps;

  @AutoMap()
  order: number;
}
