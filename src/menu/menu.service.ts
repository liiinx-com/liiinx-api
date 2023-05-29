import { Injectable } from '@nestjs/common';
import { Menu } from './entities/menu.entity';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { MenuBuilder } from './menu-builder';
import MenuTypes from './menu-keys';
import { Mapper } from '@automapper/core';
import { MenuDto, MenuItemDto, MenusDto } from 'src/menu/dto/menu.dto';
import { InjectMapper } from '@automapper/nestjs';

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

  getMenu(id: string): Promise<Menu> {
    return this.menuRepository.findOne({
      relations: { items: true },
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async addDynamicMenus(
    templateName: string,
    menus: Menu[],
  ): Promise<MenusDto> {
    const dynamicMenus: Menu[] = [];
    return this.mapToMenusDto([...dynamicMenus, ...menus]);
  }

  // TODO: toMapper?
  private mapToMenusDto(menus: Menu[]): MenusDto {
    return menus.reduce((result, item) => {
      const menu = this.mapper.map(item, Menu, MenuDto);
      menu.items = this.mapper.mapArray(item.items, Menu, MenuItemDto);
      result[item.menuType] = menu;
      return result;
    }, {});
  }

  async getDefaultMenus(): Promise<Menu[]> {
    const headerPrimaryMenu = new MenuBuilder()
      .create(MenuTypes.HEADER_PRIMARY, null)
      .makeParent()
      .withTitle('Header Primary Menu')
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(1)
          .withTitle('Home')
          .withUrl('/home')
          .getMenu(),
      )
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(2)
          .withTitle('About')
          .withUrl('/about')
          .getMenu(),
      )
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(3)
          .withTitle('Videos')
          .withUrl('/videos')
          .getMenu(),
      )
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(4)
          .withTitle('Blog')
          .withUrl('/blog')
          .getMenu(),
      )
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(4)
          .withTitle('Contact')
          .withUrl('/contact')
          .getMenu(),
      )
      .getMenu();

    const footerPrimaryMenu = new MenuBuilder()
      .create(MenuTypes.FOOTER_PRIMARY, null)
      .makeParent()
      .withTitle('Footer Primary Menu')
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(1)
          .withTitle('Home')
          .withUrl('/home')
          .getMenu(),
      )
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(2)
          .withTitle('About')
          .withUrl('/about')
          .getMenu(),
      )
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(3)
          .withTitle('Videos')
          .withUrl('/videos')
          .getMenu(),
      )
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(4)
          .withTitle('Blog')
          .withUrl('/blog')
          .getMenu(),
      )
      .withChild(
        new MenuBuilder()
          .create()
          .withOrder(4)
          .withTitle('Contact')
          .withUrl('/contact')
          .getMenu(),
      )
      .getMenu();

    return [headerPrimaryMenu, footerPrimaryMenu];
  }
}
