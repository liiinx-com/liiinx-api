import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { createMap, extend, forMember, mapFrom } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Media } from './entities/media.entity';
import { CreateMediaItem, MediaItemDto, MediaItemResponse } from './dto';

@Injectable()
export class MediaMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, MediaItemDto, Media);
      createMap(mapper, CreateMediaItem, Media);
      createMap(mapper, Media, MediaItemDto);
      createMap(
        mapper,
        Media,
        MediaItemResponse,
        forMember(
          (destination) => destination.url,
          mapFrom(
            (source) =>
              'https://www.youtube.com/watch?v=' + source.providerMediaId,
          ),
        ),
      );
    };
  }
}
