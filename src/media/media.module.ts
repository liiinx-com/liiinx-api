import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { Media } from './entities/media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaMappingProfile } from './media.mapping-profile';
import { MediaService } from './media.service';

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  controllers: [MediaController],
  providers: [MediaMappingProfile, MediaService],
})
export class MediaModule {}
