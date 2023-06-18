import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { createMap, extend } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { ProfileDto, LogoDto } from './dto';
import { Logo, Profile } from './entities/profile.entity';

@Injectable()
export class ProfileMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Logo, LogoDto);
      createMap(mapper, Profile, ProfileDto);
      createMap(mapper, LogoDto, Logo);
      createMap(mapper, ProfileDto, Profile);
    };
  }
}
