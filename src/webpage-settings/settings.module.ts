import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { WebpageSetting as WebpageSetting } from './entities/webpage-setting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WebpageSetting])],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
