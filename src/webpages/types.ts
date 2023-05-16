export class LayoutConfig {}

export enum PageTypes {
  LAYOUT = 'LAYOUT',
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
}

export class PageConfig {
  icon: string;
  isRtl: boolean;
}

export class Section {
  sectionType: string;
  sectionVariant: string;
  sectionProps?: object;

  constructor() {
    this.sectionProps = {};
  }
}

export class SeoMetadata {}

export class TopBar {}

export class MenuItem {
  title: string;
  icon?: string;
  url: string;
  target: string;
  order: number;
  isFeatured: boolean;
  props?: object;
}

export class Header extends Section {
  constructor() {
    super();
    this.sectionType = 'HEADER';
  }
}
