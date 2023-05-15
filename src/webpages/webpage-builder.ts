import { Injectable } from '@nestjs/common';
import { Webpage as Webpage } from './entities/webpage.entity';
import { LayoutConfig, PageConfig, PageTypes, SeoMetadata } from './types';
import { WebpageSetting } from 'src/webpage-settings/entities/webpage-setting.entity';
import { Menu } from 'src/menu/entities/menu.entity';

interface IWebpageBuilder {
  getPage: () => Promise<Webpage>;
  create: (
    websiteId: string,
    type: PageTypes,
    variant: string,
  ) => Promise<IWebpageBuilder>;
  withSettings: (settings: WebpageSetting[]) => Promise<IWebpageBuilder>;
  withTitle: (title: string, slug: string) => Promise<IWebpageBuilder>;
  withPageOverride: (overrideConfig: PageConfig) => Promise<IWebpageBuilder>;
  withSeoMetadata: (metadata: SeoMetadata) => Promise<IWebpageBuilder>;
  withLayout: (code: string) => Promise<IWebpageBuilder>;
  withLayoutConfig: (config: LayoutConfig) => Promise<IWebpageBuilder>;
  withMenu: (menus: Menu[]) => Promise<IWebpageBuilder>;
  withWebsiteId: (websiteId: string) => Promise<IWebpageBuilder>;
  // withHeader: (header: Header) => Promise<IWebPageBuilder>;
  // withFooter: (footer: Footer) => Promise<IWebPageBuilder>;
}

@Injectable()
export class WebpageBuilder implements IWebpageBuilder {
  private webpage: Webpage;

  async getPage() {
    return this.webpage;
  }

  async create(type: PageTypes, variant: string) {
    this.webpage = new Webpage();
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

  async withMenu(menus: Menu[]) {
    this.webpage.menus = menus;
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

  async withSettings(settings: WebpageSetting[]) {
    this.webpage.settings = settings;
    return this;
  }
}
