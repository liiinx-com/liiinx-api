import { PageTypes, Webpage } from 'src/webpages/entities/webpage.entity';
import { Website } from 'src/websites/entities/website.entity';
import { PageDto, WebpageDto } from './webpage.dto';
import { Injectable } from '@nestjs/common';
import { MenuService } from 'src/menu/menu.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { WebpageSettingsService } from 'src/webpage-settings/settings.service';

interface IWebpageDtoBuilder {
  create: (
    website: Website,
    layout: Webpage,
    webpage: Webpage,
  ) => Promise<WebpageDtoBuilder>;
  getDto: () => Promise<WebpageDto>;
  buildLayout: () => Promise<WebpageDtoBuilder>;
  buildPage: () => Promise<WebpageDtoBuilder>;
}

@Injectable()
export class WebpageDtoBuilder implements IWebpageDtoBuilder {
  private webpageDto: WebpageDto;
  private website: Website;
  private layout: Webpage;
  private webpage: Webpage;

  constructor(
    private menuService: MenuService,
    private settingsService: WebpageSettingsService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async create(website: Website, layout: Webpage, webpage: Webpage) {
    this.webpageDto = new WebpageDto();
    this.website = website;
    this.layout = layout;
    this.webpage = webpage;
    return this;
  }

  async getDto() {
    return this.webpageDto;
  }

  // TODO: clean the arch and design
  async buildLayout() {
    this.webpageDto.layout = {
      variant: this.layout.pageVariant,
      handle: this.website.handle,
      menus: this.menuService.mapToMenusDto(this.layout.menus),
      config: await this.settingsService.addDynamicSettings(
        PageTypes.LAYOUT,
        this.layout.settings,
      ),
    };

    return this;
  }

  async buildPage() {
    this.webpageDto.page = this.mapper.map(this.webpage, Webpage, PageDto);

    if (this.webpage.settings.length) {
      this.webpageDto.page.config =
        await this.settingsService.addDynamicSettings(
          this.webpage.pageType,
          this.webpage.settings,
        );
    }
    return this;
  }
}
