import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { ProfileDto } from './dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Profile, ProfileDto);
      createMap(mapper, ProfileDto, Profile);
    };
  }
}
