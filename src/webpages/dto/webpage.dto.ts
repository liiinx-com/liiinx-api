import { AutoMap } from '@automapper/classes';
import { MenusDto } from '../../menu/dto/menu.dto';
import { PageTypes } from 'src/webpages/entities/webpage.entity';
import { PageSettingsDto } from 'src/webpage-settings/dto';
import { ThemeDto } from 'src/themes/dto/theme.dto';
import { GenericSectionDto } from 'src/webpage-sections/dto';

export class SeoMetadataDto {}

class PageBaseDto {
  sections?: GenericSectionDto[];
}

export class LayoutDto extends PageBaseDto {
  handle: string;

  @AutoMap()
  variant: string;

  config: PageSettingsDto;

  menus: MenusDto;
}
export class PageDto extends PageBaseDto {
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
  theme: ThemeDto;
}
