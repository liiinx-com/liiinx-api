import { Module } from '@nestjs/common';
import { NewWebsitesController } from './new-website.controller';
import { WebsitesModule } from 'src/websites/websites.module';
import { WebhooksModule } from 'src/webhooks/webhooks.module';
import {
  NEW_WEBSITE_SERVICE,
  NewWebsiteServiceV1,
} from './new-website.service';

@Module({
  imports: [WebsitesModule, WebhooksModule],
  controllers: [NewWebsitesController],
  providers: [{ provide: NEW_WEBSITE_SERVICE, useClass: NewWebsiteServiceV1 }],
})
export class NewWebsitesModule {}
