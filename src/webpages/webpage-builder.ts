import { Injectable } from '@nestjs/common';
import { Webpage } from './entities/webpage.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { PageSettingsDto } from 'src/webpage-settings/dto';
import { WebpageSection } from 'src/webpage-sections/entities/webpage-section.entity';
import { WebpageSetting } from 'src/webpage-settings/entities/webpage-setting.entity';
import { SeoMetadataDto } from './dto/webpage.dto';
import { PageType } from './entities/page-type';

interface IWebpageBuilder {
  getPage: () => Promise<Webpage>;
  create: (
    websiteId: string,
    pageType: string,
    pageVariant: string,
  ) => Promise<IWebpageBuilder>;
  withTitle: (title: string, slug: string) => Promise<IWebpageBuilder>;
  withSeoMetadata: (metadata: SeoMetadataDto) => Promise<IWebpageBuilder>;
  withMenu: (menus: Menu[]) => Promise<IWebpageBuilder>;
  withThemeCode: (themeCode: string) => Promise<IWebpageBuilder>;
  withSections: (sections: WebpageSection[]) => Promise<IWebpageBuilder>;
  withSettings: (settings: WebpageSetting[]) => Promise<IWebpageBuilder>;
}

@Injectable()
export class WebpageBuilder implements IWebpageBuilder {
  private webpage: Webpage;

  async getPage() {
    return this.webpage;
  }

  async create(pageType: PageType, pageVariant: string) {
    this.webpage = new Webpage();
    this.webpage.pageType = pageType;
    this.webpage.pageVariant = pageVariant;
    this.webpage.menus = [];
    this.webpage.sections = [];

    return this;
  }

  async withLayoutOverrides(
    config: Partial<PageSettingsDto>,
  ): Promise<IWebpageBuilder> {
    this.webpage.layoutOverrides = config;
    return this;
  }

  async withSettings(settings: WebpageSetting[]) {
    if (!this.webpage.settings) this.webpage.settings = [];
    this.webpage.settings = [...this.webpage.settings, ...settings];
    return this;
  }

  async withThemeCode(themeCode: string) {
    this.webpage.themeCode = themeCode;
    return this;
  }

  async withSections(sections: WebpageSection[]) {
    if (!this.webpage.sections) this.webpage.sections = [];
    this.webpage.sections = [...this.webpage.sections, ...sections];
    return this;
  }

  async withTitle(title: string, slug: string) {
    this.webpage.title = title;
    this.webpage.slug = slug;
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
}
