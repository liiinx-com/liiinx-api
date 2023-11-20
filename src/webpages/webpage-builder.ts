import { Injectable } from '@nestjs/common';
import { Webpage } from './entities/webpage.entity';
import { EntityManager } from 'typeorm';
import { BlockService } from 'src/webpage-blocks/blocks.service';
import { CreateWebpageDto } from './dto/webpage.dto';

interface IWebpageBuilder {
  build: () => Promise<Webpage>;
  create: (
    manager: EntityManager,
    websiteId: string,
    params: CreateWebpageDto,
  ) => Promise<IWebpageBuilder>;
  reset: () => Promise<IWebpageBuilder>;
  withTitle: (title: string, slug: string) => Promise<IWebpageBuilder>;
}

@Injectable()
export class WebpageBuilder implements IWebpageBuilder {
  private manager: EntityManager;
  private webpage: Webpage;

  constructor(private readonly blockService: BlockService) {}

  async build() {
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

    const { pageType, pageVariant, isRtl, title, faviconUrl, description } =
      params;
    this.webpage = new Webpage();
    this.webpage.pageType = pageType;
    this.webpage.pageVariant = pageVariant;
    this.webpage.isRtl = isRtl;
    this.webpage.title = title;
    this.webpage.description = description;
    this.webpage.faviconUrl = faviconUrl;
    this.webpage.websiteId = websiteId;

    return this;
  }

  // TODO: withResource(name:  string) {}
  // async withHeader() {
  //   const resource = 'header';
  //   const res = await this.blockService.executeActionsUsingManager(
  //     this.manager,
  //     {
  //       actions: [
  //         {
  //           resource,
  //           action: 'create',
  //           payload: await this.blockService.getCreateBlockPayloadFor(resource),
  //         },
  //       ],
  //       injectedWebpage: this.webpage,
  //       webpageId: this.webpage.id,
  //     },
  //   );

  //   return this;
  // }

  async withThemeCode(themeCode: string) {
    this.webpage.themeCode = themeCode;
    return this;
  }

  async withTitle(title: string, slug: string) {
    this.webpage.title = title;
    this.webpage.slug = slug;
    return this;
  }

  // async withMenu(menus: Menu[]) {
  //   this.webpage.menus = menus;
  //   return this;
  // }

  // async withSeoMetadata(metadata: SeoMetadataDto) {
  //   this.webpage.seoMetadata = metadata;
  //   return this;
  // }
}
