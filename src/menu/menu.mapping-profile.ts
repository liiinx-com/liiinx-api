import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { createMap, forMember, mapFrom } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Menu } from './entities/menu.entity';
import { MenuDto, MenuItemDto } from 'src/menu/dto/menu.dto';

@Injectable()
export class MenuMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
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
