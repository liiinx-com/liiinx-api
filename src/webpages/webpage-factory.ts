import { Injectable } from '@nestjs/common';
import { PageTypes, Webpage } from './entities/webpage.entity';
import { WebpageBuilder } from './webpage-builder';
import { MenuService } from 'src/menu/menu.service';
import { SettingService } from 'src/webpage-settings/settings.service';
import { PageSectionService } from 'src/webpage-sections/sections.service';

interface IWebpageFactory {
  buildLayoutPage: (variant: string, themeCode: string) => Promise<Webpage>;
  buildHomePage: (variant: string) => Promise<Webpage>;
}

@Injectable()
export class WebpageFactory implements IWebpageFactory {
  constructor(
    private menuService: MenuService,
    private settingService: SettingService,
    private sectionService: PageSectionService,
  ) {}

  async buildEmptyLayoutPage(
    variant: string,
    themeCode = 'heem',
  ): Promise<Webpage> {
    return new WebpageBuilder()
      .create(PageTypes.LAYOUT, variant)
      .then((builder) => builder.withThemeCode(themeCode))
      .then((builder) => builder.getPage());
  }

  async buildLayoutPage(
    variant = 'heem1', // TODO: template code
    themeCode = 'heem',
  ): Promise<Webpage> {
    return new WebpageBuilder()
      .create(PageTypes.LAYOUT, variant)
      .then((builder) => builder.withThemeCode(themeCode))
      .then(async (builder) =>
        builder.withSections(
          await this.sectionService.getDefaultLayoutSections(),
        ),
      )
      .then(async (builder) =>
        builder.withSettings(
          await this.settingService.getDefaultLayoutSettings(),
        ),
      )
      .then(async (builder) =>
        builder.withMenu(await this.menuService.getDefaultMenus()),
      )
      .then((builder) => builder.getPage());
  }

  async buildHomePage(variant = 'home1'): Promise<Webpage> {
    return new WebpageBuilder()
      .create(PageTypes.HOME, variant)
      .then((builder) => builder.withTitle('Home', 'home'))
      .then((builder) => builder.getPage());
  }
}
