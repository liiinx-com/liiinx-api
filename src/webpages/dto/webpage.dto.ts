import { AutoMap } from '@automapper/classes';
import { MenusDto } from '../../menu/dto/menu.dto';
import { PageTypes } from 'src/webpages/entities/webpage.entity';

export class LayoutDto {
  handle: string;

  @AutoMap()
  variant: string;

  menus: MenusDto;
}
export class PageDto {
  @AutoMap()
  pageType: PageTypes;

  @AutoMap()
  slug: string;

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
