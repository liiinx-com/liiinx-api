import { AutoMap } from '@automapper/classes';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import {
  IsBoolean,
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsUUID,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBlockDto {
  @AutoMap()
  @IsUUID()
  webpageId: string;

  @AutoMap()
  injectedWebpage: Webpage;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  blocks: BlockDto[];
}

export class BlockProps {
  @IsObject()
  @IsOptional()
  style?: object;

  @IsString()
  @IsOptional()
  className?: string;
}
export class HeaderProps extends BlockProps {
  @IsString()
  @IsNotEmpty()
  dir: string;
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
  @Type(() => HeaderProps)
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

export class HeaderBlockDto extends BlockDto {
  @AutoMap()
  @ValidateNested()
  @Type(() => HeaderProps)
  @IsOptional()
  blockProps?: HeaderProps;
}

export class PageLayoutDto {
  dir: 'ltr' | 'rtl';
  faviconUrl: string;
  topBar?: BlockDto;
  header?: HeaderBlockDto;
  // hero?: LayoutBlock;
  sidebar?: BlockDto;
  content?: BlockDto;
  footer?: BlockDto;
  footerBar?: BlockDto;
}
