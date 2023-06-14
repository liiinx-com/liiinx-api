import { AutoMap } from '@automapper/classes';
import { Webpage } from 'src/webpages/entities/webpage.entity';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class GenericDataPartDto {
  @AutoMap()
  @IsString()
  dataPartType: string;

  // @AutoMap()
  // @IsInt()
  // @IsOptional()
  // offset?: number;

  // @AutoMap()
  // @IsInt()
  // @IsOptional()
  // limit?: number;
}

class DataPartDtoReq {
  @AutoMap()
  @IsUUID()
  webpageId: string;

  injectedWebpage: Webpage;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  dataParts: GenericDataPartDto[];
}

export class GetDataPartDtoRequest extends DataPartDtoReq {}
export class CreateDataPartsReq extends DataPartDtoReq {}
