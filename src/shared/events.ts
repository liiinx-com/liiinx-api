import {
  WebhookCallbackPayload,
  YoutubeChannelCallbackPayload,
} from 'src/webhooks/dto';

// It is the events that are emitted in across the app using @nestjs/event-emitter
export const EVENTS = {
  WEBHOOK_CALLBACK_RECEIVED: {
    // CALLBACK_RECEIVED: 'webhook.callback.received',
    YOUTUBE: {
      CHANNEL_DETAILS: 'webhook.callbackReceived.youtube.channelDetails',
    },
  },
};

export class YoutubeChannelDetailsCallbackEventPayload extends WebhookCallbackPayload<YoutubeChannelCallbackPayload> {}
