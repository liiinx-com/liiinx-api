import { Module } from '@nestjs/common';
import { WebpagesService } from './webpages.service';
import { Webpage } from './entities/webpage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebpageBuilder } from './webpage-builder';
import { SettingsModule } from 'src/webpage-settings/settings.module';
import { MenuModule } from 'src/menu/menu.module';
import { WebpageFactory } from './webpage-factory';
import { WebpageMappingProfile } from './webpage.mapping-profile';
import { WebpageDtoBuilder } from './dto/webpage.dto-builder';
import { ThemesModule } from 'src/themes/themes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Webpage]),
    SettingsModule,
    MenuModule,
    ThemesModule,
  ],
  providers: [
    WebpagesService,
    WebpageBuilder,
    WebpageFactory,
    WebpageMappingProfile,
    WebpageDtoBuilder,
  ],
  exports: [WebpagesService, WebpageBuilder, WebpageDtoBuilder],
})
export class WebpagesModule {}
