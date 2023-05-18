import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Website } from './entities/website.entity';
import { WebsitesService } from './websites.service';
import { WebsitesController } from './websites.controller';
import { WebsiteBuilder } from './website-builder';
import { WebsitesFacadeService } from './websites.facade';
import { WebpagesModule } from 'src/webpages/webpages.module';
import { MenuModule } from 'src/menu/menu.module';
import { WebpageDtoBuilder } from './dto/webpage.dto-builder';

@Module({
  imports: [TypeOrmModule.forFeature([Website]), WebpagesModule, MenuModule],
  providers: [
    WebsitesService,
    WebsiteBuilder,
    WebsitesFacadeService,
    WebpageDtoBuilder,
  ],
  controllers: [WebsitesController],
})
export class WebsitesModule {}
