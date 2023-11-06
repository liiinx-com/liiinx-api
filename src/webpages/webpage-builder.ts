import { Injectable, Scope } from '@nestjs/common';
import { Webpage } from './entities/webpage.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { WebpageBlock } from 'src/webpage-blocks/blocks/_base-block/base-block.entity';
import { WebpageSetting } from 'src/webpage-settings/entities/webpage-setting.entity';
import { PageType } from './entities/page-type';
import { EntityManager } from 'typeorm';
import { HeaderService } from 'src/webpage-blocks/blocks/header/header.service';
import { BlockService } from 'src/webpage-blocks/blocks.service';

interface IWebpageBuilder {
  getPage: () => Promise<Webpage>;
  create: (
    manager: EntityManager,
    websiteId: string,
    pageType: string,
    pageVariant: string,
  ) => Promise<IWebpageBuilder>;
  reset: () => Promise<IWebpageBuilder>;
  withTitle: (title: string, slug: string) => Promise<IWebpageBuilder>;

  withHeader: () => Promise<IWebpageBuilder>;

  // withSeoMetadata: (metadata: SeoMetadataDto) => Promise<IWebpageBuilder>;
  withMenu: (menus: Menu[]) => Promise<IWebpageBuilder>;
  withThemeCode: (themeCode: string) => Promise<IWebpageBuilder>;
  // withSections: (sections: WebpageBlock[]) => Promise<IWebpageBuilder>;
  withSettings: (settings: WebpageSetting[]) => Promise<IWebpageBuilder>;
}

@Injectable()
export class WebpageBuilder implements IWebpageBuilder {
  private manager: EntityManager;
  private webpage: Webpage;

  constructor(private readonly blockService: BlockService) {}

  async getPage() {
    return this.webpage;
  }

  async reset() {
    this.webpage = null;
    return this;
  }

  async create(
    manager: EntityManager,
    websiteId: string,
    pageType: PageType,
    pageVariant: string,
  ) {
    this.manager = manager;
    this.webpage = new Webpage();
    this.webpage.pageType = pageType;
    this.webpage.pageVariant = pageVariant;
    this.webpage.menus = [];
    this.webpage.blocks = [];
    this.webpage.websiteId = websiteId;

    return this;
  }

  async withHeader() {
    const resource = 'header';
    const res = await this.blockService.executeActionsUsingManager(
      this.manager,
      {
        actions: [
          {
            resource,
            action: 'create',
            payload: await this.blockService.getCreateBlockPayloadFor(resource),
          },
        ],
        injectedWebpage: this.webpage,
        webpageId: this.webpage.id,
      },
    );

    return this;
  }

  async withSettings(settings: WebpageSetting[] = []) {
    if (!this.webpage.settings) this.webpage.settings = [];
    this.webpage.settings = [...this.webpage.settings, ...settings];
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

  async withMenu(menus: Menu[]) {
    this.webpage.menus = menus;
    return this;
  }

  // async withSeoMetadata(metadata: SeoMetadataDto) {
  //   this.webpage.seoMetadata = metadata;
  //   return this;
  // }
}
