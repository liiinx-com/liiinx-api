import { Injectable } from '@nestjs/common';
import { WebPage } from './entities/webpage.entity';
import { Repository, DataSource, InsertResult } from 'typeorm';
import { PageTypes } from './types';
import { WebpageBuilder } from './webpage-builder';

@Injectable()
export class WebpagesService {
  webpagesRepository: Repository<WebPage>;

  constructor(private dataSource: DataSource) {
    this.webpagesRepository = this.dataSource.getRepository(WebPage);
  }

  async save(webpage: WebPage): Promise<WebPage> {
    return this.webpagesRepository.save(webpage);
  }

  private getActiveWebpageWhereParams(websiteHandle: string) {
    return {
      relations: {
        website: true,
        settings: true,
        menus: {
          parent: true,
        },
      },
      where: {
        website: { handle: websiteHandle },
        isDeleted: false,
      },
    };
  }

  async getByPageType(
    websiteHandle: string,
    pageType: PageTypes,
  ): Promise<WebPage> {
    const params = this.getActiveWebpageWhereParams(websiteHandle);
    return this.webpagesRepository.findOne({
      ...params,
      where: {
        ...params.where,
        pageType,
      },
    });
  }

  async getBySlug(
    websiteHandle: string,
    webpageSlug: string,
  ): Promise<WebPage> {
    const params = this.getActiveWebpageWhereParams(websiteHandle);
    return this.webpagesRepository.findOne({
      ...params,
      where: {
        ...params.where,
        slug: webpageSlug.toLowerCase(),
      },
    });
  }

  async getPagesByTemplate(templateName: string): Promise<WebPage[]> {
    const layout: WebPage = await new WebpageBuilder()
      .create(PageTypes.LAYOUT, 'LAYOUT1')
      .then((builder) => builder.getPage());

    const homePage: WebPage = await new WebpageBuilder()
      .create(PageTypes.HOME, 'HOME1')
      .then((builder) => builder.withTitle('Home', 'home'))
      .then((builder) => builder.getPage());

    return [layout, homePage];
  }

  async saveBulk(webpages: WebPage[]): Promise<InsertResult> {
    return this.dataSource
      .createQueryBuilder()
      .insert()
      .into(WebPage)
      .values(webpages)
      .execute();
  }
}
