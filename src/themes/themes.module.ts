import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemeDtoBuilder } from './theme.dto-builder';

@Module({
  providers: [ThemesService, ThemeDtoBuilder],
  exports: [ThemesService],
})
export class ThemesModule {}
