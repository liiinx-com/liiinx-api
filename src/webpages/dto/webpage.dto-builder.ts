import { Webpage } from 'src/webpages/entities/webpage.entity';
import { Website } from 'src/websites/entities/website.entity';
import { PageDto, WebpageDto } from './webpage.dto';
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
  getDto: () => Promise<WebpageDto>;
  buildLayoutDto: (menus: MenusDto) => Promise<WebpageDtoBuilder>;
  buildPageDto: () => Promise<WebpageDtoBuilder>;
  buildThemeDto: () => Promise<WebpageDtoBuilder>;
  withMenusDto: () => Promise<WebpageDtoBuilder>;
  withProfileDto: () => Promise<WebpageDtoBuilder>;
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

  async withProfileDto() {
    this.resultPageDto.profile = this.profileService.mapToProfileDto(
      await this.profileService.getBy(this.layout.id),
    );
    return this;
  }

  async withMenusDto() {
    this.resultPageDto.menus = await this.menuService.getPageMenusDto(
      this.layout.id,
    );
    return this;
  }

  async buildThemeDto() {
    this.resultPageDto.theme = await this.themeService.getThemeByCode(
      this.layout.themeCode,
      {}, //this.layout.themeOverrides,
      {}, //this.webpage.themeOverrides,
    );
    return this;
  }

  async getDto() {
    return this.resultPageDto;
  }

  async buildLayoutDto() {
    this.resultPageDto.layout = {
      id: this.layout.id,
      variant: this.layout.pageVariant,
      handle: this.website.handle,
      layoutConfig: await this.blockService.generatePageLayoutConfig(
        this.layout.id,
      ),
    };

    return this;
  }

  async buildPageDto() {
    this.resultPageDto.page = this.mapper.map(this.webpage, Webpage, PageDto);

    return this;
  }
}
