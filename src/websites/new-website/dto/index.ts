import { Type } from 'class-transformer';
import {
  IsArray,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

class IntegrationPayload {}

export class WebsiteIntegrationItem {
  @IsString()
  type: string;

  @IsString()
  subtype: string;

  @IsObject()
  payload: IntegrationPayload;
}

export class YoutubeIntegrationPayload extends IntegrationPayload {
  youtubeHandle: string;
}

export class NewWebsiteRequest {
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  liiinxHandle: string;

  @ValidateNested({ each: true })
  @Type(() => WebsiteIntegrationItem)
  @IsArray()
  integrations: WebsiteIntegrationItem[];
}
