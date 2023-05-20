import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { WebpageSection } from './entities/webpage-section.entity';
import { GenericSectionDto } from './dto';

@Injectable()
export class PageSectionMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, WebpageSection, GenericSectionDto);
    };
  }
}
