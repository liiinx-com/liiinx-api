import { Injectable } from '@nestjs/common';
import { PageTypes, Webpage } from './entities/webpage.entity';
import { WebpageBuilder } from './webpage-builder';
import { MenuService } from 'src/menu/menu.service';
import { WebpageSettingsService } from 'src/webpage-settings/webpage-settings.service';

interface IWebpageFactory {
  buildLayoutPage: (templateName: string) => Promise<Webpage>;
  buildHomePage: (templateName: string) => Promise<Webpage>;
}

@Injectable()
export class WebpageFactory implements IWebpageFactory {
  constructor(
    private menuService: MenuService,
    private settingService: WebpageSettingsService,
  ) {}

  async buildLayoutPage(templateName: string): Promise<Webpage> {
    return new WebpageBuilder()
      .create(PageTypes.LAYOUT, 'LAYOUT1')
      .then(async (builder) =>
        builder.withSettings(
          await this.settingService.getWebpageDefaultSettings(PageTypes.LAYOUT),
        ),
      )
      .then(async (builder) =>
        builder.withMenu(
          await this.menuService.getMenusByTemplate(templateName),
        ),
      )
      .then((builder) => builder.getPage());
  }

  async buildHomePage(templateName: string): Promise<Webpage> {
    return new WebpageBuilder()
      .create(PageTypes.HOME, 'HOME1')
      .then((builder) => builder.withTitle('Home', 'home'))
      .then(async (builder) =>
        builder.withSettings(
          await this.settingService.getWebpageDefaultSettings(PageTypes.HOME),
        ),
      )
      .then((builder) => builder.getPage());
  }
}
