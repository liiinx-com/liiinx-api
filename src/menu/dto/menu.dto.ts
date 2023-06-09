import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { BaseEntityDto } from 'src/shared/base.dto';

export class MenusDto {
  topBar?: MenuDto;
  sideBar?: MenuDto;
  headerPrimary?: MenuDto;
  headerSecondary?: MenuDto;
  footerPrimary?: MenuDto;
  footerSecondary?: MenuDto;
}

export class MenuDto extends BaseEntityDto {
  @AutoMap()
  title: string;

  @AutoMap()
  items: MenuItemDto[];
}

export class MenuItemDto {
  @AutoMap()
  id?: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  title?: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  icon?: string;

  @AutoMap()
  @IsString()
  url: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  target?: string;

  @AutoMap()
  @IsInt()
  @IsOptional()
  order?: number;

  @AutoMap()
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @AutoMap()
  @IsObject()
  @IsOptional()
  props?: object;
}

export class CreateMenuDto extends MenuDto {
  @IsUUID()
  webpageId: string;

  @IsString()
  @IsNotEmpty()
  menuType: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @Type(() => MenuItemDto)
  items: MenuItemDto[];
}
