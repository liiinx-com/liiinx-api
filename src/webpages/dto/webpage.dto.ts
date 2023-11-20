import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { MenusDto } from 'src/menu/dto/menu.dto';
import { PageType } from 'src/webpages/entities/page-type';
import { ThemeDto } from 'src/themes/dto/theme.dto';
import { ProfileDto } from 'src/profile/dto';
import { BaseEntityDto } from 'src/shared/base.dto';

export class BasePageDto extends BaseEntityDto {}

export class CreateWebpageDto {
  @IsEnum(PageType)
  pageType: PageType;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  faviconUrl?: string;

  @IsBoolean()
  isRtl: boolean;

  @IsNotEmpty()
  pageVariant: string;

  @IsNotEmpty()
  themeCode: string;
}

export class LayoutDto extends BasePageDto {
  @AutoMap()
  handle: string;

  @AutoMap()
  variant: string;

  // layoutConfig: PageLayoutDto;
}

export class PageDto extends BasePageDto {
  @AutoMap()
  pageType: PageType;

  @AutoMap()
  slug: string;

  // blocks: BaseBlockDto[];

  // layoutConfig?: Partial<PageLayoutDto>; // version 0.2

  @AutoMap()
  title: string;

  @AutoMap()
  isHomePage: boolean;

  @AutoMap()
  pageVariant: string;
}

export class WebpageDto_org {
  constructor() {
    this.layout = new LayoutDto();
    this.page = new PageDto();
  }
  layout: LayoutDto;
  menus: MenusDto;
  profile: ProfileDto;
  page: PageDto;
  theme: ThemeDto;
}

// =======

abstract class BlockDto {}

class UIBlockDto extends BlockDto {}
class NUIBlockDto extends BlockDto {}

// =================================

export class PageBlockDto {
  id: string;
  pageType: string;
  pageVariant: string;
  blocks: BlockDto[];
}

class PageConfigDto {
  dir: string;
  title: string;
  favicon: string;
  lang: string;
  websiteHandle: string; // slug
  pageHandle: string;
}

export class WebpageDto {
  id: string;
  layout: PageBlockDto;
  content: PageBlockDto;
  config: PageConfigDto;
  // seo: NUIBlockDto;
  // theme: ThemeDto which is a NUIBlockDto;
  // menus: we already have it;
}
