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
  sectionProps: object;

  constructor() {
    this.sectionProps = {};
  }
}

export class SeoMetadata {}

export class TopBar {}

export class Header extends Section {
  constructor() {
    super();
  }
}
