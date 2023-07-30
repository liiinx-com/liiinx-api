import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper, MappingConfiguration } from '@automapper/core';
import {
  createMap,
  extend,
  forMember,
  undefinedSubstitution,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { BaseBlockDto } from './base-block/base-block.dto';
import {
  CreateHeaderBlockPayload,
  HeaderBlockDto,
} from './blocks/header/header.dto';
import { BaseUIBlockPayloadDto } from './dto';

@Injectable()
export class PageBlockMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  protected get mappingConfigurations(): MappingConfiguration[] {
    // const mapping1 = extend(BaseActionPayloadDto, BaseBlockDto);
    // const mapping2 = extend(BaseActionPayloadDto, BaseUIBlockActionPayloadDto);
    // const mapping3 = extend(BaseUIBlockActionPayloadDto, BaseBlockDto);
    // const mapping4 = extend(BaseUIBlockActionPayloadDto, HeaderBlockDto);
    // return [mapping1, mapping2, mapping3, mapping4];
    return [];
  }

  override get profile() {
    return (mapper) => {
      // createMap(
      //   mapper,
      //   WebpageBlock,
      //   BaseBlockDto,
      //   forMember(
      //     (destination) => destination.blockClassName,
      //     nullSubstitution(''),
      //   ),
      // forMember(
      //   (destination) => destination.wrapperClassName,
      //   nullSubstitution(''),
      // ),
      // forMember(
      //   (m) => m.blockStyle,
      //   mapFrom((s) => s.blockStyle),
      // ),
      // forMember(
      //   (m) => m.wrapperStyle,
      //   mapFrom((s) => s.wrapperStyle),
      // ),
      // );
      // createMap(mapper, BaseBlockDto, WebpageBlock);

      //base types
      // createMap(mapper, BaseActionPayloadDto, BaseBlockDto);
      createMap(
        mapper,
        BaseUIBlockPayloadDto,
        BaseBlockDto,
        // forMember((m) => m.blockType, fromValue('headerxx1')),
        forMember(
          (destination) => destination.blockClassName,
          undefinedSubstitution(''),
        ),
        forMember(
          (destination) => destination.wrapperClassName,
          undefinedSubstitution(''),
        ),
      );

      // Header
      createMap(
        mapper,
        CreateHeaderBlockPayload,
        HeaderBlockDto,
        // forMember((destination) => destination.blockType, from),
        extend(BaseUIBlockPayloadDto, BaseBlockDto),
      );
    };
  }
}
