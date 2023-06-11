import { AutoMap } from '@automapper/classes';

import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BlockDto, BlockProps } from './block';

export class HeaderProps extends BlockProps {
  @IsString()
  @IsNotEmpty()
  dir: string;
}

export class HeaderBlockDto extends BlockDto {
  @AutoMap()
  @ValidateNested()
  @Type(() => HeaderProps)
  @IsOptional()
  blockProps?: HeaderProps;
}
