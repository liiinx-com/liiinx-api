import { Module } from '@nestjs/common';
import { ThemeService } from './themes.service';
import { ThemeDtoBuilder } from './theme.dto-builder';

@Module({
  providers: [ThemeService, ThemeDtoBuilder],
  exports: [ThemeService],
})
export class ThemesModule {}
