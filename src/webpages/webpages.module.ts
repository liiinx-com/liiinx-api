import { Module } from '@nestjs/common';
import { WebpagesService } from './webpages.service';
import { Webpage } from './entities/webpage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebpageBuilder } from './webpage-builder';
import { WebpageSettingsModule } from 'src/webpage-settings/webpage-settings.module';
import { MenuModule } from 'src/menu/menu.module';
import { WebpageFactory } from './webpage-factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([Webpage]),
    WebpageSettingsModule,
    MenuModule,
  ],
  providers: [WebpagesService, WebpageBuilder, WebpageFactory],
  exports: [WebpagesService, WebpageBuilder],
})
export class WebpagesModule {}
