import { Module } from '@nestjs/common';
import { WebpagesService } from './webpages.service';
import { WebPage } from './entities/webpage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebpageBuilder } from './webpage-builder';

@Module({
  imports: [TypeOrmModule.forFeature([WebPage])],
  providers: [WebpagesService, WebpageBuilder],
  exports: [WebpagesService, WebpageBuilder],
})
export class WebpagesModule {}
