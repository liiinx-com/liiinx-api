import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { createMap, forMember, mapFrom } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { BaseEntityDto } from '../shared/base.dto';
import { BaseEntity } from 'src/shared/base.entity';
import { Webpage } from './entities/webpage.entity';
import { PageDto } from './dto/webpage.dto';

@Injectable()
export class WebpageMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, BaseEntity, BaseEntityDto);
      createMap(mapper, Webpage, PageDto);
    };
  }
}
