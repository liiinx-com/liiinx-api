import { Webpage } from 'src/webpages/entities/webpage.entity';
import { Website } from 'src/websites/entities/website.entity';
import { WebpageDto } from './webpage.dto';
import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ThemeService } from 'src/themes/themes.service';
import { BlockService } from 'src/webpage-blocks/blocks.service';
import { WebpagesService } from '../webpages.service';
import { MenusDto } from 'src/menu/dto/menu.dto';
import { MenuService } from 'src/menu/menu.service';
import { ProfileService } from 'src/profile/profile.service';

interface IWebpageDtoBuilder {
  createDto: (layout: Webpage, webpage: Webpage) => Promise<WebpageDtoBuilder>;
  build: () => Promise<WebpageDto>;
  buildLayoutDto: (menus: MenusDto) => Promise<WebpageDtoBuilder>;
  buildPageDto: () => Promise<WebpageDtoBuilder>;
  withPageConfig: () => Promise<WebpageDtoBuilder>;
  // buildThemeDto: () => Promise<WebpageDtoBuilder>;
  // withMenusDto: () => Promise<WebpageDtoBuilder>;
  // withProfileDto: () => Promise<WebpageDtoBuilder>;
}

@Injectable()
export class WebpageDtoBuilder implements IWebpageDtoBuilder {
  private resultPageDto: WebpageDto;
  private website: Website;
  private layout: Webpage;
  private webpage: Webpage;

  constructor(
    private themeService: ThemeService,
    private webpageService: WebpagesService,
    private blockService: BlockService,
    private menuService: MenuService,
    private profileService: ProfileService,

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async createDto(layout: Webpage, webpage: Webpage) {
    this.resultPageDto = new WebpageDto();
    this.website = webpage.website;
    this.layout = layout;
    this.webpage = webpage;
    return this;
  }

  // async withProfileDto() {
  //   // TODO: THIS IS THE PATTERN
  //   this.resultPageDto.profile =
  //     await this.profileService.getProfileDtoByLayoutId(this.layout.id);
  //   return this;
  // }

  // async withMenusDto() {
  //   this.resultPageDto.menus = await this.menuService.getPageMenusDto(
  //     this.layout.id,
  //   );
  //   return this;
  // }

  // async buildThemeDto() {
  //   this.resultPageDto.theme = await this.themeService.getThemeByCode(
  //     this.layout.themeCode,
  //     {}, //this.layout.themeOverrides,
  //     {}, //this.webpage.themeOverrides,
  //   );
  //   return this;
  // }

  async build() {
    return this.resultPageDto;
  }

  async withPageConfig() {
    const title = this.layout.title + ' | ' + this.webpage.title;

    this.resultPageDto.config = {
      title,
      dir: 'ltr', //this.webpage.dir || this.layout.dir
      favicon: 'someFaviconUrl', //this.webpage.favicon || this.layout.favicon
      lang: 'en', // settings service
      pageHandle: this.webpage.slug,
      websiteHandle: this.website.handle,
    };

    return this;
  }

  async buildLayoutDto() {
    this.resultPageDto.layout = await this.webpageService.getPageDtoFrom(
      this.layout,
    );
    return this;
  }

  async buildPageDto() {
    this.resultPageDto.content = await this.webpageService.getPageDtoFrom(
      this.webpage,
    );

    return this;
  }
}
