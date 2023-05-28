import { IsEnum, IsNotEmpty } from 'class-validator';
import { PageTypes } from 'src/webpages/entities/webpage.entity';

export class CreateWebsiteDto {
  @IsNotEmpty()
  handle: string;

  @IsNotEmpty()
  themeCode: string;
}

export class CreateWebpageDto {
  @IsNotEmpty()
  @IsEnum(PageTypes)
  pageType: PageTypes;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  pageVariant: string;

  themeCode?: string;
}
