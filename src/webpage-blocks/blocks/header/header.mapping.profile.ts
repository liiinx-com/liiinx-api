import {
  Mapper,
  MappingConfiguration,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { HeaderBlockEntity } from './header.entity';
import {
  CreateHeaderBlockPayload,
  HeaderBlockDto,
  PatchHeaderBlockPayload,
} from './header.dto';
import { WebpageBlock } from 'src/webpage-blocks/blocks/_base-block/base-block.entity';

@Injectable()
export class HeaderBlockMappingProfile extends AutomapperProfile {
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
      createMap(
        mapper,
        CreateHeaderBlockPayload,
        HeaderBlockEntity,
        forMember(
          (dest) => dest.textLogoProps,
          mapFrom((src) => src.textLogoProps),
        ),
        forMember(
          (dest) => dest.imageLogoProps,
          mapFrom((src) => src.imageLogoProps),
        ),
      );
      createMap(
        mapper,
        PatchHeaderBlockPayload,
        HeaderBlockEntity,
        forMember(
          (dest) => dest.id,
          mapFrom((src) => src.blockId),
        ),
        forMember(
          (dest) => dest.textLogoProps,
          mapFrom((src) => src.textLogoProps),
        ),
        forMember(
          (dest) => dest.imageLogoProps,
          mapFrom((src) => src.imageLogoProps),
        ),
      );
      createMap(
        mapper,
        PatchHeaderBlockPayload,
        WebpageBlock,
        forMember(
          (dest) => dest.blockStyle,
          mapFrom((src) => src.blockStyle),
        ),
        forMember(
          (dest) => dest.wrapperStyle,
          mapFrom((src) => src.wrapperStyle),
        ),
      );
      createMap(
        mapper,
        CreateHeaderBlockPayload,
        WebpageBlock,
        forMember(
          (dest) => dest.blockStyle,
          mapFrom((src) => src.blockStyle),
        ),
        forMember(
          (dest) => dest.wrapperStyle,
          mapFrom((src) => src.wrapperStyle),
        ),
      );
      createMap(
        mapper,
        HeaderBlockEntity,
        HeaderBlockDto,
        forMember(
          (dest) => dest.textLogoProps,
          mapFrom((src) => src.textLogoProps),
        ),
        forMember(
          (dest) => dest.imageLogoProps,
          mapFrom((src) => src.imageLogoProps),
        ),
        forMember(
          (dest) => dest.sloganProps,
          mapFrom((src) => src.sloganProps),
        ),
      );
      createMap(
        mapper,
        WebpageBlock,
        HeaderBlockDto,
        forMember(
          (dest) => dest.blockStyle,
          mapFrom((src) => src.blockStyle),
        ),
        forMember(
          (dest) => dest.wrapperStyle,
          mapFrom((src) => src.wrapperStyle),
        ),
      );
    };
  }
}
