import { AutoMap } from '@automapper/classes';

import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseEntityDto } from 'src/shared/base.dto';

export class WebsiteDto extends BaseEntityDto {
  @AutoMap()
  handle: string;

  @AutoMap()
  customUrl: string;

  @AutoMap()
  subscriptionPlan: string;
}

export class CreateWebsiteDto {
  @IsNotEmpty()
  @IsString()
  handle: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  themeCode?: string;

  @IsOptional()
  @IsString()
  layoutVariant?: string;

  @IsOptional()
  @IsString()
  customUrl?: string;

  @IsOptional()
  @IsBoolean()
  isRtl?: boolean;

  @IsOptional()
  @IsString()
  faviconUrl?: string;
}

export class CreateWebsiteForYoutubeChannelDto extends CreateWebsiteDto {
  @IsNotEmpty()
  @IsString()
  youtubeHandle: string;
}
