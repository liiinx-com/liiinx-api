import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import {
  createMap,
  forMember,
  mapFrom,
  nullSubstitution,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { WebpageBlock } from './entities/block.entity';
import { BaseBlockDto } from './blocks/base-block.dto';
import { HeaderBlockOptions } from './blocks/header/header.dto';
import { HeaderBlock } from './blocks/header/header.entity';

@Injectable()
export class PageBlockMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        WebpageBlock,
        BaseBlockDto,
        forMember(
          (destination) => destination.blockClassName,
          nullSubstitution(''),
        ),
        forMember(
          (destination) => destination.wrapperClassName,
          nullSubstitution(''),
        ),
        forMember(
          (m) => m.blockStyle,
          mapFrom((s) => s.blockStyle),
        ),
        forMember(
          (m) => m.wrapperStyle,
          mapFrom((s) => s.wrapperStyle),
        ),
      );
      createMap(mapper, BaseBlockDto, WebpageBlock);

      // Header
      createMap(mapper, HeaderBlockOptions, HeaderBlock);
      createMap(mapper, HeaderBlock, HeaderBlockOptions);
    };
  }
}
