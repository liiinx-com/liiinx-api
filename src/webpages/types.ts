import { Website } from 'src/websites/entities/website.entity';
import { PageConfig, PageTypes } from './entities/section-info';

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
