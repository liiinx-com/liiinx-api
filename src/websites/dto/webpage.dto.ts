import { IsNotEmpty } from 'class-validator';
import { PageTypes } from 'src/webpages/entities/section-info';

export class CreateWebsiteDto {
  @IsNotEmpty()
  handle: string;
}

export class TopBarDto {}

export class HeaderDto {
  dir: 'ltr' | 'rtl';
}

export class HeroDto {
  dir: 'ltr' | 'rtl';
}

export class FooterDto {
  dir: 'ltr' | 'rtl';
}

export class LayoutDto {
  handle: string;
  variant: string;
  topBar?: TopBarDto;
  header?: HeaderDto;
  hero?: HeroDto;
  footer?: FooterDto;
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
