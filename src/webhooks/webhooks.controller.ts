import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { WebhookCallbackPayload, YoutubeChannelCallbackPayload } from './dto';

@Controller('webhooks/sync')
export class WebhooksController {
  @Post('callback')
  @HttpCode(HttpStatus.OK)
  syncCallbackHandler(
    @Body()
    {
      resource,
      action,
      payload,
    }: WebhookCallbackPayload<YoutubeChannelCallbackPayload>,
  ) {
    console.log('res :>> ', resource);
    console.log('act :>> ', action);
    console.log('payload :>> ', payload);
  }
}
