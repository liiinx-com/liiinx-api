import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
import { BaseBlockResponseDto } from 'src/webpage-blocks/blocks/_base-block/base-block.dto';
import {} from 'src/webpage-blocks/dto/block-request.dto';

export class FooterBlockDto extends BaseBlockResponseDto {
  @IsString()
  @AutoMap()
  textLogo: string;
}

export class CreateFooterBlockPayload extends FooterBlockDto {}
