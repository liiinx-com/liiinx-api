import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class Thumbnail {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  url: string;

  @AutoMap()
  @IsInt()
  width: number;

  @AutoMap()
  @IsInt()
  height: number;
}

export class ThumbnailDto {
  @AutoMap()
  @ValidateNested()
  @Type(() => Thumbnail)
  @IsNotEmptyObject()
  default: Thumbnail;

  @AutoMap()
  @ValidateNested()
  @Type(() => Thumbnail)
  @IsOptional()
  high?: Thumbnail;

  @AutoMap()
  @ValidateNested()
  @IsOptional()
  @Type(() => Thumbnail)
  medium?: Thumbnail;
}
