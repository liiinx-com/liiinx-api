import { Injectable } from '@nestjs/common';
import { Webpage } from './entities/webpage.entity';
import { PageType, getSlugByType } from 'src/webpages/entities/page-type';
import { Repository, DataSource, Not, EntityManager } from 'typeorm';
import { CreateWebpageDto, PageBlockDto } from './dto/webpage.dto';
import { WebpageBuilder } from './webpage-builder';

const DEFAULT_FAVICON_URL = 'liiinx-favicon-url';
const DEFAULT_THEME_CODE = 'heem';
const DEFAULT_LAYOUT_VARIANT = 'heem1';

@Injectable()
export class WebpagesService {
  webpagesRepository: Repository<Webpage>;

  constructor(
    private dataSource: DataSource,
    private webpageBuilder: WebpageBuilder,
  ) {
    this.webpagesRepository = this.dataSource.getRepository(Webpage);
  }

  async saveUsingManager(
    manager: EntityManager,
    webpage: Webpage,
  ): Promise<Webpage> {
    return manager.getRepository(Webpage).save(webpage);
  }

  private getActiveWebpageWhereParams(websiteHandle: string) {
    return {
      relations: {
        website: true,
      },
      where: {
        website: { handle: websiteHandle },
        isDeleted: false,
      },
    };
  }

  async getByPageType(
    websiteHandle: string,
    pageType: PageType,
  ): Promise<Webpage> {
    const params = this.getActiveWebpageWhereParams(websiteHandle);
    return this.webpagesRepository.findOne({
      ...params,
      where: {
        ...params.where,
        pageType,
      },
    });
  }

  async getWebsitePages(handle: string) {
    const params = this.getActiveWebpageWhereParams(handle);
    return this.webpagesRepository.find({
      where: {
        ...params.where,
        slug: Not(PageType.LAYOUT),
      },
      order: {
        slug: 'ASC',
      },
    });
  }

  async getBySlug(
    websiteHandle: string,
    webpageSlug: string,
  ): Promise<Webpage> {
    const params = this.getActiveWebpageWhereParams(websiteHandle);
    return this.webpagesRepository.findOne({
      ...params,
      where: {
        ...params.where,
        slug: webpageSlug.toLowerCase(),
      },
    });
  }

  async getById(id: string): Promise<Webpage> {
    return this.webpagesRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  // TODO: implement this
  private async mapToPageDto(pageEntity: Webpage): Promise<PageBlockDto> {
    const { id, pageType, pageVariant } = pageEntity;
    // this.mapper.map(this.webpage, Webpage, PageBlockDto);
    return {
      id,
      blocks: [],
      pageType,
      pageVariant,
    };
  }

  async getPageDtoFrom(pageEntity: Webpage): Promise<PageBlockDto> {
    const pageDto = await this.mapToPageDto(pageEntity);
    // override or inject settings/... here
    return pageDto;
  }

  async createLayout(
    manager: EntityManager,
    websiteId: string,
    params: CreateWebpageDto,
  ): Promise<Webpage> {
    params.pageType = PageType.LAYOUT;
    params.slug = getSlugByType(params.pageType);
    params.pageVariant = params.pageVariant || DEFAULT_LAYOUT_VARIANT;
    params.themeCode = params.themeCode || DEFAULT_THEME_CODE;
    params.faviconUrl = params.faviconUrl || DEFAULT_FAVICON_URL;

    return (await this.initPageBuilder(manager, websiteId, params)).build();
  }

  async createPage(
    manager: EntityManager,
    websiteId: string,
    params: CreateWebpageDto,
  ): Promise<Webpage> {
    return (await this.initPageBuilder(manager, websiteId, params)).build();
  }

  private async initPageBuilder(
    manager: EntityManager,
    websiteId: string,
    params: CreateWebpageDto,
  ): Promise<WebpageBuilder> {
    const { title, slug, themeCode } = params;

    params.isRtl = !!params.isRtl;

    const builder = await this.webpageBuilder
      .reset()
      .then((builder) => builder.create(manager, websiteId, params))
      .then((builder) => builder.withTitle(title, slug))
      .then((builder) => builder.withThemeCode(themeCode));

    await this.saveUsingManager(manager, await builder.build());

    return builder;
  }

  // async saveBulk(webpages: Webpage[]): Promise<InsertResult> {
  //   return this.dataSource
  //     .createQueryBuilder()
  //     .insert()
  //     .into(Webpage)
  //     .values(webpages)
  //     .execute();
  // }
}
