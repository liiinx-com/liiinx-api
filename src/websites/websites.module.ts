import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Website } from './entities/website.entity';
import { WebsitesService } from './websites.service';
import { WebsitesController } from './websites.controller';
import { WebsiteBuilder } from './website-builder';
import { WebsiteFacadeService } from './websites.facade';
import { WebpagesModule } from 'src/webpages/webpages.module';
import { ProfileModule } from 'src/profile/profile.module';
import { WebSiteMappingProfile } from './website.mapping-profile';

@Module({
  imports: [TypeOrmModule.forFeature([Website]), WebpagesModule, ProfileModule],
  providers: [
    WebsitesService,
    WebsiteBuilder,
    WebsiteFacadeService,
    WebSiteMappingProfile,
  ],
  controllers: [WebsitesController],
})
export class WebsitesModule {}
