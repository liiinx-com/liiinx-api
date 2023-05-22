import { Injectable } from '@nestjs/common';
import { PageTypes, Webpage } from './entities/webpage.entity';
import { Repository, DataSource, InsertResult } from 'typeorm';
import { WebpageFactory } from './webpage-factory';

@Injectable()
export class WebpagesService {
  webpagesRepository: Repository<Webpage>;

  constructor(
    private dataSource: DataSource,
    private webpageFactory: WebpageFactory,
  ) {
    this.webpagesRepository = this.dataSource.getRepository(Webpage);
  }

  async save(webpage: Webpage): Promise<Webpage> {
    return this.webpagesRepository.save(webpage);
  }

  private getActiveWebpageWhereParams(websiteHandle: string) {
    return {
      relations: {
        website: true,
        settings: true,
        sections: true,
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

  async getLayoutForPage(handle: string, webpage: Webpage): Promise<Webpage> {
    if (webpage.customLayoutVariant) {
      return this.webpageFactory.buildEmptyLayoutPage(
        webpage.customLayoutVariant,
      );
    }
    return this.getByPageType(handle, PageTypes.LAYOUT);
  }

  async createPagesByTemplate(templateName: string): Promise<Webpage[]> {
    return Promise.all([
      this.webpageFactory.buildLayoutPage(),
      this.webpageFactory.buildHomePage(),
    ]);
  }

  async saveBulk(webpages: Webpage[]): Promise<InsertResult> {
    return this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Webpage)
      .values(webpages)
      .execute();
  }
}
