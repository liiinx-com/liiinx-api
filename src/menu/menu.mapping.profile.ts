import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { createMap, forMember, mapFrom } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Menu } from './entities/menu.entity';
import { MenuDto, MenuItemDto } from 'src/websites/dto/menu.dto';
import { BaseEntityDto } from '../shared/base.dto';
import { BaseEntity } from 'src/shared/base.entity';

@Injectable()
export class MenuMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, BaseEntity, BaseEntityDto);
      createMap(
        mapper,
        Menu,
        MenuItemDto,
        forMember(
          (d) => d.props,
          mapFrom((source) => source.uiProps),
        ),
      );
      createMap(mapper, Menu, MenuDto);
    };
  }
}
