import { Module } from '@nestjs/common';
import { SettingService } from './settings.service';
import { WebpageSetting as WebpageSetting } from './entities/webpage-setting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WebpageSetting])],
  providers: [SettingService],
  exports: [SettingService],
})
export class SettingsModule {}
