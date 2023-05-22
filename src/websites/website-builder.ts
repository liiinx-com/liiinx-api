import { Injectable } from '@nestjs/common';
import { Website } from './entities/website.entity';
import { WebpagesService } from 'src/webpages/webpages.service';
import { MenuService } from 'src/menu/menu.service';
import { CreateWebsiteDto } from './dto/website.dto';

interface IWebsiteBuilder {
  withTemplate: (
    templateName: string,
    params: CreateWebsiteDto,
  ) => Promise<IWebsiteBuilder>;
  create: (ownerId: string) => Promise<IWebsiteBuilder>;
  addPages: () => Promise<IWebsiteBuilder>;
  getWebsite: () => Promise<Website>;
}

@Injectable()
export class WebsiteBuilder implements IWebsiteBuilder {
  private templateName: string;
  private params: CreateWebsiteDto;
  private website: Website;

  constructor(
    private webpagesService: WebpagesService,
    private menuService: MenuService,
  ) {}

  async withTemplate(name: string, params: CreateWebsiteDto) {
    this.templateName = name;
    this.params = params;
    this.website = new Website();
    return this;
  }

  async create(ownerId: string) {
    this.website.handle = this.params.handle;
    this.website.ownerId = ownerId;
    return this;
  }

  async addPages() {
    this.website.pages = await this.webpagesService.createPagesByTemplate(
      this.templateName,
    );
    return this;
  }

  async getWebsite() {
    return this.website;
  }
}
