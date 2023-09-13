import { AutoMap } from '@automapper/classes';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsInt,
  IsUUID,
} from 'class-validator';
import { HeaderBlockDto } from '../header/header.dto';
import { FooterBlockDto } from '../footer/footer.dto';

export class BaseBlockResponseDto {
  @IsOptional()
  @AutoMap()
  id?: string;

  @IsOptional()
  @AutoMap()
  @IsString()
  blockClassName?: string;

  @IsOptional()
  @IsObject()
  @AutoMap()
  blockStyle?: object;

  @IsBoolean()
  @AutoMap()
  @IsOptional()
  isLtr?: boolean;

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
  @IsString()
  wrapperClassName?: string;

  @IsOptional()
  @IsObject()
  @AutoMap()
  wrapperStyle?: object;

  @IsBoolean()
  @AutoMap()
  @IsOptional()
  isActive: boolean;
}

export class PatchBaseBlockDto {
  @IsOptional()
  @AutoMap()
  @IsString()
  blockClassName?: string;

  @AutoMap()
  @IsUUID()
  blockId: string;

  @IsOptional()
  @IsObject()
  @AutoMap()
  blockStyle?: object;

  @IsBoolean()
  @AutoMap()
  @IsOptional()
  blockContained?: boolean;

  @IsString()
  @IsNotEmpty()
  @AutoMap()
  @IsOptional()
  blockVariant?: string;

  @IsBoolean()
  @AutoMap()
  @IsOptional()
  isLtr?: boolean;

  @IsBoolean()
  @AutoMap()
  @IsOptional()
  wrapperContained?: boolean;

  @IsInt()
  @IsOptional()
  @AutoMap()
  order?: number;

  @IsOptional()
  @AutoMap()
  @IsString()
  wrapperClassName?: string;

  @IsOptional()
  @IsObject()
  @AutoMap()
  wrapperStyle?: object;

  @IsBoolean()
  @AutoMap()
  @IsOptional()
  isActive?: boolean;
}

// export class PageLayoutDto {
//   dir: 'ltr' | 'rtl';
//   faviconUrl: string;
//   topBar?: BaseBlockResponseDto;
//   header?: HeaderBlockDto;
//   hero?: BaseBlockResponseDto;
//   sidebar?: BaseBlockResponseDto;
//   content?: BaseBlockResponseDto;
//   footer?: FooterBlockDto;
//   footerBar?: BaseBlockResponseDto;
// }
