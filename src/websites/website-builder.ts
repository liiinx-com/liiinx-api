import { Injectable } from '@nestjs/common';
import { CreateWebsiteDto } from './dto';
import { Website } from './entities/website.entity';
import { WebpagesService } from 'src/webpages/webpages.service';
import { MenuService } from 'src/menu/menu.service';

interface IWebsiteBuilder {
  withTemplate: (
    templateName: string,
    params: CreateWebsiteDto,
  ) => Promise<IWebsiteBuilder>;
  createWebsite: (ownerId: string) => Promise<IWebsiteBuilder>;
  addPages: () => Promise<IWebsiteBuilder>;
  addMenus: () => Promise<IWebsiteBuilder>;
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

  async createWebsite(ownerId: string) {
    this.website.handle = this.params.handle;
    this.website.ownerId = ownerId;
    return this;
  }

  async addPages() {
    this.website.pages = await this.webpagesService.getPagesByTemplate(
      this.templateName,
    );
    return this;
  }

  async addMenus() {
    // TODO: add menus
    // this.website.m
    return this;
  }

  async getWebsite() {
    return this.website;
  }
}
