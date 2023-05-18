import { Webpage } from 'src/webpages/entities/webpage.entity';
import { Website } from '../entities/website.entity';
import { WebpageDto } from './webpage.dto';
import { Injectable } from '@nestjs/common';
import { MenuService } from 'src/menu/menu.service';

interface IWebpageDtoBuilder {
  create: (
    website: Website,
    layout: Webpage,
    webpage: Webpage,
  ) => WebpageDtoBuilder;
  getDto: () => WebpageDto;
  buildLayout: () => WebpageDtoBuilder;
  buildMenus: () => WebpageDtoBuilder;
  buildPage: () => WebpageDtoBuilder;
}

@Injectable()
export class WebpageDtoBuilder implements IWebpageDtoBuilder {
  private webpageDto: WebpageDto;
  private website: Website;
  private layout: Webpage;
  private webpage: Webpage;

  constructor(private menuService: MenuService) {}

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
      // headerPrimaryMenu: menus.headerPrimary
    };

    return this;
  }

  buildMenus() {
    this.webpageDto.menus = this.menuService.mapToMenusDto(this.layout.menus);
    return this;
  }

  buildPage(): WebpageDtoBuilder {
    this.webpageDto.page = {
      slug: this.webpage.slug,
      title: this.webpage.title,
      type: this.webpage.pageType,
      variant: this.webpage.pageVariant,
    };

    return this;
  }
}
