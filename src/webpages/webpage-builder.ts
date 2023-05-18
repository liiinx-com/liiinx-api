import { Injectable } from '@nestjs/common';
import { PageTypes, Webpage as Webpage } from './entities/webpage.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { PageSettingsDto } from 'src/webpage-settings/dto';
import { SeoMetadataDto } from './dto';

interface IWebpageBuilder {
  getPage: () => Promise<Webpage>;
  create: (
    websiteId: string,
    type: PageTypes,
    variant: string,
  ) => Promise<IWebpageBuilder>;
  // withSettings: (settings: WebpageSetting[]) => Promise<IWebpageBuilder>;
  withTitle: (title: string, slug: string) => Promise<IWebpageBuilder>;
  withPageOverride: (
    overrideConfig: PageSettingsDto,
  ) => Promise<IWebpageBuilder>;
  withSeoMetadata: (metadata: SeoMetadataDto) => Promise<IWebpageBuilder>;
  withLayout: (code: string) => Promise<IWebpageBuilder>;
  withLayoutConfig: (config: PageSettingsDto) => Promise<IWebpageBuilder>;
  withMenu: (menus: Menu[]) => Promise<IWebpageBuilder>;
  withWebsiteId: (websiteId: string) => Promise<IWebpageBuilder>;
  withThemeCode: (themeCode: string) => Promise<IWebpageBuilder>;
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

  async withThemeCode(themeCode: string) {
    this.webpage.themeCode = themeCode;
    return this;
  }

  async withTitle(title: string, slug: string) {
    this.webpage.title = title;
    this.webpage.slug = slug;
    return this;
  }

  async withPageOverride(config: PageSettingsDto) {
    this.webpage.pageOverrides = config;
    return this;
  }

  async withMenu(menus: Menu[]) {
    this.webpage.menus = menus;
    return this;
  }

  async withSeoMetadata(metadata: SeoMetadataDto) {
    this.webpage.seoMetadata = metadata;
    return this;
  }

  async withLayout(code: string) {
    this.webpage.customLayoutCode = code;
    return this;
  }

  async withLayoutConfig(config: PageSettingsDto) {
    this.webpage.customLayoutOverrides = config;
    return this;
  }

  // all settings are dynamic for now and will be injected in WebpageDtoBuilder
  // async withSettings(settings: WebpageSetting[]) {
  //   this.webpage.settings = settings;
  //   return this;
  // }
}
