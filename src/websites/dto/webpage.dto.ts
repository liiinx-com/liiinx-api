import { IsNotEmpty } from 'class-validator';
import { Header, PageTypes, TopBar } from 'src/webpages/types';

export class CreateWebsiteDto {
  @IsNotEmpty()
  handle: string;
}

export class LayoutDto {
  handle: string;
  variant: string;
  topBar?: TopBar;
  header?: Header;
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
  layout: LayoutDto;
  page: PageDto;

  // theme: {};
}
