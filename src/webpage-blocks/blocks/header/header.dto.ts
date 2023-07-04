import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseBlockDto, BaseBlockOptions } from '../base-block.dto';
import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';

export class HeaderBlockOptions extends BaseBlockOptions {
  @IsString()
  @IsNotEmpty()
  dir: string;
}

export class CreateHeaderBlockReq extends BaseBlockDto {
  @AutoMap()
  @ValidateNested()
  @Type(() => HeaderBlockOptions)
  @IsOptional()
  blockOptions?: HeaderBlockOptions;
}
