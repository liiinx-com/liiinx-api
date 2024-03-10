import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

class Avatar {
  @IsInt()
  height: number;

  @IsInt()
  width: number;

  @IsString()
  url: string;
}

class AboutLink {
  @IsString()
  title: string;

  @IsString()
  url: string;
}

export class WebhookCallbackPayload<Payload> {
  @IsString()
  resource: string;

  @IsString()
  action: string;

  @IsObject()
  payload: Payload;
}

export class YoutubeChannelCallbackPayload {
  @IsString()
  liiinxHandle: string;

  @IsString()
  channelId: string;

  @IsString()
  country: string;

  @IsString()
  customUrl: string;

  @IsString()
  description: string;

  @IsString()
  defaultLanguage: string;

  @IsDate()
  publishedAt: Date;

  @IsString()
  title: string;

  @ValidateNested()
  @Type(() => Avatar)
  avatarDefault: Avatar;

  @ValidateNested()
  @Type(() => Avatar)
  avatarMedium: Avatar;

  @ValidateNested()
  @Type(() => Avatar)
  avatarHigh: Avatar;

  @IsBoolean()
  hiddenSubscriberCount: boolean;

  @IsInt()
  commentCount: number;

  @IsInt()
  videoCount: number;

  @IsInt()
  viewCount: number;

  @IsInt()
  subscriberCount: number;

  @IsString()
  bannerUrl: string;

  @IsString()
  keywords: string[];

  @IsBoolean()
  madeForKids: boolean;

  @IsString()
  privacyStatus: string;

  @IsString()
  uploadsPlaylistId: string;

  @ValidateNested({ each: true })
  @Type(() => AboutLink)
  aboutLinks: AboutLink[];
}
