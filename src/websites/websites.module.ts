import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebPage, Website } from './entities/website.entity';
import { WebsitesService } from './websites.service';
import { WebsitesController } from './websites.controller';
import { WebsiteBuilder } from './website-builder';
import { WebsitesDomainService } from './websites.domain.service';
import { WebsitesSeederService } from './websites.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Website, WebPage])],
  providers: [
    WebsitesService,
    WebsiteBuilder,
    WebsitesDomainService,
    WebsitesSeederService,
  ],
  controllers: [WebsitesController],
  exports: [WebsitesSeederService],
})
export class WebsitesModule {}
