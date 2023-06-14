import { Module } from '@nestjs/common';
import { WebsiteDataController } from './website-data.controller';
import { Media } from './entities/media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataPartMappingProfile } from './website-data.mapping-profile';
import { MediaService } from './media.service';

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  controllers: [WebsiteDataController],
  providers: [DataPartMappingProfile, MediaService],
})
export class WebsiteDataModule {}
