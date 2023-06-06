import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { WebpagesModule } from 'src/webpages/webpages.module';
import { ProfileMappingProfile } from './profile.mapping-profile';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), WebpagesModule],
  providers: [ProfileService, ProfileMappingProfile],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
