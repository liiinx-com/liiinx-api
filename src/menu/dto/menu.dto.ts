import { AutoMap } from '@automapper/classes';
import { BaseEntityDto } from 'src/shared/base.dto';

export class MenusDto {
  topBar?: MenuDto;
  sideBar?: MenuDto;
  headerPrimary?: MenuDto;
  headerSecondary?: MenuDto;
  footerPrimary?: MenuDto;
  footerSecondary?: MenuDto;
}

export class MenuDto extends BaseEntityDto {
  @AutoMap()
  id: string;

  @AutoMap()
  title: string;

  @AutoMap()
  items: MenuItemDto[];
}

export class MenuItemDto {
  @AutoMap()
  id: string;

  @AutoMap()
  title: string;

  @AutoMap()
  icon?: string;

  @AutoMap()
  url: string;

  @AutoMap()
  target: string;

  @AutoMap()
  order: number;

  @AutoMap()
  isFeatured: boolean;

  @AutoMap()
  props?: object;
}
