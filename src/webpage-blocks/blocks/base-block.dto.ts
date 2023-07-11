import { AutoMap } from '@automapper/classes';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
  IsInt,
  IsUUID,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { HeaderBlockDto } from './header/header.dto';

export class BaseBlockOptions {
  // @IsObject()
  // @AutoMap()
  // @IsOptional()
  // style?: object;

  // @IsString()
  // @IsOptional()
  // @AutoMap()
  // className?: string;

  @IsString()
  @IsOptional()
  @AutoMap()
  baseBlockId?: string;
}

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

  @IsOptional()
  @ValidateNested()
  @AutoMap()
  @Type(() => BaseBlockOptions)
  blockOptions?: BaseBlockOptions;

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

export class CreateBlockDto {
  @AutoMap()
  @IsUUID()
  webpageId: string;

  injectedWebpage: Webpage;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  blocks: BaseBlockDto[];
}

export class PageLayoutDto {
  dir: 'ltr' | 'rtl';
  faviconUrl: string;
  topBar?: BaseBlockDto;
  header?: HeaderBlockDto;
  // hero?: LayoutBlock;
  sidebar?: BaseBlockDto;
  content?: BaseBlockDto;
  footer?: BaseBlockDto;
  footerBar?: BaseBlockDto;
}
