import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
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
  title?: string;

  @AutoMap()
  icon?: string;

  @AutoMap()
  url: string;

  @AutoMap()
  target?: string;

  @AutoMap()
  order: number;

  @AutoMap()
  isFeatured: boolean;

  @AutoMap()
  props?: object;
}

export class CreateMenuDto extends MenuDto {
  @IsUUID()
  webpageId: string;

  @IsString()
  @IsNotEmpty()
  menuType: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @Type(() => MenuItemDto)
  items: MenuItemDto[];
}
