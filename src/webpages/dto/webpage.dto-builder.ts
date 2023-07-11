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
import { ProfileDto } from 'src/profile/dto';

interface IWebpageDtoBuilder {
  createDto: (
    website: Website,
    layout: Webpage,
    webpage: Webpage,
  ) => Promise<WebpageDtoBuilder>;
  getDto: () => Promise<WebpageDto>;
  buildLayoutDto: () => Promise<WebpageDtoBuilder>;
  buildPageDto: () => Promise<WebpageDtoBuilder>;
  buildThemeDto: () => Promise<WebpageDtoBuilder>;
  withProfileDto: (profile: ProfileDto) => Promise<WebpageDtoBuilder>;
  withMenusDto: (menus: MenusDto) => Promise<WebpageDtoBuilder>;
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

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async createDto(website: Website, layout: Webpage, webpage: Webpage) {
    this.resultPageDto = new WebpageDto();
    this.website = website;
    this.layout = layout;
    this.webpage = webpage;
    return this;
  }

  async withProfileDto(profile: ProfileDto) {
    this.resultPageDto.profile = profile;
    return this;
  }

  async withMenusDto(menus: MenusDto) {
    this.resultPageDto.layout.menus = menus;
    return this;
  }

  async buildThemeDto() {
    this.resultPageDto.theme = await this.themeService.getThemeByCode(
      this.layout.themeCode,
      this.layout.themeOverrides,
      this.webpage.themeOverrides,
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
      menus: {},
      // menus: await this.menuService.addDynamicMenus(
      //   this.templateName,
      //   this.layout.menus,
      // ),

      layoutConfig: await this.blockService.generatePageLayoutConfig(
        this.layout.blocks,
      ),

      // sections: lodash.orderBy(
      //   [
      //     ...this.sectionService.mapToPageSectionsDto(this.layout.sections),
      //     ...(await this.sectionService.addDynamicLayoutSections()),
      //   ],
      //   ['order'],
      //   ['asc'],
      // ),
    };

    return this;
  }

  async buildPageDto() {
    this.resultPageDto.page = this.mapper.map(this.webpage, Webpage, PageDto);

    this.resultPageDto.page.blocks = this.blockService.mapToBaseBlockDto(
      this.webpage.blocks,
    );

    // if (this.resultPageDto.page.sections)
    //   this.resultPageDto.page.sections =
    //     this.sectionService.mapToPageSectionsDto(this.webpage.sections);

    // if (this.webpageDto.page.settings)
    //   this.webpageDto.page.settings =
    //     await this.settingService.addDynamicSettings(
    //       this.webpage.pageType,
    //       this.webpage.settings,
    //     );

    return this;
  }
}
