import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';
import { BaseEntityDto } from 'src/shared/base.dto';

export class LogoDto {
  @AutoMap()
  textLogo?: string;

  //   @IsObject()
  @AutoMap()
  textLogoProps?: object;

  @AutoMap()
  imageLogoUrl?: string;

  @AutoMap()
  imageLogoProps?: object;

  @AutoMap()
  slogan?: string;

  @AutoMap()
  sloganProps?: object;
}

export class ProfileDto extends BaseEntityDto {
  @IsNotEmpty()
  @AutoMap()
  webpageId: string;

  @AutoMap(() => LogoDto)
  headerLogo: LogoDto;

  @AutoMap(() => LogoDto)
  footerLogo?: LogoDto;

  @AutoMap()
  copyright?: string;

  @AutoMap()
  terms?: string;

  @AutoMap()
  privacy?: string;
}
