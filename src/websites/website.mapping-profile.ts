import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Website } from './entities/website.entity';
import { WebsiteDto } from './dto';

@Injectable()
export class WebSiteMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      // createMap(mapper, BaseEntity, BaseEntityDto);
      createMap(mapper, Website, WebsiteDto);
    };
  }
}
