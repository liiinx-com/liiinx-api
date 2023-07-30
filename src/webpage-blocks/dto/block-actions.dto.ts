import { AutoMap } from '@automapper/classes';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class ActionResult {
  ok: boolean;
  messages: string[];

  constructor(public resource: string, public action: string) {
    this.ok = false;
    this.messages = [];
  }
}

export class BaseActionPayloadDto {}

class BaseDataBlockActionPayloadDto extends BaseActionPayloadDto {} // will be used for non-ui blocks. e.g. profile data
export class BaseUIBlockPayloadDto extends BaseActionPayloadDto {
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  blockVariant: string;

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

  @IsBoolean()
  @AutoMap()
  wrapperContained: boolean;

  @IsInt()
  @AutoMap()
  order: number;

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
