import { AutoMap } from '@automapper/classes';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import {
  BaseBlockResponseDto,
  PatchBaseBlockDto,
} from 'src/webpage-blocks/blocks/_base-block/base-block.dto';
import {
  DeleteBaseUIBlockPayloadDto,
  FetchBaseUIBlockPayloadDto,
} from 'src/webpage-blocks/dto/block-request.dto';

export class HeaderBlockDto extends BaseBlockResponseDto {
  constructor() {
    super();
    this.blockType = 'header';
  }

  @IsString()
  @AutoMap()
  @ValidateIf((o: HeaderBlockDto) => !o.imageLogoUrl)
  textLogo?: string;

  @IsObject()
  @AutoMap()
  @IsOptional()
  textLogoProps?: object;

  @IsString()
  @AutoMap()
  @ValidateIf((o: HeaderBlockDto) => !o.textLogo)
  imageLogoUrl?: string;

  @IsObject()
  @IsOptional()
  @AutoMap()
  imageLogoProps?: object;

  @IsString()
  @AutoMap()
  @IsOptional()
  @ValidateIf((o: HeaderBlockDto) => !!o.textLogo)
  slogan?: string;

  @IsObject()
  @AutoMap()
  @IsOptional()
  sloganProps?: object;
}

class PatchHeaderBlockDto extends PatchBaseBlockDto {
  @IsString()
  @AutoMap()
  @IsOptional()
  textLogo?: string;

  @IsObject()
  @AutoMap()
  @IsOptional()
  textLogoProps?: object;

  @IsString()
  @AutoMap()
  @IsOptional()
  imageLogoUrl?: string;

  @IsObject()
  @IsOptional()
  @AutoMap()
  imageLogoProps?: object;

  @IsString()
  @AutoMap()
  @IsOptional()
  slogan?: string;

  @IsObject()
  @AutoMap()
  @IsOptional()
  sloganProps?: object;
}

export class FetchHeaderBlockPayload extends FetchBaseUIBlockPayloadDto {}
export class CreateHeaderBlockPayload extends HeaderBlockDto {}
export class PatchHeaderBlockPayload extends PatchHeaderBlockDto {}
export class DeleteHeaderBlockPayload extends DeleteBaseUIBlockPayloadDto {}
