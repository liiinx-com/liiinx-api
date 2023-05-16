import { IsNotEmpty } from 'class-validator';
import { Header, MenuItem, PageTypes } from 'src/webpages/types';

export class CreateWebsiteDto {
  @IsNotEmpty()
  handle: string;
}

export class LayoutDto {
  handle: string;
  variant: string;
  headerPrimaryMenu?: MenuItem[];
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
  page: PageDto;
  // theme: {};
}
