import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

const RESOURCE = {
  YOUTUBE: 'youtube',
};

const RESOURCE_ACTION = {
  SYNC_YOUTUBE_CHANNEL_DETAILS: 'sync-youtube-channel-details',
};

const SYNC_API_BASE_URL = 'http://localhost:3003'; // TODO: config service

@Injectable()
export class WebhooksService {
  constructor(private readonly httpService: HttpService) {}

  private submitSyncJob(resource: string, action: string, payload?: object) {
    console.log(
      `sending ${action} to resource ${resource} with payload ${payload}`,
    );
    console.log(this.urlFor(resource, action));
  }

  private urlFor(resource: string, action: string): string {
    return `${SYNC_API_BASE_URL}/${resource}/${action}`;
  }

  submitSyncYoutubeChannelDetailsJob(params: {
    youtubeHandle: string;
    liiinxHandle: string;
  }) {
    return this.submitSyncJob(
      RESOURCE.YOUTUBE,
      RESOURCE_ACTION.SYNC_YOUTUBE_CHANNEL_DETAILS,
      params,
    );
  }
}
