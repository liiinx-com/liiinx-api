import { Module } from '@nestjs/common';
import { ThemeService } from './themes.service';

@Module({
  providers: [ThemeService],
  exports: [ThemeService],
})
export class ThemesModule {}
