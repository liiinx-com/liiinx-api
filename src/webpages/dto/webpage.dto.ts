import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { MenusDto } from 'src/menu/dto/menu.dto';
import { PageType } from 'src/webpages/entities/page-type';
import { PageSettingsDto } from 'src/webpage-settings/dto';
import { ThemeDto } from 'src/themes/dto/theme.dto';
import { GenericSectionDto } from 'src/webpage-sections/dto';
import { ProfileDto } from 'src/profile/dto';

export class SeoMetadataDto {}

class PageBaseDto {
  sections?: GenericSectionDto[];
}

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
  layoutOverrides?: Partial<PageSettingsDto>;
}

export class LayoutDto extends PageBaseDto {
  handle: string;

  @AutoMap()
  variant: string;

  settings: PageSettingsDto;

  menus: MenusDto;
}

export class PageDto extends PageBaseDto {
  @AutoMap()
  pageType: PageType;

  @AutoMap()
  slug: string;

  settings?: Partial<PageSettingsDto>;

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
  profile: ProfileDto;
  page: PageDto;
  theme: ThemeDto;
}
