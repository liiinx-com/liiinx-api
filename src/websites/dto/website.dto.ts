import { AutoMap } from '@automapper/classes';

import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseEntityDto } from 'src/shared/base.dto';

export class WebsiteDto extends BaseEntityDto {
  @AutoMap()
  handle: string;

  @AutoMap()
  customUrl: string;

  @AutoMap()
  subscriptionPlan: string;
}

export class CreateWebsiteDto {
  @IsNotEmpty()
  handle: string;

  @IsOptional()
  customUrl: string;
}
