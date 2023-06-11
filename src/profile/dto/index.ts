import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { BaseEntityDto } from 'src/shared/base.dto';
import { Webpage } from 'src/webpages/entities/webpage.entity';

export class LogoDto {
  @AutoMap()
  @IsOptional()
  @IsString()
  textLogo?: string;

  //   @IsObject()
  @AutoMap()
  @IsOptional()
  @IsObject()
  textLogoProps?: object;

  @AutoMap()
  @IsOptional()
  @IsString()
  imageLogoUrl?: string;

  @AutoMap()
  @IsOptional()
  @IsObject()
  imageLogoProps?: object;

  @AutoMap()
  @IsOptional()
  @IsString()
  slogan?: string;

  @AutoMap()
  @IsOptional()
  @IsObject()
  sloganProps?: object;
}

export class ProfileDto extends BaseEntityDto {
  @AutoMap()
  @IsUUID()
  webpageId: string;

  @AutoMap()
  injectedWebpage: Webpage;

  @AutoMap(() => LogoDto)
  @Type(() => LogoDto)
  @IsOptional()
  headerLogo?: LogoDto;

  @AutoMap(() => LogoDto)
  @Type(() => LogoDto)
  @IsOptional()
  footerLogo?: LogoDto;

  @AutoMap()
  @IsString()
  @IsOptional()
  copyrightText?: string;

  @AutoMap()
  @IsString()
  title: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  termsText?: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  privacyText?: string;
}
