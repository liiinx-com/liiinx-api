import { Webpage } from 'src/webpages/entities/webpage.entity';
import { Website } from 'src/websites/entities/website.entity';
import { PageDto, WebpageDto } from './webpage.dto';
import { Injectable } from '@nestjs/common';
import { MenuService } from 'src/menu/menu.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ThemeService } from 'src/themes/themes.service';
import { PageSectionService } from 'src/webpage-sections/sections.service';
import { lodash } from 'src/utils';
import { WebpagesService } from '../webpages.service';
import { MenusDto } from 'src/menu/dto/menu.dto';

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
  withMenusDto: (menus: MenusDto) => Promise<WebpageDtoBuilder>;
}

@Injectable()
export class WebpageDtoBuilder implements IWebpageDtoBuilder {
  private templateName = 'SIMPLE_WEBSITE';
  private resultPageDto: WebpageDto;
  private website: Website;
  private layout: Webpage;
  private webpage: Webpage;

  constructor(
    private themeService: ThemeService,
    private webpageService: WebpagesService,
    private sectionService: PageSectionService,
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
      variant: this.layout.pageVariant,
      handle: this.website.handle,
      menus: {},
      // menus: await this.menuService.addDynamicMenus(
      //   this.templateName,
      //   this.layout.menus,
      // ),
      settings: this.webpageService.generatePageLayoutConfig(
        lodash.merge(this.layout.layoutOverrides, this.webpage.layoutOverrides),
      ),
      sections: lodash.orderBy(
        [
          ...this.sectionService.mapToPageSectionsDto(this.layout.sections),
          ...(await this.sectionService.addDynamicLayoutSections()),
        ],
        ['order'],
        ['asc'],
      ),
    };

    return this;
  }

  async buildPageDto() {
    this.resultPageDto.page = this.mapper.map(this.webpage, Webpage, PageDto);

    if (this.resultPageDto.page.sections)
      this.resultPageDto.page.sections =
        this.sectionService.mapToPageSectionsDto(this.webpage.sections);

    // if (this.webpageDto.page.settings)
    //   this.webpageDto.page.settings =
    //     await this.settingService.addDynamicSettings(
    //       this.webpage.pageType,
    //       this.webpage.settings,
    //     );

    return this;
  }
}
