import { Injectable } from '@nestjs/common';
import { Webpage } from './entities/webpage.entity';
import { Repository, DataSource, InsertResult } from 'typeorm';
import { PageTypes } from './types';
import { WebpageBuilder } from './webpage-builder';
import { MenuService } from 'src/menu/menu.service';
import { WebPageSettingBuilder } from 'src/webpage-settings/webpage-setting-builder';

@Injectable()
export class WebpagesService {
  webpagesRepository: Repository<Webpage>;

  constructor(
    private dataSource: DataSource,
    private menuService: MenuService,
  ) {
    this.webpagesRepository = this.dataSource.getRepository(Webpage);
  }

  async save(webpage: Webpage): Promise<Webpage> {
    return this.webpagesRepository.save(webpage);
  }

  private getActiveWebpageWhereParams(websiteHandle: string) {
    return {
      relations: { website: true },
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

  async getPagesByTemplate(templateName: string): Promise<Webpage[]> {
    const layout: Webpage = await new WebpageBuilder()
      .create(PageTypes.LAYOUT, 'LAYOUT1')
      .then(async (builder) =>
        builder.withSettings([
          await new WebPageSettingBuilder()
            .create()
            .then((builder) => builder.withValue('dir', 'ltr'))
            .then((builder) => builder.getSetting()),
        ]),
      )
      .then(async (builder) =>
        builder.withMenu(
          await this.menuService.getMenusByTemplate(templateName),
        ),
      )
      .then((builder) => builder.getPage());

    const homePage: Webpage = await new WebpageBuilder()
      .create(PageTypes.HOME, 'HOME1')
      .then((builder) => builder.withTitle('Home', 'home'))
      .then((builder) => builder.getPage());

    return [layout, homePage];
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
