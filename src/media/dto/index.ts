import { AutoMap } from '@automapper/classes';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import {
  IsDateString,
  IsInt,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { ThumbnailDto } from 'src/shared/thumbnail.dto';
import { Type } from 'class-transformer';
import { BaseEntityDto } from 'src/shared/base.dto';
export class GetMediaResponse {
  @AutoMap()
  offset: number;

  @AutoMap()
  limit: number;

  @AutoMap()
  items: MediaItemResponse[];
}

export class CreateMediaReq {
  @AutoMap()
  @IsUUID()
  webpageId: string;

  injectedWebpage: Webpage;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  items: CreateMediaItem[];
}

export class MediaItemDto extends BaseEntityDto {
  @AutoMap()
  @IsString()
  title: string;

  @AutoMap()
  @IsString()
  description: string;

  @AutoMap()
  @IsString()
  mediaType: string;

  @AutoMap()
  @Type(() => ThumbnailDto)
  @ValidateNested()
  @IsNotEmptyObject()
  thumbnails: ThumbnailDto;

  @AutoMap()
  @IsString()
  mediaProvider: string;

  @AutoMap()
  @IsDateString()
  publishedAt: Date;

  @AutoMap()
  @IsInt()
  @IsOptional()
  order?: number;
}

export class CreateMediaItem extends MediaItemDto {
  @AutoMap()
  @IsString()
  providerMediaId: string;

  @AutoMap()
  @IsUUID()
  webpageId: string;
}
export class MediaItemResponse extends MediaItemDto {
  @AutoMap()
  url: string;
}
