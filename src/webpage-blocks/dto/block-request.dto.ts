import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import { BaseActionPayloadDto } from './block-actions.dto';

export class FetchBaseUIBlockPayloadDto {
  @IsUUID()
  @AutoMap()
  blockId: string;
}

export enum PatchActionChangeTypes {
  BASE_BLOCK_ONLY = 'BASE_BLOCK_ONLY',
  BLOCK_ONLY = 'BLOCK_ONLY',
  BOTH = 'BOTH',
}

export class DeleteBaseUIBlockPayloadDto {
  @IsUUID()
  @AutoMap()
  blockId: string;
}

export class BlockAction {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  resource: string;

  @AutoMap()
  @IsEnum(PatchActionChangeTypes)
  @ValidateIf((o) => o.action && o.action.toLowerCase() === 'patch')
  // in case of "patch" action, indicates what the changes include
  patchActionUpdates?: PatchActionChangeTypes;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
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
  // auto-injected by @UseGuards(InjectWebpageGuard)
  injectedWebpage: Webpage;

  @AutoMap(() => BlockAction)
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => BlockAction)
  actions: BlockAction[];
}
