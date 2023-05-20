import { Injectable } from '@nestjs/common';
import { PageTypes, Webpage } from './entities/webpage.entity';
import { WebpageBuilder } from './webpage-builder';
import { MenuService } from 'src/menu/menu.service';
import { SettingService } from 'src/webpage-settings/settings.service';
import { PageSectionService } from 'src/webpage-sections/sections.service';

interface IWebpageFactory {
  buildLayoutPage: (templateName: string) => Promise<Webpage>;
  buildHomePage: (templateName: string) => Promise<Webpage>;
}

@Injectable()
export class WebpageFactory implements IWebpageFactory {
  constructor(
    private menuService: MenuService,
    private settingService: SettingService,
    private sectionService: PageSectionService,
  ) {}

  async buildLayoutPage(templateName: string): Promise<Webpage> {
    return (
      new WebpageBuilder()
        .create(PageTypes.LAYOUT, 'LAYOUT1')
        .then((builder) => builder.withThemeCode('heem'))
        // TODO : Dynamic Sections for now
        // .then(async (builder) =>
        //   builder.withSections(
        //     await this.sectionService.getDefaultLayoutSections(),
        //   ),
        // )
        // TODO : Dynamic Menus for now
        // .then(async (builder) =>
        //   builder.withMenu(
        //     await this.menuService.getMenusByTemplate(templateName),
        //   ),
        // )
        .then((builder) => builder.getPage())
    );
  }

  async buildHomePage(templateName: string): Promise<Webpage> {
    return new WebpageBuilder()
      .create(PageTypes.HOME, 'HOME1')
      .then((builder) => builder.withTitle('Home', 'home'))
      .then((builder) => builder.getPage());
  }
}
