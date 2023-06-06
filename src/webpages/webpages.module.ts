import { Module } from '@nestjs/common';
import { WebpagesService } from './webpages.service';
import { Webpage } from './entities/webpage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsModule } from 'src/webpage-settings/settings.module';
import { WebpageMappingProfile } from './webpage.mapping-profile';
import { WebpageDtoBuilder } from './dto/webpage.dto-builder';
import { ThemesModule } from 'src/themes/themes.module';
import { WebpageBlock } from '../webpage-blocks/entities/block.entity';
import { BlockModule } from 'src/webpage-blocks/blocks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Webpage, WebpageBlock]),
    SettingsModule,
    ThemesModule,
    BlockModule,
  ],
  providers: [WebpagesService, WebpageMappingProfile, WebpageDtoBuilder],
  exports: [WebpagesService, WebpageDtoBuilder],
})
export class WebpagesModule {}
