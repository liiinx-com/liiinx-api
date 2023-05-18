import { AutoMap } from '@automapper/classes';
import { MenusDto } from '../../menu/dto/menu.dto';
import { PageTypes } from 'src/webpages/entities/webpage.entity';
import { PageSettingsDto } from 'src/webpage-settings/dto';

export class SeoMetadataDto {}

export class LayoutDto {
  handle: string;

  @AutoMap()
  variant: string;

  config: PageSettingsDto;

  menus: MenusDto;
}
export class PageDto {
  @AutoMap()
  pageType: PageTypes;

  @AutoMap()
  slug: string;

  config?: Partial<PageSettingsDto>;

  @AutoMap()
  title: string;

  @AutoMap()
  pageVariant: string;
}

export class WebpageDto {
  constructor() {
    this.layout = new LayoutDto();
    this.page = new PageDto();
  }

  layout: LayoutDto;

  page: PageDto;
  // theme: {};
}
