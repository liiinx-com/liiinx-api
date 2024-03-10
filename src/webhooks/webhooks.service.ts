import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { promiseUtils } from 'src/utils';

export const WEBHOOK_RESOURCE = {
  YOUTUBE: 'youtube',
};

export const WEBHOOK_RESOURCE_ACTION = {
  SYNC_YOUTUBE_CHANNEL_DETAILS: 'sync-youtube-channel-details',
};

const SYNC_API_BASE_URL = 'http://localhost:3003'; // TODO: config service

class SubmitSyncJobResult {
  resource: string;
  action: string;
  result: string;
}

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  constructor(private readonly httpService: HttpService) {}

  private async submitSyncJob(
    resource: string,
    action: string,
    payload?: object,
  ): Promise<SubmitSyncJobResult> {
    const response = await promiseUtils.throwExceptionIfFailed(
      this.logger,
      this.httpService.axiosRef.post(this.urlFor(), { items: [payload] }),
    );

    return {
      result: response.statusText,
      resource,
      action,
    };
  }

  private urlFor(): string {
    return `${SYNC_API_BASE_URL}/sync`;
  }

  async submitSyncYoutubeChannelDetailsJob(params: {
    youtubeHandle: string;
    liiinxHandle: string;
  }): Promise<SubmitSyncJobResult> {
    return this.submitSyncJob(
      WEBHOOK_RESOURCE.YOUTUBE,
      WEBHOOK_RESOURCE_ACTION.SYNC_YOUTUBE_CHANNEL_DETAILS,
      {
        resource: 'youtube',
        action: 'sync-youtube-channel-details',
        payload: {
          ...params,
        },
      },
    );
  }
}
