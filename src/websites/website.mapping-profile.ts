import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper, MappingConfiguration } from '@automapper/core';
import { createMap, extend } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Website } from './entities/website.entity';
import { WebsiteDto } from './dto';
import { BaseEntity } from '../shared/base.entity';
import { BaseEntityDto } from '../shared/base.dto';

@Injectable()
export class WebSiteMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, BaseEntity, BaseEntityDto);
      createMap(mapper, Website, WebsiteDto, extend(BaseEntity, BaseEntityDto));
    };
  }

  // protected get mappingConfigurations(): MappingConfiguration[] {
  //   return [extend(BaseEntity, BaseEntityDto)];
  // }
}
