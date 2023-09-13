import { Injectable } from '@nestjs/common';
import { Website } from './entities/website.entity';
import { WebpagesService } from 'src/webpages/webpages.service';
import { CreateWebsiteDto } from './dto/website.dto';
import { PageType } from 'src/webpages/entities/page-type';
import { EntityManager, Repository } from 'typeorm';
import { Webpage } from 'src/webpages/entities/webpage.entity';

interface IWebsiteBuilder {
  create: (
    manager: EntityManager,
    ownerId: string,
    params: CreateWebsiteDto,
  ) => Promise<IWebsiteBuilder>;
  addLayout: (themeCode: string, variant: string) => Promise<IWebsiteBuilder>;
  // addSettings:
  getWebsite: () => Promise<Website>;
}

@Injectable()
export class WebsiteBuilder implements IWebsiteBuilder {
  private manager: EntityManager;
  private params: CreateWebsiteDto;
  private website: Website;
  private websiteRepository: Repository<Website>;

  public layout: Webpage;

  constructor(private webpagesService: WebpagesService) {}

  async create(
    manager: EntityManager,
    ownerId: string,
    params: CreateWebsiteDto,
  ) {
    this.manager = manager;
    this.websiteRepository = manager.getRepository(Website);

    this.params = params;
    const { customUrl, handle } = this.params;

    this.website = new Website();
    this.website.handle = handle;
    this.website.customUrl = customUrl;
    this.website.subscriptionPlan = 'FREE';
    this.website.ownerId = ownerId;

    await this.websiteRepository.save(this.website);

    return this;
  }

  async addLayout(themeCode: string, variant = 'heem1') {
    this.layout = await this.webpagesService.createLayout(
      this.manager,
      this.website.id,
      {
        pageType: PageType.LAYOUT,
        themeCode,
        title: 'LAYOUT',
        slug: 'LAYOUT',
        pageVariant: variant,
      },
    );

    return this;
  }

  async getWebsite() {
    return this.website;
  }
}
