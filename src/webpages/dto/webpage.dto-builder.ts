import { Webpage } from 'src/webpages/entities/webpage.entity';
import { Website } from 'src/websites/entities/website.entity';
import { PageDto, WebpageDto } from './webpage.dto';
import { Injectable } from '@nestjs/common';
import { MenuService } from 'src/menu/menu.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

interface IWebpageDtoBuilder {
  create: (
    website: Website,
    layout: Webpage,
    webpage: Webpage,
  ) => WebpageDtoBuilder;
  getDto: () => WebpageDto;
  buildLayout: () => WebpageDtoBuilder;
  buildPage: () => WebpageDtoBuilder;
}

@Injectable()
export class WebpageDtoBuilder implements IWebpageDtoBuilder {
  private webpageDto: WebpageDto;
  private website: Website;
  private layout: Webpage;
  private webpage: Webpage;

  constructor(
    private menuService: MenuService,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  create(website: Website, layout: Webpage, webpage: Webpage) {
    this.webpageDto = new WebpageDto();
    this.website = website;
    this.layout = layout;
    this.webpage = webpage;
    return this;
  }

  getDto(): WebpageDto {
    return this.webpageDto;
  }

  // TODO: clean the arch and design
  buildLayout(): WebpageDtoBuilder {
    this.webpageDto.layout = {
      variant: this.layout.pageVariant,
      handle: this.website.handle,
      menus: this.menuService.mapToMenusDto(this.layout.menus),
      // headerPrimaryMenu: menus.headerPrimary
    };

    return this;
  }

  buildPage(): WebpageDtoBuilder {
    this.webpageDto.page = this.mapper.map(this.webpage, Webpage, PageDto);
    return this;
  }
}
