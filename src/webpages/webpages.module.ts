import { Module } from '@nestjs/common';
import { WebpagesService } from './webpages.service';
import { Webpage } from './entities/webpage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsModule } from 'src/webpage-settings/settings.module';
import { WebpageMappingProfile } from './webpage.mapping-profile';
import { WebpageDtoBuilder } from './dto/webpage.dto-builder';
import { ThemesModule } from 'src/themes/themes.module';

import { BlockModule } from 'src/webpage-blocks/blocks.module';
import { MenuModule } from 'src/menu/menu.module';
import { ProfileModule } from 'src/profile/profile.module';
import { WebpageBuilder } from './webpage-builder';

@Module({
  imports: [
    TypeOrmModule.forFeature([Webpage]),
    SettingsModule,
    ThemesModule,
    MenuModule,
    BlockModule,
    ProfileModule,
  ],
  providers: [
    WebpagesService,
    WebpageMappingProfile,
    WebpageDtoBuilder,
    WebpageBuilder,
  ],
  exports: [WebpagesService, WebpageDtoBuilder],
})
export class WebpagesModule {}
