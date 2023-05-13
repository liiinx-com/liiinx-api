import { Website } from 'src/websites/entities/website.entity';

export class LayoutConfig {}

// TODO: replace with WebPageEntity
export class CreateWebPageParams {
  website: Website;
  title?: string;
  slug?: string;

  pageType: PageTypes;
  pageVariant: string;
  pageOverrides?: PageConfig;

  customLayoutCode?: string;
  customLayoutOverrides?: object;

  seoMetadata?: object;
  themeCode?: string;
  themeOverrides?: object;
}

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
