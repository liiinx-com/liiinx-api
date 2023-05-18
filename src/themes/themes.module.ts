import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';

@Module({
  providers: [ThemesService],
})
export class ThemesModule {}
