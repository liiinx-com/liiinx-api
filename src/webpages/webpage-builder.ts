import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { WebPage } from './entities/webpage.entity';
import { CreateWebPageParams } from './types';
import { Website } from 'src/websites/entities/website.entity';
import { PageTypes } from './entities/section-info';

@Injectable()
export class WebpageBuilder {
  createWebpageEntity(params: CreateWebPageParams[]): WebPage[] {
    return params.map((p) => plainToClass(WebPage, p));
  }

  async getPagesByTemplate(
    templateName: string,
    website: Website,
  ): Promise<WebPage[]> {
    const layoutParams: CreateWebPageParams = {
      website,
      pageType: PageTypes.LAYOUT,
      pageVariant: 'SIMPLE',
      themeCode: 'THEME1',
    };

    const homeParams: CreateWebPageParams = {
      website,
      pageType: PageTypes.HOME,
      pageVariant: 'HOME1',
      slug: 'home',
    };

    return this.createWebpageEntity([layoutParams, homeParams]);
  }
}
