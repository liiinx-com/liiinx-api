import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsObject,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import {
  BaseActionPayloadDto,
  BaseUIBlockPayloadDto,
} from './block-actions.dto';

export class CreateBaseUIBlockPayloadDto extends BaseUIBlockPayloadDto {}
export class PatchBaseUIBlockPayloadDto extends BaseUIBlockPayloadDto {
  @IsUUID()
  @AutoMap()
  blockId: string;
}

export class DeleteBaseUIBlockPayloadDto {
  @IsUUID()
  @AutoMap()
  blockId: string;
}

export class BlockTargetAction {
  @AutoMap()
  @IsString()
  resource: string;

  @AutoMap()
  @IsString()
  action: string;

  @AutoMap(() => BaseActionPayloadDto)
  @IsObject()
  payload: BaseActionPayloadDto;
}

export class BlockActionsRequest {
  @AutoMap()
  @IsUUID()
  webpageId: string;

  @IsObject()
  injectedWebpage: Webpage; // auto-injected by @UseGuards(InjectWebpageGuard)

  @AutoMap(() => BlockTargetAction)
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => BlockTargetAction)
  actions: BlockTargetAction[];
}
