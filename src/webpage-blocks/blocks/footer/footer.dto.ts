import { AutoMap } from '@automapper/classes';
import { PartialType } from '@nestjs/mapped-types';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { BaseBlockDto } from 'src/webpage-blocks/base-block/base-block.dto';
import {
  CreateBaseUIBlockPayloadDto,
  DeleteBaseUIBlockPayloadDto,
  PatchBaseUIBlockPayloadDto,
} from 'src/webpage-blocks/dto/block-request.dto';

export class FooterBlockDto extends BaseBlockDto {
  @IsString()
  @AutoMap()
  textLogo: string;
}

export class CreateFooterBlockPayload extends CreateBaseUIBlockPayloadDto {
  @IsString()
  @AutoMap()
  textLogo: string;
}
