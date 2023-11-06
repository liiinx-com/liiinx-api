import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { MenusDto } from 'src/menu/dto/menu.dto';
import { PageType } from 'src/webpages/entities/page-type';
import { ThemeDto } from 'src/themes/dto/theme.dto';
import { ProfileDto } from 'src/profile/dto';
import { BaseEntityDto } from 'src/shared/base.dto';
import {
  BaseBlockResponseDto,
  PageLayoutDto,
} from 'src/webpage-blocks/blocks/_base-block/base-block.dto';

export class SeoMetadataDto {}

export class BasePageDto extends BaseEntityDto {}

export class CreateWebpageDto {
  @IsEnum(PageType)
  pageType: PageType;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  pageVariant: string;

  @IsOptional()
  themeCode?: string;

  @IsOptional()
  layoutOverrides?: Partial<PageLayoutDto>;
}

export class LayoutDto extends BasePageDto {
  @AutoMap()
  handle: string;

  @AutoMap()
  variant: string;

  layoutConfig: PageLayoutDto;
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

export class WebpageDto {
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
