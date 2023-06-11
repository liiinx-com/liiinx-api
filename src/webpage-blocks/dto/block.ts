import { AutoMap } from '@automapper/classes';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BlockProps {
  @IsObject()
  @IsOptional()
  style?: object;

  @IsString()
  @IsOptional()
  className?: string;
}

export class BlockDto {
  @IsOptional()
  @AutoMap()
  blockClassName?: string;

  @IsOptional()
  @IsObject()
  @AutoMap()
  blockStyle?: object;

  @IsBoolean()
  @AutoMap()
  blockContained: boolean;

  @IsString()
  @IsNotEmpty()
  @AutoMap()
  blockType: string;

  @IsString()
  @IsNotEmpty()
  @AutoMap()
  blockVariant: string;

  @IsOptional()
  @ValidateNested()
  @AutoMap()
  //   @Type(() => HeaderProps)
  @Type(() => BlockProps)
  blockProps?: BlockProps;

  @IsBoolean()
  @AutoMap()
  wrapperContained: boolean;

  @IsInt()
  @IsOptional()
  @AutoMap()
  order?: number;

  @IsOptional()
  @AutoMap()
  wrapperClassName?: string;

  @IsOptional()
  @IsObject()
  @AutoMap()
  wrapperStyle?: object;

  @IsBoolean()
  @AutoMap()
  isActive: boolean;
}
