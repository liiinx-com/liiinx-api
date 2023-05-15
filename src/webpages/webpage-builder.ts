import { Injectable } from '@nestjs/common';
import { WebPage } from './entities/webpage.entity';
import { LayoutConfig, PageConfig, PageTypes, SeoMetadata } from './types';

interface IWebPageBuilder {
  webpage: WebPage;

  getPage: () => Promise<WebPage>;
  create: (
    websiteId: string,
    type: PageTypes,
    variant: string,
  ) => Promise<IWebPageBuilder>;
  withTitle: (title: string, slug: string) => Promise<IWebPageBuilder>;
  withPageOverride: (overrideConfig: PageConfig) => Promise<IWebPageBuilder>;
  withSeoMetadata: (metadata: SeoMetadata) => Promise<IWebPageBuilder>;
  withLayout: (code: string) => Promise<IWebPageBuilder>;
  withLayoutConfig: (config: LayoutConfig) => Promise<IWebPageBuilder>;
  // withHeader: (header: Header) => Promise<IWebPageBuilder>;
  withWebsiteId: (websiteId: string) => Promise<IWebPageBuilder>;
  // with: () => Promise<IWebPageBuilder>;
}

@Injectable()
export class WebpageBuilder implements IWebPageBuilder {
  webpage: WebPage;

  async getPage() {
    return this.webpage;
  }

  async create(type: PageTypes, variant: string) {
    this.webpage = new WebPage();
    this.webpage.pageType = type;
    this.webpage.pageVariant = variant;

    return this;
  }

  async withWebsiteId(websiteId: string) {
    this.webpage.websiteId = websiteId;
    return this;
  }

  async withTitle(title: string, slug: string) {
    this.webpage.title = title;
    this.webpage.slug = slug;
    return this;
  }

  async withPageOverride(config: PageConfig) {
    this.webpage.pageOverrides = config;
    return this;
  }

  async withSeoMetadata(metadata: SeoMetadata) {
    this.webpage.seoMetadata = metadata;
    return this;
  }

  async withLayout(code: string) {
    this.webpage.customLayoutCode = code;
    return this;
  }

  async withLayoutConfig(config: LayoutConfig) {
    this.webpage.customLayoutOverrides = config;
    return this;
  }

  // async withHeader(header: Header) {
  //   this.webpage.header = header;
  //   return this;
  // }

  // async getPagesByTemplate(templateName: string): Promise<WebPage[]> {
  //   const layoutParams: WebPage = {
  //     pageType: PageTypes.LAYOUT,
  //     pageVariant: 'SIMPLE_LAYOUT',
  //     themeCode: 'THEME1',
  //   };
  //   const homeParams: WebPage = {
  //     pageType: PageTypes.HOME,
  //     pageVariant: 'HOME1',
  //     slug: 'home',
  //   };
  //   const result = this.createWebpageEntity([layoutParams, homeParams]);
  //   console.log('result :>> ', result);
  //   return result;
  // }
}
