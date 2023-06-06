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
      copyright:
        'this is default copyright text. © Copyright 2021. All Rights Reserved.',
      terms: 'default terms text',
      privacy: 'default privacy text',
      headerLogo: {
        textLogo: 'Default Logo',
      },
      footerLogo: {
        textLogo: 'Default footer logo',
      },
    };

    return lodash.merge(pageProfile, defaultProfile);
  }
}
