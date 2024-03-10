import { Injectable, Logger } from '@nestjs/common';
import { NewWebsiteRequest } from './dto';
import {
  EVENTS,
  YoutubeChannelDetailsCallbackEventPayload,
} from 'src/shared/events';
import { OnEvent } from '@nestjs/event-emitter';

export const NEW_WEBSITE_SERVICE = 'newWebsiteService';

export interface NewWebsiteService {
  validateNewWebsiteRequestOrThrow(req: NewWebsiteRequest): void;

  handleYoutubeChannelDetailsCallbackEvent(
    payload: YoutubeChannelDetailsCallbackEventPayload,
  ): Promise<void>;
}

@Injectable()
export class NewWebsiteServiceV1 implements NewWebsiteService {
  private readonly logger = new Logger(NewWebsiteServiceV1.name);

  @OnEvent(EVENTS.WEBHOOK_CALLBACK_RECEIVED.YOUTUBE.CHANNEL_DETAILS)
  async handleYoutubeChannelDetailsCallbackEvent({
    action,
    payload,
    resource,
  }: YoutubeChannelDetailsCallbackEventPayload): Promise<void> {
    this.logger.log(
      `Event received on ${resource} resource with ${action} action.`,
    );
    // this.logger.log(`Payload => ` + JSON.stringify(payload, null, 2));

    const { liiinxHandle, channelId } = payload;
    console.log('liiinxHandle :>> ', liiinxHandle, channelId);

    // 1. get website by liiinxHandle
    // 2. get its layout
    // 3. create header + menu from data
    // 4. create footer + menu from data
  }

  validateNewWebsiteRequestOrThrow(req: NewWebsiteRequest) {
    this.logger.log(req);
  }
}
