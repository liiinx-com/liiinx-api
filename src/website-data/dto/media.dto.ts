import { AutoMap } from '@automapper/classes';
import {
  IsDateString,
  IsInt,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { GenericDataPartDto } from './generic-datapart';
import { ThumbnailDto } from 'src/shared/thumbnail.dto';
import { Type } from 'class-transformer';

export class GetMediaDataPart extends GenericDataPartDto {
  @AutoMap()
  @IsString()
  mediaType: string;

  @AutoMap()
  @IsString()
  mediaProvider: string;
}

export class MediaDto {}
export class MediaResponseDto {
  @AutoMap()
  offset: number;

  @AutoMap()
  limit: number;

  // items:
}

export class CreateMediaDataPart extends GenericDataPartDto {
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

  @AutoMap()
  @IsString()
  providerMediaId: string;
}
