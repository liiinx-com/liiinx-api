import { Injectable } from '@nestjs/common';
import { Website } from './entities/website.entity';
import { WebpagesService } from 'src/webpages/webpages.service';
import { CreateWebsiteDto } from './dto/website.dto';
import { PageType } from 'src/webpages/entities/page-type';

interface IWebsiteBuilder {
  create: (
    ownerId: string,
    params: CreateWebsiteDto,
  ) => Promise<IWebsiteBuilder>;
  addLayout: (themeCode: string, variant: string) => Promise<IWebsiteBuilder>;
  getWebsite: () => Promise<Website>;
}

@Injectable()
export class WebsiteBuilder implements IWebsiteBuilder {
  private params: CreateWebsiteDto;
  private website: Website;

  constructor(private webpagesService: WebpagesService) {}

  async create(ownerId: string, params: CreateWebsiteDto) {
    this.params = params;
    this.website = new Website();
    this.website.handle = this.params.handle;
    this.website.ownerId = ownerId;
    return this;
  }

  async addLayout(themeCode: string, variant = 'heem1') {
    const layout = await this.webpagesService.createPage({
      pageType: PageType.LAYOUT,
      themeCode,
      title: null,
      slug: null,
      pageVariant: variant,
    });

    // add default settings by variant

    if (!this.website.pages) this.website.pages = [];
    this.website.pages.push(layout);
    return this;
  }

  async getWebsite() {
    return this.website;
  }
}
