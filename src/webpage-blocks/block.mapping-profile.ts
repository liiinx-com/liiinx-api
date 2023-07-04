import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { WebpageBlock } from './entities/block.entity';
import { BaseBlockDto } from './blocks/base-block.dto';

@Injectable()
export class PageBlockMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, WebpageBlock, BaseBlockDto);
      createMap(mapper, BaseBlockDto, WebpageBlock);
    };
  }
}
