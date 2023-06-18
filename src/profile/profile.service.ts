import { Injectable } from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { lodash } from 'src/utils';
import { ProfileDto } from './dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class ProfileService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async save(profile: Profile): Promise<Profile> {
    return this.profileRepository.save(profile);
  }

  async getBy(webpageId: string): Promise<Profile> {
    const profile = await this.profileRepository.findOneBy({
      webpageId,
      isDeleted: false,
    });
    return this.generateProfile(profile);
  }

  mapToProfileDto(profile: Profile): ProfileDto {
    return this.mapper.map(profile, Profile, ProfileDto);
  }

  mapToProfile(profileDto: ProfileDto): Profile {
    return this.mapper.map(profileDto, ProfileDto, Profile);
  }

  private generateProfile(pageProfile: Profile): Profile {
    const defaultProfile: Partial<Profile> = {
      copyrightText: `© Copyright ${new Date().getFullYear()}. All Rights Reserved.`,
      termsText: 'default terms text',
      privacyText: 'default privacy text',
      headerLogo: {
        textLogo: '',
      },
      footerLogo: {
        textLogo: ' ',
      },
    };

    return lodash.merge(pageProfile, defaultProfile);
  }
}
