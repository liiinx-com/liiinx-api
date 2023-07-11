import { IsInt, IsOptional, ValidateNested } from 'class-validator';
import { BaseBlockDto, BaseBlockOptions } from '../base-block.dto';
import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';

export class HeaderBlockOptions extends BaseBlockOptions {
  @IsInt()
  @AutoMap()
  @IsOptional()
  height?: number;
}

export class HeaderBlockOptionsResponse extends HeaderBlockOptions {} // might have some dynamic options added by addDynamicOptions()

export class HeaderBlockDto extends BaseBlockDto {
  @AutoMap()
  @ValidateNested()
  @Type(() => HeaderBlockOptions)
  @IsOptional()
  blockOptions?: HeaderBlockOptions;
}
