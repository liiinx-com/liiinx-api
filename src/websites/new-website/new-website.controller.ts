import {
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  NewWebsiteRequest,
  WebsiteIntegrationItem,
  YoutubeIntegrationPayload,
} from './dto';
import { WebhooksService } from 'src/webhooks/webhooks.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { WebsiteFacadeService } from 'src/websites/websites.facade';
import { NewWebsiteService, NEW_WEBSITE_SERVICE } from './new-website.service';
import { promiseUtils } from 'src/utils';

@Controller('websites/new')
export class NewWebsitesController {
  private readonly logger = new Logger(NewWebsitesController.name);

  constructor(
    private readonly websiteFacadeService: WebsiteFacadeService,
    private readonly webhooksService: WebhooksService,
    @Inject(NEW_WEBSITE_SERVICE)
    private readonly newWebsiteService: NewWebsiteService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async newWebsite(@Request() { user }, @Body() req: NewWebsiteRequest) {
    this.newWebsiteService.validateNewWebsiteRequestOrThrow(req);

    // 1. add templateCode to this Dto
    // 2. create a website status=pending

    // const website = await promiseUtils.throwExceptionIfFailed(
    //   this.logger,
    //   this.websiteFacadeService.newWebsite(user.id, {
    //     handle: req.liiinxHandle,
    //     title: req.liiinxHandle,
    //   }),
    // );

    await promiseUtils.throwExceptionIfFailed(
      this.logger,
      Promise.all(
        req.integrations.map((integration) =>
          this.startSyncJobForIntegrationItem(req.liiinxHandle, integration),
        ),
      ),
    );

    console.log('req :>> ', JSON.stringify(req));
    return 'worx';
  }

  startSyncJobForIntegrationItem(
    liiinxHandle: string,
    { type, subtype, payload }: WebsiteIntegrationItem,
  ) {
    if (
      type.toLowerCase() === 'youtube' &&
      subtype.toLowerCase() === 'channel-details'
    ) {
      const { youtubeHandle } = payload as YoutubeIntegrationPayload;

      return this.webhooksService.submitSyncYoutubeChannelDetailsJob({
        youtubeHandle,
        liiinxHandle,
      });
    }
  }
}
