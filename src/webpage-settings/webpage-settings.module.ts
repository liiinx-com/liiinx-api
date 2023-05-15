import { Module } from '@nestjs/common';
import { WebpageSettingsService } from './webpage-settings.service';
import { WebpageSetting as WebpageSetting } from './entities/webpage-setting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WebpageSetting])],
  providers: [WebpageSettingsService],
  exports: [WebpageSettingsService],
})
export class WebpageSettingsModule {}
