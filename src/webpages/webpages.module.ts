import { Module } from '@nestjs/common';
import { WebpagesService } from './webpages.service';
import { Webpage } from './entities/webpage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebpageBuilder } from './webpage-builder';
import { WebpageSettingsModule } from 'src/webpage-settings/webpage-settings.module';
import { MenuModule } from 'src/menu/menu.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Webpage]),
    WebpageSettingsModule,
    MenuModule,
  ],
  providers: [WebpagesService, WebpageBuilder],
  exports: [WebpagesService, WebpageBuilder],
})
export class WebpagesModule {}
