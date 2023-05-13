import { IsNotEmpty } from 'class-validator';
import { PageTypes } from 'src/webpages/types';
import { Footer, Header, Hero, TopBar } from '../types';

export class CreateWebsiteDto {
  @IsNotEmpty()
  handle: string;
}

export class LayoutDto {
  handle: string;
  variant: string;
  topBar?: TopBar;
  header?: Header;
  hero?: Hero;
  footer?: Footer;
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
