import { Injectable } from '@nestjs/common';
import { Menu } from './entities/menu.entity';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { MenuBuilder } from './menu-builder';

@Injectable()
export class MenuService {
  menuRepository: Repository<Menu>;

  constructor(private dataSource: DataSource) {
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

  async getMenusByTemplate(templateName: string): Promise<Menu[]> {
    const headerMenu = new MenuBuilder()
      .reset()
      .makeParent()
      .withTitle('Header Menu')
      .withChild(
        new MenuBuilder()
          .reset()
          .withOrder(1)
          .withTitle('Home')
          .withUrl('/home')
          .getMenu(),
      )
      .withChild(
        new MenuBuilder()
          .reset()
          .withOrder(2)
          .withTitle('About')
          .withUrl('/about')
          .getMenu(),
      )
      .getMenu();

    return [headerMenu];
  }
}
