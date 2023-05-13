import { Injectable } from '@nestjs/common';
import { CreateWebsiteDto } from './dto';
import { WebsitesService } from './websites.service';
import { WebpagesService } from 'src/webpages/webpages.service';
import { PageTypes } from 'src/webpages/entities/section-info';
import { CreateWebPageParams } from 'src/webpages/types';
import { Website } from './entities/website.entity';

@Injectable()
export class WebsitesFacadeService {
  constructor(
    private websiteService: WebsitesService,
    private webpageService: WebpagesService,
  ) {}

  async createNewWebsite(ownerId: string, websiteDto: CreateWebsiteDto) {
    const saveWebsite = await this.websiteService.create(ownerId, websiteDto);
    const websitePagesTemplate = await this.getWebsiteBuilderTemplate(
      saveWebsite,
    );
    await Promise.all(
      websitePagesTemplate.map((p) => this.webpageService.create(p)),
    );
    return saveWebsite;
  }

  async getWebsiteBuilderTemplate(website: Website) {
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
    };
    return [layoutParams, homeParams];
  }
}
