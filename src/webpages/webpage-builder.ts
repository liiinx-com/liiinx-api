import { Injectable } from '@nestjs/common';
import { Webpage } from './entities/webpage.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { WebpageSetting } from 'src/webpage-settings/entities/webpage-setting.entity';
import { EntityManager } from 'typeorm';
import { BlockService } from 'src/webpage-blocks/blocks.service';
import { CreateWebpageDto } from './dto/webpage.dto';

interface IWebpageBuilder {
  getPage: () => Promise<Webpage>;
  create: (
    manager: EntityManager,
    websiteId: string,
    params: CreateWebpageDto,
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
    params: CreateWebpageDto,
  ) {
    this.manager = manager;

    const { pageType, pageVariant, isRtl, title, faviconUrl } = params;
    this.webpage = new Webpage();
    this.webpage.pageType = pageType;
    this.webpage.pageVariant = pageVariant;
    this.webpage.isRtl = isRtl;
    this.webpage.title = title;
    this.webpage.faviconUrl = faviconUrl;
    this.webpage.websiteId = websiteId;

    return this;
  }

  // TODO: withResource(name:  string) {}

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
