import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { WebhookCallbackPayload, YoutubeChannelCallbackPayload } from './dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  EVENTS,
  YoutubeChannelDetailsCallbackEventPayload,
} from 'src/shared/events';
import { WEBHOOK_RESOURCE, WEBHOOK_RESOURCE_ACTION } from './webhooks.service';

@Controller('webhooks/sync')
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);

  constructor(private eventEmitter: EventEmitter2) {}

  @Post('callback')
  @HttpCode(HttpStatus.OK)
  syncCallbackHandler(
    @Body()
    payload: WebhookCallbackPayload<YoutubeChannelCallbackPayload>,
  ) {
    if (
      payload.resource === WEBHOOK_RESOURCE.YOUTUBE &&
      payload.action === WEBHOOK_RESOURCE_ACTION.SYNC_YOUTUBE_CHANNEL_DETAILS
    ) {
      this.logger.log(
        `webhook ${payload.resource} - ${payload.action} action called.`,
      );
      const eventPayload = new YoutubeChannelDetailsCallbackEventPayload();
      eventPayload.resource = payload.resource;
      eventPayload.action = payload.action;
      eventPayload.payload = payload.payload;

      return this.eventEmitter.emit(
        EVENTS.WEBHOOK_CALLBACK_RECEIVED.YOUTUBE.CHANNEL_DETAILS,
        eventPayload,
      );
    }
    return false;
  }
}
