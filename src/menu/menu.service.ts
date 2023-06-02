import { Injectable } from '@nestjs/common';
import { Menu } from './entities/menu.entity';
import { DataSource, In, InsertResult, Repository } from 'typeorm';
import { MenuBuilder } from './menu-builder';
import MenuTypes from './menu-keys';
import { lodash } from 'src/utils';
import { Mapper } from '@automapper/core';
import {
  CreateMenuDto,
  MenuDto,
  MenuItemDto,
  MenusDto,
} from 'src/menu/dto/menu.dto';
import { InjectMapper } from '@automapper/nestjs';
import menuKeys from './menu-keys';

@Injectable()
export class MenuService {
  menuRepository: Repository<Menu>;

  constructor(
    private dataSource: DataSource,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {
    this.menuRepository = this.dataSource.getRepository(Menu);
  }

  async saveMenu(menu: Menu): Promise<Menu> {
    return this.menuRepository.save(menu);
  }

  async saveMenuBulk(items: Menu[]): Promise<InsertResult> {
    return this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Menu)
      .values(items)
      .execute();
  }

  async mapToMenu(menuDto: CreateMenuDto): Promise<Menu> {
    const builder = new MenuBuilder()
      .create(MenuTypes[menuDto.menuType], null)
      .makeParent()
      .withWebpageId(menuDto.webpageId)
      .withTitle(menuDto.title);

    if (menuDto.items) {
      builder.withChildren(
        lodash.orderBy(menuDto.items, ['order']).map((i, indx) => {
          const builder = new MenuBuilder().create().withOrder(indx);
          if (i.icon) builder.withIcon(i.icon);
          if (i.isFeatured) builder.makeFeatured();
          if (i.props) builder.withUiProps(i.props);
          if (i.title) builder.withTitle(i.title);
          if (i.url) builder.withUrl(i.url);

          return builder.getMenu();
        }),
      );
    }

    return builder.getMenu();
  }

  getMenu(webpageId: string, menuTypes = ['HEADER_PRIMARY']): Promise<Menu[]> {
    return this.menuRepository.find({
      relations: { items: true },
      where: {
        webpageId,
        menuType: In(menuTypes.map((t) => menuKeys[t])),
        isDeleted: false,
      },
    });
  }

  async getPageMenusDto(webpageId: string): Promise<MenusDto> {
    return this.mapToMenusDto(
      await this.getMenu(webpageId, ['HEADER_PRIMARY', 'FOOTER_PRIMARY']),
    );
  }

  async addDynamicMenus(
    templateName: string,
    menus: Menu[],
  ): Promise<MenusDto> {
    const dynamicMenus: Menu[] = [];
    return this.mapToMenusDto([...dynamicMenus, ...menus]);
  }

  private mapToMenusDto(menus: Menu[]): MenusDto {
    return menus.reduce((result, item) => {
      const menu = this.mapper.map(item, Menu, MenuDto);
      menu.items = this.mapper.mapArray(item.items, Menu, MenuItemDto);
      result[item.menuType] = menu;
      return result;
    }, {});
  }
}
