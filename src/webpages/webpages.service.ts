import { Injectable } from '@nestjs/common';
import { Webpage } from './entities/webpage.entity';
import { PageType } from 'src/webpages/entities/page-type';
import { Repository, DataSource, InsertResult } from 'typeorm';
import { WebpageBuilder } from './webpage-builder';
import { CreateWebpageDto } from './dto/webpage.dto';
import { PageSettingsDto } from 'src/webpage-settings/dto';
import { lodash } from 'src/utils';

@Injectable()
export class WebpagesService {
  webpagesRepository: Repository<Webpage>;

  constructor(private dataSource: DataSource) {
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

  // async getLayoutForPage(handle: string, webpage: Webpage): Promise<Webpage> {
  //   if (webpage.customLayoutVariant) {
  //     return this.webpageFactory.buildEmptyLayoutPage(
  //       webpage.customLayoutVariant,
  //     );
  //   }
  //   return this.getByPageType(handle, PageTypes.LAYOUT);
  // }

  // async createPagesByTemplate(templateName: string): Promise<Webpage[]> {
  //   return Promise.all([
  //     this.webpageFactory.buildLayoutPage(),
  //     this.webpageFactory.buildHomePage(),
  //   ]);
  // }

  async createPage({
    pageType,
    pageVariant,
    title,
    layoutOverrides,
    slug,
    themeCode,
  }: CreateWebpageDto): Promise<Webpage> {
    const builder = await new WebpageBuilder().create(pageType, pageVariant);

    if (title && slug) await builder.withTitle(title, slug);
    if (themeCode) await builder.withThemeCode(themeCode);
    if (layoutOverrides) {
      await builder.withLayoutOverrides(layoutOverrides);
    }

    return builder.getPage();
  }

  // used in dto builder to merge default layout settings with page overrides
  generatePageLayoutConfig(
    overrides: Partial<PageSettingsDto>,
  ): PageSettingsDto {
    const defaultSettings: PageSettingsDto = {
      dir: 'ltr',
      faviconUrl: 'favicon.png',

      topBar: {
        contained: true,
        isActive: false,
        wrapper: {
          contained: false,
        },
      },
      header: {
        contained: true,
        isActive: true,
        wrapper: {
          contained: false,
        },
      },
      hero: {
        contained: false,
        isActive: true,
        wrapper: {
          contained: false,
        },
      },
      content: {
        contained: true,
        isActive: true,
        wrapper: {
          contained: false,
        },
      },
      footer: {
        contained: true,
        isActive: true,
        wrapper: {
          contained: false,
        },
      },
      footerBar: {
        contained: true,
        isActive: false,
        wrapper: {
          contained: false,
        },
      },
    };

    return lodash.merge(defaultSettings, overrides);
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
