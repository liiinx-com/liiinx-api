import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateMediaDataPart, MediaDto } from './dto';
import { Media } from './entities/media.entity';

@Injectable()
export class DataPartMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateMediaDataPart, Media);
      createMap(mapper, Media, MediaDto);
    };
  }
}
