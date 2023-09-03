import { AutoMap } from '@automapper/classes';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsInt,
} from 'class-validator';
import { HeaderBlockDto } from '../blocks/header/header.dto';
import { FooterBlockDto } from '../blocks/footer/footer.dto';

export class BaseBlockDto {
  @IsOptional()
  @AutoMap()
  id?: string;

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

export class PageLayoutDto {
  dir: 'ltr' | 'rtl';
  faviconUrl: string;
  topBar?: BaseBlockDto;
  header?: HeaderBlockDto;
  hero?: BaseBlockDto;
  sidebar?: BaseBlockDto;
  content?: BaseBlockDto;
  footer?: FooterBlockDto;
  footerBar?: BaseBlockDto;
}
