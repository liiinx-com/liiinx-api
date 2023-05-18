import { IsNotEmpty } from 'class-validator';
import { MenusDto } from './menu.dto';
import { PageTypes } from 'src/webpages/entities/webpage.entity';

export class CreateWebsiteDto {
  @IsNotEmpty()
  handle: string;
}

export class LayoutDto {
  handle: string;
  variant: string;
  // topBar?: TopBar;
  // header?: Header;
  // hero?: Hero;
  // footer?: Footer;
}
export class PageDto {
  type: PageTypes;
  slug: string;
  title: string;
  variant: string;
}

export class WebpageDto {
  constructor() {
    this.layout = new LayoutDto();
    this.page = new PageDto();
  }

  layout: LayoutDto;
  menus: MenusDto;
  page: PageDto;
  // theme: {};
}
