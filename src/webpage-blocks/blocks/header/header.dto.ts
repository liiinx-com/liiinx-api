import { AutoMap } from '@automapper/classes';
import { PartialType } from '@nestjs/mapped-types';
import { IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseBlockDto } from 'src/webpage-blocks/base-block/base-block.dto';
import {
  CreateBaseUIBlockPayloadDto,
  DeleteBaseUIBlockPayloadDto,
  PatchBaseUIBlockPayloadDto,
} from 'src/webpage-blocks/dto/block-request.dto';

export class HeaderBlockDto extends BaseBlockDto {
  @IsString()
  @AutoMap()
  textLogo: string;

  @IsObject()
  @AutoMap()
  textLogoStyle: object;

  @IsString()
  @AutoMap()
  textLogoClassName: string;
}

export class CreateHeaderBlockPayload extends CreateBaseUIBlockPayloadDto {
  @IsString()
  @AutoMap()
  textLogo: string;

  @IsString()
  @AutoMap()
  textLogoClassName: string;
}

export class DeleteHeaderBlockPayload extends DeleteBaseUIBlockPayloadDto {}

export class PatchHeaderBlockPayload extends PartialType(
  PatchBaseUIBlockPayloadDto,
) {
  @IsUUID()
  @AutoMap()
  blockId: string;

  @IsString()
  @AutoMap()
  @IsOptional()
  textLogo?: string;

  @IsString()
  @AutoMap()
  @IsOptional()
  textLogoClassName?: string;
}
